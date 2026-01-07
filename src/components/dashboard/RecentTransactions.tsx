import React, { useState, useMemo } from 'react';
import { TransactionsTable } from './TransactionsTable';
import { type Transaction } from './TransactionDrawer';

interface RecentTransactionsProps {
    transactions: Transaction[];
}

type FilterType = 'all' | 'Receita' | 'Despesa' | 'Investimento';

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
    const [filterType, setFilterType] = useState<FilterType>('all');

    // Filter and sort transactions based on filterType (Date is already filtered by parent)
    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(t => {
                const matchesType = filterType === 'all' || t.type === filterType;
                return matchesType;
            })
            // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Assuming parent sorts? Or sort here.
            // Explicit sort is safer.
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, filterType]);

    // Slice for compact view
    const visibleTransactions = filteredTransactions.slice(0, 5);

    return (
        <div className="bg-[#121212] flex flex-col h-full rounded-xl border border-white/5 group overflow-hidden">
            <div className="flex items-center justify-between p-6 mb-4">
                <h3 className="text-base font-medium text-gray-400">Últimas transações</h3>

                <div className="flex bg-[#0a0a0a] rounded-lg p-1 border border-white/5">
                    {(['Todas', 'Receitas', 'Despesas', 'Investimentos'] as const).map((label) => {
                        const typeMap: Record<string, FilterType> = {
                            'Todas': 'all',
                            'Receitas': 'Receita',
                            'Despesas': 'Despesa',
                            'Investimentos': 'Investimento'
                        };
                        const type = typeMap[label];
                        const isActive = filterType === type;

                        return (
                            <button
                                key={label}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1 text-xs rounded-md transition-all font-medium ${isActive
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <TransactionsTable transactions={visibleTransactions} compact={true} />
        </div>
    );
};
