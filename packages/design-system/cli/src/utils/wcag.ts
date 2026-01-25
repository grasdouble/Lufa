/**
 * WCAG Contrast Utilities
 *
 * Implements WCAG 2.1 contrast ratio calculations
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Support 3-digit hex (#FFF -> #FFFFFF)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }

  return { r, g, b };
}

/**
 * Calculate relative luminance of a color
 * Formula: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  // Normalize RGB values (0-1)
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  // Apply gamma correction
  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  // Calculate relative luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * Where L1 is the lighter color's luminance and L2 is the darker
 */
export function getContrastRatio(color1: string, color2: string): number | null {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return null;
  }

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG Conformance Levels
 */
export const WCAG_LEVELS = {
  AA_NORMAL_TEXT: 4.5, // WCAG AA for normal text (< 18pt or < 14pt bold)
  AA_LARGE_TEXT: 3.0, // WCAG AA for large text (≥ 18pt or ≥ 14pt bold)
  AAA_NORMAL_TEXT: 7.0, // WCAG AAA for normal text
  AAA_LARGE_TEXT: 4.5, // WCAG AAA for large text
  UI_COMPONENTS: 3.0, // WCAG AA for UI components and graphics
} as const;

/**
 * Check if contrast ratio meets WCAG AA standard for text
 */
export function meetsWCAG_AA_Text(contrastRatio: number): boolean {
  return contrastRatio >= WCAG_LEVELS.AA_NORMAL_TEXT;
}

/**
 * Check if contrast ratio meets WCAG AA standard for UI components
 */
export function meetsWCAG_AA_UI(contrastRatio: number): boolean {
  return contrastRatio >= WCAG_LEVELS.UI_COMPONENTS;
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 */
export function meetsWCAG_AAA(contrastRatio: number): boolean {
  return contrastRatio >= WCAG_LEVELS.AAA_NORMAL_TEXT;
}

/**
 * Get human-readable WCAG level for a contrast ratio
 */
export function getWCAGLevel(contrastRatio: number): string {
  if (contrastRatio >= WCAG_LEVELS.AAA_NORMAL_TEXT) {
    return 'AAA (Normal Text)';
  }
  if (contrastRatio >= WCAG_LEVELS.AA_NORMAL_TEXT) {
    return 'AA (Normal Text)';
  }
  if (contrastRatio >= WCAG_LEVELS.AAA_LARGE_TEXT) {
    return 'AAA (Large Text) / AA (Normal Text - Fail)';
  }
  if (contrastRatio >= WCAG_LEVELS.AA_LARGE_TEXT) {
    return 'AA (Large Text) / AA (Normal Text - Fail)';
  }
  return 'Fail (Does not meet WCAG standards)';
}
