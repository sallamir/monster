import { createClient } from '@supabase/supabase-js'

// Enhanced debug logging
const DEBUG = true
const log = (...args) => DEBUG && console.log('🔷 [Supabase]:', ...args)
const error = (...args) => console.error('❌ [Supabase]:', ...args)

// Environment variables with validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize with enhanced options
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
})

// Test connection with enhanced error handling
const testConnection = async () => {
  try {
    log('Testing connection...')
    const { data, error: testError } = await supabase
      .from('users_so2024')
      .select('count', { count: 'exact', head: true })
    
    if (testError) throw testError
    log('Connection successful! ✅')
    return true
  } catch (err) {
    error('Connection failed:', err.message)
    return false
  }
}

// Execute connection test
testConnection()

export default supabase