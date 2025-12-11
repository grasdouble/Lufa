/**
 * Line height primitives using unitless values for better scaling.
 * Higher values improve readability but increase vertical space.
 *
 * SCOPE: Global - Used for all text line spacing
 *
 * COMMON USE CASES:
 * - tight: Numbers, badges, labels (minimal spacing)
 * - heading: Headings, titles (save vertical space)
 * - display: Large display text, hero headings
 * - body: Standard body text, UI text (WCAG minimum)
 * - reading: Long-form content, articles, documentation
 * - dyslexia: Maximum accessibility for readability
 *
 * WCAG 1.4.12 ACCESSIBILITY:
 * - Minimum 1.5 for paragraph text (body and above)
 * - Use 1.2-1.35 for headings only (never body text)
 * - Higher line-height improves readability for dyslexic users
 * - Unitless values scale proportionally with font size
 */
export const lineHeights = {
  tight: 1.0,
  heading: 1.2, // Headings only - below WCAG minimum for body text
  display: 1.35, // Large text only - below WCAG minimum for body text
  body: 1.5, // WCAG 1.4.12 minimum for paragraph text
  reading: 1.65, // Enhanced readability for long-form content
  dyslexia: 1.8, // Maximum spacing for improved dyslexia-friendly reading
} as const;

export type LineHeights = typeof lineHeights;
export type LineHeightsKey = keyof LineHeights;
