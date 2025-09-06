import React from 'react';

const ContactInfo: React.FC = () => {
    return (
        <div className="bg-white dark:bg-dark-secondary p-8 rounded-xl shadow-lg h-full flex flex-col">
            <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">Ajman Branch</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">37 41 St, Al Jurf Industrial 1, Ajman, UAE</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Phone:</strong> +971 50 836 1799 / +971 55 587 2704</p>
            <div className="text-gray-700 dark:text-gray-300 mb-6">
                <p className="font-bold">Hours:</p>
                <p>Saturday - Thursday: 8AM - 1PM, 3PM - 9PM</p>
                <p>Friday: 3PM - 9PM</p>
            </div>
            <div className="mt-auto">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.832966579044!2d55.480837!3d25.3768139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f583568911075%3A0x6a2333b21b016259!2sAWLAD%20MESHREKY%20AUTO%20MAINT%20%26%20REP%20GARAGE!5e0!3m2!1sen!2sae!4v1721216000000!5m2!1sen!2sae"
                    width="100%" 
                    height="250" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy"
                    title="Garage Location"
                    className="rounded-xl shadow-md filter dark:invert"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactInfo;
