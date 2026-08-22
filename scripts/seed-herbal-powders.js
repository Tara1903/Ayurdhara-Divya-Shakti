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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}
var SINGLE_HERB_POWDER = [
    { name: 'Ashwagandha Powder', slug: 'ashwagandha-powder', cat: 'Single Herb Powder', desc: 'Finely powdered ashwagandha root, presented as a single botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [149, 269, 599, 999], prices: [129, 229, 499, 849], ingredients: '100% Ashwagandha Powder' },
    { name: 'Shatavari Powder', slug: 'shatavari-powder', cat: 'Single Herb Powder', desc: 'Fine shatavari root powder prepared as a single botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [169, 299, 699, 1099], prices: [149, 259, 599, 949], ingredients: '100% Shatavari Powder' },
    { name: 'Brahmi Powder', slug: 'brahmi-powder', cat: 'Single Herb Powder', desc: 'Finely powdered brahmi herb with a naturally herbal character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [139, 249, 549, 899], prices: [119, 209, 469, 769], ingredients: '100% Brahmi Powder' },
    { name: 'Amla Powder', slug: 'amla-powder', cat: 'Single Herb Powder', desc: 'Finely powdered dried amla with its naturally tangy botanical character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Amla Powder' },
    { name: 'Moringa Powder', slug: 'moringa-powder', cat: 'Single Herb Powder', desc: 'Finely powdered moringa leaves with a naturally green herbal profile.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Moringa Powder' },
    { name: 'Turmeric Powder', slug: 'turmeric-powder', cat: 'Single Herb Powder', desc: 'Finely ground turmeric with its naturally warm colour and characteristic earthy aroma.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [79, 179, 329, 599], prices: [69, 149, 279, 499], ingredients: '100% Turmeric Powder' },
    { name: 'Neem Powder', slug: 'neem-powder', cat: 'Single Herb Powder', desc: 'Finely powdered neem leaves presented as a single botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [89, 159, 349, 649], prices: [75, 135, 299, 549], ingredients: '100% Neem Powder' },
    { name: 'Giloy Powder', slug: 'giloy-powder', cat: 'Single Herb Powder', desc: 'Finely powdered dried giloy stem presented as a traditional botanical ingredient.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Giloy Powder' },
    { name: 'Mulethi Powder', slug: 'mulethi-powder', cat: 'Single Herb Powder', desc: 'Finely powdered mulethi root with its naturally sweet and earthy character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [99, 179, 399, 699], prices: [85, 149, 339, 599], ingredients: '100% Mulethi Powder' },
    { name: 'Hibiscus Powder', slug: 'hibiscus-powder', cat: 'Single Herb Powder', desc: 'Finely powdered hibiscus flowers with a naturally floral botanical profile.', sizes: ['50 g', '100 g', '250 g'], mrps: [129, 229, 499], prices: [109, 199, 429], ingredients: '100% Hibiscus Powder' }
];
var WELLNESS_POWDER_BLENDS = [
    { name: 'Daily Herbal Blend', slug: 'daily-herbal-blend', cat: 'Wellness Powder Blends', desc: 'A balanced botanical powder blend created for a simple everyday wellness routine.', sizes: ['100 g', '250 g', '500 g'], mrps: [249, 499, 899], prices: [219, 429, 769], ingredients: 'Amla, Moringa, Tulsi, Ginger' },
    { name: 'Calm Herbal Blend', slug: 'calm-herbal-blend', cat: 'Wellness Powder Blends', desc: 'A gentle botanical blend with a naturally mild and floral character.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Brahmi, Chamomile, Rose' },
    { name: 'Active Herbal Blend', slug: 'active-herbal-blend', cat: 'Wellness Powder Blends', desc: 'A thoughtfully combined botanical powder blend for an active everyday lifestyle.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Ashwagandha, Moringa, Amla' },
    { name: 'Women\'s Wellness Blend', slug: 'womens-wellness-blend', cat: 'Wellness Powder Blends', desc: 'A botanical blend created around a simple women-focused wellness routine.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Shatavari, Amla, Rose' },
    { name: 'Senior Wellness Blend', slug: 'senior-wellness-blend', cat: 'Wellness Powder Blends', desc: 'A simple botanical powder blend designed around an everyday senior wellness lifestyle.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Amla, Moringa, Brahmi' }
];
var SUPERFOOD_POWDERS = [
    { name: 'Moringa Superfood Powder', slug: 'moringa-superfood-powder', cat: 'Superfood Powders', desc: 'Fine moringa leaf powder with a naturally green colour and earthy botanical character.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ingredients: '100% Moringa Powder' },
    { name: 'Beetroot Powder', slug: 'beetroot-powder', cat: 'Superfood Powders', desc: 'Finely powdered beetroot with its naturally rich colour and earthy-sweet character.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ingredients: '100% Beetroot Powder' },
    { name: 'Amaranth Powder', slug: 'amaranth-powder', cat: 'Superfood Powders', desc: 'Finely milled amaranth as a convenient food-based powder.', sizes: ['100 g', '250 g', '500 g'], mrps: [179, 399, 699], prices: [149, 339, 599], ingredients: '100% Amaranth Powder' },
    { name: 'Flaxseed Powder', slug: 'flaxseed-powder', cat: 'Superfood Powders', desc: 'Freshly milled flaxseed powder with its naturally nutty character.', sizes: ['100 g', '250 g', '500 g'], mrps: [149, 329, 599], prices: [129, 279, 509], ingredients: '100% Flaxseed Powder' },
    { name: 'Chia Seed Powder', slug: 'chia-seed-powder', cat: 'Superfood Powders', desc: 'Finely milled chia seed powder for convenient everyday food use.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ingredients: '100% Chia Seed Powder' },
    { name: 'Cocoa Powder', slug: 'cocoa-powder', cat: 'Superfood Powders', desc: 'Fine cocoa powder with a naturally rich and deep cocoa flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 399, 699], prices: [169, 339, 599], ingredients: '100% Cocoa Powder' }
];
var DAILY_NUTRITION_POWDERS = [
    { name: 'Daily Nutrition Mix', slug: 'daily-nutrition-mix', cat: 'Daily Nutrition Powders', desc: 'A convenient everyday nutrition mix designed to complement regular meals and beverages.', sizes: ['200 g', '500 g'], mrps: [399, 799], prices: [349, 699], ingredients: 'Roasted grains, seeds, selected food ingredients' },
    { name: 'Family Nutrition Mix', slug: 'family-nutrition-mix', cat: 'Daily Nutrition Powders', desc: 'A family-friendly food powder mix designed for convenient everyday use.', sizes: ['250 g', '500 g', '1 kg'], mrps: [449, 799, 1399], prices: [399, 699, 1199], ingredients: 'A blend of family-friendly nutritional food powders' },
    { name: 'Morning Nutrition Mix', slug: 'morning-nutrition-mix', cat: 'Daily Nutrition Powders', desc: 'A convenient morning powder mix that can be incorporated into everyday food or beverage routines.', sizes: ['200 g', '500 g'], mrps: [399, 799], prices: [349, 699], ingredients: 'Morning-focused food and botanical ingredients' },
    { name: 'Daily Seed & Grain Mix', slug: 'daily-seed-grain-mix', cat: 'Daily Nutrition Powders', desc: 'A convenient blend of selected seeds and grains for everyday food use.', sizes: ['200 g', '500 g'], mrps: [349, 699], prices: [299, 599], ingredients: 'Selected seeds and grains' }
];
var ALL_PRODUCTS = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(SINGLE_HERB_POWDER), false), __read(WELLNESS_POWDER_BLENDS), false), __read(SUPERFOOD_POWDERS), false), __read(DAILY_NUTRITION_POWDERS), false);
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var uniqueCategories, categoryMap, uniqueCategories_1, uniqueCategories_1_1, catName, _a, data, error, e_1_1, ALL_PRODUCTS_1, ALL_PRODUCTS_1_1, p, categoryId, badge, storage, usageInstructions, idealFor, specifications, benefits, _b, product, pErr, productId, i, vErr, iErr, e_2_1;
        var e_1, _c, e_2, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("Seeding categories and ".concat(ALL_PRODUCTS.length, " herbal powders..."));
                    uniqueCategories = Array.from(new Set(ALL_PRODUCTS.map(function (p) { return p.cat; })));
                    categoryMap = new Map();
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 8]);
                    uniqueCategories_1 = __values(uniqueCategories), uniqueCategories_1_1 = uniqueCategories_1.next();
                    _e.label = 2;
                case 2:
                    if (!!uniqueCategories_1_1.done) return [3 /*break*/, 5];
                    catName = uniqueCategories_1_1.value;
                    return [4 /*yield*/, supabase
                            .from('categories')
                            .upsert({ name: catName, slug: slugify(catName) }, { onConflict: 'slug' })
                            .select()
                            .single()];
                case 3:
                    _a = _e.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error("Error inserting category ".concat(catName), error);
                        return [3 /*break*/, 4];
                    }
                    categoryMap.set(catName, data.id);
                    _e.label = 4;
                case 4:
                    uniqueCategories_1_1 = uniqueCategories_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (uniqueCategories_1_1 && !uniqueCategories_1_1.done && (_c = uniqueCategories_1.return)) _c.call(uniqueCategories_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8:
                    _e.trys.push([8, 20, 21, 22]);
                    ALL_PRODUCTS_1 = __values(ALL_PRODUCTS), ALL_PRODUCTS_1_1 = ALL_PRODUCTS_1.next();
                    _e.label = 9;
                case 9:
                    if (!!ALL_PRODUCTS_1_1.done) return [3 /*break*/, 19];
                    p = ALL_PRODUCTS_1_1.value;
                    categoryId = categoryMap.get(p.cat);
                    badge = 'PURE SINGLE HERB POWDER';
                    if (p.cat === 'Wellness Powder Blends')
                        badge = 'MULTI-HERB BLENDS';
                    if (p.cat === 'Superfood Powders')
                        badge = 'SUPERFOOD COLLECTION';
                    if (p.cat === 'Daily Nutrition Powders')
                        badge = 'EVERYDAY NUTRITION';
                    storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the container tightly closed after opening.';
                    usageInstructions = {
                        serving: 'As required',
                        timing: 'Any time',
                        instructions: 'Use as a natural ingredient in your daily wellness routine or culinary preparation.'
                    };
                    idealFor = ['Everyday natural living', 'Traditional wellness use', 'Culinary preparation'];
                    specifications = {
                        'Storage': storage,
                        'Type': 'Herbal / Botanical Powder',
                        'Contents / Ingredients': p.ingredients,
                        'Disclaimer': 'This product is a natural botanical ingredient. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.'
                    };
                    benefits = [
                        { text: 'Selected premium botanical powder' },
                        { text: 'Finely milled for convenient use' },
                        { text: 'Ideal for everyday natural living' }
                    ];
                    return [4 /*yield*/, supabase
                            .from('products')
                            .upsert({
                            slug: p.slug,
                            name: p.name,
                            category_id: categoryId,
                            short_description: p.desc,
                            full_description: p.desc,
                            is_active: true,
                            rating: 5,
                            review_count: 24,
                            badge: badge,
                            usage_instructions: usageInstructions,
                            ideal_for: idealFor,
                            specifications: specifications,
                            benefits: benefits
                        }, { onConflict: 'slug' })
                            .select('id')
                            .single()];
                case 10:
                    _b = _e.sent(), product = _b.data, pErr = _b.error;
                    if (pErr) {
                        console.error('Error inserting product', p.name, pErr);
                        return [3 /*break*/, 18];
                    }
                    productId = product.id;
                    // Delete existing variants and images to replace them cleanly
                    return [4 /*yield*/, supabase.from('product_variants').delete().eq('product_id', productId)];
                case 11:
                    // Delete existing variants and images to replace them cleanly
                    _e.sent();
                    return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', productId)];
                case 12:
                    _e.sent();
                    i = 0;
                    _e.label = 13;
                case 13:
                    if (!(i < p.sizes.length)) return [3 /*break*/, 16];
                    return [4 /*yield*/, supabase
                            .from('product_variants')
                            .insert({
                            product_id: productId,
                            size: p.sizes[i],
                            price: p.prices[i],
                            original_price: p.mrps[i],
                            gold_member_price: Math.floor(p.prices[i] * 0.9),
                            stock_quantity: 100
                        })];
                case 14:
                    vErr = (_e.sent()).error;
                    if (vErr) {
                        console.error("Error inserting variant ".concat(p.sizes[i], " for ").concat(p.name), vErr);
                    }
                    _e.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16: return [4 /*yield*/, supabase
                        .from('product_images')
                        .insert({
                        product_id: productId,
                        url: "/images/categories/cat_herbal_powders.jpg", // Default placeholder
                        display_order: 1
                    })];
                case 17:
                    iErr = (_e.sent()).error;
                    if (iErr) {
                        console.error("Error inserting image for ".concat(p.name), iErr);
                    }
                    _e.label = 18;
                case 18:
                    ALL_PRODUCTS_1_1 = ALL_PRODUCTS_1.next();
                    return [3 /*break*/, 9];
                case 19: return [3 /*break*/, 22];
                case 20:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 22];
                case 21:
                    try {
                        if (ALL_PRODUCTS_1_1 && !ALL_PRODUCTS_1_1.done && (_d = ALL_PRODUCTS_1.return)) _d.call(ALL_PRODUCTS_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 22:
                    console.log('Herbal powders seeded successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
seed();
