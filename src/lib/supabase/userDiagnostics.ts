import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'  // Adding Zod for robust validation

// Ensure you have the service role key in your .env file
const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
)

// Enhanced password complexity validation using Zod
const passwordSchema = z.string()
  .min(12, { message: "Password must be at least 12 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must contain at least one special character" })

export interface UserCreationResult {
  success: boolean
  user?: any
  profile?: any
  error?: {
    code?: string
    message: string
    details?: any
  }
}

export async function createUserDiagnostic(): Promise<UserCreationResult> {
  const testEmail = `test_${Date.now()}@example.com`
  const testPassword = 'StrongPassword123!@'
  
  try {
    // Validate password complexity
    passwordSchema.parse(testPassword)

    // Create user with enhanced security settings
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: {
        username: `testuser_${Date.now()}`,
        role: 'Standard Member',
        signup_method: 'admin_diagnostic'
      },
      app_metadata: {
        security_level: 'high',
        requires_password_reset: true
      }
    })

    if (error) {
      console.error('Admin User Creation Error:', {
        code: error.code,
        message: error.message,
        status: error.status
      })
      return { 
        success: false, 
        error: {
          code: error.code,
          message: error.message
        }
      }
    }

    // Verify profile creation with more robust error handling
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: data.user?.id,
        username: `testuser_${Date.now()}`,
        role: 'Standard Member'
      })
      .select()
      .single()

    if (profileError) {
      console.error('Profile Creation/Verification Error:', {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details
      })
      return { 
        success: false, 
        error: {
          code: profileError.code,
          message: profileError.message,
          details: profileError.details
        },
        user: data.user 
      }
    }

    console.log('User and Profile Created Successfully:', {
      userId: data.user?.id,
      email: data.user?.email
    })
    return { 
      success: true, 
      user: data.user, 
      profile: profileData 
    }
  } catch (err: any) {
    console.error('Unexpected Error:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    })
    return { 
      success: false, 
      error: {
        message: err.message || 'Unknown error occurred'
      }
    }
  }
}

// Debug export for manual testing
export async function debugUserCreation(): Promise<UserCreationResult> {
  console.log('🔍 Debugging User Creation Process...')
  const result = await createUserDiagnostic()
  
  if (result.success) {
    console.log('✅ User Creation Successful', {
      userId: result.user?.id,
      email: result.user?.email
    })
  } else {
    console.error('❌ User Creation Failed', result.error)
  }
  
  return result
}

// Comprehensive user signup function
export async function signupUser(
  email: string, 
  password: string, 
  username: string
): Promise<UserCreationResult> {
  try {
    // Validate inputs
    passwordSchema.parse(password)

    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role: 'Standard Member'
        }
      }
    })

    if (error) {
      console.error('Signup Error:', error)
      return { 
        success: false, 
        error: { 
          message: error.message 
        } 
      }
    }

    return { 
      success: true, 
      user: data.user 
    }
  } catch (err: any) {
    console.error('Signup Validation Error:', err)
    return { 
      success: false, 
      error: { 
        message: err.message || 'Signup failed' 
      } 
    }
  }
}