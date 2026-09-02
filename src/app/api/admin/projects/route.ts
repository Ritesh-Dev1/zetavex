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
import { sanitizeText, sanitizeSlug, sanitizeUrl, sanitizeTags } from '@/lib/sanitize';

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

    const cleanTitle = sanitizeText(title);
    const cleanDesc = sanitizeText(description);

    if (!cleanTitle || !cleanDesc) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const cleanSlug = sanitizeSlug(slug || cleanTitle);
    const cleanCategory = sanitizeText(category || 'Web Application');
    const cleanImageUrl = sanitizeUrl(image_url);
    const cleanDemoUrl = sanitizeUrl(demo_url);
    const cleanTags = sanitizeTags(tech_tags);

    const project = await createProject({
      title: cleanTitle,
      slug: cleanSlug,
      category: cleanCategory,
      description: cleanDesc,
      image_url: cleanImageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      demo_url: cleanDemoUrl,
      tech_tags: cleanTags,
      is_featured: Boolean(is_featured),
      sort_order: typeof sort_order === 'number' ? sort_order : 1,
      status: ['draft', 'published', 'archived'].includes(status) ? status : 'published',
    });

    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, slug, category, description, image_url, demo_url, tech_tags, is_featured, sort_order, status } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid Project ID is required.' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = sanitizeText(title);
    if (slug !== undefined) updates.slug = sanitizeSlug(slug);
    if (category !== undefined) updates.category = sanitizeText(category);
    if (description !== undefined) updates.description = sanitizeText(description);
    if (image_url !== undefined) updates.image_url = sanitizeUrl(image_url);
    if (demo_url !== undefined) updates.demo_url = sanitizeUrl(demo_url);
    if (tech_tags !== undefined) updates.tech_tags = sanitizeTags(tech_tags);
    if (is_featured !== undefined) updates.is_featured = Boolean(is_featured);
    if (sort_order !== undefined) updates.sort_order = typeof sort_order === 'number' ? sort_order : 1;
    if (status !== undefined && ['draft', 'published', 'archived'].includes(status)) {
      updates.status = status;
    }

    const updated = await updateProject(id.trim(), updates);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update project' }, { status: 500 });
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
      return NextResponse.json({ error: 'Valid Project ID is required.' }, { status: 400 });
    }

    const success = await deleteProject(id.trim());
    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete project' }, { status: 500 });
  }
}
