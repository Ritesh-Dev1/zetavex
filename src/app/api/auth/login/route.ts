import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, isAdminConfiguredInEnv, supabaseAdmin } from '@/lib/supabase/admin';
import { verifyPassword, signAdminToken, hashPassword, COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizeText, sanitizeEmail, hasSqlInjectionSignature } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: Max 15 login attempts per IP per 15 minutes to block brute-force attacks
    const rateCheck = await checkRateLimit('admin_login', ip, 15, 15);
    if (!rateCheck.success) {
      return NextResponse.json(
        { 
          error: `Too many login attempts. Please wait ${rateCheck.resetMinutes} minute(s) before trying again.` 
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const rawEmail = typeof body.email === 'string' ? body.email : '';
    const rawPassword = typeof body.password === 'string' ? body.password : '';

    const cleanEmail = sanitizeText(rawEmail).toLowerCase();
    const cleanPassword = sanitizeText(rawPassword);

    if (!cleanEmail || !cleanPassword) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 🛡️ SQL Injection & Malicious Pattern Guard
    if (hasSqlInjectionSignature(cleanEmail) || hasSqlInjectionSignature(cleanPassword)) {
      return NextResponse.json(
        { error: 'Malicious or invalid characters detected in login request.' },
        { status: 400 }
      );
    }

    const envEmail = (process.env.ADMIN_EMAIL || process.env.ADMIN_INITIAL_EMAIL || '').trim().toLowerCase();
    const envPass = (process.env.ADMIN_PASSWORD || process.env.ADMIN_INITIAL_PASSWORD || '').trim();

    let authenticatedAdmin: { id: string; email: string; role: 'super_admin' | 'admin' } | null = null;

    // 1. MASTER ENVIRONMENT CREDENTIALS CHECK (.env.local / .env / Vercel Envs)
    if (envEmail && envPass && cleanEmail === envEmail && cleanPassword === envPass) {
      const passwordHash = hashPassword(envPass);
      authenticatedAdmin = {
        id: 'admin-master-env',
        email: envEmail,
        role: 'super_admin',
      };

      // Auto-heal and sync to Supabase database in background
      if (supabaseAdmin) {
        try {
          supabaseAdmin.from('admin_users').upsert({
            email: envEmail,
            password_hash: passwordHash,
            role: 'super_admin',
            status: 'active',
            last_login_at: new Date().toISOString(),
          }, { onConflict: 'email' }).then(() => {});
        } catch (e) {
          // non-blocking sync
        }
      }
    } else {
      // 2. DATABASE CREDENTIALS CHECK (admin_users table in Supabase via Parameterized Query)
      const admin = await getAdminByEmail(cleanEmail);

      if (!admin) {
        return NextResponse.json(
          { error: 'Invalid email or password credentials.' },
          { status: 401 }
        );
      }

      if (admin.status !== 'active') {
        return NextResponse.json(
          { error: 'This admin account is currently inactive. Please contact the administrator.' },
          { status: 403 }
        );
      }

      const isValid = verifyPassword(cleanPassword, admin.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid email or password credentials.' },
          { status: 401 }
        );
      }

      // If password in DB was stored as plain text, auto-upgrade to bcrypt
      if (admin.password_hash === cleanPassword && supabaseAdmin && admin.id && !admin.id.startsWith('admin-env-')) {
        const newHash = hashPassword(cleanPassword);
        supabaseAdmin.from('admin_users').update({ 
          password_hash: newHash,
          last_login_at: new Date().toISOString()
        }).eq('id', admin.id).then(() => {});
      }

      authenticatedAdmin = {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      };
    }

    if (!authenticatedAdmin) {
      return NextResponse.json(
        { error: 'Invalid email or password credentials.' },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      userId: authenticatedAdmin.id,
      email: authenticatedAdmin.email,
      role: authenticatedAdmin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: authenticatedAdmin.id,
        email: authenticatedAdmin.email,
        role: authenticatedAdmin.role,
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
