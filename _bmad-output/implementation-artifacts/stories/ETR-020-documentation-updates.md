# Story ETR-020: Documentation Updates

**Story ID**: ETR-020  
**Epic**: ETR-EPIC-005 - Landing Page & Final Polish  
**Priority**: P2 (Medium)  
**Story Points**: 3  
**Estimated Time**: 1 hour  
**Type**: Documentation  
**Status**: Ready for Development  
**Dependencies**: ETR-019

---

## User Story

As a developer, I need updated documentation so that I understand how to use and maintain the token-based theme system.

---

## Description

Update all relevant documentation to reflect the new token-based approach, including guides, READMEs, and migration notes.

This story ensures that all documentation is current and comprehensive, enabling future developers to understand, use, and extend the token-based theme system effectively.

---

## Acceptance Criteria

- [ ] TOKENS_CONVENTIONS.md finalized with all token patterns
- [ ] Each theme's README updated with token information (if individual READMEs exist)
- [ ] Main design-system README updated
- [ ] Docusaurus package README updated
- [ ] CHANGELOG.md entries created for all packages
- [ ] Migration guide created for external developers (if applicable)
- [ ] Token usage examples documented
- [ ] Special cases documented (gradients, animations)
- [ ] Troubleshooting guide created

---

## Documents to Create/Update

### 1. Token Conventions Document
**File**: `packages/design-system/themes/TOKENS_CONVENTIONS.md`

**Content to Include**:
- [ ] Token naming patterns (alpha, shadow, overlay)
- [ ] Opacity value standards (3, 5, 8, 10, 15, 20, 30, 40, 50)
- [ ] Shadow size definitions (xs, sm, md, lg, xl)
- [ ] Overlay token usage guidelines
- [ ] RGB extraction methodology
- [ ] Examples for each token type
- [ ] When to create new tokens vs. use existing
- [ ] Theme-specific token considerations

**Example Structure**:
```markdown
# Design Token Conventions

## Alpha Tokens
Pattern: `--lufa-alpha-{color}-{opacity}`
...

## Shadow Tokens
Pattern: `--lufa-shadow-{size}`
...

## Overlay Tokens
Pattern: `--lufa-overlay-{tone}-{intensity}`
...
```

---

### 2. Design System README
**File**: `packages/design-system/themes/README.md`

**Sections to Add/Update**:
- [ ] Overview of token-based theming
- [ ] How to use tokens in theme files
- [ ] How to create a new theme using tokens
- [ ] Link to TOKENS_CONVENTIONS.md
- [ ] Examples of token usage
- [ ] Build and development instructions

---

### 3. Docusaurus Package README
**File**: `packages/design-system/docusaurus/README.md`

**Sections to Add/Update**:
- [ ] Overview of Docusaurus theme integration
- [ ] How themes use design tokens
- [ ] How to refactor new components to use tokens
- [ ] Testing procedures for theme changes
- [ ] Validation script usage (if available)
- [ ] Link to theme package documentation

---

### 4. Theme Package CHANGELOG
**File**: `packages/design-system/themes/CHANGELOG.md`

**Entry to Add**:
```markdown
## [2.0.0] - 2026-02-10

### Changed
- **BREAKING**: Refactored all 10 themes to use design tokens
- Added alpha, shadow, and overlay tokens to all base theme files
- Replaced ~265 hardcoded color values with token references

### Added
- Token naming conventions documentation (TOKENS_CONVENTIONS.md)
- Token templates for theme creation (_token-template.css)
- Support for 3 color modes (light, dark, high-contrast) with tokens

### Technical Details
- Steampunk: Added 60+ tokens (ETR-003)
- Ocean: Added 60+ tokens (ETR-006)
- Cyberpunk: Added 70+ tokens including neon effects (ETR-008)
- Matrix: Added 60+ tokens with terminal effects (ETR-011)
- Volt: Added 60+ tokens (ETR-012)
- Forest: Added 60+ tokens (ETR-013)
- Coffee: Added 60+ tokens (ETR-014)
- Volcano: Added 60+ tokens (ETR-015)
- Nordic: Added 60+ tokens (ETR-016)
- Sunset: Added 60+ tokens (ETR-017)

### Improved
- Maintainability: Centralized color management
- Consistency: Standardized token usage patterns
- Scalability: Easy to add new themes or modify existing ones
```

---

### 5. Docusaurus Package CHANGELOG
**File**: `packages/design-system/docusaurus/CHANGELOG.md`

**Entry to Add**:
```markdown
## [2.0.0] - 2026-02-10

### Changed
- **BREAKING**: Refactored all Docusaurus theme CSS files to use design tokens
- Replaced all hardcoded rgba() and hex values with token references

### Added
- Token validation script (validate:tokens) [if created in ETR-005]

### Technical Details
- steampunk-docusaurus.css: ~45 replacements (ETR-004)
- ocean-docusaurus.css: ~60 replacements (ETR-007)
- cyberpunk-docusaurus.css: ~40 replacements (ETR-009)
- matrix-docusaurus.css: ~30 replacements (ETR-011)
- volt-docusaurus.css: ~25 replacements (ETR-012)
- forest-docusaurus.css: ~20 replacements (ETR-013)
- coffee-docusaurus.css: ~15 replacements (ETR-014)
- volcano-docusaurus.css: ~12 replacements (ETR-015)
- nordic-docusaurus.css: ~10 replacements (ETR-016)
- sunset-docusaurus.css: ~8 replacements (ETR-017)
- landing-themes.css: Refactored all 10 theme sections (ETR-018)

### Testing
- Comprehensive testing across 30 theme/mode combinations (ETR-019)
- Zero visual regressions detected
- Performance impact: [insert metrics from ETR-019]
```

---

### 6. Migration Guide (if needed)
**File**: `packages/design-system/MIGRATION_GUIDE.md`

**Content to Include**:
- [ ] Overview of token refactoring
- [ ] Breaking changes (if any to public API)
- [ ] How to update custom themes (if external developers use the system)
- [ ] Before/after examples
- [ ] Common migration issues and solutions
- [ ] FAQ section

**Example Structure**:
```markdown
# Migration Guide: Theme Tokens Refactoring

## Overview
This guide helps you update custom themes to use the new token-based system.

## Breaking Changes
- None to public API
- Custom themes need to add token definitions

## Updating Custom Themes
1. Add alpha tokens to base theme file
2. Add shadow tokens to base theme file
3. Add overlay tokens to base theme file
4. Replace hardcoded colors in Docusaurus theme file

## Examples
[Before/after code examples]

## FAQ
Q: Do I need to update my existing themes?
A: ...
```

---

### 7. Troubleshooting Guide
**File**: `packages/design-system/themes/TROUBLESHOOTING.md`

**Content to Include**:
- [ ] Common issues when using tokens
- [ ] How to debug token resolution
- [ ] Missing token errors and how to fix
- [ ] Visual issues and troubleshooting steps
- [ ] Performance issues related to tokens
- [ ] Browser DevTools tips for inspecting tokens

**Example Issues**:
```markdown
# Troubleshooting Guide

## Issue: Color not applying
**Symptom**: Element shows no color or wrong color
**Cause**: Token not defined for current mode
**Solution**: Ensure token is defined in all 3 modes (light, dark, high-contrast)

## Issue: Console error "CSS variable not defined"
**Symptom**: Browser console shows undefined variable warning
**Cause**: Token referenced but not created in base theme
**Solution**: Add token definition to base theme file

## Issue: Visual regression after token refactoring
...
```

---

## Token Usage Examples

Create comprehensive examples showing:

### Example 1: Using Alpha Tokens
```css
/* Background with 5% opacity */
.element {
  background: var(--lufa-alpha-primary-5);
}

/* Border with 30% opacity */
.element {
  border-color: var(--lufa-alpha-primary-30);
}
```

### Example 2: Using Shadow Tokens
```css
/* Small shadow */
.card {
  box-shadow: var(--lufa-shadow-sm);
}

/* Large shadow for elevated elements */
.modal {
  box-shadow: var(--lufa-shadow-lg);
}
```

### Example 3: Using Overlay Tokens
```css
/* Light overlay for dark backgrounds */
.dark-element::after {
  background: var(--lufa-overlay-light);
}

/* Dark overlay for light backgrounds */
.light-element::after {
  background: var(--lufa-overlay-dark);
}
```

### Example 4: Using Tokens in Gradients
```css
/* Gradient using tokens */
.hero {
  background: linear-gradient(
    135deg,
    var(--lufa-alpha-primary-10) 0%,
    transparent 100%
  );
}
```

---

## Special Cases Documentation

### Gradients with Tokens
Document when and how to use tokens in gradients:
```markdown
## Using Tokens in Gradients

### Simple Gradients
Use alpha tokens for gradient stops:
```css
background: linear-gradient(
  135deg,
  var(--lufa-alpha-primary-20) 0%,
  var(--lufa-alpha-primary-5) 100%
);
```

### Complex Gradients
For multi-stop gradients, combine multiple alpha levels:
```css
background: linear-gradient(
  90deg,
  var(--lufa-alpha-primary-10) 0%,
  var(--lufa-alpha-primary-30) 50%,
  var(--lufa-alpha-primary-10) 100%
);
```
```

### Animations with Tokens
Document how tokens interact with CSS animations:
```markdown
## Tokens in Animations

Tokens work seamlessly with CSS animations and transitions:

```css
.element {
  background: var(--lufa-alpha-primary-10);
  transition: background 0.3s ease;
}

.element:hover {
  background: var(--lufa-alpha-primary-20);
}
```
```

---

## Commands

```bash
# No build commands needed for documentation updates
# Just edit the markdown files

# Verify markdown syntax (optional)
npx markdownlint packages/design-system/**/*.md
```

---

## Review Checklist

- [ ] All new documentation reviewed for accuracy
- [ ] All code examples tested and verified
- [ ] Links between documents work correctly
- [ ] Markdown formatting correct
- [ ] Grammar and spelling checked
- [ ] Technical accuracy verified
- [ ] Examples match actual implementation
- [ ] CHANGELOG entries follow semantic versioning
- [ ] Migration guide tested by another developer (if applicable)

---

## Best Practices to Document

1. **Token Naming**: Always follow conventions
2. **Mode Support**: Always define tokens for all 3 modes
3. **Opacity Levels**: Use standard opacity values
4. **Shadow Sizes**: Use predefined shadow sizes
5. **RGB Extraction**: Show how to convert hex to RGB
6. **Testing**: Always test tokens in all modes
7. **Documentation**: Document any custom tokens

---

## Notes

- Keep documentation concise and practical
- Include many examples - developers learn by example
- Cross-reference related documents
- Keep CHANGELOGs up to date with every change
- Estimated time: 1 hour

---

**Created**: 2026-02-10  
**Created By**: BMAD Workflow  
**Last Updated**: 2026-02-10
