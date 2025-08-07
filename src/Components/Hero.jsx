import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ navigateTo }) {
  const navigate = useNavigate();

  const handleStartPlanningClick = () => {
    navigate(navigateTo || "/login");  // Navigate to the given path or default to home
  };

  return (
   <><div className="hero-box">
            <h1>Plan Your Next Adventure</h1>
            <p>Discover amazing places and create unforgettable memories.</p>
            <button onClick={handleStartPlanningClick}>Start Planning →</button>
          </div></>
  );
}
