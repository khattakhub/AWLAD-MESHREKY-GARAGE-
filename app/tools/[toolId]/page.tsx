import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { toolsData } from '@/content/tools';
import { ArrowLeftIcon } from '@/components/IconComponents';


interface ToolPageProps {
  params: {
    toolId: string;
  };
}

export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    toolId: tool.id,
  }));
}

export default function ToolPage({ params }: ToolPageProps) {
    const { toolId } = params;
    const tool = toolsData.find(t => t.id === toolId);

    if (!tool) {
        notFound();
    }

    const ToolComponent = tool.component;

    return (
        <section className="py-24 sm:py-32 bg-light dark:bg-dark-secondary">
            <div className="container mx-auto px-6">
                 <div className="max-w-4xl mx-auto">
                    <Link href="/tools" className="flex items-center gap-2 text-primary dark:text-accent font-semibold hover:underline mb-6">
                        <ArrowLeftIcon />
                        <span>Back to Tools</span>
                    </Link>
                    <ToolComponent />
                 </div>
            </div>
        </section>
    );
}