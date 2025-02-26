import React from 'react';
import type { AIAgent } from '../../types';
import { Star } from 'lucide-react';
import AgentCapabilities from '../agent/AgentCapabilities';
import AgentUseCases from '../agent/AgentUseCases';
import { getAgentDetails } from '../../utils/agentDetails';

interface AgentDetailsCardProps {
  agent: AIAgent;
}

const AgentDetailsCard = ({ agent }: AgentDetailsCardProps) => {
  const { capabilities, useCases } = getAgentDetails(agent.name);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-indigo-500 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-300">{agent.rating}</span>
        </div>
      </div>
      <p className="text-gray-400 mb-6">{agent.description}</p>
      
      <div className="space-y-6">
        <AgentCapabilities capabilities={capabilities} />
        <AgentUseCases useCases={useCases} />
      </div>
    </div>
  );
};

export default AgentDetailsCard;