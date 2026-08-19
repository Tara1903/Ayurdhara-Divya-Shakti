const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const products = [];

function makeNabhi(name, cat) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    products.push({
        id: crypto.randomUUID(), slug, name, category: cat,
        short_description: "Premium Ayurvedic wellness blend.",
        full_description: "Experience the timeless benefits of daily self-care.",
        story: "Rooted in ancient Ayurvedic texts.",
        primary_benefit: "Supports daily vitality.", benefits: [], ingredients: [],
        
        rating: 5.0, review_count: 12,
        badge: "100% NATURAL", ideal_for: [], usage_instructions: { serving: "3 Drops", timing: "Night", instructions: "Apply in belly button." },
        specifications: {}, certifications: ["100% Natural"], faqs: [], related_product_ids: [], routine_product_ids: [], duration_text: "Up to 1 Month",
        variants: [
            { size: "10 ml", price: 199, original_price: 299, image_url: "" },
            { size: "20 ml", price: 349, original_price: 499, image_url: "" }
        ]
    });
}

const nabhis = [
    ["Kids Smart Oil Blend", "Kids Care Oil Blend"],
    ["Kids Growth Oil Blend", "Kids Care Oil Blend"],
    ["Kids Calm Oil Blend", "Kids Care Oil Blend"],
    ["Kids Daily Care Oil Blend", "Kids Care Oil Blend"],
    ["Men Strength Oil Blend", "Men Wellness Oil Blend"],
    ["Men Active Oil Blend", "Men Wellness Oil Blend"],
    ["Men Heart Balance Oil Blend", "Men Wellness Oil Blend"],
    ["Men Daily Wellness Oil Blend", "Men Wellness Oil Blend"],
    ["Women Harmony Oil Blend", "Women Wellness Oil Blend"],
    ["Women Care Oil Blend", "Women Wellness Oil Blend"],
    ["Women Glow Oil Blend", "Women Wellness Oil Blend"],
    ["Women Daily Wellness Oil Blend", "Women Wellness Oil Blend"],
    ["Senior Comfort Oil Blend", "Senior Care Oil Blend"],
    ["Senior Active Oil Blend", "Senior Care Oil Blend"],
    ["Senior Balance Oil Blend", "Senior Care Oil Blend"],
    ["Senior Daily Wellness Oil Blend", "Senior Care Oil Blend"]
];
nabhis.forEach(n => makeNabhi(n[0], n[1]));

function makeMassage(name, cat, variants) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    products.push({
        id: crypto.randomUUID(), slug, name, category: cat,
        short_description: "Premium Ayurvedic wellness massage oil.",
        full_description: "Experience the timeless benefits of daily self-care.",
        story: "Rooted in ancient Ayurvedic texts.",
        primary_benefit: "Supports daily vitality.", benefits: [], ingredients: [],
        
        rating: 5.0, review_count: 12,
        badge: "100% NATURAL", ideal_for: [], usage_instructions: { serving: "As needed", timing: "Daily", instructions: "Apply and massage gently." },
        specifications: {}, certifications: ["100% Natural"], faqs: [], related_product_ids: [], routine_product_ids: [], duration_text: "Varies by usage",
        variants
    });
}

makeMassage("Body Massage Oil", "Body Massage Oil", [
    { size: "50 ml", price: 349, original_price: 499, image_url: "" },
    { size: "100 ml", price: 599, original_price: 899, image_url: "" },
    { size: "200 ml", price: 999, original_price: 1499, image_url: "" }
]);

makeMassage("Feet Massage Oil", "Feet Massage Oil", [
    { size: "30 ml", price: 399, original_price: 599, image_url: "" },
    { size: "100 ml", price: 1199, original_price: 1799, image_url: "" },
    { size: "200 ml", price: 2199, original_price: 3299, image_url: "" }
]);

makeMassage("Hair Wellness Oil", "Hair Wellness Oil", [
    { size: "50 ml", price: 499, original_price: 699, image_url: "" },
    { size: "100 ml", price: 899, original_price: 1299, image_url: "" },
    { size: "200 ml", price: 1799, original_price: 2499, image_url: "" }
]);

function makePack(name, cat, variants, dur) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    products.push({
        id: crypto.randomUUID(), slug, name, category: cat,
        short_description: "Premium Family Wellness Pack for holistic care.",
        full_description: "Experience the timeless benefits of daily self-care together.",
        story: "Rooted in ancient Ayurvedic texts.",
        primary_benefit: "Supports daily vitality for the family.", benefits: [], ingredients: [],
        
        rating: 5.0, review_count: 12,
        badge: "FAMILY SAVING", ideal_for: [], usage_instructions: { serving: "As needed", timing: "Daily", instructions: "Use as directed." },
        specifications: {}, certifications: ["100% Natural"], faqs: [], related_product_ids: [], routine_product_ids: [], duration_text: dur,
        variants
    });
}

makePack("Trial Wellness Pack", "Individual Wellness Packs", [{size: "Standard", price: 499, original_price: 749, image_url: ""}], "Up to 1 Month");
makePack("Diamond Trial Wellness Pack", "Individual Wellness Packs", [{size: "Standard", price: 999, original_price: 1499, image_url: ""}], "Up to 1 Month");
makePack("Gold Wellness Pack", "Individual Wellness Packs", [{size: "Standard", price: 1799, original_price: 2499, image_url: ""}], "Up to 4 Months");
makePack("Premium Wellness Pack", "Individual Wellness Packs", [{size: "Standard", price: 3299, original_price: 4999, image_url: ""}], "Up to 8 Months");

makePack("2 Member Family Trial", "Family Trial Wellness Packs", [{size: "Standard", price: 899, original_price: 1499, image_url: ""}], "Up to 1 Month");
makePack("3 Member Family Trial", "Family Trial Wellness Packs", [{size: "Standard", price: 1299, original_price: 2249, image_url: ""}], "Up to 1 Month");
makePack("4 Member Family Trial", "Family Trial Wellness Packs", [{size: "Standard", price: 1699, original_price: 2999, image_url: ""}], "Up to 1 Month");
makePack("5 Member Family Trial", "Family Trial Wellness Packs", [{size: "Standard", price: 2099, original_price: 3749, image_url: ""}], "Up to 1 Month");

makePack("2 Member Family Gold", "Family Gold Wellness Packs", [{size: "Standard", price: 3999, original_price: 5499, image_url: ""}], "Up to 4 Months");
makePack("3 Member Family Gold", "Family Gold Wellness Packs", [{size: "Standard", price: 5799, original_price: 8249, image_url: ""}], "Up to 4 Months");
makePack("4 Member Family Gold", "Family Gold Wellness Packs", [{size: "Standard", price: 7499, original_price: 10999, image_url: ""}], "Up to 4 Months");
makePack("5 Member Family Gold", "Family Gold Wellness Packs", [{size: "Standard", price: 8999, original_price: 13749, image_url: ""}], "Up to 4 Months");

async function sync() {
    console.log("Fetching categories...");
    const { data: catData, error: catErr } = await supabase.from('categories').select('id, name, slug');
    const catMap = {};
    catData.forEach(c => catMap[c.name] = c.id);

    const neededCategories = ['Body Massage Oil', 'Family Trial Wellness Packs', 'Family Gold Wellness Packs'];
    for (const catName of neededCategories) {
        if (!catMap[catName]) {
            const slug = catName.toLowerCase().replace(/ /g, '-');
            const id = crypto.randomUUID();
            await supabase.from('categories').insert({ id, name: catName, slug });
            catMap[catName] = id;
            console.log(`Created category ${catName}`);
        }
    }

    console.log("Inserting new products...");
    for (const p of products) {
        const variants = p.variants;
        delete p.variants;
        const catName = p.category;
        delete p.category; delete p.benefits; delete p.ingredients; delete p.ideal_for;
        p.category_id = catMap[catName];
        p.is_active = true;
        p.created_at = new Date().toISOString();
        p.updated_at = new Date().toISOString();

        // Note: deleted products was handled in previous run, so let's check if it exists or we can just insert.
        // Actually, we must delete it first in case script failed halfway.
        await supabase.from('products').delete().eq('slug', p.slug);

        const { error: pErr } = await supabase.from('products').insert(p);
        if (pErr) { console.error("Error inserting product", p.name, pErr); continue; }

        for (const v of variants) {
            const variantData = {
                id: crypto.randomUUID(),
                product_id: p.id,
                size: v.size,
                price: v.price,
                original_price: v.original_price,
                
                stock_quantity: 100,
                
                
                is_active: true
            };
            const { error: vErr } = await supabase.from('product_variants').insert(variantData);
            if (vErr) console.error("Error inserting variant", v.size, vErr);
        }
        
        // Also images
        await supabase.from('product_images').insert({
            id: crypto.randomUUID(),
            product_id: p.id,
            url: p.primary_image_url,
            display_order: 0,
            created_at: new Date().toISOString()
        });

        console.log(`Inserted ${p.name} with ${variants.length} variants`);
    }
    console.log("Sync complete!");
}

sync();
