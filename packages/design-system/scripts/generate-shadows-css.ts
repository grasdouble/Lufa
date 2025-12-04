#!/usr/bin/env tsx
/**
 * Generate shadows.css from TypeScript shadow tokens
 *
 * This script generates the CSS custom properties file from the design system shadow tokens.
 * Run with: pnpm run generate:shadows
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { shadows } from '../src/foundation/shadows.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/shadows.css');

function generateShadowsCSS(): string {
    const entries = Object.entries(shadows);
    const variables = entries
        .map(([key, value]) => {
            return `    --shadow-${key}: ${value};`;
        })
        .join('\n');

    return `:root {
    /* Shadow Scale */
${variables}
}`;
}

const cssContent = `/**
 * Shadow System CSS Variables
 * 
 * This file is auto-generated from the TypeScript shadow tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:shadows' to regenerate.
 * 
 * Standardized shadow values for elevation and depth.
 * Follows Material Design elevation principles.
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generateShadowsCSS()}
`;

try {
    writeFileSync(outputPath, cssContent, 'utf-8');
    console.log('✅ Generated shadows.css successfully');
    console.log(`   Output: ${outputPath}`);
} catch (error) {
    console.error('❌ Failed to generate shadows.css:', error);
    process.exit(1);
}
