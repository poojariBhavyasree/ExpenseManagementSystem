console.log("🔥 AUTH CONTROLLER LOADED"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    User.findUserByEmail(email, async (err, result) => {
        if (err)
            return res.status(500).json({
                error: err,
            });

        if (result.length > 0) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(
            name,
            email,
            hashedPassword,
            (err, result) => {
                if (err)
                    return res.status(500).json({
                        error: err,
                    });

                res.status(201).json({
                    message: "User Registered Successfully",
                });
            }
        );
    });
};
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and Password are required"
        });
    }

    User.findUserByEmail(email, async (err, result) => {
        console.log("Email received:", email);
        console.log("Database result:", result);

        if (err)
            return res.status(500).json({
                error: err
            });

        if (result.length === 0) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        });
    });
};
// Forgot Password
exports.forgotPassword = (req, res) => {
    console.log("🚨 FORGOT PASSWORD API CALLED");
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    User.findUserByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        // Generate secure random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Token valid for 15 minutes
        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        User.saveResetToken(
            email,
            resetToken,
            expiry,
            (err, result) => {
                console.log("🔥 saveResetToken callback reached");
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                const resetLink =
                    `http://localhost:5173/reset-password/${resetToken}`;

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "Reset Your Expense Management Password",
                    html: `
                        <h2>Password Reset Request</h2>

                        <p>Hello ${user.full_name},</p>

                        <p>
                            We received a request to reset your password.
                        </p>

                        <p>
                            Click the button below to create a new password:
                        </p>

                        <a href="${resetLink}"
                           style="
                               display:inline-block;
                               padding:12px 20px;
                               background:#4f46e5;
                               color:white;
                               text-decoration:none;
                               border-radius:6px;
                           ">
                            Reset Password
                        </a>

                        <p>
                            This link will expire in <strong>15 minutes</strong>.
                        </p>

                        <p>
                            If you did not request a password reset,
                            you can safely ignore this email.
                        </p>
                    `
                };
                console.log("🚀 Sending reset email to:", email);
                transporter.sendMail(mailOptions, (error, info) => {
                    console.log("📧 EMAIL INFO:", info);
                     if (error) {
                        console.log("EMAIL ERROR FULL:", error);
                        console.log("EMAIL ERROR MESSAGE:", error.message);
                        console.log("EMAIL ERROR CODE:", error.code);

                        return res.status(500).json({
                            message: "Failed to send reset email"
                        });
                    }

                    res.status(200).json({
                        message: "Password reset link sent to your email"
                    });
                });
            }
        );
    });
};
exports.resetPassword = (req, res) => {
    console.log("🔐 RESET PASSWORD API CALLED");

    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({
            message: "Token and password are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    User.findUserByResetToken(token, (err, result) => {
        console.log("🔎 RESET TOKEN RESULT:", result);
        console.log("🔎 RESET TOKEN ERROR:", err); 
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired reset link"
            });
        }

        const user = result[0];

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({
                    message: "Password encryption failed"
                });
            }

            User.updatePassword(
                user.id,
                hashedPassword,
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Failed to update password"
                        });
                    }

                    console.log("✅ PASSWORD UPDATED");

                    res.status(200).json({
                        message: "Password reset successfully"
                    });
                }
            );
        });
    });
};