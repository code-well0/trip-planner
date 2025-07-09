import React, { useState, useRef, useEffect } from "react";
import "./ExpenseTracker.css";
import Chart from "chart.js/auto";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Travel");
  const [showChart, setShowChart] = useState(false);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const addExpense = (e) => {
    e.preventDefault();
    if (!item || !amount) return;

    const newExpense = {
      item,
      amount: parseFloat(amount),
      category,
    };
    setExpenses([...expenses, newExpense]);
    setItem("");
    setAmount("");
    setCategory("Travel");
  };

  const removeExpense = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
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
          backgroundColor: ["#a5d6a7", "#ffe082", "#80cbc4", "#ef9a9a"],
        },
      ],
    };
  };

  useEffect(() => {
    if (!showChart || expenses.length === 0) return;

    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    const chartData = getChartData();
    const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw;
                const percent = ((value / total) * 100).toFixed(1);
                return `${label}: ₹${value} (${percent}%)`;
              },
            },
          },
        },
      },
    });
  }, [showChart, expenses]);

  return (
    <>
      

      <div className="main">
        <div className="expense-form-wrapper">
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Stay">Stay</option>
              <option value="Misc">Misc</option>
            </select>
            <button type="submit">➕ Add</button>
          </form>

          <h2 className="total-spent">Total Spent: ₹{total.toFixed(2)}</h2>

          <ul className="expense-list">
            {expenses.map((exp, index) => (
              <li key={index}>
                <span className="item">{exp.item}</span>
                <span className="amount">₹{exp.amount}</span>
                <span className={`tag ${exp.category.toLowerCase()}`}>
                  {exp.category}
                </span>
                <button onClick={() => removeExpense(index)}>❌</button>
              </li>
            ))}
          </ul>

          {expenses.length > 0 && (
            <button
              className="analysis-btn"
              onClick={() => setShowChart(!showChart)}
            >
              {showChart ? "Hide Analysis" : "Show Analysis"}
            </button>
          )}
        </div>

        <div className={`right-panel ${!showChart ? "hidden" : ""}`}>
          {expenses.length > 0 && <canvas ref={chartRef}></canvas>}
        </div>
      </div>
    </>
  );
}
