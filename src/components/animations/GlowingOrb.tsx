import React from 'react';

const GlowingOrb = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-float-slower" />
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
    </div>
  );
};

export default GlowingOrb;