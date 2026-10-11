import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Ayurdhara Divya Shakti',
  description: 'Terms and Conditions for Ayurdhara Divya Shakti Android App & Storefront.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 text-[#2d2a26]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-200">
          <div className="border-b border-stone-100 pb-6 mb-8">
            <span className="text-xs uppercase tracking-widest text-[#2D5A27] font-bold">Legal & Compliance</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mt-1">
              Terms &amp; Conditions
            </h1>
            <p className="text-stone-500 text-sm mt-2">
              Effective Date: October 7, 2026 | Last Updated: October 2026
            </p>
          </div>

          <div className="space-y-6 text-stone-700 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">1. Acceptance of Terms</h2>
              <p>
                By downloading, accessing, or using the <strong>Ayurdhara Divya Shakti</strong> Android application or website, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please refrain from using our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">2. Ayurvedic Formulations &amp; Disclaimers</h2>
              <p>
                Our formulations (cold-pressed oils, sacred herbs, churnas, raw seeds) are crafted following traditional Ayurvedic principles. Statements regarding dietary supplements and wellness oils have not been evaluated as pharmaceutical medical prescriptions. Consult a certified Ayurvedic physician or healthcare practitioner for specific medical conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">3. Orders, Pricing &amp; Payments</h2>
              <p>
                All prices are listed in Indian Rupees (INR ₹) and are inclusive of applicable taxes unless specified otherwise. We reserve the right to cancel or refuse orders in case of pricing discrepancies, stock exhaustion, or delivery area serviceability issues.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">4. Shipping &amp; Delivery</h2>
              <p>
                We deliver pan-India through verified logistics partners. Standard dispatch occurs within 24–48 hours of order confirmation. Delivery timelines range between 3 to 7 business days depending on customer pincode.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2D5A27] mb-2 font-serif">5. Contact Information</h2>
              <p>
                For customer grievances or order inquiries:
              </p>
              <div className="bg-stone-50 p-4 rounded-xl mt-3 text-sm border border-stone-100">
                <p><strong>Ayurdhara Divya Shakti Support</strong></p>
                <p>Email: care@ayurdhara.org</p>
                <p>Phone: +91 99999 99999</p>
                <p>Jaipur, Rajasthan, India</p>
              </div>
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
