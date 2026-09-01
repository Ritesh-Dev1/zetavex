import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import ServicesSection from '@/components/home/ServicesSection';
import ContactSection from '@/components/home/ContactSection';
import { getActiveServices } from '@/lib/supabase/admin';
import { COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, getServicesListSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowRight, Home, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600; // Static Edge ISR Caching

export const metadata: Metadata = {
  title: 'Web & Custom Healthcare Software Services | ZetaVex',
  description:
    'Explore custom web application development, healthcare software engineering, SaaS platforms, and managed IT services across all modern tech stacks.',
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Web & Healthcare Software Services | ZetaVex',
    description:
      'Explore custom web application development, healthcare software engineering, SaaS platforms, and managed IT services across all modern tech stacks.',
    url: `${SITE_URL}/services`,
    type: 'website',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web & Healthcare Software Services | ZetaVex',
    description:
      'Explore custom web application development, healthcare software engineering, SaaS platforms, and managed IT services across all modern tech stacks.',
    images: ['/logo.png'],
  },
};

export default async function ServicesPage() {
  const services = await getActiveServices();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const servicesListSchema = getServicesListSchema();

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B] overflow-x-hidden w-full max-w-full">
      <JsonLd data={[breadcrumbSchema, servicesListSchema]} />
      <Header />

      {/* Hero Page Banner */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-gradient-to-b from-[#F4F1EA]/80 to-[#FAF8F5] border-b border-[#EBE8E1]">
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-warm-grid [background-size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-semibold text-[#78716C] mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-[#FF5500] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#DCD8CF]" />
            <span className="text-[#0A0A0B] font-bold">Services</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Digital &amp; Managed IT Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0B] max-w-4xl leading-tight">
            Custom Web Application &amp; Healthcare Software Engineering
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-[#57534E] max-w-3xl leading-relaxed">
            As a leading <strong>digital solutions company</strong>, we deliver custom web application development, HIPAA-compliant <strong>healthcare software development</strong>, multi-tenant SaaS architectures, and <strong>managed IT services</strong> engineered across all modern tech stacks.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Request Custom Service Scope</span>
            </a>
            <Link
              href="/projects"
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#1C1917] bg-white hover:bg-[#F4F1EA] rounded-xl border border-[#DCD8CF] transition-colors"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid (3 cards desktop, 2 cards mobile) */}
      <ServicesSection initialServices={services} />

      {/* Contact & Scope Initiation */}
      <ContactSection />

      <Footer />
      <FloatingActions />
      <MobileNav />
    </main>
  );
}
