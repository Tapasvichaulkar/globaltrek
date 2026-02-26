'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const destinations = [
  {
    id: 1,
    name: 'Taj Mahal',
    location: 'Agra, India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    color: 'from-orange-400 to-pink-500'
  },
  {
    id: 2,
    name: 'Goa Beach',
    location: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 3,
    name: 'Jaipur',
    location: 'Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 4,
    name: 'Kerala Backwaters',
    location: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 5,
    name: 'Ladakh',
    location: 'Jammu & Kashmir, India',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 6,
    name: 'Varanasi Ghats',
    location: 'Uttar Pradesh, India',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 7,
    name: 'Hampi Ruins',
    location: 'Karnataka, India',
    image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80',
    color: 'from-yellow-400 to-amber-500'
  },
  {
    id: 8,
    name: 'Munnar Tea Gardens',
    location: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    color: 'from-teal-400 to-green-500'
  }
];

const DestinationCard = ({ destination, index, activeIndex, onClick, onExplore }) => {
  const isActive = index === activeIndex;
  const distance = Math.abs(index - activeIndex);

  const getCardStyle = () => {
    if (isActive) {
      return { transform: 'scale(1.1) translateY(-20px) rotateY(0deg)', opacity: 1, zIndex: 30 };
    } else if (distance === 1) {
      return {
        transform: `scale(0.95) translateY(0px) rotateY(${index < activeIndex ? '15deg' : '-15deg'})`,
        opacity: 0.8, zIndex: 20
      };
    } else {
      return {
        transform: `scale(0.85) translateY(10px) rotateY(${index < activeIndex ? '25deg' : '-25deg'})`,
        opacity: 0.5, zIndex: 10
      };
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 w-80 h-96 cursor-pointer transition-all duration-700 ease-out"
      style={getCardStyle()}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden group shadow-2xl">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-lg animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-xs font-bold text-gray-800">360° View</span>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className={`transform transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h3 className="text-3xl font-bold text-white mb-2">{destination.name}</h3>
            <p className="text-white/90 text-sm mb-4 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {destination.location}
            </p>
            <button
              className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onExplore();
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Explore Now</span>
            </button>
          </div>
        </div>

        {isActive && (
          <>
            <div className="absolute top-20 left-8 animate-bounce">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📸</span>
              </div>
            </div>
            <div className="absolute top-32 right-12 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🌍</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function DestinationsCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isAutoPlaying || !isMounted) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    const cardWidth = 320 + 32;
    const containerWidth = scrollContainer.clientWidth;
    const scrollPosition = (activeIndex * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
    scrollContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }, [activeIndex, isMounted]);

  const handleNext = () => { setActiveIndex((prev) => (prev + 1) % destinations.length); setIsAutoPlaying(false); };
  const handlePrev = () => { setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length); setIsAutoPlaying(false); };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Popular 360° Destinations</h2>
        <p className="text-xl text-blue-200">Explore breathtaking views from anywhere</p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className="flex items-center gap-8 px-4 overflow-x-hidden py-12"
          style={{ perspective: '1000px', scrollBehavior: 'smooth' }}
        >
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              activeIndex={activeIndex}
              onClick={() => { setActiveIndex(index); setIsAutoPlaying(false); }}
              onExplore={() => router.push('/destination')}
            />
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl z-40"
          aria-label="Previous destination"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl z-40"
          aria-label="Next destination"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center items-center space-x-3 mt-12">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => { setActiveIndex(index); setIsAutoPlaying(false); }}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to destination ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 shadow-lg"
        >
          {isAutoPlaying ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Pause</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Auto Play</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}