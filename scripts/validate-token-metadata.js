#!/usr/bin/env node

/**
 * @file validate-token-metadata.js
 * @description Validates Design Token metadata in Style Dictionary token files
 * @usage node scripts/validate-token-metadata.js
 *
 * This script validates that all Design Tokens have required metadata:
 * - $description: Human-readable description
 * - $type: DTCG token type (color, dimension, etc.)
 * - $extensions.lufa.themable: Whether token can be themed
 *
 * Part of Lufa Design System v2.0 - Phase 0 Action #2
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  tokensDir: path.resolve(__dirname, '../packages/design-system/tokens/src'),
  requiredMetadata: ['$description', '$type'],
  exemptTokens: ['$themes', '$metadata'], // Skip system tokens
};

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

// Validation results
const results = {
  totalTokens: 0,
  validTokens: 0,
  errors: [],
  warnings: [],
};

/**
 * Recursively finds all JSON files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} fileList - Accumulated file list
 * @returns {string[]} Array of file paths
 */
function findJsonFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules
      if (file !== 'node_modules') {
        findJsonFiles(filePath, fileList);
      }
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Validates a single token object
 * @param {object} token - Token object to validate
 * @param {string} tokenPath - Dot-notation path to token (e.g., "color.primary.500")
 * @param {string} filePath - File path containing the token
 * @returns {object} Validation result
 */
function validateToken(token, tokenPath, filePath) {
  const errors = [];
  const warnings = [];

  // Check if token has a $value (is a leaf token)
  if (!token.$value && token.$value !== 0) {
    // Not a leaf token, skip
    return { isValid: true, errors: [], warnings: [] };
  }

  results.totalTokens++;

  // Validate required metadata
  for (const field of CONFIG.requiredMetadata) {
    if (!token[field]) {
      errors.push({
        file: filePath,
        token: tokenPath,
        field,
        message: `Missing required field: ${field}`,
        severity: 'error',
      });
    }
  }

  // Validate $type is valid DTCG type
  if (token.$type) {
    const validTypes = [
      'color',
      'dimension',
      'fontFamily',
      'fontWeight',
      'duration',
      'cubicBezier',
      'number',
      'strokeStyle',
      'border',
      'transition',
      'shadow',
      'gradient',
      'typography',
    ];
    if (!validTypes.includes(token.$type)) {
      warnings.push({
        file: filePath,
        token: tokenPath,
        field: '$type',
        message: `Unknown $type: "${token.$type}". Valid types: ${validTypes.join(', ')}`,
        severity: 'warning',
      });
    }
  }

  // Validate $extensions.lufa.themable exists (required on ALL tokens)
  const hasThemable = token.$extensions?.lufa?.themable !== undefined;

  if (!hasThemable) {
    errors.push({
      file: filePath,
      token: tokenPath,
      field: '$extensions.lufa.themable',
      message: 'Missing required field: $extensions.lufa.themable (must be true or false)',
      severity: 'error',
    });
  }

  // Validate $description is meaningful (not just token name)
  if (token.$description && token.$description.length < 10) {
    warnings.push({
      file: filePath,
      token: tokenPath,
      field: '$description',
      message: `Description is too short (${token.$description.length} chars). Provide a meaningful description (min 10 chars).`,
      severity: 'warning',
    });
  }

  const isValid = errors.length === 0;
  if (isValid) results.validTokens++;

  return { isValid, errors, warnings };
}

/**
 * Recursively walks token object and validates each token
 * @param {object} obj - Token object or group
 * @param {string} currentPath - Current path in dot notation
 * @param {string} filePath - File path
 */
function walkTokens(obj, currentPath, filePath) {
  if (!obj || typeof obj !== 'object') return;

  // Skip exempt system tokens
  if (CONFIG.exemptTokens.includes(currentPath)) return;

  for (const [key, value] of Object.entries(obj)) {
    // Skip keys starting with $ except $value
    if (key.startsWith('$') && key !== '$value') continue;

    const tokenPath = currentPath ? `${currentPath}.${key}` : key;

    if (value && typeof value === 'object') {
      // Check if this is a leaf token (has $value)
      if (value.$value !== undefined) {
        const result = validateToken(value, tokenPath, filePath);
        results.errors.push(...result.errors);
        results.warnings.push(...result.warnings);
      } else {
        // Recurse into nested groups
        walkTokens(value, tokenPath, filePath);
      }
    }
  }
}

/**
 * Validates a single token file
 * @param {string} filePath - Path to token JSON file
 */
function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const tokens = JSON.parse(content);

    // Walk through all tokens in the file
    walkTokens(tokens, '', filePath);
  } catch (error) {
    results.errors.push({
      file: filePath,
      token: 'N/A',
      field: 'N/A',
      message: `Failed to parse file: ${error.message}`,
      severity: 'error',
    });
  }
}

/**
 * Prints validation results to console
 */
function printResults() {
  console.log('\n' + '='.repeat(80));
  console.log(`${colors.blue}${colors.bold}🔍 Token Metadata Validation Report${colors.reset}`);
  console.log('='.repeat(80) + '\n');

  // Summary
  console.log(`${colors.gray}Total Tokens Validated:${colors.reset} ${results.totalTokens}`);
  console.log(`${colors.green}✓ Valid Tokens:${colors.reset} ${results.validTokens}`);
  console.log(`${colors.red}✗ Tokens with Errors:${colors.reset} ${results.totalTokens - results.validTokens}`);
  console.log(`${colors.yellow}⚠ Warnings:${colors.reset} ${results.warnings.length}\n`);

  // Print errors
  if (results.errors.length > 0) {
    console.log(`${colors.red}${colors.bold}━━━ ERRORS (${results.errors.length}) ━━━${colors.reset}\n`);

    // Group errors by file
    const errorsByFile = results.errors.reduce((acc, err) => {
      if (!acc[err.file]) acc[err.file] = [];
      acc[err.file].push(err);
      return acc;
    }, {});

    for (const [file, errors] of Object.entries(errorsByFile)) {
      const relPath = path.relative(process.cwd(), file);
      console.log(`${colors.gray}${relPath}${colors.reset}`);

      for (const err of errors) {
        console.log(`  ${colors.red}✗${colors.reset} ${err.token}`);
        console.log(`    ${err.message}`);
      }
      console.log('');
    }
  }

  // Print warnings
  if (results.warnings.length > 0) {
    console.log(`${colors.yellow}${colors.bold}━━━ WARNINGS (${results.warnings.length}) ━━━${colors.reset}\n`);

    // Group warnings by file
    const warningsByFile = results.warnings.reduce((acc, warn) => {
      if (!acc[warn.file]) acc[warn.file] = [];
      acc[warn.file].push(warn);
      return acc;
    }, {});

    for (const [file, warnings] of Object.entries(warningsByFile)) {
      const relPath = path.relative(process.cwd(), file);
      console.log(`${colors.gray}${relPath}${colors.reset}`);

      for (const warn of warnings) {
        console.log(`  ${colors.yellow}⚠${colors.reset} ${warn.token}`);
        console.log(`    ${warn.message}`);
      }
      console.log('');
    }
  }

  // Success message
  if (results.errors.length === 0 && results.warnings.length === 0) {
    console.log(`${colors.green}${colors.bold}✓ All tokens have valid metadata!${colors.reset}\n`);
  }

  // Help message if errors found
  if (results.errors.length > 0) {
    console.log(`${colors.blue}💡 How to fix:${colors.reset}`);
    console.log(`   • Add ${colors.gray}$description${colors.reset}: Describe the token's purpose`);
    console.log(`   • Add ${colors.gray}$type${colors.reset}: Specify DTCG type (color, dimension, etc.)`);
    console.log(`   • Add ${colors.gray}$extensions.lufa.themable${colors.reset}: Set to true or false`);
    console.log(`   • See: ${colors.gray}docs/contributors/your-first-token.md${colors.reset} (coming soon)\n`);
  }

  console.log('='.repeat(80) + '\n');
}

/**
 * Main validation function
 */
function main() {
  console.log(`${colors.blue}Starting token metadata validation...${colors.reset}`);
  console.log(`${colors.gray}Tokens directory: ${CONFIG.tokensDir}${colors.reset}\n`);

  // Check if tokens directory exists
  if (!fs.existsSync(CONFIG.tokensDir)) {
    console.log(`${colors.yellow}⚠ Tokens directory not found: ${CONFIG.tokensDir}${colors.reset}`);
    console.log(`${colors.gray}This is expected if you haven't created the v2.0 tokens yet.${colors.reset}`);
    console.log(`${colors.gray}The validator is ready for when you create your first tokens!${colors.reset}\n`);
    process.exit(0);
  }

  // Find all token files
  const files = findJsonFiles(CONFIG.tokensDir);

  if (files.length === 0) {
    console.log(`${colors.yellow}⚠ No token files (.json) found in ${CONFIG.tokensDir}${colors.reset}`);
    console.log(
      `${colors.gray}This is expected if you haven't created tokens yet (v2.0 implementation).${colors.reset}`
    );
    console.log(`${colors.gray}The validator is ready for when you create your first tokens!${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`${colors.gray}Found ${files.length} token file(s)${colors.reset}\n`);

  // Validate each file
  for (const file of files) {
    const relPath = path.relative(process.cwd(), file);
    console.log(`${colors.gray}Validating: ${relPath}${colors.reset}`);
    validateFile(file);
  }

  // Print results
  printResults();

  // Exit with error code if there are errors
  if (results.errors.length > 0) {
    console.log(`${colors.red}Validation failed with ${results.errors.length} error(s).${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`${colors.green}Validation passed successfully!${colors.reset}`);
    process.exit(0);
  }
}

// Run validation
main();
