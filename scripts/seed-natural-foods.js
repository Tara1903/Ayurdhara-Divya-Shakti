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
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-');
}
var OILS = [
    { name: 'Cold Pressed Mustard Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed mustard oil with its naturally distinctive aroma and flavour.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [149, 269, 499], prices: [129, 229, 429], ing: '100% Mustard Oil' },
    { name: 'Cold Pressed Sesame Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed sesame oil with a naturally rich and nutty character.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [199, 369, 699], prices: [169, 319, 599], ing: '100% Sesame Oil' },
    { name: 'Cold Pressed Groundnut Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed groundnut oil with a naturally mild and nutty flavour.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [169, 319, 599], prices: [149, 279, 519], ing: '100% Groundnut Oil' },
    { name: 'Cold Pressed Coconut Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed coconut oil with a naturally pleasant coconut aroma.', sizes: ['250 ml', '500 ml', '1 L'], mrps: [199, 369, 699], prices: [169, 319, 599], ing: '100% Coconut Oil' },
    { name: 'Cold Pressed Flaxseed Oil', cat: 'Cold Pressed Oils', desc: 'Cold pressed flaxseed oil with its naturally distinctive nutty character.', sizes: ['100 ml', '250 ml', '500 ml'], mrps: [199, 449, 799], prices: [169, 379, 679], ing: '100% Flaxseed Oil' }
];
var HONEY = [
    { name: 'Pure Honey', cat: 'Honey', desc: 'Natural honey with a pleasant sweetness and characteristic floral character.', sizes: ['250 g', '500 g', '1 kg'], mrps: [249, 449, 799], prices: [219, 399, 699], ing: 'Pure Honey' },
    { name: 'Forest Honey', cat: 'Honey', desc: 'Honey with a naturally rich and distinctive flavour profile.', sizes: ['250 g', '500 g', '1 kg'], mrps: [299, 549, 999], prices: [259, 479, 849], ing: 'Forest Honey' },
    { name: 'Multifloral Honey', cat: 'Honey', desc: 'A naturally aromatic honey with flavour influenced by multiple floral sources.', sizes: ['250 g', '500 g', '1 kg'], mrps: [279, 499, 899], prices: [239, 429, 769], ing: 'Multifloral Honey' }
];
var GHEE = [
    { name: 'Cow Ghee', cat: 'Ghee', desc: 'Rich and aromatic ghee with a naturally smooth texture.', sizes: ['250 g', '500 g', '1 kg'], mrps: [399, 749, 1399], prices: [349, 649, 1199], ing: 'Cow Milk Fat' },
    { name: 'Desi Ghee', cat: 'Ghee', desc: 'Traditional-style ghee with a rich aroma and smooth texture.', sizes: ['250 g', '500 g', '1 kg'], mrps: [349, 649, 1199], prices: [299, 559, 999], ing: 'Milk Fat' },
    { name: 'A2 Cow Ghee', cat: 'Ghee', desc: 'Premium cow ghee product.', sizes: ['250 g', '500 g', '1 kg'], mrps: [499, 949, 1799], prices: [449, 829, 1549], ing: 'A2 Cow Milk Fat' }
];
var DRY_FRUITS = [
    { name: 'Almonds', cat: 'Dry Fruits', desc: 'Selected almonds with a naturally crunchy texture and mild nutty flavour.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [129, 299, 549, 999], prices: [109, 259, 479, 849], ing: '100% Almonds' },
    { name: 'Cashews', cat: 'Dry Fruits', desc: 'Selected cashews with a naturally creamy texture and rich nutty flavour.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [149, 349, 649, 1199], prices: [129, 299, 559, 1029], ing: '100% Cashews' },
    { name: 'Raisins', cat: 'Dry Fruits', desc: 'Naturally sweet dried grapes selected for everyday snacking and food use.', sizes: ['100 g', '250 g', '500 g', '1 kg'], mrps: [99, 219, 399, 749], prices: [85, 189, 349, 639], ing: '100% Raisins' },
    { name: 'Walnuts', cat: 'Dry Fruits', desc: 'Selected walnut kernels with a naturally rich and nutty character.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 849], prices: [169, 389, 729], ing: '100% Walnuts' },
    { name: 'Dates', cat: 'Dry Fruits', desc: 'Naturally sweet dried dates with a soft and chewy texture.', sizes: ['250 g', '500 g', '1 kg'], mrps: [149, 279, 499], prices: [129, 239, 429], ing: '100% Dates' },
    { name: 'Figs / Anjeer', cat: 'Dry Fruits', desc: 'Dried figs with a naturally sweet flavour and chewy texture.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 849], prices: [169, 389, 729], ing: '100% Figs' },
    { name: 'Pistachios', cat: 'Dry Fruits', desc: 'Selected pistachios with a naturally rich flavour and crunchy texture.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 849], prices: [169, 389, 729], ing: '100% Pistachios' }
];
var SEEDS = [
    { name: 'Chia Seeds', cat: 'Seeds', desc: 'Small edible seeds with a naturally mild flavour and versatile food use.', sizes: ['100 g', '250 g', '500 g'], mrps: [149, 329, 599], prices: [129, 279, 509], ing: '100% Chia Seeds' },
    { name: 'Flaxseeds', cat: 'Seeds', desc: 'Whole flaxseeds with a naturally nutty character.', sizes: ['100 g', '250 g', '500 g'], mrps: [99, 219, 399], prices: [85, 189, 339], ing: '100% Flaxseeds' },
    { name: 'Pumpkin Seeds', cat: 'Seeds', desc: 'Crunchy pumpkin seeds with a naturally mild nutty flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [199, 449, 799], prices: [169, 379, 679], ing: '100% Pumpkin Seeds' },
    { name: 'Sunflower Seeds', cat: 'Seeds', desc: 'Crunchy sunflower seeds with a naturally mild flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [99, 219, 399], prices: [85, 189, 339], ing: '100% Sunflower Seeds' },
    { name: 'Sesame Seeds', cat: 'Seeds', desc: 'Whole sesame seeds with a naturally nutty aroma and flavour.', sizes: ['100 g', '250 g', '500 g'], mrps: [79, 179, 329], prices: [69, 149, 279], ing: '100% Sesame Seeds' },
    { name: 'Sabja Seeds', cat: 'Seeds', desc: 'Small edible basil seeds commonly used in refreshing beverages and food preparations.', sizes: ['100 g', '250 g', '500 g'], mrps: [99, 219, 399], prices: [85, 189, 339], ing: '100% Sabja Seeds' },
    { name: 'Halim Seeds', cat: 'Seeds', desc: 'Traditional edible halim seeds with a naturally distinctive character.', sizes: ['100 g', '250 g', '500 g'], mrps: [149, 329, 599], prices: [129, 279, 509], ing: '100% Halim Seeds' }
];
var JAGGERY = [
    { name: 'Jaggery Block', cat: 'Jaggery', desc: 'Traditional jaggery with a naturally rich sweetness and caramel-like character.', sizes: ['250 g', '500 g', '1 kg'], mrps: [79, 149, 279], prices: [69, 129, 239], ing: 'Jaggery (Sugarcane)' },
    { name: 'Jaggery Powder', cat: 'Jaggery', desc: 'Convenient powdered jaggery for everyday food and beverage preparation.', sizes: ['250 g', '500 g', '1 kg'], mrps: [89, 169, 299], prices: [75, 145, 259], ing: 'Jaggery Powder (Sugarcane)' },
    { name: 'Organic Jaggery', cat: 'Jaggery', desc: 'Jaggery sourced and processed according to applicable organic standards.', sizes: ['250 g', '500 g', '1 kg'], mrps: [99, 189, 349], prices: [85, 159, 299], ing: 'Organic Jaggery (Sugarcane)' }
];
var ALL_PRODUCTS = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(OILS), false), __read(HONEY), false), __read(GHEE), false), __read(DRY_FRUITS), false), __read(SEEDS), false), __read(JAGGERY), false);
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var uniqueCategories, categoryMap, uniqueCategories_1, uniqueCategories_1_1, catName, _a, data, error, e_1_1, ALL_PRODUCTS_1, ALL_PRODUCTS_1_1, p, categoryId, badge, storage, usageInstructions, idealFor, specifications, benefits, slug, _b, product, pErr, productId, i, vErr, iErr, e_2_1;
        var e_1, _c, e_2, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("Seeding categories and ".concat(ALL_PRODUCTS.length, " natural foods..."));
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
                    badge = '';
                    storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the pack tightly closed after opening.';
                    if (p.cat === 'Cold Pressed Oils') {
                        badge = 'COLD PRESSED';
                        storage = 'Store in a cool, dry place away from direct sunlight. Keep the bottle tightly closed.';
                    }
                    else if (p.cat === 'Honey') {
                        badge = 'NATURAL HONEY';
                    }
                    else if (p.cat === 'Ghee') {
                        badge = 'TRADITIONAL GHEE';
                    }
                    else if (p.cat === 'Dry Fruits') {
                        badge = 'PREMIUM DRY FRUITS';
                        storage = 'Store in a cool, dry place and protect from moisture. Refrigerate after opening if recommended on the final label.';
                    }
                    else if (p.cat === 'Seeds') {
                        badge = 'EVERYDAY SEEDS';
                        storage = 'Store in a cool, dry place and protect from moisture. Refrigerate after opening if recommended on the final label.';
                    }
                    else if (p.cat === 'Jaggery') {
                        badge = 'NATURAL JAGGERY';
                    }
                    usageInstructions = {
                        serving: 'As required',
                        timing: 'Any time',
                        instructions: 'Use in everyday cooking, snacking or preparation as desired.'
                    };
                    idealFor = ['Everyday natural living', 'Traditional food preparation', 'Everyday kitchen use'];
                    specifications = {
                        'Storage': storage,
                        'Type': p.cat,
                        'Contents / Ingredients': p.ing,
                        'Preparation': 'Use in everyday cooking, baking, or direct consumption.',
                        'Disclaimer': 'This product is a natural food ingredient. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.'
                    };
                    benefits = [
                        { text: 'Selected premium food ingredient' },
                        { text: 'Designed for everyday use' },
                        { text: 'Natural and carefully processed' }
                    ];
                    slug = slugify(p.name);
                    return [4 /*yield*/, supabase
                            .from('products')
                            .upsert({
                            slug: slug,
                            name: p.name,
                            category_id: categoryId,
                            short_description: p.desc,
                            full_description: p.desc,
                            is_active: true,
                            rating: 5,
                            review_count: 50,
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
                        url: "/images/categories/cat_natural_foods_1786557531655.jpg", // Default placeholder
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
                    console.log('Natural foods seeded successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
seed();
