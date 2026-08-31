'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Enquiry } from '@/lib/types';
import { 
  Mail, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  MessageCircle,
  Download, 
  Filter,
  Clock,
  Send
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      if (data.enquiries) setEnquiries(data.enquiries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateStatus = async (id: string, status: Enquiry['status']) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      showNotification('success', `Status changed to "${status}"`);
      fetchEnquiries();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      showNotification('success', 'Enquiry deleted.');
      fetchEnquiries();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const filteredEnquiries = useMemo(() => {
    if (statusFilter === 'all') return enquiries;
    return enquiries.filter(e => e.status === statusFilter);
  }, [enquiries, statusFilter]);

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Status', 'Date', 'Message'];
    const rows = enquiries.map(e => [
      `"${e.id}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.phone || ''}"`,
      `"${e.service_requested || ''}"`,
      `"${e.status}"`,
      `"${e.created_at || ''}"`,
      `"${e.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zetavex_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#FF5500]" />
            <span>Customer Enquiries Ledger</span>
          </h1>
          <p className="text-xs text-[#A8A29E] mt-1">
            Review incoming project briefs, contact leads, and manage communication workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={enquiries.length === 0}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#DCD8CF] bg-[#292524] hover:bg-[#44403C] rounded-xl border border-[#44403C] transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border border-red-800 text-red-300'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'new', 'contacted', 'resolved', 'spam'].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
              statusFilter === tab
                ? 'bg-[#FF5500] text-white shadow-sm'
                : 'bg-[#1C1917] text-[#A8A29E] hover:text-white border border-[#292524]'
            }`}
          >
            {tab} ({tab === 'all' ? enquiries.length : enquiries.filter(e => e.status === tab).length})
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#78716C] bg-[#1C1917] rounded-3xl border border-[#292524]">
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#78716C] bg-[#1C1917] rounded-3xl border border-[#292524]">
            No enquiries found in this category.
          </div>
        ) : (
          filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-[#1C1917] rounded-3xl border border-[#292524] p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-xs"
            >
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-black text-white">{enq.name}</h3>
                  <span className="text-xs text-[#A8A29E]">{enq.email}</span>
                  {enq.phone && (
                    <span className="text-xs font-mono text-[#DCD8CF] bg-[#0C0A09] px-2.5 py-0.5 rounded-md border border-[#292524]">
                      {enq.phone}
                    </span>
                  )}
                  {enq.created_at && (
                    <span className="text-[11px] text-[#78716C] flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      {new Date(enq.created_at).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0C0A09] text-[#FF5500] border border-[#292524] w-fit">
                  Requested: {enq.service_requested || 'General Consultation'}
                </div>

                <div className="p-4 rounded-2xl bg-[#0C0A09] border border-[#292524] text-xs text-[#DCD8CF] leading-relaxed whitespace-pre-wrap">
                  {enq.message}
                </div>
              </div>

              {/* Status & Actions Column */}
              <div className="flex flex-col gap-3 shrink-0 md:w-52">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">
                    Workflow Status
                  </label>
                  <select
                    value={enq.status}
                    onChange={(e) => handleUpdateStatus(enq.id, e.target.value as any)}
                    className={`w-full px-3 py-2 text-xs font-bold uppercase rounded-xl border outline-none ${
                      enq.status === 'new'
                        ? 'bg-[#FF5500]/20 text-[#FF5500] border-[#FF5500]/40'
                        : enq.status === 'contacted'
                        ? 'bg-blue-950 text-blue-400 border-blue-800'
                        : enq.status === 'resolved'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-stone-900 text-stone-400 border-stone-800'
                    }`}
                  >
                    <option value="new">● New Lead</option>
                    <option value="contacted">● Contacted</option>
                    <option value="resolved">● Resolved</option>
                    <option value="spam">● Spam</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {enq.phone && (
                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20contacting%20ZetaVex%20Tech%20Solutions.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp Lead</span>
                    </a>
                  )}

                  <a
                    href={`mailto:${enq.email}?subject=ZetaVex%20Tech%20Solutions%20-%20Project%20Enquiry%20Response`}
                    className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-[#DCD8CF] hover:text-white bg-[#292524] hover:bg-[#44403C] rounded-xl border border-[#44403C] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>

                  <button
                    onClick={() => handleDelete(enq.id)}
                    className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
