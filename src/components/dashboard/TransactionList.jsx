import React from "react";

const TransactionList = () => {
    const transactions = [
        { id: 1, title: "Salary", amount: "+₹40,000" },
        { id: 2, title: "Food", amount: "-₹500" },
        { id: 3, title: "Petrol", amount: "-₹1,000" },
        { id: 4, title: "Shopping", amount: "-₹2,500" },
    ];

    return (
        <div>
            <h2>Recent Transactions</h2>

            {transactions.map((item) => (
                <div key={item.id} className="transaction">
                    <span>{item.title}</span>
                    <span>{item.amount}</span>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;