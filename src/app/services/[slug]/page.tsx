import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import ContactSection from '@/components/home/ContactSection';
import { getActiveServices } from '@/lib/supabase/admin';
import { COMPANY_INFO, INITIAL_SERVICES } from '@/lib/constants';
import { getBreadcrumbSchema, PRIMARY_KEYWORDS, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Sparkles, 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle2, 
  Code, 
  Layers, 
  Smartphone, 
  Cloud, 
  Palette, 
  Zap, 
  Globe, 
  Database, 
  Server,
  Home,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import type { Metadata } from 'next';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Layers,
  Smartphone,
  Cloud,
  Palette,
  Zap,
  Globe,
  Database,
  Server,
};

export const revalidate = 3600; // Static Edge ISR Caching

interface ServiceSlugPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = await getActiveServices();
  const allServices = services.length > 0 ? services : INITIAL_SERVICES;
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceSlugPageProps): Promise<Metadata> {
  const services = await getActiveServices();
  const service = services.find(s => s.slug === params.slug) || INITIAL_SERVICES.find(s => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found — ZetaVex Tech Solutions',
    };
  }

  const canonicalUrl = `${SITE_URL}/services/${service.slug}`;
  const pageTitle = `${service.title.slice(0, 50)} | ZetaVex`;
  const rawDesc = service.description.trim();
  const pageDesc = rawDesc.length > 144 ? `${rawDesc.slice(0, 144)}...` : rawDesc;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [...PRIMARY_KEYWORDS, service.title, ...service.tech_tags],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      type: 'article',
      images: [{ url: '/logo.png', width: 800, height: 800, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['/logo.png'],
    },
  };
}

export default async function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const services = await getActiveServices();
  const service = services.find(s => s.slug === params.slug) || INITIAL_SERVICES.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon_name] || Code;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Corporation',
      name: COMPANY_INFO.name,
      url: SITE_URL,
    },
    serviceType: service.title,
    url: `${SITE_URL}/services/${service.slug}`,
  };

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B]">
      <JsonLd data={[breadcrumbSchema, serviceSchema]} />
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#F4F1EA] to-[#FAF8F5] border-b border-[#EBE8E1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Visible Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-semibold text-[#78716C] mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-[#FF5500] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#DCD8CF]" />
            <Link href="/services" className="hover:text-[#FF5500] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#DCD8CF]" />
            <span className="text-[#0A0A0B] font-bold truncate max-w-[200px] sm:max-w-none">{service.title}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#EBE8E1] flex items-center justify-center text-[#FF5500] shadow-sm shrink-0">
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE8E1] text-[11px] font-bold text-[#FF5500] uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Enterprise Service Specification</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0B] mb-4">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/919721176040?text=Hi%20ZetaVex%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5500] to-[#FF3366] rounded-xl shadow-md hover:opacity-95 transition-opacity"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Get a Quote for this Service</span>
                </a>

                <a
                  href="#contact"
                  className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#1C1917] bg-white hover:bg-[#F4F1EA] rounded-xl border border-[#DCD8CF] transition-colors"
                >
                  <span>Submit Detailed Brief</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Architectural Deliverables */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Included Tech Stacks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE8E1] shadow-xs">
              <h2 className="text-xl font-black text-[#0A0A0B] mb-2 flex items-center gap-2">
                <Code className="w-5 h-5 text-[#FF5500]" />
                <span>Included Tooling &amp; Frameworks</span>
              </h2>
              <p className="text-xs text-[#78716C] mb-6">
                Engineered with cutting-edge industry standards across the entire stack.
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tech_tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold bg-[#FAF8F5] text-[#1C1917] rounded-xl border border-[#EBE8E1]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Guarantees */}
            <div className="bg-[#1C1917] text-white rounded-3xl p-6 sm:p-8 border border-[#292524] shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FF5500]" />
                  <span>Engineering Guarantees</span>
                </h2>
                <p className="text-xs text-[#A8A29E] mb-6">
                  Every deliverable meets enterprise benchmarks for speed, security, and scalability.
                </p>

                <ul className="flex flex-col gap-3 text-xs text-[#DCD8CF]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>Zero-Downtime Deployment &amp; CI/CD Pipelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>Row Level Security &amp; Data Encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>Mobile First Responsive Design (3-col desktop, 2-col mobile)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#292524]">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Talk with Vivek on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inbound Contact Section */}
      <ContactSection />

      <Footer />
      <FloatingActions />
      <MobileNav />
    </main>
  );
}
