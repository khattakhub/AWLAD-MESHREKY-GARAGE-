import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogData } from '@/content/blog';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
    const post = blogData.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="py-24 sm:py-32 bg-white dark:bg-dark">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-primary dark:text-accent">{post.category}</p>
                    <h1 className="text-4xl font-bold text-dark dark:text-white mt-2">{post.title}</h1>
                </div>
                <div className="relative h-64 md:h-96 w-full mb-8 rounded-xl overflow-hidden">
                    <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div 
                    className="prose prose-lg dark:prose-invert max-w-none text-secondary dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />
            </div>
        </article>
    );
};

export default BlogPostPage;