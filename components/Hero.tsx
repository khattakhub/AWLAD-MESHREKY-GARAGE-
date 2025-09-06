'use client';

import React from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';

// FIX: Explicitly type containerVariants with Variants to ensure type compatibility.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2, // Start animations after a brief delay
    },
  },
};

// FIX: Explicitly type childVariants with Variants. This resolves the error where the 'ease' property was inferred as a generic string instead of a valid Easing type.
const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599493345842-c28b3d7a8226?q=80&w=2670&auto=format&fit=crop')" }}></div>
      <div className="absolute inset-0 bg-dark bg-opacity-70"></div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4"
      >
        <motion.h1 
          variants={childVariants}
          className="text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300"
        >
          PREMIUM AUTO CARE
        </motion.h1>
        <motion.p 
          variants={childVariants}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200"
        >
          Your trusted partner for all automotive repairs and maintenance. Quality service, expert technicians, and unbeatable prices in Ajman.
        </motion.p>
        <motion.div 
          variants={childVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a
            href="#contact"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-xl text-lg shadow-xl transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            Get a Free Quote
          </a>
          <a
            href="#services"
            className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-xl text-lg shadow-xl transition-all hover:bg-white hover:text-dark w-full sm:w-auto"
          >
            Our Services
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;