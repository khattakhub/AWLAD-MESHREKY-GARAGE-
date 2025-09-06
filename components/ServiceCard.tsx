
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="bg-white dark:bg-dark p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="text-accent mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
    </div>
  );
};

export default ServiceCard;