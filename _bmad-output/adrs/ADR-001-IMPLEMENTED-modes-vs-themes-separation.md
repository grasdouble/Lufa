# ADR-001: Separation of Modes and Themes

**Status:** Accepted  
**Date:** 2026-01-26  
**Deciders:** Architecture Team  
**Context:** Phase 2A - Theme System Integration

---

## Context

The Lufa Design System v0.7.1 requires a robust theming architecture that supports:

1. **Accessibility modes** - Light, dark, and high-contrast color schemes for user preferences and accessibility requirements
2. **Brand themes** - Visual variants like ocean and forest that override brand colors while maintaining accessibility

Initial implementation conflated these two concepts:

- The `useTheme` hook managed both "theme" (ocean/forest/default) and "mode" (light/dark)
- Token system uses `[data-theme]` selectors for light/dark/high-contrast
- Ocean and forest themes are placeholders only (Phase 6 implementation)
- No clear distinction between accessibility concerns and brand customization

This created several problems:

- **Semantic confusion:** "theme" had two different meanings (brand variant vs accessibility mode)
- **Technical mismatch:** Hook sets `data-theme="ocean"` + `data-mode="dark"` but tokens expect `data-theme="dark"`
- **Missing features:** No high-contrast mode support in hook
- **Future complexity:** Phase 6 theme variants need separate management

### Industry Standards

**W3C/WCAG:**

- Uses "color scheme" for light/dark/high-contrast (accessibility)
- Separate from "themes" (brand/stylistic variations)

**CSS Media Queries:**

- `prefers-color-scheme: dark` (system preference)
- `prefers-contrast: more` (accessibility requirement)

**Design Systems:**

- Material Design: "theme" = brand, "mode" = light/dark
- Fluent UI: "theme" = variant, "color scheme" = light/dark
- Atlassian: Separate mode and theme controls

---

## Decision

We will **separate modes from themes** as distinct architectural concepts:

### 1. Modes = Accessibility Preferences

**Managed by:** `@lufa/tokens` package  
**Purpose:** Accessibility, user preference (WCAG)  
**Values:** `light` | `dark` | `high-contrast`  
**Implementation:**

- Token overrides in Style Dictionary
- System preference detection (media queries)
- Applied via CSS selectors

### 2. Themes = Brand Variants

**Managed by:** `@lufa/themes` package  
**Purpose:** Brand customization, visual identity  
**Values:** `default` | `ocean` | `forest` (extensible)  
**Implementation:**

- CSS variable overrides for brand tokens
- Optional add-on to base system
- Phase 6 implementation

### 3. Orthogonal Relationship

Modes and themes can be combined independently:

- Ocean theme + Dark mode
- Forest theme + High-contrast mode
- Default theme + Light mode
- Any combination of 3 modes × 3+ themes

---

## Rationale

### Standards Alignment

- ✅ Matches W3C terminology and semantics
- ✅ Aligns with CSS media query concepts
- ✅ Consistent with other design systems
- ✅ Separates accessibility from aesthetics

### Technical Benefits

- ✅ Clear package boundaries (`tokens` vs `themes`)
- ✅ Independent versioning and updates
- ✅ Token system can evolve without breaking themes
- ✅ Themes can be added/removed without affecting modes

### Flexibility

- ✅ Consumers can use only modes (no themes)
- ✅ New themes can be added without core changes
- ✅ Third-party themes possible
- ✅ Mode detection can be automatic, themes are explicit

### Maintainability

- ✅ Each concept has single source of truth
- ✅ Testing is simpler (test modes × themes separately)
- ✅ Documentation is clearer
- ✅ No semantic confusion

### User Experience

- ✅ Clearer UI controls (mode selector vs theme selector)
- ✅ Mode auto-detection makes sense
- ✅ Theme selection is explicit brand choice
- ✅ Accessibility settings don't conflict with brand

---

## Consequences

### Positive

**Two Separate Hooks:**

```typescript
// For accessibility/system preference
const { mode, setMode } = useThemeMode();
// mode: 'light' | 'dark' | 'high-contrast'

// For brand variants (Phase 6)
const { theme, setTheme } = useTheme();
// theme: 'default' | 'ocean' | 'forest'
```

**Two HTML Attributes:**

```html
<html data-mode="dark" data-color-theme="ocean"></html>
```

- Each attribute has clear, single purpose
- No conflicts or overloading
- Easy to understand and debug

**Clear Package Responsibilities:**

```
@lufa/tokens      → Defines modes (light/dark/high-contrast)
@lufa/themes      → Defines themes (ocean/forest/custom)
@lufa/main        → Provides hooks for both
```

**CSS Cascade Behavior:**

```css
/* Tokens define mode overrides */
[data-mode='dark'] {
  --lufa-core-brand-primary: #60a5fa;
}

/* Themes override brand tokens (Phase 6) */
[data-color-theme='ocean'] {
  --lufa-core-brand-primary: #0ea5e9; /* Ocean blue */
}

/* Both can apply - theme overrides win */
[data-color-theme='ocean'][data-mode='dark'] {
  --lufa-core-brand-primary: #38bdf8; /* Lighter ocean blue for dark */
}
```

**Testing Simplicity:**

- Test 3 modes independently
- Test N themes independently
- Test M×N combinations if needed
- Storybook can show mode + theme controls separately

### Negative

**Two Hooks Required:**

- Consumers need to understand both concepts
- More API surface area
- Two separate state management contexts
- Documentation must explain distinction

**Migration Effort:**

- Existing `useTheme` hook needs updates
- ThemeSwitcher component needs refactor
- Storybook integration needs changes
- Documentation needs rewrite

**Increased Complexity:**

- Two HTML attributes to manage
- Two localStorage keys
- Two sync operations
- More CSS selectors to reason about

### Neutral

**Phase 6 Implications:**

- Themes (ocean/forest) won't be implemented until Phase 6
- Hook architecture established now
- Clear path forward for theme variants
- No breaking changes when Phase 6 lands

**Backward Compatibility:**

- Existing `useTheme` hook kept as-is
- New `useThemeMode` hook added alongside
- Gradual migration possible
- No immediate breaking changes

---

## Alternatives Considered

### Alternative 1: Single "Theme" Concept

**Approach:** Use composite values like "ocean-dark", "forest-light"

**Rejected because:**

- ❌ N×M value explosion (9+ values for 3 themes × 3 modes)
- ❌ Mode auto-detection becomes impossible
- ❌ Doesn't match system preference APIs
- ❌ Mixes accessibility and brand concerns

### Alternative 2: Mode as Property of Theme

**Approach:** Themes define their own modes

**Rejected because:**

- ❌ Ocean theme would need ocean-light, ocean-dark, ocean-contrast
- ❌ Violates DRY (every theme re-implements modes)
- ❌ Mode preferences not portable across themes
- ❌ Accessibility becomes theme-specific

### Alternative 3: Keep Existing Hook Structure

**Approach:** Continue with `data-theme` + `data-mode` pattern

**Rejected because:**

- ❌ Doesn't match token system selectors
- ❌ Semantic confusion persists
- ❌ Missing high-contrast mode
- ❌ Ocean/forest are non-functional placeholders

---

## Implementation Notes

### Package Structure

```
packages/design-system/
├── tokens/          # Modes defined here
│   ├── tokens/
│   │   ├── core/   # Base tokens
│   │   ├── dark/   # Dark mode overrides
│   │   └── high-contrast/ # High-contrast overrides
│   └── dist/
│       └── tokens.css  # [data-mode] selectors
│
├── themes/          # Themes defined here
│   ├── src/
│   │   ├── ocean.css   # Phase 6: Ocean brand tokens
│   │   └── forest.css  # Phase 6: Forest brand tokens
│   └── dist/
│       └── themes.css  # [data-color-theme] selectors
│
└── main/            # Hooks provided here
    └── src/hooks/
        ├── useThemeMode.ts  # Mode management
        └── useTheme.ts      # Theme management (Phase 6)
```

### Style Dictionary Changes Required

```javascript
// config.json - Update selectors
{
  "platforms": {
    "css": {
      "transforms": ["..."],
      "files": [
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "options": {
            "selector": "[data-mode='${mode}']" // Changed from data-theme
          }
        }
      ]
    }
  }
}
```

### Hook API Contract

```typescript
// Mode Hook (Phase 2A)
interface UseThemeModeReturn {
  mode: 'light' | 'dark' | 'high-contrast';
  setMode: (mode: ThemeMode) => void;
  systemPrefersDark: boolean;
  systemPrefersContrast: boolean;
  systemPreference: ThemeMode | null;
}

// Theme Hook (Phase 6)
interface UseThemeReturn {
  theme: 'default' | 'ocean' | 'forest' | string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
}
```

---

## Validation

This decision will be validated by:

1. **Storybook Visual Testing:** All mode × theme combinations render correctly
2. **Token Coverage:** All 31 mode-aware tokens work in all 3 modes
3. **System Preference Detection:** Auto-detection works for dark + high-contrast
4. **Hook Isolation:** Changing mode doesn't reset theme, and vice versa
5. **Phase 6 Readiness:** Theme implementation path is clear and doesn't require refactoring

---

## Related Decisions

- **ADR-002:** HTML attribute naming conventions
- **Future:** Phase 6 theme variant implementation strategy
- **Future:** Custom theme plugin system

---

## References

- [W3C CSS Color Module Level 4 - prefers-color-scheme](https://www.w3.org/TR/css-color-4/#color-scheme)
- [WCAG 2.1 - Understanding Contrast (Enhanced)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html)
- [Material Design - Theming](https://m3.material.io/styles/color/overview)
- Phase 2A Analysis: `theme-system-analysis-2026-01-26.md`

---

**Signed off by:** Architecture Team  
**Implementation Start:** Phase 2A  
**Review Date:** Phase 6 planning (when themes are implemented)
