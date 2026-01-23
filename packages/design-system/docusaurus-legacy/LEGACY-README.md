# 📦 Lufa Design System - Docusaurus (Legacy)

**⚠️ ARCHIVED PACKAGE - DO NOT USE FOR NEW DEVELOPMENT**

This package contains the **legacy Docusaurus documentation** for the old Lufa Design System architecture (pre-v2).

---

## 🗄️ Archive Information

**Archived Date:** 2026-01-23  
**Reason:** Design System v2 implementation with Token Architecture v2  
**Phase:** Phase 5A - Component reimplementation

---

## 📋 Contents

This package contains **43 legacy documentation pages** for the old component library:

**Documentation archived:**

- Getting started guides
- Component API docs (29 legacy components)
- Design principles
- Accessibility guidelines
- Migration guides (v1 → v2 will be added to new docs)
- Storybook integration guides

---

## 🔄 Migration Path

### New Docusaurus Package

**Location:** `packages/design-system/docusaurus/`  
**Docs:** New Phase 5A components with Token Architecture v2

**Current new docs:**

- ⏳ To be created after component implementation

**Documentation priority (Phase 5A):**

1. Getting Started (setup, installation, basic usage)
2. Token Architecture v2 (primitives → core → semantic → component layers)
3. Component API docs (Box, Text, Stack, Icon, Button, Badge, Divider)
4. Migration guide (legacy v1 → new v2)

---

## 🚫 Why This Package Exists

**Purpose:** Preserve legacy documentation for reference during migration

**Benefits:**

1. **Reference:** Legacy docs explain old architecture decisions
2. **Content reuse:** Some content (accessibility, design principles) can be migrated
3. **Migration guide:** Compare old vs new API for migration documentation
4. **No conflicts:** Legacy docs don't interfere with new documentation

**This package is NOT intended for:**

- ❌ New documentation development
- ❌ Publishing to production site
- ❌ Active maintenance
- ❌ User-facing documentation

---

## 🎯 Current Status

**New Docusaurus (packages/design-system/docusaurus/):**

- ⏳ Clean slate, ready for Phase 5A documentation
- ⏳ Box component API docs (after implementation)
- ⏳ Token Architecture v2 explanation

**Legacy Docusaurus (this package):**

- 🗄️ 43 legacy docs preserved
- 🔒 No new docs will be added
- 📖 Read-only reference

---

## 🔧 How to Use (Reference Only)

### View Legacy Docs

```bash
# From this package directory
cd packages/design-system/docusaurus-legacy
pnpm dev
# → http://localhost:3001
```

**Note:** Legacy docs reference old components from `main-legacy` package.

---

## 📝 Content to Migrate

**Reusable content:**

- ✅ Accessibility guidelines (WCAG 2.1 AA compliance)
- ✅ Design principles
- ✅ Color system explanation (update for new tokens)
- ✅ Spacing system explanation (update for new tokens)

**Content to rewrite:**

- ❌ Component API docs (new architecture, new props)
- ❌ Installation guides (new package structure)
- ❌ Theming guides (new token system)

**New content to create:**

- ✅ Token Architecture v2 explanation
- ✅ Utilities system documentation
- ✅ Migration guide (v1 → v2)
- ✅ Performance optimization guide

---

## 📚 Documentation Strategy

**Phase 5A Documentation Plan:**

1. **Week 1-2:** Component implementation (Box, Text, Stack)
   - Create API docs after each component
   - Include code examples, props table, usage guidelines

2. **Week 3:** UI Components (Icon, Button, Badge, Divider)
   - Create API docs
   - Add interactive examples

3. **Week 4:** Comprehensive guides
   - Getting Started guide
   - Token Architecture v2 deep dive
   - Migration guide (legacy → v2)
   - Best practices

**Documentation template:** `.github/instructions/lufa-design-system-docusaurus-docs.instructions.md`

---

## 🗑️ Future Deletion

**When will this package be deleted?**

This package will be removed after:

1. ✅ All Phase 5A components documented (Box, Text, Stack, Icon, Button, Badge, Divider)
2. ✅ Token Architecture v2 fully documented
3. ✅ Migration guide created
4. ✅ Reusable content migrated to new docs
5. ✅ Team consensus that legacy reference no longer needed

**Estimated timeline:** Q2 2026 (after Phase 6 completion)

---

## 📞 Questions?

**For new documentation:**

- Use `packages/design-system/docusaurus/` (new package)
- Follow `.github/instructions/lufa-design-system-docusaurus-docs.instructions.md`
- Reference API docs template

**For legacy reference:**

- This package provides read-only access to old documentation
- Do not modify docs in this package

---

**Archive Date:** 2026-01-23  
**Archived By:** Phase 5A Implementation  
**Status:** 🗄️ Read-Only Archive
