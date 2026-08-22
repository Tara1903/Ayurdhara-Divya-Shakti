import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function inspect() {
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  console.log('--- CATEGORIES IN DB ---');
  categories?.forEach(c => console.log(`${c.id} | ${c.name} | slug: ${c.slug}`));

  const { data: products } = await supabase.from('products').select('id, name, slug, category_id, price, original_price').order('name');
  console.log('\n--- ALL PRODUCTS IN DB (' + products?.length + ') ---');
  const catMap = new Map((categories || []).map(c => [c.id, c.name]));
  products?.forEach(p => {
    console.log(`[${catMap.get(p.category_id) || 'NO_CAT'}] ${p.name} (₹${p.price} / ₹${p.original_price}) -> ${p.slug}`);
  });
}

inspect();
