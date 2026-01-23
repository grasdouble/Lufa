[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system-themes

[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> **⚠️ Phase 6 Implementation - Coming Soon**

Theme variants for the Lufa Design System v2. Will provide Token Architecture v2 based themes.

**Part of the [Lufa Design System](../README.md)** - Pre-built Theme Variants

---

## 🚧 Current Status

**Phase:** Phase 6 (not yet started)  
**Available Themes:** Default only (in tokens package)  
**Legacy Themes:** Archived in `packages/design-system/themes-legacy/`

---

## 🎯 Theme Architecture v2

Themes in v2 will be generated from **token overrides** using Style Dictionary:

```
Token JSON → Style Dictionary → Theme CSS
```

**Benefits over legacy themes:**

- ✅ Single source of truth (JSON token definitions)
- ✅ Automatic consistency (derived tokens update)
- ✅ Type-safe (TypeScript types generated)
- ✅ Light/dark mode automatic
- ✅ WCAG AAA contrast (pattern "on-X")

---

## 📋 Planned Themes

### Default Theme

**Status:** ✅ Available in Token Architecture v2

**Location:** `@grasdouble/lufa_design-system-tokens`

```tsx
import '@grasdouble/lufa_design-system/style.css';

// Default theme included automatically
```

---

### Ocean Theme

**Status:** ⏳ Phase 6

**Color palette (from legacy):**

- Primary: `#0077be` (ocean blue)
- Secondary: `#00a8cc` (light cyan)

**Personality:** Smooth, flowing, modern

**Reference:** `packages/design-system/themes-legacy/src/ocean.css`

---

### Forest Theme

**Status:** ⏳ Phase 6

**Color palette (from legacy):**

- Primary: `#2d5016` (forest green)
- Secondary: `#6a994e` (light green)

**Personality:** Organic, grounded, natural

**Reference:** `packages/design-system/themes-legacy/src/forest.css`

---

## 🚀 Future Usage (Phase 6)

### Installation

```bash
pnpm add @grasdouble/lufa_design-system-themes
```

### CSS Import

```css
/* Import a theme (Phase 6) */
@import '@grasdouble/lufa_design-system-themes/ocean.css';
/* or */
@import '@grasdouble/lufa_design-system-themes/forest.css';
```

### Apply Theme

```html
<!-- Ocean theme -->
<html data-theme="ocean" data-mode="dark">
  <!-- Your app -->
</html>
```

### React/TypeScript

```tsx
import '@grasdouble/lufa_design-system-themes/ocean.css';

function App() {
  return <div data-theme="ocean">{/* Your app */}</div>;
}
```

---

## 🏗️ How to Create Themes (Phase 6)

### Step 1: Define Token Overrides

Create `packages/design-system/tokens/src/themes/ocean.json`:

```json
{
  "theme": {
    "ocean": {
      "color": {
        "brand": {
          "primary": { "$value": "#0077be" }
        }
      }
    }
  }
}
```

### Step 2: Build Tokens

```bash
cd packages/design-system/tokens
pnpm build
# Generates dist/themes/ocean.css
```

### Step 3: Copy to Themes Package

```bash
cd packages/design-system/themes
pnpm build
# Copies generated CSS to dist/
```

---

## 📚 Documentation

**Token Architecture v2:** `packages/design-system/tokens/README.md`  
**Legacy Themes (reference):** `packages/design-system/themes-legacy/`

---

## 🔜 Timeline

- **Phase 5A (current):** Default theme only
- **Phase 6:** Ocean + Forest themes recreation
- **Phase 7+:** Additional custom themes

---

**Status:** 🚧 Placeholder for Phase 6  
**Current:** Use default theme from tokens package
