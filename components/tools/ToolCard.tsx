import React from 'react';

interface ToolCardProps {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    // FIX: Add optional onClick prop to handle click events.
    onClick?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon: Icon, title, description, onClick }) => {
    return (
        <div 
            // FIX: Apply the onClick handler to the div.
            onClick={onClick}
            className="bg-white dark:bg-dark p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full"
        >
            <div className="text-accent mb-4">
                <Icon />
            </div>
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 flex-grow">{description}</p>
        </div>
    );
};

export default ToolCard;