# Migration Guide: Typography Tokens v0.8.0

**From:** v0.7.x  
**To:** v0.8.0  
**Subject:** typography-tokens  
**Date:** 2026-01-26

---

## Overview

Phase 2D adds **responsive typography** and **letter-spacing tokens** to the Lufa Design System. This is a **backward-compatible update** with **no breaking changes**.

---

## What's New

### New Tokens (5)

**Letter-Spacing Primitives:**

- `--lufa-primitive-typography-letter-spacing-tighter` (-0.04em)
- `--lufa-primitive-typography-letter-spacing-tight` (-0.02em)
- `--lufa-primitive-typography-letter-spacing-normal` (0)
- `--lufa-primitive-typography-letter-spacing-wide` (0.05em)
- `--lufa-primitive-typography-letter-spacing-wider` (0.1em)

### Updated Tokens (4)

**Fluid Font Sizes (clamp-based):**

- `--lufa-primitive-typography-font-size-5xl`: `48px` → `clamp(2rem, 1.5rem + 2vw, 3rem)` (32px-48px)
- `--lufa-primitive-typography-font-size-4xl`: `36px` → `clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)` (28px-36px)
- `--lufa-primitive-typography-font-size-3xl`: `30px` → `clamp(1.5rem, 1.25rem + 1vw, 1.875rem)` (24px-30px)
- `--lufa-primitive-typography-font-size-2xl`: `24px` → `clamp(1.25rem, 1rem + 1vw, 1.5rem)` (20px-24px)

### Component Token Updates

**Badge Component (3 tokens refactored):**

- `badge-font-size-sm`: `10px` (unchanged, literal)
- `badge-font-size-md`: `12px` → `{primitive.typography.font-size.xs}` (same value, now token reference)
- `badge-font-size-lg`: `14px` → `{primitive.typography.font-size.sm}` (same value, now token reference)

---

## Breaking Changes

**None! 🎉**

This update is **fully backward compatible**:

- Existing code continues to work
- No visual changes (desktop sizes unchanged)
- Badge tokens maintain same pixel values
- Body text (xs-xl) unchanged

---

## Migration Steps

### Step 1: Update Package (Required)

```bash
# Update to v0.8.0
pnpm update @grasdouble/lufa_design-system-tokens@0.8.0
pnpm update @grasdouble/lufa_design-system@0.8.0
```

### Step 2: Rebuild Your App (Required)

```bash
# Rebuild to pick up new tokens
pnpm build
```

### Step 3: Visual Testing (Recommended)

Test headings at different viewport widths to verify fluid scaling:

**Test viewports:**

- 320px (mobile)
- 768px (tablet)
- 1280px (desktop)

**What to check:**

- Headings scale smoothly (no jumps)
- Desktop sizes match v0.7.x (48px, 36px, 30px, 24px)
- Mobile sizes are smaller (more appropriate)

### Step 4: Adopt New Features (Optional)

#### Option A: Add Letter-Spacing to Headings

```css
/* Before (v0.7.x) */
.hero-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
}

/* After (v0.8.0) - Optional improvement */
.hero-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
  /* Tighter tracking improves large heading appearance */
}
```

#### Option B: Add Letter-Spacing to Uppercase Labels

```css
/* Before (v0.7.x) */
.label {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  text-transform: uppercase;
}

/* After (v0.8.0) - Recommended improvement */
.label {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  text-transform: uppercase;
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  /* Wider tracking improves uppercase readability */
}
```

---

## Impact Analysis

### CSS Bundle Size

**Before (v0.7.x):** 66.71 KB  
**After (v0.8.0):** 67.25 KB  
**Increase:** +540 bytes (0.8%)

**Budget remaining:** 2.75 KB of 70 KB limit

### Visual Changes

**Desktop (1280px+):**

- ✅ No changes (same pixel values as v0.7.x)
- Headings: 48px, 36px, 30px, 24px (unchanged)

**Mobile (320px-768px):**

- ✅ Improved (headings now smaller, more appropriate)
- 5xl: 48px → 32-48px (responsive)
- 4xl: 36px → 28-36px (responsive)
- 3xl: 30px → 24-30px (responsive)
- 2xl: 24px → 20-24px (responsive)

**Body text (xs-xl):**

- ✅ No changes (static at 12px, 14px, 16px, 18px, 20px)

### Component Impact

**Badge Component:**

- ✅ No visual changes
- md/lg now reference primitive tokens (better maintainability)
- sm stays literal (10px, no matching primitive)

**Text Component:**

- ✅ No code changes required
- Automatically benefits from fluid typography
- Letter-spacing available via custom CSS

**Button Component:**

- ✅ No changes required
- Optionally add letter-spacing for uppercase buttons

---

## Testing Checklist

### Automated Testing

```bash
# Run unit tests
pnpm test

# Run build validation
cd packages/design-system/tokens
pnpm build
pnpm check:size

# Verify CSS output
grep "letter-spacing" dist/tokens.css
grep "clamp" dist/tokens.css
```

### Manual Testing

**Test at these viewports:**

- [ ] 320px - Check headings are smaller (more appropriate)
- [ ] 768px - Check headings scale smoothly
- [ ] 1280px - Check headings match v0.7.x desktop sizes
- [ ] 1920px - Check headings stay at max size (don't grow)

**Test these components:**

- [ ] Headings (H1-H4)
- [ ] Badge component (sm, md, lg)
- [ ] Buttons (with/without uppercase)
- [ ] Card titles
- [ ] Hero sections

### Browser Compatibility

Test in:

- [ ] Chrome 79+ (clamp support)
- [ ] Firefox 75+ (clamp support)
- [ ] Safari 13.1+ (clamp support)
- [ ] Edge 79+ (clamp support)

**IE11 note:** Clamp not supported, falls back to max value (48px, 36px, etc.). This is acceptable for IE11 users.

---

## Rollback Plan

If issues arise, rollback is simple:

```bash
# Rollback to v0.7.x
pnpm add @grasdouble/lufa_design-system-tokens@0.7.1
pnpm add @grasdouble/lufa_design-system@0.7.1

# Rebuild
pnpm build
```

**Note:** No code changes needed for rollback (backward compatible).

---

## Common Questions

### Q: Will my existing headings look different?

**A:** On **desktop (1280px+)**: No, identical to v0.7.x.  
On **mobile/tablet (320px-1280px)**: Yes, headings will be smaller (improved UX).

### Q: Do I need to update my components?

**A:** No, existing code works without changes. Letter-spacing is optional.

### Q: Should I add letter-spacing to all headings?

**A:** Recommended for **large headings (3xl-5xl)** with `tight` token. Optional for smaller headings.

### Q: What about Badge components?

**A:** No changes needed. Tokens updated internally, visual output identical.

### Q: Can I disable fluid typography?

**A:** Yes, override tokens with static values:

```css
:root {
  --lufa-primitive-typography-font-size-5xl: 48px; /* Static */
  --lufa-primitive-typography-font-size-4xl: 36px; /* Static */
  --lufa-primitive-typography-font-size-3xl: 30px; /* Static */
  --lufa-primitive-typography-font-size-2xl: 24px; /* Static */
}
```

### Q: What if I don't want to use letter-spacing?

**A:** No problem! Letter-spacing tokens are **opt-in**. Don't use them if you prefer default spacing.

---

## Recommendations

### High Priority (Do This)

1. ✅ **Update to v0.8.0** - Backward compatible, safe to upgrade
2. ✅ **Test at 320px, 768px, 1280px** - Verify fluid scaling works
3. ✅ **Add letter-spacing to uppercase labels** - Improves readability significantly

### Medium Priority (Consider This)

1. 🟡 **Add letter-spacing to large headings** - Subtle visual improvement
2. 🟡 **Review hero sections** - May benefit from tighter tracking
3. 🟡 **Update Storybook stories** - Document new tokens

### Low Priority (Optional)

1. 🟢 **Customize fluid ranges** - Only if default ranges don't fit
2. 🟢 **Add letter-spacing to buttons** - Only for uppercase buttons
3. 🟢 **Create custom clamp values** - Advanced use cases only

---

## Code Examples

### Before/After Comparison

#### Large Heading

```css
/* v0.7.x */
.hero-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl); /* 48px always */
}

/* v0.8.0 (automatic improvement, no code change needed) */
.hero-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl); /* 32px-48px responsive */
}

/* v0.8.0 (optional: add letter-spacing) */
.hero-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
}
```

#### Uppercase Label

```css
/* v0.7.x */
.label {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  text-transform: uppercase;
}

/* v0.8.0 (recommended: add letter-spacing) */
.label {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  text-transform: uppercase;
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
}
```

#### Button

```css
/* v0.7.x */
.button {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  text-transform: uppercase;
}

/* v0.8.0 (optional: add letter-spacing for uppercase) */
.button {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wider);
}
```

---

## Support

### Documentation

- [Typography Tokens Reference](/docs/tokens/typography)
- [Responsive Typography Guide](./responsive-typography-guide.md)
- [Letter-Spacing Usage Guide](./letter-spacing-usage-guide.md)
- [ADR-008: Responsive Typography Strategy](../../adrs/ADR-008-responsive-typography-strategy.md)
- [ADR-009: Letter-Spacing Architecture](../../adrs/ADR-009-letter-spacing-token-architecture.md)

### Need Help?

- Open an issue: [GitHub Issues](https://github.com/grasdouble/lufa/issues)
- Ask in Slack: #lufa-design-system
- Review ADRs: `_bmad-output/adrs/`

---

**Migration difficulty:** 🟢 Easy (15 minutes)  
**Risk level:** 🟢 Low (backward compatible)  
**Recommended:** ✅ Yes (safe upgrade)

---

**Last Updated:** 2026-01-26  
**Version:** 1.0 (Phase 2D)
