import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function update() {
  await supabase
    .from('product_images')
    .update({ url: '/images/categories/cat_raw_herbs_1786556977927.jpg' })
    .eq('url', '/images/categories/cat_raw_herbs.jpg');
    
  await supabase
    .from('product_images')
    .update({ url: '/images/categories/cat_herbal_powders_1786556998830.jpg' })
    .eq('url', '/images/categories/cat_herbal_powders.jpg');
    
  console.log('Images fixed');
}

update();
