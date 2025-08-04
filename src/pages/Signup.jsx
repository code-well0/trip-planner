import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomeSplit.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name && form.email && form.password) {
      alert("Signup successful!");
      console.log("Signup Data:", form);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "20px auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <br /><br />
        <button type="submit">Signup</button>
      </form>
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <div className="hero-box">
            <h1>Start Your Journey</h1>
            <p>Sign up and get ready to explore the world with us!</p>
            <button>Explore Now →</button>
          </div>

          {/* Signup Section */}
          <div className="signup-box">
            <form className="signup-form" onSubmit={handleSubmit}>
              <h2>Sign Up</h2>

              <input
                type="text"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <label style={{ margin: "8px 0", fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  style={{ marginRight: "8px" }}
                />
                Show Password
              </label>

              <button type="submit">Create Account</button>

              <p style={{ textAlign: "center" }}>
                Already have an Account?{" "}
                <Link to="/login" style={{ color: "blue" }}>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}


