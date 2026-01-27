#!/usr/bin/env node

/**
 * @file themable-validation.test.js
 * @description Regression tests for themable attribute validation rules
 * @usage node packages/design-system/tokens/__tests__/themable-validation.test.js
 *
 * Tests that all tokens follow the correct themable rules:
 * - Colors must be themable: true
 * - Shadows must be themable: true
 * - Dimensions must be themable: false
 * - Durations must be themable: false
 * - Numbers must be themable: false
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TOKENS_DIR = path.resolve(__dirname, '../src');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

// Test results
const results = {
  passed: 0,
  failed: 0,
  total: 0,
  failures: [],
};

/**
 * Recursively finds all JSON files
 */
function findJsonFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
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
 * Recursively walks tokens and collects all leaf tokens
 */
function collectTokens(obj, currentPath = '', filePath = '', tokens = []) {
  if (!obj || typeof obj !== 'object') return tokens;

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$') && key !== '$value') continue;

    const tokenPath = currentPath ? `${currentPath}.${key}` : key;

    if (value && typeof value === 'object') {
      if (value.$value !== undefined) {
        // This is a leaf token
        tokens.push({
          path: tokenPath,
          file: filePath,
          ...value,
        });
      } else {
        // Recurse
        collectTokens(value, tokenPath, filePath, tokens);
      }
    }
  }

  return tokens;
}

/**
 * Test: All color tokens must have themable: true
 */
function testColorTokensAreThemable(tokens) {
  console.log(`\n${colors.blue}Test: Color tokens must have themable: true${colors.reset}`);

  const colorTokens = tokens.filter((t) => t.$type === 'color');
  let failures = 0;

  for (const token of colorTokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable !== true) {
      failures++;
      results.failures.push({
        test: 'Color tokens themable',
        token: token.path,
        file: token.file,
        expected: 'themable: true',
        actual: `themable: ${themable}`,
      });
    }
  }

  results.total++;

  if (failures === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - ${colorTokens.length} color tokens validated`);
  } else {
    results.failed++;
    console.log(
      `${colors.red}✗ Failed${colors.reset} - ${failures}/${colorTokens.length} color tokens have incorrect themable value`
    );
  }

  return failures === 0;
}

/**
 * Test: All shadow tokens must have themable: true
 */
function testShadowTokensAreThemable(tokens) {
  console.log(`\n${colors.blue}Test: Shadow tokens must have themable: true${colors.reset}`);

  const shadowTokens = tokens.filter((t) => t.$type === 'shadow');
  let failures = 0;

  for (const token of shadowTokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable !== true) {
      failures++;
      results.failures.push({
        test: 'Shadow tokens themable',
        token: token.path,
        file: token.file,
        expected: 'themable: true',
        actual: `themable: ${themable}`,
      });
    }
  }

  results.total++;

  if (failures === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - ${shadowTokens.length} shadow tokens validated`);
  } else {
    results.failed++;
    console.log(
      `${colors.red}✗ Failed${colors.reset} - ${failures}/${shadowTokens.length} shadow tokens have incorrect themable value`
    );
  }

  return failures === 0;
}

/**
 * Test: All dimension tokens must have themable: false
 */
function testDimensionTokensAreNotThemable(tokens) {
  console.log(`\n${colors.blue}Test: Dimension tokens must have themable: false${colors.reset}`);

  const dimensionTokens = tokens.filter((t) => t.$type === 'dimension');
  let failures = 0;

  for (const token of dimensionTokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable !== false) {
      failures++;
      results.failures.push({
        test: 'Dimension tokens not themable',
        token: token.path,
        file: token.file,
        expected: 'themable: false',
        actual: `themable: ${themable}`,
      });
    }
  }

  results.total++;

  if (failures === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - ${dimensionTokens.length} dimension tokens validated`);
  } else {
    results.failed++;
    console.log(
      `${colors.red}✗ Failed${colors.reset} - ${failures}/${dimensionTokens.length} dimension tokens have incorrect themable value`
    );
  }

  return failures === 0;
}

/**
 * Test: All duration tokens must have themable: false
 */
function testDurationTokensAreNotThemable(tokens) {
  console.log(`\n${colors.blue}Test: Duration tokens must have themable: false${colors.reset}`);

  const durationTokens = tokens.filter((t) => t.$type === 'duration');
  let failures = 0;

  for (const token of durationTokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable !== false) {
      failures++;
      results.failures.push({
        test: 'Duration tokens not themable',
        token: token.path,
        file: token.file,
        expected: 'themable: false',
        actual: `themable: ${themable}`,
      });
    }
  }

  results.total++;

  if (failures === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - ${durationTokens.length} duration tokens validated`);
  } else {
    results.failed++;
    console.log(
      `${colors.red}✗ Failed${colors.reset} - ${failures}/${durationTokens.length} duration tokens have incorrect themable value`
    );
  }

  return failures === 0;
}

/**
 * Test: All number tokens must have themable: false
 */
function testNumberTokensAreNotThemable(tokens) {
  console.log(`\n${colors.blue}Test: Number tokens must have themable: false${colors.reset}`);

  const numberTokens = tokens.filter((t) => t.$type === 'number');
  let failures = 0;

  for (const token of numberTokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable !== false) {
      failures++;
      results.failures.push({
        test: 'Number tokens not themable',
        token: token.path,
        file: token.file,
        expected: 'themable: false',
        actual: `themable: ${themable}`,
      });
    }
  }

  results.total++;

  if (failures === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - ${numberTokens.length} number tokens validated`);
  } else {
    results.failed++;
    console.log(
      `${colors.red}✗ Failed${colors.reset} - ${failures}/${numberTokens.length} number tokens have incorrect themable value`
    );
  }

  return failures === 0;
}

/**
 * Test: All cubicBezier tokens must have themable: false
 */
function testCubicBezierTokensAreNotThemable(tokens) {
  console.log(`\n${colors.blue}Test: CubicBezier tokens must have themable: false${colors.reset}`);

  const cubicBezierTokens = tokens.filter((t) => t.$type === 'cubicBezier');
  let failures = 0;

  for (const token of cubicBezierTokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable !== false) {
      failures++;
      results.failures.push({
        test: 'CubicBezier tokens not themable',
        token: token.path,
        file: token.file,
        expected: 'themable: false',
        actual: `themable: ${themable}`,
      });
    }
  }

  results.total++;

  if (failures === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - ${cubicBezierTokens.length} cubicBezier tokens validated`);
  } else {
    results.failed++;
    console.log(
      `${colors.red}✗ Failed${colors.reset} - ${failures}/${cubicBezierTokens.length} cubicBezier tokens have incorrect themable value`
    );
  }

  return failures === 0;
}

/**
 * Test: No token should be missing themable attribute
 */
function testNoMissingThemableAttribute(tokens) {
  console.log(`\n${colors.blue}Test: All tokens must have themable attribute${colors.reset}`);

  let failures = 0;

  for (const token of tokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable === undefined) {
      failures++;
      results.failures.push({
        test: 'Missing themable attribute',
        token: token.path,
        file: token.file,
        expected: 'themable: true or false',
        actual: 'themable: undefined',
      });
    }
  }

  results.total++;

  if (failures === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - All ${tokens.length} tokens have themable attribute`);
  } else {
    results.failed++;
    console.log(
      `${colors.red}✗ Failed${colors.reset} - ${failures}/${tokens.length} tokens are missing themable attribute`
    );
  }

  return failures === 0;
}

/**
 * Test: Gradient tokens should be themable (warning only)
 */
function testGradientTokensAreThemable(tokens) {
  console.log(`\n${colors.blue}Test: Gradient tokens should have themable: true${colors.reset}`);

  const gradientTokens = tokens.filter((t) => t.$type === 'gradient');
  let warnings = 0;

  for (const token of gradientTokens) {
    const themable = token.$extensions?.lufa?.themable;

    if (themable !== true) {
      warnings++;
      console.log(`  ${colors.yellow}⚠${colors.reset} ${token.path} - Gradient typically should be themable: true`);
    }
  }

  results.total++;

  if (warnings === 0) {
    results.passed++;
    console.log(`${colors.green}✓ Passed${colors.reset} - ${gradientTokens.length} gradient tokens validated`);
  } else {
    // Don't fail the test, just warn
    results.passed++;
    console.log(
      `${colors.yellow}⚠ Warnings${colors.reset} - ${warnings}/${gradientTokens.length} gradient tokens might need review`
    );
  }

  return true; // Always pass (warnings only)
}

/**
 * Prints test summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(80));
  console.log(`${colors.blue}${colors.bold}🧪 Themable Validation Test Results${colors.reset}`);
  console.log('='.repeat(80) + '\n');

  console.log(`${colors.gray}Total Tests:${colors.reset} ${results.total}`);
  console.log(`${colors.green}✓ Passed:${colors.reset} ${results.passed}`);
  console.log(`${colors.red}✗ Failed:${colors.reset} ${results.failed}\n`);

  // Print failures
  if (results.failures.length > 0) {
    console.log(`${colors.red}${colors.bold}━━━ FAILURES (${results.failures.length}) ━━━${colors.reset}\n`);

    // Group by test
    const failuresByTest = results.failures.reduce((acc, failure) => {
      if (!acc[failure.test]) acc[failure.test] = [];
      acc[failure.test].push(failure);
      return acc;
    }, {});

    for (const [test, failures] of Object.entries(failuresByTest)) {
      console.log(`${colors.yellow}${test}${colors.reset}`);

      // Show first 5 failures per test
      for (const failure of failures.slice(0, 5)) {
        const relPath = path.relative(process.cwd(), failure.file);
        console.log(`  ${colors.red}✗${colors.reset} ${failure.token}`);
        console.log(`    ${colors.gray}File:${colors.reset} ${relPath}`);
        console.log(`    ${colors.gray}Expected:${colors.reset} ${failure.expected}`);
        console.log(`    ${colors.gray}Actual:${colors.reset} ${failure.actual}`);
      }

      if (failures.length > 5) {
        console.log(`  ${colors.gray}... and ${failures.length - 5} more${colors.reset}`);
      }

      console.log('');
    }
  }

  // Success or failure message
  if (results.failed === 0) {
    console.log(`${colors.green}${colors.bold}✓ All tests passed!${colors.reset}\n`);
  } else {
    console.log(`${colors.red}${colors.bold}✗ ${results.failed} test(s) failed${colors.reset}\n`);
  }

  console.log('='.repeat(80) + '\n');
}

/**
 * Main test runner
 */
function main() {
  console.log(`${colors.blue}${colors.bold}🧪 Themable Attribute Regression Tests${colors.reset}\n`);
  console.log(`${colors.gray}Tokens directory: ${TOKENS_DIR}${colors.reset}\n`);

  // Check if tokens directory exists
  if (!fs.existsSync(TOKENS_DIR)) {
    console.log(`${colors.red}✗ Tokens directory not found: ${TOKENS_DIR}${colors.reset}`);
    process.exit(1);
  }

  // Find all token files
  const files = findJsonFiles(TOKENS_DIR);

  if (files.length === 0) {
    console.log(`${colors.red}✗ No token files found in ${TOKENS_DIR}${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.gray}Found ${files.length} token file(s)${colors.reset}`);

  // Collect all tokens
  let allTokens = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const tokenData = JSON.parse(content);
      const tokens = collectTokens(tokenData, '', file);
      allTokens = allTokens.concat(tokens);
    } catch (error) {
      console.log(`${colors.red}✗ Failed to parse ${file}: ${error.message}${colors.reset}`);
      process.exit(1);
    }
  }

  console.log(`${colors.gray}Collected ${allTokens.length} tokens${colors.reset}`);

  // Run all tests
  testNoMissingThemableAttribute(allTokens);
  testColorTokensAreThemable(allTokens);
  testShadowTokensAreThemable(allTokens);
  testDimensionTokensAreNotThemable(allTokens);
  testDurationTokensAreNotThemable(allTokens);
  testNumberTokensAreNotThemable(allTokens);
  testCubicBezierTokensAreNotThemable(allTokens);
  testGradientTokensAreThemable(allTokens);

  // Print summary
  printSummary();

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
main();
