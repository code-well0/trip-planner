import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cities from '../data/cities';
import './CityPage.css';

const CityPage = () => {
  const { city } = useParams();
  const cityInfo = cities[city.toLowerCase()];

  // Current Weather (from WeatherAPI)
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loadingCurrent, setLoadingCurrent] = useState(true);
  const [currentError, setCurrentError] = useState('');

  // Prediction feature
  const [selectedDate, setSelectedDate] = useState('');
  const [predictedWeather, setPredictedWeather] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [predictionError, setPredictionError] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHERAPI_KEY;
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'; 

  // Fetch current weather using WeatherAPI.com
  useEffect(() => {
    const fetchCurrentWeather = async () => {
      if (!cityInfo) return;
      try {
        setLoadingCurrent(true);
        setCurrentError('');
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInfo.name},IN`
        );
        setCurrentWeather(response.data);
      } catch (err) {
        console.error('Error fetching current weather:', err);
        setCurrentError('Current weather info unavailable');
      } finally {
        setLoadingCurrent(false);
      }
    };
    fetchCurrentWeather();
  }, [cityInfo, API_KEY]);

  // Handle weather prediction using Flask backend
  const handlePredictWeather = async () => {
    if (!selectedDate) return;

    try {
      setLoadingPrediction(true);
      setPredictionError('');
      setPredictedWeather(null);

      const response = await axios.get(`${API_URL}/api/forecast`, {
        params: { city: cityInfo.name, date: selectedDate }
      });

      const data = response.data;

      if (data.error) {
        setPredictionError('Prediction unavailable');
        return;
      }

      const tempMax = data.forecast.temp_max ?? 'N/A';
      const tempMin = data.forecast.temp_min ?? 'N/A';
      const condition = data.forecast.condition ?? 'Unavailable';

    
      let conditionClass = 'sunny';
      const condLower = condition.toLowerCase();
      if (condLower.includes('cloud')) conditionClass = 'cloudy';
      else if (condLower.includes('rain')) conditionClass = 'rainy';
      else if (condLower.includes('wind')) conditionClass = 'windy';
      else if (condLower.includes('snow')) conditionClass = 'snowy';
      else if (condLower.includes('storm')) conditionClass = 'stormy';

      setPredictedWeather({ tempMax, tempMin, condition, conditionClass });
    } catch (err) {
      console.error('Prediction error:', err);
      setPredictionError('Prediction not available');
    } finally {
      setLoadingPrediction(false);
    }
  };

  if (!cityInfo) {
    return <h1 className="text-center text-2xl mt-20">City not found</h1>;
  }

  return (
    <div className="city-page-container">
      <div className="city-card">
        <div className="image-wrapper">
          <img src={cityInfo.imageUrl} alt={cityInfo.name} className="city-image" />
        </div>

        <div className="city-content">
          <h1 className="city-name">{cityInfo.name}</h1>
          <p className="city-description">{cityInfo.description}</p>

          <div className="city-details">
            <div className="detail">
              <h3 className="detail-title font-bold mb-1">Ideal Time to Visit:</h3>
              <p className="text-prussian">{cityInfo.idealTime}</p>
            </div>
            <div className="detail">
              <h3 className="detail-title font-bold mb-1">Famous For:</h3>
              <p className="text-prussian">{cityInfo.famousFor}</p>
            </div>
          </div>

          {/* Current Weather */}
          <div className="weather-current mt-6">
            <h3 className="detail-title font-bold mb-2">Current Weather:</h3>
            {loadingCurrent ? (
              <p className="text-gray-500">Fetching current weather...</p>
            ) : currentError ? (
              <p className="text-red-500">{currentError}</p>
            ) : currentWeather ? (
              <div className="p-4 border rounded sunny flex items-center gap-4">
                <img
                  src={`https:${currentWeather.current.condition.icon}`}
                  alt={currentWeather.current.condition.text}
                />
                <div>
                  <p><strong>Temp:</strong> {currentWeather.current.temp_c}°C</p>
                  <p><strong>Condition:</strong> {currentWeather.current.condition.text}</p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Weather Prediction */}
          <div className="weather-predictor mt-6">
            <h3 className="detail-title font-bold mb-2">Plan Your Visit Weather:</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded mb-2"
            />
            <button
              onClick={handlePredictWeather}
              className="bg-blue-800 text-white p-2 rounded ml-2"
            >
              Check Weather on Planned Date
            </button>

            {loadingPrediction && <p className="mt-2 text-gray-500">Fetching prediction...</p>}
            {predictionError && <p className="mt-2 text-red-500">{predictionError}</p>}

            {predictedWeather && (
              <div className={`mt-4 p-4 border rounded ${predictedWeather.conditionClass}`}>
                <p><strong>Max Temp:</strong> {predictedWeather.tempMax}°C</p>
                <p><strong>Min Temp:</strong> {predictedWeather.tempMin}°C</p>
                <p><strong>Condition:</strong> {predictedWeather.condition}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
