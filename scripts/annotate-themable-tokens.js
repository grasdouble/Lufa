#!/usr/bin/env node

/**
 * Annotate Themable Tokens
 *
 * Automatically adds `$extensions.lufa.themable: true` to tokens that are themable by nature:
 * - All color tokens ($type: "color")
 * - All shadow tokens ($type: "shadow")
 * - All gradient tokens ($type: "gradient")
 * - All border tokens ($type: "border")
 *
 * This script is part of the token validation fix for ADR-010 implementation.
 *
 * Usage:
 *   node scripts/annotate-themable-tokens.js [--dry-run]
 *
 * Options:
 *   --dry-run  Show what would be changed without modifying files
 */

const fs = require('fs');
const path = require('path');

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

// Configuration
const CONFIG = {
  tokensDir: path.join(__dirname, '../packages/design-system/tokens/src'),
  themableTypes: [
    'color', // All colors are themable
    'shadow', // Shadows contain color components
    'gradient', // Gradients contain colors
    'border', // Borders contain colors
  ],
  dryRun: process.argv.includes('--dry-run'),
};

// Statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  tokensAnnotated: 0,
  tokensSkipped: 0, // Already have themable field
};

/**
 * Recursively finds all .json files in a directory
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of file paths
 */
function findJsonFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Checks if a token is themable based on its type
 * @param {object} token - Token object
 * @returns {boolean} True if token type is themable
 */
function isThemableType(token) {
  return token.$type && CONFIG.themableTypes.includes(token.$type);
}

/**
 * Adds themable: true to a token's extensions
 * @param {object} token - Token object to modify
 * @param {string} tokenPath - Dot-notation path to token
 * @returns {boolean} True if token was modified
 */
function addThemableField(token, tokenPath) {
  // Check if token already has themable field
  if (token.$extensions?.lufa?.themable !== undefined) {
    stats.tokensSkipped++;
    return false;
  }

  // Ensure $extensions.lufa exists
  if (!token.$extensions) {
    token.$extensions = {};
  }
  if (!token.$extensions.lufa) {
    token.$extensions.lufa = {};
  }

  // Add themable: true
  token.$extensions.lufa.themable = true;
  stats.tokensAnnotated++;

  if (!CONFIG.dryRun) {
    console.log(`${colors.green}  ✓ ${colors.reset}${tokenPath} ${colors.gray}(${token.$type})${colors.reset}`);
  } else {
    console.log(
      `${colors.yellow}  • ${colors.reset}${tokenPath} ${colors.gray}(${token.$type}) [DRY RUN]${colors.reset}`
    );
  }

  return true;
}

/**
 * Recursively walks token object and annotates themable tokens
 * @param {object} obj - Token object or group
 * @param {string} currentPath - Current path in dot notation
 * @returns {boolean} True if any token in this branch was modified
 */
function walkTokens(obj, currentPath = '') {
  if (!obj || typeof obj !== 'object') return false;

  let modified = false;

  for (const [key, value] of Object.entries(obj)) {
    // Skip keys starting with $ except for top-level token properties
    if (key.startsWith('$')) continue;

    const tokenPath = currentPath ? `${currentPath}.${key}` : key;

    // Check if this is a leaf token (has $value)
    if (value.$value !== undefined) {
      // Check if token is themable
      if (isThemableType(value)) {
        if (addThemableField(value, tokenPath)) {
          modified = true;
        }
      }
    }

    // Recurse into nested objects
    if (typeof value === 'object' && value !== null && !value.$value) {
      if (walkTokens(value, tokenPath)) {
        modified = true;
      }
    }
  }

  return modified;
}

/**
 * Processes a single token file
 * @param {string} filePath - Path to token file
 */
function processFile(filePath) {
  stats.filesProcessed++;

  try {
    // Read and parse JSON
    const content = fs.readFileSync(filePath, 'utf8');
    const tokens = JSON.parse(content);

    // Walk tokens and annotate themable ones
    const modified = walkTokens(tokens);

    if (modified) {
      stats.filesModified++;

      // Write back to file (unless dry-run)
      if (!CONFIG.dryRun) {
        const jsonString = JSON.stringify(tokens, null, 2) + '\n';
        fs.writeFileSync(filePath, jsonString, 'utf8');
      }
    }
  } catch (error) {
    console.error(`${colors.red}✗ Error processing ${filePath}:${colors.reset}`, error.message);
  }
}

/**
 * Main execution
 */
function main() {
  console.log(`${colors.blue}${colors.bold}🎨 Annotating Themable Tokens${colors.reset}\n`);
  console.log(`${colors.gray}Tokens directory: ${CONFIG.tokensDir}${colors.reset}`);
  console.log(`${colors.gray}Mode: ${CONFIG.dryRun ? 'DRY RUN (no changes)' : 'WRITE'}${colors.reset}\n`);

  // Check if tokens directory exists
  if (!fs.existsSync(CONFIG.tokensDir)) {
    console.error(`${colors.red}✗ Tokens directory not found: ${CONFIG.tokensDir}${colors.reset}`);
    process.exit(1);
  }

  // Find all token files
  const files = findJsonFiles(CONFIG.tokensDir);

  if (files.length === 0) {
    console.error(`${colors.yellow}⚠ No token files (.json) found in ${CONFIG.tokensDir}${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.gray}Found ${files.length} token file(s)${colors.reset}\n`);

  // Process each file
  files.forEach((file) => {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`${colors.gray}Processing: ${relativePath}${colors.reset}`);
    processFile(file);
  });

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log(`${colors.blue}${colors.bold}📊 Annotation Summary${colors.reset}`);
  console.log('='.repeat(80) + '\n');
  console.log(`${colors.gray}Files Processed:${colors.reset} ${stats.filesProcessed}`);
  console.log(
    `${colors.green}Files Modified:${colors.reset} ${stats.filesModified} ${CONFIG.dryRun ? '(dry-run)' : ''}`
  );
  console.log(`${colors.green}Tokens Annotated:${colors.reset} ${stats.tokensAnnotated}`);
  console.log(
    `${colors.gray}Tokens Skipped:${colors.reset} ${stats.tokensSkipped} ${colors.gray}(already have themable field)${colors.reset}`
  );

  if (CONFIG.dryRun) {
    console.log(`\n${colors.yellow}${colors.bold}ℹ DRY RUN MODE${colors.reset} - No files were modified`);
    console.log(`${colors.gray}Run without --dry-run to apply changes${colors.reset}`);
  } else {
    console.log(
      `\n${colors.green}${colors.bold}✓ Annotation Complete${colors.reset} - ${stats.tokensAnnotated} tokens updated`
    );
    console.log(`${colors.gray}Run validation to verify: node scripts/validate-token-metadata.js${colors.reset}`);
  }
}

// Run main function
main();
