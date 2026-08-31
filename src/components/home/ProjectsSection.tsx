'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/lib/types';
import { COMPANY_INFO } from '@/lib/constants';
import { 
  ExternalLink, 
  Sparkles, 
  Layers, 
  CheckCircle, 
  ArrowUpRight 
} from 'lucide-react';

interface ProjectsSectionProps {
  initialProjects: Project[];
}

export default function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['All', ...Array.from(cats)];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return initialProjects;
    return initialProjects.filter((p) => p.category === selectedCategory);
  }, [initialProjects, selectedCategory]);

  return (
    <section id="projects" className="py-20 sm:py-24 bg-[#F4F1EA]/50 relative scroll-mt-16 border-t border-b border-[#EBE8E1]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE8E1] text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0B]">
            Proven Engineering in Production
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#57534E]">
            Explore select enterprise systems, SaaS platforms, and digital applications engineered across all modern tech stacks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-bold rounded-full transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-white text-[#57534E] hover:text-[#1C1917] hover:bg-[#EBE8E1] border border-[#EBE8E1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EBE8E1] hover:border-[#FF5500]/40 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1C1917]">
                <img
                  src={project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between gap-1">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-xs font-bold text-[#1C1917] bg-[#FAF8F5]/90 backdrop-blur-md rounded-full border border-[#EBE8E1] shadow-xs truncate max-w-[120px]">
                    {project.category}
                  </span>
                  {project.is_featured && (
                    <span className="px-2 py-0.5 text-[9px] sm:text-xs font-black text-white bg-[#FF5500] rounded-full shadow-sm flex items-center gap-1 shrink-0">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">Featured</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-3.5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-sm sm:text-lg lg:text-xl font-black text-[#0A0A0B] mb-1.5 sm:mb-2 group-hover:text-[#FF5500] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-[#57534E] leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech_tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-xs font-semibold bg-[#F4F1EA] text-[#44403C] rounded-md border border-[#EBE8E1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#EBE8E1]">
                    {project.demo_url ? (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold text-white bg-[#1C1917] hover:bg-[#FF5500] rounded-lg sm:rounded-xl transition-colors shadow-xs"
                      >
                        <span>Demo</span>
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    ) : (
                      <a
                        href={COMPANY_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold text-white bg-[#1C1917] hover:bg-[#FF5500] rounded-lg sm:rounded-xl transition-colors shadow-xs"
                      >
                        <span>Request Scope</span>
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
