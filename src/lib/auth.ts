import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { AuthSession } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'zetavex-super-secure-production-secret-key-2026';
const COOKIE_NAME = 'zetavex_admin_token';

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function verifyPassword(password: string, hash: string): boolean {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

export function signAdminToken(payload: AuthSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AuthSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthSession;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getAdminSessionFromCookies(): AuthSession | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch (error) {
    return null;
  }
}

export function getAdminSessionFromHeader(authHeader?: string | null): AuthSession | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
