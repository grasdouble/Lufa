/**
 * Z-Index Tokens
 *
 * Semantic naming for z-index stacking values.
 * References primitive z-index scale for consistent foundation.
 */

import { zIndex as primitiveZIndex } from "@grasdouble/lufa_design-system-primitives";

export const zIndex = {
  /** Normal content layer */
  base: primitiveZIndex[0],
  /** Slightly elevated (dropdowns) */
  dropdown: primitiveZIndex[10],
  /** Sticky elements */
  sticky: primitiveZIndex[20],
  /** Overlays */
  overlay: primitiveZIndex[30],
  /** Modals */
  modal: primitiveZIndex[40],
  /** Toasts/notifications */
  toast: primitiveZIndex[50],
  /** Tooltips */
  tooltip: primitiveZIndex[100],
  /** High priority */
  high: primitiveZIndex[500],
  /** Very high priority */
  veryHigh: primitiveZIndex[900],
  /** Maximum z-index */
  max: primitiveZIndex[9999],
} as const;

export type ZIndexToken = keyof typeof zIndex;

export default zIndex;
