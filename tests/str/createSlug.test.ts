import { createSlug } from '../../src/str/createSlug.js';

describe('createSlug', () => {
  it('should convert a string to a slug', () => {
    expect(createSlug('Hello World!')).toBe('hello-world');
  });

  it('should handle empty strings', () => {
    expect(createSlug('')).toBe('');
  });

  it('should remove special characters', () => {
    expect(createSlug('Hello @ World!')).toBe('hello-world');
  });
}); 