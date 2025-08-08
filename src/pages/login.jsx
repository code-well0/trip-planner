import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomeSplit.css";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      // Simple validation - in a real app you'd validate against a database
      // For demo purposes, accept any email/password combination
      
      // Extract name from email (simple approach)
      const name = email.split('@')[0].replace(/[0-9]/g, '').replace(/[._]/g, ' ');
      const capitalizedName = name.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Store user data
      const userData = {
        name: capitalizedName || "User",
        email: email,
        isGuest: false, // Regular user
        joinDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
      
      // Initialize trip stats with some sample data for existing user
      const tripStats = {
        totalTrips: Math.floor(Math.random() * 5) + 1, // Random for demo
        upcomingTrips: Math.floor(Math.random() * 3),
        completedTrips: Math.floor(Math.random() * 3),
        totalExpenses: Math.floor(Math.random() * 50000) + 10000,
        favoriteDestination: 'Goa'
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('tripStats', JSON.stringify(tripStats));
      localStorage.setItem('isAuthenticated', 'true');
      
      setIsLoggedIn(true);
      navigate("/home");
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
              
              {/* Continue as Guest Option */}
              <button 
                type="button" 
                onClick={() => {
                  // Auto-create a guest account
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
                  navigate("/home");
                }}
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
