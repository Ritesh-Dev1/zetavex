'use client';

import React, { useState, useEffect } from 'react';
import { ClientReview } from '@/lib/types';
import { 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Quote
} from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ClientReview | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [isApproved, setIsApproved] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
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
    setEditingReview(null);
    setClientName('');
    setCompanyName('');
    setRole('Founder & CEO');
    setQuote('');
    setRating(5);
    setIsApproved(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (r: ClientReview) => {
    setEditingReview(r);
    setClientName(r.client_name);
    setCompanyName(r.company_name);
    setRole(r.role || '');
    setQuote(r.quote);
    setRating(r.rating);
    setIsApproved(r.is_approved);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingReview) {
        const res = await fetch('/api/admin/reviews', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingReview.id,
            client_name: clientName,
            company_name: companyName,
            role,
            quote,
            rating: Number(rating),
            is_approved: isApproved,
          }),
        });
        if (!res.ok) throw new Error('Failed to update review');
        showNotification('success', 'Review updated successfully');
      } else {
        const res = await fetch('/api/admin/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_name: clientName,
            company_name: companyName,
            role,
            quote,
            rating: Number(rating),
            is_approved: isApproved,
          }),
        });
        if (!res.ok) throw new Error('Failed to create review');
        showNotification('success', 'Review added successfully');
      }

      setModalOpen(false);
      fetchReviews();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      showNotification('success', 'Review deleted.');
      fetchReviews();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const handleToggleApproved = async (r: ClientReview) => {
    try {
      await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r.id, is_approved: !r.is_approved }),
      });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-[#FF5500]" />
            <span>Manage Client Reviews &amp; Testimonials</span>
          </h1>
          <p className="text-xs text-[#A8A29E] mt-1">
            Moderate, approve, and curate client endorsements rendered on the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md transition-all"
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

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-[#78716C]">Loading reviews...</div>
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
                          i < r.rating
                            ? 'fill-[#FF5500] text-[#FF5500]'
                            : 'fill-[#292524] text-[#292524]'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleToggleApproved(r)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      r.is_approved
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {r.is_approved ? 'Approved' : 'Pending'}
                  </button>
                </div>

                <p className="text-xs text-[#DCD8CF] italic leading-relaxed mb-6">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#292524] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{r.client_name}</h4>
                  <span className="text-[10px] text-[#A8A29E]">
                    {r.role ? `${r.role}, ` : ''}{r.company_name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(r)}
                    className="p-1.5 rounded-lg bg-[#292524] hover:bg-[#44403C] text-[#DCD8CF]"
                    title="Edit Review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-300"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1917] border border-[#292524] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white">
                {editingReview ? 'Edit Review' : 'Add Client Review'}
              </h3>
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
                    placeholder="Rajesh Kumar"
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
                    placeholder="Apex Global Logistics"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Client Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Director of Operations"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Star Rating (1-5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  required
                  placeholder="What did the client say about your engineering delivery and speed?"
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
                  <span>Approved for Public Website Display</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#292524] mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md"
                >
                  {editingReview ? 'Save Updates' : 'Add Review'}
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
