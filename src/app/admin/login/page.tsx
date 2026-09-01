'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  MessageSquare, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnconfigured, setIsUnconfigured] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsUnconfigured(false);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.unconfigured || data.error?.toLowerCase().includes('contact the developer') || data.error?.toLowerCase().includes('.env')) {
          setIsUnconfigured(true);
        }
        throw new Error(data.error || 'Authentication failed.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#1C1917] border border-[#292524] rounded-3xl p-8 sm:p-10 shadow-2xl">
      {/* Header Emblem */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 shadow-lg border-2 border-[#44403C]">
          <img
            src="/logo.png"
            alt="ZetaVex Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-black text-white">
          ZetaVex Admin Portal
        </h1>
        <p className="text-xs text-[#A8A29E] mt-1">
          Authenticated Access for Management &amp; DB Operations
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>

          {/* If credentials not set in .env, prompt developer contact */}
          {(isUnconfigured || error.toLowerCase().includes('contact the developer')) && (
            <div className="pt-3 border-t border-red-900/60 flex flex-col gap-2">
              <span className="text-[11px] text-stone-300">
                Need admin setup? Reach out directly:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919721176040?text=Hi%20Developer%2C%20please%20help%20configure%20admin%20credentials%20for%20the%20ZetaVex%20Portal.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#25D366] text-white text-[11px] font-bold hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Dev</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Admin%20Login%20Credentials%20Setup%20Request`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#292524] text-white text-[11px] font-bold hover:bg-[#44403C] transition-colors border border-[#44403C]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Dev</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#A8A29E] mb-2">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 text-sm bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-xl text-white outline-none transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#A8A29E] mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-3 text-sm bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-xl text-white outline-none transition-all"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-lg transition-all disabled:opacity-50 active:scale-95"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Shield className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Security Info Card */}
      <div className="mt-8 p-4 rounded-2xl bg-[#0C0A09] border border-[#292524] text-[11px] text-[#A8A29E] flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white font-bold block mb-0.5">Secure Environment Access</strong>
          <span>Admin access is strictly authenticated against your verified environment credentials. If credentials are not configured, please contact the developer.</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-[#78716C] hover:text-white transition-colors"
        >
          ← Return to Public Website
        </Link>
      </div>
    </div>
  );
}
