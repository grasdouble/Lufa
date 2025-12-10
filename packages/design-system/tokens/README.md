# @grasdouble/lufa_design-system-tokens

Semantic design tokens for the Lufa Design System. Provides purpose-based design decisions for colors, spacing, typography, and more.

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-tokens
```

## Usage

### TypeScript/JavaScript

```typescript
import {
  semantic,
  spacing,
  typography,
} from "@grasdouble/lufa_design-system-tokens";

const primaryColor = semantic.primary.base;
const baseSpacing = spacing.base;
const bodyFontSize = typography.fontSize.body;
```

### CSS

```css
@import "@grasdouble/lufa_design-system-tokens/styles.css";

.my-element {
  color: var(--color-primary-base);
  padding: var(--spacing-md);
  font-size: var(--font-size-body);
}
```

## Design Tokens

Design tokens are the design decisions of the system, stored as data:

- **Semantic Colors** - Purpose-based colors (interactive, success, error, warning, brand, etc.)
- **Spacing** - Consistent spacing scale for layouts
- **Typography** - Font sizes, weights, line heights, letter spacing
- **Radius** - Border radius values for consistent roundness
- **Shadows** - Box shadow tokens for depth and elevation
- **Z-Index** - Layering system for overlays and modals
- **Breakpoints** - Responsive breakpoints for different screen sizes
