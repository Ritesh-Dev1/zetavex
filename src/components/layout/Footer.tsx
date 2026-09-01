'use client';

import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';
import { 
  Mail, 
  MapPin, 
  FileBadge, 
  ArrowUp, 
  MessageSquare,
  MessageCircle,
  Linkedin,
  Instagram,
  ShieldCheck
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-white pt-16 pb-24 md:pb-12 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#292524]">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-sm border border-[#44403C]">
                <img
                  src="/logo.png"
                  alt="ZetaVex Tech Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white inline-block leading-none">
                  Zeta<span className="text-[#FF5500]">Vex</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mt-0.5">
                  Tech Solutions
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-sm">
              {COMPANY_INFO.heroValueProp} Delivering enterprise web apps, SaaS products, and secure cloud ecosystems across all modern tech stacks.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#EBE8E1] bg-[#292524] px-3 py-2 rounded-lg border border-[#44403C] w-fit">
              <FileBadge className="w-4 h-4 text-[#10B981]" />
              <span>MSME Udyam: <strong className="text-white font-mono">{COMPANY_INFO.udyamRegNo}</strong></span>
            </div>

            {/* Social Media Links (Instagram & LinkedIn only) */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href={COMPANY_INFO.instagramUrl || 'https://www.instagram.com/zetavextech'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-[#292524] hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] flex items-center justify-center text-[#A8A29E] hover:text-white transition-all shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.linkedinUrl || 'https://www.linkedin.com/company/zetavex-tech-solutions'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-[#292524] hover:bg-[#0077B5] flex items-center justify-center text-[#A8A29E] hover:text-white transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (Review button removed) */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#A8A29E] uppercase mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#DCD8CF]">
              <li>
                <Link href="/" className="hover:text-[#FF5500] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#FF5500] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#FF5500] transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#FF5500] transition-colors">Leadership &amp; Team</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FF5500] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Solutions Catalog */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#A8A29E] uppercase mb-4">
              Solutions
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#DCD8CF]">
              <li>
                <Link href="/services/full-stack-web-dev" className="hover:text-[#FF5500] transition-colors">Full-Stack Development</Link>
              </li>
              <li>
                <Link href="/services/custom-saas-development" className="hover:text-[#FF5500] transition-colors">SaaS Architectures</Link>
              </li>
              <li>
                <Link href="/services/mobile-app-solutions" className="hover:text-[#FF5500] transition-colors">Mobile App Systems</Link>
              </li>
              <li>
                <Link href="/services/cloud-infrastructure-devops" className="hover:text-[#FF5500] transition-colors">DevOps &amp; Cloud</Link>
              </li>
              <li>
                <Link href="/services/ui-ux-product-design" className="hover:text-[#FF5500] transition-colors">UI/UX Design Systems</Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Legal */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#A8A29E] uppercase mb-4">
              Connect Directly
            </h3>
            <div className="flex flex-col gap-3 text-sm text-[#DCD8CF]">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-[#FF5500] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-center gap-2 text-[#A8A29E]">
                <MapPin className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>

              <div className="pt-2 flex flex-col gap-1.5 text-xs text-[#A8A29E]">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} ZetaVex Tech Solutions. All rights reserved. Founded &amp; Engineered by {COMPANY_INFO.founder}.</span>
            <span className="hidden sm:inline text-[#44403C]">|</span>
            <Link href="/privacy-policy" className="hover:text-[#DCD8CF] transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-[#44403C]">·</span>
            <Link href="/terms-and-conditions" className="hover:text-[#DCD8CF] transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#A8A29E]">Slogan: &ldquo;{COMPANY_INFO.slogan}&rdquo;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1 bg-[#292524] hover:bg-[#44403C] text-[#DCD8CF] rounded-md transition-colors"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
