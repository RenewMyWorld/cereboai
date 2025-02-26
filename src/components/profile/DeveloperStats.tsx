import React from 'react';
import { Star, Code2, Users, Award } from 'lucide-react';

interface DeveloperStatsProps {
  totalAgents: number;
  averageRating: number;
  totalUsers: number;
}

const DeveloperStats = ({ totalAgents, averageRating, totalUsers }: DeveloperStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <Code2 className="h-5 w-5 text-indigo-400" />
          <h3 className="text-white font-medium">Published Agents</h3>
        </div>
        <p className="text-2xl font-bold text-white">{totalAgents}</p>
      </div>
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <h3 className="text-white font-medium">Average Rating</h3>
        </div>
        <p className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</p>
      </div>
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-5 w-5 text-indigo-400" />
          <h3 className="text-white font-medium">Total Users</h3>
        </div>
        <p className="text-2xl font-bold text-white">{totalUsers}</p>
      </div>
    </div>
  );
};

export default DeveloperStats;