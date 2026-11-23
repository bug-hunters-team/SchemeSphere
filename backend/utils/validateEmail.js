/**
 * SchemeSphere Email Format Validator
 * 
 * Enforces RFC 5322 standard email structure:
 * - Reject empty or whitespace-only inputs
 * - Length between 3 and 254 characters
 * - Local part <= 64 chars, domain <= 255 chars
 * - No consecutive dots ('..')
 * - No leading/trailing dots or hyphens in domain
 * - Valid TLD with minimum 2 alphabetical characters
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  
  // Must contain exactly one '@'
  const atParts = trimmed.split('@');
  if (atParts.length !== 2) return false;
  
  const [local, domain] = atParts;
  if (!local || local.length === 0 || local.length > 64) return false;
  if (!domain || domain.length < 3 || domain.length > 255) return false;
  
  // No leading or trailing dots
  if (local.startsWith('.') || local.endsWith('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  
  // No consecutive dots
  if (local.includes('..') || domain.includes('..')) return false;
  
  // Domain parts inspection
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  
  // Every label in domain must be 1-63 chars and not start/end with hyphens
  for (const part of domainParts) {
    if (!part || part.length > 63) return false;
    if (part.startsWith('-') || part.endsWith('-')) return false;
    if (!/^[a-zA-Z0-9-]+$/.test(part)) return false;
  }
  
  // TLD must be letters only and at least 2 chars
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) return false;
  
  // Full standard regex check
  const standardRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return standardRegex.test(trimmed);
}
