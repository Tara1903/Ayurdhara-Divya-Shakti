import { createClient } from '@/lib/supabase/server';
import { MobileAppClient } from './MobileAppClient';

export const revalidate = 0;

export default async function MobileAppAdminPage() {
  const supabase = await createClient();

  // Fetch app config from site_content
  const { data: configRecord } = await supabase
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
    release_notes: 'Ayurdhara Divya Shakti official v1.0 Android release featuring Sacred Vedic Wellness formulations, StarPay checkout, and offline sync.',
    push_notifications_enabled: true,
    maintenance_mode: false,
    support_phone: '+91 9876543210',
    support_email: 'care@ayurdhara.com'
  };

  const appConfig = configRecord?.content || defaultConfig;

  // Fetch channel statistics
  const { data: allOrders } = await supabase
    .from('orders')
    .select('id, final_total, shipping_address_snapshot, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  let appOrdersCount = 0;
  let appRevenue = 0;
  let webOrdersCount = 0;
  let webRevenue = 0;

  allOrders?.forEach(o => {
    const isApp = o.shipping_address_snapshot?.platform === 'android' || o.shipping_address_snapshot?.source === 'android';
    const amount = Number(o.final_total) || 0;
    if (isApp) {
      appOrdersCount++;
      appRevenue += amount;
    } else {
      webOrdersCount++;
      webRevenue += amount;
    }
  });

  return (
    <MobileAppClient
      initialConfig={appConfig}
      stats={{
        appOrdersCount,
        appRevenue,
        webOrdersCount,
        webRevenue,
        totalOrdersCount: (allOrders?.length || 0)
      }}
    />
  );
}
