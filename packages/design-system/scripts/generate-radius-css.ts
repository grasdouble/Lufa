#!/usr/bin/env tsx
/**
 * Generate radius.css from TypeScript radius tokens
 *
 * This script generates the CSS custom properties file from the design system radius tokens.
 * Run with: pnpm run generate:radius
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { radius } from '../src/foundation/radius.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/radius.css');

function generateRadiusCSS(): string {
    const entries = Object.entries(radius);
    const variables = entries
        .map(([key, value]) => {
            // Calculate pixel value for comment
            const remMatch = value.match(/^([\d.]+)rem$/);
            const pxValue = remMatch ? `${parseFloat(remMatch[1]) * 16}px` : value;
            const comment =
                pxValue !== value && value !== '9999px' ? ` /* ${pxValue} */` : value === '9999px' ? ' /* Fully rounded */' : '';
            return `    --radius-${key}: ${value};${comment}`;
        })
        .join('\n');

    return `:root {
    /* Border Radius Scale */
${variables}
}`;
}

const cssContent = `/**
 * Border Radius System CSS Variables
 * 
 * This file is auto-generated from the TypeScript radius tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:radius' to regenerate.
 * 
 * Standardized border radius values for consistent rounded corners.
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generateRadiusCSS()}
`;

try {
    writeFileSync(outputPath, cssContent, 'utf-8');
    console.log('✅ Generated radius.css successfully');
    console.log(`   Output: ${outputPath}`);
} catch (error) {
    console.error('❌ Failed to generate radius.css:', error);
    process.exit(1);
}
