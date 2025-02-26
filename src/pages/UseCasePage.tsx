import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Code, 
  ArrowLeft,
  FileCode,
  Terminal,
  Database,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SpaceNebulaBg from '../components/layouts/SpaceNebulaBg';

interface UseCaseDetails {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  challenge: string;
  solution: string;
  projectOverview: string;
  technicalDetails: {
    architecture: string[];
    keyTechnologies: string[];
    codeSnippets: {
      language: string;
      snippet: string;
      description: string;
    }[];
  };
  businessImpact: {
    metrics: string[];
    keyBenefits: string[];
  };
  fullCaseStudy: string[];
}

const useCaseData: UseCaseDetails[] = [
  {
    id: 'express-ecommerce',
    name: 'Express.js E-commerce Platform',
    icon: Server,
    color: 'text-green-400',
    challenge: 'Building a Scalable Microservices E-commerce Backend',
    solution: 'Develop a Modular, High-Performance Web Application',
    projectOverview: 'A comprehensive e-commerce platform designed to handle complex business logic, high traffic, and seamless user experiences across multiple services.',
    technicalDetails: {
      architecture: [
        'Microservices-based backend',
        'RESTful API design',
        'Stateless authentication',
        'Scalable database architecture'
      ],
      keyTechnologies: [
        'Express.js',
        'MongoDB',
        'JWT Authentication',
        'Stripe Payment Gateway',
        'Redis Caching',
        'Docker Containerization'
      ],
      codeSnippets: [
        {
          language: 'javascript',
          snippet: `
// Express.js Microservice Example
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Product Service
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
          `,
          description: 'Demonstrates microservice architecture with authentication middleware'
        }
      ]
    },
    businessImpact: {
      metrics: [
        '60% Reduction in Backend Development Time',
        '99.99% Uptime Achieved',
        '40% Improved Performance Compared to Monolithic Architecture'
      ],
      keyBenefits: [
        'Scalable and Modular Backend',
        'Enhanced Security with JWT',
        'Flexible Service Deployment',
        'Easy Horizontal Scaling'
      ]
    },
    fullCaseStudy: [
      'The project began with a critical need to modernize an outdated e-commerce platform.',
      'Traditional monolithic architecture was causing performance bottlenecks and deployment challenges.',
      'By implementing a microservices approach with Express.js, we created a flexible, scalable solution.',
      'Each service (authentication, product management, order processing) could be developed, deployed, and scaled independently.',
      'The new architecture allowed for rapid iterations and improved overall system reliability.'
    ]
  },
  {
    id: 'react-dashboard',
    name: 'React.js Data Visualization Dashboard',
    icon: Code,
    color: 'text-blue-400',
    challenge: 'Creating an Interactive Business Intelligence Platform',
    solution: 'Develop a Real-time, Responsive Analytics Dashboard',
    projectOverview: 'A comprehensive data visualization tool enabling businesses to gain actionable insights through interactive, real-time charts and graphs.',
    technicalDetails: {
      architecture: [
        'Component-based UI design',
        'State management with Redux',
        'Real-time data streaming',
        'Responsive and adaptive layout'
      ],
      keyTechnologies: [
        'React.js',
        'Redux',
        'Chart.js',
        'WebSocket',
        'Axios',
        'Tailwind CSS'
      ],
      codeSnippets: [
        {
          language: 'javascript',
          snippet: `
// React Dashboard Component
import React from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/analytics');
      setData(response.data);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <Line 
        data={data} 
        options={{ responsive: true }}
      />
    </div>
  );
};
          `,
          description: 'Real-time data fetching and visualization with React and Chart.js'
        }
      ]
    },
    businessImpact: {
      metrics: [
        '75% Reduction in Report Generation Time',
        '50% Improved Data Accessibility',
        '40% Increase in Data-Driven Decision Making'
      ],
      keyBenefits: [
        'Interactive Data Visualization',
        'Real-Time Analytics',
        'Responsive Design',
        'Easy Data Interpretation'
      ]
    },
    fullCaseStudy: [
      'The client struggled with complex, static reporting mechanisms.',
      'Traditional reporting tools were slow and required manual intervention.',
      'By developing a React-based dashboard, we created an interactive, real-time analytics platform.',
      'The solution allowed business users to explore data dynamically and gain instant insights.',
      'Implemented WebSocket for live data updates and Redux for efficient state management.'
    ]
  }
  // More use cases can be added here
];

export function UseCasePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const caseId = searchParams.get('id');
  
  const useCase = useCaseData.find(uc => uc.id === caseId);

  if (!useCase) {
    return <div>Use Case Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceNebulaBg />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.button 
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-indigo-300 mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2" /> Back to Use Cases
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <useCase.icon className={`w-16 h-16 mr-6 ${useCase.color}`} />
            <div>
              <h1 className="text-4xl font-bold">{useCase.name}</h1>
              <p className="text-xl text-gray-400">{useCase.challenge}</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Zap className="mr-3 text-yellow-400" /> Project Overview
            </h2>
            <p className="text-gray-300">{useCase.projectOverview}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Terminal className="mr-3 text-blue-400" /> Technical Architecture
              </h3>
              <ul className="space-y-2">
                {useCase.technicalDetails.architecture.map((arch, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="mr-2 text-green-400 w-5 h-5" />
                    {arch}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Database className="mr-3 text-purple-400" /> Key Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {useCase.technicalDetails.keyTechnologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-900 text-indigo-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {useCase.technicalDetails.codeSnippets.map((snippet, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FileCode className="mr-3 text-green-400" /> Code Snippet
              </h3>
              <p className="text-gray-400 mb-4">{snippet.description}</p>
              <pre className="bg-black rounded-lg p-4 overflow-x-auto text-sm text-green-300">
                <code>{snippet.snippet.trim()}</code>
              </pre>
            </div>
          ))}

          <div className="bg-gray-900 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <CheckCircle className="mr-3 text-green-400" /> Business Impact
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-4">Key Metrics</h3>
                <ul className="space-y-2">
                  {useCase.businessImpact.metrics.map((metric, index) => (
                    <li key={index} className="flex items-center">
                      <Zap className="mr-2 text-yellow-400 w-5 h-5" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">Key Benefits</h3>
                <ul className="space-y-2">
                  {useCase.businessImpact.keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="mr-2 text-blue-400 w-5 h-5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UseCasePage;
