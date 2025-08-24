import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
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

function App() {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState("");

  //issue fix for persisting login state

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setIsLoggedIn(true);
      } else {
        
        setIsLoggedIn(false);
      }
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
      <div className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen ${theme}`}>
        <Navbar isLoggedIn={isLoggedIn} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="pt-20 flex-grow">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Signup setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={!isLoggedIn ? <Signup setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
            <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
            <Route path="/plan" element={isLoggedIn ? <PlanTrip searchQuery={searchQuery} /> : <Navigate to="/login" />} />
            <Route path="/expenses" element={isLoggedIn ? <ExpenseTracker /> : <Navigate to="/login" />} />
            <Route path="/api/chat" element={isLoggedIn ? <ChatBot /> : <Navigate to="/login" />} />
            <Route path="/TripRecommender" element={isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />} />
            <Route path="/activity-planner" element={isLoggedIn ? <ActivityPlanner /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/interested" element={isLoggedIn ? <Interested /> : <Navigate to="/login" />} />
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