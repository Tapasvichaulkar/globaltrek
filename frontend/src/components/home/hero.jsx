'use client';
import React, { useState, useEffect } from 'react';
import { Search, Globe, Menu, X, } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const slides = [
    {
      video: '/sky1.mp4',
      title: 'Explore Underwater Wonders'
    },
    {
      video: '/sky2.mp4',
      title: 'Discover Mountain Peaks'
    },
    {
      video: '/sk3.mp4',
      title: 'Journey Through Cities'
    },
    {
      video: '/sky4.mp4',
      title: 'Experience Nature'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <video
            key={index}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation Bar */}
     

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-4rem)] px-4">
        {/* Logo and Tagline */}
        <div className="text-center mt-10 sm:mt-14">
          <h1
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-3 sm:mb-6 tracking-wider"
            style={{ fontFamily: 'cursive' }}
          >
            GlobalTrek
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-white/90 font-light px-4 sm:px-0">
            A virtual journey around the world
          </p>
        </div>

        {/* Search Bar */}
       

        {/* Slide Indicators */}
        <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-0">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 sm:h-3 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-white w-6 sm:w-8'
                  : 'w-2.5 sm:w-3 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}