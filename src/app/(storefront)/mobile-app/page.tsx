import Image from 'next/image';
import Link from 'next/link';

export default function MobileAppPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Experience Ayurdhara on</span>{' '}
              <span className="block text-[#81C784] xl:inline">Android</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Your wellness journey, now in your pocket. Get exclusive offers, faster checkout, and personalized recommendations with the official Ayurdhara Divya Shakti mobile app.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="/releases/app-release-v1.0.apk"
                  download
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#81C784] hover:bg-[#66BB6A] md:py-4 md:text-lg md:px-10"
                >
                  Download APK
                </a>
              </div>
            </div>
            
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900">Installation Guide</h3>
              <ol className="mt-4 space-y-4 text-sm text-gray-600 list-decimal list-inside">
                <li>Download the APK file using the button above.</li>
                <li>Open the downloaded file on your Android device.</li>
                <li>If prompted, go to Settings and enable <strong>Install from Unknown Sources</strong>.</li>
                <li>Follow the on-screen instructions to complete the installation.</li>
              </ol>
            </div>
            
            <div className="mt-8">
               <p className="text-xs text-gray-400">Version 1.0.0 • Requires Android 8.0+</p>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-1 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md bg-gray-100 h-[600px] flex items-center justify-center border-4 border-gray-800 rounded-[3rem] overflow-hidden">
               <Image 
                 src="/images/app-mockup.jpg" 
                 alt="Ayurdhara Divya Shakti Android App Preview" 
                 fill 
                 className="object-cover" 
                 priority 
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}