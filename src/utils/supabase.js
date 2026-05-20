import { createClient } from '@supabase/supabase-js';

// Vercel aur local environment ke liye variable set up
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rkxwxkzqytzaajgrmloz.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_baTDFIGYNPVWdkI9G78d9A_b34Xvnty';

export const supabase = createClient(supabaseUrl, supabaseKey);
