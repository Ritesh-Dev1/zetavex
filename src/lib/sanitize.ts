/**
 * SQL Injection & XSS Input Sanitization and Defense Engine
 * ZetaVex Tech Solutions
 */

// Patterns commonly used in SQL injection & command injection attacks
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|ALL|DATABASE|TABLE|GRANT|REVOKE)\b)/i,
  /(--|#|\/\*|\*\/|;)/,
  /('|\b)(OR|AND)\b.+[=<>]/i,
  /\b0x[0-9a-fA-F]+\b/,
  /\b(WAITFOR\s+DELAY|BENCHMARK|SLEEP\s*\()/i,
];

/**
 * Strips dangerous HTML tags, null bytes, and malicious script characters
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/\0/g, '') // Remove null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags
    .trim();
}

/**
 * Checks if a string contains known SQL injection patterns
 */
export function hasSqlInjectionSignature(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input));
}

/**
 * Validates and sanitizes email input
 */
export function sanitizeEmail(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const cleaned = input.trim().toLowerCase();
  
  // RFC 5322 compliant standard email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  
  if (!emailRegex.test(cleaned) || cleaned.length > 254) {
    return null;
  }
  return cleaned;
}

/**
 * Validates and sanitizes URL input (allows only http:// and https://)
 */
export function sanitizeUrl(input: unknown): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim();
  if (!trimmed) return '';
  
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return '';
  } catch {
    return '';
  }
}

/**
 * Validates and sanitizes URL slugs (strictly letters, numbers, and hyphens)
 */
export function sanitizeSlug(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100);
}

/**
 * Validates phone numbers (allowing digits, spaces, plus, hyphens, and parentheses)
 */
export function sanitizePhone(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[^\d+()\s-]/g, '').trim().substring(0, 25);
}

/**
 * Validates UUID format
 */
export function isValidUUID(input: unknown): boolean {
  if (typeof input !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(input.trim());
}

/**
 * Sanitizes an array of tags (e.g. tech stack tags)
 */
export function sanitizeTags(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(item => typeof item === 'string')
    .map(tag => tag.replace(/[^\w\s.#+-]/g, '').trim())
    .filter(tag => tag.length > 0 && tag.length <= 30)
    .slice(0, 20);
}
