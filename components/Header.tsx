'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon } from './IconComponents';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/tools', label: 'Tools' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];
  
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-dark/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`;
  const textColor = isScrolled ? 'text-dark dark:text-white' : 'text-white';
  const navLinkColor = isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent' : 'text-white/80 hover:text-white';

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className={`font-black text-2xl transition-colors duration-300 ${textColor}`}>
          AWLAD MESHREKY
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map(link => (
             <Link key={link.href} href={link.href} className={`font-semibold transition-colors duration-300 ${navLinkColor}`}>{link.label}</Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
            <button onClick={toggleTheme} aria-label="Toggle theme" className={`p-2 rounded-full ${isScrolled ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-secondary' : 'text-white/80 hover:bg-white/20'} transition-colors`}>
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <Link href="/appointment" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                Book Appointment
            </Link>
        </div>
        
        <div className="lg:hidden flex items-center">
            <button onClick={toggleTheme} aria-label="Toggle theme" className={`p-2 mr-2 rounded-full ${isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white/80'}`}>
                 {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" className={`hamburger-menu ${textColor}`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
        </div>
      </div>
      
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-dark shadow-lg absolute top-full left-0 w-full`}>
          <nav className="flex flex-col items-center space-y-4 py-6">
               {navLinks.map(link => (
                 <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="font-semibold text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent">{link.label}</Link>
              ))}
              <Link href="/appointment" onClick={() => setIsMenuOpen(false)} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl shadow-lg mt-4">
                  Book Appointment
              </Link>
          </nav>
      </div>
    </header>
  );
};

export default Header;