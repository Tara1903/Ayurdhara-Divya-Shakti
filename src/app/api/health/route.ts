import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { safeGetConfig } from '@/lib/config/env';

export async function GET() {
  const startTime = Date.now();
  const config = safeGetConfig();
  const env = config?.isProduction ? 'production' : 'development';
  
  if (!config) {
    return NextResponse.json({
      status: 'degraded',
      database: 'disconnected',
      initialized: false,
      products: 0,
      seedVersion: null,
      environment: env,
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      error: 'Environment variables not configured'
    }, { status: 503 });
  }

  const supabase = createClient(config.supabase.url, config.supabase.anonKey);
  
  try {
    // 1. Check Metadata for Initialization Status
    const { data: metadata, error: metaError } = await supabase
      .from('app_metadata')
      .select('database_initialized, seed_version')
      .single();

    // 2. Count Products
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (metaError || countError) {
      throw new Error('Database connection failed during health check');
    }

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      initialized: metadata?.database_initialized || false,
      products: count || 0,
      seedVersion: metadata?.seed_version || null,
      environment: env,
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      latency: `${Date.now() - startTime}ms`
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({
      status: 'unhealthy',
      database: 'disconnected',
      initialized: false,
      products: 0,
      seedVersion: null,
      environment: env,
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      error: err.message
    }, { status: 500 });
  }
}
