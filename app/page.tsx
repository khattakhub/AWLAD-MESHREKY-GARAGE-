import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';

const HomeCTA: React.FC = () => {
  return (
    <section className="py-20 bg-primary/10 dark:bg-accent/10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">Ready to Experience the Best Auto Care?</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Contact us today for a free quote or book an appointment with our expert technicians. We're here to help you get back on the road safely and swiftly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/appointment"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-xl text-lg shadow-xl transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            Book an Appointment
          </Link>
          <Link
            href="/services"
            className="bg-white dark:bg-dark text-secondary dark:text-gray-200 border-2 border-primary dark:border-accent font-bold py-4 px-10 rounded-xl text-lg shadow-xl transition-all hover:bg-primary/5 dark:hover:bg-accent/5 w-full sm:w-auto"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <HomeCTA />
    </>
  );
}