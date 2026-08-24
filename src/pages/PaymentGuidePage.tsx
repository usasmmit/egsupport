import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, QrCode, ArrowRight, Send, MessageCircle, ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';
import { CRYPTO_WALLETS, CONTACT_INFO } from '../data/cryptoAddresses';
import { SEOHead } from '../components/SEOHead';
import { PAGES_SEO, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema, BASE_URL } from '../data/seoData';

export const PaymentGuidePage: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const guideSEO = PAGES_SEO.paymentGuide;

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2500);
  };

  // Structured HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Pay with Cryptocurrency on Smmservice.co.uk',
    description: 'A step-by-step tutorial on sending Bitcoin, USDT (TRC20), Ethereum, or Litecoin for instant digital asset purchases.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Service & Tier',
        text: 'Choose your desired service package and proceed to Instant Crypto Checkout or Add to Cart.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select Cryptocurrency & Copy Deposit Address',
        text: 'Select your preferred cryptocurrency (BTC, USDT TRC20, LTC, ETH, SOL) and copy our official verified deposit address.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Transfer Funds & Submit TXID',
        text: 'Send the exact amount from your crypto wallet or exchange and submit the transaction hash (TXID) for automated order dispatch.'
      }
    ]
  };

  const pageSchema = [
    getOrganizationSchema(),
    getBreadcrumbSchema(guideSEO.breadcrumbs),
    howToSchema,
    getFAQSchema(guideSEO.faqs)
  ];

  return (
    <div className="bg-white min-h-screen py-10">
      <SEOHead
        title={guideSEO.title}
        description={guideSEO.metaDescription}
        keywords={[guideSEO.primaryKeyword, ...guideSEO.secondaryKeywords]}
        canonicalUrl={guideSEO.url}
        schema={pageSchema}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Visual Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-slate-900 font-medium">Home</a>
          <span>/</span>
          <span className="font-bold text-slate-900">Payment Guide</span>
        </nav>

        {/* Semantic Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Confidential & Zero Processing Fees
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Official Cryptocurrency Payment Guide & Deposit Addresses
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We accept all major cryptocurrencies for 100% confidential, zero-fee, instant order processing. Below are our verified deposit addresses across multiple blockchain networks.
          </p>
        </div>

        {/* Wallets Grid */}
        <section aria-labelledby="verified-wallets-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="verified-wallets-heading" className="text-base sm:text-lg font-black text-slate-950">
              Verified Cryptocurrency Deposit Addresses
            </h2>
            <span className="text-xs font-bold text-emerald-600">Zero Processing Surcharges</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CRYPTO_WALLETS.map((wallet) => {
              const isCopied = copiedAddress === wallet.address;
              return (
                <div
                  key={wallet.symbol}
                  className="p-5 bg-white border border-slate-200 hover:border-slate-400 rounded-xl shadow-2xs space-y-3 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-950">{wallet.currency}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        Network: {wallet.network || wallet.symbol}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                      {wallet.symbol}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">
                      Official Deposit Address:
                    </span>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-900 break-all select-all font-medium">
                      {wallet.address}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handleCopy(wallet.address)}
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-950 hover:bg-slate-800 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                      aria-label={`Copy ${wallet.currency} deposit address`}
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{isCopied ? 'Address Copied!' : 'Copy Address'}</span>
                    </button>

                    <span className="text-[10px] text-slate-500 italic">
                      {wallet.instruction}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section aria-labelledby="how-to-pay-heading" className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <h2 id="how-to-pay-heading" className="text-lg font-bold text-slate-950">
            How to Pay Step-by-Step with Crypto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Select Service & Checkout</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add your required service package to the cart or click Instant Checkout on the service page.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Transfer from Any Wallet/Exchange</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send the converted amount from Binance, Coinbase, Trust Wallet, MetaMask, or Exodus to our exact address.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Instant Order Activation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our automated dispatch system registers your payment and immediately queues your service for delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Guide FAQs */}
        <section aria-labelledby="payment-faqs-heading" className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Payment Support
            </span>
            <h2 id="payment-faqs-heading" className="text-xl font-bold text-slate-950">
              Frequently Asked Questions About Crypto Payments
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
            {guideSEO.faqs.map((faq, idx) => {
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

        {/* Support Help Banner */}
        <div className="bg-slate-950 text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">Need Help Making a Crypto Transfer?</h3>
            <p className="text-xs text-slate-400">
              Our 24/7 technical team on Telegram (<span className="text-white font-semibold">@EgSupport24</span>) and WhatsApp will guide you live.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold flex items-center gap-2"
              title="Message Telegram Desk"
            >
              <Send className="w-3.5 h-3.5" /> Telegram Support
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-2"
              title="Message WhatsApp Desk"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
