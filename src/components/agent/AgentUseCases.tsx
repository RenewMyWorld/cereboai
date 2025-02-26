import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface UseCase {
  title: string;
  description: string;
  details: string;
}

interface AgentUseCasesProps {
  useCases: UseCase[];
}

const AgentUseCases = ({ useCases }: AgentUseCasesProps) => {
  const [expandedCases, setExpandedCases] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedCases(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Use Cases</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {useCases.map((useCase, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-indigo-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
                
                {useCase.details && (
                  <div className="mt-4">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {expandedCases.includes(index) ? (
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
                    
                    {expandedCases.includes(index) && (
                      <div className="mt-4 text-gray-400 animate-fade-in">
                        {useCase.details}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentUseCases;