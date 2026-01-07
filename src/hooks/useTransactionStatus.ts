import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TransactionStatus = Database['public']['Tables']['transaction_status']['Row'];

export const useTransactionStatus = () => {
    const [statuses, setStatuses] = useState<TransactionStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('transaction_status')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });

                if (error) throw error;

                setStatuses(data || []);
            } catch (err) {
                setError(err as Error);
                console.error('Error fetching transaction statuses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatuses();
    }, []);

    // Helper function to get status ID by name
    const getStatusIdByName = (name: string): string | undefined => {
        return statuses.find(s => s.name === name)?.id;
    };

    // Helper function to get status name by ID
    const getStatusNameById = (id: string): string | undefined => {
        return statuses.find(s => s.id === id)?.name;
    };

    return {
        statuses,
        loading,
        error,
        getStatusIdByName,
        getStatusNameById,
    };
};
