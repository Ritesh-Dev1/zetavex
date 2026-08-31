'use client';

import React, { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Code,
  Smartphone,
  Cloud,
  Palette,
  Zap,
  Globe,
  Database,
  Server
} from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Code');
  const [techTagsStr, setTechTagsStr] = useState('');
  const [sortOrder, setSortOrder] = useState(1);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setIconName('Code');
    setTechTagsStr('Next.js, React, Node.js');
    setSortOrder(services.length + 1);
    setStatus('active');
    setModalOpen(true);
  };

  const handleOpenEdit = (s: Service) => {
    setEditingService(s);
    setTitle(s.title);
    setSlug(s.slug);
    setDescription(s.description);
    setIconName(s.icon_name || 'Code');
    setTechTagsStr(s.tech_tags.join(', '));
    setSortOrder(s.sort_order);
    setStatus(s.status);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tech_tags = techTagsStr
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    try {
      if (editingService) {
        // Edit PUT
        const res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingService.id,
            title,
            slug,
            description,
            icon_name: iconName,
            tech_tags,
            sort_order: Number(sortOrder),
            status,
          }),
        });
        if (!res.ok) throw new Error('Failed to update service');
        showNotification('success', 'Service updated successfully');
      } else {
        // Create POST
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            slug,
            description,
            icon_name: iconName,
            tech_tags,
            sort_order: Number(sortOrder),
            status,
          }),
        });
        if (!res.ok) throw new Error('Failed to create service');
        showNotification('success', 'Service created successfully');
      }

      setModalOpen(false);
      fetchServices();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      showNotification('success', 'Service deleted.');
      fetchServices();
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const handleToggleStatus = async (s: Service) => {
    const newStatus = s.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: s.id, status: newStatus }),
      });
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#FF5500]" />
            <span>Manage Services Catalog</span>
          </h1>
          <p className="text-xs text-[#A8A29E] mt-1">
            Create, modify, reorder, or toggle capabilities rendered on the live marketing website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
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

      {/* Services Table / Cards */}
      <div className="bg-[#1C1917] rounded-3xl border border-[#292524] overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#78716C]">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#78716C]">No services found. Click &ldquo;Add New Service&rdquo; to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#DCD8CF]">
              <thead className="bg-[#0C0A09] text-[11px] font-bold uppercase tracking-wider text-[#A8A29E] border-b border-[#292524]">
                <tr>
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-4">Title &amp; Icon</th>
                  <th className="py-3.5 px-4">Tech Tags</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292524]">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-[#292524]/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-white">
                      #{s.sort_order}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0C0A09] border border-[#292524] flex items-center justify-center text-[#FF5500] font-mono text-xs">
                          {s.icon_name}
                        </div>
                        <div>
                          <strong className="text-sm font-bold text-white block">{s.title}</strong>
                          <span className="text-[11px] text-[#A8A29E] font-mono">{s.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {s.tech_tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-[#0C0A09] text-[10px] text-[#DCD8CF] border border-[#292524]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(s)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase cursor-pointer transition-colors ${
                          s.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {s.status}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 rounded-lg bg-[#292524] hover:bg-[#44403C] text-[#DCD8CF] hover:text-white transition-colors"
                          title="Edit Service"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-300 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1917] border border-[#292524] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#292524] hover:bg-[#44403C] flex items-center justify-center text-xs text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Full-Stack Web Development"
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Slug (Unique URL)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. full-stack-web-dev"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Icon Name
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  >
                    <option value="Code">Code</option>
                    <option value="Layers">Layers</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Palette">Palette</option>
                    <option value="Zap">Zap</option>
                    <option value="Globe">Globe</option>
                    <option value="Database">Database</option>
                    <option value="Server">Server</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Explain what this capability entails..."
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Tech Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={techTagsStr}
                  onChange={(e) => setTechTagsStr(e.target.value)}
                  placeholder="Next.js, React, Node.js, PostgreSQL"
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
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
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#292524] mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md"
                >
                  {editingService ? 'Save Updates' : 'Create Service'}
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
