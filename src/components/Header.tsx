import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, ShieldCheck, Send, MessageCircle, ChevronDown, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Currency } from '../types';
import { CONTACT_INFO } from '../data/cryptoAddresses';
import { CATEGORIES, SERVICES } from '../data/services';
import { BrandLogo } from './BrandLogo';
import { SiteLogo } from './SiteLogo';

interface HeaderProps {
  currentView: string;
  setCurrentView?: (view: string) => void;
  selectedCategory: string | null;
  setSelectedCategory?: (cat: string | null) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  onNavigate?: (view: string, catSlug?: string | null) => void;
  onSelectService?: (slug: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  selectedCategory,
  setSelectedCategory,
  onNavigate,
  onSelectService
}) => {
  const { cartItemCount, setIsCartOpen, currency, setCurrency } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(CATEGORIES[0]?.slug || 'ads-accounts');
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: string, catSlug?: string | null) => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    if (onNavigate) {
      onNavigate(view, catSlug);
    } else {
      if (view === 'services') {
        setSelectedCategory?.(catSlug || null);
        setCurrentView?.('services');
      } else {
        setCurrentView?.(view);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (slug: string) => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    if (onSelectService) {
      onSelectService(slug);
    } else if (onNavigate) {
      onNavigate(`service/${slug}`);
    } else {
      window.history.pushState(null, '', `/service/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered services in the mega menu
  const activeCategory = CATEGORIES.find(c => c.slug === activeCategorySlug) || CATEGORIES[0];
  const servicesInActiveCategory = SERVICES.filter(s => s.categorySlug === activeCategorySlug);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Main Top Bar: [Brand] - [Nav] - [Actions] */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-18 flex items-center justify-between">
        {/* Brand Zone */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg cursor-pointer shrink-0"
        >
          <SiteLogo size="md" variant="dark" showTagline={false} />
        </button>

        {/* Navigation Zone */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" ref={megaMenuRef}>
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          {/* Services & Categories Mega Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              onMouseEnter={() => setMegaMenuOpen(true)}
              className={`px-3 py-2 text-xs xl:text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                megaMenuOpen || currentView === 'services'
                  ? 'text-emerald-600 bg-emerald-50/80'
                  : 'text-slate-800 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Services & Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Mega Menu Dropdown */}
            {megaMenuOpen && (
              <div
                onMouseLeave={() => setMegaMenuOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[900px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {/* Clean Header inside mega menu */}
                <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Explore All 250+ Digital Assets & Verified Services
                    </span>
                  </div>
                  <button
                    onClick={() => handleNavClick('services', null)}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <span>View Full Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Body: Left Categories / Right Services */}
                <div className="grid grid-cols-12 max-h-[480px]">
                  {/* Left: 14 Categories */}
                  <div className="col-span-5 bg-slate-50 p-2.5 border-r border-slate-200 overflow-y-auto max-h-[480px] space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Category ({CATEGORIES.length})
                    </div>
                    {CATEGORIES.map((cat) => {
                      const isSelected = cat.slug === activeCategorySlug;
                      return (
                        <div
                          key={cat.id}
                          onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                          onClick={() => setActiveCategorySlug(cat.slug)}
                          className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-emerald-800 font-bold shadow-xs border border-emerald-500/40'
                              : 'text-slate-700 hover:bg-slate-200/60 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <BrandLogo name={cat.name} size="sm" />
                            <span className="text-xs truncate">{cat.name}</span>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                            isSelected ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {cat.serviceCount}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right: Services in Active Category */}
                  <div className="col-span-7 p-4 overflow-y-auto max-h-[480px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{activeCategory?.name}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{activeCategory?.description}</p>
                        </div>
                        <button
                          onClick={() => handleNavClick('services', activeCategorySlug)}
                          className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                        >
                          <span>View All ({servicesInActiveCategory.length})</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5">
                        {servicesInActiveCategory.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => handleServiceSelect(service.slug)}
                            className="p-2 rounded-lg hover:bg-slate-50 hover:border-slate-300 border border-transparent flex items-center justify-between gap-2 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <BrandLogo name={service.title} size="sm" />
                              <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-600 truncate">
                                {service.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-bold text-slate-950 bg-slate-100 px-2 py-0.5 rounded">
                                ${service.startingPrice}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Instant Delivery & 24/7 Support
                      </span>
                      <button
                        onClick={() => handleNavClick('services', activeCategorySlug)}
                        className="font-bold text-slate-900 hover:text-emerald-600 cursor-pointer"
                      >
                        Browse {activeCategory?.name} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('pricing')}
            className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              currentView === 'pricing'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Pricing
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              currentView === 'faq'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            FAQ
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              currentView === 'blog'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Blog
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              currentView === 'about'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              currentView === 'contact'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Zone: Currency, Cart & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Currency Switcher (Desktop only) */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            aria-label="Select Currency"
            className="hidden sm:block text-xs font-bold bg-slate-100 text-slate-900 border border-slate-300 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="GBP">GBP (£)</option>
            <option value="EUR">EUR (€)</option>
            <option value="USDT">USDT</option>
          </select>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 sm:gap-2 bg-slate-950 text-white hover:bg-slate-800 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="ml-0.5 bg-emerald-500 text-slate-950 font-black text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-3.5 pt-3 pb-8 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Quick links */}
          <div className="grid grid-cols-4 gap-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services', null)}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'services' && !selectedCategory
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'pricing'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'faq'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'blog'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'about'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavClick('track-order')}
              className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-colors cursor-pointer ${
                currentView === 'track-order'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Track Order
            </button>
          </div>

          {/* Submenu Accordion: Service Categories */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              <span>Categories ({CATEGORIES.length})</span>
              <button
                onClick={() => handleNavClick('services', null)}
                className="text-emerald-600 normal-case font-bold text-xs cursor-pointer"
              >
                View Full Catalog →
              </button>
            </div>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isExpanded = mobileExpandedCat === cat.slug;
                const catServices = SERVICES.filter(s => s.categorySlug === cat.slug);

                return (
                  <div key={cat.id} className="border border-slate-200/90 rounded-xl overflow-hidden bg-slate-50/50">
                    <button
                      onClick={() => setMobileExpandedCat(isExpanded ? null : cat.slug)}
                      className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-100/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BrandLogo name={cat.name} size="xs" />
                        <span className="text-xs font-bold text-slate-900 truncate">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-[10px] font-bold bg-white text-slate-700 px-1.5 py-0.5 rounded-full border border-slate-200">
                          {cat.serviceCount}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-2 bg-white divide-y divide-slate-100 max-h-56 overflow-y-auto border-t border-slate-100">
                        {catServices.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => handleServiceSelect(service.slug)}
                            className="py-2 px-2 flex items-center justify-between gap-2 hover:bg-emerald-50/50 rounded-lg cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <BrandLogo name={service.title} size="xs" />
                              <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 truncate">
                                {service.title}
                              </span>
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-900 bg-slate-100 group-hover:bg-emerald-100 group-hover:text-emerald-900 px-1.5 py-0.5 rounded shrink-0">
                              ${service.startingPrice}
                            </span>
                          </div>
                        ))}
                        <div className="pt-2 text-center">
                          <button
                            onClick={() => handleNavClick('services', cat.slug)}
                            className="text-xs font-black text-emerald-600 hover:text-emerald-800 py-1 block w-full text-center"
                          >
                            Browse all {cat.serviceCount} {cat.name} →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Telegram & WhatsApp buttons */}
          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-sky-50 text-sky-700 py-2.5 rounded-xl font-bold text-xs border border-sky-200 hover:bg-sky-100 transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Telegram
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 py-2.5 rounded-xl font-bold text-xs border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
