const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getDashboard
} = require("../controllers/expenseController");

// Add Expense
router.post("/", verifyToken, addExpense);

// Get All Expenses
router.get("/", verifyToken, getExpenses);
// Dashboard Summary
router.get("/dashboard", verifyToken, getDashboard);

// Get Single Expense
router.get("/:id", verifyToken, getExpenseById);

// Update Expense
router.put("/:id", verifyToken, updateExpense);

// Delete Expense
router.delete("/:id", verifyToken, deleteExpense);


module.exports = router;