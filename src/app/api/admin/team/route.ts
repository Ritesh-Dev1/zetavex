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

    if (!name || !role || !bio) {
      return NextResponse.json({ error: 'Name, role, and bio are required.' }, { status: 400 });
    }

    const member = await createTeamMember({
      name,
      role,
      bio,
      photo_url: photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      linkedin_url: linkedin_url || '',
      whatsapp_number: whatsapp_number || '+919721176040',
      sort_order: typeof sort_order === 'number' ? sort_order : 1,
      status: status || 'active',
    });

    revalidatePath('/');
    revalidatePath('/team');

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    console.error('Create team member error:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Team member ID is required.' }, { status: 400 });
    }

    const updated = await updateTeamMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Team member not found.' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/team');

    return NextResponse.json({ success: true, member: updated });
  } catch (error: any) {
    console.error('Update team member error:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
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

    if (!id) {
      return NextResponse.json({ error: 'Team member ID is required.' }, { status: 400 });
    }

    const success = await deleteTeamMember(id);
    revalidatePath('/');
    revalidatePath('/team');

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete team member error:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
