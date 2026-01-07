import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Transaction } from '../components/dashboard/TransactionDrawer';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
    updateTransaction: (id: number | string, transaction: Partial<Transaction>) => Promise<void>;
    deleteTransaction: (id: number | string) => Promise<void>;
    loading: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch transactions from Supabase
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('transactions')
                .select(`
                    *,
                    transaction_types (
                        id,
                        name
                    ),
                    transaction_categories (
                        id,
                        name
                    ),
                    transaction_classifications (
                        id,
                        name
                    ),
                    payment_methods (
                        id,
                        name
                    ),
                    transaction_destinations (
                        id,
                        name,
                        classification_id
                    )
                `)
                .order('date', { ascending: false });

            if (error) throw error;

            if (data) {
                // Convert Supabase data to Transaction format
                const formattedTransactions: Transaction[] = data.map((t: any) => ({
                    id: t.id,
                    destination: t.transaction_destinations?.name || undefined,
                    description: t.description,
                    date: t.date,
                    method: t.payment_methods?.name || undefined,
                    amount: Number(t.amount),
                    status: t.status,
                    color: t.color,
                    initial: t.initial,
                    type: t.transaction_types?.name as 'Receita' | 'Despesa' | 'Investimento' | undefined,
                    category: t.transaction_categories?.name || undefined,
                    subcategory: t.subcategory || undefined,
                    classification: t.transaction_classifications?.name || undefined,
                    dueDate: t.due_date || undefined,
                    installments: t.installments || undefined,
                }));

                setTransactions(formattedTransactions);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            // Fallback to localStorage if Supabase fails
            const stored = localStorage.getItem('antigravity_transactions');
            if (stored) {
                setTransactions(JSON.parse(stored));
            } else {
                setTransactions(MOCK_TRANSACTIONS);
                localStorage.setItem('antigravity_transactions', JSON.stringify(MOCK_TRANSACTIONS));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
        try {
            // Get transaction type ID if type is provided
            let transactionTypeId: string | null = null;
            if (transaction.type) {
                const { data: typeData } = await supabase
                    .from('transaction_types')
                    .select('id')
                    .eq('name', transaction.type)
                    .single();

                transactionTypeId = typeData?.id || null;
            }

            // Get category ID if category is provided
            let categoryId: string | null = null;
            if (transaction.category) {
                const { data: categoryData } = await supabase
                    .from('transaction_categories')
                    .select('id')
                    .eq('name', transaction.category)
                    .single();

                categoryId = categoryData?.id || null;
            }

            // Get classification ID if classification is provided
            let classificationId: string | null = null;
            if (transaction.classification) {
                const { data: classificationData } = await supabase
                    .from('transaction_classifications')
                    .select('id')
                    .eq('name', transaction.classification)
                    .single();

                classificationId = classificationData?.id || null;
            }

            // Get payment method ID if method is provided
            let paymentMethodId: string | null = null;
            if (transaction.method) {
                const { data: paymentMethodData } = await supabase
                    .from('payment_methods')
                    .select('id')
                    .eq('name', transaction.method)
                    .single();

                paymentMethodId = paymentMethodData?.id || null;
            }

            // Get destination ID if destination is provided
            let destinationId: string | null = null;
            if (transaction.destination) {
                const { data: destinationData } = await supabase
                    .from('transaction_destinations')
                    .select('id')
                    .eq('name', transaction.destination)
                    .single();

                destinationId = destinationData?.id || null;
            }

            const { data, error } = await supabase
                .from('transactions')
                .insert([{
                    destination_id: destinationId,
                    description: transaction.description,
                    date: transaction.date,
                    payment_method_id: paymentMethodId,
                    amount: transaction.amount,
                    status: transaction.status,
                    color: transaction.color,
                    initial: transaction.initial,
                    transaction_type_id: transactionTypeId,
                    category_id: categoryId,
                    subcategory: transaction.subcategory,
                    classification_id: classificationId,
                    due_date: transaction.dueDate,
                    installments: transaction.installments,
                    user_email: user?.email,
                }])
                .select(`
                    *,
                    transaction_types (
                        id,
                        name
                    ),
                    transaction_categories (
                        id,
                        name
                    ),
                    transaction_classifications (
                        id,
                        name
                    ),
                    payment_methods (
                        id,
                        name
                    ),
                    transaction_destinations (
                        id,
                        name,
                        classification_id
                    )
                `)
                .single();

            if (error) throw error;

            if (data) {
                const newTransaction: Transaction = {
                    id: data.id,
                    destination: (data as any).transaction_destinations?.name || undefined,
                    description: data.description,
                    date: data.date,
                    method: (data as any).payment_methods?.name || undefined,
                    amount: Number(data.amount),
                    status: data.status,
                    color: data.color,
                    initial: data.initial,
                    type: (data as any).transaction_types?.name as 'Receita' | 'Despesa' | 'Investimento' | undefined,
                    category: (data as any).transaction_categories?.name || undefined,
                    subcategory: data.subcategory || undefined,
                    classification: (data as any).transaction_classifications?.name || undefined,
                    dueDate: data.due_date || undefined,
                    installments: data.installments || undefined,
                };
                setTransactions([newTransaction, ...transactions]);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            // Fallback to localStorage
            const newTransaction = { ...transaction, id: Date.now() } as Transaction;
            const newTransactions = [newTransaction, ...transactions];
            setTransactions(newTransactions);
            localStorage.setItem('antigravity_transactions', JSON.stringify(newTransactions));
        }
    };

    const updateTransaction = async (id: number | string, updated: Partial<Transaction>) => {
        try {
            const updateData: any = {};

            // Handle destination conversion to destination_id
            if (updated.destination !== undefined) {
                const { data: destinationData } = await supabase
                    .from('transaction_destinations')
                    .select('id')
                    .eq('name', updated.destination)
                    .single();

                updateData.destination_id = destinationData?.id || null;
            }

            if (updated.description !== undefined) updateData.description = updated.description;
            if (updated.date !== undefined) updateData.date = updated.date;

            // Handle payment method conversion to payment_method_id
            if (updated.method !== undefined) {
                const { data: paymentMethodData } = await supabase
                    .from('payment_methods')
                    .select('id')
                    .eq('name', updated.method)
                    .single();

                updateData.payment_method_id = paymentMethodData?.id || null;
            }

            if (updated.amount !== undefined) updateData.amount = updated.amount;
            if (updated.status !== undefined) updateData.status = updated.status;
            if (updated.color !== undefined) updateData.color = updated.color;
            if (updated.initial !== undefined) updateData.initial = updated.initial;

            // Handle type conversion to transaction_type_id
            if (updated.type !== undefined) {
                const { data: typeData } = await supabase
                    .from('transaction_types')
                    .select('id')
                    .eq('name', updated.type)
                    .single();

                updateData.transaction_type_id = typeData?.id || null;
            }

            // Handle category conversion to category_id
            if (updated.category !== undefined) {
                const { data: categoryData } = await supabase
                    .from('transaction_categories')
                    .select('id')
                    .eq('name', updated.category)
                    .single();

                updateData.category_id = categoryData?.id || null;
            }

            if (updated.subcategory !== undefined) updateData.subcategory = updated.subcategory;

            // Handle classification conversion to classification_id
            if (updated.classification !== undefined) {
                const { data: classificationData } = await supabase
                    .from('transaction_classifications')
                    .select('id')
                    .eq('name', updated.classification)
                    .single();

                updateData.classification_id = classificationData?.id || null;
            }

            if (updated.dueDate !== undefined) updateData.due_date = updated.dueDate;
            if (updated.installments !== undefined) updateData.installments = updated.installments;

            const { error } = await supabase
                .from('transactions')
                .update(updateData)
                .eq('id', String(id));

            if (error) throw error;

            const newData = transactions.map(t =>
                (typeof id === 'string' ? t.id === id : (typeof t.id === 'number' && t.id === id))
                    ? { ...t, ...updated }
                    : t
            );
            setTransactions(newData);
        } catch (error) {
            console.error('Error updating transaction:', error);
            // Fallback to localStorage
            const newData = transactions.map(t =>
                (typeof id === 'string' ? t.id === id : (typeof t.id === 'number' && t.id === id))
                    ? { ...t, ...updated }
                    : t
            );
            setTransactions(newData);
            localStorage.setItem('antigravity_transactions', JSON.stringify(newData));
        }
    };

    const deleteTransaction = async (id: number | string) => {
        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', String(id));

            if (error) throw error;

            const newData = transactions.filter(t =>
                typeof id === 'string' ? t.id !== id : (typeof t.id === 'number' && t.id !== id)
            );
            setTransactions(newData);
        } catch (error) {
            console.error('Error deleting transaction:', error);
            // Fallback to localStorage
            const newData = transactions.filter(t =>
                typeof id === 'string' ? t.id !== id : (typeof t.id === 'number' && t.id !== id)
            );
            setTransactions(newData);
            localStorage.setItem('antigravity_transactions', JSON.stringify(newData));
        }
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction, loading }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
};
