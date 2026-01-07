import React, { useState, useMemo } from 'react';

import { DashboardLayout } from '../components/layout/DashboardLayout';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { SummaryChart } from '../components/dashboard/SummaryChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { TotalIncome } from '../components/dashboard/TotalIncome';
import { TotalExpense } from '../components/dashboard/TotalExpense';
import { TotalInvestment } from '../components/dashboard/TotalInvestment';
import { TotalBalance } from '../components/dashboard/TotalBalance';

import { ClassificationChart } from '../components/dashboard/ClassificationChart';
import { MonthPicker } from '../components/ui/month-picker';
import { WeekPicker } from '../components/ui/week-picker';
import { YearPicker } from '../components/ui/year-picker';
import { DateRangeFilter } from '../components/dashboard/DateRangeFilter';
import { type FilterPreset, getDateRange } from '../utils/dateHelpers';
import { useTransactions } from '../context/TransactionContext';

import { PageHeader } from '../components/layout/PageHeader';

export const DashboardPage: React.FC = () => {
    const { transactions } = useTransactions();

    const [activeFilter, setActiveFilter] = useState<FilterPreset>('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const dateRange = getDateRange(activeFilter, currentDate);

    const { minDate, maxDate } = useMemo(() => {
        if (transactions.length === 0) return { minDate: undefined, maxDate: undefined };
        const timestamps = transactions.map(t => new Date(t.date + 'T12:00:00').getTime());
        return {
            minDate: new Date(Math.min(...timestamps)),
            maxDate: new Date(Math.max(...timestamps))
        };
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        if (!dateRange || !transactions.length) return [];
        return transactions.filter(t => {
            const tDate = new Date(t.date + 'T12:00:00');
            return tDate >= dateRange.start && tDate <= dateRange.end;
        });
    }, [dateRange, transactions]);

    const handleFilterChange = (preset: FilterPreset) => {
        setActiveFilter(preset);
        setCurrentDate(new Date()); // Reset to today when changing filters defaults
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
                <PageHeader
                    title={
                        <div className="flex items-center gap-4">
                            <span>Olá, Renan!</span>
                            {dateRange && (
                                <span className="text-xs font-normal text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                                    {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(dateRange.start)}
                                    {' - '}
                                    {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(dateRange.end)}
                                </span>
                            )}
                        </div>
                    }
                >
                    {renderDatepicker()}

                    <DateRangeFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
                </PageHeader>

                {/* Linha 1: Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 flex-shrink-0">
                    <TotalIncome transactions={filteredTransactions} />
                    <TotalExpense transactions={filteredTransactions} />
                    <TotalInvestment transactions={filteredTransactions} />
                    <TotalBalance transactions={filteredTransactions} />
                </div>

                {/* Linha 2: Categorias e Resumo */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 flex-shrink-0 min-h-[350px]">
                    <SummaryChart transactions={filteredTransactions} />
                    <RevenueChart dateRange={dateRange} transactions={filteredTransactions} />
                </div>

                {/* Linha 3: Transações e Classificação */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 flex-1 min-h-0">
                    <div className="lg:col-span-3 h-full overflow-hidden">
                        <RecentTransactions transactions={filteredTransactions} />
                    </div>
                    <div className="lg:col-span-1 h-full min-h-[300px]">
                        <ClassificationChart transactions={filteredTransactions} />
                    </div>
                </div>
            </div>

        </DashboardLayout >
    );
};
