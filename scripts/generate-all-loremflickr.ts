import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import https from 'https';

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

// Map product names to best search keywords for flickr
const KEYWORD_MAP: Record<string, string> = {
  'Ajwain Seeds': 'ajwain,seeds,spice',
  'Saunf / Fennel Seeds': 'fennel,seeds,spice',
  'Cumin Seeds / Jeera': 'cumin,seeds,spice',
  'Fenugreek Seeds': 'fenugreek,seeds,methi',
  'Kalonji Seeds': 'nigella,seeds,kalonji',
  'Mustard Seeds': 'mustard,seeds,spice',
  'Coriander Seeds': 'coriander,seeds,spice',
  'Whole Black Pepper': 'black,pepper,peppercorn',
  'Whole Cloves': 'cloves,spice',
  'Cinnamon Sticks': 'cinnamon,sticks,spice',
  'Green Cardamom': 'cardamom,green,spice',
  'Whole Dry Ginger': 'dry,ginger,root',
  'Dried Amla Pieces': 'amla,gooseberry,indian',
  'Dried Tulsi Leaves': 'tulsi,basil,holy',
  'Dried Neem Leaves': 'neem,leaves,green',
  'Ashwagandha Root': 'ashwagandha,root,herb',
  'Shatavari Root': 'shatavari,root,asparagus',
  'Brahmi': 'brahmi,herb,ayurvedic',
  'Jatamansi': 'jatamansi,herb,ayurvedic',
  'Safed Musli': 'safed,musli,herb',
  'Gokhru': 'tribulus,herb,ayurvedic',
  'Arjuna Bark': 'arjuna,bark,tree',
  'Mulethi': 'licorice,mulethi,root',
  'Dried Giloy Stem': 'giloy,tinospora,stem',
  'Dried Moringa Leaves': 'moringa,leaves,green',
  'Dried Hibiscus Flowers': 'hibiscus,flower,dried',
  'Dried Chamomile Flowers': 'chamomile,flower,dried',
  'Dried Rose Petals': 'rose,petals,dried',
  'Dried Vetiver Root': 'vetiver,root,khus',
  'Premium Saffron / Kesar': 'saffron,kesar,spice',
  'Winter Herb Collection': 'herbs,winter,collection',
  'Summer Herb Collection': 'herbs,summer,botanical',
  'Monsoon Herb Collection': 'herbs,monsoon,green',
  'Festive Herb Collection': 'herbs,festive,spices',
  'Cold Pressed Mustard Oil': 'mustard,oil,bottle',
  'Cold Pressed Sesame Oil': 'sesame,oil,bottle',
  'Cold Pressed Groundnut Oil': 'peanut,oil,bottle',
  'Cold Pressed Coconut Oil': 'coconut,oil,bottle',
  'Cold Pressed Flaxseed Oil': 'flaxseed,oil,bottle',
  'Pure Honey': 'honey,jar,pure',
  'Forest Honey': 'honey,forest,natural',
  'Multifloral Honey': 'honey,flower,multifloral',
  'Cow Ghee': 'ghee,clarified,butter',
  'Desi Ghee': 'ghee,desi,traditional',
  'A2 Cow Ghee': 'ghee,cow,premium',
  'Almonds': 'almonds,nuts,bowl',
  'Cashews': 'cashews,nuts,bowl',
  'Raisins': 'raisins,dried,grapes',
  'Walnuts': 'walnuts,nuts,kernels',
  'Dates': 'dates,medjool,dried',
  'Figs / Anjeer': 'figs,dried,anjeer',
  'Pistachios': 'pistachios,nuts,green',
  'Chia Seeds': 'chia,seeds,superfood',
  'Flaxseeds': 'flaxseeds,linseed,brown',
  'Pumpkin Seeds': 'pumpkin,seeds,green',
  'Sunflower Seeds': 'sunflower,seeds,snack',
  'Sesame Seeds': 'sesame,seeds,white',
  'Sabja Seeds': 'basil,seeds,sabja',
  'Halim Seeds': 'garden,cress,seeds',
  'Jaggery Block': 'jaggery,gur,block',
  'Jaggery Powder': 'jaggery,powder,brown',
  'Organic Jaggery': 'jaggery,organic,natural',
  'Daily Herbal Tea': 'herbal,tea,cup',
  'Tulsi Herbal Tea': 'tulsi,tea,herbal',
  'Ginger Lemon Herbal Tea': 'ginger,lemon,tea',
  'Rose Herbal Tea': 'rose,tea,herbal',
  'Chamomile Herbal Tea': 'chamomile,tea,herbal',
  'Fresh Mint Herbal Tea': 'mint,tea,herbal',
  'Cinnamon Spice Herbal Tea': 'cinnamon,tea,spice',
  'Hibiscus Herbal Tea': 'hibiscus,tea,red',
  'Daily Herbal Kadha': 'kadha,herbal,spices',
  'Winter Kadha': 'kadha,winter,warm',
  'Herbal Spice Kadha': 'herbal,spice,kadha',
  'Tulsi Ginger Kadha': 'tulsi,ginger,kadha',
  'Family Kadha Blend': 'kadha,family,herbal',
  'Daily Wellness Drink Mix': 'wellness,drink,green',
  'Lemon Herbal Drink Mix': 'lemon,drink,herbal',
  'Rose Herbal Drink Mix': 'rose,drink,herbal',
  'Amla Herbal Drink Mix': 'amla,drink,juice',
  'Summer Herbal Drink Mix': 'summer,drink,cool',
  'Herbal Drink Discovery Combo': 'herbal,drinks,combo',
  'Ashwagandha Powder': 'ashwagandha,powder,ayurvedic',
  'Shatavari Powder': 'shatavari,powder,herbal',
  'Brahmi Powder': 'brahmi,powder,herbal',
  'Amla Powder': 'amla,powder,gooseberry',
  'Moringa Powder': 'moringa,powder,green',
  'Neem Powder': 'neem,powder,green',
  'Tulsi Powder': 'tulsi,powder,basil',
  'Turmeric Powder': 'turmeric,powder,golden',
  'Triphala Powder': 'triphala,powder,ayurvedic',
  'Trikatu Powder': 'trikatu,powder,spice',
  'Chyawanprash Powder Mix': 'chyawanprash,powder,ayurvedic',
  'Daily Detox Blend': 'detox,blend,green',
  'Golden Milk Blend': 'golden,milk,turmeric',
  'Digestive Blend': 'digestive,herbal,blend',
  'Spirulina Powder': 'spirulina,powder,green',
  'Wheatgrass Powder': 'wheatgrass,powder,green',
  'Barley Grass Powder': 'barley,grass,green',
  'Moringa Superfood Powder': 'moringa,superfood,powder',
  'Daily Green Nutrition Powder': 'green,nutrition,powder',
  'Protein Nutrition Powder': 'protein,nutrition,powder',
  'Multi-Grain Nutrition Powder': 'multigrain,nutrition,powder',
  'Sattu Powder': 'sattu,powder,protein',
  'Morning Nutrition Mix': 'morning,nutrition,breakfast',
};

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const follow = (u: string, depth: number) => {
      if (depth > 5) { reject(new Error('Too many redirects')); return; }
      const mod = u.startsWith('https') ? https : require('http');
      mod.get(u, (res: any) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          if (loc) return follow(loc.startsWith('http') ? loc : `https://loremflickr.com${loc}`, depth + 1);
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
  const { data: categories } = await supabase.from('categories').select('*');
  const targetCatIds = categories?.filter(c => TARGET_CATEGORIES.includes(c.name)).map(c => c.id) || [];

  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, category_id')
    .in('category_id', targetCatIds);

  if (!products) { console.log("No products found."); return; }

  const { data: images } = await supabase.from('product_images').select('product_id, url, id');

  // Filter to only products still using placeholders
  const pending = products.filter(p => {
    const pImgs = images?.filter(img => img.product_id === p.id) || [];
    return pImgs.length === 0 || pImgs.some(img => img.url.includes('cat_') || img.url.includes('placeholder'));
  });

  console.log(`Total pending: ${pending.length} products need images.\n`);

  const BATCH_SIZE = 10;
  let success = 0;
  let failed = 0;

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const batch = pending.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(pending.length / BATCH_SIZE);
    console.log(`\n=== BATCH ${batchNum}/${totalBatches} ===`);

    for (const p of batch) {
      const keywords = KEYWORD_MAP[p.name] || p.name.toLowerCase().replace(/[^a-z ]/g, '').split(' ').slice(0, 3).join(',');
      const url = `https://loremflickr.com/800/800/${encodeURIComponent(keywords)}`;

      try {
        const buffer = await downloadImage(url);
        const fileName = `${p.slug}-${Date.now()}.jpg`;

        const { error: uploadErr } = await supabase.storage
          .from('products')
          .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true });
        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);

        // Remove old placeholder
        const pImgs = images?.filter(img => img.product_id === p.id) || [];
        if (pImgs.length > 0) {
          await supabase.from('product_images').delete().eq('product_id', p.id);
        }

        await supabase.from('product_images').insert({ product_id: p.id, url: publicUrl, display_order: 1 });

        success++;
        console.log(`[${success + failed}/${pending.length}] OK: ${p.name}`);
      } catch (err: any) {
        failed++;
        console.error(`[${success + failed}/${pending.length}] FAIL: ${p.name} - ${err.message}`);
      }

      // Small delay between individual requests
      await new Promise(r => setTimeout(r, 1500));
    }

    // Longer pause between batches
    if (i + BATCH_SIZE < pending.length) {
      console.log(`\nBatch ${batchNum} done. Pausing 5 seconds before next batch...`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log(`\n=== COMPLETE ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${pending.length}`);
}

run();
