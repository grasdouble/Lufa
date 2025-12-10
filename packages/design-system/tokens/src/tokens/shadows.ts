/**
 * Shadow Tokens
 *
 * Semantic naming for shadow values.
 * References primitive shadow scale for consistent foundation.
 * Follows Material Design elevation principles.
 */

import { shadows as primitiveShadows } from "@grasdouble/lufa_design-system-primitives";

export const shadows = {
  /** No shadow */
  none: primitiveShadows.none,
  /** 0px 1px 2px - Subtle elevation */
  xs: primitiveShadows.xs,
  /** 0px 1px 3px - Small elevation */
  sm: primitiveShadows.sm,
  /** 0px 4px 6px - Medium elevation */
  md: primitiveShadows.md,
  /** 0px 10px 15px - Large elevation */
  lg: primitiveShadows.lg,
  /** 0px 20px 25px - Extra large elevation */
  xl: primitiveShadows.xl,
  /** 0px 25px 50px - Huge elevation */
  "2xl": primitiveShadows["2xl"],
  /** 0px 30px 60px - Very huge elevation */
  "3xl": primitiveShadows["3xl"],
  /** 0px 35px 70px - Extreme elevation */
  "4xl": primitiveShadows["4xl"],
  /** 0px 40px 80px - Maximum elevation */
  "5xl": primitiveShadows["5xl"],
  /** Inset shadow for inner depth */
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

export type ShadowToken = keyof typeof shadows;

export default shadows;
