/**
 * Shadow Tokens
 *
 * Semantic naming for shadow values following Material Design elevation principles.
 * References primitive shadow scale for consistent tokens.
 *
 * SCOPE: Global - Used for depth and elevation hierarchy
 *
 * ELEVATION STRATEGY:
 * - Use shadows to indicate layering hierarchy
 * - Combine with hover/focus states for interactivity
 * - Higher shadows = higher elevation in UI hierarchy
 *
 * WCAG 2.1 ACCESSIBILITY:
 * - Shadows should not be the only visual indicator (WCAG 1.4.1)
 * - Maintain sufficient contrast on elevated surfaces (WCAG 1.4.3)
 */

import primitives from '@grasdouble/lufa_design-system-primitives';

export const shadow = {
  /** No shadow (flat) */
  none: primitives.shadow.none,
  /** 0px 1px 2px - Subtle depth (border alternative) */
  xs: primitives.shadow.xs,
  /** 0px 1px 3px - Small elevation (hover states) */
  sm: primitives.shadow.sm,
  /** 0px 4px 6px - Medium elevation (cards, buttons) */
  md: primitives.shadow.md,
  /** 0px 10px 15px - Large elevation (dropdowns, popovers) */
  lg: primitives.shadow.lg,
  /** 0px 20px 25px - Extra large elevation (modals, dialogs) */
  xl: primitives.shadow.xl,
  /** 0px 25px 50px - Huge elevation (floating actions) */
  '2xl': primitives.shadow['2xl'],
  /** 0px 30px 60px - Very huge elevation (hero sections) */
  '3xl': primitives.shadow['3xl'],
  /** 0px 35px 70px - Extreme elevation (dramatic emphasis) */
  '4xl': primitives.shadow['4xl'],
  /** 0px 40px 80px - Maximum elevation (use sparingly) */
  '5xl': primitives.shadow['5xl'],
  /** Inset shadow for inner depth */
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

export type Shadow = keyof typeof shadow;
