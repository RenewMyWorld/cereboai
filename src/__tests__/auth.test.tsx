import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { supabase } from '@/lib/supabase/auth'
import { signUp, signIn, signOut } from '@/lib/supabase/auth'

// Utility function to generate a unique test email
const generateTestEmail = () => `test_user_${Date.now()}@example.com`

describe('Authentication Flow', () => {
  let testEmail: string
  let testPassword: string

  beforeAll(() => {
    // Generate unique credentials for each test run
    testEmail = generateTestEmail()
    testPassword = 'TestPassword123!'
  })

  afterAll(async () => {
    // Optional: Clean up test user if needed
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // You might want to implement a more robust user deletion method
        await supabase.auth.signOut()
      }
    } catch (error) {
      console.error('Cleanup error:', error)
    }
  })

  it('should successfully sign up a new user', async () => {
    const result = await signUp(testEmail, testPassword)
    
    expect(result?.user).toBeTruthy()
    expect(result?.user?.email).toBe(testEmail)
    
    // Verify user exists in Supabase auth
    const { data: { user } } = await supabase.auth.getUser()
    expect(user?.email).toBe(testEmail)
  })

  it('should prevent signup with invalid email', async () => {
    await expect(signUp('invalid-email', testPassword))
      .rejects.toThrow()
  })

  it('should prevent signup with weak password', async () => {
    await expect(signUp(testEmail, 'weak'))
      .rejects.toThrow()
  })

  it('should successfully sign in', async () => {
    // First, ensure user exists
    await signUp(testEmail, testPassword)
    
    const result = await signIn(testEmail, testPassword)
    
    expect(result?.user).toBeTruthy()
    expect(result?.user?.email).toBe(testEmail)
    
    // Verify session is active
    const { data: { session } } = await supabase.auth.getSession()
    expect(session).toBeTruthy()
  })

  it('should sign out successfully', async () => {
    // First, sign in
    await signIn(testEmail, testPassword)
    
    await signOut()
    
    // Verify no active session
    const { data: { session } } = await supabase.auth.getSession()
    expect(session).toBeNull()
  })
})

// Database Integration Tests
describe('Database Integration', () => {
  it('should have users table accessible', async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    expect(error).toBeNull()
    expect(data).toBeTruthy()
  })

  it('should have user_activity_log table accessible', async () => {
    const { data, error } = await supabase
      .from('user_activity_log')
      .select('*')
      .limit(1)
    
    expect(error).toBeNull()
    expect(data).toBeTruthy()
  })
})
