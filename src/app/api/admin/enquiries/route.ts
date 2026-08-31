import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { 
  getAllEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry 
} from '@/lib/supabase/admin';

export async function GET() {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enquiries = await getAllEnquiries();
  return NextResponse.json({ enquiries });
}

export async function PATCH(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Enquiry ID and status are required.' }, { status: 400 });
    }

    if (!['new', 'contacted', 'resolved', 'spam'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    console.error('Update enquiry status error:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
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
      return NextResponse.json({ error: 'Enquiry ID is required.' }, { status: 400 });
    }

    const success = await deleteEnquiry(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Delete enquiry error:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
