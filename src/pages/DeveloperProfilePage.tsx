import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Star, 
  Code, 
  Users, 
  Activity,
  Calendar
} from 'lucide-react';

const DeveloperProfilePage = () => {
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
          statsCard: 'bg-gray-50',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-gray-200',
          shadow: 'shadow-lg',
          link: 'text-blue-600 hover:text-blue-700',
          tag: 'bg-gray-100 text-gray-700'
        };
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-gray-900',
          statsCard: 'bg-gray-800',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-gray-800',
          shadow: 'shadow-xl',
          link: 'text-blue-400 hover:text-blue-500',
          tag: 'bg-gray-800 text-gray-300'
        };
      default:
        return {
          background: 'bg-transparent',
          text: 'text-white',
          subtext: 'text-gray-300',
          card: 'bg-black/30 backdrop-blur-md',
          statsCard: 'bg-white/10',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-white/20',
          shadow: 'shadow-xl',
          link: 'text-blue-400 hover:text-blue-300',
          tag: 'bg-white/10 text-white'
        };
    }
  };

  const styles = getThemeStyles();

  // Mock developer data
  const developer = {
    name: 'Alex Johnson',
    title: 'Senior AI Developer',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Passionate about AI and machine learning. Building the future of development tools.',
    location: 'San Francisco, CA',
    joinDate: 'January 2022',
    skills: ['Python', 'TensorFlow', 'React', 'Node.js', 'AWS'],
    stats: {
      contributions: 847,
      followers: 234,
      projects: 12,
      rating: 4.9
    },
    projects: [
      {
        name: 'AI Code Assistant',
        description: 'An intelligent code completion tool powered by machine learning.',
        stars: 456,
        language: 'Python'
      },
      // Add more projects as needed
    ]
  };

  return (
    <div className={`min-h-screen ${styles.background} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className={`mb-8 p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={developer.avatar}
              alt={developer.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className={`text-3xl font-bold mb-2 ${styles.text}`}>{developer.name}</h1>
              <p className={`text-xl mb-4 ${styles.subtext}`}>{developer.title}</p>
              <p className={`mb-4 ${styles.subtext}`}>{developer.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {developer.skills.map((skill, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-sm ${styles.tag}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <a href="#" className={`${styles.link}`}><Github className="w-6 h-6" /></a>
              <a href="#" className={`${styles.link}`}><Twitter className="w-6 h-6" /></a>
              <a href="#" className={`${styles.link}`}><Linkedin className="w-6 h-6" /></a>
              <a href="#" className={`${styles.link}`}><Mail className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Code, label: 'Contributions', value: developer.stats.contributions },
            { icon: Users, label: 'Followers', value: developer.stats.followers },
            { icon: Activity, label: 'Projects', value: developer.stats.projects },
            { icon: Star, label: 'Rating', value: developer.stats.rating }
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${styles.statsCard} ${styles.border} ${styles.shadow}
                flex items-center justify-between`}
            >
              <div>
                <p className={`text-sm ${styles.subtext}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${styles.text}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${styles.subtext}`} />
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className={`p-6 rounded-lg ${styles.card} ${styles.border} ${styles.shadow}`}>
          <h2 className={`text-2xl font-bold mb-6 ${styles.text}`}>Featured Projects</h2>
          <div className="space-y-6">
            {developer.projects.map((project, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${styles.statsCard} ${styles.border}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>{project.name}</h3>
                    <p className={`${styles.subtext}`}>{project.description}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className={styles.text}>{project.stars}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${styles.tag}`}>
                    {project.language}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfilePage;