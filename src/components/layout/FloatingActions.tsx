'use client';

import React from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <aside
      aria-label="Quick Contact Actions"
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* WhatsApp Action Only (Telephonic icon removed) */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ZetaVex on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="sr-only">Chat on WhatsApp</span>
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-white" />

        {/* Hover Pill Label on Desktop */}
        <span className="hidden md:group-hover:flex absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1917] text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-md border border-[#44403C] animate-in fade-in slide-in-from-right-2 duration-200">
          WhatsApp Instant Chat
        </span>
      </a>
    </aside>
  );
}
