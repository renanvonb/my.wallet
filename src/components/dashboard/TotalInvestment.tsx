import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../data/mockData';

import type { Transaction } from './TransactionDrawer';

interface TotalInvestmentProps {
    dateRange?: { start: Date; end: Date };
    transactions?: Transaction[];
}

export const TotalInvestment: React.FC<TotalInvestmentProps> = ({ dateRange, transactions }) => {
    const { total, percent } = useMemo(() => {
        const sourceData = transactions || (dateRange ? MOCK_TRANSACTIONS.filter(t => {
            const tDate = new Date(t.date + 'T12:00:00');
            return tDate >= dateRange.start && tDate <= dateRange.end;
        }) : []);

        const income = sourceData
            .filter(t => t.type === 'Receita')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const investment = sourceData
            .filter(t => t.type === 'Investimento')
            .reduce((acc, curr) => acc + curr.amount, 0);

        return {
            total: investment,
            percent: income > 0 ? (investment / income) * 100 : 0
        };
    }, [dateRange, transactions]);



    return (
        <div className="bg-[#121212] p-6 rounded-xl border border-white/5 flex flex-col relative group overflow-hidden">
            <div className="flex items-start justify-between mb-6">
                <h3 className="text-base font-medium text-gray-400">Investimentos</h3>
                <div className="p-2 bg-blue-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                    <TrendingUp size={20} className="text-blue-500" />
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
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
};
