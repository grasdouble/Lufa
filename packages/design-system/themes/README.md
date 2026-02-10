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

### Validating Token Templates

To validate that the token template file is complete and ready for use:

```bash
cd packages/design-system/themes
pnpm validate:template
```

This script performs **12+ automated checks** on `src/_token-template.css` including:

- ✅ Alpha tokens with all 9 opacity levels (3, 5, 8, 10, 15, 20, 30, 40, 50)
- ✅ Shadow tokens with all 5 sizes (xs, sm, md, lg, xl)
- ✅ Overlay tokens with light/dark variants
- ✅ RGB placeholders and variable documentation
- ✅ Usage instructions and implementation checklist
- ✅ Support for all 3 modes (light, dark, high-contrast)

### Adding a New Theme

1. **Reference the token template**: Use `src/_token-template.css` as your starting point
   - **Important**: The template shows correct CSS structure with tokens inside selectors
   - **Do NOT copy tokens outside of CSS selectors** - they must be inside `[data-color-theme='your-theme']`
2. Create a new CSS file in `src/theme-name.css`
3. Follow the template structure to define:
   - RGB variable tokens using `--lufa-{color}-rgb` pattern (e.g., `--lufa-primary-rgb`)
   - Alpha tokens using the RGB variables (all 9 opacity levels for all 6 colors)
   - Shadow tokens with mode-aware colors (different values per mode)
   - Overlay tokens with mode-adjusted opacity (values change per mode)
4. Define tokens for all 3 modes: light, dark, and high-contrast
   - Each mode needs its own `[data-color-theme='your-theme'][data-mode='mode']` block
   - Shadow colors and overlay opacity should be adjusted per mode
5. Add the theme to the `themes` array in `scripts/copy-themes.ts`
6. Export the file in `package.json`
7. Run `pnpm build` to compile the theme
8. Run `pnpm validate:template` to ensure template compliance

**Pro Tip**: The token template (`src/_token-template.css`) includes:

- ✅ Correct CSS selector structure (copy the selectors!)
- ✅ Complete 54 alpha tokens (6 colors × 9 levels each)
- ✅ Mode-aware shadow and overlay examples
- ✅ Comprehensive documentation and usage examples
- ✅ File structure guide showing how to organize your theme file

**Common Pitfalls to Avoid**:

- ❌ Don't use `--lufa-rgb-primary` pattern → ✅ Use `--lufa-primary-rgb` instead
- ❌ Don't put tokens outside CSS selectors → ✅ Always wrap in `[data-color-theme]` blocks
- ❌ Don't use only 3 opacity levels for semantic colors → ✅ Use all 9 levels for consistency
- ❌ Don't copy same overlay values for all modes → ✅ Adjust opacity per mode for accessibility

---

## 📚 Resources

- **[Token Template](./src/_token-template.css)**: 📝 **Copy-paste template for creating theme tokens** (NEW!)
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
