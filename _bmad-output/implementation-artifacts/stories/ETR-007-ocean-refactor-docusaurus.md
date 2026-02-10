# Story ETR-007: Ocean Theme - Refactor Docusaurus CSS

**Story ID**: ETR-007  
**Epic**: ETR-EPIC-002 - Priority Themes (P0-P1) Refactoring  
**Priority**: P1 (High)  
**Story Points**: 8  
**Estimated Time**: 1.5 hours  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-006

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

As a developer, I need the Ocean Docusaurus theme refactored to use tokens so that it's maintainable and consistent.

---

## Description

Replace all ~60 hardcoded rgba() values in ocean-docusaurus.css with design tokens, following the pattern established in the Steampunk pilot (ETR-004).

---

## Acceptance Criteria

- [ ] All rgba(8, 145, 178, X) replaced with --lufa-alpha-primary-X
- [ ] All rgba(20, 184, 166, X) replaced with --lufa-alpha-secondary-X
- [ ] All shadows replaced with tokens
- [ ] All overlays replaced with tokens
- [ ] Wave animation preserved (can use gradient with tokens or remain hardcoded if justified)
- [ ] Zero hardcoded colors (except justified exceptions)
- [ ] Visual consistency maintained across all modes

---

## Technical Details

### Replacement Mapping

| Hardcoded Value | Token Replacement |
|----------------|-------------------|
| `rgba(8, 145, 178, 0.05)` | `var(--lufa-alpha-primary-5)` |
| `rgba(8, 145, 178, 0.1)` | `var(--lufa-alpha-primary-10)` |
| `rgba(8, 145, 178, 0.15)` | `var(--lufa-alpha-primary-15)` |
| `rgba(8, 145, 178, 0.2)` | `var(--lufa-alpha-primary-20)` |
| `rgba(8, 145, 178, 0.3)` | `var(--lufa-alpha-primary-30)` |
| `rgba(20, 184, 166, 0.05)` | `var(--lufa-alpha-secondary-5)` |
| `rgba(20, 184, 166, 0.1)` | `var(--lufa-alpha-secondary-10)` |
| `0 2px 4px rgba(8, 145, 178, 0.25)` | `var(--lufa-shadow-sm)` |
| `0 4px 8px rgba(8, 145, 178, 0.25)` | `var(--lufa-shadow-md)` |
| `rgba(255, 255, 255, 0.1)` | `var(--lufa-overlay-light)` |
| `rgba(0, 0, 0, 0.1)` | `var(--lufa-overlay-dark)` |

### Before/After Example

```css
/* BEFORE */
.ocean-navbar {
  background: rgba(8, 145, 178, 0.05);
  border-bottom: 1px solid rgba(8, 145, 178, 0.2);
  box-shadow: 0 2px 4px rgba(8, 145, 178, 0.25);
}

.ocean-button:hover {
  background: rgba(20, 184, 166, 0.1);
}

/* AFTER */
.ocean-navbar {
  background: var(--lufa-alpha-primary-5);
  border-bottom: 1px solid var(--lufa-alpha-primary-20);
  box-shadow: var(--lufa-shadow-sm);
}

.ocean-button:hover {
  background: var(--lufa-alpha-secondary-10);
}
```

---

## Files to Modify

- `packages/design-system/docusaurus/src/css/ocean-docusaurus.css`

---

## Implementation Steps

1. Reference the Steampunk refactoring (ETR-004) as a pattern
2. Read the current ocean-docusaurus.css file
3. Identify all hardcoded rgba() values with cyan/teal colors
4. Replace with appropriate alpha tokens
5. Identify all hardcoded shadow values
6. Replace with appropriate shadow tokens
7. Identify all hardcoded overlays
8. Replace with appropriate overlay tokens
9. Handle wave animation (evaluate if special handling needed)
10. Review for any remaining hardcoded colors
11. Test in all 3 color modes

---

## Special Considerations

### Wave Animation
The Ocean theme has animated wave effects in the background. Evaluate the implementation:
- If waves use solid colors or simple transparencies → Use tokens
- If waves use complex gradients → May remain hardcoded with justification
- Document decision and rationale

### Background Patterns
Ocean theme may have water-like background patterns. Ensure these are handled appropriately with tokens or documented as exceptions.

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
- [ ] Wave animation still works correctly
- [ ] All interactive elements functional
- [ ] Screenshot comparison before/after
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
- [ ] No performance degradation
- [ ] Animations run smoothly

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
- Landing page with Ocean theme (all 3 modes)

---

## Estimated Replacements

Approximately **60 replacements**:
- ~35 alpha tokens (primary and secondary)
- ~15 shadow tokens
- ~10 overlay tokens

---

## Related Stories

- **Depends on**: ETR-006 (Ocean Theme - Add Base Tokens)
- **Reference pattern**: ETR-004 (Pilot Steampunk Theme - Refactor Docusaurus CSS)
- **Parallel with**: ETR-009 (Cyberpunk Theme - Refactor Docusaurus CSS)
- **Contributes to**: ETR-010 (Epic 2 - Visual Regression Testing)

---

## Notes

This story applies the proven Steampunk refactoring pattern to the Ocean theme. The approach should be identical to ETR-004, only the specific token names differ.

**Reference**: Use steampunk-docusaurus.css refactoring as a template for this work.

**Important**: Maintain pixel-perfect visual consistency. Pay special attention to wave animations and oceanic aesthetic elements.

---

**Created**: 2026-02-10  
**Last Updated**: 2026-02-10  
**Language**: English (technical), French (communication)
