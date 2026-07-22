import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t-[6px] border-[#4B7B3B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <span className="text-2xl font-serif tracking-wide block mb-6 text-[#E88B23] font-bold">Ayurdhara</span>
            <p className="text-sm leading-relaxed text-gray-300 font-medium">
              Elevating Ayurvedic wellness with premium, natural formulations inspired by 5000 years of tradition. 100% organic, pure, and authentic.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 tracking-widest text-white uppercase">Shop Categories</h4>
            <div className="flex flex-col gap-4">
              <Link href="/collections?category=nabhi" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">Nabhi Oils</Link>
              <Link href="/collections?category=hair" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">Hair Wellness</Link>
              <Link href="/collections?category=feet" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">Feet Wellness</Link>
              <Link href="/collections?category=packs" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">Value Packs</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 tracking-widest text-white uppercase">Customer Care</h4>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">Contact Us</Link>
              <Link href="#" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">Shipping & Returns</Link>
              <Link href="#" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">Track Order</Link>
              <Link href="#" className="text-gray-400 hover:text-[#E88B23] text-sm font-medium transition-colors">FAQs</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 tracking-widest text-white uppercase">Stay Connected</h4>
            <p className="text-sm mb-4 text-gray-300 font-medium">Subscribe to receive updates, access to exclusive deals, and wellness tips.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded focus:outline-none focus:border-[#E88B23] transition-colors" 
              />
              <button className="w-full p-3 bg-[#E88B23] hover:bg-[#D67A18] text-white font-bold uppercase tracking-wider rounded transition-colors shadow-sm">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <span className="text-sm text-gray-500 font-medium">&copy; {new Date().getFullYear()} Ayurdhara Divya Shakti. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white text-sm font-medium transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm font-medium transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm font-medium transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
