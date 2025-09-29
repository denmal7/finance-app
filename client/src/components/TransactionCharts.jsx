import {
    PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#16a34a", "#dc2626", "#3b82f6", "#f59e0b", "#9333ea"];

const TransactionCharts = ({ transactions }) => {
    // --- Pie Chart: Breakdown by category (expenses only) ---
    const expenseData = transactions
       .filter((t) => t.type === "expense")
       .reduce((acc, t) => {
          const existing = acc.find((a) => a.name === t.category);
          if (existing) {
            existing.value += Number(t.amount);
          } else {
            acc.push({ name: t.category, value: Number(t.amount) })
          }
          return acc;
       }, []);

    // --- Line Chart: income vs expenses over time ---
    const lineData = transactions.reduce((acc, t) => {
        const date = new Date(t.date).toLocaleDateString("en-GB", {
            month: "short",
            day: "numeric",
        });

        let existing = acc.find((a) => a.date === date);
        if (!existing) {
            existing = { date, income: 0, expense: 0 };
            acc.push(existing);
        }

        if (t.type === "income") {
            existing.income += Number(t.amount);
        } else {
            existing.expense += Number(t.amount);
        }

        return acc;
    }, []);


    return (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Pie Chart */}
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
                {expenseData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                               data={expenseData}
                               cx="50%"
                               cy="50%"
                               labelLine={false}
                               label={({ name, percent }) => 
                                 `${name}: ${(percent * 100).toFixed(0)}%`
                               }
                               outerRadius={120}
                               dataKey="value"
                            >
                                {expenseData.map((_, index) => (
                                    <Cell 
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500">No expense data yet.</p>
                )}
            </div>

            {/* Line Chart */}
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
                {lineData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#16a34a" />
                            <Line type="monotone" dataKey="expense" stroke="#dc2626" />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500">No transaction history yet.</p>
                )}
            </div>
        </div>
    );
};

export default TransactionCharts;