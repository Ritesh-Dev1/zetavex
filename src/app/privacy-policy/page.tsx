import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import { COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, MapPin, CheckCircle2, Home, ChevronRight, Database, EyeOff, Server, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ZetaVex Tech Solutions',
  description:
    'Read the Privacy Policy of ZetaVex Tech Solutions. Learn how we safeguard client data with database encryption, DPDP compliance, and strict privacy standards.',
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | ZetaVex Tech Solutions',
    description:
      'Read the Privacy Policy of ZetaVex Tech Solutions. Learn how we safeguard client data with database encryption, DPDP compliance, and strict privacy standards.',
    url: `${SITE_URL}/privacy-policy`,
    type: 'article',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ZetaVex Tech Solutions',
    description:
      'Read the Privacy Policy of ZetaVex Tech Solutions. Learn how we safeguard client data with database encryption, DPDP compliance, and strict privacy standards.',
    images: ['/logo.png'],
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
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
            <span className="text-[#0A0A0B] font-bold">Privacy Policy</span>
          </nav>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EBE8E1] text-[11px] font-bold text-[#FF5500] uppercase tracking-wider w-fit mb-3">
            <Lock className="w-3 h-3" />
            <span>Legal &amp; Data Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0B] mb-4">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Effective Date: September 2026 · Governing all digital interactions with ZetaVex Tech Solutions
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EBE8E1] shadow-xs flex flex-col gap-10 text-[#44403C] text-sm sm:text-base leading-relaxed">
            
            {/* 01. Overview */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">01.</span>
                <span>Entity Overview &amp; Scope</span>
              </h2>
              <p>
                This Privacy Policy is issued by <strong>{COMPANY_INFO.name}</strong> (&ldquo;ZetaVex&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a registered technology enterprise founded and operated by <strong>{COMPANY_INFO.founder}</strong> ({COMPANY_INFO.founderTitle}), officially registered under MSME Udyam Registration No. <strong className="font-mono text-[#0A0A0B]">{COMPANY_INFO.udyamRegNo}</strong> in Rewari, Haryana, India.
              </p>
              <p className="mt-3">
                We are dedicated to safeguarding the privacy, confidentiality, and data sovereignty of all clients, business partners, and website visitors in accordance with the Digital Personal Data Protection (DPDP) Act of India and international data governance best practices.
              </p>
            </div>

            {/* 02. Information We Collect */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">02.</span>
                <span>Information We Collect</span>
              </h2>
              <div className="flex flex-col gap-3 mt-3">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <strong className="block text-[#0A0A0B] font-bold mb-1">A. Direct Client &amp; Lead Inquiries</strong>
                  <p className="text-xs sm:text-sm text-[#57534E]">
                    When you submit a project enquiry or contact us, we collect your full name, business email address, phone/WhatsApp number, selected engineering service category, and project specifications.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <strong className="block text-[#0A0A0B] font-bold mb-1">B. Google Analytics 4 (GA4) &amp; Telemetry</strong>
                  <p className="text-xs sm:text-sm text-[#57534E]">
                    We use Google Analytics 4 to understand website engagement patterns (e.g. pages viewed, session duration, device type, geographic region). All IP addresses are automatically anonymized, and no personally identifiable information (PII) is transmitted to advertising networks.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <strong className="block text-[#0A0A0B] font-bold mb-1">C. Security &amp; Rate-Limiting Logs</strong>
                  <p className="text-xs sm:text-sm text-[#57534E]">
                    To defend our infrastructure against automated bot spam, DDoS attacks, and unauthorized intrusion attempts, our API gateways log one-way cryptographic SHA-256 hashes of client IP addresses for rate-limiting purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* 03. Purpose of Processing */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">03.</span>
                <span>How We Use Your Information</span>
              </h2>
              <p>Your information is processed strictly for legitimate engineering and commercial purposes, including:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                <li>Evaluating software specifications and preparing tailored architectural proposals and milestone roadmaps.</li>
                <li>Communicating sprint progress, technical deliverables, and staging deployments directly with your product team.</li>
                <li>Optimizing application performance, user interface responsiveness, and system uptime.</li>
                <li>Complying with statutory accounting, MSME regulations, and taxation laws under Indian jurisdiction.</li>
              </ul>
            </div>

            {/* 04. Data Security & Technical Safeguards */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">04.</span>
                <span>Security Architecture &amp; Database Safeguards</span>
              </h2>
              <p>We deploy enterprise-grade defensive measures to ensure the integrity of client data:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500] uppercase mb-1">
                    <Database className="w-4 h-4 text-[#10B981]" />
                    <span>Row Level Security (RLS)</span>
                  </div>
                  <p className="text-xs text-[#57534E]">
                    Database tables in Supabase PostgreSQL are isolated with strict Row Level Security policies and TLS 1.3 encryption in transit and at rest.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500] uppercase mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>SQLi &amp; XSS Defense</span>
                  </div>
                  <p className="text-xs text-[#57534E]">
                    All API endpoints feature parameterized prepared queries, input sanitization routines, and real-time malicious pattern filtering.
                  </p>
                </div>
              </div>
            </div>

            {/* 05. Zero Third-Party Selling */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">05.</span>
                <span>Zero Data Monetization Guarantee</span>
              </h2>
              <p>
                <strong>ZetaVex Tech Solutions does not sell, rent, trade, or monetize client data or project intellectual property to any third-party marketing broker or commercial entity.</strong> Your source code, technical specifications, and proprietary workflows remain strictly confidential.
              </p>
            </div>

            {/* 06. User Rights */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">06.</span>
                <span>Your Data Protection Rights</span>
              </h2>
              <p>
                Under applicable Indian and international data protection laws, you retain the right to:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 mt-2 text-xs sm:text-sm">
                <li>Request confirmation and a copy of personal information held in our records.</li>
                <li>Request rectification of incomplete or inaccurate records.</li>
                <li>Request permanent erasure of historical enquiry records and contact information.</li>
                <li>Withdraw consent for marketing communications at any time.</li>
              </ul>
            </div>

            {/* 07. Contact Information */}
            <div className="pt-6 border-t border-[#EBE8E1]">
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">07.</span>
                <span>Data Protection Officer &amp; Contact</span>
              </h2>
              <p className="mb-4">
                To exercise any of your data rights or discuss privacy compliance, reach our leadership directly:
              </p>

              <div className="p-6 rounded-3xl bg-[#1C1917] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <strong className="block text-base font-black">{COMPANY_INFO.name}</strong>
                  <span className="text-xs text-[#A8A29E]">Leadership: {COMPANY_INFO.founder} ({COMPANY_INFO.founderTitle})</span>
                  <span className="text-xs text-[#DCD8CF] block mt-1">MSME Reg: {COMPANY_INFO.udyamRegNo} · {COMPANY_INFO.address}</span>
                  <span className="text-xs text-[#DCD8CF] block">Phone / WhatsApp: {COMPANY_INFO.phone}</span>
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Privacy%20Data%20Inquiry`}
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
