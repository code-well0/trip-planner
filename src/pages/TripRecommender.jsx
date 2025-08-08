import React, { useState } from "react";
import { FaGlobeAsia, FaSearch, FaCompass } from "react-icons/fa";
import data from "../data";

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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center mb-2 text-gray-900 flex justify-center items-center gap-2">
        <FaGlobeAsia className="text-green-600 text-4xl" />
        Trip Recommender
      </h2>
      <p className="text-center text-gray-500 mb-10 text-lg">
        Discover your next destination based on your mood and travel goals ✨
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-14">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-800 font-semibold text-sm tracking-wide">Mood</label>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="rounded-xl border border-gray-300 px-5 py-3 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
          >
            <option value="">Select Mood</option>
            {moods.map((mood, i) => (
              <option key={i} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-800 font-semibold text-sm tracking-wide">Purpose</label>
          <select
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value)}
            className="rounded-xl border border-gray-300 px-5 py-3 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
          >
            <option value="">Select Purpose</option>
            {purposes.map((purpose, i) => (
              <option key={i} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFilter}
          className="self-end flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FaSearch />
          Find Trips
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.length > 0 ? (
          recommendations.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-green-600 font-semibold text-lg">
                    ₹ {place.price.toLocaleString()}
                  </h4>
                  <h4 className="font-semibold text-gray-800 text-right text-sm leading-tight">
                    {place.emoji} {place.name}
                    <span className="text-gray-400 text-xs ml-1 block">
                      {place.region}
                    </span>
                  </h4>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {place.info}
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  {place.moodTags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {place.purposeTags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-600 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-base">
            <FaCompass className="text-5xl text-gray-400 mb-4 mx-auto" />
            <p>No recommendations yet. Select a mood and purpose to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
