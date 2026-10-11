const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function previewAndFix() {
  const { data: cats } = await supabase.from('categories').select('*');
  const healthySeedsCat = cats.find(c => c.name.toLowerCase().includes('healthy seeds'));
  const rawSpicesCat = cats.find(c => c.name.toLowerCase().includes('raw spices'));
  
  console.log('HEALTHY SEEDS Category:', healthySeedsCat.id, healthySeedsCat.name);
  console.log('RAW SPICES Category:', rawSpicesCat.id, rawSpicesCat.name);

  // Spices that were mistakenly in Healthy Seeds:
  const kitchenSpices = [
    'Ajwain Seeds',
    'Coriander Seeds',
    'Cumin Seeds',
    'Fenugreek Seeds',
    'Kalonji Seeds',
    'Mustard Seeds',
    'Saunf Seeds'
  ];

  // Pure nutritional seeds & powders that belong in Healthy Seeds:
  const healthySeeds = [
    'Chia Seeds',
    'Flaxseeds',
    'Pumpkin Seeds',
    'Sunflower Seeds',
    'Sesame Seeds',
    'Sabja Seeds',
    'Halim Seeds',
    'Daily Seed & Grain Mix',
    'Chia Seed Powder',
    'Flaxseed Powder'
  ];

  console.log('\n--- Moving 7 kitchen spices to RAW SPICES ---');
  for (const spice of kitchenSpices) {
    const { data: prod, error: fErr } = await supabase.from('products').select('id, name, category_id').eq('name', spice).single();
    if (prod) {
      console.log(`Updating ${prod.name} (${prod.id}) -> Raw Spices (${rawSpicesCat.id})`);
      const { error: uErr } = await supabase.from('products').update({ category_id: rawSpicesCat.id }).eq('id', prod.id);
      if (uErr) console.error(`Error updating ${spice}:`, uErr);
    } else {
      console.warn(`Product not found: ${spice}`);
    }
  }

  console.log('\n--- Ensuring 10 genuine healthy seeds are in HEALTHY SEEDS ---');
  for (const seed of healthySeeds) {
    const { data: prod, error: fErr } = await supabase.from('products').select('id, name, category_id').eq('name', seed).single();
    if (prod) {
      console.log(`Updating ${prod.name} (${prod.id}) -> Healthy Seeds (${healthySeedsCat.id})`);
      const { error: uErr } = await supabase.from('products').update({ category_id: healthySeedsCat.id }).eq('id', prod.id);
      if (uErr) console.error(`Error updating ${seed}:`, uErr);
    } else {
      console.warn(`Product not found: ${seed}`);
    }
  }

  // Verification
  const { data: finalSeeds } = await supabase.from('products').select('id, name, slug').eq('category_id', healthySeedsCat.id);
  console.log(`\nFinal products in HEALTHY SEEDS (${finalSeeds.length}):`);
  finalSeeds.forEach(p => console.log(`  - ${p.name} (${p.slug})`));

  const { data: finalSpices } = await supabase.from('products').select('id, name, slug').eq('category_id', rawSpicesCat.id);
  console.log(`\nFinal products in RAW SPICES (${finalSpices.length}):`);
  finalSpices.forEach(p => console.log(`  - ${p.name} (${p.slug})`));
}

previewAndFix().catch(console.error);
