#!/usr/bin/env node

/**
 * Script to update the changelog documentation page from package CHANGELOGs
 *
 * This script reads the CHANGELOG.md from the main design system package
 * and updates the docs/changelog.md file with the latest releases.
 *
 * Usage:
 *   node scripts/update-changelog.js
 *   pnpm update-changelog
 */

const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Paths
const MAIN_CHANGELOG_PATH = join(__dirname, '../../../design-system/main/CHANGELOG.md');
const DOCS_CHANGELOG_PATH = join(__dirname, '../docs/changelog.md');
const DOCUSAURUS_CONFIG_PATH = join(__dirname, '../docusaurus.config.ts');

/**
 * Parse CHANGELOG.md and extract recent releases
 */
function parseChangelog(content) {
  const lines = content.split('\n');
  const releases = [];
  let currentRelease = null;
  let inChanges = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect version header (e.g., "## 0.5.1")
    if (line.match(/^## \d+\.\d+\.\d+/)) {
      if (currentRelease) {
        releases.push(currentRelease);
      }
      const version = line.replace('## ', '').trim();
      currentRelease = {
        version,
        changes: [],
      };
      inChanges = false;
      continue;
    }

    // Detect change type headers
    if (line.match(/^### (Major Changes|Minor Changes|Patch Changes)/)) {
      inChanges = true;
      currentRelease.changeType = line.replace('### ', '').trim();
      continue;
    }

    // Collect changes
    if (inChanges && currentRelease && line.startsWith('- ')) {
      currentRelease.changes.push(line.replace(/^- /, '').trim());
    }
  }

  if (currentRelease) {
    releases.push(currentRelease);
  }

  return releases.slice(0, 5); // Get top 5 releases
}

/**
 * Generate markdown for recent releases section
 */
function generateRecentReleasesMarkdown(releases) {
  let markdown = '## Recent Releases\n\n';
  markdown += '### @grasdouble/lufa_design-system\n\n';

  releases.forEach((release, index) => {
    const isLatest = index === 0;
    markdown += `#### ${release.version}${isLatest ? ' (Latest)' : ''}\n\n`;

    if (release.changeType) {
      markdown += `**${release.changeType}:**\n`;
    }

    release.changes.forEach(change => {
      markdown += `- ${change}\n`;
    });

    markdown += '\n';
  });

  return markdown;
}

/**
 * Update the versions config in docusaurus.config.ts
 * Updates both the current version label and adds all versions to the config
 */
function updateDocusaurusConfig(releases) {
  try {
    console.log('⚙️  Updating docusaurus.config.ts...');
    const configContent = readFileSync(DOCUSAURUS_CONFIG_PATH, 'utf-8');

    const latestVersion = releases[0].version;

    // Find the start of versions config
    const versionsStart = configContent.indexOf('versions: {');
    if (versionsStart === -1) {
      console.log('⚠️  Could not find versions config in docusaurus.config.ts');
      console.log('   Skipping config update (this is optional)');
      return false;
    }

    // Count braces to find the matching closing brace
    let braceCount = 0;
    let versionsEnd = -1;
    let foundStart = false;

    for (let i = versionsStart; i < configContent.length; i++) {
      if (configContent[i] === '{') {
        braceCount++;
        foundStart = true;
      } else if (configContent[i] === '}') {
        braceCount--;
        if (foundStart && braceCount === 0) {
          versionsEnd = i + 1;
          break;
        }
      }
    }

    if (versionsEnd === -1) {
      console.log('⚠️  Could not find closing brace for versions config');
      console.log('   Skipping config update (this is optional)');
      return false;
    }

    // Build the new versions config
    const versionsConfig = buildVersionsConfig(releases);

    // Replace the versions block
    const updatedConfig =
      configContent.substring(0, versionsStart) +
      versionsConfig +
      configContent.substring(versionsEnd);

    writeFileSync(DOCUSAURUS_CONFIG_PATH, updatedConfig, 'utf-8');
    console.log(`✅ Updated config with ${releases.length} versions`);
    console.log(`   Latest: ${latestVersion}`);
    return true;

  } catch (error) {
    console.error('⚠️  Error updating docusaurus.config.ts:', error.message);
    console.log('   Continuing anyway (this is optional)');
    return false;
  }
}

/**
 * Build the versions config block with all releases
 */
function buildVersionsConfig(releases) {
  let config = 'versions: {\n';
  config += `            current: {\n`;
  config += `              label: 'Development (Unreleased)',\n`;
  config += `              path: '/',\n`;
  config += `            },\n`;

  // Add all released versions to enable version dropdown
  releases.forEach((release) => {
    const version = release.version;
    config += `            '${version}': {\n`;
    config += `              label: '${version}',\n`;
    config += `              path: '/${version}',\n`;
    config += `            },\n`;
  });

  config += '          }';

  return config;
}

/**
 * Main function to update the documentation
 */
function updateChangelogDocs() {
  try {
    console.log('📖 Reading package CHANGELOG.md...');
    const mainChangelog = readFileSync(MAIN_CHANGELOG_PATH, 'utf-8');

    console.log('🔍 Parsing releases...');
    const releases = parseChangelog(mainChangelog);

    if (releases.length === 0) {
      console.log('⚠️  No releases found in CHANGELOG.md');
      return;
    }

    console.log(`✅ Found ${releases.length} recent releases`);
    const latestVersion = releases[0].version;

    console.log('📝 Reading current docs/changelog.md...');
    const currentDocs = readFileSync(DOCS_CHANGELOG_PATH, 'utf-8');

    // Find the "Recent Releases" section
    const startMarker = '## Recent Releases';
    const endMarker = '## Related Packages';

    const startIndex = currentDocs.indexOf(startMarker);
    const endIndex = currentDocs.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      console.log('⚠️  Could not find Recent Releases section markers');
      console.log('   Make sure docs/changelog.md has both:');
      console.log('   - "## Recent Releases"');
      console.log('   - "## Related Packages"');
      return;
    }

    // Generate new content
    const newRecentReleases = generateRecentReleasesMarkdown(releases);

    // Build updated document
    const before = currentDocs.substring(0, startIndex);
    const after = currentDocs.substring(endIndex);
    const updated = before + newRecentReleases + after;

    console.log('💾 Writing updated docs/changelog.md...');
    writeFileSync(DOCS_CHANGELOG_PATH, updated, 'utf-8');

    console.log('✨ Changelog documentation updated successfully!');
    console.log(`   Latest version: ${latestVersion}`);

    // Update docusaurus.config.ts with all versions
    const configUpdated = updateDocusaurusConfig(releases);

    // Final summary
    console.log('\n📋 Summary:');
    console.log(`   ✅ docs/changelog.md updated`);
    console.log(`   ${configUpdated ? '✅' : '⏭️'} docusaurus.config.ts ${configUpdated ? 'updated' : 'unchanged'}`);

  } catch (error) {
    console.error('❌ Error updating changelog:', error.message);
    process.exit(1);
  }
}

// Run the script
updateChangelogDocs();
