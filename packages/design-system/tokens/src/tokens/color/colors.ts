/**
 * Semantic Color Tokens
 *
 * These tokens map primitive colorPrimitives to semantic meanings in the design system.
 * They provide intent-based naming for easier usage and better maintainability.
 */

import * as primitives from '@grasdouble/lufa_design-system-primitives';

export const color = {
  // Text colors
  text: {
    primary: primitives.color.neutral.neutral[900], // Main text color (AAA)
    secondary: primitives.color.neutral.neutral[700], // Secondary text (AAA)
    tertiary: primitives.color.neutral.neutral[600], // Tertiary text (AAA)
    disabled: primitives.color.neutral.neutral[400], // Disabled text
    inverse: primitives.color.neutral.neutral[0], // Text on dark backgrounds
    link: primitives.color.chromatic.blue[600], // Link text (AAA)
    linkHover: primitives.color.chromatic.blue[700], // Link hover state
  },

  // Background colors
  background: {
    primary: primitives.color.neutral.neutral[0], // Main background
    secondary: primitives.color.neutral.neutral[50], // Secondary background
    tertiary: primitives.color.neutral.neutral[100], // Tertiary background
    inverse: primitives.color.neutral.neutral[900], // Dark background
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal/overlay background
  },

  // Border colors
  border: {
    default: primitives.color.neutral.neutral[300], // Default borders
    light: primitives.color.neutral.neutral[200], // Light borders
    medium: primitives.color.neutral.neutral[400], // Medium borders
    strong: primitives.color.neutral.neutral[600], // Strong borders
    focus: primitives.color.chromatic.blue[500], // Focus state borders
  },

  // Interactive states
  interactive: {
    default: primitives.color.chromatic.blue[600], // Default interactive (AAA)
    hover: primitives.color.chromatic.blue[700], // Hover state
    active: primitives.color.chromatic.blue[800], // Active/pressed state
    disabled: primitives.color.neutral.neutral[300], // Disabled state
    focus: primitives.color.chromatic.blue[500], // Focus state
  },

  // Status colors - Success
  success: {
    default: primitives.color.chromatic.green[600], // Success color (AAA)
    hover: primitives.color.chromatic.green[700], // Success hover
    active: primitives.color.chromatic.green[800], // Success active
    light: primitives.color.chromatic.green[50], // Success background light
    lighter: primitives.color.chromatic.green[100], // Success background lighter
    border: primitives.color.chromatic.green[300], // Success border
    text: primitives.color.chromatic.green[700], // Success text
  },

  // Status colors - Warning
  warning: {
    default: primitives.color.chromatic.orange[600], // Warning color (AAA)
    hover: primitives.color.chromatic.orange[700], // Warning hover
    active: primitives.color.chromatic.orange[800], // Warning active
    light: primitives.color.chromatic.orange[50], // Warning background light
    lighter: primitives.color.chromatic.orange[100], // Warning background lighter
    border: primitives.color.chromatic.orange[300], // Warning border
    text: primitives.color.chromatic.orange[700], // Warning text
  },

  // Status colors - Error/Danger
  error: {
    default: primitives.color.chromatic.red[600], // Error color (AAA)
    hover: primitives.color.chromatic.red[700], // Error hover
    active: primitives.color.chromatic.red[800], // Error active
    light: primitives.color.chromatic.red[50], // Error background light
    lighter: primitives.color.chromatic.red[100], // Error background lighter
    border: primitives.color.chromatic.red[300], // Error border
    text: primitives.color.chromatic.red[700], // Error text
  },

  // Status colors - Info
  info: {
    default: primitives.color.chromatic.blue[600], // Info color (AAA)
    hover: primitives.color.chromatic.blue[700], // Info hover
    active: primitives.color.chromatic.blue[800], // Info active
    light: primitives.color.chromatic.blue[50], // Info background light
    lighter: primitives.color.chromatic.blue[100], // Info background lighter
    border: primitives.color.chromatic.blue[300], // Info border
    text: primitives.color.chromatic.blue[700], // Info text
  },

  // Brand colors
  brand: {
    primary: primitives.color.chromatic.blue[600], // Primary brand color
    primaryHover: primitives.color.chromatic.blue[700], // Primary hover
    primaryActive: primitives.color.chromatic.blue[800], // Primary active
    secondary: primitives.color.chromatic.purple[600], // Secondary brand color
    secondaryHover: primitives.color.chromatic.purple[700], // Secondary hover
    secondaryActive: primitives.color.chromatic.purple[800], // Secondary active
    accent: primitives.color.chromatic.teal[600], // Accent color
  },

  // Surface colors (for cards, panels, etc.)
  surface: {
    default: primitives.color.neutral.neutral[0], // Default surface
    raised: primitives.color.neutral.neutral[50], // Slightly raised surface
    overlay: primitives.color.neutral.neutral[100], // Overlay surface
    inverse: primitives.color.neutral.neutral[900], // Dark surface
  },

  // Shadow colors
  shadow: {
    small: 'rgba(0, 0, 0, 0.05)', // Small shadow
    medium: 'rgba(0, 0, 0, 0.1)', // Medium shadow
    large: 'rgba(0, 0, 0, 0.15)', // Large shadow
    extraLarge: 'rgba(0, 0, 0, 0.2)', // Extra large shadow
  },
} as const;

export type Color = keyof typeof color;
export type ColorValue = (typeof color)[Color];
