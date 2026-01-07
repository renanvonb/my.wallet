import React, { useState, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { TotalIncome } from '../components/dashboard/TotalIncome';
import { TotalExpense } from '../components/dashboard/TotalExpense';
import { TotalInvestment } from '../components/dashboard/TotalInvestment';
import { TotalBalance } from '../components/dashboard/TotalBalance';
import { MonthPicker } from '../components/ui/month-picker';
import { WeekPicker } from '../components/ui/week-picker';
import { YearPicker } from '../components/ui/year-picker';
import { DateRangeFilter } from '../components/dashboard/DateRangeFilter';
import { type FilterPreset, getDateRange } from '../utils/dateHelpers';
import { PageHeader } from '../components/layout/PageHeader';
import { Plus, Search, Filter } from 'lucide-react';
import { TransactionFormDrawer } from '../components/dashboard/TransactionFormDrawer';
import { useTransactions } from '../context/TransactionContext';

export const TransactionsPage: React.FC = () => {
    // const { user } = useAuth();
    const { transactions, addTransaction } = useTransactions();
    const [activeFilter, setActiveFilter] = useState<FilterPreset>('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'Todas' | 'Receitas' | 'Despesas' | 'Investimentos'>('Todas');
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
        if (!dateRange) return [];

        let filtered = transactions.filter(t => {
            const tDate = new Date(t.date + 'T12:00:00');
            const matchesDate = tDate >= dateRange.start && tDate <= dateRange.end;

            if (!matchesDate) return false;

            if (activeTab === 'Todas') return true;
            if (activeTab === 'Receitas') return t.type === 'Receita';
            if (activeTab === 'Despesas') return t.type === 'Despesa';
            if (activeTab === 'Investimentos') return t.type === 'Investimento';

            return true;
        });

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(t =>
                t.description.toLowerCase().includes(lowerTerm) ||
                t.destination.toLowerCase().includes(lowerTerm) ||
                (t.category && t.category.toLowerCase().includes(lowerTerm))
            );
        }

        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [dateRange, searchTerm, activeTab, transactions]);

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
                <PageHeader title="Transações">
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        <div className="relative w-full sm:w-auto hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar transações..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/5 rounded-lg pl-10 pr-4 h-10 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-full sm:w-64 transition-colors placeholder:text-gray-500"
                            />
                        </div>
                        {renderDatepicker()}
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                className={`h-10 w-10 flex items-center justify-center rounded-lg border transition-colors ${isFilterMenuOpen || activeTab !== 'Todas' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                                title="Filtrar por tipo"
                            >
                                <Filter size={18} />
                            </button>

                            {isFilterMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-[#121212] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20">
                                    {(['Todas', 'Receitas', 'Despesas', 'Investimentos'] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => {
                                                setActiveTab(tab);
                                                setIsFilterMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${activeTab === tab
                                                ? 'bg-emerald-500/10 text-emerald-500 font-medium'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <DateRangeFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="h-10 px-4 bg-gradient-to-r from-white to-gray-400 hover:opacity-90 text-black rounded-lg font-medium transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/5 whitespace-nowrap"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Nova</span>
                        </button>
                    </div>
                </PageHeader>

                <div className="md:hidden mb-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar transações..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/5 rounded-lg pl-10 pr-4 h-10 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-full transition-colors placeholder:text-gray-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 flex-shrink-0">
                    <TotalIncome transactions={filteredTransactions} />
                    <TotalExpense transactions={filteredTransactions} />
                    <TotalInvestment transactions={filteredTransactions} />
                    <TotalBalance transactions={filteredTransactions} />
                </div>

                <div className="flex-1 min-h-0 mb-4 bg-[#121212] rounded-xl border border-white/5 flex flex-col">


                    <div className="pt-5" />
                    <TransactionsTable transactions={filteredTransactions} />
                </div>
            </div>

            <TransactionFormDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSave={(data) => {
                    addTransaction(data);
                    // console.log('Nova transação:', data);
                }}
            />
        </DashboardLayout>
    );
};
