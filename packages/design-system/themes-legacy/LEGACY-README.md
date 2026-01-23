# 📦 Lufa Design System - Themes (Legacy)

**⚠️ ARCHIVED PACKAGE - DO NOT USE FOR NEW DEVELOPMENT**

This package contains the **legacy theme CSS files** for the old Lufa Design System architecture (pre-v2).

---

## 🗄️ Archive Information

**Archived Date:** 2026-01-23  
**Reason:** Design System v2 implementation with Token Architecture v2  
**Phase:** Phase 5A - Component reimplementation

---

## 📋 Contents

This package contains **3 legacy theme CSS files**:

**Themes archived:**

1. **default.css** (12.7 KB) - Default light + dark theme
2. **ocean.css** (14.3 KB) - Ocean theme variant
3. **forest.css** (14.6 KB) - Forest theme variant

**Theme structure (legacy):**

- Hard-coded CSS custom properties
- Manual light/dark mode switching
- Limited token architecture

---

## 🔄 Migration Path

### New Themes Package

**Location:** `packages/design-system/themes/`  
**Approach:** Token Architecture v2 based themes

**Key differences in v2:**

- ✅ Token-based theme generation (not hand-coded CSS)
- ✅ 4-layer token architecture (primitives → core → semantic → component)
- ✅ Automatic light/dark mode generation
- ✅ Pattern "on-X" for WCAG AAA contrast
- ✅ Theme switching without JavaScript

**Theme generation in v2:**

```
Tokens (JSON) → Style Dictionary → CSS variables → Theme CSS
```

---

## 🚫 Why This Package Exists

**Purpose:** Preserve legacy themes for color reference during migration

**Benefits:**

1. **Color reference:** Legacy themes show color palettes that users liked
2. **Brand consistency:** Ensure new themes maintain brand identity
3. **Migration guide:** Compare old vs new theme structure
4. **No conflicts:** Legacy themes don't interfere with new theme system

**This package is NOT intended for:**

- ❌ New theme development
- ❌ Production usage
- ❌ Active maintenance
- ❌ Publishing to registry

---

## 🎯 Current Status

**New Themes (packages/design-system/themes/):**

- ⏳ Clean slate, ready for Theme Architecture v2
- ⏳ Default theme will be generated from Token Architecture v2
- ⏳ Ocean/Forest themes will be recreated using token overrides

**Legacy Themes (this package):**

- 🗄️ 3 legacy theme files preserved
- 🔒 No new themes will be added
- 📖 Read-only reference for color values

---

## 🔧 Legacy Theme Structure

### Default Theme (legacy)

**Color palette:**

- Primary: `#007bff` (blue)
- Secondary: `#6c757d` (gray)
- Success: `#28a745` (green)
- Error: `#dc3545` (red)
- Warning: `#ffc107` (yellow)
- Info: `#17a2b8` (cyan)

**Usage (legacy - DO NOT USE):**

```css
@import '@grasdouble/lufa_design-system-themes-legacy/default.css';
```

---

## 🎨 Theme Architecture v2 (New Approach)

### How Themes Work in v2

**1. Define token overrides (JSON):**

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

**2. Style Dictionary generates CSS:**

```css
[data-theme='ocean'] {
  --primitive-color-brand-primary: #0077be;
  /* ... all derived tokens automatically update */
}
```

**3. Components use semantic tokens:**

```css
.button-primary {
  background-color: var(--semantic-ui-background-primary);
  /* Automatically uses theme override */
}
```

**Benefits:**

- ✅ Single source of truth (JSON tokens)
- ✅ Automatic consistency (derived tokens update)
- ✅ Type-safe (TypeScript types generated)
- ✅ No manual CSS maintenance

---

## 🎯 Theme Recreation Plan (Phase 6)

**Priority order:**

1. **Default theme** (Phase 5A)
   - Already generated from Token Architecture v2
   - Light + dark mode with automatic switching
   - WCAG AAA contrast (pattern "on-X")

2. **Ocean theme** (Phase 6)
   - Recreate using token overrides
   - Extract color palette from `ocean.css` (legacy)
   - Map to primitive layer
   - Regenerate with Style Dictionary

3. **Forest theme** (Phase 6)
   - Same process as Ocean
   - Extract colors from `forest.css` (legacy)

---

## 🔍 Color Extraction (Reference)

**To recreate Ocean theme:**

1. Open `packages/design-system/themes-legacy/src/ocean.css`
2. Extract brand colors:
   - Primary: `#0077be` (ocean blue)
   - Secondary: `#00a8cc` (light cyan)
   - Accent: `#005f8f` (dark blue)
3. Create token override JSON in `packages/design-system/tokens/src/themes/ocean.json`
4. Run `pnpm ds:tokens:build` to generate theme CSS

**To recreate Forest theme:**

- Primary: `#2d5016` (forest green)
- Secondary: `#6a994e` (light green)
- Accent: `#a7c957` (lime green)

---

## 📚 Documentation

**New Theme Documentation:**

- Token Architecture v2: `packages/design-system/tokens/README.md`
- Theme creation guide: (to be created in Phase 6)

**Legacy Theme Reference:**

- This package shows legacy approach
- Do NOT copy CSS directly (use token system)

---

## 🗑️ Future Deletion

**When will this package be deleted?**

This package will be removed after:

1. ✅ Default theme finalized (Phase 5A)
2. ✅ Ocean theme recreated with tokens (Phase 6)
3. ✅ Forest theme recreated with tokens (Phase 6)
4. ✅ Theme documentation complete
5. ✅ Team consensus that legacy reference no longer needed

**Estimated timeline:** Q3 2026 (after theme recreation in Phase 6)

---

## 📞 Questions?

**For new theme development (Phase 6):**

- Use Token Architecture v2 (JSON token overrides)
- Reference primitive color values from legacy CSS
- Follow Style Dictionary build process

**For legacy reference:**

- This package provides color palette reference
- Do not use legacy CSS directly

---

**Archive Date:** 2026-01-23  
**Archived By:** Phase 5A Implementation  
**Status:** 🗄️ Read-Only Archive (Color Reference)
