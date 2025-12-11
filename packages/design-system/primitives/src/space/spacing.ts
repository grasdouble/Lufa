/**
 * Spacing primitives using actual pixel values as keys for intuitive usage.
 * Aligned to 4px/8px rhythm to support clear grouping and touch separation.
 *
 * SCOPE: Global - Used for margins, padding, and gaps
 *
 * COMMON USE CASES:
 * - 0-4px: Tight spacing (icon+text, form labels)
 * - 8-12px: Component internal spacing (button padding, list items)
 * - 16px: Standard spacing (paragraphs, form fields)
 * - 24px: Generous spacing (between sections, cards)
 * - 32px: Section separation, comfortable touch targets
 * - 48px: Major layout sections
 * - 64px: Page-level spacing, hero sections
 *
 * RHYTHM STRATEGY:
 * Use 8px increments for consistency. Smaller values (2-4px) for fine-tuning only.
 *
 * WCAG 2.1 Accessibility Guidelines:
 * - Touch Targets: Minimum 44x44px for interactive elements (WCAG 2.5.5 Target Size)
 * - Spacing: Adequate spacing prevents accidental activation (WCAG 2.5.8)
 *
 * Touch Target Guidelines:
 * - spacing[7] (32px): Minimum comfortable padding for touch targets
 * - spacing[8] (48px): Recommended for primary action buttons
 * - spacing[6] (24px): Minimum spacing between interactive elements
 */
export const spacing = {
  0: "0px",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px", // Minimum for small element padding
  16: "16px", // Minimum for text content padding
  20: "20px",
  24: "24px", // Minimum spacing between touch targets
  28: "28px",
  32: "32px", // Comfortable touch target padding
  40: "40px",
  48: "48px", // Recommended for primary touch targets
  56: "56px",
  64: "64px", // Generous spacing for section separation
  72: "72px",
  80: "80px",
  96: "96px",
  120: "120px",
  128: "128px",
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;
