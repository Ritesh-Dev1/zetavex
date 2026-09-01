'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY_INFO } from '@/lib/constants';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Team', href: '/team' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EBE8E1] shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 border border-[#EBE8E1]">
              <img
                src="/logo.png"
                alt="ZetaVex Tech Solutions Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#0A0A0B] flex items-center gap-1">
                Zeta<span className="text-[#FF5500]">Vex</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#78716C] uppercase -mt-1">
                Tech Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4F1EA]/80 backdrop-blur-sm border border-[#EBE8E1] px-3 py-1.5 rounded-full shadow-xs">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#FF5500] shadow-xs'
                      : 'text-[#44403C] hover:text-[#FF5500] hover:bg-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs (Admin Portal button removed from public header) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4 -ml-1 opacity-80" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-[#FF5500] rounded-lg shadow-sm"
              aria-label="WhatsApp Us"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] border border-[#EBE8E1] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EBE8E1] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-semibold text-[#1C1917] hover:bg-[#F4F1EA] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-[#EBE8E1] flex flex-col gap-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] rounded-xl shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 9721176040)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
