import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-2">{description}</p>
        <ul className="list-disc list-inside mb-4">
          <li>Click a technology to see its npm command</li>
          <li>Pro Tip: Hover over the Technology Toolbar to pause its automatic scrolling.</li>
        </ul>
        <p className="mb-4">
          Discover a seamless technology integration experience with our innovative floating toolbar. 
          Discreetly positioned to the left, this dynamic toolbar showcases a curated selection of 
          cutting-edge technologies. Each icon represents a powerful tool in your development arsenal, 
          ready to be explored and integrated with a simple click.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
