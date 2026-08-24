import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  MessageCircle,
  ShoppingBag,
  Zap,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  Share2,
  Check,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Layers,
  Sparkles,
  Award,
  Lock,
  Headphones,
  CheckCheck,
  DollarSign,
  PhoneCall,
  ExternalLink,
  Tag,
  Percent,
  Flame,
  CreditCard,
  CircleDot,
  Circle,
  Truck,
  Shield,
  Info,
  FileText
} from 'lucide-react';
import { ServiceItem, ServicePackage, ServiceReview } from '../types';
import { useCart } from '../context/CartContext';
import { CONTACT_INFO, CRYPTO_WALLETS } from '../data/cryptoAddresses';
import { ReviewModal } from '../components/ReviewModal';
import { BrandLogo } from '../components/BrandLogo';
import { FormattedContent } from '../components/FormattedContent';
import { SERVICES } from '../data/services';
import { SEOHead } from '../components/SEOHead';
import { getOrganizationSchema, getBreadcrumbSchema, getFAQSchema, BASE_URL } from '../data/seoData';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onInstantCheckout: () => void;
  onNavigateToCategory: (categorySlug: string) => void;
  onSelectService?: (slug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onInstantCheckout,
  onNavigateToCategory,
  onSelectService
}) => {
  const { addToCart, formatPrice } = useCart();

  // Selected package
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage>(
    service.packages.find((p) => p.popular) || service.packages[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [targetDetails, setTargetDetails] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  // FAQs open state (First 2 open by default)
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true, 1: true });

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ServiceReview[]>(service.reviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAddToCart = (openCheckout = false) => {
    addToCart({
      serviceId: service.id,
      serviceTitle: service.title,
      serviceSlug: service.slug,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      quantityLabel: String(selectedPackage.quantity),
      unitPrice: selectedPackage.price,
      quantity: quantity,
      targetUrlOrDetails: targetDetails.trim() || undefined,
      customNotes: customNotes.trim() || undefined
    });

    if (openCheckout) {
      onInstantCheckout();
    } else {
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulVoted[reviewId]) return;
    setHelpfulVoted((prev) => ({ ...prev, [reviewId]: true }));
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleAddReview = (newReview: ServiceReview) => {
    setReviewsList((prev) => [newReview, ...prev]);
  };

  const filteredReviews =
    ratingFilter === 'all'
      ? reviewsList
      : reviewsList.filter((r) => r.rating === ratingFilter);

  const averageRating = (
    reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length
  ).toFixed(1);

  // Related services in the same category
  const relatedServices = SERVICES
    .filter((s) => s.categorySlug === service.categorySlug && s.id !== service.id)
    .slice(0, 4);

  // Pre-filled direct messaging links
  const telegramMessage = encodeURIComponent(
    `Hello Smmservice.co.uk! I want to order "${service.title}" (${selectedPackage.name} - ${formatPrice(selectedPackage.price * quantity)}). Can you confirm delivery setup and warranty?`
  );

  const whatsappMessage = encodeURIComponent(
    `Hello Smmservice.co.uk! I want to purchase "${service.title}" - Tier: ${selectedPackage.name} (${formatPrice(selectedPackage.price * quantity)}). Please send payment and delivery instructions.`
  );

  // Dynamic SEO calculation
  const cleanDescription = service.shortDescription.replace(/\n+/g, ' ').slice(0, 160);
  const seoTitle = `${service.title} | Buy Verified with Instant Delivery | Smmservice.co.uk`;
  const seoDescription = `${cleanDescription}... 100% KYC verified, 30-day replacement guarantee, instant crypto checkout on Smmservice.co.uk.`;
  const canonicalUrl = `/service/${service.slug}`;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: service.category, url: `/services?category=${service.categorySlug}` },
    { name: service.title, url: canonicalUrl }
  ];

  // Rich Product & Offer Schema
  const lowestPrice = Math.min(...service.packages.map((p) => p.price));
  const highestPrice = Math.max(...service.packages.map((p) => p.price));

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: service.title,
    description: service.shortDescription.replace(/\n+/g, ' '),
    image: `${BASE_URL}/logo.png`,
    brand: {
      '@type': 'Brand',
      name: 'Smmservice.co.uk'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      offerCount: service.packages.length,
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/service/${service.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'Smmservice.co.uk'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: reviewsList.length,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviewsList.slice(0, 5).map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author
      },
      datePublished: '2026-08-01',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: '5'
      },
      reviewBody: r.comment
    }))
  };

  const pageSchema = [
    getOrganizationSchema(),
    getBreadcrumbSchema(breadcrumbs),
    productSchema,
    getFAQSchema(service.faqs)
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={service.metaKeywords}
        canonicalUrl={canonicalUrl}
        ogType="product"
        schema={pageSchema}
      />

      {/* Visual Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <span className="hover:text-slate-900 cursor-pointer font-medium" onClick={() => onNavigateToCategory('all')}>Home</span>
          <span>/</span>
          <button
            onClick={() => onNavigateToCategory(service.categorySlug)}
            className="hover:text-slate-900 font-bold text-slate-700 cursor-pointer"
          >
            {service.category}
          </button>
          <span>/</span>
          <span className="text-slate-950 font-bold truncate">{service.title}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
        {/* ========================================================================= */}
        {/* TOP HERO & INTERACTIVE PRICING SECTION (MATCHING SCREENSHOT LAYOUT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Service Details, Ratings, Overview & Included Features */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-black rounded-lg uppercase tracking-wider">
                  {service.category}
                </span>
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Replacement Warranty
                </span>
                <span className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-purple-600" />
                  In Stock & Instant Prep
                </span>
              </div>

              {/* Brand Icon + Title Row */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-2.5 shrink-0">
                  <BrandLogo name={service.title} size="lg" className="w-full h-full object-contain" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h1 id="service-main-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    {service.title}
                  </h1>
                </div>
              </div>

              {/* Rating & Speed Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 pt-1 pb-1">
                <div className="flex items-center gap-1">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-extrabold text-slate-950 ml-1">{averageRating} / 5.0</span>
                  <span className="text-slate-400 font-medium">({(reviewsList.length * 120 + 2980).toLocaleString()} verified orders)</span>
                </div>
                <span className="text-slate-300 font-light hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Speed: <strong className="text-slate-950 font-black">{selectedPackage.deliveryTime || 'Instant Delivery'}</strong></span>
                </div>
                <span className="text-slate-300 font-light hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Non-Drop Guarantee</span>
                </div>
              </div>

              {/* Service Overview & Quality Highlights */}
              <div className="space-y-3 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Service Overview & Quality Highlights</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    SEO Optimized
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100">
                  {service.shortDescription.split('\n\n').slice(0, 2).map((paragraph, pIdx) => {
                    if (pIdx === 0) {
                      const firstChar = paragraph.charAt(0);
                      const rest = paragraph.slice(1);
                      return (
                        <p key={pIdx} className="leading-relaxed">
                          <span className="font-black text-blue-600 text-lg bg-blue-100/90 px-2.5 py-0.5 rounded-lg mr-1.5 inline-block">
                            {firstChar}
                          </span>
                          {rest}
                        </p>
                      );
                    }
                    return (
                      <p key={pIdx} className="leading-relaxed text-slate-600">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* What is Included in this Package */}
              <div className="space-y-3.5 pt-2">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span className="text-slate-950">What is Included in this Package:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-start gap-2.5 shadow-2xs hover:border-blue-400 hover:bg-blue-50/20 transition-all"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Pricing Box & Direct Crypto Checkout */}
          <div className="lg:col-span-5 xl:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-5">
              
              {/* Top Header: Select Package & Price */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                    Select Package / Tier
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    Instant Delivery Ready
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">
                      ${formatPrice(selectedPackage.price * quantity).replace('$', '')}
                    </span>
                    <span className="text-xs font-bold text-slate-500">USD Total</span>
                  </div>
                </div>
              </div>

              {/* Package Selection Radio List */}
              <div className="space-y-3">
                {service.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  const isPopular = pkg.popular || idx === 2 || (service.packages.length === 3 && idx === 1);
                  
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Most Popular Badge */}
                      {isPopular && (
                        <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-2xs flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" />
                          Most Popular
                        </span>
                      )}

                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'border-blue-600 bg-white' : 'border-slate-300'
                        }`}>
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <span className={`text-xs sm:text-sm font-black truncate ${isSelected ? 'text-slate-950' : 'text-slate-800'}`}>
                          {pkg.name}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-blue-600">
                          {formatPrice(pkg.price)}
                          <span className="text-[11px] font-medium text-slate-400 ml-1">/ {pkg.quantity} {pkg.unit || 'Units'}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quantity Multiplier */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    Quantity / Multiplier
                  </label>
                  <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">
                    Order multiples of this package
                  </span>
                </div>

                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-black text-sm shadow-2xs transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-black text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-black text-sm shadow-2xs transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Target Link / Instructions / Keywords Input */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-wider">
                    Target Link / Instructions / Keywords:
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Optional
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your target URL (Google Maps link, Trustpilot profile), custom review text, or delivery preferences..."
                  value={targetDetails}
                  onChange={(e) => setTargetDetails(e.target.value)}
                  className="w-full text-xs bg-slate-50/70 border border-slate-200 rounded-2xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400 shadow-2xs"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleAddToCart(false)}
                  className="w-full py-3.5 px-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  className="w-full py-3.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer active:scale-[0.99]"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Instant Crypto Pay</span>
                </button>
              </div>

              {/* Item Added Toast */}
              {addedToast && (
                <div className="p-3 bg-emerald-100 border border-emerald-400 text-emerald-950 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Item added to cart! Proceed to checkout or continue shopping.</span>
                </div>
              )}

              {/* Bottom Support Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <span className="text-base shrink-0">💡</span>
                <div className="space-y-1">
                  <span className="font-semibold block leading-relaxed">
                    Need to test first? Message our 24/7 team on{' '}
                    <a
                      href={`https://t.me/EgSupport24?text=${telegramMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline text-blue-700 hover:text-blue-900"
                    >
                      Telegram
                    </a>{' '}
                    or{' '}
                    <a
                      href={`https://wa.me/19292165606?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline text-emerald-700 hover:text-emerald-900"
                    >
                      WhatsApp
                    </a>{' '}
                    to request a sample or custom batch before ordering!
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TRUST BADGES & SUPPORTED CRYPTOCURRENCIES BANNER */}
        {/* ========================================================================= */}
        <section aria-labelledby="trust-and-payment-methods" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">1–6h Fast SLA</div>
                <div className="text-[10px] text-slate-500 font-medium">Automated Dispatch</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">30-Day Warranty</div>
                <div className="text-[10px] text-slate-500 font-medium">Free Replacement</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">Encrypted Setup</div>
                <div className="text-[10px] text-slate-500 font-medium">Zero KYC Required</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">24/7 VIP Desk</div>
                <div className="text-[10px] text-slate-500 font-medium">Telegram & WhatsApp</div>
              </div>
            </div>
          </div>

          {/* Supported Crypto Currencies Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <span className="font-black text-slate-800 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              Supported Zero-Fee Crypto Payments:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-slate-800">
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-emerald-700 shadow-2xs">USDT (TRC20/BEP20)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-amber-700 shadow-2xs">Bitcoin (BTC)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-indigo-700 shadow-2xs">Ethereum (ETH)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 shadow-2xs">Litecoin (LTC)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-purple-700 shadow-2xs">Solana (SOL)</span>
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-yellow-700 shadow-2xs">BNB</span>
            </div>
          </div>

          {/* 24/7 Live Contact Pre-Sales Escalation */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-black text-sm text-white block mb-0.5">
                Need Volume Discounts or Custom Setup Parameters?
              </span>
              <span className="text-xs text-slate-400">
                Connect directly with our 24/7 technical fulfillment engineers (average response under 2 mins):
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`https://t.me/EgSupport24?text=${telegramMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram @EgSupport24</span>
              </a>
              <a
                href={`https://wa.me/19292165606?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp VIP Desk</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 7: SERVICES LONG DESCRIPTION (1000 - 2000 WORDS, SEO OPTIMIZED) */}
        {/* ========================================================================= */}
        <section aria-labelledby="seo-in-depth-guide-heading" className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              Technical Masterclass & Setup Protocol (1,000+ Words)
            </div>
            <h2 id="seo-in-depth-guide-heading" className="text-xl sm:text-3xl font-black tracking-tight text-white mb-2">
              Comprehensive Strategic Guide: {service.title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Complete engineering blueprint covering algorithmic risk mitigation, anti-detect browser routing, residential proxy parameters, session warm-up timelines, and merchant account longevity protocols.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xs">
            <FormattedContent content={service.mainDescription} />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 8: FAQS (8 TO 10 COMPREHENSIVE DIRECT-ANSWER QUESTIONS) */}
        {/* ========================================================================= */}
        <section aria-labelledby="service-faqs-heading" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-1.5 border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200/60">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Verified Answer Engine</span>
            </div>
            <h2 id="service-faqs-heading" className="text-xl sm:text-3xl font-black text-slate-950">
              Frequently Asked Questions ({service.faqs.length} Answers)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Direct technical answers to common queries regarding credentials handoff, anti-detect browsers, replacement guarantees, and cryptocurrency checkout.
            </p>
          </div>

          <div className="space-y-3.5">
            {service.faqs.map((faq, index) => {
              const isOpen = !!openFaqs[index];
              return (
                <div
                  key={index}
                  className={`border rounded-2xl overflow-hidden transition-all bg-white ${
                    isOpen ? 'border-slate-400 shadow-xs' : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg shrink-0">
                        Q{index + 1}
                      </span>
                      <span className="text-slate-950 font-bold">{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/60 space-y-2">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Verified Customer Feedback Section */}
        <section aria-labelledby="service-reviews-heading" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Verified Buyer Feedback
              </span>
              <h2 id="service-reviews-heading" className="text-xl sm:text-2xl font-black text-slate-950">
                Customer Reviews & Experiences ({reviewsList.length})
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900">{averageRating} out of 5.0</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {review.author}
                      </span>
                      {review.verified && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-700" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{review.date}</span>
                  </div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {review.comment}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(review.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      helpfulVoted[review.id]
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'hover:bg-slate-200/60 text-slate-600'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 9: RELATED SERVICES (SAME CATEGORY & TOPICAL SILO) */}
        {/* ========================================================================= */}
        {relatedServices.length > 0 && (
          <section aria-labelledby="related-services-heading" className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                  Topical Category Silo
                </span>
                <h2 id="related-services-heading" className="text-xl sm:text-2xl font-black text-slate-950">
                  Related {service.category} Solutions
                </h2>
              </div>
              <button
                onClick={() => onNavigateToCategory(service.categorySlug)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View all in {service.category}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    if (onSelectService) {
                      onSelectService(rel.slug);
                    } else {
                      window.history.pushState(null, '', `/service/${rel.slug}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BrandLogo name={rel.title} size="sm" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                        {rel.category}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {rel.shortDescription.replace(/\n+/g, ' ')}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Starting at</span>
                    <span className="font-black text-emerald-600 text-sm">${rel.startingPrice} USD</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Write Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        serviceTitle={service.title}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
};
