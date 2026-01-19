# Scripts

This directory contains utility scripts for the Lufa project.

## validate-ai-docs.sh

**Purpose**: Validates consistency across AI documentation files to prevent desynchronization.

**Usage**:

```bash
# Via npm script (recommended)
pnpm validate:docs

# Or directly
bash scripts/validate-ai-docs.sh
```

**What it validates**:

1. **Three-layer architecture consistency**
   - Ensures `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md` all document the same three-layer architecture
   - Validates that "Layer 3: Components" sections are present

2. **Critical rules consistency**
   - Verifies all files reference `@grasdouble/lufa_design-system-tokens`
   - Checks that primitives import restrictions are documented
   - Ensures critical design system rules are consistent

3. **Build commands consistency**
   - Validates that build order commands are present in all files:
     - `pnpm ds:tokens:build`
     - `pnpm ds:primitives:build`
     - `pnpm ds:main:build`
     - `pnpm ds:all:build`

4. **YAML frontmatter validity**
   - Checks `.instructions.md` files for unsupported YAML fields
   - GitHub Copilot only supports: `description`, `applyTo`, `name`
   - Warns if other fields are present

5. **Markdown links**
   - Validates all relative markdown links point to existing files
   - Checks links in `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and `config.toml`

6. **File sizes**
   - Warns if `CLAUDE.md` exceeds 300 lines (token limit concerns)
   - Recommended to keep under 250 lines for optimal AI context

7. **config.toml references**
   - Ensures `config.toml` references key documentation files
   - Validates `AGENTS.md` and `CLAUDE.md` are referenced

8. **Package scope consistency**
   - Verifies `@grasdouble/` scope is present in all documentation
   - Ensures package naming conventions are consistent

**Exit codes**:

- `0`: All validations passed (may have warnings)
- `1`: Validation failed with errors

**CI Integration**:

The script runs automatically via GitHub Actions:

- On pull requests that modify AI documentation
- On pushes to `main` branch
- Can be triggered manually via workflow_dispatch

See [.github/workflows/validate-docs.yml](../.github/workflows/validate-docs.yml)

**Common errors and fixes**:

| Error                            | Fix                                                             |
| -------------------------------- | --------------------------------------------------------------- |
| Three-layer architecture differs | Ensure all three files have identical architecture descriptions |
| Build commands missing           | Add missing build commands to the affected file                 |
| Broken markdown link             | Fix the link path or create the missing file                    |
| Token package reference missing  | Add `@grasdouble/lufa_design-system-tokens` reference           |
| Unsupported YAML field           | Remove unsupported fields from `.instructions.md` frontmatter   |

**Example output**:

```bash
🔍 Validating AI documentation consistency...

Checking three-layer architecture consistency...
✅ Three-layer architecture present in all files

Checking critical rules consistency...
✅ Token package referenced in all files
✅ Primitives restrictions documented in all files

Checking build commands consistency...
✅ Build commands consistent across all files

Validating YAML frontmatter in .instructions.md files...
✅ All YAML frontmatter valid

Checking markdown links...
✅ All markdown links valid

Checking file sizes for token limits...
✅ CLAUDE.md size acceptable (215 lines)

Checking config.toml references...
✅ config.toml references documentation files

Checking package scope consistency...
✅ Package scope consistent in all files

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ All validations passed!

📊 Summary:
  - Three-layer architecture: consistent
  - Critical rules: documented
  - Build commands: consistent
  - YAML frontmatter: valid
  - Markdown links: valid
  - File sizes: acceptable
  - Config references: valid
  - Package scope: consistent
```

**Maintenance**:

When adding new critical information to AI documentation:

1. Update all three files simultaneously (`AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`)
2. Run `pnpm validate:docs` locally before committing
3. Consider adding new validation checks to the script if needed

**Related documentation**:

- [AGENTS.md](../AGENTS.md) - Primary AI documentation
- [CLAUDE.md](../CLAUDE.md) - Claude Code quick reference
- [.github/copilot-instructions.md](../.github/copilot-instructions.md) - GitHub Copilot instructions

---

## Playwright Snapshot Compression

The snapshot compression scripts have been moved to the Playwright package where they belong.

📍 **Location**: `packages/design-system/playwright/scripts/`

📚 **Full Documentation**: [packages/design-system/playwright/scripts/README.md](../packages/design-system/playwright/scripts/README.md)

**Quick usage**:

```bash
# Manual compression (all snapshots)
pnpm ds:test:compress-snapshots

# Pre-commit hook (automatic for staged snapshots)
# Runs automatically when you commit snapshot files
```

**Scripts**:

- `compress-snapshots-precommit.sh` - Automatic compression via pre-commit hook
- `compress-snapshots-manual.sh` - Manual compression of all snapshots

See the [Playwright scripts README](../packages/design-system/playwright/scripts/README.md) for detailed documentation, usage examples, troubleshooting, and technical details.
