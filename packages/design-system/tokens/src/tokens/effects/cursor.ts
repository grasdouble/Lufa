/**
 * Cursor semantic tokens.
 * Standard cursor styles for different interactive states.
 *
 * SCOPE: Interaction & Accessibility
 *
 * USE CASES:
 * - Interactive elements (links, buttons, draggable items)
 * - Form controls and inputs
 * - Disabled or unavailable states
 * - Loading states
 *
 * BEST PRACTICES:
 * - Use 'pointer' for clickable elements
 * - Use 'notAllowed' for disabled interactive elements
 * - Use 'grab' for draggable items
 * - Use 'wait' for loading states
 */

export const cursor = {
  auto: "auto",
  default: "default",
  pointer: "pointer",
  grab: "grab",
  grabbing: "grabbing",
  move: "move",
  text: "text",
  wait: "wait",
  notAllowed: "not-allowed",
  help: "help",
  zoomIn: "zoom-in",
  zoomOut: "zoom-out",
  crosshair: "crosshair",
  resizeVertical: "ns-resize",
  resizeHorizontal: "ew-resize",
  resizeDiagonal1: "nwse-resize",
  resizeDiagonal2: "nesw-resize",
} as const;

export type Cursor = keyof typeof cursor;
