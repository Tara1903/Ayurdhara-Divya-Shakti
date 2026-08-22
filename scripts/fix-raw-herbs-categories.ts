import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-');
}

const PRODUCTS_MAP = [
  { name: 'Ajwain Seeds', cat: 'Single Herbs' },
  { name: 'Saunf / Fennel Seeds', cat: 'Single Herbs' },
  { name: 'Cumin Seeds / Jeera', cat: 'Single Herbs' },
  { name: 'Fenugreek Seeds', cat: 'Single Herbs' },
  { name: 'Kalonji Seeds', cat: 'Single Herbs' },
  { name: 'Mustard Seeds', cat: 'Single Herbs' },
  { name: 'Coriander Seeds', cat: 'Single Herbs' },
  { name: 'Whole Black Pepper', cat: 'Single Herbs' },
  { name: 'Whole Cloves', cat: 'Single Herbs' },
  { name: 'Cinnamon Sticks', cat: 'Single Herbs' },
  { name: 'Green Cardamom', cat: 'Single Herbs' },
  { name: 'Whole Dry Ginger', cat: 'Single Herbs' },
  { name: 'Dried Amla Pieces', cat: 'Single Herbs' },
  { name: 'Dried Tulsi Leaves', cat: 'Single Herbs' },
  { name: 'Dried Neem Leaves', cat: 'Single Herbs' },
  { name: 'Ashwagandha Root', cat: 'Premium Herbs' },
  { name: 'Shatavari Root', cat: 'Premium Herbs' },
  { name: 'Brahmi', cat: 'Premium Herbs' },
  { name: 'Jatamansi', cat: 'Premium Herbs' },
  { name: 'Safed Musli', cat: 'Premium Herbs' },
  { name: 'Gokhru', cat: 'Premium Herbs' },
  { name: 'Arjuna Bark', cat: 'Premium Herbs' },
  { name: 'Mulethi', cat: 'Premium Herbs' },
  { name: 'Dried Giloy Stem', cat: 'Premium Herbs' },
  { name: 'Dried Moringa Leaves', cat: 'Premium Herbs' },
  { name: 'Dried Hibiscus Flowers', cat: 'Premium Herbs' },
  { name: 'Dried Chamomile Flowers', cat: 'Premium Herbs' },
  { name: 'Dried Rose Petals', cat: 'Premium Herbs' },
  { name: 'Dried Vetiver Root', cat: 'Premium Herbs' },
  { name: 'Premium Saffron / Kesar', cat: 'Premium Herbs' },
  { name: 'Winter Herb Collection', cat: 'Seasonal Collections' },
  { name: 'Summer Herb Collection', cat: 'Seasonal Collections' },
  { name: 'Monsoon Herb Collection', cat: 'Seasonal Collections' },
  { name: 'Festive Herb Collection', cat: 'Seasonal Collections' }
];

async function fix() {
  const uniqueCategories = Array.from(new Set(PRODUCTS_MAP.map(p => p.cat)));
  const categoryMap = new Map<string, string>();
  
  for (const catName of uniqueCategories) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({ name: catName, slug: slugify(catName) }, { onConflict: 'slug' })
      .select()
      .single();
    
    if (error) {
      console.error(`Error inserting category ${catName}`, error);
      continue;
    }
    categoryMap.set(catName, data.id);
  }

  for (const p of PRODUCTS_MAP) {
    const categoryId = categoryMap.get(p.cat);
    const { error } = await supabase
      .from('products')
      .update({ category_id: categoryId })
      .eq('name', p.name);
      
    if (error) {
      console.error(`Error updating product ${p.name}`, error);
    }
  }
  
  console.log('Categories fixed for Raw Herbs!');
}

fix();
