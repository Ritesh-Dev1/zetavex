'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Briefcase, Users, Mail } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', href: '/', icon: Home },
    { id: 'services', label: 'Services', href: '/services', icon: Layers },
    { id: 'projects', label: 'Projects', href: '/projects', icon: Briefcase },
    { id: 'team', label: 'Team', href: '/team', icon: Users },
    { id: 'contact', label: 'Contact', href: '/#contact', icon: Mail },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF8F5]/95 backdrop-blur-lg border-t border-[#EBE8E1] h-16 pb-safe shadow-lg transition-transform duration-200"
    >
      <div className="grid grid-cols-5 h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item.href}
              className="h-full flex items-center justify-center relative group"
            >
              <div className="flex flex-col items-center justify-center h-full relative">
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
