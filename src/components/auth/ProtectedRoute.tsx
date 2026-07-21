'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isInitialized, initialize } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (isInitialized && !user) {
      // Redirect to login if not authenticated
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isInitialized, user, router, pathname]);

  if (!isInitialized || !user) {
    // Show a loading skeleton or blank while checking auth
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="btn-spinner" style={{ width: 40, height: 40, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} />
      </div>
    );
  }

  return <>{children}</>;
}
