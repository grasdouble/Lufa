/**
 * Blur Primitives
 *
 * Raw blur values for backdrop-filter and filter effects.
 * These primitives provide the token for frosted glass effects, overlays, and modern UI.
 *
 * SCOPE: Global - applies to backdrop filters, image effects, overlays
 *
 * COMMON USE CASES:
 * - none: No blur (0px)
 * - 4: Subtle frosted glass (4px)
 * - 8: Base blur for overlays (8px)
 * - 12: Strong blur for modals (12px)
 * - 16: Extra strong blur (16px)
 * - 24: Very strong blur (24px)
 * - 40: Maximum blur (40px)
 *
 * GUIDELINES:
 * - Use for backdrop-filter: blur() or filter: blur()
 * - Higher values = more blur = better privacy/focus
 * - Consider performance: larger blur values are more expensive
 * - Works best with backdrop-filter for layered UI
 * - Use sparingly: blur can impact performance on low-end devices
 * - Test blur effects in dark mode for contrast
 *
 * ACCESSIBILITY:
 * - Ensure blurred backgrounds don't reduce text contrast below WCAG standards
 * - Provide alternative focus indicators on blurred surfaces
 * - Test with screen readers to ensure content isn't hidden
 */
export const blur = {
  none: '0px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  40: '40px',
} as const;

export type Blur = keyof typeof blur;
