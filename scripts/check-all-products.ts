import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: products } = await supabase.from('products').select('id, name, slug, category_id');
  console.log('\nAll Products count:', products?.length);
  const names = products?.map(p => p.name) || [];
  console.log('Sample product names:', names.slice(0, 10));
}

check();
