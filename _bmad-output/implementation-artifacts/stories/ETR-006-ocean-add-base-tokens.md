# Story ETR-006: Ocean Theme - Add Base Tokens

**Story ID**: ETR-006  
**Epic**: ETR-EPIC-002 - Priority Themes (P0-P1) Refactoring  
**Priority**: P1 (High)  
**Story Points**: 5  
**Estimated Time**: 1 hour  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-003

---

## Epic Context

This story is part of Epic 2: Priority Themes (P0-P1) Refactoring. Following the successful Steampunk pilot, this epic refactors the high-priority themes (Ocean, Cyberpunk) using the established pattern.

**Epic Goals**:
1. Apply the Steampunk pattern to Ocean theme
2. Apply the Steampunk pattern to Cyberpunk theme (with neon effects)
3. Maintain 100% visual consistency
4. Eliminate all hardcoded colors in these themes

---

## User Story

As a developer, I need the Ocean base theme enriched with tokens so that the Ocean Docusaurus theme can use design tokens.

---

## Description

Add alpha, shadow, and overlay tokens to ocean.css for cyan/teal colors across all 3 modes, following the pattern established in the Steampunk pilot.

---

## Acceptance Criteria

- [ ] Alpha tokens for primary (cyan #0891B2 = rgb(8, 145, 178))
- [ ] Alpha tokens for secondary (teal #14B8A6 = rgb(20, 184, 166))
- [ ] Shadow tokens with soft cyan glow for oceanic effect
- [ ] Overlay tokens for wave-like effects
- [ ] Tokens defined for light mode
- [ ] Tokens defined for dark mode
- [ ] Tokens defined for high-contrast mode
- [ ] Shadow color reflects ocean theme (soft cyan)
- [ ] File builds successfully

---

## Technical Details

### Color Values
- **Primary (Cyan)**: #0891B2 = rgb(8, 145, 178)
- **Secondary (Teal)**: #14B8A6 = rgb(20, 184, 166)

### Implementation Example

```css
[data-color-theme='ocean'][data-mode='light'] {
  /* Existing tokens... */
  
  /* NEW: Alpha tokens - Primary (Cyan) */
  --lufa-alpha-primary-3: rgba(8, 145, 178, 0.03);
  --lufa-alpha-primary-5: rgba(8, 145, 178, 0.05);
  --lufa-alpha-primary-8: rgba(8, 145, 178, 0.08);
  --lufa-alpha-primary-10: rgba(8, 145, 178, 0.1);
  --lufa-alpha-primary-15: rgba(8, 145, 178, 0.15);
  --lufa-alpha-primary-20: rgba(8, 145, 178, 0.2);
  --lufa-alpha-primary-30: rgba(8, 145, 178, 0.3);
  --lufa-alpha-primary-40: rgba(8, 145, 178, 0.4);
  --lufa-alpha-primary-50: rgba(8, 145, 178, 0.5);
  
  /* NEW: Alpha tokens - Secondary (Teal) */
  --lufa-alpha-secondary-5: rgba(20, 184, 166, 0.05);
  --lufa-alpha-secondary-10: rgba(20, 184, 166, 0.1);
  --lufa-alpha-secondary-15: rgba(20, 184, 166, 0.15);
  --lufa-alpha-secondary-20: rgba(20, 184, 166, 0.2);
  --lufa-alpha-secondary-30: rgba(20, 184, 166, 0.3);
  
  /* NEW: Shadow tokens - Soft cyan for oceanic effect */
  --lufa-shadow-color: rgba(8, 145, 178, 0.25);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);
  
  /* NEW: Overlay tokens - Wave-like effects */
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.2);
}
```

**Note**: Repeat similar token definitions for `[data-mode='dark']` and `[data-mode='high-contrast']` modes.

---

## Files to Modify

- `packages/design-system/themes/src/ocean.css`

---

## Implementation Steps

1. Reference the Steampunk implementation (ETR-003) as a pattern
2. Read the existing ocean.css file
3. Extract RGB values from existing cyan/teal color definitions
4. Add alpha tokens for light mode using the template
5. Add shadow tokens with cyan-tinted shadow for oceanic effect
6. Add overlay tokens for light mode
7. Repeat steps 4-6 for dark mode
8. Repeat steps 4-6 for high-contrast mode
9. Ensure proper formatting and indentation
10. Add comments to separate new tokens from existing ones

---

## Special Considerations

- Ocean theme uses cyan colors - ensure shadow color has cyan tint for oceanic effect
- Wave animations in the Docusaurus CSS may need special token handling
- Consider slightly different shadow intensities to match water/ocean aesthetic

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
- [ ] Shadow color has appropriate cyan tint
- [ ] All 3 modes have complete token sets

---

## Estimated Token Count

Approximately **60 tokens** (20 per mode × 3 modes):
- 9 alpha-primary tokens × 3 modes = 27
- 5 alpha-secondary tokens × 3 modes = 15
- 6 shadow tokens × 3 modes = 18
- 4 overlay tokens × 3 modes = 12

**Total**: ~72 tokens

---

## Related Stories

- **Depends on**: ETR-003 (Pilot Steampunk Theme - Add Base Tokens)
- **Blocks**: ETR-007 (Ocean Theme - Refactor Docusaurus CSS)
- **Parallel with**: ETR-008 (Cyberpunk Theme - Add Base Tokens)

---

## Notes

This story applies the proven Steampunk pattern to the Ocean theme. Follow the same structure and naming conventions established in ETR-003.

**Reference**: Use steampunk.css as a template - the structure should be identical, only RGB values differ.

---

**Created**: 2026-02-10  
**Last Updated**: 2026-02-10  
**Language**: English (technical), French (communication)
