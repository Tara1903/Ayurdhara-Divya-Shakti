import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Vercel Cloud Cron job that runs 24/7 on serverless infrastructure
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // 1. Fetch all products and categories
    const [{ data: products, error: pErr }, { data: categories, error: cErr }] = await Promise.all([
      supabase.from('products').select('id, name, slug, category_id'),
      supabase.from('categories').select('id, name')
    ]);

    if (pErr || cErr) {
      return NextResponse.json({ error: pErr?.message || cErr?.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No products found.' }, { status: 200 });
    }

    const catMap = new Map((categories || []).map(c => [c.id, c.name]));

    // 2. Fetch existing images
    const { data: existingImages } = await supabase.from('product_images').select('*');
    const imgMap = new Map((existingImages || []).map(img => [img.product_id, img.url]));

    const ASSET_MAP: Record<string, string> = {
      'Single Herbs': '/images/catalog/raw_single_herbs_1787341693856.jpg',
      'Premium Herbs': '/images/catalog/raw_premium_herbs_1787341716614.jpg',
      'Seasonal Collections': '/images/catalog/raw_seasonal_collection_1787341734128.jpg',
      'Single Herb Powder': '/images/catalog/powder_single_herb_1787341748746.jpg',
      'Wellness Powder Blends': '/images/catalog/powder_wellness_blend_1787341764890.jpg',
      'Superfood Powders': '/images/catalog/powder_wellness_blend_1787341764890.jpg',
      'Daily Nutrition Powders': '/images/catalog/powder_wellness_blend_1787341764890.jpg',
      'Herbal Teas': '/images/catalog/tea_herbal_infusion_1787341787189.jpg',
      'Kadha': '/images/catalog/tea_traditional_kadha_1787341802864.jpg',
      'Wellness Drinks': '/images/catalog/tea_herbal_infusion_1787341787189.jpg',
      'Cold Pressed Oils': '/images/catalog/food_cold_pressed_oil_1787341816505.jpg',
      'Honey': '/images/catalog/food_pure_honey_1787341832761.jpg',
      'Ghee': '/images/catalog/food_desi_ghee_1787341855176.jpg',
      'Dry Fruits': '/images/catalog/food_dry_fruits_1787341867152.jpg',
      'Seeds': '/images/catalog/food_organic_seeds_1787341877607.jpg',
      'Jaggery': '/images/catalog/food_natural_jaggery_1787341890526.jpg',
      'Kids Care Oil Blend': '/images/categories/cat_kids_care.jpg',
      'Men Wellness Oil Blend': '/images/categories/cat_mens_wellness.jpg',
      'Women Wellness Oil Blend': '/images/categories/cat_womens_wellness.jpg',
      'Senior Care Oil Blend': '/images/categories/cat_senior_care.jpg',
      'Feet Massage Oil': '/images/categories/cat_oil_wellness_1786556871303.jpg',
      'Hair Wellness Oil': '/images/categories/cat_oil_wellness_1786556871303.jpg',
      'Body Massage Oil': '/images/categories/cat_oil_wellness_1786556871303.jpg',
      'Essential Oils': '/images/categories/cat_oil_wellness_1786556871303.jpg',
      'Natural Fragrance': '/images/categories/cat_natural_fragrance.jpg',
      'Wellness Aroma': '/images/categories/cat_natural_fragrance.jpg',
      'Diffuser Blends': '/images/categories/cat_natural_fragrance.jpg',
      'Essential Oil Combos': '/images/categories/cat_natural_fragrance.jpg',
      'Individual Wellness Packs': '/images/categories/cat_wellness_packs_1786557692487.jpg',
      'Family Trial Wellness Packs': '/images/categories/cat_trial_pack.jpg',
      'Family Gold Wellness Packs': '/images/categories/cat_wellness_packs_1786557692487.jpg',
      'Individual Trial Wellness Pack': '/images/categories/cat_trial_pack.jpg',
      'Diamond Trial Wellness Pack': '/images/categories/cat_trial_pack.jpg',
      'Individual Gold Wellness Pack': '/images/categories/cat_wellness_packs_1786557692487.jpg',
      'Individual Premium Wellness Pack': '/images/categories/cat_wellness_packs_1786557692487.jpg',
    };

    let updatedCount = 0;

    for (const p of products) {
      const catName = catMap.get(p.category_id) || 'Single Herbs';
      let targetImage = ASSET_MAP[catName] || '/images/catalog/raw_single_herbs_1787341693856.jpg';

      const lower = p.name.toLowerCase();
      if (lower.includes('oil') || lower.includes('nabhi') || lower.includes('massage')) {
        if (lower.includes('mustard') || lower.includes('sesame') || lower.includes('groundnut') || lower.includes('coconut') || lower.includes('flaxseed')) {
          targetImage = '/images/catalog/food_cold_pressed_oil_1787341816505.jpg';
        } else {
          targetImage = ASSET_MAP[catName] || '/images/categories/cat_oil_wellness_1786556871303.jpg';
        }
      } else if (lower.includes('powder') || lower.includes('churna') || lower.includes('sattu') || lower.includes('blend mix')) {
        targetImage = '/images/catalog/powder_single_herb_1787341748746.jpg';
      } else if (lower.includes('tea') && !lower.includes('tea tree')) {
        targetImage = '/images/catalog/tea_herbal_infusion_1787341787189.jpg';
      } else if (lower.includes('kadha')) {
        targetImage = '/images/catalog/tea_traditional_kadha_1787341802864.jpg';
      } else if (lower.includes('honey')) {
        targetImage = '/images/catalog/food_pure_honey_1787341832761.jpg';
      } else if (lower.includes('ghee')) {
        targetImage = '/images/catalog/food_desi_ghee_1787341855176.jpg';
      } else if (lower.includes('jaggery') || lower.includes('gur')) {
        targetImage = '/images/catalog/food_natural_jaggery_1787341890526.jpg';
      } else if (lower.includes('almond') || lower.includes('cashew') || lower.includes('raisin') || lower.includes('walnut') || lower.includes('date') || lower.includes('fig') || lower.includes('pista')) {
        targetImage = '/images/catalog/food_dry_fruits_1787341867152.jpg';
      } else if (lower.includes('chia') || lower.includes('pumpkin') || lower.includes('sunflower') || lower.includes('sabja') || lower.includes('halim') || (lower.includes('seed') && !catName.includes('Herb'))) {
        targetImage = '/images/catalog/food_organic_seeds_1787341877607.jpg';
      }

      const currentUrl = imgMap.get(p.id);
      if (!currentUrl || currentUrl.includes('loremflickr') || currentUrl.includes('placeholder') || currentUrl !== targetImage) {
        await supabase.from('product_images').delete().eq('product_id', p.id);
        await supabase.from('product_images').insert({
          product_id: p.id,
          url: targetImage,
          display_order: 1
        });
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Autonomous Cloud Image Cron finished. Processed ${products.length} products, updated ${updatedCount} images.`,
      totalProducts: products.length,
      updatedCount,
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error: any) {
    console.error('Autonomous Cloud Image Cron error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
