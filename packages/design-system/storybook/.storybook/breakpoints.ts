/**
 * Breakpoints for Storybook viewport configuration
 *
 * Based on Lufa Design System breakpoint tokens (Sprint 1 - Phase 2.2)
 * @see packages/design-system/tokens/src/primitives/breakpoint/scale.json
 *
 * These values match the primitive breakpoint tokens:
 * - breakpoint-xs: 320px (mobile portrait)
 * - breakpoint-sm: 640px (mobile landscape, large phones)
 * - breakpoint-md: 768px (tablets portrait)
 * - breakpoint-lg: 1024px (tablets landscape, small desktops)
 * - breakpoint-xl: 1280px (desktop)
 * - breakpoint-2xl: 1536px (large desktop, ultra-wide)
 */
export const Breakpoints = {
  /** Extra small devices - Mobile portrait (320px) */
  xsmall: {
    width: 320,
  },
  /** Small devices - Mobile landscape (640px) - Updated from 576px in Phase 2C Sprint 1 */
  small: {
    width: 640,
  },
  /** Medium devices - Tablets (768px) */
  medium: {
    width: 768,
  },
  /** Large devices - Desktop (1024px) */
  large: {
    width: 1024,
  },
  /** Extra large devices - Large desktop (1280px) */
  xlarge: {
    width: 1280,
  },
  /** Extra extra large devices - Wide desktop (1536px) */
  xxlarge: {
    width: 1536,
  },
};
