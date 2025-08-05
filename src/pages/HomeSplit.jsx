import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HomeSplit.css";

export default function HomeSplit({ setIsLoggedIn }) {
  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleStartPlanningClick = () => {
  if (isSignedIn) {
    navigate("/plan");
  } else {
    toast.error("Please sign up first!");
  }
};


  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsSignedIn(true);
    toast.success("Signed up successfully!");
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
            <form className="signup-form" onSubmit={handleSignup}>
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

              <label
                style={{
                  fontSize: "14px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
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
          </div>
        </div>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
