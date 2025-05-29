import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bwzoypaiitggirewgprg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3em95cGFpaXRnZ2lyZXdncHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODk2MTcsImV4cCI6MjA2NDA2NTYxN30.w8Fo0OR4VYxZLnzyKMKKgHcCuOAlx3P9hZTdCqW7oP8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

