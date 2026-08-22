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
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, products, products_1, products_1_1, p, seed, prompt_1, url, res, arrayBuffer, buffer, fileName, publicUrl, err_1, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase.from('categories').select('*').eq('name', 'Herbal Teas').single()];
                case 1:
                    categories = (_b.sent()).data;
                    if (!categories)
                        return [2 /*return*/];
                    return [4 /*yield*/, supabase
                            .from('products')
                            .select('id, name, slug')
                            .eq('category_id', categories.id)
                            .limit(5)];
                case 2:
                    products = (_b.sent()).data;
                    if (!products || products.length === 0) {
                        console.log("No products found.");
                        return [2 /*return*/];
                    }
                    console.log("Processing batch of ".concat(products.length, " products..."));
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 16, 17, 18]);
                    products_1 = __values(products), products_1_1 = products_1.next();
                    _b.label = 4;
                case 4:
                    if (!!products_1_1.done) return [3 /*break*/, 15];
                    p = products_1_1.value;
                    console.log("Generating image for ".concat(p.name, "..."));
                    seed = Math.floor(Math.random() * 100000);
                    prompt_1 = "A premium clean aesthetic top-down product photography shot of ".concat(p.name, ", herbal tea, on a soft cream background, perfect luxurious minimalist setup, organic ayurvedic brand, high resolution");
                    url = "https://image.pollinations.ai/prompt/".concat(encodeURIComponent(prompt_1), "?width=800&height=800&nologo=true&seed=").concat(seed);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 11, , 12]);
                    return [4 /*yield*/, fetch(url, { signal: AbortSignal.timeout(25000) })];
                case 6:
                    res = _b.sent();
                    if (!res.ok) {
                        console.log("Failed with status ".concat(res.status));
                        return [3 /*break*/, 15]; // Stop the batch if rate limited
                    }
                    return [4 /*yield*/, res.arrayBuffer()];
                case 7:
                    arrayBuffer = _b.sent();
                    buffer = Buffer.from(arrayBuffer);
                    fileName = "".concat(p.slug, "-").concat(Date.now(), ".jpg");
                    return [4 /*yield*/, supabase.storage.from('products').upload(fileName, buffer, { contentType: 'image/jpeg' })];
                case 8:
                    _b.sent();
                    publicUrl = supabase.storage.from('products').getPublicUrl(fileName).data.publicUrl;
                    return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', p.id)];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, supabase.from('product_images').insert({ product_id: p.id, url: publicUrl, display_order: 1 })];
                case 10:
                    _b.sent();
                    console.log("-> Success: ".concat(publicUrl));
                    return [3 /*break*/, 12];
                case 11:
                    err_1 = _b.sent();
                    console.error("-> Error on ".concat(p.name, ":"), err_1.message);
                    return [3 /*break*/, 15];
                case 12:
                    console.log("Waiting 10 seconds to respect rate limits...");
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10000); })];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14:
                    products_1_1 = products_1.next();
                    return [3 /*break*/, 4];
                case 15: return [3 /*break*/, 18];
                case 16:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 18];
                case 17:
                    try {
                        if (products_1_1 && !products_1_1.done && (_a = products_1.return)) _a.call(products_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 18:
                    console.log('Batch complete!');
                    return [2 /*return*/];
            }
        });
    });
}
run();
