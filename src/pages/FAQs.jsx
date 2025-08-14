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
  const [editIndex, setEditIndex] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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
    setOpenIndex(updatedFaqs.length - 1);
  };

  // Open snackbar to confirm delete
  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setSnackbarOpen(true);
  };

  // Actually delete the FAQ after confirm
  const handleDelete = () => {
    if (deleteIndex === null) return;
    const updatedFaqs = faqs.filter((_, i) => i !== deleteIndex);
    setFaqs(updatedFaqs);
    if (openIndex === deleteIndex) setOpenIndex(null);
    if (editIndex === deleteIndex) setEditIndex(null);
    setDeleteIndex(null);
    setSnackbarOpen(false);
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
    setSnackbarOpen(false);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditQuestion(faqs[index].question);
    setEditAnswer(faqs[index].answer);
    setOpenIndex(null);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const saveEdit = () => {
    if (editQuestion.trim() === "" || editAnswer.trim() === "") {
      alert("Please enter both question and answer.");
      return;
    }
    const updatedFaqs = faqs.map((faq, i) =>
      i === editIndex
        ? { question: editQuestion.trim(), answer: editAnswer.trim() }
        : faq
    );
    setFaqs(updatedFaqs);
    setEditIndex(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "3rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
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
          {/* If editing this FAQ */}
          {editIndex === idx ? (
            <div
              style={{
                padding: "1rem 1.5rem",
                backgroundColor: "#f9fbfd",
                color: "#34495e",
              }}
            >
              <input
                type="text"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem",
                  fontSize: "1.1rem",
                  marginBottom: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                  resize: "vertical",
                  marginBottom: "0.75rem",
                }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={saveEdit}
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    backgroundColor: "#ccc",
                    color: "#333",
                    padding: "0.5rem 1.5rem",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
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
                    transform:
                      openIndex === idx ? "rotate(45deg)" : "rotate(0deg)",
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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>{faq.answer}</div>
                  <div style={{ marginLeft: "1rem", whiteSpace: "nowrap" }}>
                    <button
                      onClick={() => startEdit(idx)}
                      style={{
                        backgroundColor: "#2980b9",
                        color: "white",
                        border: "none",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(idx)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </>
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

      {/* Snackbar for Delete Confirmation */}
      {snackbarOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#333",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            zIndex: 1000,
            minWidth: "300px",
            justifyContent: "space-between",
          }}
        >
          <span>Are you sure you want to delete this FAQ?</span>
          <div>
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "#e74c3c",
                border: "none",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                marginRight: "0.5rem",
              }}
            >
              Confirm
            </button>
            <button
              onClick={cancelDelete}
              style={{
                backgroundColor: "#555",
                border: "none",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
