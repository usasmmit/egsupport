import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  schemas?: Record<string, any> | Array<Record<string, any>>;
  breadcrumbs?: BreadcrumbItem[];
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://smmservice.co.uk/og-banner.png',
  schema,
  schemas,
  breadcrumbs,
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Robots
    if (noIndex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Meta Description & Keywords
    setMeta('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }

    // OpenGraph Tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'Smmservice.co.uk');

    // Canonical & OG URL
    const fullUrl = canonicalUrl 
      ? (canonicalUrl.startsWith('http') ? canonicalUrl : `https://smmservice.co.uk${canonicalUrl}`)
      : window.location.href;
    
    setMeta('property', 'og:url', fullUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 3. Inject JSON-LD Schema
    const existingScript = document.getElementById('page-jsonld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const schemasToInject = schemas || schema;
    if (schemasToInject) {
      const script = document.createElement('script');
      script.id = 'page-jsonld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemasToInject);
      document.head.appendChild(script);
    }

    return () => {
      const currentScript = document.getElementById('page-jsonld-schema');
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schema, schemas, breadcrumbs, noIndex]);

  return null;
};
