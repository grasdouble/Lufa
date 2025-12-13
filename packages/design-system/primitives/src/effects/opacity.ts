/**
 * Opacity primitives using percentage values (0-100) as keys for intuitive usage.
 * Supports disabled states and overlays while keeping text legible.
 *
 * SCOPE: Global - Used for transparency across all components
 *
 * COMMON USE CASES:
 * - Disabled states (50-75%)
 * - Modal/dialog overlays (50-75%)
 * - Loading states and skeletons (25-50%)
 * - Hover states (90-100%)
 * - Watermarks and decorative elements (10-25%)
 * - Focus/selected states (10-25% overlays)
 *
 * WCAG 2.1 Accessibility Guidelines:
 * - Contrast Impact: Opacity reduces effective contrast ratios
 * - Text Opacity: Avoid opacity < 0.9 on text to maintain WCAG compliance
 * - Interactive Elements: Disabled states should still meet 3:1 contrast (WCAG 1.4.3)
 *
 * Usage Warnings:
 * - opacity[10-25]: Backgrounds/decorative only - never for text or interactive content
 * - opacity[50]: May violate WCAG contrast - test with actual colors
 * - opacity[75]: Borderline for text - verify contrast ratios
 * - opacity[90-100]: Safe for text if base color meets WCAG requirements
 */
export const opacity = {
  0: "0", // Invisible
  10: "0.1", // Subtle tint/overlay - decorative only
  25: "0.25", // Light overlay - never for text
  50: "0.5", // WARNING: Likely fails WCAG for text - backgrounds only
  75: "0.75", // CAUTION: Verify contrast ratios for text usage
  90: "0.9", // Safe for text if base color meets WCAG
  100: "1", // Full opacity
} as const;

export type Opacity = keyof typeof opacity;
