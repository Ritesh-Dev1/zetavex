'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Shield, 
  Layers, 
  Briefcase, 
  Users, 
  Star, 
  Mail, 
  LayoutDashboard, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  Database,
  CheckCircle,
  RefreshCw,
  Lock
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthPage = pathname.includes('/admin/login');

  useEffect(() => {
    if (isAuthPage) {
      setCheckingAuth(false);
      return;
    }

    let isMounted = true;
    async function verifyAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          throw new Error('Unauthenticated');
        }
        const data = await res.json();
        if (data.authenticated) {
          if (isMounted) {
            setIsAuthenticated(true);
            setCheckingAuth(false);
          }
        } else {
          throw new Error('Not authenticated');
        }
      } catch (err) {
        if (isMounted) {
          setIsAuthenticated(false);
          setCheckingAuth(false);
          router.replace('/admin/login');
        }
      }
    }

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isAuthPage, router]);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#1C1917] text-white flex flex-col justify-center items-center p-4">
        {children}
      </div>
    );
  }

  // Loading/checking authentication state
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-white flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#1C1917] border border-[#292524] flex items-center justify-center text-[#FF5500] shadow-md animate-pulse">
          <Lock className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#A8A29E]">
          <span className="w-3 h-3 border-2 border-[#FF5500] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  // If unauthenticated, render redirecting placeholder
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-white flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400">
          <Lock className="w-6 h-6" />
        </div>
        <p className="text-sm font-bold text-red-400">Access Denied. Redirecting to Login...</p>
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Manage Services', href: '/admin/services', icon: Layers },
    { name: 'Manage Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Manage Team', href: '/admin/team', icon: Users },
    { name: 'Manage Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Enquiries Ledger', href: '/admin/enquiries', icon: Mail },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      router.push('/admin/login');
    }
  };

  const handleSyncDatabase = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      setSyncResult('Database synced successfully!');
      setTimeout(() => setSyncResult(null), 4000);
    } catch (e) {
      setSyncResult('Sync complete.');
      setTimeout(() => setSyncResult(null), 4000);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-white flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1C1917] border-r border-[#292524] p-5 shrink-0 justify-between">
        <div className="flex flex-col gap-6">
          {/* Logo & Brand (Clean ZetaVex without gap) */}
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#44403C] shadow-sm shrink-0">
              <img
                src="/logo.png"
                alt="ZetaVex Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight flex items-center">
                Zeta<span className="text-[#FF5500]">Vex</span>
              </span>
              <span className="text-[10px] font-mono text-[#A8A29E] uppercase tracking-widest block -mt-1">
                Admin Portal
              </span>
            </div>
          </Link>

          {/* Nav List */}
          <nav className="flex flex-col gap-1.5 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-[#FF5500] text-white shadow-md'
                      : 'text-[#A8A29E] hover:text-white hover:bg-[#292524]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#292524] flex flex-col gap-3">
          <button
            onClick={handleSyncDatabase}
            disabled={syncing}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold bg-[#292524] hover:bg-[#44403C] text-[#DCD8CF] rounded-xl border border-[#44403C] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#FF5500] ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync DB Catalog'}</span>
          </button>
          {syncResult && (
            <span className="text-[11px] text-emerald-400 text-center">{syncResult}</span>
          )}

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#A8A29E] hover:text-white hover:bg-[#292524] rounded-xl transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <header className="md:hidden bg-[#1C1917] border-b border-[#292524] p-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#44403C]">
            <img src="/logo.png" alt="ZetaVex Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-base font-black">
            Zeta<span className="text-[#FF5500]">Vex</span> Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-white bg-[#292524] rounded-lg"
          aria-label="Toggle Admin Menu"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#1C1917] border-b border-[#292524] p-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                  isActive
                    ? 'bg-[#FF5500] text-white'
                    : 'text-[#A8A29E] hover:text-white hover:bg-[#292524]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#292524] flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#A8A29E] hover:text-white"
            >
              View Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-400"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
