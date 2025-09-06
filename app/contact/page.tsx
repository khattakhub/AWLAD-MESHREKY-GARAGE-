import React from 'react';
import AppointmentForm from '@/components/AppointmentForm';
import ContactInfo from '@/components/ContactInfo';

export default function ContactPage() {
    return (
        <section className="py-24 sm:py-32 bg-light dark:bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-dark dark:text-white">Contact Us & Location</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Get in touch for a quote or visit our branch in Ajman.</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-2/3">
                        <AppointmentForm />
                    </div>
                    <div className="lg:w-1/3">
                        <ContactInfo />
                    </div>
                </div>
            </div>
        </section>
    );
}
