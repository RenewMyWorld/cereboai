import type { AIAgent, User } from '../types';

export const sampleDevelopers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    membershipLevel: 'developer',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus@example.com',
    membershipLevel: 'developer',
  },
  {
    id: '3',
    name: 'Emily Wong',
    email: 'emily@example.com',
    membershipLevel: 'developer',
  },
];

export const sampleAgents: AIAgent[] = [
  {
    id: '1',
    name: 'SmartAnalytics AI',
    description: 'Advanced data analysis and visualization agent with real-time insights.',
    developer: sampleDevelopers[0],
    status: 'approved',
    reviews: [],
    rating: 4.8,
  },
  {
    id: '2',
    name: 'CodeAssist Pro',
    description: 'AI-powered code review and optimization assistant for developers.',
    developer: sampleDevelopers[1],
    status: 'approved',
    reviews: [],
    rating: 4.9,
  },
  {
    id: '3',
    name: 'SecurityGuard AI',
    description: 'Automated security testing and vulnerability detection agent.',
    developer: sampleDevelopers[2],
    status: 'approved',
    reviews: [],
    rating: 4.7,
  },
  {
    id: '4',
    name: 'NLP Master',
    description: 'Natural language processing agent for text analysis and generation.',
    developer: sampleDevelopers[0],
    status: 'approved',
    reviews: [],
    rating: 4.6,
  },
  {
    id: '5',
    name: 'DataViz Pro',
    description: 'Interactive data visualization and reporting agent.',
    developer: sampleDevelopers[1],
    status: 'approved',
    reviews: [],
    rating: 4.5,
  },
  {
    id: '6',
    name: 'AITestBot',
    description: 'Automated testing agent for AI models and applications.',
    developer: sampleDevelopers[2],
    status: 'approved',
    reviews: [],
    rating: 4.8,
  },
];