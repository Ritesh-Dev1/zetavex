import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { 
  getAllReviews, 
  getApprovedReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '@/lib/supabase/admin';
import { sanitizeText, sanitizeUrl } from '@/lib/sanitize';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publicOnly = searchParams.get('public') === 'true';

  if (publicOnly) {
    const reviews = await getApprovedReviews();
    return NextResponse.json({ reviews });
  }

  const session = getAdminSessionFromCookies();
  if (!session) {
    const reviews = await getApprovedReviews();
    return NextResponse.json({ reviews });
  }

  const reviews = await getAllReviews();
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { client_name, company_name, role, avatar_url, quote, rating, is_approved } = body;

    const cleanClient = sanitizeText(client_name);
    const cleanCompany = sanitizeText(company_name);
    const cleanQuote = sanitizeText(quote);

    if (!cleanClient || !cleanCompany || !cleanQuote) {
      return NextResponse.json(
        { error: 'Client name, company name, and review quote are required.' },
        { status: 400 }
      );
    }

    const cleanRole = sanitizeText(role || '');
    const cleanAvatar = sanitizeUrl(avatar_url);

    const review = await createReview({
      client_name: cleanClient,
      company_name: cleanCompany,
      role: cleanRole,
      avatar_url: cleanAvatar,
      quote: cleanQuote,
      rating: typeof rating === 'number' ? Math.max(1, Math.min(5, rating)) : 5,
      is_approved: is_approved !== undefined ? Boolean(is_approved) : true,
    });

    revalidatePath('/');

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    console.error('Create review error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create review' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, client_name, company_name, role, avatar_url, quote, rating, is_approved } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid Review ID is required.' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (client_name !== undefined) updates.client_name = sanitizeText(client_name);
    if (company_name !== undefined) updates.company_name = sanitizeText(company_name);
    if (role !== undefined) updates.role = sanitizeText(role);
    if (avatar_url !== undefined) updates.avatar_url = sanitizeUrl(avatar_url);
    if (quote !== undefined) updates.quote = sanitizeText(quote);
    if (rating !== undefined) updates.rating = typeof rating === 'number' ? Math.max(1, Math.min(5, rating)) : 5;
    if (is_approved !== undefined) updates.is_approved = Boolean(is_approved);

    const updated = await updateReview(id.trim(), updates);
    if (!updated) {
      return NextResponse.json({ error: 'Review not found.' }, { status: 404 });
    }

    revalidatePath('/');

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    console.error('Update review error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update review' }, { status: 500 });
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
      return NextResponse.json({ error: 'Valid Review ID is required.' }, { status: 400 });
    }

    const success = await deleteReview(id.trim());
    revalidatePath('/');

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete review error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete review' }, { status: 500 });
  }
}
