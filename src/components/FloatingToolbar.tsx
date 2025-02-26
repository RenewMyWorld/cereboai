import React, { useState, useEffect, useRef } from 'react';
import TechIconGrid from './TechIconGrid';
import FloatingToolbarGrid from './FloatingToolbarGrid';
import { Package } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Package as ExpressIcon } from 'lucide-react'; // Placeholder icon for Express
import { Package as ReactIcon } from 'lucide-react'; // Placeholder icon for React
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Package {
  name: string;
  icon: any;
  description: string;
}

const FloatingToolbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const npmPackages = [
    { name: 'Express.js', icon: <ExpressIcon />, description: 'Popular Node.js web framework for building web applications' },
    { name: 'React.js', icon: <ReactIcon />, description: 'JavaScript library for building user interfaces' },
    // Add other packages as needed
  ];

  console.log('NPM Packages:', npmPackages);

  const openModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsVisible(true);
  };

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      if (toolbarRef.current) {
        console.log('Auto-scroll started'); // Debugging log
        scrollInterval = setInterval(() => {
          const scrollAmount = 2; // Increased scroll amount for smoother scrolling
          console.log(`Scrolling by ${scrollAmount}`); // Debugging log
          toolbarRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' }); // Changed to vertical scrolling
        }, 50); // Adjusted interval timing for smoother scrolling
      }
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
      console.log('Auto-scroll stopped'); // Debugging log
    };

    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, []);

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white/20',
          text: 'text-gray-800',
          hover: 'hover:bg-white/30',
          border: 'border-gray-200'
        };
      case 'dark':
        return {
          background: 'bg-black/20',
          text: 'text-white',
          hover: 'hover:bg-black/30',
          border: 'border-gray-800'
        };
      default:
        return {
          background: 'bg-white/20',
          text: 'text-white',
          hover: 'hover:bg-white/30',
          border: 'border-white/20'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div
      className="fixed left-0 top-20 z-40"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="relative"
      >
        <button
          onClick={() => setIsVisible(true)}
          className="absolute -right-10 top-0 bg-black/80 p-2 rounded-full
            backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors"
        >
          <Package className="w-5 h-5" />
        </button>
        {isVisible && <FloatingToolbarGrid />}
        {selectedPackage && (
          <Modal onClose={() => setSelectedPackage(null)}>
            <h2>{selectedPackage.name}</h2>
            <p>{selectedPackage.description}</p>
            {/* Add more modal content as needed */}
          </Modal>
        )}
      </motion.div>
    </div>
  );
};

export default FloatingToolbar;
