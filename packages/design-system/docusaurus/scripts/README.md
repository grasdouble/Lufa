# Docusaurus Scripts

This directory contains automation scripts for maintaining the Docusaurus documentation site.

## Available Scripts

### `update-changelog.js`

Automatically updates the changelog documentation from package CHANGELOG.md files.

**Usage:**
```bash
# From repository root
pnpm --filter @grasdouble/lufa_design-system-docusaurus update-changelog

# From this package
cd packages/design-system/docusaurus
pnpm update-changelog

# Direct execution
node scripts/update-changelog.js
```

**What it does:**
1. Reads `packages/design-system/main/CHANGELOG.md`
2. Parses the 5 most recent releases
3. Updates the "Recent Releases" section in `docs/changelog.md`
4. Updates version config in `docusaurus.config.ts` with versions >= 0.6.0 only
5. Preserves all other content

**Version Filtering:**
- Only includes versions >= 0.6.0 in the dropdown
- This ensures only versions with proper documentation snapshots are shown
- Earlier versions (0.5.x and below) are excluded to avoid showing incorrect historical docs

**Output Example:**
```
📖 Reading package CHANGELOG.md...
🔍 Parsing releases...
✅ Found 5 recent releases
📝 Reading current docs/changelog.md...
💾 Writing updated docs/changelog.md...
✨ Changelog documentation updated successfully!
   Latest version: 0.5.1
⚙️  Updating docusaurus.config.ts...
✅ Updated config with 5 versions
   Latest: 0.5.1

📋 Summary:
   ✅ docs/changelog.md updated
   ✅ docusaurus.config.ts updated
```

**Automated Execution:**

The script runs automatically via GitHub Actions:
- After successful Release:Changesets workflow
- When CHANGELOG.md files change on main branch
- Manual trigger available

The GitHub Actions workflow also:
- **Detects version changes** - Compares version before and after script runs
- **Creates version snapshots** - When version changes, creates versioned docs folder
- **Submits PR** - All changes reviewed before merging

See [`.github/workflows/update-changelog-docs.yml`](../../../../.github/workflows/update-changelog-docs.yml)

## Customization

### Change Number of Releases Shown

Edit `update-changelog.js`:
```javascript
return releases.slice(0, 5); // Change 5 to desired number
```

### Disable Config Updates

Comment out in `updateChangelogDocs()`:
```javascript
// const configUpdated = updateDocusaurusConfig(releases);
```

### Customize Version Label Format

Edit `buildVersionsConfig()`:
```javascript
config += `              label: '${latestVersion} (Latest)',\n`;

// Examples:
// `label: 'v${latestVersion}'`           → "v0.5.1"
// `label: '${latestVersion} - Current'`  → "0.5.1 - Current"
```

## How It Works

### Process Flow

1. **Parse CHANGELOG.md** - Extracts version numbers and change descriptions
2. **Generate Markdown** - Formats recent releases for documentation
3. **Update changelog.md** - Replaces "Recent Releases" section
4. **Update config** - Updates version label and adds all previous versions to dropdown
5. **Preserve Content** - All other sections remain unchanged

### GitHub Actions Workflow

When triggered by a release:

1. **Get CHANGELOG version** - Reads latest released version from package CHANGELOG.md (e.g., 0.5.1)
2. **Check for existing snapshot** - Checks if `versioned_docs/version-0.5.1/` already exists
3. **Run script** - Updates changelog.md and docusaurus.config.ts
4. **Create snapshot for release** - If snapshot doesn't exist, runs `pnpm docusaurus docs:version 0.5.1`
   - Creates `versioned_docs/version-0.5.1/` with the released documentation
   - Creates `versioned_sidebars/version-0.5.1-sidebars.json`
   - Updates `versions.json`
   - **After this:** `docs/` remains as development version for next release
5. **Create PR** - Submits all changes for review

**Versioning Strategy:**
- `docs/` (current) → Development/unreleased changes (always ahead)
- `versioned_docs/version-X.Y.Z/` → Snapshot of released version X.Y.Z

#### Workflow Timeline Example

**Starting point:** Current version is 0.5.1, working towards 0.6.0

```
Time  | Action                             | docs/ content      | versioned_docs/ | Dropdown
------|------------------------------------|--------------------|-----------------|----------
T0    | Working on v0.6.0 features         | Dev (unreleased)   | (none)          | Dev only
T1    | Release v0.6.0 published           | Dev (unreleased)   | (none)          | Dev only
T2    | Workflow gets latest: v0.6.0       | Dev (unreleased)   | (none)          | Dev only
T3    | Script updates changelog           | Dev (updated)      | (none)          | Dev only
T4    | Creates snapshot for v0.6.0        | Dev (updated)      | version-0.6.0/  | Dev, 0.6.0
T5    | PR merged                          | Dev (updated)      | version-0.6.0/  | Dev, 0.6.0
T6    | Working on v0.6.1 features         | Dev (new changes)  | version-0.6.0/  | Dev, 0.6.0
T7    | Release v0.6.1 published           | Dev (new changes)  | version-0.6.0/  | Dev, 0.6.0
T8    | Workflow creates v0.6.1 snapshot   | Dev (new changes)  | v0.6.0, v0.6.1  | Dev, 0.6.1, 0.6.0

Result: Current docs = Development, /0.6.1 shows v0.6.1, /0.6.0 shows v0.6.0
```

**Note:** Versions < 0.6.0 are never added to the dropdown to prevent showing incorrect docs.

### Version Config Output

```typescript
versions: {
  current: {
    label: 'Development (Unreleased)',  // Always dev/next
    path: '/',                          // Main docs folder
  },
  '0.6.0': {                            // First version with snapshots
    label: '0.6.0',
    path: '/0.6.0',                     // Snapshot of v0.6.0
  },
  // Future releases (0.6.1, 0.7.0, 1.0.0, etc.) will be added here
  // Versions < 0.6.0 are excluded (no snapshots exist)
}
```

**Version Filtering:**
- **Included:** Versions >= 0.6.0 (versions with proper snapshots)
- **Excluded:** Versions < 0.6.0 (0.5.x and earlier - no snapshots available)
- This prevents showing incorrect/duplicate documentation for old versions

**Version Snapshots:** When a new version >= 0.6.0 is released, the GitHub Actions workflow automatically:
- Creates a snapshot folder `versioned_docs/version-X.Y.Z/` with the released documentation
- Adds the version to the dropdown menu (if >= 0.6.0)
- Keeps `docs/` as development version for ongoing work
- Preserves historical documentation for each released version

## Troubleshooting

### Script Fails to Find Sections

**Error:** `Could not find Recent Releases section markers`

**Fix:** Ensure `docs/changelog.md` contains:
- A line starting with `## Recent Releases`
- A line starting with `## Related Packages`

### No Changes Detected

**Possible causes:**
- CHANGELOG.md hasn't been updated
- Documentation already has latest version
- Version format doesn't match (must be `## X.Y.Z`)

**Check versions:**
```bash
# View latest in package CHANGELOG
head -n 20 ../main/CHANGELOG.md

# View current in docs
head -n 50 docs/changelog.md
```

### Config Not Updating

**Possible causes:**
- No `versions: { ... }` block in config
- Pattern doesn't match
- Config is optional - script continues if not found

**Verify config has versions block:**
```bash
grep -A 5 "versions:" docusaurus.config.ts
```

### Version Snapshot 404 Errors

**Problem:** Clicking version in dropdown shows 404

**Cause:** Version snapshot folder doesn't exist yet

**Solution:** The GitHub Actions workflow will create snapshots automatically when version changes. For existing versions, manually create snapshots:

```bash
cd packages/design-system/docusaurus

# Create snapshot for a specific version
pnpm docusaurus docs:version 0.5.0
pnpm docusaurus docs:version 0.4.0
# etc.
```

This creates:
- `versioned_docs/version-0.5.0/` - Snapshot of docs
- `versioned_sidebars/version-0.5.0-sidebars.json` - Sidebar config
- Updates `versions.json` - Version registry

## Integration with CI/CD

### GitHub Actions Workflow

The workflow creates a PR when changelog is updated:

```yaml
# Trigger: After releases or when CHANGELOG.md changes
# Action: Run update-changelog script
# Result: Create PR with changes
```

**Manual Trigger:**
1. Go to Actions → "Update Changelog Documentation"
2. Click "Run workflow"
3. Review PR when created

### Pre-build Hook (Optional)

To ensure docs are always current before builds:

```json
// package.json
{
  "scripts": {
    "prebuild": "npm run update-changelog",
    "build": "docusaurus build"
  }
}
```

**Trade-off:** Adds build time but guarantees synchronization.

## Future Enhancements

### Support Multiple Packages

Extend to parse tokens and primitives CHANGELOGs:

```javascript
const TOKENS_CHANGELOG = join(__dirname, '../../../design-system/tokens/CHANGELOG.md');
const tokensReleases = parseChangelog(readFileSync(TOKENS_CHANGELOG, 'utf-8'));

// Add to markdown generation
markdown += '### @grasdouble/lufa_design-system-tokens\n\n';
// ... format tokens releases
```

### Auto-uncomment Version Entries

Check if version directories exist and uncomment entries automatically:

```javascript
const versionDir = join(__dirname, '../versioned_docs/version-${version}');
if (existsSync(versionDir)) {
  // Uncomment this version entry
}
```

### Change Detection

Only create PR if meaningful changes:

```javascript
const diff = execSync('git diff docs/changelog.md').toString();
if (diff.includes('0.5.1')) {
  // Actual version change, create PR
}
```

## Related Files

- **Script:** [`update-changelog.js`](./update-changelog.js)
- **Workflow:** [`.github/workflows/update-changelog-docs.yml`](../../../../.github/workflows/update-changelog-docs.yml)
- **Target Docs:** [`docs/changelog.md`](../docs/changelog.md)
- **Config:** [`docusaurus.config.ts`](../docusaurus.config.ts)
- **Source:** [`packages/design-system/main/CHANGELOG.md`](../../main/CHANGELOG.md)

## Questions?

For issues or questions about changelog automation:
1. Check script inline comments
2. Review this README
3. Open an issue on [GitHub](https://github.com/grasdouble/Lufa/issues)
