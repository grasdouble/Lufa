/**
 * Phase 2: Migrate Primitive Token Metadata
 *
 * This script updates all primitive tokens to follow ADR-011:
 * - Fix typo: themable → themeable (ALL tokens)
 * - Set themeable: false (primitives are immutable constants)
 * - Set modeAware: false (primitives don't vary by mode)
 * - Remove any modes object from primitives (shouldn't exist but check anyway)
 * - Preserve all other metadata (wcag, useCase, etc.)
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
function updatePrimitiveMetadata(obj, stats) {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  // If this is a token (has $extensions)
  if (obj.$extensions?.lufa) {
    const lufa = obj.$extensions.lufa;

    // Only process primitive tokens
    if (lufa.level === 'primitive') {
      stats.primitivesProcessed++;

      // Fix typo: themable → themeable
      if ('themable' in lufa) {
        stats.typosFixed++;
        // Remove old typo
        delete lufa.themable;
      }

      // Set correct metadata for primitives
      if (lufa.themeable !== false) {
        stats.themeableCorrected++;
      }
      lufa.themeable = false;

      if (lufa.modeAware !== false) {
        stats.modeAwareAdded++;
      }
      lufa.modeAware = false;

      // Remove modes object if it exists (it shouldn't on primitives)
      if (lufa.modes) {
        stats.modesRemoved++;
        delete lufa.modes;
      }
    }
  }

  // Recurse into nested objects
  for (const key in obj) {
    if (!key.startsWith('$') && typeof obj[key] === 'object') {
      updatePrimitiveMetadata(obj[key], stats);
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
      primitivesProcessed: 0,
      typosFixed: 0,
      themeableCorrected: 0,
      modeAwareAdded: 0,
      modesRemoved: 0,
    };

    updatePrimitiveMetadata(tokens, fileStats);

    // Only write if changes were made
    if (fileStats.primitivesProcessed > 0) {
      const updatedContent = JSON.stringify(tokens, null, 2) + '\n';
      writeFileSync(filePath, updatedContent, 'utf-8');

      // Update global stats
      stats.filesUpdated++;
      stats.primitivesProcessed += fileStats.primitivesProcessed;
      stats.typosFixed += fileStats.typosFixed;
      stats.themeableCorrected += fileStats.themeableCorrected;
      stats.modeAwareAdded += fileStats.modeAwareAdded;
      stats.modesRemoved += fileStats.modesRemoved;

      console.log(
        `${colors.green}✓${colors.reset} ${filePath.split('/').slice(-3).join('/')} - ${fileStats.primitivesProcessed} tokens updated`
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
async function migratePrimitives() {
  console.log(`${colors.cyan}🔧 Primitive Token Metadata Migration${colors.reset}`);
  console.log(`${colors.blue}Phase 2: ADR-011 Implementation${colors.reset}\n`);

  const srcDir = join(__dirname, '../src/primitives');
  const startTime = Date.now();

  // Find all primitive token files
  const primitiveFiles = await glob('**/*.json', {
    cwd: srcDir,
    absolute: true,
  });

  console.log(`Found ${primitiveFiles.length} primitive files\n`);

  const stats = {
    filesUpdated: 0,
    filesSkipped: 0,
    filesErrored: 0,
    primitivesProcessed: 0,
    typosFixed: 0,
    themeableCorrected: 0,
    modeAwareAdded: 0,
    modesRemoved: 0,
  };

  // Migrate each file
  for (const file of primitiveFiles) {
    migrateFile(file, stats);
  }

  const duration = Date.now() - startTime;

  // Print summary
  console.log(`\n${'─'.repeat(60)}\n`);
  console.log(`${colors.cyan}Migration Summary${colors.reset}\n`);
  console.log(`Files processed: ${primitiveFiles.length}`);
  console.log(`  ${colors.green}✓ Updated:${colors.reset} ${stats.filesUpdated}`);
  console.log(`  ${colors.blue}○ Skipped:${colors.reset} ${stats.filesSkipped}`);
  console.log(`  ${colors.red}✗ Errored:${colors.reset} ${stats.filesErrored}`);
  console.log();
  console.log(`Token changes:`);
  console.log(`  Primitives processed: ${stats.primitivesProcessed}`);
  console.log(`  "themable" typos fixed: ${stats.typosFixed}`);
  console.log(`  "themeable: false" set: ${stats.themeableCorrected}`);
  console.log(`  "modeAware: false" added: ${stats.modeAwareAdded}`);
  console.log(`  "modes" objects removed: ${stats.modesRemoved}`);
  console.log();
  console.log(`${colors.green}✓ Migration completed in ${duration}ms${colors.reset}\n`);

  if (stats.filesErrored > 0) {
    console.error(`${colors.red}Warning: ${stats.filesErrored} file(s) had errors${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.cyan}Next steps:${colors.reset}`);
  console.log(`1. Review changes: git diff src/primitives/`);
  console.log(`2. Run validation: pnpm validate:tokens`);
  console.log(`3. Build tokens: pnpm build`);
  console.log(`4. Check CSS diff: git diff dist/tokens.css`);
}

// Run migration
migratePrimitives().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
