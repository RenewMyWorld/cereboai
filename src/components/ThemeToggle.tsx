import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-2">
        <button
          onClick={() => setTheme('default')}
          className={`p-2 rounded-full transition-all ${
            theme === 'default' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Default Theme"
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTheme('light')}
          className={`p-2 rounded-full transition-all ${
            theme === 'light' ? 'bg-yellow-500 text-white' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Light Theme"
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`p-2 rounded-full transition-all ${
            theme === 'dark' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Dark Theme"
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default ThemeToggle; 