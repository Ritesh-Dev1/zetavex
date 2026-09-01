import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import ProjectsSection from '@/components/home/ProjectsSection';
import ContactSection from '@/components/home/ContactSection';
import { getPublishedProjects } from '@/lib/supabase/admin';
import { COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowRight, Home, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Production Case Studies & Enterprise Software Portfolio',
  description:
    'Explore production case studies from ZetaVex Tech Solutions — enterprise web apps, SaaS platforms, healthcare software applications, and digital transformation solutions.',
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: 'Production Case Studies & Enterprise Software Portfolio | ZetaVex',
    description: 'Explore live web apps, SaaS platforms, and healthcare software engineered by ZetaVex Tech Solutions.',
    url: `${SITE_URL}/projects`,
    type: 'website',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Projects Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Production Case Studies & Enterprise Software Portfolio | ZetaVex',
    description: 'Enterprise web apps, SaaS platforms, and custom healthcare software case studies.',
    images: ['/logo.png'],
  },
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Portfolio & Case Studies', url: '/projects' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B]">
      <JsonLd data={breadcrumbSchema} />
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
            <span className="text-[#0A0A0B] font-bold">Portfolio</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven In Production</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0B] max-w-4xl leading-tight">
            Production Portfolio &amp; Case Studies
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-[#57534E] max-w-3xl leading-relaxed">
            Explore live production systems engineered by a leading <strong>custom web application development company</strong> and <strong>healthcare software development company</strong>. Real-world solutions delivering high concurrency, security, and measurable ROI.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Discuss Your Project Architecture</span>
            </a>
            <Link
              href="/services"
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#1C1917] bg-white hover:bg-[#F4F1EA] rounded-xl border border-[#DCD8CF] transition-colors"
            >
              <span>View Services Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Grid (3 cards desktop, 2 cards mobile) */}
      <ProjectsSection initialProjects={projects} />

      {/* Contact & Enquiry */}
      <ContactSection />

      <Footer />
      <FloatingActions />
      <MobileNav />
    </main>
  );
}
