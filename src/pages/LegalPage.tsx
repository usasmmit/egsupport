import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  Lock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Scale,
  CreditCard,
  FileBadge,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoAddresses';
import { SEOHead } from '../components/SEOHead';
import { PAGES_SEO, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema, BASE_URL } from '../data/seoData';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refunds';
  onNavigateTab?: (tab: 'terms' | 'privacy' | 'refunds') => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refunds'>(type);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync tab when prop changes
  React.useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const currentSEO = (activeTab === 'refunds'
    ? PAGES_SEO.refunds
    : activeTab === 'terms'
    ? PAGES_SEO.terms
    : PAGES_SEO.privacy) || PAGES_SEO.legal || {
      title: 'Policies & Legal Information | Smmservice.co.uk',
      metaDescription: 'Official terms, policies, and customer warranty details for Smmservice.co.uk.',
      primaryKeyword: 'smmservice legal',
      secondaryKeywords: ['terms', 'privacy', 'refunds'],
      url: '/legal',
      breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Legal', url: '/legal' }],
      faqs: []
    };

  const pageSchema = [
    getOrganizationSchema(),
    getBreadcrumbSchema(currentSEO.breadcrumbs),
    getFAQSchema(currentSEO.faqs)
  ];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.metaDescription}
        keywords={[currentSEO.primaryKeyword, ...currentSEO.secondaryKeywords]}
        canonicalUrl={currentSEO.url}
        schema={pageSchema}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-slate-900 font-medium">Home</a>
          <span>/</span>
          <span className="font-bold text-slate-900">
            {activeTab === 'refunds' ? 'Refund & Replacement Policy' : activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
          </span>
        </nav>

        {/* Navigation Tabs Bar for Legal Center */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              setActiveTab('refunds');
              if (onNavigateTab) onNavigateTab('refunds');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'refunds'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            Replacement & Refund Policy
          </button>

          <button
            onClick={() => {
              setActiveTab('terms');
              if (onNavigateTab) onNavigateTab('terms');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Scale className="w-4 h-4 text-sky-600" />
            Terms & Conditions
          </button>

          <button
            onClick={() => {
              setActiveTab('privacy');
              if (onNavigateTab) onNavigateTab('privacy');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Lock className="w-4 h-4 text-purple-600" />
            Privacy & Confidentiality Policy
          </button>
        </div>

        {/* ========================================================================= */}
        {/* REPLACEMENT & REFUND POLICY */}
        {/* ========================================================================= */}
        {activeTab === 'refunds' && (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                Guaranteed Satisfaction & Reliability
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Replacement & Refund Policy
              </h1>
              <p className="text-xs text-slate-500">
                Official Client Assurance Document • Effective Date: August 2026 • Governed by Smmservice.co.uk
              </p>
            </div>

            {/* Quick Policy Highlights Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  30-Day Instant Replacement
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full free asset replacement if any verification lock occurs during initial setup under safe guidelines.
                </p>
              </div>

              <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                  <RefreshCw className="w-4 h-4 text-sky-600" />
                  Non-Drop Refill Guarantee
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Google and Trustpilot reviews, along with SEO links, include a 30 to 60-day non-drop auto-refill warranty.
                </p>
              </div>

              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-purple-800 font-bold text-sm">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  48-Hour Delivery SLA Refund
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If an order cannot be fulfilled within 48 hours of confirmed payment, an immediate 100% refund is issued.
                </p>
              </div>
            </div>

            {/* In-depth policy clauses */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">1</span>
                  Scope of the 30-Day Free Replacement Warranty
                </h2>
                <p>
                  At <strong>Smmservice.co.uk</strong>, we hold every digital asset to the highest verification criteria. Because third-party platforms (such as PayPal, Stripe, Meta, Google, and cryptocurrency exchanges) periodically recalibrate automated risk telemetry, we back all our digital accounts with a comprehensive <strong>30-Day Free Replacement Policy</strong>.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">Eligible Replacement Scenarios:</div>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                    <li>Pre-delivery or immediate login identity checkpoints when accessed via the provided anti-detect session profile and dedicated residential proxy.</li>
                    <li>Unexpected initial security freeze or card/bank detachment prior to standard live operations.</li>
                    <li>Carrier disconnection or SMS routing failures for virtual number accounts (Google Voice, Talkatone, TextNow).</li>
                    <li>Review filtering or drop-offs occurring within 30 days of posting completion.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">2</span>
                  Guidelines to Maintain Warranty Coverage
                </h2>
                <p>
                  To preserve your replacement warranty and ensure optimal account longevity, the client agrees to adhere to the standard operating protocols included with each delivery:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Always use a high-quality, static residential proxy located within the account's registered jurisdiction.</li>
                  <li>Import the provided JSON session cookies into anti-detect software (such as AdsPower, Dolphin&#123;anty&#125;, or Multilogin).</li>
                  <li>Observe a gradual transaction warmup schedule (e.g., small initial volumes for the first 3–5 days).</li>
                  <li>Do not log in simultaneously from multiple disjointed IP addresses or public VPNs.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">3</span>
                  Cryptocurrency Refund Conditions & SLA
                </h2>
                <p>
                  Because digital assets, API credentials, and identity records represent non-recoverable digital data once transferred, monetary refunds are strictly governed under the following terms:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Non-Fulfillment Refund:</strong> If Smmservice.co.uk is unable to deliver the specified service or a compliant alternative within forty-eight (48) hours of confirmed on-chain crypto receipt, the customer is entitled to a 100% full refund returned in the original cryptocurrency (minus standard blockchain network gas fees) or store credit.
                  </p>
                  <p>
                    <strong>Post-Delivery Policy:</strong> Once credentials, master logins, or campaign links have been successfully delivered and logged into, sales are final, and our 30-Day Free Replacement Guarantee applies in lieu of cash refunds.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">4</span>
                  How to Submit a Replacement or Claim Ticket
                </h2>
                <p>
                  Claiming a warranty replacement is quick and hassle-free:
                </p>
                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> 3-Step Replacement Procedure:
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-300">
                    <li>Contact our 24/7 Live Desk on Telegram (<strong>{CONTACT_INFO.telegram}</strong>) or WhatsApp (<strong>{CONTACT_INFO.whatsapp}</strong>).</li>
                    <li>Provide your unique <strong>Order ID</strong> (e.g., EG-xxxxxx) and a brief description/screenshot of the issue.</li>
                    <li>Our on-duty technician will review the diagnostic data and dispatch a fresh replacement asset within 1 to 6 hours.</li>
                  </ol>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TERMS AND CONDITIONS OF SERVICE */}
        {/* ========================================================================= */}
        {activeTab === 'terms' && (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-bold uppercase tracking-wide">
                <Scale className="w-4 h-4" />
                Service Agreement
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Terms and Conditions of Service
              </h1>
              <p className="text-xs text-slate-500">
                Last Updated: August 2026 • Smmservice.co.uk Master Terms of Service
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">1</span>
                  Binding Agreement & Acceptance
                </h2>
                <p>
                  By accessing, browsing, or purchasing digital services, marketing packages, or verified business infrastructure through <strong>Smmservice.co.uk</strong> (referred to herein as "the Platform," "we," "us," or "our"), the customer ("Buyer" or "User") unreservedly agrees to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from ordering or using our services.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">2</span>
                  Digital Service Provision & Fulfillment
                </h2>
                <p>
                  All products offered on Smmservice.co.uk represent specialized digital goods, marketing consultancy, search engine optimization tasks, customer sentiment management, and pre-authenticated account setups.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li><strong>Turnaround Times:</strong> Estimated delivery windows (typically 1 to 6 hours, or up to 24-48 hours for complex custom orders) are provided for convenience and may vary slightly during peak volume cycles.</li>
                  <li><strong>Delivery Methods:</strong> Deliveries are executed via secure direct messaging (Telegram/WhatsApp), encrypted download payloads, or on-platform order status confirmation.</li>
                  <li><strong>Delivery Contents:</strong> Deliveries may include master email access, passwords, 2FA secret seeds, browser session cookies (JSON), and KYC document dossiers as described on each product page.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">3</span>
                  Cryptocurrency Payments & Settlement
                </h2>
                <p>
                  All transactions on Smmservice.co.uk are settled via decentralized cryptocurrency networks (including Bitcoin, USDT TRC20/BEP20/ERC20, Litecoin, Ethereum, Solana, and BNB). The Buyer agrees to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Send the exact cryptocurrency amount specified at checkout to the designated wallet address.</li>
                  <li>Ensure the correct blockchain network is selected before initiating the broadcast.</li>
                  <li>Acknowledge that on-chain crypto transactions are irreversible once broadcast to the blockchain.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">4</span>
                  Permitted Use & Customer Responsibility
                </h2>
                <p>
                  The Buyer assumes full operational ownership of delivered assets upon receipt. The Buyer warrants that:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Assets will not be utilized for unauthorized, illegal, or malicious activities.</li>
                  <li>They will follow recommended anti-detect browser protocols and residential proxy setups to ensure account security.</li>
                  <li>They are solely responsible for compliance with the terms of service of third-party platforms utilized.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">5</span>
                  Limitation of Liability
                </h2>
                <p>
                  In no event shall Smmservice.co.uk, its directors, employees, or technical contractors be liable for any indirect, incidental, punitive, or consequential damages resulting from third-party platform algorithm updates, policy revisions, or improper handling of accounts outside our specified guidelines. Our total aggregate liability under any circumstance is strictly limited to the purchase price paid for the specific affected item or provision of a free replacement under our 30-Day Warranty.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PRIVACY & CONFIDENTIALITY POLICY */}
        {/* ========================================================================= */}
        {activeTab === 'privacy' && (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-bold uppercase tracking-wide">
                <Lock className="w-4 h-4" />
                Data Protection & Zero-Log Architecture
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Privacy & Confidentiality Policy
              </h1>
              <p className="text-xs text-slate-500">
                Last Updated: August 2026 • Smmservice.co.uk Privacy Guarantee
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">1</span>
                  Our Zero-Log Privacy Philosophy
                </h2>
                <p>
                  At <strong>Smmservice.co.uk</strong>, we believe client privacy is fundamental to digital commerce. We operate under a strict **Zero-Log and Minimalist Data Retention Architecture**. We do not collect unnecessary personal identifiers, do not maintain marketing mailing trackers, and never sell, rent, or trade client communications with third-party advertising brokers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">2</span>
                  What Information We Process (and What We Don't)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                    <div className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Information Stored Minimally:
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                      <li>Order identifier (e.g. EG-104928) for tracking warranty status.</li>
                      <li>Selected service items, packages, and quantities.</li>
                      <li>Cryptocurrency payment transaction hash for verification.</li>
                      <li>Client contact handle (Telegram/WhatsApp) provided during checkout.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2">
                    <div className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Information We NEVER Collect:
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                      <li>No credit card or debit card numbers.</li>
                      <li>No personal bank account logins or passwords.</li>
                      <li>No browser tracking cookies or invasive analytics trackers.</li>
                      <li>No IP address identity mapping or user tracking.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">3</span>
                  End-to-End Encrypted Communications
                </h2>
                <p>
                  To maximize operational confidentiality, all direct support dialogues, bulk quote negotiations, and delivery payloads are conducted over end-to-end encrypted messaging channels:
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={CONTACT_INFO.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Telegram Live Channel: {CONTACT_INFO.telegram}
                  </a>
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Business: {CONTACT_INFO.whatsapp}
                  </a>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-mono">4</span>
                  Post-Delivery Asset Security & Cache Purging
                </h2>
                <p>
                  Once an order is marked as delivered and confirmed functional by the client, Smmservice.co.uk securely purges temporary staging caches. The client is advised to store their credentials, 2FA backup seeds, and identity documentation in their own encrypted password manager (such as Bitwarden, 1Password, or KeePass).
                </p>
              </section>
            </div>
          </div>
        )}

        {/* Legal FAQs */}
        <section aria-labelledby="legal-faqs-heading" className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Policy Inquiries
            </span>
            <h2 id="legal-faqs-heading" className="text-xl font-bold text-slate-950">
              Frequently Asked Policy Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
            {currentSEO.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-600 focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Support Callout */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-950">Have questions regarding our policies or custom compliance?</h3>
            <p className="text-xs text-slate-500">Our senior team is available 24/7 to address any inquiries.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              Telegram Support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
