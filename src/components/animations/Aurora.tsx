import React from 'react';

const Aurora = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute w-full h-1/3 animate-float-slower" style={{
        top: '0%', 
        background: 'linear-gradient(90deg, rgba(99, 102, 241, 0) 0%, rgba(167, 139, 250, 0.2) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(167, 139, 250, 0.2) 75%, rgba(99, 102, 241, 0) 100%)', 
        filter: 'blur(50px)', 
        transform: 'skewY(-5deg)', 
        animationDelay: '0s'
      }}></div>
      <div className="absolute w-full h-1/3 animate-float-slower" style={{
        top: '33%', 
        background: 'linear-gradient(90deg, rgba(99, 102, 241, 0) 0%, rgba(167, 139, 250, 0.2) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(167, 139, 250, 0.2) 75%, rgba(99, 102, 241, 0) 100%)', 
        filter: 'blur(50px)', 
        transform: 'skewY(-5deg)', 
        animationDelay: '2s'
      }}></div>
      <div className="absolute w-full h-1/3 animate-float-slower" style={{
        top: '66%', 
        background: 'linear-gradient(90deg, rgba(99, 102, 241, 0) 0%, rgba(167, 139, 250, 0.2) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(167, 139, 250, 0.2) 75%, rgba(99, 102, 241, 0) 100%)', 
        filter: 'blur(50px)', 
        transform: 'skewY(-5deg)', 
        animationDelay: '4s'
      }}></div>
    </div>
  );
};

export default Aurora;