# Release Notes: v0.8.0

**Design System:** Lufa Design System  
**Version:** v0.8.0-alpha.1  
**Release Date:** TBD (Pending testing completion)  
**Release Type:** Alpha Release  
**Migration Difficulty:** 🟡 Medium (2 breaking changes, 3 deprecations)

---

## 🎉 Highlights

Lufa Design System v0.8.0 introduces a **comprehensive responsive spacing and layout token system**, bringing 47 new tokens, automatic media query generation, and a mobile-first approach to responsive design.

**Key Features:**

- ✨ **6 Breakpoint Tokens** - Mobile-first responsive system (320px → 1536px)
- ✨ **8 Height Tokens** - Semantic component height scale
- ✨ **18 Responsive Layout Variants** - Automatic media query adaptation
- ✨ **Fluid Spacing Tokens** - Smooth viewport-based scaling
- ✨ **Grid System Tokens** - Standardized gaps and columns
- 🐛 **Box Component Bug Fix** - `padding="none"` now correctly applies 0px
- 📚 **Comprehensive Documentation** - Token usage guide, migration guide, responsive design guide

---

## 📦 What's New

### Breakpoint Token System

A new 6-breakpoint system aligned with modern standards:

```css
:root {
  --lufa-primitive-breakpoint-xs: 320px; /* Mobile portrait */
  --lufa-primitive-breakpoint-sm: 640px; /* Mobile landscape */
  --lufa-primitive-breakpoint-md: 768px; /* Tablets */
  --lufa-primitive-breakpoint-lg: 1024px; /* Desktop */
  --lufa-primitive-breakpoint-xl: 1280px; /* Large desktop */
  --lufa-primitive-breakpoint-2xl: 1536px; /* Ultra-wide */
}
```

**Usage:**

```css
/* Mobile-first media queries */
@media (min-width: 768px) {
  .component {
    padding: 24px; /* Tablet and up */
  }
}
```

[Learn more →](./docs/token-usage-guide.md#breakpoint-tokens)

---

### Height Token Scale

New semantic height tokens separate from spacing:

```css
:root {
  --lufa-primitive-height-24: 24px; /* Small badges */
  --lufa-primitive-height-32: 32px; /* Small buttons */
  --lufa-primitive-height-40: 40px; /* Default buttons */
  --lufa-primitive-height-48: 48px; /* Large buttons */
  --lufa-primitive-height-56: 56px; /* Mobile headers */
  --lufa-primitive-height-64: 64px; /* Desktop headers */
  --lufa-primitive-height-80: 80px; /* Hero headers */
  --lufa-primitive-height-96: 96px; /* XL headers */
}
```

**Usage:**

```css
.button-default {
  height: var(--lufa-primitive-height-40);
}
```

[Learn more →](./docs/token-usage-guide.md#height-tokens)

---

### Responsive Layout Tokens

Automatic responsive spacing without writing media queries:

```css
/* Single token, automatic responsiveness */
.page {
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px (automatic) */
}

.section {
  margin-bottom: var(--lufa-core-layout-section-gap);
  /* Mobile: 48px, Tablet: 64px, Desktop: 80px (automatic) */
}
```

**Available responsive tokens:**

- `page-padding` - Horizontal page margins
- `section-gap` - Vertical section spacing
- `container-gutter` - Container side padding
- `grid-gap` - Grid item spacing
- `header-height` - Navigation bar height
- `modal-padding` - Modal content padding

[Learn more →](./docs/token-usage-guide.md#responsive-layout-tokens)

---

### Fluid Spacing Tokens

Smooth viewport-based scaling using CSS `clamp()`:

```css
.hero {
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
  /* Smoothly scales from 32px to 80px based on viewport */
}
```

**Available fluid tokens:**

- `section-gap-fluid` - `clamp(48px, 8vw, 96px)`
- `hero-padding-fluid` - `clamp(32px, 6vw, 80px)`
- `container-gutter-fluid` - `clamp(16px, 4vw, 48px)`
- `page-margin-fluid` - `clamp(16px, 3vw, 32px)`

[Learn more →](./docs/token-usage-guide.md#fluid-spacing-tokens)

---

### Grid System Tokens

Standardized grid layout tokens:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(var(--lufa-core-layout-grid-columns), 1fr); /* 12 columns */
  gap: var(--lufa-core-layout-grid-gap-default); /* 16px */
}
```

**Available grid tokens:**

- `grid-columns` - 12 (standard 12-column grid)
- `grid-gap-tight` - 8px (dense layouts)
- `grid-gap-default` - 16px (standard spacing)
- `grid-gap-comfortable` - 24px (spacious layouts)
- `grid-gap-spacious` - 32px (extra generous)
- `grid-min-column-width` - 280px (auto-fit/fill minimum)

[Learn more →](./docs/token-usage-guide.md#grid-system-tokens)

---

### Container Tokens

Max-width container tokens aligned with breakpoints:

```css
.container {
  max-width: var(--lufa-core-layout-container-xl);
  margin-inline: auto;
  padding-inline: var(--lufa-core-layout-container-gutter);
}
```

**Available containers:**

- `container-sm` - 640px (narrow content)
- `container-md` - 768px (articles)
- `container-lg` - 1024px (standard pages)
- `container-xl` - 1280px (default)
- `container-2xl` - 1536px (ultra-wide)

[Learn more →](./docs/token-usage-guide.md#container-tokens)

---

## 🐛 Bug Fixes

### Box Component `padding="none"` and `margin="none"` Fix

**Issue:** Box component incorrectly applied 4px spacing when using `padding="none"` or `margin="none"`.

**Fixed:** Now correctly applies 0px spacing.

**Before:**

```tsx
<Box padding="none">{/* Had 4px padding (incorrect) */}</Box>
```

**After:**

```tsx
<Box padding="none">{/* Has 0px padding (correct) */}</Box>
```

**Migration:** If you relied on the 4px spacing, change to `padding="tight"`:

```tsx
<Box padding="tight">{/* Explicitly 4px padding */}</Box>
```

**⚠️ Breaking Change:** This is a visual breaking change. Test your layouts after upgrading.

[See migration guide →](./docs/migration-guide.md#breaking-change-1-box-component-paddingnone-and-marginnone-fix-)

---

## ⚠️ Breaking Changes

### 1. Box Component `padding="none"` and `margin="none"` (High Impact)

**Severity:** 🔴 High (visual layout changes)  
**Type:** Bug fix (breaking in fixing way)

**What Changed:**

```tsx
// BEFORE v0.8.0 (buggy)
<Box padding="none">  {/* 4px padding */}

// AFTER v0.8.0 (fixed)
<Box padding="none">  {/* 0px padding */}
```

**Migration:**

```tsx
// If you need 4px, use "tight"
<Box padding="tight">  {/* 4px padding */}
```

**Affected Components:**

- Box (direct)
- Stack (extends Box)
- Any custom components using Box

[Full migration guide →](./docs/migration-guide.md#breaking-change-1-box-component-paddingnone-and-marginnone-fix-)

---

### 2. Storybook `small` Breakpoint (Low Impact)

**Severity:** 🟡 Low (dev-only, no production impact)  
**Type:** Configuration change

**What Changed:**

```typescript
// BEFORE v0.8.0
small: {
  width: 576;
} // Bootstrap-derived

// AFTER v0.8.0
small: {
  width: 640;
} // Aligned with breakpoint-sm token
```

**Impact:**

- Stories tested at `small` viewport now render at 640px instead of 576px
- Production code unchanged

**Action:**

- Review Storybook stories at new `small` viewport
- Update visual regression baselines if needed

[See migration guide →](./docs/migration-guide.md#breaking-change-2-storybook-small-breakpoint-)

---

## 🗑️ Deprecations

The following tokens are deprecated and will be removed in v1.0.0:

### 1. `page-padding-mobile` → Use `page-padding`

```css
/* ❌ Deprecated */
padding-inline: var(--lufa-core-layout-page-padding-mobile);

/* ✅ Use instead (automatic responsiveness) */
padding-inline: var(--lufa-core-layout-page-padding);
```

### 2. `section-gap-mobile` → Use `section-gap`

```css
/* ❌ Deprecated */
margin-bottom: var(--lufa-core-layout-section-gap-mobile);

/* ✅ Use instead (automatic responsiveness) */
margin-bottom: var(--lufa-core-layout-section-gap);
```

### 3. `container-max-width` → Use `container-xl`

```css
/* ❌ Deprecated */
max-width: var(--lufa-core-layout-container-max-width);

/* ✅ Use instead */
max-width: var(--lufa-core-layout-container-xl);
```

**Timeline:**

- v0.8.0: Deprecated (still functional, console warnings in dev mode)
- v1.0.0: Removed (expected 2027)

[See migration guide →](./docs/migration-guide.md#deprecated-tokens)

---

## 📚 Documentation

### New Documentation

- **[Token Usage Guide](./docs/token-usage-guide.md)** - Comprehensive reference for all 47 new tokens
- **[Migration Guide](./docs/migration-guide.md)** - Step-by-step upgrade instructions
- **[Responsive Design Guide](./docs/responsive-design-guide.md)** - Mobile-first strategies and best practices

### Updated Documentation

- **[Technical Specification](./planning/technical-spec-spacing-layout.md)** - Complete token architecture
- **[Implementation Checklist](./planning/implementation-checklist.md)** - Sprint breakdown and tasks

### Architecture Decision Records

- **[ADR-005: Breakpoint Token Strategy](../../adrs/ADR-005-breakpoint-token-strategy.md)** - 6-breakpoint rationale
- **[ADR-006: Responsive Spacing Architecture](../../adrs/ADR-006-responsive-spacing-architecture.md)** - Hybrid approach
- **[ADR-007: Zero-Value Token Handling](../../adrs/ADR-007-zero-value-token-handling.md)** - Box component fix

---

## 🔧 Technical Details

### Token Statistics

| Category               | Count  | Description                        |
| ---------------------- | ------ | ---------------------------------- |
| **Primitive Tokens**   | 14     | 6 breakpoints + 8 heights          |
| **Core Layout Tokens** | 33     | Responsive, grid, container, fluid |
| **Deprecated Tokens**  | 3      | Legacy mobile-specific tokens      |
| **Total New Tokens**   | **47** |                                    |

### CSS Output

- **File Size:** 66.71 KB / 70 KB budget (95.3%)
- **Gzip Size:** ~15-20 KB (estimated)
- **Media Queries:** 2 automatic breakpoints (768px, 1024px)
- **Build Time:** ~3 seconds

### Build System

- **Custom Transform:** `attribute/responsive` - Detects responsive tokens
- **Custom Format:** `css/variables-with-media-queries` - Generates media queries
- **Media Query Generation:** Automatic for responsive token variants

---

## 📦 Installation

### npm

```bash
npm install @grasdouble/lufa_design-system@0.8.0-alpha.1
```

### yarn

```bash
yarn add @grasdouble/lufa_design-system@0.8.0-alpha.1
```

### pnpm

```bash
pnpm add @grasdouble/lufa_design-system@0.8.0-alpha.1
```

---

## 🚀 Migration Steps

### Step 1: Install v0.8.0

```bash
npm install @grasdouble/lufa_design-system@0.8.0-alpha.1
```

### Step 2: Fix Box Components

Search for `padding="none"` and `margin="none"`:

```bash
grep -rn 'padding="none"' src/
grep -rn 'margin="none"' src/
```

Review each instance and update to `"tight"` if you need 4px spacing.

### Step 3: Update Deprecated Tokens

Replace deprecated tokens with new responsive variants:

```bash
# Find deprecated tokens
grep -rn 'page-padding-mobile' src/
grep -rn 'section-gap-mobile' src/
grep -rn 'container-max-width' src/
```

### Step 4: Test Thoroughly

- Visual inspection at all breakpoints (320px, 640px, 768px, 1024px, 1280px)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Storybook visual review

[Full migration guide →](./docs/migration-guide.md)

---

## ⏱️ Migration Timeline

**Small Projects (< 50 components):** 1-2 hours  
**Medium Projects (50-200 components):** 4-6 hours  
**Large Projects (200+ components):** 1-2 days

---

## 🆘 Support

**Need Help?**

- **Documentation:** Start with the [Migration Guide](./docs/migration-guide.md)
- **Slack:** #design-system-support
- **Email:** design-system-team@company.com
- **GitHub Issues:** [Report a bug](https://github.com/your-org/lufa-design-system/issues)

**Found a Bug?**

Please create an issue with:

- Version: v0.8.0-alpha.1
- Browser/Environment
- Reproduction steps
- Screenshots (if visual)

---

## 🔮 What's Next

### v0.8.0-beta.1 (Planned)

- Address alpha feedback
- Additional testing
- Performance optimizations

### v0.8.0 Stable (Planned)

- Production-ready release
- Complete documentation
- Migration support period

### Future Releases

- **v0.8.1:** Container queries (when browser support improves)
- **v0.9.0:** Typography token system
- **v1.0.0:** Stable API, remove deprecations

---

## 🙏 Acknowledgments

**Design System Team:**

- Token Architecture & Implementation
- Documentation & Testing
- Build System Enhancements

**Contributors:**

- Community feedback on breakpoint strategy
- Sprint 1-3 implementation efforts
- QA and testing support

---

## 📊 Version History

| Version       | Date       | Type  | Changes                            |
| ------------- | ---------- | ----- | ---------------------------------- |
| 0.8.0-alpha.1 | TBD        | Alpha | Initial release with 47 new tokens |
| 0.7.1         | 2026-01-20 | Patch | Previous stable version            |

---

## 📋 Checklist for Upgrading

- [ ] Read migration guide
- [ ] Install v0.8.0-alpha.1
- [ ] Search for `padding="none"` and `margin="none"`
- [ ] Update affected Box components
- [ ] Replace deprecated tokens
- [ ] Test at all breakpoints (320px, 640px, 768px, 1024px, 1280px)
- [ ] Review Storybook stories at new `small` viewport (640px)
- [ ] Cross-browser testing
- [ ] Update internal documentation
- [ ] Deploy to staging
- [ ] Final QA before production

---

**Release Manager:** Design System Team  
**Release Date:** TBD  
**Release Type:** Alpha  
**Next Release:** v0.8.0-beta.1 (TBD)

---

## 📖 Additional Resources

- [Token Usage Guide](./docs/token-usage-guide.md)
- [Migration Guide](./docs/migration-guide.md)
- [Responsive Design Guide](./docs/responsive-design-guide.md)
- [Technical Specification](./planning/technical-spec-spacing-layout.md)
- [Sprint 1 Report](./implementation/sprint-1-report.md)
- [Sprint 2 Report](./implementation/sprint-2-report.md)
- [ADR-005: Breakpoint Token Strategy](../../adrs/ADR-005-breakpoint-token-strategy.md)
- [ADR-006: Responsive Spacing Architecture](../../adrs/ADR-006-responsive-spacing-architecture.md)
- [ADR-007: Zero-Value Token Handling](../../adrs/ADR-007-zero-value-token-handling.md)

---

**Document Version:** 1.0.0 (Draft)  
**Last Updated:** 2026-01-26  
**Status:** 🚧 Draft (Pending alpha testing completion)
