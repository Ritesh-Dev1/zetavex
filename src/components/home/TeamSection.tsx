'use client';

import React from 'react';
import { TeamMember } from '@/lib/types';
import { Sparkles, Linkedin, MessageCircle, ShieldCheck, Award } from 'lucide-react';

interface TeamSectionProps {
  initialTeam: TeamMember[];
}

export default function TeamSection({ initialTeam }: TeamSectionProps) {
  return (
    <section id="team" className="py-20 sm:py-24 bg-[#FAF8F5] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* Team Grid: 2 cards in a row on mobile, 3 cards in a row on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {initialTeam.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 border border-[#EBE8E1] hover:border-[#FF5500]/40 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col items-center text-center justify-between group"
            >
              <div className="flex flex-col items-center w-full">
                {/* Photo with Ring */}
                <div className="relative mb-3.5 sm:mb-6">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-3xl p-[2px] sm:p-[3px] rainbow-ring group-hover:scale-105 transition-transform duration-300 shadow-md">
                    <img
                      src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-[14px] sm:rounded-[21px]"
                    />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 bg-[#10B981] text-white p-1 sm:p-1.5 rounded-full border-2 border-white shadow-xs" title="Active Leadership">
                    <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-sm sm:text-lg lg:text-xl font-black text-[#0A0A0B] mb-1">
                  {member.name}
                </h3>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#F4F1EA] text-[10px] sm:text-xs font-bold text-[#FF5500] mb-3 sm:mb-4">
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate max-w-[140px] sm:max-w-none">{member.role}</span>
                </div>

                {/* Bio */}
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#57534E] leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  {member.bio}
                </p>
              </div>

              {/* Links & Direct Contact */}
              <div className="w-full pt-3 sm:pt-4 border-t border-[#EBE8E1] flex flex-wrap items-center justify-center gap-2">
                {member.whatsapp_number && (
                  <a
                    href={`https://wa.me/${member.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[75px] flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg sm:rounded-xl shadow-xs transition-colors"
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
                    className="flex-1 min-w-[75px] flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] rounded-lg sm:rounded-xl border border-[#DCD8CF] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
