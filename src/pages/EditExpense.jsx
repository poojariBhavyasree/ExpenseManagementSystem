import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/addExpense.css";

const EditExpense = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        date: ""
    });

    useEffect(() => {
        fetchExpense();
    }, []);

    const fetchExpense = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:5000/api/expenses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExpense({
                title: res.data.title,
                amount: res.data.amount,
                category: res.data.category,
                date: res.data.expense_date.split("T")[0]
            });

        } catch (err) {
            console.log(err);
            alert("Failed to load expense");
        }

    };

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/expenses/${id}`,
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

            alert("Expense Updated Successfully");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);
            alert("Update Failed");

        }

    };

    return (

        <div className="add-expense">

            <h2>Edit Expense</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        name="title"
                        value={expense.title}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">
                    <label>Amount</label>

                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Category</label>

                    <select
                        name="category"
                        value={expense.category}
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
                        value={expense.date}
                        onChange={handleChange}
                    />

                </div>

                <button type="submit">
                    Update Expense
                </button>

            </form>

        </div>

    );

};

export default EditExpense;