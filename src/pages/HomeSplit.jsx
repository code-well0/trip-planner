
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./HomeSplit.css";

export default function HomeSplit({ setIsLoggedIn }) {
  const navigate = useNavigate();

import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HomeSplit.css";
import HeroSection from "../Components/Hero";

export default function HomeSplit({ setIsLoggedIn }) {
  const nameInputRef = useRef(null);
  const navigate = useNavigate();


  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleStartPlanningClick = () => {

    if (isSignedIn) {
      navigate("/plan");
    } else {
      alert("Please sign up first!");
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoggedIn(true);
      setIsSignedIn(true);
      console.log("Signed up successfully:", form);
      // navigate("/plan"); // Optional redirect
    }
  };

  return (
    <div className="page-background">
      <div className="overlay ">
        <div className="flex flex-col  justify-center lg:flex-row  items-center split-content">
          {/* Hero Section */}
          <HeroSection />
          {/* Signup Section */}
          <div className="signup-box">

            <form className="signup-form" onSubmit={handleSubmit}>

            <form className="signup-form" onSubmit={handleSignup}>

              <h2>Sign Up</h2>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}

              <input
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error">{errors.password}</div>}

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


            {isSignedIn && (
              <p className="success-message">Signed in successfully!</p>
            )}

          </div>
        </div>
      </div>

      {/* Toast Container */}
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
