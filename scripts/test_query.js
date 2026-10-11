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
const columns = `
  id, slug, name, category_id, short_description, full_description, story, primary_benefit, rating, review_count, badge, is_active,
  categories(id, name, slug, description, image_url),
  product_variants(id, size, price, original_price, gold_member_price, sku, stock_quantity, is_active),
  product_images(url, alt_text, display_order, variant_id)
`.trim();

supabase.from('products').select(columns).eq('is_active', true).limit(2).then(r => {
  if (r.error) {
    console.error('ERROR:', r.error);
  } else {
    console.log('SUCCESS! count:', r.data.length);
    console.log('categories field:', r.data[0].categories);
  }
});
