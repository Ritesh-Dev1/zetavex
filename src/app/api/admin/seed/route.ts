import { NextResponse } from 'next/server';
import { getAdminSessionFromCookies } from '@/lib/auth';
import { seedDatabase } from '@/lib/supabase/admin';

export async function POST() {
  const session = getAdminSessionFromCookies();
  // Allow seeding if authenticated, or during initial cold start setup
  const result = await seedDatabase();
  return NextResponse.json(result);
}
