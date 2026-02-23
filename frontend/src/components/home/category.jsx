"use client";

import React, { useEffect, useRef, useState } from "react";

/* ===================== DATA ===================== */

const categories = [
  {
    id: "beaches",
    name: "Beaches",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    id: "mountains",
    name: "Mountains",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "temples",
    name: "Temples",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
  },
  {
    id: "forts",
    name: "Forts",
    image:
      "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&q=80",
  },
  {
    id: "waterfalls",
    name: "Waterfalls",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
  },
  {
    id: "heritage",
    name: "Heritage",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
  },
];

const placesData = {
  beaches: [
    {
      name: "Alibaug Beach",
      distance: "95 km",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    },
    {
      name: "Kashid Beach",
      distance: "135 km",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    },
  ],

  mountains: [
    {
      name: "Lonavala",
      distance: "110 km",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1604594849809-dfed20ce0c5c?w=800&q=80",
    },
    {
      name: "Mahabaleshwar",
      distance: "265 km",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1589307000280-7a3f64b6b3e4?w=800&q=80",
    },
  ],

  temples: [
    {
      name: "Siddhivinayak Temple",
      distance: "45 km",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1593697821286-e9e3dccb33e3?w=800&q=80",
    },
  ],

  forts: [
    {
      name: "Raigad Fort",
      distance: "165 km",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&q=80",
    },
  ],

  waterfalls: [
    {
      name: "Devkund Waterfall",
      distance: "155 km",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1526481280695-3c720685208b?w=800&q=80",
    },
  ],

  heritage: [
    {
      name: "Gateway of India",
      distance: "50 km",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1589800187324-87cc12d5aa42?w=800&q=80",
    },
  ],
};

/* ===================== COMPONENT ===================== */

export default function SearchPlaces() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const tilesRef = useRef([]);
  const sectionRef = useRef(null);

  /* ========== CATEGORY ANIMATION ========== */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    if (!tilesRef.current.length) return;

    tilesRef.current.forEach((tile) => {
      if (!tile) return;
      tile.style.opacity = "0";
      tile.style.transform = "translateY(40px) scale(0.95)";
      tile.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tilesRef.current.forEach((tile, index) => {
              if (!tile) return;
              setTimeout(() => {
                tile.style.opacity = "1";
                tile.style.transform = "translateY(0) scale(1)";
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ========== CATEGORY VIEW ========== */
  if (selectedCategory) {
    const category = categories.find(
      (c) => c.id === selectedCategory
    );
    const places = placesData[selectedCategory] || [];

    return (
      <div className="min-h-screen bg-slate-900 p-8 text-white">
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-8 px-4 py-2 rounded bg-slate-700 hover:bg-slate-600"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold mb-6">{category.name}</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">
                  {place.name}
                </h3>
                <p className="text-slate-400">
                  {place.distance} • ⭐ {place.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ========== CATEGORY GRID ========== */
  tilesRef.current = [];

  return (
    <div className="min-h-screen bg-slate-100 py-20 px-8">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={(el) => {
                if (el) tilesRef.current[index] = el;
              }}
              onClick={() =>
                setSelectedCategory(category.id)
              }
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative h-full flex items-end p-6">
                <h3 className="text-3xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
