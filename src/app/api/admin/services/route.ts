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

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const service = await createService({
      title,
      slug: generatedSlug,
      description,
      icon_name: icon_name || 'Code',
      tech_tags: Array.isArray(tech_tags) ? tech_tags : [],
      sort_order: typeof sort_order === 'number' ? sort_order : 1,
      status: status || 'active',
    });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath(`/services/${generatedSlug}`);

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
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
      return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
    }

    const updated = await updateService(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/services');
    if (updated.slug) revalidatePath(`/services/${updated.slug}`);

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
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
      return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
    }

    const success = await deleteService(id);
    revalidatePath('/');
    revalidatePath('/services');

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete service error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
