# Story ETR-013: Forest Theme - Full Refactoring

**Story ID**: ETR-013  
**Epic**: ETR-EPIC-003 - Secondary Themes (P2) Refactoring  
**Priority**: P2  
**Story Points**: 5  
**Estimated Time**: 1.5 hours  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-EPIC-002 (Priority Themes Refactoring)

---

## Epic Context

**Epic**: Secondary Themes (P2) Refactoring  
**Epic Goal**: Refactor the secondary priority themes (Matrix, Volt, Forest) using the established pattern. These themes are moderately complex with unique characteristics.

This story applies the token-based theming pattern to the Forest theme, characterized by its natural organic aesthetic with forest green colors and soft, earthy design.

---

## User Story

As a developer, I need the Forest theme fully refactored to use tokens so that the natural organic aesthetic is maintainable.

---

## Description

Enrich forest.css with alpha, shadow, and overlay tokens, then refactor forest-docusaurus.css to use these tokens. The Forest theme has approximately 20 rgba values that need to be replaced. The theme's distinctive natural aesthetic with forest green colors and soft, organic design must be preserved.

This is a combined story that handles both the base theme enrichment and the Docusaurus CSS refactoring in one go, following the pattern established in Epic 1 and 2.

---

## Acceptance Criteria

### Base Theme (forest.css)
- [ ] forest.css enriched with alpha tokens for forest green (#059669 = rgb(5, 150, 105))
- [ ] Shadow tokens for natural soft shadows
- [ ] Overlay tokens for organic layering
- [ ] Tokens defined for all 3 modes (light, dark, high-contrast)

### Docusaurus Theme (forest-docusaurus.css)
- [ ] forest-docusaurus.css fully refactored (~20 replacements)
- [ ] Natural organic aesthetic preserved
- [ ] Zero hardcoded colors remain
- [ ] Visual testing passed for all modes

---

## Technical Details

### Color Values

- **Primary (Forest Green)**: #059669 = rgb(5, 150, 105)
- **Secondary** (if needed): Earth tones, browns, or deeper greens
- **Opacity levels**: 3, 5, 8, 10, 15, 20, 30, 40, 50
- **Shadow sizes**: xs, sm, md, lg, xl

### Part 1: Base Theme Token Structure

Add to `forest.css`:

```css
[data-color-theme='forest'][data-mode='light'] {
  /* Existing tokens... */
  
  /* Alpha tokens - Forest Green (#059669) */
  --lufa-alpha-primary-3: rgba(5, 150, 105, 0.03);
  --lufa-alpha-primary-5: rgba(5, 150, 105, 0.05);
  --lufa-alpha-primary-8: rgba(5, 150, 105, 0.08);
  --lufa-alpha-primary-10: rgba(5, 150, 105, 0.1);
  --lufa-alpha-primary-15: rgba(5, 150, 105, 0.15);
  --lufa-alpha-primary-20: rgba(5, 150, 105, 0.2);
  --lufa-alpha-primary-30: rgba(5, 150, 105, 0.3);
  --lufa-alpha-primary-40: rgba(5, 150, 105, 0.4);
  --lufa-alpha-primary-50: rgba(5, 150, 105, 0.5);
  
  /* Shadow tokens - Natural soft shadows */
  --lufa-shadow-color: rgba(0, 0, 0, 0.15);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);
  
  /* Organic accent shadow (very subtle green tint) */
  --lufa-shadow-organic: 0 2px 8px rgba(5, 150, 105, 0.1);
  
  /* Overlay tokens - Natural layering */
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.05);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.1);
  --lufa-overlay-nature: rgba(5, 150, 105, 0.05);
}

[data-color-theme='forest'][data-mode='dark'] {
  /* Repeat with appropriate values for dark mode */
  /* Softer shadows for dark mode */
  --lufa-shadow-color: rgba(0, 0, 0, 0.3);
  /* ... other tokens ... */
}

[data-color-theme='forest'][data-mode='high-contrast'] {
  /* Repeat with high-contrast appropriate values */
  /* Maintain natural aesthetic while meeting contrast requirements */
}
```

### Part 2: Docusaurus Theme Refactoring

Replace hardcoded values in `forest-docusaurus.css`:

```css
/* BEFORE */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(5, 150, 105, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu__link:hover {
  background: rgba(5, 150, 105, 0.08);
  border-left: 2px solid #059669;
}

.button--primary {
  background: #059669;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Organic texture overlay */
.main-wrapper {
  background: linear-gradient(
    180deg,
    rgba(5, 150, 105, 0.03) 0%,
    transparent 100%
  );
}

/* AFTER */
.navbar {
  background: var(--lufa-overlay-light-strong);
  border-bottom: 1px solid var(--lufa-alpha-primary-20);
  box-shadow: var(--lufa-shadow-md);
}

.menu__link:hover {
  background: var(--lufa-alpha-primary-8);
  border-left: 2px solid var(--lufa-color-primary);
}

.button--primary {
  background: var(--lufa-color-primary);
  box-shadow: var(--lufa-shadow-md);
}

/* Organic texture overlay */
.main-wrapper {
  background: linear-gradient(
    180deg,
    var(--lufa-alpha-primary-3) 0%,
    transparent 100%
  );
}
```

---

## Components to Refactor

### Navigation
- [ ] `.navbar` - natural borders, soft shadows
- [ ] `.navbar__link` - organic hover transitions
- [ ] `.navbar__brand` - forest green accents

### Sidebar
- [ ] `.menu` - natural background textures
- [ ] `.menu__link` - hover/active states with green highlights
- [ ] `.menu__link--active` - forest green accent
- [ ] `.menu__list` - organic separators

### Content
- [ ] `.main-wrapper` - background with natural gradients
- [ ] Headings - forest green colors
- [ ] Links - natural hover transitions
- [ ] Code blocks - earthy borders and backgrounds
- [ ] Tables - organic borders and subtle highlights
- [ ] Blockquotes - forest green accent border
- [ ] Images - natural framing

### Interactive Elements
- [ ] Buttons - forest green backgrounds, soft shadows
- [ ] Forms - organic focus states
- [ ] Pagination - natural styling
- [ ] Tooltips - soft shadows

### Special Effects
- [ ] Organic texture overlays (if present)
- [ ] Natural gradients
- [ ] Soft rounded corners (organic shapes)
- [ ] Scrollbar - forest green accent
- [ ] Subtle leaf/nature patterns (if present)

---

## Special Considerations

1. **Natural Aesthetic**: The Forest theme emphasizes organic, calming design
   - Soft, gentle colors
   - Rounded corners and organic shapes
   - Subtle shadows (no harsh edges)
   - Earthy, natural feel

2. **Soft Shadows**: Unlike industrial or neon themes
   - Lower opacity shadows (0.1-0.15 instead of 0.3-0.5)
   - Natural depth without harshness
   - Subtle layering effect

3. **Light Mode Primary**: Forest works best in light mode
   - Natural daylight aesthetic
   - Earthy tones on light backgrounds
   - Dark mode should maintain calmness

4. **Organic Overlays**: May have subtle texture or gradient overlays
   ```css
   /* Natural gradient overlay */
   background: linear-gradient(
     180deg,
     var(--lufa-alpha-primary-3) 0%,
     transparent 50%,
     var(--lufa-alpha-primary-5) 100%
   );
   ```

5. **Gentle Interactions**: Hover and focus states should be subtle
   - Soft transitions (300-400ms)
   - Gentle color shifts
   - Avoid jarring changes

---

## Files to Modify

- `packages/design-system/themes/src/forest.css`
- `packages/design-system/docusaurus/src/css/forest-docusaurus.css`

---

## Implementation Steps

### Phase 1: Base Theme Enrichment (30 minutes)

1. Open `forest.css`
2. Locate existing color definitions for forest green
3. Extract RGB values: rgb(5, 150, 105)
4. Add alpha tokens for all opacity levels
5. Add shadow tokens with soft, natural shadows (low opacity)
6. Add shadow-organic for subtle green-tinted shadows (optional)
7. Add overlay tokens including nature overlay
8. Repeat for all 3 modes (light, dark, high-contrast)
9. Build and verify no errors

### Phase 2: Docusaurus Refactoring (1 hour)

1. Open `forest-docusaurus.css`
2. Search for all `rgba(5, 150, 105,` instances
3. Replace with appropriate `--lufa-alpha-primary-X` tokens
4. Search for `#059669` hex values
5. Replace with `var(--lufa-color-primary)` or alpha tokens
6. Search for hardcoded shadows `rgba(0, 0, 0,`
7. Replace with `--lufa-shadow-X` tokens
8. Handle natural gradient overlays (use alpha tokens)
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
- [ ] Forest green clearly visible
- [ ] Natural, calming aesthetic maintained
- [ ] Soft shadows create subtle depth
- [ ] Organic overlays preserved (if present)
- [ ] Rounded corners/organic shapes intact
- [ ] Overall feel is earthy and natural

#### Dark Mode
- [ ] Forest green remains visible
- [ ] Theme maintains calmness in dark mode
- [ ] Shadows appropriate for dark backgrounds
- [ ] Natural aesthetic preserved

#### High-Contrast Mode
- [ ] Green accents clearly visible
- [ ] Sufficient contrast for accessibility
- [ ] Natural aesthetic maintained where possible

### Component Tests
- [ ] Navbar has soft natural styling
- [ ] Menu links have gentle hover states
- [ ] Buttons have forest green backgrounds
- [ ] Links have smooth transitions
- [ ] Code blocks have earthy borders
- [ ] Tables have organic styling
- [ ] Blockquotes have green accent borders
- [ ] Scrollbar has green accent

### Interactive Tests
- [ ] Hover states are smooth and gentle
- [ ] Focus states are clearly visible but not harsh
- [ ] Active states have appropriate styling
- [ ] Transitions are slow and natural (300-400ms)

### Aesthetic Tests
- [ ] Overall feel is calm and natural
- [ ] No harsh edges or jarring transitions
- [ ] Colors are earthy and organic
- [ ] Depth created through subtle shadows
- [ ] Theme feels cohesive and peaceful

---

## Validation Commands

```bash
# Search for remaining hardcoded Forest green
rg "rgba\(5,\s*150,\s*105," packages/design-system/docusaurus/src/css/forest-docusaurus.css
rg "#059669" packages/design-system/docusaurus/src/css/forest-docusaurus.css

# Search for hardcoded shadows
rg "rgba\(0,\s*0,\s*0," packages/design-system/docusaurus/src/css/forest-docusaurus.css

# Count token usage
rg "var\(--lufa-" packages/design-system/docusaurus/src/css/forest-docusaurus.css | wc -l
```

---

## Related Stories

- **Prerequisite**: ETR-EPIC-002 (All P1 themes completed)
- **Reference**: ETR-003, ETR-004 (Steampunk pilot - reference implementation)
- **Parallel**: ETR-011 (Matrix Theme), ETR-012 (Volt Theme)
- **Epic**: ETR-EPIC-003 (Secondary Themes Refactoring)

---

## Notes

- Forest theme emphasizes natural, organic, calming design
- Forest green (#059669) is a medium saturation color - not too bright
- Soft shadows are key characteristic (much softer than other themes)
- Organic shapes and rounded corners enhance natural feel
- This is the simplest P2 theme (~20 replacements vs 25-30 for others)
- Focus on maintaining the peaceful, earthy aesthetic throughout

---

## Definition of Done

- [ ] All acceptance criteria checked
- [ ] Base theme enriched with tokens (light, dark, high-contrast)
- [ ] Docusaurus theme fully refactored (~20 replacements)
- [ ] Zero hardcoded colors remain
- [ ] Natural organic aesthetic perfectly preserved
- [ ] Soft shadows and gentle transitions working
- [ ] Build passes successfully
- [ ] Visual tests passed for all modes
- [ ] Aesthetic quality maintained
- [ ] Code reviewed
- [ ] Screenshots captured
- [ ] Ready for Epic 3 completion
