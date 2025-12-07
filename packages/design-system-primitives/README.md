# @grasdouble/lufa_design-system-primitives

Primitive color tokens for the Lufa Design System. These are the raw base color values that rarely change.

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-primitives
```

## Usage

### TypeScript/JavaScript

```typescript
import { primitives } from '@grasdouble/lufa_design-system-primitives';

const primaryBlue = primitives.blue[600]; // '#2563EB'
```

### CSS

```css
@import '@grasdouble/lufa_design-system-primitives/primitives.css';

.my-element {
  color: var(--primitive-blue-600);
}
```

## Colors

All color scales follow WCAG 2.1 AAA accessibility guidelines:

- `neutral` - Grayscale (0-1000)
- `blue` - Primary brand color (50-950)
- `green` - Success states (50-950)
- `orange` - Warning states (50-950)
- `red` - Error states (50-950)
- `purple` - Info/secondary (50-950)
- `violet` - Accent color (50-950)
- `yellow` - Highlight (50-950)

Each scale provides sufficient contrast ratios for accessible text and UI elements.
