import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import Navbar from "./Components/Navbar";
import HomeSplit from "./pages/HomeSplit";
import PlanTrip from "./pages/PlanTrip";
import ExpenseTracker from "./pages/ExpenseTracker";
import ChatBot from "./pages/Chatbot";
import Login from "./pages/login";
import TripRecommender from "./pages/TripRecommender";

import "./index.css";



function App() {
  return (
    <>
      {/* Navbar shows login/logout based on Clerk's SignedIn/SignedOut */}
      <Navbar />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<HomeSplit />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <PlanTrip />
            </ProtectedRoute>
          }
        />
         <Route
          path="/TripRecommender"
          element={isLoggedIn ? <TripRecommender /> : <Navigate to="/login" />}
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpenseTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/api/chat"
          element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          }
        />

        {/* ❌ 404 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
