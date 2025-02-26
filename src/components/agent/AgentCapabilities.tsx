import React from 'react';
import CapabilityCard from './CapabilityCard';

interface Capability {
  title: string;
  description: string;
  details: string;
}

interface AgentCapabilitiesProps {
  capabilities: Capability[];
}

const AgentCapabilities = ({ capabilities }: AgentCapabilitiesProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Capabilities</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {capabilities.map((capability, index) => (
          <CapabilityCard key={index} {...capability} />
        ))}
      </div>
    </div>
  );
};

export default AgentCapabilities;