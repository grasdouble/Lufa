/**
 * Story Colors
 *
 * Color utilities for Storybook stories with two distinct purposes:
 *
 * ## 1. Theme-Aware Colors (`STORY_COLORS.themed`)
 * CSS variables that automatically adapt to light/dark/high-contrast modes.
 * **Use for:** Story UI containers, text, borders, backgrounds.
 *
 * ## 2. Fixed Decorative Colors (`STORY_COLORS.primary`)
 * Hard-coded colors for visual examples that should remain consistent.
 * **Use for:** Showing color variants, margins/padding visualization, examples.
 *
 * ---
 *
 * **⚠️ Migration Note:**
 * If you used `STORY_COLORS.neutral.*` in inline styles, migrate to `STORY_COLORS.themed.*`:
 *
 * ```tsx
 * // ❌ OLD (doesn't adapt to dark mode)
 * <div style={{ color: STORY_COLORS.neutral.textDark }}>
 *
 * // ✅ NEW (adapts to all themes)
 * <div style={{ color: STORY_COLORS.themed.text.primary }}>
 * ```
 *
 * **When to use which:**
 * - `themed.*` → Story containers, documentation text, UI chrome
 * - `primary.*` → Example content, color demonstrations, visualization overlays
 * - `neutral.*` → Legacy support (prefer `themed` for new code)
 *
 * ---
 *
 * @example Theme-Aware Story Container
 * ```tsx
 * <div style={{
 *   color: STORY_COLORS.themed.text.primary,
 *   backgroundColor: STORY_COLORS.themed.background.surface,
 *   border: `1px solid ${STORY_COLORS.themed.border.default}`,
 * }}>
 *   Story content
 * </div>
 * ```
 *
 * @example Fixed Decorative Colors
 * ```tsx
 * // Show multiple Box variants with different colors
 * {colors.map((color, idx) => (
 *   <Box background={getColorByIndex(idx).main}>
 *     Example {idx}
 *   </Box>
 * ))}
 * ```
 */

// Import tokens from JSON values (simple values for Storybook usage)
// This approach ensures we're using the canonical token values without deprecated JS exports
import tokens from '@grasdouble/lufa_design-system-tokens/values';

/**
 * Color definition with main color and light background variant
 */
export type StoryColor = {
  /** Main color (for Box backgrounds, borders, etc.) */
  main: string;
  /** Light background color (for container backgrounds) */
  light: string;
  /** Color name for reference */
  name: string;
};

/**
 * Primary colors for stories
 *
 * Uses design system primitives where available (blue, green, purple).
 * Additional colors (violet, pink, orange, cyan) use Tailwind CSS color values
 * as they are not yet available in the design system primitives.
 *
 * **Note on Hard-Coded Colors:** The violet, pink, orange, and cyan colors are intentionally
 * hard-coded from Tailwind CSS because:
 * 1. They provide visual variety for story demonstrations
 * 2. They are not yet available in our primitive token set
 * 3. They need to remain consistent across all themes for documentation clarity
 * 4. This is acceptable for Storybook documentation (not production code)
 *
 * @see https://tailwindcss.com/docs/customizing-colors
 */
export const PRIMARY_COLORS = {
  /** Blue - From design system primitives (blue-500 / blue-100) */
  blue: {
    main: tokens.primitive.color.blue['500'], // #3b82f6
    light: tokens.primitive.color.blue['100'], // #dbeafe
    name: 'Blue',
  },
  /** Violet - Tailwind violet-500 / violet-100 (not in primitives yet) */
  violet: {
    main: '#8b5cf6',
    light: '#ede9fe',
    name: 'Violet',
  },
  /** Pink - Tailwind pink-500 / pink-100 (not in primitives yet) */
  pink: {
    main: '#ec4899',
    light: '#fce7f3',
    name: 'Pink',
  },
  /** Orange - Tailwind orange-500 / orange-100 (not in primitives yet) */
  orange: {
    main: '#f59e0b',
    light: '#fef3c7',
    name: 'Orange',
  },
  /** Green - From design system primitives (green-500 / green-100) */
  green: {
    main: tokens.primitive.color.green['500'], // #22c55e
    light: tokens.primitive.color.green['100'], // #dcfce7
    name: 'Green',
  },
  /** Cyan - Tailwind cyan-500 / cyan-100 (not in primitives yet) */
  cyan: {
    main: '#06b6d4',
    light: '#cffafe',
    name: 'Cyan',
  },
  /** Red - From design system primitives (red-600 / red-100) */
  red: {
    main: tokens.primitive.color.red['600'], // #dc2626
    light: tokens.primitive.color.red['100'], // #fee2e2
    name: 'Red',
  },
} as const;

/**
 * Extended palette (array for index-based mapping)
 *
 * Use `getColorByIndex(idx)` to get colors in a consistent order.
 * Useful for showing multiple variants with distinct colors.
 *
 * @example
 * ```tsx
 * variants.map((variant, idx) => {
 *   const color = getColorByIndex(idx);
 *   return <Box style={{ backgroundColor: color.main }}>...</Box>;
 * });
 * ```
 */
export const EXTENDED_PALETTE: StoryColor[] = [
  PRIMARY_COLORS.blue,
  PRIMARY_COLORS.violet,
  PRIMARY_COLORS.pink,
  PRIMARY_COLORS.orange,
  PRIMARY_COLORS.green,
  PRIMARY_COLORS.cyan,
];

/**
 * Directional colors (for margin/padding sides)
 *
 * Use these for stories demonstrating directional properties like
 * marginTop, marginRight, marginBottom, marginLeft (and padding equivalents).
 *
 * **Mapping:**
 * - Top: Blue (#3b82f6)
 * - Right: Violet (#8b5cf6)
 * - Bottom: Pink (#ec4899)
 * - Left: Orange (#f59e0b)
 *
 * @example
 * ```tsx
 * [
 *   { prop: 'marginTop', ...STORY_COLORS.directional.top },
 *   { prop: 'marginRight', ...STORY_COLORS.directional.right },
 * ].map(({ prop, main, light }) => (
 *   <Box style={{ backgroundColor: main }}>...</Box>
 * ));
 * ```
 */
export const DIRECTIONAL_COLORS = {
  /** Top direction - Blue */
  top: PRIMARY_COLORS.blue,
  /** Right direction - Violet */
  right: PRIMARY_COLORS.violet,
  /** Bottom direction - Pink */
  bottom: PRIMARY_COLORS.pink,
  /** Left direction - Orange */
  left: PRIMARY_COLORS.orange,
} as const;

/**
 * Axis colors (for X/Y properties)
 *
 * Use these for stories demonstrating axis-based properties like
 * marginX, marginY, paddingX, paddingY.
 *
 * **Mapping:**
 * - X (Horizontal): Blue (#3b82f6)
 * - Y (Vertical): Orange (#f59e0b)
 * - Combined (Both): Violet (#8b5cf6)
 *
 * @example
 * ```tsx
 * // marginX (horizontal)
 * <Box style={{ backgroundColor: STORY_COLORS.axis.x.main }}>
 *
 * // marginY (vertical)
 * <Box style={{ backgroundColor: STORY_COLORS.axis.y.main }}>
 *
 * // Both combined
 * <Box style={{ backgroundColor: STORY_COLORS.axis.combined.main }}>
 * ```
 */
export const AXIS_COLORS = {
  /** X axis (horizontal) - Blue */
  x: PRIMARY_COLORS.blue,
  /** Y axis (vertical) - Orange */
  y: PRIMARY_COLORS.orange,
  /** Combined (both axes) - Violet */
  combined: PRIMARY_COLORS.violet,
} as const;

/**
 * Neutral colors for backgrounds, borders, and text
 *
 * Uses design system primitives (gray scale).
 * Use these for demonstration containers and content placeholders.
 *
 * **Note:** borderSlate, textSlate, and white are intentionally hard-coded because:
 * - borderSlate/textSlate: Provide visual contrast not available in gray primitives
 * - white: Universal reference color for documentation examples
 *
 * @example
 * ```tsx
 * <div style={{
 *   backgroundColor: STORY_COLORS.neutral.backgroundLight,
 *   border: `2px dashed ${STORY_COLORS.neutral.borderMedium}`,
 *   color: STORY_COLORS.neutral.textDark,
 * }}>
 * ```
 */
export const NEUTRAL_COLORS = {
  /** Light gray background - From primitives (gray-100) */
  backgroundLight: tokens.primitive.color.gray['100'], // #f3f4f6
  /** Medium gray background - From primitives (gray-200) */
  backgroundMedium: tokens.primitive.color.gray['200'], // #e5e7eb
  /** Alias for backgroundLight (for backwards compatibility) */
  bgGray: tokens.primitive.color.gray['100'], // #f3f4f6 (same as backgroundLight)
  /** Medium gray border - From primitives (gray-300) */
  borderMedium: tokens.primitive.color.gray['300'], // #d1d5db
  /** Slate border - Tailwind slate-200 (not in primitives yet) */
  borderSlate: '#e2e8f0',
  /** Dark gray text - From primitives (gray-800) */
  textDark: tokens.primitive.color.gray['800'], // #1f2937
  /** Default text color - Alias for textDark */
  text: tokens.primitive.color.gray['800'], // #1f2937 (same as textDark)
  /** Slate text - Tailwind slate-500 (not in primitives yet) */
  textSlate: '#64748b',
  /** White - Pure white */
  white: '#ffffff',
} as const;

/**
 * Themed colors for story UI elements
 *
 * These CSS variables automatically adapt to the active theme (light/dark/high-contrast).
 * Use these for story containers, text, borders, and backgrounds that should match the theme.
 *
 * **When to use THEMED vs NEUTRAL/PRIMARY:**
 * - Use `THEMED` when UI elements should adapt to light/dark/high-contrast modes
 * - Use `PRIMARY` for decorative fixed colors in examples (showing color variants)
 * - Use `NEUTRAL` only for backwards compatibility (prefer THEMED for new code)
 *
 * @example
 * ```tsx
 * // ✅ CORRECT: Story UI that adapts to theme
 * <div style={{
 *   color: STORY_COLORS.themed.text.primary,
 *   backgroundColor: STORY_COLORS.themed.background.surface,
 *   border: `1px solid ${STORY_COLORS.themed.border.default}`,
 * }}>
 *
 * // ✅ CORRECT: Fixed decorative colors (examples)
 * <Box background={STORY_COLORS.primary.blue.main}>
 *   Example with blue background
 * </Box>
 *
 * // ⚠️ AVOID: NEUTRAL colors don't adapt to theme
 * <div style={{ color: STORY_COLORS.neutral.textDark }}>  // Always dark!
 * ```
 */
export const THEMED_COLORS = {
  /** Text colors that adapt to theme */
  text: {
    /** Primary text color (dark in light mode, light in dark mode) */
    primary: 'var(--lufa-semantic-ui-text-primary)',
    /** Secondary text color (medium contrast) */
    secondary: 'var(--lufa-semantic-ui-text-secondary)',
    /** Tertiary text color (low contrast) */
    tertiary: 'var(--lufa-semantic-ui-text-tertiary)',
    /** Success text color (green) */
    success: 'var(--lufa-semantic-ui-text-success)',
    /** Inverse text color (for dark backgrounds) */
    inverse: 'var(--lufa-semantic-ui-text-inverse)',
  },
  /** Background colors that adapt to theme */
  background: {
    /** Page background */
    page: 'var(--lufa-semantic-ui-background-page)',
    /** Surface background (cards, panels) */
    surface: 'var(--lufa-semantic-ui-background-surface)',
    /** Success background (green) */
    success: 'var(--lufa-semantic-ui-background-success)',
    /** Error background (red) */
    error: 'var(--lufa-semantic-ui-background-error)',
    /** Warning background (orange) */
    warning: 'var(--lufa-semantic-ui-background-warning)',
    /** Info background (blue) */
    info: 'var(--lufa-semantic-ui-background-info)',
    /** Text on primary color background */
    onPrimary: 'var(--lufa-semantic-ui-background-on-primary)',
  },
  /** Border colors that adapt to theme */
  border: {
    /** Default border color */
    default: 'var(--lufa-semantic-ui-border-default)',
    /** Subtle border color */
    subtle: 'var(--lufa-semantic-ui-border-subtle)',
  },
  /** Shadow tokens that adapt to theme */
  shadow: {
    /** Small shadow */
    sm: 'var(--lufa-semantic-ui-shadow-sm)',
    /** Medium shadow */
    md: 'var(--lufa-semantic-ui-shadow-md)',
  },
  /** Overlay tokens that adapt to theme */
  overlay: {
    /** Backdrop overlay */
    backdrop: 'var(--lufa-semantic-ui-overlay-backdrop)',
  },
} as const;

/**
 * All story colors (convenience export)
 *
 * Use this to access all color groups from a single import.
 *
 * @example
 * ```tsx
 * import { STORY_COLORS } from '../../constants/storyColors';
 *
 * // Theme-aware colors (recommended for story UI)
 * STORY_COLORS.themed.text.primary
 * STORY_COLORS.themed.background.surface
 * STORY_COLORS.themed.border.default
 *
 * // Fixed decorative colors (for examples)
 * STORY_COLORS.primary.blue.main
 * STORY_COLORS.directional.top.main
 * STORY_COLORS.axis.x.main
 *
 * // Legacy (prefer themed for new code)
 * STORY_COLORS.neutral.backgroundLight
 * ```
 */
export const STORY_COLORS = {
  themed: THEMED_COLORS,
  primary: PRIMARY_COLORS,
  extended: EXTENDED_PALETTE,
  directional: DIRECTIONAL_COLORS,
  axis: AXIS_COLORS,
  neutral: NEUTRAL_COLORS,
} as const;

/**
 * Helper function to get color by index from extended palette
 *
 * Automatically wraps index using modulo to cycle through colors.
 * Useful for mapping over arrays with consistent colors.
 *
 * @param index - Array index (0-based, automatically wrapped)
 * @returns StoryColor object with main, light, and name properties
 *
 * @example
 * ```tsx
 * variants.map((variant, idx) => {
 *   const color = getColorByIndex(idx);
 *   return (
 *     <div style={{ backgroundColor: color.light }}>
 *       <Box style={{ backgroundColor: color.main }}>
 *         {variant} ({color.name})
 *       </Box>
 *     </div>
 *   );
 * });
 * ```
 */
export const getColorByIndex = (index: number): StoryColor => {
  return EXTENDED_PALETTE[index % EXTENDED_PALETTE.length];
};

/**
 * Type exports for TypeScript
 */
export type PrimaryColorKey = keyof typeof PRIMARY_COLORS;
export type DirectionalColorKey = keyof typeof DIRECTIONAL_COLORS;
export type AxisColorKey = keyof typeof AXIS_COLORS;
