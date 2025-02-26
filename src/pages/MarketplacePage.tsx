import React, { useState } from 'react';
import { Search, Filter, Tag } from 'lucide-react';
import AgentCard from '../components/marketplace/AgentCard';
import DeveloperCard from '../components/marketplace/DeveloperCard';
import { sampleAgents, sampleDevelopers } from '../data/sampleData';
import { useTheme } from '../contexts/ThemeContext';

const MarketplacePage = () => {
  const { theme } = useTheme();
  const [showDevelopers, setShowDevelopers] = useState(false);

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          card: 'bg-white',
          input: 'bg-gray-50 border-gray-300 focus:border-blue-500',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          tag: 'bg-gray-100 text-gray-700',
          border: 'border-gray-200',
          shadow: 'shadow-lg'
        };
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-gray-900',
          input: 'bg-gray-800 border-gray-700 focus:border-blue-400',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          tag: 'bg-gray-800 text-gray-300',
          border: 'border-gray-800',
          shadow: 'shadow-xl'
        };
      default:
        return {
          background: 'bg-transparent',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-black/30 backdrop-blur-md',
          input: 'bg-white/10 border-white/20 focus:border-blue-400',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          tag: 'bg-white/10 text-white',
          border: 'border-white/20',
          shadow: 'shadow-xl'
        };
    }
  };

  const styles = getThemeStyles();

  const agents = [
    {
      id: 1,
      name: 'Code Assistant Pro',
      description: 'Advanced AI-powered code completion and review',
      tags: ['Programming', 'AI', 'Productivity'],
      price: '$29.99'
    },
    // Add more agents as needed
  ];

  return (
    <div className={`min-h-screen ${styles.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${styles.text}`}>
            AI Agent Marketplace
          </h1>
          <p className={`text-xl ${styles.subtext}`}>
            Discover and integrate powerful AI agents for your development needs
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setShowDevelopers(false)}
              className={`px-4 py-2 rounded-md transition-colors ${
                !showDevelopers ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              AI Agents
            </button>
            <button
              onClick={() => setShowDevelopers(true)}
              className={`px-4 py-2 rounded-md transition-colors ${
                showDevelopers ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Developers
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={`mb-8 p-4 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${styles.subtext}`} size={20} />
              <input
                type="text"
                placeholder={showDevelopers ? "Search developers..." : "Search AI agents..."}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${styles.input} ${styles.text}`}
              />
            </div>
            <button className={`flex items-center justify-center px-4 py-2 rounded-lg ${styles.button}`}>
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(showDevelopers ? ['All', 'Top Rated', 'Most Published', 'Recently Active'] : 
            ['All', 'Machine Learning', 'NLP', 'Computer Vision', 'Data Analysis']).map((category) => (
            <button
              key={category}
              className="px-4 py-1 rounded-full text-sm bg-gray-900 text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showDevelopers
            ? sampleDevelopers.map((developer) => (
                <DeveloperCard key={developer.id} developer={developer} />
              ))
            : agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`
                    p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}
                    transition-transform hover:scale-105 cursor-pointer
                  `}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>{agent.name}</h3>
                  <p className={`mb-4 ${styles.subtext}`}>{agent.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-sm ${styles.tag}`}
                      >
                        <Tag size={14} className="inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={`flex justify-between items-center`}>
                    <span className={`text-lg font-bold ${styles.text}`}>{agent.price}</span>
                    <button className={`px-4 py-2 rounded-lg ${styles.button}`}>
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;