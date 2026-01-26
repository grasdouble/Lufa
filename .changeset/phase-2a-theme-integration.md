---
'@grasdouble/lufa_design-system-tokens': minor
'@grasdouble/lufa_design-system': minor
'@grasdouble/lufa_design-system-storybook': patch
'@grasdouble/lufa_design-system-themes': patch
---

# Phase 2A: Theme System Integration

Implement proper separation between accessibility modes and brand themes following BMad architecture decisions.

## Breaking Changes

### Token CSS Selectors

**BREAKING:** Token CSS now uses `[data-mode]` instead of `[data-theme]` for accessibility modes.

**Before:**
```css
[data-theme='dark'] { /* dark mode styles */ }
[data-theme='high-contrast'] { /* high-contrast styles */ }
```

**After:**
```css
[data-mode='dark'] { /* dark mode styles */ }
[data-mode='high-contrast'] { /* high-contrast styles */ }
```

**Migration:** Update your HTML attributes from `data-theme` to `data-mode` for light/dark/high-contrast modes.

## Features

### @grasdouble/lufa_design-system

- **New Hook:** `useThemeMode` for managing accessibility modes
  - Supports 3 modes: light, dark, high-contrast
  - System preference detection (`prefers-color-scheme`, `prefers-contrast`)
  - localStorage persistence
  - SSR-safe
  
```typescript
import { useThemeMode } from '@grasdouble/lufa_design-system';

function App() {
  const { mode, setMode, systemPreference } = useThemeMode();
  
  return (
    <button onClick={() => setMode('dark')}>
      Switch to Dark Mode
    </button>
  );
}
```

### @grasdouble/lufa_design-system-tokens

- Updated CSS selectors: `[data-theme]` → `[data-mode]`
- Support for 3 accessibility modes: light, dark, high-contrast
- 31 mode-aware tokens with proper overrides

### @grasdouble/lufa_design-system-storybook

- Updated ThemeSwitcher component to use `useThemeMode`
- Added high-contrast mode to toolbar
- Improved mode selector UI

### @grasdouble/lufa_design-system-themes

- Added Phase 6 placeholders for ocean/forest themes
- Documented `data-color-theme` attribute usage
- Prepared architecture for brand theme variants

## Architecture Decisions

- **ADR-001:** Modes vs Themes Separation - Separate accessibility from branding
- **ADR-002:** HTML Attributes Naming - Use `data-mode` + `data-color-theme`

## Documentation

Full BMad Method documentation available in `_bmad-output/subjects/theme-integration/`:
- Analysis report (26 pages)
- Technical specification (1,835 lines)
- Implementation report (2,800+ lines)
- 2 Architecture Decision Records

## Migration Guide

### Updating HTML Attributes

```html
<!-- Before -->
<html data-theme="dark">

<!-- After -->
<html data-mode="dark">
```

### Using the New Hook

If you were using `useTheme` for mode management:

```typescript
// Before
const { mode, setMode } = useTheme();

// After
const { mode, setMode } = useThemeMode();
```

### CSS Selectors

If you have custom CSS using the old selectors:

```css
/* Before */
[data-theme='dark'] { /* ... */ }

/* After */
[data-mode='dark'] { /* ... */ }
```

## Future Work (Phase 6)

- Implement ocean/forest brand themes
- Re-enable theme selector in Storybook
- Support all 9 combinations (3 modes × 3 themes)
