import React, { useState, useEffect, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode[];
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ children }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section should be active based on scroll position
      const newSectionIndex = children.findIndex((_, index) => {
        const sectionElement = document.getElementById(`section-${index}`);
        if (!sectionElement) return false;
        
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        
        return (
          scrollPosition >= sectionTop - windowHeight / 2 &&
          scrollPosition < sectionTop + sectionHeight - windowHeight / 2
        );
      });

      if (newSectionIndex !== -1 && newSectionIndex !== currentSectionIndex) {
        setCurrentSectionIndex(newSectionIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [children, currentSectionIndex]);

  return (
    <>
      {children.map((child, index) => {
        // Determine opacity and scale based on proximity to current section
        const opacityLevel = 
          index === currentSectionIndex ? 1 :
          Math.abs(index - currentSectionIndex) === 1 ? 0.6 :
          0.3;

        const scaleLevel = 
          index === currentSectionIndex ? 1 :
          Math.abs(index - currentSectionIndex) === 1 ? 0.95 :
          0.9;

        return (
          <div
            key={index}
            id={`section-${index}`}
            className={`relative transition-all duration-500 ease-in-out`}
            style={{
              opacity: opacityLevel,
              transform: `scale(${scaleLevel})`,
              zIndex: index === currentSectionIndex ? 10 : 
                      Math.abs(index - currentSectionIndex) === 1 ? 5 : 1,
              filter: index === currentSectionIndex 
                ? 'none' 
                : 'blur(2px) grayscale(10%)',
              paddingTop: index > 0 ? '20px' : '0',
              paddingBottom: index < children.length - 1 ? '20px' : '0',
              background: index === currentSectionIndex 
                ? 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0) 50%, transparent 100%)' 
                : 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
            }}
          >
            {child}
          </div>
        );
      })}
    </>
  );
};

export default SectionTransition;
