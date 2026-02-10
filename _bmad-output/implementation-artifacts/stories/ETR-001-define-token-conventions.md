# Story ETR-001: Define Token Naming Conventions

**Story ID**: ETR-001  
**Epic**: ETR-EPIC-001 - Infrastructure & Tokens Foundation  
**Priority**: P0 (Critical - Blocking)  
**Story Points**: 2  
**Estimated Time**: 1 hour  
**Type**: Documentation  
**Status**: Ready for Development  
**Dependencies**: None

---

## Epic Context

This story is part of Epic 1: Infrastructure & Tokens Foundation, which establishes the foundation for token-based theming by creating standardized token structures, conventions, and validation tools. This epic sets up the infrastructure needed for all subsequent theme refactoring work.

**Epic Goals**:
1. Define and document token naming conventions
2. Create token templates for alpha, shadow, and overlay tokens
3. Pilot the entire process with Steampunk theme as reference implementation
4. Establish validation and testing procedures

---

## User Story

As a developer, I need clear and consistent naming conventions for design tokens so that I can easily understand and use them across all themes.

---

## Description

Document the standardized naming patterns for alpha, shadow, and overlay tokens that will be used consistently across all 10 themes.

---

## Acceptance Criteria

- [ ] Alpha token convention documented: `--lufa-alpha-{color}-{opacity}`
- [ ] Shadow token convention documented: `--lufa-shadow-{size}`
- [ ] Overlay token convention documented: `--lufa-overlay-{tone}-{intensity}`
- [ ] Opacity values standardized: 3, 5, 8, 10, 15, 20, 30, 40, 50
- [ ] Shadow sizes defined: xs, sm, md, lg, xl
- [ ] Examples provided for each convention
- [ ] Document created/updated in design-system package

---

## Technical Details

### Token Naming Patterns

```css
/* Alpha tokens */
--lufa-alpha-primary-5: rgba(R, G, B, 0.05);
--lufa-alpha-primary-10: rgba(R, G, B, 0.1);

/* Shadow tokens */
--lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
--lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);

/* Overlay tokens */
--lufa-overlay-light: rgba(255, 255, 255, 0.1);
--lufa-overlay-dark: rgba(0, 0, 0, 0.1);
```

### Opacity Values
Standard opacity levels to be used: 3%, 5%, 8%, 10%, 15%, 20%, 30%, 40%, 50%

### Shadow Sizes
Standard shadow sizes: xs, sm, md, lg, xl

---

## Files to Create/Modify

- `packages/design-system/themes/TOKENS_CONVENTIONS.md` (new)
- `packages/design-system/themes/README.md` (update with token references)

---

## Implementation Notes

1. Create comprehensive TOKENS_CONVENTIONS.md document
2. Include examples for each token type
3. Document the rationale behind naming choices
4. Provide usage guidelines
5. Update README with links to conventions

---

## Testing & Validation

- [ ] Document reviewed by team
- [ ] Naming conventions approved
- [ ] Examples are clear and comprehensive
- [ ] README updated with references

---

## Related Stories

- **Blocks**: ETR-002 (Create Token Templates)
- **Blocks**: ETR-003 (Pilot Steampunk Theme - Add Base Tokens)

---

**Created**: 2026-02-10  
**Last Updated**: 2026-02-10  
**Language**: English (technical), French (communication)
