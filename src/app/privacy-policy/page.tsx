import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import { COMPANY_INFO } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, FileText, Mail, MapPin, CheckCircle2, Home, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ZetaVex Tech Solutions',
  description:
    'Read the Privacy Policy of ZetaVex Tech Solutions. Learn how we safeguard client data with database encryption and strict privacy standards.',
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | ZetaVex Tech Solutions',
    description:
      'Read the Privacy Policy of ZetaVex Tech Solutions. Learn how we safeguard client data with database encryption and strict privacy standards.',
    url: `${SITE_URL}/privacy-policy`,
    type: 'article',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'ZetaVex Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ZetaVex Tech Solutions',
    description:
      'Read the Privacy Policy of ZetaVex Tech Solutions. Learn how we safeguard client data with database encryption and strict privacy standards.',
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
            <span>Legal &amp; Compliance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0B] mb-4">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Last Updated: August 31, 2026 · Effective Immediately for ZetaVex Tech Solutions
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EBE8E1] shadow-xs flex flex-col gap-10 text-[#44403C] text-sm sm:text-base leading-relaxed">
            {/* Overview */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">01.</span>
                <span>Overview &amp; Scope</span>
              </h2>
              <p>
                At <strong>{COMPANY_INFO.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), founded and operated by <strong>{COMPANY_INFO.founder}</strong> (MSME Udyam Registration No. <strong className="font-mono text-[#0A0A0B]">{COMPANY_INFO.udyamRegNo}</strong>), we are committed to protecting the privacy, confidentiality, and security of our clients, partners, and website visitors.
              </p>
              <p className="mt-3">
                This Privacy Policy describes how we collect, store, process, and protect your information when you visit our marketing platform, submit project enquiry forms, or engage our custom software engineering services.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">02.</span>
                <span>Information We Collect</span>
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                <li>
                  <strong>Direct Client Details:</strong> When you submit a project enquiry or request a software architecture scope, we collect your name, business email address, phone/WhatsApp number, and project specification details.
                </li>
                <li>
                  <strong>Technical &amp; Telemetry Data:</strong> We log anonymized IP addresses hashed with SHA-256 for rate-limiting, browser user agent strings, and device operating characteristics to safeguard our systems against spam and DDoS abuse.
                </li>
                <li>
                  <strong>Authentication Logs:</strong> Administrative sessions utilize secure, encrypted JSON Web Tokens (JWT) stored in HTTP-only, SameSite cookies.
                </li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">03.</span>
                <span>How We Use Your Information</span>
              </h2>
              <p>We process collected information strictly for legitimate commercial and technical purposes, including:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                <li>Evaluating project requirements and generating technical scopes, architectures, and price quotes.</li>
                <li>Communicating project updates, milestone deliverables, and client support through official channels (WhatsApp and Email).</li>
                <li>Protecting website integrity, preventing automated form flooding, and maintaining server rate limits.</li>
                <li>Complying with applicable statutory, tax, and MSME regulatory requirements under Indian law.</li>
              </ul>
            </div>

            {/* Data Protection & Security */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">04.</span>
                <span>Data Protection &amp; Security Measures</span>
              </h2>
              <p>
                We implement industry-standard technical safeguards to protect your personal and proprietary data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500] uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Database Encryption</span>
                  </div>
                  <p className="text-xs text-[#57534E]">
                    Remote Supabase PostgreSQL with strict Row Level Security (RLS) policies and encrypted transmissions (TLS 1.3).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500] uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Rate Limiting</span>
                  </div>
                  <p className="text-xs text-[#57534E]">
                    SHA-256 hashed IP rate limiter preventing automated scraping, credential attacks, and spam bots.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">05.</span>
                <span>No Selling of Personal Data</span>
              </h2>
              <p>
                <strong>We do not sell, rent, lease, or monetize your personal or company data to any third-party marketing brokers or advertisers.</strong> We only disclose information if legally required by authorized law enforcement or judicial authorities under Indian jurisdiction.
              </p>
            </div>

            {/* User Rights */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">06.</span>
                <span>Your Data Rights</span>
              </h2>
              <p>
                You have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or ask for the deletion of your historical enquiry records from our database by contacting us.
              </p>
            </div>

            {/* Contact Information */}
            <div className="pt-6 border-t border-[#EBE8E1]">
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0B] mb-3 flex items-center gap-2">
                <span className="text-[#FF5500]">07.</span>
                <span>Contact Data Officer</span>
              </h2>
              <p className="mb-4">
                If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our leadership:
              </p>

              <div className="p-6 rounded-2xl bg-[#1C1917] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <strong className="block text-base font-black">{COMPANY_INFO.name}</strong>
                  <span className="text-xs text-[#A8A29E]">Attention: {COMPANY_INFO.founder} ({COMPANY_INFO.founderTitle})</span>
                  <span className="text-xs text-[#DCD8CF] block mt-1">Location: {COMPANY_INFO.address}</span>
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Privacy%20Policy%20Inquiry`}
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
