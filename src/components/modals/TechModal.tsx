import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy } from 'lucide-react';

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  tech: {
    name: string;
    icon: React.ElementType;
    command: string;
    description: string;
    codeExample: string;
    docsUrl: string;
    purpose: string;
  };
  onCopy: (command: string) => void;
}

const TechModal: React.FC<TechModalProps> = ({ isOpen, onClose, tech, onCopy }) => {
  if (!isOpen || !tech) return null;

  const codeLines = tech.codeExample ? tech.codeExample.split('\n') : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white p-8 rounded-lg w-full max-w-xl mx-auto relative shadow-2xl"
          >
            {/* Header with Title */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <tech.icon className="w-10 h-10 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">{tech.name}</h2>
                  <p className="text-gray-600 text-sm">{tech.purpose}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{tech.description}</p>

            {/* Installation and Usage */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6 relative">
              <h3 className="text-lg font-semibold mb-2">Installation & Usage</h3>
              <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                {codeLines.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </pre>
              <button
                onClick={() => onCopy(tech.command)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                title="Copy instructions"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <a
                href={tech.docsUrl}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-center"
              >
                Learn More
              </a>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechModal; 