# Story ETR-018: Landing Themes CSS - Refactoring

**Story ID**: ETR-018  
**Epic**: ETR-EPIC-005 - Landing Page & Final Polish  
**Priority**: P2 (Medium)  
**Story Points**: 8  
**Estimated Time**: 2 hours  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-EPIC-004

---

## User Story

As a developer, I need the landing-themes.css refactored to use tokens so that landing page adaptations are maintainable.

---

## Description

Refactor landing-themes.css which contains adaptations for all 10 themes on the landing page. Replace all hardcoded colors with tokens from respective theme files.

This is a critical file that applies theme-specific styling to the landing page for all 10 themes. Each theme section needs to be refactored to use design tokens instead of hardcoded rgba() and hex values, while maintaining the unique visual characteristics of each theme.

---

## Acceptance Criteria

- [ ] All hardcoded colors replaced with tokens for each theme section
- [ ] Ocean wave animation uses tokens (or justified exception documented)
- [ ] Matrix terminal effects use tokens
- [ ] Cyberpunk neon glows use tokens
- [ ] Steampunk brass overlays use tokens
- [ ] Volt high-vis elements use tokens
- [ ] Forest natural elements use tokens
- [ ] Coffee retro elements use tokens
- [ ] Volcano fiery elements use tokens
- [ ] Nordic arctic elements use tokens
- [ ] Sunset warm elements use tokens
- [ ] All 10 themes' landing adaptations refactored
- [ ] Gradients updated to use tokens where possible
- [ ] Zero hardcoded colors (except justified exceptions documented)
- [ ] Visual consistency maintained for all themes

---

## Technical Details

### Refactoring Pattern

```css
/* BEFORE - Steampunk Example */
[data-color-theme='steampunk'] .landing-hero {
  background: linear-gradient(135deg, rgba(184, 115, 51, 0.1) 0%, transparent 100%);
  border-color: rgba(184, 115, 51, 0.3);
  box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
}

[data-color-theme='steampunk'] .landing-card:hover {
  background: rgba(184, 115, 51, 0.05);
  border-color: rgba(184, 115, 51, 0.4);
}

/* AFTER - Steampunk Example */
[data-color-theme='steampunk'] .landing-hero {
  background: linear-gradient(135deg, var(--lufa-alpha-primary-10) 0%, transparent 100%);
  border-color: var(--lufa-alpha-primary-30);
  box-shadow: var(--lufa-shadow-md);
}

[data-color-theme='steampunk'] .landing-card:hover {
  background: var(--lufa-alpha-primary-5);
  border-color: var(--lufa-alpha-primary-40);
}
```

### Special Cases

**Ocean Wave Animation**:
```css
/* If animation uses complex gradients, document as justified exception */
/* OR refactor to use tokens if feasible */
[data-color-theme='ocean'] .wave-animation {
  background: linear-gradient(
    90deg,
    var(--lufa-alpha-primary-10) 0%,
    var(--lufa-alpha-primary-20) 50%,
    var(--lufa-alpha-primary-10) 100%
  );
}
```

**Cyberpunk Neon Glows**:
```css
[data-color-theme='cyberpunk'] .landing-title {
  text-shadow: var(--lufa-neon-glow-md);
  color: var(--lufa-color-primary);
}

[data-color-theme='cyberpunk'] .landing-card {
  border-color: var(--lufa-alpha-primary-40);
  box-shadow: var(--lufa-shadow-lg);
}
```

**Matrix Terminal Effects**:
```css
[data-color-theme='matrix'] .landing-code-block {
  background: var(--lufa-alpha-primary-5);
  box-shadow: var(--lufa-shadow-sm);
  border-color: var(--lufa-alpha-primary-30);
}
```

---

## Files to Modify

- `packages/design-system/docusaurus/src/css/landing-themes.css` - Refactor all 10 theme sections

---

## Refactoring Checklist by Theme

### Steampunk
- [ ] `.landing-hero` background and borders
- [ ] `.landing-card` hover states
- [ ] `.landing-feature` styling
- [ ] Any brass overlay effects

### Ocean
- [ ] `.landing-hero` with wave elements
- [ ] `.landing-card` aquatic effects
- [ ] Wave animation (evaluate if tokens work)
- [ ] Cyan/teal gradient replacements

### Cyberpunk
- [ ] `.landing-hero` neon effects
- [ ] `.landing-title` text shadows
- [ ] `.landing-card` border glows
- [ ] Neon glow shadows

### Matrix
- [ ] `.landing-code-block` terminal styling
- [ ] `.landing-hero` scanline effects
- [ ] Terminal glow effects
- [ ] Green monochrome elements

### Volt
- [ ] `.landing-hero` high-vis elements
- [ ] `.landing-card` industrial styling
- [ ] Warning stripe patterns
- [ ] Yellow accent replacements

### Forest
- [ ] `.landing-hero` organic elements
- [ ] `.landing-card` natural styling
- [ ] Soft shadow replacements
- [ ] Green nature accents

### Coffee
- [ ] `.landing-hero` retro elements
- [ ] `.landing-card` vintage styling
- [ ] Warm shadow replacements
- [ ] Brown accent replacements

### Volcano
- [ ] `.landing-hero` fiery elements
- [ ] `.landing-card` intense styling
- [ ] Lava red replacements
- [ ] Intense shadow effects

### Nordic
- [ ] `.landing-hero` minimal arctic elements
- [ ] `.landing-card` clean styling
- [ ] Cool blue replacements
- [ ] Subtle shadow effects

### Sunset
- [ ] `.landing-hero` warm sunset elements
- [ ] `.landing-card` elegant styling
- [ ] Orange gradient replacements
- [ ] Golden shadow effects

---

## Testing Checklist

- [ ] Build docusaurus package: `cd packages/design-system/docusaurus && pnpm build`
- [ ] Start dev server: `cd packages/design-system/docusaurus && pnpm dev`
- [ ] Test landing page with Steampunk theme (light, dark, high-contrast)
- [ ] Test landing page with Ocean theme (light, dark, high-contrast)
- [ ] Test landing page with Cyberpunk theme (light, dark, high-contrast)
- [ ] Test landing page with Matrix theme (light, dark, high-contrast)
- [ ] Test landing page with Volt theme (light, dark, high-contrast)
- [ ] Test landing page with Forest theme (light, dark, high-contrast)
- [ ] Test landing page with Coffee theme (light, dark, high-contrast)
- [ ] Test landing page with Volcano theme (light, dark, high-contrast)
- [ ] Test landing page with Nordic theme (light, dark, high-contrast)
- [ ] Test landing page with Sunset theme (light, dark, high-contrast)
- [ ] Verify all animations work correctly
- [ ] Verify all hover states work correctly
- [ ] Take screenshots for all 30 combinations (10 themes × 3 modes)
- [ ] Verify no console errors or warnings
- [ ] Run validation script (if available)

---

## Commands

```bash
# Build Docusaurus
cd packages/design-system/docusaurus && pnpm build

# Start dev server for testing
cd packages/design-system/docusaurus && pnpm dev

# Run validation (if available)
cd packages/design-system/docusaurus && pnpm validate:tokens
```

---

## Justified Exceptions Documentation

If any hardcoded colors must remain (e.g., complex gradients that don't translate well to tokens), document them here:

```markdown
### Exception 1: Ocean Wave Animation
- Location: line X in landing-themes.css
- Reason: Complex multi-stop gradient animation requires precise color control
- Hardcoded values: rgba(8, 145, 178, 0.05), rgba(8, 145, 178, 0.15), etc.
- Approved by: [Name]
- Date: [Date]
```

---

## Reference Documents

- Token Conventions: `packages/design-system/themes/TOKENS_CONVENTIONS.md`
- All Base Theme Files: `packages/design-system/themes/src/*.css`
- Refactored Docusaurus Themes: `packages/design-system/docusaurus/src/css/*-docusaurus.css`

---

## Notes

- This is a complex file affecting all 10 themes
- Each theme section must be tested individually
- Pay special attention to animations and special effects
- Document any justified exceptions clearly
- Estimated time: 2 hours (complex, high-impact file)
- Testing matrix: 10 themes × 3 modes = 30 test scenarios

---

**Created**: 2026-02-10  
**Created By**: BMAD Workflow  
**Last Updated**: 2026-02-10
