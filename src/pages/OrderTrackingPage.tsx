import React, { useState } from 'react';
import { Search, ShieldCheck, Clock, CheckCircle2, AlertCircle, Send, MessageCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CONTACT_INFO } from '../data/cryptoAddresses';
import { OrderRecord } from '../types';
import { SEOHead } from '../components/SEOHead';
import { PAGES_SEO, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '../data/seoData';

interface OrderTrackingPageProps {
  initialOrderId?: string;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ initialOrderId = '' }) => {
  const { getOrderById, orders, formatPrice } = useCart();
  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [searchedOrder, setSearchedOrder] = useState<OrderRecord | null>(
    initialOrderId ? getOrderById(initialOrderId) || null : null
  );
  const [searched, setSearched] = useState(Boolean(initialOrderId));
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const trackSEO = PAGES_SEO.trackOrder;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const trimmed = searchInput.trim();
    // Search by Order ID or Email
    const found =
      getOrderById(trimmed) ||
      orders.find((o) => o.customerEmail.toLowerCase() === trimmed.toLowerCase());

    setSearchedOrder(found || null);
    setSearched(true);
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Completed':
        return 4;
      case 'In Delivery':
        return 3;
      case 'Processing':
        return 2;
      case 'Pending':
      default:
        return 1;
    }
  };

  const pageSchema = [
    getOrganizationSchema(),
    getBreadcrumbSchema(trackSEO.breadcrumbs),
    getFAQSchema(trackSEO.faqs)
  ];

  return (
    <div className="bg-white min-h-screen py-10">
      <SEOHead
        title={trackSEO.title}
        description={trackSEO.metaDescription}
        keywords={[trackSEO.primaryKeyword, ...trackSEO.secondaryKeywords]}
        canonicalUrl={trackSEO.url}
        schema={pageSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-slate-900 font-medium">Home</a>
          <span>/</span>
          <span className="font-bold text-slate-900">Track Order</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Real-Time Fulfillment
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Track Your Smmservice.co.uk Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Enter your Order ID (e.g., EG-584920) or your registered customer email to view live delivery status.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="Enter Order ID (e.g. EG-584920) or Email"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            Track Order
          </button>
        </form>

        {/* Results */}
        {searched && (
          <div>
            {searchedOrder ? (
              <div className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden space-y-6">
                {/* Order Summary Header */}
                <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-emerald-400 font-semibold uppercase">
                      Order Reference
                    </div>
                    <div className="text-xl font-bold font-mono text-white">
                      #{searchedOrder.orderId}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Placed on: {new Date(searchedOrder.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-full">
                      Status: {searchedOrder.status}
                    </span>
                    <div className="text-sm font-bold text-white mt-1">
                      Total: {formatPrice(searchedOrder.totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="px-6 py-4">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { step: 1, label: 'Order Received' },
                      { step: 2, label: 'Payment Confirmed' },
                      { step: 3, label: 'In Delivery' },
                      { step: 4, label: 'Completed' }
                    ].map((s) => {
                      const currentStep = getStatusStep(searchedOrder.status);
                      const isDone = currentStep >= s.step;
                      return (
                        <div key={s.step} className="space-y-2">
                          <div
                            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                          </div>
                          <div className={`text-xs font-semibold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {s.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items List */}
                <div className="p-6 border-t border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Purchased Services ({searchedOrder.items.length})
                  </h3>
                  <div className="space-y-3">
                    {searchedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{item.serviceTitle}</div>
                          <div className="text-xs text-slate-500">
                            Package: {item.packageName} (Qty: {item.quantity})
                          </div>
                        </div>
                        <div className="font-mono font-bold text-slate-900">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No order found matching "{searchInput}"</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Please verify your Order ID or contact our 24/7 Telegram team to locate your order manually.
                </p>
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-lg"
                >
                  <Send className="w-3.5 h-3.5" /> Message Telegram Desk
                </a>
              </div>
            )}
          </div>
        )}

        {/* FAQs */}
        <section aria-labelledby="tracking-faqs-heading" className="space-y-4 pt-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Order Help
            </span>
            <h2 id="tracking-faqs-heading" className="text-xl font-bold text-slate-950">
              Frequently Asked Questions About Order Delivery
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
            {trackSEO.faqs.map((faq, idx) => {
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
