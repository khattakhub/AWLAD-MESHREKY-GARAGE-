import LoanCalculator from '@/components/tools/LoanCalculator';
import FuelCostEstimator from '@/components/tools/FuelCostEstimator';
import MaintenanceScheduler from '@/components/tools/MaintenanceScheduler';
import { CalculatorIcon, FuelIcon, ScheduleIcon } from '@/components/IconComponents';
// FIX: Import the Tool type from the central types file for consistency and to resolve typing errors.
import type { Tool } from '@/types';

// FIX: Removed local Tool interface definition. It is now imported from @/types.

export const toolsData: Tool[] = [
    {
        id: 'loan-calculator',
        title: 'Car Loan Calculator',
        description: 'Estimate your monthly car loan installments (EMI) with ease.',
        icon: CalculatorIcon,
        component: LoanCalculator,
    },
    {
        id: 'fuel-cost-estimator',
        title: 'Fuel Cost Estimator',
        description: 'Compare fuel costs between Petrol/Diesel and EV vehicles.',
        icon: FuelIcon,
        component: FuelCostEstimator,
    },
    {
        id: 'maintenance-scheduler',
        title: 'Maintenance Schedule',
        description: 'Generate a maintenance schedule for your car and export it.',
        icon: ScheduleIcon,
        component: MaintenanceScheduler,
    },
];