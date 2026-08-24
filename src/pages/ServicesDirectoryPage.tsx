import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  ShieldCheck, 
  LayoutGrid, 
  List, 
  Sparkles, 
  Send, 
  MessageCircle, 
  ArrowRight, 
  Star,
  SlidersHorizontal,
  X,
  Layers,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { CATEGORIES, SERVICES } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { BrandLogo } from '../components/BrandLogo';
import { CONTACT_INFO } from '../data/cryptoAddresses';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/SEOHead';
import { PAGES_SEO, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema, BASE_URL } from '../data/seoData';

interface ServicesDirectoryPageProps {
  initialCategory: string | null;
  searchQuery: string;
  onSelectService: (slug: string) => void;
  onSelectCategory: (categorySlug: string | null) => void;
}

export const ServicesDirectoryPage: React.FC<ServicesDirectoryPageProps> = ({
  initialCategory,
  searchQuery,
  onSelectService,
  onSelectCategory
}) => {
  const { formatPrice } = useCart();
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [internalSearch, setInternalSearch] = useState(searchQuery || '');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(24);
  const [showCategoryGrid, setShowCategoryGrid] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Synchronize state when initialCategory or searchQuery prop changes
  React.useEffect(() => {
    setActiveCategory(initialCategory);
    setVisibleCount(24);
  }, [initialCategory]);

  React.useEffect(() => {
    setInternalSearch(searchQuery || '');
  }, [searchQuery]);

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Category match
      const categoryMatch = !activeCategory || service.categorySlug === activeCategory;
      // Search match
      const query = (internalSearch || searchQuery).toLowerCase().trim();
      const searchMatch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.metaKeywords.some((k) => k.toLowerCase().includes(query));

      return categoryMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-high') return b.startingPrice - a.startingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [activeCategory, internalSearch, searchQuery, sortBy]);

  const handleCategoryClick = (catSlug: string | null) => {
    setActiveCategory(catSlug);
    setVisibleCount(24);
    setShowCategoryGrid(false);
    onSelectCategory(catSlug);
  };

  const displayedServices = filteredServices.slice(0, visibleCount);
  const currentCategoryData = CATEGORIES.find(c => c.slug === activeCategory);

  // Dynamic SEO calculation per category or overall catalog
  const seoTitle = currentCategoryData
    ? `Buy Verified ${currentCategoryData.name} Online | Smmservice.co.uk`
    : PAGES_SEO.services.title;

  const seoDescription = currentCategoryData
    ? `Buy authentic, KYC-verified ${currentCategoryData.name.toLowerCase()} with instant cryptocurrency checkout, guaranteed warranty, and 24/7 delivery on Smmservice.co.uk.`
    : PAGES_SEO.services.metaDescription;

  const seoKeywords = currentCategoryData
    ? [`buy ${currentCategoryData.name.toLowerCase()}`, `verified ${currentCategoryData.name.toLowerCase()}`, `${currentCategoryData.slug}`, 'egsupport24', 'instant delivery']
    : [PAGES_SEO.services.primaryKeyword, ...PAGES_SEO.services.secondaryKeywords];

  const canonicalUrl = currentCategoryData
    ? `/services?category=${currentCategoryData.slug}`
    : '/services';

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services Directory', url: '/services' },
    ...(currentCategoryData ? [{ name: currentCategoryData.name, url: `/services?category=${currentCategoryData.slug}` }] : [])
  ];

  // ItemList Schema for rich catalog display
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: currentCategoryData ? currentCategoryData.name : 'All Verified Digital Assets & SMM Services',
    numberOfItems: filteredServices.length,
    itemListElement: displayedServices.slice(0, 12).map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: s.title,
      url: `${BASE_URL}/service/${s.slug}`
    }))
  };

  const directorySchema = [
    getOrganizationSchema(),
    getBreadcrumbSchema(breadcrumbItems),
    itemListSchema,
    getFAQSchema(PAGES_SEO.services.faqs)
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 sm:py-10">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
        schema={directorySchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Visual Accessible Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <span
            className="hover:text-slate-900 cursor-pointer font-medium"
            onClick={() => handleCategoryClick(null)}
          >
            Home
          </span>
          <span>/</span>
          <button
            onClick={() => handleCategoryClick(null)}
            className={`cursor-pointer ${!activeCategory ? 'font-bold text-slate-900' : 'hover:text-slate-900'}`}
          >
            Services Directory
          </button>
          {currentCategoryData && (
            <>
              <span>/</span>
              <span className="font-bold text-slate-900">{currentCategoryData.name}</span>
            </>
          )}
        </nav>

        {/* Marketplace Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200/60">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smmservice.co.uk Official Marketplace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                {currentCategoryData ? `Buy Verified ${currentCategoryData.name}` : 'All Digital Assets & SMM Services'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentCategoryData
                  ? currentCategoryData.description
                  : `Browse all ${SERVICES.length}+ verified payment gateways, aged accounts, 5-star Google & Trustpilot review campaigns, social growth packages, and organic SEO backlinks.`}
              </p>
            </div>

            {/* Quick Contact & VIP Order */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                title="Connect with VIP Telegram Support @EgSupport24"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram Support</span>
              </a>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                title="WhatsApp customer support desk"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Active Filter Pill Alert if category selected */}
          {activeCategory && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs">
              <div className="flex items-center gap-2">
                <BrandLogo name={currentCategoryData?.name || ''} size="xs" />
                <span className="text-emerald-950 font-bold">
                  Filtering by: <u>{currentCategoryData?.name}</u> ({filteredServices.length} services)
                </span>
              </div>
              <button
                onClick={() => handleCategoryClick(null)}
                className="text-emerald-800 hover:text-emerald-950 font-extrabold flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-emerald-300"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All Services</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Navigation Bar with Grid Toggle and Dropdown for Mobile */}
        <section aria-labelledby="catalog-categories-heading" className="space-y-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <h2 id="catalog-categories-heading" className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Browse Categories ({CATEGORIES.length})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile direct category dropdown */}
              <div className="sm:hidden">
                <select
                  value={activeCategory || ''}
                  onChange={(e) => handleCategoryClick(e.target.value ? e.target.value : null)}
                  className="text-xs font-bold bg-slate-100 text-slate-900 border border-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none"
                  aria-label="Filter by category"
                >
                  <option value="">All Categories ({SERVICES.length})</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.slug}>
                      {c.name} ({c.serviceCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggle to expand / collapse all categories grid */}
              <button
                onClick={() => setShowCategoryGrid(!showCategoryGrid)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                <span>{showCategoryGrid ? 'Collapse Categories' : 'View All 14 Categories'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCategoryGrid ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick Category Chips Carousel / Wrap */}
          {!showCategoryGrid ? (
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeCategory === null
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>All Catalog</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  activeCategory === null ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {SERVICES.length}
                </span>
              </button>

              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <BrandLogo name={cat.name} size="xs" />
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {cat.serviceCount}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Full Expanded 14 Categories Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-slate-100 animate-in fade-in duration-150">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`p-3 rounded-2xl text-left flex flex-col justify-between gap-2 transition-all cursor-pointer border ${
                  activeCategory === null
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-slate-50 text-slate-800 hover:bg-white hover:border-emerald-400 border-slate-200'
                }`}
              >
                <div className="text-xs font-black">All Catalog</div>
                <div className="text-[10px] font-bold text-slate-400">{SERVICES.length} total services</div>
              </button>

              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={`p-2.5 rounded-2xl text-left flex flex-col justify-between gap-1.5 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                        : 'bg-slate-50 text-slate-800 hover:bg-white hover:border-emerald-400 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <BrandLogo name={cat.name} size="xs" />
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {cat.serviceCount}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">{cat.name}</div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Filter, Search & View Switcher Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, platform, keywords (e.g. PayPal, Stripe, Yelp, YouTube, Cash App)..."
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
            />
            {internalSearch && (
              <button
                onClick={() => setInternalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort options"
                className="text-xs font-bold bg-transparent text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid vs List */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Compact List View"
                aria-label="Compact List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>
            Showing <strong className="text-slate-900">{displayedServices.length}</strong> of{' '}
            <strong className="text-slate-900">{filteredServices.length}</strong> services
            {activeCategory && ` in ${currentCategoryData?.name}`}
          </span>
          {visibleCount < filteredServices.length && (
            <button
              onClick={() => setVisibleCount(filteredServices.length)}
              className="text-emerald-700 hover:underline font-bold cursor-pointer"
            >
              Show all ({filteredServices.length}) at once
            </button>
          )}
        </div>

        {/* Services List / Grid View */}
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No matching services found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any results for "{internalSearch}". Try searching for popular terms like PayPal, Binance, Stripe, Google Reviews, or Instagram.
            </p>
            <button
              onClick={() => {
                setInternalSearch('');
                setActiveCategory(null);
                setVisibleCount(24);
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={onSelectService}
              />
            ))}
          </div>
        ) : (
          /* Compact Table / List View */
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service.slug)}
                className="p-4 sm:p-5 hover:bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors cursor-pointer group"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <BrandLogo name={service.title} size="md" />
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                        {service.category}
                      </span>
                      {service.badge && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {service.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{service.rating}</span>
                        <span className="text-slate-400 font-normal">({service.reviewCount})</span>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {service.shortDescription.split('\n')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">From</span>
                    <span className="text-base sm:text-lg font-black text-slate-950">
                      {formatPrice(service.startingPrice)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service.slug);
                    }}
                    className="px-4 py-2 bg-slate-900 group-hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More and Show All Controls */}
        {visibleCount < filteredServices.length && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Load +24 More Services ({filteredServices.length - visibleCount} remaining)
            </button>
            <button
              onClick={() => setVisibleCount(filteredServices.length)}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-2xl text-xs font-bold transition-all cursor-pointer"
            >
              Show All {filteredServices.length} Services
            </button>
          </div>
        )}

        {/* Directory Page FAQs */}
        <section aria-labelledby="directory-faqs-heading" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Directory Knowledge Base
            </span>
            <h2 id="directory-faqs-heading" className="text-xl sm:text-2xl font-black text-slate-950">
              Frequently Asked Questions About Our Catalog
            </h2>
          </div>

          <div className="divide-y divide-slate-200 pt-2">
            {PAGES_SEO.services.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 hover:text-emerald-600 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {faq.answer}
                    </p>
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
