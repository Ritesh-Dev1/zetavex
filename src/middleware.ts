import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'zetavex_admin_token';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Edge Protection for Admin API Endpoints
  if (pathname.startsWith('/api/admin')) {
    const token = req.cookies.get(COOKIE_NAME)?.value || req.headers.get('authorization');
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication token is required.' },
        { status: 401 }
      );
    }
  }

  // 2. Edge Protection for Admin UI Pages (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  // 3. Security Headers on Edge responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
