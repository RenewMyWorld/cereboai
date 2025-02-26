import React from 'react';
import type { AIAgent } from '../../types';
import AgentDetailsCard from './AgentDetailsCard';

interface DeveloperAgentsProps {
  agents: AIAgent[];
}

const DeveloperAgents = ({ agents }: DeveloperAgentsProps) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      {agents.map((agent) => (
        <AgentDetailsCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
};

export default DeveloperAgents;