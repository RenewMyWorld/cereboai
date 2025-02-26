import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, CheckCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import GlassCard from '../common/GlassCard';

const testimonials = [
  {
    id: 1,
    author: "Sarah Chen",
    role: "CTO, TechInnovate",
    content: "The AI agents have transformed our development process, cutting down our project timelines by 40%.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    detailedStory: {
      challenge: "Inefficient Development Workflow",
      solution: "AI-Powered Development Assistant",
      impact: "40% Reduction in Project Timelines",
      fullDescription: "Our software development team was struggling with fragmented workflows and communication bottlenecks. The AI agent integrated seamlessly into our development environment, providing real-time code suggestions, automated documentation, and predictive debugging. By analyzing our codebase and understanding context, it helped junior developers write more efficient code and senior developers focus on complex architectural decisions.",
      keyBenefits: [
        "Automated code completion",
        "Intelligent bug prediction",
        "Real-time documentation generation",
        "Context-aware development assistance"
      ]
    }
  },
  {
    id: 2,
    author: "Michael Rodriguez",
    role: "Lead Developer, DataDrive Solutions",
    content: "Unprecedented context awareness. It's like having a senior developer pair programming with you 24/7.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    detailedStory: {
      challenge: "Knowledge Silos and Onboarding Complexity",
      solution: "Contextual AI Programming Assistant",
      impact: "Accelerated Onboarding and Knowledge Transfer",
      fullDescription: "Our team struggled with knowledge transfer and bringing new developers up to speed. The AI agent acts as a perpetual mentor, providing contextual insights, explaining complex code patterns, and suggesting best practices in real-time. New team members can now understand our codebase faster and contribute more effectively from day one.",
      keyBenefits: [
        "Instant code context explanation",
        "Best practice recommendations",
        "Seamless knowledge transfer",
        "Reduced onboarding time"
      ]
    }
  },
  {
    id: 3,
    author: "Emily Wong",
    role: "Startup Founder, AIBridge",
    content: "The intelligent automation has been a game-changer for our lean startup. We're moving faster than ever.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    detailedStory: {
      challenge: "Manual Data Processing",
      solution: "AI-Driven Automation",
      impact: "90% Reduction in Manual Data Entry",
      fullDescription: "Our startup was struggling with manual data processing, which was time-consuming and prone to errors. The AI-powered automation tool streamlined our workflow, allowing us to focus on high-leverage tasks and accelerate our growth.",
      keyBenefits: [
        "Automated data processing",
        "Improved data accuracy",
        "Increased productivity",
        "Enhanced scalability"
      ]
    }
  },
  {
    id: 4,
    author: "Dr. Alex Patel",
    role: "Research Scientist, NLP Institute",
    content: "Our text generation capabilities have been revolutionized. We can now summarize complex research papers in minutes with unprecedented accuracy.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    detailedStory: {
      challenge: "Manual Research Summarization",
      solution: "AI-Powered Text Generation",
      impact: "95% Reduction in Research Summarization Time",
      fullDescription: "Our research team was spending countless hours summarizing complex research papers. The AI-powered text generation tool enabled us to automate this process, freeing up time for more strategic and high-impact research activities.",
      keyBenefits: [
        "Automated research summarization",
        "Improved summarization accuracy",
        "Increased research productivity",
        "Enhanced knowledge discovery"
      ]
    }
  },
  {
    id: 5,
    author: "Jessica Martinez",
    role: "Content Strategy Lead, GlobalMedia",
    content: "The multilingual translation and content generation tools have expanded our global reach exponentially. We're creating content in 10+ languages effortlessly.",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    detailedStory: {
      challenge: "Language Barriers and Content Creation",
      solution: "AI-Driven Multilingual Content Generation",
      impact: "500% Increase in Global Content Reach",
      fullDescription: "Our content team was struggling to create high-quality content in multiple languages. The AI-powered multilingual translation and content generation tools enabled us to overcome language barriers and expand our global reach, engaging with audiences in their native languages.",
      keyBenefits: [
        "Automated multilingual translation",
        "AI-driven content generation",
        "Increased global content reach",
        "Enhanced audience engagement"
      ]
    }
  },
  {
    id: 6,
    author: "David Kim",
    role: "Computer Vision Engineer, VisualTech",
    content: "Image generation and enhancement capabilities are mind-blowing. We're creating high-quality visuals that would have taken weeks in just hours.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    detailedStory: {
      challenge: "Manual Image Processing",
      solution: "AI-Powered Image Generation and Enhancement",
      impact: "90% Reduction in Image Processing Time",
      fullDescription: "Our computer vision team was spending countless hours processing and enhancing images. The AI-powered image generation and enhancement tool enabled us to automate this process, freeing up time for more strategic and high-impact activities.",
      keyBenefits: [
        "Automated image processing",
        "Improved image quality",
        "Increased productivity",
        "Enhanced visual storytelling"
      ]
    }
  },
  {
    id: 7,
    author: "Elena Sokolova",
    role: "Customer Experience Director, TechSupport Inc",
    content: "Our AI-powered chatbots now handle 75% of customer inquiries with human-like understanding and empathy. The conversational AI is a game-changer.",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    detailedStory: {
      challenge: "Manual Customer Support",
      solution: "AI-Powered Conversational Chatbots",
      impact: "75% Reduction in Customer Support Queries",
      fullDescription: "Our customer support team was struggling to handle a high volume of customer inquiries. The AI-powered conversational chatbots enabled us to automate this process, providing human-like understanding and empathy to our customers.",
      keyBenefits: [
        "Automated customer support",
        "Improved customer experience",
        "Increased customer satisfaction",
        "Enhanced scalability"
      ]
    }
  },
  {
    id: 8,
    author: "Raj Gupta",
    role: "Data Science Manager, InsightAnalytics",
    content: "Sentiment analysis and data processing have become incredibly efficient. We're extracting actionable insights from massive datasets in real-time.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    detailedStory: {
      challenge: "Manual Data Analysis",
      solution: "AI-Driven Sentiment Analysis and Data Processing",
      impact: "90% Reduction in Data Analysis Time",
      fullDescription: "Our data science team was spending countless hours analyzing massive datasets. The AI-powered sentiment analysis and data processing tool enabled us to automate this process, extracting actionable insights in real-time.",
      keyBenefits: [
        "Automated data analysis",
        "Improved data accuracy",
        "Increased productivity",
        "Enhanced decision-making"
      ]
    }
  },
  {
    id: 9,
    author: "Sophie Laurent",
    role: "Multimedia Producer, CreativeStudio",
    content: "Video and audio processing capabilities are extraordinary. Automated subtitling and noise reduction have transformed our production workflow.",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    detailedStory: {
      challenge: "Manual Video and Audio Processing",
      solution: "AI-Powered Video and Audio Processing",
      impact: "80% Reduction in Video and Audio Processing Time",
      fullDescription: "Our multimedia team was spending countless hours processing video and audio files. The AI-powered video and audio processing tool enabled us to automate this process, freeing up time for more creative and high-impact activities.",
      keyBenefits: [
        "Automated video and audio processing",
        "Improved video and audio quality",
        "Increased productivity",
        "Enhanced multimedia storytelling"
      ]
    }
  },
  {
    id: 10,
    author: "Carlos Mendoza",
    role: "E-commerce Product Manager, RetailInnovate",
    content: "Personalized recommendation systems have increased our user engagement by 60%. The AI understands user preferences better than we ever could.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    detailedStory: {
      challenge: "Manual Product Recommendations",
      solution: "AI-Driven Personalized Recommendation Systems",
      impact: "60% Increase in User Engagement",
      fullDescription: "Our e-commerce team was struggling to provide personalized product recommendations to our users. The AI-powered recommendation system enabled us to automate this process, increasing user engagement and driving sales.",
      keyBenefits: [
        "Automated product recommendations",
        "Improved user experience",
        "Increased user engagement",
        "Enhanced sales and revenue"
      ]
    }
  },
  {
    id: 11,
    author: "Aisha Nakamura",
    role: "Healthcare Innovation Lead, MedTech Solutions",
    content: "Computer vision tasks in medical imaging have accelerated our diagnostic capabilities. Object detection and image analysis are incredibly precise.",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    detailedStory: {
      challenge: "Manual Medical Imaging Analysis",
      solution: "AI-Powered Computer Vision in Medical Imaging",
      impact: "90% Reduction in Medical Imaging Analysis Time",
      fullDescription: "Our healthcare team was spending countless hours analyzing medical images. The AI-powered computer vision tool enabled us to automate this process, accelerating our diagnostic capabilities and improving patient outcomes.",
      keyBenefits: [
        "Automated medical imaging analysis",
        "Improved diagnostic accuracy",
        "Increased productivity",
        "Enhanced patient care"
      ]
    }
  },
  {
    id: 12,
    author: "Thomas Weber",
    role: "Academic Research Coordinator, Global University",
    content: "Knowledge extraction from academic documents has become seamless. Converting handwritten notes and summarizing complex research is now effortless.",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    detailedStory: {
      challenge: "Manual Knowledge Extraction",
      solution: "AI-Powered Knowledge Extraction from Academic Documents",
      impact: "95% Reduction in Knowledge Extraction Time",
      fullDescription: "Our academic research team was spending countless hours extracting knowledge from academic documents. The AI-powered knowledge extraction tool enabled us to automate this process, freeing up time for more strategic and high-impact research activities.",
      keyBenefits: [
        "Automated knowledge extraction",
        "Improved knowledge accuracy",
        "Increased productivity",
        "Enhanced research outcomes"
      ]
    }
  }
];

const TestimonialModal: React.FC<{
  testimonial: typeof testimonials[0];
  onClose: () => void;
}> = ({ testimonial, onClose }) => {
  const { detailedStory } = testimonial;

  return (
    <Modal 
      isOpen={true}
      onClose={onClose}
      icon={<CheckCircle />}
      title={`${testimonial.author} - ${testimonial.role}`}
      description={testimonial.content}
      instructions={[
        `Challenge: ${detailedStory.challenge}`,
        `Solution: ${detailedStory.solution}`,
        `Full Description: ${detailedStory.fullDescription}`,
        ...detailedStory.keyBenefits.map(benefit => `• ${benefit}`)
      ]}
    />
  );
};

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<{
    isOpen: boolean;
    testimonial: typeof testimonials[0] | null;
  }>({
    isOpen: false,
    testimonial: null
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    const scrollAmount = 1; // Scroll speed

    const autoScroll = () => {
      if (isPaused) {
        animationId = requestAnimationFrame(autoScroll);
        return;
      }

      // Increment scroll position
      container.scrollLeft += scrollAmount;

      // Check if we've scrolled past a full set of cards
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Community Says</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from innovators transforming industries with AI
            </p>
          </div>

          <div 
            ref={containerRef}
            className="relative group overflow-x-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="flex space-x-8 pb-8 scroll-smooth"
              style={{ 
                width: '200%', 
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-full md:w-[400px] scroll-snap-align-start cursor-pointer"
                  onClick={() => setSelectedTestimonial({ 
                    isOpen: true, 
                    testimonial 
                  })}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 
                  }}
                >
                  <GlassCard
                    className={`animate-fade-in bg-transparent h-full`}
                  >
                    <div className="absolute -top-4 -left-4 text-indigo-500 z-10">
                      <Quote className="h-8 w-8" />
                    </div>
                    <p className="text-gray-300 mb-6 italic text-lg">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-white font-medium">{testimonial.author}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <div 
              className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/50 to-transparent pointer-events-none"
            />
            <div 
              className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/50 to-transparent pointer-events-none"
            />
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedTestimonial.isOpen && selectedTestimonial.testimonial && (
          <TestimonialModal 
            testimonial={selectedTestimonial.testimonial}
            onClose={() => setSelectedTestimonial({ 
              isOpen: false, 
              testimonial: null 
            })}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Testimonials;