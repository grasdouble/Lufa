[← Back to Design System Overview](../README.md)

# Lufa Design System — Tokens

[![Style Dictionary](https://img.shields.io/badge/Style_Dictionary-5.x-FF6B35?style=flat-square)](https://styledictionary.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

Design token package for the Lufa Design System. **698 tokens** across 4 levels, generating **1025 CSS custom properties**.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Level 4: COMPONENT (235)  button · card · input · …    │
├─────────────────────────────────────────────────────────┤
│  Level 3: SEMANTIC (175)   ui · interactive · typography│
├─────────────────────────────────────────────────────────┤
│  Level 2: CORE (85)        brand · layout · typography  │
├─────────────────────────────────────────────────────────┤
│  Level 1: PRIMITIVE (203)  color · spacing · motion · … │
└─────────────────────────────────────────────────────────┘
```

| Level         | Tokens  | CSS vars | Description                   |
| ------------- | ------- | -------- | ----------------------------- |
| **Primitive** | 203     | ~250     | Raw immutable values          |
| **Core**      | 85      | ~180     | Global design decisions       |
| **Semantic**  | 175     | ~290     | UI-context tokens             |
| **Component** | 235     | ~305     | Component-specific tokens     |
| **Total**     | **698** | **1025** | Including responsive variants |

## Installation & Setup

```bash
# Build tokens (in monorepo root or package dir)
pnpm build
```

```css
/* In your root CSS file */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

## Usage

### CSS (primary — in CSS Modules)

```css
.button {
  background-color: var(--lufa-core-brand-primary);
  padding: var(--lufa-primitive-spacing-16);
  border-radius: var(--lufa-primitive-radius-scale-base);
  font-size: var(--lufa-primitive-typography-font-size-base);
}
```

### JavaScript / TypeScript

```typescript
// Runtime access (canvas, charts, generated styles)
import tokens from '@grasdouble/lufa_design-system-tokens/values';

const primary = tokens.core.color.brand.primary; // "#2563eb"
const spacing = tokens.primitive.spacing['16']; // "16px"
```

### Naming format

```
--lufa-{level}-{category}-{name}[-{variant}][-{state}]

--lufa-primitive-color-blue-600
--lufa-core-brand-primary
--lufa-semantic-ui-text-primary
--lufa-component-button-primary-background
```

> **Components must never import JSON tokens directly** — use CSS Modules with CSS variables only.  
> See [\_docs/USAGE.md](./_docs/USAGE.md) for the full pattern and ESLint enforcement rules.

## Package Exports

| Export           | Path                                               | Use case               |
| ---------------- | -------------------------------------------------- | ---------------------- |
| Default / values | `@grasdouble/lufa_design-system-tokens/values`     | JS/TS runtime access   |
| CSS variables    | `@grasdouble/lufa_design-system-tokens/tokens.css` | Component styling      |
| Metadata         | `@grasdouble/lufa_design-system-tokens/metadata`   | Build scripts, tooling |

## Development

```bash
pnpm build           # validate → clean → build
pnpm build:watch     # watch mode
pnpm validate:tokens # DTCG format checks
pnpm check:size      # CSS output size guard (warn >120 KB)
pnpm clean           # remove dist/
```

## Documentation

| File                                                    | Description                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| [\_docs/QUICK_REFERENCE.md](./_docs/QUICK_REFERENCE.md) | ⭐ Developer cheat sheet                                                 |
| [\_docs/ARCHITECTURE.md](./_docs/ARCHITECTURE.md)       | 4-level hierarchy, naming conventions, fluid vs responsive, build system |
| [\_docs/TOKENS.md](./_docs/TOKENS.md)                   | Colors, typography, spacing reference tables                             |
| [\_docs/USAGE.md](./_docs/USAGE.md)                     | CSS Modules pattern, anti-patterns, ESLint rules                         |

---

**v1.1.0** · Style Dictionary v5.2.0 · DTCG format · MIT
