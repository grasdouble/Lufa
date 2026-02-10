# Story ETR-004: Pilot Steampunk Theme - Refactor Docusaurus CSS

**Story ID**: ETR-004  
**Epic**: ETR-EPIC-001 - Infrastructure & Tokens Foundation  
**Priority**: P0 (Critical - Blocking)  
**Story Points**: 8  
**Estimated Time**: 2 hours  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-003

---

## Epic Context

This story is part of Epic 1: Infrastructure & Tokens Foundation. This is the pilot implementation of refactoring Docusaurus CSS to use the newly created base theme tokens. Success here validates the entire approach.

**Epic Goals**:
1. Define and document token naming conventions
2. Create token templates for alpha, shadow, and overlay tokens
3. Pilot the entire process with Steampunk theme as reference implementation
4. Establish validation and testing procedures

---

## User Story

As a developer, I need the Steampunk Docusaurus theme refactored to use design tokens so that it's easier to maintain and consistent with the design system.

---

## Description

Replace all ~45 hardcoded rgba() and hex color values in steampunk-docusaurus.css with the newly created tokens from the base theme.

---

## Acceptance Criteria

- [ ] All rgba(184, 115, 51, X) replaced with --lufa-alpha-primary-X tokens
- [ ] All rgba(46, 139, 87, X) replaced with --lufa-alpha-secondary-X tokens
- [ ] All hardcoded shadows replaced with --lufa-shadow-{size} tokens
- [ ] All hardcoded overlays replaced with --lufa-overlay-{variant} tokens
- [ ] No remaining hex colors (except in gradients if justified)
- [ ] No remaining direct rgba() values (except in gradients if justified)
- [ ] File validates with no CSS errors
- [ ] Visual appearance identical to before refactoring

---

## Components to Refactor

- [ ] `.main-wrapper` shadows and overlays
- [ ] `.navbar` borders and shadows
- [ ] `.navbar__link:hover` backgrounds
- [ ] `.menu__link` backgrounds and borders
- [ ] `.pagination-nav` styling
- [ ] Code blocks grid patterns and backgrounds
- [ ] Buttons hover/active states
- [ ] Tables borders and backgrounds
- [ ] Footer styling
- [ ] Scrollbar colors

---

## Technical Details

### Before/After Examples

```css
/* BEFORE */
box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);
background: rgba(184, 115, 51, 0.05);
border-color: rgba(184, 115, 51, 0.2);

/* AFTER */
box-shadow: var(--lufa-shadow-md);
background: var(--lufa-alpha-primary-5);
border-color: var(--lufa-alpha-primary-20);
```

### Replacement Mapping

| Hardcoded Value | Token Replacement |
|----------------|-------------------|
| `rgba(184, 115, 51, 0.05)` | `var(--lufa-alpha-primary-5)` |
| `rgba(184, 115, 51, 0.1)` | `var(--lufa-alpha-primary-10)` |
| `rgba(184, 115, 51, 0.2)` | `var(--lufa-alpha-primary-20)` |
| `rgba(46, 139, 87, 0.05)` | `var(--lufa-alpha-secondary-5)` |
| `0 2px 4px rgba(139, 69, 19, 0.3)` | `var(--lufa-shadow-sm)` |
| `0 4px 8px rgba(139, 69, 19, 0.3)` | `var(--lufa-shadow-md)` |
| `rgba(255, 255, 255, 0.1)` | `var(--lufa-overlay-light)` |
| `rgba(0, 0, 0, 0.1)` | `var(--lufa-overlay-dark)` |

---

## Files to Modify

- `packages/design-system/docusaurus/src/css/steampunk-docusaurus.css`

---

## Implementation Steps

1. Read the current steampunk-docusaurus.css file
2. Create a backup or take note of current state
3. Identify all hardcoded rgba() values with brass/patina colors
4. Replace with appropriate alpha tokens
5. Identify all hardcoded shadow values
6. Replace with appropriate shadow tokens
7. Identify all hardcoded overlays
8. Replace with appropriate overlay tokens
9. Review for any remaining hardcoded colors
10. Test in all 3 color modes

---

## Testing & Validation

### Build Test
```bash
cd packages/design-system/docusaurus && pnpm dev
```

### Visual Testing Checklist
- [ ] Test light mode
- [ ] Test dark mode
- [ ] Test high-contrast mode
- [ ] Test all interactive states (hover, active, focus)
- [ ] Compare screenshots before/after
- [ ] Verify navbar styling
- [ ] Verify sidebar styling
- [ ] Verify content area styling
- [ ] Verify footer styling
- [ ] Verify code blocks
- [ ] Verify tables
- [ ] Verify buttons
- [ ] Verify pagination

### Browser Console Check
- [ ] No CSS errors in console
- [ ] No warnings about invalid values
- [ ] All custom properties resolve correctly

---

## Visual Regression Testing

### Process
1. Take screenshots of key pages BEFORE refactoring
2. Complete refactoring
3. Take screenshots AFTER refactoring
4. Compare side-by-side
5. Document any differences
6. Ensure differences are intentional and approved

### Pages to Screenshot
- Homepage (all 3 modes)
- Documentation page (all 3 modes)
- Component showcase (all 3 modes)

---

## Related Stories

- **Depends on**: ETR-003 (Pilot Steampunk Theme - Add Base Tokens)
- **Blocks**: ETR-005 (Create Validation Script)
- **Serves as reference for**: All subsequent Docusaurus CSS refactoring stories

---

## Notes

This is the **pilot refactoring story** - its successful completion validates the entire token usage approach and serves as a reference for all subsequent Docusaurus theme refactoring.

**Important**: Maintain pixel-perfect visual consistency. Any visual differences must be documented and approved before completing this story.

---

**Created**: 2026-02-10  
**Last Updated**: 2026-02-10  
**Language**: English (technical), French (communication)
