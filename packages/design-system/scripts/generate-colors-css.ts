#!/usr/bin/env tsx
/**
 * Generate colors.css from TypeScript color tokens
 *
 * This script generates the CSS custom properties file from the design system colors.
 * Run with: pnpm run generate:colors
 */

// @ts-check
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { primitives } from '../src/foundation/colors-primitives.js';
import { semantic } from '../src/foundation/colors-semantic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/colors.css');

/**
 * Generate CSS custom properties from the color tokens
 */
function generateCSSVariables(): string {
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

const cssContent = `/**
 * Color System CSS Variables
 * 
 * This file is auto-generated from the TypeScript color tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:colors' to regenerate.
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generateCSSVariables()}
`;

try {
    writeFileSync(outputPath, cssContent, 'utf-8');
    console.log('✅ Generated colors.css successfully');
    console.log(`   Output: ${outputPath}`);
} catch (error) {
    console.error('❌ Failed to generate colors.css:', error);
    process.exit(1);
}
