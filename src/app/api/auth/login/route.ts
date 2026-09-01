import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, isAdminConfiguredInEnv } from '@/lib/supabase/admin';
import { verifyPassword, signAdminToken, COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: Max 5 login attempts per IP per 15 minutes
    const rateCheck = await checkRateLimit('admin_login', ip, 5, 15);
    if (!rateCheck.success) {
      return NextResponse.json(
        { 
          error: `Too many login attempts. Please wait ${rateCheck.resetMinutes} minute(s) before trying again.` 
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const admin = await getAdminByEmail(email);

    // If no admin user is found and no admin is configured in the environment (.env)
    if (!admin) {
      if (!isAdminConfiguredInEnv()) {
        return NextResponse.json(
          { 
            error: 'Admin login is not configured in your environment (.env). Please contact the developer for admin access.',
            unconfigured: true
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid email or password credentials.' },
        { status: 401 }
      );
    }

    if (admin.status !== 'active') {
      return NextResponse.json(
        { error: 'This admin account is currently inactive. Please contact the developer.' },
        { status: 403 }
      );
    }

    const isValid = verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password credentials.' },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      userId: admin.id,
      email: admin.email,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });

    // Set secure cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred during login.' },
      { status: 500 }
    );
  }
}
