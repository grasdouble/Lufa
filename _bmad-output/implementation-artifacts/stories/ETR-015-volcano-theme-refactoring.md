# Story ETR-015: Volcano Theme - Full Refactoring

**Story ID**: ETR-015  
**Epic**: ETR-EPIC-004 - Remaining Themes (P3) Refactoring  
**Priority**: P3 (Low)  
**Story Points**: 3  
**Estimated Time**: 1 hour  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-EPIC-003

---

## User Story

As a developer, I need the Volcano theme fully refactored to use tokens so that the intense powerful aesthetic is maintainable.

---

## Description

Enrich volcano.css with tokens and refactor volcano-docusaurus.css (~12 replacements).

The Volcano theme features an intense, powerful aesthetic with lava red colors. This refactoring will replace all hardcoded color values with design tokens from the base theme file, following the established pattern from Epic 1 (Steampunk pilot).

---

## Acceptance Criteria

- [ ] volcano.css enriched with alpha tokens for lava red (#DC2626 = rgb(220, 38, 38))
- [ ] Shadow tokens for fiery intense shadows
- [ ] Overlay tokens for volcanic effects
- [ ] Tokens defined for all 3 modes (light, dark, high-contrast)
- [ ] volcano-docusaurus.css fully refactored (~12 replacements)
- [ ] Intense powerful aesthetic preserved
- [ ] Zero hardcoded colors remain
- [ ] Visual testing passed for all modes

---

## Technical Details

### Base Theme Token Structure

```css
[data-color-theme='volcano'][data-mode='light'] {
  /* Existing tokens... */
  
  /* NEW: Alpha tokens - Lava Red */
  --lufa-alpha-primary-3: rgba(220, 38, 38, 0.03);
  --lufa-alpha-primary-5: rgba(220, 38, 38, 0.05);
  --lufa-alpha-primary-8: rgba(220, 38, 38, 0.08);
  --lufa-alpha-primary-10: rgba(220, 38, 38, 0.1);
  --lufa-alpha-primary-15: rgba(220, 38, 38, 0.15);
  --lufa-alpha-primary-20: rgba(220, 38, 38, 0.2);
  --lufa-alpha-primary-30: rgba(220, 38, 38, 0.3);
  --lufa-alpha-primary-40: rgba(220, 38, 38, 0.4);
  --lufa-alpha-primary-50: rgba(220, 38, 38, 0.5);
  
  /* NEW: Shadow tokens - Fiery intense */
  --lufa-shadow-color: rgba(220, 38, 38, 0.35);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);
  
  /* NEW: Overlay tokens - Volcanic */
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.2);
}

[data-color-theme='volcano'][data-mode='dark'] {
  /* Repeat token structure for dark mode */
}

[data-color-theme='volcano'][data-mode='high-contrast'] {
  /* Repeat token structure for high-contrast mode */
}
```

### Refactoring Examples

```css
/* BEFORE */
.navbar {
  background: rgba(220, 38, 38, 0.05);
  box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
  border-color: rgba(220, 38, 38, 0.3);
}

/* AFTER */
.navbar {
  background: var(--lufa-alpha-primary-5);
  box-shadow: var(--lufa-shadow-sm);
  border-color: var(--lufa-alpha-primary-30);
}
```

---

## Files to Modify

- `packages/design-system/themes/src/volcano.css` - Add base tokens
- `packages/design-system/docusaurus/src/css/volcano-docusaurus.css` - Refactor (~12 replacements)

---

## Testing Checklist

- [ ] Build themes package successfully: `cd packages/design-system/themes && pnpm build`
- [ ] Build docusaurus package successfully: `cd packages/design-system/docusaurus && pnpm build`
- [ ] Start Docusaurus dev server: `cd packages/design-system/docusaurus && pnpm dev`
- [ ] Test light mode visual appearance
- [ ] Test dark mode visual appearance
- [ ] Test high-contrast mode visual appearance
- [ ] Test all interactive elements (hover, active, focus states)
- [ ] Test navbar styling
- [ ] Test sidebar styling
- [ ] Test code blocks
- [ ] Test buttons and links
- [ ] Take screenshots for comparison (before/after)
- [ ] Verify no console errors or warnings
- [ ] Run validation script (if available from ETR-005)

---

## Commands

```bash
# Build themes
cd packages/design-system/themes && pnpm build

# Build Docusaurus
cd packages/design-system/docusaurus && pnpm build

# Start dev server for testing
cd packages/design-system/docusaurus && pnpm dev

# Run validation (if available)
cd packages/design-system/docusaurus && pnpm validate:tokens
```

---

## Reference Documents

- Token Conventions: `packages/design-system/themes/TOKENS_CONVENTIONS.md`
- Token Template: `packages/design-system/themes/src/_token-template.css`
- Steampunk Example: `packages/design-system/themes/src/steampunk.css`

---

## Notes

- Volcano theme has fewer hardcoded values (~12) compared to complex themes
- Focus on maintaining the intense, powerful aesthetic
- Shadow colors should reflect fiery volcanic nature
- Estimated time: 1 hour (simpler P3 theme)

---

**Created**: 2026-02-10  
**Created By**: BMAD Workflow  
**Last Updated**: 2026-02-10
