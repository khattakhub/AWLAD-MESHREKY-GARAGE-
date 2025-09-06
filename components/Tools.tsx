
import React, { useState } from 'react';
import { Tool } from '../types';
import ToolCard from './tools/ToolCard';
import LoanCalculator from './tools/LoanCalculator';
import FuelCostEstimator from './tools/FuelCostEstimator';
import MaintenanceScheduler from './tools/MaintenanceScheduler';
import { CalculatorIcon, FuelIcon, ScheduleIcon } from './IconComponents';

const Tools: React.FC = () => {
    const [activeTool, setActiveTool] = useState<string | null>(null);

    const handleSelectTool = (id: string) => {
        setActiveTool(id);
        const element = document.getElementById('tools');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        setActiveTool(null);
    };

    const toolsData: Tool[] = [
        {
            id: 'loan-calculator',
            title: 'Car Loan Calculator',
            description: 'Estimate your monthly car loan installments (EMI) with ease.',
            // FIX: Pass the component reference `CalculatorIcon` instead of the element `<CalculatorIcon />` to match the `Tool` type definition.
            icon: CalculatorIcon,
            component: LoanCalculator,
        },
        {
            id: 'fuel-cost-estimator',
            title: 'Fuel Cost Estimator',
            description: 'Compare fuel costs between Petrol/Diesel and EV vehicles.',
            // FIX: Pass the component reference `FuelIcon` instead of the element `<FuelIcon />` to match the `Tool` type definition.
            icon: FuelIcon,
            component: FuelCostEstimator,
        },
        {
            id: 'maintenance-scheduler',
            title: 'Maintenance Schedule',
            description: 'Generate a maintenance schedule for your car and export it.',
            // FIX: Pass the component reference `ScheduleIcon` instead of the element `<ScheduleIcon />` to match the `Tool` type definition.
            icon: ScheduleIcon,
            component: MaintenanceScheduler,
        },
    ];

    const ActiveToolComponent = toolsData.find(tool => tool.id === activeTool)?.component;

    return (
        <section id="tools" className="py-20 bg-light dark:bg-dark-secondary">
            <div className="container mx-auto px-6">
                {!activeTool ? (
                    <>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-dark dark:text-white">Automotive Tools</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                                A suite of useful calculators and tools to help you manage your vehicle.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {toolsData.map((tool) => (
                                <ToolCard 
                                    key={tool.id}
                                    title={tool.title}
                                    description={tool.description}
                                    icon={tool.icon}
                                    onClick={() => handleSelectTool(tool.id)}
                                />
                            ))}
                        </div>
                    </>
                ) : ActiveToolComponent ? (
                    <ActiveToolComponent onBack={handleBack} />
                ) : null}
            </div>
        </section>
    );
};

export default Tools;