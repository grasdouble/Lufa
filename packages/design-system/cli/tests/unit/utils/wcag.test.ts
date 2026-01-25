import { describe, expect, it } from 'vitest';

import {
  getContrastRatio,
  getRelativeLuminance,
  hexToRgb,
  meetsWCAG_AA_Text,
  meetsWCAG_AA_UI,
  meetsWCAG_AAA,
} from '../../../src/utils/wcag.js';

describe('WCAG Utils', () => {
  describe('hexToRgb', () => {
    it('converts 6-digit hex to RGB', () => {
      expect(hexToRgb('#2563eb')).toEqual({ r: 37, g: 99, b: 235 });
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('converts 3-digit hex to RGB', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#abc')).toEqual({ r: 170, g: 187, b: 204 });
    });

    it('handles hex without # prefix', () => {
      expect(hexToRgb('2563eb')).toEqual({ r: 37, g: 99, b: 235 });
      expect(hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('handles mixed case', () => {
      expect(hexToRgb('#AbCdEf')).toEqual({ r: 171, g: 205, b: 239 });
      expect(hexToRgb('#ABC')).toEqual({ r: 170, g: 187, b: 204 });
    });

    it('returns null for invalid hex colors', () => {
      expect(hexToRgb('invalid')).toBeNull();
      expect(hexToRgb('#gggggg')).toBeNull();
      expect(hexToRgb('#12')).toBeNull();
      expect(hexToRgb('#1234567')).toBeNull();
      expect(hexToRgb('')).toBeNull();
    });
  });

  describe('getRelativeLuminance', () => {
    it('calculates luminance for white', () => {
      expect(getRelativeLuminance({ r: 255, g: 255, b: 255 })).toBe(1);
    });

    it('calculates luminance for black', () => {
      expect(getRelativeLuminance({ r: 0, g: 0, b: 0 })).toBe(0);
    });

    it('calculates luminance for gray', () => {
      const result = getRelativeLuminance({ r: 128, g: 128, b: 128 });
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
      expect(result).toBeCloseTo(0.215, 2);
    });

    it('calculates luminance for blue', () => {
      const result = getRelativeLuminance({ r: 37, g: 99, b: 235 });
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
      expect(result).toBeCloseTo(0.12, 1);
    });
  });

  describe('getContrastRatio', () => {
    it('calculates 21:1 contrast for black on white', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBe(21);
    });

    it('calculates 21:1 contrast for white on black', () => {
      const ratio = getContrastRatio('#ffffff', '#000000');
      expect(ratio).toBe(21);
    });

    it('calculates 1:1 contrast for identical colors', () => {
      expect(getContrastRatio('#ffffff', '#ffffff')).toBe(1);
      expect(getContrastRatio('#000000', '#000000')).toBe(1);
      expect(getContrastRatio('#2563eb', '#2563eb')).toBe(1);
    });

    it('calculates contrast for gray on white (AA compliant)', () => {
      const ratio = getContrastRatio('#757575', '#ffffff');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(ratio).toBeCloseTo(4.61, 1); // Actual: 4.607
    });

    it('calculates contrast for light gray on white (not AA compliant)', () => {
      const ratio = getContrastRatio('#cccccc', '#ffffff');
      expect(ratio).toBeLessThan(4.5);
      expect(ratio).toBeCloseTo(1.61, 1);
    });

    it('calculates contrast for blue on white', () => {
      const ratio = getContrastRatio('#2563eb', '#ffffff');
      expect(ratio).toBeGreaterThan(1);
      expect(ratio).toBeCloseTo(5.17, 1); // Actual: 5.168
    });

    it('returns null for invalid foreground color', () => {
      expect(getContrastRatio('invalid', '#ffffff')).toBeNull();
    });

    it('returns null for invalid background color', () => {
      expect(getContrastRatio('#ffffff', 'invalid')).toBeNull();
    });

    it('returns null when both colors are invalid', () => {
      expect(getContrastRatio('invalid', 'also-invalid')).toBeNull();
    });

    it('handles 3-digit hex codes', () => {
      const ratio = getContrastRatio('#000', '#fff');
      expect(ratio).toBe(21);
    });
  });

  describe('meetsWCAG_AA_Text', () => {
    it('passes for exactly 4.5:1 ratio', () => {
      expect(meetsWCAG_AA_Text(4.5)).toBe(true);
    });

    it('passes for ratios above 4.5:1', () => {
      expect(meetsWCAG_AA_Text(4.51)).toBe(true);
      expect(meetsWCAG_AA_Text(7.0)).toBe(true);
      expect(meetsWCAG_AA_Text(21.0)).toBe(true);
    });

    it('fails for ratios below 4.5:1', () => {
      expect(meetsWCAG_AA_Text(4.49)).toBe(false);
      expect(meetsWCAG_AA_Text(4.0)).toBe(false);
      expect(meetsWCAG_AA_Text(3.0)).toBe(false);
      expect(meetsWCAG_AA_Text(1.0)).toBe(false);
    });
  });

  describe('meetsWCAG_AA_UI', () => {
    it('passes for exactly 3.0:1 ratio', () => {
      expect(meetsWCAG_AA_UI(3.0)).toBe(true);
    });

    it('passes for ratios above 3.0:1', () => {
      expect(meetsWCAG_AA_UI(3.01)).toBe(true);
      expect(meetsWCAG_AA_UI(4.5)).toBe(true);
      expect(meetsWCAG_AA_UI(21.0)).toBe(true);
    });

    it('fails for ratios below 3.0:1', () => {
      expect(meetsWCAG_AA_UI(2.99)).toBe(false);
      expect(meetsWCAG_AA_UI(2.0)).toBe(false);
      expect(meetsWCAG_AA_UI(1.0)).toBe(false);
    });
  });

  describe('meetsWCAG_AAA', () => {
    it('passes for exactly 7.0:1 ratio', () => {
      expect(meetsWCAG_AAA(7.0)).toBe(true);
    });

    it('passes for ratios above 7.0:1', () => {
      expect(meetsWCAG_AAA(7.01)).toBe(true);
      expect(meetsWCAG_AAA(10.0)).toBe(true);
      expect(meetsWCAG_AAA(21.0)).toBe(true);
    });

    it('fails for ratios below 7.0:1', () => {
      expect(meetsWCAG_AAA(6.99)).toBe(false);
      expect(meetsWCAG_AAA(5.0)).toBe(false);
      expect(meetsWCAG_AAA(4.5)).toBe(false);
      expect(meetsWCAG_AAA(1.0)).toBe(false);
    });
  });

  describe('Real-world color combinations', () => {
    it('validates common UI color pairs', () => {
      // Primary blue text on white (should pass AA)
      expect(getContrastRatio('#2563eb', '#ffffff')).toBeGreaterThanOrEqual(4.5);

      // Dark gray text on white (should pass AA)
      expect(getContrastRatio('#1f2937', '#ffffff')).toBeGreaterThanOrEqual(4.5);

      // Medium gray text on white (should fail AA text, but also fails UI)
      const mediumGrayRatio = getContrastRatio('#9ca3af', '#ffffff');
      expect(mediumGrayRatio).toBeLessThan(4.5);
      expect(mediumGrayRatio).toBeLessThan(3.0); // Actually 2.54:1

      // Light gray text on white (should fail both)
      expect(getContrastRatio('#e5e7eb', '#ffffff')).toBeLessThan(3.0);
    });

    it('validates dark mode color pairs', () => {
      // White text on dark gray (should pass AA)
      expect(getContrastRatio('#ffffff', '#1f2937')).toBeGreaterThanOrEqual(4.5);

      // Light gray text on dark background (should pass AA)
      expect(getContrastRatio('#f3f4f6', '#111827')).toBeGreaterThanOrEqual(4.5);
    });
  });
});
