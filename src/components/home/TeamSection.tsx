'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TeamMember } from '@/lib/types';
import { Sparkles, Linkedin, MessageCircle, ShieldCheck, Award, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface TeamSectionProps {
  initialTeam: TeamMember[];
  isSlider?: boolean;
}

export default function TeamSection({ initialTeam, isSlider = true }: TeamSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback((idx: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const items = container.children;
    if (items && items[idx]) {
      const targetElement = items[idx] as HTMLElement;
      container.scrollTo({ left: targetElement.offsetLeft - container.offsetLeft, behavior: 'smooth' });
      setCurrentIndex(idx);
    } else {
      const { clientWidth } = container;
      container.scrollTo({ left: idx * (clientWidth * 0.85), behavior: 'smooth' });
      setCurrentIndex(idx);
    }
  }, []);

  const scrollNext = useCallback(() => {
    if (initialTeam.length <= 1) return;
    const nextIdx = (currentIndex + 1) % initialTeam.length;
    scrollToSlide(nextIdx);
  }, [currentIndex, initialTeam.length, scrollToSlide]);

  const scrollPrev = useCallback(() => {
    if (initialTeam.length <= 1) return;
    const prevIdx = (currentIndex - 1 + initialTeam.length) % initialTeam.length;
    scrollToSlide(prevIdx);
  }, [currentIndex, initialTeam.length, scrollToSlide]);

  const handleScroll = () => {
    if (!scrollContainerRef.current || initialTeam.length === 0) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth > 0) {
      const itemWidth = clientWidth * 0.85;
      const idx = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(Math.min(idx, Math.max(0, initialTeam.length - 1)));
    }
  };

  // Auto Slider Timer: advances every 4 seconds, pauses when user hovers or touches
  useEffect(() => {
    if (!isSlider || isPaused || initialTeam.length <= 1) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isSlider, isPaused, initialTeam.length, scrollNext]);

  return (
    <section id="team" className="py-20 sm:py-24 bg-[#FAF8F5] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leadership &amp; Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0B]">
              Engineered with Vision &amp; Craft
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#57534E]">
              Meet the leadership driving technical innovation, architectural precision, and client success at ZetaVex Tech Solutions.
            </p>
          </div>

          {/* Slider Controls (Desktop & Tablet) */}
          {initialTeam.length > 1 && (
            <div className="flex items-center gap-2.5 self-start md:self-end shrink-0">
              <button
                onClick={scrollPrev}
                aria-label="Previous Team Member"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-[#1C1917] text-[#1C1917] hover:text-white border border-[#EBE8E1] hover:border-[#1C1917] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next Team Member"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-[#1C1917] text-[#1C1917] hover:text-white border border-[#EBE8E1] hover:border-[#1C1917] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {initialTeam.length === 0 ? (
          <div className="w-full py-16 text-center bg-white rounded-3xl border border-[#EBE8E1] p-8 shadow-xs">
            <ShieldCheck className="w-10 h-10 text-[#A8A29E] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1C1917]">Leadership Team Directory</h3>
            <p className="text-xs text-[#78716C] mt-1">Our engineering team information will be updated shortly.</p>
          </div>
        ) : isSlider ? (
          /* RESPONSIVE AUTO-SLIDER (Mobile: 1 card, Tablet: 2 cards, Desktop: 3 cards) */
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x pb-4 pt-1 px-1 -mx-1"
            >
              {initialTeam.map((member) => (
                <div
                  key={member.id}
                  className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center sm:snap-start shrink-0 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-[#EBE8E1] hover:border-[#FF5500]/40 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col items-center text-center justify-between group"
                >
                  <div className="flex flex-col items-center w-full">
                    {/* Photo with Rainbow Ring */}
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-3xl p-[3px] rainbow-ring group-hover:scale-105 transition-transform duration-300 shadow-md">
                        <img
                          src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-[13px] sm:rounded-[21px]"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5 bg-[#10B981] text-white p-1 sm:p-1.5 rounded-full border-2 border-white shadow-xs" title="Active Leadership">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-[#0A0A0B] mb-1">
                      {member.name}
                    </h3>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F1EA] text-[10px] sm:text-xs font-bold text-[#FF5500] mb-3 sm:mb-4">
                      <Award className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[160px] sm:max-w-none">{member.role}</span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  {/* Links & Direct Contact */}
                  <div className="w-full pt-4 border-t border-[#EBE8E1] flex flex-wrap items-center justify-center gap-2">
                    {member.whatsapp_number && (
                      <a
                        href={`https://wa.me/${member.whatsapp_number.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] rounded-xl border border-[#DCD8CF] transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Indicator Dots */}
            {initialTeam.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-6 sm:mt-8">
                {initialTeam.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-[#FF5500]' : 'w-2 bg-[#DCD8CF] hover:bg-[#A8A29E]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* STANDARD GRID DISPLAY (For dedicated /team page) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {initialTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-[#EBE8E1] hover:border-[#FF5500]/40 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col items-center text-center justify-between group"
              >
                <div className="flex flex-col items-center w-full">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-3xl p-[3px] rainbow-ring group-hover:scale-105 transition-transform duration-300 shadow-md">
                      <img
                        src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-[13px] sm:rounded-[21px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -bottom-1.5 -right-1.5 bg-[#10B981] text-white p-1 sm:p-1.5 rounded-full border-2 border-white shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-[#0A0A0B] mb-1">
                    {member.name}
                  </h3>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F1EA] text-[10px] sm:text-xs font-bold text-[#FF5500] mb-3 sm:mb-4">
                    <Award className="w-3.5 h-3.5" />
                    <span>{member.role}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-[#EBE8E1] flex flex-wrap items-center justify-center gap-2">
                  {member.whatsapp_number && (
                    <a
                      href={`https://wa.me/${member.whatsapp_number.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] rounded-xl border border-[#DCD8CF] transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All / Full Team Button */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white bg-[#1C1917] hover:bg-[#FF5500] rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <span>Meet Full Leadership &amp; Engineering Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
