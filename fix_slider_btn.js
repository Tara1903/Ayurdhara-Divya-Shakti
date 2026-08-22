const fs = require('fs');
let c = fs.readFileSync('src/components/CampaignHeroSlider.tsx', 'utf8');
c = c.replace(/Starting \?499/g, "Starting \u20B9499");
fs.writeFileSync('src/components/CampaignHeroSlider.tsx', c);
