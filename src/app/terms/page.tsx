import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ClientPortal",
  description: "ClientPortal terms of service. Rules and conditions for using our client portal platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block" aria-label="Back to homepage">&larr; Back to home</Link>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-4">Last updated: April 2026</p>

        <section className="space-y-6 text-gray-300">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using ClientPortal, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Service Description</h2>
            <p>ClientPortal provides branded client portal solutions for freelancers and agencies, including file sharing, messaging, and project update capabilities.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. User Responsibilities</h2>
            <p>You are responsible for maintaining the security of your account credentials and for all activities under your account. You must not upload illegal or harmful content.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Payment Terms</h2>
            <p>Paid plans are billed monthly via Stripe. You can cancel at any time. Refunds are handled on a case-by-case basis within 30 days of purchase.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Limitation of Liability</h2>
            <p>ClientPortal is provided &ldquo;as is&rdquo; without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Contact</h2>
            <p>For questions about these terms: <a href="mailto:contact@eazyweb.nc" className="text-blue-400 hover:underline">contact@eazyweb.nc</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}
