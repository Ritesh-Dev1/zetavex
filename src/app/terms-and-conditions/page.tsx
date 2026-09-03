import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import { COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { FileText, ShieldCheck, Mail, CheckCircle2, Home, ChevronRight, Code2, Scale, CreditCard, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ZetaVex Tech Solutions',
  description:
    'Review the Terms and Conditions governing custom software engineering, IP code ownership, sprint milestones, and client agreements with ZetaVex Tech Solutions.',
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  openGraph: {
    title: 'Terms & Conditions | ZetaVex Tech Solutions',
    description:
      'Review the Terms and Conditions governing custom software engineering, IP code ownership, sprint milestones, and client agreements with ZetaVex Tech Solutions.',
    url: `${SITE_URL}/terms-and-conditions`,
    type: 'article',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Terms and Conditions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | ZetaVex Tech Solutions',
    description:
      'Review the Terms and Conditions governing custom software engineering, IP code ownership, sprint milestones, and client agreements with ZetaVex Tech Solutions.',
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
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B] overflow-x-hidden w-full max-w-full">
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
            <span>Client Service Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0B] mb-4">
            Terms &amp; Conditions
          </h1>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Effective Date: September 2026 · Governing all commercial contracts and software engineering with ZetaVex Tech Solutions
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EBE8E1] shadow-xs flex flex-col gap-10 text-[#44403C] text-sm sm:text-base leading-relaxed">
            
            {/* 01. Agreement */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">01.</span>
                <span>Agreement to Terms &amp; Commercial Scope</span>
              </h2>
              <p>
                By visiting our website, submitting an architecture enquiry, or contracting custom engineering services with <strong>{COMPANY_INFO.name}</strong> (&ldquo;ZetaVex&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), represented by Founder &amp; Proprietor <strong>{COMPANY_INFO.founder}</strong> (MSME Reg No. <strong className="font-mono text-[#0A0A0B]">{COMPANY_INFO.udyamRegNo}</strong>), you agree to be bound by these Terms and Conditions and any accompanying Statement of Work (SOW).
              </p>
            </div>

            {/* 02. Engineering Services & Milestone Governance */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">02.</span>
                <span>Engineering Deliverables &amp; Sprint Releases</span>
              </h2>
              <p>
                {COMPANY_INFO.name} delivers custom software engineering spanning full-stack web applications, SaaS platforms, mobile applications, cloud DevOps orchestration, and enterprise database integrations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <strong className="block text-[#0A0A0B] font-bold text-xs sm:text-sm mb-1">Architecture &amp; Roadmaps</strong>
                  <p className="text-xs text-[#57534E]">
                    Every project is defined by a signed Statement of Work, system architecture blueprint, and milestone sprint schedule.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <strong className="block text-[#0A0A0B] font-bold text-xs sm:text-sm mb-1">Change Order Management</strong>
                  <p className="text-xs text-[#57534E]">
                    Feature requests beyond agreed SOW specifications are scoped transparently with updated delivery timelines and resource estimates.
                  </p>
                </div>
              </div>
            </div>

            {/* 03. Intellectual Property & Code Ownership */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">03.</span>
                <span>100% Client Code Ownership &amp; IP Rights</span>
              </h2>
              <p>
                Upon complete clearance of contracted milestone payments, <strong>100% unconditional ownership and intellectual property rights</strong> of the custom bespoke source code, database architectures, user interface assets, and compiled binaries transfer permanently to the Client.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[#78716C]">
                Open-source libraries (e.g. Next.js, React, Tailwind CSS) and generic utility boilerplates developed prior to the engagement remain subject to their respective open-source licenses, with a perpetual, royalty-free commercial grant to the Client.
              </p>
            </div>

            {/* 04. Invoicing, Payments & Taxes */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">04.</span>
                <span>Payment Milestones &amp; Commercial Terms</span>
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                <li>Commercial fees are invoiced based on agreed milestone completions (e.g. Sprint Kickoff, Core Architecture, User Acceptance Testing, and Production Handover).</li>
                <li>Invoices are payable via direct Bank Wire (NEFT/RTGS/IMPS), UPI, or authorized international payment rails within the agreed billing window.</li>
                <li>All statutory taxes, MSME provisions, and applicable GST compliance follow Indian taxation regulations.</li>
              </ul>
            </div>

            {/* 05. Warranty & Post-Launch Support */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">05.</span>
                <span>Warranty, Bug-Fixing &amp; Quality Guarantee</span>
              </h2>
              <p>
                We provide a standard **30-day post-launch warranty period** following final production deployment, during which any reproducible defects or bugs deviating from agreed specifications are resolved promptly at zero additional cost.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[#78716C]">
                Ongoing maintenance, continuous feature expansion, third-party API version migrations, and server scaling beyond warranty can be engaged under dedicated Monthly Retainer Agreements.
              </p>
            </div>

            {/* 06. Limitation of Liability */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">06.</span>
                <span>Limitation of Liability</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E]">
                To the maximum extent permitted by law, ZetaVex Tech Solutions and its proprietor Vivek Chauhan shall not be liable for indirect, punitive, or consequential damages resulting from third-party cloud hosting downtime (e.g. AWS, Vercel, Supabase outages), unauthorized third-party modifications to production repositories, or client domain expirations.
              </p>
            </div>

            {/* 07. Governing Law & Jurisdiction */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">07.</span>
                <span>Governing Law &amp; Legal Jurisdiction</span>
              </h2>
              <p>
                These Terms and Conditions and all commercial contracts are governed by and construed in accordance with the substantive laws of the <strong>Republic of India</strong>. Any legal dispute or claim arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in <strong>Rewari, Haryana, India</strong>.
              </p>
            </div>

            {/* 08. Contact & Legal Governance */}
            <div className="pt-6 border-t border-[#EBE8E1]">
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">08.</span>
                <span>Legal Inquiries &amp; Governance</span>
              </h2>
              <p className="mb-4">
                For contract inquiries, master service agreements, or vendor registration:
              </p>

              <div className="p-6 rounded-3xl bg-[#1C1917] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <strong className="block text-base font-black">{COMPANY_INFO.name}</strong>
                  <span className="text-xs text-[#A8A29E]">Proprietor: {COMPANY_INFO.founder} ({COMPANY_INFO.founderTitle})</span>
                  <span className="text-xs text-[#DCD8CF] block mt-1">MSME Udyam: {COMPANY_INFO.udyamRegNo} · {COMPANY_INFO.address}</span>
                  <span className="text-xs text-[#DCD8CF] block">Direct WhatsApp: {COMPANY_INFO.phone}</span>
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Contract%20Terms%20Inquiry`}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl transition-colors shrink-0"
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
