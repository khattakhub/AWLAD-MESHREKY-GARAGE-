import React from 'react';

export interface Service {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

export interface Feature {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    vehicle: string;
}

// FIX: Change 'icon' type to accept a component, not a pre-rendered element.
// This enables a more robust rendering pattern.
export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    component: React.FC<any>;
}

export interface BlogPost {
    slug: string;
    image: string;
    category: string;
    title:string;
    excerpt: string;
    link: string;
    content: string;
}