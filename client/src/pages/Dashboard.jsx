import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import TransactionCharts from "../components/TransactionCharts.jsx";
import axiosClient from "../api/axiosClient.js";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [refresh, setRefresh] = useState(0);
    const [transactions, setTransactions] = useState([]);
   
    const fetchTransactions = async () => {
            try {
                const res = await axiosClient.get("/transactions");
                setTransactions(res.data);
            } catch (err) {
                console.error("Error fetching transactions:", err);
            }
        };

    useEffect(() => {
        fetchTransactions();        
    }, [refresh]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-md rounded p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h2>
                    <p className="text-gray-600 mb-4">Email: {user?.email}</p>
                    <button
                      onClick={logout}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                {/* NEW Summary */}
                <SummaryCards refresh={refresh} />
                
                {/* Charts */}
                <TransactionCharts transactions={transactions}/>

                 {/* Add Transaction */}
                <TransactionForm onAdd={() => setRefresh((prev) => prev + 1)} />

                {/* List Transactions */}
                <TransactionList refresh={refresh} onChange={() => setRefresh((p) => p + 1 )} />
            </div>
        </div>
    );
};

export default Dashboard;