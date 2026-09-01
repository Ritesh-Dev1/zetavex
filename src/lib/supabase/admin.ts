import { createClient } from '@supabase/supabase-js';
import { 
  Service, 
  Project, 
  TeamMember, 
  ClientReview, 
  Enquiry, 
  AdminUser 
} from '../types';
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

// In-memory persistent fallback repository ONLY used when Supabase credentials are completely absent
class MemoryStore {
  services: Service[] = [];
  projects: Project[] = [];
  team: TeamMember[] = [];
  reviews: ClientReview[] = [];
  enquiries: Enquiry[] = [];
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
  }> = (() => {
    const envEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_INITIAL_EMAIL;
    const envPass = process.env.ADMIN_PASSWORD || process.env.ADMIN_INITIAL_PASSWORD;
    const envHash = process.env.ADMIN_PASSWORD_HASH;

    if (envEmail && (envPass || envHash)) {
      return [
        {
          id: 'admin-env-1',
          email: envEmail.toLowerCase().trim(),
          password_hash: envHash || hashPassword(envPass || ''),
          role: 'super_admin',
          status: 'active',
          created_at: new Date().toISOString(),
        }
      ];
    }
    return [];
  })();
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
      if (!error && data !== null) return data as Service[];
      if (error) console.error('Supabase getActiveServices error:', error);
    } catch (err) {
      console.error('Supabase getActiveServices exception:', err);
    }
    return [];
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
      if (!error && data !== null) return data as Service[];
      if (error) console.error('Supabase getAllServices error:', error);
    } catch (err) {
      console.error('Supabase getAllServices exception:', err);
    }
    return [];
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
      if (error) console.error('Supabase createService error:', error);
    } catch (err) {
      console.error('Supabase createService exception:', err);
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
      if (error) console.error('Supabase updateService error:', error);
    } catch (err) {
      console.error('Supabase updateService exception:', err);
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
      console.error('Supabase deleteService error:', error);
      return false;
    } catch (err) {
      console.error('Supabase deleteService exception:', err);
      return false;
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
      if (!error && data !== null) return data as Project[];
      if (error) console.error('Supabase getPublishedProjects error:', error);
    } catch (err) {
      console.error('Supabase getPublishedProjects exception:', err);
    }
    return [];
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
      if (!error && data !== null) return data as Project[];
      if (error) console.error('Supabase getAllProjects error:', error);
    } catch (err) {
      console.error('Supabase getAllProjects exception:', err);
    }
    return [];
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
      if (error) console.error('Supabase createProject error:', error);
    } catch (err) {
      console.error('Supabase createProject exception:', err);
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
      if (error) console.error('Supabase updateProject error:', error);
    } catch (err) {
      console.error('Supabase updateProject exception:', err);
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
      console.error('Supabase deleteProject error:', error);
      return false;
    } catch (err) {
      console.error('Supabase deleteProject exception:', err);
      return false;
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
      if (!error && data !== null) return data as TeamMember[];
      if (error) console.error('Supabase getActiveTeamMembers error:', error);
    } catch (err) {
      console.error('Supabase getActiveTeamMembers exception:', err);
    }
    return [];
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
      if (!error && data !== null) return data as TeamMember[];
      if (error) console.error('Supabase getAllTeamMembers error:', error);
    } catch (err) {
      console.error('Supabase getAllTeamMembers exception:', err);
    }
    return [];
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
      if (error) console.error('Supabase createTeamMember error:', error);
    } catch (err) {
      console.error('Supabase createTeamMember exception:', err);
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
      if (error) console.error('Supabase updateTeamMember error:', error);
    } catch (err) {
      console.error('Supabase updateTeamMember exception:', err);
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
      console.error('Supabase deleteTeamMember error:', error);
      return false;
    } catch (err) {
      console.error('Supabase deleteTeamMember exception:', err);
      return false;
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
      if (!error && data !== null) return data as ClientReview[];
      if (error) console.error('Supabase getApprovedReviews error:', error);
    } catch (err) {
      console.error('Supabase getApprovedReviews exception:', err);
    }
    return [];
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
      if (!error && data !== null) return data as ClientReview[];
      if (error) console.error('Supabase getAllReviews error:', error);
    } catch (err) {
      console.error('Supabase getAllReviews exception:', err);
    }
    return [];
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
      if (error) console.error('Supabase createReview error:', error);
    } catch (err) {
      console.error('Supabase createReview exception:', err);
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
      if (error) console.error('Supabase updateReview error:', error);
    } catch (err) {
      console.error('Supabase updateReview exception:', err);
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
      console.error('Supabase deleteReview error:', error);
      return false;
    } catch (err) {
      console.error('Supabase deleteReview exception:', err);
      return false;
    }
  }

  const initialLen = localDb.reviews.length;
  localDb.reviews = localDb.reviews.filter(r => r.id !== id);
  return localDb.reviews.length < initialLen;
}

// ==============================================================================
// 5. CONTACT ENQUIRIES REPOSITORY
// ==============================================================================

export async function getAllEnquiries(): Promise<Enquiry[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data !== null) return data as Enquiry[];
      if (error) console.error('Supabase getAllEnquiries error:', error);
    } catch (err) {
      console.error('Supabase getAllEnquiries exception:', err);
    }
    return [];
  }
  return [...localDb.enquiries];
}

export async function createEnquiry(enquiry: Omit<Enquiry, 'id'>): Promise<Enquiry> {
  const nowIso = new Date().toISOString();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    status: enquiry.status || 'new',
    terms_accepted: enquiry.terms_accepted ?? true,
    terms_accepted_at: enquiry.terms_accepted_at || nowIso,
    created_at: enquiry.created_at || nowIso,
  };

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('enquiries')
        .insert([{
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          service_requested: enquiry.service_requested,
          message: enquiry.message,
          ip_hash: enquiry.ip_hash,
          status: enquiry.status || 'new',
          terms_accepted: enquiry.terms_accepted ?? true,
          terms_accepted_at: enquiry.terms_accepted_at || nowIso,
        }])
        .select()
        .single();
      if (!error && data) return data as Enquiry;
      if (error) console.error('Supabase createEnquiry error:', error);
    } catch (err) {
      console.error('Supabase createEnquiry exception:', err);
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
      if (error) console.error('Supabase updateEnquiryStatus error:', error);
    } catch (err) {
      console.error('Supabase updateEnquiryStatus exception:', err);
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
      console.error('Supabase deleteEnquiry error:', error);
      return false;
    } catch (err) {
      console.error('Supabase deleteEnquiry exception:', err);
      return false;
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
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase getAdminByEmail error:', error);
      }
    } catch (err) {
      console.error('Supabase getAdminByEmail exception:', err);
    }
    return null;
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
      if (error) console.error('Supabase updateAdminPassword error:', error);
    } catch (err) {
      console.error('Supabase updateAdminPassword exception:', err);
    }
    return null;
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
      if (error) console.error('Supabase setAdminResetToken error:', error);
    } catch (err) {
      console.error('Supabase setAdminResetToken exception:', err);
    }
    return null;
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
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase getAdminByResetToken error:', error);
      }
    } catch (err) {
      console.error('Supabase getAdminByResetToken exception:', err);
    }
    return null;
  }

  return localDb.adminUsers.find(u => u.reset_token_hash === tokenHash) || null;
}

// Check if admin is configured in environment (.env)
export function isAdminConfiguredInEnv(): boolean {
  const envEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_INITIAL_EMAIL;
  const envPass = process.env.ADMIN_PASSWORD || process.env.ADMIN_INITIAL_PASSWORD;
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  return Boolean(envEmail && (envPass || envHash));
}
