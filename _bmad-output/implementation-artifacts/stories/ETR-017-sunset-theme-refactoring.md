# Story ETR-017: Sunset Theme - Full Refactoring

**Story ID**: ETR-017  
**Epic**: ETR-EPIC-004 - Remaining Themes (P3) Refactoring  
**Priority**: P3 (Low)  
**Story Points**: 3  
**Estimated Time**: 1 hour  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-EPIC-003

---

## User Story

As a developer, I need the Sunset theme fully refactored to use tokens so that the elegant warm aesthetic is maintainable.

---

## Description

Enrich sunset.css with tokens and refactor sunset-docusaurus.css (~8 replacements).

The Sunset theme features an elegant, warm aesthetic with sunset orange colors. This refactoring will replace all hardcoded color values with design tokens from the base theme file, following the established pattern from Epic 1 (Steampunk pilot).

---

## Acceptance Criteria

- [ ] sunset.css enriched with alpha tokens for sunset orange (#F97316 = rgb(249, 115, 22))
- [ ] Shadow tokens for warm golden shadows
- [ ] Overlay tokens for sunset layering
- [ ] Tokens defined for all 3 modes (light, dark, high-contrast)
- [ ] sunset-docusaurus.css fully refactored (~8 replacements)
- [ ] Elegant warm aesthetic preserved
- [ ] Zero hardcoded colors remain
- [ ] Visual testing passed for all modes

---

## Technical Details

### Base Theme Token Structure

```css
[data-color-theme='sunset'][data-mode='light'] {
  /* Existing tokens... */
  
  /* NEW: Alpha tokens - Sunset Orange */
  --lufa-alpha-primary-3: rgba(249, 115, 22, 0.03);
  --lufa-alpha-primary-5: rgba(249, 115, 22, 0.05);
  --lufa-alpha-primary-8: rgba(249, 115, 22, 0.08);
  --lufa-alpha-primary-10: rgba(249, 115, 22, 0.1);
  --lufa-alpha-primary-15: rgba(249, 115, 22, 0.15);
  --lufa-alpha-primary-20: rgba(249, 115, 22, 0.2);
  --lufa-alpha-primary-30: rgba(249, 115, 22, 0.3);
  --lufa-alpha-primary-40: rgba(249, 115, 22, 0.4);
  --lufa-alpha-primary-50: rgba(249, 115, 22, 0.5);
  
  /* NEW: Shadow tokens - Warm golden */
  --lufa-shadow-color: rgba(249, 115, 22, 0.25);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);
  
  /* NEW: Overlay tokens - Sunset */
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.2);
}

[data-color-theme='sunset'][data-mode='dark'] {
  /* Repeat token structure for dark mode */
}

[data-color-theme='sunset'][data-mode='high-contrast'] {
  /* Repeat token structure for high-contrast mode */
}
```

### Refactoring Examples

```css
/* BEFORE */
.navbar {
  background: rgba(249, 115, 22, 0.05);
  box-shadow: 0 2px 4px rgba(249, 115, 22, 0.2);
  border-color: rgba(249, 115, 22, 0.3);
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

- `packages/design-system/themes/src/sunset.css` - Add base tokens
- `packages/design-system/docusaurus/src/css/sunset-docusaurus.css` - Refactor (~8 replacements)

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

- Sunset theme has the fewest hardcoded values (~8) - simplest P3 theme
- Focus on maintaining the elegant, warm aesthetic
- Shadow colors should have warm golden tones
- Estimated time: 1 hour (simplest P3 theme)

---

**Created**: 2026-02-10  
**Created By**: BMAD Workflow  
**Last Updated**: 2026-02-10
