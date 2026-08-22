import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRODUCTS_CONTENTS: Record<string, string> = {
  'winter-herb-collection': 'Dry Ginger, Ajwain, Cinnamon, Clove, Black Pepper',
  'summer-herb-collection': 'Sabja Seeds, Fennel Seeds, Dried Rose Petals, Dried Coriander Seeds, Vetiver / Khus',
  'monsoon-herb-collection': 'Ajwain, Dried Tulsi, Dry Ginger, Black Pepper, Cinnamon',
  'festive-herb-collection': 'Cinnamon, Cardamom, Clove, Black Pepper, Dried Rose Petals'
};

const RAW_HERBS_SLUGS = [
  'ajwain-seeds', 'saunf-seeds', 'cumin-seeds', 'fenugreek-seeds', 'kalonji-seeds', 
  'mustard-seeds', 'coriander-seeds', 'whole-black-pepper', 'whole-cloves', 
  'cinnamon-sticks', 'green-cardamom', 'whole-dry-ginger', 'dried-amla-pieces', 
  'dried-tulsi-leaves', 'dried-neem-leaves',
  'ashwagandha-root', 'shatavari-root', 'brahmi', 'jatamansi', 'safed-musli', 
  'gokhru', 'arjuna-bark', 'mulethi', 'dried-giloy-stem', 'dried-moringa-leaves', 
  'dried-hibiscus-flowers', 'dried-chamomile-flowers', 'dried-rose-petals', 
  'dried-vetiver-root', 'premium-saffron-kesar',
  'winter-herb-collection', 'summer-herb-collection', 'monsoon-herb-collection', 'festive-herb-collection'
];

async function updateProducts() {
  console.log(`Updating ${RAW_HERBS_SLUGS.length} products with contents...`);
  
  for (const slug of RAW_HERBS_SLUGS) {
    const isFlowerLeafRoot = slug.includes('flower') || slug.includes('leaf') || slug.includes('leaves') || slug.includes('root') || slug.includes('tulsi') || slug.includes('neem') || slug.includes('brahmi') || slug.includes('mulethi') || slug.includes('petals') || slug.includes('saffron') || slug.includes('kesar');
    
    let storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the pack tightly closed after opening.';
    if (isFlowerLeafRoot) {
      storage += ' Keep away from moisture to help maintain freshness and aroma.';
    }

    const usageInstructions = {
      serving: 'As required',
      timing: 'Any time',
      instructions: 'Use as a natural ingredient in your daily wellness routine or culinary preparation.'
    };

    const idealFor = ['Everyday natural living', 'Traditional wellness use', 'Culinary preparation'];
    
    const contents = PRODUCTS_CONTENTS[slug] || '100% Pure Raw Herb / Botanical';
    
    const specifications = {
      'Storage': storage,
      'Type': 'Raw Herb / Botanical',
      'Contents / Ingredients': contents,
      'Disclaimer': 'This product is a natural botanical ingredient. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.'
    };

    const benefits = [
      { text: 'Selected premium whole botanical' },
      { text: 'Carefully packed to retain natural aroma and flavour' },
      { text: 'Ideal for everyday natural living' }
    ];

    const { error } = await supabase
      .from('products')
      .update({
        usage_instructions: usageInstructions,
        ideal_for: idealFor,
        specifications: specifications,
        benefits: benefits
      })
      .eq('slug', slug);

    if (error) {
      console.error(`Error updating product ${slug}`, error);
    }
  }
  
  console.log('Update done!');
}

updateProducts();
