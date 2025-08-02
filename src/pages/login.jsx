// const Login = () => {
//   return (
//     <div>
//       <h1>Hello From Login Page</h1>
//     </div>
//   );
// };

// export default Login;


import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeSplit from "./HomeSplit";
import "./HomeSplit.css";

export default function Login( ) {
  const nameInputRef = useRef(null);
  const navigate = useNavigate(); // ✅ use React Router for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStartPlanningClick = () => {
    if (isLoggedIn) {
      navigate("/HomeSplit"); // ⬅️ only navigate if signed in
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

          {/* Login Section */}
          <div className="signup-box">
            <form
              className="signup-form"
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
              }}
            >
              <h2>Login</h2>
              
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Create Account</button>
              {/* <br /> */}
              <p style={{ textAlign: "center" }}>
                Already have an Account ?{" "}
                <Link to="/" style={{ color: "blue" }}>
                  Sign Up
                </Link>
              </p>
            </form>
            {isLoggedIn && (
              <p className="success-message">LoggedIn successfully! <br />SignUp Now</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
