import { createClient } from '@supabase/supabase-js'

// Create clients for different authentication methods
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
)

// Diagnostic function to test Supabase connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Supabase Session Error:', error)
      return { 
        success: false, 
        error: 'Session retrieval failed',
        details: error 
      }
    }

    // Test database connection
    const { data: testData, error: dbError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (dbError) {
      console.error('Database Query Error:', dbError)
      return { 
        success: false, 
        error: 'Database query failed',
        details: dbError 
      }
    }

    return { 
      success: true, 
      message: 'Supabase connection successful',
      sessionData: data,
      testData 
    }
  } catch (err) {
    console.error('Unexpected Connection Error:', err)
    return { 
      success: false, 
      error: 'Unexpected connection error',
      details: err 
    }
  }
}

// Test user creation using client-side signup
export async function testUserCreation() {
  const testEmail = `test_${Date.now()}@example.com`
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: 'StrongTest123!',
      options: {
        emailRedirectTo: 'http://localhost:5173/welcome',
        data: {
          username: `testuser_${Date.now()}`,
          signup_source: 'diagnostic'
        }
      }
    })

    if (error) {
      console.error('Detailed Signup Error:', {
        message: error.message,
        status: error.status,
        code: error.code
      })
      return { success: false, error }
    }

    console.log('Diagnostic User Creation Success:', data)
    return { success: true, data }
  } catch (err) {
    console.error('Unexpected Signup Error:', err)
    return { success: false, error: err }
  }
}

// Admin user creation using service role
export async function adminUserCreation() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: `admin_test_${Date.now()}@example.com`,
      password: 'StrongAdminTest123!',
      email_confirm: true,
      user_metadata: {
        username: `admin_testuser_${Date.now()}`,
        role: 'test_admin'
      }
    })

    if (error) {
      console.error('Admin User Creation Error:', error)
      return { success: false, error }
    }

    console.log('Admin User Created:', data)
    return { success: true, data }
  } catch (err) {
    console.error('Unexpected Admin Creation Error:', err)
    return { success: false, error: err }
  }
}

// Comprehensive diagnostic function to run all tests
export async function runComprehensiveDiagnostic() {
  console.log('Starting Comprehensive Supabase Diagnostic')
  
  const connectionTest = await testSupabaseConnection()
  console.log('Connection Test:', connectionTest)

  const clientSignupTest = await testUserCreation()
  console.log('Client Signup Test:', clientSignupTest)

  const adminCreationTest = await adminUserCreation()
  console.log('Admin Creation Test:', adminCreationTest)

  return {
    connectionTest,
    clientSignupTest,
    adminCreationTest
  }
}

// Automatically run diagnostic in development mode
if (import.meta.env.DEV) {
  runComprehensiveDiagnostic().then(result => {
    console.log('Comprehensive Diagnostic Results:', result)
  })
}