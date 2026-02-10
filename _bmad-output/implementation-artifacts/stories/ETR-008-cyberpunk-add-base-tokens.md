# Story ETR-008: Cyberpunk Theme - Add Base Tokens

**Story ID**: ETR-008  
**Epic**: ETR-EPIC-002 - Priority Themes (P0-P1) Refactoring  
**Priority**: P1  
**Story Points**: 5  
**Estimated Time**: 1 hour  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-003 (Pilot Steampunk Theme - Add Base Tokens)

---

## Epic Context

**Epic**: Priority Themes (P0-P1) Refactoring  
**Epic Goal**: Refactor the high-priority themes (Ocean, Cyberpunk) following the pattern established in Epic 1. These are the most complex and visible themes that require immediate attention.

This story is part of Epic 2, which focuses on applying the token-based theming pattern established with the Steampunk pilot to the Ocean and Cyberpunk themes.

---

## User Story

As a developer, I need the Cyberpunk base theme enriched with tokens so that neon effects can be properly tokenized.

---

## Description

Add alpha, shadow (with neon glow), and overlay tokens to cyberpunk.css for fuchsia/cyan neon colors. The Cyberpunk theme is characterized by intense neon glow effects that need to be captured in the token system while maintaining the vibrant, futuristic aesthetic.

This story enriches the base theme file with all necessary tokens that will be consumed by the Docusaurus theme implementation in the next story (ETR-009).

---

## Acceptance Criteria

- [ ] Alpha tokens for primary (fuchsia #D946EF = rgb(217, 70, 239))
- [ ] Alpha tokens for secondary (cyan #06B6D4 = rgb(6, 182, 212))
- [ ] Shadow tokens with intense neon glow effect
- [ ] Special neon-glow tokens: --lufa-neon-glow-sm/md/lg
- [ ] Overlay tokens for cyberpunk aesthetic
- [ ] Tokens defined for light, dark, high-contrast modes
- [ ] Shadow colors reflect neon theme (vibrant and intense)
- [ ] File builds successfully

---

## Technical Details

### Token Structure

Add the following token structure to cyberpunk.css for each color mode (light, dark, high-contrast):

```css
[data-color-theme='cyberpunk'][data-mode='dark'] {
  /* Existing tokens... */
  
  /* Alpha tokens - Primary (Fuchsia #D946EF) */
  --lufa-alpha-primary-3: rgba(217, 70, 239, 0.03);
  --lufa-alpha-primary-5: rgba(217, 70, 239, 0.05);
  --lufa-alpha-primary-8: rgba(217, 70, 239, 0.08);
  --lufa-alpha-primary-10: rgba(217, 70, 239, 0.1);
  --lufa-alpha-primary-15: rgba(217, 70, 239, 0.15);
  --lufa-alpha-primary-20: rgba(217, 70, 239, 0.2);
  --lufa-alpha-primary-30: rgba(217, 70, 239, 0.3);
  --lufa-alpha-primary-40: rgba(217, 70, 239, 0.4);
  --lufa-alpha-primary-50: rgba(217, 70, 239, 0.5);
  
  /* Alpha tokens - Secondary (Cyan #06B6D4) */
  --lufa-alpha-secondary-3: rgba(6, 182, 212, 0.03);
  --lufa-alpha-secondary-5: rgba(6, 182, 212, 0.05);
  --lufa-alpha-secondary-8: rgba(6, 182, 212, 0.08);
  --lufa-alpha-secondary-10: rgba(6, 182, 212, 0.1);
  --lufa-alpha-secondary-15: rgba(6, 182, 212, 0.15);
  --lufa-alpha-secondary-20: rgba(6, 182, 212, 0.2);
  --lufa-alpha-secondary-30: rgba(6, 182, 212, 0.3);
  --lufa-alpha-secondary-40: rgba(6, 182, 212, 0.4);
  --lufa-alpha-secondary-50: rgba(6, 182, 212, 0.5);
  
  /* Shadow tokens - Neon glow (0 0 for glow effect instead of offset shadows) */
  --lufa-shadow-color: rgba(217, 70, 239, 0.5);
  --lufa-shadow-xs: 0 0 4px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 0 8px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 0 16px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 0 24px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 0 32px var(--lufa-shadow-color);
  
  /* Special neon glow effects - use currentColor for flexibility */
  --lufa-neon-glow-sm: 0 0 10px currentColor;
  --lufa-neon-glow-md: 0 0 20px currentColor;
  --lufa-neon-glow-lg: 0 0 30px currentColor;
  
  /* Overlay tokens */
  --lufa-overlay-light: rgba(255, 255, 255, 0.05);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.1);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.3);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.5);
}
```

### Color Values

- **Primary (Fuchsia)**: #D946EF = rgb(217, 70, 239)
- **Secondary (Cyan)**: #06B6D4 = rgb(6, 182, 212)
- **Opacity levels**: 3, 5, 8, 10, 15, 20, 30, 40, 50
- **Shadow sizes**: xs, sm, md, lg, xl
- **Neon glow sizes**: sm, md, lg

### Special Considerations

1. **Neon Glow Effect**: Unlike traditional shadows, neon glows use `0 0` for x/y offset with a blur radius to create the glow effect
2. **High Intensity**: Shadow opacity is higher (0.5) to create the intense neon aesthetic
3. **currentColor**: The special neon-glow tokens use `currentColor` to adapt to the text color they're applied to
4. **Dark Mode Primary**: Cyberpunk is primarily a dark-mode theme, ensure dark mode tokens are the most developed

---

## Files to Modify

- `packages/design-system/themes/src/cyberpunk.css`

---

## Implementation Steps

1. Open `packages/design-system/themes/src/cyberpunk.css`
2. Locate the `[data-color-theme='cyberpunk'][data-mode='light']` section
3. Add alpha, shadow, overlay, and neon-glow tokens following the template above
4. Repeat for `[data-mode='dark']` section (primary mode for Cyberpunk)
5. Repeat for `[data-mode='high-contrast']` section
6. Extract RGB values from existing primary/secondary colors in the file
7. Ensure proper formatting and indentation
8. Save the file

---

## Testing

### Build Test
```bash
cd packages/design-system/themes
pnpm build
```

### Validation Checklist
- [ ] No build errors
- [ ] Tokens are exported correctly in dist/
- [ ] All 3 color modes have complete token sets
- [ ] RGB values match existing theme colors
- [ ] Shadow tokens create proper neon glow effect
- [ ] File follows existing formatting conventions

### Visual Test (After Build)
- Tokens will be tested in ETR-009 when applied to Docusaurus theme
- Verify that token values create the expected neon aesthetic

---

## Related Stories

- **Prerequisite**: ETR-003 (Pilot Steampunk Theme - Add Base Tokens)
- **Next**: ETR-009 (Cyberpunk Theme - Refactor Docusaurus CSS)
- **Related**: ETR-006 (Ocean Theme - Add Base Tokens)

---

## Notes

- Follow the token naming conventions established in ETR-001
- Use the token template from ETR-002 as reference
- Maintain consistency with the Steampunk pilot implementation (ETR-003)
- The intense neon glow is a key characteristic of Cyberpunk theme - ensure shadow tokens capture this
- Cyberpunk uses very vibrant, high-saturation colors with strong glows

---

## Definition of Done

- [ ] All acceptance criteria checked
- [ ] Code reviewed
- [ ] Build passes successfully
- [ ] Tokens exported correctly
- [ ] Documentation updated if needed
- [ ] Ready for ETR-009 (Docusaurus CSS refactoring)
