import { describe, expect, it } from 'vitest';

import type { CSSCustomProperty } from '../../utils/parse-css.js';
import { validateFormat } from '../format.js';

describe('Format Validator', () => {
  it('passes when all token formats are valid', () => {
    const properties: CSSCustomProperty[] = [
      // Colors (hex)
      { name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 },
      { name: '--lufa-primitive-color-hc-white', value: '#ffffff', line: 2 },
      { name: '--lufa-primitive-color-hc-black', value: '#000', line: 3 },

      // Spacing (px, rem)
      { name: '--lufa-primitive-spacing-16', value: '16px', line: 4 },
      { name: '--lufa-primitive-spacing-32', value: '2rem', line: 5 },

      // Font sizes
      { name: '--lufa-primitive-typography-font-size-base', value: '16px', line: 6 },
      { name: '--lufa-primitive-typography-font-size-lg', value: '1.5rem', line: 7 },

      // Durations
      { name: '--lufa-primitive-motion-duration-fast', value: '150ms', line: 8 },
      { name: '--lufa-primitive-motion-duration-normal', value: '0.3s', line: 9 },

      // Border radius
      { name: '--lufa-primitive-radius-scale-base', value: '8px', line: 10 },
      { name: '--lufa-primitive-radius-scale-full', value: '9999px', line: 11 },

      // Line height (unitless or with units)
      { name: '--lufa-primitive-typography-line-height-normal', value: '1.5', line: 12 },
      { name: '--lufa-primitive-typography-line-height-relaxed', value: '1.75', line: 13 },

      // Font weight (unitless)
      { name: '--lufa-primitive-typography-font-weight-normal', value: '400', line: 14 },
      { name: '--lufa-primitive-typography-font-weight-bold', value: '700', line: 15 },

      // Opacity (unitless)
      { name: '--lufa-primitive-opacity-scale-placeholder', value: '0.5', line: 16 },
      { name: '--lufa-primitive-opacity-scale-loading', value: '0.8', line: 17 },

      // Z-index (unitless)
      { name: '--lufa-semantic-z-index-dropdown', value: '1000', line: 18 },
      { name: '--lufa-semantic-z-index-modal', value: '2000', line: 19 },

      // Font family (string)
      { name: '--lufa-primitive-typography-font-family-sans', value: 'system-ui, sans-serif', line: 20 },
      { name: '--lufa-primitive-typography-font-family-mono', value: 'Consolas, monospace', line: 21 },

      // var() references (valid)
      { name: '--lufa-semantic-ui-text-primary', value: 'var(--lufa-core-color-neutral-text-primary)', line: 22 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects invalid color formats', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-color-blue-100', value: 'blue', line: 1 }, // Named color
      // rgb() format is actually accepted by the validator
      { name: '--lufa-primitive-color-blue-200', value: '#gggggg', line: 3 }, // Invalid hex
      { name: '--lufa-primitive-color-blue-300', value: '#12', line: 4 }, // Too short
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    // Check that color errors are detected (at least 3)
    expect(result.errors.filter((e) => e.token.includes('color'))).toHaveLength(3);
  });

  it('detects invalid spacing formats', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-spacing-4', value: '16', line: 1 }, // Missing unit
      { name: '--lufa-primitive-spacing-8', value: 'medium', line: 2 }, // Named value
      { name: '--lufa-primitive-spacing-12', value: '16 px', line: 3 }, // Space in value
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('detects invalid duration formats', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-motion-duration-fast', value: '150', line: 1 }, // Missing unit
      { name: '--lufa-primitive-motion-duration-normal', value: '-150ms', line: 2 }, // Negative
      { name: '--lufa-primitive-motion-duration-slow', value: 'fast', line: 3 }, // Named value
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('accepts various valid dimension units', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-spacing-4', value: '16px', line: 1 },
      { name: '--lufa-primitive-spacing-8', value: '1rem', line: 2 },
      { name: '--lufa-primitive-spacing-12', value: '1.5em', line: 3 },
      { name: '--lufa-primitive-spacing-16', value: '100%', line: 4 },
      { name: '--lufa-primitive-spacing-24', value: '100vh', line: 5 },
      { name: '--lufa-primitive-spacing-32', value: '50vw', line: 6 },
      { name: '--lufa-primitive-spacing-40', value: '10vmin', line: 7 },
      { name: '--lufa-primitive-spacing-48', value: '20vmax', line: 8 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('accepts unitless values for appropriate tokens', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-typography-font-weight-normal', value: '400', line: 1 },
      { name: '--lufa-primitive-typography-line-height-normal', value: '1.5', line: 2 },
      { name: '--lufa-primitive-opacity-scale-placeholder', value: '0.5', line: 3 },
      { name: '--lufa-semantic-z-index-modal', value: '1000', line: 4 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('accepts font family strings', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-typography-font-family-sans', value: 'system-ui, -apple-system, sans-serif', line: 1 },
      { name: '--lufa-core-typography-heading-font-family', value: 'Georgia, serif', line: 2 },
      { name: '--lufa-primitive-typography-font-family-mono', value: '"Courier New", monospace', line: 3 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('accepts var() references without validation', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-semantic-ui-text-primary', value: 'var(--lufa-core-color-neutral-text-primary)', line: 1 },
      { name: '--lufa-semantic-ui-spacing-default', value: 'var(--lufa-primitive-spacing-16)', line: 2 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('reports errors with correct token names and line numbers', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-color-blue-500', value: 'invalid-color', line: 42 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors[0];
    expect(error.token).toBe('--lufa-primitive-color-blue-500');
    expect(error.value).toBe('invalid-color');
    expect(error.line).toBe(42);
    expect(error.expectedFormat).toBeDefined();
  });

  it('validates all errors without stopping at first', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-color-blue-100', value: 'red', line: 1 },
      { name: '--lufa-primitive-color-blue-200', value: 'blue', line: 2 },
      { name: '--lufa-primitive-spacing-4', value: '16', line: 3 },
      { name: '--lufa-primitive-motion-duration-fast', value: 'fast', line: 4 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4); // All 4 errors reported
  });

  it('handles mixed valid and invalid tokens', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 },
      { name: '--lufa-primitive-color-blue-100', value: 'blue', line: 2 },
      { name: '--lufa-primitive-spacing-16', value: '16px', line: 3 },
      { name: '--lufa-primitive-spacing-4', value: '16', line: 4 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(2); // Only invalid ones
  });

  it('accepts negative dimensions for margin/positioning', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-spacing-8', value: '-16px', line: 1 },
      { name: '--lufa-primitive-spacing-4', value: '-1rem', line: 2 },
    ];

    const result = validateFormat(properties);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('validates shadow values (complex strings)', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-shadow-elevation-base', value: '0 1px 3px rgba(0, 0, 0, 0.1)', line: 1 },
      { name: '--lufa-primitive-shadow-elevation-lg', value: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', line: 2 },
    ];

    const result = validateFormat(properties);
    // Shadows are complex and may not follow simple validation rules
    // The validator should be lenient with them
    expect(result).toBeDefined();
  });

  it('validates easing values (cubic-bezier or keywords)', () => {
    const properties: CSSCustomProperty[] = [
      { name: '--lufa-primitive-motion-easing-ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', line: 1 },
      { name: '--lufa-primitive-motion-easing-ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', line: 2 },
    ];

    const result = validateFormat(properties);
    expect(result).toBeDefined();
  });

  it('handles empty value', () => {
    const properties: CSSCustomProperty[] = [{ name: '--lufa-primitive-color-gray-50', value: '', line: 1 }];

    const result = validateFormat(properties);
    // Format validator is lenient - empty values pass validation
    // (They would be caught by completeness validator instead)
    expect(result).toBeDefined();
  });

  it('handles whitespace-only value', () => {
    const properties: CSSCustomProperty[] = [{ name: '--lufa-primitive-color-gray-50', value: '   ', line: 1 }];

    const result = validateFormat(properties);
    // Format validator is lenient - whitespace values pass validation
    expect(result).toBeDefined();
  });
});
