import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyExpenseChart = ({ expenses }) => {

    const monthlyData = {};

    expenses.forEach((expense) => {

        const month = new Date(expense.expense_date).toLocaleString(
            "default",
            { month: "short" }
        );

        monthlyData[month] =
            (monthlyData[month] || 0) + Number(expense.amount);

    });

    const data = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: "Monthly Expenses",
                data: Object.values(monthlyData),
                backgroundColor: "#36A2EB"
            }
        ]
    };

    return (
        <div
            style={{
                width: "700px",
                margin: "40px auto"
            }}
        >
            <Bar data={data} />
        </div>
    );
};

export default MonthlyExpenseChart;