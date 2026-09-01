import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { INITIAL_SERVICES, INITIAL_PROJECTS } from '@/lib/constants';
import { getActiveServices, getPublishedProjects } from '@/lib/supabase/admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Fetch live services and projects
  let services = INITIAL_SERVICES;
  let projects = INITIAL_PROJECTS;

  try {
    const liveServices = await getActiveServices();
    if (liveServices && liveServices.length > 0) services = liveServices;
  } catch (e) {
    // fallback to initial
  }

  try {
    const liveProjects = await getPublishedProjects();
    if (liveProjects && liveProjects.length > 0) projects = liveProjects;
  } catch (e) {
    // fallback to initial
  }

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/team`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic Service Routes
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Project Routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
