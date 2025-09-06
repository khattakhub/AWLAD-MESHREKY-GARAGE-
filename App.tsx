
import React, { useState, useEffect } from 'react';
import  Header  from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Tools from './components/Tools';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { WhatsAppIcon } from './components/IconComponents';
import BlogPreview from './components/BlogPreview';

const App: React.FC = () => {
  // FIX: Removed theme state and logic to rely on the self-contained Header component.
  // This resolves the prop-type error and eliminates redundant state management.

  return (
    <div className="bg-white dark:bg-dark text-secondary dark:text-gray-300 font-sans transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <Tools />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
      <a
        href="https://wa.me/971508361799"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
};

export default App;