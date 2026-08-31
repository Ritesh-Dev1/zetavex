'use client';

import React, { useState, useEffect } from 'react';
import { TeamMember } from '@/lib/types';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Linkedin,
  MessageCircle
} from 'lucide-react';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('+919721176040');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(1);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team');
      const data = await res.json();
      if (data.team) setTeam(data.team);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingMember(null);
    setName('');
    setRole('Senior Full-Stack Architect');
    setBio('');
    setPhotoUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
    setWhatsappNumber('+919721176040');
    setLinkedinUrl('https://linkedin.com');
    setSortOrder(team.length + 1);
    setStatus('active');
    setModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember(m);
    setName(m.name);
    setRole(m.role);
    setBio(m.bio);
    setPhotoUrl(m.photo_url || '');
    setWhatsappNumber(m.whatsapp_number || '');
    setLinkedinUrl(m.linkedin_url || '');
    setSortOrder(m.sort_order);
    setStatus(m.status);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingMember) {
        const res = await fetch('/api/admin/team', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingMember.id,
            name,
            role,
            bio,
            photo_url: photoUrl,
            whatsapp_number: whatsappNumber,
            linkedin_url: linkedinUrl,
            sort_order: Number(sortOrder),
            status,
          }),
        });
        if (!res.ok) throw new Error('Failed to update member');
        showNotification('success', 'Team member updated');
      } else {
        const res = await fetch('/api/admin/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            role,
            bio,
            photo_url: photoUrl,
            whatsapp_number: whatsappNumber,
            linkedin_url: linkedinUrl,
            sort_order: Number(sortOrder),
            status,
          }),
        });
        if (!res.ok) throw new Error('Failed to create member');
        showNotification('success', 'Team member added');
      }

      setModalOpen(false);
      fetchTeam();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      showNotification('success', 'Team member removed.');
      fetchTeam();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#FF5500]" />
            <span>Manage Team Members &amp; Leadership</span>
          </h1>
          <p className="text-xs text-[#A8A29E] mt-1">
            Maintain founder bio, engineering architects, contact channels, and photos.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
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

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-[#78716C]">Loading team...</div>
        ) : team.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-[#78716C]">No team members found.</div>
        ) : (
          team.map((m) => (
            <div
              key={m.id}
              className="bg-[#1C1917] rounded-3xl border border-[#292524] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={m.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={m.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-[#292524] shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-black text-white">{m.name}</h3>
                    <span className="text-xs text-[#FF5500] font-bold block">{m.role}</span>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      m.status === 'active' ? 'bg-emerald-950 text-emerald-400' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#A8A29E] leading-relaxed mb-4">{m.bio}</p>
              </div>

              <div className="pt-4 border-t border-[#292524] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {m.whatsapp_number && (
                    <a
                      href={`https://wa.me/${m.whatsapp_number.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366]"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {m.linkedin_url && (
                    <a
                      href={m.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-blue-950 text-blue-400"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="p-1.5 rounded-lg bg-[#292524] hover:bg-[#44403C] text-[#DCD8CF]"
                    title="Edit Member"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-300"
                    title="Delete Member"
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
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Vivek Chauhan"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    placeholder="Founder & Proprietor"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Professional Bio *
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  placeholder="Architectural background and leadership summary..."
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+919721176040"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    min={1}
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#292524] mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md"
                >
                  {editingMember ? 'Save Updates' : 'Add Member'}
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
