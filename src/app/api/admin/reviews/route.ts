import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { 
  getAllReviews, 
  getApprovedReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '@/lib/supabase/admin';

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

    if (!client_name || !company_name || !quote) {
      return NextResponse.json(
        { error: 'Client name, company name, and review quote are required.' },
        { status: 400 }
      );
    }

    const review = await createReview({
      client_name,
      company_name,
      role: role || '',
      avatar_url: avatar_url || '',
      quote,
      rating: typeof rating === 'number' ? Math.max(1, Math.min(5, rating)) : 5,
      is_approved: is_approved !== undefined ? Boolean(is_approved) : true,
    });

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    console.error('Create review error:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
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
      return NextResponse.json({ error: 'Review ID is required.' }, { status: 400 });
    }

    if (updates.rating) {
      updates.rating = Math.max(1, Math.min(5, updates.rating));
    }

    const updated = await updateReview(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Review not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    console.error('Update review error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
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
      return NextResponse.json({ error: 'Review ID is required.' }, { status: 400 });
    }

    const success = await deleteReview(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete review error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
