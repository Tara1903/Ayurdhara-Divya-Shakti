'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

function TrackerLogic() {
  const searchParams = useSearchParams();
  const setPartnerCode = useCartStore((state) => state.setPartnerCode);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setPartnerCode(ref);
    }
  }, [searchParams, setPartnerCode]);

  return null;
}

export default function ReferralTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerLogic />
    </Suspense>
  );
}
