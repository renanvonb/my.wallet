import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://esruxslxdrcdvyxcvsrk.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZRHT91_3OUZTBGtK8Nmt_g_e7jEoN_e';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
