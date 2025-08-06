import React, { useState } from "react";
import data from "../data";
import "../index.css";
import "../Components/Navbar.css";
import "../Components/tripRecommender.css";

export default function TripRecommender() {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const moods = ["Relaxing", "Adventurous", "Spiritual", "Party"];
  const purposes = ["Solo detox", "Nature walk", "Family outing", "Weekend escape"];

  const handleFilter = () => {
    const filtered = data.filter((place) => {
      const moodMatch = selectedMood ? place.moodTags.includes(selectedMood) : true;
      const purposeMatch = selectedPurpose ? place.purposeTags.includes(selectedPurpose) : true;
      return moodMatch && purposeMatch;
    });

    setRecommendations(filtered.slice(0, 5));
  };

  return (
    <div className="trip-recommender">
      <h2>🌍 Trip Recommender</h2>

      <div className="filters">
        <label>Mood:</label>
        <select value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)}>
          <option value="">--Select Mood--</option>
          {moods.map((mood, i) => (
            <option key={i} value={mood}>
              {mood}
            </option>
          ))}
        </select>

        <label>Purpose:</label>
        <select value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)}>
          <option value="">--Select Purpose--</option>
          {purposes.map((purpose, i) => (
            <option key={i} value={purpose}>
              {purpose}
            </option>
          ))}
        </select>

        <button onClick={handleFilter}>Find Trips</button>
      </div>

      <div className="results">
        {recommendations.length > 0 ? (
          recommendations.map((place) => (
            <div key={place.id} className="place-card">
              <div className="card">
                <img className="cityImage" src={place.image} alt={place.name} />
                <div className="tourInfo">
                  <div className="tourDetails">
                    <h4 className="tourPrice">{place.price}</h4>
                    <h4 className="tourCityName">
                      {place.emoji} {place.name}
                      <span style={{ fontSize: '0.8rem', color: '#888' }}> ({place.region})</span>
                    </h4>
                  </div>
                  <p>{place.info}</p>
                  <small>Mood: {place.moodTags?.join(", ")}</small><br />
                  <small>Purpose: {place.purposeTags?.join(", ")}</small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recommendations yet. Choose mood and purpose above.</p>
        )}
      </div>
    </div>
  );
}
