'use client';

import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  User, 
  Languages, 
  Calendar, 
  X, 
  Check, 
  Loader2,
  Frown
} from 'lucide-react';
import guidesData from './guidesdata';
import Image from 'next/image';


export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    message: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(guidesData.map(guide => guide.category))];

  // Filter guides based on search and category
  const filteredGuides = guidesData.filter(guide => {
    const matchesSearch = 
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.about.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle booking modal
  const handleBookGuide = (guide) => {
    setSelectedGuide(guide);
    setShowBookingModal(true);
    setShowSuccessMessage(false);
  };

  // Handle form submission (Frontend only - no backend)
  const handleSubmitBooking = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // Guide info
        guideId: selectedGuide.id,
        guideName: selectedGuide.name,
        guidePlace: selectedGuide.place,
        pricePerDay: selectedGuide.price,

        // User info
        name: bookingForm.name,
        email: bookingForm.email,
        phone: bookingForm.phone,
        date: bookingForm.date,
        guests: bookingForm.guests,
        message: bookingForm.message,

        // Calculated
        totalAmount: selectedGuide.price * bookingForm.guests
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Booking failed");
    }

    // ✅ SUCCESS
    setShowSuccessMessage(true);

    setBookingForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: 1,
      message: ""
    });

    setTimeout(() => {
      setShowBookingModal(false);
      setShowSuccessMessage(false);
    }, 3000);

  } catch (error) {
    console.error("Booking Error:", error);
    alert("❌ Booking failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Category emoji mapping
  const categoryEmojis = {
    'Beaches': '🏖️',
    'Mountains': '🏔️',
    'Temples': '🛕',
    'Forts': '🏰',
    'Heritage Sites': '🏛️',
    'Waterfalls': '💦',
    'Famous Places': '🌍'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 text-center mb-3">
            Explore India with Expert Guides
          </h1>
          <p className="text-gray-600 text-center text-lg">
            {guidesData.length}+ Professional Local Guides across India 🇮🇳
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by guide name, place, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-blue-300 focus:border-blue-700 focus:outline-none shadow-lg text-lg"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200'
              }`}
            >
              {category !== 'All' && <span>{categoryEmojis[category]}</span>}
              <span>{category}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg">
            Found <span className="font-bold text-blue-700">{filteredGuides.length}</span> guide{filteredGuides.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Guide Header with Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 via-cyan-600 to-teal-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* FIXED: Now showing actual image instead of first letter */}
                  <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `<div class="w-full h-full bg-white flex items-center justify-center text-5xl font-bold text-blue-700">${guide.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <span>{categoryEmojis[guide.category]}</span>
                  <span>{guide.category}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-semibold flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  {guide.rating}
                </div>
              </div>

              {/* Guide Info */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{guide.name}</h3>
                  <p className="text-blue-700 font-semibold flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {guide.place}
                  </p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {guide.about}
                </p>

                {/* Guide Details */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {guide.experience}
                  </div>
                  <div className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Languages className="w-3 h-3" />
                    {guide.languages.slice(0, 2).join(', ')}
                  </div>
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-3xl font-bold text-blue-700">₹{guide.price}</p>
                    <p className="text-xs text-gray-500">per day</p>
                  </div>
                  <button
                    onClick={() => handleBookGuide(guide)}
                    className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
              <Frown className="w-20 h-20 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-2">No guides found</h3>
            <p className="text-gray-500 text-lg mb-4">Try adjusting your search or filter</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Success Message Overlay */}
            {showSuccessMessage && (
              <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-10 rounded-3xl">
                <div className="text-center p-8">
                  <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                    <Check className="w-16 h-16 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-bold text-green-600 mb-3">Booking Successful! 🎉</h2>
                  <p className="text-xl text-gray-700 mb-2">Your booking request has been submitted.</p>
                  <p className="text-gray-600">We'll contact you shortly to confirm your tour!</p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-blue-700">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Closing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-700 via-cyan-700 to-teal-700 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Book Your Adventure</h2>
                  <p className="text-blue-100">Complete the form to confirm your booking</p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Selected Guide Card with Image */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b-2 border-blue-200">
              <div className="flex items-center gap-4">
                {/* FIXED: Now showing actual image in modal */}
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-300 shadow-lg flex-shrink-0">
                  <img
                    src={selectedGuide.image}
                    alt={selectedGuide.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-3xl font-bold text-white">${selectedGuide.name.charAt(0)}</div>`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedGuide.name}</h3>
                  <p className="text-blue-700 font-semibold flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedGuide.place}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      ⭐ {selectedGuide.rating}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {selectedGuide.experience}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-700">₹{selectedGuide.price}</p>
                  <p className="text-sm text-gray-500">per day</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmitBooking} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tour Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Number of Guests *
                </label>
                <select
                  name="guests"
                  value={bookingForm.guests}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Special Requests / Interests (Optional)
                </label>
                <textarea
                  name="message"
                  value={bookingForm.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  placeholder="Any specific places you want to visit, dietary restrictions, accessibility needs, or special requests..."
                />
              </div>

              {/* Total Price Calculation */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">Guide Fee:</span>
                  <span className="text-xl font-bold text-gray-900">₹{selectedGuide.price} × {bookingForm.guests}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-blue-200">
                  <span className="text-gray-900 font-bold text-lg">Total Amount:</span>
                  <span className="text-3xl font-bold text-blue-700">
                    ₹{selectedGuide.price * bookingForm.guests}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  💡 Payment will be arranged after confirmation
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Confirm Booking
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}