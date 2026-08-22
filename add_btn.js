const fs = require('fs');
let c = fs.readFileSync('src/components/CampaignHeroSlider.tsx', 'utf8');

const t = `                  {/* CTA Buttons (700ms delay) */}
                  <div 
                    className={\`flex flex-row items-start gap-3 sm:gap-4 justify-start transition-all duration-[700ms] \${isActive ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-4 delay-[0ms]'}\`}
                    style={transitionStyle}
                  >
                    <Link href="/collections" className="group relative inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden rounded-md shadow-xl hover:shadow-2xl transition-all duration-300" style={{ backgroundColor: slide.accentColor }}>
                      <span className="relative z-10 flex items-center gap-2">Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                    </Link>
                    <Link href="/wellness-guide/daily-wellness-routine" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-transparent border border-[#2D5A27] rounded-md hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                      Find Your Ritual
                    </Link>
                  </div>`;

const r = `                  {/* CTA Buttons (700ms delay) */}
                  <div 
                    className={\`flex flex-row flex-wrap items-start gap-3 sm:gap-4 justify-start transition-all duration-[700ms] \${isActive ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-4 delay-[0ms]'}\`}
                    style={transitionStyle}
                  >
                    <Link href="/collections" className="group relative inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden rounded-md shadow-xl hover:shadow-2xl transition-all duration-300" style={{ backgroundColor: slide.accentColor }}>
                      <span className="relative z-10 flex items-center gap-2">Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                    </Link>
                    <Link href="/wellness-guide/daily-wellness-routine" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-transparent border border-[#2D5A27] rounded-md hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                      Find Your Ritual
                    </Link>
                    <Link href="/wellness-packs" className="inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-[#E0EBDC] border border-[#2D5A27] rounded-md hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                      Try Our Wellness Packs
                    </Link>
                  </div>`;

c = c.replace(t, r);
fs.writeFileSync('src/components/CampaignHeroSlider.tsx', c);
console.log('Added 3rd button');
