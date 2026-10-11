const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = {};
fs.readFileSync('.env.local', 'utf8').split('\n').forEach(line => {
  const idx = line.indexOf('=');
  if (idx > -1) {
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    env[k] = v;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: cats, error: err1 } = await supabase.from('categories').select('*');
  if (err1) console.error(err1);
  console.log('Categories count:', cats?.length);
  if (cats && cats.length > 0) {
    console.log('Category sample keys:', Object.keys(cats[0]));
    cats.forEach(c => console.log(`- "${c.name || c.title}" (slug: "${c.slug}", id: "${c.id}")`));
  }

  const { data: prods, error: err2 } = await supabase.from('products').select('id, name, category_id');
  if (err2) console.error(err2);
  const catMap = Object.fromEntries(cats.map(c => [c.id, (c.name || '').trim()]));
  const counts = {};
  let nullCat = 0;
  prods.forEach(p => {
    if (!p.category_id) nullCat++;
    else {
      const name = catMap[p.category_id] || 'Unknown ID: ' + p.category_id;
      counts[name] = (counts[name] || 0) + 1;
    }
  });
  console.log('\nProducts count:', prods?.length);
  console.log('Null category_id count:', nullCat);
  console.log('Products per category:', counts);
}

check();
