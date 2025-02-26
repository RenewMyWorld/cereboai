import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface CapabilityProps {
  title: string;
  description: string;
  details: string;
}

const CapabilityCard = ({ title, description, details }: CapabilityProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 transition-all duration-300">
      <div className="flex items-start gap-3">
        <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
          
          {details && (
            <div className="mt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Show more</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
              
              {isExpanded && (
                <div className="mt-4 text-gray-400 animate-fade-in">
                  {details}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapabilityCard;