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
var HERBAL_TEAS = [
    { name: 'Daily Herbal Tea', slug: 'daily-herbal-tea', cat: 'Herbal Teas', desc: 'A refreshing herbal tea blend combining aromatic botanicals for a simple everyday tea routine.', sizes: ['25 g', '50 g', '100 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Lemongrass, Ginger' },
    { name: 'Tulsi Herbal Tea', slug: 'tulsi-herbal-tea', cat: 'Herbal Teas', desc: 'A light and aromatic herbal tea blend featuring tulsi and refreshing botanical notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Lemongrass' },
    { name: 'Ginger Lemon Herbal Tea', slug: 'ginger-lemon-herbal-tea', cat: 'Herbal Teas', desc: 'A bright, fresh herbal tea blend with warm ginger and refreshing citrus notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Ginger, Lemongrass, Lemon Peel' },
    { name: 'Rose Herbal Tea', slug: 'rose-herbal-tea', cat: 'Herbal Teas', desc: 'A delicate floral herbal tea blend with a naturally pleasant aroma and colour.', sizes: ['25 g', '50 g', '100 g'], mrps: [179, 329, 599], prices: [149, 279, 509], ingredients: 'Rose Petals, Hibiscus, Natural Botanicals' },
    { name: 'Chamomile Herbal Tea', slug: 'chamomile-herbal-tea', cat: 'Herbal Teas', desc: 'A gentle floral herbal tea blend with a soft and naturally soothing aroma.', sizes: ['25 g', '50 g', '100 g'], mrps: [199, 369, 699], prices: [169, 319, 599], ingredients: 'Chamomile, selected botanical ingredients' },
    { name: 'Fresh Mint Herbal Tea', slug: 'fresh-mint-herbal-tea', cat: 'Herbal Teas', desc: 'A fresh and aromatic herbal tea blend with naturally crisp mint notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Mint, Lemongrass, Tulsi' },
    { name: 'Cinnamon Spice Herbal Tea', slug: 'cinnamon-spice-herbal-tea', cat: 'Herbal Teas', desc: 'A warm and aromatic herbal tea blend inspired by traditional Indian spice notes.', sizes: ['25 g', '50 g', '100 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Cinnamon, Clove, Cardamom' },
    { name: 'Hibiscus Herbal Tea', slug: 'hibiscus-herbal-tea', cat: 'Herbal Teas', desc: 'A naturally vibrant floral herbal tea blend with a refreshing botanical character.', sizes: ['25 g', '50 g', '100 g'], mrps: [179, 329, 599], prices: [149, 279, 509], ingredients: 'Hibiscus, Rose Petals, selected botanicals' }
];
var KADHAS = [
    { name: 'Daily Herbal Kadha', slug: 'daily-herbal-kadha', cat: 'Kadha', desc: 'A traditional-style herbal spice blend for preparing a warm and aromatic kadha.', sizes: ['50 g', '100 g', '200 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Ginger, Cinnamon, Black Pepper, Clove' },
    { name: 'Winter Kadha', slug: 'winter-kadha', cat: 'Kadha', desc: 'A warming seasonal herbal blend inspired by traditional winter drink preparations.', sizes: ['50 g', '100 g', '200 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Dry Ginger, Cinnamon, Clove, Black Pepper, Tulsi' },
    { name: 'Herbal Spice Kadha', slug: 'herbal-spice-kadha', cat: 'Kadha', desc: 'Aromatic herbal spice blend for preparing a traditional-style warm drink.', sizes: ['50 g', '100 g', '200 g'], mrps: [159, 289, 529], prices: [139, 249, 449], ingredients: 'Cinnamon, Cardamom, Clove, Ginger, Black Pepper' },
    { name: 'Tulsi Ginger Kadha', slug: 'tulsi-ginger-kadha', cat: 'Kadha', desc: 'A simple herbal blend combining tulsi and ginger for a warm, aromatic drink.', sizes: ['50 g', '100 g', '200 g'], mrps: [149, 269, 499], prices: [129, 229, 429], ingredients: 'Tulsi, Dry Ginger, Lemongrass' },
    { name: 'Family Kadha Blend', slug: 'family-kadha-blend', cat: 'Kadha', desc: 'A convenient family-sized traditional-style herbal blend for preparing warm kadha at home.', sizes: ['100 g', '200 g', '500 g'], mrps: [249, 449, 899], prices: [219, 379, 769], ingredients: 'Tulsi, Ginger, Cinnamon, Clove, Cardamom, Black Pepper' }
];
var DRINKS = [
    { name: 'Daily Wellness Drink Mix', slug: 'daily-wellness-drink-mix', cat: 'Wellness Drinks', desc: 'A convenient botanical drink mix designed to be incorporated into an everyday beverage routine.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Amla, Moringa, selected food ingredients' },
    { name: 'Lemon Herbal Drink Mix', slug: 'lemon-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A refreshing drink mix with bright citrus and botanical notes.', sizes: ['100 g', '250 g', '500 g'], mrps: [249, 499, 899], prices: [219, 429, 769], ingredients: 'Lemon, Ginger, selected botanical ingredients' },
    { name: 'Rose Herbal Drink Mix', slug: 'rose-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A naturally floral drink mix with a delicate botanical aroma and colour.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Rose, Hibiscus, selected botanical ingredients' },
    { name: 'Amla Herbal Drink Mix', slug: 'amla-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A convenient amla-based drink mix for everyday beverage preparation.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Amla, selected food ingredients' },
    { name: 'Summer Herbal Drink Mix', slug: 'summer-herbal-drink-mix', cat: 'Wellness Drinks', desc: 'A refreshing seasonal drink mix featuring naturally aromatic botanical ingredients.', sizes: ['100 g', '250 g', '500 g'], mrps: [299, 599, 999], prices: [259, 519, 849], ingredients: 'Fennel, Rose, Mint, selected botanical ingredients' },
    { name: 'Herbal Drink Discovery Combo', slug: 'herbal-drink-discovery-combo', cat: 'Wellness Drinks', desc: 'A convenient discovery set featuring three different botanical drink flavours.', sizes: ['3 x 100 g'], mrps: [899], prices: [749], ingredients: 'Daily Wellness Drink Mix, Lemon Herbal Drink Mix, Rose Herbal Drink Mix' }
];
var ALL_PRODUCTS = __spreadArray(__spreadArray(__spreadArray([], __read(HERBAL_TEAS), false), __read(KADHAS), false), __read(DRINKS), false);
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var uniqueCategories, categoryMap, uniqueCategories_1, uniqueCategories_1_1, catName, _a, data, error, e_1_1, ALL_PRODUCTS_1, ALL_PRODUCTS_1_1, p, categoryId, badge, prepInstructions, storage, usageInstructions, idealFor, specifications, benefits, _b, product, pErr, productId, i, vErr, iErr, e_2_1;
        var e_1, _c, e_2, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("Seeding categories and ".concat(ALL_PRODUCTS.length, " drinks..."));
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
                    badge = 'HERBAL TEA COLLECTION';
                    prepInstructions = 'Add the recommended quantity to hot water and allow it to steep according to the product instructions.';
                    if (p.cat === 'Kadha') {
                        badge = 'TRADITIONAL HERBAL KADHA';
                        prepInstructions = 'Add the recommended quantity to water and prepare according to the instructions provided on the pack.';
                    }
                    if (p.cat === 'Wellness Drinks') {
                        badge = 'WELLNESS DRINK COLLECTION';
                        prepInstructions = 'Mix the recommended serving with water or another suitable beverage according to the product instructions.';
                    }
                    storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the pack tightly closed after opening.';
                    usageInstructions = {
                        serving: 'As recommended on pack',
                        timing: 'Any time',
                        instructions: prepInstructions
                    };
                    idealFor = ['Everyday beverage routine', 'Seasonal wellness', 'Natural living'];
                    specifications = {
                        'Storage': storage,
                        'Type': p.cat,
                        'Contents / Ingredients': p.ingredients,
                        'Preparation': prepInstructions,
                        'Disclaimer': 'This product is a natural botanical preparation. It is not intended to diagnose, treat, cure, or prevent any disease.'
                    };
                    benefits = [
                        { text: 'Selected botanical ingredients' },
                        { text: 'Aromatic and refreshing' },
                        { text: 'Designed for everyday use' }
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
                            review_count: 32,
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
                        url: "/images/categories/cat_herbal_tea_1786557231547.jpg",
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
                    console.log('Herbal drinks seeded successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
seed();
