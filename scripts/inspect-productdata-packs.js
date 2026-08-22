"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productData_1 = require("../src/data/productData");
console.log('Total products in productData:', productData_1.products.length);
var packs = productData_1.products.filter(function (p) { return p.slug.includes('pack') || p.slug.includes('trial') || p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('trial'); });
console.log('Packs in productData:', packs.length);
packs.forEach(function (p) { return console.log("Slug: ".concat(p.slug, " | Name: \"").concat(p.name, "\" | Cat: \"").concat(p.category, "\"")); });
