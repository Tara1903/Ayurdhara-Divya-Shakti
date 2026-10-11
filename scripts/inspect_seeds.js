const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function inspect() {
  const { data: oneProduct, error: pErr } = await supabase.from('products').select('*').limit(1);
  if (pErr) {
    console.error('Error fetching product:', pErr);
    return;
  }
  console.log('Product columns:', Object.keys(oneProduct[0]));
  
  const { data: cats } = await supabase.from('categories').select('*');
  const catMap = new Map(cats.map(c => [c.id, c.name]));
  
  const seedCat = cats.find(c => c.name.toLowerCase().includes('seed'));
  console.log('Seed Category:', seedCat?.id, seedCat?.name);
  
  const { data: prods } = await supabase.from('products').select('id, name, slug, category_id');
  console.log('\nTotal products:', prods.length);
  
  const inSeedCat = prods.filter(p => p.category_id === seedCat?.id);
  console.log(`\nProducts assigned to "${seedCat?.name}" (${inSeedCat.length}):`);
  inSeedCat.forEach(p => console.log(`- [${p.id}] ${p.name} (slug: ${p.slug})`));
  
  const seedsByName = prods.filter(p => 
    p.name.toLowerCase().includes('seed') || 
    p.slug.toLowerCase().includes('seed') ||
    p.name.toLowerCase().includes('beej') ||
    p.name.toLowerCase().includes('chia') ||
    p.name.toLowerCase().includes('flax') ||
    p.name.toLowerCase().includes('pumpkin') ||
    p.name.toLowerCase().includes('sunflower') ||
    p.name.toLowerCase().includes('watermelon') ||
    p.name.toLowerCase().includes('sesame') ||
    p.name.toLowerCase().includes('til') ||
    p.name.toLowerCase().includes('sabja') ||
    p.name.toLowerCase().includes('methi') ||
    p.name.toLowerCase().includes('aliv')
  );
  
  console.log(`\nProducts with seed-related keywords in name/slug (${seedsByName.length}):`);
  seedsByName.forEach(p => {
    console.log(`- [${p.id}] ${p.name} -> Assigned Category: "${catMap.get(p.category_id) || 'UNKNOWN'}"`);
  });
}

inspect().catch(console.error);
