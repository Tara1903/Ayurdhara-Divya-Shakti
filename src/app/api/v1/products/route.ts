import { NextResponse } from 'next/server';
import { getActiveProducts } from '@/lib/dal/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let products = await getActiveProducts();
    
    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
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
