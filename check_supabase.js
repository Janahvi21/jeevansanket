import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual env parsing
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
  const tables = ['hospitals', 'blood_banks', 'ambulances', 'donors'];
  
  console.log('Checking tables in Supabase project:', supabaseUrl);
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          console.log(`Table "${table}": NOT FOUND`);
        } else {
          console.log(`Table "${table}": ERROR - ${error.message} (Code: ${error.code})`);
        }
      } else {
        console.log(`Table "${table}": EXISTS (Count: ${count})`);
      }
    } catch (err) {
      console.log(`Table "${table}": EXCEPTION - ${err.message}`);
    }
  }
}

checkTables();
