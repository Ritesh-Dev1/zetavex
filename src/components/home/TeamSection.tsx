'use client';

import React from 'react';
import { TeamMember } from '@/lib/types';
import { Sparkles, Linkedin, MessageCircle, ShieldCheck, Award } from 'lucide-react';

interface TeamSectionProps {
  initialTeam: TeamMember[];
}

export default function TeamSection({ initialTeam }: TeamSectionProps) {
  return (
    <section id="team" className="py-24 bg-[#FAF8F5] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Leadership &amp; Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0B]">
            Engineered with Vision &amp; Craft
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Meet the leadership driving technical innovation, architectural precision, and client success at ZetaVex Tech Solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {initialTeam.map((member) => (
            <div
              key={member.id}
              className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#EBE8E1] hover:border-[#FF5500]/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col items-center text-center group"
            >
              {/* Photo with Conic Ring */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-3xl p-[3px] rainbow-ring group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <img
                    src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-[21px]"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#10B981] text-white p-1.5 rounded-full border-2 border-white shadow-xs" title="Active Leadership">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-2xl font-black text-[#0A0A0B] mb-1">
                {member.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] text-xs font-bold text-[#FF5500] mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>{member.role}</span>
              </div>

              {/* Bio */}
              <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Links & Direct Contact */}
              <div className="w-full pt-4 border-t border-[#EBE8E1] flex items-center justify-center gap-4">
                {member.whatsapp_number && (
                  <a
                    href={`https://wa.me/${member.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] rounded-xl border border-[#DCD8CF] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
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
