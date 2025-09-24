import React, { useState, useEffect, useCallback } from "react";
import { FaGlobeAsia, FaSearch, FaCompass, FaCalendarAlt, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import data from "../data";
import { io } from "socket.io-client";
import APIService from "../Components/services/APIService";
const socket = io("http://localhost:5000");

export default function TripRecommender() {
  const { theme } = useTheme();
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  
  // New AI-powered recommendation state
  const [useAIRecommendations, setUseAIRecommendations] = useState(false);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiService = new APIService();

  const moods = [
    "Relaxing",
    "Adventurous",
    "Spiritual",
    "Party",
    "Cultural",
    "Romantic",
    "Nature",
  ];

  const purposes = [
    "Solo detox",
    "Nature walk",
    "Family outing",
    "Weekend escape",
    "Spiritual journey",
    "Couple trip",
    "History tour",
  ];

  const themes = [
    "Historical Place",
    "Family-friendly",
    "Budget Travel",
    "Adventure Trip",
    "Solo Travel",
    "Spiritual Trip",
    "Educational Tour",
  ];

  const availableInterests = [
    "Beaches", "Mountains", "Cities", "Nature", "History", "Culture", 
    "Food", "Nightlife", "Adventure", "Relaxation", "Shopping", "Art",
    "Architecture", "Wildlife", "Photography", "Music", "Sports", "Spiritual"
  ];

  // Handle interest selection
  const toggleInterest = (interest) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // AI-powered recommendation function
  const handleAIRecommendations = async () => {
  try {
    setIsLoading(true);
    const recommendations = await apiService.getAIRecommendations({
      destination,
      interests,
      budget,
      travelers,
      duration: Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24))
    });
    setRecommendations(recommendations);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
  

  // FIX: Define handleFilter BEFORE useEffect, and use useCallback for memoization
  const handleFilter = useCallback(
    (mood = selectedMood, purpose = selectedPurpose, theme = selectedTheme) => {
      const filtered = data.filter((place) => {
        const moodMatch = mood ? place.moodTags.includes(mood) : true;
        const purposeMatch = purpose
          ? place.purposeTags.includes(purpose)
          : true;
        const themeMatch = theme ? place.themeTags.includes(theme) : true;
        return moodMatch && purposeMatch && themeMatch;
      });
      setRecommendations(filtered.slice(0, 6));
      // Emit trip update to other users
      socket.emit("trip:update", { mood, purpose, theme });
    },
    [selectedMood, selectedPurpose, selectedTheme]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    // Listen for trip updates from other users
    socket.on("trip:update", ({ mood, purpose, theme }) => {
      setSelectedMood(mood);
      setSelectedPurpose(purpose);
      setSelectedTheme(theme);
      handleFilter(mood, purpose, theme);
    });
    return () => {
      socket.off("trip:update");
    };
  }, [handleFilter]);

  return (
    <div
      className={`p-8 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${theme}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-extrabold text-center mb-2 text-gray-900 dark:text-white flex justify-center items-center gap-2">
          <FaGlobeAsia className="text-green-600 dark:text-green-400 text-4xl" />
          Trip Recommender
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-lg">
          Discover your next destination based on your mood, theme, and travel
          goals ✨
        </p>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setUseAIRecommendations(false)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                !useAIRecommendations
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Quick Recommendations
            </button>
            <button
              onClick={() => setUseAIRecommendations(true)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                useAIRecommendations
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              AI-Powered Search
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* AI-Powered Form */}
        {useAIRecommendations ? (
          <div className="max-w-4xl mx-auto mb-14">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Tell us about your dream trip
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Destination */}
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Japan, Europe, Southeast Asia"
                    className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
                  />
                </div>

                {/* Travelers */}
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
                  />
                </div>

                {/* Start Date */}
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
                    <FaCalendarAlt className="inline mr-2" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
                    <FaCalendarAlt className="inline mr-2" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
                  />
                </div>

                {/* Budget */}
                <div className="flex flex-col md:col-span-2">
                  <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
                    Budget (Optional)
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="budget">Budget (Under ₹1,50,000)</option>
                    <option value="mid">Mid-range (₹1,50,000 - ₹4,00,000)</option>
                    <option value="luxury">Luxury (Above ₹4,00,000)</option>
                  </select>
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <label className="mb-3 block text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
                  Select Your Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        interests.includes(interest)
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <div className="text-center">
                <button
                  onClick={handleAIRecommendations}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Getting Recommendations...
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      Get AI Recommendations
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Original Filters */
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {/* Mood */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
              Mood
            </label>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
            >
              <option value="">Select Mood</option>
              {moods.map((mood, i) => (
                <option key={i} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
          {/* Purpose */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
              Purpose
            </label>
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
            >
              <option value="">Select Purpose</option>
              {purposes.map((purpose, i) => (
                <option key={i} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
          </div>
          {/* Theme */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-800 dark:text-gray-200 font-semibold text-sm tracking-wide">
              Theme
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-all duration-200"
            >
              <option value="">Select Theme</option>
              {themes.map((theme, i) => (
                <option key={i} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
          {/* Button */}
          <button
            onClick={() => handleFilter()}
            className="self-end flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FaSearch />
            Find Trips
          </button>
        </div>
        )}
        {/* Results */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.length > 0 ? (
            recommendations.map((place) => (
              <div
                key={place.id || place.name}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-green-600 dark:text-green-400 font-semibold text-lg">
                      ₹ {place.price.toLocaleString()}
                    </h4>
                    <h4 className="font-semibold text-gray-800 dark:text-white text-right text-sm leading-tight">
                      {place.emoji} {place.name}
                      <span className="text-gray-400 dark:text-gray-500 text-xs ml-1 block">
                        {place.region}
                      </span>
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {place.info}
                  </p>
                  
                  {/* AI Insights */}
                  {Array.isArray(place.aiInsights) && place.aiInsights.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">
                        🤖 AI Insights
                      </h5>
                      <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        {place.aiInsights.map((insight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Highlights for AI-generated recommendations */}
                  {place.highlights && place.highlights.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-purple-600 dark:text-purple-400 font-semibold text-sm mb-2">
                        ⭐ Top Highlights
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {place.highlights.slice(0, 3).map((highlight, i) => (
                          <span
                            key={i}
                            className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                        {place.highlights.length > 3 && (
                          <span className="text-gray-500 text-xs">+{place.highlights.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Overall Score for AI recommendations */}
                  {place.overallScore && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Match Score
                        </span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          {place.overallScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${place.overallScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    {place.moodTags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {place.purposeTags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {place.themeTags &&
                      place.themeTags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-base">
              <FaCompass className="text-5xl text-gray-400 dark:text-gray-500 mb-4 mx-auto" />
              <p>
                {useAIRecommendations 
                  ? "No recommendations yet. Fill in the form above to get AI-powered suggestions."
                  : "No recommendations yet. Select mood, purpose or theme to begin."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
