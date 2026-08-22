const fs = require('fs');
let c = fs.readFileSync('src/components/CampaignHeroSlider.tsx', 'utf8');

const t = /<Link href="\/wellness-guide\/daily-wellness-routine" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-\[#2D5A27\] bg-transparent border border-\[#2D5A27\] rounded-md hover:bg-\[#2D5A27\] hover:text-white transition-colors duration-300">\s*Find Your Ritual\s*<\/Link>/;

const r = `<Link href="/wellness-guide/daily-wellness-routine" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-transparent border border-[#2D5A27] rounded-md hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                      Find Your Ritual
                    </Link>
                    <Link href="/wellness-packs" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-[#E0EBDC]/50 border border-[#2D5A27] rounded-md hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                      Try Our Wellness Packs
                    </Link>`;

c = c.replace(t, r);

// Now change flex-row to flex-wrap
c = c.replace(/className={`flex flex-row items-start gap-3 sm:gap-4 justify-start transition-all duration-\[700ms\]/g, "className={`flex flex-row flex-wrap items-start gap-3 sm:gap-4 justify-start transition-all duration-[700ms]");

fs.writeFileSync('src/components/CampaignHeroSlider.tsx', c);
console.log('Added 3rd button again');
