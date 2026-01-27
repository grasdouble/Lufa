# Design Tokens Usage Guidelines

This document provides guidelines on how to correctly use Lufa Design System tokens in different contexts.

---

## 🎯 Table of Contents

1. [Core Principles](#core-principles)
2. [Package Exports](#package-exports)
3. [Best Practices](#best-practices)
4. [Anti-Patterns](#anti-patterns)
5. [Usage by Context](#usage-by-context)
6. [Enforcement](#enforcement)

---

## 🏗️ Core Principles

### Principle 1: Components Use CSS Modules Only

**React components MUST ONLY reference tokens through CSS Modules.**

```typescript
// ✅ CORRECT - Component references CSS Module
import styles from './Button.module.css';

export const Button = ({ children }) => (
  <button className={styles.button}>{children}</button>
);
```

```css
/* Button.module.css - CSS Module references tokens */
.button {
  background-color: var(--lufa-core-brand-primary);
  padding: var(--lufa-primitive-spacing-16);
  border-radius: var(--lufa-primitive-radius-scale-base);
}
```

### Principle 2: CSS Variables are the Single Source of Truth

**All styling decisions flow through CSS custom properties.**

```
Design Tokens (JSON)
    ↓ Style Dictionary builds
CSS Custom Properties (tokens.css)
    ↓ Imported in root CSS
CSS Modules (Button.module.css)
    ↓ Applied via className
React Components (Button.tsx)
```

### Principle 3: Theming Happens at CSS Level

**Theme overrides are applied via CSS variable reassignment.**

```css
/* Default theme */
:root {
  --lufa-core-brand-primary: #2563eb; /* blue-600 */
}

/* Dark theme override */
[data-mode='dark'] {
  --lufa-core-brand-primary: #60a5fa; /* blue-400 */
}

/* Component automatically adapts */
.button {
  background-color: var(--lufa-core-brand-primary); /* Theme-aware! */
}
```

---

## 📦 Package Exports

The `@grasdouble/lufa_design-system-tokens` package exports **three files**:

### Available Exports

| Export                    | Import Path                                        | Format | Use Case                                              |
| ------------------------- | -------------------------------------------------- | ------ | ----------------------------------------------------- |
| **CSS Custom Properties** | `@grasdouble/lufa_design-system-tokens/tokens.css` | CSS    | **Primary usage** - Import in root CSS for components |
| **Token Values**          | `@grasdouble/lufa_design-system-tokens/values`     | JSON   | Storybook stories, documentation                      |
| **Token Metadata**        | `@grasdouble/lufa_design-system-tokens/metadata`   | JSON   | Tooling, build scripts (includes WCAG, descriptions)  |

### 1. CSS Custom Properties (Primary Usage)

**File:** `tokens.css`  
**Purpose:** Define CSS variables for component styling

```css
/* In your root CSS file (e.g., App.css, index.css) */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

```css
/* Then use in any CSS Module */
.button {
  background-color: var(--lufa-core-brand-primary);
  padding: var(--lufa-primitive-spacing-16);
}
```

**✅ Use for:** All React components, all CSS Modules, all styling

### 2. Token Values JSON (Storybook/Documentation Only)

**File:** `tokens-values.json`  
**Purpose:** Access token values in JavaScript for documentation

```typescript
// ✅ ALLOWED - In Storybook stories only
import tokens from '@grasdouble/lufa_design-system-tokens/values';

// Access structure: tokens.{category}.{subcategory}.{name}
const primaryColor = tokens.core.brand.primary; // "#2563eb"
const blue600 = tokens.primitive.color.blue['600']; // "#2563eb"
const spacing16 = tokens.primitive.spacing['16']; // "16px"
```

**⚠️ Important:** This is **ONLY** for Storybook stories and documentation. Do NOT use in React component files.

### 3. Token Metadata JSON (Tooling Only)

**File:** `tokens-metadata.json`  
**Purpose:** Full token metadata for build scripts and tooling

```typescript
// ✅ ALLOWED - In build scripts/tooling only
import metadata from '@grasdouble/lufa_design-system-tokens/metadata';

// Includes: value, description, WCAG compliance, category, etc.
console.log(metadata.primitive.color.blue['600']);
// {
//   value: "#2563eb",
//   description: "Blue color, shade 600",
//   category: "primitive",
//   wcag: { ... }
// }
```

**✅ Use for:** Build scripts, documentation generators, linters, design tools

---

## ✅ Best Practices

### 1. Use Semantic Tokens When Available

```css
/* ✅ PREFERRED - Semantic tokens */
.button {
  background-color: var(--lufa-core-brand-primary);
  color: var(--lufa-core-text-inverse);
}

/* ✅ ACCEPTABLE - Primitive tokens when no semantic exists */
.button {
  padding: var(--lufa-primitive-spacing-16);
  border-radius: var(--lufa-primitive-radius-scale-base);
}
```

### 2. Separate Concerns: Components vs Styles

**Component files handle logic, CSS Modules handle presentation.**

```typescript
// ✅ CORRECT - Logic in component
import styles from './Button.module.css';

export const Button = ({ variant, children }) => (
  <button className={styles[variant]}>{children}</button>
);
```

```css
/* ✅ CORRECT - Presentation in CSS */
.primary {
  background-color: var(--lufa-core-brand-primary);
}

.secondary {
  background-color: var(--lufa-core-brand-secondary);
}
```

### 3. Leverage CSS Variable Inheritance

```css
/* ✅ CORRECT - Override at component level */
.card {
  --local-padding: var(--lufa-primitive-spacing-24);
}

.card-header {
  padding: var(--local-padding);
}

.card-body {
  padding: var(--local-padding);
}
```

### 4. Use Meaningful Class Names

```css
/* ✅ CORRECT - Semantic class names */
.button-primary {
  background-color: var(--lufa-core-brand-primary);
}

.button-large {
  padding: var(--lufa-primitive-spacing-24);
}

/* ❌ AVOID - Utility-style class names */
.bg-blue {
  background-color: var(--lufa-primitive-color-blue-600);
}
```

---

## ❌ Anti-Patterns

### Anti-Pattern 1: Importing JSON Tokens in Components

```typescript
// ❌ WRONG - JSON imports not allowed in components
import tokens from '@grasdouble/lufa_design-system-tokens/values';

export const Button = () => (
  <button style={{ color: tokens.primitive.color.blue['600'] }}>Click</button>
);
```

**Why this is bad:**

1. ❌ Value is hardcoded at build time (`"#2563eb"`)
2. ❌ Cannot be overridden by themes
3. ❌ Inline styles have higher specificity than CSS
4. ❌ Bypasses the CSS Module architecture
5. ❌ No runtime theme switching support

**✅ Correct approach:**

```typescript
// ✅ CORRECT - Use CSS Modules
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click</button>;
```

```css
/* Button.module.css */
.button {
  color: var(--lufa-primitive-color-blue-600);
}
```

---

### Anti-Pattern 2: Using Inline Styles with Token Values

```typescript
// ❌ WRONG - Even with CSS variables!
export const Button = () => (
  <button style={{ color: 'var(--lufa-primitive-color-blue-600)' }}>Click</button>
);
```

**Why this is bad:**

1. ❌ Inline styles have higher specificity
2. ❌ Cannot be overridden by CSS classes
3. ❌ Hard to maintain and test
4. ❌ No CSS Module scoping benefits

**✅ Correct approach:**

```typescript
// ✅ CORRECT
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click</button>;
```

---

### Anti-Pattern 3: Hardcoding Design Values

```typescript
// ❌ WRONG - Magic numbers
export const Button = () => (
  <button style={{ padding: '16px', color: '#2563eb' }}>Click</button>
);
```

```css
/* ❌ WRONG - Hardcoded values in CSS */
.button {
  padding: 16px;
  background-color: #2563eb;
}
```

**✅ Correct approach:**

```css
/* ✅ CORRECT - Reference tokens */
.button {
  padding: var(--lufa-primitive-spacing-16);
  color: var(--lufa-primitive-color-blue-600);
}
```

---

### Anti-Pattern 4: Missing Token Prefix

```css
/* ❌ WRONG - Missing lufa prefix */
.button {
  color: var(--primitive-color-blue-600);
  padding: var(--spacing-16);
}
```

**✅ Correct approach:**

```css
/* ✅ CORRECT - Always use --lufa- prefix */
.button {
  color: var(--lufa-primitive-color-blue-600);
  padding: var(--lufa-primitive-spacing-16);
}
```

---

## 📍 Usage by Context

### 1. React Components (Strict Rules)

**Rule:** NEVER import JSON tokens in component files. Use CSS Modules only.

```typescript
// Component file: src/components/Button/Button.tsx

// ✅ ALLOWED

// ❌ FORBIDDEN - JSON imports not allowed in components
import tokens from '@grasdouble/lufa_design-system-tokens/values';

import styles from './Button.module.css';
```

**Enforcement:** ESLint rule will error on token imports in `/components/` directory.

---

### 2. CSS Modules (Primary Usage)

**Rule:** Always use CSS custom properties with `--lufa-` prefix.

```css
/* Button.module.css */

.button {
  /* ✅ CORRECT - Semantic tokens preferred */
  background-color: var(--lufa-core-brand-primary);
  color: var(--lufa-core-text-inverse);

  /* ✅ ACCEPTABLE - Primitive tokens when no semantic exists */
  padding: var(--lufa-primitive-spacing-16);
  border-radius: var(--lufa-primitive-radius-scale-base);

  /* ❌ WRONG - Hardcoded values */
  /* padding: 16px; */
  /* background-color: #2563eb; */

  /* ❌ WRONG - Missing lufa prefix */
  /* color: var(--primitive-color-blue-600); */
}
```

---

### 3. Storybook Stories (Documentation Only)

**Rule:** JSON token imports are allowed ONLY in `.stories.tsx` files for documentation.

```typescript
// Button.stories.tsx - ALLOWED

import tokens from '@grasdouble/lufa_design-system-tokens/values';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      // ✅ ALLOWED - Displaying token value in Storybook docs
      tokenValue: tokens.primitive.color.blue['500'],
    },
  },
};

// ✅ ALLOWED - Showing token in story description
export const Primary = {
  parameters: {
    docs: {
      description: {
        story: `Uses primary brand color: ${tokens.core.brand.primary}`,
      },
    },
  },
};
```

**Important:** Even in stories, the actual **component implementation** must still use CSS Modules!

---

### 4. Tests (Allowed)

**Rule:** JSON token imports are allowed in test files for assertions.

```typescript
// Button.test.tsx - ALLOWED

import tokens from '@grasdouble/lufa_design-system-tokens/values';
import { render } from '@testing-library/react';
import { Button } from './Button';

test('button uses correct primary color', () => {
  const { container } = render(<Button />);
  const button = container.querySelector('button');

  // ✅ ALLOWED - Verifying CSS variable value
  const styles = getComputedStyle(button);
  expect(styles.getPropertyValue('--lufa-primitive-color-blue-600')).toBe(
    tokens.primitive.color.blue['600']
  );
});
```

---

### 5. Build Scripts and Tooling (Allowed)

**Rule:** JSON token imports (values and metadata) are allowed in build scripts and tooling.

```typescript
// scripts/generate-theme.ts - ALLOWED

import metadata from '@grasdouble/lufa_design-system-tokens/metadata';
import tokens from '@grasdouble/lufa_design-system-tokens/values';

// ✅ ALLOWED - Build-time code generation
const themeConfig = {
  primary: tokens.primitive.color.blue['600'],
  primaryMeta: metadata.primitive.color.blue['600'],
};

fs.writeFileSync('theme.json', JSON.stringify(themeConfig));
```

---

## 🚨 Enforcement

### ESLint Rule

The following ESLint rule enforces correct token usage:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["@grasdouble/lufa_design-system-tokens"],
            "message": "Do not import tokens in components. Use CSS Modules with CSS custom properties (var(--lufa-*)) instead. For Storybook/docs, use: import tokens from '@grasdouble/lufa_design-system-tokens/values'. See packages/design-system/tokens/docs/USAGE_GUIDELINES.md"
          },
          {
            "group": ["@grasdouble/lufa_design-system-tokens/values"],
            "message": "Do not import token values JSON in components. Use CSS Modules with CSS custom properties (var(--lufa-*)) instead. Token values are only for Storybook stories and documentation. See packages/design-system/tokens/docs/USAGE_GUIDELINES.md"
          },
          {
            "group": ["@grasdouble/lufa_design-system-tokens/metadata"],
            "message": "Do not import token metadata in components. Use CSS Modules with CSS custom properties (var(--lufa-*)) instead. Metadata is only for build scripts and tooling. See packages/design-system/tokens/docs/USAGE_GUIDELINES.md"
          }
        ]
      }
    ]
  },
  "overrides": [
    {
      "files": ["**/*.stories.tsx", "**/*.test.tsx", "scripts/**"],
      "rules": {
        "no-restricted-imports": "off"
      }
    }
  ]
}
```

This rule:

- ✅ Blocks token imports in component files (all formats)
- ✅ Allows imports in `.stories.tsx` files (Storybook)
- ✅ Allows imports in `.test.tsx` files (Tests)
- ✅ Allows imports in `scripts/` directory (Tooling)

### Installation

Add this rule to your component package's ESLint config:

```bash
# In packages/design-system/main/.eslintrc.json
```

---

## 📚 Additional Resources

- **Main README:** [../../README.md](../../README.md)
- **Themable Attribute Guide:** [THEMABLE_ATTRIBUTE.md](./THEMABLE_ATTRIBUTE.md)
- **Token Architecture:** [../architecture/token-levels-overview.md](../architecture/token-levels-overview.md) (coming soon)
- **Theming Guide:** [../../THEMING_GUIDE.md](../../THEMING_GUIDE.md) (coming soon)
- **Component Guidelines:** `.github/instructions/lufa-design-system.instructions.md`

---

## 🤝 Quick Decision Guide

If you're unsure whether your use case is correct:

1. **Ask yourself:** "Does this need to change based on the theme?"
   - **Yes** → Use CSS Modules with CSS variables
   - **No** → Still use CSS Modules (consistency)

2. **Check the context:**
   - Component file (`.tsx`) → ❌ No token imports (use CSS Modules)
   - Story file (`.stories.tsx`) → ✅ Allowed for docs only (`/values` import)
   - Test file (`.test.tsx`) → ✅ Allowed for assertions (`/values` import)
   - Build script → ✅ Allowed (`/values` or `/metadata` imports)

3. **When in doubt:** Use CSS Modules with CSS variables. This is ALWAYS correct.

---

**Last Updated:** January 23, 2026  
**Status:** Active - Enforced via ESLint
