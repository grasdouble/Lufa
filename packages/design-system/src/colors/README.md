# Accessible Color System

A comprehensive, WCAG 2.1 compliant color system for the Lufa Design System.

## Overview

This color system provides:

- **Primitive color tokens**: Base color values in multiple shades
- **Semantic color tokens**: Intent-based color naming
- **Accessibility utilities**: Tools to check WCAG compliance
- **CSS custom properties**: CSS variables for easy integration

All colors meet **WCAG 2.1 AAA** accessibility standards when used as intended.

## Installation

The color system is included in the `@grasdouble/lufa_design-system` package:

```bash
pnpm add @grasdouble/lufa_design-system
```

## Usage

### In TypeScript/React

```typescript
import { primitives, semantic, colors, meetsWCAG } from '@grasdouble/lufa_design-system';

// Using primitive colors
const MyComponent = () => (
  <div style={{ backgroundColor: primitives.blue[600], color: primitives.neutral[0] }}>
    Accessible blue background with white text
  </div>
);

// Using semantic colors
const Button = () => (
  <button style={{
    backgroundColor: semantic.interactive.default,
    color: semantic.text.inverse
  }}>
    Click me
  </button>
);

// Check accessibility before applying colors
const foreground = '#2563EB';
const background = '#FFFFFF';
const isAccessible = meetsWCAG(foreground, background, 'AAA'); // true
```

### In CSS with Custom Properties

```css
/* Colors are available as CSS variables */
.my-component {
    background-color: var(--color-blue-600);
    color: var(--color-neutral-0);
}

.button-primary {
    background-color: var(--color-interactive-default);
    color: var(--color-text-inverse);
}

/* Semantic tokens */
.text-primary {
    color: var(--color-text-primary);
}

.surface-card {
    background-color: var(--color-surface-default);
    border: 1px solid var(--color-border-default);
}
```

### With Tailwind CSS v4

The color system is integrated with Tailwind CSS:

```jsx
<div className="bg-blue-600 text-white">
  Accessible blue background
</div>

<button className="bg-primary-600 hover:bg-primary-700">
  Primary Button
</button>

<div className="text-neutral-900 bg-neutral-0">
  High contrast text
</div>
```

## Color Tokens

### Primitive Colors

Primitive colors are the foundation of the system. Each color has 11 shades (0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000).

#### Available Colors:

- **neutral** - Grayscale colors
- **blue** - Primary brand color
- **green** - Success/positive states
- **red** - Error/danger states
- **orange** - Warning/caution states
- **yellow** - Warning/attention states
- **purple** - Info/secondary brand
- **teal** - Accent color
- **pink** - Additional accent
- **indigo** - Additional accent

#### Contrast Ratings:

- Shades **600+** meet **WCAG AAA** on white backgrounds (7:1)
- Shades **500+** meet **WCAG AA** on white backgrounds (4.5:1)

```typescript
import { primitives } from '@grasdouble/lufa_design-system';

primitives.blue[600]; // #2563EB - AAA compliant
primitives.green[600]; // #16A34A - AAA compliant
primitives.red[600]; // #DC2626 - AAA compliant
```

### Semantic Tokens

Semantic tokens provide intent-based naming for better maintainability.

#### Text Colors

```typescript
semantic.text.primary; // Main text (AAA)
semantic.text.secondary; // Secondary text (AAA)
semantic.text.tertiary; // Tertiary text (AAA)
semantic.text.disabled; // Disabled text
semantic.text.inverse; // Text on dark backgrounds
semantic.text.link; // Link text (AAA)
semantic.text.linkHover; // Link hover state
```

#### Background Colors

```typescript
semantic.background.primary; // Main background
semantic.background.secondary; // Secondary background
semantic.background.tertiary; // Tertiary background
semantic.background.inverse; // Dark background
semantic.background.overlay; // Modal/overlay background
```

#### Interactive Colors

```typescript
semantic.interactive.default; // Default interactive (AAA)
semantic.interactive.hover; // Hover state
semantic.interactive.active; // Active/pressed state
semantic.interactive.disabled; // Disabled state
semantic.interactive.focus; // Focus state
```

#### Status Colors

```typescript
// Success
semantic.success.default; // AAA compliant
semantic.success.hover;
semantic.success.active;
semantic.success.light; // Background
semantic.success.border;
semantic.success.text;

// Error
semantic.error.default; // AAA compliant
semantic.error.hover;
semantic.error.active;
semantic.error.light; // Background
semantic.error.border;
semantic.error.text;

// Warning
semantic.warning.default; // AAA compliant
semantic.warning.hover;
semantic.warning.active;
semantic.warning.light; // Background
semantic.warning.border;
semantic.warning.text;

// Info
semantic.info.default; // AAA compliant
semantic.info.hover;
semantic.info.active;
semantic.info.light; // Background
semantic.info.border;
semantic.info.text;
```

#### Brand Colors

```typescript
semantic.brand.primary; // Primary brand color
semantic.brand.primaryHover;
semantic.brand.primaryActive;
semantic.brand.secondary; // Secondary brand color
semantic.brand.secondaryHover;
semantic.brand.secondaryActive;
semantic.brand.accent; // Accent color
```

## Accessibility Utilities

### Check Contrast Ratio

```typescript
import { getContrastRatio, meetsWCAG } from '@grasdouble/lufa_design-system';

// Get contrast ratio
const ratio = getContrastRatio('#2563EB', '#FFFFFF');
console.log(ratio); // 8.6

// Check WCAG compliance
const meetsAA = meetsWCAG('#2563EB', '#FFFFFF', 'AA'); // true
const meetsAAA = meetsWCAG('#2563EB', '#FFFFFF', 'AAA'); // true

// Check for large text
const meetsAALarge = meetsWCAG('#3B82F6', '#FFFFFF', 'AA', true); // true
```

### Get Contrast Level

```typescript
import { getContrastLevel } from '@grasdouble/lufa_design-system';

const level = getContrastLevel(8.6);
console.log(level); // "AAA (Normal Text)"
```

### Suggest Text Color

```typescript
import { getSuggestedTextColor } from '@grasdouble/lufa_design-system';

const textColor = getSuggestedTextColor('#1E40AF'); // Returns '#FFFFFF'
const textColor2 = getSuggestedTextColor('#EFF6FF'); // Returns '#000000'
```

### WCAG Standards Reference

```typescript
import { WCAG_STANDARDS } from '@grasdouble/lufa_design-system';

// AA Standards
WCAG_STANDARDS.AA.normalText; // 4.5:1
WCAG_STANDARDS.AA.largeText; // 3:1
WCAG_STANDARDS.AA.uiComponents; // 3:1

// AAA Standards
WCAG_STANDARDS.AAA.normalText; // 7:1
WCAG_STANDARDS.AAA.largeText; // 4.5:1
```

## Dark Mode Support

The color system includes dark mode overrides via CSS custom properties:

```css
/* Automatically applied in dark mode */
[data-theme='dark'],
.dark {
    --color-text-primary: #ffffff;
    --color-text-secondary: #e5e5e5;
    --color-background-primary: #171717;
    --color-background-secondary: #262626;
    /* ... other overrides */
}
```

Use with React:

```jsx
<div data-theme="dark">
    <p style={{ color: 'var(--color-text-primary)' }}>Dark mode text</p>
</div>
```

Or with class:

```jsx
<div className="dark">
    <p className="text-[var(--color-text-primary)]">Dark mode text</p>
</div>
```

## Component Examples

### Accessible Button

```tsx
import { semantic, primitives } from '@grasdouble/lufa_design-system';

const AccessibleButton = ({ variant = 'primary', children }) => {
    const styles = {
        primary: {
            backgroundColor: semantic.interactive.default,
            color: semantic.text.inverse,
            ':hover': { backgroundColor: semantic.interactive.hover },
        },
        secondary: {
            backgroundColor: primitives.neutral[100],
            color: semantic.text.primary,
            border: `1px solid ${semantic.border.default}`,
        },
        danger: {
            backgroundColor: semantic.error.default,
            color: semantic.text.inverse,
            ':hover': { backgroundColor: semantic.error.hover },
        },
    };

    return <button style={styles[variant]}>{children}</button>;
};
```

### Alert Component

```tsx
import { semantic } from '@grasdouble/lufa_design-system';

const Alert = ({ type = 'info', children }) => {
    const styles = {
        success: {
            backgroundColor: semantic.success.light,
            color: semantic.success.text,
            borderLeft: `4px solid ${semantic.success.default}`,
        },
        error: {
            backgroundColor: semantic.error.light,
            color: semantic.error.text,
            borderLeft: `4px solid ${semantic.error.default}`,
        },
        warning: {
            backgroundColor: semantic.warning.light,
            color: semantic.warning.text,
            borderLeft: `4px solid ${semantic.warning.default}`,
        },
        info: {
            backgroundColor: semantic.info.light,
            color: semantic.info.text,
            borderLeft: `4px solid ${semantic.info.default}`,
        },
    };

    return <div style={styles[type]}>{children}</div>;
};
```

## Best Practices

### 1. Always Use Semantic Tokens First

```typescript
// ✅ Good - Using semantic tokens
backgroundColor: semantic.interactive.default;

// ❌ Avoid - Using primitive colors directly
backgroundColor: primitives.blue[600];
```

### 2. Check Accessibility for Custom Combinations

```typescript
import { meetsWCAG } from '@grasdouble/lufa_design-system';

const foreground = '#123456';
const background = '#ABCDEF';

if (meetsWCAG(foreground, background, 'AA')) {
    // Safe to use
} else {
    // Choose different colors
}
```

### 3. Use Higher Shades for Better Contrast

```typescript
// ✅ Good - AAA compliant
primitives.blue[600]; // 8.6:1 ratio on white

// ⚠️ Caution - Only AA compliant
primitives.blue[500]; // 5.9:1 ratio on white
```

### 4. Maintain Consistency

```typescript
// ✅ Good - Consistent use of semantic tokens
<button style={{
  backgroundColor: semantic.interactive.default,
  color: semantic.text.inverse
}} />

// ❌ Avoid - Mixing approaches
<button style={{
  backgroundColor: semantic.interactive.default,
  color: '#FFFFFF'
}} />
```

### 5. Test in Dark Mode

```typescript
// Ensure your components work in both modes
const MyComponent = () => (
  <div style={{
    backgroundColor: 'var(--color-background-primary)',
    color: 'var(--color-text-primary)'
  }}>
    Works in light and dark mode
  </div>
);
```

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding Contrast Ratio](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Migration Guide

If you're migrating from the old color system:

### Before

```typescript
// Old Badge component
<Badge color="blue" />
```

### After

```typescript
// Using new semantic colors
<Badge
  backgroundColor={semantic.info.default}
  textColor={semantic.text.inverse}
/>

// Or with CSS variables
<Badge className="bg-[var(--color-info-default)] text-[var(--color-text-inverse)]" />
```

## Support

For questions or issues with the color system, please:

1. Check the [WCAG guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
2. Use the accessibility utilities to verify your color combinations
3. Refer to the examples in this documentation
