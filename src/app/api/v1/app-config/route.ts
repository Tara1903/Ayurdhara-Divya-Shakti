import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: record, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('key', 'mobile_app_config')
      .single();

    const defaultConfig = {
      latest_version: '1.0.0',
      min_supported_version: '1.0.0',
      build_number: 1,
      apk_url: '/releases/app-release-v1.0.apk',
      download_size: '23.4 MB',
      force_update: false,
      release_notes: 'Official Ayurdhara Divya Shakti v1.0 Android Release.',
      push_notifications_enabled: true,
      maintenance_mode: false,
      support_phone: '+91 9876543210',
      support_email: 'care@ayurdhara.com'
    };

    if (error || !record?.content) {
      return NextResponse.json(defaultConfig);
    }

    return NextResponse.json(record.content);
  } catch (err: any) {
    return NextResponse.json({
      latest_version: '1.0.0',
      min_supported_version: '1.0.0',
      build_number: 1,
      apk_url: '/releases/app-release-v1.0.apk',
      download_size: '23.4 MB',
      force_update: false
    });
  }
}
