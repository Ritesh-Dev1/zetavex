import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import { COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { FileText, ArrowLeft, ShieldCheck, Mail, CheckCircle2, Home, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — ZetaVex Tech Solutions',
  description:
    'Review the Terms and Conditions governing software engineering services, intellectual property, and client engagements with ZetaVex Tech Solutions.',
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  openGraph: {
    title: 'Terms & Conditions | ZetaVex Tech Solutions',
    description: 'Terms and conditions governing client software engineering engagements with ZetaVex Tech Solutions.',
    url: `${SITE_URL}/terms-and-conditions`,
    type: 'article',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Terms and Conditions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | ZetaVex Tech Solutions',
    description: 'Terms and conditions governing client software engineering engagements with ZetaVex Tech Solutions.',
    images: ['/logo.png'],
  },
};

export default function TermsAndConditionsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms & Conditions', url: '/terms-and-conditions' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B]">
      <JsonLd data={breadcrumbSchema} />
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-gradient-to-b from-[#F4F1EA] to-[#FAF8F5] border-b border-[#EBE8E1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-semibold text-[#78716C] mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-[#FF5500] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#DCD8CF]" />
            <span className="text-[#0A0A0B] font-bold">Terms &amp; Conditions</span>
          </nav>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EBE8E1] text-[11px] font-bold text-[#FF5500] uppercase tracking-wider w-fit mb-3">
            <FileText className="w-3 h-3" />
            <span>Client Service Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0B] mb-4">
            Terms &amp; Conditions
          </h1>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Last Updated: August 31, 2026 · Governing all commercial engagements with ZetaVex Tech Solutions
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EBE8E1] shadow-xs flex flex-col gap-10 text-[#44403C] text-sm sm:text-base leading-relaxed">
            {/* 1. Agreement */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">01.</span>
                <span>Agreement to Terms</span>
              </h2>
              <p>
                By accessing this website, requesting project consultations, or entering into software development statements of work (SOW) with <strong>{COMPANY_INFO.name}</strong>, you agree to be bound by these Terms and Conditions. If you disagree with any portion of these terms, you should refrain from utilizing our services.
              </p>
            </div>

            {/* 2. Services & Project Scope */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">02.</span>
                <span>Engineering Services &amp; Milestones</span>
              </h2>
              <p>
                {COMPANY_INFO.name} provides custom software engineering services, including full-stack web applications, SaaS platform development, mobile applications, cloud DevOps orchestration, and UI/UX product design across all modern tech stacks.
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                <li>Every commercial project is governed by a mutually agreed scope of work, technical architecture document, and sprint delivery schedule.</li>
                <li>Any material changes to project scope during development may require an updated timeline and cost estimate.</li>
              </ul>
            </div>

            {/* 3. Intellectual Property */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">03.</span>
                <span>Intellectual Property &amp; Code Ownership</span>
              </h2>
              <p>
                Upon complete receipt of contracted milestone payments, full ownership and intellectual property rights of custom bespoke code and project deliverables transfer unconditionally to the Client.
              </p>
              <p className="mt-2">
                Pre-existing proprietary frameworks, open-source libraries, and generic architectural boilerplates developed by {COMPANY_INFO.name} remain under their respective licenses with non-exclusive perpetual usage rights granted to the Client.
              </p>
            </div>

            {/* 4. Payment Terms */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">04.</span>
                <span>Payment Terms &amp; Invoicing</span>
              </h2>
              <p>
                Invoices are issued in accordance with project milestones. Payment milestones are typically structured across Discovery, Sprint Releases, and Final Production Handover.
              </p>
            </div>

            {/* 5. Warranties & Limitation of Liability */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">05.</span>
                <span>Warranty &amp; Limitation of Liability</span>
              </h2>
              <p>
                We warrant that deliverables will function in substantial conformance with agreed technical specifications during the contracted post-deployment warranty period.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[#78716C]">
                In no event shall {COMPANY_INFO.name} or its proprietor Vivek Chauhan be liable for indirect, incidental, consequential, or punitive damages resulting from third-party hosting outages, cyber incidents outside our control, or client modifications to production code.
              </p>
            </div>

            {/* 6. Governing Law */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">06.</span>
                <span>Governing Law &amp; Jurisdiction</span>
              </h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Rewari, Haryana, India</strong>.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-6 border-t border-[#EBE8E1]">
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">07.</span>
                <span>Contact Legal Governance</span>
              </h2>
              <p className="mb-4">
                For questions regarding project agreements or terms, please contact:
              </p>

              <div className="p-6 rounded-2xl bg-[#1C1917] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <strong className="block text-base font-black">{COMPANY_INFO.name}</strong>
                  <span className="text-xs text-[#A8A29E]">Founder &amp; Proprietor: {COMPANY_INFO.founder}</span>
                  <span className="text-xs text-[#DCD8CF] block mt-1">MSME Udyam: {COMPANY_INFO.udyamRegNo} · {COMPANY_INFO.address}</span>
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Terms%20and%20Conditions%20Inquiry`}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl transition-colors shrink-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
      <MobileNav />
    </main>
  );
}
