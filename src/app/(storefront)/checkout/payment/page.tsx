'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'UNKNOWN';
  const amount = searchParams.get('amount') || '0.00';
  const upiId = 'ayurdhara@upi';
  
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [status, setStatus] = useState('PENDING_PAYMENT');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate realtime listener
  useEffect(() => {
    if (status === 'CONFIRMED') {
      router.push(`/order-confirmation?orderId=${orderId}`);
    }
  }, [status, router, orderId]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Scan to Pay</h2>
          <p className="mt-2 text-sm text-gray-500 font-mono">Order ID: {orderId}</p>
        </div>

        <div className="flex justify-center mt-8">
            <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-xl border border-gray-200">
                <span className="text-gray-400 font-medium">Dynamic QR Code</span>
            </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-3xl font-bold text-[#81C784]">₹{amount}</p>
          <p className="text-sm text-gray-600 mt-2 font-medium">UPI ID: {upiId}</p>
        </div>

        <div className="mt-8 text-center bg-gray-50 rounded-lg py-3">
          <p className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-800'}`}>
            Waiting for payment... {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => alert("Manual Verification flow triggered.")}
            className="w-full flex justify-center py-3 px-4 border-2 border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#81C784] transition-colors"
          >
            I have paid, but status is pending
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PaymentContent />
        </Suspense>
    );
}