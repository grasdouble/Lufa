/**
 * Radius primitives using actual pixel values as keys for clarity.
 * Maintains consistent corner language; larger values aid visual affordance.
 * Special value 9999 provides fully rounded (pill) shapes.
 *
 * SCOPE: Global - Used for border-radius across all components
 *
 * COMMON USE CASES:
 * - 0: Sharp corners (tables, technical UI)
 * - 2-4px: Subtle rounding (inputs, small buttons)
 * - 6-8px: Standard rounding (cards, buttons, modals)
 * - 12-16px: Prominent rounding (panels, large cards)
 * - 24-32px: Bold rounding (hero sections, feature cards)
 * - 9999: Pills (tags, badges, fully rounded buttons)
 *
 * CONSISTENCY TIP:
 * Choose 1-2 radius values as your primary scale for brand consistency.
 */
export const radius = {
  0: "0px",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  12: "12px",
  16: "16px",
  24: "24px",
  32: "32px",
  9999: "9999px", // For pill/fully rounded shapes
} as const;

export type Radius = keyof typeof radius;
