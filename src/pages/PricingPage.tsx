import React, { useState, useMemo } from 'react';
import { SEOHead } from '../components/SEOHead';
import { PAGE_SEO, getBreadcrumbSchema, getFAQSchema } from '../data/seoData';
import { SERVICES, CATEGORIES } from '../data/services';
import { BrandLogo } from '../components/BrandLogo';
import { useCart } from '../context/CartContext';
import { ServiceItem } from '../types';
import { 
  DollarSign, 
  Check, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Users, 
  HelpCircle, 
  Send,
  Search,
  TrendingUp,
  Wallet,
  ShoppingBag,
  Landmark,
  Coins,
  Mail,
  Smartphone,
  Award,
  Share2,
  Globe,
  Star,
  Trash2,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShoppingCart
} from 'lucide-react';

interface PricingPageProps {
  onSelectService: (slug: string) => void;
  onInstantCheckout?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onSelectService,
  onInstantCheckout
}) => {
  const { formatPrice, addToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Compute lowest price per category
  const categoryLowestPrices = useMemo(() => {
    const map: Record<string, number> = {};
    SERVICES.forEach((s) => {
      const minP = Math.min(...s.packages.map((p) => p.price));
      if (!map[s.categorySlug] || minP < map[s.categorySlug]) {
        map[s.categorySlug] = minP;
      }
    });
    return map;
  }, []);

  // Filter services by search query
  const searchedServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return SERVICES;
    return SERVICES.filter((s) => 
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.packages.some((p) => p.name.toLowerCase().includes(q) || String(p.price).includes(q))
    );
  }, [searchQuery]);

  // Group services under their respective categories
  const groupedCategories = useMemo(() => {
    const activeCats = selectedCategory === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.slug === selectedCategory);

    return activeCats.map((cat) => {
      const servicesInCat = searchedServices.filter((s) => s.categorySlug === cat.slug);
      const minPrice = servicesInCat.length > 0 
        ? Math.min(...servicesInCat.flatMap((s) => s.packages.map((p) => p.price)))
        : (categoryLowestPrices[cat.slug] || 0);

      return {
        ...cat,
        services: servicesInCat,
        lowestPrice: minPrice
      };
    }).filter((group) => group.services.length > 0);
  }, [selectedCategory, searchedServices, categoryLowestPrices]);

  // Total matching products count
  const totalMatchingServices = useMemo(() => {
    return groupedCategories.reduce((acc, cat) => acc + cat.services.length, 0);
  }, [groupedCategories]);

  // Total lowest price overall
  const overallLowestPrice = useMemo(() => {
    return Math.min(...SERVICES.map((s) => Math.min(...s.packages.map((p) => p.price))));
  }, []);

  const seoInfo = PAGE_SEO.pricing;
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Pricing & Packages', url: '/pricing' }
  ];

  // Helper function to render category icon
  const renderCategoryIcon = (slug: string, className: string = 'w-4 h-4') => {
    switch (slug) {
      case 'ads-accounts':
        return <TrendingUp className={className} />;
      case 'payment-business-accounts':
        return <Wallet className={className} />;
      case 'marketplace-ecommerce-accounts':
        return <ShoppingBag className={className} />;
      case 'bank-accounts':
        return <Landmark className={className} />;
      case 'crypto-exchange-accounts':
        return <Coins className={className} />;
      case 'email-accounts':
        return <Mail className={className} />;
      case 'virtual-number-accounts':
        return <Smartphone className={className} />;
      case 'aged-review-accounts':
        return <Award className={className} />;
      case 'smtp-email-delivery-accounts':
        return <Send className={className} />;
      case 'social-media-accounts':
        return <Share2 className={className} />;
      case 'organic-marketing-seo':
        return <Search className={className} />;
      case 'off-page-seo-backlinks':
        return <Globe className={className} />;
      case 'reviews-services':
        return <Star className={className} />;
      case 'negative-reviews-removal':
        return <Trash2 className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <SEOHead
        title={seoInfo.title}
        description={seoInfo.metaDescription}
        keywords={[seoInfo.primaryKeyword, ...seoInfo.secondaryKeywords]}
        canonicalUrl="https://smmservice.co.uk/pricing"
        breadcrumbs={breadcrumbs}
        schemas={[
          getBreadcrumbSchema(breadcrumbs),
          getFAQSchema(seoInfo.faqs)
        ]}
      />

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider uppercase border border-emerald-500/20">
            <DollarSign className="w-3.5 h-3.5" />
            Transparent Pricing & Live Inventory Catalog
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {seoInfo.h1}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Browse all verified assets organized by category. Click any category tab below to filter live prices, packages, and instant order options.
          </p>

          {/* Compact Trust Features */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>14 Asset Categories</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>30-Day Free Replacement SLA</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>1–6h Instant Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              <span>Starting from $15</span>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Agency Discount Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl p-3.5 sm:p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 border border-emerald-400/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs">
              <strong className="text-white font-bold">Bulk Agency & Reseller Volume Discount: </strong>
              <span className="text-emerald-100">10% OFF (3+ accounts) • 20% OFF (10+ accounts) • 25% OFF (25+ accounts).</span>
            </div>
          </div>
          <a
            href="https://t.me/EgSupport24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-white text-emerald-950 font-bold rounded-lg text-xs shadow-xs hover:bg-emerald-50 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-emerald-600" />
            Claim Reseller Rates
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* ======================================================== */}
        {/* 1. COMPACT CATEGORY BUTTONS / PILLS (CHOTO BOXES)         */}
        {/* ======================================================== */}
        <section aria-label="Category Selection" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                Select Category to View Products & Pricing
              </h2>
            </div>

            {/* Quick Search inside Categories */}
            <div className="relative min-w-[220px] sm:min-w-[280px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products or prices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Compact Category Grid (Small Sleek Tiles) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-2">
            {/* All Categories Button */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-emerald-500 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-white hover:border-emerald-400 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className={`p-1 rounded-md ${
                  selectedCategory === 'all' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white text-slate-600 shadow-2xs'
                }`}>
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  selectedCategory === 'all' ? 'bg-emerald-400 text-slate-950' : 'bg-slate-200/70 text-slate-600'
                }`}>
                  {SERVICES.length}
                </span>
              </div>
              <div>
                <span className="font-bold text-[11px] block truncate">All Services</span>
                <span className={`text-[10px] font-semibold ${selectedCategory === 'all' ? 'text-emerald-300' : 'text-emerald-600'}`}>
                  From ${overallLowestPrice}
                </span>
              </div>
            </button>

            {/* 14 Specific Category Small Tiles */}
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const minPrice = categoryLowestPrices[cat.slug] || 25;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950 text-white border-emerald-500 ring-2 ring-emerald-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-white hover:border-emerald-400 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className={`p-1 rounded-md ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white text-slate-600 shadow-2xs'
                    }`}>
                      {renderCategoryIcon(cat.slug, 'w-3.5 h-3.5')}
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-200/70 text-slate-600'
                    }`}>
                      {cat.serviceCount}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[11px] block truncate" title={cat.name}>
                      {cat.name}
                    </span>
                    <span className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      From ${minPrice}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <strong className="text-slate-900">{totalMatchingServices}</strong> items across <strong className="text-emerald-700">{groupedCategories.length}</strong> categories
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                View All Categories
              </button>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. PRODUCTS GROUPED UNDER EACH CATEGORY (LIST FORMAT)     */}
        {/* ======================================================== */}
        {groupedCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No Products Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No matching assets were found for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedCategories.map((group) => (
              <section 
                key={group.id} 
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
              >
                {/* Category Header Banner */}
                <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg shrink-0">
                      {renderCategoryIcon(group.slug, 'w-4 h-4')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-white">
                          {group.name}
                        </h3>
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {group.services.length} Products
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-1">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-xs self-end sm:self-center">
                    <span className="text-slate-300">Starting from</span>
                    <span className="text-emerald-400 font-mono font-black text-sm sm:text-base">
                      ${group.lowestPrice} USD
                    </span>
                  </div>
                </div>

                {/* Products List Table / Rows */}
                <div className="divide-y divide-slate-100">
                  {group.services.map((service: ServiceItem, idx: number) => {
                    const lowestPrice = Math.min(...service.packages.map((p) => p.price));
                    const highestPrice = Math.max(...service.packages.map((p) => p.price));
                    const isExpanded = expandedServiceId === service.id;

                    return (
                      <div 
                        key={service.id} 
                        className={`p-3.5 sm:p-4.5 transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                        } hover:bg-emerald-50/20`}
                      >
                        {/* Main List Item Row */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
                          
                          {/* Left: Brand Icon + Title + Feature Highlights */}
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="shrink-0 mt-0.5">
                              <BrandLogo name={service.title} size="md" />
                            </div>
                            
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => onSelectService(service.slug)}
                                  className="font-bold text-xs sm:text-sm text-slate-900 hover:text-emerald-600 transition-colors text-left cursor-pointer truncate"
                                >
                                  {service.title}
                                </button>
                                
                                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-slate-200/60 shrink-0">
                                  {service.packages.length} Package{service.packages.length > 1 ? 's' : ''}
                                </span>
                              </div>

                              {/* Features pill tags in row */}
                              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                                {service.features.slice(0, 3).map((feat, fIdx) => (
                                  <span key={fIdx} className="inline-flex items-center gap-1 bg-slate-100/80 px-2 py-0.5 rounded text-[10px] text-slate-600 font-medium">
                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                    <span className="truncate max-w-[200px]">{feat}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Pricing info + Interactive Buttons */}
                          <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                            {/* Price range */}
                            <div className="text-left lg:text-right">
                              <div className="text-xs text-slate-400 font-medium">Price range</div>
                              <div className="text-sm sm:text-base font-black text-slate-900 font-mono">
                                <span className="text-emerald-600">${lowestPrice}</span>
                                {highestPrice > lowestPrice && (
                                  <span className="text-slate-400 text-xs font-normal"> – ${highestPrice}</span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              {/* Toggle Packages Button */}
                              <button
                                onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                                className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                                  isExpanded
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-2xs'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:text-emerald-600'
                                }`}
                              >
                                <span>{isExpanded ? 'Hide' : 'Packages'}</span>
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>

                              {/* View Details Page */}
                              <button
                                onClick={() => onSelectService(service.slug)}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                              >
                                <span>Details</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                        </div>

                        {/* Expandable Package Tiers List */}
                        {isExpanded && (
                          <div className="mt-3.5 pt-3 border-t border-slate-200/80 bg-slate-50/80 p-3 rounded-xl space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                              <span className="flex items-center gap-1.5">
                                <Tag className="w-3 h-3 text-emerald-600" />
                                Available Package Tiers & Delivery Options ({service.packages.length})
                              </span>
                              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-500" /> Dispatch in 1–6h
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {service.packages.map((pkg) => (
                                <div
                                  key={pkg.id}
                                  className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs hover:border-emerald-400 transition-colors shadow-2xs"
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="font-bold text-slate-900 text-xs truncate">
                                      {pkg.name}
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate">
                                      KYC Docs + JSON Cookies
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="font-black text-emerald-600 font-mono text-xs sm:text-sm">
                                      ${pkg.price}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        addToCart({
                                          serviceId: service.id,
                                          serviceSlug: service.slug,
                                          serviceTitle: service.title,
                                          packageId: pkg.id,
                                          packageName: pkg.name,
                                          quantityLabel: `${pkg.quantity} ${pkg.unit}`,
                                          unitPrice: pkg.price,
                                          quantity: 1,
                                          targetUrlOrDetails: '',
                                        });
                                        setIsCartOpen(true);
                                      }}
                                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                    >
                                      <ShoppingCart className="w-3 h-3" />
                                      Order
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. ZERO RISK GUARANTEES & FEATURES                      */}
        {/* ======================================================== */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Enterprise Buyer Protection
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              What Is Included with Every Order
            </h2>
            <p className="text-xs text-slate-400">
              Transparent one-time checkout backed by 24/7 technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">Full Master Access & Credentials</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Login IDs, recovery emails, 2FA backup codes, phone numbers, and full verification identity docs.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-1">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">30-Day Free Replacement SLA</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                If an unexpected checkpoint or verification flag occurs within 30 days, we replace the asset at zero cost.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">Anti-Detect JSON Cookies</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Includes pre-configured session cookies and residential IP guidelines for frictionless 1-click access.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. PRICING & BILLING FAQS                                */}
        {/* ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Pricing & Order FAQ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoInfo.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{faq.question}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
