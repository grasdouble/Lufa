# ESLint Rule: No Token Imports in Components

This document explains the ESLint rule that prevents importing design token JS/TS exports in React components.

---

## 🎯 Rule Purpose

**Prevent non-themable styling patterns in React components.**

Components must use CSS Modules with CSS custom properties for all styling. Direct token imports bypass the theming system and create hardcoded, non-themable values.

---

## 📋 Rule Configuration

### Location

```
packages/design-system/main/eslint.config.mjs
```

### Rule Definition

```javascript
{
  files: ['src/components/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@grasdouble/lufa_design-system-tokens'],
            message:
              '❌ Do not import token JS/TS exports in React components.\n\n' +
              '✅ Use CSS Modules with CSS custom properties instead:\n' +
              '   .button { color: var(--lufa-primitive-color-blue-600); }\n\n' +
              '📚 See: packages/design-system/tokens/docs/USAGE_GUIDELINES.md',
          },
        ],
      },
    ],
  },
}
```

### Exceptions

The rule is **disabled** for:

- **Storybook stories:** `**/*.stories.{ts,tsx}`
- **Test files:** `**/*.test.{ts,tsx}`
- **Utility files:** `src/utils/**/*.{ts,tsx}`

---

## ❌ What This Rule Blocks

### Blocked: Direct token imports in component files

```typescript
// src/components/Button/Button.tsx

// ❌ ERROR - ESLint will block this
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const Button = () => (
  <button style={{ color: LufaPrimitiveColorBlue600 }}>Click</button>
);
```

**Error message:**

```
error  ❌ Do not import token JS/TS exports in React components.

✅ Use CSS Modules with CSS custom properties instead:
   .button { color: var(--lufa-primitive-color-blue-600); }

📚 See: packages/design-system/tokens/docs/USAGE_GUIDELINES.md  no-restricted-imports
```

---

## ✅ What This Rule Allows

### 1. CSS Modules in Components (Recommended)

```typescript
// src/components/Button/Button.tsx
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click</button>;
```

```css
/* src/components/Button/Button.module.css */
.button {
  color: var(--lufa-primitive-color-blue-600);
}
```

---

### 2. Token Imports in Storybook Stories

```typescript
// src/components/Button/Button.stories.tsx

// ✅ ALLOWED - Story files are exempt
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      tokenValue: LufaPrimitiveColorBlue600, // For documentation
    },
  },
};
```

---

### 3. Token Imports in Tests

```typescript
// src/components/Button/Button.test.tsx

// ✅ ALLOWED - Test files are exempt
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';
import { render } from '@testing-library/react';
import { Button } from './Button';

test('button has correct color', () => {
  const { container } = render(<Button />);
  // Use token value for assertion
  expect(container.querySelector('button')).toHaveStyle({
    color: LufaPrimitiveColorBlue600,
  });
});
```

---

### 4. Token Imports in Utility Files

```typescript
// src/utils/theme-generator.ts

// ✅ ALLOWED - Utility files are exempt
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const generateTheme = () => ({
  primary: LufaPrimitiveColorBlue600,
});
```

---

## 🔧 How to Fix Violations

### Step 1: Identify the violation

```bash
# Run linter
cd packages/design-system/main
pnpm lint
```

**Example output:**

```
/src/components/Button/Button.tsx
  5:1  error  ❌ Do not import token JS/TS exports in React components.
       Use CSS Modules with CSS custom properties instead.  no-restricted-imports
```

---

### Step 2: Extract styles to CSS Module

**Before (❌ Violates rule):**

```typescript
// Button.tsx
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const Button = () => (
  <button style={{ color: LufaPrimitiveColorBlue600 }}>Click</button>
);
```

**After (✅ Compliant):**

```typescript
// Button.tsx
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click</button>;
```

```css
/* Button.module.css (NEW FILE) */
.button {
  color: var(--lufa-primitive-color-blue-600);
}
```

---

### Step 3: Verify fix

```bash
pnpm lint
```

---

## 🚨 False Positives / Edge Cases

### Case 1: Token value needed for computation

**Problem:** Need token value for JS calculation (e.g., generating gradient)

**Solution:** Use CSS `calc()` or CSS custom properties instead

```css
/* ✅ GOOD - CSS handles computation */
.gradient {
  background: linear-gradient(to right, var(--lufa-primitive-color-blue-600), var(--lufa-primitive-color-purple-600));
}
```

If truly impossible with CSS, move to utility file (`src/utils/`) which is exempt.

---

### Case 2: Constants file needs tokens

**Problem:** Shared constants file imports tokens

**Location:** If in `src/components/shared/constants.ts` → **Blocked**

**Solution:** Move to `src/utils/constants.ts` (exempt directory)

```typescript
// src/utils/constants.ts - ALLOWED
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const THEME_COLORS = {
  primary: LufaPrimitiveColorBlue600,
};
```

---

### Case 3: Need token value in Storybook control

**Solution:** Already allowed! Stories are exempt.

```typescript
// Button.stories.tsx - ALLOWED
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const Primary = {
  args: {
    color: LufaPrimitiveColorBlue600, // ✅ OK in stories
  },
};
```

---

## 📊 Rule Effectiveness

### How to check compliance

```bash
# Check for violations
cd packages/design-system/main
pnpm lint | grep "no-restricted-imports"

# Should return no results if compliant
```

### Current status

Run the command above to see current compliance status.

---

## 🔗 Related Documentation

- **Usage Guidelines:** [../tokens/docs/USAGE_GUIDELINES.md](../../tokens/docs/USAGE_GUIDELINES.md)
- **Token README:** [../tokens/README.md](../../tokens/README.md)
- **Theming Guide:** (coming soon)

---

## 💡 Philosophy

This rule enforces **separation of concerns**:

- **React components** → Define structure and behavior
- **CSS Modules** → Define appearance and styling
- **Design tokens** → Define design system values

By keeping these layers separate, we ensure:

1. 🎨 **Theming works** - CSS variables can be overridden
2. 🏗️ **Clean architecture** - Clear boundaries between layers
3. 🔄 **Runtime flexibility** - Theme switching without re-render
4. ⚡ **Better performance** - No JS execution for styling

---

**Last Updated:** January 24, 2026  
**Status:** Active - Enforced in all component files  
**Rule:** `no-restricted-imports` (ESLint core rule)
