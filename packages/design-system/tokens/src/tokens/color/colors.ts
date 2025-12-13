/**
 * Semantic Color Tokens
 *
 * These tokens map primitive colorPrimitives to semantic meanings in the design system.
 * They provide intent-based naming for easier usage and better maintainability.
 */

import {
  colorChromatic as primitiveColorChromatic,
  colorNeutral as primitiveColorNeutral,
} from "@grasdouble/lufa_design-system-primitives";

export const color = {
  // Text primitiveColors
  text: {
    primary: primitiveColorNeutral.neutral[900], // Main text color (AAA)
    secondary: primitiveColorNeutral.neutral[700], // Secondary text (AAA)
    tertiary: primitiveColorNeutral.neutral[600], // Tertiary text (AAA)
    disabled: primitiveColorNeutral.neutral[400], // Disabled text
    inverse: primitiveColorNeutral.neutral[0], // Text on dark backgrounds
    link: primitiveColorChromatic.blue[600], // Link text (AAA)
    linkHover: primitiveColorChromatic.blue[700], // Link hover state
  },

  // Background primitiveColors
  background: {
    primary: primitiveColorNeutral.neutral[0], // Main background
    secondary: primitiveColorNeutral.neutral[50], // Secondary background
    tertiary: primitiveColorNeutral.neutral[100], // Tertiary background
    inverse: primitiveColorNeutral.neutral[900], // Dark background
    overlay: "rgba(0, 0, 0, 0.5)", // Modal/overlay background
  },

  // Border primitiveColors
  border: {
    default: primitiveColorNeutral.neutral[300], // Default borders
    light: primitiveColorNeutral.neutral[200], // Light borders
    medium: primitiveColorNeutral.neutral[400], // Medium borders
    strong: primitiveColorNeutral.neutral[600], // Strong borders
    focus: primitiveColorChromatic.blue[500], // Focus state borders
  },

  // Interactive states
  interactive: {
    default: primitiveColorChromatic.blue[600], // Default interactive (AAA)
    hover: primitiveColorChromatic.blue[700], // Hover state
    active: primitiveColorChromatic.blue[800], // Active/pressed state
    disabled: primitiveColorNeutral.neutral[300], // Disabled state
    focus: primitiveColorChromatic.blue[500], // Focus state
  },

  // Status primitiveColors - Success
  success: {
    default: primitiveColorChromatic.green[600], // Success color (AAA)
    hover: primitiveColorChromatic.green[700], // Success hover
    active: primitiveColorChromatic.green[800], // Success active
    light: primitiveColorChromatic.green[50], // Success background light
    lighter: primitiveColorChromatic.green[100], // Success background lighter
    border: primitiveColorChromatic.green[300], // Success border
    text: primitiveColorChromatic.green[700], // Success text
  },

  // Status primitiveColors - Warning
  warning: {
    default: primitiveColorChromatic.orange[600], // Warning color (AAA)
    hover: primitiveColorChromatic.orange[700], // Warning hover
    active: primitiveColorChromatic.orange[800], // Warning active
    light: primitiveColorChromatic.orange[50], // Warning background light
    lighter: primitiveColorChromatic.orange[100], // Warning background lighter
    border: primitiveColorChromatic.orange[300], // Warning border
    text: primitiveColorChromatic.orange[700], // Warning text
  },

  // Status primitiveColors - Error/Danger
  error: {
    default: primitiveColorChromatic.red[600], // Error color (AAA)
    hover: primitiveColorChromatic.red[700], // Error hover
    active: primitiveColorChromatic.red[800], // Error active
    light: primitiveColorChromatic.red[50], // Error background light
    lighter: primitiveColorChromatic.red[100], // Error background lighter
    border: primitiveColorChromatic.red[300], // Error border
    text: primitiveColorChromatic.red[700], // Error text
  },

  // Status primitiveColors - Info
  info: {
    default: primitiveColorChromatic.blue[600], // Info color (AAA)
    hover: primitiveColorChromatic.blue[700], // Info hover
    active: primitiveColorChromatic.blue[800], // Info active
    light: primitiveColorChromatic.blue[50], // Info background light
    lighter: primitiveColorChromatic.blue[100], // Info background lighter
    border: primitiveColorChromatic.blue[300], // Info border
    text: primitiveColorChromatic.blue[700], // Info text
  },

  // Brand primitiveColors
  brand: {
    primary: primitiveColorChromatic.blue[600], // Primary brand color
    primaryHover: primitiveColorChromatic.blue[700], // Primary hover
    primaryActive: primitiveColorChromatic.blue[800], // Primary active
    secondary: primitiveColorChromatic.purple[600], // Secondary brand color
    secondaryHover: primitiveColorChromatic.purple[700], // Secondary hover
    secondaryActive: primitiveColorChromatic.purple[800], // Secondary active
    accent: primitiveColorChromatic.teal[600], // Accent color
  },

  // Surface primitiveColors (for cards, panels, etc.)
  surface: {
    default: primitiveColorNeutral.neutral[0], // Default surface
    raised: primitiveColorNeutral.neutral[50], // Slightly raised surface
    overlay: primitiveColorNeutral.neutral[100], // Overlay surface
    inverse: primitiveColorNeutral.neutral[900], // Dark surface
  },

  // Shadow primitiveColors
  shadow: {
    small: "rgba(0, 0, 0, 0.05)", // Small shadow
    medium: "rgba(0, 0, 0, 0.1)", // Medium shadow
    large: "rgba(0, 0, 0, 0.15)", // Large shadow
    extraLarge: "rgba(0, 0, 0, 0.2)", // Extra large shadow
  },
} as const;

export type Color = keyof typeof color;
export type ColorValue = (typeof color)[Color];
