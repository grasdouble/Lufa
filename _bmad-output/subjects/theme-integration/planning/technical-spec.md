# Theme Integration Technical Specification

**Version:** 1.0  
**Date:** 2026-01-26  
**Status:** Ready for Implementation  
**Phase:** 2A - Theme System Integration  
**Related ADRs:** ADR-001 (Modes vs Themes), ADR-002 (HTML Attributes)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Token System Changes](#token-system-changes)
3. [Hook Specifications](#hook-specifications)
4. [CSS Cascade Behavior](#css-cascade-behavior)
5. [Component Integration](#component-integration)
6. [Testing Requirements](#testing-requirements)
7. [Migration Guide](#migration-guide)

---

## Architecture Overview

### Package Responsibilities

```
┌─────────────────────────────────────────────────────────────┐
│                        @lufa/tokens                         │
│  Responsibility: Define color modes (accessibility)         │
│  Output: tokens.css with [data-mode] selectors             │
│  Values: light | dark | high-contrast                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ generates CSS
                              ↓
                    ┌──────────────────┐
                    │  tokens.css      │
                    │  [data-mode]     │
                    └──────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         @lufa/themes                         │
│  Responsibility: Define brand color variants                │
│  Output: themes.css with [data-color-theme] selectors      │
│  Values: default | ocean | forest | (custom)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ generates CSS
                              ↓
                    ┌──────────────────┐
                    │  themes.css      │
                    │  [data-color-    │
                    │   theme]         │
                    └──────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                          @lufa/main                          │
│  Responsibility: Provide React hooks for both               │
│  Exports: useThemeMode, useTheme                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ sets attributes
                              ↓
                    ┌──────────────────┐
                    │  <html           │
                    │    data-mode     │
                    │    data-color-   │
                    │    theme>        │
                    └──────────────────┘
                              │
                              │ CSS cascade
                              ↓
                    ┌──────────────────┐
                    │  Component       │
                    │  (inherits       │
                    │   styles)        │
                    └──────────────────┘
```

### Data Flow Diagram

```
┌─────────────┐
│   User      │
│   Action    │
└──────┬──────┘
       │
       ↓
┌──────────────────────────────┐
│  useThemeMode()              │
│  - setMode('dark')           │
│  - Detects system prefs      │
│  - Updates state             │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│  useEffect                   │
│  - setAttribute('data-mode') │
│  - localStorage.setItem()    │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│  <html data-mode="dark">     │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│  CSS Selector Match          │
│  [data-mode='dark'] {        │
│    --lufa-*: value;          │
│  }                           │
└──────┬───────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│  Component Re-renders        │
│  (CSS variables updated)     │
└──────────────────────────────┘
```

### Dependency Graph

```
@lufa/tokens (base)
    │
    ├──> @lufa/main (depends on tokens)
    │       │
    │       └──> @lufa/storybook (depends on main)
    │
    └──> @lufa/themes (peer dependency with tokens)
            │
            └──> @lufa/storybook (depends on themes)
```

**Key Dependencies:**

- `@lufa/main` imports TypeScript types only (no runtime dep on tokens)
- `@lufa/themes` peer depends on `@lufa/tokens` (CSS cascade order)
- `@lufa/storybook` imports both hooks and CSS files

---

## Token System Changes

### Current State (Before)

**File:** `packages/design-system/tokens/config.json`

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "files": [
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "category": "core"
            }
          },
          "options": {
            "selector": ":root",
            "outputReferences": true
          }
        },
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "category": "core",
              "mode": "dark"
            }
          },
          "options": {
            "selector": "[data-theme='dark']",
            "outputReferences": true
          }
        },
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "category": "core",
              "mode": "high-contrast"
            }
          },
          "options": {
            "selector": "[data-theme='high-contrast']",
            "outputReferences": true
          }
        }
      ]
    }
  }
}
```

**Generated CSS:**

```css
/* BEFORE */
:root,
[data-theme='light'] {
  --lufa-core-brand-primary: #3b82f6;
  --lufa-core-neutral-background-page: #ffffff;
}

[data-theme='dark'] {
  --lufa-core-brand-primary: #60a5fa;
  --lufa-core-neutral-background-page: #0a0a0a;
}

[data-theme='high-contrast'] {
  --lufa-core-brand-primary: #0066ff;
}
```

### Target State (After)

**File:** `packages/design-system/tokens/config.json`

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/",
      "files": [
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "category": "core"
            }
          },
          "options": {
            "selector": ":root, [data-mode='light']",
            "outputReferences": true
          }
        },
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "category": "core",
              "mode": "dark"
            }
          },
          "options": {
            "selector": "[data-mode='dark']",
            "outputReferences": true
          }
        },
        {
          "destination": "tokens.css",
          "format": "css/variables",
          "filter": {
            "attributes": {
              "category": "core",
              "mode": "high-contrast"
            }
          },
          "options": {
            "selector": "[data-mode='high-contrast']",
            "outputReferences": true
          }
        }
      ]
    }
  }
}
```

**Generated CSS:**

```css
/* AFTER */
:root,
[data-mode='light'] {
  --lufa-core-brand-primary: #3b82f6;
  --lufa-core-neutral-background-page: #ffffff;
  /* ... all 173 base tokens ... */
}

[data-mode='dark'] {
  --lufa-core-brand-primary: #60a5fa;
  --lufa-core-neutral-background-page: #0a0a0a;
  /* ... 31 dark mode overrides ... */
}

[data-mode='high-contrast'] {
  --lufa-core-brand-primary: #0066ff;
  --lufa-semantic-ui-action-primary-text: #ffffff;
  /* ... 31 high-contrast overrides ... */
}
```

### Build Process Updates

**File:** `packages/design-system/tokens/package.json`

```json
{
  "scripts": {
    "build": "style-dictionary build",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean"
  }
}
```

**No changes needed** - existing build process will work with updated config.

**Validation Command:**

```bash
cd packages/design-system/tokens
npm run build
# Verify output in dist/tokens.css
```

---

## Hook Specifications

### useThemeMode Hook (NEW)

**File:** `packages/design-system/main/src/hooks/useThemeMode.ts`

#### Type Definitions

```typescript
/**
 * Theme mode values matching accessibility preferences
 */
export type ThemeMode = 'light' | 'dark' | 'high-contrast';

/**
 * System preference detected from media queries
 * null if autoDetect is disabled
 */
export type SystemPreference = ThemeMode | null;

/**
 * Configuration options for useThemeMode hook
 */
export interface UseThemeModeOptions {
  /**
   * Initial mode to use
   * @default 'light'
   */
  defaultMode?: ThemeMode;

  /**
   * Enable automatic detection from system preferences
   * Uses prefers-color-scheme and prefers-contrast media queries
   * @default true
   */
  autoDetect?: boolean;

  /**
   * localStorage key for persistence
   * @default 'lufa-theme-mode'
   */
  storageKey?: string;

  /**
   * Enable localStorage persistence
   * @default true
   */
  enableStorage?: boolean;
}

/**
 * Return value from useThemeMode hook
 */
export interface UseThemeModeReturn {
  /**
   * Current active mode
   */
  mode: ThemeMode;

  /**
   * Update the current mode
   * Persists to localStorage if enableStorage is true
   * Updates data-mode attribute on <html>
   */
  setMode: (mode: ThemeMode) => void;

  /**
   * Whether system prefers dark color scheme
   * Based on prefers-color-scheme: dark media query
   */
  systemPrefersDark: boolean;

  /**
   * Whether system prefers high contrast
   * Based on prefers-contrast: more media query
   */
  systemPrefersContrast: boolean;

  /**
   * Detected system preference (null if autoDetect disabled)
   * Priority: high-contrast > dark > light
   */
  systemPreference: SystemPreference;
}
```

#### Hook Implementation

```typescript
import { useCallback, useEffect, useState } from 'react';

export function useThemeMode(options?: UseThemeModeOptions): UseThemeModeReturn {
  const {
    defaultMode = 'light',
    autoDetect = true,
    storageKey = 'lufa-theme-mode',
    enableStorage = true,
  } = options ?? {};

  // Initialize mode state
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode());

  // System preference state
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [systemPrefersContrast, setSystemPrefersContrast] = useState(false);

  /**
   * Determine initial mode on mount
   */
  function getInitialMode(): ThemeMode {
    // SSR safety - always return default on server
    if (typeof window === 'undefined') {
      return defaultMode;
    }

    // Check localStorage first (explicit user preference)
    if (enableStorage) {
      const stored = localStorage.getItem(storageKey);
      if (stored && isValidMode(stored)) {
        return stored as ThemeMode;
      }
    }

    // Auto-detect from system preferences
    if (autoDetect) {
      // Priority 1: High contrast
      if (window.matchMedia('(prefers-contrast: more)').matches) {
        return 'high-contrast';
      }
      // Priority 2: Dark mode
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      // Priority 3: Light mode (default)
      return 'light';
    }

    // Fallback to default
    return defaultMode;
  }

  /**
   * Listen to system preference changes
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !autoDetect) return;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    const updateDark = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemPrefersDark(e.matches);
    };

    const updateContrast = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemPrefersContrast(e.matches);
    };

    // Set initial values
    updateDark(darkQuery);
    updateContrast(contrastQuery);

    // Listen for changes
    darkQuery.addEventListener('change', updateDark);
    contrastQuery.addEventListener('change', updateContrast);

    return () => {
      darkQuery.removeEventListener('change', updateDark);
      contrastQuery.removeEventListener('change', updateContrast);
    };
  }, [autoDetect]);

  /**
   * Sync mode to HTML attribute
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  /**
   * Persist mode to localStorage
   */
  useEffect(() => {
    if (!enableStorage || typeof window === 'undefined') return;
    localStorage.setItem(storageKey, mode);
  }, [mode, storageKey, enableStorage]);

  /**
   * Public API to change mode
   */
  const setMode = useCallback((newMode: ThemeMode) => {
    if (!isValidMode(newMode)) {
      console.warn(`[useThemeMode] Invalid mode: ${newMode}`);
      return;
    }
    setModeState(newMode);
  }, []);

  /**
   * Compute system preference
   */
  const systemPreference: SystemPreference = autoDetect
    ? systemPrefersContrast
      ? 'high-contrast'
      : systemPrefersDark
        ? 'dark'
        : 'light'
    : null;

  return {
    mode,
    setMode,
    systemPrefersDark,
    systemPrefersContrast,
    systemPreference,
  };
}

/**
 * Type guard for ThemeMode
 */
function isValidMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && ['light', 'dark', 'high-contrast'].includes(value);
}
```

#### Usage Examples

```typescript
// Basic usage
function App() {
  const { mode, setMode } = useThemeMode();

  return (
    <button onClick={() => setMode('dark')}>
      Switch to Dark Mode
    </button>
  );
}

// With options
function App() {
  const { mode, setMode, systemPreference } = useThemeMode({
    defaultMode: 'light',
    autoDetect: true,
    storageKey: 'my-app-theme-mode',
    enableStorage: true,
  });

  return (
    <div>
      <p>Current: {mode}</p>
      <p>System: {systemPreference}</p>
    </div>
  );
}

// Disable auto-detection
function App() {
  const { mode, setMode } = useThemeMode({
    autoDetect: false,
    defaultMode: 'dark',
  });
  // Will NOT change on system preference changes
}

// Disable storage
function App() {
  const { mode, setMode } = useThemeMode({
    enableStorage: false,
  });
  // Will NOT persist across page reloads
}
```

#### localStorage Key

**Key:** `lufa-theme-mode` (default)  
**Value:** `"light"` | `"dark"` | `"high-contrast"`  
**Example:** `localStorage.getItem('lufa-theme-mode') // "dark"`

#### System Preference Detection Logic

```typescript
// Priority order when autoDetect is enabled:

1. Check localStorage (explicit user choice)
   ├─ If found and valid → use stored value
   └─ Otherwise, continue

2. Check system preferences
   ├─ prefers-contrast: more → 'high-contrast'
   ├─ prefers-color-scheme: dark → 'dark'
   └─ Otherwise → 'light'

3. Fallback to defaultMode option
```

**Media Query Compatibility:**

- `prefers-color-scheme`: Chrome 76+, Firefox 67+, Safari 12.1+
- `prefers-contrast`: Chrome 96+, Firefox 101+, Safari 14.1+

---

### useTheme Hook (UPDATED for Phase 6)

**File:** `packages/design-system/main/src/hooks/useTheme.ts`

#### Type Definitions

```typescript
/**
 * Available theme variants
 */
export type ThemeName = 'default' | 'ocean' | 'forest';

/**
 * Configuration options for useTheme hook
 */
export interface UseThemeOptions {
  /**
   * Initial theme to use
   * @default 'default'
   */
  defaultTheme?: ThemeName;

  /**
   * localStorage key for persistence
   * @default 'lufa-color-theme'
   */
  storageKey?: string;

  /**
   * Enable localStorage persistence
   * @default true
   */
  enableStorage?: boolean;
}

/**
 * Return value from useTheme hook
 */
export interface UseThemeReturn {
  /**
   * Current active theme
   */
  theme: ThemeName;

  /**
   * Update the current theme
   * Persists to localStorage if enableStorage is true
   * Updates data-color-theme attribute on <html>
   */
  setTheme: (theme: ThemeName) => void;

  /**
   * List of available themes
   */
  availableThemes: ThemeName[];
}
```

#### Hook Implementation (Simplified)

```typescript
import { useCallback, useEffect, useState } from 'react';

const AVAILABLE_THEMES: ThemeName[] = ['default', 'ocean', 'forest'];

export function useTheme(options?: UseThemeOptions): UseThemeReturn {
  const { defaultTheme = 'default', storageKey = 'lufa-color-theme', enableStorage = true } = options ?? {};

  // Initialize theme state
  const [theme, setThemeState] = useState<ThemeName>(() => getInitialTheme());

  /**
   * Determine initial theme on mount
   */
  function getInitialTheme(): ThemeName {
    // SSR safety
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    // Check localStorage
    if (enableStorage) {
      const stored = localStorage.getItem(storageKey);
      if (stored && isValidTheme(stored)) {
        return stored as ThemeName;
      }
    }

    return defaultTheme;
  }

  /**
   * Sync theme to HTML attribute
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (theme === 'default') {
      // Remove attribute for default theme
      document.documentElement.removeAttribute('data-color-theme');
    } else {
      document.documentElement.setAttribute('data-color-theme', theme);
    }
  }, [theme]);

  /**
   * Persist theme to localStorage
   */
  useEffect(() => {
    if (!enableStorage || typeof window === 'undefined') return;
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey, enableStorage]);

  /**
   * Public API to change theme
   */
  const setTheme = useCallback((newTheme: ThemeName) => {
    if (!isValidTheme(newTheme)) {
      console.warn(`[useTheme] Invalid theme: ${newTheme}`);
      return;
    }
    setThemeState(newTheme);
  }, []);

  return {
    theme,
    setTheme,
    availableThemes: AVAILABLE_THEMES,
  };
}

/**
 * Type guard for ThemeName
 */
function isValidTheme(value: unknown): value is ThemeName {
  return typeof value === 'string' && AVAILABLE_THEMES.includes(value as ThemeName);
}
```

#### Changes from Current Implementation

**REMOVED:**

- ❌ `mode` property (moved to `useThemeMode`)
- ❌ `setMode()` method
- ❌ `effectiveMode` computed property
- ❌ System preference detection for dark mode
- ❌ `data-mode` attribute management

**KEPT:**

- ✅ `theme` property (but simplified to only theme variants)
- ✅ `setTheme()` method
- ✅ localStorage persistence
- ✅ SSR safety

**CHANGED:**

- 🔄 HTML attribute: `data-theme` → `data-color-theme`
- 🔄 localStorage key: `lufa-theme` → `lufa-color-theme`
- 🔄 No longer manages both theme + mode, only theme

#### Usage Example

```typescript
// Phase 6 usage (when ocean/forest are implemented)
function App() {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <select onChange={(e) => setTheme(e.target.value as ThemeName)}>
        {availableThemes.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}

// Combined with useThemeMode
function App() {
  const { mode, setMode } = useThemeMode();
  const { theme, setTheme } = useTheme();

  // Both hooks working independently
  return (
    <div>
      <p>Mode: {mode}</p>
      <p>Theme: {theme}</p>
    </div>
  );
}
```

---

## CSS Cascade Behavior

### How Modes and Themes Combine

#### CSS Specificity Rules

```css
/* Base tokens - Specificity: (0,0,0) for :root, (0,1,0) for [data-mode] */
:root,
[data-mode='light'] {
  --lufa-core-brand-primary: #3b82f6; /* Blue 500 */
}

/* Mode override - Specificity: (0,1,0) */
[data-mode='dark'] {
  --lufa-core-brand-primary: #60a5fa; /* Blue 400 (lighter) */
}

/* Theme override - Specificity: (0,1,0) */
[data-color-theme='ocean'] {
  --lufa-core-brand-primary: #0ea5e9; /* Sky 500 (ocean blue) */
}

/* Combined - Specificity: (0,2,0) - WINS */
[data-color-theme='ocean'][data-mode='dark'] {
  --lufa-core-brand-primary: #38bdf8; /* Sky 400 (lighter ocean) */
}
```

#### Cascade Priority

```
1. :root (base tokens) - Specificity (0,0,0)
2. [data-mode='light'] - Specificity (0,1,0)
3. [data-mode='dark'] - Specificity (0,1,0)
4. [data-color-theme='ocean'] - Specificity (0,1,0)
5. [data-color-theme='ocean'][data-mode='dark'] - Specificity (0,2,0) ⭐ WINNER
```

**Last rule wins when specificity is equal.**

### Example Combinations

#### Combination 1: Default Theme + Light Mode

```html
<html data-mode="light"></html>
```

**Result:**

```css
--lufa-core-brand-primary: #3b82f6; /* From [data-mode='light'] */
--lufa-core-neutral-background-page: #ffffff;
```

---

#### Combination 2: Default Theme + Dark Mode

```html
<html data-mode="dark"></html>
```

**Result:**

```css
--lufa-core-brand-primary: #60a5fa; /* From [data-mode='dark'] */
--lufa-core-neutral-background-page: #0a0a0a;
```

---

#### Combination 3: Ocean Theme + Light Mode

```html
<html data-mode="light" data-color-theme="ocean"></html>
```

**Result:**

```css
--lufa-core-brand-primary: #0ea5e9; /* Ocean overrides light */
--lufa-core-brand-secondary: #06b6d4; /* Ocean teal */
--lufa-core-neutral-background-page: #ffffff; /* Light mode (theme doesn't override) */
```

**Why:** `[data-color-theme='ocean']` has same specificity as `[data-mode='light']`, but appears later in cascade (themes.css loaded after tokens.css).

---

#### Combination 4: Ocean Theme + Dark Mode

```html
<html data-mode="dark" data-color-theme="ocean"></html>
```

**Result:**

```css
--lufa-core-brand-primary: #38bdf8; /* From combined selector */
--lufa-core-brand-secondary: #22d3ee; /* Ocean dark variant */
--lufa-core-neutral-background-page: #0a0a0a; /* Dark mode */
```

**Why:** `[data-color-theme='ocean'][data-mode='dark']` has highest specificity (0,2,0).

---

#### Combination 5: Forest Theme + High-Contrast Mode

```html
<html data-mode="high-contrast" data-color-theme="forest"></html>
```

**Result:**

```css
--lufa-core-brand-primary: #10b981; /* Forest green */
--lufa-core-brand-secondary: #059669;
--lufa-semantic-ui-action-primary-text: #ffffff; /* High contrast override */
```

**Note:** If no `[data-color-theme='forest'][data-mode='high-contrast']` selector exists, falls back to `[data-color-theme='forest']` + `[data-mode='high-contrast']` separately.

---

### Edge Cases

#### Edge Case 1: No data-mode Attribute

```html
<html></html>
```

**Result:** Falls back to `:root` base tokens (light mode by default)

```css
--lufa-core-brand-primary: #3b82f6; /* Base value */
```

---

#### Edge Case 2: Invalid Attribute Value

```html
<html data-mode="twilight"></html>
```

**Result:** No selector match, falls back to `:root` base tokens

```css
--lufa-core-brand-primary: #3b82f6; /* Base value */
```

---

#### Edge Case 3: Theme Without Mode

```html
<html data-color-theme="ocean"></html>
```

**Result:** Theme applies with base (light) mode tokens

```css
--lufa-core-brand-primary: #0ea5e9; /* Ocean theme */
--lufa-core-neutral-background-page: #ffffff; /* Light mode default */
```

---

#### Edge Case 4: Multiple Themes (Invalid)

```html
<html data-color-theme="ocean forest"></html>
```

**Result:** CSS attribute selector won't match, falls back to base

**Mitigation:** Hook validates and only sets one theme at a time.

---

### CSS Load Order

**CRITICAL:** Themes CSS must load **after** tokens CSS for cascade to work correctly.

```html
<head>
  <!-- CORRECT ORDER -->
  <link rel="stylesheet" href="@lufa/tokens/dist/tokens.css" />
  <link rel="stylesheet" href="@lufa/themes/dist/themes.css" />
</head>
```

```html
<head>
  <!-- WRONG ORDER - Themes won't override properly -->
  <link rel="stylesheet" href="@lufa/themes/dist/themes.css" />
  <link rel="stylesheet" href="@lufa/tokens/dist/tokens.css" />
</head>
```

---

## Component Integration

### ThemeSwitcher Component Updates

**File:** `packages/design-system/storybook/src/components/ThemeSwitcher/ThemeSwitcher.tsx`

#### Current Implementation (Before)

```typescript
import { useTheme } from '@lufa/main';

export function ThemeSwitcher() {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <div>
      {/* Theme selector */}
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="ocean">Ocean</option>
        <option value="forest">Forest</option>
      </select>

      {/* Mode selector */}
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

#### Updated Implementation (After)

```typescript
import { useThemeMode } from '@lufa/main';

export function ThemeSwitcher() {
  const { mode, setMode, systemPreference } = useThemeMode();

  return (
    <div className="theme-switcher">
      <div className="mode-selector">
        <label>Mode:</label>

        <button
          onClick={() => setMode('light')}
          aria-pressed={mode === 'light'}
          title="Light mode"
        >
          ☀️ Light
        </button>

        <button
          onClick={() => setMode('dark')}
          aria-pressed={mode === 'dark'}
          title="Dark mode"
        >
          🌙 Dark
        </button>

        <button
          onClick={() => setMode('high-contrast')}
          aria-pressed={mode === 'high-contrast'}
          title="High contrast mode"
        >
          ◐ High Contrast
        </button>
      </div>

      {systemPreference && (
        <p className="system-preference">
          System preference: {systemPreference}
        </p>
      )}

      {/* Theme selector - Hidden for Phase 2A */}
      {/* Will be enabled in Phase 6 when themes are implemented */}
      {process.env.PHASE_6 && (
        <div className="theme-selector">
          <label>Theme: (Phase 6)</label>
          {/* TODO: Add theme selector in Phase 6 */}
        </div>
      )}
    </div>
  );
}
```

### Storybook Decorator Updates

**File:** `packages/design-system/storybook/.storybook/preview.tsx`

#### Current Implementation (Before)

```typescript
import type { Preview } from '@storybook/react';
import '@lufa/tokens/dist/tokens.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme variant',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'default', title: 'Default', icon: 'circlehollow' },
          { value: 'ocean', title: 'Ocean', icon: 'circle' },
          { value: 'forest', title: 'Forest', icon: 'circle' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'default';

      // This was broken - set data-theme instead of data-mode
      document.documentElement.setAttribute('data-theme', theme);

      return <Story />;
    },
  ],
};

export default preview;
```

#### Updated Implementation (After)

```typescript
import type { Preview } from '@storybook/react';
import '@lufa/tokens/dist/tokens.css';
import '@lufa/themes/dist/themes.css'; // Add themes CSS

const preview: Preview = {
  globalTypes: {
    mode: {
      description: 'Color mode (accessibility)',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: '☀️ Light', icon: 'circlehollow' },
          { value: 'dark', title: '🌙 Dark', icon: 'circle' },
          { value: 'high-contrast', title: '◐ High Contrast', icon: 'contrast' },
        ],
        dynamicTitle: true,
      },
    },
    // Phase 6: Add theme selector when themes are implemented
    // theme: {
    //   description: 'Brand theme',
    //   defaultValue: 'default',
    //   toolbar: {
    //     title: 'Theme',
    //     items: [
    //       { value: 'default', title: 'Default' },
    //       { value: 'ocean', title: '🌊 Ocean' },
    //       { value: 'forest', title: '🌲 Forest' },
    //     ],
    //   },
    // },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.mode || 'light';
      // const theme = context.globals.theme || 'default'; // Phase 6

      // Set mode attribute
      document.documentElement.setAttribute('data-mode', mode);

      // Phase 6: Set theme attribute
      // if (theme === 'default') {
      //   document.documentElement.removeAttribute('data-color-theme');
      // } else {
      //   document.documentElement.setAttribute('data-color-theme', theme);
      // }

      return <Story />;
    },
  ],
};

export default preview;
```

### Storybook Toolbar Configuration

**Phase 2A:** Single mode selector

```
┌─────────────────────────────────────┐
│ Storybook Toolbar                   │
├─────────────────────────────────────┤
│ [Mode: ☀️ Light ▼]                 │
│   - ☀️ Light                        │
│   - 🌙 Dark                         │
│   - ◐ High Contrast                 │
└─────────────────────────────────────┘
```

**Phase 6:** Mode + Theme selectors

```
┌─────────────────────────────────────┐
│ Storybook Toolbar                   │
├─────────────────────────────────────┤
│ [Mode: ☀️ Light ▼] [Theme: Ocean ▼]│
│                                     │
│ Mode options:          Theme:       │
│   - ☀️ Light           - Default    │
│   - 🌙 Dark            - 🌊 Ocean   │
│   - ◐ High Contrast    - 🌲 Forest  │
└─────────────────────────────────────┘
```

---

## Testing Requirements

### Unit Tests for useThemeMode Hook

**File:** `packages/design-system/main/src/hooks/useThemeMode.test.ts`

```typescript
import { act, renderHook } from '@testing-library/react';

import { useThemeMode } from './useThemeMode';

describe('useThemeMode', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    // Reset HTML attribute
    document.documentElement.removeAttribute('data-mode');
  });

  describe('Initialization', () => {
    it('should use defaultMode when no stored value', () => {
      const { result } = renderHook(() => useThemeMode({ defaultMode: 'dark' }));
      expect(result.current.mode).toBe('dark');
    });

    it('should load from localStorage if available', () => {
      localStorage.setItem('lufa-theme-mode', 'high-contrast');
      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('high-contrast');
    });

    it('should fallback to light if invalid value in storage', () => {
      localStorage.setItem('lufa-theme-mode', 'invalid');
      const { result } = renderHook(() => useThemeMode());
      expect(result.current.mode).toBe('light');
    });
  });

  describe('setMode', () => {
    it('should update mode state', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => {
        result.current.setMode('dark');
      });

      expect(result.current.mode).toBe('dark');
    });

    it('should update HTML attribute', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => {
        result.current.setMode('dark');
      });

      expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
    });

    it('should persist to localStorage', () => {
      const { result } = renderHook(() => useThemeMode());

      act(() => {
        result.current.setMode('high-contrast');
      });

      expect(localStorage.getItem('lufa-theme-mode')).toBe('high-contrast');
    });

    it('should not persist if enableStorage is false', () => {
      const { result } = renderHook(() => useThemeMode({ enableStorage: false }));

      act(() => {
        result.current.setMode('dark');
      });

      expect(localStorage.getItem('lufa-theme-mode')).toBeNull();
    });
  });

  describe('System Preference Detection', () => {
    it('should detect dark mode preference', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useThemeMode({ autoDetect: true, enableStorage: false }));

      expect(result.current.systemPrefersDark).toBe(true);
      expect(result.current.mode).toBe('dark');
    });

    it('should prioritize high-contrast over dark', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true, // Both dark and high-contrast
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useThemeMode({ autoDetect: true, enableStorage: false }));

      expect(result.current.mode).toBe('high-contrast');
    });

    it('should not auto-detect if disabled', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true,
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useThemeMode({ autoDetect: false }));

      expect(result.current.mode).toBe('light'); // Default
      expect(result.current.systemPreference).toBeNull();
    });
  });

  describe('SSR Safety', () => {
    it('should not throw on server render', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => undefined as any);

      expect(() => {
        renderHook(() => useThemeMode());
      }).not.toThrow();

      windowSpy.mockRestore();
    });
  });
});
```

### Storybook Visual Tests

**File:** `packages/design-system/storybook/src/stories/ThemeMode.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@lufa/main';

const meta: Meta = {
  title: 'System/Theme Modes',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const AllModes: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <section>
        <h2>Buttons</h2>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </section>

      <section>
        <h2>Text Colors</h2>
        <p style={{ color: 'var(--lufa-semantic-ui-text-primary)' }}>
          Primary text
        </p>
        <p style={{ color: 'var(--lufa-semantic-ui-text-secondary)' }}>
          Secondary text
        </p>
      </section>

      <section>
        <h2>Backgrounds</h2>
        <div style={{
          background: 'var(--lufa-core-neutral-background-page)',
          padding: '1rem',
        }}>
          Page background
        </div>
      </section>
    </div>
  ),
};

// Test each mode explicitly
export const LightMode: StoryObj = {
  ...AllModes,
  parameters: {
    globals: { mode: 'light' },
  },
};

export const DarkMode: StoryObj = {
  ...AllModes,
  parameters: {
    globals: { mode: 'dark' },
  },
};

export const HighContrastMode: StoryObj = {
  ...AllModes,
  parameters: {
    globals: { mode: 'high-contrast' },
  },
};
```

### Combinations to Test

**Phase 2A (Modes Only):**

- ✅ Light mode
- ✅ Dark mode
- ✅ High-contrast mode

**Phase 6 (Modes × Themes):**

- Default + Light
- Default + Dark
- Default + High-Contrast
- Ocean + Light
- Ocean + Dark
- Ocean + High-Contrast
- Forest + Light
- Forest + Dark
- Forest + High-Contrast

**Total:** 9 combinations (3 modes × 3 themes)

### Acceptance Criteria

**Phase 2A Completion:**

- [ ] `useThemeMode` hook created and exported
- [ ] Hook sets `data-mode` attribute correctly
- [ ] Hook persists to localStorage
- [ ] Hook detects system preferences (dark + high-contrast)
- [ ] All 31 mode-aware tokens work in all 3 modes
- [ ] No undefined CSS variable values
- [ ] ThemeSwitcher component updated
- [ ] Storybook toolbar shows mode selector
- [ ] All stories render in all 3 modes
- [ ] Unit tests pass with >80% coverage
- [ ] Documentation updated

**Visual Validation:**

- [ ] Storybook: Switch between modes, verify visual changes
- [ ] Storybook: Check button colors update
- [ ] Storybook: Check background colors update
- [ ] Storybook: Check text colors update
- [ ] Browser DevTools: Verify `data-mode` attribute
- [ ] Browser DevTools: Verify no console errors

**Functional Validation:**

- [ ] localStorage persists mode across reloads
- [ ] System preference detection works
- [ ] Changing mode doesn't break layout
- [ ] SSR doesn't cause hydration mismatch
- [ ] Hook works in Strict Mode (React 18)

---

## Migration Guide

### From Old useTheme to New Architecture

#### Before (Old useTheme)

```typescript
import { useTheme } from '@lufa/main';

function App() {
  const { theme, mode, setTheme, setMode } = useTheme();

  // theme: 'default' | 'ocean' | 'forest'
  // mode: 'light' | 'dark' | 'auto'

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="ocean">Ocean</option>
        <option value="forest">Forest</option>
      </select>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </select>
    </div>
  );
}

// HTML output:
// <html data-theme="ocean" data-mode="dark">
```

**Problems:**

- ❌ Sets `data-theme="ocean"` but tokens expect `data-theme="dark"`
- ❌ Missing high-contrast mode
- ❌ Ocean/forest themes are non-functional
- ❌ Semantic confusion

---

#### After (New useThemeMode)

```typescript
import { useThemeMode } from '@lufa/main';

function App() {
  const { mode, setMode, systemPreference } = useThemeMode();

  // mode: 'light' | 'dark' | 'high-contrast'

  return (
    <div>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="high-contrast">High Contrast</option>
      </select>

      {systemPreference && (
        <p>System prefers: {systemPreference}</p>
      )}
    </div>
  );
}

// HTML output:
// <html data-mode="dark">
```

**Benefits:**

- ✅ Correct `data-mode` attribute
- ✅ High-contrast mode support
- ✅ System preference detection
- ✅ Simpler API (one concept)

---

### Step-by-Step Migration

#### Step 1: Install Updated Package

```bash
npm install @lufa/main@latest
# or
pnpm install @lufa/main@latest
```

#### Step 2: Replace Import

```diff
- import { useTheme } from '@lufa/main';
+ import { useThemeMode } from '@lufa/main';
```

#### Step 3: Update Hook Usage

```diff
  function App() {
-   const { theme, mode, setTheme, setMode } = useTheme();
+   const { mode, setMode } = useThemeMode();

    return (
      <div>
-       {/* Remove theme selector (ocean/forest not functional yet) */}
-       <select value={theme} onChange={(e) => setTheme(e.target.value)}>
-         <option value="default">Default</option>
-         <option value="ocean">Ocean</option>
-         <option value="forest">Forest</option>
-       </select>

        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
+         <option value="high-contrast">High Contrast</option>
        </select>
      </div>
    );
  }
```

#### Step 4: Update localStorage Key (Optional)

**Old key:** `lufa-theme`  
**New key:** `lufa-theme-mode`

If you want to preserve user preferences:

```typescript
// One-time migration script
if (localStorage.getItem('lufa-theme')) {
  const oldValue = localStorage.getItem('lufa-theme');

  // Only migrate if it was storing a mode (not a theme)
  if (oldValue === 'light' || oldValue === 'dark') {
    localStorage.setItem('lufa-theme-mode', oldValue);
    localStorage.removeItem('lufa-theme');
  }
}
```

#### Step 5: Update Tests

```diff
  import { renderHook } from '@testing-library/react';
- import { useTheme } from '@lufa/main';
+ import { useThemeMode } from '@lufa/main';

  it('should switch to dark mode', () => {
-   const { result } = renderHook(() => useTheme());
+   const { result } = renderHook(() => useThemeMode());

    act(() => {
-     result.current.setMode('dark');
+     result.current.setMode('dark');
    });

-   expect(result.current.mode).toBe('dark');
+   expect(result.current.mode).toBe('dark');
  });
```

---

### Breaking Changes

#### ❌ Removed APIs

**From `useTheme`:**

- `mode` property → Use `useThemeMode().mode`
- `setMode()` method → Use `useThemeMode().setMode()`
- `effectiveMode` property → Use `useThemeMode().mode`
- `'auto'` mode value → Handled automatically by `autoDetect` option

#### 🔄 Changed APIs

**HTML Attributes:**

- `data-theme="dark"` → `data-mode="dark"`
- `data-theme="ocean"` → `data-color-theme="ocean"` (Phase 6)

**localStorage Keys:**

- `lufa-theme` → `lufa-theme-mode`

**CSS Selectors:**

- `[data-theme='dark']` → `[data-mode='dark']`

#### ⚠️ Deprecation Warnings

**Old `useTheme` hook:**

- Still available but deprecated for mode management
- Will show console warning: "useTheme for modes is deprecated. Use useThemeMode instead."
- Will be updated in Phase 6 for theme variants only

---

### Timeline

**Phase 2A (Current):**

- ✅ Create `useThemeMode` hook
- ✅ Update token CSS selectors
- ✅ Update ThemeSwitcher component
- ✅ Update Storybook integration
- ⚠️ Keep old `useTheme` hook (with deprecation warning)

**Phase 3-5:**

- Continue using `useThemeMode` for all new development
- Gradually migrate existing code

**Phase 6:**

- Implement real ocean/forest themes
- Update `useTheme` for theme variants only
- Both hooks coexist permanently (different purposes)

**Post-Phase 6:**

- Remove deprecation warnings
- Finalize documentation
- Consider removing old mode management from `useTheme` entirely

---

### Codemods (Future)

For large codebases, we may provide a codemod script:

```bash
npx @lufa/codemod migrate-to-theme-mode
```

This would automatically:

- Replace `useTheme` imports with `useThemeMode`
- Remove `theme` destructuring if unused
- Add `high-contrast` option to UI
- Migrate localStorage keys

**Status:** Not implemented in Phase 2A (manual migration for now)

---

## References

- **ADR-001:** Separation of Modes and Themes
- **ADR-002:** HTML Attribute Naming Conventions
- **Analysis:** `theme-system-analysis-2026-01-26.md`
- **W3C:** [prefers-color-scheme](https://www.w3.org/TR/css-color-4/#color-scheme)
- **W3C:** [prefers-contrast](https://www.w3.org/TR/mediaqueries-5/#prefers-contrast)

---

## Appendix: File Checklist

### Files to Create

- [ ] `packages/design-system/main/src/hooks/useThemeMode.ts`
- [ ] `packages/design-system/main/src/hooks/useThemeMode.test.ts`
- [ ] `packages/design-system/storybook/src/stories/ThemeMode.stories.tsx`

### Files to Modify

- [ ] `packages/design-system/tokens/config.json`
- [ ] `packages/design-system/main/src/hooks/index.ts`
- [ ] `packages/design-system/storybook/src/components/ThemeSwitcher/ThemeSwitcher.tsx`
- [ ] `packages/design-system/storybook/.storybook/preview.tsx`
- [ ] `packages/design-system/_docs/theme-switching-guide.md`
- [ ] `packages/design-system/main/README.md`

### Files to Regenerate

- [ ] `packages/design-system/tokens/dist/tokens.css`

---

**Document Status:** ✅ Ready for Implementation  
**Review Date:** 2026-01-26  
**Next Step:** Begin implementation using checklist
