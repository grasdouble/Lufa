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
  8: "8px",
  12: "12px", // Minimum for small element padding
  16: "16px", // Minimum for text content padding
  24: "24px", // Minimum spacing between touch targets
  32: "32px", // Comfortable touch target padding
  48: "48px", // Recommended for primary touch targets
  64: "64px", // Generous spacing for section separation
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;
