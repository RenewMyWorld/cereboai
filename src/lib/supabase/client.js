import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cqpcxndujstmsyrmbvsr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxcGN4bmR1anN0bXN5cm1idnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NjQzNjcsImV4cCI6MjA1NjE0MDM2N30.CcKc2Vb0k54ATbWRixYjjnUgQjWx-GbquzlYW23cUTA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)