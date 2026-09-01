export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin';
  status: 'active' | 'inactive';
  created_at?: string;
  last_login_at?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  tech_tags: string[];
  sort_order: number;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url?: string;
  demo_url?: string;
  tech_tags: string[];
  is_featured: boolean;
  sort_order: number;
  status: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url?: string;
  linkedin_url?: string;
  whatsapp_number?: string;
  sort_order: number;
  status: 'active' | 'inactive';
  created_at?: string;
}

export interface ClientReview {
  id: string;
  client_name: string;
  company_name: string;
  role?: string;
  avatar_url?: string;
  quote: string;
  rating: number;
  is_approved: boolean;
  created_at?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_requested?: string;
  message: string;
  ip_hash?: string;
  status: 'new' | 'contacted' | 'resolved' | 'spam';
  terms_accepted?: boolean;
  terms_accepted_at?: string;
  created_at?: string;
}

export interface RateLimitRecord {
  id?: string;
  key_hash: string;
  action: string;
  window_start: string;
  request_count: number;
}

export interface AuthSession {
  userId: string;
  email: string;
  role: 'super_admin' | 'admin';
}
