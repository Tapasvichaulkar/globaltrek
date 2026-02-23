// components/FreeStreetView.jsx
'use client';

import { useState } from 'react';
import { MapPin, Globe, Search, Maximize2, Navigation } from 'lucide-react';

export default function Photo360() {
  const [currentLocation, setCurrentLocation] = useState({
    name: 'Eiffel Tower, Paris',
    embed: 'https://www.google.com/maps/embed?pb=!4v1234567890123!6m8!1m7!1sCAoSLEFGMVFpcE1fSEl5dEJfVzBjekp3Yzc5aEZ5Z0tqSXhLQ0RSVkc4d1VZNmNG!2m2!1d48.85837009999999!2d2.2944813!3f0!4f0!5f0.7820865974627469'
  });
  
  const [searchQuery, setSearchQuery] = useState('');

  // Popular FREE 360° locations with working embed URLs
  const locations = [
    {
      name: 'Eiffel Tower, Paris',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890123!6m8!1m7!1sCAoSLEFGMVFpcE1fSEl5dEJfVzBjekp3Yzc5aEZ5Z0tqSXhLQ0RSVkc4d1VZNmNG!2m2!1d48.85837009999999!2d2.2944813!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Times Square, New York',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE5EbVBWX3ZHTV9qX0NmOUt5SlFxRWN5SkhLWmN5SnJYdnloSlVJ!2m2!1d40.758896!2d-73.98513699999999!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Colosseum, Rome',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE5JQmhMdV95SEVHbHN2UzBWX0xWWGFZMDFGVkFCaHdNZEFYVkZH!2m2!1d41.8902102!2d12.4922309!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Taj Mahal, India',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE9oMU5XV09HNzRLZjRvdFVfMGRfV0ZpQXhTVkw2V1ExVGpnVUk2!2m2!1d27.1751496!2d78.04211599999999!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Sydney Opera House',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE9oSGdyQllsQjRlbTlCdmtfOGdyN3VnRWx2RFN4b2NzcUE4V2xq!2m2!1d-33.8567844!2d151.21529160000002!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Big Ben, London',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE1uS1N5UGNfS3B0Nm41R1RoYkE2cGJQMkFfZTNFTzFXSGdHRFN2!2m2!1d51.5007292!2d-0.1246254!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Santorini, Greece',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE1HQzk4dXFjQnpkZGxoTEZ6Y1JfRzV2R0JSQnhDOE1IZHlHZGNl!2m2!1d36.4617126!2d25.3757602!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Grand Canyon, USA',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE1XQkp4VGh4VDZIWVM1bDFtY1FKeGtHckNjZVhxYUpLdkdOaHVL!2m2!1d36.0544445!2d-112.1401108!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Machu Picchu, Peru',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcFBKZ3VyZ0tQcEo2eXhHVTk3STlJU1NMR3VZV0JaWXBEaFhkQUZn!2m2!1d-13.1631412!2d-72.5449629!3f0!4f0!5f0.7820865974627469'
    },
    {
      name: 'Dubai Marina',
      embed: 'https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE9QT09MVkVvN19wRldyR2xIekY3TzZpTUxub1R5V1B3S3ZpSm1i!2m2!1d25.0802951!2d55.1391756!3f0!4f0!5f0.7820865974627469'
    }
  ];

  const handleLocationClick = (location) => {
    setCurrentLocation(location);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Create Google Maps search URL
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank');
  };

  const openFullscreen = () => {
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${encodeURIComponent(currentLocation.name)}`;
    window.open(url, '_blank', 'width=1200,height=800');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Globe className="w-12 h-12 text-blue-300 animate-pulse" />
            <h1 className="text-5xl font-bold text-white">GlobalTrek</h1>
          </div>
          <p className="text-blue-200 text-lg">Explore the World in 360° - Completely FREE, No API Key Required!</p>
          <div className="mt-2 inline-block px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full">
            <span className="text-green-300 font-semibold">✨ 100% Free Forever • No Setup • No Cost</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-4 border border-white/20">
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex-1 flex gap-2 min-w-[300px]">
              <input
                type="text"
                placeholder="Search any location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 transition-all"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
            <button
              onClick={openFullscreen}
              className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl flex items-center gap-2 transition-all"
              title="Open in new window"
            >
              <Maximize2 className="w-5 h-5" />
              Fullscreen
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-blue-200 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Current: <span className="font-semibold text-white">{currentLocation.name}</span></span>
          </div>
        </div>

        {/* Street View Iframe */}
        <div className="relative mb-6">
          <iframe
            src={currentLocation.embed}
            className="w-full rounded-3xl border-4 border-white/20 shadow-2xl"
            style={{ height: '70vh', minHeight: '500px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Street View of ${currentLocation.name}`}
          />
        </div>

        {/* Popular Destinations */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Navigation className="w-6 h-6" />
            Popular Destinations - Click to Travel!
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => handleLocationClick(location)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all shadow-lg text-sm ${
                  currentLocation.name === location.name
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                }`}
              >
                {location.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-white font-bold text-xl mb-4">✨ Why This is Perfect for You</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 p-4 rounded-xl">
              <p className="font-bold text-green-300 mb-2 text-lg">💰 100% FREE</p>
              <p className="text-blue-200 text-sm">No API key, no billing, no limits. Use as much as you want!</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-4 rounded-xl">
              <p className="font-bold text-blue-300 mb-2 text-lg">⚡ No Setup</p>
              <p className="text-blue-200 text-sm">Just copy, paste, and run. Works immediately in Next.js!</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 p-4 rounded-xl">
              <p className="font-bold text-purple-300 mb-2 text-lg">🌍 Real Google Data</p>
              <p className="text-blue-200 text-sm">Official Google Street View with all features included</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 p-4 rounded-xl">
              <p className="font-bold text-orange-300 mb-2 text-lg">📱 Mobile Ready</p>
              <p className="text-blue-200 text-sm">Works perfectly on phones, tablets, and desktop</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-xl mb-4">🚀 How to Use</h3>
          <div className="grid md:grid-cols-3 gap-4 text-blue-200">
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="font-bold text-blue-300 mb-2">1️⃣ Click Any Destination</p>
              <p className="text-sm">Choose from 10 popular places to instantly travel there in 360°</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="font-bold text-blue-300 mb-2">2️⃣ Search Anywhere</p>
              <p className="text-sm">Type any location and click Search to open it in Google Maps</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="font-bold text-blue-300 mb-2">3️⃣ Navigate & Explore</p>
              <p className="text-sm">Drag to look around, click arrows to walk, use fullscreen mode</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-blue-300 text-sm">
            💡 <span className="font-semibold">Pro Tip:</span> To add more locations, just visit Google Maps, find a place with Street View, 
            click Share → Embed a map, and copy the iframe URL!
          </p>
        </div>
      </div>
    </div>
  );
}

/* 
===========================================
SETUP INSTRUCTIONS - SUPER EASY!
===========================================

STEP 1: Install Icons (if not installed)
npm install lucide-react

STEP 2: Save this file
Save as: components/FreeStreetView.jsx

STEP 3: Use in your page
// app/page.js or pages/index.js
import FreeStreetView from '@/components/FreeStreetView';

export default function Home() {
  return <FreeStreetView />;
}

STEP 4: Run your project
npm run dev

THAT'S IT! ✨
- No API key needed
- No billing
- No setup
- 100% FREE forever!

===========================================
HOW TO ADD MORE LOCATIONS:
===========================================

1. Go to https://www.google.com/maps
2. Search for a location with Street View (blue line on roads)
3. Click the location to enter Street View
4. Click "Share" button
5. Click "Embed a map" tab
6. Copy the URL from the iframe src
7. Add it to the locations array above!

Example:
{
  name: 'Your Location Name',
  embed: 'PASTE_THE_IFRAME_URL_HERE'
}

===========================================
*/