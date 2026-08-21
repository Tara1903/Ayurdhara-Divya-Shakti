const fs = require('fs');
let c = fs.readFileSync('src/components/PDPClient.tsx', 'utf8');

const t1 = "const isIndividualPack = product.name === 'Trial Wellness Pack' || product.name === 'Diamond Trial Wellness Pack';";
const r1 = "const isIndividualPack = product.name === 'Trial Wellness Pack' || product.name === 'Diamond Trial Wellness Pack' || product.name === 'Gold Wellness Pack' || product.name === 'Premium Wellness Pack';";
c = c.replace(t1, r1);

const t2 = "const isGoldPack = product.name === 'Gold Wellness Pack' || product.name === 'Premium Wellness Pack';";
const r2 = "const isGoldPack = false;";
c = c.replace(t2, r2);

const t3 = "{isGoldPack ? 'Choose Your 4 Wellness Categories' : 'Choose Your Wellness Category'}";
const r3 = "{'Choose Your Wellness Category'}";
c = c.replace(t3, r3);

const t4 = "let selectionsStr = '';\n        if (isMassage || isIndividualPack) {\n          selectionsStr = categorySelections[0];\n        } else if (isGoldPack) {\n          selectionsStr = categorySelections.slice(0, 4).join(', ');\n        } else if (isFamilyPack) {\n          selectionsStr = categorySelections.slice(0, numMembers).join(', ');\n        }";
const r4 = "let selectionsStr = '';\n        if (isFamilyPack) {\n          selectionsStr = categorySelections.slice(0, numMembers).join(', ');\n        } else if (isIndividualPack || isMassage) {\n          selectionsStr = categorySelections[0];\n        }";
c = c.replace(t4, r4);

fs.writeFileSync('src/components/PDPClient.tsx', c);
console.log('Done Node');
