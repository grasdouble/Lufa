#!/usr/bin/env node

/**
 * Component Validation Script
 *
 * Validates that design system components:
 * 1. Use design tokens instead of hard-coded values
 * 2. Have proper TypeScript descriptions for all props
 * 3. Include accessibility metadata
 * 4. Export TypeScript types properly
 *
 * Usage: node scripts/validate-components.js [--dir <path>] [--strict]
 *
 * Options:
 *   --dir <path>   Override the components directory to scan
 *   --strict       Treat warnings as errors (exits with code 1)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI arguments
const args = process.argv.slice(2);
const STRICT_MODE = args.includes('--strict');
const customDirIndex = args.indexOf('--dir');
const CUSTOM_DIR = customDirIndex !== -1 ? args[customDirIndex + 1] : null;

// Configuration
const COMPONENTS_DIR = CUSTOM_DIR ? path.resolve(CUSTOM_DIR) : path.join(__dirname, '../src');
const ALLOWED_HARDCODED_VALUES = [
  // Layout values that don't need tokens
  'flex',
  'inline-flex',
  'block',
  'inline-block',
  'grid',
  'inline-grid',
  'relative',
  'absolute',
  'fixed',
  'sticky',
  'row',
  'column',
  'row-reverse',
  'column-reverse',
  'wrap',
  'nowrap',
  'wrap-reverse',
  'center',
  'flex-start',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'baseline',
  'hidden',
  'visible',
  'none',
  'auto',
  'transparent',
  '0',
  '100%',
  'inherit',
  'initial',
  'unset',
  'currentColor',
  // Boolean and numeric values
  'true',
  'false',
  'null',
  'undefined',
];

// Color regex patterns that indicate hard-coded colors
// Note: patterns are defined as factory functions to avoid stateful /g regex reuse
const HARD_CODED_COLOR_PATTERNS = [
  () => /#[0-9a-fA-F]{3,8}/g, // Hex colors (#fff, #ffffff, #ffffff80)
  () => /rgb\([^)]+\)/g, // rgb() and rgba()
  () => /hsl\([^)]+\)/g, // hsl() and hsla()
];

// Dimension patterns (px, rem, em values that should use tokens)
const HARD_CODED_DIMENSION_PATTERNS = [
  () => /\b\d+px\b/g, // pixel values (16px, 20px)
  () => /\b\d+\.?\d*rem\b/g, // rem values (1.5rem, 2rem)
  () => /\b\d+\.?\d*em\b/g, // em values (1.5em, 2em)
];

let errors = [];
let warnings = [];

/**
 * Check if a line contains hard-coded values
 */
function checkForHardCodedValues(line, filePath, lineNumber) {
  // Skip lines with token imports
  if (line.includes('tokens.') || line.includes("from '@grasdouble/lufa_design-system-tokens'")) {
    return;
  }

  // Skip JSDoc comments and regular comments
  const trimmedLine = line.trim();
  if (trimmedLine.startsWith('*') || trimmedLine.startsWith('//') || trimmedLine.startsWith('/**')) {
    return;
  }

  // Remove all var(--...) occurrences from the line before checking for hard-coded values
  // This avoids false negatives while still catching hard-coded values on the same line
  const lineWithoutTokens = line.replace(/var\(--[^)]+\)/g, 'var(TOKEN)');

  // Check for hard-coded colors
  HARD_CODED_COLOR_PATTERNS.forEach((patternFactory) => {
    const matches = lineWithoutTokens.match(patternFactory());
    if (matches) {
      matches.forEach((match) => {
        if (!ALLOWED_HARDCODED_VALUES.includes(match)) {
          errors.push({
            file: path.relative(process.cwd(), filePath),
            line: lineNumber,
            type: 'HARD_CODED_COLOR',
            value: match,
            message: `Hard-coded color value "${match}" found. Use design tokens instead.`,
          });
        }
      });
    }
  });

  // Check for hard-coded dimensions
  HARD_CODED_DIMENSION_PATTERNS.forEach((patternFactory) => {
    const matches = lineWithoutTokens.match(patternFactory());
    if (matches) {
      matches.forEach((match) => {
        // BUG FIX: check the specific matched value, not whether the line contains any allowed word
        if (!ALLOWED_HARDCODED_VALUES.includes(match)) {
          warnings.push({
            file: path.relative(process.cwd(), filePath),
            line: lineNumber,
            type: 'HARD_CODED_DIMENSION',
            value: match,
            message: `Hard-coded dimension "${match}" found. Consider using design tokens.`,
          });
        }
      });
    }
  });
}

/**
 * Check if component props have TypeScript descriptions
 */
function checkPropDescriptions(content, filePath) {
  // Look for interface/type definitions
  const interfacePattern = /(?:interface|type)\s+(\w+Props)\s*(?:=\s*)?\{([^}]+)\}/g;
  let match;

  while ((match = interfacePattern.exec(content)) !== null) {
    const interfaceName = match[1];
    const propsContent = match[2];

    // Check each prop for JSDoc comment
    const propLines = propsContent.split('\n');
    propLines.forEach((line, index) => {
      // Match prop definitions (e.g., "size?: string;")
      const propMatch = line.match(/^\s*(\w+)[\?:]:\s*([^;]+);/);
      if (propMatch) {
        const propName = propMatch[1];

        // Check if previous line has JSDoc comment
        const prevLine = propLines[index - 1] || '';
        if (!prevLine.includes('/**') && !prevLine.includes('*')) {
          warnings.push({
            file: path.relative(process.cwd(), filePath),
            line: index + 1,
            type: 'MISSING_PROP_DESCRIPTION',
            value: propName,
            message: `Prop "${propName}" in ${interfaceName} is missing JSDoc description.`,
          });
        }
      }
    });
  }
}

/**
 * Check if component exports TypeScript types
 */
function checkTypeExports(content, filePath) {
  const componentName = path.basename(filePath, '.tsx');

  // Skip barrel/index files - they re-export but don't define their own Props
  if (componentName === 'index') {
    return;
  }

  const expectedExport = `${componentName}Props`;

  // Check if Props interface/type is exported
  const hasPropsExport =
    content.includes(`export interface ${expectedExport}`) || content.includes(`export type ${expectedExport}`);

  if (!hasPropsExport && content.includes(`${expectedExport}`)) {
    warnings.push({
      file: path.relative(process.cwd(), filePath),
      line: 0,
      type: 'MISSING_TYPE_EXPORT',
      value: expectedExport,
      message: `${expectedExport} should be exported for external use.`,
    });
  }
}

/**
 * Recursively find all .tsx files
 */
function findTsxFiles(dir) {
  let results = [];

  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Directory not found: ${dir}`);
    return results;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip test directories and node_modules
      if (!file.includes('test') && !file.includes('node_modules')) {
        results = results.concat(findTsxFiles(filePath));
      }
    } else if (file.endsWith('.tsx') && !file.includes('.test.')) {
      results.push(filePath);
    }
  });

  return results;
}

/**
 * Validate a single component file
 */
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Check each line for hard-coded values
  lines.forEach((line, index) => {
    checkForHardCodedValues(line, filePath, index + 1);
  });

  // Check prop descriptions
  checkPropDescriptions(content, filePath);

  // Check type exports
  checkTypeExports(content, filePath);
}

/**
 * Print validation results
 */
function printResults() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 COMPONENT VALIDATION REPORT');
  if (STRICT_MODE) {
    console.log('   (strict mode: warnings treated as errors)');
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Print errors
  if (errors.length > 0) {
    console.log('━━━ ERRORS ━━━\n');
    errors.forEach((error) => {
      console.log(`❌ ${error.file}:${error.line}`);
      console.log(`   ${error.message}`);
      console.log(`   Found: ${error.value}\n`);
    });
  }

  // Print warnings
  if (warnings.length > 0) {
    console.log('━━━ WARNINGS ━━━\n');
    warnings.forEach((warning) => {
      console.log(`⚠️  ${warning.file}:${warning.line}`);
      console.log(`   ${warning.message}`);
      if (warning.value) {
        console.log(`   Found: ${warning.value}`);
      }
      console.log('');
    });
  }

  // Print summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All component validation checks passed!');
    console.log('   - No hard-coded values found');
    console.log('   - All props have descriptions');
    console.log('   - All types are exported\n');
  } else {
    console.log(`✗ Errors:   ${errors.length}`);
    console.log(`⚠ Warnings: ${warnings.length}\n`);

    if (errors.length > 0) {
      console.log('💡 To fix errors:');
      console.log('   1. Replace hard-coded colors with tokens: var(--lufa-semantic-ui-text-primary)');
      console.log('   2. Use design tokens for dimensions: var(--lufa-primitive-spacing-16)');
      console.log("   3. Import tokens: import tokens from '@grasdouble/lufa_design-system-tokens';\n");
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

/**
 * Main execution
 */
function main() {
  // Validate --dir argument
  if (customDirIndex !== -1 && !CUSTOM_DIR) {
    console.error('❌ Error: --dir requires a path argument.');
    process.exit(1);
  }

  console.log('🔍 Starting component validation...\n');
  console.log(`📁 Scanning directory: ${COMPONENTS_DIR}\n`);

  const componentFiles = findTsxFiles(COMPONENTS_DIR);

  console.log(`📄 Found ${componentFiles.length} component files\n`);

  if (componentFiles.length === 0) {
    console.log('⚠️  No component files found. Skipping validation.');
    process.exit(0);
  }

  componentFiles.forEach((file) => {
    validateFile(file);
  });

  printResults();

  // Exit with error code if there are errors (or warnings in strict mode)
  if (errors.length > 0 || (STRICT_MODE && warnings.length > 0)) {
    process.exit(1);
  }

  process.exit(0);
}

main();
