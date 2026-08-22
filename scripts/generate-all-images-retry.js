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
var TARGET_CATEGORIES = [
    'Single Herbs', 'Premium Herbs', 'Seasonal Collections',
    'Cold Pressed Oils', 'Honey', 'Ghee', 'Dry Fruits', 'Seeds', 'Jaggery',
    'Herbal Teas', 'Kadha', 'Wellness Drinks',
    'Single Herb Powder', 'Wellness Powder Blends', 'Superfood Powders', 'Daily Nutrition Powders'
];
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, targetCatIds, products, images, count, _loop_1, products_1, products_1_1, p, e_1_1;
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
                    return [4 /*yield*/, supabase
                            .from('product_images')
                            .select('product_id, url, id')];
                case 3:
                    images = (_b.sent()).data;
                    console.log("Found ".concat(products.length, " total products to process in target categories."));
                    count = 0;
                    _loop_1 = function (p) {
                        var productImages, hasPlaceholder, cat, catName, success, retries_1, maxRetries, seed, prompt_1, encodedPrompt, url, res, arrayBuffer, buffer, fileName, uploadErr, publicUrl, err_1;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    productImages = (images === null || images === void 0 ? void 0 : images.filter(function (img) { return img.product_id === p.id; })) || [];
                                    hasPlaceholder = productImages.some(function (img) { return img.url.includes('cat_') || img.url.includes('placeholder'); });
                                    if (!(hasPlaceholder || productImages.length === 0)) return [3 /*break*/, 16];
                                    count++;
                                    console.log("\n[".concat(count, "] Generating image for ").concat(p.name, "..."));
                                    cat = categories === null || categories === void 0 ? void 0 : categories.find(function (c) { return c.id === p.category_id; });
                                    catName = cat ? cat.name : 'Ayurvedic Wellness';
                                    success = false;
                                    retries_1 = 0;
                                    maxRetries = 10;
                                    _c.label = 1;
                                case 1:
                                    if (!(!success && retries_1 < maxRetries)) return [3 /*break*/, 14];
                                    seed = Math.floor(Math.random() * 1000000);
                                    prompt_1 = "A premium clean aesthetic top-down product photography shot of ".concat(p.name, ", category ").concat(catName, ", on a soft cream background, perfect luxurious minimalist setup, organic ayurvedic brand, high resolution");
                                    encodedPrompt = encodeURIComponent(prompt_1);
                                    url = "https://image.pollinations.ai/prompt/".concat(encodedPrompt, "?width=800&height=800&nologo=true&seed=").concat(seed);
                                    _c.label = 2;
                                case 2:
                                    _c.trys.push([2, 11, , 13]);
                                    return [4 /*yield*/, fetch(url, { signal: AbortSignal.timeout(20000) })];
                                case 3:
                                    res = _c.sent();
                                    if (!!res.ok) return [3 /*break*/, 5];
                                    console.log("  Retry ".concat(retries_1 + 1, ": Failed with status ").concat(res.status));
                                    retries_1++;
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 6000 + (retries_1 * 2000)); })];
                                case 4:
                                    _c.sent(); // Backoff
                                    return [3 /*break*/, 1];
                                case 5: return [4 /*yield*/, res.arrayBuffer()];
                                case 6:
                                    arrayBuffer = _c.sent();
                                    buffer = Buffer.from(arrayBuffer);
                                    fileName = "".concat(p.slug, "-").concat(Date.now(), ".jpg");
                                    return [4 /*yield*/, supabase.storage
                                            .from('products')
                                            .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true })];
                                case 7:
                                    uploadErr = (_c.sent()).error;
                                    if (uploadErr)
                                        throw uploadErr;
                                    publicUrl = supabase.storage
                                        .from('products')
                                        .getPublicUrl(fileName).data.publicUrl;
                                    if (!(productImages.length > 0)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', p.id)];
                                case 8:
                                    _c.sent();
                                    _c.label = 9;
                                case 9: return [4 /*yield*/, supabase.from('product_images').insert({
                                        product_id: p.id,
                                        url: publicUrl,
                                        display_order: 1
                                    })];
                                case 10:
                                    _c.sent();
                                    console.log("  -> Success: ".concat(publicUrl));
                                    success = true;
                                    return [3 /*break*/, 13];
                                case 11:
                                    err_1 = _c.sent();
                                    console.error("  -> Retry ".concat(retries_1 + 1, ": Error on ").concat(p.name, ": ").concat(err_1.message));
                                    retries_1++;
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 6000 + (retries_1 * 2000)); })];
                                case 12:
                                    _c.sent(); // Backoff
                                    return [3 /*break*/, 13];
                                case 13: return [3 /*break*/, 1];
                                case 14:
                                    if (!success) {
                                        console.log("  -> FAILED completely for ".concat(p.name));
                                    }
                                    // Delay before next product
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 4000); })];
                                case 15:
                                    // Delay before next product
                                    _c.sent();
                                    _c.label = 16;
                                case 16: return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 9, 10, 11]);
                    products_1 = __values(products), products_1_1 = products_1.next();
                    _b.label = 5;
                case 5:
                    if (!!products_1_1.done) return [3 /*break*/, 8];
                    p = products_1_1.value;
                    return [5 /*yield**/, _loop_1(p)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    products_1_1 = products_1.next();
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 11];
                case 9:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 11];
                case 10:
                    try {
                        if (products_1_1 && !products_1_1.done && (_a = products_1.return)) _a.call(products_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 11:
                    console.log('All missing images generated and updated!');
                    return [2 /*return*/];
            }
        });
    });
}
run();
