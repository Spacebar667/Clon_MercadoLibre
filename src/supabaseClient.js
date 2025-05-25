import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wgxcbbmmtixfmnydqclv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndneGNiYm1tdGl4Zm1ueWRxY2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMDcyMDIsImV4cCI6MjA2Mzc4MzIwMn0.VLM89_ppsYxx39ZKoG_-Qz6_l9XY_T80_8M6zxKN07A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
