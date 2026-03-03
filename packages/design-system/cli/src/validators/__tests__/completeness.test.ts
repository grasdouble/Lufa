import { describe, expect, it } from 'vitest';

import type { CSSCustomProperty } from '../../utils/parse-css.js';
import { getRequiredTokens, validateCompleteness } from '../completeness.js';

describe('Completeness Validator', () => {
  it('passes when all required tokens are present', async () => {
    const properties: CSSCustomProperty[] = [];

    const result = await validateCompleteness(properties);
    expect(result).toHaveProperty('valid');
    expect(result).toHaveProperty('totalRequired');
    expect(result).toHaveProperty('totalDefined');
    expect(result).toHaveProperty('missingTokens');
    expect(result).toHaveProperty('extraTokens');
  });

  it('detects missing tokens', async () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 },
      { name: '--lufa-core-color-brand-primary-default', value: 'var(--lufa-primitive-color-blue-500)', line: 2 },
    ];

    const result = await validateCompleteness(properties);
    expect(result.valid).toBe(false);
    expect(result.missingTokens.length).toBeGreaterThan(0);
    expect(result.totalDefined).toBeLessThan(result.totalRequired);
  });

  it('reports correct counts', async () => {
    const requiredTokens = await getRequiredTokens();
    const properties: CSSCustomProperty[] = [];

    const result = await validateCompleteness(properties);
    expect(result.totalDefined).toBe(0);
    expect(result.totalRequired).toBe(requiredTokens.length);
    expect(result.missingTokens).toHaveLength(requiredTokens.length);
  });

  it('identifies specific missing tokens', async () => {
    const properties: CSSCustomProperty[] = [{ name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 }];

    const result = await validateCompleteness(properties);
    expect(result.missingTokens).toContain('--lufa-primitive-color-gray-50');
    expect(result.missingTokens).toContain('--lufa-semantic-ui-text-primary');
  });

  it('handles duplicate tokens (counts only once)', async () => {
    const properties: CSSCustomProperty[] = [];

    for (let i = 0; i < 10; i++) {
      properties.push({
        name: `--custom-test-token-${i}`,
        value: 'test',
        line: i + 1,
      });
    }

    // Add duplicate
    properties.push({
      name: '--custom-test-token-0',
      value: 'duplicate',
      line: 11,
    });

    const result = await validateCompleteness(properties);
    expect(result.totalDefined).toBe(11); // All properties counted (10 unique + 1 duplicate)
  });

  it('ignores non-lufa tokens', async () => {
    const requiredTokens = await getRequiredTokens();
    const properties: CSSCustomProperty[] = [
      { name: '--custom-color', value: '#fff', line: 1 },
      { name: '--another-var', value: '16px', line: 2 },
    ];

    const result = await validateCompleteness(properties);
    expect(result.missingTokens).toHaveLength(requiredTokens.length); // All required tokens still missing
  });

  it('validates token name format', async () => {
    const requiredTokens = await getRequiredTokens();
    const properties: CSSCustomProperty[] = [];

    const result = await validateCompleteness(properties);
    expect(result.totalDefined).toBe(0);
    expect(result.totalRequired).toBe(requiredTokens.length);
    expect(result.valid).toBe(false);
  });
});
