'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Smartphone, 
  Download, 
  Copy, 
  Check, 
  Save, 
  Globe, 
  AlertTriangle, 
  Bell, 
  ShieldCheck, 
  RefreshCw, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface AppConfig {
  latest_version: string;
  min_supported_version: string;
  build_number: number;
  apk_url: string;
  download_size: string;
  force_update: boolean;
  release_notes: string;
  push_notifications_enabled: boolean;
  maintenance_mode: boolean;
  support_phone: string;
  support_email: string;
}

interface Stats {
  appOrdersCount: number;
  appRevenue: number;
  webOrdersCount: number;
  webRevenue: number;
  totalOrdersCount: number;
}

export function MobileAppClient({
  initialConfig,
  stats
}: {
  initialConfig: AppConfig;
  stats: Stats;
}) {
  const [config, setConfig] = useState<AppConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${config.apk_url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/site-content/mobile_app_config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        router.refresh();
      } else {
        alert('Failed to save configuration. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while saving app configuration.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Smartphone size={20} />
            </span>
            <h1 className="text-2xl font-serif text-gray-900">Mobile App Control Center</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Control the Ayurdhara Divya Shakti Android APK, app releases, update triggers, and cross-channel sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Copied Link!' : 'Copy APK Link'}
          </button>
          <a
            href={config.apk_url}
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-sm transition"
          >
            <Download size={14} /> Download APK (v{config.latest_version})
          </a>
        </div>
      </div>

      {/* Multi-Channel Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-medium tracking-wide">
            <span>App Orders</span>
            <Smartphone size={16} className="text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{stats.appOrdersCount}</div>
          <div className="text-xs text-gray-400 mt-1">
            Revenue: ₹{stats.appRevenue.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-medium tracking-wide">
            <span>Website Orders</span>
            <Globe size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{stats.webOrdersCount}</div>
          <div className="text-xs text-gray-400 mt-1">
            Revenue: ₹{stats.webRevenue.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-medium tracking-wide">
            <span>Active APK</span>
            <ShieldCheck size={16} className="text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-800">v{config.latest_version}</div>
          <div className="text-xs text-emerald-600 mt-1 font-medium">Build #{config.build_number} (Production)</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-medium tracking-wide">
            <span>App Sync State</span>
            <RefreshCw size={16} className="text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-indigo-900">Connected</div>
          <div className="text-xs text-gray-400 mt-1">Supabase Realtime Live</div>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Version & Release Deployment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Smartphone size={18} className="text-emerald-700" />
                APK Release & Version Deployment
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                app-release-v{config.latest_version}.apk
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                  Latest Version
                </label>
                <input
                  type="text"
                  value={config.latest_version}
                  onChange={e => setConfig({ ...config, latest_version: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="1.0.0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                  Min Supported Version
                </label>
                <input
                  type="text"
                  value={config.min_supported_version}
                  onChange={e => setConfig({ ...config, min_supported_version: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="1.0.0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                  Build Number
                </label>
                <input
                  type="number"
                  value={config.build_number}
                  onChange={e => setConfig({ ...config, build_number: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Force Update Toggle */}
            <div className="flex items-start justify-between p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900 text-sm">
                  <AlertTriangle size={16} className="text-amber-600" />
                  Force App Update
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  When enabled, users opening any APK version older than the minimum version will be prompted to download the update before proceeding.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={config.force_update}
                  onChange={e => setConfig({ ...config, force_update: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>

            {/* APK Download URL Path */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                Hosted APK Relative URL
              </label>
              <input
                type="text"
                value={config.apk_url}
                onChange={e => setConfig({ ...config, apk_url: e.target.value })}
                className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-gray-50"
              />
              <p className="text-xs text-gray-400 mt-1">
                Linked to the static APK in your web public folder (<code className="font-mono">/releases/app-release-v1.0.apk</code>).
              </p>
            </div>

            {/* Release Notes */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                Release Notes & Announcement
              </label>
              <textarea
                rows={3}
                value={config.release_notes}
                onChange={e => setConfig({ ...config, release_notes: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="What's new in this version..."
              />
            </div>
          </div>

          {/* App Operation Policies */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Layers size={18} className="text-emerald-700" />
              App Operational Policies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg border border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-800">Push Notifications</div>
                  <div className="text-xs text-gray-400">Order updates & promotions</div>
                </div>
                <input
                  type="checkbox"
                  checked={config.push_notifications_enabled}
                  onChange={e => setConfig({ ...config, push_notifications_enabled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg border border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-800">App Maintenance Mode</div>
                  <div className="text-xs text-gray-400">Show maintenance screen</div>
                </div>
                <input
                  type="checkbox"
                  checked={config.maintenance_mode}
                  onChange={e => setConfig({ ...config, maintenance_mode: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Support Phone Helpline</label>
                <input
                  type="text"
                  value={config.support_phone}
                  onChange={e => setConfig({ ...config, support_phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Support Email</label>
                <input
                  type="text"
                  value={config.support_email}
                  onChange={e => setConfig({ ...config, support_email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Verification & Save */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Action & Deployment
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Saved settings are synchronized with the database in real-time. The Android app checks this configuration at startup.
            </p>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-medium text-sm rounded-lg shadow-sm transition"
            >
              <Save size={16} />
              {saved ? 'Settings Saved Successfully!' : saving ? 'Saving Changes...' : 'Save App Configuration'}
            </button>
          </div>

          <div className="bg-emerald-900 text-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Smartphone size={20} className="text-emerald-300" />
              <h3 className="text-sm font-semibold text-emerald-100 uppercase tracking-wide">
                Android App Status
              </h3>
            </div>
            
            <ul className="text-xs space-y-2 text-emerald-200">
              <li className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" />
                <span>Package: <code className="text-white font-mono">com.ayurdhara.divyashakti</code></span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" />
                <span>Engine: Kotlin Jetpack Compose</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" />
                <span>Auth: Supabase GoTrue Auth</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" />
                <span>Payment: StarPay Integrated</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" />
                <span>Realtime Catalog Feed: Active</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-emerald-800">
              <a
                href={config.apk_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-300 hover:text-white transition"
              >
                <span>Direct APK Download</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
