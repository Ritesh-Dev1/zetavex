'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ClientReview } from '@/lib/types';
import { COMPANY_INFO } from '@/lib/constants';
import { Sparkles, Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReviewsSectionProps {
  initialReviews: ClientReview[];
}

export default function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
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
    if (initialReviews.length <= 1) return;
    const nextIdx = (currentIndex + 1) % initialReviews.length;
    scrollToSlide(nextIdx);
  }, [currentIndex, initialReviews.length, scrollToSlide]);

  const handleScroll = () => {
    if (!scrollContainerRef.current || initialReviews.length === 0) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth > 0) {
      const itemWidth = clientWidth * 0.85;
      const idx = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(Math.min(idx, Math.max(0, initialReviews.length - 1)));
    }
  };

  // Pure Auto Slider Timer: advances every 3.5 seconds without manual arrow buttons
  useEffect(() => {
    if (isPaused || initialReviews.length <= 1) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, initialReviews.length, scrollNext]);

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#F4F1EA]/60 relative scroll-mt-16 border-t border-[#EBE8E1]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header (Centered without manual arrow buttons) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0B]">
            Trusted by Enterprise Teams
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#57534E]">
            Here is what engineering leaders, product executives, and business founders say about partnering with ZetaVex Tech Solutions.
          </p>
        </div>

        {/* Empty State */}
        {initialReviews.length === 0 ? (
          <div className="w-full py-16 text-center bg-white rounded-3xl border border-[#EBE8E1] p-8 shadow-xs">
            <Quote className="w-10 h-10 text-[#A8A29E] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1C1917]">Client Endorsements</h3>
            <p className="text-xs text-[#78716C] mt-1">Client reviews and case endorsements are being curated.</p>
          </div>
        ) : (
          /* RESPONSIVE AUTO-SLIDER (No arrow buttons, smooth auto-slide with touch support) */
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
              {initialReviews.map((review, index) => (
                <div
                  key={review.id || index}
                  className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center sm:snap-start shrink-0 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-[#EBE8E1] hover:border-[#FF5500]/30 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {/* Rating Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              i < review.rating
                                ? 'fill-[#FF5500] text-[#FF5500]'
                                : 'fill-[#EBE8E1] text-[#EBE8E1]'
                            }`}
                          />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#DCD8CF]" />
                    </div>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm lg:text-base text-[#44403C] italic leading-relaxed mb-6 line-clamp-4">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Details */}
                  <div className="pt-4 border-t border-[#EBE8E1] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#FF3366] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs shrink-0">
                      {review.client_name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0B] truncate">
                          {review.client_name}
                        </h4>
                        <span title="Verified Client">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#78716C] truncate">
                        {review.company_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Indicator Dots */}
            {initialReviews.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-6 sm:mt-8">
                {initialReviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Go to review ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-[#FF5500]' : 'w-2 bg-[#DCD8CF] hover:bg-[#A8A29E]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA for Reviews */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Consult With Our Engineering Team</span>
          </a>
        </div>
      </div>
    </section>
  );
}
