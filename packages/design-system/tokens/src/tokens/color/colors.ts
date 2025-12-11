/**
 * Semantic Color Tokens
 *
 * These tokens map primitive colorPrimitives to semantic meanings in the design system.
 * They provide intent-based naming for easier usage and better maintainability.
 */

import {
  colorChromatics as primitiveColorChromatics,
  colorNeutrals as primitiveColorNeutrals,
} from "@grasdouble/lufa_design-system-primitives";

export const colors = {
  // Text primitiveColors
  text: {
    primary: primitiveColorNeutrals.neutral[900], // Main text color (AAA)
    secondary: primitiveColorNeutrals.neutral[700], // Secondary text (AAA)
    tertiary: primitiveColorNeutrals.neutral[600], // Tertiary text (AAA)
    disabled: primitiveColorNeutrals.neutral[400], // Disabled text
    inverse: primitiveColorNeutrals.neutral[0], // Text on dark backgrounds
    link: primitiveColorChromatics.blue[600], // Link text (AAA)
    linkHover: primitiveColorChromatics.blue[700], // Link hover state
  },

  // Background primitiveColors
  background: {
    primary: primitiveColorNeutrals.neutral[0], // Main background
    secondary: primitiveColorNeutrals.neutral[50], // Secondary background
    tertiary: primitiveColorNeutrals.neutral[100], // Tertiary background
    inverse: primitiveColorNeutrals.neutral[900], // Dark background
    overlay: "rgba(0, 0, 0, 0.5)", // Modal/overlay background
  },

  // Border primitiveColors
  border: {
    default: primitiveColorNeutrals.neutral[300], // Default borders
    light: primitiveColorNeutrals.neutral[200], // Light borders
    medium: primitiveColorNeutrals.neutral[400], // Medium borders
    strong: primitiveColorNeutrals.neutral[600], // Strong borders
    focus: primitiveColorChromatics.blue[500], // Focus state borders
  },

  // Interactive states
  interactive: {
    default: primitiveColorChromatics.blue[600], // Default interactive (AAA)
    hover: primitiveColorChromatics.blue[700], // Hover state
    active: primitiveColorChromatics.blue[800], // Active/pressed state
    disabled: primitiveColorNeutrals.neutral[300], // Disabled state
    focus: primitiveColorChromatics.blue[500], // Focus state
  },

  // Status primitiveColors - Success
  success: {
    default: primitiveColorChromatics.green[600], // Success color (AAA)
    hover: primitiveColorChromatics.green[700], // Success hover
    active: primitiveColorChromatics.green[800], // Success active
    light: primitiveColorChromatics.green[50], // Success background light
    lighter: primitiveColorChromatics.green[100], // Success background lighter
    border: primitiveColorChromatics.green[300], // Success border
    text: primitiveColorChromatics.green[700], // Success text
  },

  // Status primitiveColors - Warning
  warning: {
    default: primitiveColorChromatics.orange[600], // Warning color (AAA)
    hover: primitiveColorChromatics.orange[700], // Warning hover
    active: primitiveColorChromatics.orange[800], // Warning active
    light: primitiveColorChromatics.orange[50], // Warning background light
    lighter: primitiveColorChromatics.orange[100], // Warning background lighter
    border: primitiveColorChromatics.orange[300], // Warning border
    text: primitiveColorChromatics.orange[700], // Warning text
  },

  // Status primitiveColors - Error/Danger
  error: {
    default: primitiveColorChromatics.red[600], // Error color (AAA)
    hover: primitiveColorChromatics.red[700], // Error hover
    active: primitiveColorChromatics.red[800], // Error active
    light: primitiveColorChromatics.red[50], // Error background light
    lighter: primitiveColorChromatics.red[100], // Error background lighter
    border: primitiveColorChromatics.red[300], // Error border
    text: primitiveColorChromatics.red[700], // Error text
  },

  // Status primitiveColors - Info
  info: {
    default: primitiveColorChromatics.blue[600], // Info color (AAA)
    hover: primitiveColorChromatics.blue[700], // Info hover
    active: primitiveColorChromatics.blue[800], // Info active
    light: primitiveColorChromatics.blue[50], // Info background light
    lighter: primitiveColorChromatics.blue[100], // Info background lighter
    border: primitiveColorChromatics.blue[300], // Info border
    text: primitiveColorChromatics.blue[700], // Info text
  },

  // Brand primitiveColors
  brand: {
    primary: primitiveColorChromatics.blue[600], // Primary brand color
    primaryHover: primitiveColorChromatics.blue[700], // Primary hover
    primaryActive: primitiveColorChromatics.blue[800], // Primary active
    secondary: primitiveColorChromatics.purple[600], // Secondary brand color
    secondaryHover: primitiveColorChromatics.purple[700], // Secondary hover
    secondaryActive: primitiveColorChromatics.purple[800], // Secondary active
    accent: primitiveColorChromatics.teal[600], // Accent color
  },

  // Surface primitiveColors (for cards, panels, etc.)
  surface: {
    default: primitiveColorNeutrals.neutral[0], // Default surface
    raised: primitiveColorNeutrals.neutral[50], // Slightly raised surface
    overlay: primitiveColorNeutrals.neutral[100], // Overlay surface
    inverse: primitiveColorNeutrals.neutral[900], // Dark surface
  },

  // Shadow primitiveColors
  shadow: {
    small: "rgba(0, 0, 0, 0.05)", // Small shadow
    medium: "rgba(0, 0, 0, 0.1)", // Medium shadow
    large: "rgba(0, 0, 0, 0.15)", // Large shadow
    extraLarge: "rgba(0, 0, 0, 0.2)", // Extra large shadow
  },
} as const;

export type Colors = typeof colors;
export type ColorsCategoriesTokens = keyof Colors;
export type ColorsToken<T extends ColorsCategoriesTokens> =
  keyof (typeof colors)[T];
