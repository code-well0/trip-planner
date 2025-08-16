import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useTheme } from "./contexts/ThemeContext";


import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripRecommender from "./pages/TripRecommender";
import TermsOfService from "./pages/terms";
import ActivityPlanner from "./pages/ActivityPlanner";
import PlanTrip from "./pages/PlanTrip";

import "./index.css";
import Footer from "./Components/Footer";
import Signup from "./pages/Signup";
import { InterestedProvider } from './contexts/InterestedContext';
import Interested from "./pages/interested";
import TripDetails from "./pages/TripDetails";
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
      <Navbar isLoggedIn={isLoggedIn} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 🧱 Add padding to prevent content being hidden behind navbar */}
      <div className="pt-20 flex-grow">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/plan" element={isLoggedIn ? <PlanTrip searchQuery={searchQuery} /> : <Navigate to="/login" />} />
          <Route path="/plan/:id" element={isLoggedIn ? <TripDetails /> : <Navigate to="login" />} />        
           <Route path="/activity-planner" element={isLoggedIn ? <ActivityPlanner /> : <Navigate to="/login" />} /> 

          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

          <Route path="/terms" element={ <TermsOfService/>} />
          <Route path="*" element={<Navigate to="/" />} />
            <Route
  path="/interested"
  element={isLoggedIn ? <Interested /> : <Navigate to="/login" />}
/>
        </Routes>
      </div>
      <Footer isLoggedIn={isLoggedIn} />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    
      {/* Your routes/components here */}
    
    </div>
    </InterestedProvider>
  );
}


export default App;
