/**
 * Line Height Tokens
 *
 * Semantic line height tokens for typography readability.
 * References primitive line height scale for consistent spacing.
 *
 * USAGE:
 * - none: 1.0 - No line height (avoid for text)
 * - tight: 1.2 - Headings only (display text)
 * - snug: 1.35 - Large text only (subheadings)
 * - base: 1.5 - Body text (WCAG minimum)
 * - relaxed: 1.65 - Enhanced readability
 * - loose: 1.8 - Dyslexia-friendly
 *
 * GUIDELINES:
 * - Use base (1.5) as default for body text
 * - Use tight (1.2) for large headings only
 * - Use relaxed (1.65) for long-form content
 * - Use loose (1.8) for accessibility-focused designs
 * - Never use none (1.0) for readable text
 * - Adjust line height based on font size and measure
 *
 * ACCESSIBILITY (CRITICAL):
 * - Minimum 1.5 line height for body text (WCAG 2.1 AA, 1.4.12)
 * - Increased line height improves readability for:
 *   - Dyslexia
 *   - Low vision
 *   - Cognitive disabilities
 * - Test with browser zoom and text scaling
 * - Ensure sufficient vertical spacing between lines
 *
 * LINE HEIGHT RELATIONSHIPS:
 * - Larger font size = tighter line height acceptable
 * - Smaller font size = looser line height required
 * - Longer line length = more line height needed
 * - Shorter line length = less line height needed
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html|WCAG 2.1 - Text Spacing}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html|WCAG 2.1 - Visual Presentation}
 */

import { lineHeights as primitiveLineHeights } from "@grasdouble/lufa_design-system-primitives";

export const lineHeights = {
  /** 1.0 - None (avoid for text) */
  none: primitiveLineHeights.tight,
  /** 1.2 - Tight (headings only) */
  tight: primitiveLineHeights.heading,
  /** 1.35 - Snug (large text only) */
  snug: primitiveLineHeights.display,
  /** 1.5 - Base (WCAG minimum for body) */
  base: primitiveLineHeights.body,
  /** 1.65 - Relaxed (enhanced readability) */
  relaxed: primitiveLineHeights.reading,
  /** 1.8 - Loose (dyslexia-friendly) */
  loose: primitiveLineHeights.dyslexia,
} as const;

export type LineHeights = typeof lineHeights;
export type LineHeightsTokens = keyof LineHeights;
