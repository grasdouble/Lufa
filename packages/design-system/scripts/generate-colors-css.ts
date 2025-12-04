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
import { generateCSSVariables } from '../src/foundation/colors-utilities/cssVariables.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '../src/foundation/colors.css');

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
