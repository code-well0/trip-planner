
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";

import HomeSplit from "./pages/HomeSplit";
import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripRecommender from "./pages/TripRecommender";


import "./index.css";
import Footer from "./Components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />

      {/* 🧱 Add padding to prevent content being hidden behind navbar */}
      <div className="pt-20"> {/* Adjust based on navbar height */}
        <Routes>
          <Route path="/" element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/plan" element={isLoggedIn ? <PlanTrip /> : <Navigate to="/login" />} />
          <Route path="/expenses" element={isLoggedIn ? <ExpenseTracker /> : <Navigate to="/login" />} />
          <Route path="/api/chat" element={isLoggedIn ? <ChatBot /> : <Navigate to="/login" />} />
          <Route path="/TripRecommender" element={isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />} />
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
