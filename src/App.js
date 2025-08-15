import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useTheme } from "./contexts/ThemeContext";
import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripRecommender from "./pages/TripRecommender";
import TermsOfService from "./pages/terms";
import ActivityPlanner from "./pages/ActivityPlanner";
import Footer from "./Components/Footer";
import { InterestedProvider } from "./contexts/InterestedContext";
import Interested from "./pages/interested";
import HomeSplit from "./pages/HomeSplit"; // Added for your branch

function App() {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <InterestedProvider>
      <div className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen ${theme}`}>
        {/* Navbar with props from both branches */}
        <Navbar isLoggedIn={isLoggedIn} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Add padding to prevent content being hidden behind navbar */}
        <div className="pt-20 flex-grow">
          <Routes>
            {/* Root route: Use HomeSplit from your branch for logged-in users, Signup for non-logged-in */}
            <Route
              path="/"
              element={isLoggedIn ? <HomeSplit setIsLoggedIn={setIsLoggedIn} /> : <Signup setIsLoggedIn={setIsLoggedIn} />}
            />

            {/* Login page */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

            {/* Signup page */}
            <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />

            {/* Protected routes */}
            <Route
              path="/plan"
              element={isLoggedIn ? <PlanTrip searchQuery={searchQuery} /> : <Navigate to="/login" />}
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
              path="/TripRecommender"
              element={isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />}
            />
            <Route
              path="/activity-planner"
              element={isLoggedIn ? <ActivityPlanner /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/interested"
              element={isLoggedIn ? <Interested /> : <Navigate to="/login" />}
            />

            {/* Terms page (public) */}
            <Route path="/terms" element={<TermsOfService />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Footer isLoggedIn={isLoggedIn} />

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          pauseOnHover
          theme="colored"
        />
      </div>
    </InterestedProvider>
  );
}

export default App;