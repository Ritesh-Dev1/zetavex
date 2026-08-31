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

export const revalidate = 0; // Dynamic data for live updates from admin

export default async function HomePage() {
  const [services, projects, team, reviews] = await Promise.all([
    getActiveServices(),
    getPublishedProjects(),
    getActiveTeamMembers(),
    getApprovedReviews(),
  ]);

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#0A0A0B]">
      {/* Sticky Desktop & Mobile Header */}
      <Header />

      {/* Main Marketing Sections */}
      <HeroSection />
      <ServicesSection initialServices={services} />
      <ProjectsSection initialProjects={projects} />
      <TeamSection initialTeam={team} />
      <ReviewsSection initialReviews={reviews} />
      <ContactSection />

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp & Call Actions */}
      <FloatingActions />

      {/* Fixed Mobile Bottom Navigation */}
      <MobileNav />
    </main>
  );
}
