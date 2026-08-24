import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Headphones, 
  Zap, 
  Globe2, 
  HelpCircle,
  ArrowRight,
  FileCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoAddresses';
import { SEOHead } from '../components/SEOHead';
import { PAGES_SEO, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema, BASE_URL } from '../data/seoData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [contactType, setContactType] = useState<'telegram' | 'whatsapp' | 'other'>('telegram');
  const [subject, setSubject] = useState('Service Inquiry / Custom Bulk Order');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const contactSEO = PAGES_SEO.contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactHandle.trim() || !message.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: contactSEO.title,
    description: contactSEO.metaDescription,
    url: `${BASE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Smmservice.co.uk',
      url: BASE_URL,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: '+1-929-216-5606',
          email: 'usasmmit@gmail.com',
          availableLanguage: ['English']
        }
      ]
    }
  };

  const pageSchema = [
    getOrganizationSchema(),
    getBreadcrumbSchema(contactSEO.breadcrumbs),
    contactPageSchema,
    getFAQSchema(contactSEO.faqs)
  ];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <SEOHead
        title={contactSEO.title}
        description={contactSEO.metaDescription}
        keywords={[contactSEO.primaryKeyword, ...contactSEO.secondaryKeywords]}
        canonicalUrl={contactSEO.url}
        schema={pageSchema}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-slate-900 font-medium">Home</a>
          <span>/</span>
          <span className="font-bold text-slate-900">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            24/7/365 Live Customer Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Contact Smmservice.co.uk Support Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Need urgent assistance, custom bulk order pricing, or replacement support? Our dedicated engineering agents are online 24/7 with an average response time of under 2 minutes.
          </p>
        </div>

        {/* Primary Direct Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telegram Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Fastest (&lt; 2 min)
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Telegram 24/7 VIP Desk</h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Direct one-on-one chat with our senior technicians. Recommended for instant order delivery coordination, custom geo-targeting, and warranty replacements.
                </p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Official Handle:</span>
                <span className="text-sm font-mono font-bold text-sky-300">{CONTACT_INFO.telegram}</span>
              </div>
            </div>

            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Open Telegram Live Chat
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Verified Business
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">WhatsApp Business Desk</h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Connect directly with our account specialists on WhatsApp for enterprise quotes, bulk order discounts, and ongoing customer support.
                </p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Business Number:</span>
                <span className="text-sm font-mono font-bold text-emerald-300">{CONTACT_INFO.whatsapp}</span>
              </div>
            </div>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Open WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Live Support Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">Operating Hours</div>
              <div className="text-xs text-slate-500">24 Hours / 7 Days / 365 Days</div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">Average Response Time</div>
              <div className="text-xs text-slate-500">&lt; 2 Minutes via Telegram</div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">30-Day Guarantee</div>
              <div className="text-xs text-slate-500">100% Free Replacements</div>
            </div>
          </div>
        </div>

        {/* Instant Inquiry & Bulk Order Ticket Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Direct Desk Inquiry
            </span>
            <h2 className="text-xl font-bold text-slate-950 mt-1">Submit an Inquiry or Order Ticket</h2>
            <p className="text-xs text-slate-500">
              Submit your request below. You can also mention your Telegram handle or WhatsApp number for immediate callback.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Inquiry Dispatched Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Our on-duty technicians have received your message regarding "{subject}" and will reach out to you directly via {contactType} at <strong>{contactHandle}</strong> shortly.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  Speed Up via Telegram Direct
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Telegram / WhatsApp / Contact Info *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={contactType}
                      onChange={(e) => setContactType(e.target.value as any)}
                      className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 shrink-0 font-semibold"
                    >
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder={contactType === 'telegram' ? '@yourusername' : '+1-xxx-xxx-xxxx'}
                      value={contactHandle}
                      onChange={(e) => setContactHandle(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject / Inquiry Type</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                  >
                    <option>Service Inquiry / Pre-Sale Question</option>
                    <option>Custom Bulk Order Discount Request</option>
                    <option>Order Status & Delivery Assistance</option>
                    <option>Replacement / Warranty Support</option>
                    <option>Custom Geotargeting & Proxy Advice</option>
                    <option>Cryptocurrency Payment Confirmation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Order ID (Optional - If existing customer)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EG-884920"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Detailed Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your requirements, preferred quantities, target country, or any technical questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Your information is encrypted & never shared with third parties.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Send Inquiry Ticket
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Support FAQs */}
        <section aria-labelledby="support-faqs-heading" className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Support Center
            </span>
            <h2 id="support-faqs-heading" className="text-xl font-bold text-slate-950">
              Frequently Asked Support Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
            {contactSEO.faqs.map((faq, idx) => {
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
      </div>
    </div>
  );
};
