import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function run() {
  const { data: categories } = await supabase.from('categories').select('*').eq('name', 'Herbal Teas').single();
  
  if (!categories) return;

  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug')
    .eq('category_id', categories.id)
    .limit(5); // Just 5 products for this batch

  if (!products || products.length === 0) {
    console.log("No products found.");
    return;
  }

  console.log(`Processing batch of ${products.length} products...`);
  
  for (const p of products) {
    console.log(`Generating image for ${p.name}...`);
    
    const seed = Math.floor(Math.random() * 100000);
    const prompt = `A premium clean aesthetic top-down product photography shot of ${p.name}, herbal tea, on a soft cream background, perfect luxurious minimalist setup, organic ayurvedic brand, high resolution`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=800&nologo=true&seed=${seed}`;
    
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (!res.ok) {
         console.log(`Failed with status ${res.status}`);
         break; // Stop the batch if rate limited
      }
      
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${p.slug}-${Date.now()}.jpg`;
      
      await supabase.storage.from('products').upload(fileName, buffer, { contentType: 'image/jpeg' });
        
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
        
      await supabase.from('product_images').delete().eq('product_id', p.id);
      await supabase.from('product_images').insert({ product_id: p.id, url: publicUrl, display_order: 1 });
      
      console.log(`-> Success: ${publicUrl}`);
    } catch (err: any) {
      console.error(`-> Error on ${p.name}:`, err.message);
      break;
    }
    
    console.log("Waiting 10 seconds to respect rate limits...");
    await new Promise(r => setTimeout(r, 10000));
  }
  
  console.log('Batch complete!');
}

run();
