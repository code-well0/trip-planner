import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomeSplit.css";
import Login from "./login";

export default function HomeSplit({ setIsLoggedIn }) {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate(); // ✅ use React Router for navigation
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleStartPlanningClick = () => {
    if (isSignedIn) {
      navigate("/plan"); // ⬅️ only navigate if signed in
    } else {
      // Auto-create a guest account and log them in
      const userData = {
        name: "Guest User",
        email: "guest@tripplanner.com",
        isGuest: true, // Add guest flag
        joinDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
      
      // Initialize trip stats for guest user
      const tripStats = {
        totalTrips: 0,
        upcomingTrips: 0,
        completedTrips: 0,
        totalExpenses: 0,
        favoriteDestination: 'Not set'
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('tripStats', JSON.stringify(tripStats));
      localStorage.setItem('isAuthenticated', 'true');
      
      setIsLoggedIn(true);
      setIsSignedIn(true);
      navigate("/home"); // Take them directly to home
    }
  };

  return (
    <div className="page-background">
      <div className="overlay">
        <div className="split-content">
          {/* Hero Section */}
          <div className="hero-box">
            <h1>Plan Your Next Adventure</h1>
            <p>Discover amazing places and create unforgettable memories. Start planning instantly!</p>
            <button onClick={handleStartPlanningClick}>Start Planning Now →</button>
          </div>

          {/* Signup Section */}
          <div className="signup-box">
            <form
              className="signup-form"
              onSubmit={(e) => {
                e.preventDefault();
                
                // Get form data
                const name = nameInputRef.current.value;
                const email = emailInputRef.current.value;
                const password = passwordInputRef.current.value;
                
                // Store user data in localStorage
                const userData = {
                  name: name || "New User",
                  email: email,
                  isGuest: false, // Regular user
                  joinDate: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                };
                
                // Initialize trip stats for new user
                const tripStats = {
                  totalTrips: 0,
                  upcomingTrips: 0,
                  completedTrips: 0,
                  totalExpenses: 0,
                  favoriteDestination: 'Not set'
                };
                
                localStorage.setItem('userData', JSON.stringify(userData));
                localStorage.setItem('tripStats', JSON.stringify(tripStats));
                localStorage.setItem('isAuthenticated', 'true');
                
                setIsLoggedIn(true);
                setIsSignedIn(true); // ✅ stays active
                navigate("/home"); // ✅ Navigate to home page after signup!
              }}
            >
              <h2>Sign Up</h2>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Name"
                required
              />
              <input 
                ref={emailInputRef}
                type="email" 
                placeholder="Email" 
                required 
              />
              <input 
                ref={passwordInputRef}
                type="password" 
                placeholder="Password" 
                required 
              />
              <button type="submit">Create Account</button>
              
              {/* Skip Sign Up Option */}
              <button 
                type="button" 
                onClick={handleStartPlanningClick}
                style={{
                  marginTop: "10px",
                  backgroundColor: "transparent",
                  border: "1px solid #ccc",
                  color: "#666",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Continue as Guest
              </button>
              
              {/* <br /> */}
              <p style={{ textAlign: "center" }}>
                Already have an Account ?{" "}
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
