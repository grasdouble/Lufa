# Responsive Typography Guide

**Subject:** typography-tokens  
**Version:** 1.0  
**Date:** 2026-01-26  
**Audience:** Developers, Designers

---

## Overview

The Lufa Design System implements **fluid typography** for heading sizes using CSS `clamp()`. This provides smooth, automatic scaling between mobile and desktop viewports without media queries.

---

## Quick Reference

### Fluid vs Static Tokens

| Token Range | Behavior | Rationale                                |
| ----------- | -------- | ---------------------------------------- |
| **xs-xl**   | Static   | Optimal reading sizes (12px-20px)        |
| **2xl-5xl** | Fluid    | Headings scale with viewport (20px-48px) |

### Fluid Font Sizes

| Token | CSS Variable                 | Mobile | Desktop | Formula                                    |
| ----- | ---------------------------- | ------ | ------- | ------------------------------------------ |
| 5xl   | `--lufa-token-font-size-5xl` | 32px   | 48px    | `clamp(2rem, 1.5rem + 2vw, 3rem)`          |
| 4xl   | `--lufa-token-font-size-4xl` | 28px   | 36px    | `clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)` |
| 3xl   | `--lufa-token-font-size-3xl` | 24px   | 30px    | `clamp(1.5rem, 1.25rem + 1vw, 1.875rem)`   |
| 2xl   | `--lufa-token-font-size-2xl` | 20px   | 24px    | `clamp(1.25rem, 1rem + 1vw, 1.5rem)`       |

---

## How Fluid Typography Works

### The `clamp()` Function

CSS `clamp()` takes 3 values:

```css
clamp(MIN, PREFERRED, MAX)
```

**Example (5xl token):**

```css
font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
/*              ^^^^  ^^^^^^^^^^^^  ^^^^
/*              MIN   PREFERRED     MAX
/*              32px  viewport-based 48px
```

**How it works:**

1. **Below 320px viewport:** Uses MIN value (32px)
2. **320px - 1280px viewport:** Scales linearly with viewport width
3. **Above 1280px viewport:** Uses MAX value (48px)

### Viewport Calculation

The `PREFERRED` value uses `vw` (viewport width) units:

```
PREFERRED = BASE_SIZE + VIEWPORT_MULTIPLIER

Example (5xl):
  1.5rem + 2vw
  = 24px + 2% of viewport width
```

**At different viewports:**

- 320px viewport: `24px + (320px × 0.02) = 24px + 6.4px = 30.4px`
- 768px viewport: `24px + (768px × 0.02) = 24px + 15.36px = 39.36px`
- 1280px viewport: `24px + (1280px × 0.02) = 24px + 25.6px = 49.6px` → Clamped to 48px (MAX)

---

## Usage Examples

### Basic Usage

```tsx
import { Text } from '@grasdouble/lufa_design-system';

// Automatically responsive (32px → 48px)
<Text variant="heading-5xl">Hero Title</Text>

// Automatically responsive (24px → 30px)
<Text variant="heading-3xl">Section Title</Text>
```

### Custom CSS

```css
.hero-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  /* Scales from 32px (mobile) to 48px (desktop) */

  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
  /* Tighten tracking for large text */
}
```

### React Component

```tsx
import styles from './Hero.module.css';

export function Hero() {
  return <h1 className={styles.title}>Welcome to Lufa</h1>;
}
```

```css
/* Hero.module.css */
.title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  line-height: var(--lufa-primitive-typography-line-height-tight);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
}
```

---

## When to Use Fluid Typography

### ✅ Use Fluid Tokens (2xl-5xl)

**Headings:**

- H1 hero titles
- H2-H4 section headings
- Page titles
- Display text

**Why?**

- Improves visual hierarchy on different devices
- Reduces need for manual breakpoints
- Smooth scaling experience

### ❌ Don't Use Fluid Tokens

**Body text (xs-xl):**

- Paragraphs
- Lists
- Form labels
- Navigation links

**Why?**

- 16px is optimal reading size (WCAG)
- Body text should stay consistent
- Fluid body text harms readability

---

## Browser Support

### Compatibility

`clamp()` is supported in all modern browsers:

| Browser          | Version | Support |
| ---------------- | ------- | ------- |
| Chrome/Edge      | 79+     | ✅      |
| Firefox          | 75+     | ✅      |
| Safari           | 13.1+   | ✅      |
| iOS Safari       | 13.4+   | ✅      |
| Samsung Internet | 12+     | ✅      |

**Coverage:** ~98% of global users (2024+)

### Fallback Strategy

For older browsers (< 2% users), CSS provides automatic fallback:

```css
/* Old browsers ignore clamp(), use last valid value */
.title {
  font-size: 48px; /* Fallback for IE11 */
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem); /* Modern browsers */
}
```

**Design system handles this automatically** - no manual fallback needed.

---

## Customization

### Adjusting Fluid Ranges

If you need different min/max values, override the token:

```css
/* Custom fluid range for your app */
:root {
  --lufa-primitive-typography-font-size-5xl: clamp(2.5rem, 2rem + 2vw, 4rem);
  /*                                               ^^^^^^^^^^^^^^^^^^^^^^^^
  /*                                               40px → 64px (wider range)
}
```

### Creating Custom Fluid Sizes

```css
/* Custom fluid size not in design system */
.custom-heading {
  font-size: clamp(1.125rem, 0.875rem + 1.25vw, 1.75rem);
  /*              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  /*              18px → 28px
}
```

**Formula for custom clamp values:**

```
MIN = minimum font size (rem)
MAX = maximum font size (rem)
VIEWPORT_MIN = 320px (mobile)
VIEWPORT_MAX = 1280px (desktop)

SLOPE = (MAX - MIN) / (VIEWPORT_MAX - VIEWPORT_MIN)
INTERCEPT = MIN - (SLOPE × VIEWPORT_MIN / 16)

clamp(MIN, INTERCEPT + SLOPE × 100vw, MAX)
```

**Tool:** [Fluid Type Scale Calculator](https://www.fluid-type-scale.com/)

---

## Performance Considerations

### Advantages ✅

1. **No JavaScript required** - Pure CSS solution
2. **No media queries** - Reduces CSS complexity
3. **Smooth scaling** - Better UX than breakpoint jumps
4. **Automatic** - Works everywhere automatically

### Considerations ⚠️

1. **Calculation cost** - `clamp()` recalculates on viewport resize
   - **Impact:** Negligible (< 1ms) on modern browsers
   - **Mitigation:** Only used for 4 tokens (2xl-5xl)

2. **Layout shift** - Font size changes during browser resize
   - **Impact:** Expected behavior, not a bug
   - **Mitigation:** Test layouts at various viewport sizes

---

## Testing Responsive Typography

### Manual Testing

**Test at these viewport widths:**

- **320px** - Minimum mobile (iPhone SE)
- **375px** - Standard mobile (iPhone 12/13)
- **768px** - Tablet portrait (iPad)
- **1024px** - Tablet landscape / small laptop
- **1280px** - Desktop (minimum for max size)
- **1920px** - Large desktop (max size stable)

### Browser DevTools

```bash
# Chrome DevTools
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "Responsive" mode
4. Drag viewport width from 320px → 1920px
5. Observe heading sizes scale smoothly
```

### Visual Regression Testing

```tsx
// Storybook story for visual testing
export const ResponsiveTypography: Story = {
  render: () => (
    <div>
      <Text variant="heading-5xl">5xl Heading</Text>
      <Text variant="heading-4xl">4xl Heading</Text>
      <Text variant="heading-3xl">3xl Heading</Text>
      <Text variant="heading-2xl">2xl Heading</Text>
    </div>
  ),
  parameters: {
    viewport: {
      viewports: {
        mobile: { width: 375, height: 667 },
        tablet: { width: 768, height: 1024 },
        desktop: { width: 1280, height: 800 },
      },
    },
  },
};
```

---

## Accessibility

### WCAG Compliance

Fluid typography maintains WCAG 2.1 compliance:

✅ **Success Criterion 1.4.4 (Resize Text):**

- Text can scale up to 200% without loss of content
- `clamp()` respects browser zoom settings

✅ **Success Criterion 1.4.8 (Visual Presentation):**

- Line height ≥ 1.5 for body text (maintained)
- Paragraph spacing ≥ 2× font size (maintained)

✅ **Success Criterion 1.4.12 (Text Spacing):**

- Letter-spacing adjustable (tokens provided)
- Line-height adjustable (tokens provided)

### User Zoom

`clamp()` works correctly with browser zoom:

```
100% zoom: 5xl = 32px → 48px
200% zoom: 5xl = 64px → 96px (doubles as expected)
```

---

## Best Practices

### Do ✅

1. **Use fluid tokens for headings** - Automatic responsive scaling
2. **Keep body text static** - Optimal readability at 16px
3. **Test at multiple viewports** - Ensure smooth scaling
4. **Pair with appropriate letter-spacing** - Tighten for large text
5. **Use semantic tokens** - `heading-5xl` not `font-size-5xl`

### Don't ❌

1. **Don't use fluid for body text** - Harms readability
2. **Don't mix clamp() with media queries** - Unnecessary complexity
3. **Don't create custom fluid sizes without testing** - May not scale well
4. **Don't assume exact pixel values** - Fluid = variable by design
5. **Don't use for small text** - xs-xl should stay static

---

## Migration from Static to Fluid

### Before (v0.7.x)

```css
.hero-title {
  font-size: var(--lufa-token-font-size-5xl); /* Always 48px */
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px; /* Manual mobile size */
  }
}
```

### After (v0.8.0)

```css
.hero-title {
  font-size: var(--lufa-token-font-size-5xl); /* 32px → 48px automatically */
  /* No media query needed! */
}
```

**Result:**

- ✅ Removed 4 lines of code
- ✅ Smooth scaling (no jumps)
- ✅ Works at any viewport width

---

## FAQ

### Q: Why only 4 tokens (2xl-5xl) are fluid?

**A:** Body text (xs-xl) should remain static for optimal readability. 16px is the scientifically-proven optimal reading size. Only headings benefit from fluid scaling.

### Q: Can I disable fluid typography?

**A:** Yes, override tokens with static values:

```css
:root {
  --lufa-primitive-typography-font-size-5xl: 48px; /* Static, no scaling */
}
```

### Q: What about IE11 support?

**A:** IE11 ignores `clamp()` and falls back to the last valid `font-size` declaration. For IE11 support, add explicit fallback:

```css
.title {
  font-size: 48px; /* IE11 fallback */
  font-size: var(--lufa-token-font-size-5xl); /* Modern browsers */
}
```

### Q: How do I calculate custom clamp values?

**A:** Use [Fluid Type Scale Calculator](https://www.fluid-type-scale.com/) or the formula in "Customization" section above.

### Q: Does fluid typography affect performance?

**A:** Negligible impact (< 1ms recalculation on resize). Used sparingly (only 4 tokens), so performance is not a concern.

---

## Related Documentation

- [Typography Tokens](/docs/tokens/typography) - Full typography token reference
- [Letter-Spacing Usage Guide](./letter-spacing-usage-guide.md) - Letter-spacing best practices
- [Text Component](/docs/components/primitives/text) - Pre-configured typography variants
- [ADR-008: Responsive Typography Strategy](../../adrs/ADR-008-responsive-typography-strategy.md) - Architecture decision

---

**Last Updated:** 2026-01-26  
**Version:** 1.0 (Phase 2D)
