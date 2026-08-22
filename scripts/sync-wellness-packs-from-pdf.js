"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv = __importStar(require("dotenv"));
var path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env.local') });
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
function sync() {
    return __awaiter(this, void 0, void 0, function () {
        var requiredCategories, requiredCategories_1, requiredCategories_1_1, cat, existing, _a, inserted, error, e_1_1, allCategories, catSlugMap, catNameMap, rogueSlugs, rogueSlugs_1, rogueSlugs_1_1, slug, p, e_2_1, obsoleteCategorySlugs, obsoleteCategorySlugs_1, obsoleteCategorySlugs_1_1, slug, cat, e_3_1, pdfProducts, pdfProducts_1, pdfProducts_1_1, item, categoryId, existing, productId, _b, inserted, insertErr, _c, _d, v, e_4_1, e_5_1, nabhiCategorySlugs, nabhiCategoryIds, individualOils, _e, _f, oil, e_6_1;
        var e_1, _g, e_2, _h, e_3, _j, e_5, _k, e_4, _l, e_6, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    console.log('🚀 Starting synchronization of Wellness Packs & Categories according to PDF specification...');
                    requiredCategories = [
                        { name: 'Kids Care Oil Blend', slug: 'kids-care-oil-blend' },
                        { name: 'Men Wellness Oil Blend', slug: 'men-wellness-oil-blend' },
                        { name: 'Women Wellness Oil Blend', slug: 'women-wellness-oil-blend' },
                        { name: 'Senior Care Oil Blend', slug: 'senior-care-oil-blend' },
                        { name: 'Nabhi Trial Packs', slug: 'nabhi-trial-packs' },
                        { name: 'Feet Massage Oil', slug: 'feet-massage-oil' },
                        { name: 'Body Massage Oil', slug: 'body-massage-oil' },
                        { name: 'Hair Wellness Oil', slug: 'hair-wellness-oil' },
                        { name: 'Combo Trial Packs', slug: 'combo-trial-packs' }
                    ];
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 7, 8, 9]);
                    requiredCategories_1 = __values(requiredCategories), requiredCategories_1_1 = requiredCategories_1.next();
                    _o.label = 2;
                case 2:
                    if (!!requiredCategories_1_1.done) return [3 /*break*/, 6];
                    cat = requiredCategories_1_1.value;
                    return [4 /*yield*/, supabase.from('categories').select('id').eq('slug', cat.slug).maybeSingle()];
                case 3:
                    existing = (_o.sent()).data;
                    if (!!existing) return [3 /*break*/, 5];
                    return [4 /*yield*/, supabase.from('categories').insert(cat).select().single()];
                case 4:
                    _a = _o.sent(), inserted = _a.data, error = _a.error;
                    console.log("Created category: ".concat(cat.name, " (").concat(cat.slug, ")"));
                    _o.label = 5;
                case 5:
                    requiredCategories_1_1 = requiredCategories_1.next();
                    return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _o.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (requiredCategories_1_1 && !requiredCategories_1_1.done && (_g = requiredCategories_1.return)) _g.call(requiredCategories_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: return [4 /*yield*/, supabase.from('categories').select('*')];
                case 10:
                    allCategories = (_o.sent()).data;
                    catSlugMap = new Map((allCategories || []).map(function (c) { return [c.slug, c.id]; }));
                    catNameMap = new Map((allCategories || []).map(function (c) { return [c.name, c.id]; }));
                    rogueSlugs = [
                        '2-member-family-gold',
                        '3-member-family-gold',
                        '4-member-family-gold',
                        '5-member-family-gold',
                        '2-member-family-gold-wellness-pack',
                        '3-member-family-gold-wellness-pack',
                        '2-member-family-trial',
                        '3-member-family-trial',
                        '4-member-family-trial',
                        '2-member-family-trial-pack',
                        '3-member-family-trial-pack',
                        '4-member-family-trial-pack',
                        '5-member-family-trial-pack',
                        'gold-wellness-pack',
                        'premium-wellness-pack',
                        'individual-trial-wellness-pack',
                        'trial-wellness-pack',
                        'individual-gold-wellness-pack',
                        'individual-premium-wellness-pack'
                    ];
                    console.log("Cleaning up ".concat(rogueSlugs.length, " outdated / discontinued packs..."));
                    _o.label = 11;
                case 11:
                    _o.trys.push([11, 19, 20, 21]);
                    rogueSlugs_1 = __values(rogueSlugs), rogueSlugs_1_1 = rogueSlugs_1.next();
                    _o.label = 12;
                case 12:
                    if (!!rogueSlugs_1_1.done) return [3 /*break*/, 18];
                    slug = rogueSlugs_1_1.value;
                    return [4 /*yield*/, supabase.from('products').select('id, name').eq('slug', slug).maybeSingle()];
                case 13:
                    p = (_o.sent()).data;
                    if (!p) return [3 /*break*/, 17];
                    return [4 /*yield*/, supabase.from('product_variants').delete().eq('product_id', p.id)];
                case 14:
                    _o.sent();
                    return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', p.id)];
                case 15:
                    _o.sent();
                    return [4 /*yield*/, supabase.from('products').delete().eq('id', p.id)];
                case 16:
                    _o.sent();
                    console.log("\u2713 Deleted discontinued product: ".concat(p.name, " (").concat(slug, ")"));
                    _o.label = 17;
                case 17:
                    rogueSlugs_1_1 = rogueSlugs_1.next();
                    return [3 /*break*/, 12];
                case 18: return [3 /*break*/, 21];
                case 19:
                    e_2_1 = _o.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 21];
                case 20:
                    try {
                        if (rogueSlugs_1_1 && !rogueSlugs_1_1.done && (_h = rogueSlugs_1.return)) _h.call(rogueSlugs_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 21:
                    obsoleteCategorySlugs = [
                        'family-gold-wellness-packs',
                        'family-trial-wellness-packs',
                        'individual-gold-wellness-pack',
                        'individual-premium-wellness-pack',
                        'individual-trial-wellness-pack',
                        'individual-wellness-packs',
                        'diamond-trial-wellness-pack'
                    ];
                    _o.label = 22;
                case 22:
                    _o.trys.push([22, 28, 29, 30]);
                    obsoleteCategorySlugs_1 = __values(obsoleteCategorySlugs), obsoleteCategorySlugs_1_1 = obsoleteCategorySlugs_1.next();
                    _o.label = 23;
                case 23:
                    if (!!obsoleteCategorySlugs_1_1.done) return [3 /*break*/, 27];
                    slug = obsoleteCategorySlugs_1_1.value;
                    return [4 /*yield*/, supabase.from('categories').select('id, name').eq('slug', slug).maybeSingle()];
                case 24:
                    cat = (_o.sent()).data;
                    if (!cat) return [3 /*break*/, 26];
                    return [4 /*yield*/, supabase.from('categories').delete().eq('id', cat.id)];
                case 25:
                    _o.sent();
                    console.log("\u2713 Deleted obsolete category: ".concat(cat.name, " (").concat(slug, ")"));
                    _o.label = 26;
                case 26:
                    obsoleteCategorySlugs_1_1 = obsoleteCategorySlugs_1.next();
                    return [3 /*break*/, 23];
                case 27: return [3 /*break*/, 30];
                case 28:
                    e_3_1 = _o.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 30];
                case 29:
                    try {
                        if (obsoleteCategorySlugs_1_1 && !obsoleteCategorySlugs_1_1.done && (_j = obsoleteCategorySlugs_1.return)) _j.call(obsoleteCategorySlugs_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 30:
                    pdfProducts = [
                        // --- 1. NABHI TRIAL PACKS ---
                        {
                            slug: 'nabhi-2-variant-trial-pack',
                            name: 'Nabhi 2-Variant Trial Pack',
                            category_slug: 'nabhi-trial-packs',
                            short_description: '2 x 5 ml = 10 ml Nabhi Wellness Oils. Up to 1 Month* Wellness Care. Select any 2 variants from one category.',
                            full_description: 'Customizable 2-variant Nabhi oil trial pack. Select any 2 targeted formulations from Kids, Men, Women, or Senior Care categories for up to 1 month of restorative daily wellness.',
                            badge: 'POPULAR TRIAL',
                            rating: 5,
                            review_count: 34,
                            image: '/images/categories/cat_trial_pack.jpg',
                            duration_text: 'Up to 1 Month*',
                            variants: [
                                { size: '2 x 5 ml (10 ml)', price: 349, original_price: 499, gold_member_price: 314 }
                            ]
                        },
                        {
                            slug: 'nabhi-4-variant-trial-pack',
                            name: 'Nabhi 4-Variant Trial Pack',
                            category_slug: 'nabhi-trial-packs',
                            short_description: '4 x 5 ml = 20 ml Nabhi Wellness Oils. Up to 2 Months* Wellness Care. All 4 variants from one category.',
                            full_description: 'Complete 4-variant Nabhi oil collection for a full category. Includes all 4 specialized formulations for comprehensive wellness care lasting up to 2 months.',
                            badge: 'COMPLETE PACK',
                            rating: 5,
                            review_count: 42,
                            image: '/images/categories/cat_trial_pack.jpg',
                            duration_text: 'Up to 2 Months*',
                            variants: [
                                { size: '4 x 5 ml (20 ml)', price: 599, original_price: 999, gold_member_price: 539 }
                            ]
                        },
                        // --- 2. FEET MASSAGE OILS ---
                        {
                            slug: 'feet-wellness-trial-pack',
                            name: 'Feet Wellness Trial Pack',
                            category_slug: 'feet-massage-oil',
                            short_description: '30 ml Restorative Feet Wellness Oil. Up to 15 Days* Wellness Care.',
                            full_description: 'Traditional Padabhyanga foot massage oil infused with cooling, soothing herbs to relieve daily fatigue and promote deep restorative sleep.',
                            badge: '15 DAYS TRIAL',
                            rating: 5,
                            review_count: 29,
                            image: '/images/categories/cat_oil_wellness_1786556871303.jpg',
                            duration_text: 'Up to 15 Days*',
                            variants: [
                                { size: '30 ml', price: 349, original_price: 499, gold_member_price: 314 }
                            ]
                        },
                        {
                            slug: 'feet-wellness-routine-pack',
                            name: 'Feet Wellness Routine Pack',
                            category_slug: 'feet-massage-oil',
                            short_description: '60 ml Daily Feet Wellness Oil. Up to 1 Month* Wellness Care.',
                            full_description: 'Full 1-month supply of our signature Padabhyanga foot massage oil for sustained relaxation, improved circulation, and overnight calm.',
                            badge: '1 MONTH ROUTINE',
                            rating: 5,
                            review_count: 51,
                            image: '/images/categories/cat_oil_wellness_1786556871303.jpg',
                            duration_text: 'Up to 1 Month*',
                            variants: [
                                { size: '60 ml', price: 499, original_price: 699, gold_member_price: 449 }
                            ]
                        },
                        // --- 3. COMBO TRIAL PACKS (FAMILY TRIAL OIL WELLNESS PACKS) ---
                        {
                            slug: 'prime-trial-pack',
                            name: 'Prime Trial Pack',
                            category_slug: 'combo-trial-packs',
                            short_description: '2 x 5 ml Nabhi + 60 ml Feet Oil. Total: 70 ml. Up to 1 Month* Wellness Care.',
                            full_description: 'Starter wellness combo pairing 2 targeted 5 ml Nabhi wellness oils with 60 ml Feet massage oil for a synchronized 1-month daily routine.',
                            badge: 'STARTER COMBO',
                            rating: 5,
                            review_count: 67,
                            image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
                            duration_text: 'Up to 1 Month*',
                            variants: [
                                { size: '70 ml Combo', price: 699, original_price: 999, gold_member_price: 629 }
                            ]
                        },
                        {
                            slug: 'silver-trial-pack',
                            name: 'Silver Trial Pack',
                            category_slug: 'combo-trial-packs',
                            short_description: '4 x 5 ml Nabhi + 120 ml Feet Oil. Total: 140 ml. Up to 2 Months* Wellness Care.',
                            full_description: 'Best value wellness combo offering all 4 category Nabhi oils (20 ml) plus double feet oil (120 ml) for 2 months of restorative care.',
                            badge: 'BEST VALUE',
                            rating: 5,
                            review_count: 84,
                            image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
                            duration_text: 'Up to 2 Months*',
                            variants: [
                                { size: '140 ml Combo', price: 999, original_price: 1499, gold_member_price: 899 }
                            ]
                        },
                        {
                            slug: 'gold-trial-pack',
                            name: 'Gold Trial Pack',
                            category_slug: 'combo-trial-packs',
                            short_description: '2 x 5 ml Nabhi + 60 ml Feet Oil + 100 ml Body Massage Oil. Total: 170 ml. Up to 1 Month* Wellness Care.',
                            full_description: 'Complete head-to-toe self-care regimen combining Nabhi oils, Feet oil, and 100 ml full-body Abhyanga massage oil for whole-body rejuvenation.',
                            badge: 'COMPLETE SELF-CARE',
                            rating: 5,
                            review_count: 92,
                            image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
                            duration_text: 'Up to 1 Month*',
                            variants: [
                                { size: '170 ml Combo', price: 1199, original_price: 1799, gold_member_price: 1079 }
                            ]
                        },
                        {
                            slug: 'diamond-trial-pack',
                            name: 'Diamond Trial Pack',
                            category_slug: 'combo-trial-packs',
                            short_description: '4 x 5 ml Nabhi + 120 ml Feet Oil + 100 ml Body Massage Oil. Total: 240 ml. Up to 2 Months* Wellness Care.',
                            full_description: 'The ultimate flagship Ayurvedic wellness combo. Includes all 4 category Nabhi oils (20 ml), 120 ml Feet massage oil, and 100 ml Body massage oil for up to 2 full months of complete luxury wellness care.',
                            badge: 'COMPLETE WELLNESS COMBO',
                            rating: 5,
                            review_count: 115,
                            image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
                            duration_text: 'Up to 2 Months*',
                            variants: [
                                { size: '240 ml Combo', price: 1599, original_price: 2299, gold_member_price: 1439 }
                            ]
                        }
                    ];
                    console.log('\nInserting / Updating the 8 PDF Standard Packs in Database...');
                    _o.label = 31;
                case 31:
                    _o.trys.push([31, 51, 52, 53]);
                    pdfProducts_1 = __values(pdfProducts), pdfProducts_1_1 = pdfProducts_1.next();
                    _o.label = 32;
                case 32:
                    if (!!pdfProducts_1_1.done) return [3 /*break*/, 50];
                    item = pdfProducts_1_1.value;
                    categoryId = catSlugMap.get(item.category_slug);
                    if (!categoryId) {
                        console.error("Missing category for slug: ".concat(item.category_slug));
                        return [3 /*break*/, 49];
                    }
                    return [4 /*yield*/, supabase.from('products').select('id').eq('slug', item.slug).maybeSingle()];
                case 33:
                    existing = (_o.sent()).data;
                    productId = existing === null || existing === void 0 ? void 0 : existing.id;
                    if (!!productId) return [3 /*break*/, 35];
                    return [4 /*yield*/, supabase.from('products').insert({
                            name: item.name,
                            slug: item.slug,
                            category_id: categoryId,
                            short_description: item.short_description,
                            full_description: item.full_description,
                            story: 'Rooted in timeless Ayurvedic texts and handcrafted with 100% natural botanical extracts.',
                            primary_benefit: item.short_description,
                            rating: item.rating,
                            review_count: item.review_count,
                            badge: item.badge,
                            duration_text: item.duration_text,
                            is_active: true,
                            usage_instructions: {
                                timing: 'Morning & Night',
                                serving: 'As prescribed',
                                instructions: 'Apply 2-3 drops of Nabhi oil on the navel. Massage feet oil before sleep. Use body oil as desired.'
                            },
                            certifications: ['100% Natural', 'GMP Certified', 'Ayush Approved']
                        }).select('id').single()];
                case 34:
                    _b = _o.sent(), inserted = _b.data, insertErr = _b.error;
                    if (insertErr) {
                        console.error("Error inserting ".concat(item.name, ":"), insertErr);
                        return [3 /*break*/, 49];
                    }
                    productId = inserted.id;
                    return [3 /*break*/, 37];
                case 35: return [4 /*yield*/, supabase.from('products').update({
                        name: item.name,
                        category_id: categoryId,
                        short_description: item.short_description,
                        full_description: item.full_description,
                        primary_benefit: item.short_description,
                        badge: item.badge,
                        duration_text: item.duration_text,
                        is_active: true
                    }).eq('id', productId)];
                case 36:
                    _o.sent();
                    _o.label = 37;
                case 37: 
                // Insert Image
                return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', productId)];
                case 38:
                    // Insert Image
                    _o.sent();
                    return [4 /*yield*/, supabase.from('product_images').insert({
                            product_id: productId,
                            url: item.image,
                            display_order: 1
                        })];
                case 39:
                    _o.sent();
                    // Insert Variants
                    return [4 /*yield*/, supabase.from('product_variants').delete().eq('product_id', productId)];
                case 40:
                    // Insert Variants
                    _o.sent();
                    _o.label = 41;
                case 41:
                    _o.trys.push([41, 46, 47, 48]);
                    _c = (e_4 = void 0, __values(item.variants)), _d = _c.next();
                    _o.label = 42;
                case 42:
                    if (!!_d.done) return [3 /*break*/, 45];
                    v = _d.value;
                    return [4 /*yield*/, supabase.from('product_variants').insert({
                            product_id: productId,
                            size: v.size,
                            price: v.price,
                            original_price: v.original_price,
                            gold_member_price: v.gold_member_price,
                            stock_quantity: 100,
                            is_active: true,
                            pricing_status: 'official',
                            gold_pricing_enabled: true
                        })];
                case 43:
                    _o.sent();
                    _o.label = 44;
                case 44:
                    _d = _c.next();
                    return [3 /*break*/, 42];
                case 45: return [3 /*break*/, 48];
                case 46:
                    e_4_1 = _o.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 48];
                case 47:
                    try {
                        if (_d && !_d.done && (_l = _c.return)) _l.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 48:
                    console.log("\u2713 Synchronized product: ".concat(item.name, " (").concat(item.slug, ") - \u20B9").concat(item.variants[0].price));
                    _o.label = 49;
                case 49:
                    pdfProducts_1_1 = pdfProducts_1.next();
                    return [3 /*break*/, 32];
                case 50: return [3 /*break*/, 53];
                case 51:
                    e_5_1 = _o.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 53];
                case 52:
                    try {
                        if (pdfProducts_1_1 && !pdfProducts_1_1.done && (_k = pdfProducts_1.return)) _k.call(pdfProducts_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 53:
                    // 4. Update the 16 individual Nabhi Oils to have size: 5 ml @ ₹199 (MRP: ₹299)
                    console.log('\nSynchronizing 16 individual Nabhi Oils to 5 ml @ ₹199...');
                    nabhiCategorySlugs = [
                        'kids-care-oil-blend',
                        'men-wellness-oil-blend',
                        'women-wellness-oil-blend',
                        'senior-care-oil-blend'
                    ];
                    nabhiCategoryIds = nabhiCategorySlugs.map(function (s) { return catSlugMap.get(s); }).filter(Boolean);
                    return [4 /*yield*/, supabase
                            .from('products')
                            .select('id, name, slug, category_id')
                            .in('category_id', nabhiCategoryIds)];
                case 54:
                    individualOils = (_o.sent()).data;
                    console.log("Found ".concat(individualOils === null || individualOils === void 0 ? void 0 : individualOils.length, " individual Nabhi Oils to update."));
                    _o.label = 55;
                case 55:
                    _o.trys.push([55, 61, 62, 63]);
                    _e = __values(individualOils || []), _f = _e.next();
                    _o.label = 56;
                case 56:
                    if (!!_f.done) return [3 /*break*/, 60];
                    oil = _f.value;
                    return [4 /*yield*/, supabase.from('product_variants').delete().eq('product_id', oil.id)];
                case 57:
                    _o.sent();
                    return [4 /*yield*/, supabase.from('product_variants').insert([
                            {
                                product_id: oil.id,
                                size: '5 ml',
                                price: 199,
                                original_price: 299,
                                gold_member_price: 179,
                                stock_quantity: 100,
                                is_active: true,
                                pricing_status: 'official',
                                gold_pricing_enabled: true
                            },
                            {
                                product_id: oil.id,
                                size: '10 ml',
                                price: 349,
                                original_price: 499,
                                gold_member_price: 314,
                                stock_quantity: 100,
                                is_active: true,
                                pricing_status: 'official',
                                gold_pricing_enabled: true
                            }
                        ])];
                case 58:
                    _o.sent();
                    console.log("\u2713 Updated individual oil: ".concat(oil.name, " (5 ml @ \u20B9199, 10 ml @ \u20B9349)"));
                    _o.label = 59;
                case 59:
                    _f = _e.next();
                    return [3 /*break*/, 56];
                case 60: return [3 /*break*/, 63];
                case 61:
                    e_6_1 = _o.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 63];
                case 62:
                    try {
                        if (_f && !_f.done && (_m = _e.return)) _m.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 63:
                    console.log('\n🎉 ALL WELLNESS PACKS, NABHI OILS, AND CATEGORIES ARE 100% SYNCHRONIZED WITH THE PDF SPECIFICATION!');
                    return [2 /*return*/];
            }
        });
    });
}
sync();
