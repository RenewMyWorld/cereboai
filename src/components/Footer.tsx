import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-800',
          link: 'text-gray-600 hover:text-gray-900',
          border: 'border-gray-200',
          icon: 'text-gray-400 hover:text-gray-600'
        };
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-gray-300',
          link: 'text-gray-400 hover:text-white',
          border: 'border-gray-800',
          icon: 'text-gray-500 hover:text-gray-300'
        };
      default:
        return {
          background: 'bg-black/50 backdrop-blur-md',
          text: 'text-gray-300',
          link: 'text-gray-400 hover:text-white',
          border: 'border-white/20',
          icon: 'text-gray-400 hover:text-white'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <footer className={`${styles.background} ${styles.text} border-t ${styles.border}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Cerebo</h3>
            <p className={`${styles.text} text-sm`}>
              Empowering developers with AI-driven solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className={`text-sm ${styles.link} transition-colors`}>
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/developers" className={`text-sm ${styles.link} transition-colors`}>
                  Developers
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-sm ${styles.link} transition-colors`}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.icon} transition-colors`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.icon} transition-colors`}
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.icon} transition-colors`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${styles.border} text-center`}>
          <p className={`text-sm ${styles.text}`}>
            © {new Date().getFullYear()} Cerebo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;