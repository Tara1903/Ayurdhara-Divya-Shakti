const fs = require('fs');
let content = fs.readFileSync('src/data/productData.ts', 'utf8');

// Find the generic trial pack
const match = content.match(/\{\s*"id":\s*"trial-wellness-pack"[^]*?"routineProductIds":\s*\[\]\n\s*\}/);

if (match) {
  let genericTrialStr = match[0];
  console.log("Found trial pack");
  
  const variants = [
    { id: 'kids-trial-wellness-pack', name: '?? Kids Trial Wellness Pack', category: 'Kids Care Oil Blend' },
    { id: 'men-trial-wellness-pack', name: '?? Men Trial Wellness Pack', category: 'Men Wellness Oil Blend' },
    { id: 'women-trial-wellness-pack', name: '?? Women Trial Wellness Pack', category: 'Women Wellness Oil Blend' },
    { id: 'senior-trial-wellness-pack', name: '?? Senior Trial Wellness Pack', category: 'Senior Care Oil Blend' },
  ];

  let newPacksStr = variants.map(v => {
    let p = genericTrialStr;
    p = p.replace(/"id":\s*".*?"/, `"id": "${v.id}"`);
    p = p.replace(/"slug":\s*".*?"/, `"slug": "${v.id}"`);
    p = p.replace(/"name":\s*".*?"/, `"name": "${v.name}"`);
    p = p.replace(/"category":\s*".*?"/, `"category": "${v.category}"`);
    return p;
  }).join(',\n  ');

  content = content.replace(genericTrialStr, newPacksStr);
  fs.writeFileSync('src/data/productData.ts', content, 'utf8');
  console.log("Replaced trial pack with 4 variants.");
} else {
  console.log("Could not find trial pack.");
}
