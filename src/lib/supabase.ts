import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type AIAgent = Database['public']['Tables']['ai_agents']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Submission = Database['public']['Tables']['submissions']['Row'];