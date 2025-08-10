import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { FaChartPie, FaChartBar, FaTrash, FaBroom, FaMoneyBillWave } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#ffbb28"];

const ExpenseTracker = () => {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Travel");
  const [label, setLabel] = useState("");
  const [chartType, setChartType] = useState("pie");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddExpense = () => {
    if (item && amount && date && category) {
      setExpenses([
        ...expenses,
        {
          item,
          amount: parseFloat(amount),
          date,
          category,
          label: label || category,
        },
      ]);
      setItem("");
      setAmount("");
      setDate("");
      setCategory("Travel");
      setLabel("");
    }
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setShowConfirm(true);
  };
  
  const confirmClearAll = () => {
    setExpenses([]);
    setShowConfirm(false);
  };
  
  const cancelClearAll = () => {
    setShowConfirm(false);
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const data = Object.values(
    expenses.reduce((acc, expense) => {
      const key = expense.label;
      if (!acc[key]) acc[key] = { name: key, value: 0 };
      acc[key].value += expense.amount;
      return acc;
    }, {})
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-purple-100 to-blue-100 text-gray-900'} p-4 transition-colors duration-300`}>
      <div className={`max-w-3xl mx-auto rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-3xl font-extrabold flex items-center justify-center gap-3 text-center mb-4">
          <FaMoneyBillWave className="text-green-600 text-4xl dark:text-green-400" />
          Expense Tracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Expense item"
            className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
          <input
            type="date"
            className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Lodging">Lodging</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Label (optional)"
            className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <button
            onClick={handleAddExpense}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition"
          >
            + Add
          </button>
        </div>

        <h2 className="text-xl font-semibold mt-8 text-center">
          Total Spent: ₹{totalSpent.toFixed(2)}
        </h2>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {chartType === "pie" ? <FaChartPie /> : <FaChartBar />} Analysis
            </h3>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className={`p-2 rounded-md border focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="pie">Pie Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>

          <div className={`h-80 rounded-xl shadow-md p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "pie" ? (
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                </PieChart>
              ) : (
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">Expense List</h3>
            {expenses.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm transition"
              >
                <FaBroom /> Clear All
              </button>
            )}
          </div>

          <ul className="space-y-2">
            {expenses.map((exp, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div>
                  <p className="font-medium">
                    {exp.item} ({exp.label})
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ₹{exp.amount}
                  </span>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h4 className="text-lg font-bold mb-4">Confirm Clear All</h4>
            <p>Are you sure you want to clear all expenses? This cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={cancelClearAll} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition">
                Cancel
              </button>
              <button onClick={confirmClearAll} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;

