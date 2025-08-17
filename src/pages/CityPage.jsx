import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cities from '../data/cities';
import './CityPage.css';

const CityPage = () => {
  const { city } = useParams();
  const cityInfo = cities[city.toLowerCase()];

  // Weather functionality
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityInfo.name}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cityInfo) {
      fetchWeather();
    }
  }, [cityInfo]);

  if (!cityInfo) {
    return <h1 className="text-center text-2xl mt-20">City not found</h1>;
  }

  return (
    <div className="city-page-container">
      <div className="city-card">
        {/* City Image */}
        <div className="image-wrapper">
          <img
            src={cityInfo.imageUrl}
            alt={cityInfo.name}
            className="city-image"
          />
        </div>

        {/* City Content */}
        <div className="city-content">
          <h1 className="city-name">{cityInfo.name}</h1>

          {/* Weather Info */}
          <div className="city-weather mb-4">
            <h3 className="detail-title font-bold mb-2">Current Weather:</h3>
            {loading ? (
              <p className="text-gray-500">Fetching weather...</p>
            ) : weather ? (
              <div className="weather-details">
                <p className="text-prussian mb-1">
                  🌡 Temperature: {weather.main.temp}°C
                </p>
                <p className="text-prussian">
                  ☁ Condition: {weather.weather[0].description}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Weather info not available</p>
            )}
          </div>

          {/* Description */}
          <p className="city-description">{cityInfo.description}</p>

          {/* Details: Ideal Time, Famous For, Transport */}
          <div className="city-details">
            <div className="detail">
              <h3 className="detail-title font-bold mb-1">Ideal Time to Visit:</h3>
              <p className="text-prussian">{cityInfo.idealTime}</p>
            </div>
            <div className="detail">
              <h3 className="detail-title font-bold mb-1">Famous For:</h3>
              <p className="text-prussian">{cityInfo.famousFor}</p>
            </div>
            <div className="detail sm:col-span-2">
              <h3 className="detail-title font-bold mb-1">Transport:</h3>
              <p className="text-prussian">{cityInfo.transport}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
