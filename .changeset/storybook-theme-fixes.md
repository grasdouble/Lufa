---
"@grasdouble/lufa_design-system-storybook": patch
"@grasdouble/lufa_design-system": patch
---

# Storybook Theme Adaptation & Color API Improvements

Comprehensive fixes for Storybook theme switching, deprecated token migration, and STORY_COLORS API refactoring.

## Storybook (@grasdouble/lufa_design-system-storybook)

### Theme Infrastructure Fixes

- **Deprecated Token Migration**: Replaced 50+ deprecated `--lufa-token-color-*` tokens with current semantic UI tokens across 6 files
  - `.storybook/preview.tsx` - Theme wrapper
  - Helper components: `PlaygroundContainer`, `PropCard`, `MarginVisualizer`, `PaddingVisualizer`
  - `style.css` - Form overrides

### Story Fixes

- **Hardcoded Colors**: Replaced 126 hardcoded color values with theme-aware CSS variables
  - 26 `background: 'white'` instances → `var(--lufa-semantic-ui-background-surface)`
  - 111 hardcoded colors in Typography stories
  - 15 color references in Typography tips/code snippets
  
- **Missing STORY_COLORS Properties**: Added missing color properties referenced in stories
  - `STORY_COLORS.neutral.text` (80+ usages)
  - `STORY_COLORS.neutral.bgGray` (2 usages)
  - `STORY_COLORS.primary.red` (4 usages in Icon delete button examples)

- **Type Safety**: Fixed PropPadding story color type error
  - Updated to use `.main` property: `STORY_COLORS.primary.cyan.main`
  - Added type guards in visualizer components

### STORY_COLORS API Refactoring

- **New `STORY_COLORS.themed.*` API**: Added dedicated section for theme-aware colors
  - `text.*` - Primary, secondary, tertiary, success, inverse text colors
  - `background.*` - Page, surface, semantic (success/error/warning/info) colors
  - `border.*` - Default and subtle border colors
  - `shadow.*` - Small and medium shadow tokens
  - `overlay.*` - Backdrop overlay token
  
- **Complete Migration**: Replaced 164 direct CSS variable calls with `STORY_COLORS.themed.*` across all stories
  - Typography: 128 replacements
  - Icon: 18 replacements
  - Text: 8 replacements
  - Divider: 5 replacements
  - Stack: 3 replacements
  - Box: 3 replacements
  - Colors: 1 replacement
  

### Linting & Type Fixes

- Fixed TypeScript unsafe argument type in ThemeSwitcher
- Removed redundant type union in PaddingVisualizer
- Cleaned up unused imports across 4 story files

## Design System Main (@grasdouble/lufa_design-system)

### Box Component Border Utility Fix

- **borderWidth Utility**: Fixed invisible borders by setting both `border-width` and `border-style`
  - Previous: Only set `border-width` (borders defaulted to `none`)
  - Now: Sets both properties together (e.g., `['1px', 'solid']`)
  - Regenerated `Box.module.css` with 119 updated utility classes

## Impact

✅ Theme switching (Light/Dark/High-Contrast) now works properly across all stories
✅ All story content is readable and properly contrasted in all themes
✅ Box component borders display correctly with `borderWidth` prop
✅ Type-safe color API with clear semantic distinction (164 CSS variables → STORY_COLORS.themed)
✅ Consistent API usage across entire Storybook codebase
✅ Zero linting errors or warnings

## Files Modified (18 files)

- `.storybook/preview.tsx`
- `src/components/helpers/*.tsx` (4 files)
- `src/stories/primitives/*.stories.tsx` (7 files)
- `src/stories/tokens/Typography.stories.tsx`
- `src/constants/storyColors.ts`
- `packages/design-system/main/src/components/Box/box.utilities.config.cjs`
- `packages/design-system/main/src/components/Box/Box.module.css` (generated)
