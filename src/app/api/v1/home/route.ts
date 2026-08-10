import { NextResponse } from 'next/server';
import { getActiveProducts } from '@/lib/dal/products';

export async function GET() {
  try {
    const products = await getActiveProducts();
    
    // Group products into categories
    const categoriesMap = new Map<string, { title: string; imageUrl: string }>();
    const featuredProducts = products.slice(0, 5); // Take first 5 as featured
    
    products.forEach(p => {
      if (!categoriesMap.has(p.category)) {
        categoriesMap.set(p.category, {
          title: p.category,
          imageUrl: p.images[0] || ''
        });
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        categories: Array.from(categoriesMap.values()),
        featuredProducts: featuredProducts.map(p => ({
          id: p.id,
          title: p.name,
          price: p.price,
          imageUrl: p.images[0] || ''
        }))
      }
    });
  } catch (error) {
    console.error('Home API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch home data' },
      { status: 500 }
    );
  }
}
