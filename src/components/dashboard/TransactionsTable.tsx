import React, { useState } from 'react';
import { TransactionDrawer } from './TransactionDrawer';
import { type Transaction } from './TransactionDrawer';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { formatDateDDMMYY } from '../../utils/dateHelpers';

interface TransactionsTableProps {
    transactions: Transaction[];
    compact?: boolean;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, compact = false }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const getTypeIcon = (type?: string) => {
        switch (type) {
            case 'Receita': return (
                <div className="p-2 bg-green-500/10 rounded-full">
                    <ArrowUpRight size={18} className="text-green-500" />
                </div>
            );
            case 'Despesa': return (
                <div className="p-2 bg-red-500/10 rounded-full">
                    <ArrowDownRight size={18} className="text-red-500" />
                </div>
            );
            case 'Investimento': return (
                <div className="p-2 bg-blue-500/10 rounded-full">
                    <TrendingUp size={18} className="text-blue-500" />
                </div>
            );
            default: return <div className="w-[18px]" />;
        }
    };

    return (
        <div className="flex-1 overflow-auto min-h-0 px-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600/50 [&::-webkit-scrollbar-thumb]:rounded-full">
            <table className={`w-full text-left text-sm ${compact ? 'min-w-[1000px]' : 'min-w-[1400px]'}`}>
                <thead className="sticky top-0 bg-[#121212] z-10">
                    <tr className="text-gray-400 border-b border-white/5">
                        {compact ? (
                            <>
                                <th className="pb-4 font-medium pl-2">Descrição</th>
                                <th className="pb-4 font-medium">Destino</th>
                                <th className="pb-4 font-medium">Categoria</th>
                                <th className="pb-4 font-medium">Pagamento</th>
                                <th className="pb-4 font-medium">Valor</th>
                                <th className="pb-4 font-medium pr-6 w-[120px]">Status</th>
                            </>
                        ) : (
                            <>
                                <th className="pb-4 font-medium pl-2">Descrição</th>
                                <th className="pb-4 font-medium">Destino</th>
                                <th className="pb-4 font-medium">Categoria</th>
                                <th className="pb-4 font-medium">Classificação</th>
                                <th className="pb-4 font-medium">Método</th>
                                <th className="pb-4 font-medium">Vencimento</th>
                                <th className="pb-4 font-medium">Pagamento</th>
                                <th className="pb-4 font-medium">Parcela</th>
                                <th className="pb-4 font-medium">Valor</th>
                                <th className="pb-4 font-medium pr-6 w-[120px]">Status</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {transactions.map((t) => (
                        <tr
                            key={t.id}
                            onClick={() => setSelectedTransaction(t)}
                            className="group/row hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            {compact ? (
                                <>
                                    <td className="py-4 pl-2">
                                        <div className="flex items-center gap-3">
                                            {getTypeIcon(t.type)}
                                            <span className="text-white font-medium group-hover/row:text-white transition-colors max-w-[200px] truncate" title={t.description}>
                                                {t.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400">
                                            {t.destination}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        {t.category ? (
                                            <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400">
                                                {t.category}
                                            </span>
                                        ) : <span className="text-gray-400">-</span>}
                                    </td>
                                    <td className="py-4 text-gray-400 group-hover/row:text-white transition-colors">
                                        {formatDateDDMMYY(t.date)}
                                    </td>
                                    <td className={`py-4 font-medium transition-colors ${t.type === 'Receita' ? 'text-green-500' :
                                        t.type === 'Investimento' ? 'text-blue-500' :
                                            'text-red-500'
                                        }`}>
                                        R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-4 pr-6 w-[120px]">
                                        <div className={`flex items-center gap-2 px-2 py-1 rounded-full w-fit ${t.status === 'Concluído' ? 'bg-green-500/10' :
                                            t.status === 'Agendado' ? 'bg-yellow-500/10' : 'bg-zinc-500/10'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'Concluído' ? 'bg-green-500' :
                                                t.status === 'Agendado' ? 'bg-yellow-500' : 'bg-zinc-500'
                                                }`} />
                                            <span className={`font-medium ${t.status === 'Concluído' ? 'text-green-500' :
                                                t.status === 'Agendado' ? 'text-yellow-500' : 'text-zinc-500'
                                                }`}>
                                                {t.status}
                                            </span>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="py-4 pl-2">
                                        <div className="flex items-center gap-3">
                                            {getTypeIcon(t.type)}
                                            <span className="text-white font-medium group-hover/row:text-white transition-colors max-w-[200px] truncate" title={t.description}>
                                                {t.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400">
                                            {t.destination}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        {t.category ? (
                                            <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400">
                                                {t.category}
                                            </span>
                                        ) : <span className="text-gray-400">-</span>}
                                    </td>
                                    <td className="py-4">
                                        {t.classification ? (
                                            <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400">
                                                {t.classification}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td className="py-4">
                                        <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400">
                                            {t.method}
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-400 group-hover/row:text-white transition-colors">
                                        {formatDateDDMMYY(t.dueDate)}
                                    </td>
                                    <td className="py-4 text-gray-400 group-hover/row:text-white transition-colors">
                                        {formatDateDDMMYY(t.date)}
                                    </td>
                                    <td className="py-4 text-gray-400 group-hover/row:text-white transition-colors">
                                        {t.installments || '-'}
                                    </td>
                                    <td className={`py-4 font-medium transition-colors ${t.type === 'Receita' ? 'text-green-500' :
                                        t.type === 'Investimento' ? 'text-blue-500' :
                                            'text-red-500'
                                        }`}>
                                        R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-4 pr-6 w-[120px]">
                                        <div className={`flex items-center gap-2 px-2 py-1 rounded-full w-fit ${t.status === 'Concluído' ? 'bg-green-500/10' :
                                            t.status === 'Agendado' ? 'bg-yellow-500/10' : 'bg-zinc-500/10'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'Concluído' ? 'bg-green-500' :
                                                t.status === 'Agendado' ? 'bg-yellow-500' : 'bg-zinc-500'
                                                }`} />
                                            <span className={`font-medium ${t.status === 'Concluído' ? 'text-green-500' :
                                                t.status === 'Agendado' ? 'text-yellow-500' : 'text-zinc-500'
                                                }`}>
                                                {t.status}
                                            </span>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <TransactionDrawer
                transaction={selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
            />
        </div>
    );
};
