[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system-themes

[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

Pre-built theme variants for the Lufa Design System. This package provides specialized color palettes and immersive environments based on the **Token Architecture v2**.

---

## 🚀 Usage

### Installation

```bash
pnpm add @grasdouble/lufa_design-system-themes
```

### CSS Import

Import your desired theme in your main entry file or global CSS:

```css
/* Core system styles are required first */
@import '@grasdouble/lufa_design-system/style.css';

/* Then import individual theme variants */
@import '@grasdouble/lufa_design-system-themes/matrix.css';
@import '@grasdouble/lufa_design-system-themes/cyberpunk.css';
@import '@grasdouble/lufa_design-system-themes/ocean.css';
```

### Applying a Theme

Themes are applied using the `data-color-theme` attribute on any parent element (usually `<html>` or `<body>`).

```html
<!-- Matrix theme in dark mode -->
<html data-color-theme="matrix" data-mode="dark">
  <body>
    ...
  </body>
</html>

<!-- Sunset theme in light mode -->
<div data-color-theme="sunset" data-mode="light">
  <section>Immersive sunset area</section>
</div>
```

---

## 🎨 Available Themes

Every theme includes a full set of **31 adaptive tokens** (Neutral, Brand, Semantic) for Light, Dark, and High Contrast modes.

| Theme            | Personality                  | Key Colors                             |
| :--------------- | :--------------------------- | :------------------------------------- |
| **Default**      | Balanced & professional      | Blue 600, Gray 50-900                  |
| **Ocean** 🌊     | Smooth, flowing, marine      | Cyan 600, Teal 500, Deep Deep Blue     |
| **Forest** 🌲    | Organic, grounded, natural   | Emerald 600, Green 600, Dark Forest    |
| **Matrix** 💾    | Digital, cyber, cinematic    | Neon Green, Mid-tone Green, Deep Black |
| **Cyberpunk** 🎆 | Futuristic, neon, night-city | Fuchsia, Electric Cyan, Purple         |
| **Sunset** 🌅    | Warm, elegant, calm          | Orange 600, Rose 500, Amber            |
| **Nordic** ❄️    | Minimalist, arctic, clean    | Sky 500, Slate Blue, Ice White         |
| **Volcano** 🌋   | Powerful, intense, high-heat | Red 600, Orange 600, Charcoal          |
| **Coffee** ☕    | Retro, vintage, nostalgic    | Amber 900, Yellow 800, Parchment       |
| **Volt** ⚡      | Industrial, high-visibility  | Lime 400, Pure Black, Steel Gray       |

---

## 🎯 Architecture

Themes in v2 are designed to be fully immersive. Unlike traditional themes that only change primary colors, Lufa themes override:

- **Core Brand Tokens**: Primary and Secondary colors.
- **Neutral Tokens**: Backgrounds, surfaces, borders, and text colors.
- **Semantic Tokens**: Success, Error, Warning, and Info states.

This ensures that the entire UI—from alert boxes to page backgrounds—morphs to match the theme's aesthetic.

---

## 🏗️ Development

### Building Themes

To compile the themes from `src/` to `dist/`:

```bash
cd packages/design-system/themes
pnpm build
```

### Validating Token Conventions

To validate that the token naming conventions documentation is complete and correct:

```bash
cd packages/design-system/themes
pnpm validate:conventions
```

This script performs **33+ automated checks** including:

- ✅ All alpha opacity levels documented (3, 5, 8, 10, 15, 20, 30, 40, 50)
- ✅ All shadow sizes defined (xs, sm, md, lg, xl)
- ✅ Overlay tokens with all intensity variants
- ✅ Code examples and usage guidelines present
- ✅ Required documentation sections exist

### Adding a New Theme

1. Create a new CSS file in `src/theme-name.css`.
2. Define the tokens for `:root`, `[data-mode='dark']`, and `[data-mode='high-contrast']`.
3. Add the theme to the `themes` array in `scripts/copy-themes.ts`.
4. Export the file in `package.json`.

---

## 📚 Resources

- **[Token Naming Conventions](./TOKENS_CONVENTIONS.md)**: 📘 **Official naming standards for alpha, shadow, and overlay tokens**
- **[Theme Switching Guide](./_docs/theme-switching-guide.md)**: Deep dive into implementation
- **[Token Architecture](../../tokens/_docs/token-architecture.md)**: Understanding how tokens work

### Quick Token Reference

```css
/* Alpha Tokens - Standardized transparency */
--lufa-alpha-{color}-{opacity}  /* opacity: 3, 5, 8, 10, 15, 20, 30, 40, 50 */

/* Shadow Tokens - Standardized elevation */
--lufa-shadow-{size}  /* size: xs, sm, md, lg, xl */

/* Overlay Tokens - Standardized layering */
--lufa-overlay-{tone}-{intensity}  /* tone: light, dark | intensity: subtle, default, strong */
```

For complete documentation, usage guidelines, and examples, see **[TOKENS_CONVENTIONS.md](./TOKENS_CONVENTIONS.md)**.

---

**Status:** ✅ Production Ready (v2)
