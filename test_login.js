import { createClient } from '@supabase/supabase-js';

// Supabase project URL and anon key
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxLCJleHAiOjF9.';

async function testLogin() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const email = 'test_user@example.com';
    const password = 'StrongP@ssw0rd2025!';

    try {
        // Register user using custom function
        const { data: registerData, error: registerError } = await supabase.rpc('register_user', {
            email: email,
            password: password
        });

        if (registerError) {
            console.error('Registration Error:', registerError);
            return;
        }

        console.log('User registered with ID:', registerData);

        // Login
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (loginError) {
            console.error('Login Error:', loginError);
            return;
        }

        console.log('Login successful:', loginData);
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testLogin();
