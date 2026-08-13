import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ChevronRight,
  Store,
  Users,
  User,
  ShoppingBag,
  Truck,
  ShieldCheck,
  QrCode,
  Wallet,
  Share2,
  IndianRupee,
  BarChart3,
  ArrowDown,
  Smartphone,
  Package,
  Star,
} from 'lucide-react';

export const metadata = {
  title: 'Business Opportunity | Ayurdhara Divya Shakti',
  description:
    'Build your wellness business with Ayurdhara Divya Shakti. Become a Wellness Partner, Retail Shop, or Distributor today.',
};

// ── reusable primitives ───────────────────────────────────────────────────────
function SectionHeading({ tag, title, sub }: { tag?: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {tag && (
        <span className="inline-block py-1 px-4 rounded-full bg-[#E88B23]/10 text-[#E88B23] text-xs font-bold tracking-widest uppercase mb-4 border border-[#E88B23]/20">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">{title}</h2>
      {sub && <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center my-1">
      <ArrowDown size={18} className="text-[#E88B23]" />
    </div>
  );
}

function FlowBox({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div
      className={`px-6 py-3 rounded-xl font-bold text-sm tracking-wide text-center ${
        accent
          ? 'bg-[#E88B23] text-white shadow-lg shadow-[#E88B23]/20'
          : 'bg-white border border-gray-200 text-[#2D5A27]'
      }`}
    >
      {children}
    </div>
  );
}

// ── partner margin table data ─────────────────────────────────────────────────
const marginRows = [
  { type: 'Individual Products', partner: '3%', shop: '5%', total: '8%' },
  { type: 'Trial Packs', partner: '10%', shop: '20%', total: '30%' },
  { type: 'Gold Packs', partner: '12%', shop: '24%', total: '36%' },
  { type: 'Premium Pack', partner: '15%', shop: '30%', total: '45%' },
];

// ── earning example rows ──────────────────────────────────────────────────────
const earningExamples = [
  { product: 'Individual 10 ml', offer: '₹199', pct: '3%', partner: '≈ ₹6' },
  { product: 'Individual 20 ml', offer: '₹349', pct: '3%', partner: '≈ ₹10' },
  { product: 'Trial Pack', offer: '₹499', pct: '10%', partner: '≈ ₹50' },
  { product: 'Gold Pack', offer: '₹2,199', pct: '12%', partner: '≈ ₹264' },
  { product: 'Premium Pack', offer: '₹3,999', pct: '15%', partner: '≈ ₹600' },
  { product: 'Feet Oil 30 ml', offer: '₹399', pct: '3%', partner: '≈ ₹12' },
  { product: 'Feet Oil 100 ml', offer: '₹1,199', pct: '3%', partner: '≈ ₹36' },
  { product: 'Hair Oil 50 ml', offer: '₹499', pct: '3%', partner: '≈ ₹15' },
];

// ── partner-type card data ────────────────────────────────────────────────────
const partnerCards = [
  {
    icon: <Users size={28} />,
    emoji: '🤝',
    title: 'Wellness Referral Partner',
    tagline: 'Share Wellness. Build Your Network. Earn on Eligible Sales.',
    desc: 'Stock rakhe bina Ayurdhara Divya Shakti ke wellness products apne friends, family aur personal network tak recommend karein.',
    bestFor: 'Individuals and wellness promoters',
    needsStock: false,
    benefits: [
      'No mandatory physical shop',
      'No mandatory inventory for referral-only activity',
      'Unique Partner ID & QR',
      'Personal Referral Link',
      'Digital Wellness Kit',
      'Partner Wallet & Earnings History',
      'WhatsApp Sharing & Digital Materials',
      'Order Tracking Dashboard',
    ],
    earning: ['3% Individual', '10% Trial', '12% Gold', '15% Premium'],
    cta: 'Join as Wellness Partner',
    ctaHref: '/partner/wellness-signup',
    color: 'amber',
  },
  {
    icon: <Store size={28} />,
    emoji: '🛍️',
    title: 'Retail Shop Partner',
    tagline: 'Apni Shop par Ayurdhara Divya Shakti ko Display Karein.',
    desc: 'Existing retail shops apne customers ko premium wellness products provide kar sakti hain aur approved retail margin earn kar sakti hain.',
    bestFor: 'Existing retail shops',
    needsStock: true,
    benefits: [
      'Approved retail margin',
      'Unique Shop ID & Shop QR',
      'Customer gets 2% extra QR discount',
      'Digital Wellness Kit',
      'Sales & Attribution Tracking',
      'Partner Wallet & Earnings',
      'WhatsApp Product Sharing',
      'Repeat Customer Opportunity',
    ],
    earning: ['Approved retail margin per product type'],
    cta: 'Join as Retail Shop Partner',
    ctaHref: '/partner/retailer-signup',
    color: 'green',
  },
  {
    icon: <Truck size={28} />,
    emoji: '📦',
    title: 'Distributor Partner',
    tagline: 'Apne Area Mein Wellness Distribution Network Build Karein.',
    desc: 'Approved distributors Ayurdhara Divya Shakti products ko retail shops aur approved sales channels tak distribute karenge.',
    bestFor: 'Bulk distribution and retail network',
    needsStock: true,
    benefits: [
      'Distributor pricing (admin-controlled)',
      'Bulk purchase opportunity',
      'Build retail network in your area',
      'Distributor Dashboard',
      'Retailer Management Tools',
      'Stock & Order Tracking',
      'Wallet & Earnings Tracking',
      'Repeat Order Opportunity',
    ],
    earning: ['Admin-controlled distributor margin'],
    cta: 'Become a Distributor',
    ctaHref: '/partner/distributor-signup',
    color: 'dark',
  },
];

// ── pack data ─────────────────────────────────────────────────────────────────
const individualPacks = [
  {
    label: 'Trial Wellness Pack',
    offer: '₹499',
    mrp: '₹749',
    contents: '10 ml Nabhi + 30 ml Feet',
    duration: 'Up to 1 Month',
    partner: '10% ≈ ₹50',
    shop: '20% ≈ ₹100',
    channel: '30% ≈ ₹150',
  },
  {
    label: 'Gold Wellness Pack',
    offer: '₹2,199',
    mrp: '₹2,999',
    contents: '4×10 ml Nabhi + 100 ml Feet',
    duration: 'Up to 4 Months',
    partner: '12% ≈ ₹264',
    shop: '24% ≈ ₹528',
    channel: '36% ≈ ₹792',
  },
  {
    label: 'Premium Wellness Pack',
    offer: '₹3,999',
    mrp: '₹5,499',
    contents: '4×20 ml Nabhi + 200 ml Feet',
    duration: 'Up to 8 Months',
    partner: '15% ≈ ₹600',
    shop: '30% ≈ ₹1,200',
    channel: '45% ≈ ₹1,800',
  },
];

const familyTrialPacks = [
  { members: 2, offer: '₹899', mrp: '₹1,499', partner: '≈ ₹90', shop: '≈ ₹180', channel: '≈ ₹270' },
  { members: 3, offer: '₹1,299', mrp: '₹2,249', partner: '≈ ₹130', shop: '≈ ₹260', channel: '≈ ₹390' },
  { members: 4, offer: '₹1,699', mrp: '₹2,999', partner: '≈ ₹170', shop: '≈ ₹340', channel: '≈ ₹510' },
  { members: 5, offer: '₹2,099', mrp: '₹3,749', partner: '≈ ₹210', shop: '≈ ₹420', channel: '≈ ₹630' },
];

const familyGoldPacks = [
  { members: 2, offer: '₹3,999', mrp: '₹5,499', partner: '≈ ₹480', shop: '≈ ₹960', channel: '≈ ₹1,440' },
  { members: 3, offer: '₹5,799', mrp: '₹8,249', partner: '≈ ₹696', shop: '≈ ₹1,392', channel: '≈ ₹2,088' },
  { members: 4, offer: '₹7,499', mrp: '₹10,999', partner: '≈ ₹900', shop: '≈ ₹1,800', channel: '≈ ₹2,700' },
  { members: 5, offer: '₹8,999', mrp: '₹13,749', partner: '≈ ₹1,080', shop: '≈ ₹2,160', channel: '≈ ₹3,240' },
];

const oilProducts = [
  { name: 'Feet Massage Oil 30 ml', offer: '₹399', mrp: '₹599', partner: '≈ ₹12', shop: '≈ ₹20', channel: '≈ ₹32' },
  { name: 'Feet Massage Oil 100 ml', offer: '₹1,199', mrp: '₹1,799', partner: '≈ ₹36', shop: '≈ ₹60', channel: '≈ ₹96' },
  { name: 'Feet Massage Oil 200 ml', offer: '₹2,199', mrp: '₹3,299', partner: '≈ ₹66', shop: '≈ ₹110', channel: '≈ ₹176' },
  { name: 'Hair Wellness Oil 50 ml', offer: '₹499', mrp: '₹699', partner: '≈ ₹15', shop: '≈ ₹25', channel: '≈ ₹40' },
  { name: 'Hair Wellness Oil 100 ml', offer: '₹899', mrp: '₹1,299', partner: '≈ ₹27', shop: '≈ ₹45', channel: '≈ ₹72' },
  { name: 'Hair Wellness Oil 200 ml', offer: '₹1,799', mrp: '₹2,499', partner: '≈ ₹54', shop: '≈ ₹90', channel: '≈ ₹144' },
];

// ── application form fields ───────────────────────────────────────────────────
const formFields = [
  { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name', half: false },
  { id: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: '+91 XXXXX XXXXX', half: true },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', half: true },
  { id: 'city', label: 'City', type: 'text', placeholder: 'City', half: true },
  { id: 'state', label: 'State', type: 'text', placeholder: 'State', half: true },
  { id: 'shopName', label: 'Shop Name (if applicable)', type: 'text', placeholder: 'Leave blank if not applicable', half: false },
  { id: 'address', label: 'Address', type: 'text', placeholder: 'Full address', half: false },
  { id: 'area', label: 'Preferred Area / Territory', type: 'text', placeholder: 'Area / City / District', half: true },
  { id: 'referral', label: 'Referral / Partner Code', type: 'text', placeholder: 'If referred by a partner', half: true },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function BusinessOpportunityPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] font-sans pb-24">

      {/* ── 1. HERO ── */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#2D5A27] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E88B23] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#4B7B3B] blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20">
            🌿 Grow With Ayurdhara Divya Shakti
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            Build Your Ayurdhara Divya Shakti Wellness Business
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
            Apni Shop, Distribution Network ya Personal Network ko Wellness Business Opportunity mein Transform Karein.
          </p>
          <p className="text-sm md:text-base text-white/60 mb-10 tracking-widest font-semibold uppercase">
            Simple &nbsp;•&nbsp; Transparent &nbsp;•&nbsp; Sales-Based &nbsp;•&nbsp; Digital Partner System
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/partner/wellness-signup" className="w-full sm:w-auto px-8 py-4 bg-[#E88B23] hover:bg-[#cc7a1f] text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#E88B23]/30">
              🤝 Join as Wellness Partner
            </Link>
            <Link href="/partner/distributor-signup" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
              📦 Become a Distributor
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/partner/login" className="flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm border-b border-white/20 hover:border-white/50 pb-0.5 transition-colors">
              <User size={16} />
              Already a Partner? Log in to your Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. THREE PARTNER CARDS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            tag="Choose Your Path"
            title="Three Ways to Grow With Us"
            sub="Pick the partner model that fits your lifestyle, resources, and goals."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerCards.map((card, idx) => {
              const isAmber = card.color === 'amber';
              const isDark = card.color === 'dark';
              return (
                <div
                  key={idx}
                  className={`rounded-3xl p-8 relative overflow-hidden shadow-xl border flex flex-col transition-transform hover:-translate-y-1 ${
                    isAmber
                      ? 'bg-[#E88B23]/8 border-[#E88B23]/30'
                      : isDark
                      ? 'bg-[#2D5A27] border-[#1A3816] text-white'
                      : 'bg-[#f8faf8] border-[#4B7B3B]/20'
                  }`}
                >
                  {isAmber && (
                    <div className="absolute top-4 right-4 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Flexible
                    </div>
                  )}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                      isAmber ? 'bg-[#E88B23]/15 text-[#E88B23]' : isDark ? 'bg-white/10 text-white' : 'bg-white text-[#4B7B3B] shadow-sm'
                    }`}
                  >
                    {card.icon}
                  </div>
                  <div className="text-2xl mb-1">{card.emoji}</div>
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-[#2D5A27]'}`}>{card.title}</h3>
                  <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-[#E88B23]' : 'text-[#E88B23]'}`}>{card.tagline}</p>
                  <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>{card.desc}</p>

                  <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-white/50' : 'text-gray-400'}`}>Benefits</div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {card.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          size={15}
                          className={`flex-shrink-0 mt-0.5 ${isAmber ? 'text-[#E88B23]' : isDark ? 'text-[#E88B23]' : 'text-[#4B7B3B]'}`}
                        />
                        <span className={isDark ? 'text-white/85' : 'text-gray-700'}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {card.earning.length > 0 && (
                    <div className={`rounded-xl p-4 mb-6 ${isDark ? 'bg-white/10' : 'bg-white border border-gray-100'}`}>
                      <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
                        Earning Structure
                      </div>
                      {card.color === 'amber' ? (
                        <div className="grid grid-cols-2 gap-2">
                          {[['Individual', '3%'], ['Trial', '10%'], ['Gold', '12%'], ['Premium', '15%']].map(([label, val]) => (
                            <div key={label} className="text-center bg-[#E88B23]/10 rounded-lg py-2 px-1">
                              <div className="text-[#E88B23] font-black text-lg">{val}</div>
                              <div className="text-gray-600 text-xs font-semibold">{label}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        card.earning.map((e, i) => (
                          <div key={i} className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#2D5A27]'}`}>
                            {e}
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  <Link
                    href={card.ctaHref}
                    className={`block w-full py-3.5 text-center rounded-xl font-bold transition-colors text-sm shadow-md ${
                      isAmber
                        ? 'bg-[#E88B23] text-white hover:bg-[#cc7a1f]'
                        : isDark
                        ? 'bg-white text-[#2D5A27] hover:bg-gray-50'
                        : 'bg-[#2D5A27] text-white hover:bg-[#1A3816]'
                    }`}
                  >
                    {card.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            tag="The Process"
            title="How It Works"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E88B23] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">01</div>
              <Users size={48} className="mx-auto text-[#4B7B3B] mb-6 mt-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">JOIN</h3>
              <p className="text-gray-600">Become an approved Ayurdhara Divya Shakti Partner.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E88B23] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">02</div>
              <Share2 size={48} className="mx-auto text-[#4B7B3B] mb-6 mt-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">SHARE</h3>
              <p className="text-gray-600">Share genuine wellness products through your retail shop or partner link.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E88B23] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">03</div>
              <Wallet size={48} className="mx-auto text-[#4B7B3B] mb-6 mt-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">EARN</h3>
              <p className="text-gray-600">Receive eligible rewards and margins from successful product purchases.</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 italic">
            "Rewards are linked to genuine product sales. Recruitment alone does not generate commission."
          </p>
        </div>
      </section>

      {/* ── 4. BUSINESS FLOW DIAGRAM ── */}
      <section className="py-16 bg-[#f8faf8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            tag="How It Works"
            title="Business Distribution Flow"
            sub="See how products reach customers through every approved channel."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Flow A */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="text-sm font-bold text-[#2D5A27] tracking-widest uppercase mb-6">
                Distribution Channel
              </div>
              <FlowBox accent>🏭 Company</FlowBox>
              <FlowArrow />
              <FlowBox>📦 Distributor</FlowBox>
              <FlowArrow />
              <FlowBox>🛍️ Retail Shop</FlowBox>
              <FlowArrow />
              <FlowBox>👤 Customer</FlowBox>
            </div>

            {/* Flow B */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="text-sm font-bold text-[#2D5A27] tracking-widest uppercase mb-6">
                Referral Channel
              </div>
              <FlowBox accent>🏭 Company</FlowBox>
              <FlowArrow />
              <FlowBox>🤝 Wellness Partner</FlowBox>
              <FlowArrow />
              <FlowBox>👤 Customer Orders</FlowBox>
              <FlowArrow />
              <FlowBox>💰 Partner Wallet</FlowBox>
            </div>

            {/* Flow C */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="text-sm font-bold text-[#2D5A27] tracking-widest uppercase mb-6">
                Shop QR Channel
              </div>
              <FlowBox>🛍️ Shop QR Scanned</FlowBox>
              <FlowArrow />
              <FlowBox accent>🌐 Ayurdhara Website</FlowBox>
              <FlowArrow />
              <FlowBox>🏷️ 2% Extra Customer Discount</FlowBox>
              <FlowArrow />
              <FlowBox>✅ Order → Shop Wallet</FlowBox>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PARTNER MARGIN SUMMARY TABLE ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <SectionHeading
            tag="Margin Structure"
            title="Final Approved Partner Margin Ladder"
            sub="Percentages are calculated on Customer Offer Price. Total Channel Margin is the combined approved channel margin across distributor / retailer channel."
          />

          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2D5A27] text-white">
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider">Product Type</th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider text-center text-[#E88B23]">
                    🤝 Wellness Partner
                  </th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider text-center">
                    🛍️ Shopkeeper
                  </th>
                  <th className="py-5 px-6 font-bold text-sm uppercase tracking-wider text-center">
                    📊 Total Channel
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {marginRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8faf8] transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-800">{row.type}</td>
                    <td className="py-4 px-6 text-center font-black text-[#E88B23] text-xl">{row.partner}</td>
                    <td className="py-4 px-6 text-center font-bold text-[#4B7B3B] text-xl">{row.shop}</td>
                    <td className="py-4 px-6 text-center font-bold text-[#2D5A27] text-xl">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="text-[#E88B23] flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-[#E88B23]">Important:</strong> "Total Channel Margin" means the combined approved channel margin available across the distributor/retailer channel. Do NOT automatically treat the total channel percentage as the individual distributor earning. Distributor purchase prices must always respect the company's approved minimum realization.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. WELLNESS PARTNER EARNING EXAMPLES ── */}
      <section className="py-20 bg-[#f8faf8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <SectionHeading
            tag="Partner Earnings"
            title="Wellness Referral Partner — Earning Examples"
            sub="Based on actual eligible product sales. Actual wallet earning is credited only after eligible order confirmation per company rules."
          />

          <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#f8faf8] text-[#2D5A27]">
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-left border-b border-gray-100">Product</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-center border-b border-gray-100">Customer Offer</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-center border-b border-gray-100">Partner %</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-center border-b border-gray-100 text-[#E88B23]">Partner Earning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {earningExamples.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8faf8]">
                    <td className="py-3 px-5 font-semibold text-gray-800">{row.product}</td>
                    <td className="py-3 px-5 text-center font-medium text-gray-700">{row.offer}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#4B7B3B]">{row.pct}</td>
                    <td className="py-3 px-5 text-center font-black text-[#E88B23] text-base">{row.partner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. WELLNESS PACKS PARTNER BREAKDOWN ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            tag="Product Channel Margins"
            title="Pack-wise Partner & Channel Breakdown"
            sub="All percentages are calculated on Customer Offer Price. Company minimum realization is always protected."
          />

          {/* Individual Packs */}
          <h3 className="text-xl font-bold text-[#2D5A27] mb-5 mt-2">🌱 Individual Wellness Packs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {individualPacks.map((p, idx) => (
              <div key={idx} className="bg-[#f8faf8] rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="font-bold text-[#2D5A27] text-base mb-1">{p.label}</div>
                <div className="text-xs text-gray-500 mb-1">{p.contents}</div>
                <div className="text-xs text-gray-400 mb-4">{p.duration}</div>
                <div className="flex gap-2 items-baseline mb-4">
                  <span className="text-2xl font-black text-[#2D5A27]">{p.offer}</span>
                  <span className="text-sm line-through text-gray-400">{p.mrp}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">🤝 Partner</span><span className="font-bold text-[#E88B23]">{p.partner}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">🛍️ Shopkeeper</span><span className="font-bold text-[#4B7B3B]">{p.shop}</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-2"><span className="text-gray-500">📊 Total Channel</span><span className="font-bold text-[#2D5A27]">{p.channel}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Family Trial Packs */}
          <h3 className="text-xl font-bold text-[#2D5A27] mb-5">👨‍👩‍👧‍👦 Family Trial Wellness Packs (10% / 20% / 30%)</h3>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white mb-12">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#f8faf8]">
                  <th className="py-3 px-5 text-left font-bold text-[#2D5A27] border-b border-gray-100">Pack</th>
                  <th className="py-3 px-5 text-center font-bold text-[#2D5A27] border-b border-gray-100">Offer</th>
                  <th className="py-3 px-5 text-center font-bold text-[#E88B23] border-b border-gray-100">Partner 10%</th>
                  <th className="py-3 px-5 text-center font-bold text-[#4B7B3B] border-b border-gray-100">Shop 20%</th>
                  <th className="py-3 px-5 text-center font-bold text-[#2D5A27] border-b border-gray-100">Channel 30%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {familyTrialPacks.map((p, i) => (
                  <tr key={i} className="hover:bg-[#f8faf8]">
                    <td className="py-3 px-5 font-semibold text-gray-800">{p.members} Member Family Trial</td>
                    <td className="py-3 px-5 text-center font-bold text-gray-800">{p.offer}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#E88B23]">{p.partner}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#4B7B3B]">{p.shop}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#2D5A27]">{p.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Family Gold Packs */}
          <h3 className="text-xl font-bold text-[#2D5A27] mb-5">🟡 Family Gold Wellness Packs (12% / 24% / 36%)</h3>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white mb-12">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#f8faf8]">
                  <th className="py-3 px-5 text-left font-bold text-[#2D5A27] border-b border-gray-100">Pack</th>
                  <th className="py-3 px-5 text-center font-bold text-[#2D5A27] border-b border-gray-100">Offer</th>
                  <th className="py-3 px-5 text-center font-bold text-[#E88B23] border-b border-gray-100">Partner 12%</th>
                  <th className="py-3 px-5 text-center font-bold text-[#4B7B3B] border-b border-gray-100">Shop 24%</th>
                  <th className="py-3 px-5 text-center font-bold text-[#2D5A27] border-b border-gray-100">Channel 36%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {familyGoldPacks.map((p, i) => (
                  <tr key={i} className="hover:bg-[#f8faf8]">
                    <td className="py-3 px-5 font-semibold text-gray-800">{p.members} Member Family Gold</td>
                    <td className="py-3 px-5 text-center font-bold text-gray-800">{p.offer}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#E88B23]">{p.partner}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#4B7B3B]">{p.shop}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#2D5A27]">{p.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Feet + Hair Oils */}
          <h3 className="text-xl font-bold text-[#2D5A27] mb-5">👣🌿 Feet & Hair Wellness Oils (3% / 5% / 8%)</h3>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100 bg-white">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#f8faf8]">
                  <th className="py-3 px-5 text-left font-bold text-[#2D5A27] border-b border-gray-100">Product</th>
                  <th className="py-3 px-5 text-center font-bold text-[#2D5A27] border-b border-gray-100">Offer</th>
                  <th className="py-3 px-5 text-center font-bold text-[#E88B23] border-b border-gray-100">Partner 3%</th>
                  <th className="py-3 px-5 text-center font-bold text-[#4B7B3B] border-b border-gray-100">Shop 5%</th>
                  <th className="py-3 px-5 text-center font-bold text-[#2D5A27] border-b border-gray-100">Channel 8%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {oilProducts.map((p, i) => (
                  <tr key={i} className="hover:bg-[#f8faf8]">
                    <td className="py-3 px-5 font-semibold text-gray-800">{p.name}</td>
                    <td className="py-3 px-5 text-center font-bold text-gray-800">{p.offer}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#E88B23]">{p.partner}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#4B7B3B]">{p.shop}</td>
                    <td className="py-3 px-5 text-center font-bold text-[#2D5A27]">{p.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 7. QR & DIGITAL SYSTEM ── */}
      <section className="py-20 bg-[#f8faf8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            tag="Digital System"
            title="Partner QR & Digital Wellness Kit"
            sub="Every approved partner gets a fully digital toolkit to start sharing and earning."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wellness Partner QR */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#E88B23]/10 rounded-2xl flex items-center justify-center text-[#E88B23] mb-5">
                <QrCode size={24} />
              </div>
              <h3 className="font-bold text-[#2D5A27] text-lg mb-2">🤝 Wellness Partner QR System</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Every Wellness Referral Partner receives a <strong>Unique Partner ID</strong>, <strong>Unique QR Code</strong>, and <strong>Personal Referral Link</strong>.
              </p>
              <div className="bg-[#f8faf8] rounded-xl p-4 text-sm space-y-2 mb-5">
                <div className="font-mono text-[#2D5A27] font-bold">PARTNER ID: ADS-WP-0001</div>
                <div className="text-gray-500 text-xs">e.g. ayurdhara.in/?ref=ADS-WP-0001</div>
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                {['Partner Attribution', 'Customer Shopping', 'Eligible Order', 'Partner Wallet Credit', 'Full Transaction History'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#E88B23]/10 text-[#E88B23] font-bold text-xs flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shop QR */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#4B7B3B]/10 rounded-2xl flex items-center justify-center text-[#4B7B3B] mb-5">
                <Store size={24} />
              </div>
              <h3 className="font-bold text-[#2D5A27] text-lg mb-2">🛍️ Shop QR System</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Every approved Shop Partner gets a unique Shop QR. When customers scan it, they receive <strong className="text-[#E88B23]">2% Extra Discount</strong> on eligible purchases — automatically attributed to your shop.
              </p>
              <div className="bg-[#4B7B3B]/5 border border-[#4B7B3B]/20 rounded-xl p-4 text-sm space-y-2 mb-5">
                <div className="font-mono text-[#2D5A27] font-bold">SHOP ID: ADS-SHOP-0001</div>
                <div className="text-[#4B7B3B] font-semibold text-xs">✅ Customer Benefit: 2% Extra QR Discount</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Shop QR', 'Get My Shop QR', 'Download Digital Kit', 'Share Catalog', 'Open Partner Dashboard', 'WhatsApp Share'].map((btn, i) => (
                  i === 0 ? null : (
                    <Link key={i} href="#apply" className="text-center py-2 px-3 rounded-xl border border-[#2D5A27]/20 text-[#2D5A27] text-xs font-bold hover:bg-[#2D5A27] hover:text-white transition-colors">
                      {btn}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. PARTNER WALLET ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            tag="Partner Wallet"
            title="Secure Partner Wallet & Earnings Tracker"
            sub="Every approved partner gets a secure wallet that automatically tracks orders, attributions, and eligible earnings."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Wallet UI mockup */}
            <div className="bg-[#2D5A27] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Wallet size={24} className="text-[#E88B23]" />
                  <span className="font-bold text-lg">Partner Wallet</span>
                </div>
                <div className="text-sm text-white/60 mb-1">Available Balance</div>
                <div className="text-4xl font-black text-[#E88B23] mb-6">₹0.00</div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Pending Earnings', val: '₹0' },
                    { label: 'Approved Earnings', val: '₹0' },
                    { label: 'Total Earned', val: '₹0' },
                    { label: 'Withdrawable', val: '₹0' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-3">
                      <div className="text-xs text-white/60 mb-1">{item.label}</div>
                      <div className="font-bold text-white">{item.val}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-xs text-white/60 mb-3 font-bold uppercase tracking-wider">Transaction Statuses</div>
                  <div className="flex flex-wrap gap-2">
                    {['Pending', 'Approved', 'Cancelled', 'Refunded', 'Paid'].map((s, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet features */}
            <div>
              <h3 className="text-2xl font-bold text-[#2D5A27] mb-6">What Your Wallet Tracks</h3>
              <div className="space-y-4">
                {[
                  { icon: <BarChart3 size={18} />, title: 'Order Attribution', desc: 'Every order linked to your Partner ID, Shop ID, or Referral Link.' },
                  { icon: <IndianRupee size={18} />, title: 'Earning Calculation', desc: 'Automatically calculated on eligible confirmed orders.' },
                  { icon: <ShieldCheck size={18} />, title: 'Protected Payouts', desc: 'No earnings credited for cancelled, returned, or refunded orders.' },
                  { icon: <Smartphone size={18} />, title: 'Full History', desc: 'Order ID, date, product, amount, reward, and status visible anytime.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-[#f8faf8] rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-[#E88B23]/10 text-[#E88B23] flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-[#2D5A27] text-sm mb-1">{item.title}</div>
                      <div className="text-gray-600 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. DISTRIBUTOR SECTION ── */}
      <section className="py-20 bg-[#f8faf8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            tag="Distributor Program"
            title="📦 Distributor Partner Dashboard"
            sub="Build and manage a retail network in your approved area. Distributor pricing is always admin-controlled — never auto-calculated."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-6">
                <h3 className="font-bold text-[#2D5A27] text-lg mb-5">Distributor Dashboard Includes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Distributor ID', 'Approved Area', 'Bulk Orders', 'Stock Tracking', 'Retailer Network', 'Sales Reports', 'Purchase History', 'Earnings Wallet', 'Product Catalog', 'Support'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-[#4B7B3B] flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="font-bold text-[#2D5A27] mb-2 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#E88B23]" />
                  Pricing Control Rule
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Distributor prices are <strong>NOT</strong> calculated merely by applying the total channel margin. All distributor prices are admin-controlled and must always maintain the Company's approved minimum realization.
                </p>
              </div>
            </div>

            <div className="bg-[#2D5A27] rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold text-white text-lg mb-6">Pricing Chain (Example — Trial Pack)</h3>
              <div className="space-y-3">
                {[
                  { label: 'Customer Offer Price', val: '₹499', highlight: false },
                  { label: 'Company Min. Realization', val: '₹350', highlight: false },
                  { label: 'Distributor Purchase Price', val: '₹400*', highlight: true },
                  { label: 'Retailer Purchase Price', val: '₹400*', highlight: false },
                  { label: 'Retailer Gross Margin', val: '≈ ₹99', highlight: false },
                  { label: 'Distributor Gross Margin', val: '≈ ₹50', highlight: false },
                ].map((item, i) => (
                  <div key={i} className={`flex justify-between items-center py-2 border-b border-white/10 text-sm ${item.highlight ? 'text-[#E88B23] font-bold' : 'text-white/80'}`}>
                    <span>{item.label}</span>
                    <span className={`font-bold ${item.highlight ? 'text-[#E88B23]' : 'text-white'}`}>{item.val}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/50 mt-4">* Distributor prices are set by admin. Do not treat total channel margin as distributor individual earning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. WHY JOIN ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            tag="Why Ayurdhara"
            title="Why Build Your Business With Us?"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={22} />, title: 'Transparent & Honest', desc: 'No MLM, no hidden fees, no fake income promises. Pure sales-based earnings.' },
              { icon: <Package size={22} />, title: 'Premium Ayurvedic Products', desc: 'Authentic, 100% natural wellness products customers genuinely love.' },
              { icon: <QrCode size={22} />, title: 'Digital-First System', desc: 'Unique QR, referral links, digital kit — everything designed for mobile.' },
              { icon: <Wallet size={22} />, title: 'Secure Partner Wallet', desc: 'Automated wallet crediting, full transaction history, easy withdrawals.' },
              { icon: <Star size={22} />, title: 'Free to Join (Referral)', desc: 'Zero joining fee for Wellness Referral Partners. No stock required.' },
              { icon: <Users size={22} />, title: 'Growing Community', desc: 'Join a network of wellness partners across India building a healthier future.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#f8faf8] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-2xl bg-[#E88B23]/10 flex items-center justify-center text-[#E88B23] mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#2D5A27] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. APPLICATION FORM ── */}
      <section id="apply" className="py-20 bg-[#f8faf8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <SectionHeading
            tag="Apply Now"
            title="Partner Application"
            sub="Submit your application below. Admin review is required before activation. You will receive confirmation after approval."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Wellness Partner Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#2D5A27] bg-opacity-10 rounded-full flex items-center justify-center mb-4 text-[#2D5A27] text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Wellness Partner</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Recommend products using your unique QR and earn commissions on eligible sales. No stock needed.
              </p>
              <ul className="text-xs text-gray-500 mb-6 space-y-2 text-left w-full">
                <li className="flex items-center gap-2"><span>✓</span> <b>₹0</b> Opening Purchase</li>
                <li className="flex items-center gap-2"><span>✓</span> Referral QR & Link</li>
                <li className="flex items-center gap-2"><span>✓</span> Digital Wellness Kit</li>
              </ul>
              <Link href="/partner/wellness-signup" className="w-full bg-white text-[#2D5A27] border border-[#2D5A27] py-2 rounded font-bold hover:bg-gray-50 block transition-colors">
                Join as Wellness Partner
              </Link>
            </div>

            {/* Retail Shop Partner Card */}
            <div className="bg-white rounded-xl shadow-md border-2 border-[#E88B23] p-6 flex flex-col items-center text-center relative overflow-hidden transform scale-105 z-10">
              <div className="absolute top-0 right-0 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600 text-2xl">
                🛍️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Retail Shop Partner</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow">
                Stock premium wellness products in your physical store and access wholesale pricing.
              </p>
              <ul className="text-xs text-gray-600 mb-6 space-y-2 text-left w-full font-medium">
                <li className="flex items-center gap-2"><span className="text-[#E88B23]">✓</span> <b>₹10,000</b> Opening Purchase</li>
                <li className="flex items-center gap-2"><span className="text-[#E88B23]">✓</span> Wholesale Pricing</li>
                <li className="flex items-center gap-2"><span className="text-[#E88B23]">✓</span> Customer Shop QR</li>
              </ul>
              <Link href="/partner/retailer-signup" className="w-full bg-[#E88B23] text-white py-2 rounded font-bold hover:bg-[#cc7a1f] block transition-colors">
                Join as Retail Partner
              </Link>
            </div>

            {/* Distributor Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-purple-600 text-2xl">
                📦
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Distributor</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">
                Build and manage a retailer network in your approved area with bulk distribution discounts.
              </p>
              <ul className="text-xs text-gray-500 mb-6 space-y-2 text-left w-full">
                <li className="flex items-center gap-2"><span>✓</span> <b>₹50,000</b> Opening Purchase</li>
                <li className="flex items-center gap-2"><span>✓</span> Bulk Orders</li>
                <li className="flex items-center gap-2"><span>✓</span> Area Management</li>
              </ul>
              <Link href="/partner/distributor-signup" className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-black block transition-colors">
                Become a Distributor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. PROGRAM RULES & DISCLAIMER ── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-start gap-4 p-6 bg-[#f8faf8] rounded-2xl border border-gray-200 mb-6">
            <ShieldCheck size={22} className="text-[#4B7B3B] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#2D5A27]">Transparency Disclaimer:</strong>{' '}
              Partner earnings are based on actual eligible product sales and the company's approved commercial structure. Earnings are not guaranteed and may vary based on sales, order status, cancellations, refunds and applicable business policies. This is a legitimate product-selling and referral-based wellness partner program — not an MLM, investment scheme, or guaranteed income scheme.
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Program Rules</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Referral rewards apply only to eligible successful product sales.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Recruitment alone does not generate commission.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Cancelled/refunded orders are not eligible.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Duplicate/self-referrals may be rejected.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Referral attribution must be through the official referral link/code.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Reward eligibility is subject to the official program terms.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Applicable taxes/TDS and legal requirements may apply.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Partner status does not guarantee sales or income.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 13. FINAL CTA ── */}
      <section id="join" className="py-24 bg-[#2D5A27] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#E88B23] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#4B7B3B] blur-3xl" />
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <span className="text-4xl mb-4 block">🌿</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Grow With Ayurdhara Divya Shakti
          </h2>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Apni shop, distribution network ya personal network ke through premium wellness products ko customers tak pahunchayein.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-10">
            <Link href="/partner/retailer-signup" className="w-full md:w-auto px-8 py-4 bg-white text-[#2D5A27] rounded-full font-bold text-base transition-all hover:bg-gray-50 shadow-xl hover:scale-105 transform">
              🛍️ Join as Retail Shop Partner
            </Link>
            <Link href="/partner/distributor-signup" className="w-full md:w-auto px-8 py-4 bg-[#E88B23] hover:bg-[#cc7a1f] text-white rounded-full font-bold text-base transition-all shadow-xl hover:scale-105 transform">
              📦 Become a Distributor
            </Link>
            <Link href="/partner/wellness-signup" className="w-full md:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-bold text-base transition-all backdrop-blur-sm hover:scale-105 transform">
              🤝 Join as Wellness Partner
            </Link>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60 text-sm mb-4">Already a Partner?</p>
            <Link href="/partner/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full font-semibold text-sm transition-all">
              Login to Partner Dashboard <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 z-[9000] md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="#apply" className="flex items-center justify-center w-full py-3.5 bg-[#2D5A27] text-white rounded-xl font-bold text-base shadow-lg">
          Apply as Partner <ChevronRight size={20} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}
