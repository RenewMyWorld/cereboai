import { createClient } from '@supabase/supabase-js'

// Local Supabase project configuration
const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test signup function
async function testSignup() {
    try {
        // Generate a unique email for testing
        const testEmail = `test_user_${Date.now()}@example.com`
        const testPassword = 'StrongPassword123!'

        // Attempt signup
        const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword
        })

        if (error) {
            console.error('Signup Error:', error)
            return false
        }

        console.log('Signup Successful:', data)
        return true
    } catch (err) {
        console.error('Unexpected Error:', err)
        return false
    }
}

// Run the test
testSignup().then(result => {
    console.log('Signup Test Result:', result ? 'PASSED' : 'FAILED')
    process.exit(result ? 0 : 1)
})
