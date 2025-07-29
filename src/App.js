import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar"; // ✅ your navbar component
import HomeSplit from "./pages/HomeSplit";
import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import './index.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 login state

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} /> {/* ✅ navbar now knows if logged in */}
      <Routes>
        <Route path="/" element={<HomeSplit setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/plan"
          element={isLoggedIn ? <PlanTrip /> : <Navigate to="/" />}
        />
        <Route
          path="/expenses"
          element={isLoggedIn ? <ExpenseTracker /> : <Navigate to="/" />}
        />

        <Route
          path="/api/chat"
          element={isLoggedIn ? <ChatBot /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
