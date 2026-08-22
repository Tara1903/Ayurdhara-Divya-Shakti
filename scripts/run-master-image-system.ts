import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import https from 'https';
import { analyzeProductForImages } from '../src/lib/image-system';
import { resolveAutoProductImage } from '../src/lib/image-resolver';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function downloadBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const follow = (u: string, depth: number) => {
      if (depth > 5) { reject(new Error('Too many redirects')); return; }
      const mod = u.startsWith('https') ? https : require('http');
      mod.get(u, (res: any) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          if (loc) return follow(loc.startsWith('http') ? loc : loc, depth + 1);
        }
        if (res.statusCode !== 200) { reject(new Error(`Status: ${res.statusCode}`)); return; }
        const data: Buffer[] = [];
        res.on('data', (chunk: Buffer) => data.push(chunk));
        res.on('end', () => resolve(Buffer.concat(data)));
      }).on('error', reject);
    };
    follow(url, 0);
  });
}

async function run() {
  console.log('🚀 Running Master Product Image System...');

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select('id, name, slug, category_id'),
    supabase.from('categories').select('id, name')
  ]);

  if (!products) {
    console.log('No products found.');
    return;
  }

  const catMap = new Map((categories || []).map(c => [c.id, c.name]));
  console.log(`Found ${products.length} products to process.\n`);

  let count = 0;
  for (const p of products) {
    count++;
    const catName = catMap.get(p.category_id) || '';
    const intel = analyzeProductForImages(p.name, catName);
    const resolved = await resolveAutoProductImage(p.name, catName);

    console.log(`[${count}/${products.length}] ${p.name} -> Form: [${intel.productForm}] (${resolved.source})`);

    let finalUrl = resolved.url;

    if (resolved.url.startsWith('http')) {
      try {
        const buffer = await downloadBuffer(resolved.url);
        const fileName = `${p.slug}-master-${Date.now()}.jpg`;

        const { error: uploadErr } = await supabase.storage
          .from('products')
          .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true });

        if (!uploadErr) {
          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);
          finalUrl = publicUrl;
        }
      } catch (err: any) {
        console.warn(`  Warning: storage upload skipped, using direct URL: ${err.message}`);
      }
    }

    // Update product_images
    await supabase.from('product_images').delete().eq('product_id', p.id);
    await supabase.from('product_images').insert({
      product_id: p.id,
      url: finalUrl,
      display_order: 1
    });

    console.log(`  ✓ Linked: ${finalUrl}`);
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n🎉 Master Product Image System execution complete for all products!');
}

run();
