import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        totalAmount: 0
    });

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {

        try {

            const token = localStorage.getItem("token");

            const expenseRes = await axios.get(
                "http://localhost:5000/api/expenses/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const incomeRes = await axios.get(
                "http://localhost:5000/api/income/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSummary({
                totalIncome: incomeRes.data.totalIncome,
                totalExpenses: expenseRes.data.totalExpenses,
                totalAmount: expenseRes.data.totalAmount
            });

        } catch (err) {

            console.log(err);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");

    };

    return (

        <div className="profile-container">

            <div className="profile-card">

                <div className="profile-avatar">
                    👤
                </div>


                <h1>
                    My Profile
                </h1>


                <div className="profile-info">

                    <h3>Full Name</h3>
                    <p>{user?.full_name}</p>


                    <h3>Email</h3>
                    <p>{user?.email}</p>

                </div>


                <h2>
                    Financial Overview
                </h2>


                <div className="profile-stats">


                    <div className="stat-box income">
                        💰
                        <h4>Total Income</h4>
                        <p>
                            ₹ {summary.totalIncome}
                        </p>
                    </div>


                    <div className="stat-box expense">
                        💸
                        <h4>Total Expenses</h4>
                        <p>
                            ₹ {summary.totalAmount}
                        </p>
                    </div>


                    <div className="stat-box balance">
                        📊
                        <h4>Balance</h4>
                        <p>
                            ₹ {
                                summary.totalIncome -
                                summary.totalAmount
                            }
                        </p>
                    </div>


                </div>


                <button
                    className="dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ⬅ Back to Dashboard
                </button>


                <button
                    className="logout-profile-btn"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>


            </div>

        </div>

    );

};

export default Profile;