import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { SEOHead } from '../components/SEOHead';
import { PAGE_SEO, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from '../data/seoData';
import { 
  BookOpen, Clock, Calendar, ArrowRight, User, ChevronRight, 
  Search, ShieldCheck, CheckCircle2, Share2, HelpCircle, ExternalLink
} from 'lucide-react';

interface BlogPageProps {
  initialSlug?: string | null;
  onSelectPost?: (slug: string) => void;
  onSelectService?: (serviceSlug: string) => void;
  onNavigateHome?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  initialSlug,
  onSelectPost,
  onSelectService,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activePost = initialSlug ? BLOG_POSTS.find((p) => p.slug === initialSlug) : null;

  const categories = [
    { id: 'all', name: 'All Insights' },
    { id: 'Payment Infrastructure', name: 'Payment Gateways' },
    { id: 'Advertising Assets', name: 'Media Buying & Ads' },
    { id: 'Reputation & SEO', name: 'Google Reviews & SEO' },
    { id: 'Crypto Infrastructure', name: 'Crypto & Exchanges' }
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // If viewing a single post
  if (activePost) {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: activePost.title, url: `/blog/${activePost.slug}` }
    ];

    const schemas = [
      getArticleSchema(activePost),
      getBreadcrumbSchema(breadcrumbs),
      getFAQSchema(activePost.faqs)
    ];

    return (
      <div className="bg-slate-50 min-h-screen pb-20">
        <SEOHead
          title={`${activePost.title} | Smmservice.co.uk`}
          description={activePost.metaDescription}
          keywords={[activePost.primaryKeyword, ...activePost.secondaryKeywords]}
          canonicalUrl={`https://smmservice.co.uk/blog/${activePost.slug}`}
          breadcrumbs={breadcrumbs}
          schemas={schemas}
        />

        {/* Article Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => onNavigateHome?.()}
              className="hover:text-emerald-600 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 shrink-0" />
            <button
              onClick={() => onSelectPost?.('')}
              className="hover:text-emerald-600 transition-colors"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-medium truncate max-w-xs sm:max-w-md">
              {activePost.title}
            </span>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-white border-b border-slate-200 pt-8 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
              <BookOpen className="w-3.5 h-3.5" />
              {activePost.category}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              {activePost.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-slate-100 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-slate-900">{activePost.author.name}</div>
                  <div className="text-xs text-slate-500">{activePost.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {activePost.updatedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {activePost.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10">
            {/* Featured Image */}
            <div className="mb-8 rounded-xl overflow-hidden border border-slate-100">
              <img
                src={activePost.coverImage}
                alt={activePost.imageAlt}
                className="w-full h-64 sm:h-96 object-cover"
                loading="eager"
              />
            </div>

            {/* Key Takeaways Box for AEO / Quick Answers */}
            <div className="mb-10 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-base mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                Key Strategic Takeaways (Quick Overview)
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {activePost.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content HTML */}
            <div 
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2"
              dangerouslySetInnerHTML={{ __html: activePost.contentHtml }}
            />

            {/* Contextual Commercial CTA Box */}
            <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 sm:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase mb-2">
                    Verified Digital Infrastructure
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Need Pre-Verified {activePost.targetServiceTitle}?
                  </h3>
                  <p className="text-slate-300 text-sm max-w-xl">
                    Skip onboarding bottlenecks, identity verification delays, and spend caps. Get fully verified assets with 30-day replacement warranty.
                  </p>
                </div>
                <button
                  onClick={() => onSelectService?.(activePost.targetServiceSlug)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Order Asset Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            {activePost.faqs.length > 0 && (
              <div className="mt-14 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-emerald-600" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {activePost.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                      <h3 className="font-bold text-slate-900 text-base mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author E-E-A-T Bio Box */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shrink-0"
                />
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-base">{activePost.author.name}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                      Verified Author
                    </span>
                  </div>
                  <div className="text-xs text-emerald-700 font-medium mb-2">{activePost.author.role}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {activePost.author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Blog Hub Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => onSelectPost?.('')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                ← Back to All Strategic Insights & Guides
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Blog Directory Listing
  const seoInfo = PAGE_SEO.blog;
  const breadcrumbs = seoInfo.breadcrumbs;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <SEOHead
        title={seoInfo.title}
        description={seoInfo.metaDescription}
        keywords={[seoInfo.primaryKeyword, ...seoInfo.secondaryKeywords]}
        canonicalUrl="https://smmservice.co.uk/blog"
        breadcrumbs={breadcrumbs}
        schemas={[
          getBreadcrumbSchema(breadcrumbs),
          getFAQSchema(seoInfo.faqs)
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-4 border border-emerald-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            Topical Authority & Fintech Insights
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {seoInfo.h1}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Technical masterclasses, setup protocols, anti-detect browser configurations, and media buying blueprints authored by real infrastructure engineers.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides (e.g. Stripe, Agency Ads, Google Reviews, KYC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => onSelectPost?.(post.slug)}
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.updatedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
            <p className="text-slate-500 text-sm mb-4">
              Try adjusting your search keywords or filter category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
