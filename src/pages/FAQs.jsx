import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "tripPlannerFaqs";

const initialFaqs = [
  {
    question: "What is Trip Planner?",
    answer:
      "It is a web app that helps you plan your trips easily and efficiently.",
  },
  {
    question: "How can I create a trip?",
    answer:
      "On the Home page, click the 'Create Trip' button and fill in your trip details.",
  },
  {
    question: "Can I share my trips?",
    answer: "Yes, you can share your trip link with others.",
  },
];

export default function FAQs() {
  const [faqs, setFaqs] = useState(() => {
    const savedFaqs = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedFaqs) {
      return JSON.parse(savedFaqs);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialFaqs));
      return initialFaqs;
    }
  });

  const [openIndex, setOpenIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // ✅ Save only when faqs change (no reset on reload)
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(faqs));
  }, [faqs]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAddFAQ = () => {
    if (newQuestion.trim() === "" || newAnswer.trim() === "") {
      alert("Please enter both a question and an answer.");
      return;
    }
    const updatedFaqs = [
      ...faqs,
      { question: newQuestion.trim(), answer: newAnswer.trim() },
    ];
    setFaqs(updatedFaqs);
    setNewQuestion("");
    setNewAnswer("");
    setOpenIndex(faqs.length);
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "3rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          color: "#2c3e50",
          fontWeight: "700",
        }}
      >
        FAQs - Frequently Asked Questions
      </h1>

      {faqs.map((faq, idx) => (
        <div
          key={idx}
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "1rem",
            overflow: "hidden",
            border: openIndex === idx ? "2px solid #3498db" : "1px solid #ddd",
            transition: "border-color 0.3s ease",
          }}
        >
          <button
            onClick={() => toggleFAQ(idx)}
            style={{
              width: "100%",
              background: openIndex === idx ? "#3498db" : "#f7f9fc",
              color: openIndex === idx ? "white" : "#2c3e50",
              cursor: "pointer",
              padding: "1rem 1.5rem",
              textAlign: "left",
              fontSize: "1.2rem",
              fontWeight: "600",
              border: "none",
              outline: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {faq.question}
            <span
              style={{
                transform: openIndex === idx ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                fontSize: "1.5rem",
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              +
            </span>
          </button>

          {openIndex === idx && (
            <div
              style={{
                padding: "1rem 1.5rem",
                backgroundColor: "#f9fbfd",
                color: "#34495e",
                fontSize: "1rem",
                lineHeight: 1.5,
                borderTop: "1px solid #ddd",
              }}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}

      {/* Add New FAQ Form */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          border: "2px solid #3498db",
          borderRadius: "8px",
          backgroundColor: "#f0f8ff",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#2980b9" }}>
          Submit Your Question
        </h2>
        <input
          type="text"
          placeholder="Enter your question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <textarea
          placeholder="Enter your answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            resize: "vertical",
            marginBottom: "1rem",
          }}
        />
        <button
          onClick={handleAddFAQ}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
          }}
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
