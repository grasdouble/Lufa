import { describe, expect, it } from 'vitest';

import { getPathCandidates, lookupValue, resolveTokenValueFromMap } from '../reference-resolver';

const createMap = () => ({
  version: 1,
  css: {
    '--lufa-core-color-brand-500': 'oklch(50% 0.1 200)',
  },
  paths: {
    'tokens.color["primary"]': 'oklch(60% 0.12 210)',
    'primitives.color.chromatic.blue[500]': 'oklch(62% 0.14 250)',
  },
});

describe('getPathCandidates', () => {
  it('should include quote variants for bracketed paths', () => {
    const candidates = getPathCandidates("tokens.color['primary']");

    expect(candidates).toContain("tokens.color['primary']");
    expect(candidates).toContain('tokens.color["primary"]');
  });

  it('should return the original path when no quotes are used', () => {
    expect(getPathCandidates('tokens.color.primary')).toEqual(['tokens.color.primary']);
  });
});

describe('lookupValue', () => {
  it('should return null for missing maps', () => {
    expect(lookupValue(undefined, ['key'])).toBeNull();
  });

  it('should return the first matching key value', () => {
    const value = lookupValue({ a: 'one', b: 'two' }, ['missing', 'b']);
    expect(value).toBe('two');
  });
});

describe('resolveTokenValueFromMap', () => {
  it('should resolve CSS variables', () => {
    const value = resolveTokenValueFromMap('--lufa-core-color-brand-500', createMap());
    expect(value).toBe('oklch(50% 0.1 200)');
  });

  it('should resolve token paths with quote variants', () => {
    const value = resolveTokenValueFromMap("tokens.color['primary']", createMap());
    expect(value).toBe('oklch(60% 0.12 210)');
  });

  it('should return null when map is missing', () => {
    expect(resolveTokenValueFromMap('tokens.color.primary', null)).toBeNull();
  });

  it('should return null when value is not found', () => {
    const value = resolveTokenValueFromMap('tokens.color.secondary', createMap());
    expect(value).toBeNull();
  });
});
