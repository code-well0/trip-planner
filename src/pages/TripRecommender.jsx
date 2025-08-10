import React, { useState } from "react";
import { FaGlobeAsia, FaSearch, FaCompass } from "react-icons/fa";
import data from "../data";
import { useTheme } from "../context/ThemeContext";
import "../Components/tripRecommender.css";

export default function TripRecommender() {
  const { theme } = useTheme();
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
    <div className={`trip-recommender-container ${theme === 'dark' ? 'dark-theme-recommender' : ''}`}>
      <div className="trip-recommender-header">
        <h2 className="trip-recommender-title">
          <FaGlobeAsia className="trip-recommender-icon" />
          Trip Recommender
        </h2>
        <p className="trip-recommender-subtitle">
          Discover your next destination based on your mood and travel goals ✨
        </p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Mood</label>
          <select value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)}>
            <option value="">Select Mood</option>
            {moods.map((mood, i) => (
              <option key={i} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Purpose</label>
          <select value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)}>
            <option value="">Select Purpose</option>
            {purposes.map((purpose, i) => (
              <option key={i} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleFilter} className="filter-button">
          <FaSearch />
          Find Trips
        </button>
      </div>

      <div className="results">
        {recommendations.length > 0 ? (
          recommendations.map((place) => (
            <div key={place.id} className="place-card">
              <img src={place.image} alt={place.name} className="cityImage" />
              <div className="tourInfo">
                <div className="tourHeader">
                  <h4 className="tourPrice">₹ {place.price.toLocaleString()}</h4>
                  <h4 className="tourCityName">
                    {place.emoji} {place.name}
                    <span className="region">({place.region})</span>
                  </h4>
                </div>
                <p className="tourDetails">{place.info}</p>
                <div className="tags">
                  {place.moodTags.map((tag, i) => (
                    <span key={i} className="tag tag-mood">
                      {tag}
                    </span>
                  ))}
                  {place.purposeTags.map((tag, i) => (
                    <span key={i} className="tag tag-purpose">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-recommendations">
            <FaCompass className="compass-icon" />
            <p>No recommendations yet. Select a mood and purpose to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

