'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { COMPANY_INFO } from '@/lib/constants';
import { 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Server, 
  MessageSquare,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';

interface ProductsCatalogProps {
  products: Product[];
}

export default function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech_tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 sm:mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-white text-[#57534E] hover:text-[#1C1917] hover:bg-[#EBE8E1] border border-[#EBE8E1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
          <input
            type="text"
            placeholder="Search products, AI, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#EBE8E1] rounded-2xl focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 text-[#0A0A0B] placeholder:text-[#A8A29E] transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A8A29E] hover:text-[#1C1917]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Products Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
      {filteredProducts.length === 0 ? (
        <div className="w-full py-16 text-center bg-white rounded-3xl border border-[#EBE8E1] p-8 shadow-xs">
          <Cpu className="w-10 h-10 text-[#A8A29E] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#1C1917]">No Matching Products Found</h3>
          <p className="text-xs text-[#78716C] mt-1">Try selecting a different category or clearing your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EBE8E1] hover:border-[#FF5500]/40 transition-all duration-300 shadow-xs hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Cover Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1C1917]">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badges on Cover */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold text-[#1C1917] bg-[#FAF8F5]/90 backdrop-blur-md rounded-full border border-[#EBE8E1] shadow-xs">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-1 text-[10px] font-black text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] rounded-full shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{product.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline overlay at bottom of image */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight">
                      {product.title}
                    </h3>
                    <p className="text-xs text-[#EBE8E1] font-medium mt-0.5 line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex flex-col">
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-5 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Key Capabilities Checklist */}
                  <div className="mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] block mb-2.5">
                      Key Architecture Features
                    </span>
                    <ul className="space-y-2 text-xs text-[#292524]">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.tech_tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-[#F4F1EA] text-[#44403C] rounded-lg border border-[#EBE8E1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer & Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#EBE8E1]/60 mt-auto">
                <div className="flex items-center justify-between py-3 mb-3 text-xs">
                  <span className="text-[#78716C] font-semibold">Deployment:</span>
                  <span className="font-bold text-[#0A0A0B] bg-[#F4F1EA] px-2.5 py-1 rounded-md text-[11px]">
                    {product.pricing_model}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="flex-1 py-2.5 px-3 text-xs font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] rounded-xl border border-[#DCD8CF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={product.demo_url || COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] hover:opacity-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>Request Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Deep-Dive Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE8E1] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="px-2.5 py-1 text-xs font-bold text-[#FF5500] bg-[#FF5500]/10 rounded-full mb-2 inline-block">
                  {activeModalProduct.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0B]">
                  {activeModalProduct.title}
                </h3>
                <p className="text-sm font-semibold text-[#57534E] mt-1">
                  {activeModalProduct.tagline}
                </p>
              </div>

              <button
                onClick={() => setActiveModalProduct(null)}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-[#F4F1EA] hover:bg-[#EBE8E1] text-[#78716C] hover:text-[#0A0A0B] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#1C1917] mb-6">
              <img
                src={activeModalProduct.image_url}
                alt={activeModalProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Description */}
            <div className="mb-6">
              <h4 className="text-sm font-black text-[#0A0A0B] uppercase tracking-wider mb-2">
                Overview &amp; Business Value
              </h4>
              <p className="text-sm text-[#44403C] leading-relaxed">
                {activeModalProduct.description}
              </p>
            </div>

            {/* Architecture Features */}
            <div className="mb-6">
              <h4 className="text-sm font-black text-[#0A0A0B] uppercase tracking-wider mb-3">
                Full Feature Capabilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#292524]">
                {activeModalProduct.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE8E1]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-sm font-black text-[#0A0A0B] uppercase tracking-wider mb-2">
                Technology Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProduct.tech_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold bg-[#F4F1EA] text-[#1C1917] rounded-lg border border-[#EBE8E1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-[#EBE8E1]">
              <a
                href={`https://wa.me/919721176040?text=Hi%20ZetaVex%20Team%2C%20I%20would%20like%20to%20request%20a%20demo%20and%20architecture%20walkthrough%20of%20${encodeURIComponent(activeModalProduct.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] rounded-2xl shadow-md hover:opacity-95 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Request Private Demo &amp; Scope</span>
              </a>

              <button
                onClick={() => setActiveModalProduct(null)}
                className="w-full sm:w-auto py-3.5 px-6 text-sm font-bold text-[#1C1917] bg-[#F4F1EA] hover:bg-[#EBE8E1] rounded-2xl transition-colors border border-[#DCD8CF] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
