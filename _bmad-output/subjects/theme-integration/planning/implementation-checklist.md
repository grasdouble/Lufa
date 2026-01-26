# Implementation Checklist

**Phase:** 2A - Theme System Integration  
**Date:** 2026-01-26  
**Status:** Ready to Execute  
**Estimated Total Effort:** ~5 hours

---

## Quick Reference

**Completion Status:**

- 🔲 Not Started
- 🔄 In Progress
- ✅ Complete
- ⚠️ Blocked

**Priority:**

- 🔴 Critical Path
- 🟡 Important
- 🟢 Nice to Have

---

## Package: @lufa/tokens

### Task 1: Update Style Dictionary Config 🔴

**File:** `packages/design-system/tokens/config.json`

**Status:** 🔲 Not Started  
**Priority:** 🔴 Critical Path  
**Estimated Effort:** 30 minutes  
**Depends On:** None

**Description:**
Change CSS selectors from `[data-theme='*']` to `[data-mode='*']` for light/dark/high-contrast modes.

**Changes Required:**

```diff
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
            "filter": { "attributes": { "category": "core" } },
            "options": {
-             "selector": ":root",
+             "selector": ":root, [data-mode='light']",
              "outputReferences": true
            }
          },
          {
            "destination": "tokens.css",
            "format": "css/variables",
            "filter": { "attributes": { "category": "core", "mode": "dark" } },
            "options": {
-             "selector": "[data-theme='dark']",
+             "selector": "[data-mode='dark']",
              "outputReferences": true
            }
          },
          {
            "destination": "tokens.css",
            "format": "css/variables",
            "filter": { "attributes": { "category": "core", "mode": "high-contrast" } },
            "options": {
-             "selector": "[data-theme='high-contrast']",
+             "selector": "[data-mode='high-contrast']",
              "outputReferences": true
            }
          }
        ]
      }
    }
  }
```

**Acceptance Criteria:**

- [ ] Config file updated with new selectors
- [ ] No syntax errors in JSON
- [ ] All three mode selectors present

**Testing:**

```bash
cd packages/design-system/tokens
npm run build
# Should complete without errors
```

---

### Task 2: Rebuild Token CSS 🔴

**File:** `packages/design-system/tokens/dist/tokens.css` (generated)

**Status:** 🔲 Not Started  
**Priority:** 🔴 Critical Path  
**Estimated Effort:** 5 minutes  
**Depends On:** Task 1 (Update Style Dictionary Config)

**Description:**
Regenerate tokens.css with new `[data-mode]` selectors.

**Commands:**

```bash
cd packages/design-system/tokens
npm run clean
npm run build
```

**Acceptance Criteria:**

- [ ] `dist/tokens.css` file regenerated
- [ ] Contains `[data-mode='light']` selector
- [ ] Contains `[data-mode='dark']` selector
- [ ] Contains `[data-mode='high-contrast']` selector
- [ ] Does NOT contain `[data-theme='dark']` selectors
- [ ] All 173 base tokens present
- [ ] 31 dark mode overrides present
- [ ] 31 high-contrast overrides present

**Verification:**

```bash
# Check selectors
grep "data-mode" packages/design-system/tokens/dist/tokens.css

# Expected output:
# [data-mode='light'] {
# [data-mode='dark'] {
# [data-mode='high-contrast'] {

# Verify old selectors are gone
grep "data-theme" packages/design-system/tokens/dist/tokens.css
# Should return nothing (or only comments)
```

---

### Task 3: Verify Token Output 🟡

**Status:** 🔲 Not Started  
**Priority:** 🟡 Important  
**Estimated Effort:** 15 minutes  
**Depends On:** Task 2 (Rebuild Token CSS)

**Description:**
Manual verification that token CSS is correct and complete.

**Verification Steps:**

1. **Check Base Tokens:**

```bash
# Count base tokens in :root selector
grep -A 200 ":root" packages/design-system/tokens/dist/tokens.css | grep "^  --lufa-" | wc -l
# Should be ~173 tokens
```

2. **Check Dark Mode Tokens:**

```bash
# Count dark mode overrides
grep -A 50 "data-mode='dark'" packages/design-system/tokens/dist/tokens.css | grep "^  --lufa-" | wc -l
# Should be 31 overrides
```

3. **Check High-Contrast Tokens:**

```bash
# Count high-contrast overrides
grep -A 50 "data-mode='high-contrast'" packages/design-system/tokens/dist/tokens.css | grep "^  --lufa-" | wc -l
# Should be 31 overrides
```

4. **Spot Check Key Tokens:**

```bash
# Verify brand primary exists in all modes
grep "lufa-core-brand-primary" packages/design-system/tokens/dist/tokens.css
# Should appear 3 times (light, dark, high-contrast)
```

**Acceptance Criteria:**

- [ ] Base token count matches expected (~173)
- [ ] Dark mode override count correct (31)
- [ ] High-contrast override count correct (31)
- [ ] No undefined values (check for `undefined` string)
- [ ] Selectors properly formatted
- [ ] CSS is valid (no syntax errors)

---

## Package: @lufa/main

### Task 4: Create useThemeMode Hook 🔴

**File:** `packages/design-system/main/src/hooks/useThemeMode.ts` (NEW)

**Status:** 🔲 Not Started  
**Priority:** 🔴 Critical Path  
**Estimated Effort:** 2 hours  
**Depends On:** None

**Description:**
Create new `useThemeMode` hook for managing accessibility modes (light/dark/high-contrast).

**Implementation Checklist:**

**Types:**

- [ ] Define `ThemeMode` type: `'light' | 'dark' | 'high-contrast'`
- [ ] Define `SystemPreference` type: `ThemeMode | null`
- [ ] Define `UseThemeModeOptions` interface
- [ ] Define `UseThemeModeReturn` interface
- [ ] Add JSDoc comments to all types

**Core Functionality:**

- [ ] Implement `getInitialMode()` function
  - [ ] SSR safety check (`typeof window === 'undefined'`)
  - [ ] localStorage retrieval
  - [ ] System preference detection (dark + contrast)
  - [ ] Fallback to defaultMode
- [ ] Implement `isValidMode()` type guard
- [ ] Implement state management with `useState`
- [ ] Implement `setMode()` callback with `useCallback`

**System Preference Detection:**

- [ ] Create `useEffect` for media query listeners
- [ ] Listen to `prefers-color-scheme: dark`
- [ ] Listen to `prefers-contrast: more`
- [ ] Update state when preferences change
- [ ] Clean up listeners on unmount
- [ ] Handle SSR (skip on server)

**Side Effects:**

- [ ] Create `useEffect` to sync `data-mode` attribute
- [ ] Create `useEffect` to persist to localStorage
- [ ] Handle `enableStorage` option
- [ ] Handle SSR in all effects

**Return Value:**

- [ ] Return current `mode`
- [ ] Return `setMode` callback
- [ ] Return `systemPrefersDark` boolean
- [ ] Return `systemPrefersContrast` boolean
- [ ] Compute and return `systemPreference`

**Acceptance Criteria:**

- [ ] File created with all exports
- [ ] TypeScript compiles without errors
- [ ] All options have defaults
- [ ] JSDoc comments present
- [ ] No console errors when hook runs
- [ ] `data-mode` attribute updates correctly
- [ ] localStorage persists correctly

**Reference Implementation:** See `theme-integration-technical-spec.md` section "Hook Specifications"

---

### Task 5: Export useThemeMode Hook 🔴

**File:** `packages/design-system/main/src/hooks/index.ts`

**Status:** 🔲 Not Started  
**Priority:** 🔴 Critical Path  
**Estimated Effort:** 2 minutes  
**Depends On:** Task 4 (Create useThemeMode Hook)

**Description:**
Export new hook from hooks barrel file.

**Changes Required:**

```diff
  // packages/design-system/main/src/hooks/index.ts

  export { useTheme } from './useTheme';
+ export { useThemeMode } from './useThemeMode';
+ export type {
+   ThemeMode,
+   SystemPreference,
+   UseThemeModeOptions,
+   UseThemeModeReturn,
+ } from './useThemeMode';
```

**Acceptance Criteria:**

- [ ] Hook exported from barrel file
- [ ] Types exported from barrel file
- [ ] No TypeScript errors
- [ ] Can import in other files: `import { useThemeMode } from '@lufa/main'`

---

### Task 6: Write useThemeMode Tests 🟡

**File:** `packages/design-system/main/src/hooks/useThemeMode.test.ts` (NEW)

**Status:** 🔲 Not Started  
**Priority:** 🟡 Important  
**Estimated Effort:** 1.5 hours  
**Depends On:** Task 4 (Create useThemeMode Hook)

**Description:**
Comprehensive unit tests for useThemeMode hook.

**Test Suites:**

**Initialization Tests:**

- [ ] Uses defaultMode when no stored value
- [ ] Loads from localStorage if available
- [ ] Fallback to light if invalid value in storage
- [ ] Handles custom storageKey option

**setMode Tests:**

- [ ] Updates mode state
- [ ] Updates HTML `data-mode` attribute
- [ ] Persists to localStorage
- [ ] Does not persist if enableStorage is false
- [ ] Ignores invalid mode values (logs warning)

**System Preference Tests:**

- [ ] Detects dark mode preference
- [ ] Detects high-contrast preference
- [ ] Prioritizes high-contrast over dark
- [ ] Does not auto-detect if disabled
- [ ] Updates when system preference changes

**SSR Safety Tests:**

- [ ] Does not throw on server render
- [ ] Returns defaultMode on server
- [ ] Does not access window on server
- [ ] Does not access localStorage on server

**Cleanup Tests:**

- [ ] Removes event listeners on unmount
- [ ] Does not leak memory

**Acceptance Criteria:**

- [ ] All test suites implemented
- [ ] All tests pass
- [ ] Coverage >80%
- [ ] No console warnings during tests
- [ ] Tests run in CI

**Commands:**

```bash
cd packages/design-system/main
npm test -- useThemeMode.test.ts
```

**Reference Implementation:** See `theme-integration-technical-spec.md` section "Testing Requirements"

---

### Task 7: Update Main Package README 🟢

**File:** `packages/design-system/main/README.md`

**Status:** 🔲 Not Started  
**Priority:** 🟢 Nice to Have  
**Estimated Effort:** 20 minutes  
**Depends On:** Task 4 (Create useThemeMode Hook)

**Description:**
Add documentation for useThemeMode hook to main package README.

**Sections to Add:**

```markdown
## useThemeMode

Manage accessibility color modes (light/dark/high-contrast).

### Usage

\`\`\`typescript
import { useThemeMode } from '@lufa/main';

function App() {
const { mode, setMode } = useThemeMode();

return (
<button onClick={() => setMode('dark')}>
Switch to Dark Mode
</button>
);
}
\`\`\`

### Options

- `defaultMode`: Initial mode (default: 'light')
- `autoDetect`: Enable system preference detection (default: true)
- `storageKey`: localStorage key (default: 'lufa-theme-mode')
- `enableStorage`: Enable persistence (default: true)

### Return Value

- `mode`: Current mode
- `setMode`: Change mode
- `systemPrefersDark`: System dark mode preference
- `systemPrefersContrast`: System high-contrast preference
- `systemPreference`: Detected preference (null if autoDetect disabled)

### See Also

- [Theme Switching Guide](../_docs/theme-switching-guide.md)
```

**Acceptance Criteria:**

- [ ] Section added to README
- [ ] Code examples are correct
- [ ] Links work
- [ ] Markdown renders correctly

---

## Package: @lufa/storybook

### Task 8: Update ThemeSwitcher Component 🔴

**File:** `packages/design-system/storybook/src/components/ThemeSwitcher/ThemeSwitcher.tsx`

**Status:** 🔲 Not Started  
**Priority:** 🔴 Critical Path  
**Estimated Effort:** 45 minutes  
**Depends On:** Task 4 (Create useThemeMode Hook)

**Description:**
Replace old `useTheme` hook with new `useThemeMode` hook in ThemeSwitcher component.

**Changes Required:**

1. **Update Imports:**

```diff
- import { useTheme } from '@lufa/main';
+ import { useThemeMode } from '@lufa/main';
```

2. **Update Hook Usage:**

```diff
  export function ThemeSwitcher() {
-   const { theme, mode, setTheme, setMode } = useTheme();
+   const { mode, setMode, systemPreference } = useThemeMode();
```

3. **Update UI:**

```diff
    return (
      <div className="theme-switcher">
-       {/* Theme selector (ocean/forest) */}
-       <div className="theme-selector">
-         <select value={theme} onChange={(e) => setTheme(e.target.value)}>
-           <option value="default">Default</option>
-           <option value="ocean">Ocean</option>
-           <option value="forest">Forest</option>
-         </select>
-       </div>

-       {/* Mode selector (light/dark) */}
+       {/* Mode selector (light/dark/high-contrast) */}
        <div className="mode-selector">
-         <select value={mode} onChange={(e) => setMode(e.target.value)}>
-           <option value="light">Light</option>
-           <option value="dark">Dark</option>
-         </select>
+         <button
+           onClick={() => setMode('light')}
+           aria-pressed={mode === 'light'}
+         >
+           ☀️ Light
+         </button>
+         <button
+           onClick={() => setMode('dark')}
+           aria-pressed={mode === 'dark'}
+         >
+           🌙 Dark
+         </button>
+         <button
+           onClick={() => setMode('high-contrast')}
+           aria-pressed={mode === 'high-contrast'}
+         >
+           ◐ High Contrast
+         </button>
        </div>

+       {systemPreference && (
+         <p className="system-preference">
+           System: {systemPreference}
+         </p>
+       )}
      </div>
    );
  }
```

**Acceptance Criteria:**

- [ ] Component updated with new hook
- [ ] High-contrast button added
- [ ] System preference displayed
- [ ] Old theme selector removed (or hidden for Phase 6)
- [ ] TypeScript compiles without errors
- [ ] Component renders without errors
- [ ] Clicking buttons changes mode
- [ ] Active button has `aria-pressed="true"`

**Testing:**

```bash
cd packages/design-system/storybook
npm run storybook
# Navigate to ThemeSwitcher story
# Click each mode button
# Verify data-mode attribute updates in DevTools
```

---

### Task 9: Update Storybook Preview Decorator 🔴

**File:** `packages/design-system/storybook/.storybook/preview.tsx`

**Status:** 🔲 Not Started  
**Priority:** 🔴 Critical Path  
**Estimated Effort:** 30 minutes  
**Depends On:** Task 2 (Rebuild Token CSS)

**Description:**
Update Storybook global decorator to use `data-mode` attribute and add high-contrast option.

**Changes Required:**

1. **Update Global Types:**

```diff
  const preview: Preview = {
    globalTypes: {
-     theme: {
-       description: 'Theme variant',
+     mode: {
+       description: 'Color mode (accessibility)',
        defaultValue: 'light',
        toolbar: {
-         title: 'Theme',
+         title: 'Mode',
+         icon: 'circlehollow',
          items: [
-           { value: 'default', title: 'Default', icon: 'circlehollow' },
-           { value: 'ocean', title: 'Ocean', icon: 'circle' },
-           { value: 'forest', title: 'Forest', icon: 'circle' },
+           { value: 'light', title: '☀️ Light', icon: 'circlehollow' },
+           { value: 'dark', title: '🌙 Dark', icon: 'circle' },
+           { value: 'high-contrast', title: '◐ High Contrast', icon: 'contrast' },
          ],
+         dynamicTitle: true,
        },
      },
    },
```

2. **Update Decorator:**

```diff
    decorators: [
      (Story, context) => {
-       const theme = context.globals.theme || 'default';
+       const mode = context.globals.mode || 'light';

-       // Set data-theme attribute
-       document.documentElement.setAttribute('data-theme', theme);
+       // Set data-mode attribute
+       document.documentElement.setAttribute('data-mode', mode);

        return <Story />;
      },
    ],
```

**Acceptance Criteria:**

- [ ] Toolbar shows "Mode" selector with 3 options
- [ ] Light mode option has sun icon
- [ ] Dark mode option has moon icon
- [ ] High-contrast option has contrast icon
- [ ] Selecting mode updates `data-mode` attribute
- [ ] All stories render correctly in each mode
- [ ] No console errors

**Testing:**

```bash
npm run storybook
# Open browser DevTools
# Select each mode from toolbar
# Verify <html data-mode="..."> updates
# Verify visual changes in stories
```

---

### Task 10: Create Theme Mode Stories 🟡

**File:** `packages/design-system/storybook/src/stories/ThemeMode.stories.tsx` (NEW)

**Status:** 🔲 Not Started  
**Priority:** 🟡 Important  
**Estimated Effort:** 30 minutes  
**Depends On:** Task 2 (Rebuild Token CSS), Task 9 (Update Storybook Decorator)

**Description:**
Create stories to showcase all theme modes with component examples.

**Story Structure:**

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

// Component showcase in current mode
export const ComponentShowcase: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <section>
        <h2>Buttons</h2>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </section>

      <section>
        <h2>Colors</h2>
        <div>Primary: <span style={{ color: 'var(--lufa-core-brand-primary)' }}>██████</span></div>
        <div>Background: <span style={{ background: 'var(--lufa-core-neutral-background-page)', padding: '0.5rem' }}>Sample</span></div>
      </section>
    </div>
  ),
};

// Explicit mode stories
export const LightMode: StoryObj = {
  ...ComponentShowcase,
  parameters: { globals: { mode: 'light' } },
};

export const DarkMode: StoryObj = {
  ...ComponentShowcase,
  parameters: { globals: { mode: 'dark' } },
};

export const HighContrastMode: StoryObj = {
  ...ComponentShowcase,
  parameters: { globals: { mode: 'high-contrast' } },
};

// Token visualization
export const TokenValues: StoryObj = {
  render: () => {
    const tokens = [
      'lufa-core-brand-primary',
      'lufa-core-brand-secondary',
      'lufa-core-neutral-background-page',
      'lufa-semantic-ui-text-primary',
    ];

    return (
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map(token => {
            const value = getComputedStyle(document.documentElement)
              .getPropertyValue(`--${token}`);
            return (
              <tr key={token}>
                <td><code>{token}</code></td>
                <td>{value}</td>
                <td style={{ background: value, width: '50px', height: '20px' }} />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
};
```

**Acceptance Criteria:**

- [ ] Stories created in Storybook
- [ ] ComponentShowcase story shows buttons and colors
- [ ] Explicit mode stories (Light/Dark/High-Contrast)
- [ ] TokenValues story shows current token values
- [ ] Stories render without errors
- [ ] Visual differences visible between modes

---

### Task 11: Test All Modes in Storybook 🟡

**Status:** 🔲 Not Started  
**Priority:** 🟡 Important  
**Estimated Effort:** 30 minutes  
**Depends On:** Task 9 (Update Storybook Decorator), Task 10 (Create Theme Mode Stories)

**Description:**
Manual visual testing of all modes across all component stories.

**Testing Checklist:**

**Light Mode:**

- [ ] Button components render correctly
- [ ] Background is light (#ffffff)
- [ ] Text is dark (readable)
- [ ] Brand colors are standard blue
- [ ] No visual glitches

**Dark Mode:**

- [ ] Button components render correctly
- [ ] Background is dark (#0a0a0a)
- [ ] Text is light (readable)
- [ ] Brand colors are lighter blue
- [ ] Sufficient contrast maintained

**High-Contrast Mode:**

- [ ] Button components render correctly
- [ ] Background is very dark or very light
- [ ] Text has maximum contrast
- [ ] Brand colors are high-contrast variants
- [ ] Meets WCAG AAA standards

**Component-Specific Tests:**

- [ ] Button: All variants visible in all modes
- [ ] Input: Borders visible in all modes
- [ ] Card: Backgrounds differentiated in all modes
- [ ] Typography: All text readable in all modes

**Browser DevTools:**

- [ ] `<html data-mode="light">` when light selected
- [ ] `<html data-mode="dark">` when dark selected
- [ ] `<html data-mode="high-contrast">` when high-contrast selected
- [ ] CSS variables update correctly
- [ ] No console errors or warnings

**Cross-Browser (Optional):**

- [ ] Chrome: All modes work
- [ ] Firefox: All modes work
- [ ] Safari: All modes work

---

## Package: @lufa/themes

### Task 12: Prepare for Phase 6 🟢

**Files:**

- `packages/design-system/themes/src/ocean.css`
- `packages/design-system/themes/src/forest.css`

**Status:** 🔲 Not Started  
**Priority:** 🟢 Nice to Have  
**Estimated Effort:** 15 minutes  
**Depends On:** None

**Description:**
Add comments to ocean.css and forest.css indicating Phase 6 implementation.

**Changes Required:**

```diff
  /* packages/design-system/themes/src/ocean.css */

+ /**
+  * Ocean Theme - Phase 6 Implementation
+  *
+  * This theme will override brand tokens with ocean-inspired colors.
+  * Currently a placeholder. Will be implemented in Phase 6.
+  *
+  * Usage: <html data-color-theme="ocean" data-mode="dark">
+  */
+
  :root {
-   /* Phase 6: Token overrides will be generated here */
+   /* Phase 6: Ocean brand color overrides */
+   /* Example:
+   [data-color-theme='ocean'] {
+     --lufa-core-brand-primary: #0ea5e9;
+     --lufa-core-brand-secondary: #06b6d4;
+   }
+   [data-color-theme='ocean'][data-mode='dark'] {
+     --lufa-core-brand-primary: #38bdf8;
+     --lufa-core-brand-secondary: #22d3ee;
+   }
+   */
  }
```

**Acceptance Criteria:**

- [ ] Comments added to ocean.css
- [ ] Comments added to forest.css
- [ ] Attribute naming documented (`data-color-theme`)
- [ ] Phase 6 status clear
- [ ] Example selectors provided

---

### Task 13: Update Themes Package README 🟢

**File:** `packages/design-system/themes/README.md`

**Status:** 🔲 Not Started  
**Priority:** 🟢 Nice to Have  
**Estimated Effort:** 15 minutes  
**Depends On:** None

**Description:**
Update themes package README to reflect Phase 6 status and new architecture.

**Sections to Add:**

```markdown
# @lufa/themes

Brand color theme variants for the Lufa Design System.

## Status: Phase 6 (Planned)

Theme variants (ocean, forest) are **placeholders** in Phase 2A. Full implementation planned for Phase 6.

## Architecture

Themes override brand tokens only. Accessibility modes (light/dark/high-contrast) are managed separately by `@lufa/tokens`.

### Usage (Phase 6)

\`\`\`typescript
import { useTheme } from '@lufa/main';

function App() {
const { theme, setTheme } = useTheme();

return (
<select value={theme} onChange={(e) => setTheme(e.target.value)}>
<option value="default">Default</option>
<option value="ocean">Ocean</option>
<option value="forest">Forest</option>
</select>
);
}
\`\`\`

\`\`\`html

<html data-color-theme="ocean" data-mode="dark">
\`\`\`

## See Also

- ADR-001: Separation of Modes and Themes
- ADR-002: HTML Attribute Naming
```

**Acceptance Criteria:**

- [ ] README updated with Phase 6 status
- [ ] Architecture explained
- [ ] Usage example provided
- [ ] Links to ADRs included

---

## Documentation

### Task 14: Update Theme Switching Guide 🟡

**File:** `packages/design-system/_docs/theme-switching-guide.md`

**Status:** 🔲 Not Started  
**Priority:** 🟡 Important  
**Estimated Effort:** 45 minutes  
**Depends On:** Task 4 (Create useThemeMode Hook)

**Description:**
Rewrite theme switching guide to document new `useThemeMode` hook.

**Sections to Update:**

1. **Introduction:**
   - Explain modes vs themes distinction
   - Link to ADRs

2. **Quick Start:**
   - Replace old `useTheme` example with `useThemeMode`
   - Show basic usage

3. **API Reference:**
   - Document `useThemeMode` options
   - Document return values
   - Show TypeScript types

4. **System Preference Detection:**
   - Explain autoDetect option
   - Show how to disable
   - Document media queries used

5. **localStorage Persistence:**
   - Document storage key
   - Show how to customize
   - Show how to disable

6. **Examples:**
   - Basic usage
   - Custom storage key
   - Disabled auto-detection
   - Combined with useTheme (Phase 6)

7. **Migration:**
   - Link to migration guide
   - Show before/after examples

**Acceptance Criteria:**

- [ ] All sections updated
- [ ] Code examples work
- [ ] TypeScript examples type-check
- [ ] Links work
- [ ] Markdown renders correctly

---

### Task 15: Create Migration Guide 🟡

**File:** `packages/design-system/_docs/migration-guide-phase-2a.md` (NEW)

**Status:** 🔲 Not Started  
**Priority:** 🟡 Important  
**Estimated Effort:** 30 minutes  
**Depends On:** Task 4 (Create useThemeMode Hook)

**Description:**
Create migration guide from old `useTheme` to new `useThemeMode` hook.

**Content:**

```markdown
# Migration Guide: useTheme → useThemeMode

## Overview

Phase 2A introduces `useThemeMode` for managing accessibility modes.

## Quick Migration

### Before

\`\`\`typescript
const { theme, mode, setTheme, setMode } = useTheme();
\`\`\`

### After

\`\`\`typescript
const { mode, setMode } = useThemeMode();
\`\`\`

## Step-by-Step

1. Replace import
2. Update hook usage
3. Remove theme selector (not functional yet)
4. Add high-contrast option
5. Update tests

## Breaking Changes

- `data-theme` → `data-mode`
- `lufa-theme` → `lufa-theme-mode` (localStorage)
- `mode: 'auto'` → `autoDetect: true` option

## See Also

- Technical Spec
- ADR-001
- ADR-002
```

**Acceptance Criteria:**

- [ ] Migration guide created
- [ ] Step-by-step instructions clear
- [ ] Before/after examples included
- [ ] Breaking changes documented
- [ ] Links to related docs

---

### Task 16: Update Root README 🟢

**File:** `packages/design-system/README.md`

**Status:** 🔲 Not Started  
**Priority:** 🟢 Nice to Have  
**Estimated Effort:** 10 minutes  
**Depends On:** None

**Description:**
Update root README to mention Phase 2A theme system updates.

**Changes Required:**

```diff
  # Lufa Design System

  Version: 0.7.1
+ **Phase 2A:** Multi-mode theme system integration complete ✅

  ## Recent Updates

+ - **Theme Modes:** Light, dark, and high-contrast modes now fully functional
+ - **New Hook:** `useThemeMode` for accessibility mode management
+ - **System Preferences:** Automatic detection of dark mode and high-contrast
+
  ## Packages

  - `@lufa/tokens` - Design tokens with multi-mode support
+ - `@lufa/themes` - Brand theme variants (Phase 6)
  - `@lufa/main` - React components and hooks
  - `@lufa/storybook` - Component documentation
```

**Acceptance Criteria:**

- [ ] README updated
- [ ] Phase 2A status mentioned
- [ ] New features listed
- [ ] Links work

---

## Final Validation

### Task 17: End-to-End Testing 🔴

**Status:** 🔲 Not Started  
**Priority:** 🔴 Critical Path  
**Estimated Effort:** 30 minutes  
**Depends On:** All previous tasks

**Description:**
Comprehensive end-to-end validation that entire system works.

**Testing Checklist:**

**Build System:**

- [ ] All packages build without errors
- [ ] No TypeScript errors
- [ ] No ESLint errors

**Token System:**

- [ ] tokens.css uses `[data-mode]` selectors
- [ ] All 3 modes present (light/dark/high-contrast)
- [ ] 173 base tokens present
- [ ] 31 overrides per mode

**Hook System:**

- [ ] `useThemeMode` hook exports correctly
- [ ] Hook can be imported: `import { useThemeMode } from '@lufa/main'`
- [ ] Types export correctly
- [ ] Hook works in real component

**Storybook:**

- [ ] Storybook starts without errors
- [ ] Mode selector in toolbar
- [ ] 3 mode options available
- [ ] Selecting mode updates `data-mode` attribute
- [ ] Visual changes visible when switching modes
- [ ] All component stories render in all modes
- [ ] No console errors

**localStorage:**

- [ ] Mode persists across page reloads
- [ ] Custom storage key works
- [ ] Disable storage works

**System Preferences:**

- [ ] Auto-detection works (test with OS dark mode)
- [ ] `systemPrefersDark` updates correctly
- [ ] `systemPrefersContrast` updates correctly (if supported)

**Documentation:**

- [ ] All docs updated
- [ ] Links work
- [ ] Code examples accurate

**Acceptance Criteria:**

- [ ] ALL tests above pass
- [ ] No console errors anywhere
- [ ] System works end-to-end
- [ ] Ready to demo to stakeholders

---

### Task 18: Create Demo/Screenshots 🟢

**Status:** 🔲 Not Started  
**Priority:** 🟢 Nice to Have  
**Estimated Effort:** 20 minutes  
**Depends On:** Task 17 (End-to-End Testing)

**Description:**
Create screenshots/recordings of theme system working.

**Assets to Create:**

1. **Screenshots:**
   - [ ] Button component in light mode
   - [ ] Button component in dark mode
   - [ ] Button component in high-contrast mode
   - [ ] Storybook toolbar showing mode selector
   - [ ] Browser DevTools showing `data-mode` attribute

2. **GIF/Recording (Optional):**
   - [ ] Switching between modes in Storybook
   - [ ] localStorage persistence demo

**Save Location:** `_bmad-output/demos/phase-2a/`

**Acceptance Criteria:**

- [ ] Screenshots captured
- [ ] Visual differences clear
- [ ] Files saved in output folder

---

## Summary

### Total Tasks: 18

**By Priority:**

- 🔴 Critical Path: 8 tasks (~4 hours)
- 🟡 Important: 6 tasks (~3.5 hours)
- 🟢 Nice to Have: 4 tasks (~1.5 hours)

**By Package:**

- @lufa/tokens: 3 tasks
- @lufa/main: 4 tasks
- @lufa/storybook: 4 tasks
- @lufa/themes: 2 tasks
- Documentation: 3 tasks
- Validation: 2 tasks

**Estimated Total Effort:** ~5 hours

### Critical Path (Minimum for Completion)

```
1. Update Style Dictionary Config (30 min)
   ↓
2. Rebuild Token CSS (5 min)
   ↓
3. Create useThemeMode Hook (2 hours)
   ↓
4. Export Hook (2 min)
   ↓
5. Update ThemeSwitcher (45 min)
   ↓
6. Update Storybook Decorator (30 min)
   ↓
7. End-to-End Testing (30 min)
```

**Critical Path Total:** ~4 hours

---

## Completion Checklist

**Phase 2A Complete When:**

- [ ] All 🔴 Critical Path tasks complete
- [ ] All 🟡 Important tasks complete
- [ ] End-to-End testing passes
- [ ] Storybook demos working
- [ ] No console errors
- [ ] Documentation updated
- [ ] Ready to demo

**Sign-Off:**

- [ ] Architect approval
- [ ] QA approval (visual testing)
- [ ] Stakeholder demo complete

---

**Document Status:** ✅ Ready for Implementation  
**Next Step:** Begin with Task 1 (Update Style Dictionary Config)
