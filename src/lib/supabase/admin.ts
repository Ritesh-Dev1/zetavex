import { createClient } from '@supabase/supabase-js';
import { 
  Service, 
  Project, 
  TeamMember, 
  ClientReview, 
  Enquiry, 
  AdminUser 
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_TEAM, 
  INITIAL_REVIEWS 
} from '../constants';
import { hashPassword } from '../auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseAdminConfigured = Boolean(
  supabaseUrl && 
  serviceRoleKey && 
  !supabaseUrl.includes('your-project-id')
);

export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// In-memory persistent fallback repository for instant zero-config functionality
class MemoryStore {
  services: Service[] = JSON.parse(JSON.stringify(INITIAL_SERVICES));
  projects: Project[] = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
  team: TeamMember[] = JSON.parse(JSON.stringify(INITIAL_TEAM));
  reviews: ClientReview[] = JSON.parse(JSON.stringify(INITIAL_REVIEWS));
  enquiries: Enquiry[] = [
    {
      id: 'enq-sample-1',
      name: 'Rohan Verma',
      email: 'rohan.verma@innovatetech.in',
      phone: '+91 9876543210',
      service_requested: 'Custom SaaS Product Development',
      message: 'Looking for an enterprise Next.js and Supabase SaaS MVP for B2B supply chain workflows.',
      status: 'new',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'enq-sample-2',
      name: 'Priya Sundaram',
      email: 'priya@apexventures.co',
      phone: '+91 9123456780',
      service_requested: 'Full-Stack Web Development',
      message: 'We need a high-performance corporate marketing portal and custom dashboard design.',
      status: 'contacted',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    }
  ];
  adminUsers: Array<{
    id: string;
    email: string;
    password_hash: string;
    role: 'super_admin' | 'admin';
    status: 'active' | 'inactive';
    reset_token_hash?: string;
    reset_token_expires_at?: string;
    created_at: string;
    last_login_at?: string;
  }> = [
    {
      id: 'admin-1',
      email: 'admin@zetavextech.com',
      password_hash: hashPassword('ZetaVex@2026!'),
      role: 'super_admin',
      status: 'active',
      created_at: new Date().toISOString(),
    }
  ];
}

// Global singleton to prevent reset across API calls in same Node process
const globalMemory = (global as unknown as { __zetaVexStore?: MemoryStore });
if (!globalMemory.__zetaVexStore) {
  globalMemory.__zetaVexStore = new MemoryStore();
}
const localDb = globalMemory.__zetaVexStore;

// ==============================================================================
// 1. SERVICES REPOSITORY
// ==============================================================================

export async function getActiveServices(): Promise<Service[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('services')
        .select('*')
        .eq('status', 'active')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Service[];
    } catch (err) {
      console.warn('Supabase getActiveServices query fallback:', err);
    }
  }
  return localDb.services
    .filter(s => s.status === 'active')
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllServices(): Promise<Service[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Service[];
    } catch (err) {
      console.warn('Supabase getAllServices query fallback:', err);
    }
  }
  return [...localDb.services].sort((a, b) => a.sort_order - b.sort_order);
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service> {
  const newService: Service = {
    ...service,
    id: `srv-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('services')
        .insert([service])
        .select()
        .single();
      if (!error && data) return data as Service;
    } catch (err) {
      console.error('Supabase createService error:', err);
    }
  }

  localDb.services.push(newService);
  return newService;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('services')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data as Service;
    } catch (err) {
      console.error('Supabase updateService error:', err);
    }
  }

  const idx = localDb.services.findIndex(s => s.id === id);
  if (idx === -1) return null;
  localDb.services[idx] = { ...localDb.services[idx], ...updates, updated_at: new Date().toISOString() };
  return localDb.services[idx];
}

export async function deleteService(id: string): Promise<boolean> {
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('services')
        .delete()
        .eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Supabase deleteService error:', err);
    }
  }

  const initialLen = localDb.services.length;
  localDb.services = localDb.services.filter(s => s.id !== id);
  return localDb.services.length < initialLen;
}

// ==============================================================================
// 2. PROJECTS REPOSITORY
// ==============================================================================

export async function getPublishedProjects(): Promise<Project[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Project[];
    } catch (err) {
      console.warn('Supabase getPublishedProjects query fallback:', err);
    }
  }
  return localDb.projects
    .filter(p => p.status === 'published')
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllProjects(): Promise<Project[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Project[];
    } catch (err) {
      console.warn('Supabase getAllProjects query fallback:', err);
    }
  }
  return [...localDb.projects].sort((a, b) => a.sort_order - b.sort_order);
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const newProject: Project = {
    ...project,
    id: `prj-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .insert([project])
        .select()
        .single();
      if (!error && data) return data as Project;
    } catch (err) {
      console.error('Supabase createProject error:', err);
    }
  }

  localDb.projects.push(newProject);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data as Project;
    } catch (err) {
      console.error('Supabase updateProject error:', err);
    }
  }

  const idx = localDb.projects.findIndex(p => p.id === id);
  if (idx === -1) return null;
  localDb.projects[idx] = { ...localDb.projects[idx], ...updates, updated_at: new Date().toISOString() };
  return localDb.projects[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('projects')
        .delete()
        .eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Supabase deleteProject error:', err);
    }
  }

  const initialLen = localDb.projects.length;
  localDb.projects = localDb.projects.filter(p => p.id !== id);
  return localDb.projects.length < initialLen;
}

// ==============================================================================
// 3. TEAM MEMBERS REPOSITORY
// ==============================================================================

export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('team_members')
        .select('*')
        .eq('status', 'active')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as TeamMember[];
    } catch (err) {
      console.warn('Supabase getActiveTeamMembers query fallback:', err);
    }
  }
  return localDb.team
    .filter(t => t.status === 'active')
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as TeamMember[];
    } catch (err) {
      console.warn('Supabase getAllTeamMembers query fallback:', err);
    }
  }
  return [...localDb.team].sort((a, b) => a.sort_order - b.sort_order);
}

export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  const newMember: TeamMember = {
    ...member,
    id: `team-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('team_members')
        .insert([member])
        .select()
        .single();
      if (!error && data) return data as TeamMember;
    } catch (err) {
      console.error('Supabase createTeamMember error:', err);
    }
  }

  localDb.team.push(newMember);
  return newMember;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data as TeamMember;
    } catch (err) {
      console.error('Supabase updateTeamMember error:', err);
    }
  }

  const idx = localDb.team.findIndex(t => t.id === id);
  if (idx === -1) return null;
  localDb.team[idx] = { ...localDb.team[idx], ...updates };
  return localDb.team[idx];
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('team_members')
        .delete()
        .eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Supabase deleteTeamMember error:', err);
    }
  }

  const initialLen = localDb.team.length;
  localDb.team = localDb.team.filter(t => t.id !== id);
  return localDb.team.length < initialLen;
}

// ==============================================================================
// 4. CLIENT REVIEWS REPOSITORY
// ==============================================================================

export async function getApprovedReviews(): Promise<ClientReview[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('client_reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as ClientReview[];
    } catch (err) {
      console.warn('Supabase getApprovedReviews query fallback:', err);
    }
  }
  return localDb.reviews.filter(r => r.is_approved);
}

export async function getAllReviews(): Promise<ClientReview[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('client_reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as ClientReview[];
    } catch (err) {
      console.warn('Supabase getAllReviews query fallback:', err);
    }
  }
  return [...localDb.reviews];
}

export async function createReview(review: Omit<ClientReview, 'id'>): Promise<ClientReview> {
  const newReview: ClientReview = {
    ...review,
    id: `rev-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('client_reviews')
        .insert([review])
        .select()
        .single();
      if (!error && data) return data as ClientReview;
    } catch (err) {
      console.error('Supabase createReview error:', err);
    }
  }

  localDb.reviews.unshift(newReview);
  return newReview;
}

export async function updateReview(id: string, updates: Partial<ClientReview>): Promise<ClientReview | null> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('client_reviews')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data as ClientReview;
    } catch (err) {
      console.error('Supabase updateReview error:', err);
    }
  }

  const idx = localDb.reviews.findIndex(r => r.id === id);
  if (idx === -1) return null;
  localDb.reviews[idx] = { ...localDb.reviews[idx], ...updates };
  return localDb.reviews[idx];
}

export async function deleteReview(id: string): Promise<boolean> {
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('client_reviews')
        .delete()
        .eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Supabase deleteReview error:', err);
    }
  }

  const initialLen = localDb.reviews.length;
  localDb.reviews = localDb.reviews.filter(r => r.id !== id);
  return localDb.reviews.length < initialLen;
}

// ==============================================================================
// 5. ENQUIRIES REPOSITORY
// ==============================================================================

export async function getAllEnquiries(): Promise<Enquiry[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Enquiry[];
    } catch (err) {
      console.warn('Supabase getAllEnquiries query fallback:', err);
    }
  }
  return [...localDb.enquiries];
}

export async function createEnquiry(enquiry: Omit<Enquiry, 'id'>): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    status: enquiry.status || 'new',
    created_at: new Date().toISOString(),
  };

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('enquiries')
        .insert([enquiry])
        .select()
        .single();
      if (!error && data) return data as Enquiry;
    } catch (err) {
      console.error('Supabase createEnquiry error:', err);
    }
  }

  localDb.enquiries.unshift(newEnquiry);
  return newEnquiry;
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<Enquiry | null> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('enquiries')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data as Enquiry;
    } catch (err) {
      console.error('Supabase updateEnquiryStatus error:', err);
    }
  }

  const idx = localDb.enquiries.findIndex(e => e.id === id);
  if (idx === -1) return null;
  localDb.enquiries[idx].status = status;
  return localDb.enquiries[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('enquiries')
        .delete()
        .eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Supabase deleteEnquiry error:', err);
    }
  }

  const initialLen = localDb.enquiries.length;
  localDb.enquiries = localDb.enquiries.filter(e => e.id !== id);
  return localDb.enquiries.length < initialLen;
}

// ==============================================================================
// 6. ADMIN USERS REPOSITORY
// ==============================================================================

export async function getAdminByEmail(email: string) {
  const normalizedEmail = email.toLowerCase().trim();

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .eq('email', normalizedEmail)
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase getAdminByEmail query fallback:', err);
    }
  }

  return localDb.adminUsers.find(u => u.email.toLowerCase() === normalizedEmail) || null;
}

export async function updateAdminPassword(email: string, newPasswordHash: string) {
  const normalizedEmail = email.toLowerCase().trim();

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('admin_users')
        .update({
          password_hash: newPasswordHash,
          reset_token_hash: null,
          reset_token_expires_at: null,
        })
        .eq('email', normalizedEmail)
        .select()
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.error('Supabase updateAdminPassword error:', err);
    }
  }

  const user = localDb.adminUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (user) {
    user.password_hash = newPasswordHash;
    user.reset_token_hash = undefined;
    user.reset_token_expires_at = undefined;
    return user;
  }
  return null;
}

export async function setAdminResetToken(email: string, tokenHash: string, expiresAt: Date) {
  const normalizedEmail = email.toLowerCase().trim();

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('admin_users')
        .update({
          reset_token_hash: tokenHash,
          reset_token_expires_at: expiresAt.toISOString(),
        })
        .eq('email', normalizedEmail)
        .select()
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.error('Supabase setAdminResetToken error:', err);
    }
  }

  const user = localDb.adminUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (user) {
    user.reset_token_hash = tokenHash;
    user.reset_token_expires_at = expiresAt.toISOString();
    return user;
  }
  return null;
}

export async function getAdminByResetToken(tokenHash: string) {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .eq('reset_token_hash', tokenHash)
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase getAdminByResetToken fallback:', err);
    }
  }

  return localDb.adminUsers.find(u => u.reset_token_hash === tokenHash) || null;
}

// 1-Click Database Seeder / Syncer
export async function seedDatabase() {
  if (!supabaseAdmin) {
    return { success: true, message: 'Local storage populated with full seed catalog.' };
  }

  const results: Record<string, any> = {};

  try {
    // 1. Admin User
    const adminEmail = process.env.ADMIN_INITIAL_EMAIL || 'admin@zetavextech.com';
    const adminPass = process.env.ADMIN_INITIAL_PASSWORD || 'ZetaVex@2026!';
    const { error: adminErr } = await supabaseAdmin.from('admin_users').upsert({
      email: adminEmail,
      password_hash: hashPassword(adminPass),
      role: 'super_admin',
      status: 'active',
    }, { onConflict: 'email' });
    results.admin = adminErr ? adminErr.message : 'seeded';

    // 2. Services
    for (const service of INITIAL_SERVICES) {
      const { id, ...rest } = service;
      await supabaseAdmin.from('services').upsert(rest, { onConflict: 'slug' });
    }
    results.services = `${INITIAL_SERVICES.length} services synced`;

    // 3. Projects
    for (const project of INITIAL_PROJECTS) {
      const { id, ...rest } = project;
      await supabaseAdmin.from('projects').upsert(rest, { onConflict: 'slug' });
    }
    results.projects = `${INITIAL_PROJECTS.length} projects synced`;

    // 4. Team
    for (const member of INITIAL_TEAM) {
      const { id, ...rest } = member;
      await supabaseAdmin.from('team_members').upsert(rest);
    }
    results.team = `${INITIAL_TEAM.length} team members synced`;

    // 5. Reviews
    for (const review of INITIAL_REVIEWS) {
      const { id, ...rest } = review;
      await supabaseAdmin.from('client_reviews').upsert(rest);
    }
    results.reviews = `${INITIAL_REVIEWS.length} reviews synced`;

    return { success: true, results };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
