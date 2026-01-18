# Dark Mode Implementation Guide

## 🌓 Dark Mode Architecture

The Lufa Design System implements dark mode as **mode variants** for each theme. This means:

- **Theme** defines the color personality (default, ocean, forest)
- **Mode** defines the brightness preference (light, dark, auto)

Users can independently choose both theme and mode, providing maximum flexibility.

---

## 📁 File Structure

```
packages/design-system/themes/src/
├── default.css          # Default theme: light + dark modes
├── ocean.css            # Ocean theme: light + dark modes
└── forest.css           # Forest theme: light + dark modes
```

Each theme file contains:

- Light mode colors (default)
- Dark mode colors
- System preference auto-detection
- Shared visual properties (spacing, borders, transitions)

---

## 🎯 Benefits of This Approach

1. **System Preference Integration**: Automatically detects `prefers-color-scheme`
2. **User Flexibility**: Users choose theme and mode independently
3. **Less Duplication**: Visual properties shared across modes
4. **Semantic Correctness**: Dark mode is a mode, not a separate theme
5. **Easy Maintenance**: Update colors once, affects both light and dark

---

## 🎨 CSS Selector Pattern

### Light Mode (Default)

```css
:root[data-theme='ocean'],
:root[data-theme='ocean'][data-mode='light'] {
  --color-text-primary: #0c4a6e;
  --color-background-primary: #ffffff;
  /* ... other light colors ... */

  /* Shared visual properties */
  --border-radius-base: 0.75rem;
  --spacing-base: 1.125rem;
}
```

### Dark Mode

```css
:root[data-theme='ocean'][data-mode='dark'] {
  --color-text-primary: #e0f2fe;
  --color-background-primary: #082f49;
  /* ... other dark colors ... */

  /* Visual properties inherited from light mode */
}
```

### Auto Mode (System Preference)

```css
@media (prefers-color-scheme: dark) {
  :root[data-theme='ocean']:not([data-mode]) {
    --color-text-primary: #e0f2fe;
    --color-background-primary: #082f49;
    /* ... same as dark mode ... */
  }
}
```

---

## 🔧 Usage with useTheme Hook

### Import Themes

```tsx
import '@grasdouble/lufa_design-system-themes/default.css';
import '@grasdouble/lufa_design-system-themes/ocean.css';
import '@grasdouble/lufa_design-system-themes/forest.css';
```

### Use the Hook

```tsx
import { useTheme } from '@grasdouble/lufa_design-system';

function ThemeSwitcher() {
  const { theme, mode, effectiveMode, setTheme, setMode } = useTheme({
    defaultTheme: 'default',
    defaultMode: 'auto',
    enableStorage: true, // Persist to localStorage
  });

  return (
    <div>
      <p>
        Theme: {theme} | Mode: {mode} | Effective: {effectiveMode}
      </p>

      {/* Theme switcher */}
      <button onClick={() => setTheme('default')}>Default</button>
      <button onClick={() => setTheme('ocean')}>Ocean</button>
      <button onClick={() => setTheme('forest')}>Forest</button>

      {/* Mode switcher */}
      <button onClick={() => setMode('light')}>☀️ Light</button>
      <button onClick={() => setMode('dark')}>🌙 Dark</button>
      <button onClick={() => setMode('auto')}>🔄 Auto</button>
    </div>
  );
}
```

### Hook Options

```tsx
interface UseThemeOptions {
  defaultTheme?: 'default' | 'ocean' | 'forest'; // Initial theme
  defaultMode?: 'light' | 'dark' | 'auto'; // Initial mode
  storageKey?: string; // localStorage key
  enableStorage?: boolean; // Enable persistence
}
```

### Return Type

```tsx
interface UseThemeReturn {
  theme: ThemeName; // Current theme
  mode: ThemeMode; // Current mode setting
  effectiveMode: 'light' | 'dark'; // Resolved mode (never 'auto')
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  systemPrefersDark: boolean; // System preference
}
```

---

## 🎨 Dark Mode Color Guidelines

### Principles

1. **Invert Lightness, Not Hue**: Keep color personalities (blue = ocean, green = forest)
2. **Reduce Saturation**: Colors appear more vibrant on dark - reduce by 10-20%
3. **Increase Contrast**: Ensure WCAG AA (4.5:1 for text, 3:1 for UI)
4. **Soften Backgrounds**: Pure black (#000) is harsh - use near-black (#0a0a0a)
5. **Elevate Surfaces**: Cards/modals should be lighter than page background

### Color Transformation Pattern

| Light Mode             | Dark Mode                | Notes                |
| ---------------------- | ------------------------ | -------------------- |
| `#ffffff` (white)      | `#0a0a0a` (near-black)   | Primary background   |
| `#fafafa` (light gray) | `#171717` (dark gray)    | Secondary background |
| `#171717` (dark text)  | `#e5e5e5` (light text)   | Primary text         |
| `#525252` (gray text)  | `#a3a3a3` (lighter gray) | Secondary text       |
| `#0284c7` (blue)       | `#38bdf8` (lighter blue) | Interactive elements |

### Example: Complete Theme Colors

```css
/* Light Mode */
:root[data-theme='ocean'] {
  --color-text-primary: #0c4a6e; /* Dark blue text */
  --color-background-primary: #ffffff; /* White background */
  --color-interactive-default: #0284c7; /* Medium blue */
}

/* Dark Mode */
:root[data-theme='ocean'][data-mode='dark'] {
  --color-text-primary: #e0f2fe; /* Light cyan text */
  --color-background-primary: #082f49; /* Deep ocean blue */
  --color-interactive-default: #38bdf8; /* Brighter blue for contrast */
}
```

---

## ✅ Component Compatibility

Components using semantic tokens automatically support dark mode - **no changes needed**!

### Already Compatible

```css
.alert {
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}
/* ✅ Automatically adapts to light/dark mode */
```

### Needs Fixing

```css
/* ❌ BAD - Hard-coded colors that don't adapt */
.pagination {
  background: #ffffff;
  color: #171717;
  border: 1px solid #e5e5e5;
}

/* ✅ GOOD - Uses semantic tokens */
.pagination {
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}
```

---

## 🔍 Finding Components to Fix

```bash
# Search for hard-coded colors
grep -r "#[0-9a-fA-F]\{6\}" packages/design-system/main/src/components/ --include="*.css"

# Search for non-token variable usage (should use var(--color-*, --spacing-*, etc.))
grep -r "color:\s*[^v]" packages/design-system/main/src/components/ --include="*.css"
```

---

## 📚 Additional Resources

- [Material Design Dark Theme](https://m3.material.io/styles/color/dark-theme/overview)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [CSS Tricks: Dark Mode Guide](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
