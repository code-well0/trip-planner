import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Welcome Section */}
      <header className="landing-header">
        <h1>Welcome to YourTripPlanner</h1>
        <p>Plan your beautiful adventures, your way.</p>
      </header>

      {/* Image + Quote Sections */}
      <section className="section">
        <img src="/images/img1.jpg" alt="Solo Travel" />
        <div className="text">
          <h2>Solo Travel</h2>
          <p>Discover yourself one journey at a time.</p>
        </div>
      </section>

      <section className="section reverse">
        <img src="/images/img2.jpg" alt="Family Travel" />
        <div className="text">
          <h2>Family Adventures</h2>
          <p>Create stories that stay with you forever.</p>
        </div>
      </section>

      <section className="section">
        <img src="/images/img3.jpg" alt="Friends Trip" />
        <div className="text">
          <h2>Friends Exploring</h2>
          <p>Memories, laughter, and endless fun.</p>
        </div>
      </section>

      <section className="section reverse">
        <img src="/images/img4.jpg" alt="Couple Travel" />
        <div className="text">
          <h2>Romantic Getaways</h2>
          <p>Share unforgettable sunsets together.</p>
        </div>
      </section>

      <section className="section">
        <img src="/images/img5.jpg" alt="Beach Holidays" />
        <div className="text">
          <h2>Beach Escapes</h2>
          <p>Feel the waves, soak in the sunshine.</p>
        </div>
      </section>

      <section className="section reverse">
        <img src="/images/img6.jpg" alt="Mountain Trips" />
        <div className="text">
          <h2>Mountain Treks</h2>
          <p>Breathe in the fresh mountain air.</p>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <div className="final-message">
        <h2>
          If you want to plan for all these amazing trips, create an account on
          our website today!
        </h2>
      </div>

      {/* Features Section */}
      <h2 className="features-heading">Everything you need for traveling in one place..!</h2>
      
      <div className="features">
        <div className="feature-item">
          <img src="/images/expense.jpg" alt="Expense Tracker" />
          <p>Expense Tracker</p>
        </div>
        <div className="feature-item">
          <img src="/images/planner.jpg" alt="Trip Planner" />
          <p>Trip Planner</p>
        </div>
        <div className="feature-item">
          <img src="/images/chatbot.jpg" alt="AI Assistant" />
          <p>AI Travel Assistant</p>
        </div>
        <div className="feature-item">
          <img src="/images/recommender.jpg" alt="Trip Recommender" />
          <p>Trip Recommender</p>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;