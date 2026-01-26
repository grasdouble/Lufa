---
"@grasdouble/lufa_design-system-tokens": minor
"@grasdouble/lufa_design-system": minor
---

# Spacing & Layout Tokens - Responsive Foundation System

This release introduces a comprehensive spacing and layout token system with responsive breakpoints, height tokens, grid system, and automatic media query support.

## ⚠️ Breaking Changes

### 1. Box Component Padding/Margin "none" Bug Fix

**FIXED:** `padding="none"` and `margin="none"` now correctly apply `0px` instead of the buggy `4px`.

**Impact:** Components using `padding="none"` or `margin="none"` will change from 4px to 0px.

**Migration Required:**

If you need 4px spacing explicitly, use `padding="tight"` instead:

```diff
# Components that need zero spacing (correct behavior)
- <Box padding="none">  {/* Was incorrectly 4px */}
+ <Box padding="none">  {/* Now correctly 0px */}

# Components that actually need 4px
- <Box padding="none">  {/* Was incorrectly 4px */}
+ <Box padding="tight"> {/* Explicitly 4px */}
```

**Root Cause:** `spacing-none` token was incorrectly defined as `4px`. Now fixed to `0px`.

**Files Changed:**
- `packages/design-system/main/src/components/Box/box.utilities.config.cjs`
- CSS utilities regenerated (119 classes updated)

---

### 2. Storybook Breakpoint Change

**CHANGED:** Storybook "small" viewport changed from `576px` to `640px` to align with new `breakpoint.sm` token.

**Impact:** Storybook viewport presets only (no production code impact).

**Action Required:** Review stories that explicitly target the "small" viewport.

---

## ✨ Features

### Breakpoint Tokens (6 new primitive tokens)

Mobile-first, Tailwind-aligned breakpoint system:

- `primitive.breakpoint.xs` - 320px (small mobile)
- `primitive.breakpoint.sm` - 640px (large mobile)
- `primitive.breakpoint.md` - 768px (tablet)
- `primitive.breakpoint.lg` - 1024px (desktop)
- `primitive.breakpoint.xl` - 1280px (large desktop)
- `primitive.breakpoint.2xl` - 1536px (extra large)

**Usage:**

```css
/* CSS custom properties available */
@media (min-width: 640px) { /* breakpoint.sm */
  .container {
    padding: var(--lufa-core-layout-page-padding);
  }
}
```

---

### Height Tokens (8 new primitive tokens)

Standardized heights for buttons, inputs, headers, and UI elements:

- `primitive.height.24` - 24px (small chips, badges)
- `primitive.height.32` - 32px (small buttons, inputs)
- `primitive.height.40` - 40px (default buttons, inputs)
- `primitive.height.48` - 48px (large buttons, headers)
- `primitive.height.56` - 56px (hero buttons, mobile headers)
- `primitive.height.64` - 64px (extra large buttons, desktop headers)
- `primitive.height.80` - 80px (marketing sections)
- `primitive.height.96` - 96px (hero sections)

**Button Component Integration:**

```json
{
  "component.button.height.sm": "{primitive.height.32}",
  "component.button.height.md": "{primitive.height.40}",
  "component.button.height.lg": "{primitive.height.48}"
}
```

---

### Responsive Layout Tokens (18 new core tokens)

Tokens that automatically adapt to viewport size via media queries:

#### Page Padding (responsive)
- `core.layout.page-padding.base` - 16px (mobile)
- `core.layout.page-padding.md` - 24px (tablet, ≥768px)
- `core.layout.page-padding.lg` - 32px (desktop, ≥1024px)

#### Section Gap (responsive)
- `core.layout.section-gap.base` - 48px (mobile)
- `core.layout.section-gap.md` - 64px (tablet, ≥768px)
- `core.layout.section-gap.lg` - 80px (desktop, ≥1024px)

#### Container Gutter (responsive)
- `core.layout.container-gutter.base` - 16px (mobile)
- `core.layout.container-gutter.md` - 24px (tablet, ≥768px)
- `core.layout.container-gutter.lg` - 32px (desktop, ≥1024px)

#### Grid Gap (responsive)
- `core.layout.grid-gap.base` - 16px (mobile)
- `core.layout.grid-gap.md` - 24px (tablet, ≥768px)
- `core.layout.grid-gap.lg` - 32px (desktop, ≥1024px)

#### Header Height (responsive)
- `core.layout.header-height.base` - 56px (mobile)
- `core.layout.header-height.md` - 64px (tablet, ≥768px)
- `core.layout.header-height.lg` - 64px (desktop, ≥1024px)

#### Modal Padding (responsive)
- `core.layout.modal-padding.base` - 24px (mobile)
- `core.layout.modal-padding.md` - 32px (tablet, ≥768px)
- `core.layout.modal-padding.lg` - 40px (desktop, ≥1024px)

**Automatic Media Query Generation:**

```css
/* Generated CSS output (mobile-first) */
:root {
  --lufa-core-layout-page-padding: 16px; /* base (mobile) */
}

@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: 24px; /* tablet */
  }
}

@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: 32px; /* desktop */
  }
}
```

---

### Grid System Tokens (6 new core tokens)

12-column grid system with semantic gap variants:

- `core.layout.grid.columns` - 12 columns
- `core.layout.grid.gap.tight` - 8px
- `core.layout.grid.gap.default` - 16px
- `core.layout.grid.gap.comfortable` - 24px
- `core.layout.grid.gap.spacious` - 32px
- `core.layout.grid.min-column-width` - 280px

**Usage:**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(var(--lufa-core-layout-grid-columns), 1fr);
  gap: var(--lufa-core-layout-grid-gap-default);
}
```

---

### Container Tokens (5 new core tokens)

Max-width containers aligned with breakpoints:

- `core.layout.container.sm` - 640px
- `core.layout.container.md` - 768px
- `core.layout.container.lg` - 1024px
- `core.layout.container.xl` - 1280px
- `core.layout.container.2xl` - 1536px

**Usage:**

```css
.container {
  max-width: var(--lufa-core-layout-container-lg);
  margin-inline: auto;
}
```

---

### Fluid Spacing Tokens (4 new core tokens)

CSS `clamp()` based tokens for smooth viewport scaling:

- `core.layout.section-gap-fluid` - `clamp(48px, 8vw, 96px)`
- `core.layout.hero-padding-fluid` - `clamp(32px, 6vw, 80px)`
- `core.layout.container-gutter-fluid` - `clamp(16px, 4vw, 48px)`
- `core.layout.page-margin-fluid` - `clamp(16px, 3vw, 32px)`

**Usage:**

```css
.hero-section {
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
  /* Smoothly scales between 32px and 80px based on viewport */
}
```

---

## 🔧 Build System Enhancements

### Custom Style Dictionary Transform: `attribute/responsive`

Automatically detects responsive tokens and adds metadata for media query generation.

**File:** `packages/design-system/tokens/build/transforms/responsive.js`

### Custom Style Dictionary Format: `css/variables-with-media-queries`

Generates mobile-first CSS with automatic `@media` query overrides for responsive tokens.

**File:** `packages/design-system/tokens/build/formats/css-with-media-queries.js`

**Features:**
- Mobile-first approach (base → md → lg)
- Maintains theme mode support (light, dark, high-contrast)
- Automatic breakpoint mapping
- Clean, optimized CSS output

---

## 🗑️ Deprecations

**3 tokens deprecated** (will be removed in v0.9.0):

| Deprecated Token | Replacement | Migration |
|------------------|-------------|-----------|
| `page-padding-mobile` | `page-padding.base` | Direct replacement |
| `section-gap-mobile` | `section-gap.base` | Direct replacement |
| `container-max-width` | `container.xl` | Direct replacement |

**Migration Commands:**

```bash
# Find deprecated token usage
grep -r "page-padding-mobile\|section-gap-mobile\|container-max-width" . --include="*.{css,json}"

# Replace in CSS files
find . -name "*.css" -exec sed -i '' 's/--lufa-core-layout-page-padding-mobile/--lufa-core-layout-page-padding/g' {} +
find . -name "*.css" -exec sed -i '' 's/--lufa-core-layout-section-gap-mobile/--lufa-core-layout-section-gap/g' {} +
find . -name "*.css" -exec sed -i '' 's/--lufa-core-layout-container-max-width/--lufa-core-layout-container-xl/g' {} +
```

---

## 📊 Metrics

- **New tokens added:** 47 (14 primitive + 33 core layout)
- **Tokens deprecated:** 3
- **Components updated:** 2 (Box, Button)
- **CSS file size:** 61.84 KB → 66.71 KB (+4.87 KB, +7.9%)
- **Build system:** 2 custom transforms/formats added
- **Responsive token groups:** 6 (18 variants total)

---

## 🔄 Migration Guide

### For Box Component Users

**If using `padding="none"` or `margin="none"`:**

1. **Test your components** - Spacing will change from 4px to 0px (correct behavior)
2. **If you need 4px explicitly**, use `padding="tight"` instead
3. **This is a bug fix** - 0px is the correct behavior for "none"

**Example:**

```tsx
// Before (buggy behavior)
<Box padding="none"> {/* Was incorrectly 4px */}
  Content with unintended padding
</Box>

// After (correct behavior)
<Box padding="none"> {/* Now correctly 0px */}
  Content with no padding
</Box>

// If you need 4px
<Box padding="tight"> {/* Explicitly 4px */}
  Content with 4px padding
</Box>
```

### For Custom Component Developers

**Use new height tokens:**

```diff
# Before
.my-button {
-  height: 40px;
+  height: var(--lufa-primitive-height-40);
}
```

**Use responsive layout tokens:**

```diff
# Before
.my-container {
-  padding: 16px;
+  padding: var(--lufa-core-layout-page-padding);
  /* Automatically 16px → 24px → 32px */
}
```

**Use breakpoint tokens:**

```diff
# Before
-@media (min-width: 768px) {
+@media (min-width: 768px) { /* breakpoint.md */
  .my-component {
    /* tablet styles */
  }
}
```

### For Storybook Story Authors

**Update viewport references:**

```diff
# Before
-parameters: {
-  viewport: { defaultViewport: 'small' } // 576px
-}

# After
+parameters: {
+  viewport: { defaultViewport: 'small' } // 640px (breakpoint.sm)
+}
```

---

## 🎯 Best Practices

### 1. Use Responsive Tokens for Layout

```css
/* Good: Responsive token adapts automatically */
.page-wrapper {
  padding: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}

/* Avoid: Manual media queries for standard layouts */
.page-wrapper {
  padding: 16px;
}
@media (min-width: 768px) {
  .page-wrapper { padding: 24px; }
}
```

### 2. Use Fluid Tokens for Hero Sections

```css
/* Good: Smooth scaling for marketing content */
.hero {
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
  /* Smoothly scales 32px → 80px */
}
```

### 3. Use Height Tokens for UI Components

```css
/* Good: Standardized heights */
.custom-button {
  height: var(--lufa-primitive-height-40);
}

/* Avoid: Hard-coded heights */
.custom-button {
  height: 40px;
}
```

---

## 📚 Documentation

Comprehensive guides available:

- **Token Usage Guide:** `_bmad-output/subjects/spacing-layout-tokens/docs/token-usage-guide.md`
- **Migration Guide:** `_bmad-output/subjects/spacing-layout-tokens/docs/migration-guide.md`
- **Responsive Design Guide:** `_bmad-output/subjects/spacing-layout-tokens/docs/responsive-design-guide.md`
- **Implementation Reports:**
  - Sprint 1: `_bmad-output/subjects/spacing-layout-tokens/implementation/sprint-1-report.md`
  - Sprint 2: `_bmad-output/subjects/spacing-layout-tokens/implementation/sprint-2-report.md`
  - Sprint 3: `_bmad-output/subjects/spacing-layout-tokens/implementation/sprint-3-testing-report.md`

---

## 🔗 Related ADRs

- [ADR-005: Breakpoint Token Strategy](../../_bmad-output/adrs/ADR-005-breakpoint-token-strategy.md)
- [ADR-006: Responsive Spacing Architecture](../../_bmad-output/adrs/ADR-006-responsive-spacing-architecture.md)
- [ADR-007: Zero-Value Token Handling](../../_bmad-output/adrs/ADR-007-zero-value-token-handling.md)

---

## 🎉 What's Next

**Phase 2D: Typography Tokens** (Coming next)
- Responsive typography system
- Letter-spacing tokens
- Line-height refinements
- Extended type scale (6xl-8xl)

---

**Release:** v0.8.0-alpha.1  
**Date:** 2026-01-26  
**Status:** Ready for Testing
