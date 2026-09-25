const db = require("../config/db");

const createUser = (name, email, password, callback) => {
    const sql =
        "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], callback);
};

const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
};

// Save password reset token
const saveResetToken = (email, token, expiry, callback) => {
    const sql =
        "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?";

    db.query(sql, [token, expiry, email], (err, result) => {
        if (err) {
            console.log("🔥 DATABASE ERROR:", err);
        } else {
            console.log("✅ RESET TOKEN SAVED:", result);
        }

        callback(err, result);
    });
};

// Find user using reset token
const findUserByResetToken = (token, callback) => {
    const sql =
        "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()";

    db.query(sql, [token], callback);
};

// Update password and clear reset token
const updatePassword = (userId, hashedPassword, callback) => {
    const sql =
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?";

    db.query(sql, [hashedPassword, userId], callback);
};

module.exports = {
    createUser,
    findUserByEmail,
    saveResetToken,
    findUserByResetToken,
    updatePassword,
};