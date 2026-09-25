import React from "react";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const ExpensePieChart = ({ expenses }) => {

    const categories = {};

    expenses.forEach((expense) => {

        if (categories[expense.category]) {
            categories[expense.category] += Number(expense.amount);
        } else {
            categories[expense.category] = Number(expense.amount);
        }

    });

    const data = {
        labels: Object.keys(categories),
        datasets: [
            {
                label: "Expenses",
                data: Object.values(categories),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF"
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div
            style={{
                width: "400px",
                margin: "30px auto"
            }}
        >
            <Pie data={data} />
        </div>
    );

};

export default ExpensePieChart;