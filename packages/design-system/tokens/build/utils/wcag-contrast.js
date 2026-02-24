/**
 * WCAG Contrast Ratio Calculator
 *
 * Calculates color contrast ratios according to WCAG 2.1 specifications.
 * Used to automatically generate accessibility metadata for color tokens.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html
 */

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color (e.g., "#ff0000" or "ff0000")
 * @returns {{r: number, g: number, b: number}}
 */
function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');

  if (cleanHex.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16),
  };
}

/**
 * Calculate relative luminance of a color
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 * @param {{r: number, g: number, b: number}} rgb
 * @returns {number} Relative luminance (0-1)
 */
function getRelativeLuminance(rgb) {
  // Convert RGB to sRGB
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
 * @see https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 * @param {string} hex1 - First hex color
 * @param {string} hex2 - Second hex color
 * @returns {number} Contrast ratio (1-21)
 */
export function calculateContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

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
  AA: 4.5, // Normal text (WCAG AA)
  AA_LARGE: 3.0, // Large text ≥18pt or bold ≥14pt (WCAG AA)
  AAA: 7.0, // Enhanced contrast (WCAG AAA)
  AAA_LARGE: 4.5, // Large text (WCAG AAA)
};

/**
 * Check if two colors meet a specific WCAG level
 * @param {string} hex1 - First hex color
 * @param {string} hex2 - Second hex color
 * @param {number} minRatio - Minimum contrast ratio required
 * @returns {boolean}
 */
export function meetsWCAGLevel(hex1, hex2, minRatio) {
  const ratio = calculateContrastRatio(hex1, hex2);
  return ratio >= minRatio;
}

/**
 * Find all colors that meet a specific WCAG level with the given color
 * @param {string} targetHex - Target color hex
 * @param {Array<{name: string, value: string}>} allColors - All available colors
 * @param {number} minRatio - Minimum contrast ratio
 * @returns {string[]} Array of color names that meet the criteria
 */
export function findCompliantColors(targetHex, allColors, minRatio) {
  return allColors
    .filter((color) => {
      try {
        return meetsWCAGLevel(targetHex, color.value, minRatio);
      } catch (error) {
        // Skip invalid colors (e.g., alpha/transparent colors)
        return false;
      }
    })
    .map((color) => color.name)
    .sort();
}

/**
 * Generate WCAG metadata for a color token
 * @param {string} targetHex - Target color hex value
 * @param {Array<{name: string, value: string}>} allColors - All available colors
 * @returns {{wcagAALarge: string[], wcagAAA: string[]}}
 */
export function generateWCAGMetadata(targetHex, allColors) {
  // Skip alpha/transparent colors (they can't have fixed contrast ratios)
  if (!targetHex || !targetHex.startsWith('#') || targetHex.length !== 7) {
    return { wcagAALarge: [], wcagAAA: [] };
  }

  return {
    wcagAALarge: findCompliantColors(targetHex, allColors, WCAG_LEVELS.AA_LARGE),
    wcagAAA: findCompliantColors(targetHex, allColors, WCAG_LEVELS.AAA),
  };
}
