'use client';
import { useState, useRef, useEffect } from 'react';
import BackgroundWrapper from '../utils/BackgroundWrapper';
import { places } from './place';
import { 
  CloudSun, 
  MapPin, 
  Calendar, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Wind, 
  Thermometer,
  Search,
  Loader2,
  Star,
  Map,
  Lightbulb,
  ThermometerSun,
  ThermometerSnowflake,
  Mountain,
  Building2,
  ArrowRight,
  X
} from 'lucide-react';

export default function WeatherSuggestions() {
  const [city, setCity] = useState('');
  const [season, setSeason] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter places based on input
  const handleCityInput = (value) => {
    setCity(value);
    if (value.trim().length > 0) {
      const filtered = places.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.type.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlaces(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredPlaces([]);
      setShowSuggestions(false);
    }
  };

  const selectPlace = (placeName) => {
    setCity(placeName);
    setShowSuggestions(false);
  };

  const getWeatherAndSuggestions = async (placeNameOverride = null) => {
    const cityToCheck = placeNameOverride || city;
    
    if (!cityToCheck) {
      alert('Please enter a city name');
      return;
    }

    setLoading(true);
    const place = places.find(p => p.name.toLowerCase() === cityToCheck.toLowerCase());
    
    if (!place) {
      alert('Place not found. Try: ' + places.slice(0, 5).map(p => p.name).join(', '));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const data = await res.json();
      const temp = data.current_weather.temperature;
      const windSpeed = data.current_weather.windspeed;

      // Determine current season based on temperature
      let detectedSeason = '';
      if (temp > 30) {
        detectedSeason = 'Summer';
      } else if (temp < 20) {
        detectedSeason = 'Winter';
      } else {
        detectedSeason = season || 'Summer';
      }

      // Get suggestions for the season
      const seasonalPlaces = places.filter(p => p.best.includes(detectedSeason));

      setWeatherData({
        place,
        temp,
        windSpeed,
        detectedSeason,
        seasonalPlaces
      });
      
      // Scroll to results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('Error fetching weather data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen py-6 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mt-6 mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <CloudSun className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-600 mr-2 sm:mr-3" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 to-pink-600 bg-clip-text text-transparent">
                Weather & Travel Suggestions
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4">
              Check live weather and discover perfect destinations for your season
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              
              {/* City Input with Custom Dropdown */}
              <div className="relative">
                <label className="flex items-center text-sm font-semibold text-blue-900 mb-2">
                  <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span>Enter City/Destination</span>
                </label>
                
                <div className="relative" ref={inputRef}>
                  <input
                    type="text"
                    className="w-full px-4 py-3 pr-10 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                    placeholder="e.g., Goa, Manali, Jaipur..."
                    value={city}
                    onChange={(e) => handleCityInput(e.target.value)}
                    onFocus={() => city && setShowSuggestions(true)}
                  />
                  
                  {city && (
                    <button
                      onClick={() => {
                        setCity('');
                        setShowSuggestions(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Custom Suggestions Dropdown */}
                {showSuggestions && filteredPlaces.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-50 w-full mt-2 bg-white border-2 border-blue-200 rounded-lg shadow-xl max-h-64 overflow-y-auto"
                  >
                    {filteredPlaces.slice(0, 10).map((place, idx) => (
                      <div
                        key={idx}
                        onClick={() => selectPlace(place.name)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                              {place.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center mt-0.5">
                              <Building2 className="w-3 h-3 mr-1 flex-shrink-0" />
                              {place.type}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 flex-shrink-0">
                            {place.best.slice(0, 2).map((season, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full whitespace-nowrap"
                              >
                                {season}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Season Selection */}
              <div>
                <label className="flex items-center text-sm font-semibold text-blue-900 mb-2">
                  <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span>Preferred Travel Season (Optional)</span>
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-white text-sm sm:text-base"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                >
                  <option value="">Auto-detect from weather</option>
                  <option value="Summer">☀️ Summer (Mar-Jun)</option>
                  <option value="Monsoon">🌧️ Monsoon (Jul-Sep)</option>
                  <option value="Winter">❄️ Winter (Oct-Feb)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => getWeatherAndSuggestions()}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                  Fetching Weather...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Check Weather & Get Suggestions
                </span>
              )}
            </button>
          </div>

          {/* Weather Results */}
          {weatherData && (
            <div className="space-y-4 sm:space-y-6">
              {/* Current Weather Card */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-white">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
                  <div className="flex-1 w-full lg:w-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{weatherData.place.name}</h2>
                    <p className="text-blue-200 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">{weatherData.place.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-blue-800/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center">
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{weatherData.place.type}</span>
                      </span>
                      <span className="bg-blue-800/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">Best: {weatherData.place.best.join(', ')}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-center lg:text-right w-full lg:w-auto">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2">{Math.round(weatherData.temp)}°C</div>
                    <div className="text-base sm:text-lg md:text-xl text-blue-200 flex items-center justify-center lg:justify-end">
                      {weatherData.temp > 30 ? (
                        <>
                          <Sun className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                          Hot
                        </>
                      ) : weatherData.temp < 15 ? (
                        <>
                          <Snowflake className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                          Cold
                        </>
                      ) : (
                        <>
                          <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                          Pleasant
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 bg-blue-800/30 rounded-xl p-3 sm:p-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-200 text-xs sm:text-sm mb-1">
                      <Thermometer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span>Temperature</span>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold">{Math.round(weatherData.temp)}°C</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-200 text-xs sm:text-sm mb-1">
                      <Wind className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span>Wind Speed</span>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold">{weatherData.windSpeed} km/h</div>
                  </div>
                  <div className="text-center col-span-2 md:col-span-1">
                    <div className="flex items-center justify-center text-blue-200 text-xs sm:text-sm mb-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span>Suggested Season</span>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold">{weatherData.detectedSeason}</div>
                  </div>
                </div>
              </div>

              {/* Travel Advice */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border-l-4 border-blue-600">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                  <span>Travel Advice</span>
                </h3>
                <div className="text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
                  {weatherData.temp > 35 && (
                    <p className="flex items-start">
                      <ThermometerSun className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-red-500" />
                      <span><strong>Very Hot!</strong> Stay hydrated, avoid midday sun (12 PM - 4 PM), use SPF 50+ sunscreen.</span>
                    </p>
                  )}
                  {weatherData.temp > 25 && weatherData.temp <= 35 && (
                    <p className="flex items-start">
                      <Sun className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-orange-500" />
                      <span><strong>Warm Weather:</strong> Perfect for beach activities. Carry light clothes and sun protection.</span>
                    </p>
                  )}
                  {weatherData.temp >= 15 && weatherData.temp <= 25 && (
                    <p className="flex items-start">
                      <CloudSun className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                      <span><strong>Perfect Weather!</strong> Ideal for sightseeing and outdoor activities. Enjoy your trip!</span>
                    </p>
                  )}
                  {weatherData.temp < 15 && weatherData.temp >= 5 && (
                    <p className="flex items-start">
                      <Snowflake className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                      <span><strong>Cold Climate:</strong> Layer up! Carry warm jackets, thermals, and hot beverages.</span>
                    </p>
                  )}
                  {weatherData.temp < 5 && (
                    <p className="flex items-start">
                      <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-700" />
                      <span><strong>Very Cold!</strong> Heavy woolens required. Be prepared for possible snowfall.</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Season-Based Suggestions */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center mb-2">
                    <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 mr-2 flex-shrink-0" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
                      Best Places for {weatherData.detectedSeason}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                    Explore {weatherData.seasonalPlaces.length} amazing destinations perfect for this season
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {weatherData.seasonalPlaces.map((place, idx) => (
                    <div
                      key={idx}
                      className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 md:p-6 border-2 border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-900 group-hover:text-blue-700 flex-1 min-w-0">
                          {place.name}
                        </h4>
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-semibold flex-shrink-0">
                          {place.type}
                        </span>
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2">{place.description}</p>

                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-blue-700 mb-1 flex items-center">
                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span>TOP ATTRACTIONS</span>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-700">
                            {place.attractions.slice(0, 3).map((attr, i) => (
                              <span key={i}>
                                {attr}{i < 2 && i < place.attractions.slice(0, 3).length - 1 ? ' • ' : ''}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-blue-700 mb-1 flex items-center">
                            <Mountain className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span>ACTIVITIES</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {place.activities.slice(0, 3).map((activity, i) => (
                              <span
                                key={i}
                                className="bg-white text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-2">
                          {place.best.map((s, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-1 rounded ${
                                s === weatherData.detectedSeason
                                  ? 'bg-green-100 text-green-700 font-semibold'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCity(place.name);
                          getWeatherAndSuggestions(place.name);
                        }}
                        className="mt-3 sm:mt-4 w-full text-blue-600 text-xs sm:text-sm font-semibold group-hover:text-blue-700 flex items-center justify-center hover:underline transition-colors"
                      >
                        <span>Click to check weather</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 flex-shrink-0" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Browse All Destinations */}
          {!weatherData && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Map className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600 mr-2 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">
                    Browse Destinations by Season
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  Suggestions to Explore More
                </p>
              </div>
            
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                {/* Summer */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 sm:p-6 border-2 border-orange-200">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Sun className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-700">Summer</h4>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">March - June</p>
                  <div className="space-y-2">
                    {places.filter(p => p.best.includes('Summer')).slice(0, 6).map((place, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2.5 sm:p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => { 
                          setCity(place.name); 
                          setSeason('Summer');
                          setTimeout(() => getWeatherAndSuggestions(place.name), 100);
                        }}
                      >
                        <div className="font-semibold text-gray-800 text-sm sm:text-base">{place.name}</div>
                        <div className="text-xs text-gray-500">{place.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monsoon */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 border-2 border-blue-200">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <CloudRain className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700">Monsoon</h4>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">July - September</p>
                  <div className="space-y-2">
                    {places.filter(p => p.best.includes('Monsoon')).slice(0, 6).map((place, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2.5 sm:p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => { 
                          setCity(place.name); 
                          setSeason('Monsoon');
                          setTimeout(() => getWeatherAndSuggestions(place.name), 100);
                        }}
                      >
                        <div className="font-semibold text-gray-800 text-sm sm:text-base">{place.name}</div>
                        <div className="text-xs text-gray-500">{place.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Winter */}
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 sm:p-6 border-2 border-blue-300">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Snowflake className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-700">Winter</h4>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">October - February</p>
                  <div className="space-y-2">
                    {places.filter(p => p.best.includes('Winter')).slice(0, 6).map((place, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2.5 sm:p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => { 
                          setCity(place.name); 
                          setSeason('Winter');
                          setTimeout(() => getWeatherAndSuggestions(place.name), 100);
                        }}
                      >
                        <div className="font-semibold text-gray-800 text-sm sm:text-base">{place.name}</div>
                        <div className="text-xs text-gray-500">{place.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
}