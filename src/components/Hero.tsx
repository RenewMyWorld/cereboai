import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ParticleNetwork from './animations/ParticleNetwork';
import GlowingOrb from './animations/GlowingOrb';
import FloatingLines from './animations/FloatingLines';
import { Rocket, Users, Puzzle, Lightbulb, Laptop, Book, Handshake, Flag } from 'lucide-react';

const AnimatedStardust = () => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '5%', left: '5%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '10%', left: '30%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '15%', left: '50%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '20%', left: '70%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '25%', left: '90%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '30%', left: '60%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '35%', left: '40%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '40%', left: '20%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '45%', left: '10%' }} />
    <div className="stardust particle" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', top: '50%', left: '80%' }} />
  </motion.div>
);

const AnimatedRocket = () => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, 100, -100, 50, -50, 0],
      y: [0, -200, 200, -100, 100, 0],
    }}
    transition={{
      duration: 20,
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="absolute left-1/2 transform -translate-x-1/2 opacity-25"
  >
    <Rocket className="w-32 h-32 text-white" />
    <AnimatedStardust />
  </motion.div>
);

const AnimatedUsers = () => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, 100, -100, 50, -50, 0],
      y: [0, -200, 200, -100, 100, 0],
    }}
    transition={{
      duration: 20,
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="absolute left-1/2 transform -translate-x-1/2 opacity-25"
  >
    <Users className="w-32 h-32 text-white" />
  </motion.div>
);

const AnimatedPuzzle = () => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, 100, -100, 50, -50, 0],
      y: [0, -200, 200, -100, 100, 0],
    }}
    transition={{
      duration: 20,
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="absolute left-1/2 transform -translate-x-1/2 opacity-25"
  >
    <Puzzle className="w-32 h-32 text-white" />
  </motion.div>
);

const AnimatedLightbulb = () => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, 100, -100, 50, -50, 0],
      y: [0, -200, 200, -100, 100, 0],
    }}
    transition={{
      duration: 20,
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="absolute left-1/2 transform -translate-x-1/2 opacity-25"
  >
    <Lightbulb className="w-32 h-32 text-white" />
  </motion.div>
);

const AnimatedHandshake = () => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, 100, -100, 50, -50, 0],
      y: [0, -200, 200, -100, 100, 0],
    }}
    transition={{
      duration: 20,
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="absolute left-1/2 transform -translate-x-1/2 opacity-25"
  >
    <Handshake className="w-32 h-32 text-white" />
  </motion.div>
);

const AnimatedFlag = () => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, 100, -100, 50, -50, 0],
      y: [0, -200, 200, -100, 100, 0],
    }}
    transition={{
      duration: 20,
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="absolute left-1/2 transform -translate-x-1/2 opacity-25"
  >
    <Flag className="w-32 h-32 text-white" />
  </motion.div>
);

const AnimatedLaptop = () => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, 100, -100, 50, -50, 0],
      y: [0, -200, 200, -100, 100, 0],
    }}
    transition={{
      duration: 20,
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="absolute left-1/2 transform -translate-x-1/2 opacity-25"
  >
    <Laptop className="w-32 h-32 text-white" />
  </motion.div>
);

const headingAnimations = {
  headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
  subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
};

const slides = [
  {
    title: "AI-Powered Development",
    subTitle: "Boost productivity by 47% with context-aware code suggestions. Our AI learns your coding patterns and project structure to deliver personalized assistance.",
    icon: <Rocket className="w-10 h-10 text-blue-400" />,
    cta: "Try AI Assistant",
    animation: <AnimatedRocket />,
    headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
    subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
  },
  {
    title: "Teams That Code Together, Ship Faster",
    subTitle: "Real-time pair programming, instant code reviews, and shared debugging sessions. Perfect for remote teams across multiple time zones.",
    icon: <Users className="w-10 h-10 text-blue-400" />,
    cta: "Enable Team Features",
    animation: <AnimatedUsers />,
    headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
    subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
  },
  {
    title: "Debug Like a Pro",
    subTitle: "Advanced error detection catches 92% of bugs before production. Integrated with GitHub, GitLab, and Bitbucket for seamless workflow.",
    icon: <Puzzle className="w-10 h-10 text-blue-400" />,
    cta: "Explore Debugging Tools",
    animation: <AnimatedPuzzle />,
    headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
    subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
  },
  {
    title: "Smart Code Generation",
    subTitle: "From REST APIs to React components, generate production-ready code in seconds. Includes type safety and best practices by default.",
    icon: <Lightbulb className="w-10 h-10 text-blue-400" />,
    cta: "Generate Your First Component",
    animation: <AnimatedLightbulb />,
    headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
    subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
  },
  {
    title: "Global Developer Network",
    subTitle: "Access 1M+ developers, 500K+ code solutions, and live mentoring sessions. Share knowledge and grow together.",
    icon: <Handshake className="w-10 h-10 text-blue-400" />,
    cta: "Connect with Developers",
    animation: <AnimatedHandshake />,
    headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
    subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
  },
  {
    title: "Enterprise-Grade Integration",
    subTitle: "Seamless CI/CD pipeline integration with Jenkins, CircleCI, and GitHub Actions. SOC2 and GDPR compliant.",
    icon: <Laptop className="w-10 h-10 text-blue-400" />,
    cta: "View Enterprise Solutions",
    animation: <AnimatedLaptop />,
    headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
    subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
  },
  {
    title: "Future-Proof Development",
    subTitle: "Stay ahead with cutting-edge tools: WebAssembly support, Edge Computing integration, and Zero-Trust security framework.",
    icon: <Flag className="w-10 h-10 text-blue-400" />,
    cta: "Start Free Trial",
    animation: <AnimatedFlag />,
    headingAnimation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } },
    subheadingAnimation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 2 } }
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = slides.length;

  useEffect(() => {
    const slideDuration = 10 * 1000; // 10 seconds
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };
    const intervalId = setInterval(nextSlide, slideDuration);
    return () => clearInterval(intervalId);
  }, [totalSlides]);

  return (
    <div 
      className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Web3 Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-indigo-950">
        <ParticleNetwork />
        <GlowingOrb />
        <FloatingLines />
      </div>

      {/* Globe Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
          alt="Digital Globe"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content Container */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
          } else if (info.offset.x < -50) {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
          }
        }}
        className="relative z-10 container mx-auto px-4 flex items-center justify-center h-full"
      >
        <div className="text-center max-w-3xl">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0, 
                y: index === currentSlide ? 0 : 50,
                scale: index === currentSlide ? 1 : 0.95
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
              className={`absolute left-0 right-0 px-4 py-6 ${
                index === currentSlide ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
              }`}
            >
              <motion.div className="absolute inset-0 flex items-center justify-center">
                {slide.animation}
              </motion.div>

              <motion.div
                className={`absolute inset-0 flex flex-col justify-center items-center text-white space-y-10 ${index === currentSlide ? 'visible' : 'invisible'}`}
              >
                <motion.div
                  className="text-3xl font-bold mb-2"
                  initial={slide.headingAnimation.initial}
                  animate={slide.headingAnimation.animate}
                  transition={slide.headingAnimation.transition}
                >
                  {slide.title}
                </motion.div>
                <motion.div
                  className="text-lg italic mb-4"
                  initial={slide.subheadingAnimation.initial}
                  animate={slide.subheadingAnimation.animate}
                  transition={slide.subheadingAnimation.transition}
                >
                  {slide.subTitle}
                </motion.div>
                <div className="flex items-center">
                  {slide.icon}
                </div>
                <button 
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
                  onClick={() => window.location.href = '/login'}
                >
                  {slide.cta}
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute z-20 inset-x-0 top-1/2 flex justify-between items-center px-4">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="NPM Tools Guide"
          description="The Technology Toolbar below provides quick access to various npm tools. Click on any technology to:\n\n- Copy its npm installation command\n- See a toast notification with the copied command\n\nHow to Use:\n- Click a technology to see its npm command\n- Pro Tip: Hover over the Technology Toolbar to pause its automatic scrolling.\n\nHidden Technology Toolbar\n\nDiscover a seamless technology integration experience with our innovative floating toolbar.\n\nDiscreetly positioned to the left, this dynamic toolbar showcases a curated selection of cutting-edge technologies.\n\nEach icon represents a powerful tool in your development arsenal, ready to be explored and integrated with a simple click."
        />
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-500 scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;