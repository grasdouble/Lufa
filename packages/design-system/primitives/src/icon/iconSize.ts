/**
 * Icon size primitives using pixel values as keys for clarity.
 * Used for SVG width/height attributes and icon containers.
 *
 * SCOPE: Global - Used for all icon components
 *
 * COMMON USE CASES:
 * - 12: Tiny icons (dense UI, inline indicators)
 * - 16: Small icons (inline with text, compact UI)
 * - 20: Standard UI icons (buttons, inputs)
 * - 24: Default icons (navigation, toolbars) - WCAG minimum for touch
 * - 32: Large icons (feature highlights, prominent actions)
 * - 40: Extra large icons (hero sections, empty states)
 * - 48: Display icons (landing pages, large cards)
 *
 * WCAG 2.5.5 TARGET SIZE:
 * - Minimum 24x24px recommended for touch targets
 * - Use 32px+ for primary actions on mobile devices
 * - Ensure adequate spacing between interactive icons
 */
export const iconSize = {
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
} as const;

export type IconSize = keyof typeof iconSize;
