/**
 * Font weight primitives using numeric values (100-900).
 * Covers the full OpenType weight range for maximum flexibility.
 *
 * SCOPE: Global - Used for all typography weight variations
 *
 * COMMON USE CASES:
 * - 100-200: Thin/Extra-light (large display text only)
 * - 300: Light (use cautiously, may reduce legibility)
 * - 400: Regular/Normal (body text default)
 * - 500: Medium (subtle emphasis)
 * - 600: Semi-bold (UI elements, labels)
 * - 700: Bold (headings, strong emphasis)
 * - 800-900: Extra-bold/Black (large headings, hero text)
 *
 * WCAG ACCESSIBILITY:
 * - 400+ recommended for body text for optimal legibility
 * - Lighter weights (100-300) may fail contrast on small text
 * - Test thin weights with actual font rendering, not screenshots
 * - Consider font-weight in contrast calculations
 */
export const fontWeights = {
  100: 100, // Avoid for text < 20px
  200: 200, // Avoid for text < 20px
  300: 300, // Use cautiously, may reduce legibility at small sizes
  400: 400, // WCAG recommended minimum for body text
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
} as const;

export type FontWeights = typeof fontWeights;
export type FontWeightsKey = keyof FontWeights;
