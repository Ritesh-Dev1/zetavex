'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Layers, Briefcase, Mail, Shield } from 'lucide-react';

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveTab(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '#', icon: Home },
    { id: 'services', label: 'Services', href: '#services', icon: Layers },
    { id: 'projects', label: 'Projects', href: '#projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
    { id: 'admin', label: 'Admin', href: '/admin', icon: Shield, isLink: true },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF8F5]/95 backdrop-blur-lg border-t border-[#EBE8E1] h-16 pb-safe shadow-lg transition-transform duration-200"
    >
      <div className="grid grid-cols-5 h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          const content = (
            <div className="flex flex-col items-center justify-center h-full relative group">
              {/* Active pulsing dot */}
              {isActive && (
                <span className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              )}
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#FF5500]'
                    : 'text-[#78716C] group-hover:text-[#1C1917]'
                }`}
              />
              <span
                className={`text-[10px] font-semibold mt-1 transition-colors duration-200 ${
                  isActive ? 'text-[#FF5500] font-bold' : 'text-[#78716C]'
                }`}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.isLink) {
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className="h-full flex items-center justify-center"
              >
                {content}
              </Link>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className="h-full flex items-center justify-center"
            >
              {content}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
