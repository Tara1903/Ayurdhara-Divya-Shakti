import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Ayurdhara Divya Shakti',
  description: 'Privacy Policy and User Data Handling for Ayurdhara Divya Shakti Android App & Storefront.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 text-[#2d2a26]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-200">
          <div className="border-b border-stone-100 pb-6 mb-8">
            <span className="text-xs uppercase tracking-widest text-[#2D5A27] font-bold">Legal & Compliance</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mt-1">
              Privacy Policy
            </h1>
            <p className="text-stone-500 text-sm mt-2">
              Effective Date: October 7, 2026 | Last Updated: October 2026
            </p>
          </div>

          <div className="space-y-6 text-stone-700 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">1. Introduction</h2>
              <p>
                Ayurdhara Divya Shakti (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is dedicated to safeguarding the privacy and personal data of our users. This Privacy Policy applies to our website and the <strong>Ayurdhara Divya Shakti</strong> Android mobile application (com.ayurdhara.divyashakti). It outlines how we collect, process, store, and protect your personal information when you explore our products, place orders, and engage with our Ayurvedic wellness services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">2. Information We Collect</h2>
              <p className="mb-2">We collect only information necessary to provide our products and services:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600">
                <li><strong>Account Information:</strong> Name, email address, and mobile phone number for authentication and order updates.</li>
                <li><strong>Shipping & Delivery Details:</strong> Physical delivery address, pincode, city, state, and contact numbers to dispatch orders via verified courier partners.</li>
                <li><strong>Order & Transaction History:</strong> Records of remedies purchased, payment status, invoice details, and delivery tracking.</li>
                <li><strong>Device & Network Information:</strong> Basic device telemetry, network status, and crash diagnostics to ensure app stability and optimal performance.</li>
              </ul>
              <p className="mt-2 text-xs text-stone-500">
                * Note: We do NOT store credit card, debit card, or UPI PIN credentials. All payments are processed securely through certified banking and payment gateways.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600">
                <li>Processing and delivering your Ayurvedic formulations and remedies.</li>
                <li>Sending transactional order confirmations, tracking codes, and delivery status alerts.</li>
                <li>Responding to customer support queries and wellness consultations.</li>
                <li>Preventing fraudulent orders and maintaining platform security.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">4. Data Sharing & Third Parties</h2>
              <p>
                We do not sell, rent, or trade your personal data to any advertisers or third-party marketing brokers. Your data is disclosed strictly to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600 mt-2">
                <li><strong>Logistics Partners:</strong> Certified shipping couriers solely for package delivery.</li>
                <li><strong>Payment Processors:</strong> RBI-compliant payment gateways to complete financial transactions.</li>
                <li><strong>Cloud Infrastructure:</strong> Secure databases (Supabase, encrypted in transit with TLS and at rest with AES-256).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">5. Data Retention & Account Deletion</h2>
              <p>
                We retain your information as long as your account remains active or as required by law for taxation and financial audit purposes.
              </p>
              <p className="mt-2">
                In compliance with Google Play User Data policies, users have the right to request deletion of their account and associated personal data at any time. You can initiate this from within the <strong>Settings &gt; Account</strong> section of the Android app or by visiting our dedicated <Link href="/account-deletion" className="text-[#2D5A27] underline font-medium">Account Deletion Request Page</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">6. Contact & Grievance Officer</h2>
              <p>
                If you have any questions regarding this Privacy Policy or wish to exercise your data rights, please contact our privacy desk:
              </p>
              <div className="bg-stone-50 p-4 rounded-xl mt-3 text-sm border border-stone-100">
                <p><strong>Ayurdhara Divya Shakti</strong></p>
                <p>Email: care@ayurdhara.org / support@ayurdhara.com</p>
                <p>Headquarters: Jaipur, Rajasthan, India</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex justify-between items-center text-sm">
            <Link href="/" className="text-[#2D5A27] font-medium hover:underline">
              ← Return to Store
            </Link>
            <Link href="/terms" className="text-stone-500 hover:text-[#2D5A27]">
              Terms &amp; Conditions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
