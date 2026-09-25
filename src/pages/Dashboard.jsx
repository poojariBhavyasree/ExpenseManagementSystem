import "../styles/dashboard.css"; 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import {
    FaMoneyBillWave,
    FaWallet,
    FaFilePdf,
    FaUser,
    FaEdit,
    FaTrash
} from "react-icons/fa";

const Dashboard = () => {
    const navigate = useNavigate();
    const [summary, setSummary] = useState({
        totalExpenses: 0,
        totalAmount: 0
    });
    const [incomeSummary, setIncomeSummary] = useState({
        totalIncome: 0
    });
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
        const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
        useEffect(() => {
            fetchDashboard();
            fetchExpenses();
            fetchIncomeSummary();
            fetchIncome();
        }, []);


    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/expenses/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Expense Response:",res.data);

            setSummary(res.data);

        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            } else {
                console.log(error);
            }
        }

    };
    const fetchIncomeSummary = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/income/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Income Summary:", res.data);

            setIncomeSummary(res.data);

        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            } else {
                console.log(error);
            }
        }
        

    };

       
const fetchIncome = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://localhost:5000/api/income",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setIncome(res.data);

    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        } else {
            console.log(error);
        }
    }

};
    const fetchExpenses = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/expenses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExpenses(res.data);

        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            } else {
                console.log(error);
            }
        }
    };
    const deleteExpense = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/expenses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Expense Deleted Successfully");

            // Refresh dashboard and expense list
            fetchDashboard();
            fetchExpenses();

        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            } else {
                console.log(error);
            }
        }

    };
    const deleteIncome = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/income/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Income Deleted Successfully");

            fetchIncome();
            fetchIncomeSummary();

        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            } else {
                console.log(error);
            }
        }

    };
    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Expense Report", 14, 20);

        const tableColumn = [
            "Title",
            "Category",
            "Amount",
            "Date"
        ];

        const tableRows = [];

        expenses.forEach((expense) => {
            tableRows.push([
                expense.title,
                expense.category,
                `₹ ${expense.amount}`,
                new Date(expense.expense_date).toLocaleDateString()
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30
        });

        doc.save("Expense_Report.pdf");
    };
    const filteredExpenses = expenses.filter((expense) => {

        const matchesSearch =
            expense.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "" || expense.category === category;

        const expenseDate = new Date(expense.expense_date);

        const matchesFrom =
            !fromDate || expenseDate >= new Date(fromDate);

        const matchesTo =
            !toDate || expenseDate <= new Date(toDate);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesFrom &&
            matchesTo
        );

    });
    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>💰 Expense Management</h1>
                    <p>Track expenses, manage income, and stay in control of your finances.</p>
                </div>

                <div className="header-buttons">

                    <button
                        className="profile-btn"
                        onClick={() => navigate("/profile")}
                    >
                        <FaUser style={{ marginRight: "6px" }} />
                        Profile
                    </button>

                    <button
                        className="logout-btn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            navigate("/");
                        }}
                    >
                        🚪 Logout
                    </button>

                </div>

            </div>
            <div className="action-bar">

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/add-expense")}
                >
                    💸 Add Expense
                </button>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/add-income")}
                >
                    <FaMoneyBillWave style={{ marginRight: "6px" }} />
                    Add Income
                </button>
                <button
                    className="btn btn-warning"
                    onClick={exportPDF}
                >
                    <FaFilePdf style={{ marginRight: "6px" }} />
                    Export PDF
                </button>
            </div>
            {/* Summary Cards */}
            {/* Summary Cards */}
            <div className="summary-cards">

                <div className="card expense-card">
                    <div className="card-icon">
                        💸
                    </div>
                    <h3>Total Expenses</h3>
                    <h2>
                        ₹ {summary.totalAmount}
                    </h2>
                </div>


                <div className="card income-card">
                    <div className="card-icon">
                        💰
                    </div>

                    <h3>Total Income</h3>

                    <h2>
                        ₹ {incomeSummary.totalIncome}
                    </h2>

                    <p className="card-subtitle">
                        Income Received
                    </p>
                </div>

                <div className="card balance-card">
                    <div className="card-icon">
                        📊
                    </div>
                    <h3>Balance</h3>
                    <h2>
                        ₹ {(
                            (incomeSummary.totalIncome || 0) -
                            (summary.totalAmount || 0)
                        ).toFixed(2)}
                    </h2>
                </div>


                <div className="card transaction-card">
                    <div className="card-icon">
                        🧾
                    </div>
                    <h3>Total Transactions</h3>
                    <h2>
                        {expenses.length + income.length}
                    </h2>
                </div>

            </div>

            <div className="chart-section">

                <div className="chart-box">
                    <ExpensePieChart expenses={expenses} />
                </div>

                <div className="chart-box">
                    <h2>Monthly Expense Analysis</h2>
                    <MonthlyExpenseChart expenses={expenses} />
                </div>

            </div>
            <div className="filter-box">
                <input
                    className="search-input"
                    type="text"
                    placeholder="🔍 Search expenses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Others">Others</option>
                </select>
                <div className="action-bar">

                    <button
                        className="btn btn-success"
                        onClick={() => {
                            const today = new Date().toISOString().split("T")[0];
                            setFromDate(today);
                            setToDate(today);
                        }}
                    >
                        Today
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            const today = new Date();
                            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

                            setFromDate(firstDay.toISOString().split("T")[0]);
                            setToDate(today.toISOString().split("T")[0]);
                        }}
                    >
                        This Month
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            setSearch("");
                            setCategory("");
                            setFromDate("");
                            setToDate("");
                        }}
                    >
                        Clear All Filters
                    </button>

                </div>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />

                <button
                    className="btn btn-warning"
                    onClick={() => {
                        setFromDate("");
                        setToDate("");
                    }}
                >
                    Reset
                </button>
            </div>
            {/* Recent Expenses */}
            <h2 style={{ marginTop: "40px" }}>Recent Expenses</h2>

            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredExpenses.length > 0 ? (

                        filteredExpenses.map((expense) => (

                            <tr key={expense.id}>
                                <td>{expense.title}</td>
                                <td>
                                    <span className={`category ${expense.category.toLowerCase()}`}>
                                        {expense.category}
                                    </span>
                                </td>
                                <td>₹ {expense.amount}</td>
                                <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/edit-expense/${expense.id}`)}
                                    >
                                        <FaEdit style={{ marginRight: "5px" }} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteExpense(expense.id)}
                                        style={{
                                            backgroundColor: "#f44336",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td
                                colSpan="5"
                                style={{
                                    textAlign: "center",
                                    padding: "20px"
                                }}
                            >
                                No expenses found
                            </td>
                        </tr>

                    )}

                </tbody>
            </table>
            {/* Recent Income */}

            <h2 style={{ marginTop: "40px" }}>
                Recent Income
            </h2>

            <table className="expense-table">

                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>


                <tbody>

                    {income.length > 0 ? (

                        income.map((item) => (

                            <tr key={item.id}>

                                <td>{item.source}</td>

                                <td>{item.description}</td>

                                <td>
                                    ₹ {item.amount}
                                </td>

                                <td>
                                    {new Date(item.income_date)
                                        .toLocaleDateString()}
                                </td>

                                <td>
                                    <button
                                        onClick={() => navigate(`/edit-income/${item.id}`)}
                                        style={{
                                            marginRight: "10px",
                                            backgroundColor: "#2196F3",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteIncome(expense.id)}
                                    >
                                        <FaTrash style={{ marginRight: "5px" }} />
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td
                                colSpan="4"
                                style={{
                                    textAlign: "center",
                                    padding: "20px"
                                }}
                            >
                                No income found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>
            {/* Footer */}

            <footer className="dashboard-footer">
                <h3>Expense Management System</h3>
                <p>Manage your income and expenses efficiently.</p>
                <p>Developed by <strong>Bhavya Sree</strong></p>
                <p>© 2026 All Rights Reserved.</p>
            </footer>
        </div>
        
    );
};

export default Dashboard;