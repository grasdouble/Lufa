# Design Tokens Usage Guidelines

> ⚠️ **IMPORTANT UPDATE (January 2026):**  
> JS/TS token exports (`tokens.js`, `tokens.d.ts`) have been **removed** as of tokens v0.5.0.  
> The package now exports only:
>
> - `tokens.css` - CSS custom properties for components
> - `tokens-values.json` - Simple values for Storybook/documentation
> - `tokens-metadata.json` - Full metadata (descriptions, WCAG, etc.)
>
> **Migration:**
>
> ```typescript
> // ❌ OLD (no longer works)
> import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';
> // ✅ NEW (for Storybook/docs only)
> import tokens from '@grasdouble/lufa_design-system-tokens/values';
>
> const blue600 = tokens.primitive.color.blue['600'];
> ```
>
> **For React components:** No change needed - continue using CSS Modules with CSS custom properties.

This document provides detailed guidelines on how to correctly use Lufa Design System tokens in different contexts.

---

## 🎯 Table of Contents

1. [Core Principles](#core-principles)
2. [Do's and Don'ts](#dos-and-donts)
3. [Usage by Context](#usage-by-context)
4. [Migration Guide](#migration-guide)
5. [Enforcement](#enforcement)

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
[data-theme='dark'] {
  --lufa-core-brand-primary: #60a5fa; /* blue-400 */
}

/* Component automatically adapts */
.button {
  background-color: var(--lufa-core-brand-primary); /* Theme-aware! */
}
```

---

## ✅ Do's and Don'ts

### ❌ DO NOT: Import JS/TS Tokens in Components

```typescript
// ❌ WRONG - Hardcoded value, not themable
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const Button = () => (
  <button style={{ color: LufaPrimitiveColorBlue600 }}>Click</button>
);
```

**Why this is bad:**

1. ❌ Value is hardcoded at build time (`"#2563eb"`)
2. ❌ Cannot be overridden by themes
3. ❌ Inline styles have higher specificity than CSS
4. ❌ Bypasses the CSS Module architecture
5. ❌ No runtime theme switching support

### ✅ DO: Use CSS Modules with CSS Variables

```typescript
// ✅ CORRECT - Themable via CSS
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click</button>;
```

```css
/* Button.module.css */
.button {
  color: var(--lufa-primitive-color-blue-600);
}
```

**Why this is correct:**

1. ✅ CSS variables can be overridden by themes
2. ✅ Follows component architecture (separation of concerns)
3. ✅ Supports runtime theme switching
4. ✅ Better performance (no JS execution for styling)
5. ✅ Standard CSS cascade rules apply

---

### ❌ DO NOT: Use Inline Styles with Token Values

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

### ✅ DO: Define Styles in CSS Modules

```typescript
// ✅ CORRECT
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click</button>;
```

---

### ❌ DO NOT: Hardcode Design Values

```typescript
// ❌ WRONG - Magic numbers
export const Button = () => (
  <button style={{ padding: '16px', color: '#2563eb' }}>Click</button>
);
```

### ✅ DO: Reference Tokens via CSS Variables

```css
/* ✅ CORRECT */
.button {
  padding: var(--lufa-primitive-spacing-16);
  color: var(--lufa-primitive-color-blue-600);
}
```

---

## 📍 Usage by Context

### 1. React Components (Strict Rules)

**Rule:** NEVER import token JS/TS exports in component files.

```typescript
// Component file: src/components/Button/Button.tsx

// ✅ ALLOWED

// ❌ FORBIDDEN
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

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
  padding: 16px;
  background-color: #2563eb;

  /* ❌ WRONG - Missing lufa prefix */
  color: var(--primitive-color-blue-600);
}
```

---

### 3. Storybook Stories (Allowed, with Caution)

**Rule:** JS/TS token imports are allowed ONLY in `.stories.tsx` files for documentation.

```typescript
// Button.stories.tsx - ALLOWED

import { LufaPrimitiveColorBlue500 } from '@grasdouble/lufa_design-system-tokens';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      // ✅ ALLOWED - Displaying token value in Storybook docs
      tokenValue: LufaPrimitiveColorBlue500,
    },
  },
};

// ✅ ALLOWED - Showing token in story description
export const Primary = {
  parameters: {
    docs: {
      description: {
        story: `Uses primary brand color: ${LufaCoreBrandPrimary}`,
      },
    },
  },
};
```

**Important:** Even in stories, the actual **component implementation** must still use CSS Modules!

---

### 4. Tests (Allowed)

**Rule:** JS/TS token imports are allowed in test files for assertions.

```typescript
// Button.test.tsx - ALLOWED

import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';
import { render } from '@testing-library/react';
import { Button } from './Button';

test('button uses correct primary color', () => {
  const { container } = render(<Button />);
  const button = container.querySelector('button');

  // ✅ ALLOWED - Verifying CSS variable value
  const styles = getComputedStyle(button);
  expect(styles.getPropertyValue('--lufa-primitive-color-blue-600')).toBe(
    LufaPrimitiveColorBlue600
  );
});
```

---

### 5. Build Scripts and Tooling (Allowed)

**Rule:** JS/TS token imports are allowed in build scripts and tooling.

```typescript
// scripts/generate-theme.ts - ALLOWED

import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

// ✅ ALLOWED - Build-time code generation
const themeConfig = {
  primary: LufaPrimitiveColorBlue600,
};

fs.writeFileSync('theme.json', JSON.stringify(themeConfig));
```

---

## 🔄 Migration Guide

### Migrating Existing Code

If you have existing code using JS/TS token imports in components:

#### Step 1: Identify violations

```bash
# Find component files importing tokens
grep -r "from '@grasdouble/lufa_design-system-tokens'" src/components/
```

#### Step 2: Extract styles to CSS Module

**Before:**

```typescript
// Button.tsx - WRONG
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const Button = () => (
  <button style={{ color: LufaPrimitiveColorBlue600 }}>Click</button>
);
```

**After:**

```typescript
// Button.tsx - CORRECT
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click</button>;
```

```css
/* Button.module.css - NEW FILE */
.button {
  color: var(--lufa-primitive-color-blue-600);
}
```

#### Step 3: Remove token imports

```typescript
// Remove this line:
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';
```

#### Step 4: Run linter

```bash
pnpm lint
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
            "importNames": ["Lufa*"],
            "message": "Do not import token JS/TS exports in components. Use CSS Modules with CSS custom properties (var(--lufa-*)) instead. See packages/design-system/tokens/docs/USAGE_GUIDELINES.md"
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

- ✅ Blocks token imports in component files
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
- **Token Architecture:** [../architecture/token-levels-overview.md](../architecture/token-levels-overview.md) (coming soon)
- **Theming Guide:** [../../THEMING_GUIDE.md](../../THEMING_GUIDE.md) (coming soon)
- **Component Guidelines:** `.github/instructions/lufa-design-system.instructions.md`

---

## 🤝 Questions?

If you're unsure whether your use case is legitimate:

1. **Ask yourself:** "Does this need to change based on the theme?"
   - **Yes** → Use CSS Modules with CSS variables
   - **No** → Still use CSS Modules (consistency)

2. **Check the context:**
   - Component file (`.tsx`) → ❌ No token imports
   - Story file (`.stories.tsx`) → ✅ Allowed for docs only
   - Test file (`.test.tsx`) → ✅ Allowed for assertions
   - Build script → ✅ Allowed

3. **When in doubt:** Use CSS Modules with CSS variables. This is ALWAYS correct.

---

**Last Updated:** January 24, 2026  
**Status:** Active - Enforced via ESLint  
**Version:** 2.0 (Lufa prefix migration)
