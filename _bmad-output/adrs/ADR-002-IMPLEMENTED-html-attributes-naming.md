# ADR-002: HTML Attribute Naming Convention

**Status:** Accepted  
**Date:** 2026-01-26  
**Deciders:** Architecture Team  
**Context:** Phase 2A - Theme System Integration  
**Related:** ADR-001 (Modes vs Themes Separation)

---

## Context

With the decision to separate modes (accessibility) from themes (brand variants), we need to establish HTML attribute naming conventions that:

1. Clearly distinguish between the two concepts
2. Avoid naming conflicts with other libraries
3. Follow web standards and conventions
4. Are intuitive for developers
5. Work well with CSS selectors

### Current State

**Token System (as-built):**

```css
[data-theme='light'] {
  /* ... */
}
[data-theme='dark'] {
  /* ... */
}
[data-theme='high-contrast'] {
  /* ... */
}
```

**Existing Hook (incompatible):**

```html
<html data-theme="ocean" data-mode="dark"></html>
```

**Problem:** Semantic mismatch - tokens use `data-theme` for modes, hook uses it for brand themes.

---

## Decision

We will use the following HTML attribute naming convention:

### 1. Mode Attribute

**Attribute:** `data-mode`  
**Purpose:** Accessibility/color scheme preference  
**Values:** `light` | `dark` | `high-contrast`  
**Managed by:** `useThemeMode` hook  
**Package:** `@lufa/tokens`

```html
<html data-mode="dark"></html>
```

### 2. Theme Attribute

**Attribute:** `data-color-theme`  
**Purpose:** Brand/palette variant  
**Values:** `default` | `ocean` | `forest` | (custom)  
**Managed by:** `useTheme` hook  
**Package:** `@lufa/themes`

```html
<html data-color-theme="ocean"></html>
```

### 3. Combined Usage

```html
<html data-mode="dark" data-color-theme="ocean"></html>
```

---

## Rationale

### Why `data-mode`?

**Semantic Clarity:**

- "Mode" clearly indicates a system state or preference
- Common term in accessibility contexts (dark mode, high-contrast mode)
- Short and memorable

**Industry Precedent:**

- iOS/macOS: "Dark Mode"
- Windows: "Dark Mode", "High Contrast Mode"
- Android: "Dark Theme" (mode concept)
- GitHub: "Theme" toggle with mode values

**Standards Alignment:**

- Aligns with `prefers-color-scheme` media query
- Matches `prefers-contrast` terminology
- WCAG uses "contrast modes"

**Technical Benefits:**

- Clear that it's a system-level setting
- Implies auto-detection possibility
- Doesn't conflict with other libraries

### Why `data-color-theme` (not just `data-theme`)?

**Avoids Conflicts:**

- Many libraries use `data-theme` (DaisyUI, Radix, shadcn, etc.)
- Our existing token CSS uses `[data-theme]` for modes
- Adding `color-` prefix eliminates ambiguity

**Semantic Precision:**

- "color-theme" specifically means color palette/brand
- Differentiates from layout themes, typography themes, etc.
- More specific than generic "theme"

**Future-Proofing:**

- Leaves room for `data-typography-theme`, `data-spacing-theme`, etc.
- Modular theming approach possible
- Clear scope of what this attribute controls

**Clarity in Code:**

```typescript
// Clear what each controls
const { mode } = useThemeMode();           // Accessibility
const { theme } = useTheme();              // Brand colors

// Obvious in HTML
<html data-mode="dark" data-color-theme="ocean">
```

---

## Alternatives Considered

### Alternative 1: `data-theme-mode` + `data-theme-name`

```html
<html data-theme-mode="dark" data-theme-name="ocean"></html>
```

**Pros:**

- Both attributes clearly theme-related
- Namespaced under "theme" concept
- Symmetric naming pattern

**Cons:**

- ❌ Verbose (15 and 14 characters)
- ❌ "theme-mode" is redundant/confusing
- ❌ Doesn't match system preference terminology
- ❌ "theme-name" is generic, unclear what it controls

**Rejected:** Too verbose, doesn't improve clarity

---

### Alternative 2: `data-color-scheme` + `data-theme`

```html
<html data-color-scheme="dark" data-theme="ocean"></html>
```

**Pros:**

- `color-scheme` matches CSS property name
- `theme` is short and common
- Semantic alignment with CSS standards

**Cons:**

- ❌ `data-theme` conflicts with existing token CSS
- ❌ `data-theme` used by many other libraries
- ❌ `color-scheme` implies only light/dark (CSS property is boolean-ish)
- ❌ Doesn't clearly include high-contrast mode concept

**Rejected:** Conflict with existing `[data-theme]` selectors in token CSS, and `color-scheme` doesn't capture high-contrast

---

### Alternative 3: Composite Value Pattern

```html
<html data-theme="ocean-dark"></html>
```

**Pros:**

- Single attribute (simpler HTML)
- All state in one place
- Common in some frameworks

**Cons:**

- ❌ N×M value explosion (9+ combinations)
- ❌ CSS selectors become complex: `[data-theme^='ocean']`, `[data-theme$='-dark']`
- ❌ Can't auto-detect mode without parsing string
- ❌ Theme and mode coupling (can't change independently)
- ❌ Programmatic access harder: `theme.split('-')`

**Rejected:** Couples two orthogonal concepts, makes CSS and JS harder

---

### Alternative 4: Semantic Naming

```html
<html data-accessibility-mode="dark" data-brand-theme="ocean"></html>
```

**Pros:**

- Extremely explicit about purpose
- No ambiguity whatsoever
- Self-documenting

**Cons:**

- ❌ Very verbose (21 and 15 characters)
- ❌ Awkward to type and read
- ❌ Not common in industry
- ❌ Over-engineered for the need

**Rejected:** Too verbose, not worth the added clarity

---

### Alternative 5: Keep Existing + Add New

```html
<html data-theme="dark" data-brand="ocean"></html>
```

**Pros:**

- Minimal changes to token CSS
- `data-theme` for mode is industry-standard-ish
- Short and simple

**Cons:**

- ❌ Conflicts with many other libraries using `data-theme`
- ❌ "brand" alone is unclear (brand what? logo? colors? typography?)
- ❌ Not parallel in naming structure
- ❌ Confusion with existing hook's `data-theme` meaning

**Rejected:** `data-theme` has too much ambiguity, `data-brand` unclear

---

## Consequences

### Positive

**Clear Semantic Distinction:**

```typescript
// Obvious what each does
document.documentElement.setAttribute('data-mode', 'dark');
document.documentElement.setAttribute('data-color-theme', 'ocean');
```

**CSS Selectors Are Obvious:**

```css
/* Mode selectors */
[data-mode='light'] {
  /* ... */
}
[data-mode='dark'] {
  /* ... */
}
[data-mode='high-contrast'] {
  /* ... */
}

/* Theme selectors */
[data-color-theme='ocean'] {
  /* ... */
}
[data-color-theme='forest'] {
  /* ... */
}

/* Combined selectors */
[data-color-theme='ocean'][data-mode='dark'] {
  /* ... */
}
```

**No Library Conflicts:**

- `data-mode` is rare in the ecosystem
- `data-color-theme` is unique to our system
- Won't clash with DaisyUI, Radix, shadcn, etc.

**Future-Proof:**

```html
<!-- Phase 6+ expansion possibilities -->
<html data-mode="dark" data-color-theme="ocean" data-typography-theme="compact" data-spacing-theme="comfortable"></html>
```

**Developer Experience:**

```javascript
// Easy to read and understand
const mode = document.documentElement.getAttribute('data-mode');
const theme = document.documentElement.getAttribute('data-color-theme');

// Clear in debugging
console.log('Mode:', mode); // "dark"
console.log('Color Theme:', theme); // "ocean"
```

### Negative

**Breaking Changes Required:**

**Token CSS Selectors Must Change:**

```diff
- [data-theme='light'] { /* ... */ }
- [data-theme='dark'] { /* ... */ }
- [data-theme='high-contrast'] { /* ... */ }
+ [data-mode='light'] { /* ... */ }
+ [data-mode='dark'] { /* ... */ }
+ [data-mode='high-contrast'] { /* ... */ }
```

**Style Dictionary Config Update:**

```javascript
// config.json
{
  "platforms": {
    "css": {
      "files": [{
        "options": {
          // Before: selector: "[data-theme='${mode}']"
          "selector": "[data-mode='${mode}']" // Updated
        }
      }]
    }
  }
}
```

**Hook Implementation Changes:**

```typescript
// useThemeMode.ts
useEffect(() => {
  // Before: setAttribute('data-theme', mode)
  document.documentElement.setAttribute('data-mode', mode); // Updated
}, [mode]);

// useTheme.ts (Phase 6)
useEffect(() => {
  // Before: setAttribute('data-theme', theme)
  document.documentElement.setAttribute('data-color-theme', theme); // Updated
}, [theme]);
```

**Slightly Longer Attribute Name:**

- `data-color-theme` is 16 characters vs `data-theme` (10 characters)
- Marginally more verbose in HTML
- Trade-off for clarity

**Documentation Updates:**

- All examples need to show new attributes
- Migration guide required
- API reference updates
- Storybook documentation

### Neutral

**Not Following CSS `color-scheme` Property:**

- CSS has `color-scheme: light dark;` property
- We're using `data-mode` instead of matching that
- **Rationale:** `color-scheme` is about browser UI styling, `data-mode` is about our token system
- **Acceptable trade-off:** Our naming is clearer for our use case

**Longer Than Some Alternatives:**

- `data-mode` is 9 characters (vs `data-theme` at 10, so actually shorter!)
- `data-color-theme` is 16 characters (vs `data-theme` at 10)
- **Acceptable trade-off:** Clarity worth the extra bytes

---

## Implementation Impact

### Files That Must Change

**Style Dictionary:**

```
packages/design-system/tokens/
├── config.json               # Update selector template
├── build.js                  # Update selector logic
└── dist/tokens.css           # Regenerated output
```

**Hooks:**

```
packages/design-system/main/src/hooks/
├── useThemeMode.ts           # New hook, uses data-mode
└── useTheme.ts               # Update to use data-color-theme (Phase 6)
```

**Components:**

```
packages/design-system/storybook/src/components/
└── ThemeSwitcher/            # Update to use new attributes
```

**Documentation:**

```
packages/design-system/_docs/
├── theme-switching-guide.md  # Update all examples
└── architecture.md           # Document attribute conventions
```

### Migration Path

**Phase 1: Update Token Generation (Phase 2A)**

1. Change Style Dictionary config to use `data-mode`
2. Regenerate `tokens.css`
3. Test that selectors work correctly

**Phase 2: Create New Hook (Phase 2A)**

1. Implement `useThemeMode` with `data-mode` attribute
2. Export from `@lufa/main`
3. Update ThemeSwitcher to use new hook

**Phase 3: Phase 6 Theme Implementation**

1. Implement real ocean.css and forest.css
2. Update/clarify `useTheme` to use `data-color-theme`
3. Enable theme switching UI

**Phase 4: Deprecation (Post-Phase 6)**

1. Mark old `useTheme` mode behavior as deprecated
2. Provide migration guide
3. Eventually remove if fully replaced

---

## Validation

This decision will be validated by:

1. **Token CSS Generation:** Verify `[data-mode='dark']` selectors are generated correctly
2. **Hook Testing:** Verify hooks set correct attributes
3. **Storybook Visual:** Verify mode switching works in Storybook
4. **Browser DevTools:** Verify attributes are readable and debuggable
5. **Library Isolation:** Verify no conflicts with other design systems

---

## Examples

### HTML Output

```html
<!DOCTYPE html>
<html lang="en" data-mode="dark" data-color-theme="ocean">
  <head>
    <link rel="stylesheet" href="tokens.css" />
    <link rel="stylesheet" href="themes.css" />
  </head>
  <body>
    <!-- Content inherits mode and theme via cascade -->
  </body>
</html>
```

### CSS Selectors

```css
/* tokens.css - Mode overrides */
:root,
[data-mode='light'] {
  --lufa-core-brand-primary: #3b82f6;
  --lufa-core-neutral-background-page: #ffffff;
}

[data-mode='dark'] {
  --lufa-core-brand-primary: #60a5fa;
  --lufa-core-neutral-background-page: #0a0a0a;
}

[data-mode='high-contrast'] {
  --lufa-core-brand-primary: #0066ff;
  --lufa-semantic-ui-text-emphasis: #ffffff;
}

/* themes.css - Theme overrides (Phase 6) */
[data-color-theme='ocean'] {
  --lufa-core-brand-primary: #0ea5e9;
  --lufa-core-brand-secondary: #06b6d4;
}

[data-color-theme='forest'] {
  --lufa-core-brand-primary: #10b981;
  --lufa-core-brand-secondary: #059669;
}

/* Combined selectors - Theme wins in cascade */
[data-color-theme='ocean'][data-mode='dark'] {
  --lufa-core-brand-primary: #38bdf8; /* Lighter ocean for dark mode */
}
```

### React Usage

```typescript
import { useThemeMode } from '@lufa/main';

function App() {
  const { mode, setMode } = useThemeMode({
    defaultMode: 'light',
    autoDetect: true,
  });

  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={() => setMode('dark')}>Dark</button>
      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setMode('high-contrast')}>High Contrast</button>
    </div>
  );
}

// Result: <html data-mode="dark">
```

### JavaScript Access

```javascript
// Get current values
const mode = document.documentElement.dataset.mode;
const theme = document.documentElement.dataset.colorTheme;

console.log(mode); // "dark"
console.log(theme); // "ocean"

// Set values
document.documentElement.dataset.mode = 'high-contrast';
document.documentElement.dataset.colorTheme = 'forest';
```

---

## Related Decisions

- **ADR-001:** Separation of modes and themes (architectural rationale)
- **Future:** CSS custom property naming convention
- **Future:** Theme plugin/extension system

---

## References

- [MDN: Using data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
- [CSS `color-scheme` property](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- [CSS `prefers-color-scheme` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- Phase 2A Analysis: `theme-system-analysis-2026-01-26.md`

---

**Signed off by:** Architecture Team  
**Implementation Start:** Phase 2A  
**Review Date:** Post-Phase 2A implementation
