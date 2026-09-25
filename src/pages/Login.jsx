import axios from "axios"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (email.trim() === "") {
            newErrors.email = "Email is required";
        }

        if (password.trim() === "") {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length !== 0) {
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div style={{ textAlign: "center", fontSize: "60px", marginBottom: "15px" }}>
                    💰
                </div>

                <h2>Expense Management System</h2>
                <p>Login to continue</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {errors.email && (
                            <small className="error">{errors.email}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <div className="password-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {errors.password && (
                            <small className="error">{errors.password}</small>
                        )}
                    </div>

                   
                    <button className="login-btn">
                        🚀 Login
                    </button>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <button
                            type="button"
                            onClick={() => navigate("/forgot-password")}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#4f46e5",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;