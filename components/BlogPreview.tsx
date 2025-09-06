
import React from 'react';
import { BlogPost } from '../types';

const blogData: BlogPost[] = [
    // FIX: Added missing 'slug' and 'content' properties to match the BlogPost type.
    {
        slug: '5-essential-maintenance-tips',
        image: 'https://images.unsplash.com/photo-1553859943-a02c544d7155?q=80&w=800&auto=format&fit=crop',
        category: 'Maintenance',
        title: '5 Essential Maintenance Tips to Extend Your Car\'s Lifespan',
        excerpt: 'Regular maintenance is key to keeping your vehicle running smoothly and avoiding costly repairs down the road...',
        link: '#',
        content: 'Regular maintenance is key to keeping your vehicle running smoothly...',
    },
    // FIX: Added missing 'slug' and 'content' properties to match the BlogPost type.
    {
        slug: 'diy-vs-pro-repairs',
        image: 'https://images.unsplash.com/photo-1616852382901-70614183ba79?q=80&w=800&auto=format&fit=crop',
        category: 'DIY',
        title: 'When to See a Pro: DIY vs. Professional Car Repairs',
        excerpt: 'Some tasks are simple enough for a weekend warrior, but others require the expert touch of a certified technician...',
        link: '#',
        content: 'Some tasks are simple enough for a weekend warrior...',
    },
    // FIX: Added missing 'slug' and 'content' properties to match the BlogPost type.
    {
        slug: 'dashboard-warning-lights',
        image: 'https://images.unsplash.com/photo-1542844397-e387339a49c9?q=80&w=800&auto=format&fit=crop',
        category: 'Technology',
        title: 'Understanding Your Car\'s Dashboard Warning Lights',
        excerpt: 'That glowing light on your dashboard is trying to tell you something important. Here\'s a guide to what it means...',
        link: '#',
        content: 'That glowing light on your dashboard is trying to tell you something important...',
    },
];

const BlogPreview: React.FC = () => {
    return (
        <section id="blog" className="py-20 bg-white dark:bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-dark dark:text-white">From Our Blog</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Get the latest automotive news, tips, and insights from our team of experts.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData.map((post, index) => (
                        <a key={index} href={post.link} className="block group bg-light dark:bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                           <div className="overflow-hidden">
                             <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                           </div>
                           <div className="p-6">
                                <p className="text-sm font-semibold text-primary dark:text-accent mb-2">{post.category}</p>
                                <h3 className="text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">{post.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{post.excerpt}</p>
                           </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;