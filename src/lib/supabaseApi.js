const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Prefer': 'return=representation'
}

export const lookupUser = async (email) => {
  try {
    console.log('🔍 Looking up user with email:', email)
    
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/users_so2024?email=eq.${encodeURIComponent(email.toLowerCase())}`,
      { 
        method: 'GET',
        headers 
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('📊 User lookup response:', data)
    
    return data[0] || null
  } catch (error) {
    console.error('❌ User lookup failed:', error)
    return null
  }
}

export const fetchOrdersForUser = async (email) => {
  try {
    console.log('🔍 Fetching orders for email:', email)
    
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders_so2024?customer_email=eq.${encodeURIComponent(email.toLowerCase())}&order=date_created.desc`,
      { 
        method: 'GET',
        headers 
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('📊 Orders found:', data)
    
    return data || []
  } catch (error) {
    console.error('❌ Orders fetch failed:', error)
    return []
  }
}