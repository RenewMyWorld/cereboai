import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Users, Lightbulb, Target, Award, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          card: 'bg-white',
          highlight: 'text-blue-600',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-gray-200',
          shadow: 'shadow-lg',
          timeline: 'bg-gray-100'
        };
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-gray-900',
          highlight: 'text-blue-400',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-gray-800',
          shadow: 'shadow-xl',
          timeline: 'bg-gray-800'
        };
      default:
        return {
          background: 'bg-transparent',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-black/30 backdrop-blur-md',
          highlight: 'text-blue-400',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-white/20',
          shadow: 'shadow-xl',
          timeline: 'bg-white/10'
        };
    }
  };

  const styles = getThemeStyles();

  const values = [
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'Built by developers, for developers, with a focus on collaboration and shared success.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pushing the boundaries of AI technology to create cutting-edge solutions.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Delivering accurate and reliable AI-powered tools for professional development.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to maintaining the highest standards in AI development and service.'
    }
  ];

  const timeline = [
    {
      year: '2021',
      title: 'Foundation',
      description: 'Cerebo was founded with a vision to revolutionize AI development tools.'
    },
    {
      year: '2022',
      title: 'Beta Launch',
      description: 'Released our first suite of AI development tools to select partners.'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded our services worldwide and launched the marketplace.'
    }
  ];

  return (
    <div className={`min-h-screen ${styles.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${styles.text}`}>
            About <span className={styles.highlight}>Cerebo</span>
          </h1>
          <p className={`text-xl ${styles.subtext} max-w-3xl mx-auto`}>
            Empowering developers with next-generation AI tools and solutions
          </p>
        </div>

        {/* Mission Statement */}
        <div className={`mb-16 p-8 rounded-lg ${styles.card} ${styles.border} ${styles.shadow} text-center`}>
          <h2 className={`text-2xl font-bold mb-4 ${styles.text}`}>Our Mission</h2>
          <p className={`text-lg ${styles.subtext}`}>
            To democratize AI development by providing powerful, accessible tools that enable developers 
            to create innovative solutions for tomorrow's challenges.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}
                transition-transform hover:scale-105`}
            >
              <value.icon className={`w-12 h-12 mb-4 ${styles.highlight}`} />
              <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>
                {value.title}
              </h3>
              <p className={styles.subtext}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${styles.text}`}>Our Journey</h2>
          <div className={`relative ${styles.timeline} p-8 rounded-lg ${styles.shadow}`}>
            {timeline.map((event, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                <div className={`w-24 font-bold ${styles.highlight}`}>{event.year}</div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>{event.title}</h3>
                  <p className={styles.subtext}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mb-16 p-8 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}>
          <h2 className={`text-2xl font-bold mb-4 ${styles.text}`}>Join Our Journey</h2>
          <p className={`mb-6 ${styles.subtext}`}>
            Be part of the next generation of AI development
          </p>
          <button className={`px-6 py-3 rounded-lg ${styles.button} font-semibold 
            flex items-center mx-auto group`}>
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;