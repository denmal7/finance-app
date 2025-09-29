// This form lets the user add income/expense.

import { useState } from "react";
import axiosClient from "../api/axiosClient.js";

const TransactionForm = ({ onAdd }) => {
    const [type, setType] = useState("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!amount || !category) {
            setError("Amount and Category are requied");
            return;
        }

        try {
            const res = await axiosClient.post("/transactions", {
                type,
                amount,
                category,
                note,
                date,
            });

            onAdd(res.data); // update parent list
            setAmount("");
            setCategory("");
            setNote("");
            setDate("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add transaction");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Add Transaction</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="mb-2">
                <label className="block text-sm">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>

            <div className="mb-2">
                <label className="block text-sm">Amount</label>
                <input 
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm">Category</label>
                <input 
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Food, Rent, Salary..."
                  className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm">Note</label>
                <input 
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional"
                  className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm">Date</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded"
            >
                Add Transaction
            </button>
        </form>
    );
};

export default TransactionForm;