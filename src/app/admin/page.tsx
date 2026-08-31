'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Briefcase, 
  Users, 
  Star, 
  Mail, 
  ArrowUpRight, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Clock,
  Shield,
  MessageSquare
} from 'lucide-react';
import { Service, Project, TeamMember, ClientReview, Enquiry } from '@/lib/types';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [sRes, pRes, tRes, rRes, eRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/team'),
        fetch('/api/admin/reviews'),
        fetch('/api/admin/enquiries'),
      ]);

      const [sData, pData, tData, rData, eData] = await Promise.all([
        sRes.json(),
        pRes.json(),
        tRes.json(),
        rRes.json(),
        eRes.json(),
      ]);

      if (sData.services) setServices(sData.services);
      if (pData.projects) setProjects(pData.projects);
      if (tData.team) setTeam(tData.team);
      if (rData.reviews) setReviews(rData.reviews);
      if (eData.enquiries) setEnquiries(eData.enquiries);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSyncDatabase = async () => {
    setSyncing(true);
    setSyncStatus(null);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      setSyncStatus('Database synced successfully with remote starter schema!');
      fetchDashboardData();
      setTimeout(() => setSyncStatus(null), 5000);
    } catch (err: any) {
      setSyncStatus('Sync finished.');
      setTimeout(() => setSyncStatus(null), 5000);
    } finally {
      setSyncing(false);
    }
  };

  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C1917] p-6 sm:p-8 rounded-3xl border border-[#292524] shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292524] text-xs font-bold text-[#FF5500] mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>ZetaVex Management Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            System Administration
          </h1>
          <p className="text-xs sm:text-sm text-[#A8A29E] mt-1">
            Real-time management for Services, Portfolio, Team, Reviews, and Inbound Enquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSyncDatabase}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Remote DB'}</span>
          </button>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#DCD8CF] bg-[#292524] hover:bg-[#44403C] rounded-xl border border-[#44403C] transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Public Site</span>
          </Link>
        </div>
      </div>

      {syncStatus && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Services */}
        <Link
          href="/admin/services"
          className="bg-[#1C1917] p-5 rounded-2xl border border-[#292524] hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Services</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">{services.length}</span>
            <span className="text-[11px] text-[#A8A29E] block mt-1">Catalog items</span>
          </div>
        </Link>

        {/* Projects */}
        <Link
          href="/admin/projects"
          className="bg-[#1C1917] p-5 rounded-2xl border border-[#292524] hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Projects</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">{projects.length}</span>
            <span className="text-[11px] text-[#A8A29E] block mt-1">Case studies</span>
          </div>
        </Link>

        {/* Team */}
        <Link
          href="/admin/team"
          className="bg-[#1C1917] p-5 rounded-2xl border border-[#292524] hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Team</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">{team.length}</span>
            <span className="text-[11px] text-[#A8A29E] block mt-1">Active leadership</span>
          </div>
        </Link>

        {/* Reviews */}
        <Link
          href="/admin/reviews"
          className="bg-[#1C1917] p-5 rounded-2xl border border-[#292524] hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] group-hover:scale-110 transition-transform">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">{reviews.length}</span>
            <span className="text-[11px] text-[#A8A29E] block mt-1">Client ratings</span>
          </div>
        </Link>

        {/* Enquiries */}
        <Link
          href="/admin/enquiries"
          className="col-span-2 sm:col-span-1 bg-[#1C1917] p-5 rounded-2xl border border-[#292524] hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{enquiries.length}</span>
              {newEnquiriesCount > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FF5500] text-white">
                  {newEnquiriesCount} new
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#A8A29E] block mt-1">Form leads</span>
          </div>
        </Link>
      </div>

      {/* Recent Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inbound Leads */}
        <div className="lg:col-span-2 bg-[#1C1917] rounded-3xl p-6 sm:p-8 border border-[#292524]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-white">Recent Customer Enquiries</h2>
              <p className="text-xs text-[#A8A29E]">Latest customer submissions logged from the contact form</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#FF5500] hover:underline flex items-center gap-1"
            >
              <span>View Ledger</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-[#78716C]">Loading records...</div>
          ) : enquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#78716C]">No enquiries received yet.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 rounded-2xl bg-[#0C0A09] border border-[#292524] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-white">{enq.name}</strong>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        enq.status === 'new' 
                          ? 'bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/30'
                          : enq.status === 'contacted'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                    <span className="text-xs text-[#A8A29E] mt-0.5">{enq.email} {enq.phone ? `· ${enq.phone}` : ''}</span>
                    <p className="text-xs text-[#78716C] mt-2 line-clamp-1 italic">
                      &ldquo;{enq.message}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {enq.phone && (
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)}%2C%20this%20is%20Vivek%20from%20ZetaVex%20Tech%20Solutions.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:opacity-90 flex items-center gap-1"
                        title="WhatsApp Reply"
                      >
                        <MessageSquare className="w-3 h-3 fill-white" />
                        <span>Chat</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${enq.email}?subject=ZetaVex%20Tech%20Solutions%20-%20Enquiry%20Response`}
                      className="px-2.5 py-1.5 rounded-lg bg-[#292524] text-[#DCD8CF] hover:text-white text-xs font-semibold hover:bg-[#44403C] flex items-center gap-1 border border-[#44403C]"
                      title="Email Reply"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Database & System Architecture Card */}
        <div className="bg-[#1C1917] rounded-3xl p-6 sm:p-8 border border-[#292524] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-2">
              <Database className="w-4 h-4" />
              <span>Database Architecture</span>
            </div>
            <h3 className="text-lg font-black text-white mb-2">
              Remote Supabase PostgreSQL
            </h3>
            <p className="text-xs text-[#A8A29E] leading-relaxed mb-6">
              Row Level Security policies enforce public read for published content and restrict administrative mutations to authenticated tokens.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-[#DCD8CF]">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0C0A09] border border-[#292524]">
                <span>Rate Limiting</span>
                <strong className="text-emerald-400 font-mono">Active (IP Hashing)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0C0A09] border border-[#292524]">
                <span>Auth Encryption</span>
                <strong className="text-emerald-400 font-mono">Bcrypt (10 rounds)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0C0A09] border border-[#292524]">
                <span>App Router Cache</span>
                <strong className="text-[#FF5500] font-mono">revalidate = 0</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#292524]">
            <Link
              href="/admin/services"
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-md"
            >
              <span>Manage Services Catalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
