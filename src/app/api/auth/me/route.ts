import { NextResponse } from 'next/server';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { getAdminByEmail } from '@/lib/supabase/admin';

export async function GET() {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const admin = await getAdminByEmail(session.email);
  if (!admin || admin.status !== 'active') {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      last_login_at: admin.last_login_at,
    },
  });
}
