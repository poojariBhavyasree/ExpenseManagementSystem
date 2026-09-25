import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/login.css";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/reset-password",
                {
                    token,
                    password
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Password reset failed"
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
                    🔑
                </div>

                <h2>Reset Password</h2>

                <p>Create a new password for your account.</p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>New Password</label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
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
                            ? "Resetting..."
                            : "🔐 Reset Password"}
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

export default ResetPassword;