#!/usr/bin/env tsx
/**
 * Generate all CSS files from TypeScript tokens
 *
 * This script generates all CSS custom properties files from the design system tokens.
 * Run with: pnpm run generate:foundation
 */

import { execSync } from 'child_process';

const scripts = [
    'generate:colors',
    'generate:spacing',
    'generate:radius',
    'generate:shadows',
    'generate:zindex',
    'generate:breakpoints',
    'generate:typography',
];

console.log('🚀 Generating all foundation CSS files...\n');

let successCount = 0;
let failCount = 0;

for (const script of scripts) {
    try {
        execSync(`pnpm run ${script}`, { stdio: 'inherit' });
        successCount++;
    } catch (error) {
        console.error(`❌ Failed to run ${script}`);
        failCount++;
    }
}

console.log(`\n✨ Generation complete: ${successCount} succeeded, ${failCount} failed`);

if (failCount > 0) {
    process.exit(1);
}
