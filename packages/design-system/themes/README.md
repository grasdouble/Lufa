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

/* Glow Tokens - Standardized luminescence (optional - cyber/neon themes only) */
--lufa-glow-{type}-{intensity}  /* type: box, text, inset | intensity: subtle, default, strong, intense */
--lufa-glow-color                /* Primary glow color variable */
--lufa-glow-color-secondary      /* Secondary glow color variable */
```

For complete documentation, usage guidelines, and examples, see **[TOKENS_CONVENTIONS.md](./TOKENS_CONVENTIONS.md)**.

---

## 📖 Theme Refactoring Implementation Guide

This step-by-step guide walks you through implementing a theme refactoring story. Follow these steps in order to ensure consistency and quality.

### Prerequisites

Before starting implementation:

1. **Read the story file thoroughly** - Understand requirements, acceptance criteria, and tasks
2. **Identify your theme** - Know which theme you're refactoring (e.g., Ocean, Cyberpunk, Steampunk)
3. **Locate theme files**:
   - Base theme: `packages/design-system/themes/src/{theme}.css`
   - Docusaurus theme: `packages/design-system/docusaurus/src/css/{theme}-docusaurus.css`

### Step 1: Add Base Tokens (ETR-00X Stories)

**Objective:** Add RGB variables, alpha tokens, shadow tokens, overlay tokens, and glow tokens (if applicable) to the base theme file.

#### 1.1 Open Required Files

```bash
# Base theme file
code packages/design-system/themes/src/steampunk.css

# Token template (for reference)
code packages/design-system/themes/src/_token-template.css
```

#### 1.2 Extract RGB Values from Existing Colors

Choose one method to convert hex colors to RGB:

**Method A: Browser DevTools**

1. Open any webpage
2. Open DevTools Console
3. Paste: `document.body.style.backgroundColor = '#0891b2'; getComputedStyle(document.body).backgroundColor;`
4. Result shows RGB values

**Method B: Online Converter**

- Use: https://www.rapidtables.com/convert/color/hex-to-rgb.html
- Paste hex, get RGB

**Method C: Manual Conversion**

```javascript
// For hex #0891b2
const r = parseInt('08', 16); // 8
const g = parseInt('91', 16); // 145
const b = parseInt('b2', 16); // 178
// Result: 8, 145, 178
```

#### 1.3 Add RGB Variables

Add RGB variables to **each mode block** in your theme file:

```css
[data-color-theme='your-theme'][data-mode='light'] {
  /* RGB Variables (6 colors) */
  --lufa-primary-rgb: 8, 145, 178; /* Extracted from primary color */
  --lufa-secondary-rgb: 245, 158, 11; /* Extracted from secondary color */
  --lufa-success-rgb: 34, 197, 94; /* Extracted from success color */
  --lufa-error-rgb: 239, 68, 68; /* Extracted from error color */
  --lufa-warning-rgb: 234, 179, 8; /* Extracted from warning color */
  --lufa-info-rgb: 59, 130, 246; /* Extracted from info color */
}
```

**⚠️ Important:** Use pattern `--lufa-{color}-rgb`, NOT `--lufa-rgb-{color}`

#### 1.4 Copy Alpha Tokens from Template

Copy all 54 alpha tokens from `_token-template.css` (6 colors × 9 opacity levels):

```css
[data-color-theme='your-theme'][data-mode='light'] {
  /* RGB Variables (already added above) */

  /* Alpha Tokens - Primary (9 levels) */
  --lufa-alpha-primary-3: rgba(var(--lufa-primary-rgb), 0.03);
  --lufa-alpha-primary-5: rgba(var(--lufa-primary-rgb), 0.05);
  --lufa-alpha-primary-8: rgba(var(--lufa-primary-rgb), 0.08);
  --lufa-alpha-primary-10: rgba(var(--lufa-primary-rgb), 0.1);
  --lufa-alpha-primary-15: rgba(var(--lufa-primary-rgb), 0.15);
  --lufa-alpha-primary-20: rgba(var(--lufa-primary-rgb), 0.2);
  --lufa-alpha-primary-30: rgba(var(--lufa-primary-rgb), 0.3);
  --lufa-alpha-primary-40: rgba(var(--lufa-primary-rgb), 0.4);
  --lufa-alpha-primary-50: rgba(var(--lufa-primary-rgb), 0.5);

  /* Repeat for: secondary, success, error, warning, info */
}
```

✅ **Alpha tokens automatically use the RGB variables you defined!**

#### 1.5 Add Shadow Tokens

Copy shadow tokens from template and customize `--lufa-shadow-color` for your theme:

```css
[data-color-theme='your-theme'][data-mode='light'] {
  /* Shadow Tokens (5 sizes) */
  --lufa-shadow-color: rgba(0, 0, 0, 0.15); /* Customize for theme */
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 12px 24px var(--lufa-shadow-color); /* ⚠️ Note: 0 12px 24px, NOT 0 16px 32px */
}
```

**Theme-Specific Shadow Colors:**

- **Dark themes** (Matrix, Cyberpunk): `rgba(0, 0, 0, 0.5)` - Darker shadows
- **Light themes** (Ocean, Sunset): `rgba(0, 0, 0, 0.15)` - Subtle shadows
- **High-contrast**: `rgba(0, 0, 0, 0.3)` - Medium visibility

#### 1.6 Add Overlay Tokens

Copy overlay tokens from template (mode-aware, adjust opacity per mode):

```css
[data-color-theme='your-theme'][data-mode='light'] {
  /* Overlay Tokens - Light variants */
  --lufa-overlay-light-subtle: rgba(255, 255, 255, 0.05);
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);

  /* Overlay Tokens - Dark variants */
  --lufa-overlay-dark-subtle: rgba(0, 0, 0, 0.05);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.2);
}
```

**Adjust per mode:**

- **Light mode:** Light overlays = lower opacity, Dark overlays = higher opacity
- **Dark mode:** Light overlays = higher opacity, Dark overlays = lower opacity
- **High-contrast:** Higher opacity for both (better visibility)

#### 1.7 Add Glow Tokens (If Applicable)

**⚠️ ONLY add glow tokens if theme is cyber/neon aesthetic** (Cyberpunk, Matrix)

**DO add glows to:** Cyberpunk, Matrix  
**DO NOT add glows to:** Ocean, Forest, Sunset, Nordic, Steampunk

```css
[data-color-theme='cyberpunk'][data-mode='dark'] {
  /* Glow Color Variables */
  --lufa-glow-color: rgba(236, 72, 153, 0.6); /* Primary glow (pink) */
  --lufa-glow-color-secondary: rgba(34, 211, 238, 0.5); /* Secondary glow (cyan) */

  /* Glow Tokens - Box Shadows (4 intensities) */
  --lufa-glow-box-subtle: 0 0 8px var(--lufa-glow-color);
  --lufa-glow-box: 0 0 16px var(--lufa-glow-color);
  --lufa-glow-box-strong: 0 0 24px var(--lufa-glow-color);
  --lufa-glow-box-intense: 0 0 32px var(--lufa-glow-color);

  /* Glow Tokens - Text Shadows (4 intensities) */
  --lufa-glow-text-subtle: 0 0 4px var(--lufa-glow-color);
  --lufa-glow-text: 0 0 8px var(--lufa-glow-color);
  --lufa-glow-text-strong: 0 0 12px var(--lufa-glow-color);
  --lufa-glow-text-intense: 0 0 16px var(--lufa-glow-color);

  /* Glow Tokens - Inset Glows (3 intensities) */
  --lufa-glow-inset-subtle: inset 0 0 8px var(--lufa-glow-color);
  --lufa-glow-inset: inset 0 0 16px var(--lufa-glow-color);
  --lufa-glow-inset-strong: inset 0 0 24px var(--lufa-glow-color);
}
```

#### 1.8 Repeat for All 3 Modes

Repeat steps 1.3-1.7 for:

1. **Light mode:** `[data-color-theme='your-theme'][data-mode='light']`
2. **Dark mode:** `[data-color-theme='your-theme'][data-mode='dark']`
3. **High-contrast mode:** `[data-color-theme='your-theme'][data-mode='high-contrast']`

#### 1.9 Build & Verify

```bash
cd packages/design-system/themes
pnpm build
```

**Expected:** ✅ Build completes with no errors

If errors occur:

- Check CSS syntax (missing semicolons, braces)
- Verify RGB variable names match pattern
- Ensure all tokens are inside CSS selectors

### Step 2: Refactor Docusaurus CSS (ETR-00Y Stories)

**Objective:** Replace hardcoded colors in Docusaurus theme with token references.

#### 2.1 Open Docusaurus Theme File

```bash
code packages/design-system/docusaurus/src/css/steampunk-docusaurus.css
```

#### 2.2 Find Hardcoded Colors

Search for hardcoded `rgba()` values:

```bash
cd packages/design-system/docusaurus
grep -n "rgba(" src/css/steampunk-docusaurus.css
```

Search for hex colors:

```bash
grep -n "#[0-9A-Fa-f]" src/css/steampunk-docusaurus.css
```

#### 2.3 Replace with Tokens

Use this mapping guide:

**Alpha Tokens:**

```css
/* Before */
background: rgba(8, 145, 178, 0.05);

/* After */
background: var(--lufa-alpha-primary-5);
```

**Match opacity to token level:**

- `0.03` → `--lufa-alpha-{color}-3`
- `0.05` → `--lufa-alpha-{color}-5`
- `0.08` → `--lufa-alpha-{color}-8`
- `0.1` → `--lufa-alpha-{color}-10`
- `0.15` → `--lufa-alpha-{color}-15`
- `0.2` → `--lufa-alpha-{color}-20`
- `0.3` → `--lufa-alpha-{color}-30`
- `0.4` → `--lufa-alpha-{color}-40`
- `0.5` → `--lufa-alpha-{color}-50`

**Shadow Tokens:**

```css
/* Before */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

/* After */
box-shadow: var(--lufa-shadow-sm);
```

**Shadow size mapping:**

- `0 1px 2px` → `--lufa-shadow-xs`
- `0 2px 4px` → `--lufa-shadow-sm`
- `0 4px 8px` → `--lufa-shadow-md`
- `0 8px 16px` → `--lufa-shadow-lg`
- `0 12px 24px` → `--lufa-shadow-xl`

**Overlay Tokens:**

```css
/* Before */
background: rgba(255, 255, 255, 0.1);

/* After */
background: var(--lufa-overlay-light);
```

**Glow Tokens (cyber/neon themes only):**

```css
/* Before */
box-shadow: 0 0 16px rgba(236, 72, 153, 0.6);

/* After */
box-shadow: var(--lufa-glow-box);
```

#### 2.4 Handle Gradients

**Gradients can use token variables:**

```css
/* Before */
background: linear-gradient(135deg, rgba(8, 145, 178, 0.2), rgba(245, 158, 11, 0.1));

/* After - Uses RGB variables */
background: linear-gradient(135deg, rgba(var(--lufa-primary-rgb), 0.2), rgba(var(--lufa-secondary-rgb), 0.1));
```

**Or use alpha tokens if opacity matches:**

```css
/* After - Uses alpha tokens */
background: linear-gradient(135deg, var(--lufa-alpha-primary-20), var(--lufa-alpha-secondary-10));
```

#### 2.5 Build & Test

```bash
cd packages/design-system/docusaurus
pnpm build
pnpm dev
```

1. Open browser to `http://localhost:3000`
2. Switch to your theme
3. Test all 3 modes (light, dark, high-contrast)
4. Verify visual appearance matches original

### Step 3: Validation

#### 3.1 Run Validation Script

```bash
cd packages/design-system/docusaurus
pnpm validate:tokens
```

**Expected output:**

```
✅ Token Validation Passed
Total Files: 3
Violations Found: 0
```

#### 3.2 Fix Violations

**If violations are found:**

```
❌ Token Validation Failed

Violations Found:

📄 ocean-docusaurus.css
  Line 45:   background: rgba(8, 145, 178, 0.05);
             ^ Use: var(--lufa-alpha-primary-5)
```

1. Navigate to reported file and line number
2. Replace hardcoded value with suggested token
3. Re-run validation: `pnpm validate:tokens`
4. Repeat until zero violations

#### 3.3 Verify Self-Tests

```bash
pnpm validate:tokens --test
```

**Expected:** `✅ All 13 self-tests passed`

### Step 4: Pre-Review Checklist

Open the pre-review checklist and complete all items:

```bash
code packages/design-system/themes/PRE_REVIEW_CHECKLIST.md
```

Go through each section systematically:

1. **Code Quality Checks** - Verify no hardcoded colors, correct syntax
2. **Consistency Checks** - Verify tokens match template patterns
3. **Build & Validation** - Run builds and validation scripts
4. **Documentation Completeness** - Update story file completely
5. **Testing & Verification** - Test all 3 color modes
6. **Story Readiness** - Verify story is complete and clean

**DO NOT proceed until checklist is 100% complete.**

### Step 5: Documentation

Update the story file with complete documentation:

#### 5.1 Update Change Log

```markdown
## Change Log

### Files Modified

1. **packages/design-system/themes/src/steampunk.css**
   - Added RGB variables for all 6 colors (primary, secondary, success, error, warning, info)
   - Added 54 alpha tokens (6 colors × 9 opacity levels)
   - Added 5 shadow tokens (xs, sm, md, lg, xl)
   - Added 6 overlay tokens (light/dark × 3 intensities)
   - Defined tokens for all 3 modes (light, dark, high-contrast)

2. **packages/design-system/docusaurus/src/css/steampunk-docusaurus.css**
   - Replaced 23 hardcoded rgba() values with alpha tokens
   - Replaced 8 shadow definitions with shadow tokens
   - Replaced 4 overlay colors with overlay tokens
   - Gradients now use RGB variables
```

#### 5.2 Update File List

```markdown
## Files Modified

- [x] `packages/design-system/themes/src/steampunk.css` (Added 105 tokens)
- [x] `packages/design-system/docusaurus/src/css/steampunk-docusaurus.css` (Refactored to use tokens)
```

#### 5.3 Complete Dev Notes

```markdown
## Dev Notes

### Technical Decisions

1. **Shadow Color Choice:** Used `rgba(0, 0, 0, 0.2)` for steampunk theme to create vintage, industrial feel
2. **Glow Tokens:** NOT added - Steampunk is traditional/vintage theme, not cyber/neon aesthetic
3. **Overlay Adjustments:** Increased overlay opacity in high-contrast mode for better accessibility

### Challenges Encountered

- Initial build failed due to missing semicolon on line 42
- Fixed RGB variable name: changed `--lufa-rgb-primary` to `--lufa-primary-rgb`

### Validation Results

- ✅ Build passes: themes and docusaurus packages
- ✅ Token validation: 0 violations found
- ✅ Visual testing: All 3 modes verified
```

#### 5.4 Mark All Tasks Complete

```markdown
- [x] Add RGB variables for all 6 colors
- [x] Add 54 alpha tokens (6 colors × 9 levels)
- [x] Add 5 shadow tokens
- [x] Add 6 overlay tokens
- [x] Define tokens for light mode
- [x] Define tokens for dark mode
- [x] Define tokens for high-contrast mode
- [x] Build and verify no errors
```

#### 5.5 Mark Acceptance Criteria Complete

```markdown
- [x] RGB variables follow naming pattern: `--lufa-{color}-rgb`
- [x] All 9 opacity levels present for all colors
- [x] Shadow-xl uses correct spec: `0 12px 24px`
- [x] Tokens defined for all 3 modes
- [x] Build passes with no errors
- [x] Visual inspection confirms no regressions
```

### Step 6: Ready for Review

#### 6.1 Final Verification

Before marking ready for review:

1. ✅ PRE_REVIEW_CHECKLIST.md is 100% complete
2. ✅ Story file fully updated (Change Log, File List, Dev Notes, Tasks, AC)
3. ✅ Build passes
4. ✅ Validation passes (zero violations)
5. ✅ Visual testing complete (all 3 modes)
6. ✅ No TODO comments or debug code

#### 6.2 Update Story Status

In the story file header:

```markdown
**Status:** ready for review <!-- Changed from "in-progress" -->
```

#### 6.3 Commit Changes

```bash
git add .
git commit -m "feat(themes): Complete ETR-00X Steampunk base tokens

- Added 105 tokens (54 alpha, 5 shadow, 6 overlay, RGB variables)
- Defined for all 3 modes (light, dark, high-contrast)
- Build and validation pass
- Story ETR-00X complete and ready for review"
```

#### 6.4 Notify Reviewer

**Recommended:** Use fresh LLM context for code review (different session)

Provide reviewer with:

- Story file path
- Brief summary of changes
- Note any technical decisions or justified exceptions

---

## Common Pitfalls to Avoid

Based on Epic 1 retrospective findings, avoid these mistakes:

### ❌ RGB Variable Naming (ETR-003 Issue)

**Wrong:** `--lufa-rgb-primary: 8, 145, 178;`  
**Correct:** `--lufa-primary-rgb: 8, 145, 178;`

### ❌ Shadow-XL Specification (ETR-003 Issue)

**Wrong:** `--lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);`  
**Correct:** `--lufa-shadow-xl: 0 12px 24px var(--lufa-shadow-color);`

### ❌ Tokens Outside Selectors (Common Mistake)

**Wrong:**

```css
--lufa-primary-rgb: 8, 145, 178; /* Outside selector */

[data-color-theme='ocean'] {
  /* tokens here */
}
```

**Correct:**

```css
[data-color-theme='ocean'][data-mode='light'] {
  --lufa-primary-rgb: 8, 145, 178; /* Inside selector */
}
```

### ❌ Glow Tokens on Non-Cyber Themes (Common Mistake)

**Wrong:** Adding glow tokens to Ocean, Forest, Sunset  
**Correct:** Glow tokens ONLY for Cyberpunk, Matrix (cyber/neon aesthetic)

### ❌ Forgetting RGB Variables (ETR-004 Issue)

**Wrong:** Defining alpha tokens without RGB variables first  
**Correct:** RGB variables MUST be defined before alpha tokens can reference them

### ❌ Incomplete Testing (ETR-003/004 Issues)

**Wrong:** Only testing light mode  
**Correct:** Test all 3 modes (light, dark, high-contrast) before marking ready

### ❌ Premature "Ready for Review" (Multiple Stories)

**Wrong:** Marking ready before completing PRE_REVIEW_CHECKLIST.md  
**Correct:** Complete checklist 100%, then mark ready

---

## Quick Reference Commands

```bash
# Build themes package
cd packages/design-system/themes && pnpm build

# Build Docusaurus package
cd packages/design-system/docusaurus && pnpm build

# Start dev server
cd packages/design-system/docusaurus && pnpm dev

# Run token validation
cd packages/design-system/docusaurus && pnpm validate:tokens

# Run validation self-tests
pnpm validate:tokens --test

# Search for hardcoded rgba() values
grep -rn "rgba(" src/css/

# Search for hardcoded hex colors
grep -rn "#[0-9A-Fa-f]" src/css/
```

---

## Questions or Issues?

If you encounter issues during implementation:

1. **Review Epic 1 Examples:**
   - ETR-003: `_bmad-output/implementation-artifacts/stories/ETR-003-pilot-steampunk-add-base-tokens.md`
   - ETR-004: `_bmad-output/implementation-artifacts/stories/ETR-004-pilot-steampunk-refactor-docusaurus.md`

2. **Check Documentation:**
   - Token template: `packages/design-system/themes/src/_token-template.css`
   - Token conventions: `packages/design-system/themes/TOKENS_CONVENTIONS.md`
   - Pre-review checklist: `packages/design-system/themes/PRE_REVIEW_CHECKLIST.md`

3. **Run Validation Early:**
   - Catch issues during development, not at the end
   - Validation script provides immediate feedback

4. **Ask for Help:**
   - Review Epic 1 retrospective for common issues
   - Check with team if uncertain about approach

---

**Status:** ✅ Production Ready (v2)
