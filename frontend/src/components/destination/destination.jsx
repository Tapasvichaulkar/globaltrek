"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DESTINATIONS_DATA, CATEGORIES } from "./d.jsx";

export default function Destinations() {
  const router = useRouter();
  const [active, setActive] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Filter destinations based on search and category
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((destination) => {
      const matchesSearch =
        destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || destination.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 mt-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-4">
          
            
            {active ? (
              <button
                onClick={() => {
                  setActive(null);
                  setSelectedView(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-purple-900 rounded-full transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Gallery
              </button>
            ) : (
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-purple-900 rounded-full transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </button>
            )}
          
        </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!active && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Discover All Destinations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore {DESTINATIONS_DATA.length} incredible locations across India in immersive 360°
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search destinations or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-700 shadow-md transition-all"
                  />
                  <svg
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-center">
                <p className="text-gray-600">
                  Showing <span className="font-bold text-purple-600">{filteredDestinations.length}</span> of{" "}
                  <span className="font-bold">{DESTINATIONS_DATA.length}</span> destinations
                </p>
              </div>
            </div>

            {/* Grid */}
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDestinations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActive(item)}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-gray-200 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {imageErrors[item.id] ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          <div className="text-center">
                            <svg
                              className="w-16 h-16 mx-auto text-purple-300 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-purple-600 text-sm">
                              Image unavailable
                            </p>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          onError={() => handleImageError(item.id)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
                      
                      {/* 360° Badge */}
                      <div className="absolute top-3 right-3 bg-blue-600 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-lg">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                        </svg>
                        360°
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-purple-600 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-purple-900 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No destinations found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}

        {active && (
          <div className="space-y-6 animate-fadeIn">
            {/* Title Section */}
            <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {active.title}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {active.location}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-blue-600 px-4 py-2 rounded-full text-white font-semibold text-sm shadow-md">
                  {active.category}
                </div>
              </div>
            </div>

            {/* Main Content with Right Sidebar */}
            <div className="flex gap-6">
              {/* Main 360° View - Left Side */}
              <div className="flex-1">
                <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-900 px-6 py-3 border-b border-purple-600">
                    <p className="text-gray-100 font-semibold flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      </svg>
                      {selectedView !== null
                        ? `Alternative View ${selectedView + 1}`
                        : "Main 360° View"}
                    </p>
                  </div>
                  {(selectedView !== null
                    ? active.views[selectedView]
                    : active.main360) ? (
                    <iframe
                      src={
                        selectedView !== null
                          ? active.views[selectedView]
                          : active.main360
                      }
                      className="w-full h-[70vh] bg-gray-100"
                      allowFullScreen
                      loading="lazy"
                      title={`360° view of ${active.title}`}
                    />
                  ) : (
                    <div className="w-full h-[70vh] bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-20 h-20 mx-auto text-purple-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-700 text-lg font-semibold">
                          360° view not available
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          This location doesn't have a street view yet
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Section - Below Main View */}
                <div className="mt-6 bg-gradient-to-r from-blue-100 to-pink-100 border border-purple-300 rounded-2xl p-6 shadow-md">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-gray-800 font-semibold mb-2">
                        How to Explore
                      </h3>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Click and drag to look around in 360°</li>
                        <li>• Use arrow keys to navigate</li>
                        <li>• Scroll to zoom in and out</li>
                        <li>• Click fullscreen icon for immersive experience</li>
                        <li>• Select alternative views from the sidebar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Alternative Views */}
              <div className="w-80 flex-shrink-0">
                <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden sticky top-24">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-900 px-4 py-3 border-b border-purple-600">
                    <p className="text-white font-semibold flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      Alternative Views ({active.views?.length || 0})
                    </p>
                  </div>

                  {/* Main View Option */}
                  <div className="p-3">
                    <button
                      onClick={() => setSelectedView(null)}
                      className={`w-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedView === null
                          ? "border-blue-600 shadow-lg scale-105"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="relative group">
                        <iframe
                          src={active.main360}
                          className="w-full h-32 pointer-events-none"
                          title="Main view thumbnail"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                            Main View
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Alternative Views */}
                  <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {active.views && active.views.length > 0 ? (
                      active.views.map((view, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedView(index)}
                          className={`w-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                            selectedView === index
                              ? "border-blue-600 shadow-lg scale-105"
                              : "border-gray-200 hover:border-blue-400"
                          }`}
                        >
                          <div className="relative group">
                            <iframe
                              src={view}
                              className="w-full h-32 pointer-events-none"
                              title={`View ${index + 1} thumbnail`}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                              <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                                View {index + 1}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg
                          className="w-12 h-12 mx-auto mb-2 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-sm">No alternative views</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}