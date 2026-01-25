# Scripts

This directory contains utility scripts for the Lufa project.

## validate-token-metadata.js

**Purpose**: Validates Design Token metadata to ensure all tokens have required documentation and follow DTCG standards.

**Usage**:

```bash
# Via npm script (recommended)
pnpm validate:tokens

# Or directly
node scripts/validate-token-metadata.js
```

**What it validates**:

1. **Required metadata fields**
   - `$description`: Human-readable description (minimum 10 characters)
   - `$type`: Valid DTCG token type (color, dimension, fontFamily, etc.)
   - `$extensions.lufa.themable`: Boolean indicating if token can be themed

2. **Token type validation**
   - Checks `$type` against valid DTCG types:
     - `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`
     - `number`, `strokeStyle`, `border`, `transition`, `shadow`, `gradient`, `typography`
   - Warns if unknown type is used

3. **Description quality**
   - Ensures descriptions are meaningful (>10 characters)
   - Warns about overly short descriptions

4. **JSON syntax**
   - Validates JSON file structure
   - Reports parsing errors with file location

**Exit codes**:

- `0`: All validations passed
- `1`: Validation failed with errors

**Example output (success)**:

```bash
🔍 Token Metadata Validation Report
================================================================================

Total Tokens Validated: 24
✓ Valid Tokens: 24
✗ Tokens with Errors: 0
⚠ Warnings: 0

✓ All tokens have valid metadata!

================================================================================

Validation passed successfully!
```

**Example output (errors)**:

```bash
━━━ ERRORS (2) ━━━

packages/design-system/tokens/src/colors.json
  ✗ color.primary
    Missing required field: $description

  ✗ color.secondary
    Missing $extensions.lufa.themable (should be true or false)

💡 How to fix:
   • Add $description: Describe the token's purpose
   • Add $type: Specify DTCG type (color, dimension, etc.)
   • Add $extensions.lufa.themable: Set to true or false
   • See: docs/contributors/your-first-token.md
```

**CI Integration**:

The script runs automatically via GitHub Actions:

- On PRs that modify token files (`packages/design-system/tokens/src/**/*.json`)
- On pushes to `main` branch
- Can be triggered manually via workflow_dispatch
- **Blocking**: PRs with token validation errors cannot be merged

See [.github/workflows/validate-tokens.yml](../.github/workflows/validate-tokens.yml)

**GitHub Actions Bot**:

When validation fails on a PR, the bot automatically comments with:

- ❌ Validation failure summary
- 📋 Detailed validation report
- 💡 How to fix instructions
- 📚 Links to documentation and VSCode snippets

**VSCode Snippets**:

To make token creation easier, use the provided VSCode snippets:

**Location**: `.vscode/lufa-tokens.code-snippets`

**Available snippets**:

| Snippet                      | Description                   |
| ---------------------------- | ----------------------------- |
| `lufa-token-color`           | Color token with metadata     |
| `lufa-token-dimension`       | Spacing/sizing token          |
| `lufa-token-ref`             | Token that references another |
| `lufa-token-primitive-color` | Primitive color (Level 0)     |
| `lufa-token-core`            | Core token (Level 1)          |
| `lufa-token-semantic`        | Semantic token (Level 2)      |
| `lufa-token-component`       | Component token (Level 3)     |

**Quick usage**:

1. Open a `.json` file in `packages/design-system/tokens/src/`
2. Type snippet prefix (e.g., `lufa-token-color`)
3. Press `Tab` to expand
4. Fill in values (use `Tab` to navigate)

**Related documentation**:

- 📖 [Your First Token Guide](../docs/contributors/your-first-token.md) - 5-minute onboarding
- 🏗️ [Roadmap v2.0](../_bmad-output/analysis/roadmap-implementation-v2.0.md) - Phase 0 Action #2
- ✂️ [VSCode Snippets](../.vscode/lufa-tokens.code-snippets) - Token creation templates

**Part of**: Lufa Design System v2.0 - Phase 0 Action #2 (Mitigation Maintenance Metadata)

---

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
