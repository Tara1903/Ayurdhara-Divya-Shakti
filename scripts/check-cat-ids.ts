import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: categories } = await supabase.from('categories').select('*');
  console.log('Categories:', categories?.map(c => ({ id: c.id, name: c.name, slug: c.slug })));
  
  const { data: sampleProducts } = await supabase.from('products').select('name, category_id').limit(10);
  console.log('Sample Products:', sampleProducts);
}

check();
