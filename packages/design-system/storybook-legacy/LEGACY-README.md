# 📦 Lufa Design System - Storybook (Legacy)

**⚠️ ARCHIVED PACKAGE - DO NOT USE FOR NEW DEVELOPMENT**

This package contains the **legacy Storybook stories** for the old Lufa Design System architecture (pre-v2).

---

## 🗄️ Archive Information

**Archived Date:** 2026-01-23  
**Reason:** Design System v2 implementation with Token Architecture v2  
**Phase:** Phase 5A - Component reimplementation

---

## 📋 Contents

This package contains **62 legacy Storybook stories** for the old component library:

**Stories archived:**

- Layout components (Stack, Container, Grid, Flex, etc.)
- Navigation components (Anchor, Breadcrumb, Link, Menu, etc.)
- Form components (Button, Input, etc.)
- Display components (Card, Paper, Avatar, Badge, etc.)
- Feedback components (Alert, Spinner, Skeleton)
- Overlay components (Modal)
- Pattern examples (Testimonial)

---

## 🔄 Migration Path

### New Storybook Package

**Location:** `packages/design-system/storybook/`  
**Stories:** New Phase 5A components with Token Architecture v2

**Current new stories:**

- ✅ Box (Primitives/Box) - 9 stories

**To be added (Phase 5A):**

- Text, Stack, Icon, Button, Badge, Divider

---

## 🚫 Why This Package Exists

**Purpose:** Preserve legacy stories for reference during migration

**Benefits:**

1. **Reference:** Legacy stories can be consulted during component reimplementation
2. **Comparison:** Compare old vs new implementations
3. **No conflicts:** Legacy package doesn't interfere with new development
4. **Safety:** Can revert if needed (emergency fallback)

**This package is NOT intended for:**

- ❌ New component development
- ❌ Production usage
- ❌ Publishing to registry
- ❌ Active maintenance

---

## 🎯 Current Status

**New Storybook (packages/design-system/storybook/):**

- ✅ Box component stories
- ⏳ Text, Stack, Icon, Button, Badge, Divider (Phase 5A pending)

**Legacy Storybook (this package):**

- 🗄️ 62 legacy stories preserved
- 🔒 No new stories will be added
- 📖 Read-only reference

---

## 🔧 How to Use (Reference Only)

### View Legacy Stories

```bash
# From this package directory
cd packages/design-system/storybook-legacy
pnpm dev
# → http://localhost:6006
```

**Note:** Legacy stories reference old components from `main-legacy` package.

---

## 📚 Documentation

**Phase 5A Documentation:**

- Component implementation: `_bmad-output/phase-5a/`
- Architecture: `_bmad-output/analysis/brainstorming-session-2026-01-22.md`
- Token Architecture v2: `packages/design-system/tokens/README.md`

**Legacy Documentation:**

- Old component docs: `packages/design-system/docusaurus-legacy/`

---

## 🗑️ Future Deletion

**When will this package be deleted?**

This package will be removed after:

1. ✅ All Phase 5A components implemented (Box, Text, Stack, Icon, Button, Badge, Divider)
2. ✅ Phase 6+ components implemented as needed
3. ✅ Legacy components fully migrated to new architecture
4. ✅ Team consensus that legacy reference no longer needed

**Estimated timeline:** Q2 2026 (after Phase 6 completion)

---

## 📞 Questions?

**For new component development:**

- Use `packages/design-system/storybook/` (new package)
- Follow patterns in `Box.stories.tsx`
- Reference `.github/instructions/lufa-design-system-storybook-stories.instructions.md`

**For legacy reference:**

- This package provides read-only access to old stories
- Do not modify stories in this package

---

**Archive Date:** 2026-01-23  
**Archived By:** Phase 5A Implementation  
**Status:** 🗄️ Read-Only Archive
