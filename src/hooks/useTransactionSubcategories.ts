import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TransactionSubcategory = Database['public']['Tables']['transaction_subcategories']['Row'];

export const useTransactionSubcategories = (categoryId?: string) => {
    const [subcategories, setSubcategories] = useState<TransactionSubcategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                setLoading(true);
                let query = supabase
                    .from('transaction_subcategories')
                    .select(`
            *,
            transaction_categories (
              id,
              name
            )
          `)
                    .eq('is_active', true);

                // If categoryId is provided, filter by category
                if (categoryId) {
                    query = query.eq('category_id', categoryId);
                }

                const { data, error } = await query.order('name', { ascending: true });

                if (error) throw error;

                setSubcategories(data || []);
            } catch (err) {
                setError(err as Error);
                console.error('Error fetching transaction subcategories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [categoryId]);

    // Helper function to get subcategory ID by name and category
    const getSubcategoryIdByName = (name: string, categoryId?: string): string | undefined => {
        if (categoryId) {
            return subcategories.find(s => s.name === name && s.category_id === categoryId)?.id;
        }
        return subcategories.find(s => s.name === name)?.id;
    };

    // Helper function to get subcategory name by ID
    const getSubcategoryNameById = (id: string): string | undefined => {
        return subcategories.find(s => s.id === id)?.name;
    };

    // Get subcategories for a specific category
    const getSubcategoriesByCategory = (categoryId: string) => {
        return subcategories.filter(s => s.category_id === categoryId);
    };

    return {
        subcategories,
        loading,
        error,
        getSubcategoryIdByName,
        getSubcategoryNameById,
        getSubcategoriesByCategory,
    };
};
