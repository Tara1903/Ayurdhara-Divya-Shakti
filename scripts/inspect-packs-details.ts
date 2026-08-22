import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function inspect() {
  const { data: categories } = await supabase.from('categories').select('*');
  const catMap = new Map((categories || []).map(c => [c.id, c.name]));

  const { data: products } = await supabase.from('products').select('*');
  const { data: variants } = await supabase.from('product_variants').select('*');

  const varMap = new Map<string, any[]>();
  variants?.forEach(v => {
    const list = varMap.get(v.product_id) || [];
    list.push(v);
    varMap.set(v.product_id, list);
  });

  const targetCategories = [
    'Kids Care Oil Blend',
    'Men Wellness Oil Blend',
    'Women Wellness Oil Blend',
    'Senior Care Oil Blend',
    'Body Massage Oil',
    'Feet Massage Oil',
    'Hair Wellness Oil',
    'Individual Wellness Packs',
    'Family Trial Wellness Packs',
    'Family Gold Wellness Packs',
    'Individual Gold Wellness Pack',
    'Individual Premium Wellness Pack',
    'Individual Trial Wellness Pack',
    'Diamond Trial Wellness Pack',
    'Trial Packs',
    'Gold Wellness Packs',
    'Premium Wellness Packs',
    'Family Packs',
    'Gift Packs',
    'Combos'
  ];

  console.log('=== TARGET OIL WELLNESS & PACK PRODUCTS IN DB ===');
  products?.filter(p => targetCategories.includes(catMap.get(p.category_id) || '') || p.name.includes('Pack') || p.name.includes('Combo') || p.name.includes('Trial') || p.name.includes('Gold') || p.name.includes('Oil')).forEach(p => {
    const cat = catMap.get(p.category_id) || 'UNCATEGORIZED';
    const vars = varMap.get(p.id) || [];
    const varStr = vars.map(v => `${v.size}: Price ₹${v.price} / MRP ₹${v.original_price}`).join(' | ');
    console.log(`- [${cat}] "${p.name}" (slug: ${p.slug}) | Variants: [${varStr}]`);
  });
}

inspect();
