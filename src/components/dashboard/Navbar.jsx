import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };


    return (

        <nav className="navbar">

            <div className="brand">

                <h2>
                    💎 FinTrack
                </h2>

                <p>
                    Smart Expense Management System
                </p>

            </div>


            <div className="nav-actions">


                <button
                    className="profile-nav-btn"
                    onClick={() => navigate("/profile")}
                >
                    👤 Profile
                </button>


                <button
                    className="logout-nav-btn"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>


            </div>


        </nav>

    );

};


export default Navbar; 