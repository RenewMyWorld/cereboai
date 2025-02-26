import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Code, 
  Rocket, 
  Mail,
  Layers,
  Grid,
  Globe,
  User,
  Laptop,
  Desktop,
  Shield,
  Settings,
  Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TechUseCase {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  challenge: string;
  solution: string;
  projectSteps: string[];
  technologiesUsed: string[];
  impact: string;
  fullDescription: string[];
  detailsVisible: boolean;
  learnMoreLink?: string;
}

export function TechUseCases() {
  const navigate = useNavigate();

  const swiperRef = useRef(null);

  const [useCases, setUseCases] = useState<TechUseCase[]>([
    {
      name: 'Express.js Web Application',
      icon: Server,
      color: 'text-green-400',
      challenge: 'Building a Scalable E-commerce Platform',
      solution: 'Develop a Microservices-based E-commerce Backend',
      projectSteps: [
        'Design modular architecture with separate services',
        'Implement user authentication and authorization',
        'Create product catalog and inventory management',
        'Develop order processing and payment integration',
        'Implement real-time inventory tracking'
      ],
      technologiesUsed: [
        'Express.js',
        'MongoDB',
        'JWT Authentication',
        'Stripe Payment Gateway',
        'WebSocket for real-time updates'
      ],
      impact: 'Reduced backend development time by 60% and improved system scalability',
      fullDescription: [
        'Our Express.js e-commerce platform revolutionized the way online businesses handle backend infrastructure.',
        'By adopting a microservices architecture, we created a highly scalable and modular solution that can adapt to changing business needs.',
        'The platform supports seamless integration of multiple services, from user authentication to real-time inventory management.',
        'Key innovations include stateless authentication, dynamic service scaling, and robust error handling.'
      ],
      detailsVisible: false
    },
    {
      name: 'React.js Frontend Development',
      icon: Code,
      color: 'text-blue-400',
      challenge: 'Creating an Interactive Data Visualization Dashboard',
      solution: 'Build a Real-time Analytics Dashboard for Business Intelligence',
      projectSteps: [
        'Design responsive and interactive UI components',
        'Integrate multiple data source APIs',
        'Implement dynamic chart and graph rendering',
        'Add user customization and filter capabilities',
        'Optimize performance for large datasets'
      ],
      technologiesUsed: [
        'React.js',
        'Chart.js',
        'Redux for state management',
        'Axios for API calls',
        'WebSocket for real-time data updates'
      ],
      impact: 'Improved data insights accessibility and reduced report generation time by 75%',
      fullDescription: [
        'Our React.js dashboard transformed how businesses interact with their data.',
        'By creating an intuitive, real-time visualization platform, we enabled instant insights and data-driven decision making.',
        'The dashboard supports complex data transformations, live updates, and personalized views.',
        'Advanced features include dynamic filtering, multi-source data integration, and responsive design.'
      ],
      detailsVisible: false
    },
    {
      name: 'Next.js Full-Stack Application',
      icon: Rocket,
      color: 'text-white',
      challenge: 'Developing a Collaborative Project Management Tool',
      solution: 'Create a Serverless Project Tracking and Collaboration Platform',
      projectSteps: [
        'Design serverless architecture',
        'Implement user authentication and team management',
        'Create real-time task tracking and assignment',
        'Develop collaborative document editing',
        'Implement notification and communication system'
      ],
      technologiesUsed: [
        'Next.js',
        'Firebase Authentication',
        'Firestore Real-time Database',
        'Vercel Serverless Functions',
        'WebSocket for live collaboration'
      ],
      impact: 'Increased team productivity by 50% and reduced project management overhead',
      fullDescription: [
        'Our Next.js project management platform redefined team collaboration and productivity.',
        'By leveraging serverless architecture, we created a highly scalable and responsive collaboration tool.',
        'The platform supports real-time task tracking, team communication, and seamless document collaboration.',
        'Advanced features include automated workflows, intelligent notifications, and comprehensive analytics.'
      ],
      detailsVisible: false
    },
    {
      name: 'NodeMailer Communication',
      icon: Mail,
      color: 'text-red-400',
      challenge: 'Building an Automated Customer Engagement System',
      solution: 'Develop a Personalized Email Marketing and Notification Platform',
      projectSteps: [
        'Design email template system',
        'Implement dynamic content personalization',
        'Create automated email workflows',
        'Integrate with CRM and user database',
        'Implement email tracking and analytics'
      ],
      technologiesUsed: [
        'NodeMailer',
        'Handlebars for email templating',
        'MongoDB for user data',
        'SendGrid for email delivery',
        'Cron jobs for scheduling'
      ],
      impact: 'Increased customer engagement by 40% and reduced manual communication efforts',
      fullDescription: [
        'Our NodeMailer solution revolutionized customer communication and marketing strategies.',
        'By creating a dynamic, personalized email platform, we enabled businesses to engage customers more effectively.',
        'The system supports complex email workflows, real-time personalization, and comprehensive analytics.',
        'Advanced features include A/B testing, segmentation, and intelligent scheduling.'
      ],
      detailsVisible: false
    },
    {
      name: 'Vue.js E-commerce Platform',
      icon: Layers,
      color: 'text-green-500',
      challenge: 'Creating a Fast and Responsive Online Store',
      solution: 'Build a Progressive Web App for E-commerce',
      projectSteps: [
        'Design a user-friendly interface',
        'Implement product search and filtering',
        'Integrate payment gateway',
        'Optimize for mobile devices',
        'Set up analytics for user behavior'
      ],
      technologiesUsed: [
        'Vue.js',
        'Vuex',
        'Firebase',
        'Stripe',
        'PWA'
      ],
      impact: 'Enhanced user experience and increased sales by 30%',
      fullDescription: [
        'Our Vue.js e-commerce platform transformed the way businesses sell online.',
        'By creating a fast and responsive PWA, we enabled seamless user experiences across devices.',
        'The platform supports real-time updates, push notifications, and offline access.',
        'Advanced features include personalized recommendations, social sharing, and A/B testing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Angular Dashboard Application',
      icon: Grid,
      color: 'text-blue-600',
      challenge: 'Developing a Comprehensive Data Management Tool',
      solution: 'Create a Real-time Dashboard for Data Visualization',
      projectSteps: [
        'Design interactive dashboard layout',
        'Integrate various data sources',
        'Implement real-time updates',
        'Add user authentication',
        'Optimize performance for large datasets'
      ],
      technologiesUsed: [
        'Angular',
        'RxJS',
        'D3.js',
        'Node.js',
        'Socket.IO'
      ],
      impact: 'Improved data accessibility and decision-making speed',
      fullDescription: [
        'Our Angular dashboard application revolutionized data management and visualization.',
        'By creating a real-time platform, we enabled instant insights and data-driven decision making.',
        'The dashboard supports complex data transformations, live updates, and personalized views.',
        'Advanced features include dynamic filtering, multi-source data integration, and responsive design.'
      ],
      detailsVisible: false
    },
    {
      name: 'Gatsby.js Static Site Generator',
      icon: Globe,
      color: 'text-purple-500',
      challenge: 'Building a High-Performance Static Website',
      solution: 'Create a Fast and SEO-Optimized Site',
      projectSteps: [
        'Design responsive layout',
        'Implement GraphQL for data fetching',
        'Optimize images and assets',
        'Set up caching strategies',
        'Deploy to CDN'
      ],
      technologiesUsed: [
        'Gatsby.js',
        'React',
        'GraphQL',
        'Netlify',
        'Webpack'
      ],
      impact: 'Increased site speed and improved SEO rankings',
      fullDescription: [
        'Our Gatsby.js static site generator transformed the way businesses build websites.',
        'By creating a fast and SEO-optimized platform, we enabled improved user experiences and search engine rankings.',
        'The site supports real-time updates, code splitting, and server-side rendering.',
        'Advanced features include automatic image optimization, lazy loading, and responsive design.'
      ],
      detailsVisible: false
    },
    {
      name: 'Svelte.js Real-time Chat Application',
      icon: User,
      color: 'text-red-500',
      challenge: 'Creating a Modern Chat Application',
      solution: 'Build a Real-time Chat Interface',
      projectSteps: [
        'Design chat UI',
        'Implement WebSocket for real-time communication',
        'Add user authentication',
        'Integrate emoji and file sharing',
        'Deploy to cloud service'
      ],
      technologiesUsed: [
        'Svelte.js',
        'Socket.IO',
        'Firebase Authentication',
        'Cloud Firestore',
        'Vercel'
      ],
      impact: 'Enhanced user engagement and satisfaction',
      fullDescription: [
        'Our Svelte.js chat application transformed the way businesses communicate with customers.',
        'By creating a real-time platform, we enabled instant messaging and improved customer support.',
        'The application supports real-time updates, push notifications, and offline access.',
        'Advanced features include personalized messaging, group chats, and file sharing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Electron Desktop Application',
      icon: Laptop,
      color: 'text-gray-700',
      challenge: 'Building a Cross-Platform Desktop App',
      solution: 'Create a Desktop Application using Web Technologies',
      projectSteps: [
        'Design user interface',
        'Implement core functionalities',
        'Package for different operating systems',
        'Set up auto-updating',
        'Test across platforms'
      ],
      technologiesUsed: [
        'Electron',
        'React',
        'Node.js',
        'Webpack',
        'TypeScript'
      ],
      impact: 'Increased accessibility and user adoption',
      fullDescription: [
        'Our Electron desktop application transformed the way businesses build cross-platform apps.',
        'By creating a desktop application using web technologies, we enabled seamless user experiences across platforms.',
        'The application supports real-time updates, push notifications, and offline access.',
        'Advanced features include personalized recommendations, social sharing, and A/B testing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Django REST API',
      icon: Shield,
      color: 'text-green-400',
      challenge: 'Creating a RESTful API for a Web Application',
      solution: 'Build a Scalable API using Django',
      projectSteps: [
        'Set up Django project',
        'Implement authentication',
        'Create models and serializers',
        'Set up RESTful endpoints',
        'Deploy to cloud server'
      ],
      technologiesUsed: [
        'Django',
        'Django REST Framework',
        'PostgreSQL',
        'Docker',
        'AWS'
      ],
      impact: 'Improved data handling and user experience',
      fullDescription: [
        'Our Django REST API transformed the way businesses handle data and user interactions.',
        'By creating a scalable and secure API, we enabled improved data handling and user experiences.',
        'The API supports real-time updates, authentication, and authorization.',
        'Advanced features include data caching, API rate limiting, and security auditing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Spring Boot REST API',
      icon: Settings,
      color: 'text-green-400',
      challenge: 'Creating a RESTful API for a Web Application',
      solution: 'Build a Scalable API using Spring Boot',
      projectSteps: [
        'Set up Spring Boot project',
        'Implement authentication',
        'Create models and controllers',
        'Set up RESTful endpoints',
        'Deploy to cloud server'
      ],
      technologiesUsed: [
        'Spring Boot',
        'MySQL',
        'JWT',
        'Docker',
        'AWS'
      ],
      impact: 'Improved data handling and user experience',
      fullDescription: [
        'Our Spring Boot REST API transformed the way businesses handle data and user interactions.',
        'By creating a scalable and secure API, we enabled improved data handling and user experiences.',
        'The API supports real-time updates, authentication, and authorization.',
        'Advanced features include data caching, API rate limiting, and security auditing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Flutter Mobile Application',
      icon: Smartphone,
      color: 'text-blue-500',
      challenge: 'Building a Cross-Platform Mobile App',
      solution: 'Create a Native Mobile Application using Flutter',
      projectSteps: [
        'Design user interface',
        'Implement core functionalities',
        'Integrate with backend API',
        'Test across platforms',
        'Deploy to app stores'
      ],
      technologiesUsed: [
        'Flutter',
        'Dart',
        'Firebase',
        'Google Maps',
        'In-app purchases'
      ],
      impact: 'Increased user engagement and app adoption',
      fullDescription: [
        'Our Flutter mobile application transformed the way businesses build cross-platform apps.',
        'By creating a native mobile application using Flutter, we enabled seamless user experiences across platforms.',
        'The application supports real-time updates, push notifications, and offline access.',
        'Advanced features include personalized recommendations, social sharing, and A/B testing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Ruby on Rails Web Application',
      icon: Server,
      color: 'text-red-500',
      challenge: 'Building a Scalable Web Application',
      solution: 'Create a Scalable Web Application using Ruby on Rails',
      projectSteps: [
        'Design database schema',
        'Implement authentication and authorization',
        'Create models and controllers',
        'Set up RESTful endpoints',
        'Deploy to cloud server'
      ],
      technologiesUsed: [
        'Ruby on Rails',
        'PostgreSQL',
        'Redis',
        'Sidekiq',
        'AWS'
      ],
      impact: 'Improved data handling and user experience',
      fullDescription: [
        'Our Ruby on Rails web application transformed the way businesses handle data and user interactions.',
        'By creating a scalable and secure web application, we enabled improved data handling and user experiences.',
        'The application supports real-time updates, authentication, and authorization.',
        'Advanced features include data caching, API rate limiting, and security auditing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Laravel PHP Framework',
      icon: Code,
      color: 'text-green-500',
      challenge: 'Building a Scalable PHP Application',
      solution: 'Create a Scalable PHP Application using Laravel',
      projectSteps: [
        'Design database schema',
        'Implement authentication and authorization',
        'Create models and controllers',
        'Set up RESTful endpoints',
        'Deploy to cloud server'
      ],
      technologiesUsed: [
        'Laravel',
        'PHP',
        'MySQL',
        'Redis',
        'AWS'
      ],
      impact: 'Improved data handling and user experience',
      fullDescription: [
        'Our Laravel PHP framework transformed the way businesses handle data and user interactions.',
        'By creating a scalable and secure PHP application, we enabled improved data handling and user experiences.',
        'The application supports real-time updates, authentication, and authorization.',
        'Advanced features include data caching, API rate limiting, and security auditing.'
      ],
      detailsVisible: false
    },
    {
      name: 'Swift iOS Application',
      icon: Code,
      color: 'text-blue-600',
      challenge: 'Building a Native iOS Application',
      solution: 'Create a Native iOS Application using Swift',
      projectSteps: [
        'Design user interface',
        'Implement core functionalities',
        'Integrate with backend API',
        'Test across devices',
        'Deploy to app store'
      ],
      technologiesUsed: [
        'Swift',
        'iOS',
        'Xcode',
        'Core Data',
        'In-app purchases'
      ],
      impact: 'Increased user engagement and app adoption',
      fullDescription: [
        'Our Swift iOS application transformed the way businesses build native iOS apps.',
        'By creating a native iOS application using Swift, we enabled seamless user experiences across devices.',
        'The application supports real-time updates, push notifications, and offline access.',
        'Advanced features include personalized recommendations, social sharing, and A/B testing.'
      ],
      detailsVisible: false
    },
    {
      name: 'New Project Example',
      icon: Code,
      color: 'text-green-500',
      challenge: 'Building a Scalable Web Application',
      solution: 'Create a Scalable Web Application using Modern Technologies',
      projectSteps: [
        'Design database schema',
        'Implement authentication and authorization',
        'Create models and controllers',
        'Set up RESTful endpoints',
        'Deploy to cloud server'
      ],
      technologiesUsed: [
        'React.js',
        'Node.js',
        'MongoDB',
        'Docker',
        'AWS'
      ],
      impact: 'Improved data handling and user experience',
      fullDescription: [
        'Our new project example transformed the way businesses handle data and user interactions.',
        'By creating a scalable and secure web application, we enabled improved data handling and user experiences.',
        'The application supports real-time updates, authentication, and authorization.',
        'Advanced features include data caching, API rate limiting, and security auditing.'
      ],
      detailsVisible: false
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const toggleDetails = (index: number) => {
    setUseCases(prev => {
      const updated = prev.map((uc, i) => {
        return { ...uc, detailsVisible: i === index ? !uc.detailsVisible : false };
      });
      return updated;
    });
  };

  const handleLearnMore = (useCase: TechUseCase) => {
    if (useCase.learnMoreLink) {
      navigate(useCase.learnMoreLink);
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Trusted by Innovative Teams</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-world project examples showcasing how cutting-edge technologies solve complex challenges
          </p>
        </div>

        <Swiper
          ref={swiperRef}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onMouseEnter={() => clearInterval(interval)} // Pause on hover
          onMouseLeave={() => interval = setInterval(() => swiperRef.current.swiper.slideNext(), 3000)} // Resume on leave
        >
          {useCases.map((useCase, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-gray-900 rounded-xl p-6 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center text-center">
                  <useCase.icon className={`w-12 h-12 mb-4 ${useCase.color}`} />
                  <h3 className="text-lg font-semibold text-white">{useCase.name}</h3>
                  <p className="text-gray-400 mb-2">{useCase.challenge}</p>
                  <button 
                    onClick={() => toggleDetails(index)}
                    className="text-blue-500 hover:underline"
                  >
                    {useCase.detailsVisible ? 'Hide Details...' : 'More Details...'}
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {useCases.map((useCase, index) => (
          useCase.detailsVisible && (
            <div key={index} className="mt-4 bg-gray-900 rounded-xl p-6 w-full">
              <div className="flex items-center mb-4">
                <useCase.icon className={`w-16 h-16 mr-6 ${useCase.color}`} />
                <div>
                  <h2 className="text-2xl font-bold text-white">{useCase.name}</h2>
                  <p className="text-lg text-gray-400">{useCase.challenge}</p>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-white">Solution:</h4>
              <p className="text-gray-300 mb-4">{useCase.solution}</p>
              <h4 className="font-semibold text-lg text-white">Project Steps:</h4>
              <ul className="list-disc list-inside mb-4">
                {useCase.projectSteps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-gray-300">{step}</li>
                ))}
              </ul>
              <h4 className="font-semibold text-lg text-white">Technologies Used:</h4>
              <p className="text-gray-300 mb-4">{useCase.technologiesUsed.join(', ')}</p>
              <h4 className="font-semibold text-lg text-white">Impact:</h4>
              <p className="text-gray-300">{useCase.impact}</p>
              {useCase.learnMoreLink && (
                <button 
                  onClick={() => handleLearnMore(useCase)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Learn More
                </button>
              )}
            </div>
          )
        ))}
      </div>
    </section>
  );
}

export default TechUseCases;
