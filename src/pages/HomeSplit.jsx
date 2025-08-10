import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook
import "./HomeSplit.css";
import HeroSection from "../Components/Hero";

export default function HomeSplit({ setIsLoggedIn }) {
  const { theme } = useTheme();
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
    // Conditionally add a 'dark-theme-home' class based on the current theme
    <div className={`page-background ${theme === 'dark' ? 'dark-theme-home' : ''}`}>
      <div className="overlay ">
        <div className="flex flex-col justify-center lg:flex-row items-center split-content">
          {/* Hero Section */}
          <HeroSection />
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
