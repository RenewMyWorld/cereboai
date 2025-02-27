import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signUp(email: string, password: string) {
  // First, sign up with Supabase Auth
  const { data, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        signup_source: 'web_app',
        signup_timestamp: new Date().toISOString()
      }
    }
  })

  if (authError) {
    console.error('Authentication Signup Error:', authError)
    throw authError
  }

  // If user is created, try to insert additional user data
  if (data.user) {
    try {
      // Generate a username from email
      const username = email.split('@')[0].toLowerCase()
      
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          username: username,
          membership_tier: 'Standard Member', // Default tier
          created_at: new Date().toISOString(),
          storage_limit: 10 // Default storage limit
        })

      if (insertError) {
        console.error('Database Insertion Error:', insertError)
        
        // If user already exists, throw a specific error
        if (insertError.code === '23505') {
          // Unique constraint violation
          const errorMessage = insertError.message.includes('username')
            ? 'Username is already taken'
            : 'An account with this email already exists'
          
          // Attempt to delete the auth user
          await supabase.auth.admin.deleteUser(data.user.id)
          
          throw new Error(errorMessage)
        }
        
        throw insertError
      }
    } catch (dbError) {
      console.error('User Creation Error:', dbError)
      throw dbError
    }
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    console.error('Signin error:', error.message)
    throw error
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Signout error:', error.message)
    throw error
  }
}

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .single()

  if (error) {
    // If no user found, username is available
    return !error
  }

  // If data exists, username is taken
  return !data
}
