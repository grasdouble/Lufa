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

### Using Validation Script in Development Workflow

The validation script should be integrated into your development workflow to catch token violations early and ensure quality before code review.

#### When to Run the Validation Script

**1. After Implementation, Before Marking Ready for Review (REQUIRED)**

This is part of the [PRE_REVIEW_CHECKLIST.md](../../themes/PRE_REVIEW_CHECKLIST.md) and must be completed before marking a story as "ready for review".

- ✅ Catches violations before code review
- ✅ Reduces review cycles
- ✅ Ensures quality standards are met

**Location in checklist:** Section 3.3 - Build & Validation

```markdown
- [ ] Validation script executed (if applicable): `pnpm validate:tokens`
```

**DO NOT** mark your story as "ready for review" until validation passes with **zero violations**.

**2. During Development (Optional but Recommended)**

Run validation after refactoring each component or section:

- ✅ Provides immediate feedback
- ✅ Catches issues early (easier to fix)
- ✅ Reduces debugging time at the end

**Example workflow:**

```bash
# Refactor a component
code src/css/ocean-docusaurus.css

# Run validation
pnpm validate:tokens

# Fix any violations found
# Repeat until clean
```

**3. In CI/CD Pipeline (Future)**

Automated checks on every commit to prevent hardcoded colors from merging:

- ✅ Quality gate for all PRs
- ✅ Prevents regressions
- ✅ Enforces standards automatically

_Note: CI/CD integration is planned for future sprints._

#### How to Run

**From Docusaurus Package (Recommended):**

```bash
cd packages/design-system/docusaurus
pnpm validate:tokens
```

**From Project Root:**

```bash
pnpm --filter @grasdouble/lufa_design-system-docusaurus validate:tokens
```

**Run Self-Tests (Verify Script is Working):**

```bash
pnpm validate:tokens --test
```

Expected: `✅ All 13 self-tests passed`

#### Interpreting Results

**✅ Success - Zero Violations Found**

```
✅ Token Validation Passed

Scanned Files: 3
Total Lines: 1,245
Violations Found: 0

All files are using design tokens correctly! 🎉
```

**What this means:**

- All hardcoded colors have been replaced with tokens
- Theme CSS is compliant with token conventions
- You can proceed to the next step in your workflow

**Next steps:**

1. Continue with PRE_REVIEW_CHECKLIST.md
2. Complete visual testing (all 3 modes)
3. Update story documentation
4. Mark story as "ready for review"

---

**❌ Failure - Violations Found**

```
❌ Token Validation Failed

Violations Found: 3

📄 ocean-docusaurus.css
  Line 45:28  background: rgba(8, 145, 178, 0.05);
           ^ Use a design token instead of hardcoded rgba: rgba(8, 145, 178, 0.05)
           Suggestion: var(--lufa-alpha-primary-5)

  Line 78:27  border-color: #0891B2;
           ^ Use a design token instead of hardcoded hex: #0891B2
           Suggestion: var(--lufa-primary)

📄 cyberpunk-docusaurus.css
  Line 112:15  box-shadow: 0 0 16px rgba(236, 72, 153, 0.6);
            ^ Use a design token instead of hardcoded rgba: rgba(236, 72, 153, 0.6)
            Suggestion: var(--lufa-glow-box)

Total Violations: 3
Files with Issues: 2
Files Scanned: 3

Exit Code: 1
```

**What this means:**

- Hardcoded colors were detected in your CSS files
- Token replacement is incomplete
- Changes are needed before marking ready for review

**Next steps:**

1. **Navigate to each violation:** Open the file and go to the line number
2. **Replace hardcoded value with token:** Use the suggestion provided
3. **Re-run validation:** `pnpm validate:tokens`
4. **Repeat until clean:** Continue fixing violations until zero violations
5. **Verify with self-test:** `pnpm validate:tokens --test`

**Example fix:**

```css
/* Before (Line 45) */
.ocean-card {
  background: rgba(8, 145, 178, 0.05); /* ❌ Hardcoded */
}

/* After */
.ocean-card {
  background: var(--lufa-alpha-primary-5); /* ✅ Token */
}
```

#### Token Replacement Guide

Use this quick reference to map violations to tokens:

**Alpha Tokens (rgba with opacity):**

- `rgba(R, G, B, 0.03)` → `var(--lufa-alpha-{color}-3)`
- `rgba(R, G, B, 0.05)` → `var(--lufa-alpha-{color}-5)`
- `rgba(R, G, B, 0.08)` → `var(--lufa-alpha-{color}-8)`
- `rgba(R, G, B, 0.1)` → `var(--lufa-alpha-{color}-10)`
- `rgba(R, G, B, 0.15)` → `var(--lufa-alpha-{color}-15)`
- `rgba(R, G, B, 0.2)` → `var(--lufa-alpha-{color}-20)`
- `rgba(R, G, B, 0.3)` → `var(--lufa-alpha-{color}-30)`
- `rgba(R, G, B, 0.4)` → `var(--lufa-alpha-{color}-40)`
- `rgba(R, G, B, 0.5)` → `var(--lufa-alpha-{color}-50)`

**Shadow Tokens (box-shadow):**

- `0 1px 2px rgba(...)` → `var(--lufa-shadow-xs)`
- `0 2px 4px rgba(...)` → `var(--lufa-shadow-sm)`
- `0 4px 8px rgba(...)` → `var(--lufa-shadow-md)`
- `0 8px 16px rgba(...)` → `var(--lufa-shadow-lg)`
- `0 12px 24px rgba(...)` → `var(--lufa-shadow-xl)`

**Overlay Tokens (rgba white/black):**

- `rgba(255, 255, 255, 0.05)` → `var(--lufa-overlay-light-subtle)`
- `rgba(255, 255, 255, 0.1)` → `var(--lufa-overlay-light)`
- `rgba(255, 255, 255, 0.2)` → `var(--lufa-overlay-light-strong)`
- `rgba(0, 0, 0, 0.05)` → `var(--lufa-overlay-dark-subtle)`
- `rgba(0, 0, 0, 0.1)` → `var(--lufa-overlay-dark)`
- `rgba(0, 0, 0, 0.2)` → `var(--lufa-overlay-dark-strong)`

**Glow Tokens (cyber/neon themes only):**

- `0 0 8px rgba(...)` → `var(--lufa-glow-box-subtle)`
- `0 0 16px rgba(...)` → `var(--lufa-glow-box)`
- `0 0 24px rgba(...)` → `var(--lufa-glow-box-strong)`
- `0 0 32px rgba(...)` → `var(--lufa-glow-box-intense)`

For complete token reference, see [TOKENS_CONVENTIONS.md](../../themes/TOKENS_CONVENTIONS.md).

#### Self-Tests

The validation script includes built-in self-tests to verify it's working correctly.

**Run self-tests:**

```bash
pnpm validate:tokens --test
```

**Expected output:**

```
🧪 Running validation script self-tests...

✅ Test 1: Detects hardcoded rgba()
✅ Test 2: Detects hardcoded rgb()
✅ Test 3: Detects hardcoded hsla()
✅ Test 4: Detects hardcoded hsl()
✅ Test 5: Detects hardcoded hex colors
✅ Test 6: Allows CSS variable in rgba()
✅ Test 7: Allows design tokens
✅ Test 8: Allows colors in gradients
✅ Test 9: Reports correct line numbers
✅ Test 10: Handles multiple violations
✅ Test 11: Ignores comments
✅ Test 12: Handles edge cases
✅ Test 13: Validates file patterns

✅ All 13 self-tests passed

Validation script is working correctly! 🎉
```

**If self-tests fail:**

1. Check that script file exists: `scripts/validate-tokens.ts`
2. Verify dependencies are installed: `pnpm install`
3. Check for syntax errors: `pnpm lint`
4. Review recent changes to validation script
5. Consult team if issue persists

#### Integration with PRE_REVIEW_CHECKLIST.md

The validation script is integrated into the pre-review checklist at **Section 3: Build & Validation**:

```markdown
## 3. Build & Validation

- [ ] Build test passes: `cd packages/design-system/themes && pnpm build`
- [ ] Linting passes: `pnpm lint`
- [ ] Validation script executed (if applicable): `pnpm validate:tokens`
- [ ] No console errors or warnings in browser DevTools
```

**Checklist item 3.3 requires:**

- Running `pnpm validate:tokens`
- Achieving **zero violations**
- Fixing any violations found
- Re-running until clean

**DO NOT** mark the checklist item complete until validation passes with zero violations.

**DO NOT** mark your story as "ready for review" until the entire checklist is complete.

#### Exceptions

Some violations may be acceptable in specific cases. If you cannot use tokens, document the exception:

**When exceptions are justified:**

1. **Complex gradients** with multiple color stops that don't map to tokens
2. **Third-party CSS** that cannot be modified
3. **Temporary workarounds** for known issues

**How to handle exceptions:**

1. **Document in story Dev Notes:**

   ```markdown
   ## Dev Notes

   ### Justified Exceptions

   **File:** `ocean-docusaurus.css`, Line 45  
   **Violation:** `background: linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%);`  
   **Justification:** Complex 3-stop gradient does not map to available tokens. Using RGB variables would require splitting into multiple overlays, degrading performance.  
   **Approved By:** Code reviewer (pending)
   ```

2. **Get reviewer approval** during code review
3. **Note in checklist:** "Justified exceptions documented in Dev Notes"
4. **Consider adding new tokens** if pattern is reusable

**Important:** Exceptions should be rare. Most color usage should use tokens.

#### Troubleshooting

**Issue: Validation script not found**

```bash
Error: Cannot find module 'scripts/validate-tokens.ts'
```

**Solution:**

```bash
# Ensure you're in the correct directory
cd packages/design-system/docusaurus

# Verify script exists
ls scripts/validate-tokens.ts
```

---

**Issue: Validation passes but visual bugs exist**

```bash
✅ Token Validation Passed
Violations Found: 0
```

But you see color issues in the browser.

**Solution:**

1. Validation checks syntax, not visual accuracy
2. Ensure RGB variables are defined in base theme file
3. Check that tokens reference correct colors
4. Verify theme switcher is working correctly
5. Test all 3 color modes (light, dark, high-contrast)

---

**Issue: False positives (reports valid tokens as violations)**

**Solution:**

1. Verify you're using correct token format: `var(--lufa-token-name)`
2. Check for typos in token names
3. Ensure tokens are defined in base theme file
4. Run self-tests to verify script is working: `pnpm validate:tokens --test`

---

**Issue: Build passes but validation fails**

```bash
✅ Build completes successfully
❌ Token Validation Failed
```

**Explanation:**

- Build checks CSS syntax (valid CSS)
- Validation checks design system compliance (tokens vs hardcoded colors)
- Both must pass for story to be ready for review

**Solution:**

1. Fix violations reported by validation script
2. Re-run validation until zero violations
3. Then re-run build to ensure no syntax errors introduced

#### Workflow Example

**Complete workflow for ETR-00Y Docusaurus refactoring story:**

```bash
# 1. Open Docusaurus theme file
code packages/design-system/docusaurus/src/css/ocean-docusaurus.css

# 2. Refactor hardcoded colors to tokens
# (replace rgba() with var(--lufa-alpha-*))

# 3. Run validation
cd packages/design-system/docusaurus
pnpm validate:tokens

# 4. If violations found, fix them
# (repeat steps 2-3 until clean)

# 5. Run build
pnpm build

# 6. Start dev server
pnpm dev

# 7. Visual testing (all 3 modes)
# Open http://localhost:3000
# Switch to your theme
# Test light, dark, high-contrast modes

# 8. Run validation one final time
pnpm validate:tokens

# Expected: ✅ 0 violations

# 9. Complete PRE_REVIEW_CHECKLIST.md
code ../themes/PRE_REVIEW_CHECKLIST.md

# 10. Mark story as "ready for review"
```

#### Additional Resources

- **Token Conventions:** `packages/design-system/themes/TOKENS_CONVENTIONS.md`
- **Token Template:** `packages/design-system/themes/src/_token-template.css`
- **Pre-Review Checklist:** `packages/design-system/themes/PRE_REVIEW_CHECKLIST.md`
- **Implementation Guide:** `packages/design-system/themes/README.md` (section: Theme Refactoring Implementation Guide)
- **Epic 1 Retrospective:** `_bmad-output/retrospectives/epic-1-retro-2026-02-11.md`

---

**Questions or Issues?**

If you encounter issues with the validation script:

1. Run self-tests: `pnpm validate:tokens --test`
2. Review Epic 1 stories (ETR-005) for validation script details
3. Check token conventions document for correct token names
4. Consult implementation guide for token replacement examples
5. Ask team for help if issue persists

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
