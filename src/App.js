import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import { useTheme } from "./contexts/ThemeContext";

import DestinationPage from "./pages/DestinationPage";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import Home from "./pages/Home"; // ✅ New Public Landing Page
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripRecommender from "./pages/TripRecommender";
import TermsOfService from "./pages/terms";
import ActivityPlanner from "./pages/ActivityPlanner";
import PlanTrip from "./pages/PlanTrip";

import AboutUs from "./pages/AboutUs";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";

import "./index.css";
import Footer from "./Components/Footer";
import Signup from "./pages/Signup";
import { InterestedProvider } from "./contexts/InterestedContext";
import Interested from "./pages/interested";
import Dashboard from "./pages/Dashboard"; // ✅ renamed HomeSplit → Dashboard

function App() {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Persist login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <InterestedProvider>
      <div
        className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen ${theme}`}
      >
        <Navbar
          isLoggedIn={isLoggedIn}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="pt-20 flex-grow">
          <Routes>
            {/* Public Homepage */}
            <Route path="/" element={<Home />} />

            {/* Auth Pages */}
            <Route
              path="/signup"
              element={
                !isLoggedIn ? (
                  <Signup setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />

            {/* After login → Dashboard */}
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <Dashboard setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Main Features */}
            <Route
              path="/plan"
              element={
                isLoggedIn ? (
                  <PlanTrip searchQuery={searchQuery} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/expenses"
              element={
                isLoggedIn ? <ExpenseTracker /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/api/chat"
              element={isLoggedIn ? <ChatBot /> : <Navigate to="/login" />}
            />
            <Route
              path="/TripRecommender"
              element={
                isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/activity-planner"
              element={
                isLoggedIn ? <ActivityPlanner /> : <Navigate to="/login" />
              }
            />

            {/* User Profile */}
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/interested"
              element={isLoggedIn ? <Interested /> : <Navigate to="/login" />}
            />

            {/* Static Pages */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Destination Pages */}
            <Route path="/destinations/:id" element={<DestinationPage />} />

            {/* Fallback */}
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