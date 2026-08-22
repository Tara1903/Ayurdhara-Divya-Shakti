import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: p } = await supabase.from('products').select('name, category_id').eq('name', 'Dried Rose Petals').single();
  console.log('Product category_id:', p?.category_id);
  const { data: c } = await supabase.from('categories').select('*').eq('id', p?.category_id).single();
  console.log('Category:', c);
}

check();
