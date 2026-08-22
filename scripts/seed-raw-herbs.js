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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var SINGLE_HERBS = [
    { name: 'Ajwain Seeds', slug: 'ajwain-seeds', cat: 'Single Herbs', desc: 'Whole ajwain seeds with their naturally distinctive, warm and aromatic character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 75, 165, 299], prices: [39, 65, 139, 249] },
    { name: 'Saunf Seeds', slug: 'saunf-seeds', cat: 'Single Herbs', desc: 'Fresh aromatic fennel seeds selected for their naturally sweet and refreshing flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [40, 70, 155, 285], prices: [35, 59, 129, 239] },
    { name: 'Cumin Seeds', slug: 'cumin-seeds', cat: 'Single Herbs', desc: 'Whole cumin seeds with a naturally warm, earthy and aromatic flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 80, 175, 329], prices: [39, 69, 149, 279] },
    { name: 'Fenugreek Seeds', slug: 'fenugreek-seeds', cat: 'Single Herbs', desc: 'Whole fenugreek seeds with their characteristic earthy and slightly bitter flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [35, 60, 135, 249], prices: [29, 49, 109, 209] },
    { name: 'Kalonji Seeds', slug: 'kalonji-seeds', cat: 'Single Herbs', desc: 'Small aromatic black seeds traditionally valued for their distinctive flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 80, 175, 329], prices: [39, 69, 149, 279] },
    { name: 'Mustard Seeds', slug: 'mustard-seeds', cat: 'Single Herbs', desc: 'Whole mustard seeds with a naturally sharp and pungent character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [30, 50, 110, 199], prices: [25, 42, 89, 169] },
    { name: 'Coriander Seeds', slug: 'coriander-seeds', cat: 'Single Herbs', desc: 'Whole coriander seeds with a naturally fresh, warm and citrus-like aroma.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [30, 50, 110, 199], prices: [25, 42, 89, 169] },
    { name: 'Whole Black Pepper', slug: 'whole-black-pepper', cat: 'Single Herbs', desc: 'Whole black peppercorns with a naturally bold, warm and aromatic flavour.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [70, 125, 285, 529], prices: [59, 105, 239, 449] },
    { name: 'Whole Cloves', slug: 'whole-cloves', cat: 'Single Herbs', desc: 'Whole aromatic cloves with a naturally warm and intense fragrance.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [45, 80, 145, 329], prices: [39, 69, 119, 279] },
    { name: 'Cinnamon Sticks', slug: 'cinnamon-sticks', cat: 'Single Herbs', desc: 'Natural cinnamon sticks with a warm, sweet and woody aroma.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [40, 70, 125, 279], prices: [35, 59, 105, 229] },
    { name: 'Green Cardamom', slug: 'green-cardamom', cat: 'Single Herbs', desc: 'Selected green cardamom pods with a naturally sweet and refreshing aroma.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [90, 165, 299, 699], prices: [79, 139, 249, 599] },
    { name: 'Whole Dry Ginger', slug: 'whole-dry-ginger', cat: 'Single Herbs', desc: 'Whole dried ginger with a naturally warm, sharp and aromatic character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [45, 80, 175, 329], prices: [39, 69, 149, 279] },
    { name: 'Dried Amla Pieces', slug: 'dried-amla-pieces', cat: 'Single Herbs', desc: 'Carefully dried amla pieces with their naturally tangy character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [50, 90, 199, 369], prices: [42, 75, 169, 309] },
    { name: 'Dried Tulsi Leaves', slug: 'dried-tulsi-leaves', cat: 'Single Herbs', desc: 'Dried tulsi leaves with a naturally fresh, herbal and aromatic profile.', sizes: ['25 g', '50 g', '100 g', '250 g'], mrps: [45, 80, 145, 299], prices: [39, 69, 119, 249] },
    { name: 'Dried Neem Leaves', slug: 'dried-neem-leaves', cat: 'Single Herbs', desc: 'Carefully dried neem leaves with their naturally distinctive herbal character.', sizes: ['50 g', '100 g', '250 g', '500 g'], mrps: [40, 70, 155, 285], prices: [35, 59, 129, 239] }
];
var PREMIUM_HERBS = [
    { name: 'Ashwagandha Root', slug: 'ashwagandha-root', cat: 'Premium Herbs', desc: 'Selected dried ashwagandha roots, carefully packed as a traditional botanical ingredient.', sizes: ['50 g', '100 g', '250 g'], mrps: [149, 269, 599], prices: [129, 229, 499] },
    { name: 'Shatavari Root', slug: 'shatavari-root', cat: 'Premium Herbs', desc: 'Carefully selected dried shatavari root for customers seeking a premium botanical ingredient.', sizes: ['50 g', '100 g', '250 g'], mrps: [169, 299, 699], prices: [149, 259, 599] },
    { name: 'Brahmi', slug: 'brahmi', cat: 'Premium Herbs', desc: 'Selected dried brahmi herb with a naturally herbal and earthy character.', sizes: ['50 g', '100 g', '250 g'], mrps: [139, 249, 549], prices: [119, 209, 469] },
    { name: 'Jatamansi', slug: 'jatamansi', cat: 'Premium Herbs', desc: 'A premium aromatic botanical ingredient known for its distinctive earthy fragrance.', sizes: ['25 g', '50 g', '100 g'], mrps: [199, 359, 649], prices: [169, 299, 549] },
    { name: 'Safed Musli', slug: 'safed-musli', cat: 'Premium Herbs', desc: 'Carefully selected dried safed musli as a premium botanical ingredient.', sizes: ['25 g', '50 g', '100 g'], mrps: [199, 369, 699], prices: [169, 319, 599] },
    { name: 'Gokhru', slug: 'gokhru', cat: 'Premium Herbs', desc: 'Selected dried gokhru as part of our premium botanical range.', sizes: ['50 g', '100 g', '250 g'], mrps: [129, 229, 499], prices: [109, 199, 429] },
    { name: 'Arjuna Bark', slug: 'arjuna-bark', cat: 'Premium Herbs', desc: 'Carefully selected dried arjuna bark with a natural woody botanical profile.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
    { name: 'Mulethi', slug: 'mulethi', cat: 'Premium Herbs', desc: 'Natural dried mulethi root with its characteristic sweet and earthy flavour.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
    { name: 'Dried Giloy Stem', slug: 'dried-giloy-stem', cat: 'Premium Herbs', desc: 'Selected dried giloy stems presented as a traditional botanical ingredient.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
    { name: 'Dried Moringa Leaves', slug: 'dried-moringa-leaves', cat: 'Premium Herbs', desc: 'Carefully dried moringa leaves with a naturally green, herbal character.', sizes: ['50 g', '100 g', '250 g'], mrps: [99, 179, 399], prices: [85, 155, 339] },
    { name: 'Dried Hibiscus Flowers', slug: 'dried-hibiscus-flowers', cat: 'Premium Herbs', desc: 'Beautifully dried hibiscus flowers with a naturally floral and tangy botanical profile.', sizes: ['25 g', '50 g', '100 g'], mrps: [99, 179, 329], prices: [85, 149, 279] },
    { name: 'Dried Chamomile Flowers', slug: 'dried-chamomile-flowers', cat: 'Premium Herbs', desc: 'Delicately dried chamomile flowers with a soft floral aroma.', sizes: ['25 g', '50 g', '100 g'], mrps: [129, 229, 399], prices: [109, 199, 339] },
    { name: 'Dried Rose Petals', slug: 'dried-rose-petals', cat: 'Premium Herbs', desc: 'Carefully dried rose petals with a naturally delicate floral aroma.', sizes: ['25 g', '50 g', '100 g'], mrps: [99, 179, 329], prices: [85, 149, 279] },
    { name: 'Dried Vetiver Root', slug: 'dried-vetiver-root', cat: 'Premium Herbs', desc: 'Natural dried vetiver roots with a distinctive earthy and cooling aromatic character.', sizes: ['50 g', '100 g', '250 g'], mrps: [129, 229, 499], prices: [109, 199, 429] },
    { name: 'Premium Saffron / Kesar', slug: 'premium-saffron-kesar', cat: 'Premium Herbs', desc: 'Premium saffron threads carefully packed for customers looking for a refined botanical ingredient.', sizes: ['1 g', '2 g', '5 g'], mrps: [299, 549, 1299], prices: [249, 469, 1099] }
];
var SEASONAL_COLLECTIONS = [
    { name: 'Winter Herb Collection', slug: 'winter-herb-collection', cat: 'Seasonal Collections', desc: 'A thoughtfully assembled winter-season herb collection featuring warm, aromatic whole botanicals.', sizes: ['250 g'], mrps: [399], prices: [349] },
    { name: 'Summer Herb Collection', slug: 'summer-herb-collection', cat: 'Seasonal Collections', desc: 'A refreshing seasonal collection featuring aromatic and cooling-inspired botanical ingredients.', sizes: ['250 g'], mrps: [399], prices: [349] },
    { name: 'Monsoon Herb Collection', slug: 'monsoon-herb-collection', cat: 'Seasonal Collections', desc: 'A seasonal collection of familiar aromatic herbs selected for monsoon-time natural living.', sizes: ['250 g'], mrps: [399], prices: [349] },
    { name: 'Festive Herb Collection', slug: 'festive-herb-collection', cat: 'Seasonal Collections', desc: 'A premium aromatic collection bringing together naturally fragrant whole herbs for festive and everyday use.', sizes: ['250 g'], mrps: [449], prices: [399] }
];
var ALL_PRODUCTS = __spreadArray(__spreadArray(__spreadArray([], SINGLE_HERBS, true), PREMIUM_HERBS, true), SEASONAL_COLLECTIONS, true);
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var uniqueCategories, categoryMap, _i, uniqueCategories_1, catName, _a, data, error, _b, ALL_PRODUCTS_1, p, categoryId, _c, product, pErr, productId, i, vErr, iErr;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("Seeding categories and ".concat(ALL_PRODUCTS.length, " products..."));
                    uniqueCategories = __spreadArray([], new Set(ALL_PRODUCTS.map(function (p) { return p.cat; })), true);
                    categoryMap = new Map();
                    _i = 0, uniqueCategories_1 = uniqueCategories;
                    _d.label = 1;
                case 1:
                    if (!(_i < uniqueCategories_1.length)) return [3 /*break*/, 4];
                    catName = uniqueCategories_1[_i];
                    return [4 /*yield*/, supabase
                            .from('categories')
                            .upsert({ name: catName, slug: slugify(catName) }, { onConflict: 'slug' })
                            .select()
                            .single()];
                case 2:
                    _a = _d.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error("Error inserting category ".concat(catName), error);
                        return [3 /*break*/, 3];
                    }
                    categoryMap.set(catName, data.id);
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _b = 0, ALL_PRODUCTS_1 = ALL_PRODUCTS;
                    _d.label = 5;
                case 5:
                    if (!(_b < ALL_PRODUCTS_1.length)) return [3 /*break*/, 15];
                    p = ALL_PRODUCTS_1[_b];
                    categoryId = categoryMap.get(p.cat);
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
                            badge: p.cat === 'Premium Herbs' ? 'PREMIUM BOTANICAL COLLECTION' : (p.cat === 'Single Herbs' ? 'EVERYDAY HERBS' : 'SEASONAL COLLECTION')
                        }, { onConflict: 'slug' })
                            .select('id')
                            .single()];
                case 6:
                    _c = _d.sent(), product = _c.data, pErr = _c.error;
                    if (pErr) {
                        console.error('Error inserting product', p.name, pErr);
                        return [3 /*break*/, 14];
                    }
                    productId = product.id;
                    // Delete existing variants and images to replace them cleanly
                    return [4 /*yield*/, supabase.from('product_variants').delete().eq('product_id', productId)];
                case 7:
                    // Delete existing variants and images to replace them cleanly
                    _d.sent();
                    return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', productId)];
                case 8:
                    _d.sent();
                    i = 0;
                    _d.label = 9;
                case 9:
                    if (!(i < p.sizes.length)) return [3 /*break*/, 12];
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
                case 10:
                    vErr = (_d.sent()).error;
                    if (vErr) {
                        console.error("Error inserting variant ".concat(p.sizes[i], " for ").concat(p.name), vErr);
                    }
                    _d.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12: return [4 /*yield*/, supabase
                        .from('product_images')
                        .insert({
                        product_id: productId,
                        url: "/images/categories/cat_raw_herbs.jpg",
                        display_order: 1
                    })];
                case 13:
                    iErr = (_d.sent()).error;
                    if (iErr) {
                        console.error("Error inserting image for ".concat(p.name), iErr);
                    }
                    _d.label = 14;
                case 14:
                    _b++;
                    return [3 /*break*/, 5];
                case 15:
                    console.log('Done!');
                    return [2 /*return*/];
            }
        });
    });
}
seed();
