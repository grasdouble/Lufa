# 📦 Lufa Design System - Playwright (Legacy)

**⚠️ ARCHIVED PACKAGE - DO NOT USE FOR NEW DEVELOPMENT**

This package contains the **legacy Playwright component tests** for the old Lufa Design System architecture (pre-v2).

---

## 🗄️ Archive Information

**Archived Date:** 2026-01-23  
**Reason:** Design System v2 implementation with Token Architecture v2  
**Phase:** Phase 5A - Component reimplementation

---

## 📋 Contents

This package contains **31 legacy Playwright component tests** for the old component library:

**Tests archived:**

- Layout components (Stack, Container, Grid, Flex, etc.)
- Navigation components (Anchor, Breadcrumb, Link, Menu, etc.)
- Form components (Button, Input, etc.)
- Display components (Card, Paper, Avatar, Badge, etc.)
- Feedback components (Alert, Spinner, Skeleton)
- Overlay components (Modal)

**Total snapshots:** Multiple visual regression snapshots (Darwin, Linux)

---

## 🔄 Migration Path

### New Playwright Package

**Location:** `packages/design-system/playwright/`  
**Tests:** New Phase 5A components with Token Architecture v2

**Current new tests:**

- ⏳ Box.spec.tsx (to be created - Step 4)

**To be added (Phase 5A):**

- Text, Stack, Icon, Button, Badge, Divider

---

## 🚫 Why This Package Exists

**Purpose:** Preserve legacy tests for reference during migration

**Benefits:**

1. **Reference:** Legacy tests show expected behavior patterns
2. **Comparison:** Compare old vs new test approaches
3. **Coverage baseline:** Ensure new tests match or exceed coverage
4. **No conflicts:** Legacy tests don't interfere with new test suite

**This package is NOT intended for:**

- ❌ New test development
- ❌ CI/CD pipeline
- ❌ Active maintenance
- ❌ Snapshot updates

---

## 🎯 Current Status

**New Playwright (packages/design-system/playwright/):**

- ⏳ Box.spec.tsx (Step 4 - to be created)
- ⏳ Text, Stack, Icon, Button, Badge, Divider (Phase 5A pending)

**Legacy Playwright (this package):**

- 🗄️ 31 legacy tests preserved
- 🗄️ Visual regression snapshots preserved
- 🔒 No new tests will be added
- 📖 Read-only reference

---

## 🔧 How to Use (Reference Only)

### View Legacy Tests

```bash
# From this package directory
cd packages/design-system/playwright-legacy
pnpm test-ct:ui
# Interactive UI mode to explore tests
```

**Note:** Legacy tests reference old components from `main-legacy` package.

---

## 📊 Test Patterns to Migrate

**Good patterns from legacy tests:**

- ✅ Visual regression with snapshots (Darwin + Linux)
- ✅ Accessibility testing (keyboard, ARIA, focus)
- ✅ Props validation
- ✅ Interaction testing (click, hover, etc.)
- ✅ Responsive testing

**New patterns to add in v2:**

- ✅ Utility class validation (verify CSS classes applied)
- ✅ Token-based styling tests
- ✅ Polymorphic component tests

---

## 📚 Documentation

**Phase 5A Documentation:**

- Test guidelines: `.github/instructions/lufa-design-system-playwright-ct.instructions.md`
- Component implementation: `_bmad-output/phase-5a/`

**Legacy Test Examples:**

- Reference this package for test structure ideas
- Do NOT copy/paste directly (architecture changed)

---

## 🗑️ Future Deletion

**When will this package be deleted?**

This package will be removed after:

1. ✅ All Phase 5A components have tests (Box, Text, Stack, Icon, Button, Badge, Divider)
2. ✅ Test coverage equals or exceeds legacy
3. ✅ Visual regression snapshots established for new components
4. ✅ Team consensus that legacy reference no longer needed

**Estimated timeline:** Q2 2026 (after Phase 6 completion)

---

## 📞 Questions?

**For new test development:**

- Use `packages/design-system/playwright/` (new package)
- Follow patterns in `.github/instructions/lufa-design-system-playwright-ct.instructions.md`
- Reference `Box.spec.tsx` once created (Step 4)

**For legacy reference:**

- This package provides read-only access to old tests
- Do not modify tests in this package

---

**Archive Date:** 2026-01-23  
**Archived By:** Phase 5A Implementation  
**Status:** 🗄️ Read-Only Archive
