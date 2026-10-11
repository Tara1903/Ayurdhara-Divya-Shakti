const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function dump() {
  const { data: cats } = await supabase.from('categories').select('*').order('name');
  const { data: prods } = await supabase.from('products').select('id, name, slug, category_id').order('name');
  
  const catMap = new Map(cats.map(c => [c.id, c.name]));
  
  const grouped = {};
  cats.forEach(c => { grouped[c.name] = []; });
  grouped['NO_CATEGORY'] = [];
  
  prods.forEach(p => {
    const cName = catMap.get(p.category_id) || 'NO_CATEGORY';
    if (!grouped[cName]) grouped[cName] = [];
    grouped[cName].push({ id: p.id, name: p.name, slug: p.slug });
  });

  let out = '';
  for (const [cName, items] of Object.entries(grouped)) {
    out += `\n=== ${cName} (${items.length} products) ===\n`;
    items.forEach(it => {
      out += `  - [${it.id}] ${it.name} (${it.slug})\n`;
    });
  }
  
  fs.writeFileSync('scripts/category_products_dump.txt', out, 'utf8');
  console.log('Dump completed! Check scripts/category_products_dump.txt');
}

dump().catch(console.error);
