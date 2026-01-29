/**
 * Phase 3: Migrate Semantic Token Metadata
 *
 * This script updates all core/semantic/component tokens to follow ADR-011:
 * - Fix typo: themable → themeable (ALL tokens)
 * - Set themeable: true for core/semantic/component tokens
 * - Set themeable: false for layout tokens
 * - Set modeAware: true if token has modes object
 * - Set modeAware: false if token doesn't have modes object
 * - Preserve all other metadata
 *
 * @see ADR-011: Token Architecture - Primitives as Immutable Constants
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Recursively update metadata in token objects
 */
function updateSemanticMetadata(obj, stats) {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  // If this is a token (has $extensions)
  if (obj.$extensions?.lufa) {
    const lufa = obj.$extensions.lufa;

    // Skip primitives (already migrated in Phase 2)
    if (lufa.level === 'primitive') {
      return;
    }

    stats.tokensProcessed++;

    // Fix typo: themable → themeable
    if ('themable' in lufa) {
      stats.typosFixed++;
      // Copy value before deleting
      const oldValue = lufa.themable;
      delete lufa.themable;

      // Only use old value if themeable isn't already set
      if (!('themeable' in lufa)) {
        lufa.themeable = oldValue;
      }
    }

    // Determine if this is a layout token
    const isLayout =
      lufa.level === 'layout' ||
      lufa.category?.includes('layout') ||
      lufa.category === 'breakpoint' ||
      lufa.category === 'grid';

    // Set themeable based on token type
    if (isLayout) {
      if (lufa.themeable !== false) {
        stats.layoutCorrected++;
      }
      lufa.themeable = false;
    } else {
      // Core, semantic, component tokens should be themeable
      if (lufa.themeable !== true) {
        stats.themeableSet++;
      }
      lufa.themeable = true;
    }

    // Set modeAware based on presence of modes object
    const hasModes = lufa.modes && Object.keys(lufa.modes).length > 0;

    if (hasModes) {
      if (lufa.modeAware !== true) {
        stats.modeAwareAdded++;
      }
      lufa.modeAware = true;
    } else {
      if (lufa.modeAware !== false) {
        stats.modeAwareSetFalse++;
      }
      lufa.modeAware = false;
    }
  }

  // Recurse into nested objects
  for (const key in obj) {
    if (!key.startsWith('$') && typeof obj[key] === 'object') {
      updateSemanticMetadata(obj[key], stats);
    }
  }
}

/**
 * Migrate a single file
 */
function migrateFile(filePath, stats) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const tokens = JSON.parse(content);

    const fileStats = {
      tokensProcessed: 0,
      typosFixed: 0,
      themeableSet: 0,
      layoutCorrected: 0,
      modeAwareAdded: 0,
      modeAwareSetFalse: 0,
    };

    updateSemanticMetadata(tokens, fileStats);

    // Only write if changes were made
    if (fileStats.tokensProcessed > 0) {
      const updatedContent = JSON.stringify(tokens, null, 2) + '\n';
      writeFileSync(filePath, updatedContent, 'utf-8');

      // Update global stats
      stats.filesUpdated++;
      stats.tokensProcessed += fileStats.tokensProcessed;
      stats.typosFixed += fileStats.typosFixed;
      stats.themeableSet += fileStats.themeableSet;
      stats.layoutCorrected += fileStats.layoutCorrected;
      stats.modeAwareAdded += fileStats.modeAwareAdded;
      stats.modeAwareSetFalse += fileStats.modeAwareSetFalse;

      console.log(
        `${colors.green}✓${colors.reset} ${filePath.split('/').slice(-3).join('/')} - ${fileStats.tokensProcessed} tokens updated`
      );
    } else {
      stats.filesSkipped++;
      console.log(`${colors.blue}○${colors.reset} ${filePath.split('/').slice(-3).join('/')} - no changes needed`);
    }
  } catch (error) {
    stats.filesErrored++;
    console.error(`${colors.red}✗${colors.reset} ${filePath.split('/').slice(-3).join('/')}: ${error.message}`);
  }
}

/**
 * Main migration function
 */
async function migrateSemanticTokens() {
  console.log(`${colors.cyan}🔧 Semantic Token Metadata Migration${colors.reset}`);
  console.log(`${colors.blue}Phase 3: ADR-011 Implementation${colors.reset}\n`);

  const srcDir = join(__dirname, '../src');
  const startTime = Date.now();

  // Find all non-primitive token files
  const patterns = ['core/**/*.json', 'semantic/**/*.json', 'component/**/*.json'];

  let allFiles = [];
  for (const pattern of patterns) {
    const files = await glob(pattern, {
      cwd: srcDir,
      absolute: true,
    });
    allFiles = [...allFiles, ...files];
  }

  console.log(`Found ${allFiles.length} semantic/component files\n`);

  const stats = {
    filesUpdated: 0,
    filesSkipped: 0,
    filesErrored: 0,
    tokensProcessed: 0,
    typosFixed: 0,
    themeableSet: 0,
    layoutCorrected: 0,
    modeAwareAdded: 0,
    modeAwareSetFalse: 0,
  };

  // Migrate each file
  for (const file of allFiles) {
    migrateFile(file, stats);
  }

  const duration = Date.now() - startTime;

  // Print summary
  console.log(`\n${'─'.repeat(60)}\n`);
  console.log(`${colors.cyan}Migration Summary${colors.reset}\n`);
  console.log(`Files processed: ${allFiles.length}`);
  console.log(`  ${colors.green}✓ Updated:${colors.reset} ${stats.filesUpdated}`);
  console.log(`  ${colors.blue}○ Skipped:${colors.reset} ${stats.filesSkipped}`);
  console.log(`  ${colors.red}✗ Errored:${colors.reset} ${stats.filesErrored}`);
  console.log();
  console.log(`Token changes:`);
  console.log(`  Tokens processed: ${stats.tokensProcessed}`);
  console.log(`  "themable" typos fixed: ${stats.typosFixed}`);
  console.log(`  "themeable: true" set: ${stats.themeableSet}`);
  console.log(`  Layout "themeable: false" corrected: ${stats.layoutCorrected}`);
  console.log(`  "modeAware: true" added (has modes): ${stats.modeAwareAdded}`);
  console.log(`  "modeAware: false" set (no modes): ${stats.modeAwareSetFalse}`);
  console.log();
  console.log(`${colors.green}✓ Migration completed in ${duration}ms${colors.reset}\n`);

  if (stats.filesErrored > 0) {
    console.error(`${colors.red}Warning: ${stats.filesErrored} file(s) had errors${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.cyan}Next steps:${colors.reset}`);
  console.log(`1. Review changes: git diff src/`);
  console.log(`2. Run validation: pnpm validate:tokens`);
  console.log(`3. Build tokens: pnpm build`);
  console.log(`4. Check CSS diff: git diff dist/tokens.css`);
}

// Run migration
migrateSemanticTokens().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
