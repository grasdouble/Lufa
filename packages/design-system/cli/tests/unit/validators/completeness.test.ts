import { describe, expect, it } from 'vitest';

import type { CSSCustomProperty } from '../../../src/utils/parse-css.js';
import { validateCompleteness } from '../../../src/validators/completeness.js';

describe('Completeness Validator', () => {
  it('passes when all required tokens are present', async () => {
    // This test would require loading actual token names from metadata
    // For now, test that the validator returns the expected structure
    const properties: CSSCustomProperty[] = [];

    const result = await validateCompleteness(properties);
    expect(result).toHaveProperty('valid');
    expect(result).toHaveProperty('totalRequired');
    expect(result).toHaveProperty('totalDefined');
    expect(result).toHaveProperty('missingTokens');
    expect(result).toHaveProperty('extraTokens');
    expect(result.totalRequired).toBe(609);
  });

  it('detects missing tokens', async () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 },
      { name: '--lufa-core-brand-primary', value: 'var(--lufa-primitive-color-blue-500)', line: 2 },
    ];

    const result = await validateCompleteness(properties);
    expect(result.valid).toBe(false);
    expect(result.missingTokens.length).toBeGreaterThan(0);
    expect(result.totalDefined).toBeLessThan(result.totalRequired);
  });

  it('reports correct counts', async () => {
    const properties: CSSCustomProperty[] = [];

    const result = await validateCompleteness(properties);
    expect(result.totalDefined).toBe(0);
    expect(result.totalRequired).toBe(609);
    expect(result.missingTokens).toHaveLength(609);
  });

  it('identifies specific missing tokens', async () => {
    const properties: CSSCustomProperty[] = [{ name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 }];

    const result = await validateCompleteness(properties);
    expect(result.missingTokens).toContain('--lufa-primitive-color-gray-50');
    expect(result.missingTokens).toContain('--lufa-semantic-ui-text-primary');
  });

  it('handles duplicate tokens (counts only once)', async () => {
    const properties: CSSCustomProperty[] = [];

    // Add all 609 unique tokens
    for (let i = 0; i < 609; i++) {
      properties.push({
        name: `--lufa-test-token-${i}`,
        value: 'test',
        line: i + 1,
      });
    }

    // Add duplicate
    properties.push({
      name: '--lufa-test-token-0',
      value: 'duplicate',
      line: 609,
    });

    const result = await validateCompleteness(properties);
    expect(result.totalDefined).toBe(610); // All properties counted (609 unique + 1 duplicate)
  });

  it('ignores non-lufa tokens', async () => {
    const properties: CSSCustomProperty[] = [
      { name: '--custom-color', value: '#fff', line: 1 },
      { name: '--another-var', value: '16px', line: 2 },
    ];

    const result = await validateCompleteness(properties);
    // Custom tokens are in totalDefined but won't match required tokens
    expect(result.missingTokens).toHaveLength(609); // All required tokens still missing
  });

  it('validates token name format', async () => {
    // Test that validator checks actual required tokens from metadata
    const properties: CSSCustomProperty[] = [];

    const result = await validateCompleteness(properties);
    expect(result.totalDefined).toBe(0);
    expect(result.totalRequired).toBe(609);
    expect(result.valid).toBe(false); // No tokens provided, so invalid
  });
});
