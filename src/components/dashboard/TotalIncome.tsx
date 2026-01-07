import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../data/mockData';

import type { Transaction } from './TransactionDrawer';

interface TotalIncomeProps {
    dateRange?: { start: Date; end: Date };
    transactions?: Transaction[];
}

export const TotalIncome: React.FC<TotalIncomeProps> = ({ dateRange, transactions }) => {
    const total = useMemo(() => {
        const sourceData = transactions || MOCK_TRANSACTIONS;

        return sourceData
            .filter(t => {
                // If transactions are provided, they are typically already date-filtered, but let's double check if dateRange is meant to be applied too. 
                // However, in TransactionsPage, filteredTransactions IS already date filtered.
                // In DashboardPage, only dateRange is passed.
                // So if (transactions) use them directly (filter only by type).
                // If (!transactions && dateRange) filter by dateRange.

                if (transactions) {
                    return t.type === 'Receita';
                }

                if (dateRange) {
                    const tDate = new Date(t.date + 'T12:00:00');
                    return t.type === 'Receita' && tDate >= dateRange.start && tDate <= dateRange.end;
                }

                return t.type === 'Receita';
            })
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [dateRange, transactions]);



    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 flex flex-col relative group overflow-hidden">
            <div className="flex items-start justify-between mb-6">
                <h3 className="text-base font-medium text-gray-400">Receitas</h3>
                <div className="p-2 bg-green-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight size={20} className="text-green-500" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-[28px] font-bold text-white">
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>

            </div>
            {/* Hover Effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
};
