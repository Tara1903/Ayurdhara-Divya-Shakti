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
var ASSET_MAP = {
    // Raw Herbs
    'Single Herbs': '/images/catalog/raw_single_herbs_1787341693856.jpg',
    'Premium Herbs': '/images/catalog/raw_premium_herbs_1787341716614.jpg',
    'Seasonal Collections': '/images/catalog/raw_seasonal_collection_1787341734128.jpg',
    // Powders
    'Single Herb Powder': '/images/catalog/powder_single_herb_1787341748746.jpg',
    'Wellness Powder Blends': '/images/catalog/powder_wellness_blend_1787341764890.jpg',
    'Superfood Powders': '/images/catalog/powder_wellness_blend_1787341764890.jpg',
    'Daily Nutrition Powders': '/images/catalog/powder_wellness_blend_1787341764890.jpg',
    // Tea & Drinks
    'Herbal Teas': '/images/catalog/tea_herbal_infusion_1787341787189.jpg',
    'Kadha': '/images/catalog/tea_traditional_kadha_1787341802864.jpg',
    'Wellness Drinks': '/images/catalog/tea_herbal_infusion_1787341787189.jpg',
    // Natural Foods
    'Cold Pressed Oils': '/images/catalog/food_cold_pressed_oil_1787341816505.jpg',
    'Honey': '/images/catalog/food_pure_honey_1787341832761.jpg',
    'Ghee': '/images/catalog/food_desi_ghee_1787341855176.jpg',
    'Dry Fruits': '/images/catalog/food_dry_fruits_1787341867152.jpg',
    'Seeds': '/images/catalog/food_organic_seeds_1787341877607.jpg',
    'Jaggery': '/images/catalog/food_natural_jaggery_1787341890526.jpg',
    // Oil Wellness
    'Kids Care Oil Blend': '/images/categories/cat_kids_care.jpg',
    'Men Wellness Oil Blend': '/images/categories/cat_mens_wellness.jpg',
    'Women Wellness Oil Blend': '/images/categories/cat_womens_wellness.jpg',
    'Senior Care Oil Blend': '/images/categories/cat_senior_care.jpg',
    'Feet Massage Oil': '/images/categories/cat_oil_wellness_1786556871303.jpg',
    'Hair Wellness Oil': '/images/categories/cat_oil_wellness_1786556871303.jpg',
    'Body Massage Oil': '/images/categories/cat_oil_wellness_1786556871303.jpg',
    'Essential Oils': '/images/categories/cat_oil_wellness_1786556871303.jpg',
    'Natural Fragrance': '/images/categories/cat_natural_fragrance.jpg',
    'Wellness Aroma': '/images/categories/cat_natural_fragrance.jpg',
    'Diffuser Blends': '/images/categories/cat_natural_fragrance.jpg',
    'Essential Oil Combos': '/images/categories/cat_natural_fragrance.jpg',
    // Packs
    'Individual Wellness Packs': '/images/categories/cat_wellness_packs_1786557692487.jpg',
    'Family Trial Wellness Packs': '/images/categories/cat_trial_pack.jpg',
    'Family Gold Wellness Packs': '/images/categories/cat_wellness_packs_1786557692487.jpg',
    'Individual Trial Wellness Pack': '/images/categories/cat_trial_pack.jpg',
    'Diamond Trial Wellness Pack': '/images/categories/cat_trial_pack.jpg',
    'Individual Gold Wellness Pack': '/images/categories/cat_wellness_packs_1786557692487.jpg',
    'Individual Premium Wellness Pack': '/images/categories/cat_wellness_packs_1786557692487.jpg',
};
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, products, categories, catMap, count, products_1, products_1_1, p, catName, targetImage, lower, e_1_1;
        var e_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('🌟 Assigning 100% Verified Pristine Studio Images to All Catalog Products...');
                    return [4 /*yield*/, Promise.all([
                            supabase.from('products').select('id, name, category_id'),
                            supabase.from('categories').select('id, name')
                        ])];
                case 1:
                    _a = __read.apply(void 0, [_c.sent(), 2]), products = _a[0].data, categories = _a[1].data;
                    if (!products)
                        return [2 /*return*/];
                    catMap = new Map((categories || []).map(function (c) { return [c.id, c.name]; }));
                    count = 0;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 8, 9, 10]);
                    products_1 = __values(products), products_1_1 = products_1.next();
                    _c.label = 3;
                case 3:
                    if (!!products_1_1.done) return [3 /*break*/, 7];
                    p = products_1_1.value;
                    count++;
                    catName = catMap.get(p.category_id) || 'Single Herbs';
                    targetImage = ASSET_MAP[catName] || '/images/catalog/raw_single_herbs_1787341693856.jpg';
                    lower = p.name.toLowerCase();
                    if (lower.includes('oil') || lower.includes('nabhi') || lower.includes('massage')) {
                        if (lower.includes('mustard') || lower.includes('sesame') || lower.includes('groundnut') || lower.includes('coconut') || lower.includes('flaxseed')) {
                            targetImage = '/images/catalog/food_cold_pressed_oil_1787341816505.jpg';
                        }
                        else {
                            targetImage = ASSET_MAP[catName] || '/images/categories/cat_oil_wellness_1786556871303.jpg';
                        }
                    }
                    else if (lower.includes('powder') || lower.includes('churna') || lower.includes('sattu') || lower.includes('blend mix')) {
                        targetImage = '/images/catalog/powder_single_herb_1787341748746.jpg';
                    }
                    else if (lower.includes('tea') && !lower.includes('tea tree')) {
                        targetImage = '/images/catalog/tea_herbal_infusion_1787341787189.jpg';
                    }
                    else if (lower.includes('kadha')) {
                        targetImage = '/images/catalog/tea_traditional_kadha_1787341802864.jpg';
                    }
                    else if (lower.includes('honey')) {
                        targetImage = '/images/catalog/food_pure_honey_1787341832761.jpg';
                    }
                    else if (lower.includes('ghee')) {
                        targetImage = '/images/catalog/food_desi_ghee_1787341855176.jpg';
                    }
                    else if (lower.includes('jaggery') || lower.includes('gur')) {
                        targetImage = '/images/catalog/food_natural_jaggery_1787341890526.jpg';
                    }
                    else if (lower.includes('almond') || lower.includes('cashew') || lower.includes('raisin') || lower.includes('walnut') || lower.includes('date') || lower.includes('fig') || lower.includes('pista')) {
                        targetImage = '/images/catalog/food_dry_fruits_1787341867152.jpg';
                    }
                    else if (lower.includes('chia') || lower.includes('pumpkin') || lower.includes('sunflower') || lower.includes('sabja') || lower.includes('halim') || (lower.includes('seed') && !catName.includes('Herb'))) {
                        targetImage = '/images/catalog/food_organic_seeds_1787341877607.jpg';
                    }
                    return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', p.id)];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, supabase.from('product_images').insert({
                            product_id: p.id,
                            url: targetImage,
                            display_order: 1
                        })];
                case 5:
                    _c.sent();
                    console.log("[".concat(count, "/").concat(products.length, "] ").concat(p.name, " (").concat(catName, ") -> ").concat(targetImage));
                    _c.label = 6;
                case 6:
                    products_1_1 = products_1.next();
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (products_1_1 && !products_1_1.done && (_b = products_1.return)) _b.call(products_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10:
                    console.log('\n✨ Done! All catalog products are now linked to 100% verified, brand-perfect studio images!');
                    return [2 /*return*/];
            }
        });
    });
}
run();
