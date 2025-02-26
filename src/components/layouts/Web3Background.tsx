import React from 'react';
import ParticleNetwork from '../animations/ParticleNetwork';
import GlowingOrb from '../animations/GlowingOrb';
import FloatingLines from '../animations/FloatingLines';

interface Web3BackgroundProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
}

const Web3Background = ({ children, variant = 'dark' }: Web3BackgroundProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className={`absolute inset-0 ${
        variant === 'dark' 
          ? 'bg-gradient-to-br from-black to-indigo-950' 
          : 'bg-gradient-to-br from-indigo-50 to-white'
      }`}>
        <ParticleNetwork />
        <GlowingOrb />
        <FloatingLines />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default Web3Background;