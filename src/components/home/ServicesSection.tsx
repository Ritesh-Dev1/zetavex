'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Service } from '@/lib/types';
import { COMPANY_INFO } from '@/lib/constants';
import { 
  Code, 
  Layers, 
  Smartphone, 
  Cloud, 
  Palette, 
  Zap, 
  Globe, 
  Database, 
  Server, 
  Check, 
  ArrowRight, 
  Sparkles, 
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Layers,
  Smartphone,
  Cloud,
  Palette,
  Zap,
  Globe,
  Database,
  Server,
};

interface ServicesSectionProps {
  initialServices: Service[];
  limit?: number;
}

export default function ServicesSection({ initialServices, limit }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAll, setShowAll] = useState(false);

  const getIcon = (name: string) => {
    const IconComponent = iconMap[name] || Code;
    return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5500]" />;
  };

  const displayedServices = limit && !showAll 
    ? initialServices.slice(0, limit) 
    : initialServices;

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#FAF8F5] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0B]">
            Engineered for Concurrency &amp; Scale
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#57534E] leading-relaxed max-w-2xl">
            From modern web architectures to multi-tenant SaaS platforms and cloud pipelines, we build resilient software that fuels enterprise growth across all tech stacks.
          </p>
        </div>

        {/* Services Grid: 2 columns on mobile, 3 columns on desktop */}
        {displayedServices.length === 0 ? (
          <div className="w-full py-16 text-center bg-white rounded-3xl border border-[#EBE8E1] p-8 shadow-xs">
            <Code className="w-10 h-10 text-[#A8A29E] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1C1917]">Services Catalog</h3>
            <p className="text-xs text-[#78716C] mt-1">Our engineering services catalog is being updated.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {displayedServices.map((service, index) => (
              <div
                key={service.id || index}
                className="group relative bg-[#F4F1EA]/60 hover:bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-8 border border-[#EBE8E1] hover:border-[#FF5500]/40 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Index Badge */}
                  <div className="flex items-center justify-between mb-3.5 sm:mb-6">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white group-hover:bg-[#FF5500]/10 border border-[#EBE8E1] group-hover:border-[#FF5500]/20 flex items-center justify-center transition-colors">
                      {getIcon(service.icon_name)}
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#A8A29E] bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#EBE8E1]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-lg lg:text-xl font-black text-[#0A0A0B] mb-2 sm:mb-3 group-hover:text-[#FF5500] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-sm text-[#57534E] leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mb-4 sm:mb-6">
                    {service.tech_tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-xs font-semibold bg-white text-[#44403C] rounded-md sm:rounded-lg border border-[#EBE8E1]"
                      >
                        {tag}
                      </span>
                    ))}
                    {service.tech_tags.length > 3 && (
                      <span className="text-[9px] sm:text-xs font-semibold text-[#A8A29E] self-center">
                        +{service.tech_tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA Action */}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold text-[#1C1917] bg-white group-hover:bg-[#1C1917] group-hover:text-white rounded-lg sm:rounded-xl border border-[#EBE8E1] group-hover:border-[#1C1917] transition-all duration-200"
                  >
                    <span>Specs</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF5500] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expand / View All More Services Button */}
        {limit && initialServices.length > limit && (
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#1C1917] bg-white hover:bg-[#EBE8E1] border border-[#DCD8CF] rounded-xl shadow-xs transition-all"
            >
              <span>{showAll ? 'Show Fewer Services' : `Click to View More Services (${initialServices.length})`}</span>
              {showAll ? <ChevronUp className="w-4 h-4 text-[#FF5500]" /> : <ChevronDown className="w-4 h-4 text-[#FF5500]" />}
            </button>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 px-5 py-3 text-xs sm:text-sm font-bold text-[#FF5500] hover:text-[#e04b00] transition-colors"
            >
              <span>Explore All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 sm:mt-16 bg-[#1C1917] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#292524] shadow-lg">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <h4 className="text-lg sm:text-2xl font-black">
              Need a bespoke custom software architecture?
            </h4>
            <p className="text-xs sm:text-sm text-[#A8A29E] max-w-xl">
              Tell Vivek and the ZetaVex engineering team your project scope. We provide architecture roadmaps and transparent quotes within 24 hours.
            </p>
          </div>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-md whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE8E1] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 flex items-center justify-center">
                {getIcon(selectedService.icon_name)}
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-xs font-bold text-[#78716C] hover:text-[#1C1917] bg-[#F4F1EA] px-3 py-1.5 rounded-full"
              >
                Close
              </button>
            </div>

            <h3 className="text-xl font-black text-[#0A0A0B] mb-3">
              {selectedService.title}
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] block mb-2">
                Tech Stack &amp; Frameworks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedService.tech_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-semibold bg-[#F4F1EA] text-[#1C1917] rounded-lg border border-[#EBE8E1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] rounded-xl shadow-md hover:opacity-95"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Discuss Requirements</span>
              </a>
              <Link
                href={`/services/${selectedService.slug}`}
                className="px-4 py-3 text-xs font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] rounded-xl transition-colors border border-[#DCD8CF]"
              >
                Full Spec
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
