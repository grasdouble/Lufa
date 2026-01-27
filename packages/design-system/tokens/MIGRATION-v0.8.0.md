# Migration Guide: v0.7.x → v0.8.0

**Release Date:** 2026-01-27  
**Migration Time:** ~15 minutes  
**Breaking Changes:** Metadata schema only (no visual changes)  
**Risk Level:** 🟢 LOW

---

## Table of Contents

1. [Overview](#overview)
2. [Who Needs to Migrate?](#who-needs-to-migrate)
3. [Breaking Changes](#breaking-changes)
4. [Migration Steps](#migration-steps)
5. [Testing Checklist](#testing-checklist)
6. [Rollback Plan](#rollback-plan)
7. [FAQ](#faq)

---

## Overview

Version 0.8.0 introduces **ADR-011: Token Architecture Clarification**, which establishes clear architectural boundaries between immutable primitives and context-aware semantic tokens.

### What Changed?

| Area                  | Change                              | Impact                          |
| --------------------- | ----------------------------------- | ------------------------------- |
| **Token Metadata**    | `themable` → `themeable` (typo fix) | Breaking for metadata readers   |
| **Token Metadata**    | New required field: `modeAware`     | Breaking for metadata readers   |
| **CSS Output**        | Better organization, same variables | No breaking changes             |
| **Validation**        | Automatic validation in prebuild    | Fails build if violations exist |
| **Visual Appearance** | None                                | Zero visual changes ✅          |

### What Didn't Change?

- ✅ **CSS variable names** - All variables remain identical
- ✅ **Token values** - All colors, spacing, etc. unchanged
- ✅ **Component APIs** - No React component changes
- ✅ **Build output** - CSS file functionally identical
- ✅ **Runtime behavior** - No JavaScript changes

---

## Who Needs to Migrate?

### ✅ You MUST Migrate If:

- You're **reading token metadata** programmatically (JavaScript/TypeScript)
- You're **creating custom tokens** that extend the system
- You're **building tools** that parse token files (CLIs, validators, etc.)

### 🟡 You SHOULD Test If:

- You're using tokens in **production applications**
- You have **custom Storybook stories** with token usage
- You have **visual regression tests**

### 🟢 No Action Required If:

- You **only consume CSS variables** in your components
- You **don't read token metadata** programmatically
- You **use components as-is** without customization

**For most users:** Just update the package and rebuild. No code changes needed!

---

## Breaking Changes

### 1. Token Metadata Schema

#### Before (v0.7.x)

```json
{
  "$extensions": {
    "lufa": {
      "themable": true, // ❌ Typo
      "level": "primitive"
    }
  }
}
```

#### After (v0.8.0)

```json
{
  "$extensions": {
    "lufa": {
      "themeable": true, // ✅ Correct spelling
      "modeAware": false, // ✅ New required field
      "level": "primitive"
    }
  }
}
```

#### Migration Action

**If you read token metadata in JavaScript/TypeScript:**

```typescript
// ❌ Before (will break)
if (token.$extensions.lufa.themable === true) {
  // Handle themeable tokens
}

// ✅ After (correct)
if (token.$extensions.lufa.themeable === true) {
  // Handle themeable tokens
}

// ✅ New: Handle mode-aware tokens
if (token.$extensions.lufa.modeAware === true) {
  // This token has light/dark/high-contrast variants
}
```

### 2. Primitive Token Architecture

**Conceptual Change:** Primitives are now enforced as **immutable constants**.

```json
// ❌ INVALID - Will fail validation
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "themeable": true,   // ❌ Primitives cannot be themeable
              "modeAware": true    // ❌ Primitives cannot be mode-aware
            }
          }
        }
      }
    }
  }
}

// ✅ VALID - Primitives are immutable
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "themeable": false,   // ✅ Immutable constant
              "modeAware": false    // ✅ Never varies
            }
          }
        }
      }
    }
  }
}
```

**Why This Matters:**

- Primitives = paint catalog (e.g., `blue-600` always means `#2563eb`)
- Mode switching happens at **semantic layer** by referencing different primitives
- Follows industry standards (Material Design 3, Tailwind, Chakra)

---

## Migration Steps

### Step 1: Update Package

```bash
# Update to v0.8.0
pnpm update @grasdouble/lufa_design-system-tokens

# Or install specific version
pnpm add @grasdouble/lufa_design-system-tokens@0.8.0
```

### Step 2: Update Dependent Packages (if applicable)

```bash
# Update design system components
pnpm update @grasdouble/lufa_design-system

# Update Storybook package
pnpm update @grasdouble/lufa_design-system-storybook
```

### Step 3: Rebuild Your Project

```bash
# Clean build
pnpm clean
pnpm build

# Or rebuild specific packages
cd packages/design-system/tokens
pnpm build
```

**Expected output:**

```
✓ Validating tokens... (535 tokens)
✓ Building tokens...
✓ CSS output: 68.46 KB
```

### Step 4: Update Metadata Readers (if applicable)

**If you have code that reads token metadata:**

```typescript
// File: src/utils/token-parser.ts

// ❌ Before (v0.7.x)
interface OldTokenMetadata {
  level: string;
  themable: boolean; // Typo
}

function isThemeable(token: any): boolean {
  return token.$extensions?.lufa?.themable === true;
}

// ✅ After (v0.8.0)
interface NewTokenMetadata {
  level: 'primitive' | 'core' | 'semantic' | 'component' | 'layout';
  themeable: boolean; // Correct spelling
  modeAware: boolean; // New field
}

function isThemeable(token: any): boolean {
  return token.$extensions?.lufa?.themeable === true;
}

function isModeAware(token: any): boolean {
  return token.$extensions?.lufa?.modeAware === true;
}
```

### Step 5: Update Custom Tokens (if applicable)

**If you've created custom token files:**

Run the migration scripts:

```bash
cd packages/design-system/tokens

# Migrate primitive tokens
node scripts/migrate-primitive-metadata.js

# Migrate semantic/component tokens
node scripts/migrate-semantic-metadata.js
```

**Or manually update:**

```diff
{
  "my-custom-token": {
    "$value": "#ff0000",
    "$extensions": {
      "lufa": {
        "level": "primitive",
-       "themable": false,
+       "themeable": false,
+       "modeAware": false
      }
    }
  }
}
```

### Step 6: Run Validation

```bash
cd packages/design-system/tokens
pnpm validate:tokens
```

**Expected output (success):**

```
✓ Validating token metadata...
✓ All tokens valid (535 tokens checked)
✓ 0 errors found
```

**If validation fails:**

```
✗ Validation failed: 12 errors found

Error: primitive.color.blue.600
  - Primitives cannot have themeable: true

Error: core.brand.primary
  - Token has modes but modeAware: false
```

**Fix errors and run validation again.**

---

## Testing Checklist

### Automated Tests

- [ ] **Build succeeds:** `pnpm build` exits with code 0
- [ ] **Validation passes:** `pnpm validate:tokens` shows 0 errors
- [ ] **Test suite passes:** `pnpm test:validator` all tests green
- [ ] **CSS output generated:** `dist/tokens.css` exists and is 68.46 KB
- [ ] **No console errors:** Check for warnings/errors in build output

### Manual Tests

- [ ] **Components render correctly:** Visual spot-check in Storybook
- [ ] **Light mode works:** Test light mode in browser
- [ ] **Dark mode works:** Test dark mode in browser (`[data-mode='dark']`)
- [ ] **High-contrast mode works:** Test HC mode (`[data-mode='high-contrast']`)
- [ ] **Spacing unchanged:** Verify padding/margins look correct
- [ ] **Colors unchanged:** Verify all colors match v0.7.x
- [ ] **Typography unchanged:** Verify font sizes and weights

### Visual Regression (Recommended)

If you have visual regression tests (Chromatic, Percy, etc.):

```bash
# Run visual regression tests
pnpm test:visual

# Expected result: 0 visual differences
```

**If you don't have visual regression tests:** Consider taking screenshots of key pages before/after to manually compare.

---

## Rollback Plan

### If You Encounter Critical Issues

#### Option 1: Rollback Package Version (Quick)

```bash
# Rollback to v0.7.x
pnpm add @grasdouble/lufa_design-system-tokens@0.7.1

# Rebuild
pnpm clean && pnpm build
```

**Time:** 2-5 minutes

#### Option 2: Rollback Git Commit (Full)

```bash
# Find the upgrade commit
git log --oneline | grep "0.8.0"

# Revert the commit
git revert <commit-hash>

# Rebuild
pnpm install
pnpm build
```

**Time:** 5-10 minutes

#### Option 3: Pin Version (Temporary)

If you need time to fix issues:

```json
// package.json
{
  "dependencies": {
    "@grasdouble/lufa_design-system-tokens": "0.7.1" // Pin to old version
  }
}
```

```bash
pnpm install
```

### When to Rollback?

| Issue                   | Severity    | Action                            |
| ----------------------- | ----------- | --------------------------------- |
| Validation errors       | 🟡 Medium   | Fix errors, don't rollback        |
| Visual regressions      | 🔴 High     | Investigate, consider rollback    |
| Build failures          | 🟡 Medium   | Check error logs, fix or rollback |
| Production app broken   | 🔴 Critical | **Immediate rollback**            |
| Metadata parsing errors | 🟡 Medium   | Fix code, don't rollback          |

---

## FAQ

### Q1: Will this change how my components look?

**A:** No. This is a **metadata-only change**. All CSS variables remain identical, and all visual appearance is preserved.

```css
/* These work exactly the same */
.component {
  color: var(--lufa-core-brand-primary); /* ✅ Same */
  background: var(--lufa-semantic-ui-surface); /* ✅ Same */
  padding: var(--lufa-spacing-md); /* ✅ Same */
}
```

### Q2: Do I need to update my component code?

**A:** Only if you're **reading token metadata** programmatically. If you're just using CSS variables, no changes needed.

### Q3: What if I have custom tokens?

**A:** Run the migration scripts:

```bash
node packages/design-system/tokens/scripts/migrate-semantic-metadata.js
```

Or manually add the `modeAware` field and fix the `themable` typo.

### Q4: Why did you change the spelling from "themable" to "themeable"?

**A:** "Themable" was a typo. The correct English word is "themeable" (theme + able = themeable).

### Q5: What's the difference between `themeable` and `modeAware`?

**A:**

- **`themeable`:** Can vary by **theme** (branding: Lufa vs Partner)
- **`modeAware`:** Can vary by **mode** (accessibility: light/dark/high-contrast)

These are **orthogonal concerns**:

```html
<body data-color-theme="partner" data-mode="dark">
  <!-- Combines partner branding + dark mode -->
</body>
```

### Q6: Why can't primitives be mode-aware anymore?

**A:** Primitives are **immutable constants** (like `Math.PI`). They represent the "paint catalog" and never change.

Mode switching happens at the **semantic layer** by referencing different primitives:

```json
// Semantic token (mode-aware)
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}", // Light mode
        "$extensions": {
          "lufa": {
            "modeAware": true,
            "modes": {
              "light": "{primitive.color.blue.600}", // Reference different primitive
              "dark": "{primitive.color.blue.400}" // Reference different primitive
            }
          }
        }
      }
    }
  }
}
```

### Q7: Will this affect my bundle size?

**A:** CSS file increased by **+12.2%** (61 KB → 68.46 KB) due to:

- Documentation comments (~5 KB, strippable in production)
- More explicit mode selectors

**Mitigation:** Gzip compression reduces this to ~4 KB increase in production.

### Q8: How do I validate my tokens after migration?

**A:**

```bash
cd packages/design-system/tokens
pnpm validate:tokens
```

Expected: `✓ All tokens valid (535 tokens checked)`

### Q9: What if validation fails?

**A:** Read the error message carefully:

```
Error: primitive.color.blue.600
  - Primitives cannot have themeable: true

Fix: Set "themeable": false
```

**Common fixes:**

1. Primitive with `themeable: true` → Set to `false`
2. Token has `modes` but `modeAware: false` → Set to `true`
3. Typo `themable` → Change to `themeable`

### Q10: Can I skip this upgrade?

**A:** Yes, but not recommended. v0.7.x will continue to work, but:

- ❌ You won't get future architectural improvements
- ❌ You won't benefit from validation (may have hidden errors)
- ❌ Future releases will require v0.8.0+

---

## Support

### Getting Help

- **Documentation:** `_bmad-output/adrs/ADR-011-token-architecture-primitives-immutable.md`
- **Issues:** File a GitHub issue with `[v0.8.0 Migration]` prefix
- **Emergency:** If production is broken, rollback immediately and file an issue

### Reporting Issues

When reporting migration issues, include:

1. **Error message:** Full console output
2. **Environment:** Node version, pnpm version
3. **Package version:** `pnpm list @grasdouble/lufa_design-system-tokens`
4. **Steps to reproduce:** What commands you ran
5. **Expected vs actual:** What should happen vs what happened

### Community

- **Slack:** #design-system channel
- **Office Hours:** Fridays 2-3 PM (post-release support)

---

## Summary

### ✅ What You Need to Do

1. **Update package:** `pnpm update @grasdouble/lufa_design-system-tokens`
2. **Rebuild:** `pnpm build`
3. **Test:** Verify components look correct
4. **(Optional) Update metadata readers:** Fix `themable` → `themeable` typo

### 🕐 Time Required

- **Basic migration:** 5 minutes
- **With custom tokens:** 15 minutes
- **With metadata readers:** 30 minutes
- **Full QA testing:** 1-2 hours

### 🎯 Success Criteria

- ✅ Build succeeds without errors
- ✅ Validation passes (0 errors)
- ✅ Components look identical to v0.7.x
- ✅ Light/dark/high-contrast modes work

### 📞 Need Help?

If you're stuck, **don't panic!** You can always:

1. Rollback to v0.7.1
2. File a GitHub issue
3. Ask in Slack #design-system

---

**Good luck with your migration! 🚀**

**Questions?** File an issue or ping us in Slack.

**Date:** 2026-01-27  
**Version:** 0.8.0  
**Status:** Production Ready ✅
