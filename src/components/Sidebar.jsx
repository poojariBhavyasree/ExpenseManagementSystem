import React from "react";
import {
    FaTachometerAlt,
    FaMoneyBillWave,
    FaWallet,
    FaChartBar,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <div className="sidebar">

            <div className="logo">
                💰 EMS
            </div>

            <nav>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/expenses"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaWallet />
                    <span>Expenses</span>
                </NavLink>

                <NavLink
                    to="/income"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaMoneyBillWave />
                    <span>Income</span>
                </NavLink>

                <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaChartBar />
                    <span>Reports</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaUser />
                    <span>Profile</span>
                </NavLink>

            </nav>

            <button
                className="logout-sidebar"
                onClick={logout}
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>

    );
};

export default Sidebar;