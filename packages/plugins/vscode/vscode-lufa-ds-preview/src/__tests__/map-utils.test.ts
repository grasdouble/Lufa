import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getEmbeddedMapPath, isValidMap } from '../map-utils';

describe('Token Map Validation', () => {
  it('should validate correct map structure', () => {
    const validMap = {
      version: 1,
      generatedAt: '2026-01-04',
      css: { '--lufa-color-primary': 'oklch(50% 0.1 200)' },
      paths: { 'primitives.color.chromatic.blue[500]': 'oklch(60% 0.15 250)' },
    };

    expect(isValidMap(validMap)).toBe(true);
  });

  it('should validate map without generatedAt', () => {
    const validMap = {
      version: 1,
      css: {},
      paths: {},
    };

    expect(isValidMap(validMap)).toBe(true);
  });

  it('should reject map without version', () => {
    const invalidMap = {
      css: {},
      paths: {},
    };

    expect(isValidMap(invalidMap)).toBe(false);
  });

  it('should reject map without css', () => {
    const invalidMap = {
      version: 1,
      paths: {},
    };

    expect(isValidMap(invalidMap)).toBe(false);
  });

  it('should reject map without paths', () => {
    const invalidMap = {
      version: 1,
      css: {},
    };

    expect(isValidMap(invalidMap)).toBe(false);
  });

  it('should reject null or non-object', () => {
    expect(isValidMap(null)).toBe(false);
    expect(isValidMap('string')).toBe(false);
    expect(isValidMap(123)).toBe(false);
    expect(isValidMap([])).toBe(false);
  });
});

describe('Packaged Map Paths', () => {
  it('should return null when extension root is missing', () => {
    const path = getEmbeddedMapPath(null, 'primitives.map.json', () => true);
    expect(path).toBeNull();
  });

  it('should return null when embedded map does not exist', () => {
    const path = getEmbeddedMapPath('/extension', 'tokens.map.json', () => false);
    expect(path).toBeNull();
  });

  it('should return the embedded map path when it exists', () => {
    const path = getEmbeddedMapPath('/extension', 'tokens.map.json', () => true);
    expect(path).toBe(join('/extension', 'dist', 'maps', 'tokens.map.json'));
  });
});
