'use client';

import { motion } from 'framer-motion';

export default function BackgroundWrapper({ children }) {
  const blobAnimation = {
    animate: {
      x: [-30, 30, -30],
      y: [20, -20, 20],
      scale: [1, 1.1, 1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={blobAnimation}
          animate="animate"
          className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-20"
        />

        <motion.div
          variants={blobAnimation}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-40 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-20"
        />

        <motion.div
          variants={blobAnimation}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply blur-3xl opacity-20"
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        h1, h2, h3 {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}
