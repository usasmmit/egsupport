import React from 'react';
import { 
  Send, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Lock, 
  RefreshCw, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO, CRYPTO_WALLETS } from '../data/cryptoAddresses';
import { SiteLogo } from './SiteLogo';

interface FooterProps {
  onNavigate: (view: string, categorySlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Guarantees & Trust Signals Bar */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-white font-bold text-xs sm:text-sm">100% KYC Verified</h4>
                <p className="text-xs text-slate-400">Identity-checked with authentic documents</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-white font-bold text-xs sm:text-sm">Lightning 1-6h Dispatch</h4>
                <p className="text-xs text-slate-400">Instant digital access & credentials</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-white font-bold text-xs sm:text-sm">30-Day Free Replacement</h4>
                <p className="text-xs text-slate-400">100% unconditional warranty policy</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-white font-bold text-xs sm:text-sm">Crypto Anonymous Pay</h4>
                <p className="text-xs text-slate-400">Zero-log checkout via BTC, USDT & ETH</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Architecture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('home')}
                className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg cursor-pointer"
              >
                <SiteLogo size="lg" variant="light" showTagline={true} />
              </button>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Smmservice.co.uk is a premier digital growth agency and verified asset marketplace. We equip global entrepreneurs, media buyers, and agencies with high-trust financial accounts, aged advertising accounts, non-drop reviews, and enterprise digital infrastructure.
              </p>
            </div>

            {/* Live Support Channel Links */}
            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                24/7 Direct Engineering Desk:
              </div>
              
              <div className="flex flex-col gap-2">
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 rounded-xl text-xs font-semibold text-slate-200 transition-all max-w-xs group"
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Telegram: <strong className="text-white font-mono">{CONTACT_INFO.telegram}</strong></span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">Online</span>
                </a>

                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-xs font-semibold text-slate-200 transition-all max-w-xs group"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp: <strong className="text-white font-mono">{CONTACT_INFO.whatsapp}</strong></span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">24/7</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Average Response: <strong>&lt; 2 Minutes</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Payment & Business Accounts */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              Payment Gateways
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-paypal-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified PayPal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-stripe-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified Stripe
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-square-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified Square
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-wise-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified Wise
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-payoneer-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified Payoneer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-revolut-business-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified Revolut
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-adyen-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified Adyen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-skrill-account')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  Buy Verified Skrill
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Crypto & Ads Accounts */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              Crypto & Ads Assets
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-binance-account')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy Verified Binance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-coinbase-account')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy Verified Coinbase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-kraken-account')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy Verified Kraken
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-verified-okx-account')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy Verified OKX
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-facebook-ads-account')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy Facebook Ads BM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-google-ads-account')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy Google Ads Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-tiktok-ads-account')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy TikTok Ads Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service/buy-google-voice-accounts')}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
                  Buy Google Voice PVA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Authority, Legal & All Services Link */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              Catalog & Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  All Services (250+ Assets)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  Pricing & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  Knowledgebase & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  Blog & Tech Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  Contact 24/7 Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track-order')}
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  Live Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('payment-guide')}
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  Crypto Payment Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('refunds')}
                  className="text-slate-400 hover:text-white transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-white" />
                  Replacement & Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-slate-400 hover:text-white transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-white" />
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-slate-400 hover:text-white transition-colors text-left flex items-center gap-1 group cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-white" />
                  Privacy & Zero-Log Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Accepted Cryptocurrencies & Security Badges Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Accepted Payment:</span>
            {CRYPTO_WALLETS.slice(0, 8).map((w) => (
              <span
                key={w.symbol}
                className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[11px] font-mono font-medium"
              >
                {w.symbol}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Anti-Fraud Protected
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-6 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-400">Smmservice.co.uk</strong> (smmservice.co.uk). All Rights Reserved. Empowering digital entrepreneurs worldwide with enterprise-grade verified infrastructure.
          </p>
          <p className="text-[11px] text-slate-600 max-w-4xl mx-auto">
            Disclaimer: Smmservice.co.uk provides independent consulting, social media marketing services, and digital asset onboarding. All third-party brand names, trademarks, and platform logos (PayPal, Stripe, Meta, Google, Binance, etc.) belong strictly to their respective trademark holders.
          </p>
        </div>
      </div>
    </footer>
  );
};
