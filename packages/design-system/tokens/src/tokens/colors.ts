/**
 * Semantic Color Tokens
 *
 * These tokens map primitive colorPrimitives to semantic meanings in the design system.
 * They provide intent-based naming for easier usage and better maintainability.
 */

import { colors as primitiveColors } from "@grasdouble/lufa_design-system-primitives";

export const colors = {
  // Text primitiveColors
  text: {
    primary: primitiveColors.neutral[900], // Main text color (AAA)
    secondary: primitiveColors.neutral[700], // Secondary text (AAA)
    tertiary: primitiveColors.neutral[600], // Tertiary text (AAA)
    disabled: primitiveColors.neutral[400], // Disabled text
    inverse: primitiveColors.neutral[0], // Text on dark backgrounds
    link: primitiveColors.blue[600], // Link text (AAA)
    linkHover: primitiveColors.blue[700], // Link hover state
  },

  // Background primitiveColors
  background: {
    primary: primitiveColors.neutral[0], // Main background
    secondary: primitiveColors.neutral[50], // Secondary background
    tertiary: primitiveColors.neutral[100], // Tertiary background
    inverse: primitiveColors.neutral[900], // Dark background
    overlay: "rgba(0, 0, 0, 0.5)", // Modal/overlay background
  },

  // Border primitiveColors
  border: {
    default: primitiveColors.neutral[300], // Default borders
    light: primitiveColors.neutral[200], // Light borders
    medium: primitiveColors.neutral[400], // Medium borders
    strong: primitiveColors.neutral[600], // Strong borders
    focus: primitiveColors.blue[500], // Focus state borders
  },

  // Interactive states
  interactive: {
    default: primitiveColors.blue[600], // Default interactive (AAA)
    hover: primitiveColors.blue[700], // Hover state
    active: primitiveColors.blue[800], // Active/pressed state
    disabled: primitiveColors.neutral[300], // Disabled state
    focus: primitiveColors.blue[500], // Focus state
  },

  // Status primitiveColors - Success
  success: {
    default: primitiveColors.green[600], // Success color (AAA)
    hover: primitiveColors.green[700], // Success hover
    active: primitiveColors.green[800], // Success active
    light: primitiveColors.green[50], // Success background light
    lighter: primitiveColors.green[100], // Success background lighter
    border: primitiveColors.green[300], // Success border
    text: primitiveColors.green[700], // Success text
  },

  // Status primitiveColors - Warning
  warning: {
    default: primitiveColors.orange[600], // Warning color (AAA)
    hover: primitiveColors.orange[700], // Warning hover
    active: primitiveColors.orange[800], // Warning active
    light: primitiveColors.orange[50], // Warning background light
    lighter: primitiveColors.orange[100], // Warning background lighter
    border: primitiveColors.orange[300], // Warning border
    text: primitiveColors.orange[700], // Warning text
  },

  // Status primitiveColors - Error/Danger
  error: {
    default: primitiveColors.red[600], // Error color (AAA)
    hover: primitiveColors.red[700], // Error hover
    active: primitiveColors.red[800], // Error active
    light: primitiveColors.red[50], // Error background light
    lighter: primitiveColors.red[100], // Error background lighter
    border: primitiveColors.red[300], // Error border
    text: primitiveColors.red[700], // Error text
  },

  // Status primitiveColors - Info
  info: {
    default: primitiveColors.blue[600], // Info color (AAA)
    hover: primitiveColors.blue[700], // Info hover
    active: primitiveColors.blue[800], // Info active
    light: primitiveColors.blue[50], // Info background light
    lighter: primitiveColors.blue[100], // Info background lighter
    border: primitiveColors.blue[300], // Info border
    text: primitiveColors.blue[700], // Info text
  },

  // Brand primitiveColors
  brand: {
    primary: primitiveColors.blue[600], // Primary brand color
    primaryHover: primitiveColors.blue[700], // Primary hover
    primaryActive: primitiveColors.blue[800], // Primary active
    secondary: primitiveColors.purple[600], // Secondary brand color
    secondaryHover: primitiveColors.purple[700], // Secondary hover
    secondaryActive: primitiveColors.purple[800], // Secondary active
    accent: primitiveColors.teal[600], // Accent color
  },

  // Surface primitiveColors (for cards, panels, etc.)
  surface: {
    default: primitiveColors.neutral[0], // Default surface
    raised: primitiveColors.neutral[50], // Slightly raised surface
    overlay: primitiveColors.neutral[100], // Overlay surface
    inverse: primitiveColors.neutral[900], // Dark surface
  },

  // Shadow primitiveColors
  shadow: {
    small: "rgba(0, 0, 0, 0.05)", // Small shadow
    medium: "rgba(0, 0, 0, 0.1)", // Medium shadow
    large: "rgba(0, 0, 0, 0.15)", // Large shadow
    extraLarge: "rgba(0, 0, 0, 0.2)", // Extra large shadow
  },
} as const;

export type ColorCategory = keyof typeof colors;
export type ColorToken<T extends ColorCategory> = keyof (typeof colors)[T];
