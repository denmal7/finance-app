import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient.js";

const SummaryCards = ({ refresh }) => {
    const [summary, setSummary] = useState({
        income: 0,
        expenses: 0,
        balance: 0,
    });

    const fetchSummary = async () => {
        try {
            const res = await axiosClient.get("/transactions");
            const transactions = res.data;

            const income = transactions
              .filter((t) => t.type === "income")
              .reduce((sum, t) => sum + parseFloat(t.amount), 0);

            const expenses = transactions
              .filter((t) => t.type === "expense")
              .reduce((sum, t) => sum + parseFloat(t.amount), 0);

            setSummary({
                income,
                expenses,
                balance: income - expenses,
            });
        } catch (err) {
            console.error("Failed to fetch summary:", err);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [refresh]);


    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded shadow text-center">
                <h4 className="text-lg font-semibold text-green-700">Income</h4>
                <p className="text-2xl font-bold text-green-800">${summary.income}</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow text-center">
                <h4 className="text-lg font-semibold text-red-700">Expenses</h4>
                <p className="text-2xl font-bold text-red-800">${summary.expenses}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded shadow text-center">
                <h4 className="text-lg font-semibold text-blue-700">Balance</h4>
                <p className="text-2xl font-bold text-blue-800">${summary.balance}</p>
            </div>
        </div>
    );
};


export default SummaryCards;