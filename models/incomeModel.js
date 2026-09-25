const db = require("../config/db");

// Add Income
const addIncome = (income, callback) => {

    const sql = `
        INSERT INTO income
        (user_id, amount, source, description, income_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            income.user_id,
            income.amount,
            income.source,
            income.description,
            income.income_date
        ],
        callback
    );
};

// Get All Income
const getIncome = (userId, callback) => {

    const sql = `
        SELECT *
        FROM income
        WHERE user_id = ?
        ORDER BY income_date DESC
    `;

    db.query(sql, [userId], callback);
};

// Delete Income
const deleteIncome = (id, userId, callback) => {

    const sql = `
        DELETE FROM income
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);
};
// Dashboard Summary
const getIncomeSummary = (userId, callback) => {

    const sql = `
        SELECT IFNULL(SUM(amount), 0) AS totalIncome
        FROM income
        WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);
};
module.exports = {
    addIncome,
    getIncome,
    deleteIncome,
    getIncomeSummary
};