# @grasdouble/lufa_design-system-themes

Theme variants for the Lufa Design System. Provides alternative color schemes that override token tokens.

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

- `--color-text-*` - Text colors
- `--color-background-*` - Background colors
- `--color-border-*` - Border colors
- `--color-interactive-*` - Interactive element colors
- `--color-success-*`, `--color-error-*`, etc. - State colors
- `--color-brand-*` - Brand colors

Each theme provides a complete set of semantic color overrides that maintain accessibility and design consistency.
