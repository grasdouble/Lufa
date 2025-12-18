/**
 * Font Size Tokens
 *
 * Semantic font size tokens for typography scale.
 * References primitive font size scale for consistent sizing.
 *
 * USAGE:
 * - xs: 12px - Extra small text (secondary labels only, avoid for body)
 * - sm: 14px - Small text (captions, metadata)
 * - base: 16px - Base/body text (WCAG minimum, default)
 * - lg: 18px - Large body text
 * - xl: 20px - Extra large text
 * - 2xl to 9xl: Display sizes (24px to 128px)
 *
 * TYPOGRAPHY SCALE:
 * - xs/sm: Captions, labels, metadata
 * - base/lg: Body text, paragraphs
 * - xl/2xl: Large body, subheadings
 * - 3xl/4xl: H3-H4 headings
 * - 5xl/6xl: H1-H2 headings
 * - 7xl/8xl/9xl: Display headings, hero text
 *
 * GUIDELINES:
 * - Use base (16px) as default body text size
 * - Never use below xs (12px) for body text
 * - Scale up for headings using responsive design
 * - Consider mobile vs desktop sizing
 * - Maintain readable line lengths with font size
 *
 * ACCESSIBILITY (CRITICAL):
 * - Minimum 16px for body text (WCAG 2.1 AA)
 * - Ensure text can scale up to 200% without breaking layout (WCAG 1.4.4)
 * - Use relative units (rem/em) over pixels in CSS
 * - Test with browser zoom and text scaling
 * - Avoid small text for critical information
 *
 * RESPONSIVE STRATEGY:
 * - Mobile: Use smaller scale (reduce by 1-2 steps)
 * - Tablet: Use base scale
 * - Desktop: Use larger scale (increase by 1-2 steps)
 * - Consider fluid typography (clamp, vw units)
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html|WCAG 2.1 - Resize Text}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html|WCAG 2.1 - Visual Presentation}
 */

import { fontSize as primitiveFontSize } from '@grasdouble/lufa_design-system-primitives';

export const fontSize = {
  /** 12px - Extra small text (secondary labels only) */
  xs: primitiveFontSize[12],
  /** 14px - Small text (captions, metadata) */
  sm: primitiveFontSize[14],
  /** 16px - Base/body text (WCAG minimum) */
  base: primitiveFontSize[16],
  /** 18px - Large body text */
  lg: primitiveFontSize[18],
  /** 20px - Extra large text */
  xl: primitiveFontSize[20],
  /** 24px - 2x large */
  '2xl': primitiveFontSize[24],
  /** 30px - 3x large */
  '3xl': primitiveFontSize[30],
  /** 36px - 4x large */
  '4xl': primitiveFontSize[36],
  /** 48px - 5x large */
  '5xl': primitiveFontSize[48],
  /** 60px - 6x large */
  '6xl': primitiveFontSize[60],
  /** 72px - 7x large */
  '7xl': primitiveFontSize[72],
  /** 96px - 8x large */
  '8xl': primitiveFontSize[96],
  /** 128px - 9x large */
  '9xl': primitiveFontSize[128],
} as const;

export type FontSize = keyof typeof fontSize;
