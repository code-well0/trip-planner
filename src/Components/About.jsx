import React from "react";
import './About.css';
import { useTheme } from '../contexts/ThemeContext';

export default function About(){
    const { theme } = useTheme();
    
    return (
       <div className={`about-container ${theme}`}>
          <div className={`about ${theme}`}>
            <h1>About your trip planner</h1>
            <div className="welcome">
                <p>YourTripPlanner was born from a simple idea—travel planning should be as exciting as the journey itself. Founded by a team of avid travelers and tech innovators, we noticed how overwhelming it can be to research destinations, compare routes, and stick to a budget. That's why we built a one-stop platform that combines smart technology with local expertise, making travel planning seamless, personalized, and fun.</p>
                <p>Whether you're dreaming of the golden deserts of Rajasthan, the lush tea gardens of Darjeeling, or the vibrant beaches of Goa, we're here to turn your travel dreams into reality—one smart plan at a time.</p>
            </div>
            <div className="choose">
                <h2>🌟 Why Choose Us?</h2>
                <ul className="list">
                    <li>🗺️ Curated Destinations: Explore handpicked Indian cities with rich cultural insights.</li>
                    <li>🔍 Smart Filters: Instantly find destinations by region (North, South, East, West).</li>
                    <li>🤖 AI Travel Assistant: Get real-time recommendations powered by Google Gemini 2.0 Flash for routes, hidden gems, and local tips.</li>
                    <li>💰 Budget-Friendly: Track expenses and plan trips without breaking the bank.</li>
                </ul>
                <h3>"We don't just build a tool—we craft experiences that make travel memorable."</h3>
                <p>We're a passionate team of travelers, developers, and designers who eat, sleep, and breathe travel. From coding seamless filters to testing AI recommendations, we're constantly innovating to make YourTripPlanner the most user-friendly and insightful travel companion.</p>
            </div>
            <div className="mission">
                <h2>✈️ Our Mission</h2>
                <p>At YourTripPlanner, we believe that travel planning should be effortless, personalized, and exciting. Our mission is to empower travelers with smart tools and AI-driven insights to discover the best of India's diverse destinations—from the snowy peaks of the Himalayas to the serene backwaters of Kerala.</p>
            </div>
          </div>
       </div>
    )
}