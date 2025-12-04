#!/usr/bin/env tsx
/**
 * Generate breakpoints.css from TypeScript breakpoint tokens
 *
 * This script generates the CSS custom properties file from the design system breakpoint tokens.
 * Run with: pnpm run generate:breakpoints
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { breakpoints } from '../src/foundation/breakpoints.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/breakpoints.css');

function generateBreakpointsCSS(): string {
    const entries = Object.entries(breakpoints);
    const variables = entries
        .map(([key, value]) => {
            return `    --breakpoint-${key}: ${value};`;
        })
        .join('\n');

    return `:root {
    /* Breakpoint Scale */
${variables}
}`;
}

const cssContent = `/**
 * Breakpoint System CSS Variables
 * 
 * This file is auto-generated from the TypeScript breakpoint tokens.
 * DO NOT EDIT MANUALLY - Run 'pnpm run generate:breakpoints' to regenerate.
 * 
 * Standardized breakpoints for responsive design.
 * Note: CSS variables cannot be used in media queries directly.
 * These are provided for JavaScript integration.
 * 
 * Generated on: ${new Date().toISOString()}
 */

${generateBreakpointsCSS()}
`;

try {
    writeFileSync(outputPath, cssContent, 'utf-8');
    console.log('✅ Generated breakpoints.css successfully');
    console.log(`   Output: ${outputPath}`);
} catch (error) {
    console.error('❌ Failed to generate breakpoints.css:', error);
    process.exit(1);
}
