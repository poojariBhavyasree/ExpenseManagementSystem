import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import "../styles/layout.css";

const MainLayout = () => {
    return (
        <div className="layout">
            <Sidebar />

            <div className="main-content">
                <Navbar />

                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;