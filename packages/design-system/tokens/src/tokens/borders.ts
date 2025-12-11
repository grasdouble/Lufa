/**
 * Border Tokens
 *
 * Semantic naming for border widths.
 * References primitive border scale for consistent token.
 */

import { borders as primitiveBorders } from "@grasdouble/lufa_design-system-primitives";

export const borders = {
  width: {
    /** 0px - No border */
    none: primitiveBorders.width[0],
    /** 1px - Hairline border */
    hairline: primitiveBorders.width[1],
    /** 2px - Thin border (WCAG minimum for focus) */
    thin: primitiveBorders.width[2],
    /** 3px - Focus indicator */
    focus: primitiveBorders.width[3],
    /** 4px - Thick border */
    thick: primitiveBorders.width[4],
  },
  style: {
    /** Solid line */
    solid: primitiveBorders.style.solid,
    /** Dashed line */
    dashed: primitiveBorders.style.dashed,
    /** Dotted line */
    dotted: primitiveBorders.style.dotted,
    /** Double line */
    double: primitiveBorders.style.double,
  },
} as const;

export type BorderWidthToken = keyof typeof borders.width;
export type BorderStyleToken = keyof typeof borders.style;

export default borders;
