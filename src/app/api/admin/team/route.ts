import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { 
  getAllTeamMembers, 
  getActiveTeamMembers, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} from '@/lib/supabase/admin';
import { sanitizeText, sanitizeUrl, sanitizePhone } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publicOnly = searchParams.get('public') === 'true';

  if (publicOnly) {
    const team = await getActiveTeamMembers();
    return NextResponse.json({ team });
  }

  const session = getAdminSessionFromCookies();
  if (!session) {
    const team = await getActiveTeamMembers();
    return NextResponse.json({ team });
  }

  const team = await getAllTeamMembers();
  return NextResponse.json({ team });
}

export async function POST(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, role, bio, photo_url, linkedin_url, whatsapp_number, sort_order, status } = body;

    const cleanName = sanitizeText(name);
    const cleanRole = sanitizeText(role);
    const cleanBio = sanitizeText(bio);

    if (!cleanName || !cleanRole || !cleanBio) {
      return NextResponse.json({ error: 'Name, role, and bio are required.' }, { status: 400 });
    }

    const cleanPhoto = sanitizeUrl(photo_url);
    const cleanLinkedin = sanitizeUrl(linkedin_url);
    const cleanWhatsapp = sanitizePhone(whatsapp_number);

    const member = await createTeamMember({
      name: cleanName,
      role: cleanRole,
      bio: cleanBio,
      photo_url: cleanPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      linkedin_url: cleanLinkedin,
      whatsapp_number: cleanWhatsapp || '+919721176040',
      sort_order: typeof sort_order === 'number' ? sort_order : 1,
      status: ['active', 'inactive'].includes(status) ? status : 'active',
    });

    revalidatePath('/');
    revalidatePath('/team');

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    console.error('Create team member error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create team member' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, role, bio, photo_url, linkedin_url, whatsapp_number, sort_order, status } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid Team Member ID is required.' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (name !== undefined) updates.name = sanitizeText(name);
    if (role !== undefined) updates.role = sanitizeText(role);
    if (bio !== undefined) updates.bio = sanitizeText(bio);
    if (photo_url !== undefined) updates.photo_url = sanitizeUrl(photo_url);
    if (linkedin_url !== undefined) updates.linkedin_url = sanitizeUrl(linkedin_url);
    if (whatsapp_number !== undefined) updates.whatsapp_number = sanitizePhone(whatsapp_number);
    if (sort_order !== undefined) updates.sort_order = typeof sort_order === 'number' ? sort_order : 1;
    if (status !== undefined && ['active', 'inactive'].includes(status)) {
      updates.status = status;
    }

    const updated = await updateTeamMember(id.trim(), updates);
    if (!updated) {
      return NextResponse.json({ error: 'Team member not found.' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/team');

    return NextResponse.json({ success: true, member: updated });
  } catch (error: any) {
    console.error('Update team member error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid Team Member ID is required.' }, { status: 400 });
    }

    const success = await deleteTeamMember(id.trim());
    revalidatePath('/');
    revalidatePath('/team');

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete team member error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete team member' }, { status: 500 });
  }
}
