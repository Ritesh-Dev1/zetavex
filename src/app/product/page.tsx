import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import ProductsCatalog from '@/components/products/ProductsCatalog';
import ContactSection from '@/components/home/ContactSection';
import { INITIAL_PRODUCTS, COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowRight, Home, ChevronRight, Cpu, Cloud, Server, ShieldCheck, Layers } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600; // Static Edge ISR Caching

export const metadata: Metadata = {
  title: 'Company Products & SaaS Solutions | ZetaVex Tech Solutions',
  description:
    'Explore in-house SaaS platforms, autonomous AI engines, clinical health suites, and enterprise software products engineered by ZetaVex Tech Solutions.',
  keywords: [
    ...PRIMARY_KEYWORDS,
    'ZetaVex products',
    'SaaS software products',
    'ZetaPulse AI',
    'OmniSync CRM',
    'MediVex clinical software',
    'enterprise SaaS platforms India'
  ],
  alternates: {
    canonical: `${SITE_URL}/product`,
  },
  openGraph: {
    title: 'Company Products & SaaS Solutions | ZetaVex Tech Solutions',
    description:
      'Explore in-house SaaS platforms, autonomous AI engines, clinical health suites, and enterprise software products engineered by ZetaVex Tech Solutions.',
    url: `${SITE_URL}/product`,
    type: 'website',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Products & SaaS Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Products & SaaS Solutions | ZetaVex Tech Solutions',
    description:
      'Explore in-house SaaS platforms, autonomous AI engines, clinical health suites, and enterprise software products engineered by ZetaVex Tech Solutions.',
    images: ['/logo.png'],
  },
};

export default function ProductPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/product' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  // Schema.org ItemList Schema for Product Catalog
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ZetaVex In-House Software Products & SaaS Platforms',
    description: 'Proprietary enterprise SaaS products, AI workflows, and healthtech platforms developed by ZetaVex.',
    itemListElement: INITIAL_PRODUCTS.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: prod.title,
        description: prod.description,
        category: prod.category,
        image: prod.image_url,
        brand: {
          '@type': 'Brand',
          name: COMPANY_INFO.name,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B] overflow-x-hidden w-full max-w-full">
      <JsonLd data={[breadcrumbSchema, productListSchema]} />
      <Header />

      {/* Hero Page Banner */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-gradient-to-b from-[#F4F1EA]/80 to-[#FAF8F5] border-b border-[#EBE8E1]">
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-warm-grid [background-size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
          
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-semibold text-[#78716C] mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-[#FF5500] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#DCD8CF]" />
            <span className="text-[#0A0A0B] font-bold">Products</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proprietary Software &amp; SaaS Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0B] max-w-4xl leading-tight">
            Company Products &amp; SaaS Platforms
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-[#57534E] max-w-3xl leading-relaxed">
            Discover in-house software solutions engineered by <strong>ZetaVex Tech Solutions</strong>. From autonomous AI pipelines to telehealth EHR suites and logistics telemetry, our products deliver enterprise security, high concurrency, and rapid deployment.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Schedule a Product Demo</span>
            </a>
            <Link
              href="/#contact"
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#1C1917] bg-white hover:bg-[#F4F1EA] rounded-xl border border-[#DCD8CF] transition-colors"
            >
              <span>Custom White-Label Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Products Showcase Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsCatalog products={INITIAL_PRODUCTS} />
        </div>
      </section>

      {/* Deployment & Enterprise Support Models */}
      <section className="py-16 bg-[#F4F1EA]/60 border-t border-b border-[#EBE8E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A0A0B] tracking-tight">
              Flexible Deployment Models
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#57534E]">
              Every ZetaVex product can be delivered across multiple cloud infrastructure tiers based on your organizational data sovereignty requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE8E1] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500] mb-4">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0A0A0B] mb-2">Cloud Managed SaaS</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Zero-setup, fully managed multi-tenant cloud hosting with automated backups, edge CDN acceleration, and 99.9% uptime SLA.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE8E1] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-4">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0A0A0B] mb-2">Private VPC / On-Premise</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Dedicated containerized deployment in your AWS, GCP, Azure, or self-hosted bare metal servers for total data compliance.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE8E1] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0A0A0B] mb-2">White-Label &amp; IP Transfer</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Custom branded software with your domain, custom theme tokens, tailored feature modules, and complete source code ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Enquiry */}
      <ContactSection />

      <Footer />
      <FloatingActions />
      <MobileNav />
    </main>
  );
}
