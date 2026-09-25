const Income = require("../models/incomeModel");

// Add Income
exports.addIncome = (req, res) => {

    const { amount, source, description, income_date } = req.body;

    if (!amount || !source || !income_date) {
        return res.status(400).json({
            message: "Amount, Source and Date are required"
        });
    }

    const income = {
        user_id: req.user.id,
        amount,
        source,
        description,
        income_date
    };

    Income.addIncome(income, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.status(201).json({
            message: "Income Added Successfully"
        });

    });

};

// Get All Income
exports.getIncome = (req, res) => {

    Income.getIncome(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// Delete Income
exports.deleteIncome = (req, res) => {

    Income.deleteIncome(
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
                    message: "Income not found"
                });
            }

            res.json({
                message: "Income Deleted Successfully"
            });

        }
    );

};
// Dashboard Income Summary
exports.getIncomeSummary = (req, res) => {

    Income.getIncomeSummary(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        res.status(200).json(result[0]);

    });

};