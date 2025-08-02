import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomeSplit.css";

export default function Login({setIsLoggedIn}) {
  // const nameInputRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      setIsLoggedIn(true);
      navigate("/plan");
    } else {
      alert("Please enter email and password");
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
            <button>Start Planning →</button>
          </div>

          {/* Login Section */}
          <div className="signup-box">
            <form
              className="signup-form"
              onSubmit={handleLogin}
            >
              <h2>Login</h2>
              
             <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              {/* <br /> */}
              <p style={{ textAlign: "center" }}>
                Don't have an Account ?{" "}
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
    </div>
  );
}
