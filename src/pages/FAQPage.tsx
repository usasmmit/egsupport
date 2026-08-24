import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { PAGE_SEO, getBreadcrumbSchema, getFAQSchema } from '../data/seoData';
import { 
  HelpCircle, Search, ChevronDown, ShieldCheck, Zap, 
  Lock, RefreshCw, Send, CheckCircle2, PhoneCall 
} from 'lucide-react';

interface FAQPageProps {
  onNavigateContact?: () => void;
  onExploreServices?: () => void;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  faqs: {
    question: string;
    directAnswer: string;
    detailedExplanation: string;
    keyPoints?: string[];
  }[];
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onNavigateContact,
  onExploreServices
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'cat-0-0': true,
    'cat-1-0': true
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories: FAQCategory[] = [
    {
      id: 'delivery',
      name: 'Delivery & Credentials',
      icon: Zap,
      faqs: [
        {
          question: 'How fast will I receive my account credentials after cryptocurrency payment?',
          directAnswer: 'Standard orders are delivered in 1 to 6 hours after blockchain transaction confirmation.',
          detailedExplanation: 'Once your cryptocurrency payment confirms on the network, our automated order system alerts our technical fulfillment engineers. The account is run through a pre-delivery health check and dispatched with full credentials, recovery emails, and 2FA backup codes.',
          keyPoints: [
            'Automated email dispatch upon completion',
            'Live order tracking via Order ID',
            'Priority rush fulfillment available on Telegram'
          ]
        },
        {
          question: 'What exact information and documentation is included with delivery?',
          directAnswer: 'You receive 100% full master access including primary credentials, 2FA recovery seeds, and cookies.',
          detailedExplanation: 'Every package includes primary email access & password, backup recovery email/phone, 2FA authentication QR/secret key, virtual bank details (for payment gateways), and pre-exported browser session cookies for instant anti-detect login.',
          keyPoints: [
            'Master email & recovery access',
            '2FA authenticator secret key',
            'Session JSON cookies for anti-detect browsers'
          ]
        }
      ]
    },
    {
      id: 'security',
      name: 'Anti-Detect & Proxies',
      icon: Lock,
      faqs: [
        {
          question: 'How should I safely log into my purchased account?',
          directAnswer: 'Always connect through an anti-detect browser paired with a clean static residential proxy in the matching country.',
          detailedExplanation: 'Security algorithms monitor device fingerprinting, Canvas hashes, and IP reputation. To avoid automated checkpoints, create a dedicated profile inside AdsPower, Dolphin{anty}, or Multilogin and import the provided session cookies before browsing.',
          keyPoints: [
            'Use static residential proxies (not datacenter IPs or generic VPNs)',
            'Set timezone and language to match proxy coordinates',
            'Import provided cookies to bypass first-login security hurdles'
          ]
        },
        {
          question: 'Can I change the password, recovery email, and 2FA to my personal details?',
          directAnswer: 'Yes, you have 100% full administrative control to update security credentials.',
          detailedExplanation: 'We recommend warming up the session for 24–48 hours in your anti-detect browser before updating passwords, backup phone numbers, and authenticator keys to ensure smooth algorithmic acclimatization.',
          keyPoints: [
            'Wait 24–48 hours after initial login before major security edits',
            'Update backup email and 2FA authenticator in one clean session'
          ]
        }
      ]
    },
    {
      id: 'warranty',
      name: 'Warranty & Replacements',
      icon: RefreshCw,
      faqs: [
        {
          question: 'What is your 30-Day Free Replacement Policy?',
          directAnswer: 'We guarantee a 100% free immediate replacement if an asset fails our pre-delivery check or encounters a system verification lock within 30 days.',
          detailedExplanation: 'If you encounter any credential error or pre-existing lock under standard operating procedures within 30 days of purchase, our engineering team will issue a fresh verified replacement asset immediately.',
          keyPoints: [
            'Valid on all verified accounts, gateways, and reviews',
            'Direct replacement turnaround within 1–6 hours',
            'Dedicated escalation support on Telegram @EgSupport24'
          ]
        },
        {
          question: 'How do I claim a replacement under warranty?',
          directAnswer: 'Simply message our 24/7 Telegram or WhatsApp desk with your Order ID and a screenshot of the issue.',
          detailedExplanation: 'Our support engineers verify the order record against our database and deliver a replacement package with zero bureaucratic delay.',
          keyPoints: [
            'Telegram: @EgSupport24',
            'WhatsApp: +1-929-216-5606',
            'Email: usasmmit@gmail.com'
          ]
        }
      ]
    },
    {
      id: 'payment',
      name: 'Payment & Privacy',
      icon: ShieldCheck,
      faqs: [
        {
          question: 'Which payment methods are supported on Smmservice.co.uk?',
          directAnswer: 'We support 10 major zero-fee cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), USDT, LTC, SOL, and BNB.',
          detailedExplanation: 'Cryptocurrency ensures instantaneous international settlement without banking friction, credit card blockages, or geographic restrictions.',
          keyPoints: [
            'USDT (TRC20, ERC20, BEP20)',
            'Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC)',
            'Solana (SOL), Binance Coin (BNB), Ripple (XRP)'
          ]
        },
        {
          question: 'Do you store customer personal records or logs?',
          directAnswer: 'No. We operate under a strict zero-log privacy framework.',
          detailedExplanation: 'No credit card or personal banking data is ever collected. Sensitive transaction records are encrypted and purged after order fulfillment in accordance with our confidentiality charter.',
          keyPoints: [
            'No KYC required to purchase',
            'Zero transaction data sharing with third parties',
            'Encrypted fulfillment channels'
          ]
        }
      ]
    }
  ];

  const seoInfo = PAGE_SEO.faq;
  const breadcrumbs = seoInfo.breadcrumbs;

  // Flattened faqs for schema
  const allFaqsList = categories.flatMap((c) =>
    c.faqs.map((f) => ({
      question: f.question,
      answer: `${f.directAnswer} ${f.detailedExplanation}`
    }))
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <SEOHead
        title={seoInfo.title}
        description={seoInfo.metaDescription}
        keywords={[seoInfo.primaryKeyword, ...seoInfo.secondaryKeywords]}
        canonicalUrl="https://smmservice.co.uk/faq"
        breadcrumbs={breadcrumbs}
        schemas={[
          getBreadcrumbSchema(breadcrumbs),
          getFAQSchema(allFaqsList)
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-4 border border-emerald-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Answer Engine & Knowledgebase
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {seoInfo.h1}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Direct, factual answers to every question regarding account provisioning, anti-detect browser setup, 30-day replacement warranty, and crypto checkout.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search knowledgebase (e.g. delivery time, proxy, replacement, USDT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Questions
          </button>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordions Section */}
        <div className="space-y-8">
          {categories
            .filter((c) => activeCategory === 'all' || c.id === activeCategory)
            .map((cat, catIdx) => {
              const Icon = cat.icon;
              const matchingFaqs = cat.faqs.filter(
                (f) =>
                  f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  f.directAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  f.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (matchingFaqs.length === 0) return null;

              return (
                <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
                  <div className="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{cat.name}</h2>
                      <p className="text-xs text-slate-500">Verified factual answers from technical staff</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {matchingFaqs.map((faq, faqIdx) => {
                      const itemKey = `cat-${catIdx}-${faqIdx}`;
                      const isOpen = !!openItems[itemKey];

                      return (
                        <div
                          key={itemKey}
                          className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => toggleItem(itemKey)}
                            className="w-full px-5 py-4 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between text-left gap-4 transition-colors"
                          >
                            <span className="font-bold text-slate-900 text-sm sm:text-base">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                                isOpen ? 'rotate-180 text-emerald-600' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="p-5 bg-white border-t border-slate-100 space-y-4">
                              {/* Direct Answer Box (AEO Featured Snippet Target) */}
                              <div className="bg-emerald-50/80 border-l-4 border-emerald-500 p-3.5 rounded-r-lg text-slate-900 font-semibold text-sm">
                                <strong>Direct Answer:</strong> {faq.directAnswer}
                              </div>

                              <p className="text-slate-600 text-sm leading-relaxed">
                                {faq.detailedExplanation}
                              </p>

                              {faq.keyPoints && (
                                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                                  {faq.keyPoints.map((pt, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Live Support Help Box */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold mb-1">Still Have a Specific Technical Question?</h3>
            <p className="text-slate-400 text-sm max-w-lg">
              Our engineering support team is online 24/7 on Telegram and WhatsApp to answer custom setup and volume questions.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              Telegram @EgSupport24
            </a>
            <a
              href="https://wa.me/19292165606"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              WhatsApp VIP Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
