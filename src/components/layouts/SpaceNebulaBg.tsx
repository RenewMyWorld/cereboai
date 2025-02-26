import React from 'react';
import { motion } from 'framer-motion';

const SpaceNebulaBg: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <svg 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Gradient Background */}
        <defs>
          <linearGradient id="nebula-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A192F" stopOpacity="1" />
            <stop offset="50%" stopColor="#112240" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0A192F" stopOpacity="1" />
          </linearGradient>
          
          {/* Nebula Blur Filters */}
          <filter id="nebula-blur">
            <feGaussianBlur stdDeviation="100" />
          </filter>
        </defs>

        {/* Background Gradient */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#nebula-gradient)"
        />

        {/* Animated Nebula Layers */}
        <motion.g 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Large Nebula Blobs */}
          <circle 
            cx="30%" 
            cy="20%" 
            r="300" 
            fill="rgba(10, 25, 47, 0.6)" 
            filter="url(#nebula-blur)"
          />
          <circle 
            cx="70%" 
            cy="70%" 
            r="250" 
            fill="rgba(17, 34, 64, 0.5)" 
            filter="url(#nebula-blur)"
          />
        </motion.g>

        {/* Subtle Moving Particles */}
        <motion.g 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            transform: [
              'translateX(0px) translateY(0px)',
              'translateX(50px) translateY(30px)',
              'translateX(-50px) translateY(-30px)'
            ]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {[...Array(50)].map((_, i) => (
            <circle 
              key={i}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r={Math.random() * 2}
              fill="rgba(255, 255, 255, 0.1)"
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default SpaceNebulaBg;
