'use client';

import React, { useState } from 'react';
import { Testimonial } from '../types';
import { QuoteIcon } from './IconComponents';

const testimonialsData: Testimonial[] = [
    {
        quote: "Absolutely top-notch service. The team at Awlad Meshreky diagnosed a complex engine issue that other garages missed. My car runs better than ever. Highly recommended!",
        author: "Ahmed Al-Mansoori",
        vehicle: "Nissan Patrol"
    },
    {
        quote: "I brought my car in for detailing and was blown away by the results. It looked brand new! The attention to detail is incredible. Fantastic job and great value.",
        author: "Fatima Khan",
        vehicle: "Lexus ES 350"
    },
    {
        quote: "Honest, reliable, and professional. They gave me a transparent quote for my brake service and completed the work on time. You can trust these guys with your car.",
        author: "John D'Souza",
        vehicle: "Toyota Camry"
    }
];

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <section id="testimonials" className="py-20 bg-light dark:bg-dark-secondary">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-dark dark:text-white">What Our Customers Say</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Real stories from satisfied clients who trust us with their vehicles.</p>
                
                <div className="relative mt-12 max-w-3xl mx-auto">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary dark:text-accent opacity-20">
                         <QuoteIcon className="h-16 w-16" />
                    </div>
                   
                    <div className="overflow-hidden relative h-48 flex items-center">
                        {testimonialsData.map((testimonial, index) => (
                           <div key={index} className={`absolute w-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-xl italic text-secondary dark:text-gray-300">"{testimonial.quote}"</p>
                                <p className="mt-4 font-bold text-dark dark:text-white">{testimonial.author}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.vehicle}</p>
                           </div>
                        ))}
                    </div>

                    <button onClick={handlePrev} aria-label="Previous testimonial" className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 bg-white dark:bg-dark p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNext} aria-label="Next testimonial" className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 bg-white dark:bg-dark p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;