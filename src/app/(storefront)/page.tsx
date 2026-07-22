import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getActiveProducts } from "@/lib/dal/products";

export default async function Home() {
  const products = await getActiveProducts();

  // Categorize products for different sections
  const nabhiOils = products.filter(p => p.category.toLowerCase().includes('nabhi')).slice(0, 4);
  const wellnessPacks = products.filter(p => p.category.toLowerCase().includes('pack')).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="bg-[#f9f9f9]">
      {/* 1. Hero Promotional Slider (Simplified as a single banner) */}
      <section className="relative w-full h-[60vh] md:h-[75vh] min-h-[500px] bg-[#E0EBDC]">
        <Image 
          src="/images/promo_banner_main_1784743880111.jpg" 
          alt="Ayurvedic Wellness Promotional Banner" 
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl border border-white/50">
              <span className="text-[#E88B23] text-sm font-bold uppercase tracking-widest mb-3 block">New Arrival</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A1A1A] leading-tight font-sans">
                The Nabhi Healing Collection
              </h1>
              <p className="text-base md:text-lg mb-8 text-gray-600 font-medium">
                Experience the ancient Ayurvedic practice of Nabhi Chikitsa (navel oiling). 
                Pure, cold-pressed therapeutic oils for holistic healing.
              </p>
              <Link href="/collections?category=nabhi" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider bg-[#4B7B3B] hover:bg-[#2D5A27] transition-all rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                Shop Nabhi Oils
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Category (Circular) */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 font-sans">Shop By Category</h2>
            <div className="w-24 h-1 bg-[#E88B23] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Discover our range of authentic Ayurvedic formulations designed for your specific wellness needs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { title: 'Nabhi Oils', img: '/images/category_nabhi_1784743910260.jpg', link: '/collections?category=nabhi' },
              { title: 'Hair Care', img: '/images/category_hair_1784743931871.jpg', link: '/collections?category=hair' },
              { title: 'Feet Wellness', img: '/images/category_feet_1784743921281.jpg', link: '/collections?category=feet' },
              { title: 'Value Packs', img: '/images/category_packs_1784743942477.jpg', link: '/wellness-packs' },
            ].map((cat, i) => (
              <Link href={cat.link} key={i} className="group flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden mb-6 bg-[#f9f9f9] shadow-md border-[6px] border-white group-hover:border-[#E88B23] transition-all duration-300 group-hover:shadow-xl">
                  <Image src={cat.img} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#4B7B3B] transition-colors">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Best Sellers Carousel */}
      {bestSellers.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F2F5F0]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 font-sans">Our Best Sellers</h2>
                <div className="w-24 h-1 bg-[#4B7B3B] md:mx-0 mx-auto rounded-full"></div>
              </div>
              <Link href="/collections" className="hidden md:inline-flex items-center text-[#4B7B3B] font-bold hover:text-[#2D5A27] transition-colors group">
                View All Products 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
              <Link href="/collections" className="inline-block w-full py-3 px-6 bg-white border-2 border-[#4B7B3B] text-[#4B7B3B] font-bold rounded-lg text-center uppercase tracking-wider">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. Promotional Banner (Secondary) */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image 
          src="/images/promo_banner_hair_1784743891781.jpg" 
          alt="Hair Wellness Promotion" 
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <span className="text-[#E88B23] text-sm font-bold uppercase tracking-widest mb-3 block">Back in Stock</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Revitalize Your Roots</h2>
              <p className="text-lg text-gray-200 mb-8 font-medium">
                Our award-winning Keshya Hair Oil is now back in stock. Infused with 21 potent herbs for strong, healthy hair.
              </p>
              <Link href="/hair-wellness" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#1A1A1A] uppercase tracking-wider bg-white hover:bg-[#E88B23] hover:text-white transition-all rounded-lg shadow-lg">
                Shop Hair Wellness
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Nabhi Oils Section */}
      {nabhiOils.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 font-sans">Nabhi Chikitsa Essentials</h2>
              <div className="w-24 h-1 bg-[#E88B23] mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Targeted wellness through the ancient science of navel oiling.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {nabhiOils.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Why Choose Us (Trust Markers) */}
      <section className="py-16 bg-[#2D5A27] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {[
              { title: "100% Authentic", desc: "Formulated using classical Ayurvedic texts.", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
              { title: "Secure Payments", desc: "Safe & encrypted checkout process.", icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/> },
              { title: "Quality Tested", desc: "Rigorous lab testing for purity and safety.", icon: <path d="M5 12l5 5L20 7"/> },
              { title: "Fast Shipping", desc: "Express delivery across India.", icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-[#E88B23]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-200 opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}