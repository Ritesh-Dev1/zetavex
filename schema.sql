-- ==============================================================================
-- ZETAVEX TECH SOLUTIONS - SUPABASE DATABASE SCHEMA & SECURITY POLICIES
-- ==============================================================================

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
    status TEXT NOT NULL DEFAULT 'active',
    reset_token_hash TEXT,
    reset_token_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at TIMESTAMPTZ
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Code',
    tech_tags TEXT[] NOT NULL DEFAULT '{}',
    sort_order INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PROJECTS / PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL DEFAULT 'Web Application',
    description TEXT NOT NULL,
    image_url TEXT,
    demo_url TEXT,
    tech_tags TEXT[] NOT NULL DEFAULT '{}',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT NOT NULL,
    photo_url TEXT,
    linkedin_url TEXT,
    whatsapp_number TEXT,
    sort_order INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. CLIENT REVIEWS / TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.client_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    role TEXT,
    avatar_url TEXT,
    quote TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. CONTACT ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_requested TEXT,
    message TEXT NOT NULL,
    ip_hash TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved', 'spam')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. RATE LIMITING TABLE
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_hash TEXT NOT NULL,
    action TEXT NOT NULL,
    window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
    request_count INT NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON public.rate_limits(key_hash, action, window_start);

-- ==============================================================================
-- STARTER SEED DATA
-- ==============================================================================

-- Seed Default Admin User: admin@zetavextech.com / ZetaVex@2026!
-- bcrypt hash for "ZetaVex@2026!"
INSERT INTO public.admin_users (email, password_hash, role, status)
VALUES (
    'admin@zetavextech.com',
    '$2a$10$9.rAovf.vQ3BqHk0jX9B7u3VzO9KzW5Vw7b0v9u6v3z1q8m5p2y2G',
    'super_admin',
    'active'
) ON CONFLICT (email) DO NOTHING;

-- Seed Founder: Vivek Chauhan
INSERT INTO public.team_members (name, role, bio, photo_url, whatsapp_number, linkedin_url, sort_order)
VALUES (
    'Vivek Chauhan',
    'Founder & Proprietor',
    'Visionary tech leader and full-stack software architect specializing in enterprise web applications, SaaS products, and digital business transformation.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    '+919721176040',
    'https://linkedin.com',
    1
) ON CONFLICT DO NOTHING;

-- Seed Default Services
INSERT INTO public.services (title, slug, description, icon_name, tech_tags, sort_order)
VALUES 
('Full-Stack Web Development', 'full-stack-web-dev', 'Custom Web Apps, Next.js, React, Node.js & Supabase architectures engineered for high concurrency and lightning-fast speed.', 'Code', ARRAY['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind'], 1),
('Custom SaaS Product Development', 'custom-saas-development', 'End-to-end SaaS platforms with multi-tenancy, subscription billing, interactive dashboards, and real-time analytics.', 'Layers', ARRAY['SaaS', 'Stripe', 'Supabase', 'Tailwind', 'Next.js'], 2),
('Mobile App Solutions', 'mobile-app-solutions', 'Cross-platform iOS and Android apps with offline synchronization, hardware integrations, and native push notifications.', 'Smartphone', ARRAY['React Native', 'Flutter', 'iOS', 'Android', 'PWA'], 3),
('Cloud Infrastructure & DevOps', 'cloud-infrastructure-devops', 'Scalable AWS, Vercel, and Docker deployments with automated CI/CD pipelines, container orchestration, and security audits.', 'Cloud', ARRAY['AWS', 'Docker', 'Vercel', 'CI/CD', 'Terraform'], 4),
('UI/UX Product Design', 'ui-ux-product-design', 'User-centric wireframing, interactive prototyping, and robust design systems crafted for high conversion and modern aesthetics.', 'Palette', ARRAY['Figma', 'Design Systems', 'Tailwind', 'Motion UI'], 5),
('API & Enterprise Integrations', 'api-enterprise-integrations', 'Resilient microservices, GraphQL and REST APIs, ERP/CRM integrations, and custom database optimization.', 'Zap', ARRAY['GraphQL', 'REST', 'PostgreSQL', 'Redis', 'Webhooks'], 6)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Projects
INSERT INTO public.projects (title, slug, category, description, image_url, demo_url, tech_tags, is_featured, sort_order, status)
VALUES
('Apex Logistics Portal', 'apex-logistics-portal', 'Web Application', 'Real-time fleet tracking, automated route dispatching, and enterprise cargo consignment management dashboard.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', 'https://apexlogistics.example.com', ARRAY['Next.js', 'Supabase', 'Mapbox', 'Tailwind CSS'], true, 1, 'published'),
('FinVanguard SaaS Platform', 'finvanguard-saas-platform', 'SaaS', 'Multi-tenant wealth intelligence SaaS featuring automated portfolio rebalancing and algorithmic tax harvesting.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 'https://finvanguard.example.com', ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL'], true, 2, 'published'),
('HealthPulse Telemed App', 'healthpulse-telemed-app', 'Mobile App Solutions', 'HIPAA-compliant cross-platform consultation app with encrypted video calls and digital prescription workflows.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', 'https://healthpulse.example.com', ARRAY['React Native', 'WebRTC', 'Fastify', 'Docker'], true, 3, 'published'),
('OmniCloud Orchestrator', 'omnicloud-orchestrator', 'Cloud Infrastructure & DevOps', 'Multi-region serverless cluster manager with automated horizontal autoscaling and real-time cost telemetry.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', 'https://omnicloud.example.com', ARRAY['AWS', 'Terraform', 'Kubernetes', 'Go'], false, 4, 'published')
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Client Reviews
INSERT INTO public.client_reviews (client_name, company_name, role, quote, rating)
VALUES 
('Rajesh Kumar', 'Apex Global Logistics', 'Director of Operations', 'ZetaVex delivered our enterprise logistics portal ahead of schedule. Their attention to security, real-time sync, and mobile responsiveness is outstanding!', 5),
('Sophia Martinez', 'Vanguard Fintech', 'Product Lead', 'Vivek and his team transformed our complex financial workflow into an intuitive SaaS app. Highly recommended for any serious custom software development.', 5),
('Amitabh Sharma', 'PulseHealth India', 'Founder & MD', 'The telehealth app created by ZetaVex exceeded our expectations. The video consultation reliability and clean UI have significantly boosted our patient retention.', 5)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) PROTECTION LAWS
-- ==============================================================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active services, projects, team, and reviews
DROP POLICY IF EXISTS "Public Read Active Services" ON public.services;
CREATE POLICY "Public Read Active Services" ON public.services FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public Read Published Projects" ON public.projects;
CREATE POLICY "Public Read Published Projects" ON public.projects FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public Read Active Team" ON public.team_members;
CREATE POLICY "Public Read Active Team" ON public.team_members FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public Read Approved Reviews" ON public.client_reviews;
CREATE POLICY "Public Read Approved Reviews" ON public.client_reviews FOR SELECT USING (is_approved = true);

-- Allow public form submission to enquiries
DROP POLICY IF EXISTS "Public Create Enquiries" ON public.enquiries;
CREATE POLICY "Public Create Enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
