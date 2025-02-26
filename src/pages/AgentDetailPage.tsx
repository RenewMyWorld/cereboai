import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Star,
  Download,
  Share2,
  MessageSquare,
  Tag,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Code,
  Settings
} from 'lucide-react';

const AgentDetailPage = () => {
  const { id } = useParams();
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          card: 'bg-white',
          infoCard: 'bg-gray-50',
          codeBlock: 'bg-gray-100',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          secondaryButton: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
          border: 'border-gray-200',
          shadow: 'shadow-lg',
          tag: 'bg-gray-100 text-gray-700'
        };
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-gray-900',
          infoCard: 'bg-gray-800',
          codeBlock: 'bg-gray-800',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          secondaryButton: 'bg-gray-800 hover:bg-gray-700 text-white',
          border: 'border-gray-800',
          shadow: 'shadow-xl',
          tag: 'bg-gray-800 text-gray-300'
        };
      default:
        return {
          background: 'bg-transparent',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-black/30 backdrop-blur-md',
          infoCard: 'bg-white/10',
          codeBlock: 'bg-black/50',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          secondaryButton: 'bg-white/10 hover:bg-white/20 text-white',
          border: 'border-white/20',
          shadow: 'shadow-xl',
          tag: 'bg-white/10 text-white'
        };
    }
  };

  const styles = getThemeStyles();

  // Mock agent data
  const agent = {
    name: 'Code Assistant Pro',
    version: '2.0.1',
    rating: 4.8,
    reviews: 256,
    downloads: '10k+',
    price: '$29.99',
    description: 'Advanced AI-powered code completion and review tool that helps developers write better code faster.',
    features: [
      'Real-time code suggestions',
      'Multi-language support',
      'Code quality analysis',
      'Security vulnerability detection'
    ],
    tags: ['Programming', 'AI', 'Productivity', 'Code Quality'],
    creator: {
      name: 'AI Labs Inc.',
      verified: true
    }
  };

  return (
    <div className={`min-h-screen ${styles.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Agent Header */}
        <div className={`mb-8 p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className={`text-3xl font-bold ${styles.text}`}>{agent.name}</h1>
                <span className={`px-2 py-1 rounded text-sm ${styles.tag}`}>v{agent.version}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className={styles.text}>{agent.rating}</span>
                  <span className={`ml-1 ${styles.subtext}`}>({agent.reviews} reviews)</span>
                </div>
                <div className={`flex items-center ${styles.subtext}`}>
                  <Download className="w-5 h-5 mr-1" />
                  {agent.downloads}
                </div>
              </div>
              <p className={`mb-4 ${styles.subtext}`}>{agent.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {agent.tags.map((tag, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-sm ${styles.tag}`}>
                    <Tag className="w-4 h-4 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className={`text-2xl font-bold mb-2 ${styles.text}`}>{agent.price}</div>
              <button className={`w-full px-4 py-2 rounded-lg ${styles.button} font-semibold`}>
                Install Agent
              </button>
              <button className={`w-full px-4 py-2 rounded-lg ${styles.secondaryButton}`}>
                <Share2 className="w-4 h-4 inline mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {agent.features.map((feature, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${styles.infoCard} ${styles.border} ${styles.shadow}`}
            >
              <CheckCircle className={`w-6 h-6 mb-2 ${styles.text}`} />
              <p className={styles.text}>{feature}</p>
            </div>
          ))}
        </div>

        {/* Integration Example */}
        <div className={`mb-8 rounded-lg overflow-hidden ${styles.shadow}`}>
          <div className={`p-4 ${styles.codeBlock}`}>
            <h3 className={`text-xl font-semibold mb-4 ${styles.text}`}>Quick Integration</h3>
            <pre className={styles.text}>
              <code>{`
// Initialize the Code Assistant
import { CodeAssistant } from '@cerebo/code-assistant';

const assistant = new CodeAssistant({
  apiKey: 'your-api-key',
  mode: 'intelligent'
});

// Start getting suggestions
assistant.watch({
  file: 'index.js',
  onSuggestion: (suggestion) => {
    console.log('New code suggestion:', suggestion);
  }
});
              `}</code>
            </pre>
          </div>
        </div>

        {/* Creator Info */}
        <div className={`p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-xl font-semibold ${styles.text}`}>Created by {agent.creator.name}</h3>
              {agent.creator.verified && (
                <div className="flex items-center mt-2">
                  <Shield className="w-4 h-4 text-green-500 mr-1" />
                  <span className={`text-sm ${styles.subtext}`}>Verified Creator</span>
                </div>
              )}
            </div>
            <button className={`px-4 py-2 rounded-lg ${styles.secondaryButton}`}>
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;