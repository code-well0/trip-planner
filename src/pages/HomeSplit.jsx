import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSplit.css";

export default function HomeSplit({ setIsLoggedIn }) {
  const nameInputRef = useRef(null);
  const navigate = useNavigate(); // ✅ use React Router for navigation

  const handleStartPlanningClick = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
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
                setIsLoggedIn(true); // ✅ stays active
                navigate("/plan");   // ✅ no reload!
              }}
            >
              <h2>Sign Up</h2>
              <input ref={nameInputRef} type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
