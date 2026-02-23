'use client';
import { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Plane, Sparkles, ArrowRight, Search } from 'lucide-react';

const placesData = {
  Beach: [
    { name: 'Goa', places: 'Baga, Calangute, Anjuna', rating: 4.5, image: '🏖️', state: 'Goa' },
    { name: 'Kerala Beaches', places: 'Varkala, Kovalam', rating: 4.7, image: '🌴', state: 'Kerala' },
    { name: 'Alibaug', places: 'Alibaug Beach, Kashid', rating: 4.2, image: '🌊', state: 'Maharashtra' },
    { name: 'Andaman Islands', places: 'Radhanagar Beach, Havelock', rating: 4.8, image: '🏝️', state: 'Andaman & Nicobar' },
    { name: 'Lakshadweep', places: 'Agatti Beach, Bangaram', rating: 4.9, image: '🐚', state: 'Lakshadweep' },
    { name: 'Puducherry', places: 'Paradise Beach, Auroville Beach', rating: 4.4, image: '🌅', state: 'Puducherry' },
    { name: 'Gokarna', places: 'Om Beach, Kudle Beach', rating: 4.6, image: '🕉️', state: 'Karnataka' },
    { name: 'Tarkarli', places: 'Tarkarli Beach, Devbag', rating: 4.5, image: '🐠', state: 'Maharashtra' },
  ],
  Mountain: [
    { name: 'Manali', places: 'Solang Valley, Rohtang Pass', rating: 4.6, image: '🏔️', state: 'Himachal Pradesh' },
    { name: 'Shimla', places: 'Mall Road, Kufri', rating: 4.4, image: '⛰️', state: 'Himachal Pradesh' },
    { name: 'Munnar', places: 'Tea Gardens, Mattupetty Dam', rating: 4.7, image: '🌄', state: 'Kerala' },
    { name: 'Darjeeling', places: 'Tiger Hill, Tea Estates', rating: 4.5, image: '🚞', state: 'West Bengal' },
    { name: 'Coorg', places: 'Abbey Falls, Raja Seat', rating: 4.6, image: '☕', state: 'Karnataka' },
    { name: 'Ooty', places: 'Botanical Garden, Ooty Lake', rating: 4.5, image: '🚂', state: 'Tamil Nadu' },
    { name: 'Leh-Ladakh', places: 'Pangong Lake, Nubra Valley', rating: 4.9, image: '🏔️', state: 'Ladakh' },
    { name: 'Kasol', places: 'Parvati Valley, Tosh', rating: 4.6, image: '🏕️', state: 'Himachal Pradesh' },
  ],
  Spiritual: [
    { name: 'Tirupati Balaji', places: 'Sri Venkateswara Temple', rating: 4.9, image: '🛕', state: 'Andhra Pradesh' },
    { name: 'Varanasi', places: 'Kashi Vishwanath, Dashashwamedh Ghat', rating: 4.8, image: '🕉️', state: 'Uttar Pradesh' },
    { name: 'Kedarnath', places: 'Kedarnath Temple', rating: 4.7, image: '⛰️', state: 'Uttarakhand' },
    { name: 'Amritsar', places: 'Golden Temple, Wagah Border', rating: 4.9, image: '🏛️', state: 'Punjab' },
    { name: 'Ayodhya', places: 'Ram Mandir, Hanuman Garhi', rating: 4.8, image: '🙏', state: 'Uttar Pradesh' },
    { name: 'Badrinath', places: 'Badrinath Temple', rating: 4.8, image: '🏔️', state: 'Uttarakhand' },
    { name: 'Dwarka', places: 'Dwarkadhish Temple', rating: 4.7, image: '🕉️', state: 'Gujarat' },
    { name: 'Shirdi', places: 'Sai Baba Temple', rating: 4.8, image: '🙏', state: 'Maharashtra' },
  ],
  Forts: [
    { name: 'Red Fort', places: 'Red Fort Complex, Chandni Chowk', rating: 4.5, image: '🏰', state: 'Delhi' },
    { name: 'Amber Fort', places: 'Amber Palace, Sheesh Mahal', rating: 4.7, image: '🕌', state: 'Rajasthan' },
    { name: 'Mehrangarh Fort', places: 'Mehrangarh Museum, Blue City View', rating: 4.8, image: '🏯', state: 'Rajasthan' },
    { name: 'Raigad Fort', places: 'Raigad Fort, Maha Darwaja', rating: 4.6, image: '⛩️', state: 'Maharashtra' },
    { name: 'Golconda Fort', places: 'Golconda Fort, Sound & Light Show', rating: 4.5, image: '🏛️', state: 'Telangana' },
    { name: 'Chittorgarh Fort', places: 'Vijay Stambh, Rana Kumbha Palace', rating: 4.7, image: '🏰', state: 'Rajasthan' },
    { name: 'Jaisalmer Fort', places: 'Golden Fort, Havelis', rating: 4.8, image: '🏜️', state: 'Rajasthan' },
    { name: 'Agra Fort', places: 'Jahangir Palace, Diwan-i-Khas', rating: 4.7, image: '🕌', state: 'Uttar Pradesh' },
  ],
  Heritage: [
    { name: 'Taj Mahal', places: 'Taj Mahal, Mehtab Bagh', rating: 5.0, image: '🕌', state: 'Uttar Pradesh' },
    { name: 'Qutub Minar', places: 'Qutub Complex, Iron Pillar', rating: 4.6, image: '🗼', state: 'Delhi' },
    { name: 'Hampi', places: 'Virupaksha Temple, Stone Chariot', rating: 4.8, image: '🏛️', state: 'Karnataka' },
    { name: 'Ajanta & Ellora Caves', places: 'Buddhist Caves, Kailasa Temple', rating: 4.7, image: '⛰️', state: 'Maharashtra' },
    { name: 'Jaipur Heritage', places: 'City Palace, Hawa Mahal', rating: 4.7, image: '🏰', state: 'Rajasthan' },
    { name: 'Khajuraho', places: 'Western Group Temples', rating: 4.6, image: '🏛️', state: 'Madhya Pradesh' },
    { name: 'Mahabalipuram', places: 'Shore Temple, Panch Rathas', rating: 4.6, image: '🗿', state: 'Tamil Nadu' },
    { name: 'Mysore Palace', places: 'Amba Vilas Palace, Gardens', rating: 4.8, image: '👑', state: 'Karnataka' },
  ],
  Waterfall: [
    { name: 'Jog Falls', places: 'Jog Falls Viewpoint', rating: 4.6, image: '💧', state: 'Karnataka' },
    { name: 'Dudhsagar Falls', places: 'Dudhsagar Trek, Railway View', rating: 4.7, image: '🌊', state: 'Goa' },
    { name: 'Athirappilly Falls', places: 'Athirappilly Waterfall, Vazhachal', rating: 4.8, image: '💦', state: 'Kerala' },
    { name: 'Nohkalikai Falls', places: 'Nohkalikai Falls Viewpoint', rating: 4.9, image: '🌈', state: 'Meghalaya' },
    { name: 'Hogenakkal Falls', places: 'Hogenakkal Boat Ride', rating: 4.5, image: '🚣', state: 'Tamil Nadu' },
    { name: 'Chitrakote Falls', places: 'Chitrakote Waterfall', rating: 4.6, image: '💧', state: 'Chhattisgarh' },
    { name: 'Abbey Falls', places: 'Abbey Falls, Coffee Estates', rating: 4.5, image: '☕', state: 'Karnataka' },
  ]
};

const interestIcons = {
  Beach: '🏖️',
  Mountain: '⛰️',
  Spiritual: '🛕',
  Forts: '🏰',
  Heritage: '🕌',
  Waterfall: '💧'
};

export default function TripPlannerForm({ onPlanGenerate }) {
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [interest, setInterest] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [travelers, setTravelers] = useState('2');
  const [searchTerm, setSearchTerm] = useState('');

  const handleGeneratePlan = () => {
    if (!interest || !budget || !days || !selectedDestination) {
      alert('Please fill all fields and select a destination');
      return;
    }

    onPlanGenerate({
      budget,
      days,
      interest,
      destination: selectedDestination,
      travelers
    });
  };

  const filteredPlaces = interest 
    ? placesData[interest].filter(place => 
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.places.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .destination-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .destination-card:hover {
          transform: scale(1.02);
        }
        
        .destination-card.selected {
          border-color: #6366f1;
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mt-6 mb-4 animate-float">
            <Plane className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 to-pink-600 mb-4">
            AI Trip Planner
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Plan your perfect getaway with AI-powered itineraries tailored to your preferences
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Step 1: Basic Details */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Trip Details</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-indigo-600" />
                  Budget (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all bg-white"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Number of Days
                </label>
                <input
                  type="number"
                  placeholder="e.g., 5"
                  min="1"
                  max="30"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all bg-white"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Travelers
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2"
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all bg-white"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Travel Interest
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all bg-white cursor-pointer"
                  value={interest}
                  onChange={(e) => {
                    setInterest(e.target.value);
                    setSelectedDestination(null);
                    setSearchTerm('');
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Beach">🏖️ Beaches</option>
                  <option value="Mountain">⛰️ Mountains</option>
                  <option value="Spiritual">🛕 Spiritual</option>
                  <option value="Forts">🏰 Forts</option>
                  <option value="Heritage">🕌 Heritage</option>
                  <option value="Waterfall">💧 Waterfalls</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Select Destination */}
          {interest && (
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Choose Your {interest} Destination
                </h2>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Destinations Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredPlaces.map((place, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedDestination(place)}
                    className={`destination-card bg-white rounded-2xl p-5 shadow-md border-2 ${
                      selectedDestination?.name === place.name
                        ? 'selected border-indigo-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-5xl mb-3 text-center">{place.image}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">
                      {place.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2 text-center">{place.state}</p>
                    <p className="text-gray-500 text-xs mb-3 text-center line-clamp-2">
                      {place.places}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-gray-700 text-sm">{place.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          {selectedDestination && (
            <div className="text-center">
              <button
                onClick={handleGeneratePlan}
                className="bg-gradient-to-r from-indigo-400 via-blue-600 to-blue-900 hover:from-indigo-700 hover:via-blue-300 hover:to-blue-900 text-white font-bold py-4 px-12 rounded-2xl shadow-2xl transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto text-lg"
              >
                <Sparkles className="w-6 h-6" />
                Generate AI Itinerary
                <ArrowRight className="w-6 h-6" />
              </button>
              
              <p className="text-gray-600 mt-4 text-sm">
                Selected: <span className="font-bold text-indigo-600">{selectedDestination.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}