import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaPlane, FaUtensils, FaHotel, FaTags, FaBroom } from "react-icons/fa";
import Chart from "chart.js/auto";
import "./ExpenseTracker.css";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Travel");
  const [date, setDate] = useState("");
  const [showChart, setShowChart] = useState(false);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Load saved expenses
  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!item || !amount || !date) return;

    const newExpense = {
      item,
      amount: parseFloat(amount),
      category,
      date,
    };
    setExpenses([...expenses, newExpense]);
    setItem("");
    setAmount("");
    setCategory("Travel");
    setDate("");
  };

  const removeExpense = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  const clearAllExpenses = () => {
    if (window.confirm("Are you sure you want to clear all expenses?")) {
      setExpenses([]);
      setShowChart(false);
    }
  };

  const getChartData = () => {
    const grouped = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          label: "Expense by Category",
          data: Object.values(grouped),
          backgroundColor: ["#1e88e5", "#d81b60", "#43a047", "#8e24aa"],
        },
      ],
    };
  };

  useEffect(() => {
    if (!showChart || expenses.length === 0) return;

    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    const chartData = getChartData();

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        cutout: "60%",
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((value / total) * 100).toFixed(1);
                return `₹${value} (${percent}%)`;
              },
            },
          },
        },
      },
    });
  }, [showChart, expenses]);

  const getCategoryIcon = (cat) => {
    if (cat === "Travel") return <FaPlane />;
    if (cat === "Food") return <FaUtensils />;
    if (cat === "Stay") return <FaHotel />;
    return <FaTags />;
  };

  return (
    <div className="main">
      <div className="expense-form-wrapper">
        {/* ✅ Moved title inside the window */}
        <h2 className="page-title">💰 Expense Tracker</h2>

        <form onSubmit={addExpense} className="expense-form">
          <input
            type="text"
            placeholder="Expense item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Stay">Stay</option>
            <option value="Misc">Misc</option>
          </select>
          <button type="submit" disabled={!item || !amount || !date}>
            <FaPlus /> Add
          </button>
        </form>

        <h2 className="total-spent">Total Spent: ₹{total.toFixed(2)}</h2>

        <ul className="expense-list">
          <AnimatePresence>
            {expenses.map((exp, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <strong>{exp.item}</strong> – ₹{exp.amount} <br />
                  <small>{exp.date}</small>
                </div>
                <div className={`tag ${exp.category.toLowerCase()}`}>
                  {getCategoryIcon(exp.category)} {exp.category}
                </div>
                <button className="delete-btn" onClick={() => removeExpense(index)}>
                  <FaTrash />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {expenses.length > 0 && (
          <div className="button-group">
            <button
              className="analysis-btn"
              onClick={() => setShowChart(!showChart)}
            >
              {showChart ? "Hide Analysis" : "Show Analysis"}
            </button>

            <button className="clear-btn" onClick={clearAllExpenses}>
              <FaBroom /> Clear All
            </button>
          </div>
        )}
      </div>

      {expenses.length > 0 && showChart && (
        <div className="right-panel">
          <canvas ref={chartRef}></canvas>
        </div>
      )}
    </div>
  );
}
