// This will fetch and display transactions

import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const TransactionList = ({ refresh }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        type: "expense",
        amount: "",
        category: "",
        note: "",
        date: "",
    });

    const fetchTransactions = async () => {
        try {
            const res = await axiosClient.get("/transactions");
            setTransactions(res.data);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [refresh]);

    // Delete transaction
    const handleDelete = async (id) => {
        if(!window.confirm("Delete this transaction?")) return;
        try {
            await axiosClient.delete(`/transactions/${id}`);
            fetchTransactions();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // Start editing
    const startEdit = (transaction) => {
        setEditingId(transaction.id);
        setEditData({
            type: transaction.type,
            amount: transaction.amount,
            category: transaction.category,
            note: transaction.note,
            date: transaction.date?.split("T")[0] || "", // format YYYY-MM-DD
        });
    };


    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setEditData({
          type: "expense",
          amount: "",
          category: "",
          note: "",
          date: "",  
        });
    };

    // Save edit
    const handleUpdate = async (id) => {
        try {
            await axiosClient.put(`/transactions/${id}`, editData);
            fetchTransactions();
            cancelEdit();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    if (loading) return <p>Loading transactions...</p>

    
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3>Your Transactions</h3>
            {transactions.length === 0 ? (
                <p>No transaction yet.</p>
            ) : (
                <ul className="divide-y">
                    {transactions.map((t) => (
                        <li key={t.id} className="py-2">
                            {editingId === t.id ? (
                                // Edit note
                                <div className="space-y-2">
                                    <select
                                      value={editData.type}
                                      onChange={(e) => 
                                        setEditData({ ...editData, type: e.target.value })
                                      }
                                      className="border px-2 py-1 rounded"
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                    <input 
                                      type="number"
                                      value={editData.amount}
                                      onChange={(e) => 
                                        setEditData({ ...editData, amount: e.target.value })
                                      }
                                      className="border px-2 py-1 rounded w-24"
                                    />
                                    <input 
                                      type="text"
                                      value={editData.category}
                                      onChange={(e) =>
                                        setEditData({ ...editData, category: e.target.value })
                                      }
                                      className="border px-2 py-1 rounded w-32"
                                    />
                                    <input 
                                      type="text"
                                      value={editData.note}
                                      onChange={(e) => 
                                        setEditData({ ...editData, note: e.target.value })
                                      }
                                      placeholder="Optional"
                                      className="border px-2 py-1 rounded w-40"
                                    />
                                    <input 
                                      type="date"
                                      value={editData.date}
                                      onChange={(e) => 
                                        setEditData({ ...editData, date: e.target.value })
                                      }
                                      className="border px-2 py-1 rounded"
                                    />

                                    <div className="space-x-2 mt-2">
                                        <button
                                          onClick={() => handleUpdate(t.id)}
                                          className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                          onClick={cancelEdit}
                                          className="bg-gray-400 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View mode
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{t.category}</p>
                                        <p className="text-sm text-gray-500">
                                            {t.note || "-"} | {new Date(t.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span
                                          className={`font-semibold ${
                                            t.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                          }`}
                                        >
                                            {t.type === "income" ? "+" : "-"}${t.amount}
                                        </span>
                                        <button
                                          onClick={() => startEdit(t)}
                                          className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                          onClick={() => handleDelete(t.id)}
                                          className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;