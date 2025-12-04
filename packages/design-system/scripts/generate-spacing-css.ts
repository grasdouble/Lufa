#!/usr/bin/env tsx
/**
 * Generate spacing.css from TypeScript spacing tokens
 *
 * This script generates the CSS custom properties file from the design system spacing tokens.
 * Run with: pnpm run generate:spacing
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spacing } from '../src/foundation/spacing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/spacing.css');

function generateSpacingCSS(): string {
    const entries = Object.entries(spacing);
    const variables = entries
        .map(([key, value]) => {
            // Calculate pixel value for comment
            const remMatch = value.match(/^([\d.]+)rem$/);
            const pxValue = remMatch ? `${parseFloat(remMatch[1]) * 16}px` : value;
            const comment = pxValue !== value ? ` /* ${pxValue} */` : '';
            return `    --spacing-${key}: ${value};${comment}`;
        })
        .join('\n');

    return `:root {
    /* Spacing Scale */
${variables}
}`;
}

const cssContent = `/**
 * Spacing System CSS Variables
 * 
 * This file is auto-generated from the TypeScript spacing tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:spacing' to regenerate.
 * 
 * Standardized spacing values for consistent layouts.
 * Based on an 8px grid system for optimal visual rhythm.
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generateSpacingCSS()}
`;

try {
    writeFileSync(outputPath, cssContent, 'utf-8');
    console.log('✅ Generated spacing.css successfully');
    console.log(`   Output: ${outputPath}`);
} catch (error) {
    console.error('❌ Failed to generate spacing.css:', error);
    process.exit(1);
}
