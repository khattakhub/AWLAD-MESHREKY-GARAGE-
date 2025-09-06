'use client';

import React, { useState, useMemo } from 'react';

const FuelCostEstimator: React.FC = () => {
    const [monthlyKm, setMonthlyKm] = useState('1500');
    const [mileage, setMileage] = useState('12');
    const [petrolPrice, setPetrolPrice] = useState('3.02');
    const [evEfficiency, setEvEfficiency] = useState('6');
    const [electricityPrice, setElectricityPrice] = useState('0.38');
    
    const inputClasses = "w-full p-3 bg-gray-50 dark:bg-dark border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent placeholder-gray-500 text-gray-900 dark:text-gray-200";

    const results = useMemo(() => {
        const km = parseFloat(monthlyKm);
        const petrolMileage = parseFloat(mileage);
        const petrol = parseFloat(petrolPrice);
        const evEff = parseFloat(evEfficiency);
        const electricity = parseFloat(electricityPrice);

        if (isNaN(km) || isNaN(petrolMileage) || isNaN(petrol) || isNaN(evEff) || isNaN(electricity) || petrolMileage <= 0 || evEff <= 0) {
            return null;
        }

        const litresPerMonth = km / petrolMileage;
        const monthlyPetrolCost = litresPerMonth * petrol;
        const kWhPerMonth = km / evEff;
        const monthlyEvCost = kWhPerMonth * electricity;
        const yearlyPetrolCost = monthlyPetrolCost * 12;
        const yearlyEvCost = monthlyEvCost * 12;
        const yearlySavings = yearlyPetrolCost - yearlyEvCost;

        return { monthlyPetrolCost, monthlyEvCost, yearlyPetrolCost, yearlyEvCost, yearlySavings };
    }, [monthlyKm, mileage, petrolPrice, evEfficiency, electricityPrice]);

    const maxCost = useMemo(() => {
        if (!results) return 1;
        return Math.max(results.yearlyPetrolCost, results.yearlyEvCost);
    }, [results]);

    return (
        <div className="bg-white dark:bg-dark p-8 rounded-xl shadow-2xl">
            <h3 className="text-3xl font-bold text-dark dark:text-white mb-6 text-center">Fuel Cost Estimator</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 pr-4 border-r-0 md:border-r md:border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-bold text-dark dark:text-white">Your Driving Details</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Monthly Driving (km)</label>
                        <input type="number" value={monthlyKm} onChange={e => setMonthlyKm(e.target.value)} className={inputClasses} />
                    </div>
                    <hr className="my-4 dark:border-gray-700"/>
                    <h4 className="text-lg font-semibold text-dark dark:text-white">Petrol / Diesel Car</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Car Mileage (km/L)</label>
                        <input type="number" value={mileage} onChange={e => setMileage(e.target.value)} className={inputClasses} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Fuel Price (AED/L)</label>
                        <input type="number" step="0.01" value={petrolPrice} onChange={e => setPetrolPrice(e.target.value)} className={inputClasses} />
                    </div>
                    <hr className="my-4 dark:border-gray-700"/>
                    <h4 className="text-lg font-semibold text-dark dark:text-white">Electric Car (EV)</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">EV Efficiency (km/kWh)</label>
                        <input type="number" value={evEfficiency} onChange={e => setEvEfficiency(e.target.value)} className={inputClasses} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Electricity Price (AED/kWh)</label>
                        <input type="number" step="0.01" value={electricityPrice} onChange={e => setElectricityPrice(e.target.value)} className={inputClasses} />
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">Cost Comparison</h3>
                    {results ? (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Yearly Cost Comparison</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">Petrol Car</span>
                                            <span className="text-sm font-bold">AED {results.yearlyPetrolCost.toFixed(0)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                            <div className="bg-orange-500 h-4 rounded-full" style={{ width: `${(results.yearlyPetrolCost / maxCost) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">Electric Car</span>
                                            <span className="text-sm font-bold">AED {results.yearlyEvCost.toFixed(0)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                            <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(results.yearlyEvCost / maxCost) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg text-center">
                                <h4 className="font-bold text-lg text-green-800 dark:text-green-300">Potential Yearly Savings with EV</h4>
                                <p className="text-3xl font-black text-green-700 dark:text-green-400">AED {results.yearlySavings.toFixed(0)}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-gray-100 dark:bg-dark-secondary p-3 rounded-xl">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Petrol Cost</p>
                                    <p className="font-bold text-lg text-dark dark:text-white">AED {results.monthlyPetrolCost.toFixed(0)}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-dark-secondary p-3 rounded-xl">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly EV Cost</p>
                                    <p className="font-bold text-lg text-dark dark:text-white">AED {results.monthlyEvCost.toFixed(0)}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-6 bg-gray-50 dark:bg-dark-secondary rounded-xl">
                             <p className="text-gray-600 dark:text-gray-400">Please fill in all fields with valid numbers to see the cost comparison.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FuelCostEstimator;
