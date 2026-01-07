import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TransactionClassification = Database['public']['Tables']['transaction_classifications']['Row'];

export const useTransactionClassifications = () => {
    const [classifications, setClassifications] = useState<TransactionClassification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchClassifications = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('transaction_classifications')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });

                if (error) throw error;

                setClassifications(data || []);
            } catch (err) {
                setError(err as Error);
                console.error('Error fetching transaction classifications:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClassifications();
    }, []);

    // Helper function to get classification ID by name
    const getClassificationIdByName = (name: string): string | undefined => {
        return classifications.find(c => c.name === name)?.id;
    };

    // Helper function to get classification name by ID
    const getClassificationNameById = (id: string): string | undefined => {
        return classifications.find(c => c.id === id)?.name;
    };

    return {
        classifications,
        loading,
        error,
        getClassificationIdByName,
        getClassificationNameById,
    };
};
