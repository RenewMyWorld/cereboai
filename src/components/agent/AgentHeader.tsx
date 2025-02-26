import React from 'react';
import { Star, Shield, Users } from 'lucide-react';
import type { AIAgent } from '../../types';

interface AgentHeaderProps {
  agent: AIAgent;
}

const AgentHeader = ({ agent }: AgentHeaderProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{agent.name}</h1>
          <p className="text-gray-400 text-lg mb-4">{agent.description}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white">{agent.rating} Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" />
              <span className="text-white">1.2k Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-white">Verified</span>
            </div>
          </div>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Try Now
        </button>
      </div>
    </div>
  );
};

export default AgentHeader;