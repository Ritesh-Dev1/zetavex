'use client';

import React, { useState } from 'react';
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
  MessageSquare 
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
}

export default function ServicesSection({ initialServices }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (name: string) => {
    const IconComponent = iconMap[name] || Code;
    return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5500]" />;
  };

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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {initialServices.map((service, index) => (
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EBE8E1] shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EBE8E1] flex items-center justify-center">
                  {getIcon(selectedService.icon_name)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0A0A0B]">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs font-mono text-[#78716C] uppercase">
                    Specification Sheet
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full bg-[#EBE8E1] hover:bg-[#DCD8CF] flex items-center justify-center text-sm font-bold text-[#1C1917]"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#44403C] leading-relaxed my-4">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                Included Technologies &amp; Tooling
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedService.tech_tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-[#F4F1EA] text-[#1C1917] rounded-lg border border-[#DCD8CF]"
                  >
                    <Check className="w-3 h-3 text-[#10B981]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#EBE8E1]">
              <a
                href={`https://wa.me/919721176040?text=Hi%20ZetaVex%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(selectedService.title)}%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] rounded-xl shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Request Project Scope</span>
              </a>
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-3 text-sm font-semibold text-[#57534E] hover:bg-[#F4F1EA] rounded-xl border border-[#EBE8E1]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
