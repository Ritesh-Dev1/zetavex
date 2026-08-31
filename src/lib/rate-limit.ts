import crypto from 'crypto';
import { NextRequest } from 'next/server';

interface MemoryRateLimit {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, MemoryRateLimit>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (value.resetAt < now) {
      memoryStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

export function hashClientIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 32);
}

/**
 * Checks rate limiting for a given action and IP.
 * @param action identifier for the rate-limited action (e.g. 'enquiry_submit', 'admin_login')
 * @param ip client IP
 * @param maxAttempts maximum allowed attempts in window
 * @param windowMinutes time window in minutes
 * @returns { success: boolean, remaining: number, resetTime: number }
 */
export async function checkRateLimit(
  action: string,
  ip: string,
  maxAttempts: number = 3,
  windowMinutes: number = 15
): Promise<{ success: boolean; remaining: number; resetMinutes: number }> {
  const ipHash = hashClientIp(ip);
  const key = `${action}:${ipHash}`;
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;

  const current = memoryStore.get(key);

  if (!current || current.resetAt < now) {
    memoryStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      remaining: maxAttempts - 1,
      resetMinutes: windowMinutes,
    };
  }

  if (current.count >= maxAttempts) {
    const remainingMs = current.resetAt - now;
    const remainingMins = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));
    return {
      success: false,
      remaining: 0,
      resetMinutes: remainingMins,
    };
  }

  current.count += 1;
  const remainingMs = current.resetAt - now;
  const remainingMins = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));

  return {
    success: true,
    remaining: maxAttempts - current.count,
    resetMinutes: remainingMins,
  };
}
