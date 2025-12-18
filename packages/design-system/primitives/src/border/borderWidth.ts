/**
 * Border width primitives using actual pixel values as keys.
 * Includes WCAG-compliant widths for focus indicators.
 *
 * SCOPE: Global - Used for all border and outline widths
 *
 * COMMON USE CASES:
 * - 0: No border (borderless)
 * - 1: Standard borders (inputs, cards, dividers)
 * - 2: Focus indicators (WCAG 2.4.7 minimum)
 * - 3: Emphasized focus (recommended for accessibility)
 * - 4: Bold borders (primary actions, error states)
 * - 8: Extra bold borders (decorative, hero elements)
 *
 * WCAG 2.4.7 FOCUS VISIBLE:
 * - Minimum 2px for focus indicators
 * - 3px recommended for better visibility
 * - Combine with high-contrast colors for optimal accessibility
 */
export const borderWidth = {
  0: '0px',
  1: '1px',
  2: '2px', // WCAG 2.4.7 minimum for focus indicators
  3: '3px', // Recommended for clear focus visibility
  4: '4px',
  8: '8px',
} as const;

export type BorderWidth = keyof typeof borderWidth;
