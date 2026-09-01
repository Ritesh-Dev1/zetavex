import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import FloatingActions from '@/components/layout/FloatingActions';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import TeamSection from '@/components/home/TeamSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ContactSection from '@/components/home/ContactSection';
import { 
  getActiveServices, 
  getPublishedProjects, 
  getActiveTeamMembers, 
  getApprovedReviews 
} from '@/lib/supabase/admin';
import { getServicesListSchema, getBreadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600; // ISR Static Edge Caching for 0ms CPU & null function invocations

export default async function HomePage() {
  const [services, projects, team, reviews] = await Promise.all([
    getActiveServices(),
    getPublishedProjects(),
    getActiveTeamMembers(),
    getApprovedReviews(),
  ]);

  const servicesListSchema = getServicesListSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
  ]);

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B] overflow-x-hidden w-full max-w-full">
      {/* Schema.org Structured Data */}
      <JsonLd data={[servicesListSchema, breadcrumbSchema]} />

      {/* Sticky Desktop & Mobile Header */}
      <Header />

      {/* Main Marketing Sections (Limited to 4 cards on home with View More triggers) */}
      <HeroSection />
      <ServicesSection initialServices={services} limit={4} />
      <ProjectsSection initialProjects={projects} limit={4} />
      <TeamSection initialTeam={team} />
      <ReviewsSection initialReviews={reviews} limit={4} />
      <ContactSection />

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Actions */}
      <FloatingActions />

      {/* Fixed Mobile Bottom Navigation */}
      <MobileNav />
    </main>
  );
}
