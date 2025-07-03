import { useState, useCallback } from 'react'
import { lookupUser, fetchOrdersForUser } from '../lib/supabaseApi'

export function useSupabaseOrders() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrders = useCallback(async (email) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // First check if user exists
      const user = await lookupUser(email)
      
      if (!user) {
        console.log('⚠️ No user found for email:', email)
        return { userFound: false, orderCount: 0 }
      }

      console.log('✅ User found:', user)
      
      // Then fetch their orders
      const orders = await fetchOrdersForUser(email)
      
      return { 
        userFound: true,
        user,
        orders,
        orderCount: orders.length
      }
      
    } catch (err) {
      console.error('❌ Order fetch failed:', err)
      setError(err.message)
      return { userFound: false, orderCount: 0 }
      
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { fetchOrders, isLoading, error }
}