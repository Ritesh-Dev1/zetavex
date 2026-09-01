import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { 
  getAllProjects, 
  getPublishedProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publicOnly = searchParams.get('public') === 'true';

  if (publicOnly) {
    const projects = await getPublishedProjects();
    return NextResponse.json({ projects });
  }

  const session = getAdminSessionFromCookies();
  if (!session) {
    const projects = await getPublishedProjects();
    return NextResponse.json({ projects });
  }

  const projects = await getAllProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, category, description, image_url, demo_url, tech_tags, is_featured, sort_order, status } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const project = await createProject({
      title,
      slug: generatedSlug,
      category: category || 'Web Application',
      description,
      image_url: image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      demo_url: demo_url || '',
      tech_tags: Array.isArray(tech_tags) ? tech_tags : [],
      is_featured: Boolean(is_featured),
      sort_order: typeof sort_order === 'number' ? sort_order : 1,
      status: status || 'published',
    });

    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
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
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    const updated = await updateProject(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
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
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    const success = await deleteProject(id);
    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
