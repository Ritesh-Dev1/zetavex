import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import TeamSection from '@/components/home/TeamSection';
import ContactSection from '@/components/home/ContactSection';
import { getActiveTeamMembers } from '@/lib/supabase/admin';
import { COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, Award, FileBadge, Home, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600; // Static Edge ISR Caching

export const metadata: Metadata = {
  title: 'Leadership & Engineering Team | Vivek Chauhan | ZetaVex',
  description:
    'Meet Founder Vivek Chauhan and the engineering architects driving custom web application and healthcare software development at ZetaVex.',
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: `${SITE_URL}/team`,
  },
  openGraph: {
    title: 'Leadership & Engineering Team | Vivek Chauhan | ZetaVex',
    description:
      'Meet Founder Vivek Chauhan and the engineering architects driving custom web application and healthcare software development at ZetaVex.',
    url: `${SITE_URL}/team`,
    type: 'website',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Leadership Team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leadership & Engineering Team | Vivek Chauhan | ZetaVex',
    description:
      'Meet Founder Vivek Chauhan and the engineering architects driving custom web application and healthcare software development at ZetaVex.',
    images: ['/logo.png'],
  },
};

export default async function TeamPage() {
  const team = await getActiveTeamMembers();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Leadership & Team', url: '/team' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B] overflow-x-hidden w-full max-w-full">
      <JsonLd data={breadcrumbSchema} />
      <Header />

      {/* Hero Page Banner */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-gradient-to-b from-[#F4F1EA]/80 to-[#FAF8F5] border-b border-[#EBE8E1]">
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-warm-grid [background-size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-semibold text-[#78716C] mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-[#FF5500] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#DCD8CF]" />
            <span className="text-[#0A0A0B] font-bold">Leadership &amp; Team</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Leadership &amp; Technical Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0B] max-w-4xl leading-tight">
            Architects Driving Digital Innovation
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-[#57534E] max-w-3xl leading-relaxed">
            Led by Founder &amp; Proprietor <strong>Vivek Chauhan</strong>, ZetaVex Tech Solutions operates as a trusted <strong>digital transformation solutions company</strong> and <strong>custom web application development company</strong> delivering robust software architectures.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Connect with Vivek on WhatsApp</span>
            </a>
            <Link
              href="/#contact"
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#1C1917] bg-white hover:bg-[#F4F1EA] rounded-xl border border-[#DCD8CF] transition-colors"
            >
              <span>Initiate Project Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Full Leadership Team Directory Grid */}
      <TeamSection initialTeam={team} isSlider={false} />

      {/* Philosophy & Credentials Banner */}
      <section className="py-16 bg-[#F4F1EA]/60 border-t border-[#EBE8E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE8E1] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0A0A0B] mb-2">Direct Founder Engagement</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Work directly with senior architectural leaders on every sprint, ensuring zero communication lag and maximum delivery precision.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE8E1] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-4">
                <FileBadge className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0A0A0B] mb-2">MSME Govt. Verified</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Officially registered under MSME Udyam Registration No. <strong className="text-[#0A0A0B] font-mono">{COMPANY_INFO.udyamRegNo}</strong> in Rewari, Haryana, India.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE8E1] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500] mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0A0A0B] mb-2">Universal Tech Stack</h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Expertise across all modern frontend frameworks, backend engines, microservices, cloud deployments, and mobile environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <Footer />
      <FloatingActions />
      <MobileNav />
    </main>
  );
}
