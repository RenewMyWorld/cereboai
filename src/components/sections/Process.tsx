import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  ShieldCheck, 
  Zap, 
  FileSearch, 
  Briefcase, 
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle
} from 'lucide-react';
import Web3Background from '../layouts/Web3Background';
import GlassCard from '../common/GlassCard';

const Process = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const processSteps = [
    {
      key: 'talent',
      icon: UserCheck,
      title: "Talent Identification",
      description: "We meticulously screen and select top-tier developers through rigorous technical assessments.",
      details: [
        "Comprehensive skill evaluation",
        "Technical proficiency tests",
        "Portfolio and project review",
        "Initial screening interviews",
        "Specialized domain expertise assessment"
      ]
    },
    {
      key: 'verification',
      icon: ShieldCheck,
      title: "Background Verification",
      description: "Comprehensive background checks validate each developer's professional history.",
      details: [
        "Professional credential verification",
        "Employment history validation",
        "Reference checks",
        "Identity and legal status confirmation",
        "Academic qualification review"
      ]
    },
    {
      key: 'validation',
      icon: FileSearch,
      title: "Skill Validation",
      description: "Advanced technical interviews and practical coding challenges evaluate developers' expertise.",
      details: [
        "Multi-language coding assessments",
        "Real-world problem-solving challenges",
        "System design evaluations",
        "Technology stack proficiency tests",
        "Algorithmic and architectural reviews"
      ]
    },
    {
      key: 'performance',
      icon: Zap,
      title: "Performance Tracking",
      description: "Continuous performance monitoring and client feedback mechanisms.",
      details: [
        "Real-time project performance metrics",
        "Client satisfaction tracking",
        "Continuous skill improvement programs",
        "Periodic performance reviews",
        "Adaptive skill development recommendations"
      ]
    },
    {
      key: 'development',
      icon: Briefcase,
      title: "Professional Development",
      description: "Ongoing training and resources to help developers stay at the cutting edge.",
      details: [
        "Continuous learning platforms",
        "Mentorship programs",
        "Advanced technology workshops",
        "Certification support",
        "Emerging technology training"
      ]
    },
    {
      key: 'excellence',
      icon: Award,
      title: "Continuous Excellence",
      description: "Regular re-evaluation to guarantee world-class, adaptable developers.",
      details: [
        "Quarterly skill reassessments",
        "Technology trend alignment",
        "Performance-based ranking",
        "Innovation and creativity evaluation",
        "Ongoing professional growth tracking"
      ]
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-full h-1/3 animate-float-slower" style={{
          top: '0%', 
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0) 0%, rgba(167, 139, 250, 0.2) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(167, 139, 250, 0.2) 75%, rgba(99, 102, 241, 0) 100%)', 
          filter: 'blur(50px)', 
          transform: 'skewY(-5deg)', 
          animationDelay: '0s'
        }}></div>
        <div className="absolute w-full h-1/3 animate-float-slower" style={{
          top: '33%', 
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0) 0%, rgba(167, 139, 250, 0.2) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(167, 139, 250, 0.2) 75%, rgba(99, 102, 241, 0) 100%)', 
          filter: 'blur(50px)', 
          transform: 'skewY(-5deg)', 
          animationDelay: '2s'
        }}></div>
        <div className="absolute w-full h-1/3 animate-float-slower" style={{
          top: '66%', 
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0) 0%, rgba(167, 139, 250, 0.2) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(167, 139, 250, 0.2) 75%, rgba(99, 102, 241, 0) 100%)', 
          filter: 'blur(50px)', 
          transform: 'skewY(-5deg)', 
          animationDelay: '4s'
        }}></div>
      </div>
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2">Our Vetting Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              A comprehensive, multi-stage approach to identifying and nurturing exceptional development talent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {processSteps.map((step, index) => (
              <GlassCard 
                key={step.key} 
                className={`h-full animate-fade-in`} 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <step.icon className="h-8 w-8 text-indigo-400" />
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 mb-6">{step.description}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(step.key);
                  }}
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {expandedSections.includes(step.key) ? (
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
                {expandedSections.includes(step.key) && (
                  <ul className="mt-4 space-y-2 text-gray-400">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;