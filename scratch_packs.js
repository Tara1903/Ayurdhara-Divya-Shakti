const fs = require('fs');

let content = fs.readFileSync('src/data/productData.ts', 'utf8');

function updatePack(id, newName, mrp, offer, badge, inclusions, duration) {
  // Regex to find the object with the given ID
  const idRegex = new RegExp(`"id":\\s*"${id}"[\\s\\S]*?(?=}, \\{\\s+"id"|\\n\\s*\\];)`, 'g');
  
  content = content.replace(idRegex, (match) => {
    let updated = match;
    updated = updated.replace(/"name":\s*".*?"/, `"name": "${newName}"`);
    updated = updated.replace(/"originalPrice":\s*\d+/, `"originalPrice": ${mrp}`);
    updated = updated.replace(/"price":\s*\d+/, `"price": ${offer}`);
    updated = updated.replace(/"discount":\s*\d+/, `"discount": ${Math.round(((mrp - offer)/mrp)*100)}`);
    
    if (updated.includes('"badge"')) {
      updated = updated.replace(/"badge":\s*".*?"/, `"badge": "${badge}"`);
    } else {
      updated = updated.replace(/"reviewCount":\s*\d+,/, `$& \n    "badge": "${badge}",`);
    }
    
    if (updated.includes('"inclusions"')) {
      updated = updated.replace(/"inclusions":\s*".*?"/, `"inclusions": "${inclusions}"`);
    } else {
      updated = updated.replace(/"reviewCount":\s*\d+,/, `$& \n    "inclusions": "${inclusions}",`);
    }

    if (updated.includes('"durationText"')) {
      updated = updated.replace(/"durationText":\s*".*?"/, `"durationText": "${duration}"`);
    } else {
      updated = updated.replace(/"reviewCount":\s*\d+,/, `$& \n    "durationText": "${duration}",`);
    }
    
    updated = updated.replace(/"originalPrice":\s*\d+/g, `"originalPrice": ${mrp}`);
    updated = updated.replace(/"price":\s*\d+/g, `"price": ${offer}`);

    return updated;
  });
}

updatePack('trial-wellness-pack', '?? Trial Wellness Pack', 749, 499, '?? STARTER TRIAL', '10 ml Nabhi Wellness Oil Blend, 30 ml Feet Massage Oil', 'Up to 1 Month Wellness Care');
updatePack('diamond-trial-wellness-pack', '?? Gold Trial Wellness Pack', 1499, 999, '?? COMPLETE TRIAL', '10 ml Nabhi Wellness Oil Blend, 30 ml Feet Massage Oil, 100 ml Body Wellness Massage Oil', 'Complete 3-Step Wellness Trial');
updatePack('gold-wellness-pack', '?? Diamond Wellness Pack', 2499, 1799, '?? BEST VALUE', '40 ml Nabhi Wellness Oil Blend (4 × 10 ml), 100 ml Feet Massage Oil', 'Up to 4 Months Wellness Care');
updatePack('premium-wellness-pack', '?? Premium Wellness Pack', 4999, 3299, '?? LONG-TERM VALUE', '80 ml Nabhi Wellness Oil Blend (4 × 20 ml), 200 ml Feet Massage Oil', 'Up to 8 Months Wellness Care');

const newPacks = [
  { id: '2-member-family-trial', name: '2 Member Family Trial', price: 899, mrp: 1499, duration: 'Up to 1 Month', cat: 'Family Trial Wellness Packs', badge: '???????? FAMILY SAVING', img: '/images/products/diamond-trial.jpg' },
  { id: '3-member-family-trial', name: '3 Member Family Trial', price: 1299, mrp: 2249, duration: 'Up to 1 Month', cat: 'Family Trial Wellness Packs', badge: '???????? FAMILY SAVING', img: '/images/products/diamond-trial.jpg' },
  { id: '4-member-family-trial', name: '4 Member Family Trial', price: 1699, mrp: 2999, duration: 'Up to 1 Month', cat: 'Family Trial Wellness Packs', badge: '???????? FAMILY SAVING', img: '/images/products/diamond-trial.jpg' },
  { id: '5-member-family-trial', name: '5 Member Family Trial', price: 2099, mrp: 3749, duration: 'Up to 1 Month', cat: 'Family Trial Wellness Packs', badge: '???????? FAMILY SAVING', img: '/images/products/diamond-trial.jpg' },
  { id: '2-member-family-diamond', name: '2 Member Family Diamond', price: 3199, mrp: 4999, duration: 'Up to 4 Months', cat: 'Family Gold Wellness Packs', badge: '???????? DIAMOND FAMILY VALUE', img: '/images/products/gold-pack.jpg' },
  { id: '3-member-family-diamond', name: '3 Member Family Diamond', price: 4799, mrp: 7499, duration: 'Up to 4 Months', cat: 'Family Gold Wellness Packs', badge: '???????? DIAMOND FAMILY VALUE', img: '/images/products/gold-pack.jpg' },
  { id: '4-member-family-diamond', name: '4 Member Family Diamond', price: 6399, mrp: 9999, duration: 'Up to 4 Months', cat: 'Family Gold Wellness Packs', badge: '???????? DIAMOND FAMILY VALUE', img: '/images/products/gold-pack.jpg' },
  { id: '5-member-family-diamond', name: '5 Member Family Diamond', price: 7999, mrp: 12499, duration: 'Up to 4 Months', cat: 'Family Gold Wellness Packs', badge: '???????? DIAMOND FAMILY VALUE', img: '/images/products/gold-pack.jpg' }
];

let objectsToAdd = '';
newPacks.forEach(p => {
  if (!content.includes(`"id": "${p.id}"`)) {
    objectsToAdd += `  {
    "id": "${p.id}",
    "slug": "${p.id}",
    "name": "${p.name}",
    "category": "${p.cat}",
    "shortDescription": "Premium Family Wellness Pack for holistic care.",
    "fullDescription": "Experience the timeless benefits of daily self-care together with our premium botanical blends.",
    "story": "Rooted in ancient Ayurvedic texts.",
    "benefit": "Supports daily vitality for the family.",
    "benefits": [],
    "ingredients": [],
    "images": ["${p.img}"],
    "variants": [],
    "price": ${p.price},
    "originalPrice": ${p.mrp},
    "discount": Math.round(((${p.mrp} - ${p.price}) / ${p.mrp}) * 100),
    "rating": 5.0,
    "reviewCount": 12,
    "badge": "${p.badge}",
    "inclusions": "Family Pack Inclusion",
    "durationText": "${p.duration}",
    "healthGoals": [],
    "idealFor": ["Family"],
    "usageInstructions": { "serving": "As needed", "timing": "Daily", "instructions": "Use as directed." },
    "specifications": {},
    "certifications": ["100% Natural"],
    "faqs": [],
    "relatedProductIds": [],
    "routineProductIds": []
  },
`;
  }
});

if (objectsToAdd) {
  content = content.replace(/\n\];/, ',\n' + objectsToAdd + '];');
}

fs.writeFileSync('src/data/productData.ts', content, 'utf8');
console.log("Updated productData.ts");
