# Quick Reference - Design Tokens Cheat Sheet

**Lufa Design System v2.0**  
**Package**: `@grasdouble/lufa_design-system-tokens`

---

## Overview

This is a quick reference guide for developers to find and use design tokens effectively. Use this as your go-to cheat sheet when building components.

---

## Token Decision Tree

**Follow this decision tree to choose the right token:**

```
START: What are you styling?
│
├─ 🎨 COLOR
│  ├─ Brand color (primary/secondary)?
│  │  └─ Use: core.color.brand.primary / core.color.brand.secondary
│  ├─ Semantic state (success/error/warning/info)?
│  │  └─ Use: core.semantic.[state]
│  ├─ UI element (text/background/border)?
│  │  └─ Use: semantic.ui.[element].[context]
│  └─ Component-specific?
│     └─ Use: component.[name].[variant].[property]
│
├─ 📏 SPACING
│  ├─ Component internal spacing?
│  │  └─ Use: component.[name].padding.[size]
│  ├─ Semantic context (compact/comfortable/spacious)?
│  │  └─ Use: semantic.ui.spacing.[context]
│  └─ Specific pixel value?
│     └─ Use: primitive.spacing.[value]
│
├─ ✏️ TYPOGRAPHY
│  ├─ Heading?
│  │  └─ Use: semantic.typography.heading.[1-6]
│  ├─ Body text?
│  │  └─ Use: semantic.typography.body.[large|default|small]
│  ├─ UI element?
│  │  └─ Use: semantic.typography.[caption|label|button]
│  └─ Specific size/weight?
│     └─ Use: primitive.typography.font-[size|weight].[value]
│
├─ 🔲 RADIUS
│  ├─ Component-specific?
│  │  └─ Use: component.[name].border-radius
│  ├─ Semantic UI?
│  │  └─ Use: semantic.ui.border-radius.[small|default|medium|large]
│  └─ Specific value?
│     └─ Use: primitive.radius.scale.[value]
│
└─ 🌑 SHADOW
   ├─ Component elevation?
   │  └─ Use: component.[name].shadow
   ├─ Semantic elevation?
   │  └─ Use: semantic.elevation.[level]
   └─ Specific shadow?
      └─ Use: primitive.shadow.elevation.[level]
```

---

## Most Common Tokens

### 🎨 Colors

#### Brand Colors

```css
/* Primary actions */
--lufa-core-brand-primary
--lufa-core-brand-primary-hover
--lufa-core-brand-primary-active

/* Secondary actions */
--lufa-core-brand-secondary
--lufa-core-brand-secondary-hover
--lufa-core-brand-secondary-active
```

#### Semantic States

```css
/* Success */
--lufa-core-feedback-success
--lufa-core-feedback-success-subtle
--lufa-core-feedback-success-border
--lufa-core-feedback-success-hover

/* Error */
--lufa-core-feedback-error
--lufa-core-feedback-error-subtle
--lufa-core-feedback-error-border
--lufa-core-feedback-error-hover

/* Warning */
--lufa-core-feedback-warning
--lufa-core-feedback-warning-subtle
--lufa-core-feedback-warning-border
--lufa-core-feedback-warning-hover

/* Info */
--lufa-core-feedback-info
--lufa-core-feedback-info-subtle
--lufa-core-feedback-info-border
--lufa-core-feedback-info-hover
```

#### UI Colors

```css
/* Text */
--lufa-semantic-ui-text-primary
--lufa-semantic-ui-text-secondary
--lufa-semantic-ui-text-tertiary

/* Background */
--lufa-semantic-ui-background-default
--lufa-semantic-ui-background-subtle
--lufa-semantic-ui-background-hover

/* Border */
--lufa-semantic-ui-border-default
--lufa-semantic-ui-border-hover
--lufa-semantic-ui-border-focus
```

---

### 📏 Spacing

#### Most Used Values

```css
--lufa-primitive-spacing-4    /* 4px  - icon gaps */
--lufa-primitive-spacing-8    /* 8px  - tight spacing */
--lufa-primitive-spacing-12   /* 12px - comfortable */
--lufa-primitive-spacing-16   /* 16px - base/default */
--lufa-primitive-spacing-24   /* 24px - spacious */
--lufa-primitive-spacing-32   /* 32px - ample */
--lufa-primitive-spacing-48   /* 48px - very ample */
```

#### Semantic Spacing

```css
--lufa-semantic-ui-spacing-compact      /* 8px */
--lufa-semantic-ui-spacing-default      /* 12px */
--lufa-semantic-ui-spacing-comfortable  /* 16px */
--lufa-semantic-ui-spacing-spacious     /* 24px */
```

---

### ✏️ Typography

#### Font Sizes

```css
--lufa-primitive-typography-font-size-xs     /* 12px */
--lufa-primitive-typography-font-size-sm     /* 14px */
--lufa-primitive-typography-font-size-base   /* 16px */
--lufa-primitive-typography-font-size-lg     /* 18px */
--lufa-primitive-typography-font-size-xl     /* 20px */
--lufa-primitive-typography-font-size-2xl    /* 20-24px (fluid) */
--lufa-primitive-typography-font-size-3xl    /* 24-30px (fluid) */
--lufa-primitive-typography-font-size-4xl    /* 28-36px (fluid) */
--lufa-primitive-typography-font-size-5xl    /* 32-48px (fluid) */
```

#### Font Weights

```css
--lufa-primitive-typography-font-weight-normal    /* 400 */
--lufa-primitive-typography-font-weight-medium    /* 500 */
--lufa-primitive-typography-font-weight-semibold  /* 600 */
--lufa-primitive-typography-font-weight-bold      /* 700 */
```

#### Line Heights

```css
--lufa-primitive-typography-line-height-tight    /* 1.25 */
--lufa-primitive-typography-line-height-normal   /* 1.5 */
--lufa-primitive-typography-line-height-relaxed  /* 1.75 */
```

#### Semantic Typography

```css
/* Headings */
--lufa-semantic-typography-heading-1  /* H1 - 32-48px */
--lufa-semantic-typography-heading-2  /* H2 - 28-36px */
--lufa-semantic-typography-heading-3  /* H3 - 24-30px */
--lufa-semantic-typography-heading-4  /* H4 - 20-24px */

/* Body */
--lufa-semantic-typography-body-large    /* 18px */
--lufa-semantic-typography-body-default  /* 16px */
--lufa-semantic-typography-body-small    /* 14px */

/* UI */
--lufa-semantic-typography-caption  /* 12px */
--lufa-semantic-typography-label    /* 14px */
--lufa-semantic-typography-button   /* 16px */
```

---

### 🔲 Border Radius

```css
--lufa-primitive-radius-scale-none  /* 0px */
--lufa-primitive-radius-scale-sm    /* 2px */
--lufa-primitive-radius-scale-base  /* 4px */
--lufa-primitive-radius-scale-md    /* 6px */
--lufa-primitive-radius-scale-lg    /* 8px */
--lufa-primitive-radius-scale-xl    /* 12px */
--lufa-primitive-radius-scale-full  /* 9999px (circle) */

/* Semantic */
--lufa-semantic-ui-border-radius-small   /* 2px */
--lufa-semantic-ui-border-radius-default /* 4px */
--lufa-semantic-ui-border-radius-medium  /* 6px */
--lufa-semantic-ui-border-radius-large   /* 8px */
--lufa-semantic-ui-border-radius-full    /* 9999px */
```

---

### 🌑 Shadows

```css
--lufa-primitive-shadow-elevation-none  /* No shadow */
--lufa-primitive-shadow-elevation-sm    /* Light shadow */
--lufa-primitive-shadow-elevation-base  /* Standard shadow */
--lufa-primitive-shadow-elevation-md    /* Medium shadow */
--lufa-primitive-shadow-elevation-lg    /* Large shadow */
--lufa-primitive-shadow-elevation-xl    /* Extra large shadow */
```

---

## Component Patterns

### 🔘 Button

```css
.button {
  /* Typography */
  font-size: var(--lufa-component-button-font-size-md);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);

  /* Spacing */
  padding: var(--lufa-component-button-padding-md);

  /* Radius */
  border-radius: var(--lufa-component-button-border-radius);
}

/* Primary */
.button-primary {
  background: var(--lufa-component-button-primary-background);
  color: var(--lufa-component-button-primary-text);
}

.button-primary:hover {
  background: var(--lufa-component-button-primary-background-hover);
}

.button-primary:active {
  background: var(--lufa-component-button-primary-background-active);
}

/* Sizes */
.button-sm {
  padding: var(--lufa-component-button-padding-sm);
  font-size: var(--lufa-component-button-font-size-sm);
}

.button-lg {
  padding: var(--lufa-component-button-padding-lg);
  font-size: var(--lufa-component-button-font-size-lg);
}
```

---

### 🃏 Card

```css
.card {
  background: var(--lufa-semantic-ui-background-default);
  border: 1px solid var(--lufa-semantic-ui-border-default);
  border-radius: var(--lufa-semantic-ui-border-radius-default);
  padding: var(--lufa-primitive-spacing-16);
  box-shadow: var(--lufa-primitive-shadow-elevation-sm);
}

.card:hover {
  border-color: var(--lufa-semantic-ui-border-hover);
  box-shadow: var(--lufa-primitive-shadow-elevation-md);
}
```

---

### 📝 Input

```css
.input {
  font-size: var(--lufa-semantic-typography-body-default);
  padding: var(--lufa-primitive-spacing-12) var(--lufa-primitive-spacing-16);
  border: 1px solid var(--lufa-semantic-ui-border-default);
  border-radius: var(--lufa-semantic-ui-border-radius-small);
  background: var(--lufa-semantic-ui-background-default);
}

.input:hover {
  border-color: var(--lufa-semantic-ui-border-hover);
}

.input:focus {
  border-color: var(--lufa-core-brand-primary);
  outline: 2px solid var(--lufa-core-brand-primary);
  outline-offset: 2px;
}

.input-error {
  border-color: var(--lufa-core-feedback-error);
}

.input-error:focus {
  border-color: var(--lufa-core-feedback-error);
  outline-color: var(--lufa-core-feedback-error);
}
```

---

### 🚨 Alert

```css
/* Success Alert */
.alert-success {
  background: var(--lufa-core-feedback-success-subtle);
  border: 1px solid var(--lufa-core-feedback-success-border);
  color: var(--lufa-core-feedback-success);
  padding: var(--lufa-primitive-spacing-12);
  border-radius: var(--lufa-primitive-radius-scale-base);
}

/* Error Alert */
.alert-error {
  background: var(--lufa-core-feedback-error-subtle);
  border: 1px solid var(--lufa-core-feedback-error-border);
  color: var(--lufa-core-feedback-error);
  padding: var(--lufa-primitive-spacing-12);
  border-radius: var(--lufa-primitive-radius-scale-base);
}

/* Warning Alert */
.alert-warning {
  background: var(--lufa-core-feedback-warning-subtle);
  border: 1px solid var(--lufa-core-feedback-warning-border);
  color: var(--lufa-core-feedback-warning);
  padding: var(--lufa-primitive-spacing-12);
  border-radius: var(--lufa-primitive-radius-scale-base);
}

/* Info Alert */
.alert-info {
  background: var(--lufa-core-feedback-info-subtle);
  border: 1px solid var(--lufa-core-feedback-info-border);
  color: var(--lufa-core-feedback-info);
  padding: var(--lufa-primitive-spacing-12);
  border-radius: var(--lufa-primitive-radius-scale-base);
}
```

---

### 🏷️ Badge

```css
.badge {
  font-size: var(--lufa-primitive-typography-font-size-xs);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  padding: 2px var(--lufa-primitive-spacing-8);
  border-radius: var(--lufa-primitive-radius-scale-full);
  background: var(--lufa-core-brand-primary);
  color: white;
}

.badge-secondary {
  background: var(--lufa-core-brand-secondary);
}

.badge-success {
  background: var(--lufa-core-feedback-success);
}

.badge-error {
  background: var(--lufa-core-feedback-error);
}
```

---

## Viewport Adaptation Quick Reference

### Fluid vs Responsive Tokens

The Lufa Design System uses **two approaches** for viewport adaptation:

| Approach       | Method        | Count     | Use Case                      |
| -------------- | ------------- | --------- | ----------------------------- |
| **Fluid**      | CSS `clamp()` | 11 tokens | Typography (smooth scaling)   |
| **Responsive** | Media queries | 18 tokens | Layout (discrete breakpoints) |

**See [ARCHITECTURE.md](./ARCHITECTURE.md#viewport-adaptation-strategy) for complete guide.**

---

### Fluid Tokens (11 total)

**Typography - Continuous Scaling:**

```css
/* Heading sizes that scale smoothly */
--lufa-primitive-typography-font-size-2xl  /* 20px → 24px */
--lufa-primitive-typography-font-size-3xl  /* 24px → 30px */
--lufa-primitive-typography-font-size-4xl  /* 28px → 36px */
--lufa-primitive-typography-font-size-5xl  /* 32px → 48px */
--lufa-primitive-typography-font-size-6xl  /* 40px → 56px */
--lufa-primitive-typography-font-size-7xl  /* 48px → 64px */
--lufa-primitive-typography-font-size-8xl  /* 56px → 72px */
```

**Layout - Special Cases:**

```css
/* Large-scale fluid spacing (4 tokens) */
--lufa-core-layout-hero-section-padding-fluid
--lufa-core-layout-large-vertical-gap-fluid
--lufa-core-layout-full-width-spacing-fluid
--lufa-core-layout-immersive-padding-fluid
```

**CSS Output:**

```css
font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
/* Scales smoothly from 32px to 48px */
```

---

### Responsive Tokens (18 total)

**Layout - Discrete Breakpoints:**

Each token has **3 variants**: `base` (mobile), `md` (tablet 768px+), `lg` (desktop 1024px+)

**Page Layout (6 tokens):**

```css
/* Page padding */
--lufa-core-layout-page-padding-base  /* 16px */
--lufa-core-layout-page-padding-md    /* 24px at 768px+ */
--lufa-core-layout-page-padding-lg    /* 32px at 1024px+ */

/* Section spacing */
--lufa-core-layout-section-gap-base   /* 48px */
--lufa-core-layout-section-gap-md     /* 64px at 768px+ */
--lufa-core-layout-section-gap-lg     /* 80px at 1024px+ */
```

**Container Layout (6 tokens):**

```css
/* Container gutters */
--lufa-core-layout-container-gutter-base  /* 16px */
--lufa-core-layout-container-gutter-md    /* 24px at 768px+ */
--lufa-core-layout-container-gutter-lg    /* 32px at 1024px+ */

/* Grid gaps */
--lufa-core-layout-grid-gap-base      /* 16px */
--lufa-core-layout-grid-gap-md        /* 20px at 768px+ */
--lufa-core-layout-grid-gap-lg        /* 24px at 1024px+ */
```

**Component Layout (6 tokens):**

```css
/* Header height */
--lufa-core-layout-header-height-base /* 56px */
--lufa-core-layout-header-height-md   /* 64px at 768px+ */
--lufa-core-layout-header-height-lg   /* 72px at 1024px+ */

/* Modal padding */
--lufa-core-layout-modal-padding-base /* 16px */
--lufa-core-layout-modal-padding-md   /* 24px at 768px+ */
--lufa-core-layout-modal-padding-lg   /* 32px at 1024px+ */
```

**CSS Output:**

```css
padding: var(--lufa-core-layout-page-padding-base); /* 16px */

@media (min-width: 768px) {
  padding: var(--lufa-core-layout-page-padding-md); /* 24px */
}

@media (min-width: 1024px) {
  padding: var(--lufa-core-layout-page-padding-lg); /* 32px */
}
```

---

### When to Use Which

| Scenario         | Approach       | Token Example                                 |
| ---------------- | -------------- | --------------------------------------------- |
| H1 heading       | **Fluid**      | `primitive.typography.font-size.5xl`          |
| H2 heading       | **Fluid**      | `primitive.typography.font-size.4xl`          |
| H3 heading       | **Fluid**      | `primitive.typography.font-size.3xl`          |
| Body text        | Fixed          | `primitive.typography.font-size.base`         |
| Caption text     | Fixed          | `primitive.typography.font-size.xs`           |
| Page padding     | **Responsive** | `core.layout.page-padding.{base\|md\|lg}`     |
| Section gap      | **Responsive** | `core.layout.section-gap.{base\|md\|lg}`      |
| Container gutter | **Responsive** | `core.layout.container-gutter.{base\|md\|lg}` |
| Button padding   | Fixed          | `component.button.padding.md`                 |
| Card spacing     | Fixed          | `primitive.spacing.16`                        |

---

### Decision Tree

```
Need viewport adaptation?
│
├─ Typography (font-size)?
│  ├─ Large heading (20px+)?
│  │  └─ Use FLUID tokens (2xl-8xl)
│  └─ Body/UI text?
│     └─ Use FIXED tokens (xs-xl)
│
└─ Layout spacing?
   ├─ Page/section/container?
   │  └─ Use RESPONSIVE tokens ({base|md|lg})
   └─ Component-specific?
      └─ Use FIXED tokens (primitive.spacing.*)
```

---

## Common Use Cases

### Form Layout

```css
.form {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-primitive-spacing-16);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-primitive-spacing-8);
}

.form-label {
  font-size: var(--lufa-semantic-typography-label);
  font-weight: var(--lufa-primitive-typography-font-weight-medium);
  color: var(--lufa-semantic-ui-text-primary);
}

.form-input {
  font-size: var(--lufa-semantic-typography-body-default);
  padding: var(--lufa-primitive-spacing-12) var(--lufa-primitive-spacing-16);
  border: 1px solid var(--lufa-semantic-ui-border-default);
  border-radius: var(--lufa-semantic-ui-border-radius-small);
}

.form-help {
  font-size: var(--lufa-semantic-typography-caption);
  color: var(--lufa-semantic-ui-text-secondary);
}

.form-error {
  font-size: var(--lufa-semantic-typography-caption);
  color: var(--lufa-core-feedback-error);
}
```

---

### Page Layout

```css
.page {
  padding: var(--lufa-primitive-spacing-16);
}

@media (min-width: 768px) {
  .page {
    padding: var(--lufa-primitive-spacing-32);
  }
}

.page-header {
  margin-bottom: var(--lufa-primitive-spacing-48);
}

.page-title {
  font-size: var(--lufa-semantic-typography-heading-1);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  color: var(--lufa-semantic-ui-text-primary);
  margin-bottom: var(--lufa-primitive-spacing-16);
}

.page-section {
  margin-bottom: var(--lufa-primitive-spacing-32);
}

.section-title {
  font-size: var(--lufa-semantic-typography-heading-2);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  margin-bottom: var(--lufa-primitive-spacing-16);
}
```

---

### Grid Layout

```css
.grid {
  display: grid;
  gap: var(--lufa-primitive-spacing-16);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.grid-tight {
  gap: var(--lufa-primitive-spacing-8);
}

.grid-spacious {
  gap: var(--lufa-primitive-spacing-24);
}

@media (min-width: 768px) {
  .grid {
    gap: var(--lufa-primitive-spacing-24);
  }
}
```

---

## Finding the Right Token

### Ask These Questions:

1. **Is it a raw value?**
   - YES → Use `primitive.*` tokens
   - Examples: `primitive.spacing.16`, `primitive.color.blue.600`

2. **Does it have semantic meaning?**
   - YES → Use `core.semantic.*` or `semantic.ui.*`
   - Examples: `core.semantic.success`, `semantic.ui.text.primary`

3. **Is it component-specific?**
   - YES → Use `component.[name].*`
   - Examples: `component.button.padding.md`, `component.card.shadow`

4. **Does it vary by theme/mode?**
   - YES → Use core or semantic tokens (they're mode-aware)
   - NO → Use primitive tokens (they're static)

---

## Token Naming Patterns

### Structure

```
{level}.{category}.{subcategory}.{variant}.{property}.{state}
```

### Examples

```css
/* Primitive */
primitive.color.blue.600
primitive.spacing.16
primitive.typography.font-size.base

/* Core */
core.color.brand.primary
core.semantic.success
core.semantic.error-subtle

/* Semantic */
semantic.ui.text.primary
semantic.ui.spacing.default
semantic.typography.heading-1

/* Component */
component.button.padding.md
component.button.primary.background
component.button.primary.background-hover
```

---

## CSS vs JSON Usage

### CSS (Primary Usage)

```css
.my-component {
  color: var(--lufa-core-brand-primary);
  padding: var(--lufa-primitive-spacing-16);
  font-size: var(--lufa-semantic-typography-body-default);
}
```

### JSON (Documentation/Storybook)

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens/values';

const primaryColor = tokens.primitive.color.blue['600'];
const defaultSpacing = tokens.primitive.spacing['16'];
```

---

## Tips & Best Practices

### ✅ DO

- Use semantic tokens for UI elements
- Use component tokens for component-specific styles
- Use CSS custom properties in components
- Reference tokens by their contextual meaning
- Use mode-aware tokens for themeable elements
- **Use fluid tokens (clamp) for large headings**
- **Use responsive tokens (@media) for layout spacing**
- **Check ARCHITECTURE.md#viewport-adaptation-strategy when adding viewport-adaptive tokens**

### ❌ DON'T

- Hardcode color/spacing values
- Use primitive tokens directly in components (use semantic/component instead)
- Create inline styles with token values
- Mix token levels inappropriately
- Use non-semantic names in production code
- **Use responsive (@media) for typography** - Creates CSS bloat
- **Use fluid (clamp) for layout spacing** - Creates unpredictable values
- **Make a token both fluid AND responsive** - They are mutually exclusive

---

## Token Reference by Property

| Property        | Primitive                                   | Semantic                                | Component                            |
| --------------- | ------------------------------------------- | --------------------------------------- | ------------------------------------ |
| **Color**       | `primitive.color.[color].[shade]`           | `semantic.ui.text/background/border.*`  | `component.[name].[variant].[color]` |
| **Spacing**     | `primitive.spacing.[value]`                 | `semantic.ui.spacing.[context]`         | `component.[name].padding.[size]`    |
| **Font Size**   | `primitive.typography.font-size.[size]`     | `semantic.typography.[heading\|body].*` | `component.[name].font-size.[size]`  |
| **Font Weight** | `primitive.typography.font-weight.[weight]` | -                                       | -                                    |
| **Line Height** | `primitive.typography.line-height.[value]`  | -                                       | -                                    |
| **Radius**      | `primitive.radius.scale.[value]`            | `semantic.ui.border-radius.[size]`      | `component.[name].border-radius`     |
| **Shadow**      | `primitive.shadow.elevation.[level]`        | `semantic.elevation.[level]`            | `component.[name].shadow`            |

---

## Quick Search by Use Case

| I need to...           | Use this token                                          |
| ---------------------- | ------------------------------------------------------- |
| Style a primary button | `component.button.primary.*`                            |
| Add success feedback   | `core.semantic.success`                                 |
| Set body text color    | `semantic.ui.text.primary`                              |
| Add default spacing    | `primitive.spacing.16` or `semantic.ui.spacing.default` |
| Style an H1 heading    | `semantic.typography.heading-1`                         |
| Round button corners   | `component.button.border-radius`                        |
| Add card shadow        | `primitive.shadow.elevation-sm`                         |
| Create form layout     | `semantic.ui.spacing.default`                           |
| Style error message    | `core.semantic.error`                                   |
| Set input border       | `semantic.ui.border.default`                            |

---

**Last Updated**: February 2026  
**Version**: 2.0.0  
**Status**: ✅ Complete

**Need more details?** Check out:

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 4-level hierarchy, naming conventions, fluid vs responsive, build system
- [TOKENS.md](./TOKENS.md) - Colors, typography, spacing reference tables
- [USAGE.md](./USAGE.md) - CSS Modules pattern, anti-patterns, ESLint rules
