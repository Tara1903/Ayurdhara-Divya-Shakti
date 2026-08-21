const crypto = require('crypto');
const fs = require('fs');

const uuid = () => crypto.randomUUID();

const categories = [
    ["Essential Oils", "essential-oils"],
    ["Natural Fragrance", "natural-fragrance"],
    ["Wellness Aroma", "wellness-aroma"],
    ["Diffuser Blends", "diffuser-blends"],
    ["Essential Oil Combos", "essential-oil-combos"]
];

const products = {
    "Essential Oils": [
        ["Lavender Essential Oil", "Soft, floral and calming aroma for a peaceful everyday atmosphere."],
        ["Peppermint Essential Oil", "Fresh, cool and invigorating aroma for a refreshing environment."],
        ["Eucalyptus Essential Oil", "Clean, fresh and distinctive aromatic profile for an uplifting atmosphere."],
        ["Tea Tree Essential Oil", "Purifying and cleansing aroma for your personal wellness routine."],
        ["Rosemary Essential Oil", "Herbaceous and stimulating aroma to foster a focused atmosphere."],
        ["Lemongrass Essential Oil", "Citrusy and bright aroma for an uplifting environment."],
        ["Frankincense Essential Oil", "Earthy and grounding aroma, perfect for a meditation environment."],
        ["Clove Essential Oil", "Warm and spicy aroma for a comforting atmosphere."],
        ["Cinnamon Essential Oil", "Sweet and spicy aroma to invite warmth into your space."],
        ["Sweet Orange Essential Oil", "Bright, cheerful citrus aroma to uplift the mood."],
        ["Lemon Essential Oil", "Crisp and fresh citrus aroma for a clean-smelling space."],
        ["Geranium Essential Oil", "Floral and balancing aroma for everyday self-care."],
        ["Ylang Ylang Essential Oil", "Rich and sweet floral aroma for a relaxing atmosphere."],
        ["Patchouli Essential Oil", "Deep, earthy aroma for grounding and relaxation."]
    ],
    "Natural Fragrance": [
        ["Rose Aroma", "Classic and romantic floral aroma for an elegant atmosphere."],
        ["Jasmine Aroma", "Exotic and sweet floral aroma for a relaxing environment."],
        ["Lavender Aroma", "Gentle and soothing aroma inspired by natural lavender fields."],
        ["Sandalwood Aroma", "Woody and rich aroma for a grounding meditation environment."],
        ["Mogra Aroma", "Intense and sweet floral aroma for a refreshing atmosphere."],
        ["Kewda Aroma", "Unique and traditional floral aroma for a pleasant space."],
        ["Vetiver / Khus Aroma", "Cool and earthy aroma for a tranquil environment."]
    ],
    "Wellness Aroma": [
        ["Relaxation Aroma", "A calming blend designed to promote a peaceful and relaxing atmosphere."],
        ["Fresh & Clean Aroma", "A crisp and purifying aroma for a refreshing environment."],
        ["Meditation Aroma", "A grounding and centering aroma to support your meditation practice."],
        ["Sleep-Time Aroma", "A soothing and gentle aroma to prepare your space for rest."]
    ],
    "Diffuser Blends": [
        ["Relaxation Diffuser Blend", "A specially formulated blend to fill your space with a peaceful aroma."],
        ["Fresh & Clean Diffuser Blend", "A refreshing blend to invigorate and freshen your environment."],
        ["Meditation Diffuser Blend", "A grounding blend perfect for enhancing your meditation atmosphere."],
        ["Sleep-Time Diffuser Blend", "A calming blend to create a tranquil environment for winding down."]
    ],
    "Essential Oil Combos": [
        ["Essential Oil Starter Combo", "A perfect introduction to natural aromas for everyday self-care."],
        ["Relaxation Aroma Combo", "A curated set of aromas to promote a relaxing atmosphere."],
        ["Fresh & Clean Aroma Combo", "A collection of refreshing aromas for a clean-smelling space."],
        ["Wellness Aroma Combo", "A versatile set of aromas to support your personal wellness journey."],
        ["Essential Oil Discovery Combo", "Explore a variety of natural-inspired aromas for natural living."]
    ]
};

let sql = "";
const catIds = {};

for (const [catName, catSlug] of categories) {
    const catId = uuid();
    catIds[catName] = catId;
    sql += `INSERT INTO categories (id, name, slug) VALUES ('${catId}', '${catName}', '${catSlug}');\n`;
}

for (const [catName, prods] of Object.entries(products)) {
    const catId = catIds[catName];
    for (const [pName, pDesc] of prods) {
        const pId = uuid();
        const pSlug = pName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/\//g, '').replace(/--/g, '-');
        
        sql += `INSERT INTO products (id, name, slug, category_id, short_description, full_description, is_active) VALUES ('${pId}', '${pName}', '${pSlug}', '${catId}', '${pDesc.replace(/'/g, "''")}', '${pDesc.replace(/'/g, "''")}', true);\n`;
        
        const vId = uuid();
        sql += `INSERT INTO product_variants (id, product_id, size, price, original_price, is_active) VALUES ('${vId}', '${pId}', '15 ml', 0, 0, true);\n`;
    }
}

fs.writeFileSync('add_fragrance.sql', sql);
console.log('Generated add_fragrance.sql');
