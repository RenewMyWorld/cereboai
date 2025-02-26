import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Code } from 'lucide-react';
import SectionTransition from '../components/SectionTransition';
import Hero from '../components/Hero';
import Benefits from '../components/sections/Benefits';
import FeaturedApps from '../components/sections/FeaturedApps';
import PopularCategories from '../components/sections/PopularCategories';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import Newsletter from '../components/Newsletter';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';
import TechIconGrid from '../components/TechIconGrid';
import TechUseCases from '../components/sections/TechUseCases';
import SpaceNebulaBg from '../components/layouts/SpaceNebulaBg';
import Modal from '../components/Modal';
import NPMToolsGuide from '../components/NPMToolsGuide';
import NPMToolsGuideModal from '../components/modals/NPMToolsGuide';
import { useTheme } from '../contexts/ThemeContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RobotModel from '../components/3d/RobotModel';

function HomePage() {
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          highlight: 'text-blue-600',
          section: 'bg-gray-50',
          border: 'border-gray-200'
        };
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-white',
          subtext: 'text-gray-300',
          highlight: 'text-blue-400',
          section: 'bg-gray-900',
          border: 'border-gray-800'
        };
      default:
        return {
          background: 'bg-transparent',
          text: 'text-white',
          subtext: 'text-gray-300',
          highlight: 'text-blue-400',
          section: 'bg-black/30',
          border: 'border-white/20'
        };
    }
  };

  const styles = getThemeStyles();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const [isNpmGuideOpen, setIsNpmGuideOpen] = useState(false);

  return (
    <div className={`min-h-screen ${styles.background}`}>
      <SpaceNebulaBg />
      <SectionTransition>
        <Hero />
        
        {/* New Agentic AI Development Section */}
        <motion.section 
          className="py-16 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <Spotlight 
            className="-top-40 left-0 md:left-60 md:-top-20"
            size={200}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Agentic AI Development
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Revolutionize your workflow with intelligent, context-aware AI agents
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center space-x-4">
                  <Rocket className="w-10 h-10 text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Rapid Development</h3>
                    <p className="text-gray-300">Transform ideas into functional applications instantly</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Zap className="w-10 h-10 text-yellow-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Intelligent Automation</h3>
                    <p className="text-gray-300">Leverage AI to automate complex development tasks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Code className="w-10 h-10 text-green-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Context-Aware Coding</h3>
                    <p className="text-gray-300">AI that understands your project's unique context</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="relative cursor-pointer"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={() => setIsNpmGuideOpen(true)}
              >
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-[500px]"
                />
              </motion.div>
            </div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <TechIconGrid />
            </motion.div>
          </div>
        </motion.section>

        <Benefits />
        <TechUseCases />
        <FeaturedApps />
        <PopularCategories />
        <Process />
        <Testimonials />
        <Newsletter />
      </SectionTransition>

      <NPMToolsGuideModal 
        isOpen={isNpmGuideOpen}
        onClose={() => setIsNpmGuideOpen(false)}
      />
    </div>
  )
}

export default HomePage;