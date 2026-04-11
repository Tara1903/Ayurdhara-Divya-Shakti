import type { Product, Testimonial } from "@/types";
import { BRAND } from "./brand";

export const lifestyleProblems = [
  "Hair fall",
  "Stress",
  "Poor sleep",
  "Weak digestion",
  "Low immunity",
];

export const whyChooseUs = [
  "100% Ayurvedic 5+1 nabhi therapy system",
  "Created as a complete lifestyle healing routine, not a single-oil shortcut",
  "Long-lasting usage with 30-60 day guided care and up to 4-6 months of disciplined use",
  "Premium approach that balances traditional wisdom with modern wellness needs",
];

export const howItWorks = [
  {
    step: "01",
    title: "Choose the right kit",
    description:
      "Select the wellness kit that matches your current lifestyle concern, from sleep and digestion to recovery or hormonal balance.",
  },
  {
    step: "02",
    title: "Apply before sleep",
    description:
      "Place 2-3 drops in the navel before bedtime so the oils sit, absorb gently, and become part of a calm nightly ritual.",
  },
  {
    step: "03",
    title: "Use daily for visible change",
    description:
      "Stay consistent for 7-14 days to notice early shifts, then continue through 30-60 days for a deeper body-balance routine.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Megha S.",
    location: "Pune",
    quote:
      "It felt premium from the first use. I bought it for stress and sleep, but the biggest surprise was how much calmer my nightly routine became.",
  },
  {
    name: "Ritika V.",
    location: "Jaipur",
    quote:
      "The explanation of nabhi therapy made sense, and the kit felt like a complete system rather than another random wellness product.",
  },
  {
    name: "Aman K.",
    location: "Delhi NCR",
    quote:
      "I was spending far more on one-off treatments. This felt structured, thoughtful, and easy enough to stay consistent with every night.",
  },
];

export const products: Product[] = [
  {
    id: "kit_full_body",
    slug: "full-body-wellness-kit",
    name: "Full Body Wellness Kit",
    shortBenefit: "Complete body balance for sleep, digestion, stress, and everyday vitality.",
    description:
      "A complete 5+1 Nabhi Therapy wellness kit designed to support full-body balance for modern lifestyle issues. Ideal when the body feels generally off-track and needs a calm, daily reset.",
    category: "full-body-wellness",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    problemStatement:
      "Built for people dealing with mixed daily issues like poor sleep, digestive discomfort, low energy, mild stress, and body heaviness.",
    benefits: [
      "Supports natural full-body balance",
      "Helps calm stress before bedtime",
      "Supports digestion and gut comfort",
      "Encourages deeper nightly relaxation",
      "Creates a consistent healing habit for modern routines",
    ],
    ingredientsFeel: [
      "Grounding herb-infused sesame and coconut oil base",
      "Digestive support inspired by ajwain, hing, and warming botanicals",
      "Calming notes associated with brahmi and jatamansi-style blends",
    ],
    usageMethod: [
      "Apply 2-3 drops in the navel before sleep",
      "Massage gently around the navel in a small circle",
      "Use daily for 30-60 days for best results",
    ],
    whoShouldUse: [
      "Anyone feeling generally out of balance",
      "People with demanding work and erratic schedules",
      "Those wanting a gentle daily Ayurvedic ritual",
    ],
    expectedTimeline: [
      "Days 1-7: feels calming and grounding at night",
      "Days 7-14: visible improvement in routine comfort and sleep quality",
      "Days 21-60: deeper sense of daily stability and consistency",
    ],
    whatsInside: [
      { name: "Digest Ease Oil", purpose: "Supports digestion and abdominal comfort" },
      { name: "Sleep Soothe Oil", purpose: "Encourages a calmer bedtime routine" },
      { name: "Stress Calm Oil", purpose: "Helps ease daily mental heaviness" },
      { name: "Hair Root Support Oil", purpose: "Supports internal nourishment linked to hair wellness" },
      { name: "Immunity Guard Oil", purpose: "Supports resilience and everyday balance" },
      { name: "Foot Relax Support Oil", purpose: "Extra bedtime support for relaxation" },
    ],
    faqs: [
      {
        question: "Can I use this kit even if I have multiple issues together?",
        answer:
          "Yes. This kit is designed for broad daily balance and is the best starting point when your concerns are mixed rather than highly specific.",
      },
      {
        question: "How long does one kit usually last?",
        answer:
          "With disciplined use of small nightly drops, most people can stretch the kit through 30-60 days and sometimes longer.",
      },
    ],
    price: BRAND.offerPrice,
    originalPrice: BRAND.originalPrice,
    durationLabel: BRAND.durationLabel,
  },
  {
    id: "kit_muscle",
    slug: "muscle-recovery-energy-kit",
    name: "Muscle Recovery & Energy Kit",
    shortBenefit: "For gym recovery, stiffness relief, stamina support, and active lifestyles.",
    description:
      "A recovery-focused nabhi wellness kit for people with active bodies, training stress, muscle fatigue, and post-workout heaviness.",
    category: "muscle-recovery-energy",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    problemStatement:
      "Made for muscle soreness, stiffness, low stamina, fatigue after workouts, and energy dips caused by an intense routine.",
    benefits: [
      "Supports post-workout recovery",
      "Helps reduce body heaviness after activity",
      "Supports energy and stamina balance",
      "Encourages better night recovery",
      "Fits into a daily gym or active-life routine",
    ],
    ingredientsFeel: [
      "Warm, circulation-supporting oil feel",
      "Strength-focused botanical profile inspired by ashwagandha and bala traditions",
      "Relaxing booster oil for bedtime recovery",
    ],
    usageMethod: [
      "Use nightly after shower or before sleep",
      "Apply 2-3 drops in the navel and let it absorb slowly",
      "Pair with hydration and a stable bedtime for better recovery support",
    ],
    whoShouldUse: [
      "Gym-going adults",
      "Athletic or physically active lifestyles",
      "People who feel soreness and fatigue after long workdays or travel",
    ],
    expectedTimeline: [
      "Days 1-7: lighter evening recovery feel",
      "Days 7-14: less morning heaviness and more stable energy",
      "Days 21-60: stronger recovery rhythm and easier routine consistency",
    ],
    whatsInside: [
      { name: "Muscle Ease Oil", purpose: "Supports sore and tight muscles" },
      { name: "Joint Glide Oil", purpose: "Helps support smooth movement" },
      { name: "Energy Restore Oil", purpose: "Supports natural daily stamina" },
      { name: "Sleep Recovery Oil", purpose: "Encourages calmer night restoration" },
      { name: "Heat Balance Oil", purpose: "Helps body feel less strained after effort" },
      { name: "Foot Relax Booster", purpose: "Extra post-workout unwind support" },
    ],
    faqs: [
      {
        question: "Can this replace stretching or recovery care?",
        answer:
          "No. Think of it as a daily Ayurvedic support system that works best alongside a sensible exercise and recovery routine.",
      },
      {
        question: "Is it only for people who go to the gym?",
        answer:
          "Not at all. It also suits people with physically demanding jobs, long standing hours, or general muscle fatigue.",
      },
    ],
    price: BRAND.offerPrice,
    originalPrice: BRAND.originalPrice,
    durationLabel: BRAND.durationLabel,
  },
  {
    id: "kit_queen",
    slug: "queen-beauty-hormonal-balance-kit",
    name: "Queen Beauty & Hormonal Balance Kit",
    shortBenefit: "Skin glow, hair support, calm cycles, and daily feminine balance.",
    description:
      "A premium 5+1 therapy system for women looking to support internal calm, glow, scalp nourishment, and hormone-linked daily imbalance.",
    category: "queen-beauty-hormonal-balance",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    problemStatement:
      "Made for dull skin, hair fall, irritability, cycle-related imbalance, and the body stress that often shows up on the face and scalp.",
    benefits: [
      "Supports an inner-to-outer glow routine",
      "Helps support scalp and hair nourishment",
      "Encourages calm hormonal rhythm support",
      "Supports restful bedtime balance",
      "Builds a premium self-care ritual",
    ],
    ingredientsFeel: [
      "Beauty-led botanical feel inspired by kumkumadi and rose traditions",
      "Cooling-calming notes associated with brahmi-style care",
      "Supportive feminine balance blend feel with gentle warmth",
    ],
    usageMethod: [
      "Apply before sleep as part of nightly self-care",
      "Use consistently through a full monthly cycle for better observation",
      "Keep the drops gentle and regular rather than overusing",
    ],
    whoShouldUse: [
      "Women seeking skin and hair support through internal balance",
      "Those wanting a calmer nighttime ritual around hormonal stress",
      "Anyone looking for a premium Ayurvedic beauty-wellness system",
    ],
    expectedTimeline: [
      "Days 1-7: calmer bedtime feel and lighter routine stress",
      "Days 7-14: visible support in skin freshness and overall rhythm",
      "Days 21-60: better beauty ritual consistency and internal balance support",
    ],
    whatsInside: [
      { name: "Glow Ritual Oil", purpose: "Supports skin freshness from within" },
      { name: "Hair Root Nourish Oil", purpose: "Supports scalp-linked nourishment" },
      { name: "Cycle Calm Oil", purpose: "Supports feminine daily balance" },
      { name: "Stress Ease Oil", purpose: "Helps reduce emotional heaviness" },
      { name: "Sleep Soothe Oil", purpose: "Supports calmer nightly rest" },
      { name: "Beauty Booster Oil", purpose: "Extra support for foot relax or self-care layering" },
    ],
    faqs: [
      {
        question: "Will this work like a cosmetic product?",
        answer:
          "This is positioned as a wellness support system, not a cosmetic quick fix. The idea is internal balance first, then visible improvement over time.",
      },
      {
        question: "Can I use it with my current skincare routine?",
        answer:
          "Yes. Nabhi therapy sits separately from topical skincare, so it can be part of a broader beauty and wellness approach.",
      },
    ],
    price: BRAND.offerPrice,
    originalPrice: BRAND.originalPrice,
    durationLabel: BRAND.durationLabel,
  },
  {
    id: "kit_vridh",
    slug: "vridh-strength-joint-care-kit",
    name: "Vridh Strength & Joint Care Kit",
    shortBenefit: "Comfort-led support for stiffness, joint care, aging vitality, and nightly ease.",
    description:
      "An elderly-care-friendly nabhi therapy system focused on comfort, mobility, body warmth, and daily joint support for aging bodies.",
    category: "vridh-strength-joint-care",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    problemStatement:
      "Designed for stiffness, low movement comfort, reduced daily strength, coldness in the body, and age-related heaviness.",
    benefits: [
      "Supports joint comfort and mobility rituals",
      "Encourages warmth and ease in the body",
      "Supports better rest for elderly users",
      "Feels gentle enough for a daily bedtime routine",
      "Supports steady daily care rather than reactive treatment",
    ],
    ingredientsFeel: [
      "Warm, grounding oil feel with comfort-supporting botanicals",
      "Joint-friendly traditional inspiration from mahanarayan-style care",
      "Relaxing support oil for feet and bedtime ease",
    ],
    usageMethod: [
      "Use 2-3 drops every night before sleep",
      "Pair with light foot massage when desired",
      "Use consistently to support comfort routines over time",
    ],
    whoShouldUse: [
      "Elderly users or their caregivers",
      "People with stiffness and heavy joints",
      "Families creating a gentle wellness routine for aging loved ones",
    ],
    expectedTimeline: [
      "Days 1-7: more soothing bedtime comfort",
      "Days 7-14: easier morning feel and lighter body heaviness",
      "Days 21-60: better ritual consistency around joint care and rest",
    ],
    whatsInside: [
      { name: "Joint Comfort Oil", purpose: "Supports mobility and ease" },
      { name: "Warmth Restore Oil", purpose: "Supports body warmth and circulation feel" },
      { name: "Sleep Ease Oil", purpose: "Encourages better rest" },
      { name: "Strength Support Oil", purpose: "Supports daily vitality" },
      { name: "Calm Nerve Oil", purpose: "Supports body relaxation" },
      { name: "Foot Relax Oil", purpose: "Extra support for elderly bedtime comfort" },
    ],
    faqs: [
      {
        question: "Is this only for senior citizens?",
        answer:
          "It is designed with aging comfort in mind, but adults with stiffness and joint heaviness can also benefit from this routine-led approach.",
      },
      {
        question: "Can caregivers use this for parents or grandparents?",
        answer:
          "Yes. Many families use it as a simple nightly wellness ritual for loved ones who want gentle support.",
      },
    ],
    price: BRAND.offerPrice,
    originalPrice: BRAND.originalPrice,
    durationLabel: BRAND.durationLabel,
  },
  {
    id: "kit_kids",
    slug: "kids-growth-immunity-kit",
    name: "Kids Growth & Immunity Kit",
    shortBenefit: "Gentle support for immunity, appetite rhythm, sleep calm, and growth-age wellbeing.",
    description:
      "A carefully positioned nabhi care kit for children aged 2-12 years, built around gentle bedtime support for growth-age routines.",
    category: "kids-growth-immunity",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    problemStatement:
      "Made for recurring low immunity, weak appetite patterns, restless sleep, and the overall need for gentler support during growing years.",
    benefits: [
      "Supports immunity-oriented daily care",
      "Encourages appetite and digestion comfort support",
      "Helps create a calm bedtime routine for children",
      "Designed as a gentle family wellness ritual",
      "Supports consistency in a child’s care routine",
    ],
    ingredientsFeel: [
      "Gentle herbal feel designed for bedtime use",
      "Soft digestive and immunity-supporting Ayurvedic inspiration",
      "Comforting support oil for feet or booster use",
    ],
    usageMethod: [
      "Use very small nightly drops before sleep",
      "Apply gently and avoid overuse",
      "Best used by parents as part of a calm sleep routine",
    ],
    whoShouldUse: [
      "Children aged 2-12 years",
      "Parents looking for a gentle Ayurvedic support ritual",
      "Families wanting a natural bedtime wellness routine",
    ],
    expectedTimeline: [
      "Days 1-7: calmer nightly routine support",
      "Days 7-14: visible improvement in routine consistency and comfort",
      "Days 21-60: stronger family discipline around everyday wellness support",
    ],
    whatsInside: [
      { name: "Immunity Support Oil", purpose: "Supports everyday resilience" },
      { name: "Appetite Rhythm Oil", purpose: "Supports gentle digestive comfort" },
      { name: "Sleep Calm Oil", purpose: "Encourages calmer bedtime settling" },
      { name: "Growth Care Oil", purpose: "Supports growth-age wellness rituals" },
      { name: "Seasonal Guard Oil", purpose: "Supports changing-season comfort" },
      { name: "Foot Relax Booster", purpose: "Extra bedtime support for calmer nights" },
    ],
    faqs: [
      {
        question: "Is this a medicine replacement?",
        answer:
          "No. This is a wellness-support routine for parents who want a gentle Ayurvedic habit alongside sensible pediatric care.",
      },
      {
        question: "How many drops should be used for children?",
        answer:
          "Keep the usage light and gentle. The bedtime routine matters more than heavy quantity.",
      },
    ],
    price: BRAND.offerPrice,
    originalPrice: BRAND.originalPrice,
    durationLabel: BRAND.durationLabel,
  },
  {
    id: "kit_daily",
    slug: "daily-health-balance-kit",
    name: "Daily Health Balance Kit",
    shortBenefit: "A simple everyday kit for digestion, sleep, immunity, and modern lifestyle stability.",
    description:
      "A practical daily-use nabhi wellness system for people who want consistent balance support without a highly specialized concern.",
    category: "daily-health-balance",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80",
    problemStatement:
      "Designed for general lifestyle imbalance including irregular sleep, digestive discomfort, low immunity, routine fatigue, and stress buildup.",
    benefits: [
      "Supports a cleaner everyday wellness routine",
      "Helps ease common modern lifestyle imbalance",
      "Supports digestion and nightly comfort",
      "Helps create consistent daily discipline",
      "A good entry point into nabhi therapy",
    ],
    ingredientsFeel: [
      "Balanced herb-infused oil feel for everyday use",
      "Digestive, calming, and immunity-supporting Ayurvedic inspiration",
      "Gentle support oil for feet or nightly booster use",
    ],
    usageMethod: [
      "Apply 2-3 drops in the navel every night",
      "Use continuously rather than occasionally for best benefit",
      "Pair with simple hydration, better sleep, and routine eating habits",
    ],
    whoShouldUse: [
      "Adults wanting a daily wellness ritual",
      "People dealing with multiple small lifestyle issues",
      "Anyone curious about starting nabhi therapy in a practical way",
    ],
    expectedTimeline: [
      "Days 1-7: better bedtime rhythm and routine awareness",
      "Days 7-14: visible improvement in comfort and sleep consistency",
      "Days 21-60: stronger daily balance habits and more stable wellbeing",
    ],
    whatsInside: [
      { name: "Digest Daily Oil", purpose: "Supports gut comfort" },
      { name: "Immunity Daily Oil", purpose: "Supports body resilience" },
      { name: "Sleep Daily Oil", purpose: "Supports better nighttime calm" },
      { name: "Stress Daily Oil", purpose: "Supports emotional ease" },
      { name: "Energy Daily Oil", purpose: "Supports everyday lightness and stability" },
      { name: "Booster Support Oil", purpose: "Extra support for tired evenings" },
    ],
    faqs: [
      {
        question: "Which kit should I choose if I am not sure?",
        answer:
          "If your issue is general and spread across sleep, digestion, or low immunity, this is the most practical place to begin.",
      },
      {
        question: "Can I move to another kit later?",
        answer:
          "Yes. Many people begin with a general balance system and shift to a more targeted kit once they understand their main need better.",
      },
    ],
    price: BRAND.offerPrice,
    originalPrice: BRAND.originalPrice,
    durationLabel: BRAND.durationLabel,
  },
];

export const sampleOrders = [
  {
    id: "sample-order-1",
    orderNumber: "ADS-1001",
    customerName: "Neha Kapoor",
    phone: "9876543210",
    address: "Flat 201, Green Residency, Jaipur",
    totalPrice: 2499,
    status: "pending" as const,
    createdAt: "2026-04-08T08:30:00.000Z",
    items: [
      {
        productId: "kit_queen",
        productName: "Queen Beauty & Hormonal Balance Kit",
        quantity: 1,
        unitPrice: 2499,
      },
    ],
  },
  {
    id: "sample-order-2",
    orderNumber: "ADS-1002",
    customerName: "Rohit Sharma",
    phone: "9811112233",
    address: "45 Lake View, Pune",
    totalPrice: 4998,
    status: "shipped" as const,
    createdAt: "2026-04-07T11:10:00.000Z",
    items: [
      {
        productId: "kit_muscle",
        productName: "Muscle Recovery & Energy Kit",
        quantity: 2,
        unitPrice: 2499,
      },
    ],
  },
  {
    id: "sample-order-3",
    orderNumber: "ADS-1003",
    customerName: "Anjali Verma",
    phone: "9899900011",
    address: "12 Lotus Apartments, Delhi",
    totalPrice: 2499,
    status: "delivered" as const,
    createdAt: "2026-04-05T18:00:00.000Z",
    items: [
      {
        productId: "kit_full_body",
        productName: "Full Body Wellness Kit",
        quantity: 1,
        unitPrice: 2499,
      },
    ],
  },
];
