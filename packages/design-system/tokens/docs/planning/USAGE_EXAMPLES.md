# Using Core Tokens - Quick Examples

This guide shows how to use the new **Level 2 Core Tokens** in your components.

---

## 📋 Table of Contents

1. [Brand Colors](#brand-colors)
2. [Neutral Colors](#neutral-colors)
3. [Semantic Colors](#semantic-colors)
4. [Layout Spacing](#layout-spacing)
5. [Component Spacing](#component-spacing)
6. [Typography](#typography)

---

## 🎨 Brand Colors

### Primary Brand Color

```css
/* CSS - Use CSS custom properties */
.button-primary {
  background-color: var(--core-brand-primary);
  color: white;
}

.button-primary:hover {
  background-color: var(--core-brand-primary-hover);
}

.button-primary:active {
  background-color: var(--core-brand-primary-active);
}
```

```typescript
// TypeScript - Import token object
import tokens from '@grasdouble/lufa_design-system-tokens';

const styles = {
  backgroundColor: tokens.core.brand.primary,
  ':hover': {
    backgroundColor: tokens.core.brand.primaryHover,
  },
};
```

### Secondary Brand Color

```css
.badge-accent {
  background-color: var(--core-brand-secondary);
  color: white;
}
```

---

## 🖼️ Neutral Colors

### Page Layout

```css
/* Page background */
body {
  background-color: var(--core-neutral-background);
  color: var(--core-neutral-text-primary);
}

/* Card surface */
.card {
  background-color: var(--core-neutral-surface);
  border: 1px solid var(--core-neutral-border);
}

.card:hover {
  background-color: var(--core-neutral-surface-hover);
}
```

### Text Hierarchy

```css
/* Primary text - headings, body */
h1,
h2,
h3,
p {
  color: var(--core-neutral-text-primary);
}

/* Secondary text - descriptions, captions */
.description {
  color: var(--core-neutral-text-secondary);
}

/* Tertiary text - metadata, timestamps */
.metadata {
  color: var(--core-neutral-text-tertiary);
}

/* Disabled text */
.disabled {
  color: var(--core-neutral-text-disabled);
}
```

---

## ✅ Semantic Colors

### Success Alert

```css
.alert-success {
  background-color: var(--core-semantic-success-subtle);
  border: 1px solid var(--core-semantic-success-border);
  color: var(--core-semantic-success);
}
```

```html
<div class="alert-success">✅ Your changes have been saved successfully!</div>
```

### Error Alert

```css
.alert-error {
  background-color: var(--core-semantic-error-subtle);
  border: 1px solid var(--core-semantic-error-border);
  color: var(--core-semantic-error);
}
```

### Warning Alert

```css
.alert-warning {
  background-color: var(--core-semantic-warning-subtle);
  border: 1px solid var(--core-semantic-warning-border);
  color: var(--core-semantic-warning);
}
```

### Info Alert

```css
.alert-info {
  background-color: var(--core-semantic-info-subtle);
  border: 1px solid var(--core-semantic-info-border);
  color: var(--core-semantic-info);
}
```

---

## 📐 Layout Spacing

### Page Container

```css
/* Desktop layout */
.page-container {
  max-width: var(--core-layout-container-max-width); /* 1280px */
  padding-left: var(--core-layout-page-padding); /* 24px */
  padding-right: var(--core-layout-page-padding);
  margin: 0 auto;
}

/* Mobile layout */
@media (max-width: 768px) {
  .page-container {
    padding-left: var(--core-layout-page-padding-mobile); /* 16px */
    padding-right: var(--core-layout-page-padding-mobile);
  }
}
```

### Section Spacing

```css
/* Desktop sections */
.section {
  margin-bottom: var(--core-layout-section-gap); /* 64px */
}

/* Mobile sections */
@media (max-width: 768px) {
  .section {
    margin-bottom: var(--core-layout-section-gap-mobile); /* 48px */
  }
}
```

### Header and Sidebar

```css
/* Fixed header */
.header {
  height: var(--core-layout-header-height); /* 64px */
  position: fixed;
  top: 0;
  width: 100%;
}

/* Sidebar navigation */
.sidebar {
  width: var(--core-layout-sidebar-width); /* 280px */
}

/* Content with optimal reading width */
.article-content {
  max-width: var(--core-layout-content-max-width); /* 720px */
}
```

---

## 🧩 Component Spacing

### Button

```css
.button {
  padding: var(--core-component-button-padding-y) var(--core-component-button-padding-x);
  /* 8px 16px */

  display: inline-flex;
  align-items: center;
  gap: var(--core-component-button-gap); /* 8px between icon and text */
}
```

```html
<button class="button">
  <svg>...</svg>
  <span>Click me</span>
</button>
```

### Input

```css
.input {
  height: var(--core-component-input-height); /* 40px */
  padding-left: var(--core-component-input-padding-x); /* 12px */
  padding-right: var(--core-component-input-padding-x);
  border: 1px solid var(--core-neutral-border);
}
```

### Card

```css
.card {
  padding: var(--core-component-card-padding); /* 24px */
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--core-component-card-gap); /* 16px between card sections */
}
```

```html
<div class="card">
  <div class="card-content">
    <h3>Card Title</h3>
    <p>Card description text...</p>
    <button>Action</button>
  </div>
</div>
```

### Modal

```css
.modal {
  max-width: var(--core-component-modal-max-width); /* 600px */
  padding: var(--core-component-modal-padding); /* 32px */
  background: var(--core-neutral-surface);
  border-radius: var(--primitive-radius-lg);
}
```

---

## ✍️ Typography

### Font Families

```css
/* Headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--core-typography-heading-font);
  font-weight: var(--core-typography-heading-weight); /* 700 */
}

/* Body text */
body,
p,
span,
div {
  font-family: var(--core-typography-body-font);
  font-weight: var(--core-typography-body-weight); /* 400 */
  font-size: var(--core-typography-body-size); /* 16px */
  line-height: var(--core-typography-body-line-height); /* 1.5 */
}

/* Strong/bold text */
strong,
b {
  font-weight: var(--core-typography-strong-weight); /* 600 */
}

/* Code */
code,
pre {
  font-family: var(--core-typography-code-font);
}

/* Small text */
.small-text,
.caption {
  font-size: var(--core-typography-small-size); /* 14px */
}
```

---

## 🔗 Complete Example: Button Component

```css
/* Button base styles using core tokens */
.btn {
  /* Typography */
  font-family: var(--core-typography-body-font);
  font-weight: var(--core-typography-strong-weight);

  /* Spacing */
  padding: var(--core-component-button-padding-y) var(--core-component-button-padding-x);

  /* Appearance */
  border: none;
  border-radius: var(--primitive-radius-md);
  cursor: pointer;

  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: var(--core-component-button-gap);
}

/* Primary variant */
.btn-primary {
  background-color: var(--core-brand-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--core-brand-primary-hover);
}

.btn-primary:active {
  background-color: var(--core-brand-primary-active);
}

/* Secondary variant */
.btn-secondary {
  background-color: var(--core-brand-secondary);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--core-brand-secondary-hover);
}

/* Ghost variant */
.btn-ghost {
  background-color: transparent;
  color: var(--core-brand-primary);
  border: 1px solid var(--core-neutral-border);
}

.btn-ghost:hover {
  background-color: var(--core-neutral-surface);
}
```

```html
<!-- Usage -->
<button class="btn btn-primary">
  <svg>...</svg>
  Primary Action
</button>

<button class="btn btn-secondary">Secondary Action</button>

<button class="btn btn-ghost">Cancel</button>
```

---

## 🔗 Complete Example: Alert Component

```css
.alert {
  /* Layout */
  padding: var(--core-component-card-padding);
  border-radius: var(--primitive-radius-md);

  /* Typography */
  font-family: var(--core-typography-body-font);
  font-size: var(--core-typography-body-size);

  /* Border */
  border: 1px solid;

  /* Display */
  display: flex;
  align-items: flex-start;
  gap: var(--core-component-button-gap);
}

/* Success variant */
.alert-success {
  background-color: var(--core-semantic-success-subtle);
  border-color: var(--core-semantic-success-border);
  color: var(--core-semantic-success);
}

/* Error variant */
.alert-error {
  background-color: var(--core-semantic-error-subtle);
  border-color: var(--core-semantic-error-border);
  color: var(--core-semantic-error);
}

/* Warning variant */
.alert-warning {
  background-color: var(--core-semantic-warning-subtle);
  border-color: var(--core-semantic-warning-border);
  color: var(--core-semantic-warning);
}

/* Info variant */
.alert-info {
  background-color: var(--core-semantic-info-subtle);
  border-color: var(--core-semantic-info-border);
  color: var(--core-semantic-info);
}
```

```html
<!-- Usage -->
<div class="alert alert-success">
  <svg>✅</svg>
  <div>Your changes have been saved successfully!</div>
</div>

<div class="alert alert-error">
  <svg>❌</svg>
  <div>An error occurred while processing your request.</div>
</div>

<div class="alert alert-warning">
  <svg>⚠️</svg>
  <div>This action cannot be undone.</div>
</div>

<div class="alert alert-info">
  <svg>ℹ️</svg>
  <div>You can customize this setting in your preferences.</div>
</div>
```

---

## 📚 Migration from Primitives

If you were previously using primitive tokens directly, migrate to core tokens:

### Before (❌ Don't do this)

```css
.button {
  /* Using primitives directly - not semantic */
  background-color: var(--primitive-color-blue-600);
  padding: var(--primitive-spacing-8) var(--primitive-spacing-16);
}
```

### After (✅ Do this)

```css
.button {
  /* Using core tokens - semantic and maintainable */
  background-color: var(--core-brand-primary);
  padding: var(--core-component-button-padding-y) var(--core-component-button-padding-x);
}
```

**Benefits of using Core tokens:**

- ✅ **Semantic:** Purpose-driven names (primary, not blue-600)
- ✅ **Maintainable:** Change blue-600 to blue-700 in one place
- ✅ **Consistent:** All components use same brand color
- ✅ **Flexible:** Easy to theme or create variants

---

## 🚀 What's Next?

**Phase 3 - Semantic Tokens** (coming soon) will add:

- Interactive states (hover, active, focus, disabled)
- UI context colors (backgrounds, text, borders for different contexts)
- Component variant tokens (primary, secondary, ghost, outline)
- Typography scale (h1-h6 styles)
- Z-index layering system

Stay tuned! 🎉

---

**Documentation Version:** Phase 2 Complete  
**Last Updated:** January 23, 2026  
**Total Tokens:** 161 (103 primitive + 58 core)
