import { describe, expect, it } from 'vitest';

import type { CSSCustomProperty } from '../../../src/utils/parse-css.js';
import { validateContrast } from '../../../src/validators/contrast.js';

describe('Contrast Validator', () => {
  it('validates structure and processes color pairs', () => {
    // Test with a small set of known-good colors
    const properties: CSSCustomProperty[] = [
      // Black text on white (21:1 - perfect)
      { name: '--lufa-semantic-ui-text-primary', value: '#000000', line: 1 },
      { name: '--lufa-semantic-ui-background-page', value: '#ffffff', line: 2 },
      { name: '--lufa-semantic-ui-background-surface', value: '#ffffff', line: 3 },

      // Dark gray (passes everything)
      { name: '--lufa-semantic-ui-text-secondary', value: '#1f2937', line: 4 },
      { name: '--lufa-semantic-ui-text-tertiary', value: '#374151', line: 5 },
    ];

    const result = validateContrast(properties);
    expect(result).toHaveProperty('valid');
    expect(result).toHaveProperty('violations');
    expect(result).toHaveProperty('totalChecks');
    expect(result.totalChecks).toBeGreaterThan(50); // We have 57 pairs to check
  });

  it('detects text contrast violations (needs 4.5:1)', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-semantic-ui-text-primary', value: '#cccccc', line: 1 }, // Light gray on white: ~1.6:1
      { name: '--lufa-semantic-ui-background-page', value: '#ffffff', line: 2 },
    ];

    const result = validateContrast(properties);
    expect(result.valid).toBe(false);
    expect(result.violations.length).toBeGreaterThan(0);

    const violation = result.violations.find((v) => v.foreground === '--lufa-semantic-ui-text-primary');
    expect(violation).toBeDefined();
    expect(violation?.type).toBe('text');
    expect(violation?.required).toBe(4.5);
    expect(violation?.ratio).toBeLessThan(4.5);
  });

  it('detects UI component contrast violations (needs 3:1)', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-semantic-ui-border-default', value: '#f0f0f0', line: 1 }, // Very light gray: ~1.2:1
      { name: '--lufa-semantic-ui-background-page', value: '#ffffff', line: 2 },
    ];

    const result = validateContrast(properties);
    expect(result.valid).toBe(false);

    const violation = result.violations.find((v) => v.foreground === '--lufa-semantic-ui-border-default');
    expect(violation).toBeDefined();
    expect(violation?.type).toBe('ui');
    expect(violation?.required).toBe(3.0);
    expect(violation?.ratio).toBeLessThan(3.0);
  });

  it('resolves var() references before checking contrast', () => {
    const properties: CSSCustomProperty[] = [
      // Primitive level
      { name: '--lufa-primitive-color-gray-900', value: '#cccccc', line: 1 }, // Changed to fail
      { name: '--lufa-primitive-color-white', value: '#ffffff', line: 2 },

      // Core level (references primitives)
      { name: '--lufa-core-neutral-text-primary', value: 'var(--lufa-primitive-color-gray-900)', line: 3 },
      { name: '--lufa-core-neutral-background', value: 'var(--lufa-primitive-color-white)', line: 4 },

      // Semantic level (references core)
      { name: '--lufa-semantic-ui-text-primary', value: 'var(--lufa-core-neutral-text-primary)', line: 5 },
      { name: '--lufa-semantic-ui-background-page', value: 'var(--lufa-core-neutral-background)', line: 6 },
    ];

    const result = validateContrast(properties);

    // Should detect violation through the var() chain
    expect(result.valid).toBe(false);
    expect(result.violations.length).toBeGreaterThan(0);

    const violation = result.violations.find((v) => v.foreground === '--lufa-semantic-ui-text-primary');
    expect(violation).toBeDefined();
    expect(violation?.ratio).toBeLessThan(4.5);
  });

  it('skips missing tokens without failing', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-semantic-ui-text-primary', value: '#000000', line: 1 },
      // Missing background-page
    ];

    const result = validateContrast(properties);
    // Should not crash, just skip the check
    expect(result).toBeDefined();
    expect(result.totalChecks).toBeGreaterThan(0);
  });

  it('skips invalid color values without crashing', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-semantic-ui-text-primary', value: 'invalid-color', line: 1 },
      { name: '--lufa-semantic-ui-background-page', value: '#ffffff', line: 2 },
    ];

    const result = validateContrast(properties);
    // Should not crash, format validator will catch the invalid color
    expect(result).toBeDefined();
  });

  it('reports correct total checks count', () => {
    const properties: CSSCustomProperty[] = [];

    const result = validateContrast(properties);
    expect(result.totalChecks).toBeGreaterThan(50); // We have 57 color pairs
  });

  it('rounds contrast ratios to 2 decimal places', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-semantic-ui-text-primary', value: '#777777', line: 1 },
      { name: '--lufa-semantic-ui-background-page', value: '#ffffff', line: 2 },
    ];

    const result = validateContrast(properties);

    if (result.violations.length > 0) {
      const violation = result.violations[0];
      // Check that ratio doesn't have more than 2 decimal places
      expect(violation.ratio.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    }
  });

  it('detects circular var() references gracefully', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-semantic-ui-text-primary', value: 'var(--lufa-semantic-ui-background-page)', line: 1 },
      { name: '--lufa-semantic-ui-background-page', value: 'var(--lufa-semantic-ui-text-primary)', line: 2 },
    ];

    const result = validateContrast(properties);
    // Should not crash
    expect(result).toBeDefined();
  });
});
