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
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv = __importStar(require("dotenv"));
var path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env.local') });
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
var PRODUCTS_CONTENTS = {
    'winter-herb-collection': 'Dry Ginger, Ajwain, Cinnamon, Clove, Black Pepper',
    'summer-herb-collection': 'Sabja Seeds, Fennel Seeds, Dried Rose Petals, Dried Coriander Seeds, Vetiver / Khus',
    'monsoon-herb-collection': 'Ajwain, Dried Tulsi, Dry Ginger, Black Pepper, Cinnamon',
    'festive-herb-collection': 'Cinnamon, Cardamom, Clove, Black Pepper, Dried Rose Petals'
};
var RAW_HERBS_SLUGS = [
    'ajwain-seeds', 'saunf-seeds', 'cumin-seeds', 'fenugreek-seeds', 'kalonji-seeds',
    'mustard-seeds', 'coriander-seeds', 'whole-black-pepper', 'whole-cloves',
    'cinnamon-sticks', 'green-cardamom', 'whole-dry-ginger', 'dried-amla-pieces',
    'dried-tulsi-leaves', 'dried-neem-leaves',
    'ashwagandha-root', 'shatavari-root', 'brahmi', 'jatamansi', 'safed-musli',
    'gokhru', 'arjuna-bark', 'mulethi', 'dried-giloy-stem', 'dried-moringa-leaves',
    'dried-hibiscus-flowers', 'dried-chamomile-flowers', 'dried-rose-petals',
    'dried-vetiver-root', 'premium-saffron-kesar',
    'winter-herb-collection', 'summer-herb-collection', 'monsoon-herb-collection', 'festive-herb-collection'
];
function updateProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, RAW_HERBS_SLUGS_1, slug, isFlowerLeafRoot, storage, usageInstructions, idealFor, contents, specifications, benefits, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Updating ".concat(RAW_HERBS_SLUGS.length, " products with contents..."));
                    _i = 0, RAW_HERBS_SLUGS_1 = RAW_HERBS_SLUGS;
                    _a.label = 1;
                case 1:
                    if (!(_i < RAW_HERBS_SLUGS_1.length)) return [3 /*break*/, 4];
                    slug = RAW_HERBS_SLUGS_1[_i];
                    isFlowerLeafRoot = slug.includes('flower') || slug.includes('leaf') || slug.includes('leaves') || slug.includes('root') || slug.includes('tulsi') || slug.includes('neem') || slug.includes('brahmi') || slug.includes('mulethi') || slug.includes('petals') || slug.includes('saffron') || slug.includes('kesar');
                    storage = 'Store in a cool, dry place away from direct sunlight and moisture. Keep the pack tightly closed after opening.';
                    if (isFlowerLeafRoot) {
                        storage += ' Keep away from moisture to help maintain freshness and aroma.';
                    }
                    usageInstructions = {
                        serving: 'As required',
                        timing: 'Any time',
                        instructions: 'Use as a natural ingredient in your daily wellness routine or culinary preparation.'
                    };
                    idealFor = ['Everyday natural living', 'Traditional wellness use', 'Culinary preparation'];
                    contents = PRODUCTS_CONTENTS[slug] || '100% Pure Raw Herb / Botanical';
                    specifications = {
                        'Storage': storage,
                        'Type': 'Raw Herb / Botanical',
                        'Contents / Ingredients': contents,
                        'Disclaimer': 'This product is a natural botanical ingredient. It is not intended to diagnose, treat, cure, or prevent any disease. Results may vary.'
                    };
                    benefits = [
                        { text: 'Selected premium whole botanical' },
                        { text: 'Carefully packed to retain natural aroma and flavour' },
                        { text: 'Ideal for everyday natural living' }
                    ];
                    return [4 /*yield*/, supabase
                            .from('products')
                            .update({
                            usage_instructions: usageInstructions,
                            ideal_for: idealFor,
                            specifications: specifications,
                            benefits: benefits
                        })
                            .eq('slug', slug)];
                case 2:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error("Error updating product ".concat(slug), error);
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Update done!');
                    return [2 /*return*/];
            }
        });
    });
}
updateProducts();
