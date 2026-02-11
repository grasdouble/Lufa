# Story ETR-006: Ocean Theme - Add Base Tokens

**Story ID**: ETR-006  
**Epic**: ETR-EPIC-002 - Priority Themes (P0-P1) Refactoring  
**Priority**: P1 (High)  
**Story Points**: 5  
**Estimated Time**: 1 hour  
**Type**: Development  
**Status**: Review  
**Dependencies**: ETR-003

---

## Tasks/Subtasks

- [x] Load steampunk.css as reference pattern
- [x] Read existing ocean.css file
- [x] Extract RGB values for cyan/teal colors
- [x] Add RGB variables for light mode (cyan: 8,145,178 / teal: 20,184,166)
- [x] Add alpha tokens for primary (cyan) - light mode (9 opacity levels)
- [x] Add alpha tokens for secondary (teal) - light mode (9 opacity levels)
- [x] Add shadow tokens with cyan tint for light mode (6 tokens)
- [x] Add overlay tokens for light mode (9 tokens)
- [x] Add RGB variables for dark mode (bright cyan: 34,211,238 / bright teal: 45,212,191)
- [x] Add alpha tokens for primary - dark mode (9 opacity levels)
- [x] Add alpha tokens for secondary - dark mode (9 opacity levels)
- [x] Add shadow tokens for dark mode (6 tokens)
- [x] Add overlay tokens for dark mode (9 tokens)
- [x] Add RGB variables for high-contrast mode (pure cyan: 0,255,255 / pure teal: 0,255,204)
- [x] Add alpha tokens for primary - high-contrast mode (9 opacity levels)
- [x] Add alpha tokens for secondary - high-contrast mode (9 opacity levels)
- [x] Add shadow tokens for high-contrast mode (6 tokens)
- [x] Add overlay tokens for high-contrast mode (9 tokens)
- [x] Verify proper formatting and indentation
- [x] Add ETR-006 comment markers for each mode
- [x] Run build: `pnpm build`
- [x] Validate token conventions
- [x] Validate template structure
- [x] Verify dist/ocean.css generated correctly

---

## Dev Agent Record

### Implementation Plan
Following the proven Steampunk pattern (ETR-003), this implementation adds alpha, shadow, and overlay tokens to the Ocean theme across all three modes (light, dark, high-contrast). The Ocean theme uses cyan and teal colors as primary/secondary, requiring careful RGB value extraction and cyan-tinted shadows for the oceanic aesthetic.

**Approach:**
1. Use steampunk.css as structural template
2. Extract RGB values from existing ocean.css color definitions
3. Apply token pattern consistently across all 3 modes
4. Use cyan-tinted shadows in light mode for oceanic effect
5. Use stronger shadows in dark/high-contrast modes for depth

### Debug Log
- ✅ Successfully loaded steampunk.css reference
- ✅ Identified RGB values: Primary Cyan (8,145,178), Secondary Teal (20,184,166)
- ✅ Added light mode tokens with cyan-tinted shadows (rgba(8,145,178,0.25))
- ✅ Added dark mode tokens with brighter cyan (34,211,238) and teal (45,212,191)
- ✅ Added high-contrast tokens with pure cyan (0,255,255) and teal (0,255,204)
- ✅ Build succeeded on first attempt
- ✅ Token convention validation: PASSED (all 35 checks)
- ✅ Template validation: PASSED (26/26 checks)
- ✅ Verified 27 primary alpha tokens across 3 modes
- ✅ Verified 27 secondary alpha tokens across 3 modes
- ✅ Verified 18 shadow tokens across 3 modes
- ✅ Verified 27 overlay tokens across 3 modes

### Completion Notes
✅ **Implementation Complete**: Ocean theme now has complete token set following Steampunk pattern
- Added 99 new tokens total (33 per mode × 3 modes)
- Alpha tokens: 9 primary + 9 secondary = 18 per mode
- Shadow tokens: 6 per mode (including shadow-color variable)
- Overlay tokens: 9 per mode
- All tokens use RGB variable pattern for consistency
- Shadow colors themed appropriately: cyan-tinted (light), strong black (dark/high-contrast)
- Build validation successful
- Convention validation successful (35/35 checks)
- Template validation successful (26/26 checks)

---

## File List

**Modified Files:**
- `packages/design-system/themes/src/ocean.css` - Added alpha, shadow, overlay tokens for all 3 modes

**Generated Files:**
- `packages/design-system/themes/dist/ocean.css` - Built output with new tokens

---

## Change Log

- **2026-02-11**: Implemented base tokens for Ocean theme following Steampunk pattern (ETR-006)
  - Added alpha tokens for primary (cyan) and secondary (teal) colors
  - Added shadow tokens with cyan-tinted shadows for oceanic effect
  - Added overlay tokens for wave-like effects
  - Implemented across all 3 modes (light, dark, high-contrast)
  - Validated with build, convention, and template checks
  - All acceptance criteria satisfied

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

- [x] Alpha tokens for primary (cyan #0891B2 = rgb(8, 145, 178))
- [x] Alpha tokens for secondary (teal #14B8A6 = rgb(20, 184, 166))
- [x] Shadow tokens with soft cyan glow for oceanic effect
- [x] Overlay tokens for wave-like effects
- [x] Tokens defined for light mode
- [x] Tokens defined for dark mode
- [x] Tokens defined for high-contrast mode
- [x] Shadow color reflects ocean theme (soft cyan)
- [x] File builds successfully

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
- [x] Build succeeds without errors
- [x] No CSS syntax errors
- [x] Tokens are exported correctly in dist/
- [x] File structure is clean and organized
- [x] Comments are clear and helpful
- [x] Shadow color has appropriate cyan tint
- [x] All 3 modes have complete token sets

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
