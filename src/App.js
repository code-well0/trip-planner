
import React, { useState } from "react";

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useTheme } from "./contexts/ThemeContext";

import HomeSplit from "./pages/HomeSplit";

import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripRecommender from "./pages/TripRecommender";

import FAQs from "./pages/FAQs";
import ActivityPlanner from "./pages/ActivityPlanner";

import "./index.css";
import Footer from "./Components/Footer";
import Signup from "./pages/Signup";

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

    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 🧱 Add padding to prevent content being hidden behind navbar */}
      <div className="pt-20">
        {/* Adjust based on navbar height */}
        <Routes>
          {/* <Route path="/" element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />} /> */}
          {/* <Route path="/" element={<><HomeSplit setIsLoggedIn={setIsLoggedIn}/><Signup setIsLoggedIn={setIsLoggedIn} /> </>} /> */}
          <Route
            path="/"
            element={
              <>
                <Signup setIsLoggedIn={setIsLoggedIn} />
              </>
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
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
            path="/home"
            element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />}
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
            element={
              isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />
            }
          />
          <Route path="/faqs" element={<FAQs />} />
    <div className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen ${theme}`}>
      <Navbar isLoggedIn={isLoggedIn} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 🧱 Add padding to prevent content being hidden behind navbar */}
      <div className="pt-20 flex-grow">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/plan" element={isLoggedIn ? <PlanTrip searchQuery={searchQuery} /> : <Navigate to="/login" />} />
          <Route path="/expenses" element={isLoggedIn ? <ExpenseTracker /> : <Navigate to="/login" />} />
          <Route path="/api/chat" element={isLoggedIn ? <ChatBot /> : <Navigate to="/login" />} />
          <Route path="/TripRecommender" element={isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />} />

           <Route path="/activity-planner" element={isLoggedIn ? <ActivityPlanner /> : <Navigate to="/login" />} /> 

          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

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
  );
}

export default App;
