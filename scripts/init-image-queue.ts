import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as fs from 'fs';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function init() {
  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, category_id')
    .order('created_at', { ascending: true });

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name');

  const catMap = new Map((categories || []).map(c => [c.id, c.name]));

  const queue = (products || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: catMap.get(p.category_id) || 'General',
    status: 'pending',
    generatedImagePath: null,
    completedAt: null
  }));

  const queuePath = resolve(process.cwd(), 'scripts/image_generation_queue.json');
  fs.writeFileSync(queuePath, JSON.stringify({ total: queue.length, pending: queue.length, items: queue }, null, 2));
  console.log(`Initialized image queue with ${queue.length} products in ${queuePath}`);
}

init();
