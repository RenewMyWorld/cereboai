import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Code, Terminal, Book, ArrowRight, Github, ExternalLink } from 'lucide-react';

const DevelopersPage = () => {
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          card: 'bg-white',
          codeBlock: 'bg-gray-100',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-gray-200',
          shadow: 'shadow-lg',
          link: 'text-blue-600 hover:text-blue-700'
        };
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-gray-900',
          codeBlock: 'bg-gray-800',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-gray-800',
          shadow: 'shadow-xl',
          link: 'text-blue-400 hover:text-blue-500'
        };
      default:
        return {
          background: 'bg-transparent',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-black/30 backdrop-blur-md',
          codeBlock: 'bg-black/50',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-white/20',
          shadow: 'shadow-xl',
          link: 'text-blue-400 hover:text-blue-300'
        };
    }
  };

  const styles = getThemeStyles();

  const features = [
    {
      icon: Code,
      title: 'API Integration',
      description: 'Simple and powerful API endpoints for seamless integration with your applications.'
    },
    {
      icon: Terminal,
      title: 'CLI Tools',
      description: 'Command-line tools for efficient development workflow and automation.'
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive documentation and guides to help you get started quickly.'
    }
  ];

  return (
    <div className={`min-h-screen ${styles.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${styles.text}`}>
            Developer Resources
          </h1>
          <p className={`text-xl ${styles.subtext} max-w-3xl mx-auto`}>
            Everything you need to integrate Cerebo's AI capabilities into your applications
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}
            >
              <feature.icon className={`w-12 h-12 mb-4 ${styles.text}`} />
              <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>
                {feature.title}
              </h3>
              <p className={styles.subtext}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Code Example Section */}
        <div className={`mb-16 rounded-lg overflow-hidden ${styles.shadow}`}>
          <div className={`p-4 ${styles.codeBlock}`}>
            <pre className={styles.text}>
              <code>{`
// Example API Integration
import { CereboAI } from '@cerebo/sdk';

const cerebo = new CereboAI({
  apiKey: 'your-api-key'
});

// Initialize an AI agent
const agent = await cerebo.createAgent({
  type: 'code-assistant',
  config: {
    language: 'javascript',
    framework: 'react'
  }
});

// Start coding with AI assistance
const result = await agent.complete({
  code: 'function hello() {',
  maxTokens: 50
});
              `}</code>
            </pre>
          </div>
        </div>

        {/* Resources Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <a
            href="/docs"
            className={`p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow} 
              group hover:transform hover:scale-105 transition-all`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-semibold ${styles.text}`}>
                Documentation
              </h3>
              <ArrowRight className={`${styles.text} group-hover:translate-x-2 transition-transform`} />
            </div>
            <p className={`mt-2 ${styles.subtext}`}>
              Explore our comprehensive documentation and guides
            </p>
          </a>

          <a
            href="https://github.com/cerebo"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow} 
              group hover:transform hover:scale-105 transition-all`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-semibold ${styles.text}`}>
                GitHub Repository
              </h3>
              <Github className={`${styles.text} group-hover:rotate-12 transition-transform`} />
            </div>
            <p className={`mt-2 ${styles.subtext}`}>
              Check out our open-source projects and examples
            </p>
          </a>
        </div>

        {/* CTA Section */}
        <div className={`text-center mb-16 p-8 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}>
          <h2 className={`text-2xl font-bold mb-4 ${styles.text}`}>
            Ready to Get Started?
          </h2>
          <p className={`mb-6 ${styles.subtext}`}>
            Sign up for free and start building with Cerebo AI today
          </p>
          <button className={`px-6 py-3 rounded-lg ${styles.button} font-semibold`}>
            Create Developer Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevelopersPage;