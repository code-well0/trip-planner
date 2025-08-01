import React, { useState } from "react";
import "./HomeSplit.css";
import { Colors } from "chart.js";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
    alert("Login successful!");
  };

return (
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <div className="hero-box">
            <h1>Plan Your Next Adventure</h1>
            <p>Discover amazing places and create unforgettable memories.</p>
            <button>Start Planning →</button>
          </div>

          {/* Signup Section */}
          <div className="signup-box">
            <form
              className="signup-form"
            >
              <h2>Login</h2>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Create Account</button>
              <p style={{ textAlign: "center" }}>
                Don't have an account ? <a href="/HomeSplit" style={{color : "blue"}}>Signup</a>
              </p>
            </form>
            {/* {isSignedIn && (
              <p className="success-message">Signed in successfully!</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
