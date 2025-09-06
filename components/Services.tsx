
import React from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { EngineIcon, OilIcon, BrakeIcon, AcIcon, TireIcon, DetailingIcon } from './IconComponents';

const servicesData: Service[] = [
  {
    icon: EngineIcon,
    title: 'Engine Diagnostics & Repair',
    description: 'Advanced diagnostics to pinpoint issues and provide comprehensive engine repairs, from minor fixes to major overhauls.'
  },
  {
    icon: OilIcon,
    title: 'Lube & Oil Change',
    description: 'Keep your engine running smoothly with our premium oil change services, including filter replacement and fluid checks.'
  },
  {
    icon: BrakeIcon,
    title: 'Brake System Services',
    description: 'Complete brake inspection, pad and rotor replacement, and fluid services to ensure your safety on the road.'
  },
  {
    icon: AcIcon,
    title: 'A/C Repair & Service',
    description: 'Stay cool with our expert A/C diagnostics, refrigerant recharging, and component repair services for all vehicle types.'
  },
  {
    icon: TireIcon,
    title: 'Tire Services & Alignment',
    description: 'We offer tire rotation, balancing, and precision wheel alignment to maximize tire life and vehicle performance.'
  },
  {
    icon: DetailingIcon,
    title: 'Professional Detailing',
    description: 'Restore your vehicle\'s shine with our interior and exterior detailing packages, including polishing, waxing, and deep cleaning.'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-light dark:bg-dark-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark dark:text-white">Our Services</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">We provide a full range of automotive services to keep your vehicle in peak condition.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;