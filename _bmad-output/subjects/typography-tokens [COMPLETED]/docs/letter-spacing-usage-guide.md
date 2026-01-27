# Letter-Spacing Usage Guide

**Subject:** typography-tokens  
**Version:** 1.0  
**Date:** 2026-01-26  
**Audience:** Developers, Designers

---

## Overview

Letter-spacing (also called "tracking" in typography) controls the horizontal space between characters. The Lufa Design System provides **5 letter-spacing tokens** for fine-tuning typography readability and aesthetics.

---

## Quick Reference

### Available Tokens

| Token     | CSS Variable                                         | Value   | Use Case                           |
| --------- | ---------------------------------------------------- | ------- | ---------------------------------- |
| `tighter` | `--lufa-primitive-typography-letter-spacing-tighter` | -0.04em | Display text, extra large headings |
| `tight`   | `--lufa-primitive-typography-letter-spacing-tight`   | -0.02em | Large headings (H1-H3)             |
| `normal`  | `--lufa-primitive-typography-letter-spacing-normal`  | 0       | Body text (default)                |
| `wide`    | `--lufa-primitive-typography-letter-spacing-wide`    | 0.05em  | Small text, uppercase labels       |
| `wider`   | `--lufa-primitive-typography-letter-spacing-wider`   | 0.1em   | All-caps headings, button text     |

### Recommended Pairings

| Font Size   | Recommended Letter-Spacing | Rationale                            |
| ----------- | -------------------------- | ------------------------------------ |
| 5xl (48px)  | `tight` (-0.02em)          | Large text looks better condensed    |
| 4xl (36px)  | `tight` (-0.02em)          | Large text looks better condensed    |
| 3xl (30px)  | `tight` (-0.02em)          | Large text looks better condensed    |
| 2xl (24px)  | `normal` (0)               | Balanced at this size                |
| base (16px) | `normal` (0)               | Optimal for body text                |
| sm (14px)   | `normal` or `wide`         | Uppercase labels use `wide`          |
| xs (12px)   | `wide` (0.05em)            | Small text needs more breathing room |

---

## Why Letter-Spacing Matters

### Typography Science

**Large text (> 30px):**

- Characters appear **too spaced out** at default spacing
- Negative letter-spacing (-0.02em) improves density and cohesion
- Makes headings feel more intentional and designed

**Small text (< 14px):**

- Characters appear **too cramped** at default spacing
- Positive letter-spacing (+0.05em) improves readability
- Especially important for uppercase text

**Body text (14-20px):**

- Default spacing (0) is optimal for reading
- Don't adjust unless specific design reason

### Visual Examples

```
❌ Without adjustment:
H E R O   T I T L E        (48px, 0 letter-spacing - too loose)
small text                 (12px, 0 letter-spacing - too cramped)

✅ With proper letter-spacing:
HERO TITLE                 (48px, -0.02em - improved)
s m a l l  t e x t        (12px, +0.05em - improved)
```

---

## Usage Examples

### Basic CSS

```css
/* Large heading - tighten spacing */
.hero-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
}

/* Uppercase label - widen spacing */
.label {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  text-transform: uppercase;
}

/* Body text - keep default */
.body {
  font-size: var(--lufa-primitive-typography-font-size-base);
  /* letter-spacing: normal (browser default, no need to specify) */
}
```

### React Component

```tsx
import styles from './Hero.module.css';

export function Hero() {
  return (
    <div>
      <h1 className={styles.title}>Welcome</h1>
      <p className={styles.subtitle}>Build amazing products</p>
    </div>
  );
}
```

```css
/* Hero.module.css */
.title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
  /* Tighter tracking for large heading */
}

.subtitle {
  font-size: var(--lufa-primitive-typography-font-size-xl);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-normal);
  /* Normal tracking for subtitle */
}
```

### Uppercase Text

```css
/* Section label - uppercase needs wider spacing */
.section-label {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  text-transform: uppercase;
  color: var(--lufa-semantic-ui-text-secondary);
}

/* All-caps heading - extra wide spacing */
.all-caps-heading {
  font-size: var(--lufa-primitive-typography-font-size-2xl);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wider);
  text-transform: uppercase;
}
```

### Button Text

```css
/* Button with uppercase text */
.button {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wider);
  text-transform: uppercase;
  /* Wider tracking makes button text more readable */
}
```

---

## Use Case Matrix

### When to Use Each Token

#### `tighter` (-0.04em)

**Use for:**

- Display text (60px+)
- Extra large headings (6xl-8xl, when added)
- Hero banners with massive type

**Example:**

```css
.display-text {
  font-size: 72px; /* Custom large size */
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tighter);
}
```

**Why:** Very large text appears too loose at default spacing.

---

#### `tight` (-0.02em)

**Use for:**

- Large headings (H1, H2, H3)
- Font sizes 3xl-5xl (30px-48px)
- Page titles, section headings

**Example:**

```css
.page-title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
}
```

**Why:** Large headings benefit from slight condensing for better visual cohesion.

---

#### `normal` (0)

**Use for:**

- Body text (all sizes)
- Paragraphs, lists, descriptions
- Standard UI text
- Font sizes xs-2xl (12px-24px) without uppercase

**Example:**

```css
.body-text {
  font-size: var(--lufa-primitive-typography-font-size-base);
  /* No letter-spacing needed - browser default is perfect */
}
```

**Why:** Default browser spacing is scientifically optimal for reading.

---

#### `wide` (0.05em)

**Use for:**

- Small text (xs, sm)
- Uppercase labels (not headings)
- Captions, footnotes
- Secondary navigation

**Example:**

```css
.caption {
  font-size: var(--lufa-primitive-typography-font-size-xs);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  color: var(--lufa-semantic-ui-text-secondary);
}

.nav-label {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  text-transform: uppercase;
}
```

**Why:** Small text (especially uppercase) needs breathing room for legibility.

---

#### `wider` (0.1em)

**Use for:**

- All-caps headings
- Button text (uppercase)
- Badge text
- Section labels (uppercase)

**Example:**

```css
.button-text {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wider);
  text-transform: uppercase;
}

.section-heading {
  font-size: var(--lufa-primitive-typography-font-size-base);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wider);
  text-transform: uppercase;
}
```

**Why:** All-caps text requires significantly more spacing for readability.

---

## Real-World Component Examples

### Hero Section

```tsx
// Hero.tsx
export function Hero() {
  return (
    <section className={styles.hero}>
      <span className={styles.eyebrow}>New Feature</span>
      <h1 className={styles.title}>Build Faster</h1>
      <p className={styles.description}>Create amazing products with our design system</p>
    </section>
  );
}
```

```css
/* Hero.module.css */
.eyebrow {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  text-transform: uppercase;
  color: var(--lufa-semantic-ui-text-brand);
}

.title {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
  line-height: var(--lufa-primitive-typography-line-height-tight);
}

.description {
  font-size: var(--lufa-primitive-typography-font-size-lg);
  /* letter-spacing: normal (default, no need to specify) */
  line-height: var(--lufa-primitive-typography-line-height-normal);
}
```

### Card Component

```tsx
// Card.tsx
export function Card({ title, description, label }) {
  return (
    <div className={styles.card}>
      {label && <span className={styles.label}>{label}</span>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
```

```css
/* Card.module.css */
.label {
  font-size: var(--lufa-primitive-typography-font-size-xs);
  font-weight: var(--lufa-primitive-typography-font-weight-medium);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  text-transform: uppercase;
  color: var(--lufa-semantic-ui-text-secondary);
}

.title {
  font-size: var(--lufa-primitive-typography-font-size-2xl);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  /* letter-spacing: normal (good at 24px) */
}

.description {
  font-size: var(--lufa-primitive-typography-font-size-base);
  /* letter-spacing: normal (body text default) */
  color: var(--lufa-semantic-ui-text-secondary);
}
```

### Button Component

```tsx
// Button.tsx
export function Button({ children, ...props }) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
```

```css
/* Button.module.css */
.button {
  font-size: var(--lufa-primitive-typography-font-size-sm);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wider);
  text-transform: uppercase;
  /* Wider spacing makes button text clearer and more clickable feel */
}
```

---

## Accessibility Considerations

### WCAG Compliance

Letter-spacing tokens maintain WCAG 2.1 compliance:

✅ **Success Criterion 1.4.12 (Text Spacing):**

- Users can override letter-spacing up to 0.12em
- All tokens are within safe range (-0.04em to 0.1em)

✅ **Success Criterion 1.4.4 (Resize Text):**

- `em` units scale proportionally with text size
- Works correctly with browser zoom (200%+)

### Best Practices

**Do ✅:**

- Use `em` units (relative to font-size)
- Allow user overrides
- Test with increased letter-spacing (accessibility settings)

**Don't ❌:**

- Use `px` units for letter-spacing (doesn't scale)
- Set extreme values (< -0.05em or > 0.15em)
- Force letter-spacing on body text

---

## Design Tokens Integration

### Token Structure

```json
// tokens/src/primitives/typography/letter-spacing.json
{
  "primitive": {
    "typography": {
      "letter-spacing": {
        "tight": {
          "$value": "-0.02em",
          "$type": "dimension",
          "$description": "Tight letter spacing for large headings"
        }
      }
    }
  }
}
```

### CSS Output

```css
:root {
  --lufa-primitive-typography-letter-spacing-tighter: -0.04em;
  --lufa-primitive-typography-letter-spacing-tight: -0.02em;
  --lufa-primitive-typography-letter-spacing-normal: 0;
  --lufa-primitive-typography-letter-spacing-wide: 0.05em;
  --lufa-primitive-typography-letter-spacing-wider: 0.1em;
}
```

### TypeScript/JavaScript

```ts
import tokens from '@grasdouble/lufa_design-system-tokens';

const styles = {
  letterSpacing: tokens.primitive.typography.letterSpacing.tight,
  // Returns: "-0.02em"
};
```

---

## Common Mistakes

### ❌ Mistake 1: Applying to Body Text

```css
/* DON'T: Don't adjust body text letter-spacing */
.body {
  font-size: 16px;
  letter-spacing: 0.05em; /* ❌ Makes body text harder to read */
}
```

**Fix:**

```css
/* DO: Use default (normal) for body text */
.body {
  font-size: var(--lufa-primitive-typography-font-size-base);
  /* letter-spacing: normal (browser default is perfect) */
}
```

---

### ❌ Mistake 2: Forgetting Uppercase

```css
/* DON'T: Uppercase without wider spacing */
.label {
  text-transform: uppercase;
  letter-spacing: 0; /* ❌ Too cramped */
}
```

**Fix:**

```css
/* DO: Uppercase always needs wider spacing */
.label {
  text-transform: uppercase;
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
}
```

---

### ❌ Mistake 3: Using px Units

```css
/* DON'T: px units don't scale with font-size */
.heading {
  font-size: 48px;
  letter-spacing: -1px; /* ❌ Doesn't scale */
}
```

**Fix:**

```css
/* DO: em units scale proportionally */
.heading {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
  /* -0.02em scales with font size */
}
```

---

### ❌ Mistake 4: Extreme Values

```css
/* DON'T: Extreme values hurt readability */
.bad-heading {
  letter-spacing: -0.1em; /* ❌ Too tight - letters overlap */
}

.bad-label {
  letter-spacing: 0.3em; /* ❌ Too wide - letters disconnect */
}
```

**Fix:**

```css
/* DO: Use design system tokens (safe ranges) */
.good-heading {
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
  /* -0.02em - safe and tested */
}

.good-label {
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wider);
  /* 0.1em - safe maximum */
}
```

---

## Testing Letter-Spacing

### Visual Testing Checklist

Test letter-spacing at different:

1. **Font sizes** (xs, base, 3xl, 5xl)
2. **Font weights** (regular, semibold, bold)
3. **Text transforms** (lowercase, uppercase, capitalize)
4. **Zoom levels** (100%, 150%, 200%)
5. **Browsers** (Chrome, Firefox, Safari)

### Browser DevTools

```bash
# Inspect computed letter-spacing
1. Right-click element → Inspect
2. Check "Computed" tab
3. Find "letter-spacing" value
4. Verify it matches expected token value
```

### Storybook Testing

```tsx
// Storybook story for visual comparison
export const LetterSpacingComparison: Story = {
  render: () => (
    <div>
      <h1 style={{ letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tighter)' }}>Tighter (-0.04em)</h1>
      <h1 style={{ letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tight)' }}>Tight (-0.02em)</h1>
      <h1 style={{ letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-normal)' }}>Normal (0)</h1>
      <h1 style={{ letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wide)' }}>Wide (0.05em)</h1>
      <h1 style={{ letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wider)' }}>Wider (0.1em)</h1>
    </div>
  ),
};
```

---

## Best Practices Summary

### Do ✅

1. **Use `tight` for large headings (3xl-5xl)** - Improves visual cohesion
2. **Use `wide` or `wider` for uppercase** - Essential for readability
3. **Use `wide` for small text (xs)** - Prevents cramping
4. **Keep body text at `normal`** - Optimal for reading
5. **Use design system tokens** - Pre-tested and accessible
6. **Test with uppercase** - Uppercase needs more spacing

### Don't ❌

1. **Don't adjust body text letter-spacing** - Harms readability
2. **Don't use px units** - Use `em` for scaling
3. **Don't use extreme values** - Stay within -0.05em to 0.15em
4. **Don't forget uppercase needs spacing** - Always pair with `wide` or `wider`
5. **Don't apply same spacing to all sizes** - Large and small text need different treatment

---

## FAQ

### Q: Why doesn't the Text component apply letter-spacing automatically?

**A:** Letter-spacing is context-dependent (uppercase vs lowercase, design intent). Applying it automatically would force one style on everyone. We provide tokens for you to apply when needed.

### Q: Should I use letter-spacing for every heading?

**A:** Only for **large headings (3xl-5xl)**. Smaller headings (xl, 2xl) look fine at default spacing.

### Q: What about buttons with mixed case text?

**A:** Mixed-case buttons don't need letter-spacing adjustment. Only use `wider` for **uppercase** button text.

### Q: Can I create custom letter-spacing values?

**A:** Yes, but test thoroughly. Values outside -0.05em to 0.15em often hurt readability.

---

## Related Documentation

- [Typography Tokens](/docs/tokens/typography) - Full typography token reference
- [Responsive Typography Guide](./responsive-typography-guide.md) - Fluid typography with clamp()
- [Text Component](/docs/components/primitives/text) - Pre-configured typography variants
- [ADR-009: Letter-Spacing Token Architecture](../../adrs/ADR-009-letter-spacing-token-architecture.md) - Architecture decision

---

**Last Updated:** 2026-01-26  
**Version:** 1.0 (Phase 2D)
