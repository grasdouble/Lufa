/**
 * Letter Spacing Tokens
 *
 * Semantic letter spacing tokens for typography refinement.
 * References primitive letter spacing scale for consistent tracking.
 *
 * USAGE:
 * - tightest: -0.02em - Very tight (large display only)
 * - tight: -0.01em - Tight (headings only)
 * - normal: 0 - Normal (default for most text)
 * - wide: 0.01em - Wide (slight tracking)
 * - wider: 0.04em - Wider (dyslexia-friendly)
 * - widest: 0.08em - Widest (uppercase, small caps)
 *
 * GUIDELINES:
 * - Use normal (0) as default for body text
 * - Use tight (-0.01em) for large headings
 * - Use wide/wider for accessibility
 * - Use widest for uppercase text (ALL CAPS)
 * - Negative tracking only for large sizes (>36px)
 * - Positive tracking for small sizes (<14px)
 *
 * ACCESSIBILITY:
 * - Minimum 0.12em letter spacing recommended (WCAG 1.4.12)
 * - Increased letter spacing improves readability for:
 *   - Dyslexia
 *   - Low vision
 *   - Small text sizes
 * - Test with browser zoom and text scaling
 * - Ensure sufficient horizontal spacing
 *
 * LETTER SPACING RELATIONSHIPS:
 * - Larger font size = tighter tracking acceptable
 * - Smaller font size = wider tracking recommended
 * - Uppercase text = wider tracking required
 * - Bold weights = slightly tighter tracking
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html|WCAG 2.1 - Text Spacing}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html|WCAG 2.1 - Visual Presentation}
 */

import primitives from '@grasdouble/lufa_design-system-primitives';

export const letterSpacing = {
  /** -0.02em - Tightest (large display only) */
  tightest: primitives.letterSpacing.tight,
  /** -0.01em - Tight (headings only) */
  tight: primitives.letterSpacing.heading,
  /** 0 - Normal (default) */
  normal: primitives.letterSpacing.normal,
  /** 0.01em - Wide (slight tracking) */
  wide: primitives.letterSpacing.relaxed,
  /** 0.04em - Wider (dyslexia-friendly) */
  wider: primitives.letterSpacing.readable,
  /** 0.08em - Widest (uppercase, small caps) */
  widest: primitives.letterSpacing.dyslexia,
} as const;

export type LetterSpacing = keyof typeof letterSpacing;
