import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/addExpense.css";

const AddIncome = () => {

    const navigate = useNavigate();

    const [income, setIncome] = useState({
        amount: "",
        source: "",
        description: "",
        date: ""
    });

    const handleChange = (e) => {
        setIncome({
            ...income,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
       

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/income",
                {
                    amount: income.amount,
                    source: income.source,
                    description: income.description,
                    income_date: income.date
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Income Added Successfully");

            navigate("/dashboard");

        } catch (err) {

            alert(err.response?.data?.message || err.message);

            console.log(err);

        }
    };

    return (

        <div className="add-expense">

            <h2>Add Income</h2>
            <h1 style={{ color: "red", textAlign: "center" }}>
                THIS IS ADD INCOME PAGE
            </h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Amount</label>

                    <input
                        type="number"
                        name="amount"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Source</label>

                    <input
                        type="text"
                        name="source"
                        onChange={handleChange}
                        placeholder="Salary / Freelancing / Gift"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Date</label>

                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit">
                   
                    💰 Save Income
                </button>
            </form>

        </div>

    );

};

export default AddIncome;