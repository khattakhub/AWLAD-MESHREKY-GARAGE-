
import React from 'react';
import { Feature } from '../types';
import { WrenchIcon, ShieldCheckIcon, TagIcon, StarIcon } from './IconComponents';

const features: Feature[] = [
    {
        icon: WrenchIcon,
        title: "Expert Technicians",
        description: "Our certified mechanics have years of experience and are trained on the latest automotive technology."
    },
    {
        icon: ShieldCheckIcon,
        title: "Quality Parts Guarantee",
        description: "We use only high-quality, OEM or equivalent parts to ensure durability and performance for every repair."
    },
    {
        icon: TagIcon,
        title: "Transparent Pricing",
        description: "Receive a detailed, upfront quote before any work begins. No hidden fees, just honest service."
    },
    {
        icon: StarIcon,
        title: "Customer Satisfaction",
        description: "We are committed to providing an exceptional experience and ensuring you're fully satisfied with our work."
    }
];

const WhyChooseUs: React.FC = () => {
    return (
        <section id="why-us" className="py-20 bg-white dark:bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-dark dark:text-white">Why Awlad Meshreky?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">The best choice for your vehicle's health and your peace of mind.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="text-center p-6">
                                <div className="flex items-center justify-center h-20 w-20 rounded-xl bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent mx-auto mb-4">
                                    <Icon />
                                </div>
                                <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;