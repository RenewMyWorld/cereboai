import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

const GlassCard = ({ children, className = '', hover = true, style }: GlassCardProps) => {
  return (
    <div style={style} className={`
      p-6 rounded-xl 
      bg-white/5 backdrop-blur-sm 
      border border-white/10 
      ${hover ? 'hover:border-indigo-500/50 transition-all duration-300 hover:scale-105' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;