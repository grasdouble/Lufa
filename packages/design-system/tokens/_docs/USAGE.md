# Design Tokens Usage Guidelines

---

## Core Principles

### 1. Components use CSS Modules only

**React components MUST NOT import tokens directly — use CSS Modules only.**

```typescript
// ✅ CORRECT
import styles from './Button.module.css';

export const Button = ({ children }) => (
  <button className={styles.button}>{children}</button>
);
```

```css
/* Button.module.css */
.button {
  background-color: var(--lufa-core-brand-primary);
  padding: var(--lufa-primitive-spacing-16);
}
```

### 2. CSS variables are the single source of truth

```
Design Tokens (JSON)
    ↓ Style Dictionary builds
CSS Custom Properties (tokens.css)
    ↓ Imported in root CSS
CSS Modules (*.module.css)
    ↓ Applied via className
React Components (*.tsx)
```

### 3. Theming happens at CSS level

```css
:root {
  --lufa-core-brand-primary: #2563eb;
}
[data-mode='dark'] {
  --lufa-core-brand-primary: #60a5fa;
}

/* Component adapts automatically — no JS changes needed */
.button {
  background-color: var(--lufa-core-brand-primary);
}
```

---

## Package Exports

| Export            | Import path                                        | Use case                                    |
| ----------------- | -------------------------------------------------- | ------------------------------------------- |
| **CSS variables** | `@grasdouble/lufa_design-system-tokens/tokens.css` | **Primary** — import in root CSS            |
| **Token values**  | `@grasdouble/lufa_design-system-tokens/values`     | Storybook stories, documentation            |
| **Metadata**      | `@grasdouble/lufa_design-system-tokens/metadata`   | Build scripts, linters (includes WCAG info) |

```css
/* In your root CSS (e.g., index.css) */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

```typescript
// In Storybook stories only
import tokens from '@grasdouble/lufa_design-system-tokens/values';

const primary = tokens.core.brand.primary; // "#2563eb"
```

---

## Best Practices

### Prefer semantic tokens over primitives

```css
/* ✅ PREFERRED — semantic naming */
.button {
  background-color: var(--lufa-core-brand-primary);
}

/* ✅ ACCEPTABLE — primitives when no semantic token exists */
.button {
  padding: var(--lufa-primitive-spacing-16);
  border-radius: var(--lufa-primitive-radius-scale-base);
}
```

### Opacity & alpha tokens

```css
/* ✅ PREFERRED — semantic overlays */
.modal-backdrop {
  background-color: var(--lufa-semantic-ui-overlay-backdrop);
}
.button:disabled {
  opacity: var(--lufa-semantic-interactive-disabled-opacity);
}

/* ✅ ACCEPTABLE — primitive alpha for exact values */
.elevation-soft {
  box-shadow: 0 1px 2px var(--lufa-primitive-color-alpha-black-5);
}
```

Available alpha values: `black-{4|5|8|12|15|16|38|50|60|80|90|100}` / same for `white`.

### CSS variable inheritance

```css
/* Avoid redundancy — define once, inherit down */
.card {
  --local-padding: var(--lufa-primitive-spacing-24);
}
.card-header,
.card-body {
  padding: var(--local-padding);
}
```

---

## Anti-Patterns

### ❌ Token JSON in components

```typescript
// ❌ WRONG — value hardcoded at build time, no theme switching
import tokens from '@grasdouble/lufa_design-system-tokens/values';
<button style={{ color: tokens.primitive.color.blue['600'] }}>…</button>
```

### ❌ Inline `var()` style

```typescript
// ❌ WRONG — inline styles have higher specificity, bypass CSS scoping
<button style={{ color: 'var(--lufa-primitive-color-blue-600)' }}>…</button>
```

### ❌ Hardcoded values

```css
/* ❌ WRONG */
.button {
  padding: 16px;
  background-color: #2563eb;
}

/* ✅ CORRECT */
.button {
  padding: var(--lufa-primitive-spacing-16);
  background-color: var(--lufa-core-brand-primary);
}
```

### ❌ Missing `--lufa-` prefix

```css
/* ❌ WRONG */
.button {
  color: var(--primitive-color-blue-600);
}

/* ✅ CORRECT */
.button {
  color: var(--lufa-primitive-color-blue-600);
}
```

---

## Usage by Context

| Context                 | Token JSON import? | Notes                                        |
| ----------------------- | ------------------ | -------------------------------------------- |
| `*.tsx` component       | ❌ Forbidden       | CSS Modules + CSS variables only             |
| `*.module.css`          | n/a                | Always use `var(--lufa-*)` custom properties |
| `*.stories.tsx`         | ✅ `/values` only  | For story descriptions and docs              |
| `*.test.tsx`            | ✅ `/values` only  | For CSS variable assertions                  |
| `scripts/`, build tools | ✅ All exports     | Full access to values + metadata             |

---

## ESLint Enforcement

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["@grasdouble/lufa_design-system-tokens"],
            "message": "Do not import tokens in components. Use CSS Modules with var(--lufa-*) instead. See packages/design-system/tokens/_docs/USAGE.md"
          },
          {
            "group": ["@grasdouble/lufa_design-system-tokens/values"],
            "message": "Token values are for Storybook/tests only, not components. See packages/design-system/tokens/_docs/USAGE.md"
          },
          {
            "group": ["@grasdouble/lufa_design-system-tokens/metadata"],
            "message": "Token metadata is for build scripts/tooling only. See packages/design-system/tokens/_docs/USAGE.md"
          }
        ]
      }
    ]
  },
  "overrides": [
    {
      "files": ["**/*.stories.tsx", "**/*.test.tsx", "scripts/**"],
      "rules": { "no-restricted-imports": "off" }
    }
  ]
}
```

---

## Quick Decision

1. **Are you in a component file?** → CSS Modules only, no token imports.
2. **Are you in a story/test?** → `/values` import is allowed.
3. **Are you in a build script?** → All exports allowed.
4. **Not sure?** → CSS Modules. Always correct.

---

**Related**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [TOKENS.md](./TOKENS.md)
