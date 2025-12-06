#!/usr/bin/env tsx
/**
 * Generate foundation CSS files from TypeScript tokens
 *
 * This script generates CSS custom properties files from the design system tokens.
 * Always outputs to dist/foundation/ for production use.
 *
 * Usage:
 *   pnpm run generate:foundation              # Generate all files
 *   pnpm run generate:foundation colors       # Generate only colors.css
 *   pnpm run generate:foundation spacing typography  # Generate multiple specific files
 *
 * Available options: colors, spacing, radius, shadows, zIndex, breakpoints, typography
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Import all foundation tokens
import { semantic } from '../src/foundation/colors-semantic.js';
import { spacing } from '../src/foundation/spacing.js';
import { radius } from '../src/foundation/radius.js';
import { shadows } from '../src/foundation/shadows.js';
import { zIndex } from '../src/foundation/zIndex.js';
import { breakpoints } from '../src/foundation/breakpoints.js';
import typographyTokens from '../src/foundation/typography.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Output directory
const outputDir = resolve(__dirname, '../dist/foundation');

// Ensure output directory exists
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}\n`);
}

// ============================================
// COLORS
// ============================================
function generateColors(): string {
    const cssVars: string[] = [':root {'];

    // Semantic colors only
    Object.entries(semantic).forEach(([category, tokens]) => {
        Object.entries(tokens).forEach(([token, value]) => {
            cssVars.push(`  --lufa-color-${category}-${token}: ${value};`);
        });
    });

    cssVars.push('}');
    return cssVars.join('\n');
}

// ============================================
// SPACING
// ============================================
function generateSpacing(): string {
    const entries = Object.entries(spacing);
    const variables = entries
        .map(([key, value]) => {
            const remMatch = value.match(/^([\d.]+)rem$/);
            const pxValue = remMatch ? `${parseFloat(remMatch[1]) * 16}px` : value;
            const comment = pxValue !== value ? ` /* ${pxValue} */` : '';
            return `    --lufa-spacing-${key}: ${value};${comment}`;
        })
        .join('\n');

    return `:root {
    /* Spacing Scale */
${variables}
}`;
}

// ============================================
// RADIUS
// ============================================
function generateRadius(): string {
    const entries = Object.entries(radius);
    const variables = entries
        .map(([key, value]) => {
            const remMatch = value.match(/^([\d.]+)rem$/);
            const pxValue = remMatch ? `${parseFloat(remMatch[1]) * 16}px` : value;
            const comment =
                pxValue !== value && value !== '9999px' ? ` /* ${pxValue} */` : value === '9999px' ? ' /* Fully rounded */' : '';
            return `    --lufa-radius-${key}: ${value};${comment}`;
        })
        .join('\n');

    return `:root {
    /* Border Radius Scale */
${variables}
}`;
}

// ============================================
// SHADOWS
// ============================================
function generateShadows(): string {
    const entries = Object.entries(shadows);
    const variables = entries.map(([key, value]) => `    --lufa-shadow-${key}: ${value};`).join('\n');

    return `:root {
    /* Shadow Scale */
${variables}
}`;
}

// ============================================
// Z-INDEX
// ============================================
function generateZIndex(): string {
    const entries = Object.entries(zIndex);
    const variables = entries.map(([key, value]) => `    --lufa-z-index-${key}: ${value};`).join('\n');

    return `:root {
    /* Z-Index Scale */
${variables}
}`;
}

// ============================================
// BREAKPOINTS
// ============================================
function generateBreakpoints(): string {
    const entries = Object.entries(breakpoints);
    const variables = entries.map(([key, value]) => `    --lufa-breakpoint-${key}: ${value};`).join('\n');

    return `:root {
    /* Breakpoint Scale */
${variables}
}`;
}

// ============================================
// TYPOGRAPHY
// ============================================
function generateTypography(): string {
    const { fontSize, lineHeight, fontWeight, letterSpacing, typographyScale } = typographyTokens;

    const fontSizeVars = Object.entries(fontSize)
        .map(([key, value]) => `    --lufa-font-size-${key}: ${value};`)
        .join('\n');

    const lineHeightVars = Object.entries(lineHeight)
        .map(([key, value]) => `    --lufa-line-height-${key}: ${value};`)
        .join('\n');

    const fontWeightVars = Object.entries(fontWeight)
        .map(([key, value]) => `    --lufa-font-weight-${key}: ${value};`)
        .join('\n');

    const letterSpacingVars = Object.entries(letterSpacing)
        .map(([key, value]) => `    --lufa-letter-spacing-${key}: ${value};`)
        .join('\n');

    const scaleVars = Object.entries(typographyScale)
        .map(([variant, styles]) => {
            const vars = [`    /* ${variant} */`];
            Object.entries(styles).forEach(([prop, value]) => {
                vars.push(`    --lufa-typography-${variant}-${prop}: ${value};`);
            });
            return vars.join('\n');
        })
        .join('\n\n');

    return `:root {
    /* Font Sizes */
${fontSizeVars}

    /* Line Heights */
${lineHeightVars}

    /* Font Weights */
${fontWeightVars}

    /* Letter Spacing */
${letterSpacingVars}

    /* Typography Scale (Composite Styles) */
${scaleVars}
}`;
}

// ============================================
// FILE GENERATORS
// ============================================
const generators = [
    {
        name: 'colors',
        filename: 'colors.css',
        generate: generateColors,
        description: 'Color System CSS Variables',
        details: 'Semantic color tokens for consistent theming.',
    },
    {
        name: 'spacing',
        filename: 'spacing.css',
        generate: generateSpacing,
        description: 'Spacing System CSS Variables',
        details: 'Standardized spacing values for layout and composition.',
    },
    {
        name: 'radius',
        filename: 'radius.css',
        generate: generateRadius,
        description: 'Border Radius System CSS Variables',
        details: 'Standardized border radius values for consistent rounded corners.',
    },
    {
        name: 'shadows',
        filename: 'shadows.css',
        generate: generateShadows,
        description: 'Shadow System CSS Variables',
        details: 'Standardized shadow values for elevation and depth.\nFollows Material Design elevation principles.',
    },
    {
        name: 'zIndex',
        filename: 'zIndex.css',
        generate: generateZIndex,
        description: 'Z-Index System CSS Variables',
        details: 'Standardized z-index values for consistent stacking.',
    },
    {
        name: 'breakpoints',
        filename: 'breakpoints.css',
        generate: generateBreakpoints,
        description: 'Breakpoint System CSS Variables',
        details:
            'Standardized breakpoints for responsive design.\nNote: CSS variables cannot be used in media queries directly.\nThese are provided for JavaScript integration.',
    },
    {
        name: 'typography',
        filename: 'typography.css',
        generate: generateTypography,
        description: 'Typography System CSS Variables',
        details: 'Font sizes, weights, line heights, and composite typography scales.',
    },
];

// ============================================
// MAIN EXECUTION
// ============================================

// Parse CLI arguments
const args = process.argv.slice(2);
const requestedGenerators = args.length > 0 ? args : null;

// Filter generators based on CLI arguments
let generatorsToRun = generators;
if (requestedGenerators) {
    const validNames = generators.map((g) => g.name);
    const invalidArgs = requestedGenerators.filter((arg) => !validNames.includes(arg));

    if (invalidArgs.length > 0) {
        console.error(`❌ Invalid foundation name(s): ${invalidArgs.join(', ')}`);
        console.error(`\nAvailable options: ${validNames.join(', ')}`);
        console.error('\nUsage:');
        console.error('  pnpm run generate:foundation              # Generate all files');
        console.error('  pnpm run generate:foundation colors       # Generate only colors.css');
        console.error('  pnpm run generate:foundation spacing typography  # Generate multiple specific files');
        process.exit(1);
    }

    generatorsToRun = generators.filter((g) => requestedGenerators.includes(g.name));
    console.log(`🚀 Generating ${generatorsToRun.length} foundation CSS file(s) to dist/...\n`);
} else {
    console.log('🚀 Generating all foundation CSS files to dist/...\n');
}

let successCount = 0;
let failCount = 0;

for (const generator of generatorsToRun) {
    try {
        const cssContent = `/**
 * ${generator.description}
 * 
 * This file is auto-generated from the TypeScript ${generator.name} tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:foundation' to regenerate.
 * 
 * ${generator.details}
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generator.generate()}
`;

        const outputPath = resolve(outputDir, generator.filename);
        writeFileSync(outputPath, cssContent, 'utf-8');
        console.log(`✅ Generated ${generator.filename} successfully`);
        console.log(`   Output: ${outputPath}`);
        successCount++;
    } catch (error) {
        console.error(`❌ Failed to generate ${generator.filename}:`, error);
        failCount++;
    }
}

console.log(`\n✨ Generation complete: ${successCount} succeeded, ${failCount} failed`);

if (failCount > 0) {
    process.exit(1);
}
