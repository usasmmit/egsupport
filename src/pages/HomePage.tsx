import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  Lock,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Search,
  Send,
  MessageCircle,
  Award,
  Globe,
  CreditCard,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  Check
} from 'lucide-react';
import { CATEGORIES, SERVICES } from '../data/services';
import { CRYPTO_WALLETS, CONTACT_INFO } from '../data/cryptoAddresses';
import { ServiceCard } from '../components/ServiceCard';
import { BrandLogo } from '../components/BrandLogo';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/SEOHead';
import { PAGES_SEO, getOrganizationSchema, getWebSiteSchema, getBreadcrumbSchema, getFAQSchema } from '../data/seoData';
import { BLOG_POSTS } from '../data/blogData';
import { BookOpen, Calendar, Clock } from 'lucide-react';

interface HomePageProps {
  onSelectService: (slug: string) => void;
  onSelectCategory: (categorySlug: string) => void;
  onExploreAll: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectService,
  onSelectCategory,
  onExploreAll
}) => {
  const { formatPrice } = useCart();
  const featuredServices = SERVICES.slice(0, 6);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const homeSEO = PAGES_SEO.home;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Structured Data Schema for Home Page
  const pageSchema = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getBreadcrumbSchema(homeSEO.breadcrumbs),
    getFAQSchema(homeSEO.faqs)
  ];

  return (
    <div className="bg-white space-y-16 sm:space-y-20 pb-16">
      {/* Dynamic SEO Head with JSON-LD Schemas */}
      <SEOHead
        title={homeSEO.title}
        description={homeSEO.metaDescription}
        keywords={[homeSEO.primaryKeyword, ...homeSEO.secondaryKeywords]}
        canonicalUrl={homeSEO.url}
        schema={pageSchema}
      />

      {/* HERO BANNER SECTION - Semantic H1 & Value Proposition */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Global Growth & Verified Financial Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Scale Your Online Business With{' '}
              <span className="text-emerald-400">100% Verified Services</span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Buy verified PayPal, Stripe, Cash App, and Binance accounts, permanent 5-star Google & Trustpilot reviews, real social followers, and high-impact SEO traffic with instant crypto checkout.
            </p>

            {/* Quick Action Buttons / CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={onExploreAll}
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <span>Browse All Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                title="Connect with official Telegram support desk @EgSupport24"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Contact @EgSupport24</span>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                title="Connect with official WhatsApp customer support desk"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {CONTACT_INFO.whatsapp}</span>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">45,000+</div>
                <div className="text-xs text-slate-400">Orders Delivered</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">99.8%</div>
                <div className="text-xs text-slate-400">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">1 - 6 Hrs</div>
                <div className="text-xs text-slate-400">Avg Delivery Speed</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">24/7/365</div>
                <div className="text-xs text-slate-400">Live Support Desk</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL BRANDS & PLATFORMS SHOWCASE STRIP */}
      <section aria-label="Supported Platforms and Digital Brand Assets" className="border-y border-slate-100 bg-slate-50/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <h2>Official Platforms & Verified Service Brands</h2>
            <span className="text-emerald-600 font-bold hidden sm:inline">100% Genuine Vector Assets</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 pt-2">
            {[
              { name: 'PayPal', label: 'PayPal' },
              { name: 'Stripe', label: 'Stripe' },
              { name: 'Wise', label: 'Wise' },
              { name: 'Binance', label: 'Binance' },
              { name: 'Coinbase', label: 'Coinbase' },
              { name: 'Cash App', label: 'Cash App' },
              { name: 'Google Ads', label: 'Google' },
              { name: 'Facebook Ads', label: 'Meta' },
              { name: 'TikTok', label: 'TikTok' },
              { name: 'Twitter (X)', label: 'X (Twitter)' },
              { name: 'Trustpilot', label: 'Trustpilot' },
              { name: 'Shopify', label: 'Shopify' },
            ].map((brand, idx) => (
              <div
                key={idx}
                onClick={onExploreAll}
                className="bg-white border border-slate-200 hover:border-emerald-500/80 p-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all hover:shadow-xs cursor-pointer group"
                title={`Browse verified ${brand.label} accounts and services`}
              >
                <BrandLogo name={brand.name} size="sm" />
                <span className="text-[10px] font-bold text-slate-700 group-hover:text-emerald-600 truncate w-full text-center">
                  {brand.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION - H2 Hierarchy & Semantic Internal Links */}
      <section aria-labelledby="core-categories-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Our Core Categories
          </span>
          <h2 id="core-categories-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Explore Dedicated Service Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select a specialized category to find tailored packages for your business requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="bg-white border border-slate-200 hover:border-emerald-500/80 p-6 rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <BrandLogo name={cat.name} size="lg" />
                  <span className="text-[11px] font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full">
                    {cat.serviceCount} items
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                <span>Explore Category</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLER SERVICES GRID - H2 & Service Cards */}
      <section aria-labelledby="featured-services-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Most Popular Services
            </span>
            <h2 id="featured-services-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Featured Growth & Verified Solutions
            </h2>
          </div>
          <button
            onClick={onExploreAll}
            className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View all {SERVICES.length}+ services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </div>
      </section>

      {/* WHY EG SUPPORT 24 IS #1 COMPARISON SECTION */}
      <section aria-labelledby="why-choose-us-heading" className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Why We Are #1
            </span>
            <h2 id="why-choose-us-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Smmservice.co.uk vs. Standard Market Providers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We never cut corners. Our verified assets, authentic KYC documents, and non-drop guarantee set the gold standard.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-4 font-bold">Feature / Specification</th>
                    <th className="p-4 font-bold text-emerald-400 bg-slate-800">Smmservice.co.uk</th>
                    <th className="p-4 font-bold text-slate-400">Other Vendors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">KYC Verification Authenticity</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">100% Real ID + Proof of Address</td>
                    <td className="p-4 text-slate-500">Fake / Photoshop Scans</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Bank & Card Linking</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">Real VBA & Active Debit Card</td>
                    <td className="p-4 text-slate-500">None or Disposable Cards Only</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Google & Trustpilot Reviews</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">Permanent Non-Drop Real Profiles</td>
                    <td className="p-4 text-slate-500">Dropped within 48 hours</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Replacement Guarantee</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">30 to 365 Days Warranty</td>
                    <td className="p-4 text-slate-500">24 Hours or No Warranty</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Customer Support Desk</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">24/7 Live Telegram & WhatsApp</td>
                    <td className="p-4 text-slate-500">Slow Unanswered Emails</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Crypto Payment Options</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">BTC, LTC, ETH, USDT, SOL + 7 more</td>
                    <td className="p-4 text-slate-500">Limited / High Fees</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED CRYPTO PAYMENT SHOWCASE */}
      <section aria-labelledby="crypto-payment-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-2xl p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                100% Anonymous & Secure
              </span>
              <h2 id="crypto-payment-heading" className="text-2xl sm:text-3xl font-extrabold text-white">
                Instant Cryptocurrency Payments Accepted
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Enjoy zero processing fees, instant checkout, and complete transaction privacy. We accept all major digital assets with automated address routing:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {CRYPTO_WALLETS.map((c) => (
                  <span
                    key={c.symbol}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 rounded-md"
                  >
                    {c.currency}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400">Direct Support & Order Sync</span>
                <span className="text-xs text-emerald-400 font-semibold">● Online Now</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Telegram Agent:</span>
                  <a
                    href={CONTACT_INFO.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-emerald-400"
                    title="Telegram support @EgSupport24"
                  >
                    {CONTACT_INFO.telegram}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">WhatsApp Agent:</span>
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-emerald-400"
                    title="WhatsApp direct chat"
                  >
                    {CONTACT_INFO.whatsapp}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Average Reply Time:</span>
                  <span className="text-emerald-400 font-semibold">&lt; 2 Minutes</span>
                </div>
              </div>
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Message Live Support Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC GUIDES & TOPICAL CLUSTER SECTION */}
      <section aria-labelledby="home-guides-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <BookOpen className="w-3.5 h-3.5" />
              Technical Blueprints & Masterclasses
            </div>
            <h2 id="home-guides-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Strategic Insights & Setup Protocols
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              In-depth engineering documentation on anti-detect browser routing, agency ad scaling, and payment gateway stabilization.
            </p>
          </div>
          <a
            href="#blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 whitespace-nowrap"
          >
            Explore All Guides <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <a
              key={post.slug}
              href={`#blog/${post.slug}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden bg-slate-100 relative">
                <img
                  src={post.coverImage}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs">
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 mt-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION - Semantic FAQs with Schema */}
      <section aria-labelledby="home-faq-heading" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Frequently Asked Questions
          </span>
          <h2 id="home-faq-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Common Questions About Our Services & Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about our verified account delivery, safety standards, and cryptocurrency payments.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
          {homeSEO.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-600 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
