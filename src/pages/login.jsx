import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomeSplit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../Components/Hero";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      setIsLoggedIn(true);
      setIsLoggedInLocal(true);
      toast.success("Login successful!");
      navigate("/plan");
    } else {
      toast.error("Please enter email and password");
    }
  };

  return (
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <HeroSection/>

          {/* Login Section */}
          <div className="signup-box">
            <form className="signup-form" onSubmit={handleLogin}>
              <h2>Login</h2>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label style={{ display: "block", marginTop: "8px" }}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  style={{ marginRight: "5px" }}
                />
                Show Password
              </label>

              <button type="submit">Login</button>

              <p style={{ textAlign: "center" }}>
                Don't have an Account?{" "}
                <Link to="/" style={{ color: "blue" }}>
                  Sign Up
                </Link>
              </p>
            </form>
            {isLoggedInLocal && (
              <p className="success-message">LoggedIn successfully</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
