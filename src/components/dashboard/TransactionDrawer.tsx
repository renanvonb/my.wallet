import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CreditCard, Tag, CheckCircle, Clock, AlertCircle, LayoutList, Bookmark, Hourglass, Layers } from 'lucide-react';
import { formatDateDDMMYY } from '../../utils/dateHelpers';

export interface Transaction {
    id: number | string;
    destination: string;
    description: string;
    date: string;
    method: string;
    amount: number;
    status: string;
    color: string;
    initial: string;
    type?: 'Receita' | 'Despesa' | 'Investimento';
    category?: string;
    subcategory?: string;
    classification?: string;
    dueDate?: string;
    installments?: string;
}

interface TransactionDrawerProps {
    transaction: Transaction | null;
    onClose: () => void;
}

const DrawerContent: React.FC<{ transaction: Transaction; onClose: () => void }> = ({ transaction, onClose }) => {
    const StatusIcon = transaction.status === 'Concluído' ? CheckCircle :
        transaction.status === 'Processando' ? Clock : AlertCircle;

    const statusColor = transaction.status === 'Concluído' ? 'text-green-500' :
        transaction.status === 'Processando' ? 'text-blue-500' : 'text-yellow-500';

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-4 bottom-4 right-4 w-full max-w-md bg-[#050505] border border-white/10 shadow-2xl z-[70] flex flex-col rounded-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Detalhes da Transação</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Main Info */}
                    <div className="flex flex-col items-center justify-center pt-4">
                        <div className={`w-20 h-20 rounded-full ${transaction.color} flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4`}>
                            {transaction.initial}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{transaction.destination}</h3>
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Tag size={18} />
                            <span>Descrição</span>
                        </div>
                        <span className="text-white font-medium">{transaction.description}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <LayoutList size={18} />
                            <span>Categoria</span>
                        </div>
                        <span className="text-white font-medium">{transaction.category || '-'}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Bookmark size={18} />
                            <span>Classificação</span>
                        </div>
                        <span className="text-white font-medium">{transaction.classification || '-'}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <CreditCard size={18} />
                            <span>Método</span>
                        </div>
                        <span className="text-white font-medium">{transaction.method}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Hourglass size={18} />
                            <span>Vencimento</span>
                        </div>
                        <span className="text-white font-medium">{formatDateDDMMYY(transaction.dueDate)}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Calendar size={18} />
                            <span>Pagamento</span>
                        </div>
                        <span className="text-white font-medium">{formatDateDDMMYY(transaction.date)}</span>
                    </div>

                    {transaction.installments && (
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Layers size={18} />
                                <span>Parcelas</span>
                            </div>
                            <span className="text-white font-medium">{transaction.installments}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3 text-gray-400">
                            <StatusIcon size={18} className={statusColor} />
                            <span>Status</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2 py-1 rounded-full w-fit ${transaction.status === 'Concluído' ? 'bg-green-500/10' :
                            transaction.status === 'Agendado' ? 'bg-yellow-500/10' : 'bg-zinc-500/10'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'Concluído' ? 'bg-green-500' :
                                transaction.status === 'Agendado' ? 'bg-yellow-500' : 'bg-zinc-500'
                                }`} />
                            <span className={`text-xs font-medium ${transaction.status === 'Concluído' ? 'text-green-500' :
                                transaction.status === 'Agendado' ? 'text-yellow-500' : 'text-zinc-500'
                                }`}>
                                {transaction.status}
                            </span>
                        </div>
                    </div>

                    {/* Actions Placeholder */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/5">
                            Editar
                        </button>
                        <button className="py-3 px-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium transition-colors border border-red-500/10">
                            Excluir
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export const TransactionDrawer: React.FC<TransactionDrawerProps> = ({ transaction, onClose }) => {
    return createPortal(
        <AnimatePresence>
            {transaction && (
                <DrawerContent transaction={transaction} onClose={onClose} />
            )}
        </AnimatePresence>,
        document.body
    );
};
