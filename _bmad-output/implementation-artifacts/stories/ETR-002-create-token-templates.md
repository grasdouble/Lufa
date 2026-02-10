# Story ETR-002: Create Token Templates

**Story ID**: ETR-002  
**Epic**: ETR-EPIC-001 - Infrastructure & Tokens Foundation  
**Priority**: P0 (Critical - Blocking)  
**Story Points**: 2  
**Estimated Time**: 45 minutes  
**Type**: Development  
**Status**: Ready for Development  
**Dependencies**: ETR-001

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

As a developer, I need reusable token templates so that I can quickly create consistent token sets for each theme.

---

## Description

Create CSS token templates that can be copy-pasted and customized for each theme's base file.

---

## Acceptance Criteria

- [ ] Alpha token template created with all opacity levels (3, 5, 8, 10, 15, 20, 30, 40, 50)
- [ ] Shadow token template created with all sizes (xs, sm, md, lg, xl)
- [ ] Overlay token template created for light/dark variants
- [ ] Templates include placeholders for RGB values
- [ ] Templates documented with usage instructions
- [ ] Templates cover all 3 modes: light, dark, high-contrast

---

## Technical Details

Create a template file that developers can reference when adding tokens to each theme. The template should include placeholders and comments to guide implementation.

### Template Structure

```css
/* ======================
   ALPHA TOKENS TEMPLATE
   ====================== */
   
/* Alpha tokens - Primary Color (Replace RGB values) */
--lufa-alpha-primary-3: rgba(R, G, B, 0.03);
--lufa-alpha-primary-5: rgba(R, G, B, 0.05);
--lufa-alpha-primary-8: rgba(R, G, B, 0.08);
--lufa-alpha-primary-10: rgba(R, G, B, 0.1);
--lufa-alpha-primary-15: rgba(R, G, B, 0.15);
--lufa-alpha-primary-20: rgba(R, G, B, 0.2);
--lufa-alpha-primary-30: rgba(R, G, B, 0.3);
--lufa-alpha-primary-40: rgba(R, G, B, 0.4);
--lufa-alpha-primary-50: rgba(R, G, B, 0.5);

/* Alpha tokens - Secondary Color (Replace RGB values) */
--lufa-alpha-secondary-5: rgba(R, G, B, 0.05);
--lufa-alpha-secondary-10: rgba(R, G, B, 0.1);
--lufa-alpha-secondary-15: rgba(R, G, B, 0.15);

/* ======================
   SHADOW TOKENS TEMPLATE
   ====================== */
   
/* Shadow tokens (Customize shadow-color for theme) */
--lufa-shadow-color: rgba(R, G, B, 0.3);
--lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
--lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
--lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
--lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
--lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);

/* ======================
   OVERLAY TOKENS TEMPLATE
   ====================== */
   
/* Overlay tokens */
--lufa-overlay-light: rgba(255, 255, 255, 0.1);
--lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
--lufa-overlay-dark: rgba(0, 0, 0, 0.1);
--lufa-overlay-dark-strong: rgba(0, 0, 0, 0.2);
```

---

## Files to Create/Modify

- `packages/design-system/themes/src/_token-template.css` (new, commented template)

---

## Implementation Notes

1. Create the template file with comprehensive comments
2. Include instructions for extracting RGB values from existing hex colors
3. Add usage examples for each token type
4. Document best practices for customization
5. Include notes on mode-specific variations

---

## Testing & Validation

- [ ] Template file created successfully
- [ ] All token types included
- [ ] Placeholders clearly marked
- [ ] Instructions are clear and helpful
- [ ] File is well-commented

---

## Related Stories

- **Depends on**: ETR-001 (Define Token Naming Conventions)
- **Blocks**: ETR-003 (Pilot Steampunk Theme - Add Base Tokens)

---

**Created**: 2026-02-10  
**Last Updated**: 2026-02-10  
**Language**: English (technical), French (communication)
