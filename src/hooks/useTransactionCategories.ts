import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TransactionCategory = Database['public']['Tables']['transaction_categories']['Row'];

export const useTransactionCategories = () => {
    const [categories, setCategories] = useState<TransactionCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('transaction_categories')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });

                if (error) throw error;

                setCategories(data || []);
            } catch (err) {
                setError(err as Error);
                console.error('Error fetching transaction categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Helper function to get category ID by name
    const getCategoryIdByName = (name: string): string | undefined => {
        return categories.find(c => c.name === name)?.id;
    };

    // Helper function to get category name by ID
    const getCategoryNameById = (id: string): string | undefined => {
        return categories.find(c => c.id === id)?.name;
    };

    return {
        categories,
        loading,
        error,
        getCategoryIdByName,
        getCategoryNameById,
    };
};
