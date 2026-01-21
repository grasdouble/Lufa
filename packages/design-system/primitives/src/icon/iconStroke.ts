/**
 * Icon stroke width primitives for outline/stroke-based icon sets.
 * Values match common icon libraries (Lucide, Heroicons, Feather, etc.).
 *
 * SCOPE: Global - Used for stroke-width in SVG icons
 *
 * COMMON USE CASES:
 * - 1: Thin/light icons (subtle UI, large icons, decorative)
 * - 1-5: Regular icons (default, most common usage)
 * - 2: Bold/heavy icons (emphasis, small sizes for legibility)
 * - 2-5: Extra bold icons (strong emphasis, branding)
 *
 * USAGE GUIDELINES:
 * - Default to 1-5 for most UI icons
 * - Use thinner strokes (1) for larger icons (32px+)
 * - Use thicker strokes (2+) for small icons to maintain legibility
 * - Ensure stroke width scales appropriately with icon size
 *
 * NOTE: Keys use dashes instead of dots (1-5 instead of 1.5) for CSS compatibility
 */
export const iconStroke = {
  '1': '1px', // Thin
  '1-5': '1.5px', // Regular (default)
  '2': '2px', // Bold
  '2-5': '2.5px', // Extra bold
} as const;

export type IconStroke = keyof typeof iconStroke;
