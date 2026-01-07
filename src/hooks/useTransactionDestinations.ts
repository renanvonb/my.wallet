import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type TransactionDestination = Database['public']['Tables']['transaction_destinations']['Row'];

export const useTransactionDestinations = () => {
    const [destinations, setDestinations] = useState<TransactionDestination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('transaction_destinations')
                    .select(`
            *,
            transaction_classifications (
              id,
              name
            )
          `)
                    .eq('is_active', true)
                    .order('name', { ascending: true });

                if (error) throw error;

                setDestinations(data || []);
            } catch (err) {
                setError(err as Error);
                console.error('Error fetching transaction destinations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    // Helper function to get destination ID by name
    const getDestinationIdByName = (name: string): string | undefined => {
        return destinations.find(d => d.name === name)?.id;
    };

    // Helper function to get destination name by ID
    const getDestinationNameById = (id: string): string | undefined => {
        return destinations.find(d => d.id === id)?.name;
    };

    // Helper function to get destination classification by name
    const getDestinationClassificationByName = (name: string): string | undefined => {
        const destination = destinations.find(d => d.name === name);
        return destination?.classification_id || undefined;
    };

    return {
        destinations,
        loading,
        error,
        getDestinationIdByName,
        getDestinationNameById,
        getDestinationClassificationByName,
    };
};
