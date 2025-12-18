/**
 * Motion Tokens
 *
 * Pre-configured animation and transition combinations for common UI patterns.
 * Combines timing, easing, and properties for consistent motion design.
 *
 * USAGE:
 * - fade: Fade in/out transition - tooltips, alerts, overlays
 * - scale: Scale transition - modals, popovers, zoom effects
 * - slide: Slide transition - drawers, tooltips, dropdowns
 * - color: Color transition - hover states, theme changes
 * - all: All properties transition - general purpose
 * - collapse: Collapse/expand transition - accordions, sections
 * - scroll: Smooth scroll behavior - anchor links, scroll-to-top
 *
 * GUIDELINES:
 * - Use motion tokens for consistent, pre-configured animations
 * - Use transition tokens for simple single-property transitions
 * - motion.fade: overlays, tooltips, alerts
 * - motion.scale: modals, popovers, zoom interactions
 * - motion.slide: drawers, dropdowns, sliding panels
 * - motion.color: hover states, theme switching
 * - motion.collapse: accordions, expandable sections
 * - motion.scroll: smooth scrolling, navigation
 *
 * ACCESSIBILITY:
 * - Respect prefers-reduced-motion (WCAG 2.3.3)
 * - Keep animations under 5 seconds (WCAG 2.2.2)
 * - Avoid rapid flashing (WCAG 2.3.1)
 * - Provide alternatives for critical motion-based feedback
 * - Test with assistive technologies
 *
 * PERFORMANCE:
 * - Prefer transform and opacity (GPU-accelerated)
 * - Avoid animating width/height when possible
 * - Use will-change sparingly and temporarily
 * - Test on low-end devices
 *
 * EXAMPLES:
 * ```typescript
 * // Using getTransition helper
 * import { getTransition } from './motion';
 *
 * const styles = {
 *   modal: {
 *     transition: getTransition('scale')
 *   }
 * };
 * ```
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html|WCAG 2.1 - Animation from Interactions}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html|WCAG 2.1 - Pause, Stop, Hide}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/three-flashes.html|WCAG 2.1 - Three Flashes}
 */

import { timing as primitiveTiming } from '@grasdouble/lufa_design-system-primitives';

import { easing } from './easing.js';

export const motion = {
  /** Fade in/out transition - tooltips, alerts, overlays */
  fade: {
    duration: primitiveTiming[150], // 150ms
    easing: easing.easeOut,
    properties: 'opacity',
  },
  /** Scale transition - modals, popovers, zoom effects */
  scale: {
    duration: primitiveTiming[250], // 250ms
    easing: easing.easeInOut,
    properties: 'transform, opacity',
  },
  /** Slide transition - drawers, tooltips, dropdowns */
  slide: {
    duration: primitiveTiming[250], // 250ms
    easing: easing.easeOut,
    properties: 'transform, opacity',
  },
  /** Color transition - hover states, theme changes */
  color: {
    duration: primitiveTiming[150], // 150ms
    easing: easing.easeInOut,
    properties: 'color, background-color, border-color',
  },
  /** All properties transition - general purpose */
  all: {
    duration: primitiveTiming[150], // 150ms
    easing: easing.easeInOut,
    properties: 'all',
  },
  /** Collapse/expand transition - accordions, sections */
  collapse: {
    duration: primitiveTiming[400], // 400ms
    easing: easing.gentle,
    properties: 'height, opacity',
  },
  /** Smooth scroll behavior - anchor links, scroll-to-top */
  scroll: {
    duration: primitiveTiming[400], // 400ms
    easing: easing.gentle,
    properties: 'scroll-behavior',
  },
} as const;

export type Motion = keyof typeof motion;

/**
 * Helper to generate CSS transition string from motion token
 *
 * @param motionKey - The motion token to use
 * @returns CSS transition string
 *
 * @example
 * ```typescript
 * const styles = {
 *   modal: {
 *     transition: getTransition('scale') // "transform, opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)"
 *   }
 * };
 * ```
 */
export const getTransition = (motionKey: Motion): string => {
  const m = motion[motionKey];
  return `${m.properties} ${m.duration} ${m.easing}`;
};
