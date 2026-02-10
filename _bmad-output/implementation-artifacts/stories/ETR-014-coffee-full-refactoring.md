# Story ETR-014: Coffee Theme - Full Refactoring

**Story ID**: ETR-014  
**Epic**: ETR-EPIC-004 - Remaining Themes (P3) Refactoring  
**Priority**: P3  
**Story Points**: 3  
**Estimated Time**: 1 hour  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-EPIC-003 (Secondary Themes Refactoring)

---

## Epic Context

**Epic**: Remaining Themes (P3) Refactoring  
**Epic Goal**: Refactor the remaining simpler themes (Coffee, Volcano, Nordic, Sunset) to complete the token migration across all themes.

This story applies the token-based theming pattern to the Coffee theme, characterized by its retro vintage aesthetic with warm coffee brown colors.

---

## User Story

As a developer, I need the Coffee theme fully refactored to use tokens so that the retro vintage aesthetic is maintainable.

---

## Description

Enrich coffee.css with alpha, shadow, and overlay tokens, then refactor coffee-docusaurus.css to use these tokens. The Coffee theme has approximately 15 rgba values that need to be replaced. The theme's distinctive retro vintage aesthetic with warm coffee brown tones must be preserved.

This is a combined story that handles both the base theme enrichment and the Docusaurus CSS refactoring in one go, following the pattern established in previous epics. Coffee is one of the simpler themes with fewer hardcoded values.

---

## Acceptance Criteria

### Base Theme (coffee.css)
- [ ] coffee.css enriched with alpha tokens for coffee brown (#92400E = rgb(146, 64, 14))
- [ ] Shadow tokens for warm vintage shadows
- [ ] Overlay tokens for retro layering
- [ ] Tokens defined for all 3 modes (light, dark, high-contrast)

### Docusaurus Theme (coffee-docusaurus.css)
- [ ] coffee-docusaurus.css fully refactored (~15 replacements)
- [ ] Retro vintage aesthetic preserved
- [ ] Zero hardcoded colors remain
- [ ] Visual testing passed for all modes

---

## Technical Details

### Color Values

- **Primary (Coffee Brown)**: #92400E = rgb(146, 64, 14)
- **Secondary** (if needed): Cream, beige, or darker brown
- **Opacity levels**: 3, 5, 8, 10, 15, 20, 30, 40, 50
- **Shadow sizes**: xs, sm, md, lg, xl

### Part 1: Base Theme Token Structure

Add to `coffee.css`:

```css
[data-color-theme='coffee'][data-mode='light'] {
  /* Existing tokens... */
  
  /* Alpha tokens - Coffee Brown (#92400E) */
  --lufa-alpha-primary-3: rgba(146, 64, 14, 0.03);
  --lufa-alpha-primary-5: rgba(146, 64, 14, 0.05);
  --lufa-alpha-primary-8: rgba(146, 64, 14, 0.08);
  --lufa-alpha-primary-10: rgba(146, 64, 14, 0.1);
  --lufa-alpha-primary-15: rgba(146, 64, 14, 0.15);
  --lufa-alpha-primary-20: rgba(146, 64, 14, 0.2);
  --lufa-alpha-primary-30: rgba(146, 64, 14, 0.3);
  --lufa-alpha-primary-40: rgba(146, 64, 14, 0.4);
  --lufa-alpha-primary-50: rgba(146, 64, 14, 0.5);
  
  /* Shadow tokens - Warm vintage shadows */
  --lufa-shadow-color: rgba(146, 64, 14, 0.25);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);
  
  /* Overlay tokens - Retro layering */
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.2);
  --lufa-overlay-sepia: rgba(146, 64, 14, 0.08);
}

[data-color-theme='coffee'][data-mode='dark'] {
  /* Repeat with appropriate values for dark mode */
  /* Warm shadows maintained for cozy feel */
  --lufa-shadow-color: rgba(146, 64, 14, 0.3);
  /* ... other tokens ... */
}

[data-color-theme='coffee'][data-mode='high-contrast'] {
  /* Repeat with high-contrast appropriate values */
  /* Maintain vintage aesthetic while meeting contrast requirements */
}
```

### Part 2: Docusaurus Theme Refactoring

Replace hardcoded values in `coffee-docusaurus.css`:

```css
/* BEFORE */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(146, 64, 14, 0.3);
  box-shadow: 0 2px 8px rgba(146, 64, 14, 0.2);
}

.menu__link:hover {
  background: rgba(146, 64, 14, 0.1);
  border-left: 2px solid #92400E;
}

.button--primary {
  background: #92400E;
  color: #fff;
  box-shadow: 0 4px 8px rgba(146, 64, 14, 0.3);
}

/* Vintage paper texture */
.main-wrapper {
  background: linear-gradient(
    180deg,
    rgba(146, 64, 14, 0.05) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
}

/* AFTER */
.navbar {
  background: var(--lufa-overlay-light-strong);
  border-bottom: 1px solid var(--lufa-alpha-primary-30);
  box-shadow: var(--lufa-shadow-md);
}

.menu__link:hover {
  background: var(--lufa-alpha-primary-10);
  border-left: 2px solid var(--lufa-color-primary);
}

.button--primary {
  background: var(--lufa-color-primary);
  color: var(--lufa-color-text-inverse);
  box-shadow: var(--lufa-shadow-md);
}

/* Vintage paper texture */
.main-wrapper {
  background: linear-gradient(
    180deg,
    var(--lufa-alpha-primary-5) 0%,
    var(--lufa-overlay-light) 100%
  );
}
```

---

## Components to Refactor

### Navigation
- [ ] `.navbar` - vintage borders, warm shadows
- [ ] `.navbar__link` - retro hover states
- [ ] `.navbar__brand` - coffee brown accents

### Sidebar
- [ ] `.menu` - vintage background
- [ ] `.menu__link` - hover/active states with brown highlights
- [ ] `.menu__link--active` - coffee brown accent
- [ ] `.menu__list` - retro separators

### Content
- [ ] `.main-wrapper` - background with sepia/vintage gradients
- [ ] Headings - coffee brown colors
- [ ] Links - vintage hover transitions
- [ ] Code blocks - retro borders and backgrounds
- [ ] Tables - vintage borders
- [ ] Blockquotes - coffee brown accent border

### Interactive Elements
- [ ] Buttons - coffee brown backgrounds, warm shadows
- [ ] Forms - retro focus states
- [ ] Pagination - vintage styling

### Special Effects
- [ ] Sepia/vintage texture overlays (if present)
- [ ] Warm gradients
- [ ] Paper texture effects (if present)
- [ ] Scrollbar - coffee brown accent
- [ ] Vintage borders and dividers

---

## Special Considerations

1. **Vintage Aesthetic**: The Coffee theme emphasizes retro, warm design
   - Sepia tones and warm colors
   - Soft, nostalgic feel
   - Paper/parchment texture may be present
   - Classic, timeless design

2. **Warm Shadows**: Unlike neutral shadows, these have brown tint
   - Shadows use coffee brown color at lower opacity
   - Creates warm, cozy depth
   - Enhances vintage aesthetic

3. **Light Mode Primary**: Coffee theme works best in light mode
   - Vintage paper/parchment background aesthetic
   - Dark mode should maintain warmth

4. **Sepia Overlays**: May have vintage paper texture or sepia overlays
   ```css
   /* Vintage paper texture */
   background: 
     linear-gradient(var(--lufa-overlay-sepia), var(--lufa-overlay-sepia)),
     url('paper-texture.png');
   ```

5. **Simple Theme**: Coffee is one of the simpler themes
   - Fewer hardcoded values (~15 vs 30-40 in complex themes)
   - Straightforward refactoring
   - Focus on warm, cozy aesthetic

---

## Files to Modify

- `packages/design-system/themes/src/coffee.css`
- `packages/design-system/docusaurus/src/css/coffee-docusaurus.css`

---

## Implementation Steps

### Phase 1: Base Theme Enrichment (20 minutes)

1. Open `coffee.css`
2. Locate existing color definitions for coffee brown
3. Extract RGB values: rgb(146, 64, 14)
4. Add alpha tokens for all opacity levels
5. Add shadow tokens with warm brown-tinted shadows
6. Add overlay tokens including sepia overlay
7. Repeat for all 3 modes (light, dark, high-contrast)
8. Build and verify no errors

### Phase 2: Docusaurus Refactoring (40 minutes)

1. Open `coffee-docusaurus.css`
2. Search for all `rgba(146, 64, 14,` instances
3. Replace with appropriate `--lufa-alpha-primary-X` tokens
4. Search for `#92400E` hex values
5. Replace with `var(--lufa-color-primary)` or alpha tokens
6. Search for brown-tinted shadows
7. Replace with `--lufa-shadow-X` tokens
8. Handle vintage texture overlays (use alpha tokens)
9. Validate no hardcoded colors remain

---

## Testing

### Build Test
```bash
# Build base themes
cd packages/design-system/themes
pnpm build

# Build docusaurus
cd ../docusaurus
pnpm build
```

### Development Test
```bash
cd packages/design-system/docusaurus
pnpm dev
```

### Visual Testing Checklist

#### Light Mode (Primary)
- [ ] Coffee brown clearly visible
- [ ] Vintage, warm aesthetic maintained
- [ ] Warm shadows create cozy depth
- [ ] Sepia overlays preserved (if present)
- [ ] Paper texture effects intact (if present)
- [ ] Overall feel is retro and nostalgic

#### Dark Mode
- [ ] Coffee brown remains visible
- [ ] Theme maintains warmth in dark mode
- [ ] Vintage aesthetic preserved
- [ ] Cozy feel maintained

#### High-Contrast Mode
- [ ] Brown accents clearly visible
- [ ] Sufficient contrast for accessibility
- [ ] Vintage aesthetic maintained where possible

### Component Tests
- [ ] Navbar has vintage styling
- [ ] Menu links have warm hover states
- [ ] Buttons have coffee brown backgrounds
- [ ] Links have smooth transitions
- [ ] Code blocks have retro borders
- [ ] Tables have vintage styling
- [ ] Blockquotes have brown accent borders
- [ ] Scrollbar has brown accent

### Interactive Tests
- [ ] Hover states smooth and warm
- [ ] Focus states clearly visible
- [ ] Active states have appropriate styling
- [ ] Transitions maintain retro feel

### Aesthetic Tests
- [ ] Overall feel is warm and vintage
- [ ] Colors are coffee/sepia toned
- [ ] Shadows have warm brown tint
- [ ] Theme feels cozy and nostalgic
- [ ] Retro aesthetic cohesive throughout

---

## Validation Commands

```bash
# Search for remaining hardcoded Coffee brown
rg "rgba\(146,\s*64,\s*14," packages/design-system/docusaurus/src/css/coffee-docusaurus.css
rg "#92400E" packages/design-system/docusaurus/src/css/coffee-docusaurus.css

# Search for hardcoded shadows (may include brown-tinted)
rg "rgba\(\d+,\s*\d+,\s*\d+," packages/design-system/docusaurus/src/css/coffee-docusaurus.css

# Count token usage
rg "var\(--lufa-" packages/design-system/docusaurus/src/css/coffee-docusaurus.css | wc -l
```

---

## Related Stories

- **Prerequisite**: ETR-EPIC-003 (All P2 themes completed)
- **Reference**: ETR-003, ETR-004 (Steampunk pilot - reference implementation)
- **Parallel**: ETR-015 (Volcano Theme), ETR-016 (Nordic Theme), ETR-017 (Sunset Theme)
- **Epic**: ETR-EPIC-004 (Remaining Themes Refactoring)

---

## Notes

- Coffee theme emphasizes vintage, retro, warm design
- Coffee brown (#92400E) is a warm, rich color
- Warm brown-tinted shadows are key characteristic
- Sepia overlays may be present for vintage paper effect
- This is one of the simpler themes (~15 replacements)
- Estimated time is shorter due to simplicity (1 hour vs 1.5 hours)
- Focus on maintaining the warm, cozy, nostalgic aesthetic

---

## Definition of Done

- [ ] All acceptance criteria checked
- [ ] Base theme enriched with tokens (light, dark, high-contrast)
- [ ] Docusaurus theme fully refactored (~15 replacements)
- [ ] Zero hardcoded colors remain
- [ ] Retro vintage aesthetic perfectly preserved
- [ ] Warm shadows and sepia tones working
- [ ] Build passes successfully
- [ ] Visual tests passed for all modes
- [ ] Aesthetic quality maintained
- [ ] Code reviewed
- [ ] Screenshots captured
- [ ] Ready for Epic 4 continuation
