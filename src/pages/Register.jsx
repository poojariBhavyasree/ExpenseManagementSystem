import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        let newErrors = {};

        if (!formData.full_name.trim()) {
            newErrors.full_name = "Full Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    full_name: formData.full_name,
                    email: formData.email,
                    password: formData.password
                }
            );

            alert(res.data.message);

            navigate("/");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <div
                    style={{
                        textAlign: "center",
                        fontSize: "55px",
                        marginBottom: "15px"
                    }}
                >
                    👤
                </div>

                <h2>Create Account</h2>

                <p>Register to manage your expenses</p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="full_name"
                            placeholder="Enter your full name"
                            value={formData.full_name}
                            onChange={handleChange}
                        />

                        {errors.full_name && <small className="error">{errors.full_name}</small>}

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email && <small className="error">{errors.email}</small>}

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {errors.password && <small className="error">{errors.password}</small>}

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}

                    </div>

                    <button type="submit">
                        🚀 Register
                    </button>

                    <p className="auth-link">

                        Already have an account?

                        <Link to="/"> Login</Link>

                    </p>

                </form>

            </div>

        </div>

    );

};

export default Register;