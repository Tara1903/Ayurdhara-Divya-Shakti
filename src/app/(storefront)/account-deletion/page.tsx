import Link from 'next/link';

export const metadata = {
  title: 'Delete Account Request | Ayurdhara Divya Shakti',
  description: 'Request deletion of your account and personal data from Ayurdhara Divya Shakti.',
};

export default function AccountDeletionPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 text-[#2d2a26]">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-stone-200">
          <div className="border-b border-stone-100 pb-5 mb-6">
            <span className="text-xs uppercase tracking-widest text-[#943d2c] font-bold">Account Privacy</span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2D5A27] mt-1">
              Request Account Deletion
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Google Play User Data Compliance &amp; Personal Data Removal
            </p>
          </div>

          <div className="space-y-4 text-stone-700 text-sm md:text-base leading-relaxed">
            <p>
              At <strong>Ayurdhara Divya Shakti</strong>, you have full control over your personal data. You can delete your account and associated records directly inside the Android application under <strong>Settings &gt; Account &gt; Delete Account</strong>, or submit a request using this page.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 text-sm">
              <h3 className="font-bold mb-1">What data is deleted?</h3>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
                <li>Your profile credentials (Email, Phone number, Display Name).</li>
                <li>Saved delivery addresses and contact preferences.</li>
                <li>Active login sessions and biometric authentication tokens.</li>
              </ul>
              <p className="mt-2 text-xs text-amber-800">
                * Note: Historical completed tax invoices and financial billing records are retained strictly as required by Indian taxation laws (GST regulations).
              </p>
            </div>

            <section className="pt-2">
              <h2 className="text-base font-bold text-[#2D5A27] mb-2 font-serif">How to Request Deletion</h2>
              <p className="text-sm">
                To submit an account deletion request online, send an email from your registered email address to:
              </p>
              <div className="bg-stone-50 p-4 rounded-xl mt-2 text-sm border border-stone-200 font-mono">
                care@ayurdhara.org
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Subject: &ldquo;Account Deletion Request - [Your Registered Email/Phone]&rdquo;. Your account and associated personal data will be processed and purged within 7 business days.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex justify-between items-center text-sm">
            <Link href="/" className="text-[#2D5A27] font-medium hover:underline">
              ← Return to Store
            </Link>
            <Link href="/privacy-policy" className="text-stone-500 hover:text-[#2D5A27]">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
