[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system-themes

[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> Theme variants for the Lufa Design System. Provides alternative color schemes that override token values.

**Part of the [Lufa Design System](../README.md)** - Pre-built Theme Variants

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-themes
```

## Available Themes

- **Ocean** - Blue/aqua color scheme
- **Forest** - Green/earth color scheme

## Usage

### CSS Import

```css
/* Import a theme */
@import '@grasdouble/lufa_design-system-themes/ocean.css';
/* or */
@import '@grasdouble/lufa_design-system-themes/forest.css';
```

### Apply Theme

Themes work by setting the `data-theme` attribute:

```html
<!-- Ocean theme -->
<div data-theme="ocean">
  <p>This content uses the ocean theme</p>
</div>

<!-- Forest theme -->
<div data-theme="forest">
  <p>This content uses the forest theme</p>
</div>
```

### JavaScript/React

```tsx
import '@grasdouble/lufa_design-system-themes/ocean.css';

function App() {
  return <div data-theme="ocean">{/* Your app content */}</div>;
}
```

### Dynamic Theme Switching

```tsx
import { useState } from 'react';

import '@grasdouble/lufa_design-system-themes/ocean.css';
import '@grasdouble/lufa_design-system-themes/forest.css';

function App() {
  const [theme, setTheme] = useState('ocean');

  return (
    <div data-theme={theme}>
      <button onClick={() => setTheme('ocean')}>Ocean</button>
      <button onClick={() => setTheme('forest')}>Forest</button>
      {/* Your app content */}
    </div>
  );
}
```

## How Themes Work

Themes override CSS custom properties defined by the token package:

**Color Properties**:
- `--color-text-*` - Text colors
- `--color-background-*` - Background colors
- `--color-border-*` - Border colors
- `--color-interactive-*` - Interactive element colors
- `--color-success-*`, `--color-error-*`, etc. - State colors
- `--color-brand-*` - Brand colors

**Visual Properties** (new):
- `--border-radius-*` - Border radius (sm, base, lg, xl, etc.)
- `--spacing-*` - Spacing values (sm, base, lg, xl, etc.)
- `--transition-duration-*` - Animation speeds (fast, base, slow)
- `--border-width-*` - Border widths (thin, thick, etc.)
- `--opacity-*` - Opacity values (light, medium, etc.)

Each theme provides semantic overrides that maintain accessibility and design consistency while creating a unique visual identity.

### Theme Personalities

**Ocean Theme**: Smooth, flowing, modern
- More rounded corners (larger border radius)
- More spacious layout (increased spacing)
- Slower, smoother transitions
- Blue/aqua color palette

**Forest Theme**: Organic, grounded, natural
- Less rounded corners (smaller border radius)
- More compact layout (reduced spacing)
- Faster, snappier transitions
- Thicker borders for earthy feel
- Green/earth color palette
