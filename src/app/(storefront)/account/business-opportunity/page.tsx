'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BusinessOpportunityPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (!user) {
    // Should be caught by middleware normally, but just in case
    return <div className="p-8 text-center">Please login to view this page.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-charcoal mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Ayurdhara Divya Shakti Business Opportunity
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Partner with us to bring premium Ayurvedic wellness to the world. We offer three distinct pathways to grow your business, whether you're an individual enthusiast, a retail shop owner, or a large-scale distributor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wellness Partner Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-olive bg-opacity-10 rounded-full flex items-center justify-center mb-4 text-olive text-2xl">
            🤝
          </div>
          <h3 className="text-xl font-medium text-charcoal mb-2">Wellness Partner</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Recommend products using your unique QR and earn commissions on eligible sales. No stock needed.
          </p>
          <ul className="text-xs text-gray-500 mb-6 space-y-2 text-left w-full">
            <li className="flex items-center gap-2"><span>✓</span> <b>₹0</b> Opening Purchase</li>
            <li className="flex items-center gap-2"><span>✓</span> Referral QR & Link</li>
            <li className="flex items-center gap-2"><span>✓</span> Digital Wellness Kit</li>
          </ul>
          <Link href="/partner/wellness-signup" className="w-full bg-olive text-white py-2 rounded font-medium hover:bg-opacity-90 block">
            Join as Wellness Partner
          </Link>
        </div>

        {/* Retail Shop Partner Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gray-100 text-xs font-semibold px-3 py-1 rounded-bl-lg text-gray-600">POPULAR</div>
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600 text-2xl">
            🛍️
          </div>
          <h3 className="text-xl font-medium text-charcoal mb-2">Retail Shop Partner</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Stock premium wellness products in your physical store and access wholesale pricing.
          </p>
          <ul className="text-xs text-gray-500 mb-6 space-y-2 text-left w-full">
            <li className="flex items-center gap-2"><span>✓</span> <b>₹10,000</b> Opening Purchase</li>
            <li className="flex items-center gap-2"><span>✓</span> Wholesale Pricing</li>
            <li className="flex items-center gap-2"><span>✓</span> Customer Shop QR</li>
          </ul>
          <Link href="/partner/retailer-signup" className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90 block">
            Join as Retail Partner
          </Link>
        </div>

        {/* Distributor Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-purple-600 text-2xl">
            📦
          </div>
          <h3 className="text-xl font-medium text-charcoal mb-2">Distributor</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Build and manage a retailer network in your approved area with bulk distribution discounts.
          </p>
          <ul className="text-xs text-gray-500 mb-6 space-y-2 text-left w-full">
            <li className="flex items-center gap-2"><span>✓</span> <b>₹50,000</b> Opening Purchase</li>
            <li className="flex items-center gap-2"><span>✓</span> Bulk Orders</li>
            <li className="flex items-center gap-2"><span>✓</span> Area Management</li>
          </ul>
          <Link href="/partner/distributor-signup" className="w-full bg-charcoal text-white py-2 rounded font-medium hover:bg-opacity-90 block">
            Become a Distributor
          </Link>
        </div>

      </div>
      
      <div className="mt-12 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 text-center">
        <p>Partner status is subject to verification and company approval where applicable.</p>
        <p>Minimum purchase requirements apply only to Retail Shop and Distributor accounts as stated above.</p>
        <p className="mt-2 text-olive">Already registered as a partner? <Link href="/partner/login" className="underline font-semibold">Login to your Partner Dashboard</Link></p>
      </div>
    </div>
  );
}
