'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { 
  Briefcase, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Web Application');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [techTagsStr, setTechTagsStr] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(1);
  const [status, setStatus] = useState<'published' | 'draft' | 'archived'>('published');

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setCategory('Web Application');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80');
    setDemoUrl('');
    setTechTagsStr('React, Node.js, Tailwind');
    setIsFeatured(false);
    setSortOrder(projects.length + 1);
    setStatus('published');
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setDescription(p.description);
    setImageUrl(p.image_url || '');
    setDemoUrl(p.demo_url || '');
    setTechTagsStr(p.tech_tags.join(', '));
    setIsFeatured(p.is_featured);
    setSortOrder(p.sort_order);
    setStatus(p.status);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const tech_tags = techTagsStr
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    try {
      if (editingProject) {
        // Optimistic UI update
        setProjects(prev => prev.map(p => p.id === editingProject.id ? {
          ...p,
          title,
          slug,
          category,
          description,
          image_url: imageUrl,
          demo_url: demoUrl,
          tech_tags,
          is_featured: isFeatured,
          sort_order: Number(sortOrder),
          status,
        } : p));

        const res = await fetch('/api/admin/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProject.id,
            title,
            slug,
            category,
            description,
            image_url: imageUrl,
            demo_url: demoUrl,
            tech_tags,
            is_featured: isFeatured,
            sort_order: Number(sortOrder),
            status,
          }),
        });
        if (!res.ok) throw new Error('Failed to update project');
        showNotification('success', 'Project updated successfully');
      } else {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            slug,
            category,
            description,
            image_url: imageUrl,
            demo_url: demoUrl,
            tech_tags,
            is_featured: isFeatured,
            sort_order: Number(sortOrder),
            status,
          }),
        });
        if (!res.ok) throw new Error('Failed to create project');
        showNotification('success', 'Project added successfully');
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      showNotification('error', err.message);
      fetchProjects();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    // Instant Optimistic delete
    setProjects(prev => prev.filter(p => p.id !== id));
    showNotification('success', 'Project deleted.');

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    } catch (err: any) {
      showNotification('error', err.message);
      fetchProjects();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#FF5500]" />
            <span>Manage Portfolio &amp; Case Studies</span>
          </h1>
          <p className="text-xs text-[#A8A29E] mt-1">
            Showcase live production systems, descriptions, tech stacks, and demo URLs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#ff6a20] rounded-xl shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
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

      {/* Projects Grid with Skeleton Loader */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#1C1917] rounded-3xl border border-[#292524] overflow-hidden p-4 flex flex-col gap-3 animate-pulse">
              <div className="aspect-[16/10] bg-[#292524] rounded-2xl w-full" />
              <div className="h-5 bg-[#292524] rounded w-3/4" />
              <div className="h-3 bg-[#292524] rounded w-full" />
              <div className="h-3 bg-[#292524] rounded w-1/2" />
            </div>
          ))
        ) : projects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-[#78716C]">No projects found.</div>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="bg-[#1C1917] rounded-3xl border border-[#292524] overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#0C0A09]">
                <img
                  src={p.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#0C0A09]/90 backdrop-blur-md text-white border border-[#292524]">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {p.is_featured && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FF5500] text-white">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      p.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-white mb-1.5">{p.title}</h3>
                  <p className="text-xs text-[#A8A29E] line-clamp-2 mb-4 leading-relaxed">{p.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.tech_tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] bg-[#0C0A09] text-[#DCD8CF] rounded border border-[#292524]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#292524] flex items-center justify-between">
                  {p.demo_url ? (
                    <a
                      href={p.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#FF5500] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Demo Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-[#78716C]">No demo link</span>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg bg-[#292524] hover:bg-[#44403C] text-[#DCD8CF] active:scale-95"
                      title="Edit Project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-300 active:scale-95"
                      title="Delete Project"
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1C1917] border border-[#292524] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
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
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Apex Logistics Portal"
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="apex-logistics-portal"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Web Application / SaaS"
                    className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                  />
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
                  placeholder="Summarize the project capabilities and engineering highlights..."
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A8A29E] mb-1">
                  Live Demo / Case Study URL
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://clientdemo.example.com"
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
                  placeholder="React, Node.js, PostgreSQL, Tailwind"
                  className="w-full px-3.5 py-2.5 bg-[#0C0A09] border border-[#292524] focus:border-[#FF5500] rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
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
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-[#FF5500] focus:ring-[#FF5500]"
                    />
                    <span>Featured</span>
                  </label>
                </div>
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
                    <span>{editingProject ? 'Save Updates' : 'Add Project'}</span>
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
