import { createHash } from 'crypto';

/**
 * Create MD5 hash from string
 * @param str Input string to hash
 * @returns MD5 hash string
 */
export function createMD5Hash(str: string): string {
  return createHash('md5')
    .update(str)
    .digest('hex');
}