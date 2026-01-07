import React, { useMemo } from 'react';
import { Wallet } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../data/mockData';

import type { Transaction } from './TransactionDrawer';

interface TotalBalanceProps {
    dateRange?: { start: Date; end: Date };
    transactions?: Transaction[];
}

export const TotalBalance: React.FC<TotalBalanceProps> = ({ dateRange, transactions }) => {
    const { total, percent } = useMemo(() => {
        const sourceData = transactions || (dateRange ? MOCK_TRANSACTIONS.filter(t => {
            const tDate = new Date(t.date + 'T12:00:00');
            return tDate >= dateRange.start && tDate <= dateRange.end;
        }) : []);

        const income = sourceData
            .filter(t => t.type === 'Receita')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const expense = sourceData
            .filter(t => t.type === 'Despesa')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const balance = income - expense;
        const pct = income > 0 ? (balance / income) * 100 : 0;

        return {
            total: balance,
            percent: pct
        };
    }, [dateRange, transactions]);



    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 flex flex-col relative group overflow-hidden">
            <div className="flex items-start justify-between mb-6">
                <h3 className="text-base font-medium text-gray-400">Saldo</h3>
                <div className="p-2 bg-purple-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                    <Wallet size={20} className="text-purple-500" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-[28px] font-bold text-white">
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-medium">
                    {percent.toFixed(0)}%
                </span>
            </div>
            {/* Hover Effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
};
