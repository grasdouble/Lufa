---
"@grasdouble/lufa_design-system-tokens": minor
---

# Color Token Refinement - High-Contrast Primitives and Alpha System

This release introduces comprehensive improvements to the color token system, achieving 100% high-contrast coverage and adding systematic alpha/opacity support.

## ✨ Features

### High-Contrast Primitives (6 new tokens)
- `primitive.color.hc.black` - Pure black for WCAG AAA text
- `primitive.color.hc.white` - Pure white for HC backgrounds
- `primitive.color.hc.blue` - Pure blue for primary actions
- `primitive.color.hc.red` - Pure red for error states
- `primitive.color.hc.green` - Pure green for success states
- `primitive.color.hc.yellow` - Pure yellow for warnings

### Alpha/Opacity System (18 new tokens)
- `primitive.color.alpha.black.*` - 9 opacity levels (4%, 8%, 16%, 38%, 50%, 60%, 80%, 90%, 100%)
- `primitive.color.alpha.white.*` - 9 opacity levels (4%, 8%, 16%, 38%, 50%, 60%, 80%, 90%, 100%)

### Semantic Overlays (5 new tokens)
- `semantic.ui.overlay-backdrop` - Mode-aware backdrop overlay
- `semantic.ui.overlay-hover` - Hover state overlay
- `semantic.ui.overlay-pressed` - Active/pressed state overlay
- `semantic.ui.overlay-selected` - Selected state overlay
- `semantic.ui.scrim` - Modal scrim/backdrop

### Interactive States (6 new tokens)
- `semantic.interactive.disabled-opacity` - Standard disabled opacity (0.38)
- `semantic.interactive.loading-opacity` - Loading state opacity (0.6)
- `semantic.interactive.placeholder-opacity` - Placeholder text opacity (0.5)
- `semantic.interactive.focus-background` - Focus state background
- `semantic.interactive.selected-background` - Selected state background
- `semantic.interactive.selected-text` - Selected state text

### Button Variants (6 new tokens)
- `semantic.button.warning-*` - Warning button colors (background, hover, text)
- `semantic.button.info-*` - Info button colors (background, hover, text)

## 🔧 Improvements

### Core Token Enhancements (31 tokens updated)
- All brand colors now reference HC primitives in high-contrast mode
- All neutral colors use HC primitives for maximum contrast
- All semantic colors guarantee WCAG AAA compliance in HC mode

### Hard-Coded Color Elimination
- Replaced 12 hard-coded hex values in token files with primitive references
- Improved token system integrity and maintainability

## 🗑️ Deprecations

- `semantic.ui.background-overlay` → Use `semantic.ui.overlay-backdrop` instead
  - Backward-compatible alias maintained for migration period

## 📊 Metrics

- **High-contrast coverage:** 67% → 100% ✅
- **New tokens added:** 38 (24 primitive + 14 semantic)
- **Tokens updated:** 31 core tokens
- **Hard-coded colors removed:** 12 instances
- **CSS file size:** 45 KB → 61 KB (+16 KB, +35%)
- **WCAG AAA compliance:** 100% in high-contrast mode

## 🔄 Migration Guide

**No action required** - This release is fully backward compatible. All changes are additive.

### Optional: Adopt New Tokens

If you were using hard-coded colors or custom overlays, consider migrating to the new tokens:

```css
/* Before */
.my-component {
  background: rgba(0, 0, 0, 0.5);
  opacity: 0.38; /* disabled state */
}

/* After */
.my-component {
  background: var(--lufa-semantic-ui-overlay-backdrop);
  opacity: var(--lufa-semantic-interactive-disabled-opacity);
}
```

### High-Contrast Mode Support

The new HC primitives automatically activate in high-contrast mode:

```css
/* Automatically adapts to HC mode */
.my-text {
  color: var(--lufa-semantic-text-primary);
  /* Light mode: #1a1a1a */
  /* Dark mode: #f5f5f5 */
  /* HC mode: #000000 (pure black) */
}
```

## 🎯 Accessibility

- ✅ All tokens meet WCAG AAA standards in high-contrast mode
- ✅ Pure HC colors (#000000, #ffffff, etc.) ensure maximum contrast
- ✅ Mode-aware overlays adapt to user preferences
- ✅ Standardized opacity values follow Material Design guidelines

## 📚 Documentation

See the full implementation report for details:
- `_bmad-output/subjects/color-token-refinement/implementation/implementation-report.md`

## 🔗 Related ADRs

- [ADR-003: High-Contrast Token Strategy](../../adrs/ADR-003-high-contrast-token-strategy.md)
- [ADR-004: Alpha/Opacity Token Architecture](../../adrs/ADR-004-alpha-opacity-token-architecture.md)
