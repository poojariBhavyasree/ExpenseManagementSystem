
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    email
                }
            );

            setMessage(response.data.message);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div
                    style={{
                        textAlign: "center",
                        fontSize: "50px",
                        marginBottom: "15px"
                    }}
                >
                    🔐
                </div>

                <h2>Forgot Password?</h2>

                <p>
                    Enter your registered email to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && (
                        <small className="error">
                            {error}
                        </small>
                    )}

                    {message && (
                        <p
                            style={{
                                color: "green",
                                textAlign: "center",
                                marginTop: "10px"
                            }}
                        >
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "📧 Send Reset Link"}
                    </button>

                </form>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "15px"
                    }}
                >
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#4f46e5",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        ← Back to Login
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;
