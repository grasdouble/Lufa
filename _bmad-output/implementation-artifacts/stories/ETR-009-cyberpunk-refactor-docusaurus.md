# Story ETR-009: Cyberpunk Theme - Refactor Docusaurus CSS

**Story ID**: ETR-009  
**Epic**: ETR-EPIC-002 - Priority Themes (P0-P1) Refactoring  
**Priority**: P1  
**Story Points**: 8  
**Estimated Time**: 1.5 hours  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-008 (Cyberpunk Theme - Add Base Tokens)

---

## Epic Context

**Epic**: Priority Themes (P0-P1) Refactoring  
**Epic Goal**: Refactor the high-priority themes (Ocean, Cyberpunk) following the pattern established in Epic 1. These are the most complex and visible themes that require immediate attention.

This story completes the Cyberpunk theme refactoring by applying the tokens created in ETR-008 to the Docusaurus theme CSS file.

---

## User Story

As a developer, I need the Cyberpunk Docusaurus theme refactored to use tokens so that neon effects are maintainable.

---

## Description

Replace all ~40 hardcoded rgba() values in cyberpunk-docusaurus.css with design tokens created in ETR-008, paying special attention to neon glow effects. The Cyberpunk theme is characterized by intense neon glows on text, borders, and interactive elements that must be preserved during the refactoring.

---

## Acceptance Criteria

- [ ] All rgba(217, 70, 239, X) replaced with --lufa-alpha-primary-X
- [ ] All rgba(6, 182, 212, X) replaced with --lufa-alpha-secondary-X
- [ ] All neon glow shadows replaced with tokens
- [ ] Text glow effects use neon-glow tokens
- [ ] Border glows use appropriate tokens
- [ ] Zero hardcoded colors remain
- [ ] Neon aesthetic preserved across all modes

---

## Technical Details

### Before/After Examples

```css
/* BEFORE */
.navbar__title {
  text-shadow: 0 0 20px rgba(217, 70, 239, 0.8);
}

.menu__link:hover {
  background: rgba(217, 70, 239, 0.1);
  border-color: rgba(217, 70, 239, 0.5);
  box-shadow: 0 0 15px rgba(217, 70, 239, 0.4);
}

.button--primary {
  background: rgba(217, 70, 239, 0.2);
  box-shadow: 0 0 10px rgba(217, 70, 239, 0.6);
}

/* AFTER */
.navbar__title {
  text-shadow: var(--lufa-neon-glow-md);
}

.menu__link:hover {
  background: var(--lufa-alpha-primary-10);
  border-color: var(--lufa-alpha-primary-50);
  box-shadow: var(--lufa-shadow-md);
}

.button--primary {
  background: var(--lufa-alpha-primary-20);
  box-shadow: var(--lufa-shadow-sm);
}
```

### Token Mapping Guide

| Hardcoded Value | Token Replacement |
|----------------|-------------------|
| `rgba(217, 70, 239, 0.05)` | `var(--lufa-alpha-primary-5)` |
| `rgba(217, 70, 239, 0.1)` | `var(--lufa-alpha-primary-10)` |
| `rgba(217, 70, 239, 0.2)` | `var(--lufa-alpha-primary-20)` |
| `rgba(6, 182, 212, 0.1)` | `var(--lufa-alpha-secondary-10)` |
| `0 0 10px rgba(217, 70, 239, X)` | `var(--lufa-shadow-sm)` |
| `0 0 20px rgba(217, 70, 239, X)` | `var(--lufa-shadow-md)` |
| Text glow effects | `var(--lufa-neon-glow-sm/md/lg)` |

---

## Components to Refactor

Systematic checklist of components to update:

### Navigation
- [ ] `.navbar` - borders and background glows
- [ ] `.navbar__title` - text neon glow
- [ ] `.navbar__link` - hover states with glow
- [ ] `.navbar__link--active` - active state glow

### Sidebar
- [ ] `.menu` - background and borders
- [ ] `.menu__link` - hover/active states with neon effects
- [ ] `.menu__link--active` - active glow borders
- [ ] `.menu__list` - section separators

### Content
- [ ] `.main-wrapper` - background overlays
- [ ] Headings (h1, h2, h3) - text glow effects
- [ ] Links - hover glow effects
- [ ] Code blocks - border glows and backgrounds
- [ ] Tables - border glows and row highlights
- [ ] Blockquotes - border accent glows

### Interactive Elements
- [ ] `.button--primary` - background and glow
- [ ] `.button--secondary` - background and glow
- [ ] `.button:hover` - hover glow intensification
- [ ] `.pagination-nav` - borders and glows
- [ ] Form inputs - focus glow states

### Special Effects
- [ ] Scrollbar - track and thumb glows
- [ ] Search - focus glow effects
- [ ] TOC - active item glow
- [ ] Footer - subtle background glows
- [ ] Dividers - neon accent lines

---

## Special Considerations

1. **Multiple Layered Glows**: Some Cyberpunk elements use multiple shadow layers for intense effects
   ```css
   /* May need to combine multiple tokens */
   box-shadow: var(--lufa-shadow-sm), var(--lufa-shadow-md);
   ```

2. **Text Glows**: Use the special `--lufa-neon-glow-*` tokens for text-shadow effects
   ```css
   text-shadow: var(--lufa-neon-glow-md);
   ```

3. **Gradients**: If gradients use color stops, update them to use alpha tokens
   ```css
   /* Before */
   background: linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(6, 182, 212, 0.1));
   
   /* After */
   background: linear-gradient(135deg, var(--lufa-alpha-primary-20), var(--lufa-alpha-secondary-10));
   ```

4. **Animation Effects**: Ensure animated glows maintain their intensity
   ```css
   @keyframes neonPulse {
     0%, 100% { box-shadow: var(--lufa-shadow-md); }
     50% { box-shadow: var(--lufa-shadow-lg); }
   }
   ```

---

## Files to Modify

- `packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css`

---

## Implementation Steps

1. **Preparation**
   - Open cyberpunk-docusaurus.css
   - Take note of all rgba(217, 70, 239, X) values
   - Take note of all rgba(6, 182, 212, X) values
   - Take note of all shadow/glow effects

2. **Systematic Replacement**
   - Replace fuchsia alpha values with --lufa-alpha-primary-X
   - Replace cyan alpha values with --lufa-alpha-secondary-X
   - Replace neon glow shadows with --lufa-shadow-X
   - Replace text glows with --lufa-neon-glow-X
   - Replace overlays with --lufa-overlay-X

3. **Special Cases**
   - Handle multi-layered shadows
   - Update gradient color stops
   - Preserve animation keyframes with tokens

4. **Validation**
   - Search for remaining rgba( in file
   - Search for remaining # hex colors
   - Check for any hardcoded colors

---

## Testing

### Build Test
```bash
cd packages/design-system/docusaurus
pnpm build
```

### Development Server Test
```bash
cd packages/design-system/docusaurus
pnpm dev
```

### Testing Checklist

#### Visual Tests
- [ ] **Light mode** (if applicable) - verify neon effects work
- [ ] **Dark mode** (primary mode) - verify all neon glows preserved
- [ ] **High-contrast mode** - verify accessibility maintained

#### Component Tests
- [ ] Navbar title has proper neon glow
- [ ] Menu links glow on hover
- [ ] Buttons have proper neon backgrounds and glows
- [ ] Headings have text glow effects
- [ ] Code blocks have border glows
- [ ] Links glow on hover
- [ ] Interactive elements respond with glow changes
- [ ] Scrollbar has subtle glow
- [ ] Footer elements have appropriate glows

#### Interactive State Tests
- [ ] Hover states increase glow intensity
- [ ] Active/focus states show proper glow
- [ ] Transitions between states are smooth
- [ ] Animations continue working (if any)

#### Comparison Tests
- [ ] Take screenshots before refactoring
- [ ] Take screenshots after refactoring
- [ ] Compare side-by-side for visual regressions
- [ ] Ensure neon aesthetic is identical

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari

---

## Validation Commands

```bash
# Search for remaining hardcoded colors
rg "rgba\(\d+,\s*\d+,\s*\d+," packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css

# Search for hex colors
rg "#[0-9a-fA-F]{3,6}" packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css

# Count token usage (should be high)
rg "var\(--lufa-" packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css | wc -l
```

---

## Related Stories

- **Prerequisite**: ETR-008 (Cyberpunk Theme - Add Base Tokens)
- **Related**: ETR-004 (Pilot Steampunk Theme - Refactor Docusaurus CSS) - reference implementation
- **Related**: ETR-007 (Ocean Theme - Refactor Docusaurus CSS) - parallel story
- **Next**: ETR-010 (Epic 2 - Visual Regression Testing)

---

## Notes

- Cyberpunk is primarily a dark-mode theme with intense neon effects
- The glow effects are a key characteristic - must be preserved exactly
- Multiple layered shadows may be needed for most intense glows
- Use `--lufa-neon-glow-*` tokens specifically for text-shadow effects
- Some elements may need both box-shadow and text-shadow for full effect

---

## Definition of Done

- [ ] All acceptance criteria checked
- [ ] Zero hardcoded rgba/hex colors remain (except justified exceptions)
- [ ] All components visually tested
- [ ] All interactive states tested
- [ ] Screenshots captured for comparison
- [ ] Code reviewed
- [ ] Build passes successfully
- [ ] No console errors
- [ ] Neon aesthetic perfectly preserved
- [ ] Ready for visual regression testing (ETR-010)
