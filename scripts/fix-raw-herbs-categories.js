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
function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-');
}
var PRODUCTS_MAP = [
    { name: 'Ajwain Seeds', cat: 'Single Herbs' },
    { name: 'Saunf / Fennel Seeds', cat: 'Single Herbs' },
    { name: 'Cumin Seeds / Jeera', cat: 'Single Herbs' },
    { name: 'Fenugreek Seeds', cat: 'Single Herbs' },
    { name: 'Kalonji Seeds', cat: 'Single Herbs' },
    { name: 'Mustard Seeds', cat: 'Single Herbs' },
    { name: 'Coriander Seeds', cat: 'Single Herbs' },
    { name: 'Whole Black Pepper', cat: 'Single Herbs' },
    { name: 'Whole Cloves', cat: 'Single Herbs' },
    { name: 'Cinnamon Sticks', cat: 'Single Herbs' },
    { name: 'Green Cardamom', cat: 'Single Herbs' },
    { name: 'Whole Dry Ginger', cat: 'Single Herbs' },
    { name: 'Dried Amla Pieces', cat: 'Single Herbs' },
    { name: 'Dried Tulsi Leaves', cat: 'Single Herbs' },
    { name: 'Dried Neem Leaves', cat: 'Single Herbs' },
    { name: 'Ashwagandha Root', cat: 'Premium Herbs' },
    { name: 'Shatavari Root', cat: 'Premium Herbs' },
    { name: 'Brahmi', cat: 'Premium Herbs' },
    { name: 'Jatamansi', cat: 'Premium Herbs' },
    { name: 'Safed Musli', cat: 'Premium Herbs' },
    { name: 'Gokhru', cat: 'Premium Herbs' },
    { name: 'Arjuna Bark', cat: 'Premium Herbs' },
    { name: 'Mulethi', cat: 'Premium Herbs' },
    { name: 'Dried Giloy Stem', cat: 'Premium Herbs' },
    { name: 'Dried Moringa Leaves', cat: 'Premium Herbs' },
    { name: 'Dried Hibiscus Flowers', cat: 'Premium Herbs' },
    { name: 'Dried Chamomile Flowers', cat: 'Premium Herbs' },
    { name: 'Dried Rose Petals', cat: 'Premium Herbs' },
    { name: 'Dried Vetiver Root', cat: 'Premium Herbs' },
    { name: 'Premium Saffron / Kesar', cat: 'Premium Herbs' },
    { name: 'Winter Herb Collection', cat: 'Seasonal Collections' },
    { name: 'Summer Herb Collection', cat: 'Seasonal Collections' },
    { name: 'Monsoon Herb Collection', cat: 'Seasonal Collections' },
    { name: 'Festive Herb Collection', cat: 'Seasonal Collections' }
];
function fix() {
    return __awaiter(this, void 0, void 0, function () {
        var uniqueCategories, categoryMap, uniqueCategories_1, uniqueCategories_1_1, catName, _a, data, error, e_1_1, PRODUCTS_MAP_1, PRODUCTS_MAP_1_1, p, categoryId, error, e_2_1;
        var e_1, _b, e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    uniqueCategories = Array.from(new Set(PRODUCTS_MAP.map(function (p) { return p.cat; })));
                    categoryMap = new Map();
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    uniqueCategories_1 = __values(uniqueCategories), uniqueCategories_1_1 = uniqueCategories_1.next();
                    _d.label = 2;
                case 2:
                    if (!!uniqueCategories_1_1.done) return [3 /*break*/, 5];
                    catName = uniqueCategories_1_1.value;
                    return [4 /*yield*/, supabase
                            .from('categories')
                            .upsert({ name: catName, slug: slugify(catName) }, { onConflict: 'slug' })
                            .select()
                            .single()];
                case 3:
                    _a = _d.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error("Error inserting category ".concat(catName), error);
                        return [3 /*break*/, 4];
                    }
                    categoryMap.set(catName, data.id);
                    _d.label = 4;
                case 4:
                    uniqueCategories_1_1 = uniqueCategories_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (uniqueCategories_1_1 && !uniqueCategories_1_1.done && (_b = uniqueCategories_1.return)) _b.call(uniqueCategories_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8:
                    _d.trys.push([8, 13, 14, 15]);
                    PRODUCTS_MAP_1 = __values(PRODUCTS_MAP), PRODUCTS_MAP_1_1 = PRODUCTS_MAP_1.next();
                    _d.label = 9;
                case 9:
                    if (!!PRODUCTS_MAP_1_1.done) return [3 /*break*/, 12];
                    p = PRODUCTS_MAP_1_1.value;
                    categoryId = categoryMap.get(p.cat);
                    return [4 /*yield*/, supabase
                            .from('products')
                            .update({ category_id: categoryId })
                            .eq('name', p.name)];
                case 10:
                    error = (_d.sent()).error;
                    if (error) {
                        console.error("Error updating product ".concat(p.name), error);
                    }
                    _d.label = 11;
                case 11:
                    PRODUCTS_MAP_1_1 = PRODUCTS_MAP_1.next();
                    return [3 /*break*/, 9];
                case 12: return [3 /*break*/, 15];
                case 13:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 15];
                case 14:
                    try {
                        if (PRODUCTS_MAP_1_1 && !PRODUCTS_MAP_1_1.done && (_c = PRODUCTS_MAP_1.return)) _c.call(PRODUCTS_MAP_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 15:
                    console.log('Categories fixed for Raw Herbs!');
                    return [2 /*return*/];
            }
        });
    });
}
fix();
