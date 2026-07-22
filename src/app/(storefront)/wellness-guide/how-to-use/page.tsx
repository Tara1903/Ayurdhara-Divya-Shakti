import Link from 'next/link';

export default function WellnessGuideHowToUse() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="text-4xl font-serif font-bold text-[#2D5A27] mb-4">How to Use</h1>
        <p className="text-lg text-gray-600 mb-8">
          We are currently preparing detailed usage guides and traditional application methods for all our Ayurvedic products.
        </p>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-6">Our Ayurvedic experts are finalizing this content to ensure you get the most out of your wellness routine.</p>
          <Link href="/" className="inline-block px-8 py-3 bg-[#4B7B3B] text-white font-bold rounded-lg hover:bg-[#3a5d2d] transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
