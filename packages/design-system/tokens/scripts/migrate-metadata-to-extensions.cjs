#!/usr/bin/env node

/**
 * Migration Script: metadata → $extensions.lufa
 *
 * Migrates all token files from non-standard "metadata" field
 * to DTCG-compliant "$extensions.lufa" structure.
 *
 * Usage:
 *   node scripts/migrate-metadata-to-extensions.js           # Real migration
 *   node scripts/migrate-metadata-to-extensions.js --dry-run # Test mode (no changes)
 *
 * @author Mary (Business Analyst - BMAD)
 * @date 2026-01-23
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const SRC_DIR = path.join(__dirname, '../src');
const DRY_RUN = process.argv.includes('--dry-run');

// Stats tracking
const stats = {
  filesProcessed: 0,
  tokensMigrated: 0,
  filesModified: 0,
  errors: [],
};

/**
 * Recursively migrate metadata → $extensions.lufa
 *
 * @param {Object} obj - Token object to migrate
 * @returns {boolean} - Whether any migration occurred
 */
function migrateToken(obj) {
  let migrated = false;

  for (const key in obj) {
    if (key === 'metadata') {
      // Found metadata - migrate it to $extensions.lufa
      obj['$extensions'] = obj['$extensions'] || {};
      obj['$extensions'].lufa = obj.metadata;
      delete obj.metadata;
      stats.tokensMigrated++;
      migrated = true;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recurse into nested objects
      const childMigrated = migrateToken(obj[key]);
      migrated = migrated || childMigrated;
    }
  }

  return migrated;
}

/**
 * Process a single JSON file
 *
 * @param {string} filePath - Absolute path to JSON file
 */
function processFile(filePath) {
  try {
    stats.filesProcessed++;

    // Read file
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);

    // Migrate
    const modified = migrateToken(json);

    if (modified) {
      stats.filesModified++;

      if (DRY_RUN) {
        console.log(`[DRY RUN] Would modify: ${path.relative(SRC_DIR, filePath)}`);
      } else {
        // Write back with 2-space indent + newline at end
        const newContent = JSON.stringify(json, null, 2) + '\n';
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Migrated: ${path.relative(SRC_DIR, filePath)}`);
      }
    } else {
      // No metadata found - file already migrated or no tokens
      if (!DRY_RUN) {
        console.log(`⏭️  Skipped (no metadata): ${path.relative(SRC_DIR, filePath)}`);
      }
    }
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
    console.error(`❌ Error processing ${path.relative(SRC_DIR, filePath)}:`, error.message);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('\n' + '='.repeat(70));
  console.log('🔄 Metadata → $extensions.lufa Migration Script');
  console.log('='.repeat(70));

  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN MODE - No files will be modified\n');
  } else {
    console.log('\n🚀 REAL MODE - Files will be modified\n');
  }

  // Find all JSON token files
  const files = globSync('**/*.json', {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  console.log(`📂 Found ${files.length} token files in src/\n`);

  // Process each file
  for (const file of files) {
    processFile(file);
  }

  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 Migration Summary');
  console.log('='.repeat(70));
  console.log(`Files processed:    ${stats.filesProcessed}`);
  console.log(`Files modified:     ${stats.filesModified}`);
  console.log(`Tokens migrated:    ${stats.tokensMigrated}`);
  console.log(`Errors encountered: ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ Errors:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${path.relative(SRC_DIR, file)}: ${error}`);
    });
    console.log('\n⚠️  Migration completed with errors');
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN completed - Run without --dry-run to apply changes');
    console.log(`\nCommand to run real migration:`);
    console.log(`  node scripts/migrate-metadata-to-extensions.js`);
  } else {
    console.log('\n✅ Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('  1. pnpm build                  # Rebuild tokens');
    console.log('  2. git diff src/               # Review changes');
    console.log('  3. pnpm ds:tokens:validate     # Validate tokens (if script exists)');
  }

  console.log('='.repeat(70) + '\n');
}

// Run main
main();
