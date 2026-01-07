import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type PaymentMethod = Database['public']['Tables']['payment_methods']['Row'];

export const usePaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('payment_methods')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });

                if (error) throw error;

                setPaymentMethods(data || []);
            } catch (err) {
                setError(err as Error);
                console.error('Error fetching payment methods:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    // Helper function to get payment method ID by name
    const getPaymentMethodIdByName = (name: string): string | undefined => {
        return paymentMethods.find(pm => pm.name === name)?.id;
    };

    // Helper function to get payment method name by ID
    const getPaymentMethodNameById = (id: string): string | undefined => {
        return paymentMethods.find(pm => pm.id === id)?.name;
    };

    return {
        paymentMethods,
        loading,
        error,
        getPaymentMethodIdByName,
        getPaymentMethodNameById,
    };
};
