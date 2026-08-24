import React, { useState, useEffect, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CryptoCheckoutModal } from './components/CryptoCheckoutModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { HomePage } from './pages/HomePage';
import { ServicesDirectoryPage } from './pages/ServicesDirectoryPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { PaymentGuidePage } from './pages/PaymentGuidePage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { LegalPage } from './pages/LegalPage';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SERVICES, CATEGORIES } from './data/services';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>('');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState<string>('');

  // Route Resolver from standard HTML5 pathname & search
  const syncRouteFromLocation = useCallback(() => {
    let pathname = window.location.pathname.toLowerCase().trim();
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    const searchParams = new URLSearchParams(window.location.search);

    // If an old legacy hashtag exists, automatically strip it and replace with clean SEO path!
    if (hash) {
      let cleanPath = '/' + hash;
      if (hash.startsWith('service/')) {
        cleanPath = '/service/' + hash.replace('service/', '');
      } else if (hash.startsWith('blog/')) {
        cleanPath = '/blog/' + hash.replace('blog/', '');
      } else if (hash === 'home' || hash === '') {
        cleanPath = '/';
      }
      
      const targetUrl = cleanPath + (window.location.search || '');
      window.history.replaceState(null, '', targetUrl);
      pathname = cleanPath.toLowerCase();
    }

    // Support both root custom domain (smmservice.co.uk) and github.io subpath (/egsupport)
    if (pathname.startsWith('/egsupport')) {
      pathname = pathname.replace(/^\/egsupport/, '') || '/';
    }

    // Strip trailing slashes
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    // 1. Root / Home
    if (!pathname || pathname === '/' || pathname === '/home') {
      setCurrentView('home');
      setSelectedServiceSlug('');
      setSelectedBlogSlug('');
      return;
    }

    // 2. Single Service Page: /service/:slug or /services/:slug
    if (pathname.startsWith('/service/')) {
      const slug = pathname.replace('/service/', '').trim();
      const serviceItem = SERVICES.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
      if (serviceItem) {
        setSelectedServiceSlug(serviceItem.slug);
        setCurrentView('service-detail');
      } else {
        setCurrentView('404');
      }
      return;
    }

    // 3. Services Directory: /services or /services/:catSlug
    if (pathname === '/services') {
      const categoryParam = searchParams.get('category');
      setSelectedCategory(categoryParam || null);
      setCurrentView('services');
      return;
    }

    if (pathname.startsWith('/services/')) {
      const subSlug = pathname.replace('/services/', '').trim();
      // Check if it matches a service
      const serviceItem = SERVICES.find((s) => s.slug.toLowerCase() === subSlug.toLowerCase());
      if (serviceItem) {
        setSelectedServiceSlug(serviceItem.slug);
        setCurrentView('service-detail');
        return;
      }
      // Check if it matches a category
      const catItem = CATEGORIES.find((c) => c.slug.toLowerCase() === subSlug.toLowerCase());
      if (catItem) {
        setSelectedCategory(catItem.slug);
        setCurrentView('services');
        return;
      }
      setCurrentView('404');
      return;
    }

    // 4. Blog: /blog or /blog/:slug
    if (pathname === '/blog') {
      setSelectedBlogSlug('');
      setCurrentView('blog');
      return;
    }

    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').trim();
      setSelectedBlogSlug(slug);
      setCurrentView('blog');
      return;
    }

    // 5. Distinct Static Pages
    if (pathname === '/pricing') {
      setCurrentView('pricing');
      return;
    }

    if (pathname === '/faq') {
      setCurrentView('faq');
      return;
    }

    if (pathname === '/track-order') {
      const orderParam = searchParams.get('id') || searchParams.get('orderId') || '';
      if (orderParam) setTrackedOrderId(orderParam);
      setCurrentView('track-order');
      return;
    }

    if (pathname === '/payment-guide') {
      setCurrentView('payment-guide');
      return;
    }

    if (pathname === '/about') {
      setCurrentView('about');
      return;
    }

    if (pathname === '/contact') {
      setCurrentView('contact');
      return;
    }

    if (pathname === '/terms') {
      setCurrentView('terms');
      return;
    }

    if (pathname === '/privacy' || pathname === '/privacy-policy') {
      setCurrentView('privacy');
      return;
    }

    if (pathname === '/refunds' || pathname === '/refund-policy') {
      setCurrentView('refunds');
      return;
    }

    if (pathname === '/legal') {
      setCurrentView('terms');
      return;
    }

    // 6. Fallback 404
    setCurrentView('404');
  }, []);

  // Listen to popstate (back/forward button) and initial load
  useEffect(() => {
    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    return () => window.removeEventListener('popstate', syncRouteFromLocation);
  }, [syncRouteFromLocation]);

  // Central Navigation Handler with History PushState
  const navigateTo = (path: string, options?: { replace?: boolean; scroll?: boolean }) => {
    const isSubpath = window.location.pathname.startsWith('/egsupport');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const fullPath = (isSubpath ? '/egsupport' : '') + cleanPath;
    
    if (options?.replace) {
      window.history.replaceState(null, '', fullPath);
    } else {
      window.history.pushState(null, '', fullPath);
    }
    syncRouteFromLocation();
    if (options?.scroll !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToService = (slug: string) => {
    navigateTo(`/service/${slug}`);
  };

  const navigateToCategory = (categorySlug: string | null) => {
    if (categorySlug) {
      navigateTo(`/services?category=${categorySlug}`);
    } else {
      navigateTo('/services');
    }
  };

  const navigateToBlogPost = (slug?: string) => {
    if (slug) {
      navigateTo(`/blog/${slug}`);
    } else {
      navigateTo('/blog');
    }
  };

  const handleGenericNavigate = (viewOrPath: string, catSlug?: string | null) => {
    if (viewOrPath === 'home' || viewOrPath === '/') {
      navigateTo('/');
    } else if (viewOrPath === 'services') {
      if (catSlug) {
        navigateTo(`/services?category=${catSlug}`);
      } else {
        navigateTo('/services');
      }
    } else if (viewOrPath.startsWith('service/')) {
      const slug = viewOrPath.replace('service/', '');
      navigateToService(slug);
    } else if (viewOrPath.startsWith('service-detail-')) {
      const slug = viewOrPath.replace('service-detail-', '');
      navigateToService(slug);
    } else if (viewOrPath.startsWith('blog/')) {
      const slug = viewOrPath.replace('blog/', '');
      navigateToBlogPost(slug);
    } else if (viewOrPath.startsWith('blog-')) {
      const slug = viewOrPath.replace('blog-', '');
      navigateToBlogPost(slug);
    } else if (viewOrPath === 'blog') {
      navigateTo('/blog');
    } else if (viewOrPath === 'pricing') {
      navigateTo('/pricing');
    } else if (viewOrPath === 'faq') {
      navigateTo('/faq');
    } else if (viewOrPath === 'about') {
      navigateTo('/about');
    } else if (viewOrPath === 'contact') {
      navigateTo('/contact');
    } else if (viewOrPath === 'track-order') {
      navigateTo('/track-order');
    } else if (viewOrPath === 'payment-guide') {
      navigateTo('/payment-guide');
    } else if (viewOrPath === 'terms') {
      navigateTo('/terms');
    } else if (viewOrPath === 'privacy') {
      navigateTo('/privacy');
    } else if (viewOrPath === 'refunds') {
      navigateTo('/refunds');
    } else if (viewOrPath === 'legal') {
      navigateTo('/terms');
    } else {
      navigateTo(`/${viewOrPath.replace(/^\//, '')}`);
    }
  };

  const handleOrderSuccess = (orderId: string) => {
    setTrackedOrderId(orderId);
    navigateTo(`/track-order?id=${orderId}`);
  };

  // Find active service if in service-detail view
  const currentService =
    SERVICES.find((s) => s.slug === selectedServiceSlug) || SERVICES[0];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-950">
      {/* Top Header */}
      <Header
        currentView={currentView}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigate={handleGenericNavigate}
        onSelectService={navigateToService}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onSelectService={navigateToService}
            onSelectCategory={navigateToCategory}
            onExploreAll={() => navigateTo('/services')}
          />
        )}

        {currentView === 'services' && (
          <ServicesDirectoryPage
            initialCategory={selectedCategory}
            searchQuery={searchQuery}
            onSelectService={navigateToService}
            onSelectCategory={navigateToCategory}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailPage
            service={currentService}
            onInstantCheckout={() => setIsCheckoutModalOpen(true)}
            onNavigateToCategory={navigateToCategory}
            onSelectService={navigateToService}
          />
        )}

        {currentView === 'pricing' && (
          <PricingPage
            onSelectService={navigateToService}
            onInstantCheckout={() => setIsCheckoutModalOpen(true)}
          />
        )}

        {currentView === 'faq' && (
          <FAQPage
            onNavigateContact={() => navigateTo('/contact')}
            onExploreServices={() => navigateTo('/services')}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage
            initialSlug={selectedBlogSlug}
            onSelectPost={navigateToBlogPost}
            onSelectService={navigateToService}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {currentView === 'track-order' && (
          <OrderTrackingPage initialOrderId={trackedOrderId} />
        )}

        {currentView === 'payment-guide' && <PaymentGuidePage />}

        {currentView === 'about' && (
          <AboutPage
            onExploreServices={() => navigateTo('/services')}
            onNavigateToView={handleGenericNavigate}
          />
        )}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'terms' && (
          <LegalPage type="terms" onNavigateTab={(tab) => handleGenericNavigate(tab)} />
        )}
        {currentView === 'privacy' && (
          <LegalPage type="privacy" onNavigateTab={(tab) => handleGenericNavigate(tab)} />
        )}
        {currentView === 'refunds' && (
          <LegalPage type="refunds" onNavigateTab={(tab) => handleGenericNavigate(tab)} />
        )}

        {currentView === '404' && (
          <NotFoundPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateServices={() => navigateTo('/services')}
            onNavigatePricing={() => navigateTo('/pricing')}
            onNavigateFAQ={() => navigateTo('/faq')}
            onSelectService={navigateToService}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleGenericNavigate} />

      {/* Cart Drawer */}
      <CartDrawer
        onCheckout={() => setIsCheckoutModalOpen(true)}
        onNavigateToService={navigateToService}
      />

      {/* Crypto Multi-Step Checkout Modal */}
      <CryptoCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating 24/7 Live Support Desk */}
      <LiveChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
