#!/usr/bin/env tsx
/**
 * Generate typography.css from TypeScript typography tokens
 *
 * This script generates the CSS custom properties file from the design system typography tokens.
 * Run with: pnpm run generate:typography
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import typographyTokens from '../src/foundation/typography.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/typography.css');

function generateTypographyCSS(): string {
    const { fontSize, lineHeight, fontWeight, letterSpacing, typographyScale } = typographyTokens;

    // Generate individual token variables
    const fontSizeVars = Object.entries(fontSize)
        .map(([key, value]) => `    --font-size-${key}: ${value};`)
        .join('\n');

    const lineHeightVars = Object.entries(lineHeight)
        .map(([key, value]) => `    --line-height-${key}: ${value};`)
        .join('\n');

    const fontWeightVars = Object.entries(fontWeight)
        .map(([key, value]) => `    --font-weight-${key}: ${value};`)
        .join('\n');

    const letterSpacingVars = Object.entries(letterSpacing)
        .map(([key, value]) => `    --letter-spacing-${key}: ${value};`)
        .join('\n');

    // Generate scale preset variables
    const scaleVars = Object.entries(typographyScale)
        .map(([key, scale]) => {
            const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return [
                `    --typography-${kebabKey}-font-size: var(--font-size-${Object.keys(fontSize).find((k) => fontSize[k as keyof typeof fontSize] === scale.fontSize)});`,
                `    --typography-${kebabKey}-line-height: var(--line-height-${Object.keys(lineHeight).find((k) => lineHeight[k as keyof typeof lineHeight] === scale.lineHeight)});`,
                `    --typography-${kebabKey}-font-weight: var(--font-weight-${Object.keys(fontWeight).find((k) => fontWeight[k as keyof typeof fontWeight] === scale.fontWeight)});`,
                scale.letterSpacing
                    ? `    --typography-${kebabKey}-letter-spacing: var(--letter-spacing-${Object.keys(letterSpacing).find((k) => letterSpacing[k as keyof typeof letterSpacing] === scale.letterSpacing)});`
                    : null,
            ]
                .filter(Boolean)
                .join('\n');
        })
        .join('\n\n');

    return `:root {
    /* Font Size Scale */
${fontSizeVars}

    /* Line Height Scale */
${lineHeightVars}

    /* Font Weight Scale */
${fontWeightVars}

    /* Letter Spacing Scale */
${letterSpacingVars}

    /* Typography Scale Presets */
${scaleVars}
}`;
}

const cssContent = `/**
 * Typography System CSS Variables
 * 
 * This file is auto-generated from the TypeScript typography tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:typography' to regenerate.
 * 
 * Provides font size, line height, font weight, letter spacing tokens
 * and preset combinations for headings, body text, captions, and labels.
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generateTypographyCSS()}
`;

try {
    writeFileSync(outputPath, cssContent, 'utf-8');
    console.log('✅ Generated typography.css successfully');
    console.log(`   Output: ${outputPath}`);
} catch (error) {
    console.error('❌ Failed to generate typography.css:', error);
    process.exit(1);
}
