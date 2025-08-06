import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { FaRupeeSign, FaChartPie, FaChartBar } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#ffbb28'];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Travel');
  const [label, setLabel] = useState('');
  const [chartType, setChartType] = useState('pie');

  const handleAddExpense = () => {
    if (item && amount && date && category) {
      setExpenses([...expenses, { item, amount: parseFloat(amount), date, category, label: label || category }]);
      setItem('');
      setAmount('');
      setDate('');
      setCategory('Travel');
      setLabel('');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold flex items-center justify-center gap-3 text-center mb-4">
          <FaMoneyBillWave className="text-green-600 text-4xl" />
          Expense Tracker
        </h1>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Expense item"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
          <input
            type="date"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
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

        <h2 className="text-xl font-semibold mt-8 text-center">Total Spent: ₹{totalSpent.toFixed(2)}</h2>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {chartType === 'pie' ? <FaChartPie /> : <FaChartBar />} Analysis
            </h3>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:outline-none"
            >
              <option value="pie">Pie Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>

          <div className="h-80 bg-white rounded-xl shadow-md p-4">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                </PieChart>
              ) : (
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold mb-3">Expense List</h3>
          <ul className="space-y-2">
            {expenses.map((exp, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
              >
                <div>
                  <p className="font-medium">{exp.item} ({exp.label})</p>
                  <p className="text-sm text-gray-500">{exp.date}</p>
                </div>
                <span className="font-semibold text-green-600">₹{exp.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
