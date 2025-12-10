/**
 * Z-index primitives using actual stacking values as keys.
 * Ladder approach (0, 10, 20... 9999) prevents unintended overlaps.
 * Higher values (500, 900, 9999) reserved for modal/toast layers to preserve focus visibility.
 *
 * SCOPE: Global - Controls stacking order of positioned elements
 *
 * COMMON USE CASES:
 * - 0: Default layer (normal document flow)
 * - 10: Sticky headers, fixed navigation
 * - 20: Dropdown menus, select options
 * - 30: Tooltips, popovers
 * - 40: Slide-out panels, drawers
 * - 50: Off-canvas menus
 * - 100: Modals, dialogs, overlays
 * - 500: Important notifications, banners
 * - 900: Toast notifications, alerts (top layer)
 * - 9999: Critical system messages, loading screens
 *
 * STACKING STRATEGY:
 * Use 10-unit increments for flexibility. Reserve high values (500+) for UI that must
 * appear above all content. Avoid arbitrary z-index values to prevent stacking conflicts.
 */
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  100: 100,
  500: 500,
  900: 900,
  9999: 9999,
} as const;

export type ZIndex = typeof zIndex;
export type ZIndexKey = keyof ZIndex;
