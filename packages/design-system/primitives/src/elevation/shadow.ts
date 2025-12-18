/**
 * Shadow primitives using t-shirt sizing (xs, sm, md, lg, xl, 2xl-5xl) for intuitive scale.
 * Keys describe relative elevation level, not usage context.
 * Shadows kept soft to preserve legibility and sufficient contrast on elevated surfaces.
 *
 * SCOPE: Global - Used for depth and elevation hierarchy
 *
 * COMMON USE CASES:
 * - none: Flat design, no elevation
 * - xs: Subtle depth (borders alternative)
 * - sm: Hover states, slight elevation
 * - md: Cards, raised buttons
 * - lg: Dropdowns, popovers, tooltips
 * - xl: Modals, dialogs
 * - 2xl: Floating action buttons, app bars
 * - 3xl-5xl: Hero sections, dramatic emphasis (use sparingly)
 *
 * ELEVATION STRATEGY:
 * Use shadows to indicate layering hierarchy and interactive affordance.
 * Combine with hover/focus states to indicate interactivity.
 *
 * WCAG 2.1 Accessibility:
 * - Shadows should not be the only visual indicator (WCAG 1.4.1 Use of Color)
 * - Maintain sufficient contrast on elevated surfaces (WCAG 1.4.3)
 */
export const shadow = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  '3xl': '0 30px 60px -15px rgb(0 0 0 / 0.3)',
  '4xl': '0 35px 70px -20px rgb(0 0 0 / 0.35)',
  '5xl': '0 40px 80px -25px rgb(0 0 0 / 0.4)',
} as const;

export type Shadow = keyof typeof shadow;
