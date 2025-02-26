import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Shield, CheckCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const benefitsData = {
  developer: {
    title: 'Developer Platform',
    description: 'Build and showcase your AI agents to a verified audience of potential users.',
    details: [
      'Comprehensive development tools and SDKs',
      'Detailed API documentation and integration guides',
      'Testing environments for agent optimization',
      'Analytics dashboard for performance tracking',
      'Direct access to user feedback and metrics',
      'Marketing tools to promote your AI agents'
    ]
  },
  security: {
    title: 'Secure & Trusted',
    description: 'Every AI agent undergoes rigorous security and quality checks before approval.',
    details: [
      'Multi-layer security screening process for all AI agents',
      'Regular security audits and vulnerability assessments',
      'Compliance with industry-standard security protocols',
      'Transparent verification process with detailed documentation',
      '24/7 security monitoring and threat detection'
    ]
  },
  community: {
    title: 'Community Verified',
    description: 'Benefit from reviews and ratings from our trusted community members.',
    details: [
      'Verified user review system with authenticity checks',
      'Detailed rating criteria across multiple parameters',
      'Community discussion forums for feedback',
      'Expert user badges for credible reviewers',
      'Regular community challenges and events',
      'Performance-based ranking system'
    ]
  },
  performance: {
    title: 'High Performance',
    description: 'Optimized infrastructure for reliable and scalable AI operations.',
    details: [
      'Load-balanced infrastructure for optimal performance',
      'Auto-scaling capabilities for high demand periods',
      'Real-time performance monitoring and alerts',
      'Global CDN for fast content delivery',
      'Automated backup and recovery systems'
    ]
  },
  integration: {
    title: 'Easy Integration',
    description: 'Seamlessly integrate AI agents into your existing workflows.',
    details: [
      'RESTful API endpoints for all services',
      'WebSocket support for real-time applications',
      'Multiple SDK options for different platforms',
      'Comprehensive integration examples',
      'Ready-to-use code snippets and templates'
    ]
  },
  analytics: {
    title: 'Advanced Analytics',
    description: 'Gain deep insights into your AI agents performance.',
    details: [
      'Real-time usage analytics and metrics',
      'Custom reporting and dashboards',
      'User behavior analysis tools',
      'Performance trend monitoring',
      'ROI tracking and optimization suggestions'
    ]
  }
};

const Benefits = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const iconMap = {
    developer: Code,
    security: Shield,
    community: Users,
    performance: Zap,
    integration: Zap, 
    analytics: CheckCircle
  };

  return (
    <div className="relative">
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2">Membership Benefits</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Join our trusted ecosystem and unlock exclusive benefits based on your role
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(benefitsData).map(([key, benefit], index) => {
              const IconComponent = iconMap[key as keyof typeof iconMap];
              return (
                <Link to={key === 'developer' ? "/developers" : key === 'community' ? "/marketplace" : "#"} key={key}>
                  <GlassCard 
                    className={`h-full animate-fade-in bg-transparent`} 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <IconComponent className="h-8 w-8 text-indigo-400" />
                      <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-6">{benefit.description}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSection(key);
                      }}
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {expandedSections.includes(key) ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>More Details</span>
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    {expandedSections.includes(key) && (
                      <ul className="mt-4 space-y-2 text-gray-400">
                        {benefit.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;