'use client';

import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';
import PixelGridAssembly from './PixelGridAssembly';
import { MessageSquare, ArrowDown, Sparkles, CheckCircle2, ShieldCheck, Zap, Award, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 flex flex-col justify-center items-center w-full max-w-full overflow-x-clip">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none bg-warm-grid [background-size:24px_24px] overflow-hidden" 
      />

      {/* Ambient Gradient Glows (contained in overflow-hidden layer to prevent mobile side space) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[220px] sm:h-[350px] bg-gradient-to-tr from-[#FF5500]/15 via-[#FF3366]/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 left-2 sm:left-10 w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] bg-[#38BDF8]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10 w-full">
        {/* Slogan & Category Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F1EA] border border-[#EBE8E1] shadow-xs mb-4 sm:mb-6 animate-in fade-in duration-700 max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
          <span className="text-[11px] sm:text-xs font-black tracking-wide text-[#1C1917] uppercase">
            Custom Web Application &amp; Digital Solutions
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0A0A0B] leading-[1.12] sm:leading-[1.08] max-w-4xl px-1">
          Premier Web &amp; Custom{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF5500] via-[#FF3366] to-[#818CF8]">
            Healthcare Software
          </span>{' '}
          Development Company
        </h1>

        {/* Signature Interactive Pixel Assembly Wordmark */}
        <div className="w-full max-w-full my-3 sm:my-5">
          <PixelGridAssembly />
        </div>

        {/* Value Proposition with Keywords */}
        <p className="text-sm sm:text-base lg:text-lg text-[#44403C] font-medium max-w-2xl leading-relaxed mb-6 sm:mb-8 px-2">
          {COMPANY_INFO.heroValueProp} As a premier <strong>web development company</strong> and <strong>custom healthcare software development company</strong>, we deliver enterprise SaaS platforms, <strong>digital transformation solutions</strong>, and <strong>managed IT services</strong> across all modern tech stacks.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-2">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
            <span>Get a Free Project Quote</span>
          </a>

          <Link
            href="/services"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 text-sm sm:text-base font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] border border-[#DCD8CF] rounded-2xl transition-all duration-200 shadow-xs"
          >
            <span>Explore Digital Services</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF5500] shrink-0" />
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#EBE8E1] w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#44403C]">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10B981] shrink-0" />
            <span>All Modern Tech Stacks</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#44403C]">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500] shrink-0" />
            <span>Healthcare Security</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#44403C]">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500] shrink-0" />
            <span>High-Velocity Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#44403C]">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10B981] shrink-0" />
            <span>Govt. MSME Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
