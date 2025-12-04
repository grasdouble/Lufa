/**
 * CSS Custom Properties (CSS Variables) for Color System
 *
 * This file generates CSS custom properties from the design system colors.
 * These can be used in CSS files and are compatible with Tailwind CSS v4.
 */

import { primitives } from '../colors-primitives';
import { semantic } from '../colors-semantic';

/**
 * Generate CSS custom properties from the color tokens
 */
export function generateCSSVariables(): string {
    const cssVars: string[] = [':root {'];

    // Primitive colors
    Object.entries(primitives).forEach(([colorName, shades]) => {
        Object.entries(shades).forEach(([shade, value]) => {
            cssVars.push(`  --color-${colorName}-${shade}: ${value};`);
        });
    });

    // Semantic colors
    Object.entries(semantic).forEach(([category, tokens]) => {
        Object.entries(tokens).forEach(([token, value]) => {
            cssVars.push(`  --color-${category}-${token}: ${value};`);
        });
    });

    cssVars.push('}');

    // Dark mode overrides (optional - can be customized)
    cssVars.push('');
    cssVars.push('[data-theme="dark"], .dark {');
    cssVars.push(`  --color-text-primary: ${primitives.neutral[0]};`);
    cssVars.push(`  --color-text-secondary: ${primitives.neutral[200]};`);
    cssVars.push(`  --color-text-tertiary: ${primitives.neutral[300]};`);
    cssVars.push(`  --color-text-inverse: ${primitives.neutral[900]};`);
    cssVars.push(`  --color-background-primary: ${primitives.neutral[900]};`);
    cssVars.push(`  --color-background-secondary: ${primitives.neutral[800]};`);
    cssVars.push(`  --color-background-tertiary: ${primitives.neutral[700]};`);
    cssVars.push(`  --color-background-inverse: ${primitives.neutral[0]};`);
    cssVars.push(`  --color-surface-default: ${primitives.neutral[900]};`);
    cssVars.push(`  --color-surface-raised: ${primitives.neutral[800]};`);
    cssVars.push(`  --color-surface-overlay: ${primitives.neutral[700]};`);
    cssVars.push(`  --color-surface-inverse: ${primitives.neutral[0]};`);
    cssVars.push(`  --color-border-default: ${primitives.neutral[700]};`);
    cssVars.push(`  --color-border-light: ${primitives.neutral[800]};`);
    cssVars.push('}');

    return cssVars.join('\n');
}

/**
 * Tailwind CSS v4 color configuration
 */
export const tailwindColors = {
    // Primitive colors
    neutral: primitives.neutral,
    blue: primitives.blue,
    green: primitives.green,
    orange: primitives.orange,
    red: primitives.red,
    purple: primitives.purple,
    teal: primitives.teal,
    yellow: primitives.yellow,
    pink: primitives.pink,
    indigo: primitives.indigo,

    // Semantic aliases for easy use
    primary: primitives.blue,
    success: primitives.green,
    warning: primitives.orange,
    error: primitives.red,
    info: primitives.blue,
} as const;

/**
 * Export the CSS as a string for direct injection
 */
export const cssVariables = generateCSSVariables();
