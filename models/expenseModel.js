const db = require("../config/db");

// Add Expense
const addExpense = (expense, callback) => {

    const sql = `
        INSERT INTO expenses
        (user_id, title, amount, category, expense_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            expense.user_id,
            expense.title,
            expense.amount,
            expense.category,
            expense.expense_date
        ],
        callback
    );
};

// Get All Expenses
const getExpenses = (userId, callback) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE user_id = ?
        ORDER BY expense_date DESC
    `;

    db.query(sql, [userId], callback);
};
// Get Single Expense
const getExpenseById = (id, userId, callback) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);
};
// Update Expense
const updateExpense = (id, userId, expense, callback) => {

    const sql = `
        UPDATE expenses
        SET title = ?, amount = ?, category = ?, expense_date = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [
            expense.title,
            expense.amount,
            expense.category,
            expense.expense_date,
            id,
            userId
        ],
        callback
    );
};

// Delete Expense
const deleteExpense = (id, userId, callback) => {

    const sql = `
        DELETE FROM expenses
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);
};
// Dashboard Summary
const getDashboard = (userId, callback) => {

    const sql = `
        SELECT
            COUNT(*) AS totalExpenses,
            IFNULL(SUM(amount), 0) AS totalAmount
        FROM expenses
        WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);
};
module.exports = {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getDashboard
};