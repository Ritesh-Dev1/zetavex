import { COMPANY_INFO, INITIAL_SERVICES } from './constants';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zetavextech.com';

export const PRIMARY_KEYWORDS = [
  'web development company',
  'custom web application development company',
  'custom healthcare software development company',
  'healthcare software development company',
  'digital transformation solutions company',
  'digital solutions company',
  'managed it services company acquired today',
  'managed it services company',
  'enterprise software development company',
  'custom SaaS development company',
  'full stack engineering agency',
  'Next.js development company',
  'React Native mobile app development',
  'cloud devops infrastructure company',
  'Vivek Chauhan',
  'ZetaVex Tech Solutions',
];

export const DEFAULT_SEO = {
  title: 'ZetaVex Tech Solutions — Web & Custom Healthcare Software Development Company',
  titleTemplate: '%s | ZetaVex Tech Solutions',
  description:
    'ZetaVex Tech Solutions is a premier custom web application development company, healthcare software development company, and digital transformation solutions company. We deliver scalable SaaS platforms, enterprise systems, and managed IT solutions across all modern tech stacks.',
  keywords: PRIMARY_KEYWORDS,
  siteName: 'ZetaVex Tech Solutions',
  locale: 'en_US',
  type: 'website',
  logoUrl: `${SITE_URL}/logo.png`,
  ogImageUrl: `${SITE_URL}/logo.png`,
};

// ==============================================================================
// SCHEMA.ORG JSON-LD GENERATORS
// ==============================================================================

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_INFO.name,
    alternateName: ['ZetaVex', 'ZetaVex Tech', 'ZetaVex Tech Solutions'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      caption: 'ZetaVex Tech Solutions Official Logo',
    },
    image: `${SITE_URL}/logo.png`,
    description: DEFAULT_SEO.description,
    founder: {
      '@type': 'Person',
      name: COMPANY_INFO.founder,
      jobTitle: COMPANY_INFO.founderTitle,
      url: `${SITE_URL}/team`,
      sameAs: [
        'https://linkedin.com',
        'https://wa.me/919721176040',
      ],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rewari',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9721176040',
        contactType: 'customer support and sales',
        email: COMPANY_INFO.email,
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    sameAs: [
      COMPANY_INFO.instagramUrl || 'https://www.instagram.com/zetavextech',
      COMPANY_INFO.linkedinUrl || 'https://www.linkedin.com/company/zetavex-tech-solutions',
    ],
    knowsAbout: [
      'Custom Web Application Development',
      'Healthcare Software Development',
      'Custom Healthcare Software Solutions',
      'Digital Transformation Solutions',
      'Managed IT Services',
      'Full-Stack Cloud Infrastructure',
      'Enterprise SaaS Architecture',
      'Cross-Platform Mobile App Engineering',
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY_INFO.name,
    description: DEFAULT_SEO.description,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

export function getServicesListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: INITIAL_SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        serviceType: service.title,
        url: `${SITE_URL}/services/${service.slug}`,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
