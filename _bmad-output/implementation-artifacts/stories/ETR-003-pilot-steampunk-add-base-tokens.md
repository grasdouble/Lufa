# Story ETR-003: Pilot Steampunk Theme - Add Base Tokens

**Story ID**: ETR-003  
**Epic**: ETR-EPIC-001 - Infrastructure & Tokens Foundation  
**Priority**: P0 (Critical - Blocking)  
**Story Points**: 5  
**Estimated Time**: 1.5 hours  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-001, ETR-002

---

## Epic Context

This story is part of Epic 1: Infrastructure & Tokens Foundation, which establishes the foundation for token-based theming by creating standardized token structures, conventions, and validation tools. This is the pilot implementation that will serve as a reference for all other themes.

**Epic Goals**:
1. Define and document token naming conventions
2. Create token templates for alpha, shadow, and overlay tokens
3. Pilot the entire process with Steampunk theme as reference implementation
4. Establish validation and testing procedures

---

## User Story

As a developer, I need the Steampunk base theme enriched with alpha/shadow/overlay tokens so that the Docusaurus theme can use design tokens instead of hardcoded values.

---

## Description

Enrich the Steampunk base theme file with all necessary alpha, shadow, and overlay tokens for all 3 color modes. This serves as the pilot implementation for all other themes.

---

## Acceptance Criteria

- [ ] Alpha tokens added for primary (brass) color - all opacity levels
- [ ] Alpha tokens added for secondary (patina) color - all opacity levels
- [ ] Shadow tokens added with brass/brown shadow color
- [ ] Overlay tokens added (light and dark variants)
- [ ] Tokens defined for light mode
- [ ] Tokens defined for dark mode
- [ ] Tokens defined for high-contrast mode
- [ ] RGB values extracted from existing primary/secondary colors
- [ ] No visual changes to existing Steampunk theme behavior
- [ ] File builds successfully

---

## Technical Details

### Color Values
- **Primary (Brass)**: #B87333 = rgb(184, 115, 51)
- **Secondary (Patina)**: #2E8B57 = rgb(46, 139, 87)

### Implementation Example

```css
[data-color-theme='steampunk'][data-mode='light'] {
  /* Existing 31 tokens... */
  
  /* NEW: Alpha tokens - Primary (Brass #B87333 = rgb(184, 115, 51)) */
  --lufa-alpha-primary-3: rgba(184, 115, 51, 0.03);
  --lufa-alpha-primary-5: rgba(184, 115, 51, 0.05);
  --lufa-alpha-primary-8: rgba(184, 115, 51, 0.08);
  --lufa-alpha-primary-10: rgba(184, 115, 51, 0.1);
  --lufa-alpha-primary-15: rgba(184, 115, 51, 0.15);
  --lufa-alpha-primary-20: rgba(184, 115, 51, 0.2);
  --lufa-alpha-primary-30: rgba(184, 115, 51, 0.3);
  --lufa-alpha-primary-40: rgba(184, 115, 51, 0.4);
  --lufa-alpha-primary-50: rgba(184, 115, 51, 0.5);
  
  /* NEW: Alpha tokens - Secondary (Patina #2E8B57 = rgb(46, 139, 87)) */
  --lufa-alpha-secondary-5: rgba(46, 139, 87, 0.05);
  --lufa-alpha-secondary-10: rgba(46, 139, 87, 0.1);
  --lufa-alpha-secondary-15: rgba(46, 139, 87, 0.15);
  
  /* NEW: Shadow tokens */
  --lufa-shadow-color: rgba(139, 69, 19, 0.3);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);
  
  /* NEW: Overlay tokens */
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.2);
}
```

**Note**: Repeat similar token definitions for `[data-mode='dark']` and `[data-mode='high-contrast']` modes.

---

## Files to Modify

- `packages/design-system/themes/src/steampunk.css`

---

## Implementation Steps

1. Read the existing steampunk.css file
2. Extract RGB values from existing primary/secondary color definitions
3. Add alpha tokens for light mode using the template
4. Add shadow tokens for light mode
5. Add overlay tokens for light mode
6. Repeat steps 3-5 for dark mode
7. Repeat steps 3-5 for high-contrast mode
8. Ensure proper formatting and indentation
9. Add comments to separate new tokens from existing ones

---

## Testing & Validation

### Build Test
```bash
cd packages/design-system/themes && pnpm build
```

### Validation Checklist
- [ ] Build succeeds without errors
- [ ] No CSS syntax errors
- [ ] Tokens are exported correctly in dist/
- [ ] File structure is clean and organized
- [ ] Comments are clear and helpful

---

## Related Stories

- **Depends on**: ETR-001 (Define Token Naming Conventions)
- **Depends on**: ETR-002 (Create Token Templates)
- **Blocks**: ETR-004 (Pilot Steampunk Theme - Refactor Docusaurus CSS)
- **Blocks**: ETR-006 (Ocean Theme - Add Base Tokens)
- **Blocks**: ETR-008 (Cyberpunk Theme - Add Base Tokens)

---

## Notes

This is the **pilot story** - its successful completion validates the entire approach and serves as a reference for all subsequent theme token additions.

---

**Created**: 2026-02-10  
**Last Updated**: 2026-02-10  
**Language**: English (technical), French (communication)
