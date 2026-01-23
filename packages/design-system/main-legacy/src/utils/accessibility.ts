/**
 * Accessibility Utilities
 *
 * Functions and utilities to ensure color combinations meet WCAG accessibility standards.
 */

/**
 * WCAG 2.1 contrast ratio requirements
 */
export const WCAG_STANDARDS = {
  AA: {
    normalText: 4.5, // 14pt or smaller
    largeText: 3.0, // 18pt+ or 14pt+ bold
    uiComponents: 3.0, // UI components and graphical objects
  },
  AAA: {
    normalText: 7.0, // 14pt or smaller
    largeText: 4.5, // 18pt+ or 14pt+ bold
  },
} as const;

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance according to WCAG 2.1
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export function getContrastRatio(foreground: string, background: string): number {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG standards
 */
export function meetsWCAG(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requirement = isLargeText ? WCAG_STANDARDS[level].largeText : WCAG_STANDARDS[level].normalText;

  return ratio >= requirement;
}

/**
 * Check if UI component color combination meets WCAG AA standards
 */
export function meetsWCAGForUI(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= WCAG_STANDARDS.AA.uiComponents;
}

/**
 * Get the contrast ratio level description
 */
export function getContrastLevel(ratio: number): string {
  if (ratio >= WCAG_STANDARDS.AAA.normalText) return 'AAA (Normal Text)';
  if (ratio >= WCAG_STANDARDS.AA.normalText) return 'AA (Normal Text)';
  if (ratio >= WCAG_STANDARDS.AAA.largeText) return 'AAA (Large Text)';
  if (ratio >= WCAG_STANDARDS.AA.largeText) return 'AA (Large Text)';
  return 'Fail';
}

/**
 * Get suggested text color (black or white) based on background
 */
export function getSuggestedTextColor(background: string): string {
  const luminance = getRelativeLuminance(background);
  // Use white text on dark backgrounds, black on light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Validate if a color is in valid hex format
 */
export function isValidHex(color: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(color);
}
