'use client';

import React, { useState, useEffect } from 'react';
import { ClientReview } from '@/lib/types';
import { 
  Star, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Quote,
  Loader2
} from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [isApproved, setIsApproved] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setClientName('');
    setCompanyName('');
    setRole('Chief Technology Officer');
    setRating(5);
    setQuote('');
    setIsApproved(true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          company_name: companyName,
          role,
          rating: Number(rating),
          quote,
          is_approved: isApproved,
        }),
      });

      if (!res.ok) throw new Error('Failed to create review');
      showNotification('success', 'Review added successfully');
      setModalOpen(false);
      fetchReviews();
    } catch (err: any) {
      showNotification('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    // Instant Optimistic delete
    setReviews(prev => prev.filter(r => r.id !== id));
    showNotification('success', 'Review removed.');

    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    } catch (err: any) {
      showNotification('error', err.message);
      fetchReviews();
    }
  };

  const handleToggleApproval = async (r: ClientReview) => {
    const newApproval = !r.is_approved;
    
    // Instant Optimistic update
    setReviews(prev => prev.map(item => item.id === r.id ? { ...item, is_approved: newApproval } : item));

    try {
      await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r.id, is_approved: newApproval }),
      });
    } catch (err) {
      console.error(err);
      fetchReviews();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-[#FF5500]" />
            <span>Manage Client Endorsements &amp; Reviews</span>
          </h1>
          <p className="text-xs text-[#A8A29E] mt-1">
            Publish, edit, or approve verified ratings and quotes shown on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
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

      {/* Reviews Grid with Skeleton Loader */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-[#1C1917] rounded-3xl border border-[#292524] p-6 flex flex-col justify-between gap-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="w-24 h-4 bg-[#292524] rounded" />
                <div className="w-6 h-6 bg-[#292524] rounded" />
              </div>
              <div className="h-16 bg-[#292524] rounded" />
              <div className="h-10 bg-[#292524] rounded" />
            </div>
          ))
        ) : reviews.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-[#78716C]">No reviews found.</div>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="bg-[#1C1917] rounded-3xl border border-[#292524] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < r.rating ? 'fill-[#FF5500] text-[#FF5500]' : 'fill-[#292524] text-[#292524]'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#44403C]" />
                </div>

                <p className="text-xs text-[#DCD8CF] italic leading-relaxed mb-6">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-[#292524] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{r.client_name}</h4>
                    <p className="text-[11px] text-[#A8A29E]">
                      {r.role ? `${r.role}, ` : ''}{r.company_name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleApproval(r)}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold cursor-pointer transition-colors ${
                        r.is_approved
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {r.is_approved ? 'Approved' : 'Pending'}
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-300 active:scale-95"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1917] border border-[#292524] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white">Add Client Endorsement</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#292524] hover:bg-[#44403C] flex items-center justify-center text-xs text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    placeholder="e.g. Johnathan Hayes"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="e.g. CloudScale Global"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Chief Product Officer"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Rating (1 to 5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Endorsement Quote *
                </label>
                <textarea
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  required
                  placeholder="Share feedback on engineering velocity, architecture, and team collaboration..."
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                  <input
                    type="checkbox"
                    checked={isApproved}
                    onChange={(e) => setIsApproved(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF5500] focus:ring-[#FF5500]"
                  />
                  <span>Approve immediately for live public display</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#292524] mt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Add Review</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#A8A29E] hover:bg-[#292524] rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
