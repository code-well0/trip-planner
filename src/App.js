
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LandingPage from "./pages/LandingPage"; // ✅ Import your landing page

import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripRecommender from "./pages/TripRecommender";

import "./index.css";
import Footer from "./Components/Footer";
import Signup from "./pages/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Add padding so content doesn't hide behind navbar */}
      <div className="pt-20">
        <Routes>
          {/* Landing Page as home */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth pages */}
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected pages */}
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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer isLoggedIn={isLoggedIn} />
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;