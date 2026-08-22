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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv = __importStar(require("dotenv"));
var path_1 = require("path");
var https_1 = __importDefault(require("https"));
var image_system_1 = require("../src/lib/image-system");
var image_resolver_1 = require("../src/lib/image-resolver");
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env.local') });
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
function downloadBuffer(url) {
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
                        return follow(loc.startsWith('http') ? loc : loc, depth + 1);
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
        var _a, products, categories, catMap, count, products_1, products_1_1, p, catName, intel, resolved, finalUrl, buffer, fileName, uploadErr, publicUrl, err_1, e_1_1;
        var e_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('🚀 Running Master Product Image System...');
                    return [4 /*yield*/, Promise.all([
                            supabase.from('products').select('id, name, slug, category_id'),
                            supabase.from('categories').select('id, name')
                        ])];
                case 1:
                    _a = __read.apply(void 0, [_c.sent(), 2]), products = _a[0].data, categories = _a[1].data;
                    if (!products) {
                        console.log('No products found.');
                        return [2 /*return*/];
                    }
                    catMap = new Map((categories || []).map(function (c) { return [c.id, c.name]; }));
                    console.log("Found ".concat(products.length, " products to process.\n"));
                    count = 0;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 15, 16, 17]);
                    products_1 = __values(products), products_1_1 = products_1.next();
                    _c.label = 3;
                case 3:
                    if (!!products_1_1.done) return [3 /*break*/, 14];
                    p = products_1_1.value;
                    count++;
                    catName = catMap.get(p.category_id) || '';
                    intel = (0, image_system_1.analyzeProductForImages)(p.name, catName);
                    return [4 /*yield*/, (0, image_resolver_1.resolveAutoProductImage)(p.name, catName)];
                case 4:
                    resolved = _c.sent();
                    console.log("[".concat(count, "/").concat(products.length, "] ").concat(p.name, " -> Form: [").concat(intel.productForm, "] (").concat(resolved.source, ")"));
                    finalUrl = resolved.url;
                    if (!resolved.url.startsWith('http')) return [3 /*break*/, 9];
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 8, , 9]);
                    return [4 /*yield*/, downloadBuffer(resolved.url)];
                case 6:
                    buffer = _c.sent();
                    fileName = "".concat(p.slug, "-master-").concat(Date.now(), ".jpg");
                    return [4 /*yield*/, supabase.storage
                            .from('products')
                            .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true })];
                case 7:
                    uploadErr = (_c.sent()).error;
                    if (!uploadErr) {
                        publicUrl = supabase.storage
                            .from('products')
                            .getPublicUrl(fileName).data.publicUrl;
                        finalUrl = publicUrl;
                    }
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _c.sent();
                    console.warn("  Warning: storage upload skipped, using direct URL: ".concat(err_1.message));
                    return [3 /*break*/, 9];
                case 9: 
                // Update product_images
                return [4 /*yield*/, supabase.from('product_images').delete().eq('product_id', p.id)];
                case 10:
                    // Update product_images
                    _c.sent();
                    return [4 /*yield*/, supabase.from('product_images').insert({
                            product_id: p.id,
                            url: finalUrl,
                            display_order: 1
                        })];
                case 11:
                    _c.sent();
                    console.log("  \u2713 Linked: ".concat(finalUrl));
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 200); })];
                case 12:
                    _c.sent();
                    _c.label = 13;
                case 13:
                    products_1_1 = products_1.next();
                    return [3 /*break*/, 3];
                case 14: return [3 /*break*/, 17];
                case 15:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 16:
                    try {
                        if (products_1_1 && !products_1_1.done && (_b = products_1.return)) _b.call(products_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 17:
                    console.log('\n🎉 Master Product Image System execution complete for all products!');
                    return [2 /*return*/];
            }
        });
    });
}
run();
