# Story ETR-011: Matrix Theme - Full Refactoring

**Story ID**: ETR-011  
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

This story applies the token-based theming pattern to the Matrix theme, characterized by its terminal aesthetic with neon green colors and digital effects.

---

## User Story

As a developer, I need the Matrix theme fully refactored to use tokens so that the terminal aesthetic is maintainable.

---

## Description

Enrich matrix.css with alpha, shadow, and overlay tokens, then refactor matrix-docusaurus.css to use these tokens. The Matrix theme has approximately 30 rgba values that need to be replaced. The theme's distinctive terminal aesthetic with neon green glow effects and scanline patterns must be preserved.

This is a combined story that handles both the base theme enrichment and the Docusaurus CSS refactoring in one go, following the pattern established in Epic 1 and 2.

---

## Acceptance Criteria

### Base Theme (matrix.css)
- [ ] matrix.css enriched with alpha tokens for neon green (#39FF14 = rgb(57, 255, 20))
- [ ] Shadow tokens with terminal glow effect
- [ ] Overlay tokens for digital matrix aesthetic
- [ ] Tokens defined for all 3 modes (light, dark, high-contrast)

### Docusaurus Theme (matrix-docusaurus.css)
- [ ] matrix-docusaurus.css fully refactored (~30 replacements)
- [ ] Terminal aesthetic preserved (scanlines, glow)
- [ ] Zero hardcoded colors remain
- [ ] Visual testing passed for all modes

---

## Technical Details

### Color Values

- **Primary (Neon Green)**: #39FF14 = rgb(57, 255, 20)
- **Secondary** (if needed): Similar green variant or black/dark gray
- **Opacity levels**: 3, 5, 8, 10, 15, 20, 30, 40, 50
- **Shadow sizes**: xs, sm, md, lg, xl

### Part 1: Base Theme Token Structure

Add to `matrix.css`:

```css
[data-color-theme='matrix'][data-mode='dark'] {
  /* Existing tokens... */
  
  /* Alpha tokens - Neon Green (#39FF14) */
  --lufa-alpha-primary-3: rgba(57, 255, 20, 0.03);
  --lufa-alpha-primary-5: rgba(57, 255, 20, 0.05);
  --lufa-alpha-primary-8: rgba(57, 255, 20, 0.08);
  --lufa-alpha-primary-10: rgba(57, 255, 20, 0.1);
  --lufa-alpha-primary-15: rgba(57, 255, 20, 0.15);
  --lufa-alpha-primary-20: rgba(57, 255, 20, 0.2);
  --lufa-alpha-primary-30: rgba(57, 255, 20, 0.3);
  --lufa-alpha-primary-40: rgba(57, 255, 20, 0.4);
  --lufa-alpha-primary-50: rgba(57, 255, 20, 0.5);
  
  /* Shadow tokens - Terminal glow (no offset for glow effect) */
  --lufa-shadow-color: rgba(57, 255, 20, 0.4);
  --lufa-shadow-xs: 0 0 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 0 5px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 0 10px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 0 15px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 0 20px var(--lufa-shadow-color);
  
  /* Terminal-specific glow for text */
  --lufa-terminal-glow-sm: 0 0 5px currentColor;
  --lufa-terminal-glow-md: 0 0 10px currentColor;
  --lufa-terminal-glow-lg: 0 0 15px currentColor;
  
  /* Overlay tokens - Digital aesthetic */
  --lufa-overlay-light: rgba(57, 255, 20, 0.05);
  --lufa-overlay-light-strong: rgba(57, 255, 20, 0.1);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.5);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.7);
  
  /* Scanline effect (if used) */
  --lufa-scanline-overlay: rgba(57, 255, 20, 0.02);
}

[data-color-theme='matrix'][data-mode='light'] {
  /* Repeat with appropriate values for light mode */
  /* Neon green may be darker/less intense in light mode */
}

[data-color-theme='matrix'][data-mode='high-contrast'] {
  /* Repeat with high-contrast appropriate values */
}
```

### Part 2: Docusaurus Theme Refactoring

Replace hardcoded values in `matrix-docusaurus.css`:

```css
/* BEFORE */
.navbar {
  background: rgba(0, 0, 0, 0.9);
  border-bottom: 1px solid rgba(57, 255, 20, 0.3);
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.2);
}

.menu__link:hover {
  background: rgba(57, 255, 20, 0.1);
  color: #39FF14;
  text-shadow: 0 0 8px rgba(57, 255, 20, 0.6);
}

/* Terminal text effect */
.markdown h1 {
  color: #39FF14;
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.8);
}

/* AFTER */
.navbar {
  background: var(--lufa-overlay-dark-strong);
  border-bottom: 1px solid var(--lufa-alpha-primary-30);
  box-shadow: var(--lufa-shadow-md);
}

.menu__link:hover {
  background: var(--lufa-alpha-primary-10);
  color: var(--lufa-color-primary);
  text-shadow: var(--lufa-terminal-glow-sm);
}

/* Terminal text effect */
.markdown h1 {
  color: var(--lufa-color-primary);
  text-shadow: var(--lufa-terminal-glow-md);
}
```

---

## Components to Refactor

### Navigation
- [ ] `.navbar` - background, borders, terminal glow
- [ ] `.navbar__title` - terminal text glow
- [ ] `.navbar__link` - hover states with glow

### Sidebar
- [ ] `.menu` - background with scanline effect
- [ ] `.menu__link` - hover/active states with terminal glow
- [ ] `.menu__list` - separators with green accents

### Content
- [ ] `.main-wrapper` - background (may have scanline overlay)
- [ ] Headings - terminal text glow
- [ ] Links - hover glow effects
- [ ] Code blocks - terminal aesthetic with green glow borders
- [ ] Tables - green borders and highlights
- [ ] Blockquotes - green accent border

### Interactive Elements
- [ ] Buttons - terminal-style with glow
- [ ] Forms - focus states with glow
- [ ] Pagination - green accents

### Special Effects
- [ ] Scanline overlay (if present)
- [ ] Terminal cursor animation (if present)
- [ ] Scrollbar - terminal green
- [ ] Glow effects on interactive elements

---

## Special Considerations

1. **Terminal Aesthetic**: The Matrix theme emulates a terminal/command-line interface
   - Black or very dark backgrounds
   - Bright neon green text and accents
   - Glow effects on text and borders
   - Possible scanline overlay for CRT effect

2. **Glow Effects**: Similar to Cyberpunk but with green instead of fuchsia/cyan
   - Use `0 0` offset for pure glow effect
   - Terminal text should have subtle glow
   - Interactive elements get stronger glow on hover

3. **Dark Mode Primary**: Matrix is primarily a dark theme (like terminal screens)

4. **Scanline Effect**: If present, may use gradient or repeating-linear-gradient
   ```css
   /* If scanlines are present */
   background-image: repeating-linear-gradient(
     0deg,
     transparent 0px,
     var(--lufa-scanline-overlay) 2px
   );
   ```

---

## Files to Modify

- `packages/design-system/themes/src/matrix.css`
- `packages/design-system/docusaurus/src/css/matrix-docusaurus.css`

---

## Implementation Steps

### Phase 1: Base Theme Enrichment (30 minutes)

1. Open `matrix.css`
2. Locate existing color definitions for neon green
3. Extract RGB values: rgb(57, 255, 20)
4. Add alpha tokens for all opacity levels
5. Add shadow tokens with terminal glow effect
6. Add overlay tokens
7. Add special terminal-glow tokens for text effects
8. Repeat for all 3 modes (light, dark, high-contrast)
9. Build and verify no errors

### Phase 2: Docusaurus Refactoring (1 hour)

1. Open `matrix-docusaurus.css`
2. Search for all `rgba(57, 255, 20,` instances
3. Replace with appropriate `--lufa-alpha-primary-X` tokens
4. Search for text-shadow with green glow
5. Replace with `--lufa-terminal-glow-X` tokens
6. Search for box-shadow with green glow
7. Replace with `--lufa-shadow-X` tokens
8. Handle special effects (scanlines, animations)
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

#### Dark Mode (Primary)
- [ ] Terminal green color consistent
- [ ] Text glow effects preserved
- [ ] Border glows working
- [ ] Hover states increase glow
- [ ] Code blocks have terminal aesthetic
- [ ] Scanline effect preserved (if present)
- [ ] Black/dark backgrounds maintained

#### Light Mode
- [ ] Theme still functional (if supported)
- [ ] Green accents visible against light background
- [ ] Glow effects appropriate for light mode

#### High-Contrast Mode
- [ ] Sufficient contrast for accessibility
- [ ] Terminal green still visible
- [ ] Glow effects maintained or adjusted appropriately

### Component Tests
- [ ] Navbar has terminal glow
- [ ] Menu links glow on hover
- [ ] Headings have text glow
- [ ] Code blocks have terminal borders
- [ ] Buttons have terminal styling
- [ ] Links glow on hover
- [ ] Scrollbar has green color
- [ ] Tables have green accents

### Interactive Tests
- [ ] Hover states work correctly
- [ ] Focus states visible
- [ ] Active states have proper styling
- [ ] Transitions smooth

---

## Validation Commands

```bash
# Search for remaining hardcoded Matrix green
rg "rgba\(57,\s*255,\s*20," packages/design-system/docusaurus/src/css/matrix-docusaurus.css
rg "#39FF14" packages/design-system/docusaurus/src/css/matrix-docusaurus.css

# Count token usage
rg "var\(--lufa-" packages/design-system/docusaurus/src/css/matrix-docusaurus.css | wc -l
```

---

## Related Stories

- **Prerequisite**: ETR-EPIC-002 (All P1 themes completed)
- **Reference**: ETR-003, ETR-004 (Steampunk pilot - reference implementation)
- **Reference**: ETR-008, ETR-009 (Cyberpunk - similar glow effects)
- **Parallel**: ETR-012 (Volt Theme), ETR-013 (Forest Theme)

---

## Notes

- Matrix theme is primarily dark mode (terminal aesthetic)
- Neon green (#39FF14) is very bright and distinctive
- Terminal glow effects are similar to Cyberpunk but green
- Scanline overlay may be present for retro CRT effect
- Code blocks should have strong terminal aesthetic
- This is a moderately complex theme due to special effects

---

## Definition of Done

- [ ] All acceptance criteria checked
- [ ] Base theme enriched with tokens (light, dark, high-contrast)
- [ ] Docusaurus theme fully refactored (~30 replacements)
- [ ] Zero hardcoded colors remain
- [ ] Terminal aesthetic perfectly preserved
- [ ] All glow effects working
- [ ] Build passes successfully
- [ ] Visual tests passed for all modes
- [ ] Code reviewed
- [ ] Screenshots captured
- [ ] Ready for Epic 3 completion
