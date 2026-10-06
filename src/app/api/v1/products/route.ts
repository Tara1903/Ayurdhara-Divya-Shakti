import { NextResponse } from 'next/server';
import { getActiveProducts } from '@/lib/dal/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let products = await getActiveProducts();
    
    if (category) {
      const catLower = category.toLowerCase().trim();
      products = products.filter(p => {
        const names = (p.categories && p.categories.length > 0 ? p.categories : [p.category]).map(c => c.toLowerCase().trim());
        const slugs = (p.categorySlugs || []).map(s => s.toLowerCase().trim());
        return names.includes(catLower) || slugs.includes(catLower) || names.some(n => n.replace(/\s+/g, '-') === catLower);
      });
    }

    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
