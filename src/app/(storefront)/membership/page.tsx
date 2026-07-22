import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="text-4xl font-serif font-bold text-[#2D5A27] mb-4">Gold Membership</h1>
        <p className="text-lg text-gray-600 mb-8">
          Exclusive benefits, lifetime discounts, and free shipping for our most valued members.
        </p>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
          <p className="text-gray-500 mb-6">Our premium membership program is currently being finalized.</p>
          <Link href="/" className="inline-block px-8 py-3 bg-[#4B7B3B] text-white font-bold rounded-lg hover:bg-[#3a5d2d] transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
