# Story ETR-012: Volt Theme - Full Refactoring

**Story ID**: ETR-012  
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

This story applies the token-based theming pattern to the Volt theme, characterized by its industrial high-visibility aesthetic with electric yellow colors.

---

## User Story

As a developer, I need the Volt theme fully refactored to use tokens so that the industrial high-vis aesthetic is maintainable.

---

## Description

Enrich volt.css with alpha, shadow, and overlay tokens, then refactor volt-docusaurus.css to use these tokens. The Volt theme has approximately 25 rgba values that need to be replaced. The theme's distinctive industrial aesthetic with electric yellow high-visibility elements must be preserved.

This is a combined story that handles both the base theme enrichment and the Docusaurus CSS refactoring in one go, following the pattern established in Epic 1 and 2.

---

## Acceptance Criteria

### Base Theme (volt.css)
- [ ] volt.css enriched with alpha tokens for electric yellow (#FACC15 = rgb(250, 204, 21))
- [ ] Shadow tokens for industrial shadows
- [ ] Overlay tokens for high-visibility elements
- [ ] Tokens defined for all 3 modes (light, dark, high-contrast)

### Docusaurus Theme (volt-docusaurus.css)
- [ ] volt-docusaurus.css fully refactored (~25 replacements)
- [ ] High-vis industrial aesthetic preserved
- [ ] Zero hardcoded colors remain
- [ ] Visual testing passed for all modes

---

## Technical Details

### Color Values

- **Primary (Electric Yellow)**: #FACC15 = rgb(250, 204, 21)
- **Secondary** (if needed): Black or dark gray for contrast
- **Opacity levels**: 3, 5, 8, 10, 15, 20, 30, 40, 50
- **Shadow sizes**: xs, sm, md, lg, xl

### Part 1: Base Theme Token Structure

Add to `volt.css`:

```css
[data-color-theme='volt'][data-mode='light'] {
  /* Existing tokens... */
  
  /* Alpha tokens - Electric Yellow (#FACC15) */
  --lufa-alpha-primary-3: rgba(250, 204, 21, 0.03);
  --lufa-alpha-primary-5: rgba(250, 204, 21, 0.05);
  --lufa-alpha-primary-8: rgba(250, 204, 21, 0.08);
  --lufa-alpha-primary-10: rgba(250, 204, 21, 0.1);
  --lufa-alpha-primary-15: rgba(250, 204, 21, 0.15);
  --lufa-alpha-primary-20: rgba(250, 204, 21, 0.2);
  --lufa-alpha-primary-30: rgba(250, 204, 21, 0.3);
  --lufa-alpha-primary-40: rgba(250, 204, 21, 0.4);
  --lufa-alpha-primary-50: rgba(250, 204, 21, 0.5);
  
  /* Shadow tokens - Industrial (traditional offset shadows) */
  --lufa-shadow-color: rgba(0, 0, 0, 0.25);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);
  
  /* High-vis accent shadows (subtle yellow glow) */
  --lufa-shadow-accent: 0 0 4px rgba(250, 204, 21, 0.3);
  
  /* Overlay tokens - Industrial caution stripes/high-vis */
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.3);
  --lufa-overlay-caution: rgba(250, 204, 21, 0.08);
}

[data-color-theme='volt'][data-mode='dark'] {
  /* Repeat with appropriate values for dark mode */
  /* Yellow remains bright for high-visibility */
  --lufa-shadow-color: rgba(0, 0, 0, 0.4);
  /* ... other tokens ... */
}

[data-color-theme='volt'][data-mode='high-contrast'] {
  /* Repeat with high-contrast appropriate values */
  /* Maximum visibility for accessibility */
}
```

### Part 2: Docusaurus Theme Refactoring

Replace hardcoded values in `volt-docusaurus.css`:

```css
/* BEFORE */
.navbar {
  background: rgba(0, 0, 0, 0.95);
  border-bottom: 3px solid #FACC15;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.button--primary {
  background: #FACC15;
  color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.menu__link:hover {
  background: rgba(250, 204, 21, 0.15);
  border-left: 3px solid #FACC15;
}

/* Caution stripe pattern */
.hero {
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0px,
    rgba(250, 204, 21, 0.1) 10px
  );
}

/* AFTER */
.navbar {
  background: var(--lufa-overlay-dark-strong);
  border-bottom: 3px solid var(--lufa-color-primary);
  box-shadow: var(--lufa-shadow-md);
}

.button--primary {
  background: var(--lufa-color-primary);
  color: var(--lufa-color-text-inverse);
  box-shadow: var(--lufa-shadow-md);
}

.menu__link:hover {
  background: var(--lufa-alpha-primary-15);
  border-left: 3px solid var(--lufa-color-primary);
}

/* Caution stripe pattern */
.hero {
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0px,
    var(--lufa-alpha-primary-10) 10px
  );
}
```

---

## Components to Refactor

### Navigation
- [ ] `.navbar` - industrial borders, shadows
- [ ] `.navbar__link` - high-vis hover states
- [ ] `.navbar__toggle` - caution-style toggle button

### Sidebar
- [ ] `.menu` - industrial background
- [ ] `.menu__link` - hover/active states with high-vis highlights
- [ ] `.menu__link--active` - strong yellow accent

### Content
- [ ] `.main-wrapper` - background with subtle patterns
- [ ] Headings - industrial font styling
- [ ] Links - high-vis hover states
- [ ] Code blocks - industrial borders
- [ ] Tables - strong borders and highlights
- [ ] Blockquotes - caution-style accent border
- [ ] Warning/caution admonitions - yellow backgrounds

### Interactive Elements
- [ ] Buttons - high-vis yellow backgrounds
- [ ] Forms - focus states with yellow accent
- [ ] Pagination - industrial styling

### Special Effects
- [ ] Caution stripe patterns (if present)
- [ ] Industrial borders and dividers
- [ ] High-contrast warning elements
- [ ] Scrollbar - yellow accent

---

## Special Considerations

1. **Industrial Aesthetic**: The Volt theme has a utilitarian, industrial design
   - Strong borders (often 2-3px)
   - High contrast for visibility
   - Clean, functional design
   - Caution/warning patterns may be present

2. **High-Visibility**: Key characteristic of the theme
   - Electric yellow is very bright and visible
   - Used for important elements and accents
   - Strong contrast with black/dark backgrounds
   - Accessibility is a priority

3. **Light Mode Primary**: Unlike Matrix/Cyberpunk, Volt may be primarily light mode
   - Industrial/construction aesthetic works in light
   - Yellow remains highly visible

4. **Caution Stripes**: May have diagonal stripe patterns
   ```css
   /* Caution stripe effect */
   background-image: repeating-linear-gradient(
     45deg,
     transparent 0px,
     var(--lufa-alpha-primary-10) 10px,
     var(--lufa-alpha-primary-10) 20px,
     transparent 20px
   );
   ```

5. **Bold Borders**: Industrial themes often use thicker borders
   - 2-3px borders are common
   - Strong visual separation between sections

---

## Files to Modify

- `packages/design-system/themes/src/volt.css`
- `packages/design-system/docusaurus/src/css/volt-docusaurus.css`

---

## Implementation Steps

### Phase 1: Base Theme Enrichment (30 minutes)

1. Open `volt.css`
2. Locate existing color definitions for electric yellow
3. Extract RGB values: rgb(250, 204, 21)
4. Add alpha tokens for all opacity levels
5. Add shadow tokens with industrial effect (traditional offset)
6. Add shadow-accent for subtle yellow glow (optional)
7. Add overlay tokens including caution overlay
8. Repeat for all 3 modes (light, dark, high-contrast)
9. Build and verify no errors

### Phase 2: Docusaurus Refactoring (1 hour)

1. Open `volt-docusaurus.css`
2. Search for all `rgba(250, 204, 21,` instances
3. Replace with appropriate `--lufa-alpha-primary-X` tokens
4. Search for `#FACC15` hex values
5. Replace with `var(--lufa-color-primary)` or alpha tokens
6. Search for hardcoded black shadows `rgba(0, 0, 0,`
7. Replace with `--lufa-shadow-X` tokens
8. Handle caution stripe patterns (use alpha tokens in gradients)
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
- [ ] Electric yellow highly visible
- [ ] Strong contrast with backgrounds
- [ ] Industrial borders clean and strong
- [ ] High-vis elements stand out
- [ ] Caution patterns preserved (if present)
- [ ] Readability maintained

#### Dark Mode
- [ ] Yellow remains bright and visible
- [ ] Good contrast against dark backgrounds
- [ ] Industrial aesthetic maintained
- [ ] Shadows appropriate for dark mode

#### High-Contrast Mode
- [ ] Maximum visibility for accessibility
- [ ] Yellow accents clearly visible
- [ ] Strong borders maintained
- [ ] Excellent contrast ratios

### Component Tests
- [ ] Navbar has industrial styling
- [ ] Menu links have high-vis hover states
- [ ] Buttons are highly visible (yellow backgrounds)
- [ ] Links have clear hover states
- [ ] Code blocks have industrial borders
- [ ] Tables have strong borders
- [ ] Warning/caution elements use yellow effectively
- [ ] Scrollbar has yellow accent

### Interactive Tests
- [ ] Hover states clearly visible
- [ ] Focus states meet accessibility standards
- [ ] Active states have proper styling
- [ ] Transitions smooth

### Accessibility Tests
- [ ] Color contrast meets WCAG AA standards
- [ ] High-visibility elements clearly distinguishable
- [ ] Focus indicators clearly visible
- [ ] Text readable on all backgrounds

---

## Validation Commands

```bash
# Search for remaining hardcoded Volt yellow
rg "rgba\(250,\s*204,\s*21," packages/design-system/docusaurus/src/css/volt-docusaurus.css
rg "#FACC15" packages/design-system/docusaurus/src/css/volt-docusaurus.css

# Search for hardcoded shadows
rg "rgba\(0,\s*0,\s*0," packages/design-system/docusaurus/src/css/volt-docusaurus.css

# Count token usage
rg "var\(--lufa-" packages/design-system/docusaurus/src/css/volt-docusaurus.css | wc -l
```

---

## Related Stories

- **Prerequisite**: ETR-EPIC-002 (All P1 themes completed)
- **Reference**: ETR-003, ETR-004 (Steampunk pilot - reference implementation)
- **Parallel**: ETR-011 (Matrix Theme), ETR-013 (Forest Theme)
- **Epic**: ETR-EPIC-003 (Secondary Themes Refactoring)

---

## Notes

- Volt theme emphasizes high-visibility and industrial design
- Electric yellow (#FACC15) is very bright - good for accessibility
- Industrial aesthetic uses strong, clean lines and borders
- Caution stripe patterns may be present for visual interest
- This is a moderately complex theme but simpler than neon-glow themes
- Focus on maintaining high contrast and visibility throughout

---

## Definition of Done

- [ ] All acceptance criteria checked
- [ ] Base theme enriched with tokens (light, dark, high-contrast)
- [ ] Docusaurus theme fully refactored (~25 replacements)
- [ ] Zero hardcoded colors remain
- [ ] Industrial high-vis aesthetic perfectly preserved
- [ ] All borders and patterns working
- [ ] Build passes successfully
- [ ] Visual tests passed for all modes
- [ ] Accessibility tests passed
- [ ] Code reviewed
- [ ] Screenshots captured
- [ ] Ready for Epic 3 completion
