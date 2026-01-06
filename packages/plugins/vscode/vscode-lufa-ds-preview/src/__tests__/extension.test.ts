import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Type definitions for testing
type TokenMap = {
  version: number;
  generatedAt?: string;
  css: Record<string, string>;
  paths: Record<string, string>;
};

// Helper function to validate token map (extracted from extension.ts)
const isValidMap = (data: unknown): data is TokenMap => {
  if (typeof data !== 'object' || data === null) return false;
  const map = data as Record<string, unknown>;
  return (
    typeof map.version === 'number' &&
    (map.generatedAt === undefined || typeof map.generatedAt === 'string') &&
    typeof map.css === 'object' &&
    map.css !== null &&
    typeof map.paths === 'object' &&
    map.paths !== null
  );
};

const getEmbeddedMapPath = (
  extensionRootPath: string | null,
  mapFile: string,
  exists: (path: string) => boolean
): string | null => {
  if (!extensionRootPath) return null;
  const embeddedPath = join(extensionRootPath, 'dist', 'maps', mapFile);
  return exists(embeddedPath) ? embeddedPath : null;
};

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
