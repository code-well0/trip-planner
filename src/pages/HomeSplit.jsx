import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./HomeSplit.css";

export default function HomeSplit({ setIsLoggedIn }) {
  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ Control password visibility

  const handleStartPlanningClick = () => {
    if (isSignedIn) {
      navigate("/plan");
    } else {
      alert("Please sign up first!");
    }
  };

  return (
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <div className="hero-box">
            <h1>Plan Your Next Adventure</h1>
            <p>Discover amazing places and create unforgettable memories.</p>
            <button onClick={handleStartPlanningClick}>Start Planning →</button>
          </div>

          {/* Signup Section */}
          <div className="signup-box">
            <form
              className="signup-form"
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setIsSignedIn(true);
              }}
            >
              <h2>Sign Up</h2>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Name"
                required
              />
              <input type="email" placeholder="Email" required />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />

              {/* ✅ Show Password Toggle */}
              <label style={{ fontSize: "14px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
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

            {isSignedIn && (
              <p className="success-message">Signed in successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
