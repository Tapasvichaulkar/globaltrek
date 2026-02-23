'use client';
import { useState } from 'react';
import { packingLists, generalEssentials } from './place';
import BackgroundWrapper from '../utils/BackgroundWrapper';

export default function PackingGuide() {
  const [selectedWeather, setSelectedWeather] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [tripType, setTripType] = useState('');

  const weatherTypes = [
    { id: 'hot', name: 'Hot Weather', icon: '☀️', color: 'orange' },
    { id: 'cold', name: 'Cold Weather', icon: '❄️', color: 'blue' },
    { id: 'moderate', name: 'Pleasant Weather', icon: '🌤️', color: 'green' },
    { id: 'rainy', name: 'Monsoon/Rainy', icon: '🌧️', color: 'cyan' }
  ];

  const tripTypes = [
    { id: 'beach', name: 'Beach Trip', icon: '🏖️', items: ['Swimsuit', 'Beach towel', 'Flip-flops', 'Waterproof bag', 'Snorkeling gear', 'Beach umbrella'] },
    { id: 'mountain', name: 'Mountain Trek', icon: '🏔️', items: ['Trekking shoes', 'Hiking pole', 'Backpack', 'Energy bars', 'First aid kit', 'Headlamp'] },
    { id: 'city', name: 'City Tour', icon: '🏙️', items: ['Comfortable walking shoes', 'Day bag', 'City map', 'Portable charger', 'Camera', 'Guidebook'] },
    { id: 'spiritual', name: 'Temple/Spiritual', icon: '🛕', items: ['Modest clothing', 'Scarf/shawl', 'Prasad containers', 'Prayer beads', 'Small donation money', 'Head covering'] },
    { id: 'adventure', name: 'Adventure Sports', icon: '🪂', items: ['Sports shoes', 'Quick-dry clothes', 'Action camera', 'Safety gear', 'Energy drinks', 'Waterproof jacket'] },
    { id: 'wildlife', name: 'Wildlife Safari', icon: '🦁', items: ['Binoculars', 'Neutral colored clothes', 'Camera with zoom lens', 'Safari hat', 'Insect repellent', 'Field guide'] }
  ];

  const durations = [
    { id: '1-3', name: '1-3 Days', multiplier: 1 },
    { id: '4-7', name: '4-7 Days', multiplier: 1.5 },
    { id: '8-14', name: '8-14 Days', multiplier: 2 },
    { id: '15+', name: '15+ Days', multiplier: 2.5 }
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: 'from-orange-500 to-red-500 border-orange-200',
      blue: 'from-blue-600 to-indigo-600 border-blue-200',
      green: 'from-green-500 to-emerald-500 border-green-200',
      cyan: 'from-cyan-500 to-blue-500 border-cyan-200'
    };
    return colors[color] || colors.blue;
  };

  const selectedTripType = tripTypes.find(t => t.id === tripType);
  const selectedDuration = durations.find(d => d.id === tripDuration);

  return (
    <BackgroundWrapper>
      <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mt-6 sm:mt-10 mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 to-pink-600 mb-3 sm:mb-4 px-4">
               Complete Packing Guide
            </h1>
            <p className="text-gray-600 text-base sm:text-lg px-4">
              Your ultimate checklist for every type of travel
            </p>
          </div>

          {/* Selection Cards */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            
            {/* Weather Type Selection */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 sm:mb-4">
                1️⃣ Select Weather Condition
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {weatherTypes.map((weather) => (
                  <button
                    key={weather.id}
                    onClick={() => setSelectedWeather(weather.id)}
                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedWeather === weather.id
                        ? `bg-gradient-to-r ${getColorClasses(weather.color)} text-white shadow-lg scale-105`
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2">{weather.icon}</div>
                    <div className={`text-sm sm:text-base font-semibold ${selectedWeather === weather.id ? 'text-white' : 'text-gray-800'}`}>
                      {weather.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type Selection */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 sm:mb-4">
                2️⃣ Select Trip Type
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {tripTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setTripType(type.id)}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                      tripType === type.id
                        ? 'bg-gradient-to-r from-blue-900 to-blue-700 text-white border-blue-900 shadow-lg scale-105'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{type.icon}</div>
                    <div className={`text-xs sm:text-sm font-semibold ${tripType === type.id ? 'text-white' : 'text-gray-800'}`}>
                      {type.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 sm:mb-4">
                3️⃣ Trip Duration
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {durations.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => setTripDuration(duration.id)}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                      tripDuration === duration.id
                        ? 'bg-gradient-to-r from-blue-900 to-blue-700 text-white border-blue-900 shadow-lg scale-105'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1">📅</div>
                    <div className={`text-sm sm:text-base font-semibold ${tripDuration === duration.id ? 'text-white' : 'text-gray-800'}`}>
                      {duration.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Packing Lists Display */}
          {selectedWeather && (
            <div className="space-y-4 sm:space-y-6">
              
              {/* Weather-Specific Items */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                  {packingLists[selectedWeather].title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                  Essential items for your weather conditions
                </p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {packingLists[selectedWeather].items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-lg border-2 border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl">{item.icon}</span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                          {item.item}
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                          {item.category}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trip-Type Specific Items */}
              {selectedTripType && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-200">
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
                    {selectedTripType.icon} {selectedTripType.name} Essentials
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                    Additional items specific to your trip type
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedTripType.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-indigo-200 hover:shadow-md transition-all"
                      >
                        <span className="text-gray-800 font-medium text-sm sm:text-base pr-2">
                          {item}
                        </span>
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 flex-shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Travel Essentials */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  ✅ General Travel Essentials
                </h2>
                <p className="text-blue-200 text-sm sm:text-base mb-4 sm:mb-6">
                  Don't forget these must-have items for any trip
                </p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                  {generalEssentials.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-blue-800/50 p-3 rounded-lg hover:bg-blue-800/70 transition-all"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
                        <span className="text-xs sm:text-sm font-medium truncate">{item.item}</span>
                      </div>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0 ml-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Clothing Quantity Guide */}
              {selectedDuration && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-l-4 border-blue-600">
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
                    👕 Clothing Quantity Guide ({selectedDuration.name})
                  </h2>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-2xl sm:text-3xl mb-2">👔</div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        T-Shirts/Tops
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        {Math.ceil(3 * selectedDuration.multiplier)}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-2xl sm:text-3xl mb-2">👖</div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        Bottoms
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        {Math.ceil(2 * selectedDuration.multiplier)}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-2xl sm:text-3xl mb-2">🧦</div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        Socks
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        {Math.ceil(4 * selectedDuration.multiplier)}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-2xl sm:text-3xl mb-2">🩲</div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        Innerwear
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        {Math.ceil(4 * selectedDuration.multiplier)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-xs sm:text-sm text-gray-700">
                      <strong>💡 Pro Tip:</strong> Pack versatile clothing that can be mixed and matched. 
                      Consider laundry options for trips longer than 7 days to pack lighter.
                    </p>
                  </div>
                </div>
              )}

              {/* Important Documents Checklist */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
                  📋 Important Documents & Items
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-800 text-base sm:text-lg mb-3">
                      🆔 Documents
                    </h3>
                    {[
                      'Government ID (Aadhaar/Passport/License)',
                      'Travel tickets (Print + Digital)',
                      'Hotel booking confirmations',
                      'Travel insurance papers',
                      'Emergency contact numbers',
                      'Photocopies of important docs'
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-start sm:items-center justify-between bg-gray-50 p-3 rounded-lg gap-2">
                        <span className="text-gray-700 text-sm sm:text-base flex-grow">
                          {doc}
                        </span>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-blue-600 rounded flex-shrink-0 mt-0.5 sm:mt-0" 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-800 text-base sm:text-lg mb-3">
                      💳 Money & Cards
                    </h3>
                    {[
                      'Cash (local currency)',
                      'Credit/Debit cards',
                      'UPI apps',
                      'Emergency cash backup',
                      'Foreign currency (if international)',
                      'Money belt/pouch'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start sm:items-center justify-between bg-gray-50 p-3 rounded-lg gap-2">
                        <span className="text-gray-700 text-sm sm:text-base flex-grow">
                          {item}
                        </span>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-blue-600 rounded flex-shrink-0 mt-0.5 sm:mt-0" 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-800 text-base sm:text-lg mb-3">
                      💊 Health & Hygiene
                    </h3>
                    {[
                      'Prescription medicines',
                      'First aid kit',
                      'Hand sanitizer',
                      'Face masks',
                      'Insect repellent',
                      'Personal toiletries'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start sm:items-center justify-between bg-gray-50 p-3 rounded-lg gap-2">
                        <span className="text-gray-700 text-sm sm:text-base flex-grow">
                          {item}
                        </span>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-blue-600 rounded flex-shrink-0 mt-0.5 sm:mt-0" 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-800 text-base sm:text-lg mb-3">
                      📱 Electronics
                    </h3>
                    {[
                      'Mobile phone & charger',
                      'Power bank',
                      'Camera (optional)',
                      'Headphones',
                      'Universal adapter',
                      'Charging cables'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start sm:items-center justify-between bg-gray-50 p-3 rounded-lg gap-2">
                        <span className="text-gray-700 text-sm sm:text-base flex-grow">
                          {item}
                        </span>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-blue-600 rounded flex-shrink-0 mt-0.5 sm:mt-0" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Packing Tips */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-green-200">
                <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-4">
                  💡 Smart Packing Tips
                </h2>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-white p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl mb-2">🎒</div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      Roll, Don't Fold
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Rolling clothes saves space and reduces wrinkles
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl mb-2">🧳</div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      Use Packing Cubes
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Organize items by category for easy access
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl mb-2">👞</div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      Shoes in Bags
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Keep dirty shoes separate with plastic bags
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl mb-2">💧</div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      Liquids in Ziplock
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Prevent leaks with sealed bags
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl mb-2">🔋</div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      Charge Everything
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Fully charge all devices before departure
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl mb-2">📸</div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      Photo Your Luggage
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Take photos of packed items for insurance/reference
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          {!selectedWeather && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-center">
              <div className="text-5xl sm:text-6xl mb-4">🎒</div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
                Ready to Pack Smart?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 px-4">
                Select your weather condition above to get your personalized packing checklist
              </p>
              <div className="inline-block bg-blue-100 text-blue-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
                👆 Start by selecting weather type
              </div>
            </div>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
}