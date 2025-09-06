'use client';

import React, { useState } from 'react';

declare const jspdf: any;

interface MaintenanceItem {
    task: string;
    interval: string;
}

const MaintenanceScheduler: React.FC = () => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [schedule, setSchedule] = useState<MaintenanceItem[] | null>(null);

    const inputClasses = "w-full p-3 bg-gray-50 dark:bg-dark border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent placeholder-gray-500 text-gray-900 dark:text-gray-200";
    
    const genericSchedule: MaintenanceItem[] = [
        { task: 'Engine Oil & Filter Change', interval: 'Every 10,000 km or 6 months' },
        { task: 'Tire Rotation & Pressure Check', interval: 'Every 10,000 km' },
        { task: 'Brake System Inspection', interval: 'Every 20,000 km or 1 year' },
        { task: 'Air Filter Replacement', interval: 'Every 20,000 km' },
        { task: 'A/C System Check', interval: 'Every 20,000 km' },
        { task: 'Battery Test', interval: 'Every 20,000 km' },
        { task: 'Wheel Alignment', interval: 'Every 30,000 km or 2 years' },
        { task: 'Coolant Flush', interval: 'Every 50,000 km' },
        { task: 'Transmission Fluid Service', interval: 'Every 50,000 km - 80,000 km' },
        { task: 'Spark Plugs Replacement', interval: 'Every 80,000 km - 100,000 km' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(make && model && year) {
            setSchedule(genericSchedule);
        }
    };

    const exportToPdf = () => {
        if (!schedule || !make || !model || !year) return;

        const { jsPDF } = jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('AWLAD MESHREKY GARAGE', 105, 20, { align: 'center' });
        doc.setFontSize(14);
        doc.text('Suggested Maintenance Schedule', 105, 30, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Vehicle: ${year} ${make} ${model}`, 14, 45);

        const tableColumn = ["Task", "Recommended Interval"];
        const tableRows: string[][] = [];

        schedule.forEach(item => {
            tableRows.push([item.task, item.interval]);
        });

        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 55,
        });
        
        const pageCount = doc.internal.getNumberOfPages();
        for(let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Page ${i} of ${pageCount}`, 14, 285);
            doc.text(`Disclaimer: This is a general guideline.`, 200, 285, { align: 'right' });
        }

        doc.save(`Maintenance_Schedule_${make}_${model}.pdf`);
    };

    return (
        <div className="bg-white dark:bg-dark p-8 rounded-xl shadow-2xl">
            <h3 className="text-3xl font-bold text-dark dark:text-white mb-2 text-center">Maintenance Schedule Generator</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Enter your vehicle details to get a suggested maintenance plan.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-end gap-4 mb-8 p-4 bg-gray-50 dark:bg-dark-secondary rounded-xl border dark:border-gray-700">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Make</label>
                    <input type="text" value={make} onChange={e => setMake(e.target.value)} className={inputClasses} placeholder="e.g., Toyota" required />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Model</label>
                    <input type="text" value={model} onChange={e => setModel(e.target.value)} className={inputClasses} placeholder="e.g., Camry" required />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Year</label>
                    <input type="number" value={year} onChange={e => setYear(e.target.value)} className={inputClasses} placeholder="e.g., 2022" required />
                </div>
                <button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
                    Generate
                </button>
            </form>

            {schedule && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold text-dark dark:text-white">Generated Schedule for {year} {make} {model}</h4>
                        <button onClick={exportToPdf} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl shadow-md text-sm">
                            Download as PDF
                        </button>
                    </div>
                     <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-secondary">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Maintenance Task</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Interval</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-dark divide-y divide-gray-200 dark:divide-gray-700">
                                {schedule.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-dark-secondary">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{item.task}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.interval}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaintenanceScheduler;
