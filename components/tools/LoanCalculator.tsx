'use client';

import React, { useState, useMemo } from 'react';

const LoanCalculator: React.FC = () => {
    const [price, setPrice] = useState('100000');
    const [downPayment, setDownPayment] = useState('20000');
    const [years, setYears] = useState('5');
    const [rate, setRate] = useState('4.5');
    const [emi, setEmi] = useState<number | null>(null);

    const inputClasses = "w-full p-3 bg-gray-50 dark:bg-dark border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent placeholder-gray-500 text-gray-900 dark:text-gray-200";

    const calculateEmi = () => {
        const principal = parseFloat(price) - parseFloat(downPayment);
        const monthlyRate = parseFloat(rate) / 100 / 12;
        const months = parseInt(years) * 12;

        if (principal > 0 && monthlyRate > 0 && months > 0) {
            const calculatedEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
            setEmi(calculatedEmi);
        } else {
            setEmi(null);
        }
    };

    const bankRates = useMemo(() => [
        { name: 'Emirates NBD', rate: '2.49% - 4.99%', type: 'Flat' },
        { name: 'ADCB', rate: '3.65% - 6.25%', type: 'Reducing' },
        { name: 'Dubai Islamic Bank', rate: '2.75% - 5.00%', type: 'Flat' },
        { name: 'RAKBANK', rate: '3.45% - 7.00%', type: 'Reducing' },
    ], []);

    return (
        <div className="bg-white dark:bg-dark p-8 rounded-xl shadow-2xl">
            <h3 className="text-3xl font-bold text-dark dark:text-white mb-6 text-center">Car Loan Calculator</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Car Price (AED)</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inputClasses} placeholder="e.g., 100000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Down Payment (AED)</label>
                        <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} className={inputClasses} placeholder="e.g., 20000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Loan Duration (Years)</label>
                        <input type="number" value={years} onChange={e => setYears(e.target.value)} className={inputClasses} placeholder="e.g., 5" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Interest Rate (% p.a.)</label>
                        <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className={inputClasses} placeholder="e.g., 4.5" />
                    </div>
                    <button onClick={calculateEmi} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl shadow-md transition-transform transform hover:scale-105">
                        Calculate Monthly Installment
                    </button>

                    {emi !== null && (
                        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
                            <h4 className="font-bold text-lg text-green-800 dark:text-green-300">Estimated Monthly Installment (EMI)</h4>
                            <p className="text-3xl font-black text-green-700 dark:text-green-400">AED {emi.toFixed(2)}</p>
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="text-xl font-bold text-dark dark:text-white mb-4">Sample Bank Rates (UAE)</h4>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-secondary">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bank</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Interest Rate</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-dark divide-y divide-gray-200 dark:divide-gray-700">
                                {bankRates.map((bank, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{bank.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{bank.rate}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{bank.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">*Rates are indicative and subject to change. Please contact banks directly for exact figures.</p>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;
