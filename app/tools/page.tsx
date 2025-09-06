import React from 'react';
import Link from 'next/link';
import { toolsData } from '@/content/tools';
import ToolCard from '@/components/tools/ToolCard';

const ToolsPage = () => {
    return (
        <section id="tools" className="py-24 sm:py-32 bg-light dark:bg-dark-secondary">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-dark dark:text-white">Automotive Tools</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                        A suite of useful calculators and tools to help you manage your vehicle.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {toolsData.map((tool) => (
                        <Link key={tool.id} href={`/tools/${tool.id}`} className="block h-full">
                            <ToolCard 
                                title={tool.title}
                                description={tool.description}
                                icon={tool.icon}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsPage;