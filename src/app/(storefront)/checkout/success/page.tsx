'use client';

import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { CheckCircle, Clock } from 'lucide-react';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status');
  
  const { clearCart } = useCartStore();
  const [cartCleared, setCartCleared] = useState(false);

  useEffect(() => {
    if (!cartCleared) {
      clearCart();
      setCartCleared(true);
    }
  }, [clearCart, cartCleared]);

  const isSuccess = status === 'PAID';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
        {isSuccess ? (
          <>
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-emerald-500" />
            </div>
            <div>
              <h2 className="mt-4 text-3xl font-serif text-gray-900">Payment Successful!</h2>
              <p className="mt-3 text-sm text-gray-500">
                Your payment has been successfully processed. We are now preparing your order for shipment.
              </p>
              {orderId && (
                <p className="mt-2 text-xs text-gray-400 font-mono">
                  Gateway Ref: {orderId}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <Clock className="h-16 w-16 text-amber-500" />
            </div>
            <div>
              <h2 className="mt-4 text-3xl font-serif text-gray-900">Payment Pending</h2>
              <p className="mt-3 text-sm text-gray-500">
                Your payment status is currently {status || 'Unknown'}. We will update your order once the payment is confirmed.
              </p>
            </div>
          </>
        )}

        <div className="pt-6 border-t border-gray-100 mt-8 flex flex-col space-y-3">
          <Link
            href="/account/orders"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--forest)] hover:bg-[#233224] transition-colors"
          >
            View My Orders
          </Link>
          <Link
            href="/"
            className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="btn-spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
