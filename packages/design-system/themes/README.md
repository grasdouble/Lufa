[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system-themes

[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

Pre-built theme variants for the Lufa Design System. Each theme provides a full color palette override (Neutral, Brand, Semantic tokens) for light, dark, and high-contrast modes.

---

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-themes
```

---

## Usage

### 1. Import a theme

```css
/* Core tokens are required first */
@import '@grasdouble/lufa_design-system-tokens/style.css';

/* Then import a theme */
@import '@grasdouble/lufa_design-system-themes/ocean.css';
```

### 2. Apply the theme

Use the `data-theme` attribute combined with `data-mode` for light/dark:

```html
<!-- Ocean theme, dark mode -->
<html data-theme="ocean" data-mode="dark">
  <!-- Scoped to a section -->
  <section data-theme="matrix" data-mode="dark"></section>
</html>
```

---

## Available Themes

Each theme includes **31 adaptive tokens** (Neutral, Brand, Semantic) for light, dark, and high-contrast modes.

| Theme            | Personality                  | Key Colors                             |
| :--------------- | :--------------------------- | :------------------------------------- |
| **Ocean** 🌊     | Smooth, flowing, marine      | Cyan 600, Teal 500, Deep Blue          |
| **Forest** 🌲    | Organic, grounded, natural   | Emerald 600, Green 600, Dark Forest    |
| **Matrix** 💾    | Digital, cyber, cinematic    | Neon Green, Mid-tone Green, Deep Black |
| **Cyberpunk** 🎆 | Futuristic, neon, night-city | Fuchsia, Electric Cyan, Purple         |
| **Sunset** 🌅    | Warm, elegant, calm          | Orange 600, Rose 500, Amber            |
| **Nordic** ❄️    | Minimalist, arctic, clean    | Sky 500, Slate Blue, Ice White         |
| **Volcano** 🌋   | Powerful, intense, high-heat | Red 600, Orange 600, Charcoal          |
| **Coffee** ☕    | Retro, vintage, nostalgic    | Amber 900, Yellow 800, Parchment       |
| **Steampunk** ⚙️ | Industrial, vintage, brass   | Amber, Brown, Brass tones              |
| **Volt** ⚡      | Industrial, high-visibility  | Lime 400, Pure Black, Steel Gray       |

---

## Architecture

Themes override the full set of adaptive tokens. Unlike single-color themes, Lufa themes change:

- **Brand Tokens** — Primary and Secondary colors
- **Neutral Tokens** — Backgrounds, surfaces, borders, text
- **Semantic Tokens** — Success, Error, Warning, Info states

Each theme file also includes alpha, shadow, overlay, and glow tokens (cyber themes only).

```
Token types per theme:
  --lufa-color-alpha-{color}-{opacity}        transparency (9 levels per color)
  --lufa-shadow-{size}                  elevation (xs, sm, md, lg, xl)
  --lufa-overlay-{tone}-{intensity}     layering (light/dark × 3 intensities)
  --lufa-glow-{type}-{intensity}        neon glow — Matrix & Cyberpunk only
```

### React hook (with persistence)

```tsx
// hooks/useTheme.ts
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('lufa-theme');
    if (stored && ['light', 'dark', 'high-contrast'].includes(stored)) return stored as Theme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('lufa-theme', theme);
    document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);

  return { theme, setTheme: setThemeState };
}
```

### Prevent FOUC (flash of wrong theme)

Add this inline script in `<head>` before any stylesheets:

```html
<script>
  (function () {
    const theme = localStorage.getItem('lufa-theme') || 'light';
    document.documentElement.setAttribute('data-mode', theme);
  })();
</script>
```

### SSR hydration mismatch

```tsx
function App() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div data-mode="light">{/* loading */}</div>;
  return <div data-mode={theme}>{/* app */}</div>;
}
```

---

## Development

### Build

```bash
pnpm build
```

### Validate token conventions

```bash
pnpm validate:conventions   # Check naming conventions in TOKENS_CONVENTIONS.md
pnpm validate:template      # Check _token-template.css is complete
```

### Add a new theme

1. Copy `src/_token-template.css` → `src/your-theme.css`
2. Fill in all token values for all 3 modes (light, dark, high-contrast)
3. Add to the `themes` array in `scripts/copy-themes.ts`
4. Export in `package.json`
5. Run `pnpm build` then `pnpm validate:template`

---

## Documentation

| File                                                  | Description                |
| :---------------------------------------------------- | :------------------------- |
| [Token Architecture](../tokens/_docs/ARCHITECTURE.md) | How the token system works |
