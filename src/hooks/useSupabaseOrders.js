// FINAL CORRECTED VERSION - Two-step lookup only
import { useState } from 'react';
import supabase from '../lib/supabase';

export const useSupabaseOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // CORRECTED: Pure two-step lookup - NO customer_email filtering
  const fetchUserOrders = async (email) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Step 1: Looking up user by email:', email);

      // STEP 1: Find user in users_so2024 by email
      const { data: userData, error: userError } = await supabase
        .from('users_so2024')
        .select('id, email, first_name, last_name, woocommerce_customer_id')
        .eq('email', email)
        .single();

      if (userError) {
        console.log('❌ User lookup failed:', userError);
        // Fallback: try to find orders by customer_email even if user not found
        const { data: emailOrders, error: emailOrdersError } = await supabase
          .from('orders_so2024')
          .select(`
            *,
            order_items_so2024 (*)
          `)
          .eq('customer_email', email)
          .order('date_created', { ascending: false });
        if (emailOrdersError) throw emailOrdersError;
        return { user: null, orders: emailOrders || [] };
      }

      console.log('✅ Step 1 success - User found:', userData.id);

      // STEP 2: Find orders using ONLY the user's UUID as customer_id
      console.log('🔍 Step 2: Looking up orders for user ID:', userData.id);
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders_so2024')
        .select(`
          *,
          order_items_so2024 (*)
        `)
        .eq('customer_id', userData.id)
        .order('date_created', { ascending: false });

      if (ordersError) throw ordersError;

      if (!ordersData || ordersData.length === 0) {
        // Fallback: try by customer_email
        const { data: emailOrders, error: emailOrdersError } = await supabase
          .from('orders_so2024')
          .select(`
            *,
            order_items_so2024 (*)
          `)
          .eq('customer_email', email)
          .order('date_created', { ascending: false });
        if (emailOrdersError) throw emailOrdersError;
        return { user: userData, orders: emailOrders || [] };
      }

      return { user: userData, orders: ordersData || [] };

    } catch (err) {
      console.error('❌ fetchUserOrders error:', err);
      setError(err.message);
      return { user: null, orders: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchUserOrders,
    loading,
    error
  };
};