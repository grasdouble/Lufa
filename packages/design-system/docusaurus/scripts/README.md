# Docusaurus Scripts

This directory contains automation scripts for maintaining the Docusaurus documentation site.

## Table of Contents

- [validate-tokens.ts](#validate-tokents) - Design token validation
- [update-changelog.js](#update-changelogjs) - Changelog automation

---

## `validate-tokens.ts`

Validates that all theme CSS files use design tokens instead of hardcoded color values (rgba/rgb/hsla/hsl/hex).

**Usage:**

```bash
# From repository root
pnpm --filter @grasdouble/lufa_design-system-docusaurus validate:tokens

# From this package
cd packages/design-system/docusaurus
pnpm validate:tokens

# Run self-tests
pnpm validate:tokens --test

# Strict mode (no exceptions for gradients)
pnpm validate:tokens --strict

# Direct execution
tsx scripts/validate-tokens.ts
```

**What it does:**

1. Scans all `*-docusaurus.css` files in `src/css/`
2. Detects hardcoded color functions:
   - `rgba(r, g, b, a)` - ❌ Hardcoded RGBA
   - `rgb(r, g, b)` - ❌ Hardcoded RGB
   - `hsla(h, s%, l%, a)` - ❌ Hardcoded HSLA
   - `hsl(h, s%, l%)` - ❌ Hardcoded HSL
   - `#RRGGBB` or `#RGB` - ❌ Hardcoded hex colors
3. Reports violations with file path, line number, and context
4. Exits with code 0 (success) or 1 (violations found)

**Detection Patterns:**

- **Violations detected:**
  - `rgba(184, 115, 51, 0.05)` ❌
  - `rgb(255, 0, 0)` ❌
  - `hsla(120, 100%, 50%, 0.5)` ❌
  - `hsl(240, 100%, 50%)` ❌
  - `#B87333`, `#F00` ❌
- **Allowed patterns:**
  - `var(--lufa-color-primary)` ✅
  - `rgba(var(--r), var(--g), var(--b), 0.5)` ✅ (CSS variables)
  - Colors in `linear-gradient()` or `radial-gradient()` ✅ (default mode)

**Configuration:**

Create `.validate-tokens.json` in the package root for custom settings:

```json
{
  "scanDirectory": "src/css",
  "scanPattern": "-docusaurus.css",
  "exceptions": ["linear-gradient", "radial-gradient"],
  "allowGradients": true,
  "allowedFiles": ["landing-themes.css"]
}
```

See `.validate-tokens.json.example` for a complete example.

**Output Example (Success):**

```
✅ Token Validation Passed

Scanned Files: 10
Total Lines: 2,450
Violations Found: 0

All files are using design tokens correctly! 🎉
```

**Output Example (Violations):**

```
❌ Token Validation Failed

Violations Found: 3

📄 src/css/ocean-docusaurus.css
  Line 45:28  background: rgba(8, 145, 178, 0.05);
           ^ Use a design token instead of hardcoded rgba: rgba(8, 145, 178, 0.05)

  Line 78:27  border-color: #0891B2;
           ^ Use a design token instead of hardcoded hex: #0891B2

Total Violations: 3
Files with Issues: 1
Files Scanned: 10

Exit Code: 1
```

**CI/CD Integration:**

The validation runs automatically on PRs that modify CSS files via GitHub Actions:

```yaml
# .github/workflows/validate-design-tokens.yml
- name: Validate design tokens
  run: |
    cd packages/design-system/docusaurus
    pnpm validate:tokens
```

**Use Cases:**

- Ensure theme refactoring is complete
- Prevent hardcoded colors from being introduced
- Validate token migration across all themes
- Quality gate in CI/CD pipeline

**Related:**

- Epic: ETR-EPIC-001 (Infrastructure & Tokens Foundation)
- Story: ETR-005 (Create Validation Script)
- Dependencies: ETR-003, ETR-004 (Steampunk theme tokens)

---

## `update-changelog.js`

Automatically updates the changelog documentation from package CHANGELOG.md files.

For detailed documentation, see [UPDATE_CHANGELOG.md](./UPDATE_CHANGELOG.md).

**Quick Usage:**

```bash
pnpm --filter @grasdouble/lufa_design-system-docusaurus update-changelog
```

**What it does:**

- Reads package CHANGELOG.md files
- Updates Recent Releases section in docs/changelog.md
- Updates version config in docusaurus.config.ts
- Preserves all other content

**Related Files:**

- Script: [`update-changelog.js`](./update-changelog.js)
- Workflow: [`.github/workflows/tools-ds-docusaurus-update-changelog-docs.yml`](../../../.github/workflows/tools-ds-docusaurus-update-changelog-docs.yml)
- Full Documentation: [`UPDATE_CHANGELOG.md`](./UPDATE_CHANGELOG.md)
