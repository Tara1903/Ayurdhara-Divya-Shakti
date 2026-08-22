const fs = require('fs');
let c = fs.readFileSync('src/components/CampaignHeroSlider.tsx', 'utf8');

const t = `<Link href="/wellness-packs" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-[#E0EBDC]/50 border border-[#2D5A27] rounded-md hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                      Try Our Wellness Packs
                    </Link>`;

const r = `<Link href="/collections?q=trial" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-[#E0EBDC]/50 border border-[#2D5A27] rounded-md hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                      Try Our Trial Packs
                    </Link>`;

c = c.replace(t, r);
fs.writeFileSync('src/components/CampaignHeroSlider.tsx', c);
console.log('Updated 3rd button');
