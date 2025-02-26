import React from 'react';
import { motion } from 'framer-motion';
import { Package, X, Settings, LightbulbIcon } from 'lucide-react';

interface NPMToolsGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const NPMToolsGuide: React.FC<NPMToolsGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="w-full max-w-2xl mx-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="rounded-lg bg-black/80 backdrop-blur-md border border-white/20 overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center">
              <Package className="w-6 h-6 text-white" />
              <h2 className="ml-3 text-xl font-semibold text-white">
                Technology Toolbar
              </h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center ml-2 bg-white/10 rounded-lg px-2 py-1"
              >
                <Settings className="w-5 h-5 text-gray-300 mr-1" />
                <span className="text-sm text-gray-300">(Look for this icon)</span>
              </motion.div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <p className="text-white mb-4">
                  The Technology Toolbar provides quick access to various npm tools. Click on any technology to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Copy its npm installation command</li>
                  <li>See a toast notification with the copied command</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Available Technologies
                </h3>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  <div>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Express.js</li>
                      <li>React.js</li>
                      <li>Next.js</li>
                      <li>NodeMailer</li>
                      <li>MongoDB</li>
                      <li>Mongoose</li>
                      <li>Apollo Server</li>
                      <li>Apollo Client</li>
                      <li>JWT</li>
                      <li>Passport.js</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Babel</li>
                      <li>Webpack</li>
                      <li>ESLint</li>
                      <li>Prettier</li>
                      <li>Jest</li>
                      <li>Cypress</li>
                      <li>Docker</li>
                      <li>Docker Compose</li>
                      <li>NPM Studio</li>
                      <li>n8n</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  How to Use
                </h3>
                <p className="text-gray-300 mb-4">
                  Discover a seamless technology integration experience with our innovative floating toolbar. 
                  Discreetly positioned to the left, this dynamic toolbar showcases a curated selection of 
                  cutting-edge technologies. Each icon represents a powerful tool in your development arsenal, 
                  ready to be explored and integrated with a simple click.
                </p>
                
                {/* Animated Pro Tip Section - Updated with Package icon */}
                <motion.div 
                  className="bg-white/10 rounded-lg p-4 border border-blue-500/30"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.02, 1],
                    borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.3)']
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mt-1">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Package className="w-6 h-6 text-blue-400" />
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-blue-400 font-semibold text-lg mb-2">Pro Tip:</p>
                      <p className="text-gray-300 leading-relaxed">
                        Hover over the hidden Technology Toolbar, up toward the top left of the screen, 
                        to pause its automatic scrolling and select a tool!
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NPMToolsGuide; 