# Theme Hook Analysis & Recommendation

**Date:** 2026-01-26  
**Context:** Phase 2A - Theme System Integration  
**Status:** Analysis Complete - Ready for Implementation

---

## Executive Summary

### Problem Statement
The existing `useTheme` hook is **incompatible** with our new multi-mode token system:
- Hook sets `data-theme` + `data-mode` attributes
- Token CSS expects only `data-theme` attribute
- Hook missing `high-contrast` mode
- `ocean`/`forest` themes are **placeholders** (Phase 6 only)

### Recommendation: **Option 1 - Create New `useThemeMode` Hook** ⭐

**Rationale:**
1. Ocean/forest themes are **not implemented** (empty CSS, Phase 6 only)
2. Token system doesn't use theme variants (only modes: light/dark/high-contrast)
3. Clean separation of concerns
4. No breaking changes to existing hook
5. Can be the primary hook going forward

---

## Current State Analysis

### 1. Ocean/Forest Theme Status

**Finding:** Ocean and forest themes are **PLACEHOLDERS ONLY**

**Evidence:**

```css
/* packages/design-system/themes/src/ocean.css */
:root {
  /* Phase 6: Token overrides will be generated here */
}
```

```css
/* packages/design-system/themes/src/forest.css */
:root {
  /* Phase 6: Token overrides will be generated here */
}
```

**Usage Locations:**
- ✅ Storybook UI (ThemeSwitcher component)
- ✅ Storybook preview decorator
- ✅ Documentation examples
- ❌ **NO actual CSS implementations**
- ❌ **NO token overrides**
- ❌ **NO functional impact**

**Conclusion:** Ocean/forest are **UI-only** selections with no visual effect.

---

### 2. Token System Architecture

**Current Implementation:**

```css
/* packages/design-system/tokens/dist/tokens.css */

/* Base + Light Mode */
:root,
[data-theme='light'] {
  --lufa-core-brand-primary: #3b82f6;
  --lufa-core-brand-secondary: #8b5cf6;
  /* ... 173 tokens ... */
}

/* Dark Mode Overrides */
[data-theme='dark'] {
  --lufa-core-brand-primary: #60a5fa;
  --lufa-core-neutral-background-page: #0a0a0a;
  /* ... 31 overrides ... */
}

/* High Contrast Overrides */
[data-theme='high-contrast'] {
  --lufa-core-brand-primary: #0066ff;
  --lufa-semantic-ui-action-primary-text: #ffffff;
  /* ... 31 overrides ... */
}
```

**Key Points:**
- ✅ Uses `data-theme` attribute (NOT `data-mode`)
- ✅ Three modes: `light`, `dark`, `high-contrast`
- ✅ All 31 mode-aware tokens working
- ✅ 0 undefined values
- ❌ NO theme variants (ocean/forest/etc.)

---

### 3. Existing Hook Behavior

**HTML Output:**

```html
<!-- Current hook behavior -->
<html data-theme="ocean" data-mode="dark">
  <!-- Sets TWO attributes -->
</html>
```

**Token CSS Expectations:**

```html
<!-- What tokens need -->
<html data-theme="dark">
  <!-- Single attribute only -->
</html>
```

**Problem:** Token CSS selectors `[data-theme='dark']` don't match `data-mode="dark"`.

---

## Detailed Comparison

### Attribute Structure

| Aspect | Existing Hook | Token System | Compatible? |
|--------|---------------|--------------|-------------|
| **Attribute 1** | `data-theme="ocean\|forest\|default"` | `data-theme="light\|dark\|high-contrast"` | ❌ Different meanings |
| **Attribute 2** | `data-mode="light\|dark"` | N/A | ❌ Not used |
| **CSS Selector** | `[data-mode="dark"]` | `[data-theme="dark"]` | ❌ Won't match |

### Mode Support

| Mode | Existing Hook | Token System | Gap |
|------|---------------|--------------|-----|
| **Light** | ✅ `mode: 'light'` | ✅ `data-theme='light'` | Semantic mismatch |
| **Dark** | ✅ `mode: 'dark'` | ✅ `data-theme='dark'` | Semantic mismatch |
| **High Contrast** | ❌ Not supported | ✅ `data-theme='high-contrast'` | **MISSING** |
| **Auto** | ✅ Detects `prefers-color-scheme` | N/A | Hook feature |

### Theme Support

| Theme | Existing Hook | Token CSS | Implemented? |
|-------|---------------|-----------|--------------|
| **default** | ✅ `theme: 'default'` | N/A | No CSS needed |
| **ocean** | ✅ `theme: 'ocean'` | ❌ Placeholder only | Phase 6 |
| **forest** | ✅ `theme: 'forest'` | ❌ Placeholder only | Phase 6 |

---

## Solution Options

### Option 1: Create New `useThemeMode` Hook ⭐ **RECOMMENDED**

**Strategy:** Build a focused hook that exactly matches our token system.

#### Implementation

```typescript
// NEW: packages/design-system/main/src/hooks/useThemeMode.ts

/**
 * Theme modes matching token system
 * Maps to [data-theme] attribute
 */
export type ThemeMode = 'light' | 'dark' | 'high-contrast';

/**
 * Auto-detection preference
 */
export type SystemPreference = 'light' | 'dark' | 'high-contrast' | null;

export interface UseThemeModeOptions {
  /** Initial mode (default: 'light') */
  defaultMode?: ThemeMode;
  
  /** Enable auto-detection from system preferences (default: true) */
  autoDetect?: boolean;
  
  /** localStorage key for persistence (default: 'lufa-theme-mode') */
  storageKey?: string;
  
  /** Enable localStorage persistence (default: true) */
  enableStorage?: boolean;
}

export interface UseThemeModeReturn {
  /** Current theme mode */
  mode: ThemeMode;
  
  /** Change the mode */
  setMode: (mode: ThemeMode) => void;
  
  /** System color scheme preference */
  systemPrefersDark: boolean;
  
  /** System contrast preference */
  systemPrefersContrast: boolean;
  
  /** Detected system preference (if autoDetect enabled) */
  systemPreference: SystemPreference;
}

export function useThemeMode(options?: UseThemeModeOptions): UseThemeModeReturn {
  // Implementation details...
}
```

#### Key Features

1. **Single Attribute:**
   ```html
   <html data-theme="dark">
   ```

2. **System Preference Detection:**
   ```javascript
   // Detect dark mode
   const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
   
   // Detect high contrast
   const contrastQuery = window.matchMedia('(prefers-contrast: more)');
   ```

3. **Auto-selection Logic:**
   ```
   if (autoDetect && !storedPreference) {
     if (systemPrefersContrast) return 'high-contrast';
     if (systemPrefersDark) return 'dark';
     return 'light';
   }
   ```

4. **localStorage Persistence:**
   ```javascript
   localStorage.setItem('lufa-theme-mode', mode);
   ```

#### Pros & Cons

**Pros:**
- ✅ Perfect alignment with token system
- ✅ Supports high-contrast mode
- ✅ Simpler API (one concept: mode)
- ✅ No breaking changes (new hook)
- ✅ Can coexist with existing hook
- ✅ Future-ready for Phase 6 theme variants

**Cons:**
- ⚠️ Need to update ThemeSwitcher component
- ⚠️ Two hooks in codebase temporarily
- ⚠️ Need migration documentation

---

### Option 2: Extend Existing Hook

**Strategy:** Modify `useTheme` to support both systems.

#### Changes Required

```typescript
// MODIFIED: packages/design-system/main/src/hooks/useTheme.ts

export type ThemeName = 'default' | 'ocean' | 'forest';
export type ThemeMode = 'light' | 'dark' | 'high-contrast' | 'auto'; // Add high-contrast

// Change HTML attribute behavior
useEffect(() => {
  const root = document.documentElement;
  
  // Keep data-theme for theme variant (Phase 6)
  root.setAttribute('data-theme', theme);
  
  // CHANGE: Use data-theme for mode (not data-mode)
  root.setAttribute('data-theme', effectiveMode); // ❌ CONFLICT!
  
  // OR: Set both for compatibility?
  root.setAttribute('data-theme', theme); // ocean/forest
  root.setAttribute('data-mode', effectiveMode); // light/dark/high-contrast
  root.setAttribute('data-theme', effectiveMode); // ❌ Can't set twice!
}, [theme, mode]);
```

**Problem:** Can't use `data-theme` for BOTH theme variant AND mode!

#### Pros & Cons

**Pros:**
- ✅ Single hook API
- ✅ No new concepts to learn

**Cons:**
- ❌ **Fundamental conflict:** `data-theme` serves two purposes
- ❌ Breaking change (data-mode → data-theme)
- ❌ Complex logic to handle both systems
- ❌ Confusing API (theme vs mode distinction unclear)
- ❌ Doesn't actually solve the problem

**Verdict:** ❌ **NOT VIABLE**

---

### Option 3: Deprecate & Simplify Existing Hook

**Strategy:** Remove theme variants, make `useTheme` mode-only.

#### Changes Required

```typescript
// BREAKING: packages/design-system/main/src/hooks/useTheme.ts

// REMOVE: ThemeName type entirely
// RENAME: ThemeMode → Theme
export type Theme = 'light' | 'dark' | 'high-contrast';

export function useTheme(options?: {
  defaultTheme?: Theme;  // Renamed from defaultMode
  storageKey?: string;
  enableStorage?: boolean;
}) {
  // Simplified to single concept
  const [theme, setTheme] = useState<Theme>('light');
  
  // Set data-theme attribute
  document.documentElement.setAttribute('data-theme', theme);
}
```

#### Pros & Cons

**Pros:**
- ✅ Perfect alignment with token system
- ✅ Simplest possible API
- ✅ No conceptual confusion

**Cons:**
- ❌ **BREAKING CHANGE** for existing code
- ❌ Removes ocean/forest (even though Phase 6 planned)
- ❌ No backward compatibility
- ❌ Need to audit all usage sites

**Verdict:** ⚠️ **Viable but risky** - Requires Phase 6 rethink.

---

## Recommendation: Option 1 - New `useThemeMode` Hook

### Implementation Plan

#### Phase 1: Create New Hook ✅
1. Create `packages/design-system/main/src/hooks/useThemeMode.ts`
2. Implement core functionality:
   - State management (mode: light/dark/high-contrast)
   - System preference detection (dark + contrast)
   - localStorage persistence
   - data-theme attribute syncing
3. Export from `packages/design-system/main/src/hooks/index.ts`
4. Write TypeScript types

#### Phase 2: Update ThemeSwitcher Component
1. Import `useThemeMode` instead of `useTheme`
2. Update UI:
   - **Keep:** Light/Dark/Auto mode selector
   - **Add:** High Contrast mode button
   - **Remove:** Ocean/Forest theme selector (or mark as "Coming in Phase 6")
3. Update state management to use new hook

#### Phase 3: Update Storybook Integration
1. Modify `.storybook/preview.tsx` decorator
2. Update toolbar items:
   ```typescript
   themes: {
     value: 'mode', // Renamed from theme
     title: 'Theme Mode',
     items: [
       { value: 'light', title: '☀️ Light', icon: 'circlehollow' },
       { value: 'dark', title: '🌙 Dark', icon: 'circle' },
       { value: 'high-contrast', title: '◐ High Contrast', icon: 'circle' },
     ],
   }
   ```
3. Remove ocean/forest items (keep for Phase 6)

#### Phase 4: Documentation
1. Update `theme-switching-guide.md`
2. Add migration guide from `useTheme` to `useThemeMode`
3. Document `useTheme` as "Phase 6 only" (for theme variants)
4. Add JSDoc examples to hook

#### Phase 5: Testing
1. Test all 3 modes in Storybook
2. Verify localStorage persistence
3. Test system preference detection
4. Verify data-theme attribute updates
5. Test SSR safety (no hydration mismatch)

---

## Migration Strategy

### For Existing Code

**Before (useTheme):**
```typescript
const { theme, mode, setTheme, setMode } = useTheme();
// theme: 'default' | 'ocean' | 'forest'
// mode: 'light' | 'dark' | 'auto'
```

**After (useThemeMode):**
```typescript
const { mode, setMode } = useThemeMode();
// mode: 'light' | 'dark' | 'high-contrast'
```

### Deprecation Timeline

1. **Phase 2A (Now):** Create `useThemeMode`, mark as primary
2. **Phase 2-5:** Use `useThemeMode` for all new development
3. **Phase 6:** Re-evaluate `useTheme` for theme variants (ocean/forest)
4. **Post-Phase 6:** Decide if both hooks needed or merge strategies

### Backward Compatibility

**Keep `useTheme` as-is for now:**
- Doesn't interfere with token system (wrong attributes)
- Can coexist peacefully
- Allows gradual migration
- Preserved for Phase 6 theme variant implementation

---

## Technical Implementation Details

### System Preference Detection

#### Dark Mode (Standard)
```typescript
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = darkQuery.matches;

darkQuery.addEventListener('change', (e) => {
  setSystemPrefersDark(e.matches);
});
```

#### High Contrast (Modern Browsers)
```typescript
const contrastQuery = window.matchMedia('(prefers-contrast: more)');
const wantsContrast = contrastQuery.matches;

contrastQuery.addEventListener('change', (e) => {
  setSystemPrefersContrast(e.matches);
});
```

**Browser Support:**
- `prefers-color-scheme`: ✅ All modern browsers
- `prefers-contrast`: ✅ Chrome 96+, Firefox 101+, Safari 14.1+

### Priority Logic

When `autoDetect` is enabled:

```
1. Check localStorage (user's explicit choice)
   └─ If found: Use stored preference
   
2. Check system preferences (auto-detect)
   ├─ If prefers-contrast: more → 'high-contrast'
   ├─ Else if prefers-color-scheme: dark → 'dark'
   └─ Else → 'light'
   
3. Fallback to defaultMode option
```

### SSR Safety

```typescript
const [mode, setMode] = useState<ThemeMode>(() => {
  // Server: Return default (no window access)
  if (typeof window === 'undefined') {
    return options.defaultMode ?? 'light';
  }
  
  // Client: Check storage then system
  const stored = localStorage.getItem(storageKey);
  if (stored) return stored as ThemeMode;
  
  if (options.autoDetect) {
    if (window.matchMedia('(prefers-contrast: more)').matches) {
      return 'high-contrast';
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  return options.defaultMode ?? 'light';
});
```

**Prevents:** Hydration mismatch in Next.js/SSR apps.

---

## File Checklist

### Files to Create
- [ ] `packages/design-system/main/src/hooks/useThemeMode.ts` (new hook)
- [ ] `packages/design-system/main/src/hooks/useThemeMode.test.ts` (tests)

### Files to Modify
- [ ] `packages/design-system/main/src/hooks/index.ts` (export new hook)
- [ ] `packages/design-system/storybook/src/components/ThemeSwitcher/ThemeSwitcher.tsx` (use new hook)
- [ ] `packages/design-system/storybook/.storybook/preview.tsx` (add high-contrast)
- [ ] `packages/design-system/_docs/theme-switching-guide.md` (document new hook)
- [ ] `packages/design-system/main/README.md` (usage examples)

### Files to Leave As-Is
- ✅ `packages/design-system/main/src/hooks/useTheme.ts` (keep for Phase 6)
- ✅ `packages/design-system/tokens/dist/tokens.css` (already correct)
- ✅ `packages/design-system/themes/src/ocean.css` (Phase 6 placeholder)
- ✅ `packages/design-system/themes/src/forest.css` (Phase 6 placeholder)

---

## Success Criteria

Hook implementation complete when:

- [x] ✅ Analysis complete (this document)
- [ ] Hook created with all features
- [ ] ThemeSwitcher uses new hook
- [ ] Storybook shows all 3 modes working
- [ ] localStorage persistence works
- [ ] System preference detection works
- [ ] data-theme attribute updates correctly
- [ ] All tokens visible in all modes
- [ ] No hydration warnings in SSR
- [ ] Documentation updated
- [ ] Types exported correctly

---

## Architecture Alignment

### Before New Hook
**Token System:** 98% aligned (8.9/9 decisions)  
**Hook System:** ❌ 0% aligned (incompatible)

### After New Hook (Expected)
**Token System:** 98% aligned  
**Hook System:** ✅ 100% aligned  
**Overall System:** ✅ ~99% aligned

---

## Phase 6 Considerations

### Future Theme Variant System

When ocean/forest are implemented in Phase 6:

**Possible Architecture:**
```html
<!-- Both theme variant AND mode -->
<html data-theme="ocean" data-mode="dark">
```

**OR:**
```html
<!-- Composite attribute -->
<html data-theme="ocean-dark">
```

**OR:**
```html
<!-- Separate concepts entirely -->
<html data-color-theme="ocean" data-contrast-mode="dark">
```

**Decision:** Deferred to Phase 6 (when theme variants are actually built).

### Hook Evolution

**Option A:** Keep two hooks
```typescript
useTheme()      // For theme variants (ocean/forest)
useThemeMode()  // For modes (light/dark/high-contrast)
```

**Option B:** Merge into single hook
```typescript
useTheme({
  variant: 'ocean',    // Phase 6
  mode: 'dark'         // Phase 2
})
```

**Decision:** Deferred to Phase 6 review.

---

## Questions Answered

### Q1: Are ocean/forest themes actually used?
**A:** ❌ No. They are **placeholder CSS** with no implementation. Phase 6 only.

### Q2: What's the migration strategy?
**A:** Create new hook alongside existing. Gradual migration. No breaking changes now.

### Q3: System preference detection needs?
**A:** 
- ✅ `prefers-color-scheme: dark` (already exists)
- ✅ `prefers-contrast: more` (add for high-contrast)

### Q4: Storybook integration?
**A:** Update toolbar to show 3 modes, remove non-functional theme variants.

---

## Next Steps

### Immediate Actions

1. **Review & Approve:** Confirm Option 1 approach
2. **Implement Hook:** Create `useThemeMode.ts`
3. **Update ThemeSwitcher:** Use new hook
4. **Test in Storybook:** Verify all 3 modes work
5. **Document:** Update guides

### Estimated Effort

- **Hook implementation:** ~2 hours
- **ThemeSwitcher update:** ~1 hour
- **Storybook integration:** ~30 minutes
- **Documentation:** ~1 hour
- **Testing:** ~30 minutes

**Total:** ~5 hours

---

## Appendix: Code Skeleton

### Hook Skeleton

```typescript
// packages/design-system/main/src/hooks/useThemeMode.ts

import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'high-contrast';
export type SystemPreference = ThemeMode | null;

export interface UseThemeModeOptions {
  defaultMode?: ThemeMode;
  autoDetect?: boolean;
  storageKey?: string;
  enableStorage?: boolean;
}

export interface UseThemeModeReturn {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  systemPrefersDark: boolean;
  systemPrefersContrast: boolean;
  systemPreference: SystemPreference;
}

export function useThemeMode(options?: UseThemeModeOptions): UseThemeModeReturn {
  const {
    defaultMode = 'light',
    autoDetect = true,
    storageKey = 'lufa-theme-mode',
    enableStorage = true,
  } = options ?? {};

  // State
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [systemPrefersContrast, setSystemPrefersContrast] = useState(false);

  // Getters
  function getInitialMode(): ThemeMode {
    // SSR safety
    if (typeof window === 'undefined') return defaultMode;

    // Storage
    if (enableStorage) {
      const stored = localStorage.getItem(storageKey);
      if (stored && isValidMode(stored)) return stored as ThemeMode;
    }

    // Auto-detect
    if (autoDetect) {
      if (window.matchMedia('(prefers-contrast: more)').matches) {
        return 'high-contrast';
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }

    return defaultMode;
  }

  // System preference listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    const updateDark = () => setSystemPrefersDark(darkQuery.matches);
    const updateContrast = () => setSystemPrefersContrast(contrastQuery.matches);

    updateDark();
    updateContrast();

    darkQuery.addEventListener('change', updateDark);
    contrastQuery.addEventListener('change', updateContrast);

    return () => {
      darkQuery.removeEventListener('change', updateDark);
      contrastQuery.removeEventListener('change', updateContrast);
    };
  }, []);

  // Sync data-theme attribute
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // Persist to storage
  useEffect(() => {
    if (!enableStorage || typeof window === 'undefined') return;
    localStorage.setItem(storageKey, mode);
  }, [mode, storageKey, enableStorage]);

  // Setters
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  // Computed system preference
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

function isValidMode(value: string): value is ThemeMode {
  return ['light', 'dark', 'high-contrast'].includes(value);
}
```

---

## Document Status

- **Created:** 2026-01-26
- **Status:** ✅ Analysis Complete
- **Next:** Implementation Phase
- **Approval:** Awaiting user confirmation

---

**END OF ANALYSIS**
