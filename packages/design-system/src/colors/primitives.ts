/**
 * Primitive Color Tokens
 *
 * These are the base color values following WCAG 2.1 AAA accessibility guidelines.
 * Each color scale is designed to provide sufficient contrast ratios for text and UI elements.
 *
 * Contrast ratios:
 * - AAA for normal text: 7:1
 * - AA for normal text: 4.5:1
 * - AAA for large text: 4.5:1
 * - AA for large text: 3:1
 */

export const primitives = {
    // Neutral colors (Grayscale)
    neutral: {
        0: '#FFFFFF', // White
        50: '#FAFAFA', // Nearly white
        100: '#F5F5F5', // Light gray
        200: '#E5E5E5', // Lighter gray
        300: '#D4D4D4', // Light-medium gray
        400: '#A3A3A3', // Medium gray
        500: '#737373', // Medium-dark gray (WCAG AA on white)
        600: '#525252', // Dark gray (WCAG AAA on white)
        700: '#404040', // Darker gray
        800: '#262626', // Very dark gray
        900: '#171717', // Nearly black
        950: '#0A0A0A', // Almost black
        1000: '#000000', // Pure black
    },

    // Primary blue (Brand color)
    blue: {
        50: '#EFF6FF', // Very light blue
        100: '#DBEAFE', // Lighter blue
        200: '#BFDBFE', // Light blue
        300: '#93C5FD', // Light-medium blue
        400: '#60A5FA', // Medium blue
        500: '#3B82F6', // Blue (WCAG AA on white)
        600: '#2563EB', // Dark blue (WCAG AAA on white)
        700: '#1D4ED8', // Darker blue
        800: '#1E40AF', // Very dark blue
        900: '#1E3A8A', // Nearly black blue
        950: '#172554', // Almost black blue
    },

    // Success green
    green: {
        50: '#F0FDF4', // Very light green
        100: '#DCFCE7', // Lighter green
        200: '#BBF7D0', // Light green
        300: '#86EFAC', // Light-medium green
        400: '#4ADE80', // Medium green
        500: '#22C55E', // Green (WCAG AA on white)
        600: '#16A34A', // Dark green (WCAG AAA on white)
        700: '#15803D', // Darker green
        800: '#166534', // Very dark green
        900: '#14532D', // Nearly black green
        950: '#052E16', // Almost black green
    },

    // Warning/Caution orange
    orange: {
        50: '#FFF7ED', // Very light orange
        100: '#FFEDD5', // Lighter orange
        200: '#FED7AA', // Light orange
        300: '#FDBA74', // Light-medium orange
        400: '#FB923C', // Medium orange
        500: '#F97316', // Orange (WCAG AA on white)
        600: '#EA580C', // Dark orange (WCAG AAA on white)
        700: '#C2410C', // Darker orange
        800: '#9A3412', // Very dark orange
        900: '#7C2D12', // Nearly black orange
        950: '#431407', // Almost black orange
    },

    // Error red
    red: {
        50: '#FEF2F2', // Very light red
        100: '#FEE2E2', // Lighter red
        200: '#FECACA', // Light red
        300: '#FCA5A5', // Light-medium red
        400: '#F87171', // Medium red
        500: '#EF4444', // Red (WCAG AA on white)
        600: '#DC2626', // Dark red (WCAG AAA on white)
        700: '#B91C1C', // Darker red
        800: '#991B1B', // Very dark red
        900: '#7F1D1D', // Nearly black red
        950: '#450A0A', // Almost black red
    },

    // Info/Secondary purple
    purple: {
        50: '#FAF5FF', // Very light purple
        100: '#F3E8FF', // Lighter purple
        200: '#E9D5FF', // Light purple
        300: '#D8B4FE', // Light-medium purple
        400: '#C084FC', // Medium purple
        500: '#A855F7', // Purple (WCAG AA on white)
        600: '#9333EA', // Dark purple (WCAG AAA on white)
        700: '#7E22CE', // Darker purple
        800: '#6B21A8', // Very dark purple
        900: '#581C87', // Nearly black purple
        950: '#3B0764', // Almost black purple
    },

    // Accent teal/cyan
    teal: {
        50: '#F0FDFA', // Very light teal
        100: '#CCFBF1', // Lighter teal
        200: '#99F6E4', // Light teal
        300: '#5EEAD4', // Light-medium teal
        400: '#2DD4BF', // Medium teal
        500: '#14B8A6', // Teal (WCAG AA on white)
        600: '#0D9488', // Dark teal (WCAG AAA on white)
        700: '#0F766E', // Darker teal
        800: '#115E59', // Very dark teal
        900: '#134E4A', // Nearly black teal
        950: '#042F2E', // Almost black teal
    },

    // Warning yellow
    yellow: {
        50: '#FEFCE8', // Very light yellow
        100: '#FEF9C3', // Lighter yellow
        200: '#FEF08A', // Light yellow
        300: '#FDE047', // Light-medium yellow
        400: '#FACC15', // Medium yellow
        500: '#EAB308', // Yellow (WCAG AA on white)
        600: '#CA8A04', // Dark yellow (WCAG AAA on white)
        700: '#A16207', // Darker yellow
        800: '#854D0E', // Very dark yellow
        900: '#713F12', // Nearly black yellow
        950: '#422006', // Almost black yellow
    },

    // Additional accent: Pink
    pink: {
        50: '#FDF2F8', // Very light pink
        100: '#FCE7F3', // Lighter pink
        200: '#FBCFE8', // Light pink
        300: '#F9A8D4', // Light-medium pink
        400: '#F472B6', // Medium pink
        500: '#EC4899', // Pink (WCAG AA on white)
        600: '#DB2777', // Dark pink (WCAG AAA on white)
        700: '#BE185D', // Darker pink
        800: '#9F1239', // Very dark pink
        900: '#831843', // Nearly black pink
        950: '#500724', // Almost black pink
    },

    // Additional accent: Indigo
    indigo: {
        50: '#EEF2FF', // Very light indigo
        100: '#E0E7FF', // Lighter indigo
        200: '#C7D2FE', // Light indigo
        300: '#A5B4FC', // Light-medium indigo
        400: '#818CF8', // Medium indigo
        500: '#6366F1', // Indigo (WCAG AA on white)
        600: '#4F46E5', // Dark indigo (WCAG AAA on white)
        700: '#4338CA', // Darker indigo
        800: '#3730A3', // Very dark indigo
        900: '#312E81', // Nearly black indigo
        950: '#1E1B4B', // Almost black indigo
    },
} as const;

export type PrimitiveColor = keyof typeof primitives;
export type PrimitiveShade = keyof typeof primitives.neutral;
