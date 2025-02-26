import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import type { AIAgent } from '../../types';

interface AgentCardProps {
  agent: AIAgent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-indigo-500 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-300">{agent.rating}</span>
        </div>
      </div>
      <p className="text-gray-400 mb-4">{agent.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-indigo-400">by {agent.developer.name}</span>
        <Link 
          to={`/agent/${agent.id}`}
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
        >
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;