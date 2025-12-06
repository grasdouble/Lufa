# @grasdouble/lufa_design-system-foundation

Foundation tokens for the Lufa Design System. Includes semantic colors, spacing, typography, shadows, and more.

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-foundation
```

## Usage

### TypeScript/JavaScript

```typescript
import { semantic, spacing, typography } from '@grasdouble/lufa_design-system-foundation';

const primaryColor = semantic.primary.base; // Uses primitives
const baseSpacing = spacing.base;
```

### CSS

```css
@import '@grasdouble/lufa_design-system-foundation/foundation.css';

.my-element {
  color: var(--color-primary-base);
  padding: var(--spacing-md);
  font-size: var(--font-size-body);
}
```

## Tokens

- **Semantic Colors** - Purpose-based colors (primary, success, error, etc.)
- **Spacing** - Consistent spacing scale
- **Typography** - Font sizes, weights, line heights
- **Radius** - Border radius values
- **Shadows** - Box shadow tokens
- **Z-Index** - Layering system
- **Breakpoints** - Responsive breakpoints
