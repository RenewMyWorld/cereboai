import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  instructions?: string[];
  learnMoreLink?: string;
}

export function Modal({ 
  isOpen, 
  onClose, 
  icon, 
  title, 
  description, 
  instructions = [], 
  learnMoreLink 
}: ModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    });
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-8 rounded-lg w-full max-w-xl mx-auto relative shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {React.cloneElement(icon as React.ReactElement, { 
              className: 'w-10 h-10 mr-3' 
            })}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-gray-700 mb-4">{description}</p>
        
        {instructions.length > 0 && (
          <div className="bg-gray-100 rounded-lg p-4 mb-4 relative">
            <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
              {instructions.map((instruction, index) => (
                <div key={index}>{instruction}</div>
              ))}
            </pre>
            <button 
              onClick={() => copyToClipboard(instructions.join('\n'))}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
              title="Copy instructions"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="flex space-x-4">
          {learnMoreLink && (
            <a 
              href={learnMoreLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-center"
            >
              Learn More
            </a>
          )}
          {instructions.length > 0 && (
            <button 
              onClick={() => copyToClipboard(instructions.join('\n'))}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
            >
              Copy Instructions
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && modalContent}
    </AnimatePresence>,
    document.body
  );
}
