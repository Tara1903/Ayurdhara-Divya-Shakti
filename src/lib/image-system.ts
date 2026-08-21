/**
 * Master Product Image Intelligence System
 * Ayurdhara Divya Shakti Catalog Engine
 */

export interface ProductImageIntelligence {
  originalName: string;
  category: string;
  subcategory?: string;
  cleanIngredient: string;
  productForm: 'raw_herb' | 'powder' | 'oil' | 'tea' | 'kadha' | 'drink' | 'honey' | 'ghee' | 'dry_fruit' | 'seed' | 'jaggery' | 'spice_whole' | 'spice_powder' | 'combo' | 'generic';
  generatedKeywords: string;
  aiPrompt: string;
  confidenceScore: number;
  validationNotes: string[];
}

// Common Hindi <-> English botanical & ingredient dictionary
export const SYNONYM_DICTIONARY: Record<string, string> = {
  'haldi': 'turmeric',
  'turmeric': 'turmeric',
  'saunf': 'fennel',
  'fennel': 'fennel',
  'methi': 'fenugreek',
  'fenugreek': 'fenugreek',
  'ajwain': 'carom seeds',
  'carom': 'carom seeds',
  'dalchini': 'cinnamon',
  'cinnamon': 'cinnamon',
  'mulethi': 'licorice root',
  'licorice': 'licorice root',
  'amla': 'indian gooseberry',
  'neem': 'neem leaves',
  'tulsi': 'holy basil',
  'ashwagandha': 'ashwagandha withania somnifera',
  'shatavari': 'shatavari asparagus racemosus',
  'brahmi': 'brahmi bacopa monnieri',
  'giloy': 'giloy tinospora cordifolia',
  'jatamansi': 'jatamansi spikenard',
  'safed musli': 'safed musli chlorophytum',
  'gokhru': 'gokhru tribulus terrestris',
  'arjuna': 'terminalia arjuna bark',
  'moringa': 'moringa oleifera drumstick leaf',
  'vetiver': 'vetiver khus root',
  'khus': 'vetiver khus root',
  'kesar': 'saffron strands',
  'saffron': 'saffron strands',
  'jeera': 'cumin seeds',
  'cumin': 'cumin seeds',
  'kalonji': 'black seed nigella sativa',
  'sarson': 'mustard seeds',
  'mustard': 'mustard seeds',
  'dhaniya': 'coriander seeds',
  'coriander': 'coriander seeds',
  'laung': 'cloves',
  'clove': 'cloves',
  'cloves': 'cloves',
  'elaichi': 'green cardamom pods',
  'cardamom': 'green cardamom pods',
  'adrak': 'fresh ginger',
  'sonth': 'dry ginger root',
  'ginger': 'ginger',
  'gulab': 'rose petals',
  'rose': 'rose petals',
  'chamomile': 'chamomile flowers',
  'hibiscus': 'hibiscus flowers',
  'badam': 'almonds',
  'almond': 'almonds',
  'almonds': 'almonds',
  'kaju': 'cashews',
  'cashew': 'cashews',
  'cashews': 'cashews',
  'kishmish': 'raisins',
  'raisin': 'raisins',
  'raisins': 'raisins',
  'akhrot': 'walnuts',
  'walnut': 'walnuts',
  'walnuts': 'walnuts',
  'khajoor': 'dates medjool',
  'date': 'dates medjool',
  'dates': 'dates medjool',
  'anjeer': 'dried figs',
  'fig': 'dried figs',
  'figs': 'dried figs',
  'pista': 'pistachios',
  'pistachio': 'pistachios',
  'pistachios': 'pistachios',
  'chia': 'chia seeds',
  'alsi': 'flaxseeds',
  'flax': 'flaxseeds',
  'flaxseed': 'flaxseeds',
  'flaxseeds': 'flaxseeds',
  'kaddu': 'pumpkin seeds',
  'pumpkin': 'pumpkin seeds',
  'surajmukhi': 'sunflower seeds',
  'sunflower': 'sunflower seeds',
  'til': 'sesame seeds',
  'sesame': 'sesame seeds',
  'sabja': 'sweet basil seeds sabja',
  'halim': 'garden cress seeds halim',
  'gur': 'jaggery',
  'jaggery': 'jaggery',
  'ghee': 'traditional clarified butter ghee',
  'cow ghee': 'cow milk pure desi ghee',
  'a2 ghee': 'a2 bilona cow ghee',
  'honey': 'pure natural raw honey',
  'triphala': 'triphala ayurvedic herbal blend',
  'trikatu': 'trikatu traditional spice blend',
  'chyawanprash': 'chyawanprash herbal wellness blend',
  'spirulina': 'spirulina superfood algae',
  'wheatgrass': 'organic green wheatgrass',
  'barley grass': 'barley grass green superfood',
  'sattu': 'roasted gram sattu flour',
};

// Stop words to strip from product titles
const STOP_WORDS = [
  'premium', 'organic', 'natural', 'pure', 'authentic', 'traditional',
  'offer', 'sale', 'discount', 'best', 'fresh', 'ayurvedic', 'divya',
  'shakti', 'ayurdhara', 'pack', 'combo', 'box', 'bottle', 'jar',
  '100g', '200g', '250g', '500g', '1kg', '2kg', '5kg',
  '25g', '50g', '15g', '30g', '10ml', '15ml', '30ml', '50ml', '100ml',
  '250ml', '500ml', '1l', '2l', '5l', 'pieces', 'piece', 'grams', 'gram',
  'combo', 'collection', 'kit'
];

/**
 * Strips stop words and extracts pure core ingredient string
 */
export function extractCleanIngredient(name: string): string {
  let cleaned = name.toLowerCase();
  
  // Replace slashes and symbols with spaces
  cleaned = cleaned.replace(/[/\\(),-]/g, ' ');
  
  const tokens = cleaned.split(/\s+/).filter(t => t.trim().length > 0);
  const filtered = tokens.filter(t => !STOP_WORDS.includes(t));
  
  return filtered.join(' ').trim() || name.toLowerCase().trim();
}

/**
 * Determines exact product physical form based on Category and Name
 */
export function determineProductForm(
  name: string,
  category: string = '',
  subcategory: string = ''
): ProductImageIntelligence['productForm'] {
  const lowerName = name.toLowerCase();
  const lowerCat = category.toLowerCase();
  const lowerSub = subcategory.toLowerCase();

  // 1. Powder check (strict: powder must never be classified as raw herb)
  if (
    lowerCat.includes('powder') ||
    lowerSub.includes('powder') ||
    lowerName.includes('powder') ||
    lowerName.includes('churna') ||
    lowerName.includes('nutrition mix') ||
    lowerName.includes('blend mix')
  ) {
    if (lowerCat.includes('spice') || lowerSub.includes('spice')) {
      return 'spice_powder';
    }
    return 'powder';
  }

  // 2. Raw herbs (roots, whole leaves, stems, whole barks, single herbs, seasonal collections)
  if (
    lowerCat.includes('single herb') ||
    lowerCat.includes('premium herb') ||
    lowerCat.includes('seasonal collection') ||
    lowerCat.includes('raw herb') ||
    lowerSub.includes('single herb') ||
    lowerSub.includes('premium herb') ||
    lowerSub.includes('seasonal collection') ||
    lowerName.includes('herb collection') ||
    lowerName.includes('root') ||
    lowerName.includes('bark') ||
    lowerName.includes('stem') ||
    lowerName.includes('leaves') ||
    lowerName.includes('petals')
  ) {
    return 'raw_herb';
  }

  // 3. Herbal Teas
  if (
    lowerCat.includes('tea') ||
    lowerSub.includes('tea') ||
    lowerName.includes('tea')
  ) {
    return 'tea';
  }

  // 4. Kadha
  if (
    lowerCat.includes('kadha') ||
    lowerSub.includes('kadha') ||
    lowerName.includes('kadha')
  ) {
    return 'kadha';
  }

  // 5. Wellness Drinks
  if (
    lowerCat.includes('drink') ||
    lowerSub.includes('drink') ||
    lowerName.includes('drink mix') ||
    lowerName.includes('beverage')
  ) {
    return 'drink';
  }

  // 6. Cold Pressed Oils & Wellness Oils
  if (
    lowerCat.includes('oil') ||
    lowerSub.includes('oil') ||
    lowerName.includes('oil') ||
    lowerName.includes('taila') ||
    lowerName.includes('nabhi')
  ) {
    return 'oil';
  }

  // 7. Honey
  if (
    lowerCat.includes('honey') ||
    lowerSub.includes('honey') ||
    lowerName.includes('honey')
  ) {
    return 'honey';
  }

  // 8. Ghee
  if (
    lowerCat.includes('ghee') ||
    lowerSub.includes('ghee') ||
    lowerName.includes('ghee')
  ) {
    return 'ghee';
  }

  // 9. Dry Fruits
  if (
    lowerCat.includes('dry fruit') ||
    lowerSub.includes('dry fruit') ||
    lowerName.includes('almond') ||
    lowerName.includes('cashew') ||
    lowerName.includes('raisin') ||
    lowerName.includes('walnut') ||
    lowerName.includes('date') ||
    lowerName.includes('fig') ||
    lowerName.includes('anjeer') ||
    lowerName.includes('pista')
  ) {
    return 'dry_fruit';
  }

  // 10. Seeds (when in Seeds category or seed name)
  if (
    lowerCat.includes('seed') ||
    lowerSub.includes('seed') ||
    (lowerName.includes('seed') && !lowerCat.includes('herb')) ||
    lowerName.includes('chia') ||
    lowerName.includes('flaxseed') ||
    lowerName.includes('pumpkin seed') ||
    lowerName.includes('sunflower seed') ||
    lowerName.includes('sesame') ||
    lowerName.includes('sabja') ||
    lowerName.includes('halim')
  ) {
    return 'seed';
  }

  // 11. Jaggery
  if (
    lowerCat.includes('jaggery') ||
    lowerSub.includes('jaggery') ||
    lowerName.includes('jaggery') ||
    lowerName.includes('gur')
  ) {
    return 'jaggery';
  }

  // 12. Wellness Packs / Combos
  if (lowerCat.includes('pack') || lowerName.includes('pack') || lowerName.includes('combo')) {
    return 'combo';
  }

  // 13. Spices (Whole vs Powder)
  if (lowerCat.includes('spice') || lowerSub.includes('spice')) {
    if (lowerName.includes('powder')) return 'spice_powder';
    return 'spice_whole';
  }

  return 'generic';
}

/**
 * Intelligent Image System: Analyzes Product, Generates Optimal Keywords and Strict AI Prompts
 */
export function analyzeProductForImages(
  name: string,
  category: string = '',
  subcategory: string = ''
): ProductImageIntelligence {
  const clean = extractCleanIngredient(name);
  const form = determineProductForm(name, category, subcategory);
  const validationNotes: string[] = [];

  let formDescription = '';
  let keywordSuffix = '';
  let confidenceScore = 95;

  // Resolve botanical / ingredient synonyms
  let resolvedIngredient = clean;
  for (const [key, val] of Object.entries(SYNONYM_DICTIONARY)) {
    if (clean.includes(key)) {
      resolvedIngredient = `${clean} ${val}`;
      break;
    }
  }

  switch (form) {
    case 'raw_herb':
      formDescription = 'whole raw botanicals, dried roots, whole natural leaves or organic herbs arranged in a minimalist ceramic bowl or wooden surface';
      keywordSuffix = 'raw dried herbs roots whole botanical product photography bowl';
      validationNotes.push('RULE: Raw herb representation strictly enforced (never show fine powder).');
      break;

    case 'powder':
    case 'spice_powder':
      formDescription = 'ultra-fine natural herbal powder cleanly placed in a luxury ceramic bowl with an elegant wooden spoon, with a small piece of the raw whole herb or botanical ingredient beside it';
      keywordSuffix = 'herbal powder bowl wooden spoon natural ayurvedic product photography';
      validationNotes.push('RULE: Powder in bowl + raw herb presentation strictly enforced.');
      break;

    case 'tea':
      formDescription = 'a clear glass cup of freshly brewed golden-amber herbal tea with delicate aromatic steam, garnished with fresh organic tea herbs, lemongrass and botanical leaves';
      keywordSuffix = 'herbal tea cup infusion leaves organic wellness drink photography';
      validationNotes.push('RULE: Fresh brewed herbal tea in cup presentation enforced.');
      break;

    case 'kadha':
      formDescription = 'traditional warm herbal kadha in a traditional clay or glass cup with whole spices like cinnamon, ginger, and tulsi leaves tastefully placed alongside';
      keywordSuffix = 'traditional herbal kadha drink spices tulsi ginger warm photography';
      validationNotes.push('RULE: Traditional kadha drink + whole spices representation enforced.');
      break;

    case 'drink':
      formDescription = 'refreshing wellness botanical beverage in a high-end clear glass with natural botanical ingredients and healthy organic garnish';
      keywordSuffix = 'wellness drink beverage natural botanical glass luxury photography';
      validationNotes.push('RULE: Clean wellness beverage presentation.');
      break;

    case 'oil':
      formDescription = 'premium amber glass bottle with a fine glass dropper filled with pure natural cold-pressed botanical oil, with the raw seeds or fresh botanical ingredients subtly displayed next to it';
      keywordSuffix = 'amber glass dropper bottle cold pressed oil seeds botanical product photography';
      validationNotes.push('RULE: Amber glass bottle + seed ingredient pairing enforced.');
      break;

    case 'honey':
      formDescription = 'crystal-clear glass jar of golden pure raw honey with a natural wooden honey dipper and delicate honeycomb pieces';
      keywordSuffix = 'pure raw natural honey glass jar honeycomb wooden dipper photography';
      validationNotes.push('RULE: Pure honey jar + honeycomb aesthetic enforced.');
      break;

    case 'ghee':
      formDescription = 'traditional artisanal glass jar filled with rich golden granular pure desi cow ghee on a clean wooden plate';
      keywordSuffix = 'pure desi cow ghee traditional glass jar golden granular photography';
      validationNotes.push('RULE: Traditional ghee jar presentation enforced.');
      break;

    case 'dry_fruit':
      formDescription = 'crisp premium whole dried fruits and gourmet nuts cleanly gathered in a modern ceramic bowl';
      keywordSuffix = 'premium whole dry fruits nuts bowl healthy snacking product photography';
      validationNotes.push('RULE: Whole nuts & dry fruits in bowl presentation.');
      break;

    case 'seed':
      formDescription = 'wholesome edible organic seeds neatly presented in a handcrafted ceramic bowl with scattered whole seeds';
      keywordSuffix = 'organic edible seeds superfood bowl healthy food product photography';
      validationNotes.push('RULE: Edible seeds in clean bowl presentation.');
      break;

    case 'jaggery':
      formDescription = 'natural unprocessed golden-brown jaggery gur chunks and organic jaggery powder on a clean wooden surface';
      keywordSuffix = 'natural jaggery gur block pieces organic sweetener product photography';
      validationNotes.push('RULE: Natural jaggery blocks and powder presentation.');
      break;

    case 'spice_whole':
      formDescription = 'whole aromatic culinary spices elegantly arranged in a traditional spice bowl';
      keywordSuffix = 'whole aromatic spices culinary natural ingredients photography';
      validationNotes.push('RULE: Whole spice presentation.');
      break;

    default:
      formDescription = 'premium organic wellness product in an aesthetic minimalist setup';
      keywordSuffix = 'ayurvedic wellness natural organic product photography';
  }

  const generatedKeywords = `${clean} ${keywordSuffix}`.replace(/\s+/g, ' ').trim();

  const aiPrompt = `Award-winning commercial product photography of ${clean} (${resolvedIngredient}). The shot highlights ${formDescription}. Studio lighting, soft shadows, pristine minimalist light cream natural background, luxury organic wellness brand aesthetic, centered composition, ultra-sharp focus, 8k resolution, no text, no logos, no watermarks, no packaging labels, photorealistic masterpiece.`;

  return {
    originalName: name,
    category,
    subcategory,
    cleanIngredient: clean,
    productForm: form,
    generatedKeywords,
    aiPrompt,
    confidenceScore,
    validationNotes,
  };
}
