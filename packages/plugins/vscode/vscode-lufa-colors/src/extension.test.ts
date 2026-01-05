import { describe, expect, it } from 'vitest';

// Type definitions for testing
type ColorMap = {
  version: number;
  generatedAt?: string;
  css: Record<string, string>;
  paths: Record<string, string>;
};

// Helper function to validate color map (extracted from extension.ts)
const isValidColorMap = (data: unknown): data is ColorMap => {
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

describe('Color Map Validation', () => {
  it('should validate correct color map structure', () => {
    const validMap = {
      version: 1,
      generatedAt: '2026-01-04',
      css: { '--lufa-color-primary': 'oklch(50% 0.1 200)' },
      paths: { 'primitives.color.chromatic.blue[500]': 'oklch(60% 0.15 250)' },
    };

    expect(isValidColorMap(validMap)).toBe(true);
  });

  it('should validate map without generatedAt', () => {
    const validMap = {
      version: 1,
      css: {},
      paths: {},
    };

    expect(isValidColorMap(validMap)).toBe(true);
  });

  it('should reject map without version', () => {
    const invalidMap = {
      css: {},
      paths: {},
    };

    expect(isValidColorMap(invalidMap)).toBe(false);
  });

  it('should reject map without css', () => {
    const invalidMap = {
      version: 1,
      paths: {},
    };

    expect(isValidColorMap(invalidMap)).toBe(false);
  });

  it('should reject map without paths', () => {
    const invalidMap = {
      version: 1,
      css: {},
    };

    expect(isValidColorMap(invalidMap)).toBe(false);
  });

  it('should reject null or non-object', () => {
    expect(isValidColorMap(null)).toBe(false);
    expect(isValidColorMap('string')).toBe(false);
    expect(isValidColorMap(123)).toBe(false);
    expect(isValidColorMap([])).toBe(false);
  });
});

describe('Regex Patterns', () => {
  it('should match CSS var() usage', () => {
    const cssVarInVarRe = /var\(\s*(--lufa-color-[a-zA-Z0-9-]+)\s*(?:,[^)]+)?\)/gi;
    const text = 'color: var(--lufa-color-text-primary);';
    const matches = [...text.matchAll(cssVarInVarRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-color-text-primary');
  });

  it('should match CSS var() with fallback', () => {
    const cssVarInVarRe = /var\(\s*(--lufa-color-[a-zA-Z0-9-]+)\s*(?:,[^)]+)?\)/gi;
    const text = 'color: var(--lufa-color-text-primary, #000);';
    const matches = [...text.matchAll(cssVarInVarRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-color-text-primary');
  });

  it('should match CSS variable declarations', () => {
    const cssVarDirectRe = /(--lufa-color-[a-zA-Z0-9-]+)(?=\s*:)/gi;
    const text = '--lufa-color-background: oklch(20% 0.1 180);';
    const matches = [...text.matchAll(cssVarDirectRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-color-background');
  });

  it('should match primitives.color paths', () => {
    const primitivePathRe = /\primitives.color\.(?:chromatic|neutral)\.[a-zA-Z_][a-zA-Z0-9_]*\[\d+\]/g;
    const text = 'const color = primitives.color.chromatic.red[500];';
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.chromatic.red[500]');
  });

  it('should match neutral primitives.color paths', () => {
    const primitivePathRe = /\primitives.color\.(?:chromatic|neutral)\.[a-zA-Z_][a-zA-Z0-9_]*\[\d+\]/g;
    const text = 'const gray = primitives.color.neutral.neutral[900];';
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.neutral.neutral[900]');
  });

  it('should not match partial primitives.color expressions', () => {
    const primitivePathRe = /\bprimitives.color\.(?:chromatic|neutral)\.[a-zA-Z_][a-zA-Z0-9_]*\[\d+\]/g;
    const text = 'myprimitives.color.chromatic.red[500]'; // No word boundary
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(0);
  });

  it('should match multiple primitives.color paths in one line', () => {
    const primitivePathRe = /\bprimitives.color\.(?:chromatic|neutral)\.[a-zA-Z_][a-zA-Z0-9_]*\[\d+\]/g;
    const text = 'colors: [primitives.color.chromatic.blue[400], primitives.color.neutral.gray[700]]';
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(2);
    expect(matches[0][0]).toBe('primitives.color.chromatic.blue[400]');
    expect(matches[1][0]).toBe('primitives.color.neutral.gray[700]');
  });
});
