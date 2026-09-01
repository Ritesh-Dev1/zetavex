'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COMPANY_INFO, INITIAL_SERVICES } from '@/lib/constants';
import { 
  Sparkles, 
  Send, 
  Mail, 
  MapPin, 
  FileBadge, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  MessageCircle, 
  Clock, 
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_requested: 'Full-Stack Development',
    message: '',
    terms_accepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, terms_accepted: e.target.checked }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms_accepted) {
      setErrorMessage('Please accept the Terms & Conditions and Privacy Policy before submitting.');
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSuccessMessage(data.message || 'Enquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_requested: 'Full-Stack Development',
        message: '',
        terms_accepted: false,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF8F5] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0B]">
            Start Your Next Build With Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Have an upcoming digital product or need custom engineering across any tech stack? Fill out our enquiry engine or contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact & Verified Business Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1C1917] text-white rounded-3xl p-8 sm:p-10 border border-[#292524] shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm border border-[#44403C] shrink-0">
                  <img
                    src="/logo.png"
                    alt="ZetaVex Tech Solutions"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {COMPANY_INFO.name}
                  </h3>
                  <p className="text-xs text-[#A8A29E] font-medium">
                    {COMPANY_INFO.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#DCD8CF] leading-relaxed mb-8">
                We work directly with founders and technical leaders to deliver mission-critical software solutions on schedule and within budget across all modern tech stacks.
              </p>

              {/* Direct Info List */}
              <div className="flex flex-col gap-5 text-sm text-[#DCD8CF] mb-8">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#292524] hover:bg-[#44403C] transition-colors border border-[#44403C]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A8A29E] block">
                      WhatsApp Quick Chat
                    </span>
                    <strong className="text-white font-mono text-sm">{COMPANY_INFO.phone}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#292524] hover:bg-[#44403C] transition-colors border border-[#44403C]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A8A29E] block">
                      Official Email
                    </span>
                    <strong className="text-white text-sm break-all">{COMPANY_INFO.email}</strong>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#292524] border border-[#44403C]">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A8A29E] block">
                      Headquarters
                    </span>
                    <strong className="text-white text-sm">{COMPANY_INFO.address}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Registration Block */}
            <div className="pt-6 border-t border-[#292524] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-[#10B981]">
                <FileBadge className="w-4 h-4 shrink-0" />
                <span>MSME Reg: <strong className="font-mono text-white">{COMPANY_INFO.udyamRegNo}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                <ShieldCheck className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Founder &amp; Proprietor: <strong className="text-white">{COMPANY_INFO.founder}</strong></span>
              </div>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Consultation</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#EBE8E1] shadow-sm">
            <h3 className="text-2xl font-black text-[#0A0A0B] mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] mb-8">
              Submissions are rate-limited and logged directly into our secure Supabase database.
            </p>

            {successMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Submission Confirmed!</strong>
                  <span>{successMessage}</span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Submission Error</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Vivek Chauhan"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#EBE8E1] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 rounded-xl outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#EBE8E1] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 rounded-xl outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* WhatsApp / Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                    WhatsApp / Contact Number (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 97211 76040"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#EBE8E1] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 rounded-xl outline-none transition-all"
                  />
                </div>

                {/* Service Requested */}
                <div>
                  <label htmlFor="service_requested" className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                    Service of Interest
                  </label>
                  <select
                    id="service_requested"
                    name="service_requested"
                    value={formData.service_requested}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#EBE8E1] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 rounded-xl outline-none transition-all"
                  >
                    {INITIAL_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Enterprise Consultation">
                      General Enterprise Consultation
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                  Project Scope &amp; Requirements *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your project goals, desired tech stack, timeframe, and budget expectations..."
                  className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#EBE8E1] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 rounded-xl outline-none transition-all resize-y"
                />
              </div>

              {/* Required Terms & Conditions and Privacy Policy Checkbox (Blank by default) */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE8E1] flex items-start gap-3 transition-colors hover:border-[#DCD8CF]">
                <input
                  id="terms_accepted"
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleCheckboxChange}
                  required
                  className="w-4 h-4 mt-0.5 rounded text-[#FF5500] focus:ring-[#FF5500] border-[#DCD8CF] accent-[#FF5500] cursor-pointer shrink-0"
                />
                <label htmlFor="terms_accepted" className="text-xs text-[#57534E] leading-relaxed cursor-pointer select-none">
                  I have read, understood, and agree to the{' '}
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    className="font-bold text-[#0A0A0B] underline hover:text-[#FF5500] transition-colors"
                  >
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="font-bold text-[#0A0A0B] underline hover:text-[#FF5500] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  . *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 text-sm font-black text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 disabled:opacity-50 active:scale-[0.99]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Transmitting to Remote Supabase...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry Direct to Engineering</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#A8A29E] pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Max 3 requests / 15 min per IP
                </span>
                <span>Protected by SHA-256 IP Rate Limiter</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
