import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const WeatherWidget = () => {
  const { theme } = useTheme();
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Pune', 'Jaipur', 'Goa', 'Kochi'
  ];

  const getWeatherAdvice = (temp, condition) => {
    if (temp > 35) return "🔥 Very hot! Stay hydrated and avoid midday sun";
    if (temp > 25) return "☀️ Perfect weather for sightseeing!";
    if (temp > 15) return "🌤️ Pleasant weather, great for outdoor activities";
    if (condition.includes('rain')) return "🌧️ Pack an umbrella and waterproof gear";
    return "❄️ Cool weather, pack warm clothes";
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      console.log(`🌤️ Fetching weather for: ${selectedCity}`);
      
      if (demoMode) {
        console.log('🎭 Demo Mode - Using Sample Data');
        setTimeout(() => {
          const temps = { Delhi: 32, Mumbai: 29, Bangalore: 24, Chennai: 31, Kolkata: 28, Hyderabad: 30, Pune: 26, Jaipur: 35, Goa: 27, Kochi: 25 };
          setWeather({
            main: { temp: temps[selectedCity] || 28, feels_like: (temps[selectedCity] || 28) + 4, humidity: 65 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            name: selectedCity
          });
          setLoading(false);
        }, 1000);
        return;
      }
      
      console.log(`🔑 API Key: ${process.env.REACT_APP_WEATHER_API_KEY ? 'Available' : 'Missing'}`);
      
      try {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${selectedCity},India&aqi=no`;
        console.log(`📡 API URL: ${apiUrl}`);
        
        const response = await fetch(apiUrl);
        console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Real API Data:', data);
          // Convert WeatherAPI format to our format
          const convertedData = {
            main: { 
              temp: data.current.temp_c, 
              feels_like: data.current.feelslike_c, 
              humidity: data.current.humidity 
            },
            weather: [{ 
              main: data.current.condition.text, 
              description: data.current.condition.text.toLowerCase(), 
              icon: '01d' 
            }],
            name: data.location.name
          };
          setWeather(convertedData);
        } else {
          console.log('❌ API Failed - Using Demo Data');
          setWeather({
            main: { temp: 28, feels_like: 32, humidity: 65 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            name: selectedCity
          });
        }
      } catch (error) {
        console.log('🚨 API Error:', error.message);
        console.log('🔄 Using Demo Data Fallback');
        setWeather({
          main: { temp: 28, feels_like: 32, humidity: 65 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          name: selectedCity
        });
      }
      setLoading(false);
    };

    fetchWeather();
  }, [selectedCity]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 to-purple-100'
    }`}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            🌤️ Weather for Travel
          </h1>

          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select City
              </label>
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  demoMode 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {demoMode ? '🎭 Demo Mode' : '🌐 Live API'}
              </button>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading weather...</p>
            </div>
          ) : weather ? (
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</span>
                </div>
                <p className="text-lg capitalize mb-2">{weather.weather[0].description}</p>
                <div className="flex justify-center space-x-6 text-sm">
                  <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
                  <span>Humidity {weather.main.humidity}%</span>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  {getWeatherAdvice(weather.main.temp, weather.weather[0].main)}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;