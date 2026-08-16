import Image from 'next/image';
import Link from 'next/link';
import { Download, Smartphone, ShieldCheck, Zap, Heart, Settings, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Mobile App | Ayurdhara Divya Shakti',
  description: 'Download the official Ayurdhara Divya Shakti mobile app for exclusive offers, faster checkout, and personalized wellness.',
};

export default function MobileAppPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-gray-800">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E0EBDC] rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFF8E7] rounded-full mix-blend-multiply filter blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 lg:pt-24 lg:pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & CTA */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E0EBDC] text-xs font-semibold text-[#4B7B3B] uppercase tracking-wide mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#81C784] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4B7B3B]"></span>
                </span>
                Version 1.0.0 Now Available
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 font-serif leading-[1.1]">
                Experience Ayurdhara on <br/>
                <span className="text-[#2D5A27] inline-block mt-2">Android</span>
              </h1>
              
              <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                Your wellness journey, perfectly distilled into your pocket. Unlock exclusive app-only offers, lightning-fast checkout, and personalized Ayurvedic routines.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="/releases/app-release-v1.0.apk"
                  download
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2D5A27] text-white font-medium rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-[#2D5A27]/20 hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#4B7B3B] to-[#2D5A27] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Download size={20} className="relative z-10" />
                  <span className="relative z-10 text-lg">Download APK</span>
                </a>
                
                <a href="#installation" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  Installation Guide <ChevronRight size={16} className="text-gray-400" />
                </a>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[#4B7B3B]" /> 100% Secure</div>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <div>Requires Android 8.0+</div>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <div>Free Download</div>
              </div>
            </div>
            
            {/* Right Column: Phone Mockup */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-md flex justify-center lg:justify-end">
              {/* Premium Phone Frame */}
              <div className="relative w-[300px] sm:w-[320px] h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-900 ring-1 ring-white/10 transform rotate-[-2deg] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                  <div className="w-40 h-6 bg-black rounded-b-3xl"></div>
                </div>
                {/* Screen content */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                   <Image 
                     src="/images/app-mockup.jpg" 
                     alt="Ayurdhara Divya Shakti Android App Preview" 
                     fill 
                     className="object-cover object-top" 
                     priority 
                   />
                </div>
              </div>
              {/* Decorative blobs behind phone */}
              <div className="absolute top-1/4 -right-8 w-24 h-24 bg-[#E88B23] rounded-full mix-blend-multiply filter blur-xl opacity-40 -z-10 animate-pulse"></div>
              <div className="absolute bottom-1/4 -left-8 w-32 h-32 bg-[#4B7B3B] rounded-full mix-blend-multiply filter blur-xl opacity-40 -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* ── FEATURES SECTION ── */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Why Download the App?</h2>
            <p className="mt-4 text-gray-600">We've crafted our mobile experience to give you seamless access to our Ayurvedic offerings.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FAF7F2] transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E88B23] mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Enjoy a native experience built for speed. Browse products, build your cart, and checkout in seconds.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#E0EBDC]/30 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#2D5A27] mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">App-Only Offers</h3>
              <p className="text-gray-600">Unlock special discounts, flash sales, and early access to new product launches available exclusively on the app.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FAF7F2] transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#4B7B3B] mb-6">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Tracking</h3>
              <p className="text-gray-600">Manage your subscriptions, track orders in real-time, and access your Ayurvedic wellness routines effortlessly.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ── INSTALLATION GUIDE ── */}
      <section id="installation" className="py-12 md:py-16 bg-[#FAF7F2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-10 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Installation Guide</h2>
                <p className="mt-3 text-gray-500">Get up and running in just a few simple steps.</p>
              </div>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2"></div>
                
                <div className="grid md:grid-cols-4 gap-8 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-[#FAF7F2] shadow-md flex items-center justify-center text-[#2D5A27] font-bold text-xl mb-4 group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                      1
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Download</h4>
                    <p className="text-sm text-gray-500">Tap the button above to download the APK file.</p>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-[#FAF7F2] shadow-md flex items-center justify-center text-[#2D5A27] font-bold text-xl mb-4 group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                      2
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Open File</h4>
                    <p className="text-sm text-gray-500">Locate and open the downloaded APK on your device.</p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-[#FAF7F2] shadow-md flex items-center justify-center text-[#2D5A27] font-bold text-xl mb-4 group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                      3
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Allow Unknown</h4>
                    <p className="text-sm text-gray-500">If prompted, go to <span className="inline-flex items-center gap-1 font-medium"><Settings size={12}/> Settings</span> and allow installation.</p>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-[#FAF7F2] shadow-md flex items-center justify-center text-[#2D5A27] font-bold text-xl mb-4 group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                      4
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Install</h4>
                    <p className="text-sm text-gray-500">Follow the on-screen prompts to complete setup.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#2D5A27] px-6 py-8 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-bold text-lg">Ready to transform your routine?</h4>
                <p className="text-[#E0EBDC] text-sm mt-1">Download the official app today.</p>
              </div>
              <a
                href="/releases/app-release-v1.0.apk"
                download
                className="shrink-0 px-6 py-3 bg-white text-[#2D5A27] font-bold rounded-full hover:bg-gray-50 transition-colors shadow-lg"
              >
                Download Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}