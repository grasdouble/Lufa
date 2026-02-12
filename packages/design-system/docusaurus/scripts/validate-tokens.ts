#!/usr/bin/env tsx

/* eslint-disable no-console */

/**
 * Lufa Design System - Token Validation Script
 *
 * This script scans CSS files for hardcoded rgba/hex values and reports violations.
 * It ensures all themes follow the token-based approach with no hardcoded colors.
 *
 * Usage:
 *   pnpm validate:tokens
 *   pnpm validate:tokens --strict (no exceptions)
 *   pnpm validate:tokens --test (run self-tests)
 *
 * Exit Codes:
 *   0 - No violations found
 *   1 - Violations found
 *   2 - Script error
 */
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';

// ==================== CONFIGURATION ====================

type Config = {
  scanDirectory: string;
  scanPattern: string;
  exceptions: string[];
  allowGradients: boolean;
  allowedFiles?: string[]; // Files to skip validation
};

const DEFAULT_CONFIG: Config = {
  scanDirectory: join(__dirname, '..', 'src', 'css'),
  scanPattern: '-docusaurus.css',
  exceptions: ['linear-gradient', 'radial-gradient'],
  allowGradients: true,
};

type UserConfig = Partial<Config>;

/**
 * Load configuration from validate-tokens.json if it exists
 */
function loadConfig(): Config {
  const configPath = join(__dirname, 'validate-tokens.json');

  if (existsSync(configPath)) {
    try {
      const content = readFileSync(configPath, 'utf-8');
      const userConfig = JSON.parse(content) as UserConfig;
      console.log('📝 Loaded config from validate-tokens.json\n');

      return {
        ...DEFAULT_CONFIG,
        ...userConfig,
        // Resolve scanDirectory relative to config file location
        scanDirectory: userConfig.scanDirectory
          ? join(__dirname, '..', userConfig.scanDirectory)
          : DEFAULT_CONFIG.scanDirectory,
      };
    } catch (_error) {
      console.warn('⚠️  Warning: Could not parse validate-tokens.json, using defaults\n');
      return DEFAULT_CONFIG;
    }
  }

  return DEFAULT_CONFIG;
}

// ==================== TYPES ====================

type Violation = {
  file: string;
  line: number;
  column: number;
  value: string;
  type: 'rgba' | 'rgb' | 'hsla' | 'hsl' | 'hex';
  context: string; // The full line for context
};

type ScanFileResult = {
  violations: Violation[];
  lineCount: number;
};

type ScanResult = {
  violations: Violation[];
  filesScanned: number;
  totalLines: number;
};

// ==================== REGEX PATTERNS ====================

// Detect rgba() with hardcoded numeric values
const RGBA_PATTERN = /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g;

// Detect rgb() with hardcoded numeric values (without alpha)
const RGB_PATTERN = /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g;

// Detect hsla() with hardcoded numeric values
const HSLA_PATTERN = /hsla\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*[\d.]+\s*\)/g;

// Detect hsl() with hardcoded numeric values
const HSL_PATTERN = /hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)/g;

// Detect hex colors: #RGB or #RRGGBB (exact match, not 4 or 5 chars)
const HEX_PATTERN = /#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g;

// ==================== MAIN VALIDATION LOGIC ====================

/**
 * Scan a single CSS file for hardcoded color values
 */
function scanFile(filePath: string, config: Config): ScanFileResult {
  const violations: Violation[] = [];
  let content: string;

  try {
    content = readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(
      `⚠️  Warning: Could not read file ${filePath}:`,
      error instanceof Error ? error.message : 'Unknown error'
    );
    return { violations, lineCount: 0 }; // Return empty result, continue with other files
  }

  const lines = content.split('\n');
  const relativeFilePath = relative(process.cwd(), filePath);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Check for exceptions (like gradients)
    if (config.allowGradients) {
      const hasException = config.exceptions.some((exception) => line.includes(exception));
      if (hasException) {
        return; // Skip this line
      }
    }

    // Skip lines that are comments
    if (line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return;
    }

    // Detect rgba violations
    const rgbaMatches = line.matchAll(RGBA_PATTERN);
    for (const match of rgbaMatches) {
      // Skip if it contains CSS variables
      if (match[0].includes('var(')) {
        continue;
      }

      violations.push({
        file: relativeFilePath,
        line: lineNumber,
        column: (match.index || 0) + 1,
        value: match[0],
        type: 'rgba',
        context: line.trim(),
      });
    }

    // Detect rgb violations
    const rgbMatches = line.matchAll(RGB_PATTERN);
    for (const match of rgbMatches) {
      // Skip if it contains CSS variables
      if (match[0].includes('var(')) {
        continue;
      }

      violations.push({
        file: relativeFilePath,
        line: lineNumber,
        column: (match.index || 0) + 1,
        value: match[0],
        type: 'rgb',
        context: line.trim(),
      });
    }

    // Detect hsla violations
    const hslaMatches = line.matchAll(HSLA_PATTERN);
    for (const match of hslaMatches) {
      // Skip if it contains CSS variables
      if (match[0].includes('var(')) {
        continue;
      }

      violations.push({
        file: relativeFilePath,
        line: lineNumber,
        column: (match.index || 0) + 1,
        value: match[0],
        type: 'hsla',
        context: line.trim(),
      });
    }

    // Detect hsl violations
    const hslMatches = line.matchAll(HSL_PATTERN);
    for (const match of hslMatches) {
      // Skip if it contains CSS variables
      if (match[0].includes('var(')) {
        continue;
      }

      violations.push({
        file: relativeFilePath,
        line: lineNumber,
        column: (match.index || 0) + 1,
        value: match[0],
        type: 'hsl',
        context: line.trim(),
      });
    }

    // Detect hex violations
    const hexMatches = line.matchAll(HEX_PATTERN);
    for (const match of hexMatches) {
      // Ensure it's not inside a var() function
      const beforeMatch = line.substring(0, match.index || 0);
      if (beforeMatch.includes('var(')) {
        continue;
      }

      violations.push({
        file: relativeFilePath,
        line: lineNumber,
        column: (match.index || 0) + 1,
        value: match[0],
        type: 'hex',
        context: line.trim(),
      });
    }
  });

  return { violations, lineCount: lines.length };
}

/**
 * Scan all CSS files in the directory
 */
function scanDirectory(config: Config): ScanResult {
  const violations: Violation[] = [];
  let filesScanned = 0;
  let totalLines = 0;

  try {
    const files = readdirSync(config.scanDirectory);

    for (const file of files) {
      // Only scan files matching the pattern
      if (!file.includes(config.scanPattern) || !file.endsWith('.css')) {
        continue;
      }

      // Skip allowed files if specified
      if (config.allowedFiles?.includes(file)) {
        console.log(`⏭️  Skipping allowed file: ${file}`);
        continue;
      }

      const filePath = join(config.scanDirectory, file);
      filesScanned++;

      // Scan for violations (returns violations and line count in one pass)
      const result = scanFile(filePath, config);
      violations.push(...result.violations);
      totalLines += result.lineCount;
    }
  } catch (error) {
    console.error('❌ Error scanning directory:', error);
    process.exit(2);
  }

  return {
    violations,
    filesScanned,
    totalLines,
  };
}

// ==================== REPORTING ====================

/**
 * Print results in a user-friendly format
 */
function reportResults(result: ScanResult): void {
  if (result.violations.length === 0) {
    console.log('✅ Token Validation Passed\n');
    console.log(`Scanned Files: ${result.filesScanned}`);
    console.log(`Total Lines: ${result.totalLines.toLocaleString()}`);
    console.log(`Violations Found: 0\n`);
    console.log('All files are using design tokens correctly! 🎉');
    return;
  }

  console.log('❌ Token Validation Failed\n');
  console.log(`Violations Found: ${result.violations.length}\n`);

  // Group violations by file
  const violationsByFile = result.violations.reduce(
    (acc, violation) => {
      if (!acc[violation.file]) {
        acc[violation.file] = [];
      }
      acc[violation.file].push(violation);
      return acc;
    },
    {} as Record<string, Violation[]>
  );

  // Print violations grouped by file
  for (const [file, violations] of Object.entries(violationsByFile)) {
    console.log(`📄 ${file}`);
    violations.forEach((v) => {
      console.log(`  Line ${v.line}:${v.column}  ${v.context}`);
      console.log(`           ^ Use a design token instead of hardcoded ${v.type}: ${v.value}`);
      console.log('');
    });
  }

  console.log(`Total Violations: ${result.violations.length}`);
  console.log(`Files with Issues: ${Object.keys(violationsByFile).length}`);
  console.log(`Files Scanned: ${result.filesScanned}`);
  console.log('\nExit Code: 1');
}

// ==================== SELF-TESTS ====================

/**
 * Run self-tests to validate the script works correctly
 */
function runSelfTests(): boolean {
  console.log('🧪 Running self-tests...\n');

  const tests = [
    {
      name: 'Detect rgba with hardcoded values',
      input: 'background: rgba(184, 115, 51, 0.05);',
      shouldFindViolation: true,
      expectedType: 'rgba',
    },
    {
      name: 'Detect rgb with hardcoded values',
      input: 'color: rgb(255, 0, 0);',
      shouldFindViolation: true,
      expectedType: 'rgb',
    },
    {
      name: 'Detect hsla with hardcoded values',
      input: 'background: hsla(120, 100%, 50%, 0.5);',
      shouldFindViolation: true,
      expectedType: 'hsla',
    },
    {
      name: 'Detect hsl with hardcoded values',
      input: 'color: hsl(240, 100%, 50%);',
      shouldFindViolation: true,
      expectedType: 'hsl',
    },
    {
      name: 'Detect hex colors #RRGGBB',
      input: 'border-color: #B87333;',
      shouldFindViolation: true,
      expectedType: 'hex',
    },
    {
      name: 'Detect short hex #RGB',
      input: 'color: #F00;',
      shouldFindViolation: true,
      expectedType: 'hex',
    },
    {
      name: 'Reject invalid 4-char hex #ABCD',
      input: 'color: #ABCD;',
      shouldFindViolation: false, // Should NOT match 4-char hex
    },
    {
      name: 'Allow var() references',
      input: 'background: var(--lufa-core-brand-primary);',
      shouldFindViolation: false,
    },
    {
      name: 'Allow rgba with CSS variables inside',
      input: 'background: rgba(var(--r), var(--g), var(--b), 0.5);',
      shouldFindViolation: false, // Should be allowed
    },
    {
      name: 'Allow rgba in gradients',
      input: 'background: linear-gradient(135deg, #B87333 0%, #8B5A2B 100%);',
      shouldFindViolation: false, // With allowGradients: true
    },
    {
      name: 'Detect uppercase hex',
      input: 'color: #FF00FF;',
      shouldFindViolation: true,
      expectedType: 'hex',
    },
    {
      name: 'Detect lowercase hex',
      input: 'color: #ff00ff;',
      shouldFindViolation: true,
      expectedType: 'hex',
    },
    {
      name: 'Allow steampunk token-based CSS (real example)',
      input: 'box-shadow: var(--lufa-shadow-md), inset 0 1px 0 var(--lufa-overlay-light-strong);',
      shouldFindViolation: false,
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    // Create a temporary test file content
    const testFilePath = 'virtual:test.css';
    const tmpFs = {
      content: `.test { ${test.input} }`,
    };

    // Manually parse for testing
    const violations: Violation[] = [];
    const line = tmpFs.content;

    // Check for gradients
    const hasGradient = DEFAULT_CONFIG.exceptions.some((ex) => line.includes(ex));
    if (!hasGradient || !DEFAULT_CONFIG.allowGradients) {
      // Check rgba
      const rgbaMatches = [...line.matchAll(RGBA_PATTERN)];
      violations.push(
        ...rgbaMatches
          .filter((m) => !m[0].includes('var('))
          .map((m) => ({
            file: testFilePath,
            line: 1,
            column: (m.index || 0) + 1,
            value: m[0],
            type: 'rgba' as const,
            context: line,
          }))
      );

      // Check rgb
      const rgbMatches = [...line.matchAll(RGB_PATTERN)];
      violations.push(
        ...rgbMatches
          .filter((m) => !m[0].includes('var('))
          .map((m) => ({
            file: testFilePath,
            line: 1,
            column: (m.index || 0) + 1,
            value: m[0],
            type: 'rgb' as const,
            context: line,
          }))
      );

      // Check hsla
      const hslaMatches = [...line.matchAll(HSLA_PATTERN)];
      violations.push(
        ...hslaMatches
          .filter((m) => !m[0].includes('var('))
          .map((m) => ({
            file: testFilePath,
            line: 1,
            column: (m.index || 0) + 1,
            value: m[0],
            type: 'hsla' as const,
            context: line,
          }))
      );

      // Check hsl
      const hslMatches = [...line.matchAll(HSL_PATTERN)];
      violations.push(
        ...hslMatches
          .filter((m) => !m[0].includes('var('))
          .map((m) => ({
            file: testFilePath,
            line: 1,
            column: (m.index || 0) + 1,
            value: m[0],
            type: 'hsl' as const,
            context: line,
          }))
      );

      // Check hex
      const hexMatches = [...line.matchAll(HEX_PATTERN)];
      violations.push(
        ...hexMatches
          .filter((m) => {
            const before = line.substring(0, m.index || 0);
            return !before.includes('var(');
          })
          .map((m) => ({
            file: testFilePath,
            line: 1,
            column: (m.index || 0) + 1,
            value: m[0],
            type: 'hex' as const,
            context: line,
          }))
      );
    }

    const foundViolation = violations.length > 0;
    const testPassed =
      foundViolation === test.shouldFindViolation &&
      (!test.expectedType || violations.some((v) => v.type === test.expectedType));

    if (testPassed) {
      console.log(`✅ ${test.name}`);
      passed++;
    } else {
      console.log(`❌ ${test.name}`);
      console.log(`   Expected violation: ${test.shouldFindViolation}, Found: ${foundViolation}`);
      if (test.expectedType && violations.length > 0) {
        console.log(`   Expected type: ${test.expectedType}, Found: ${violations[0].type}`);
      }
      failed++;
    }
  }

  console.log(`\n📊 Test Results: ${passed}/${tests.length} passed`);

  return failed === 0;
}

// ==================== MAIN ENTRY POINT ====================

function main(): void {
  const args = process.argv.slice(2);

  // Check for test flag
  if (args.includes('--test')) {
    const success = runSelfTests();
    process.exit(success ? 0 : 1);
  }

  // Load config from file or use defaults
  const baseConfig = loadConfig();

  // Check for strict mode (override allowGradients)
  const config: Config = {
    ...baseConfig,
    allowGradients: !args.includes('--strict'),
  };

  console.log('🔍 Lufa Design System - Token Validator\n');
  console.log(`Scanning: ${relative(process.cwd(), config.scanDirectory)}`);
  console.log(`Pattern: *${config.scanPattern}`);
  console.log(`Allow Gradients: ${config.allowGradients}`);
  if (config.allowedFiles && config.allowedFiles.length > 0) {
    console.log(`Allowed Files: ${config.allowedFiles.join(', ')}`);
  }
  console.log('');

  const result = scanDirectory(config);
  reportResults(result);

  // Exit with appropriate code
  process.exit(result.violations.length > 0 ? 1 : 0);
}

// Run the script
main();
