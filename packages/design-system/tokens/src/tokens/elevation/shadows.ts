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

import { shadows as primitiveShadows } from "@grasdouble/lufa_design-system-primitives";

export const shadows = {
  /** No shadow (flat) */
  none: primitiveShadows.none,
  /** 0px 1px 2px - Subtle depth (border alternative) */
  xs: primitiveShadows.xs,
  /** 0px 1px 3px - Small elevation (hover states) */
  sm: primitiveShadows.sm,
  /** 0px 4px 6px - Medium elevation (cards, buttons) */
  md: primitiveShadows.md,
  /** 0px 10px 15px - Large elevation (dropdowns, popovers) */
  lg: primitiveShadows.lg,
  /** 0px 20px 25px - Extra large elevation (modals, dialogs) */
  xl: primitiveShadows.xl,
  /** 0px 25px 50px - Huge elevation (floating actions) */
  "2xl": primitiveShadows["2xl"],
  /** 0px 30px 60px - Very huge elevation (hero sections) */
  "3xl": primitiveShadows["3xl"],
  /** 0px 35px 70px - Extreme elevation (dramatic emphasis) */
  "4xl": primitiveShadows["4xl"],
  /** 0px 40px 80px - Maximum elevation (use sparingly) */
  "5xl": primitiveShadows["5xl"],
  /** Inset shadow for inner depth */
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

export type Shadows = typeof shadows;
export type ShadowsTokens = keyof Shadows;
