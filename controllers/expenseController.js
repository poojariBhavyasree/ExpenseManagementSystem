const Expense = require("../models/expenseModel");

// Add Expense
exports.addExpense = (req, res) => {

    const { title, amount, category, expense_date } = req.body;

    if (!title || !amount || !category || !expense_date) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const expense = {
        user_id: req.user.id,
        title,
        amount,
        category,
        expense_date
    };

    Expense.addExpense(expense, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.status(201).json({
            message: "Expense Added Successfully"
        });

    });

};

// Get All Expenses
exports.getExpenses = (req, res) => {

    Expense.getExpenses(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// Update Expense
exports.updateExpense = (req, res) => {

    const { title, amount, category, expense_date } = req.body;

    Expense.updateExpense(
        req.params.id,
        req.user.id,
        {
            title,
            amount,
            category,
            expense_date
        },
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Expense not found"
                });
            }

            res.json({
                message: "Expense Updated Successfully"
            });

        }
    );

};

// Delete Expense
exports.deleteExpense = (req, res) => {

    Expense.deleteExpense(
        req.params.id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Expense not found"
                });
            }

            res.json({
                message: "Expense Deleted Successfully"
            });

        }
    );

};
exports.getDashboard = (req, res) => {

    Expense.getDashboard(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.status(200).json(result[0]);

    });

};
// Get Single Expense
exports.getExpenseById = (req, res) => {

    Expense.getExpenseById(
        req.params.id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Expense not found"
                });
            }

            res.json(result[0]);

        }
    );

};