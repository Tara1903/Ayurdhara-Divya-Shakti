import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TARGET_CATEGORIES = [
  'Single Herbs', 'Premium Herbs', 'Seasonal Collections',
  'Cold Pressed Oils', 'Honey', 'Ghee', 'Dry Fruits', 'Seeds', 'Jaggery',
  'Herbal Teas', 'Kadha', 'Wellness Drinks',
  'Single Herb Powder', 'Wellness Powder Blends', 'Superfood Powders', 'Daily Nutrition Powders'
];

async function run() {
  const { data: categories } = await supabase.from('categories').select('*');
  const targetCatIds = categories?.filter(c => TARGET_CATEGORIES.includes(c.name)).map(c => c.id) || [];

  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, category_id')
    .in('category_id', targetCatIds);

  if (!products) {
    console.log("No products found.");
    return;
  }

  const { data: images } = await supabase
    .from('product_images')
    .select('product_id, url, id');

  console.log(`Found ${products.length} products to process in target categories.`);
  
  let count = 0;
  for (const p of products) {
    const productImages = images?.filter(img => img.product_id === p.id) || [];
    const hasPlaceholder = productImages.some(img => img.url.includes('cat_') || img.url.includes('placeholder'));
    
    if (hasPlaceholder || productImages.length === 0) {
      count++;
      console.log(`[${count}/${products.length}] Generating image for ${p.name}...`);
      
      const cat = categories?.find(c => c.id === p.category_id);
      const catName = cat ? cat.name : 'Ayurvedic Wellness';
      
      // Use pollinations text-to-image API
      // Append random seed to avoid cache hits if we rerun
      const seed = Math.floor(Math.random() * 1000000);
      const prompt = `A premium clean aesthetic top-down product photography shot of ${p.name}, category ${catName}, on a soft cream background, perfect luxurious minimalist setup, organic ayurvedic brand, high resolution`;
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true&seed=${seed}`;
      
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
        if (!res.ok) {
           console.log(`Failed with status ${res.status}`);
           await new Promise(r => setTimeout(r, 5000));
           continue;
        }
        
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${p.slug}-${Date.now()}.jpg`;
        
        const { error: uploadErr } = await supabase.storage
          .from('products')
          .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true });
          
        if (uploadErr) throw uploadErr;
        
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
          
        if (productImages.length > 0) {
           await supabase.from('product_images').delete().eq('product_id', p.id);
        }
        
        await supabase.from('product_images').insert({
          product_id: p.id,
          url: publicUrl,
          display_order: 1
        });
        
        console.log(`-> Success: ${publicUrl}`);
      } catch (err: any) {
        console.error(`-> Error on ${p.name}:`, err.message);
      }
      
      // Delay to avoid 429 Too Many Requests
      await new Promise(r => setTimeout(r, 4000));
    }
  }
  
  console.log('All missing images generated and updated!');
}

run();
