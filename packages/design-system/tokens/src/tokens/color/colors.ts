/**
 * Semantic Color Tokens
 *
 * These tokens map primitive colorPrimitives to semantic meanings in the design system.
 * They provide intent-based naming for easier usage and better maintainability.
 */

import { color as primitiveColor } from '@grasdouble/lufa_design-system-primitives';

export const color = {
  // Text primitiveColors
  text: {
    primary: primitiveColor.neutral.neutral[900], // Main text color (AAA)
    secondary: primitiveColor.neutral.neutral[700], // Secondary text (AAA)
    tertiary: primitiveColor.neutral.neutral[600], // Tertiary text (AAA)
    disabled: primitiveColor.neutral.neutral[400], // Disabled text
    inverse: primitiveColor.neutral.neutral[0], // Text on dark backgrounds
    link: primitiveColor.chromatic.blue[600], // Link text (AAA)
    linkHover: primitiveColor.chromatic.blue[700], // Link hover state
  },

  // Background primitiveColors
  background: {
    primary: primitiveColor.neutral.neutral[0], // Main background
    secondary: primitiveColor.neutral.neutral[50], // Secondary background
    tertiary: primitiveColor.neutral.neutral[100], // Tertiary background
    inverse: primitiveColor.neutral.neutral[900], // Dark background
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal/overlay background
  },

  // Border primitiveColors
  border: {
    default: primitiveColor.neutral.neutral[300], // Default borders
    light: primitiveColor.neutral.neutral[200], // Light borders
    medium: primitiveColor.neutral.neutral[400], // Medium borders
    strong: primitiveColor.neutral.neutral[600], // Strong borders
    focus: primitiveColor.chromatic.blue[500], // Focus state borders
  },

  // Interactive states
  interactive: {
    default: primitiveColor.chromatic.blue[600], // Default interactive (AAA)
    hover: primitiveColor.chromatic.blue[700], // Hover state
    active: primitiveColor.chromatic.blue[800], // Active/pressed state
    disabled: primitiveColor.neutral.neutral[300], // Disabled state
    focus: primitiveColor.chromatic.blue[500], // Focus state
  },

  // Status primitiveColors - Success
  success: {
    default: primitiveColor.chromatic.green[600], // Success color (AAA)
    hover: primitiveColor.chromatic.green[700], // Success hover
    active: primitiveColor.chromatic.green[800], // Success active
    light: primitiveColor.chromatic.green[50], // Success background light
    lighter: primitiveColor.chromatic.green[100], // Success background lighter
    border: primitiveColor.chromatic.green[300], // Success border
    text: primitiveColor.chromatic.green[700], // Success text
  },

  // Status primitiveColors - Warning
  warning: {
    default: primitiveColor.chromatic.orange[600], // Warning color (AAA)
    hover: primitiveColor.chromatic.orange[700], // Warning hover
    active: primitiveColor.chromatic.orange[800], // Warning active
    light: primitiveColor.chromatic.orange[50], // Warning background light
    lighter: primitiveColor.chromatic.orange[100], // Warning background lighter
    border: primitiveColor.chromatic.orange[300], // Warning border
    text: primitiveColor.chromatic.orange[700], // Warning text
  },

  // Status primitiveColors - Error/Danger
  error: {
    default: primitiveColor.chromatic.red[600], // Error color (AAA)
    hover: primitiveColor.chromatic.red[700], // Error hover
    active: primitiveColor.chromatic.red[800], // Error active
    light: primitiveColor.chromatic.red[50], // Error background light
    lighter: primitiveColor.chromatic.red[100], // Error background lighter
    border: primitiveColor.chromatic.red[300], // Error border
    text: primitiveColor.chromatic.red[700], // Error text
  },

  // Status primitiveColors - Info
  info: {
    default: primitiveColor.chromatic.blue[600], // Info color (AAA)
    hover: primitiveColor.chromatic.blue[700], // Info hover
    active: primitiveColor.chromatic.blue[800], // Info active
    light: primitiveColor.chromatic.blue[50], // Info background light
    lighter: primitiveColor.chromatic.blue[100], // Info background lighter
    border: primitiveColor.chromatic.blue[300], // Info border
    text: primitiveColor.chromatic.blue[700], // Info text
  },

  // Brand primitiveColors
  brand: {
    primary: primitiveColor.chromatic.blue[600], // Primary brand color
    primaryHover: primitiveColor.chromatic.blue[700], // Primary hover
    primaryActive: primitiveColor.chromatic.blue[800], // Primary active
    secondary: primitiveColor.chromatic.purple[600], // Secondary brand color
    secondaryHover: primitiveColor.chromatic.purple[700], // Secondary hover
    secondaryActive: primitiveColor.chromatic.purple[800], // Secondary active
    accent: primitiveColor.chromatic.teal[600], // Accent color
  },

  // Surface primitiveColors (for cards, panels, etc.)
  surface: {
    default: primitiveColor.neutral.neutral[0], // Default surface
    raised: primitiveColor.neutral.neutral[50], // Slightly raised surface
    overlay: primitiveColor.neutral.neutral[100], // Overlay surface
    inverse: primitiveColor.neutral.neutral[900], // Dark surface
  },

  // Shadow primitiveColors
  shadow: {
    small: 'rgba(0, 0, 0, 0.05)', // Small shadow
    medium: 'rgba(0, 0, 0, 0.1)', // Medium shadow
    large: 'rgba(0, 0, 0, 0.15)', // Large shadow
    extraLarge: 'rgba(0, 0, 0, 0.2)', // Extra large shadow
  },
} as const;

export type Color = keyof typeof color;
export type ColorValue = (typeof color)[Color];
