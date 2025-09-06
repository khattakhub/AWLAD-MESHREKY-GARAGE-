import React from 'react';
import AppointmentForm from '@/components/AppointmentForm';

export default function AppointmentPage() {
    return (
        <div className="bg-light dark:bg-dark py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-dark dark:text-white">Book an Appointment</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                        Fill out the form below to schedule your visit. We'll confirm your appointment shortly.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <AppointmentForm />
                </div>
            </div>
        </div>
    );
}
