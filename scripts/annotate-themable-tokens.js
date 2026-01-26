#!/usr/bin/env node

/**
 * Annotate Themable Tokens
 *
 * Automatically adds `$extensions.lufa.themable` field to ALL tokens:
 * - Themable tokens (themable: true): color, shadow, gradient, border
 * - Structural tokens (themable: false): primitives, typography, spacing, layout, motion
 *
 * This implements 100% explicit annotation where all tokens have themable field.
 * Part of architectural recommendation from ADR-010 implementation.
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
  tokensAnnotatedTrue: 0, // Themable tokens (true)
  tokensAnnotatedFalse: 0, // Structural tokens (false)
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
 * Determines if a token is structural and should get themable: false
 * Structural tokens are foundational values that don't vary by theme/mode
 * @param {string} tokenPath - Dot-notation path to token
 * @param {object} token - Token object
 * @param {object} extensions - $extensions.lufa object
 * @returns {boolean} True if token is structural
 */
function isStructuralToken(tokenPath, token, extensions) {
  // Exempt by token level: primitives are foundational and non-themable
  const structuralLevels = ['primitive'];
  if (extensions?.level && structuralLevels.includes(extensions.level)) {
    return true;
  }

  // Exempt by category: these categories are structural regardless of level
  // Check both exact match and prefix match (e.g., "layout-container" contains "layout")
  const structuralCategories = [
    'typography', // Font sizes, weights, families (structural scale)
    'spacing', // Spacing scales (structural consistency)
    'layout', // Breakpoints, containers, grid (structural framework)
    'motion', // Timing, easing (UX consistency, not visual theme)
    'elevation', // Z-index (structural hierarchy)
  ];

  if (extensions?.category) {
    // Exact match or starts with structural category
    if (
      structuralCategories.includes(extensions.category) ||
      structuralCategories.some((cat) => extensions.category.startsWith(cat))
    ) {
      return true;
    }
  }

  // Exempt alpha/transparency tokens (mathematical overlays, not brand-specific)
  if (tokenPath.includes('.alpha.')) {
    return true;
  }

  // Exempt high-contrast tokens (accessibility, not design theme)
  if (tokenPath.includes('.hc.')) {
    return true;
  }

  // RULE 4: Exempt by $type (conservative list - never themable)
  // These types are structural by nature and don't vary by theme
  const structuralTypes = [
    'fontFamily', // Font stack (never themed)
    'fontWeight', // Weight value (never themed)
    'duration', // Timing (UX constant)
    'cubicBezier', // Easing (UX constant)
    'number', // Scales, ratios, z-index (structural)
  ];

  if (token.$type && structuralTypes.includes(token.$type)) {
    return true;
  }

  // RULE 5: Exempt structural patterns by path (applies to component, core, and semantic levels)
  // These patterns identify structural tokens regardless of their category assignment
  // Patterns match: word.keyword, word.keyword.group, word.keyword-variant, word-keyword-variant
  if (extensions?.level && ['component', 'core', 'semantic'].includes(extensions.level)) {
    const structuralPatterns = [
      // Spacing (match tokens with these keywords anywhere in their path)
      /[.-]padding([.-]|$)/,
      /[.-]margin([.-]|$)/,
      /[.-]gap([.-]|$)/,
      /[.-]spacing([.-]|$)/,
      /[.-]offset([.-]|$)/,

      // Typography structure (not color)
      /[.-]font-size([.-]|$)/,
      /[.-]font-weight([.-]|$)/,
      /[.-]font-family([.-]|$)/,
      /[.-]line-height([.-]|$)/,
      /[.-]letter-spacing([.-]|$)/,

      // Sizing (but not color-related)
      /[.-]height([.-]|$)/,
      /[.-]width([.-]|$)/,
      /[.-]size([.-](?!color))/, // size but not color-related
      /[.-]max-width([.-]|$)/,
      /[.-]min-width([.-]|$)/,
      /[.-]max-height([.-]|$)/,
      /[.-]min-height([.-]|$)/,
      /[.-]container([.-]|$)/,

      // Border structure (not color) - be specific to avoid matching border colors
      /[.-]border-radius([.-]|$)/,
      /[.-]border-width([.-]|$)/,
      /[.-]radius([.-]|$)/,
      /[.-]thickness([.-]|$)/,
      /[.-]outline-width([.-]|$)/,
      /[.-]outline-offset([.-]|$)/,

      // Layout
      /[.-]columns([.-]|$)/,
      /[.-]rows([.-]|$)/,
      /[.-]grid([.-]|$)/,

      // Interaction (non-visual)
      /[.-]icon-spacing([.-]|$)/,
      /\.disabled\.opacity$/,
      /\.disabled\.cursor$/,
      /[.-]cursor$/,

      // Motion/animation (structural, not color)
      /[.-]duration([.-]|$)/,
      /[.-]delay([.-]|$)/,
      /[.-]timing-function([.-]|$)/,
      /[.-]transform$/,

      // Effects (non-color)
      /[.-]blur([.-]|$)/,

      // Z-index/hierarchy
      /[.-]z-index([.-]|$)/,
    ];

    for (const pattern of structuralPatterns) {
      if (pattern.test(tokenPath)) {
        return true;
      }
    }
  }

  // RULE 6: Fallback for tokens without extensions - check if they match structural patterns
  // Some older tokens may not have $extensions.lufa, use path-based heuristics
  if (!extensions || !extensions.level) {
    // Check if token path starts with known token level prefixes
    const tokenLevelPrefixes = ['primitive', 'core', 'semantic', 'component'];
    const pathStartsWithTokenLevel = tokenLevelPrefixes.some((prefix) => tokenPath.startsWith(prefix + '.'));

    if (pathStartsWithTokenLevel) {
      // Apply same structural patterns as Rule 5
      const structuralKeywords = [
        /[.-]padding([.-]|$)/,
        /[.-]margin([.-]|$)/,
        /[.-]gap([.-]|$)/,
        /[.-]spacing([.-]|$)/,
        /[.-]height([.-]|$)/,
        /[.-]width([.-]|$)/,
        /[.-]size([.-](?!color))/,
        /[.-]thickness([.-]|$)/,
        /[.-]border-radius([.-]|$)/,
        /[.-]border-width([.-]|$)/,
        /[.-]radius([.-]|$)/,
        /[.-]font-size([.-]|$)/,
        /[.-]font-weight([.-]|$)/,
        /[.-]line-height([.-]|$)/,
        /[.-]duration([.-]|$)/,
        /[.-]blur([.-]|$)/,
        /[.-]columns([.-]|$)/,
        /[.-]rows([.-]|$)/,
        /[.-]container([.-]|$)/,
      ];

      for (const pattern of structuralKeywords) {
        if (pattern.test(tokenPath)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Adds themable field to a token's extensions
 * @param {object} token - Token object to modify
 * @param {string} tokenPath - Dot-notation path to token
 * @param {boolean} themableValue - Value to set (true for themable, false for structural)
 * @returns {boolean} True if token was modified
 */
function addThemableField(token, tokenPath, themableValue) {
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

  // Add themable field with the specified value
  token.$extensions.lufa.themable = themableValue;

  if (themableValue) {
    stats.tokensAnnotatedTrue++;
  } else {
    stats.tokensAnnotatedFalse++;
  }

  if (!CONFIG.dryRun) {
    const label = themableValue ? 'themable: true' : 'themable: false';
    const colorCode = themableValue ? colors.green : colors.blue;
    console.log(`${colorCode}  ✓ ${colors.reset}${tokenPath} ${colors.gray}(${token.$type}) → ${label}${colors.reset}`);
  } else {
    const label = themableValue ? 'themable: true' : 'themable: false';
    const colorCode = themableValue ? colors.green : colors.blue;
    console.log(
      `${colors.yellow}  • ${colors.reset}${tokenPath} ${colors.gray}(${token.$type}) → ${label} [DRY RUN]${colors.reset}`
    );
  }

  return true;
}

/**
 * Recursively walks token object and annotates tokens with themable field
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
      // Determine if token should get themable: true or themable: false
      if (isThemableType(value)) {
        // Themable types get themable: true
        if (addThemableField(value, tokenPath, true)) {
          modified = true;
        }
      } else if (isStructuralToken(tokenPath, value, value.$extensions?.lufa)) {
        // Structural tokens get themable: false
        if (addThemableField(value, tokenPath, false)) {
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
  console.log(`${colors.green}Tokens Annotated (themable: true):${colors.reset} ${stats.tokensAnnotatedTrue}`);
  console.log(`${colors.blue}Tokens Annotated (themable: false):${colors.reset} ${stats.tokensAnnotatedFalse}`);
  console.log(
    `${colors.gray}Tokens Skipped:${colors.reset} ${stats.tokensSkipped} ${colors.gray}(already have themable field)${colors.reset}`
  );

  const totalAnnotated = stats.tokensAnnotatedTrue + stats.tokensAnnotatedFalse;

  if (CONFIG.dryRun) {
    console.log(`\n${colors.yellow}${colors.bold}ℹ DRY RUN MODE${colors.reset} - No files were modified`);
    console.log(`${colors.gray}Run without --dry-run to apply changes${colors.reset}`);
  } else {
    console.log(
      `\n${colors.green}${colors.bold}✓ Annotation Complete${colors.reset} - ${totalAnnotated} tokens updated`
    );
    console.log(`${colors.gray}Run validation to verify: node scripts/validate-token-metadata.js${colors.reset}`);
  }
}

// Run main function
main();
