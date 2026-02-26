"use client";

import { useState, useEffect, useRef } from "react";

// ──────────────────────────────────────────
// DATA
// streetViewUrl: grab from Google Maps → Share → Embed a map
// Switch the mode to Street View first, then copy the src="" value
// ──────────────────────────────────────────
const destinationData = {
  Beaches: [
    {
      id: 1,
      name: "Radhanagar Beach",
      location: "Andaman & Nicobar",
      desc: "Voted Asia's best beach, famous for its turquoise waters and pristine white sand.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      rating: 4.9,
      tag: "Must Visit",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771881411182!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0U1OGlmTXc.!2m2!1d11.983954581179!2d92.95302082322212!3f21.58302173403812!4f-21.69147078070941!5f0.40000000000000029",
    },
    {
      id: 2,
      name: "Varkala Beach",
      location: "Kerala",
      desc: "Dramatic cliff-backed beach with mineral springs and a laid-back bohemian vibe.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.7,
      tag: "Hidden Gem",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771881602418!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRHE3Wm1WbWdF!2m2!1d8.735600734176804!2d76.7032158832609!3f223.13805249914313!4f10.297742926763291!5f0.7820865974627469",
    },
    {
      id: 3,
      name: "Palolem Beach",
      location: "Goa",
      desc: "Crescent-shaped paradise fringed with coconut palms and calm lagoon waters.",
      image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80",
      rating: 4.6,
      tag: "Popular",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001003!6m8!1m7!1sCAoSLEFGMVFpcE1YQlE3c2p4Ujg3UmhTd0NtMnNNSGJCZF9YSnlWWGtMc0tLSU1P!2m2!1d15.0100!2d74.0232!3f270!4f0!5f0.7820865974627469",
    },
    {
      id: 4,
      name: "Rushikonda Beach",
      location: "Andhra Pradesh",
      desc: "Golden sands ideal for water sports like surfing and parasailing.",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      rating: 4.4,
      tag: "Adventure",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771882413015!6m8!1m7!1sBV74_yO0Yb2bh3AjeoU_sA!2m2!1d17.78161358437044!2d83.38525272241404!3f80.3592710686715!4f-3.9246404120517298!5f0.7820865974627469",
    },
  ],
  Mountains: [
    {
      id: 5,
      name: "Roopkund Trek",
      location: "Uttarakhand",
      desc: "Mysterious glacial lake trek surrounded by towering Himalayan peaks.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.8,
      tag: "Must Visit",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771882901575!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0JwZGJ5c3dF!2m2!1d30.29414208509488!2d79.73509346136689!3f149.4261122987652!4f-6.258592627393867!5f0.4000000000000002",
    },
    {
      id: 6,
      name: "Coorg Hills",
      location: "Karnataka",
      desc: "Scotland of India — misty coffee plantations and stunning viewpoints.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      rating: 4.7,
      tag: "Scenic",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771883087840!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRGE4cXFTMkFF!2m2!1d12.45838732930454!2d75.71692624035504!3f354.3236797122302!4f-1.1115107913668965!5f0.4000000000000002",
    },
    {
      id: 7,
      name: "Spiti Valley",
      location: "Himachal Pradesh",
      desc: "Cold desert mountain valley with ancient monasteries and star-filled skies.",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
      rating: 4.9,
      tag: "Hidden Gem",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771883626532!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2s1SVNmUHc.!2m2!1d32.24613698197363!2d78.03491602101981!3f227.42502182054966!4f-1.0144406814414992!5f0.7820865974627469",
    },
    {
      id: 8,
      name: "Munnar",
      location: "Kerala",
      desc: "Rolling tea gardens blanketed in mist with cool highland air.",
      image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1769791915/Kerala_Munnar_Wayanad_cxrsqn.jpg",
      rating: 4.6,
      tag: "Popular",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771883704077!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRE9pZm1rb3dF!2m2!1d10.05746090219829!2d77.06599828475535!3f113.07765537789722!4f18.380095618974167!5f0.7820865974627469",
    },
  ],
  Temples: [
    {
      id: 9,
      name: "Brihadeeswarar Temple",
      location: "Thanjavur, Tamil Nadu",
      desc: "UNESCO-listed Chola masterpiece — 1000-year-old Dravidian architecture at its peak.",
      image: "/p1.webp",
      rating: 4.9,
      tag: "UNESCO",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771883833821!6m8!1m7!1sgrRTFFhXExfoNwav2l5Jnw!2m2!1d10.78244301411931!2d79.13092121543228!3f174.1864281194426!4f13.415850823471729!5f0.7820865974627469",
    },
    {
      id: 10,
      name: "Khajuraho Temples",
      location: "Madhya Pradesh",
      desc: "Famous for intricate carvings and stunning Nagara-style architecture.",
      image: "/p2.webp",
      rating: 4.7,
      tag: "Must Visit",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771883950885!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzYxcVBxU0E.!2m2!1d24.85305611046811!2d79.91985240718375!3f238.9986006021511!4f1.5!5f0.4000000000000002" },
    {
      id: 11,
      name: "Sun Temple Konark",
      location: "Odisha",
      desc: "Magnificent chariot-shaped temple dedicated to the sun god, built in 13th century.",
      image: "/p3.jpg",
      rating: 4.8,
      tag: "UNESCO",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771884072189!6m8!1m7!1sQmM7_qzYZ2CAWspGmd9M8w!2m2!1d19.88756548003478!2d86.09408322355755!3f78.33806945157454!4f14.7594375380246!5f0.7820865974627469",
    },
    {
      id: 12,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      desc: "Colourful gopurams adorned with thousands of sculpted figures.",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
      rating: 4.8,
      tag: "Iconic",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001012!6m8!1m7!1sCAoSLEFGMVFpcE5oMWpxc2JuWkdvMkFFWWI3bHpvbHFJQ3E5ZWZGRmRDQkE0RVVo!2m2!1d9.9195!2d78.1193!3f0!4f0!5f0.7820865974627469",
    },
  ],
  Forts: [
    {
      id: 13,
      name: "Mehrangarh Fort",
      location: "Jodhpur, Rajasthan",
      desc: "Towering above the Blue City, this massive fort offers breathtaking panoramic views.",
      image: "/m1.jpg",
      rating: 4.9,
      tag: "Must Visit",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001013!6m8!1m7!1sCAoSLEFGMVFpcE1fZDV6eTBhUUlYeERFdExVOFZlT1NYN09ub0N2VHlKaHR6NWZm!2m2!1d26.2980!2d73.0188!3f180!4f10!5f0.7820865974627469",
    },
    {
      id: 14,
      name: "Golconda Fort",
      location: "Hyderabad, Telangana",
      desc: "Former diamond trading hub with an incredible acoustic system still functioning today.",
      image: "/m2.jpg",
      rating: 4.6,
      tag: "Historic",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001014!6m8!1m7!1sCAoSLEFGMVFpcE5oT1g2S1V1bWgxOHZfT3pzQ3ZVZDl5YlhKREUwVU82MHR1Q1lX!2m2!1d17.3833!2d78.4011!3f270!4f0!5f0.7820865974627469",
    },
    {
      id: 15,
      name: "Chittorgarh Fort",
      location: "Rajasthan",
      desc: "India's largest fort — a testament to Rajput valour, sacrifice, and legend.",
      image: "/m3.avif",
      rating: 4.8,
      tag: "UNESCO",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001015!6m8!1m7!1sCAoSLEFGMVFpcE5zU2dMSW1adXdBV3NGM0hhSzFZUlduZ1ZsWXJRYzgxMjVHSmdj!2m2!1d24.8893!2d74.6446!3f45!4f0!5f0.7820865974627469",
    },
    {
      id: 16,
      name: "Agra Fort",
      location: "Uttar Pradesh",
      desc: "Red sandstone Mughal masterpiece where Shah Jahan spent his final years.",
      image: "/m4.jpg",
      rating: 4.7,
      tag: "UNESCO",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001016!6m8!1m7!1sCAoSLEFGMVFpcE01ZjlQMThXOWpCTFk1VkVWNVZ5NGdxWEhGSm1FQVppMTFCbW9h!2m2!1d27.1795!2d78.0211!3f0!4f0!5f0.7820865974627469",
    },
  ],
  Waterfalls: [
    {
      id: 17,
      name: "Dudhsagar Falls",
      location: "Goa / Karnataka",
      desc: "Milky cascade plunging 310m through lush rainforest — best viewed from a train crossing.",
      image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1769791984/Dudhsagar_Falls_Goa_qugy6q.jpg",
      rating: 4.8,
      tag: "Dramatic",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001017!6m8!1m7!1sCAoSLEFGMVFpcE5MaWZJNm44ZDFHbzlvX001N2ZwNkREQ3JxU3VycnBMU3hKZk5w!2m2!1d15.3144!2d74.3144!3f180!4f20!5f0.7820865974627469",
    },
    {
      id: 18,
      name: "Athirappilly Falls",
      location: "Kerala",
      desc: "Kerala's Niagara — a majestic curtain of water in the heart of the jungle.",
      image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1769791983/Athirappilly_Falls_Kerala_cnjjmd.jpg",
      rating: 4.7,
      tag: "Scenic",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001018!6m8!1m7!1sCAoSLEFGMVFpcE1WSnBRcjY4X3RPOGtNZzlpaEFhb241T1VoazNobHFBakFuaUNv!2m2!1d10.2847!2d76.5697!3f90!4f-10!5f0.7820865974627469",
    },
    {
      id: 19,
      name: "Chitrakoot Falls",
      location: "Chhattisgarh",
      desc: "India's widest waterfall, roaring red during monsoon.",
      image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1769791981/Chitrakote_Falls_Chhattisgarh_dsa7az.jpg",
      rating: 4.6,
      tag: "Hidden Gem",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771885303811!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRFM3ZUt4ZEE.!2m2!1d19.20727965850413!2d81.70004266444822!3f139.57796415507497!4f-3.504454778996248!5f0.7820865974627469",
    },
    {
      id: 20,
      name: "Nohkalikai Falls",
      location: "Meghalaya",
      desc: "India's tallest plunge waterfall at 340m, set against surreal green cliffs.",
      image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1769791980/Nohkalikai_Falls_Meghalaya_hk3ekl.jpg",
      rating: 4.9,
      tag: "Must Visit",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771885467344!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0U4TzM3MlFF!2m2!1d25.27903082691472!2d91.68699850714931!3f34.664375420480724!4f1.5714369907465482!5f0.7820865974627469",
    },
  ],
  Heritage: [
    {
      id: 21,
      name: "Hampi",
      location: "Karnataka",
      desc: "Surreal boulder landscape scattered with ruins of the Vijayanagara Empire.",
      image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770212396/hampi_ipxt1r.jpg",
      rating: 4.9,
      tag: "UNESCO",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001021!6m8!1m7!1sCAoSLEFGMVFpcE5oSHBMcTh0MFF1UlQxb2ZUM1NNTlRxa3Y3MWlLX3pFcVJGMDFo!2m2!1d15.3350!2d76.4600!3f0!4f0!5f0.7820865974627469",
    },
    {
      id: 22,
      name: "Rani ki Vav",
      location: "Patan, Gujarat",
      desc: "Inverted step-well adorned with 500+ sculptures — a subterranean art gallery.",
      image: "/a1.jpg",
      rating: 4.8,
      tag: "UNESCO",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1771885786625!6m8!1m7!1smw-E3T4d8nEAAAQfCPVuUQ!2m2!1d23.85891915795196!2d72.10189969833931!3f298.7049266530904!4f-11.189916028952098!5f0.7820865974627469",
    },
    {
      id: 23,
      name: "Ajanta Caves",
      location: "Aurangabad, Maharashtra",
      desc: "2nd-century BC rock-cut Buddhist caves with extraordinary murals.",
      image: "/a2.jpg",
      rating: 4.8,
      tag: "UNESCO",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001023!6m8!1m7!1sCAoSLEFGMVFpcE1ZNTVDNUZhQ0VGeUZhME82dVFJa0tFbTRnQjVTcktCZFFJZkhh!2m2!1d20.5519!2d75.7033!3f90!4f0!5f0.7820865974627469",
    },
    {
      id: 24,
      name: "Old Goa Churches",
      location: "Goa",
      desc: "Portuguese baroque cathedrals housing the sacred relics of St Francis Xavier.",
      image: "a3.jpg",
      tag: "Historic",
      streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1700001024!6m8!1m7!1sCAoSLEFGMVFpcE1IdFhOeFJRSlJMd1Y4TEFjMEpWa3hfdG5OR19lLUlKUnUzd3V2!2m2!1d15.5009!2d73.9117!3f270!4f0!5f0.7820865974627469",
    },
  ],
};

const tagColors = {
  "Must Visit": "bg-emerald-500",
  "Hidden Gem": "bg-violet-500",
  Popular: "bg-blue-500",
  Adventure: "bg-orange-500",
  Scenic: "bg-teal-500",
  UNESCO: "bg-amber-500",
  Dramatic: "bg-rose-500",
  Historic: "bg-stone-500",
  Iconic: "bg-pink-500",
};

const allCategories = ["All", ...Object.keys(destinationData)];

// ──────────────────────────────────────────
// Drag hint — fades out after 3 s
// ──────────────────────────────────────────
function DragHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="px-6 py-3 rounded-2xl text-white text-sm font-semibold flex items-center gap-3"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3" />
        </svg>
        Drag to explore 360°
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Street View Modal
// ──────────────────────────────────────────
function StreetViewModal({ destination, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    // Lock body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "rgba(0,0,0,0.95)" }}>

      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-4">
          {/* 360° badge */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "#fff" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            360°
          </span>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{destination.name}</h2>
            <p className="text-slate-400 text-xs">📍 {destination.location}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          ✕ Close
        </button>
      </div>

      {/* ── iframe fills remaining space ── */}
      <div className="flex-1 relative overflow-hidden">
        <iframe
          key={destination.id}
          title={`Street View — ${destination.name}`}
          src={destination.streetViewUrl}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <DragHint />
      </div>

      {/* ── Bottom hint bar ── */}
      <div
        className="shrink-0 px-6 py-2.5 flex items-center gap-3 text-xs text-slate-500"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span>🖱 Drag to look around</span>
        <span>·</span>
        <span>🔍 Scroll to zoom</span>
        <span>·</span>
        <span>⌨ Esc to close</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// SearchPlaces (category grid)
// ──────────────────────────────────────────
const categoryTiles = [
  { id: "beaches",    name: "Beaches",    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
  { id: "mountains",  name: "Mountains",  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { id: "temples",    name: "Temples",    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80" },
  { id: "forts",      name: "Forts",      image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&q=80" },
  { id: "waterfalls", name: "Waterfalls", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80" },
  { id: "heritage",   name: "Heritage",   image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80" },
];

function SearchPlaces({ onCategorySelect }) {
  const tilesRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current || !tilesRef.current.length) return;
    tilesRef.current.forEach((tile) => {
      if (!tile) return;
      tile.style.opacity = "0";
      tile.style.transform = "translateY(40px) scale(0.95)";
      tile.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tilesRef.current.forEach((tile, i) => {
              if (!tile) return;
              setTimeout(() => {
                tile.style.opacity = "1";
                tile.style.transform = "translateY(0) scale(1)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  tilesRef.current = [];

  return (
    <div className="min-h-screen bg-slate-100 py-20 px-8">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Explore by Category</h2>
        <div className="grid grid-cols-2 gap-8">
          {categoryTiles.map((cat, i) => (
            <div
              key={cat.id}
              ref={(el) => { if (el) tilesRef.current[i] = el; }}
              onClick={() => onCategorySelect(cat.name)}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative h-full flex items-end p-6">
                <h3 className="text-3xl font-bold text-white">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Destination Card
// ──────────────────────────────────────────
function DestinationCard({ destination, onExplore }) {
  const tagColor = tagColors[destination.tag] ?? "bg-slate-500";
  const [hovered, setHovered] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className={`absolute top-3 right-3 ${tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {destination.tag}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold text-slate-800">{destination.name}</h3>
          <span className="flex items-center gap-1 text-amber-500 text-sm font-semibold shrink-0 ml-2">★ {destination.rating}</span>
        </div>
        <p className="text-xs font-medium text-blue-600 mb-2">📍 {destination.location}</p>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{destination.desc}</p>

        {/* ── Explore 360° button ── */}
        <button
          onClick={() => onExplore(destination)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="mt-4 w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            background: hovered
              ? "linear-gradient(135deg,#2563eb,#4f46e5)"
              : "linear-gradient(135deg,#1e293b,#334155)",
            transform: hovered ? "scale(1.02)" : "scale(1)",
          }}
        >
          {/* Globe icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Explore 360°
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Destinations page
// ──────────────────────────────────────────
function Destinations({ initialCategory, onBack }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [streetViewDest, setStreetViewDest] = useState(null);

  useEffect(() => { setActiveCategory(initialCategory); }, [initialCategory]);

  const destinations =
    activeCategory === "All"
      ? Object.values(destinationData).flat()
      : destinationData[activeCategory] ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Street View modal — rendered above everything */}
      {streetViewDest && (
        <StreetViewModal
          destination={streetViewDest}
          onClose={() => setStreetViewDest(null)}
        />
      )}

      {/* Sticky header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-4 flex items-center gap-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-blue-700 rounded-full text-white text-sm font-semibold shadow transition-all"
        >
          ← Back
        </button>
        <div className="flex gap-2 overflow-x-auto flex-1">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-blue-700 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-baseline gap-3 mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            {activeCategory === "All" ? "All Destinations" : activeCategory}
          </h2>
          <span className="text-slate-400 text-sm">{destinations.length} places</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onExplore={(d) => setStreetViewDest(d)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Root
// ──────────────────────────────────────────
export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDestinations, setShowDestinations] = useState(false);

  return (
    <>
      {!showDestinations ? (
        <SearchPlaces
          onCategorySelect={(name) => {
            setSelectedCategory(name);
            setShowDestinations(true);
          }}
        />
      ) : (
        <Destinations
          initialCategory={selectedCategory}
          onBack={() => {
            setShowDestinations(false);
            setSelectedCategory("All");
          }}
        />
      )}
    </>
  );
}