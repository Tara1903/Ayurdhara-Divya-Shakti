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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv = __importStar(require("dotenv"));
var path_1 = require("path");
var https_1 = __importDefault(require("https"));
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env.local') });
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
var TARGET_CATEGORIES = [
    'Single Herbs', 'Premium Herbs', 'Seasonal Collections',
    'Cold Pressed Oils', 'Honey', 'Ghee', 'Dry Fruits', 'Seeds', 'Jaggery',
    'Herbal Teas', 'Kadha', 'Wellness Drinks',
    'Single Herb Powder', 'Wellness Powder Blends', 'Superfood Powders', 'Daily Nutrition Powders'
];
// Map product names to best search keywords for flickr
var KEYWORD_MAP = {
    'Ajwain Seeds': 'ajwain,seeds,spice',
    'Saunf / Fennel Seeds': 'fennel,seeds,spice',
    'Cumin Seeds / Jeera': 'cumin,seeds,spice',
    'Fenugreek Seeds': 'fenugreek,seeds,methi',
    'Kalonji Seeds': 'nigella,seeds,kalonji',
    'Mustard Seeds': 'mustard,seeds,spice',
    'Coriander Seeds': 'coriander,seeds,spice',
    'Whole Black Pepper': 'black,pepper,peppercorn',
    'Whole Cloves': 'cloves,spice',
    'Cinnamon Sticks': 'cinnamon,sticks,spice',
    'Green Cardamom': 'cardamom,green,spice',
    'Whole Dry Ginger': 'dry,ginger,root',
    'Dried Amla Pieces': 'amla,gooseberry,indian',
    'Dried Tulsi Leaves': 'tulsi,basil,holy',
    'Dried Neem Leaves': 'neem,leaves,green',
    'Ashwagandha Root': 'ashwagandha,root,herb',
    'Shatavari Root': 'shatavari,root,asparagus',
    'Brahmi': 'brahmi,herb,ayurvedic',
    'Jatamansi': 'jatamansi,herb,ayurvedic',
    'Safed Musli': 'safed,musli,herb',
    'Gokhru': 'tribulus,herb,ayurvedic',
    'Arjuna Bark': 'arjuna,bark,tree',
    'Mulethi': 'licorice,mulethi,root',
    'Dried Giloy Stem': 'giloy,tinospora,stem',
    'Dried Moringa Leaves': 'moringa,leaves,green',
    'Dried Hibiscus Flowers': 'hibiscus,flower,dried',
    'Dried Chamomile Flowers': 'chamomile,flower,dried',
    'Dried Rose Petals': 'rose,petals,dried',
    'Dried Vetiver Root': 'vetiver,root,khus',
    'Premium Saffron / Kesar': 'saffron,kesar,spice',
    'Winter Herb Collection': 'herbs,winter,collection',
    'Summer Herb Collection': 'herbs,summer,botanical',
    'Monsoon Herb Collection': 'herbs,monsoon,green',
    'Festive Herb Collection': 'herbs,festive,spices',
    'Cold Pressed Mustard Oil': 'mustard,oil,bottle',
    'Cold Pressed Sesame Oil': 'sesame,oil,bottle',
    'Cold Pressed Groundnut Oil': 'peanut,oil,bottle',
    'Cold Pressed Coconut Oil': 'coconut,oil,bottle',
    'Cold Pressed Flaxseed Oil': 'flaxseed,oil,bottle',
    'Pure Honey': 'honey,jar,pure',
    'Forest Honey': 'honey,forest,natural',
    'Multifloral Honey': 'honey,flower,multifloral',
    'Cow Ghee': 'ghee,clarified,butter',
    'Desi Ghee': 'ghee,desi,traditional',
    'A2 Cow Ghee': 'ghee,cow,premium',
    'Almonds': 'almonds,nuts,bowl',
    'Cashews': 'cashews,nuts,bowl',
    'Raisins': 'raisins,dried,grapes',
    'Walnuts': 'walnuts,nuts,kernels',
    'Dates': 'dates,medjool,dried',
    'Figs / Anjeer': 'figs,dried,anjeer',
    'Pistachios': 'pistachios,nuts,green',
    'Chia Seeds': 'chia,seeds,superfood',
    'Flaxseeds': 'flaxseeds,linseed,brown',
    'Pumpkin Seeds': 'pumpkin,seeds,green',
    'Sunflower Seeds': 'sunflower,seeds,snack',
    'Sesame Seeds': 'sesame,seeds,white',
    'Sabja Seeds': 'basil,seeds,sabja',
    'Halim Seeds': 'garden,cress,seeds',
    'Jaggery Block': 'jaggery,gur,block',
    'Jaggery Powder': 'jaggery,powder,brown',
    'Organic Jaggery': 'jaggery,organic,natural',
    'Daily Herbal Tea': 'herbal,tea,cup',
    'Tulsi Herbal Tea': 'tulsi,tea,herbal',
    'Ginger Lemon Herbal Tea': 'ginger,lemon,tea',
    'Rose Herbal Tea': 'rose,tea,herbal',
    'Chamomile Herbal Tea': 'chamomile,tea,herbal',
    'Fresh Mint Herbal Tea': 'mint,tea,herbal',
    'Cinnamon Spice Herbal Tea': 'cinnamon,tea,spice',
    'Hibiscus Herbal Tea': 'hibiscus,tea,red',
    'Daily Herbal Kadha': 'kadha,herbal,spices',
    'Winter Kadha': 'kadha,winter,warm',
    'Herbal Spice Kadha': 'herbal,spice,kadha',
    'Tulsi Ginger Kadha': 'tulsi,ginger,kadha',
    'Family Kadha Blend': 'kadha,family,herbal',
    'Daily Wellness Drink Mix': 'wellness,drink,green',
    'Lemon Herbal Drink Mix': 'lemon,drink,herbal',
    'Rose Herbal Drink Mix': 'rose,drink,herbal',
    'Amla Herbal Drink Mix': 'amla,drink,juice',
    'Summer Herbal Drink Mix': 'summer,drink,cool',
    'Herbal Drink Discovery Combo': 'herbal,drinks,combo',
    'Ashwagandha Powder': 'ashwagandha,powder,ayurvedic',
    'Shatavari Powder': 'shatavari,powder,herbal',
    'Brahmi Powder': 'brahmi,powder,herbal',
    'Amla Powder': 'amla,powder,gooseberry',
    'Moringa Powder': 'moringa,powder,green',
    'Neem Powder': 'neem,powder,green',
    'Tulsi Powder': 'tulsi,powder,basil',
    'Turmeric Powder': 'turmeric,powder,golden',
    'Triphala Powder': 'triphala,powder,ayurvedic',
    'Trikatu Powder': 'trikatu,powder,spice',
    'Chyawanprash Powder Mix': 'chyawanprash,powder,ayurvedic',
    'Daily Detox Blend': 'detox,blend,green',
    'Golden Milk Blend': 'golden,milk,turmeric',
    'Digestive Blend': 'digestive,herbal,blend',
    'Spirulina Powder': 'spirulina,powder,green',
    'Wheatgrass Powder': 'wheatgrass,powder,green',
    'Barley Grass Powder': 'barley,grass,green',
    'Moringa Superfood Powder': 'moringa,superfood,powder',
    'Daily Green Nutrition Powder': 'green,nutrition,powder',
    'Protein Nutrition Powder': 'protein,nutrition,powder',
    'Multi-Grain Nutrition Powder': 'multigrain,nutrition,powder',
    'Sattu Powder': 'sattu,powder,protein',
    'Morning Nutrition Mix': 'morning,nutrition,breakfast',
};
function downloadImage(url) {
    return new Promise(function (resolve, reject) {
        var follow = function (u, depth) {
            if (depth > 5) {
                reject(new Error('Too many redirects'));
                return;
            }
            var mod = u.startsWith('https') ? https_1.default : require('http');
            mod.get(u, function (res) {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    var loc = res.headers.location;
                    if (loc)
                        return follow(loc.startsWith('http') ? loc : "https://loremflickr.com".concat(loc), depth + 1);
                }
                if (res.statusCode !== 200) {
                    reject(new Error("Status: ".concat(res.statusCode)));
                    return;
                }
                var data = [];
                res.on('data', function (chunk) { return data.push(chunk); });
                res.on('end', function () { return resolve(Buffer.concat(data)); });
            }).on('error', reject);
        };
        follow(url, 0);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, targetCatIds, products, images, pending, BATCH_SIZE, success, failed, i, batch, batchNum, totalBatches, _loop_1, batch_1, batch_1_1, p, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase.from('categories').select('*')];
                case 1:
                    categories = (_b.sent()).data;
                    targetCatIds = (categories === null || categories === void 0 ? void 0 : categories.filter(function (c) { return TARGET_CATEGORIES.includes(c.name); }).map(function (c) { return c.id; })) || [];
                    return [4 /*yield*/, supabase
                            .from('products')
                            .select('id, name, slug, category_id')
                            .in('category_id', targetCatIds)];
                case 2:
                    products = (_b.sent()).data;
                    if (!products) {
                        console.log("No products found.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, supabase.from('product_images').select('product_id, url, id')];
                case 3:
                    images = (_b.sent()).data;
                    pending = products.filter(function (p) {
                        var pImgs = (images === null || images === void 0 ? void 0 : images.filter(function (img) { return img.product_id === p.id; })) || [];
                        return pImgs.length === 0 || pImgs.some(function (img) { return img.url.includes('cat_') || img.url.includes('placeholder'); });
                    });
                    console.log("Total pending: ".concat(pending.length, " products need images.\n"));
                    BATCH_SIZE = 10;
                    success = 0;
                    failed = 0;
                    i = 0;
                    _b.label = 4;
                case 4:
                    if (!(i < pending.length)) return [3 /*break*/, 15];
                    batch = pending.slice(i, i + BATCH_SIZE);
                    batchNum = Math.floor(i / BATCH_SIZE) + 1;
                    totalBatches = Math.ceil(pending.length / BATCH_SIZE);
                    console.log("\n=== BATCH ".concat(batchNum, "/").concat(totalBatches, " ==="));
                    _loop_1 = function (p) {
                        var keywords, url, buffer, fileName, uploadErr, publicUrl, pImgs, err_1;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    keywords = KEYWORD_MAP[p.name] || p.name.toLowerCase().replace(/[^a-z ]/g, '').split(' ').slice(0, 3).join(',');
                                    url = "https://loremflickr.com/800/800/".concat(encodeURIComponent(keywords));
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 7, , 8]);
                                    return [4 /*yield*/, downloadImage(url)];
                                case 2:
                                    buffer = _c.sent();
                                    fileName = "".concat(p.slug, "-").concat(Date.now(), ".jpg");
                                    return [4 /*yield*/, supabase.storage
                                            .from('products')
                                            .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true })];
                                case 3:
                                    uploadErr = (_c.sent()).error;
                                    if (uploadErr)
                                        throw uploadErr;
                                    publicUrl = supabase.storage.from('products').getPublicUrl(fileName).data.publicUrl;
                                    pImgs = (images === null || images === void 0 ? void 0 : images.filter(function (img) { return img.product_id === p.id; })) || [];
                                    if (!(pImgs.length > 0)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', p.id)];
                                case 4:
                                    _c.sent();
                                    _c.label = 5;
                                case 5: return [4 /*yield*/, supabase.from('product_images').insert({ product_id: p.id, url: publicUrl, display_order: 1 })];
                                case 6:
                                    _c.sent();
                                    success++;
                                    console.log("[".concat(success + failed, "/").concat(pending.length, "] OK: ").concat(p.name));
                                    return [3 /*break*/, 8];
                                case 7:
                                    err_1 = _c.sent();
                                    failed++;
                                    console.error("[".concat(success + failed, "/").concat(pending.length, "] FAIL: ").concat(p.name, " - ").concat(err_1.message));
                                    return [3 /*break*/, 8];
                                case 8: 
                                // Small delay between individual requests
                                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1500); })];
                                case 9:
                                    // Small delay between individual requests
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 10, 11, 12]);
                    batch_1 = (e_1 = void 0, __values(batch)), batch_1_1 = batch_1.next();
                    _b.label = 6;
                case 6:
                    if (!!batch_1_1.done) return [3 /*break*/, 9];
                    p = batch_1_1.value;
                    return [5 /*yield**/, _loop_1(p)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    batch_1_1 = batch_1.next();
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (batch_1_1 && !batch_1_1.done && (_a = batch_1.return)) _a.call(batch_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 12:
                    if (!(i + BATCH_SIZE < pending.length)) return [3 /*break*/, 14];
                    console.log("\nBatch ".concat(batchNum, " done. Pausing 5 seconds before next batch..."));
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 5000); })];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14:
                    i += BATCH_SIZE;
                    return [3 /*break*/, 4];
                case 15:
                    console.log("\n=== COMPLETE ===");
                    console.log("Success: ".concat(success));
                    console.log("Failed: ".concat(failed));
                    console.log("Total: ".concat(pending.length));
                    return [2 /*return*/];
            }
        });
    });
}
run();
