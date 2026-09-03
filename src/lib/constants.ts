import { Service, Project, TeamMember, ClientReview } from './types';

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'ZetaVex Tech Solutions';
const companyShortName = process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME || 'ZetaVex';
const founder = process.env.NEXT_PUBLIC_FOUNDER_NAME || 'Vivek Chauhan';
const founderTitle = process.env.NEXT_PUBLIC_FOUNDER_TITLE || 'Founder & Proprietor';
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 9721176040';
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919721176040';
const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '') || '919721176040';
const cleanPhone = phone.replace(/[^0-9+]/g, '') || '+919721176040';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'zetavextech@outlook.com';
const address = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Rewari, Haryana, India';
const udyamRegNo = process.env.NEXT_PUBLIC_UDYAM_REG_NO || 'UDYAM-HR-15-0041364';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/zetavextech';
const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/zetavex-tech-solutions';
const heroValueProp = process.env.NEXT_PUBLIC_HERO_VALUE_PROP || 'Transforming ambitious ideas into scalable digital solutions for global enterprises.';

export const COMPANY_INFO = {
  name: companyName,
  shortName: companyShortName,
  tagline: 'Innovate · Develop · Deliver',
  slogan: 'Your Vision, Our Solution',
  founder: founder,
  founderTitle: founderTitle,
  phone: phone,
  whatsappNumber: whatsappNumber,
  whatsappUrl: `https://wa.me/${cleanWhatsapp}?text=Hi%20${encodeURIComponent(companyShortName)}%20Tech%20Team%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20project.`,
  callUrl: `tel:${cleanPhone.startsWith('+') ? cleanPhone : '+' + cleanPhone}`,
  email: email,
  address: address,
  udyamRegNo: udyamRegNo,
  instagramUrl: instagramUrl,
  linkedinUrl: linkedinUrl,
  heroValueProp: heroValueProp,
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Full-Stack Web Development',
    slug: 'full-stack-web-dev',
    description: 'Custom Web Apps, Next.js, React, Node.js & Supabase architectures engineered for high concurrency, lightning-fast rendering, and resilient scaling.',
    icon_name: 'Code',
    tech_tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    sort_order: 1,
    status: 'active',
  },
  {
    id: 's2',
    title: 'Custom SaaS Product Development',
    slug: 'custom-saas-development',
    description: 'End-to-end SaaS platforms with multi-tenancy, subscription billing, interactive analytics dashboards, and automated onboarding funnels.',
    icon_name: 'Layers',
    tech_tags: ['SaaS', 'Stripe', 'Supabase', 'Tailwind', 'Next.js'],
    sort_order: 2,
    status: 'active',
  },
  {
    id: 's3',
    title: 'Mobile App Solutions',
    slug: 'mobile-app-solutions',
    description: 'Cross-platform iOS and Android apps with offline data synchronization, biometric security, device hardware integration, and native push notifications.',
    icon_name: 'Smartphone',
    tech_tags: ['React Native', 'Flutter', 'iOS', 'Android', 'PWA'],
    sort_order: 3,
    status: 'active',
  },
  {
    id: 's4',
    title: 'Cloud Infrastructure & DevOps',
    slug: 'cloud-infrastructure-devops',
    description: 'Scalable AWS, Vercel, and Docker deployments with automated CI/CD pipelines, container orchestration, edge caching, and zero-downtime rollouts.',
    icon_name: 'Cloud',
    tech_tags: ['AWS', 'Docker', 'Vercel', 'CI/CD', 'Terraform'],
    sort_order: 4,
    status: 'active',
  },
  {
    id: 's5',
    title: 'UI/UX Product Design',
    slug: 'ui-ux-product-design',
    description: 'User-centric wireframing, high-fidelity interactive prototyping, design systems, and conversion-optimized interfaces built for maximum customer retention.',
    icon_name: 'Palette',
    tech_tags: ['Figma', 'Design Systems', 'Tailwind', 'Motion UI'],
    sort_order: 5,
    status: 'active',
  },
  {
    id: 's6',
    title: 'API & Enterprise Integrations',
    slug: 'api-enterprise-integrations',
    description: 'Resilient microservices, GraphQL and REST APIs, payment gateways, ERP/CRM hooks, and custom database tuning for high-throughput enterprise systems.',
    icon_name: 'Zap',
    tech_tags: ['GraphQL', 'REST', 'PostgreSQL', 'Redis', 'Webhooks'],
    sort_order: 6,
    status: 'active',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Apex Logistics Portal',
    slug: 'apex-logistics-portal',
    category: 'Web Application',
    description: 'Real-time fleet tracking, automated route dispatching, and enterprise cargo consignment management dashboard with instant analytics.',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://apexlogistics.example.com',
    tech_tags: ['Next.js', 'Supabase', 'Mapbox', 'Tailwind CSS'],
    is_featured: true,
    sort_order: 1,
    status: 'published',
  },
  {
    id: 'p2',
    title: 'FinVanguard SaaS Platform',
    slug: 'finvanguard-saas-platform',
    category: 'SaaS',
    description: 'Multi-tenant wealth intelligence SaaS featuring automated portfolio rebalancing, algorithmic tax harvesting, and bank-grade data security.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://finvanguard.example.com',
    tech_tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    is_featured: true,
    sort_order: 2,
    status: 'published',
  },
  {
    id: 'p3',
    title: 'HealthPulse Telemed App',
    slug: 'healthpulse-telemed-app',
    category: 'Mobile App Solutions',
    description: 'HIPAA-compliant cross-platform consultation app with encrypted video calls, automated doctor scheduling, and digital prescription workflows.',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://healthpulse.example.com',
    tech_tags: ['React Native', 'WebRTC', 'Fastify', 'Docker'],
    is_featured: true,
    sort_order: 3,
    status: 'published',
  },
  {
    id: 'p4',
    title: 'OmniCloud Orchestrator',
    slug: 'omnicloud-orchestrator',
    category: 'Cloud Infrastructure & DevOps',
    description: 'Multi-region serverless cluster manager with automated horizontal autoscaling, anomaly detection, and real-time cost telemetry.',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://omnicloud.example.com',
    tech_tags: ['AWS', 'Terraform', 'Kubernetes', 'Go'],
    is_featured: false,
    sort_order: 4,
    status: 'published',
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Vivek Chauhan',
    role: 'Founder & Proprietor',
    bio: 'Visionary tech leader and full-stack software architect specializing in enterprise web applications, SaaS products, and digital business transformation.',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    whatsapp_number: '+919721176040',
    linkedin_url: 'https://linkedin.com',
    sort_order: 1,
    status: 'active',
  },
];

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: 'r1',
    client_name: 'Rajesh Kumar',
    company_name: 'Apex Global Logistics',
    role: 'Director of Operations',
    quote: 'ZetaVex delivered our enterprise logistics portal ahead of schedule. Their attention to security, real-time sync, and mobile responsiveness is outstanding!',
    rating: 5,
    is_approved: true,
  },
  {
    id: 'r2',
    client_name: 'Sophia Martinez',
    company_name: 'Vanguard Fintech',
    role: 'Product Lead',
    quote: 'Vivek and his team transformed our complex financial workflow into an intuitive SaaS app. Highly recommended for any serious custom software development.',
    rating: 5,
    is_approved: true,
  },
  {
    id: 'r3',
    client_name: 'Amitabh Sharma',
    company_name: 'PulseHealth India',
    role: 'Founder & MD',
    quote: 'The telehealth app created by ZetaVex exceeded our expectations. The video consultation reliability and clean UI have significantly boosted our patient retention.',
    rating: 5,
    is_approved: true,
  },
];
