import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TransactionType = Database['public']['Tables']['transaction_types']['Row'];

export const useTransactionTypes = () => {
    const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTransactionTypes = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('transaction_types')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });

                if (error) throw error;

                setTransactionTypes(data || []);
            } catch (err) {
                setError(err as Error);
                console.error('Error fetching transaction types:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionTypes();
    }, []);

    // Helper function to get type ID by name
    const getTypeIdByName = (name: string): string | undefined => {
        return transactionTypes.find(t => t.name === name)?.id;
    };

    // Helper function to get type name by ID
    const getTypeNameById = (id: string): string | undefined => {
        return transactionTypes.find(t => t.id === id)?.name;
    };

    return {
        transactionTypes,
        loading,
        error,
        getTypeIdByName,
        getTypeNameById,
    };
};
