import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogData } from '@/content/blog';

const BlogPage = () => {
    return (
        <section id="blog" className="py-24 sm:py-32 bg-white dark:bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-dark dark:text-white">From Our Blog</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Get the latest automotive news, tips, and insights from our team of experts.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData.map((post) => (
                        <Link key={post.slug} href={post.link} className="block group bg-light dark:bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                           <div className="overflow-hidden relative h-48 w-full">
                             <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" />
                           </div>
                           <div className="p-6">
                                <p className="text-sm font-semibold text-primary dark:text-accent mb-2">{post.category}</p>
                                <h3 className="text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">{post.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{post.excerpt}</p>
                           </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPage;