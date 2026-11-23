/**
 * SchemeSphere Email Format Validator (Frontend)
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  
  const atParts = trimmed.split('@');
  if (atParts.length !== 2) return false;
  
  const [local, domain] = atParts;
  if (!local || local.length === 0 || local.length > 64) return false;
  if (!domain || domain.length < 3 || domain.length > 255) return false;
  
  if (local.startsWith('.') || local.endsWith('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  if (local.includes('..') || domain.includes('..')) return false;
  
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  
  for (const part of domainParts) {
    if (!part || part.length > 63) return false;
    if (part.startsWith('-') || part.endsWith('-')) return false;
    if (!/^[a-zA-Z0-9-]+$/.test(part)) return false;
  }
  
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) return false;
  
  const standardRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return standardRegex.test(trimmed);
}
