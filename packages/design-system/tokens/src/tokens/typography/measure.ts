/**
 * Content measure semantic tokens.
 * Optimal line lengths for readability based on typography best practices.
 *
 * SCOPE: Typography & Layout
 *
 * USE CASES:
 * - narrow: Short labels, captions, side notes (45-52ch)
 * - default: Standard prose, articles, documentation (60-66ch)
 * - wide: Wide layouts, technical content, code blocks (75-80ch)
 *
 * BEST PRACTICES:
 * - Use 'default' for most long-form content
 * - Use 'narrow' for narrow columns or mobile
 * - Use 'wide' for technical documentation or wide screens
 * - ch unit = width of '0' character in current font
 */

export const measure = {
  narrow: '45ch', // Minimum comfortable reading width
  default: '60ch', // Optimal reading width
  comfortable: '66ch', // Comfortable reading width
  wide: '75ch', // Wide content, technical docs
  extraWide: '80ch', // Maximum readable width
} as const;

export type Measure = keyof typeof measure;
