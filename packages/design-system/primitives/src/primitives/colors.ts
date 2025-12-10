/**
 * Base color palette scales with WCAG 2.1 contrast ratios.
 *
 * SCOPE: Global - Foundation for all color usage in the system
 *
 * COMMON USE CASES:
 * - Text colors (600-900 on light backgrounds)
 * - Background colors (50-200 for surfaces)
 * - Interactive states (hover, active, disabled)
 * - Status indicators (success, warning, error)
 * - Brand colors and theming
 * - Charts and data visualization
 *
 * Scale guidelines (on white background):
 * - Shades 50-300: Low contrast (~1-2:1), AAA on black/dark backgrounds
 * - Shades 400: Medium contrast (~2.5-3:1), AA large text only
 * - Shades 500: Medium-high contrast (~2.5-4:1), AA large text only
 * - Shades 600: High contrast (~4.5-6:1), AA normal text
 * - Shades 700+: Very high contrast (≥7:1), AAA normal text
 *
 * Higher numbers are darker. Combine with semantic tokens to ensure proper contrast.
 * Light tints (50-200) work symmetrically on dark backgrounds.
 */
export const colors = {
  neutral: {
    0: "#FFFFFF", // White
    50: "#FAFAFA", // Nearly white (~1.1:1 on white, AAA on black)
    100: "#F5F5F5", // Light gray (~1.2:1 on white, AAA on black)
    200: "#E5E5E5", // Lighter gray (~1.4:1 on white, AAA on black)
    300: "#D4D4D4", // Light-medium gray (~1.8:1 on white, AAA on black)
    400: "#A3A3A3", // Medium gray (~2.8:1 on white, AA large text)
    500: "#737373", // Medium-dark gray (~4.6:1 on white, AA normal text)
    600: "#525252", // Dark gray (~7:1 on white, AAA normal text)
    700: "#404040", // Darker gray (~9:1 on white, AAA)
    800: "#262626", // Very dark gray (~13:1 on white, AAA)
    900: "#171717", // Nearly black (~16:1 on white, AAA)
    950: "#0A0A0A", // Almost black (~19:1 on white, AAA)
    1000: "#000000", // Pure black (21:1 on white, AAA)
  },
  blue: {
    50: "#EFF6FF", // Very light blue (~1.05:1 on white, AAA on black)
    100: "#DBEAFE", // Lighter blue (~1.2:1 on white, AAA on black)
    200: "#BFDBFE", // Light blue (~1.5:1 on white, AAA on black)
    300: "#93C5FD", // Light-medium blue (~2:1 on white, AAA on black)
    400: "#60A5FA", // Medium blue (~2.8:1 on white, AA large text)
    500: "#3B82F6", // Blue (~3.5:1 on white, AA large text only)
    600: "#2563EB", // Dark blue (~5.1:1 on white, AA normal text)
    700: "#1D4ED8", // Darker blue (~6.7:1 on white, AA+ normal text)
    800: "#1E40AF", // Very dark blue (~9:1 on white, AAA)
    900: "#1E3A8A", // Nearly black blue (~11:1 on white, AAA)
    950: "#172554", // Almost black blue (~14:1 on white, AAA)
  },
  green: {
    50: "#F0FDF4", // Very light green (~1.03:1 on white, AAA on black)
    100: "#DCFCE7", // Lighter green (~1.15:1 on white, AAA on black)
    200: "#BBF7D0", // Light green (~1.4:1 on white, AAA on black)
    300: "#86EFAC", // Light-medium green (~1.9:1 on white, AAA on black)
    400: "#4ADE80", // Medium green (~2.3:1 on white, AA large text)
    500: "#22C55E", // Green (~2.5:1 on white, AA large text only)
    600: "#16A34A", // Dark green (~4.2:1 on white, AA- normal text)
    700: "#15803D", // Darker green (~6.2:1 on white, AA normal text)
    800: "#166534", // Very dark green (~8.5:1 on white, AAA)
    900: "#14532D", // Nearly black green (~11:1 on white, AAA)
    950: "#052E16", // Almost black green (~15:1 on white, AAA)
  },
  orange: {
    50: "#FFF7ED", // Very light orange (~1.02:1 on white, AAA on black)
    100: "#FFEDD5", // Lighter orange (~1.1:1 on white, AAA on black)
    200: "#FED7AA", // Light orange (~1.35:1 on white, AAA on black)
    300: "#FDBA74", // Light-medium orange (~1.7:1 on white, AAA on black)
    400: "#FB923C", // Medium orange (~2.3:1 on white, AA large text)
    500: "#F97316", // Orange (~2.8:1 on white, AA large text only)
    600: "#EA580C", // Dark orange (~4.5:1 on white, AA normal text)
    700: "#C2410C", // Darker orange (~6.8:1 on white, AA+ normal text)
    800: "#9A3412", // Very dark orange (~9.5:1 on white, AAA)
    900: "#7C2D12", // Nearly black orange (~11.5:1 on white, AAA)
    950: "#431407", // Almost black orange (~15:1 on white, AAA)
  },
  red: {
    50: "#FEF2F2", // Very light red (~1.03:1 on white, AAA on black)
    100: "#FEE2E2", // Lighter red (~1.15:1 on white, AAA on black)
    200: "#FECACA", // Light red (~1.4:1 on white, AAA on black)
    300: "#FCA5A5", // Light-medium red (~1.9:1 on white, AAA on black)
    400: "#F87171", // Medium red (~2.6:1 on white, AA large text)
    500: "#EF4444", // Red (~3.4:1 on white, AA large text only)
    600: "#DC2626", // Dark red (~5.3:1 on white, AA normal text)
    700: "#B91C1C", // Darker red (~7.5:1 on white, AAA)
    800: "#991B1B", // Very dark red (~9.8:1 on white, AAA)
    900: "#7F1D1D", // Nearly black red (~11.5:1 on white, AAA)
    950: "#450A0A", // Almost black red (~15:1 on white, AAA)
  },
  purple: {
    50: "#FAF5FF", // Very light purple (~1.02:1 on white, AAA on black)
    100: "#F3E8FF", // Lighter purple (~1.1:1 on white, AAA on black)
    200: "#E9D5FF", // Light purple (~1.3:1 on white, AAA on black)
    300: "#D8B4FE", // Light-medium purple (~1.7:1 on white, AAA on black)
    400: "#C084FC", // Medium purple (~2.5:1 on white, AA large text)
    500: "#A855F7", // Purple (~3.8:1 on white, AA large text only)
    600: "#9333EA", // Dark purple (~5:1 on white, AA normal text)
    700: "#7E22CE", // Darker purple (~7.2:1 on white, AAA)
    800: "#6B21A8", // Very dark purple (~9.5:1 on white, AAA)
    900: "#581C87", // Nearly black purple (~11.8:1 on white, AAA)
    950: "#3B0764", // Almost black purple (~14.5:1 on white, AAA)
  },
  teal: {
    50: "#F0FDFA", // Very light teal (~1.02:1 on white, AAA on black)
    100: "#CCFBF1", // Lighter teal (~1.2:1 on white, AAA on black)
    200: "#99F6E4", // Light teal (~1.6:1 on white, AAA on black)
    300: "#5EEAD4", // Light-medium teal (~2.1:1 on white, AA large text)
    400: "#2DD4BF", // Medium teal (~2.8:1 on white, AA large text)
    500: "#14B8A6", // Teal (~3.6:1 on white, AA large text only)
    600: "#0D9488", // Dark teal (~5.2:1 on white, AA normal text)
    700: "#0F766E", // Darker teal (~6.8:1 on white, AA+ normal text)
    800: "#115E59", // Very dark teal (~9:1 on white, AAA)
    900: "#134E4A", // Nearly black teal (~10.5:1 on white, AAA)
    950: "#042F2E", // Almost black teal (~14:1 on white, AAA)
  },
  yellow: {
    50: "#FEFCE8", // Very light yellow (~1.03:1 on white, AAA on black)
    100: "#FEF9C3", // Lighter yellow (~1.15:1 on white, AAA on black)
    200: "#FEF08A", // Light yellow (~1.4:1 on white, AAA on black)
    300: "#FDE047", // Light-medium yellow (~1.7:1 on white, AAA on black)
    400: "#FACC15", // Medium yellow (~1.9:1 on white, AA large text)
    500: "#EAB308", // Yellow (~2.2:1 on white, AA large text only)
    600: "#CA8A04", // Dark yellow (~4.2:1 on white, AA- normal text)
    700: "#A16207", // Darker yellow (~6.5:1 on white, AA normal text)
    800: "#854D0E", // Very dark yellow (~8.5:1 on white, AAA)
    900: "#713F12", // Nearly black yellow (~10:1 on white, AAA)
    950: "#422006", // Almost black yellow (~13.5:1 on white, AAA)
  },
  pink: {
    50: "#FDF2F8", // Very light pink (~1.02:1 on white, AAA on black)
    100: "#FCE7F3", // Lighter pink (~1.12:1 on white, AAA on black)
    200: "#FBCFE8", // Light pink (~1.35:1 on white, AAA on black)
    300: "#F9A8D4", // Light-medium pink (~1.8:1 on white, AAA on black)
    400: "#F472B6", // Medium pink (~2.5:1 on white, AA large text)
    500: "#EC4899", // Pink (~3.5:1 on white, AA large text only)
    600: "#DB2777", // Dark pink (~5.5:1 on white, AA normal text)
    700: "#BE185D", // Darker pink (~7.8:1 on white, AAA)
    800: "#9F1239", // Very dark pink (~10:1 on white, AAA)
    900: "#831843", // Nearly black pink (~11.8:1 on white, AAA)
    950: "#500724", // Almost black pink (~14.5:1 on white, AAA)
  },
  indigo: {
    50: "#EEF2FF", // Very light indigo (~1.04:1 on white, AAA on black)
    100: "#E0E7FF", // Lighter indigo (~1.18:1 on white, AAA on black)
    200: "#C7D2FE", // Light indigo (~1.5:1 on white, AAA on black)
    300: "#A5B4FC", // Light-medium indigo (~2.1:1 on white, AA large text)
    400: "#818CF8", // Medium indigo (~3:1 on white, AA large text)
    500: "#6366F1", // Indigo (~4.2:1 on white, AA- normal text)
    600: "#4F46E5", // Dark indigo (~6:1 on white, AA normal text)
    700: "#4338CA", // Darker indigo (~8:1 on white, AAA)
    800: "#3730A3", // Very dark indigo (~10.5:1 on white, AAA)
    900: "#312E81", // Nearly black indigo (~12.5:1 on white, AAA)
    950: "#1E1B4B", // Almost black indigo (~15:1 on white, AAA)
  },
  cyan: {
    50: "#ECFEFF", // Very light cyan (~1.02:1 on white, AAA on black)
    100: "#CFFAFE", // Lighter cyan (~1.15:1 on white, AAA on black)
    200: "#A5F3FC", // Light cyan (~1.45:1 on white, AAA on black)
    300: "#67E8F9", // Light-medium cyan (~1.9:1 on white, AAA on black)
    400: "#22D3EE", // Medium cyan (~2.5:1 on white, AA large text)
    500: "#06B6D4", // Cyan (~3.5:1 on white, AA large text only)
    600: "#0891B2", // Dark cyan (~5.5:1 on white, AA normal text)
    700: "#0E7490", // Darker cyan (~7.2:1 on white, AAA)
    800: "#155E75", // Very dark cyan (~9.5:1 on white, AAA)
    900: "#164E63", // Nearly black cyan (~11.2:1 on white, AAA)
    950: "#083344", // Almost black cyan (~14.5:1 on white, AAA)
  },
  lime: {
    50: "#F7FEE7", // Very light lime (~1.03:1 on white, AAA on black)
    100: "#ECFCCB", // Lighter lime (~1.2:1 on white, AAA on black)
    200: "#D9F99D", // Light lime (~1.5:1 on white, AAA on black)
    300: "#BEF264", // Light-medium lime (~1.8:1 on white, AAA on black)
    400: "#A3E635", // Medium lime (~2.1:1 on white, AA large text)
    500: "#84CC16", // Lime (~2.6:1 on white, AA large text only)
    600: "#65A30D", // Dark lime (~4.8:1 on white, AA normal text)
    700: "#4D7C0F", // Darker lime (~7:1 on white, AAA)
    800: "#3F6212", // Very dark lime (~9.5:1 on white, AAA)
    900: "#365314", // Nearly black lime (~11.2:1 on white, AAA)
    950: "#1A2E05", // Almost black lime (~14.8:1 on white, AAA)
  },
  amber: {
    50: "#FFFBEB", // Very light amber (~1.02:1 on white, AAA on black)
    100: "#FEF3C7", // Lighter amber (~1.12:1 on white, AAA on black)
    200: "#FDE68A", // Light amber (~1.35:1 on white, AAA on black)
    300: "#FCD34D", // Light-medium amber (~1.6:1 on white, AAA on black)
    400: "#FBBF24", // Medium amber (~1.9:1 on white, AA large text)
    500: "#F59E0B", // Amber (~2.4:1 on white, AA large text only)
    600: "#D97706", // Dark amber (~4.5:1 on white, AA normal text)
    700: "#B45309", // Darker amber (~6.8:1 on white, AA+ normal text)
    800: "#92400E", // Very dark amber (~9.2:1 on white, AAA)
    900: "#78350F", // Nearly black amber (~11:1 on white, AAA)
    950: "#451A03", // Almost black amber (~14.5:1 on white, AAA)
  },
} as const;

export type PrimitiveColor = keyof typeof colors;
export type PrimitiveShade = keyof typeof colors.neutral;
