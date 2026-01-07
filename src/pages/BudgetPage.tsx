import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { MonthPicker } from '../components/ui/MonthPicker';
import { WeekPicker } from '../components/ui/WeekPicker';
import { YearPicker } from '../components/ui/YearPicker';
import { DateRangeFilter } from '../components/dashboard/DateRangeFilter';
import { type FilterPreset } from '../utils/dateHelpers';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { Construction } from 'lucide-react';

export const BudgetPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<FilterPreset>('month');
    const [currentDate, setCurrentDate] = useState(new Date());

    const { minDate, maxDate } = useMemo(() => {
        if (MOCK_TRANSACTIONS.length === 0) return { minDate: undefined, maxDate: undefined };
        const timestamps = MOCK_TRANSACTIONS.map(t => new Date(t.date + 'T12:00:00').getTime());
        return {
            minDate: new Date(Math.min(...timestamps)),
            maxDate: new Date(Math.max(...timestamps))
        };
    }, []);

    const handleFilterChange = (preset: FilterPreset) => {
        setActiveFilter(preset);
        setCurrentDate(new Date());
    };

    const renderDatepicker = () => {
        switch (activeFilter) {
            case 'week':
                return (
                    <WeekPicker
                        currentDate={currentDate}
                        onDateChange={(date) => setCurrentDate(date)}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                );
            case 'month':
                return (
                    <MonthPicker
                        currentDate={currentDate}
                        onDateChange={(date) => setCurrentDate(date)}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                );
            case 'year':
                return (
                    <YearPicker
                        currentDate={currentDate}
                        onDateChange={(date) => setCurrentDate(date)}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full">
                <PageHeader title="Orçamento">
                    {renderDatepicker()}
                    <DateRangeFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
                </PageHeader>

                <div className="flex-1 bg-[#121212] rounded-xl border border-white/5 flex items-center justify-center text-gray-500 shadow-xl p-8 mb-4">
                    <div className="flex flex-col items-center gap-4">
                        <Construction size={48} className="opacity-50" />
                        <p className="text-lg font-medium">Esta página está em construção</p>
                        <p className="text-sm opacity-60">Em breve novidades por aqui.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
