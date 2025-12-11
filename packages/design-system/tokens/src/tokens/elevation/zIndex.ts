/**
 * Z-Index Tokens
 *
 * Semantic naming for z-index stacking values.
 * References primitive z-index scale for consistent tokens.
 *
 * SCOPE: Global - Controls stacking order of positioned elements
 *
 * STACKING STRATEGY:
 * - Use semantic names instead of arbitrary values
 * - Reserve high values (500+) for UI that must appear above all content
 * - Avoid z-index wars by following this hierarchy
 */

import { zIndex as primitiveZIndex } from "@grasdouble/lufa_design-system-primitives";

export const zIndex = {
  /** 0 - Normal content layer (default) */
  base: primitiveZIndex[0],
  /** 10 - Dropdowns, select options */
  dropdown: primitiveZIndex[10],
  /** 20 - Sticky headers, fixed navigation */
  sticky: primitiveZIndex[20],
  /** 30 - Tooltips, popovers */
  tooltip: primitiveZIndex[30],
  /** 40 - Slide-out panels, drawers */
  drawer: primitiveZIndex[40],
  /** 50 - Off-canvas menus */
  menu: primitiveZIndex[50],
  /** 100 - Modals, dialogs, overlays */
  modal: primitiveZIndex[100],
  /** 500 - Important notifications, banners */
  notification: primitiveZIndex[500],
  /** 900 - Toast notifications, alerts (top layer) */
  toast: primitiveZIndex[900],
  /** 9999 - Critical system messages, loading screens */
  max: primitiveZIndex[9999],
} as const;

export type ZIndex = typeof zIndex;
export type ZIndexTokens = keyof ZIndex;
