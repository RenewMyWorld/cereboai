import { supabase } from '/supabase/client.js'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const fullName = event.target.full_name.value;
        const username = event.target.username.value;

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName,
                        username: username
                    }
                }
            });

            if (error) throw error;

            console.log('User signed up:', data);
            alert('Sign up successful! Please check your email to confirm.');
        } catch (error) {
            console.error('Full error:', error);
            alert(`Sign up failed: ${error.message}`);
        }
    });
});