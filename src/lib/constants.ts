import { Service, Project, TeamMember, ClientReview, Product } from './types';

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

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'ZetaPulse AI',
    slug: 'zetapulse-ai',
    tagline: 'Autonomous Multi-Agent AI Orchestration Engine',
    category: 'AI & Automation',
    description: 'Enterprise autonomous AI pipeline that integrates Claude, GPT-4, and Gemini with internal business databases, webhook dispatchers, and automated lead intelligence.',
    badge: 'Flagship AI',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://wa.me/919721176040?text=Hi%20ZetaVex%20Team%2C%20I%20would%20like%20a%20demo%20of%20ZetaPulse%20AI.',
    features: [
      'Multi-model LLM routing (Gemini 1.5, Claude 3.5, GPT-4o)',
      'Sub-second asynchronous task & webhook streaming',
      'Encrypted PostgreSQL vector embeddings & semantic search',
      'Role-based multi-tenant access controls (RBAC)'
    ],
    tech_tags: ['Next.js 14', 'Python', 'FastAPI', 'PostgreSQL', 'LangChain'],
    pricing_model: 'SaaS / Dedicated Instance',
    is_featured: true,
    status: 'live',
    sort_order: 1,
  },
  {
    id: 'prod-2',
    title: 'OmniSync CRM Suite',
    slug: 'omnisync-crm',
    tagline: 'Multi-Channel B2B Lead Verification & Pipeline Hub',
    category: 'SaaS & Growth',
    description: 'High-conversion CRM engine with real-time 4-pillar cross-platform lead verification, instant WhatsApp message triggers, and automated pipeline deal tracking.',
    badge: 'Growth SaaS',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://wa.me/919721176040?text=Hi%20ZetaVex%20Team%2C%20I%20would%20like%20a%20demo%20of%20OmniSync%20CRM.',
    features: [
      '4-Pillar Cross-Platform lead verification (Google, Reddit, LinkedIn, X)',
      'Instant automated WhatsApp & Email notification triggers',
      'Interactive Kanban deal pipeline with drag-and-drop',
      'One-click CSV/JSON export & custom webhook connectors'
    ],
    tech_tags: ['TypeScript', 'Supabase', 'Tailwind CSS', 'Redis', 'BullMQ'],
    pricing_model: 'Tiered Monthly Subscription',
    is_featured: true,
    status: 'live',
    sort_order: 2,
  },
  {
    id: 'prod-3',
    title: 'MediVex Clinical Core',
    slug: 'medivex-clinical',
    tagline: 'HIPAA/NABH-Ready EHR & Telehealth Management System',
    category: 'HealthTech',
    description: 'Modular clinical software suite with encrypted electronic health records, HD WebRTC telehealth video consultations, and digital prescription issuance.',
    badge: 'Enterprise MedTech',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://wa.me/919721176040?text=Hi%20ZetaVex%20Team%2C%20I%20would%20like%20a%20demo%20of%20MediVex%20Clinical%20Core.',
    features: [
      'End-to-end encrypted telehealth video consultation rooms',
      'Electronic Health Records (EHR) with ICD-10 medical tagging',
      'Doctor schedule management & instant patient booking engine',
      'Automated WhatsApp prescription & appointment reminders'
    ],
    tech_tags: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
    pricing_model: 'Hospital Licensing / Custom Setup',
    is_featured: true,
    status: 'live',
    sort_order: 3,
  },
  {
    id: 'prod-4',
    title: 'FleetFlow Telemetry Ops',
    slug: 'fleetflow-ops',
    tagline: 'Real-Time Logistics & Cargo Consignment Dashboard',
    category: 'Supply Chain & Logistics',
    description: 'Comprehensive transport logistics platform with live GPS vehicle telemetry, automated delivery dispatching, toll ledger, and offline-first driver PWA.',
    badge: 'High Throughput',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://wa.me/919721176040?text=Hi%20ZetaVex%20Team%2C%20I%20would%20like%20a%20demo%20of%20FleetFlow%20Ops.',
    features: [
      'Sub-second live GPS vehicle location tracking with Mapbox GL',
      'Automated route optimization & dynamic traffic re-routing',
      'Consignment tracking with proof-of-delivery digital signatures',
      'Fuel expenditure & toll tracking with ledger analytics'
    ],
    tech_tags: ['Next.js', 'Mapbox GL', 'Go', 'PostgreSQL PostGIS', 'Docker'],
    pricing_model: 'Per-Vehicle SaaS / On-Premise',
    is_featured: false,
    status: 'live',
    sort_order: 4,
  },
  {
    id: 'prod-5',
    title: 'SecureVex Edge Guard',
    slug: 'securevex-guard',
    tagline: 'Zero-Trust API Security & SQLi Sanitization Gateway',
    category: 'Cybersecurity',
    description: 'High-speed edge proxy that blocks SQL injection, XSS attacks, malicious scraping, and DDoS attempts before traffic touches your core backend database.',
    badge: 'Security Sentinel',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://wa.me/919721176040?text=Hi%20ZetaVex%20Team%2C%20I%20would%20like%20a%20demo%20of%20SecureVex%20Guard.',
    features: [
      'Pre-query SQL injection & XSS signature detection engine',
      'Cryptographic SHA-256 IP sliding-window rate limiting',
      'Edge JWT verification with automatic permission scoping',
      'Real-time intrusion telemetry & IP blacklist firewall'
    ],
    tech_tags: ['Rust', 'Next.js Edge', 'Cloudflare Workers', 'PostgreSQL'],
    pricing_model: 'Managed Cloud / Enterprise Proxy',
    is_featured: false,
    status: 'live',
    sort_order: 5,
  },
  {
    id: 'prod-6',
    title: 'PayVex Multi-Rail Checkout',
    slug: 'payvex-checkout',
    tagline: 'Smart Payment Orchestrator & Automated GST Invoicing',
    category: 'Fintech & Billing',
    description: 'Unified payment infrastructure supporting instant UPI auto-debit, international cards, multi-currency routing, and automated tax compliant invoicing.',
    badge: 'Fintech Ready',
    image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    demo_url: 'https://wa.me/919721176040?text=Hi%20ZetaVex%20Team%2C%20I%20would%20like%20a%20demo%20of%20PayVex%20Checkout.',
    features: [
      'Dynamic multi-gateway failover (Stripe, Razorpay, Cashfree)',
      'Automated GST compliant tax invoice generation & PDF dispatch',
      'Webhook reconciliation engine with zero transaction drop',
      'Custom embeddable checkout widget for React and Mobile'
    ],
    tech_tags: ['Next.js', 'FastAPI', 'Stripe', 'Razorpay', 'Redis'],
    pricing_model: 'Volume-Based Transaction API',
    is_featured: false,
    status: 'live',
    sort_order: 6,
  }
];

