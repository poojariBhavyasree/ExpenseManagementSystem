const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addIncome,
    getIncome,
    deleteIncome,
    getIncomeSummary
} = require("../controllers/incomeController");
// Add Income
router.post("/", verifyToken, addIncome);
router.get("/dashboard", verifyToken, getIncomeSummary);

// Get All Income
router.get("/", verifyToken, getIncome);

// Delete Income
router.delete("/:id", verifyToken, deleteIncome);

module.exports = router;