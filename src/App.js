
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";

import HomeSplit from "./pages/HomeSplit";
import Home from "./pages/Home";
import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import Profile from "./pages/Profile";
import TripRecommender from "./pages/TripRecommender";

import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 Global login state
  const location = useLocation();

  // Check if user is already logged in on app load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Define pages that should NOT show the navbar
  const noNavbarPages = ['/', '/login'];
  const showNavbar = !noNavbarPages.includes(location.pathname);

  return (
    <>
      {/* Show navbar only on certain pages */}
      {showNavbar && <Navbar isLoggedIn={isLoggedIn} />}

      <div className={showNavbar ? "main-content with-navbar" : "main-content no-navbar"}>

      <Routes>
        {/* Landing/Signup page */}
        <Route
          path="/"
          element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Home page (dummy) */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />

        {/* Login page */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Protected routes */}
        <Route
          path="/plan"
          element={isLoggedIn ? <PlanTrip /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses"
          element={isLoggedIn ? <ExpenseTracker /> : <Navigate to="/login" />}
        />
        <Route
          path="/api/chat"
          element={isLoggedIn ? <ChatBot /> : <Navigate to="/login" />}
        />
        <Route
          path="/trip-recommender"
          element={isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Fallback route (optional) */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
      </div>
    </>
  );
}

export default App;

