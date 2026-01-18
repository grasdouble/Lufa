#!/usr/bin/env node

/**
 * Post-build script to create foundation.css
 * This file combines the foundation reset with the main style.css
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const srcDir = resolve(__dirname, '../src');
const distDir = resolve(__dirname, '../dist');

// Read the source files
const foundationReset = readFileSync(resolve(srcDir, 'css/foundation.css'), 'utf-8');
const styleCSS = readFileSync(resolve(distDir, 'style.css'), 'utf-8');

// Create the combined foundation.css
const foundationCSS = `/**
 * Lufa Design System - Foundation Entry Point (With Global Reset)
 * 
 * This file includes the global foundation reset + tokens + utilities.
 * Use this when building a standalone application that needs a clean slate.
 * 
 * For documentation sites or apps with their own styling system,
 * use \`style.css\` instead (tokens + utilities only, no reset).
 * 
 * Import Strategy:
 * \`\`\`css
 * // Standalone app (includes reset)
 * @import '@grasdouble/lufa_design-system/foundation.css';
 * @import '@grasdouble/lufa_design-system-themes/default.css';
 * 
 * // Documentation site or app with existing styles (no reset)
 * @import '@grasdouble/lufa_design-system/style.css';
 * @import '@grasdouble/lufa_design-system-themes/default.css';
 * \`\`\`
 */

/* ============================================================================
   FOUNDATION RESET
   ============================================================================ */

${foundationReset}

/* ============================================================================
   TOKENS + UTILITIES
   ============================================================================ */

${styleCSS}
`;

// Write the combined file
writeFileSync(resolve(distDir, 'foundation.css'), foundationCSS, 'utf-8');

console.log('✓ Generated foundation.css');
