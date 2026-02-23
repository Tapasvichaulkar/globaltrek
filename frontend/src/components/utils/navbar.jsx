'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const itemsRef = useRef([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ ADDED (login state)
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // 🔐 check login
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Animations
    const animateNavbar = () => {
      if (logoRef.current) {
        logoRef.current.style.opacity = '0';
        logoRef.current.style.transform = 'translateY(-20px)';

        setTimeout(() => {
          logoRef.current.style.transition = 'all 0.8s ease';
          logoRef.current.style.opacity = '1';
          logoRef.current.style.transform = 'translateY(0)';
        }, 100);
      }

      itemsRef.current.forEach((item, index) => {
        if (item) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(-20px)';

          setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 200 + index * 100);
        }
      });
    };

    requestAnimationFrame(() => {
      animateNavbar();
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Destination', path: '/destination' },
    { name: 'Trip Planner', path: '/aitripplanner' },
    { name: 'Guide Booking', path: '/guide' },
    { name: 'Weather', path: '/weather' },
    { name: 'Packing Guide', path: '/packingsuggest' },
  ];

  const handleNavigation = (path) => {
    setShowMenu(false);
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.push('/login');
  };

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${
          isScrolled
            ? 'bg-gradient-to-b from-blue-900/95 via-blue-900/80 to-transparent backdrop-blur-lg'
            : 'bg-gradient-to-b from-blue-900 via-blue-900/70 to-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            ref={logoRef}
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavigation('/')}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110">
              <svg
                className="w-6 h-6 text-blue-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-wide">
              GlobalTrek
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                ref={(el) => (itemsRef.current[index] = el)}
                onClick={() => handleNavigation(item.path)}
                className="relative px-4 py-2 text-white font-medium rounded-lg transition-all duration-300 hover:bg-white/10 group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20"></div>
              </button>
            ))}
          </div>

          {/* 🔁 LOGIN → PROFILE (ONLY THIS PART CHANGED) */}
          {!user ? (
            <button
              ref={(el) => (itemsRef.current[navItems.length] = el)}
              onClick={() => handleNavigation('/login')}
              className="bg-transparent border border-white text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:bg-blue-900 hover:scale-105 active:scale-95"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full hover:bg-white/20 transition"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
