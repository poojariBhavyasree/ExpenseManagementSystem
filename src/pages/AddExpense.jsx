import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import React, { useState } from "react";
import "../styles/addExpense.css";

const AddExpense = () => {

    const navigate = useNavigate();
    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        date: ""
    });


    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !expense.title ||
            !expense.amount ||
            !expense.category ||
            !expense.date
        ) {
            alert("Please fill in all fields.");
            return;
        }
        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/expenses",
                {
                    title: expense.title,
                    amount: expense.amount,
                    category: expense.category,
                    expense_date: expense.date
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Expense Added Successfully");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message || "Failed to Add Expense"
            );

        }
    };

    return (
        <div className="add-expense">

            <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <div style={{ fontSize: "55px", marginBottom: "10px" }}>💸</div>
                <h2>Add New Expense</h2>
                <p>Track your daily spending easily</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter expense title"
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Shopping</option>
                        <option>Bills</option>
                        <option>Others</option>
                    </select>

                </div>


                <div className="form-group">
                    <label>Date</label>

                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                    />

                </div>


                <button type="submit">
                    💸 Add Expense
                </button>


            </form>

        </div>
    );
};

export default AddExpense;