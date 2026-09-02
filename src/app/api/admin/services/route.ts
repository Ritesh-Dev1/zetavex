import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { 
  getAllServices, 
  getActiveServices, 
  createService, 
  updateService, 
  deleteService 
} from '@/lib/supabase/admin';
import { sanitizeText, sanitizeSlug, sanitizeTags } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publicOnly = searchParams.get('public') === 'true';

  if (publicOnly) {
    const services = await getActiveServices();
    return NextResponse.json({ services });
  }

  const session = getAdminSessionFromCookies();
  if (!session) {
    const services = await getActiveServices();
    return NextResponse.json({ services });
  }

  const services = await getAllServices();
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, description, icon_name, tech_tags, sort_order, status } = body;

    const cleanTitle = sanitizeText(title);
    const cleanDesc = sanitizeText(description);

    if (!cleanTitle || !cleanDesc) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const cleanSlug = sanitizeSlug(slug || cleanTitle);
    const cleanIcon = sanitizeText(icon_name || 'Code');
    const cleanTags = sanitizeTags(tech_tags);

    const service = await createService({
      title: cleanTitle,
      slug: cleanSlug,
      description: cleanDesc,
      icon_name: cleanIcon,
      tech_tags: cleanTags,
      sort_order: typeof sort_order === 'number' ? sort_order : 1,
      status: ['active', 'inactive'].includes(status) ? status : 'active',
    });

    revalidatePath('/');
    revalidatePath('/services');

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, slug, description, icon_name, tech_tags, sort_order, status } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid Service ID is required.' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = sanitizeText(title);
    if (slug !== undefined) updates.slug = sanitizeSlug(slug);
    if (description !== undefined) updates.description = sanitizeText(description);
    if (icon_name !== undefined) updates.icon_name = sanitizeText(icon_name);
    if (tech_tags !== undefined) updates.tech_tags = sanitizeTags(tech_tags);
    if (sort_order !== undefined) updates.sort_order = typeof sort_order === 'number' ? sort_order : 1;
    if (status !== undefined && ['active', 'inactive'].includes(status)) {
      updates.status = status;
    }

    const updated = await updateService(id.trim(), updates);
    if (!updated) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/services');

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update service' }, { status: 500 });
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
      return NextResponse.json({ error: 'Valid Service ID is required.' }, { status: 400 });
    }

    const success = await deleteService(id.trim());
    revalidatePath('/');
    revalidatePath('/services');

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete service error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete service' }, { status: 500 });
  }
}
