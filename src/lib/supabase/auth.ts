import { useState, useEffect } from 'react'
import { createClient, User, Session } from '@supabase/supabase-js'

// Initialize Supabase clients
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
)

// Enhanced user creation function
export async function adminCreateUser(email: string, password: string) {
  try {
    // Attempt to create user via Supabase admin method
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username: `user_${Date.now()}`,
        role: 'Standard Member'
      }
    })

    if (error) {
      console.error('User Creation Error:', error)
      throw error
    }

    // Create profile in public.profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: data.user.id,
        username: `user_${Date.now()}`,
        email: data.user.email,
        role: 'Standard Member'
      })

    if (profileError) {
      console.error('Profile Creation Error:', profileError)
      
      // Delete the auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(data.user.id)
      
      throw profileError
    }

    return { 
      user: data.user, 
      message: 'User created successfully' 
    }
  } catch (error) {
    console.error('Comprehensive User Creation Failed:', error)
    throw error
  }
}

// Existing useAuth hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<{ message: string } | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Get current session
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          setError({ message: error.message })
          setUser(null)
        } else {
          setSession(session)
          setUser(session?.user || null)
        }
      } catch (err: any) {
        setError({ message: err.message || 'An unexpected error occurred' })
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        try {
          setUser(session?.user || null)
          setSession(session)
          setError(null)
        } catch (err: any) {
          setError({ message: err.message || 'An authentication error occurred' })
        }
      }
    )

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Authentication methods
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: email.split('@')[0],
            role: 'Standard Member'
          }
        }
      })

      if (error) {
        setError({ message: error.message })
        return { data: null, error, user: null }
      }

      return { data, error: null, user: data.user }
    } catch (err: any) {
      const error = { message: err.message }
      setError(error)
      return { data: null, error, user: null }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setError({ message: error.message })
        return { data: null, error, user: null }
      }

      return { data, error: null, user: data.user }
    } catch (err: any) {
      const error = { message: err.message }
      setError(error)
      return { data: null, error, user: null }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        setError({ message: error.message })
        return { error }
      }

      setUser(null)
      setSession(null)
      return { error: null }
    } catch (err: any) {
      const error = { message: err.message }
      setError(error)
      return { error }
    }
  }

  return {
    user,
    loading,
    error,
    session,
    signUp,
    signIn,
    signOut,
    adminCreateUser  // Expose admin user creation method
  }
}

// Export Supabase clients for direct use if needed
export { supabase, supabaseAdmin }