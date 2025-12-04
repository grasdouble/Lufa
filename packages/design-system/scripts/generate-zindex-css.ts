#!/usr/bin/env tsx
/**
 * Generate zIndex.css from TypeScript zIndex tokens
 *
 * This script generates the CSS custom properties file from the design system zIndex tokens.
 * Run with: pnpm run generate:zindex
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { zIndex } from '../src/foundation/zIndex.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/zIndex.css');

function generateZIndexCSS(): string {
    const entries = Object.entries(zIndex);
    const variables = entries
        .map(([key, value]) => {
            return `    --z-index-${key}: ${value};`;
        })
        .join('\n');

    return `:root {
    /* Z-Index Scale */
${variables}
}`;
}

const cssContent = `/**
 * Z-Index System CSS Variables
 * 
 * This file is auto-generated from the TypeScript zIndex tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:zindex' to regenerate.
 * 
 * Standardized z-index values for consistent stacking.
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generateZIndexCSS()}
`;

try {
    writeFileSync(outputPath, cssContent, 'utf-8');
    console.log('✅ Generated zIndex.css successfully');
    console.log(`   Output: ${outputPath}`);
} catch (error) {
    console.error('❌ Failed to generate zIndex.css:', error);
    process.exit(1);
}
