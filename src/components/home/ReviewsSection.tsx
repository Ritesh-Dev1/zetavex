'use client';

import React from 'react';
import { ClientReview } from '@/lib/types';
import { Sparkles, Star, Quote, CheckCircle2 } from 'lucide-react';

interface ReviewsSectionProps {
  initialReviews: ClientReview[];
}

export default function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#F4F1EA]/60 relative scroll-mt-16 border-t border-[#EBE8E1]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* Reviews Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {initialReviews.map((review, index) => (
            <div
              key={review.id || index}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-[#EBE8E1] hover:border-[#FF5500]/30 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < review.rating
                            ? 'fill-[#FF5500] text-[#FF5500]'
                            : 'fill-[#EBE8E1] text-[#EBE8E1]'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-[#DCD8CF]" />
                </div>

                {/* Review Text */}
                <p className="text-[11px] sm:text-sm lg:text-base text-[#44403C] italic leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-3.5 sm:pt-5 border-t border-[#EBE8E1] flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#FF3366] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs shrink-0">
                  {review.client_name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0B] truncate">
                      {review.client_name}
                    </h4>
                    <CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0" title="Verified Client" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-[#78716C] truncate">
                    {review.company_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
