# STORY_COLORS Migration Guide

## Overview

`STORY_COLORS` has been improved to provide **two distinct color systems**:

1. **`STORY_COLORS.themed`** - CSS variables that adapt to light/dark/high-contrast themes
2. **`STORY_COLORS.primary`** - Fixed decorative colors for examples

## Why This Change?

### Problem with Old Approach

```tsx
// ❌ PROBLEM: Hard-coded colors don't adapt to dark mode
<div style={{ color: STORY_COLORS.neutral.textDark }}>
  {' '}
  // #1f2937 (always dark gray) Text is invisible in dark mode!
</div>
```

### New Approach

```tsx
// ✅ SOLUTION: CSS variables adapt automatically
<div style={{ color: STORY_COLORS.themed.text.primary }}>
  {' '}
  // var(--lufa-semantic-ui-text-primary) Text is visible in all modes!
</div>
```

---

## Migration Guide

### Text Colors

```tsx
// ❌ OLD (doesn't adapt)
color: STORY_COLORS.neutral.textDark; // Always #1f2937
color: STORY_COLORS.neutral.text; // Always #1f2937
color: STORY_COLORS.neutral.textSlate; // Always #64748b

// ✅ NEW (adapts to theme)
color: STORY_COLORS.themed.text.primary; // Dark in light mode, light in dark mode
color: STORY_COLORS.themed.text.secondary; // Medium contrast
color: STORY_COLORS.themed.text.tertiary; // Low contrast
```

### Background Colors

```tsx
// ❌ OLD (doesn't adapt)
backgroundColor: STORY_COLORS.neutral.backgroundLight; // Always #f3f4f6
backgroundColor: STORY_COLORS.neutral.bgGray; // Always #f3f4f6

// ✅ NEW (adapts to theme)
backgroundColor: STORY_COLORS.themed.background.page; // Page background
backgroundColor: STORY_COLORS.themed.background.surface; // Card/panel background
```

### Border Colors

```tsx
// ❌ OLD (doesn't adapt)
border: `1px solid ${STORY_COLORS.neutral.borderMedium}`; // Always #d1d5db

// ✅ NEW (adapts to theme)
border: `1px solid ${STORY_COLORS.themed.border.default}`; // Adapts to theme
border: `1px solid ${STORY_COLORS.themed.border.subtle}`; // Subtle variant
```

### Semantic Backgrounds

```tsx
// ❌ OLD (doesn't adapt)
backgroundColor: PRIMARY.green.light; // Always #dcfce7 (light green)
backgroundColor: PRIMARY.pink.light; // Always #fce7f3 (light pink)
backgroundColor: PRIMARY.orange.light; // Always #fef3c7 (light orange)
backgroundColor: PRIMARY.blue.light; // Always #dbeafe (light blue)

// ✅ NEW (adapts to theme)
backgroundColor: STORY_COLORS.themed.background.success; // Green (adapts)
backgroundColor: STORY_COLORS.themed.background.error; // Red (adapts)
backgroundColor: STORY_COLORS.themed.background.warning; // Orange (adapts)
backgroundColor: STORY_COLORS.themed.background.info; // Blue (adapts)
```

---

## When to Use What?

### Use `STORY_COLORS.themed.*` for:

✅ **Story UI containers** - Headers, sections, wrappers

```tsx
<div style={{
  backgroundColor: STORY_COLORS.themed.background.surface,
  color: STORY_COLORS.themed.text.primary
}}>
```

✅ **Documentation text** - Labels, descriptions, code snippets

```tsx
<span style={{ color: STORY_COLORS.themed.text.secondary }}>Description text</span>
```

✅ **Borders and dividers**

```tsx
<hr style={{ borderColor: STORY_COLORS.themed.border.default }} />
```

### Use `STORY_COLORS.primary.*` for:

✅ **Example content with fixed colors** - Showing color variants

```tsx
{
  ['blue', 'green', 'pink'].map((color) => (
    <Box background={STORY_COLORS.primary[color].main}>Fixed {color} example</Box>
  ));
}
```

✅ **Margin/padding visualization** - Directional overlays

```tsx
<MarginVisualizer color={STORY_COLORS.directional.top.main} />
<PaddingVisualizer color={STORY_COLORS.axis.x.main} />
```

✅ **Section headers with fixed colors**

```tsx
<h3 style={{ color: STORY_COLORS.primary.orange.main }}>💡 Pro Tip</h3>
```

---

## Complete API Reference

### `STORY_COLORS.themed`

```typescript
// Text
STORY_COLORS.themed.text.primary; // var(--lufa-semantic-ui-text-primary)
STORY_COLORS.themed.text.secondary; // var(--lufa-semantic-ui-text-secondary)
STORY_COLORS.themed.text.tertiary; // var(--lufa-semantic-ui-text-tertiary)

// Backgrounds
STORY_COLORS.themed.background.page; // var(--lufa-semantic-ui-background-page)
STORY_COLORS.themed.background.surface; // var(--lufa-semantic-ui-background-surface)
STORY_COLORS.themed.background.success; // var(--lufa-semantic-ui-background-success)
STORY_COLORS.themed.background.error; // var(--lufa-semantic-ui-background-error)
STORY_COLORS.themed.background.warning; // var(--lufa-semantic-ui-background-warning)
STORY_COLORS.themed.background.info; // var(--lufa-semantic-ui-background-info)
STORY_COLORS.themed.background.onPrimary; // var(--lufa-semantic-ui-background-on-primary)

// Borders
STORY_COLORS.themed.border.default; // var(--lufa-semantic-ui-border-default)
STORY_COLORS.themed.border.subtle; // var(--lufa-semantic-ui-border-subtle)
```

### `STORY_COLORS.primary`

```typescript
// Fixed decorative colors
STORY_COLORS.primary.blue.main; // #3b82f6
STORY_COLORS.primary.violet.main; // #8b5cf6
STORY_COLORS.primary.pink.main; // #ec4899
STORY_COLORS.primary.orange.main; // #f59e0b
STORY_COLORS.primary.green.main; // #22c55e
STORY_COLORS.primary.cyan.main; // #06b6d4
STORY_COLORS.primary.red.main; // #dc2626

// Each has .light and .name properties too
```

### `STORY_COLORS.directional`

```typescript
STORY_COLORS.directional.top; // { main, light, name } - Blue
STORY_COLORS.directional.right; // { main, light, name } - Violet
STORY_COLORS.directional.bottom; // { main, light, name } - Pink
STORY_COLORS.directional.left; // { main, light, name } - Orange
```

### `STORY_COLORS.axis`

```typescript
STORY_COLORS.axis.x; // { main, light, name } - Blue (horizontal)
STORY_COLORS.axis.y; // { main, light, name } - Orange (vertical)
STORY_COLORS.axis.combined; // { main, light, name } - Violet (both)
```

---

## Real-World Examples

### Before (Typography.stories.tsx)

```tsx
// ❌ Hard-coded colors - not visible in dark mode
const TypographyToken = ({ name, value }) => (
  <div>
    <div style={{ color: NEUTRAL.textDark }}>{name}</div>
    <div style={{ color: NEUTRAL.textSlate }}>{value}</div>
    <div
      style={{
        backgroundColor: NEUTRAL.backgroundLight,
        border: `1px solid ${NEUTRAL.borderMedium}`,
      }}
    >
      Example
    </div>
  </div>
);
```

### After (Typography.stories.tsx)

```tsx
// ✅ Theme-aware - visible in all modes
const TypographyToken = ({ name, value }) => (
  <div>
    <div style={{ color: STORY_COLORS.themed.text.primary }}>{name}</div>
    <div style={{ color: STORY_COLORS.themed.text.secondary }}>{value}</div>
    <div
      style={{
        backgroundColor: STORY_COLORS.themed.background.surface,
        border: `1px solid ${STORY_COLORS.themed.border.default}`,
      }}
    >
      Example
    </div>
  </div>
);
```

### Before (Icon.stories.tsx)

```tsx
// ❌ Missing colors
<button style={{ color: PRIMARY.red.main }}> // PRIMARY.red didn't exist! Delete</button>
```

### After (Icon.stories.tsx)

```tsx
// ✅ Red color added to PRIMARY
<button style={{ color: STORY_COLORS.primary.red.main }}>Delete</button>
```

---

## Migration Checklist

- [ ] Replace `NEUTRAL.textDark` → `STORY_COLORS.themed.text.primary`
- [ ] Replace `NEUTRAL.textSlate` → `STORY_COLORS.themed.text.secondary`
- [ ] Replace `NEUTRAL.text` → `STORY_COLORS.themed.text.primary`
- [ ] Replace `NEUTRAL.backgroundLight` → `STORY_COLORS.themed.background.surface`
- [ ] Replace `NEUTRAL.bgGray` → `STORY_COLORS.themed.background.surface`
- [ ] Replace `NEUTRAL.borderMedium` → `STORY_COLORS.themed.border.default`
- [ ] Replace `NEUTRAL.borderSlate` → `STORY_COLORS.themed.border.subtle`
- [ ] Replace `PRIMARY.*.light` backgrounds → `STORY_COLORS.themed.background.*`
- [ ] Keep `PRIMARY.*.main` for decorative fixed colors
- [ ] Test in light, dark, and high-contrast modes

---

## FAQ

### Q: Should I migrate all `NEUTRAL.*` usage?

**A:** Migrate when colors are used for **story UI** (containers, text, borders). Keep if used with component props that expect theme tokens internally.

### Q: Can I still use `PRIMARY.blue.main`?

**A:** Yes! Use `PRIMARY.*.main` for **decorative fixed colors** in examples. They should NOT change with theme.

### Q: What about `NEUTRAL.white`?

**A:** Avoid for backgrounds (use `themed.background.surface`). OK for fixed white like `backgroundColor: '#ffffff'` in specific examples.

### Q: Do I need to update existing stories immediately?

**A:** No. `NEUTRAL` colors remain for backwards compatibility. Update gradually or when fixing dark mode issues.

---

## Summary

| Old                       | New                                      | When to Use          |
| ------------------------- | ---------------------------------------- | -------------------- |
| `NEUTRAL.textDark`        | `STORY_COLORS.themed.text.primary`       | Story UI text        |
| `NEUTRAL.backgroundLight` | `STORY_COLORS.themed.background.surface` | Story containers     |
| `NEUTRAL.borderMedium`    | `STORY_COLORS.themed.border.default`     | Story borders        |
| `PRIMARY.*.main`          | `STORY_COLORS.primary.*.main`            | Fixed example colors |
| `PRIMARY.green.light`     | `STORY_COLORS.themed.background.success` | Success backgrounds  |

**Key Principle:**

- 🎨 **Themed** = Adapts to light/dark/high-contrast
- 🎯 **Primary** = Fixed colors for examples

---

**Status:** ✅ Available since PR #138
**Files:** `packages/design-system/storybook/src/constants/storyColors.ts`
