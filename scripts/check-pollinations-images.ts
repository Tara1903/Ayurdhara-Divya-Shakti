import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: images } = await supabase.from('product_images').select('product_id, url');
  
  if (!images) return;
  
  const pollinations = images.filter(img => img.url.includes('pollination') || !img.url.includes('cat_'));
  const categoryImages = images.filter(img => img.url.includes('cat_') || img.url.includes('placeholder'));
  
  console.log(`Total images in DB: ${images.length}`);
  console.log(`Images uniquely generated/uploaded: ${pollinations.length}`);
  console.log(`Images still using category defaults: ${categoryImages.length}`);
  
  // Show a few unique ones to confirm they uploaded correctly
  if (pollinations.length > 0) {
    console.log('\nSample unique images:');
    pollinations.slice(0, 5).forEach(p => console.log(p.url));
  }
}

check();
