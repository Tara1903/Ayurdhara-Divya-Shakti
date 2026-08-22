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
  console.log('Categories:');
  categories?.filter(c => c.name.includes('Herb') || c.name.includes('Raw')).forEach(c => console.log(c.id, c.name, c.slug));

  const { data: products } = await supabase.from('products').select('id, name, slug, category_id, is_active').limit(50);
  console.log('\nProducts count:', products?.length);
  const rawHerbs = products?.filter(p => categories?.some(c => c.id === p.category_id && (c.name.includes('Herb') || c.name.includes('Raw') || c.name.includes('Collection'))));
  console.log('\nSample Raw Herb Products:');
  rawHerbs?.slice(0, 10).forEach(p => console.log(p));
}

check();
