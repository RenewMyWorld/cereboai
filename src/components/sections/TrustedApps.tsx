import React from 'react';
import { motion } from 'framer-motion';
import { 
  Figma, 
  Slack, 
  Trello, 
  Cloud, 
  Github, 
  Gitlab 
} from 'lucide-react';

const trustedApps = [
  { 
    name: "Figma", 
    icon: Figma, 
    color: "text-purple-500" 
  },
  { 
    name: "Slack", 
    icon: Slack, 
    color: "text-blue-500" 
  },
  { 
    name: "Trello", 
    icon: Trello, 
    color: "text-green-500" 
  },
  { 
    name: "Cloud", 
    icon: Cloud, 
    color: "text-indigo-500" 
  },
  { 
    name: "GitHub", 
    icon: Github, 
    color: "text-gray-500" 
  },
  { 
    name: "GitLab", 
    icon: Gitlab, 
    color: "text-orange-500" 
  }
];

const TrustedApps: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trusted by Innovative Teams
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our AI platform seamlessly integrates with the tools you already use
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-center">
          {trustedApps.map((app, index) => (
            <motion.div
              key={app.name}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
            >
              <div className="flex flex-col items-center group">
                <app.icon 
                  className={`w-16 h-16 ${app.color} opacity-70 group-hover:opacity-100 transition-all duration-300`} 
                />
                <span className="text-gray-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {app.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedApps;