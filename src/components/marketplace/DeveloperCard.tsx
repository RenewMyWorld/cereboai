import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Code2, ArrowRight } from 'lucide-react';
import type { User } from '../../types';

interface DeveloperCardProps {
  developer: User;
}

const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <Link to={`/developer/${developer.id}`} className="block">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-indigo-500 transition-colors group">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-indigo-500/10 group-hover:bg-indigo-500/20">
            <Code2 className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{developer.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Award className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Verified Developer</span>
            </div>
          </div>
        </div>
        <p className="text-gray-400 mb-4">Expert in AI and machine learning solutions</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-indigo-400">5 Published Agents</span>
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            View Profile <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DeveloperCard;