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
  const catMap = new Map((categories || []).map(c => [c.id, c.name]));

  const { data: products } = await supabase.from('products').select('*').order('name');
  const { data: variants } = await supabase.from('product_variants').select('*');

  const varMap = new Map<string, any[]>();
  variants?.forEach(v => {
    const list = varMap.get(v.product_id) || [];
    list.push(v);
    varMap.set(v.product_id, list);
  });

  console.log(`TOTAL PRODUCTS IN DB: ${products?.length}`);

  products?.forEach(p => {
    const cat = catMap.get(p.category_id) || 'UNCATEGORIZED';
    const vars = varMap.get(p.id) || [];
    const varStr = vars.map(v => `${v.size || v.name}: MRP ₹${v.mrp} -> ₹${v.offer_price}`).join(' | ');
    console.log(`[${cat}] "${p.name}" (slug: ${p.slug}) -> Variants: [${varStr}]`);
  });
}

inspect();
