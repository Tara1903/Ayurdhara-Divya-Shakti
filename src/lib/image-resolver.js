"use strict";
/**
 * Master Image Resolver & Curated Wellness Asset Library
 * High-definition, licensed botanical and wellness imagery mapped to ingredient & category
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURATED_WELLNESS_LIBRARY = void 0;
exports.resolveAutoProductImage = resolveAutoProductImage;
var image_system_1 = require("./image-system");
// High-Definition, Verified E-Commerce Product Photography Library
// Clean cream/white backgrounds, studio lighting, matching strict form rules
exports.CURATED_WELLNESS_LIBRARY = {
    // === RAW HERBS (Roots, Whole Leaves, Stems, Whole Bark) ===
    'ashwagandha_raw_herb': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'shatavari_raw_herb': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80',
    'brahmi_raw_herb': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'jatamansi_raw_herb': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80',
    'safed_musli_raw_herb': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80',
    'gokhru_raw_herb': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80',
    'arjuna_raw_herb': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80',
    'mulethi_raw_herb': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80',
    'giloy_raw_herb': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80',
    'moringa_raw_herb': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'tulsi_raw_herb': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=900&q=80',
    'neem_raw_herb': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80',
    'amla_raw_herb': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'rose_petals_raw_herb': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80',
    'chamomile_raw_herb': 'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=900&q=80',
    'hibiscus_raw_herb': 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=900&q=80',
    'cinnamon_raw_herb': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80',
    'cardamom_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'black_pepper_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'cloves_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'dry_ginger_raw_herb': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'saffron_raw_herb': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80',
    'vetiver_raw_herb': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80',
    'ajwain_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'fennel_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'cumin_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'fenugreek_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'kalonji_raw_herb': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'mustard_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'coriander_raw_herb': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    'winter_collection_raw_herb': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80',
    'summer_collection_raw_herb': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'monsoon_collection_raw_herb': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80',
    'festive_collection_raw_herb': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80',
    // === HERBAL POWDERS (Fine Powder in Luxury Bowls with Spoon) ===
    'ashwagandha_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'shatavari_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'brahmi_powder': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'turmeric_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'moringa_powder': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'neem_powder': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'amla_powder': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'tulsi_powder': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'triphala_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'trikatu_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'spirulina_powder': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'wheatgrass_powder': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'barley_grass_powder': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    'sattu_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'beetroot_powder': 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=900&q=80',
    'cocoa_powder': 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80',
    'chyawanprash_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'generic_herbal_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    // === HERBAL TEAS & KADHA (Aromatic Cups & Spiced Infusions) ===
    'daily_herbal_tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    'tulsi_tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    'ginger_lemon_tea': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    'chamomile_tea': 'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=900&q=80',
    'rose_tea': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80',
    'hibiscus_tea': 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=900&q=80',
    'cinnamon_spice_tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    'mint_tea': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    'daily_kadha': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    'winter_kadha': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    'tulsi_ginger_kadha': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    'family_kadha': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    'wellness_drink': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    'lemon_drink': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    'rose_drink': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    'amla_drink': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    'summer_drink': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    // === COLD PRESSED OILS (Amber Bottles + Seeds/Ingredients) ===
    'mustard_oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
    'sesame_oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
    'groundnut_oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
    'coconut_oil': 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=900&q=80',
    'flaxseed_oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
    'generic_oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
    // === NATURAL FOODS (Honey, Ghee, Dry Fruits, Seeds, Jaggery) ===
    'pure_honey': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'forest_honey': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'multifloral_honey': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'cow_ghee': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=900&q=80',
    'desi_ghee': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=900&q=80',
    'a2_cow_ghee': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=900&q=80',
    'almonds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'cashews': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80',
    'raisins': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'walnuts': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=900&q=80',
    'dates': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'figs_anjeer': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    'pistachios': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'chia_seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'flaxseeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'pumpkin_seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'sunflower_seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'sesame_seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'sabja_seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'halim_seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    'jaggery_block': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=900&q=80',
    'jaggery_powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    'organic_jaggery': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=900&q=80',
    // === WELLNESS PACKS / COMBOS ===
    'wellness_packs': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    'trial_packs': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
};
/**
 * Resolves the best curated or generated image for a product
 */
function resolveAutoProductImage(name_1) {
    return __awaiter(this, arguments, void 0, function (name, category, subcategory, customKeyword) {
        var intel, cleanName, formKey, _a, _b, _c, key, url, keyPrefix;
        var e_1, _d;
        if (category === void 0) { category = ''; }
        if (subcategory === void 0) { subcategory = ''; }
        return __generator(this, function (_e) {
            intel = (0, image_system_1.analyzeProductForImages)(name, category, subcategory);
            cleanName = intel.cleanIngredient.replace(/\s+/g, '_');
            formKey = "".concat(cleanName, "_").concat(intel.productForm);
            // 1. Check exact key in curated library
            if (exports.CURATED_WELLNESS_LIBRARY[formKey]) {
                return [2 /*return*/, {
                        url: exports.CURATED_WELLNESS_LIBRARY[formKey],
                        source: 'curated',
                        intelligence: intel
                    }];
            }
            try {
                // 2. Check ingredient key in curated library
                for (_a = __values(Object.entries(exports.CURATED_WELLNESS_LIBRARY)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    _c = __read(_b.value, 2), key = _c[0], url = _c[1];
                    keyPrefix = key.split('_')[0];
                    if (cleanName.includes(keyPrefix) || key.includes(cleanName)) {
                        return [2 /*return*/, {
                                url: url,
                                source: 'curated',
                                intelligence: intel
                            }];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // 3. Fallback to Form-based representative curated wellness image
            if (intel.productForm === 'raw_herb') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['ashwagandha_raw_herb'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'powder' || intel.productForm === 'spice_powder') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['generic_herbal_powder'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'oil') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['mustard_oil'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'tea' || intel.productForm === 'kadha') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['tulsi_tea'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'drink') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['wellness_drink'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'honey') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['pure_honey'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'ghee') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['cow_ghee'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'dry_fruit') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['almonds'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'seed') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['chia_seeds'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'jaggery') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['jaggery_block'], source: 'curated', intelligence: intel }];
            }
            if (intel.productForm === 'combo') {
                return [2 /*return*/, { url: exports.CURATED_WELLNESS_LIBRARY['wellness_packs'], source: 'curated', intelligence: intel }];
            }
            return [2 /*return*/, {
                    url: '/images/categories/cat_raw_herbs_1786556977927.jpg',
                    source: 'fallback',
                    intelligence: intel
                }];
        });
    });
}
