insert into public.products (
  id,
  slug,
  name,
  short_benefit,
  description,
  category,
  image,
  problem_statement,
  benefits,
  ingredients_feel,
  usage_method,
  who_should_use,
  expected_timeline,
  whats_inside,
  faqs,
  price,
  original_price,
  duration_label,
  is_active
)
values
(
  'kit_full_body',
  'full-body-wellness-kit',
  'Full Body Wellness Kit',
  'Complete body balance for sleep, digestion, stress, and everyday vitality.',
  'A complete 5+1 Nabhi Therapy wellness kit designed to support full-body balance for modern lifestyle issues.',
  'full-body-wellness',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
  'Built for people dealing with mixed daily issues like poor sleep, digestive discomfort, low energy, mild stress, and body heaviness.',
  array[
    'Supports natural full-body balance',
    'Helps calm stress before bedtime',
    'Supports digestion and gut comfort',
    'Encourages deeper nightly relaxation',
    'Creates a consistent healing habit for modern routines'
  ],
  array[
    'Grounding herb-infused sesame and coconut oil base',
    'Digestive support inspired by ajwain and warming botanicals',
    'Calming notes associated with brahmi and jatamansi style blends'
  ],
  array[
    'Apply 2-3 drops in the navel before sleep',
    'Massage gently around the navel in a small circle',
    'Use daily for 30-60 days for best results'
  ],
  array[
    'Anyone feeling generally out of balance',
    'People with demanding work and erratic schedules',
    'Those wanting a gentle daily Ayurvedic ritual'
  ],
  array[
    'Days 1-7: feels calming and grounding at night',
    'Days 7-14: visible improvement in routine comfort and sleep quality',
    'Days 21-60: deeper sense of daily stability and consistency'
  ],
  '[
    {"name":"Digest Ease Oil","purpose":"Supports digestion and abdominal comfort"},
    {"name":"Sleep Soothe Oil","purpose":"Encourages a calmer bedtime routine"},
    {"name":"Stress Calm Oil","purpose":"Helps ease daily mental heaviness"},
    {"name":"Hair Root Support Oil","purpose":"Supports internal nourishment linked to hair wellness"},
    {"name":"Immunity Guard Oil","purpose":"Supports resilience and everyday balance"},
    {"name":"Foot Relax Support Oil","purpose":"Extra bedtime support for relaxation"}
  ]'::jsonb,
  '[
    {"question":"Can I use this kit even if I have multiple issues together?","answer":"Yes. This kit is designed for broad daily balance and is the best starting point when your concerns are mixed rather than highly specific."},
    {"question":"How long does one kit usually last?","answer":"With disciplined use of small nightly drops, most people can stretch the kit through 30-60 days and sometimes longer."}
  ]'::jsonb,
  2499,
  4100,
  'Complete 30-60 Day Healing System',
  true
),
(
  'kit_muscle',
  'muscle-recovery-energy-kit',
  'Muscle Recovery & Energy Kit',
  'For gym recovery, stiffness relief, stamina support, and active lifestyles.',
  'A recovery-focused nabhi wellness kit for people with active bodies, training stress, muscle fatigue, and post-workout heaviness.',
  'muscle-recovery-energy',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  'Made for muscle soreness, stiffness, low stamina, fatigue after workouts, and energy dips caused by an intense routine.',
  array[
    'Supports post-workout recovery',
    'Helps reduce body heaviness after activity',
    'Supports energy and stamina balance',
    'Encourages better night recovery',
    'Fits into a daily gym or active-life routine'
  ],
  array[
    'Warm circulation-supporting oil feel',
    'Strength-focused botanical profile inspired by ashwagandha and bala traditions',
    'Relaxing booster oil for bedtime recovery'
  ],
  array[
    'Use nightly after shower or before sleep',
    'Apply 2-3 drops in the navel and let it absorb slowly',
    'Pair with hydration and a stable bedtime for better recovery support'
  ],
  array[
    'Gym-going adults',
    'Athletic or physically active lifestyles',
    'People who feel soreness and fatigue after long workdays or travel'
  ],
  array[
    'Days 1-7: lighter evening recovery feel',
    'Days 7-14: less morning heaviness and more stable energy',
    'Days 21-60: stronger recovery rhythm and easier routine consistency'
  ],
  '[
    {"name":"Muscle Ease Oil","purpose":"Supports sore and tight muscles"},
    {"name":"Joint Glide Oil","purpose":"Helps support smooth movement"},
    {"name":"Energy Restore Oil","purpose":"Supports natural daily stamina"},
    {"name":"Sleep Recovery Oil","purpose":"Encourages calmer night restoration"},
    {"name":"Heat Balance Oil","purpose":"Helps body feel less strained after effort"},
    {"name":"Foot Relax Booster","purpose":"Extra post-workout unwind support"}
  ]'::jsonb,
  '[
    {"question":"Can this replace stretching or recovery care?","answer":"No. Think of it as a daily Ayurvedic support system that works best alongside a sensible exercise and recovery routine."},
    {"question":"Is it only for people who go to the gym?","answer":"Not at all. It also suits people with physically demanding jobs, long standing hours, or general muscle fatigue."}
  ]'::jsonb,
  2499,
  4100,
  'Complete 30-60 Day Healing System',
  true
),
(
  'kit_queen',
  'queen-beauty-hormonal-balance-kit',
  'Queen Beauty & Hormonal Balance Kit',
  'Skin glow, hair support, calm cycles, and daily feminine balance.',
  'A premium 5+1 therapy system for women looking to support internal calm, glow, scalp nourishment, and hormone-linked daily imbalance.',
  'queen-beauty-hormonal-balance',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  'Made for dull skin, hair fall, irritability, cycle-related imbalance, and the body stress that often shows up on the face and scalp.',
  array[
    'Supports an inner-to-outer glow routine',
    'Helps support scalp and hair nourishment',
    'Encourages calm hormonal rhythm support',
    'Supports restful bedtime balance',
    'Builds a premium self-care ritual'
  ],
  array[
    'Beauty-led botanical feel inspired by kumkumadi and rose traditions',
    'Cooling calming notes associated with brahmi style care',
    'Supportive feminine balance blend feel with gentle warmth'
  ],
  array[
    'Apply before sleep as part of nightly self-care',
    'Use consistently through a full monthly cycle for better observation',
    'Keep the drops gentle and regular rather than overusing'
  ],
  array[
    'Women seeking skin and hair support through internal balance',
    'Those wanting a calmer nighttime ritual around hormonal stress',
    'Anyone looking for a premium Ayurvedic beauty wellness system'
  ],
  array[
    'Days 1-7: calmer bedtime feel and lighter routine stress',
    'Days 7-14: visible support in skin freshness and overall rhythm',
    'Days 21-60: better beauty ritual consistency and internal balance support'
  ],
  '[
    {"name":"Glow Ritual Oil","purpose":"Supports skin freshness from within"},
    {"name":"Hair Root Nourish Oil","purpose":"Supports scalp-linked nourishment"},
    {"name":"Cycle Calm Oil","purpose":"Supports feminine daily balance"},
    {"name":"Stress Ease Oil","purpose":"Helps reduce emotional heaviness"},
    {"name":"Sleep Soothe Oil","purpose":"Supports calmer nightly rest"},
    {"name":"Beauty Booster Oil","purpose":"Extra support for foot relax or self care layering"}
  ]'::jsonb,
  '[
    {"question":"Will this work like a cosmetic product?","answer":"This is positioned as a wellness support system, not a cosmetic quick fix. The idea is internal balance first, then visible improvement over time."},
    {"question":"Can I use it with my current skincare routine?","answer":"Yes. Nabhi therapy sits separately from topical skincare, so it can be part of a broader beauty and wellness approach."}
  ]'::jsonb,
  2499,
  4100,
  'Complete 30-60 Day Healing System',
  true
),
(
  'kit_vridh',
  'vridh-strength-joint-care-kit',
  'Vridh Strength & Joint Care Kit',
  'Comfort-led support for stiffness, joint care, aging vitality, and nightly ease.',
  'An elderly-care-friendly nabhi therapy system focused on comfort, mobility, body warmth, and daily joint support for aging bodies.',
  'vridh-strength-joint-care',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
  'Designed for stiffness, low movement comfort, reduced daily strength, coldness in the body, and age-related heaviness.',
  array[
    'Supports joint comfort and mobility rituals',
    'Encourages warmth and ease in the body',
    'Supports better rest for elderly users',
    'Feels gentle enough for a daily bedtime routine',
    'Supports steady daily care rather than reactive treatment'
  ],
  array[
    'Warm grounding oil feel with comfort-supporting botanicals',
    'Joint-friendly traditional inspiration from mahanarayan style care',
    'Relaxing support oil for feet and bedtime ease'
  ],
  array[
    'Use 2-3 drops every night before sleep',
    'Pair with light foot massage when desired',
    'Use consistently to support comfort routines over time'
  ],
  array[
    'Elderly users or their caregivers',
    'People with stiffness and heavy joints',
    'Families creating a gentle wellness routine for aging loved ones'
  ],
  array[
    'Days 1-7: more soothing bedtime comfort',
    'Days 7-14: easier morning feel and lighter body heaviness',
    'Days 21-60: better ritual consistency around joint care and rest'
  ],
  '[
    {"name":"Joint Comfort Oil","purpose":"Supports mobility and ease"},
    {"name":"Warmth Restore Oil","purpose":"Supports body warmth and circulation feel"},
    {"name":"Sleep Ease Oil","purpose":"Encourages better rest"},
    {"name":"Strength Support Oil","purpose":"Supports daily vitality"},
    {"name":"Calm Nerve Oil","purpose":"Supports body relaxation"},
    {"name":"Foot Relax Oil","purpose":"Extra support for elderly bedtime comfort"}
  ]'::jsonb,
  '[
    {"question":"Is this only for senior citizens?","answer":"It is designed with aging comfort in mind, but adults with stiffness and joint heaviness can also benefit from this routine-led approach."},
    {"question":"Can caregivers use this for parents or grandparents?","answer":"Yes. Many families use it as a simple nightly wellness ritual for loved ones who want gentle support."}
  ]'::jsonb,
  2499,
  4100,
  'Complete 30-60 Day Healing System',
  true
),
(
  'kit_kids',
  'kids-growth-immunity-kit',
  'Kids Growth & Immunity Kit',
  'Gentle support for immunity, appetite rhythm, sleep calm, and growth-age wellbeing.',
  'A carefully positioned nabhi care kit for children aged 2-12 years, built around gentle bedtime support for growth-age routines.',
  'kids-growth-immunity',
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
  'Made for recurring low immunity, weak appetite patterns, restless sleep, and the overall need for gentler support during growing years.',
  array[
    'Supports immunity-oriented daily care',
    'Encourages appetite and digestion comfort support',
    'Helps create a calm bedtime routine for children',
    'Designed as a gentle family wellness ritual',
    'Supports consistency in a child care routine'
  ],
  array[
    'Gentle herbal feel designed for bedtime use',
    'Soft digestive and immunity-supporting Ayurvedic inspiration',
    'Comforting support oil for feet or booster use'
  ],
  array[
    'Use very small nightly drops before sleep',
    'Apply gently and avoid overuse',
    'Best used by parents as part of a calm sleep routine'
  ],
  array[
    'Children aged 2-12 years',
    'Parents looking for a gentle Ayurvedic support ritual',
    'Families wanting a natural bedtime wellness routine'
  ],
  array[
    'Days 1-7: calmer nightly routine support',
    'Days 7-14: visible improvement in routine consistency and comfort',
    'Days 21-60: stronger family discipline around everyday wellness support'
  ],
  '[
    {"name":"Immunity Support Oil","purpose":"Supports everyday resilience"},
    {"name":"Appetite Rhythm Oil","purpose":"Supports gentle digestive comfort"},
    {"name":"Sleep Calm Oil","purpose":"Encourages calmer bedtime settling"},
    {"name":"Growth Care Oil","purpose":"Supports growth-age wellness rituals"},
    {"name":"Seasonal Guard Oil","purpose":"Supports changing-season comfort"},
    {"name":"Foot Relax Booster","purpose":"Extra bedtime support for calmer nights"}
  ]'::jsonb,
  '[
    {"question":"Is this a medicine replacement?","answer":"No. This is a wellness-support routine for parents who want a gentle Ayurvedic habit alongside sensible pediatric care."},
    {"question":"How many drops should be used for children?","answer":"Keep the usage light and gentle. The bedtime routine matters more than heavy quantity."}
  ]'::jsonb,
  2499,
  4100,
  'Complete 30-60 Day Healing System',
  true
),
(
  'kit_daily',
  'daily-health-balance-kit',
  'Daily Health Balance Kit',
  'A simple everyday kit for digestion, sleep, immunity, and modern lifestyle stability.',
  'A practical daily-use nabhi wellness system for people who want consistent balance support without a highly specialized concern.',
  'daily-health-balance',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80',
  'Designed for general lifestyle imbalance including irregular sleep, digestive discomfort, low immunity, routine fatigue, and stress buildup.',
  array[
    'Supports a cleaner everyday wellness routine',
    'Helps ease common modern lifestyle imbalance',
    'Supports digestion and nightly comfort',
    'Helps create consistent daily discipline',
    'A good entry point into nabhi therapy'
  ],
  array[
    'Balanced herb-infused oil feel for everyday use',
    'Digestive calming and immunity-supporting Ayurvedic inspiration',
    'Gentle support oil for feet or nightly booster use'
  ],
  array[
    'Apply 2-3 drops in the navel every night',
    'Use continuously rather than occasionally for best benefit',
    'Pair with simple hydration better sleep and routine eating habits'
  ],
  array[
    'Adults wanting a daily wellness ritual',
    'People dealing with multiple small lifestyle issues',
    'Anyone curious about starting nabhi therapy in a practical way'
  ],
  array[
    'Days 1-7: better bedtime rhythm and routine awareness',
    'Days 7-14: visible improvement in comfort and sleep consistency',
    'Days 21-60: stronger daily balance habits and more stable wellbeing'
  ],
  '[
    {"name":"Digest Daily Oil","purpose":"Supports gut comfort"},
    {"name":"Immunity Daily Oil","purpose":"Supports body resilience"},
    {"name":"Sleep Daily Oil","purpose":"Supports better nighttime calm"},
    {"name":"Stress Daily Oil","purpose":"Supports emotional ease"},
    {"name":"Energy Daily Oil","purpose":"Supports everyday lightness and stability"},
    {"name":"Booster Support Oil","purpose":"Extra support for tired evenings"}
  ]'::jsonb,
  '[
    {"question":"Which kit should I choose if I am not sure?","answer":"If your issue is general and spread across sleep digestion or low immunity, this is the most practical place to begin."},
    {"question":"Can I move to another kit later?","answer":"Yes. Many people begin with a general balance system and shift to a more targeted kit once they understand their main need better."}
  ]'::jsonb,
  2499,
  4100,
  'Complete 30-60 Day Healing System',
  true
)
on conflict (id) do update
set
  slug = excluded.slug,
  name = excluded.name,
  short_benefit = excluded.short_benefit,
  description = excluded.description,
  category = excluded.category,
  image = excluded.image,
  problem_statement = excluded.problem_statement,
  benefits = excluded.benefits,
  ingredients_feel = excluded.ingredients_feel,
  usage_method = excluded.usage_method,
  who_should_use = excluded.who_should_use,
  expected_timeline = excluded.expected_timeline,
  whats_inside = excluded.whats_inside,
  faqs = excluded.faqs,
  price = excluded.price,
  original_price = excluded.original_price,
  duration_label = excluded.duration_label,
  is_active = excluded.is_active,
  updated_at = timezone('utc', now());
