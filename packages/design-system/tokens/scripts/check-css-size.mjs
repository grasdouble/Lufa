#!/usr/bin/env node
/**
 * CSS File Size Monitor
 *
 * Checks the compiled CSS file size and alerts if it exceeds thresholds.
 *
 * Thresholds:
 * - WARNING: 120 KB (notification only)
 * - ERROR: 150 KB (build fails)
 *
 * Rationale for 150 KB limit:
 * - Aligned with industry standards (Material Design: 120KB, Carbon: 180KB)
 * - Allows ~1000 tokens (~400 additional tokens from current 608)
 * - Excellent network performance: ~28 KB gzipped
 * - Stays within CSS page budget (< 200 KB total)
 * - Enables dark mode + 3-5 new components
 *
 * Usage:
 *   node scripts/check-css-size.mjs
 *
 * Exit Codes:
 *   0 - Success (size within limits)
 *   1 - Error (size exceeds maximum)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Thresholds (in KB)
const MAX_SIZE_KB = 150; // Hard limit - build fails
const WARNING_SIZE_KB = 120; // Warning - notification only
const BASELINE_SIZE_KB = 78; // Current size after refactoring

// File to check
const cssPath = path.join(__dirname, '../dist/tokens.css');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
};

function formatSize(bytes) {
  return (bytes / 1024).toFixed(2);
}

function getPercentChange(current, baseline) {
  return (((current - baseline) / baseline) * 100).toFixed(1);
}

// Main function
function checkCSSSize() {
  console.log('\n📊 CSS File Size Check\n');
  console.log('━'.repeat(50));

  // Check if file exists
  if (!fs.existsSync(cssPath)) {
    console.error(`${colors.red}❌ Error: CSS file not found at ${cssPath}${colors.reset}`);
    console.error('   Run "pnpm build" first to generate CSS file.\n');
    process.exit(1);
  }

  // Get file stats
  const stats = fs.statSync(cssPath);
  const sizeBytes = stats.size;
  const sizeKB = sizeBytes / 1024;

  // Calculate metrics
  const percentOfMax = ((sizeKB / MAX_SIZE_KB) * 100).toFixed(1);
  const remainingKB = MAX_SIZE_KB - sizeKB;
  const changeFromBaseline = getPercentChange(sizeKB, BASELINE_SIZE_KB);
  const changeDirection = sizeKB > BASELINE_SIZE_KB ? '↑' : '↓';

  // Display results
  console.log(`📁 File: ${path.relative(process.cwd(), cssPath)}`);
  console.log(`📏 Size: ${formatSize(sizeBytes)} KB`);
  console.log(`📊 Change from baseline: ${changeDirection} ${Math.abs(changeFromBaseline)}%`);
  console.log(`📈 Threshold usage: ${percentOfMax}% of ${MAX_SIZE_KB} KB`);
  console.log('━'.repeat(50));

  // Check thresholds and exit accordingly
  if (sizeKB > MAX_SIZE_KB) {
    console.error(`\n${colors.red}❌ FAILED: CSS file size exceeds maximum!${colors.reset}`);
    console.error(`   Current: ${formatSize(sizeBytes)} KB`);
    console.error(`   Maximum: ${MAX_SIZE_KB} KB`);
    console.error(`   Over by: ${(sizeKB - MAX_SIZE_KB).toFixed(2)} KB\n`);
    console.error('Action required:');
    console.error('  1. Review added tokens for redundancy');
    console.error('  2. Consider removing unused tokens');
    console.error('  3. Implement token tree-shaking');
    console.error('  4. Update threshold if increase is justified\n');
    process.exit(1);
  } else if (sizeKB > WARNING_SIZE_KB) {
    console.warn(`\n${colors.yellow}⚠️  WARNING: CSS file size approaching maximum${colors.reset}`);
    console.warn(`   Current: ${formatSize(sizeBytes)} KB`);
    console.warn(`   Warning: ${WARNING_SIZE_KB} KB`);
    console.warn(`   Maximum: ${MAX_SIZE_KB} KB`);
    console.warn(`   Remaining: ${remainingKB.toFixed(2)} KB (${((remainingKB / MAX_SIZE_KB) * 100).toFixed(1)}%)\n`);
    console.warn('Recommendation: Monitor token additions closely.\n');
    process.exit(0); // Warning, not error
  } else {
    console.log(`\n${colors.green}✅ PASSED: CSS file size within limits${colors.reset}`);
    console.log(`   Current: ${formatSize(sizeBytes)} KB`);
    console.log(`   Warning: ${WARNING_SIZE_KB} KB`);
    console.log(`   Maximum: ${MAX_SIZE_KB} KB`);
    console.log(`   Remaining: ${remainingKB.toFixed(2)} KB (${((remainingKB / MAX_SIZE_KB) * 100).toFixed(1)}%)\n`);

    // Show trend
    if (sizeKB > BASELINE_SIZE_KB) {
      console.log(`${colors.blue}ℹ️  Size increased by ${changeFromBaseline}% from baseline${colors.reset}\n`);
    } else if (sizeKB < BASELINE_SIZE_KB) {
      console.log(
        `${colors.green}ℹ️  Size decreased by ${Math.abs(changeFromBaseline)}% from baseline${colors.reset}\n`
      );
    }

    process.exit(0);
  }
}

// Run check
try {
  checkCSSSize();
} catch (error) {
  console.error(`${colors.red}❌ Error running size check:${colors.reset}`);
  console.error(error.message);
  console.error(error.stack);
  process.exit(1);
}
