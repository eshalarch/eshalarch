import { createClient } from '@supabase/supabase-js';

// Environment variables (Vite/Hosting par yahi use karna hai)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase environment variables missing!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
