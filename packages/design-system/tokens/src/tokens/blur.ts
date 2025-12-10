import { blur as primitiveBlur } from "@grasdouble/lufa_design-system-primitives";

/**
 * Blur Tokens
 *
 * Semantic blur values for backdrop filters, overlays, and modern UI effects.
 * These tokens provide meaningful names for blur intensities.
 *
 * USAGE:
 * - none: No blur effect - for clear backgrounds
 * - subtle: Very light blur (4px) - for gentle frosted glass
 * - base: Standard blur (8px) - for typical overlays
 * - strong: Strong blur (16px) - for modals, important overlays
 * - extraStrong: Very strong blur (24px) - for maximum focus
 *
 * GUIDELINES:
 * - Use blur.subtle for slight depth without obscuring content
 * - Use blur.base for standard modal/overlay backgrounds
 * - Use blur.strong for high-priority modals, dialogs
 * - Use blur.extraStrong for full-screen overlays, privacy screens
 * - Combine with opacity tokens for layered effects
 * - Apply with backdrop-filter: blur() for best performance
 * - Consider fallback backgrounds for browsers without backdrop-filter support
 *
 * ACCESSIBILITY:
 * - Ensure sufficient contrast when applying blur to backgrounds
 * - Maintain WCAG 2.1 Level AA contrast ratios (4.5:1 for text)
 * - Test blurred surfaces with screen readers
 * - Provide alternative visual cues beyond blur
 * - Consider performance impact on low-end devices
 *
 * PERFORMANCE:
 * - backdrop-filter: blur() is GPU-accelerated in modern browsers
 * - Limit blur to smaller areas when possible
 * - Test on mobile devices for performance
 * - Provide fallback for browsers without support
 *
 * EXAMPLES:
 * ```css
 * .modal-overlay {
 *   backdrop-filter: blur(${blur.base});
 *   background-color: rgba(0, 0, 0, 0.5);
 * }
 *
 * .frosted-glass {
 *   backdrop-filter: blur(${blur.subtle});
 *   background-color: rgba(255, 255, 255, 0.8);
 * }
 *
 * .privacy-screen {
 *   backdrop-filter: blur(${blur.extraStrong});
 *   background-color: rgba(0, 0, 0, 0.7);
 * }
 * ```
 */
export const blur = {
  none: primitiveBlur.none,
  subtle: primitiveBlur[4],
  base: primitiveBlur[8],
  strong: primitiveBlur[16],
  extraStrong: primitiveBlur[24],
} as const;

export type BlurKey = keyof typeof blur;
export type BlurValue = (typeof blur)[BlurKey];
