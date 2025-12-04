/**
 * Semantic Color Tokens
 *
 * These tokens map primitive colors to semantic meanings in the design system.
 * They provide intent-based naming for easier usage and better maintainability.
 */

import { primitives } from './colors-primitives';

export const semantic = {
    // Text colors
    text: {
        primary: primitives.neutral[900], // Main text color (AAA)
        secondary: primitives.neutral[700], // Secondary text (AAA)
        tertiary: primitives.neutral[600], // Tertiary text (AAA)
        disabled: primitives.neutral[400], // Disabled text
        inverse: primitives.neutral[0], // Text on dark backgrounds
        link: primitives.blue[600], // Link text (AAA)
        linkHover: primitives.blue[700], // Link hover state
    },

    // Background colors
    background: {
        primary: primitives.neutral[0], // Main background
        secondary: primitives.neutral[50], // Secondary background
        tertiary: primitives.neutral[100], // Tertiary background
        inverse: primitives.neutral[900], // Dark background
        overlay: 'rgba(0, 0, 0, 0.5)', // Modal/overlay background
    },

    // Border colors
    border: {
        default: primitives.neutral[300], // Default borders
        light: primitives.neutral[200], // Light borders
        medium: primitives.neutral[400], // Medium borders
        strong: primitives.neutral[600], // Strong borders
        focus: primitives.blue[500], // Focus state borders
    },

    // Interactive states
    interactive: {
        default: primitives.blue[600], // Default interactive (AAA)
        hover: primitives.blue[700], // Hover state
        active: primitives.blue[800], // Active/pressed state
        disabled: primitives.neutral[300], // Disabled state
        focus: primitives.blue[500], // Focus state
    },

    // Status colors - Success
    success: {
        default: primitives.green[600], // Success color (AAA)
        hover: primitives.green[700], // Success hover
        active: primitives.green[800], // Success active
        light: primitives.green[50], // Success background light
        lighter: primitives.green[100], // Success background lighter
        border: primitives.green[300], // Success border
        text: primitives.green[700], // Success text
    },

    // Status colors - Warning
    warning: {
        default: primitives.orange[600], // Warning color (AAA)
        hover: primitives.orange[700], // Warning hover
        active: primitives.orange[800], // Warning active
        light: primitives.orange[50], // Warning background light
        lighter: primitives.orange[100], // Warning background lighter
        border: primitives.orange[300], // Warning border
        text: primitives.orange[700], // Warning text
    },

    // Status colors - Error/Danger
    error: {
        default: primitives.red[600], // Error color (AAA)
        hover: primitives.red[700], // Error hover
        active: primitives.red[800], // Error active
        light: primitives.red[50], // Error background light
        lighter: primitives.red[100], // Error background lighter
        border: primitives.red[300], // Error border
        text: primitives.red[700], // Error text
    },

    // Status colors - Info
    info: {
        default: primitives.blue[600], // Info color (AAA)
        hover: primitives.blue[700], // Info hover
        active: primitives.blue[800], // Info active
        light: primitives.blue[50], // Info background light
        lighter: primitives.blue[100], // Info background lighter
        border: primitives.blue[300], // Info border
        text: primitives.blue[700], // Info text
    },

    // Brand colors
    brand: {
        primary: primitives.blue[600], // Primary brand color
        primaryHover: primitives.blue[700], // Primary hover
        primaryActive: primitives.blue[800], // Primary active
        secondary: primitives.purple[600], // Secondary brand color
        secondaryHover: primitives.purple[700], // Secondary hover
        secondaryActive: primitives.purple[800], // Secondary active
        accent: primitives.teal[600], // Accent color
    },

    // Surface colors (for cards, panels, etc.)
    surface: {
        default: primitives.neutral[0], // Default surface
        raised: primitives.neutral[50], // Slightly raised surface
        overlay: primitives.neutral[100], // Overlay surface
        inverse: primitives.neutral[900], // Dark surface
    },

    // Shadow colors
    shadow: {
        small: 'rgba(0, 0, 0, 0.05)', // Small shadow
        medium: 'rgba(0, 0, 0, 0.1)', // Medium shadow
        large: 'rgba(0, 0, 0, 0.15)', // Large shadow
        extraLarge: 'rgba(0, 0, 0, 0.2)', // Extra large shadow
    },
} as const;

export type SemanticColorCategory = keyof typeof semantic;
export type SemanticColorToken<T extends SemanticColorCategory> = keyof (typeof semantic)[T];
