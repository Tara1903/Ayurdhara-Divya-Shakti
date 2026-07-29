import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { safeGetConfig } from '@/lib/config/env';

export async function GET() {
  const config = safeGetConfig();
  
  if (config?.isProduction) {
    return NextResponse.json({ error: 'System info is not available in production environments.' }, { status: 403 });
  }

  const systemInfo = {
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    platform: process.platform,
    nodeVersion: process.version,
    supabaseConfigured: !!config,
    database: {
      status: 'unknown',
      initialized: false,
      productCount: 0,
      seedVersion: null
    }
  };

  if (config) {
    const supabase = createClient(config.supabase.url, config.supabase.anonKey);
    try {
      const [metaRes, countRes] = await Promise.all([
        supabase.from('app_metadata').select('*').single(),
        supabase.from('products').select('*', { count: 'exact', head: true })
      ]);

      systemInfo.database = {
        status: metaRes.error ? 'disconnected' : 'connected',
        initialized: metaRes.data?.database_initialized || false,
        productCount: countRes.count || 0,
        seedVersion: metaRes.data?.seed_version || null
      };
    } catch (err) {
      systemInfo.database.status = 'error';
    }
  }

  return NextResponse.json(systemInfo, { status: 200 });
}
