import React, { useState } from 'react';
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
} from 'recharts';
import { FaChartPie, FaChartBar, FaTrash, FaBroom, FaMoneyBillWave, FaTimes } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#ffbb28'];

// Custom Modal Component for confirmation
const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80 max-w-full transform transition-all">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{message}</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpenseTracker = () => {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Travel');
  const [label, setLabel] = useState('');
  const [chartType, setChartType] = useState('pie');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setItem('');
      setAmount('');
      setDate('');
      setCategory('Travel');
      setLabel('');
    }
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setExpenses([]);
    setIsModalOpen(false);
  };
  
  // Custom confirmation logic
  const confirmClearAll = () => {
    setIsModalOpen(true);
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
    <div className={`min-h-screen p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-100 to-blue-100'}`}>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleClearAll}
        onCancel={() => setIsModalOpen(false)}
        message="Are you sure you want to clear all expenses?"
      />
      <div className="max-w-3xl mx-auto rounded-2xl shadow-xl p-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="text-3xl font-extrabold flex items-center justify-center gap-3 text-center mb-6 text-gray-900 dark:text-white">
          <FaMoneyBillWave className="text-green-600 dark:text-green-400 text-4xl" />
          Expense Tracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Expense item"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
          <input
            type="date"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={date}
            max={new Date().toISOString().split('T')[0]} 
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
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
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
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

        <h2 className="text-xl font-semibold mt-8 text-center text-gray-800 dark:text-gray-200">
          Total Spent: ₹{totalSpent.toFixed(2)}
        </h2>

      {expenses.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
              {chartType === 'pie' ? <FaChartPie /> : <FaChartBar />} Analysis
            </h3>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none"
            >
              <option value="pie">Pie Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>

          <div className="h-80 bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 transition-colors duration-300">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'pie' ? (
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
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                </PieChart>
              ) : (
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke={theme === 'dark' ? '#f3f4f6' : '#6b7280'} />
                  <YAxis stroke={theme === 'dark' ? '#f3f4f6' : '#6b7280'} />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}


        <div className="mt-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Expense List</h3>
            {expenses.length > 0 && (
              <button
                onClick={confirmClearAll}
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
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
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
                    className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200"
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
    </div>
  );
};

export default ExpenseTracker;
