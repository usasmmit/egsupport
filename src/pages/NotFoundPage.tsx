import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { 
  FileQuestion, Home, Search, ArrowRight, ShieldCheck, 
  Send, PhoneCall, Layers, DollarSign, HelpCircle 
} from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateServices: () => void;
  onNavigatePricing: () => void;
  onNavigateFAQ: () => void;
  onSelectService?: (slug: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigateServices,
  onNavigatePricing,
  onNavigateFAQ,
  onSelectService
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const topServices = [
    { title: 'Stripe Verified Account', slug: 'buy-stripe-verified-account' },
    { title: 'PayPal Business Account', slug: 'buy-verified-paypal-account' },
    { title: 'Cash App BTC Enabled', slug: 'buy-cash-app-account' },
    { title: 'Binance Plus Verified', slug: 'buy-binance-verified-account' },
    { title: 'Facebook Ads Agency BM', slug: 'buy-facebook-ads-agency-account' },
    { title: 'Google 5-Star Reviews', slug: 'buy-google-5-star-reviews' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 flex flex-col justify-center">
      <SEOHead
        title="404 - Page Not Found | Smmservice.co.uk"
        description="The requested page could not be located. Explore our verified accounts catalog, pricing matrix, knowledgebase, or contact 24/7 customer support."
        noIndex={true}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-xs">
          <FileQuestion className="w-10 h-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
          HTTP Error 404
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-8">
          The link you followed may have moved or no longer exists. Use the search bar below or explore our verified services catalog.
        </p>

        {/* Quick Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </button>
          <button
            onClick={onNavigateServices}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <Layers className="w-4 h-4" />
            Browse All Services
          </button>
          <button
            onClick={onNavigatePricing}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-sm flex items-center gap-2 transition-all"
          >
            <DollarSign className="w-4 h-4" />
            Pricing Matrix
          </button>
          <button
            onClick={onNavigateFAQ}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-sm flex items-center gap-2 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            Knowledgebase
          </button>
        </div>

        {/* Popular Services Links */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-left">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Popular Verified Digital Assets:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topServices.map((srv) => (
              <button
                key={srv.slug}
                onClick={() => onSelectService?.(srv.slug)}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-emerald-50/50 hover:border-emerald-200 flex items-center justify-between text-left transition-all text-sm font-semibold text-slate-800"
              >
                <span>{srv.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span>Need help finding something?</span>
          <a
            href="https://t.me/EgSupport24"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-600 font-bold hover:underline"
          >
            <Send className="w-3.5 h-3.5" />
            Telegram @EgSupport24
          </a>
        </div>
      </div>
    </div>
  );
};
