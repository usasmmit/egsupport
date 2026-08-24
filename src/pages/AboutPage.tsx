import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Lock, 
  Globe2, 
  Award, 
  CheckCircle2, 
  Send, 
  MessageCircle,
  ArrowRight,
  Server,
  Layers,
  Cpu,
  Users,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoAddresses';
import { SiteLogo } from '../components/SiteLogo';
import { SEOHead } from '../components/SEOHead';
import { PAGES_SEO, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema, BASE_URL } from '../data/seoData';

interface AboutPageProps {
  onExploreServices: () => void;
  onNavigateToView: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreServices, onNavigateToView }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const aboutSEO = PAGES_SEO.about;

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: aboutSEO.title,
    description: aboutSEO.metaDescription,
    url: `${BASE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Smmservice.co.uk',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      description: 'Global provider of verified digital assets, payment gateways, review management, and SEO marketing infrastructure.',
      foundingDate: '2019',
      sameAs: [
        'https://t.me/EgSupport24',
        'https://wa.me/19292165606'
      ]
    }
  };

  const pageSchema = [
    getOrganizationSchema(),
    getBreadcrumbSchema(aboutSEO.breadcrumbs),
    aboutPageSchema,
    getFAQSchema(aboutSEO.faqs)
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEOHead
        title={aboutSEO.title}
        description={aboutSEO.metaDescription}
        keywords={[aboutSEO.primaryKeyword, ...aboutSEO.secondaryKeywords]}
        canonicalUrl={aboutSEO.url}
        schema={pageSchema}
      />

      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-white font-medium">Home</a>
            <span>/</span>
            <span className="font-bold text-white">About Us</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <SiteLogo size="md" variant="light" showTagline={true} />
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Enterprise Digital Infrastructure & Verified Assets for Global Commerce
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Smmservice.co.uk is an industry-leading digital asset provider and growth infrastructure agency. We empower international entrepreneurs, e-commerce brands, media buyers, and agencies to scale globally without arbitrary gateway holds, regional restrictions, or identity verification bottlenecks.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreServices}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Browse All Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2"
                title="Connect with Telegram VIP Support Desk"
              >
                <Send className="w-4 h-4 text-sky-400" />
                Contact 24/7 Telegram Desk
              </a>
            </div>
          </div>
        </div>

        {/* Ambient Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </section>

      {/* Trust & Authority Metrics Bar */}
      <section aria-labelledby="metrics-heading" className="border-b border-slate-200 bg-slate-50 py-8">
        <h2 id="metrics-heading" className="sr-only">Company Track Record and SLA Metrics</h2>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">15,000+</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Verified Assets Delivered</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">99.4%</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Client Satisfaction Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">65+</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Supported Countries</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">&lt; 2 Mins</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Average Support SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Who We Are & Why We Exist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Our Foundation & Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Solving the Global Payment & Advertising Friction for Online Builders
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                In today's interconnected economy, business success requires agility. Yet traditional financial institutions and digital advertising gatekeepers enforce rigid geographic boundaries, unpredictable identity freezes, and weeks of bureaucratic approval delays.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Founded by veteran media buyers, affiliate marketers, and fintech engineers, <strong>Smmservice.co.uk</strong> was established with a single mission: to deliver battle-tested, pre-verified accounts and marketing firepower that eliminate downtime and let businesses focus purely on revenue generation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Zero Gateway Reserves</div>
                    <div className="text-xs text-slate-500">Immediate, unmetered cash flow access.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Stealth Browser Ready</div>
                    <div className="text-xs text-slate-500">Anti-detect cookies & IP isolates included.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Card */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <Server className="w-6 h-6 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Our 4-Pillar Quality Guarantee</h3>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">1</div>
                  <div>
                    <strong className="text-white">Legitimate KYC & Identity Dossiers:</strong> Full legal verification compliant with international AML regulations, including passport/ID and address verification.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-xs">2</div>
                  <div>
                    <strong className="text-white">Clean Static Residential Proxies:</strong> Every profile is initialized over dedicated residential IPs matching the target country, preventing security flags.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">3</div>
                  <div>
                    <strong className="text-white">Unconditional 30-Day Warranty:</strong> Guaranteed instant replacement or technician intervention if any unexpected verification checkpoint arises.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-xs">4</div>
                  <div>
                    <strong className="text-white">24/7 Human Engineering Desk:</strong> Instant live chat support on Telegram and WhatsApp with an average response time of under 2 minutes.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Service Categories We Specialize In */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                What We Build and Deliver
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                End-to-end verified accounts, customer review reputation assets, and technical search visibility solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-slate-400 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-950">Payment & Merchant Accounts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fully verified PayPal (Personal & Business), Stripe (US/UK/EU), Cash App, Wise, Payoneer, Square, Revolut, and merchant payment gateways with linked debit cards and confirmed bank routing.
                </p>
                <button
                  onClick={() => onNavigateToView('services')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  Explore Payment Accounts <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Category 2 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-slate-400 transition-colors">
                <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-950">Crypto Exchanges & Ads Assets</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tier-3 KYC Binance, Coinbase, Kraken, KuCoin, OKX, as well as high-limit Facebook Ads BMs, spending-verified Google Ads accounts, and TikTok Ads agencies ready for immediate media buying.
                </p>
                <button
                  onClick={() => onNavigateToView('services')}
                  className="text-xs font-bold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  Explore Crypto & Ads <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Category 3 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-slate-400 transition-colors">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-950">Reviews, SEO & Virtual Numbers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  100% non-drop Google Maps 5-Star Reviews from Local Guides, Trustpilot Reviews, High-DA contextual backlinks, non-expiring Google Voice numbers, and production-ready Amazon SES SMTP relays.
                </p>
                <button
                  onClick={() => onNavigateToView('services')}
                  className="text-xs font-bold text-purple-700 hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  Explore Reviews & SEO <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Anti-Detect Protocol Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-950">Operational Security & Privacy Protocols</h3>
                <p className="text-xs text-slate-500">How we protect your business privacy and account longevity</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <ShieldCheck className="w-4 h-4" /> 100% Zero-Log Privacy Policy
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Encrypted Digital Deliveries
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  All login credentials, 2FA secret recovery seeds, cookie archives, and KYC identity scans are delivered encrypted. Once delivery is finalized and confirmed, operational staging caches are permanently cleared.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-sky-600" />
                  Direct Crypto Checkout Anonymity
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  We accept major decentralized cryptocurrencies (Bitcoin, USDT, Ethereum, Litecoin, Solana, BNB). You can order and scale without exposing sensitive personal banking details or credit card records.
                </p>
              </div>
            </div>
          </div>

          {/* About Page FAQs */}
          <section aria-labelledby="about-faqs-heading" className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Company Knowledge Base
              </span>
              <h2 id="about-faqs-heading" className="text-xl font-bold text-slate-950">
                Frequently Asked Questions About Smmservice.co.uk
              </h2>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
              {aboutSEO.faqs.map((faq, idx) => {
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

          {/* Call to Action Bar */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 border border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Accelerate Your Online Operations?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              Get instant access to verified accounts and high-authority digital assets. For bulk orders or custom setups, connect directly with our 24/7 technical team on Telegram or WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onExploreServices}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
              >
                View 250+ Verified Services
              </button>
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2"
                title="Message Telegram Agent"
              >
                <Send className="w-4 h-4" />
                Live Telegram: {CONTACT_INFO.telegram}
              </a>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2"
                title="Message WhatsApp Agent"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: {CONTACT_INFO.whatsapp}
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
