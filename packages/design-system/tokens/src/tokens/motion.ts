/**
 * Motion Tokens
 *
 * Pre-configured animation and transition combinations for common UI patterns.
 * Combines timing, easing, and properties for consistent motion design.
 *
 * WCAG 2.1 Accessibility:
 * - Respect prefers-reduced-motion (WCAG 2.3.3 Animation from Interactions)
 * - Keep animations under 5 seconds unless user-controlled (WCAG 2.2.2 Pause, Stop, Hide)
 * - Avoid rapid flashing (WCAG 2.3.1 Three Flashes)
 */

import { timing as primitiveTiming } from "@grasdouble/lufa_design-system-primitives";
import { easing } from "./easing.js";

export const motion = {
  /** Fade in/out transition */
  fade: {
    duration: primitiveTiming[150], // 150ms
    easing: easing.easeOut,
    properties: "opacity",
  },
  /** Scale transition (modals, popovers) */
  scale: {
    duration: primitiveTiming[250], // 250ms
    easing: easing.easeInOut,
    properties: "transform, opacity",
  },
  /** Slide transition (drawers, tooltips) */
  slide: {
    duration: primitiveTiming[250], // 250ms
    easing: easing.easeOut,
    properties: "transform, opacity",
  },
  /** Color transition (hover states) */
  color: {
    duration: primitiveTiming[150], // 150ms
    easing: easing.easeInOut,
    properties: "color, background-color, border-color",
  },
  /** All properties transition (general purpose) */
  all: {
    duration: primitiveTiming[150], // 150ms
    easing: easing.easeInOut,
    properties: "all",
  },
  /** Collapse/expand transition */
  collapse: {
    duration: primitiveTiming[400], // 400ms
    easing: easing.gentle,
    properties: "height, opacity",
  },
  /** Smooth scroll behavior */
  scroll: {
    duration: primitiveTiming[400], // 400ms
    easing: easing.gentle,
    properties: "scroll-behavior",
  },
} as const;

export type MotionToken = keyof typeof motion;

/**
 * Helper to generate CSS transition string
 * @example
 * transition: ${motion.fade.properties} ${motion.fade.duration} ${motion.fade.easing}
 */
export const getTransition = (motionKey: MotionToken): string => {
  const m = motion[motionKey];
  return `${m.properties} ${m.duration} ${m.easing}`;
};

export default motion;
