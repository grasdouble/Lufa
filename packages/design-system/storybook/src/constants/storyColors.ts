/**
 * Story Colors
 *
 * Predefined color palette for Storybook stories.
 * Uses design system primitives where available, with fallbacks for additional colors.
 *
 * **Important:** These colors are for visual demonstrations in Storybook stories ONLY.
 * For production components, always use semantic tokens from @grasdouble/lufa_design-system-tokens.
 *
 * **Usage Guidelines:**
 * - Use these colors consistently across all stories
 * - Primary colors for main examples
 * - Extended palette for variants (when showing multiple items)
 * - Directional colors for margin/padding (top, right, bottom, left)
 * - Axis colors for X/Y properties
 * - Each color includes a matching light background for containers
 *
 * @example
 * ```tsx
 * import { STORY_COLORS, getColorByIndex } from '../../constants/storyColors';
 *
 * // Extended palette (for multiple variants)
 * const color = getColorByIndex(idx);
 * <Box style={{ backgroundColor: color.main }}>...</Box>
 *
 * // Directional colors (for margin/padding sides)
 * STORY_COLORS.directional.top.main // Blue (#3b82f6)
 *
 * // Axis colors (for X/Y props)
 * STORY_COLORS.axis.x.main // Blue (#3b82f6)
 * STORY_COLORS.axis.y.main // Orange (#f59e0b)
 * ```
 */

// Import tokens from JSON values (simple values for Storybook usage)
// This approach ensures we're using the canonical token values without deprecated JS exports
import tokens from '@grasdouble/lufa_design-system-tokens/values';

/**
 * Color definition with main color and light background variant
 */
export interface StoryColor {
  /** Main color (for Box backgrounds, borders, etc.) */
  main: string;
  /** Light background color (for container backgrounds) */
  light: string;
  /** Color name for reference */
  name: string;
}

/**
 * Primary colors for stories
 *
 * Uses design system primitives where available (blue, green, purple).
 * Additional colors (violet, pink, orange, cyan) use Tailwind CSS color values
 * as they are not yet available in the design system primitives.
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
  /** Medium gray border - From primitives (gray-300) */
  borderMedium: tokens.primitive.color.gray['300'], // #d1d5db
  /** Slate border - Tailwind slate-200 (not in primitives yet) */
  borderSlate: '#e2e8f0',
  /** Dark gray text - From primitives (gray-800) */
  textDark: tokens.primitive.color.gray['800'], // #1f2937
  /** Slate text - Tailwind slate-500 (not in primitives yet) */
  textSlate: '#64748b',
  /** White - Pure white */
  white: '#ffffff',
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
 * STORY_COLORS.primary.blue.main
 * STORY_COLORS.directional.top.main
 * STORY_COLORS.axis.x.main
 * STORY_COLORS.neutral.backgroundLight
 * ```
 */
export const STORY_COLORS = {
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
