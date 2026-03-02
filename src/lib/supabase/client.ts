import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ensure these exist at runtime (won't fail at build time if undefined, but will fail if we try to use them)
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseKey)) {
    console.warn("Supabase URL or Anon Key is missing. Check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
