# Story ETR-003: Pilot Steampunk Theme - Add Base Tokens

**Story ID**: ETR-003  
**Epic**: ETR-EPIC-001 - Infrastructure & Tokens Foundation  
**Priority**: P0 (Critical - Blocking)  
**Story Points**: 5  
**Estimated Time**: 1.5 hours  
**Type**: Development  
**Status**: Done  
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

- [x] Alpha tokens added for primary (brass) color - all opacity levels
- [x] Alpha tokens added for secondary (patina) color - all opacity levels
- [x] Shadow tokens added with brass/brown shadow color
- [x] Overlay tokens added (light and dark variants)
- [x] Tokens defined for light mode
- [x] Tokens defined for dark mode
- [x] Tokens defined for high-contrast mode
- [x] RGB values extracted from existing primary/secondary colors
- [x] No visual changes to existing Steampunk theme behavior
- [x] File builds successfully

---

## Technical Details

### Color Values
- **Primary (Brass)**: #B87333 = rgb(184, 115, 51)
- **Secondary (Patina)**: #2E8B57 = rgb(46, 139, 87)

### Implementation Example

```css
[data-color-theme='steampunk'][data-mode='light'] {
  /* Existing 31 tokens... */
  
  /* NEW: RGB Variables (ETR-003-DEBT-FIX) */
  --lufa-primary-rgb: 184, 115, 51; /* Brass #B87333 */
  --lufa-secondary-rgb: 46, 139, 87; /* Patina #2E8B57 */
  
  /* NEW: Alpha tokens - Primary (Brass) */
  --lufa-alpha-primary-3: rgba(var(--lufa-primary-rgb), 0.03);
  --lufa-alpha-primary-5: rgba(var(--lufa-primary-rgb), 0.05);
  --lufa-alpha-primary-8: rgba(var(--lufa-primary-rgb), 0.08);
  --lufa-alpha-primary-10: rgba(var(--lufa-primary-rgb), 0.1);
  --lufa-alpha-primary-15: rgba(var(--lufa-primary-rgb), 0.15);
  --lufa-alpha-primary-20: rgba(var(--lufa-primary-rgb), 0.2);
  --lufa-alpha-primary-30: rgba(var(--lufa-primary-rgb), 0.3);
  --lufa-alpha-primary-40: rgba(var(--lufa-primary-rgb), 0.4);
  --lufa-alpha-primary-50: rgba(var(--lufa-primary-rgb), 0.5);
  
  /* NEW: Alpha tokens - Secondary (Patina) */
  --lufa-alpha-secondary-3: rgba(var(--lufa-secondary-rgb), 0.03);
  --lufa-alpha-secondary-5: rgba(var(--lufa-secondary-rgb), 0.05);
  --lufa-alpha-secondary-8: rgba(var(--lufa-secondary-rgb), 0.08);
  --lufa-alpha-secondary-10: rgba(var(--lufa-secondary-rgb), 0.1);
  --lufa-alpha-secondary-15: rgba(var(--lufa-secondary-rgb), 0.15);
  --lufa-alpha-secondary-20: rgba(var(--lufa-secondary-rgb), 0.2);
  --lufa-alpha-secondary-30: rgba(var(--lufa-secondary-rgb), 0.3);
  --lufa-alpha-secondary-40: rgba(var(--lufa-secondary-rgb), 0.4);
  --lufa-alpha-secondary-50: rgba(var(--lufa-secondary-rgb), 0.5);
  
  /* NEW: Shadow tokens */
  --lufa-shadow-color: rgba(139, 69, 19, 0.3);
  --lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
  --lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
  --lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
  --lufa-shadow-xl: 0 12px 24px var(--lufa-shadow-color);
  
  /* NEW: Overlay tokens */
  --lufa-overlay-light-subtle: rgba(255, 255, 255, 0.05);
  --lufa-overlay-light: rgba(255, 255, 255, 0.1);
  --lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);
  --lufa-overlay-dark-subtle: rgba(0, 0, 0, 0.05);
  --lufa-overlay-dark: rgba(0, 0, 0, 0.1);
  --lufa-overlay-dark-strong: rgba(0, 0, 0, 0.3);
  --lufa-overlay-backdrop-light: rgba(0, 0, 0, 0.3);
  --lufa-overlay-backdrop: rgba(0, 0, 0, 0.5);
  --lufa-overlay-backdrop-strong: rgba(0, 0, 0, 0.7);
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
- [x] Build succeeds without errors
- [x] No CSS syntax errors
- [x] Tokens are exported correctly in dist/
- [x] File structure is clean and organized
- [x] Comments are clear and helpful

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

## Tasks/Subtasks

### Task 1: Add Alpha Tokens for Light Mode
- [x] Extract RGB values from existing primary color (#B87333 = rgb(184, 115, 51))
- [x] Extract RGB values from existing secondary color (#2E8B57 = rgb(46, 139, 87))
- [x] Add all 9 alpha opacity levels for primary (3, 5, 8, 10, 15, 20, 30, 40, 50)
- [x] Add all 9 alpha opacity levels for secondary (3, 5, 8, 10, 15, 20, 30, 40, 50)
- [x] Add clear comments to separate new tokens from existing ones

### Task 2: Add Shadow Tokens for Light Mode
- [x] Define shadow color using brass/brown color (rgba(139, 69, 19, 0.3))
- [x] Add all 5 shadow sizes (xs, sm, md, lg, xl)
- [x] Ensure shadows follow convention pattern from TOKENS_CONVENTIONS.md

### Task 3: Add Overlay Tokens for Light Mode
- [x] Add light overlay variants (subtle, default, strong)
- [x] Add dark overlay variants (subtle, default, strong)
- [x] Add backdrop overlay variants (light, default, strong)

### Task 4: Add Alpha Tokens for Dark Mode
- [x] Extract RGB values from dark mode primary color (#CD853F = rgb(205, 133, 63))
- [x] Extract RGB values from dark mode secondary color (#3CB371 = rgb(60, 179, 113))
- [x] Add all 9 alpha opacity levels for primary
- [x] Add all 9 alpha opacity levels for secondary

### Task 5: Add Shadow Tokens for Dark Mode
- [x] Define stronger shadow color for dark mode (rgba(0, 0, 0, 0.5))
- [x] Add all 5 shadow sizes (xs, sm, md, lg, xl)
- [x] Adjust backdrop opacity for dark mode visibility

### Task 6: Add Overlay Tokens for Dark Mode
- [x] Add light overlay variants (subtle, default, strong)
- [x] Add dark overlay variants (subtle, default, strong)
- [x] Add backdrop overlay variants with stronger opacity for dark mode

### Task 7: Add Alpha Tokens for High-Contrast Mode
- [x] Extract RGB values from high-contrast primary color (#FFB347 = rgb(255, 179, 71))
- [x] Extract RGB values from high-contrast secondary color (#00FA9A = rgb(0, 250, 154))
- [x] Add all 9 alpha opacity levels for primary
- [x] Add all 9 alpha opacity levels for secondary

### Task 8: Add Shadow Tokens for High-Contrast Mode
- [x] Define maximum visibility shadow color (rgba(0, 0, 0, 0.8))
- [x] Add all 5 shadow sizes (xs, sm, md, lg, xl)
- [x] Adjust backdrop opacity for maximum contrast

### Task 9: Add Overlay Tokens for High-Contrast Mode
- [x] Add light overlay variants (subtle, default, strong)
- [x] Add dark overlay variants (subtle, default, strong)
- [x] Add backdrop overlay variants with maximum opacity

### Task 10: Build Verification
- [x] Run build command: `cd packages/design-system/themes && pnpm build`
- [x] Verify no CSS syntax errors
- [x] Verify tokens are exported correctly in dist/

---

## Dev Notes

### Project Context
This is the **pilot story** for the Lufa Design System token refactoring initiative. The Steampunk theme serves as the reference implementation that validates the entire token architecture before rolling out to the other 9 themes.

### Technical Requirements
- **Token Format**: CSS Custom Properties (CSS Variables)
- **Color Modes**: Must support light, dark, and high-contrast modes
- **Naming Convention**: Follow TOKENS_CONVENTIONS.md exactly
- **Location**: `packages/design-system/themes/src/steampunk.css`

### Architecture Patterns
From Token Conventions (ETR-001):
- RGB variables define color values once per mode: `--lufa-primary-rgb: R, G, B`
- Alpha tokens reference RGB variables: `rgba(var(--lufa-primary-rgb), opacity)`
- Shadow tokens reference `--lufa-shadow-color` variable
- Overlay tokens use rgba with white/black base
- Standard opacity levels: 3, 5, 8, 10, 15, 20, 30, 40, 50
- Standard shadow sizes: xs, sm, md, lg, xl

### Key Design Decisions
1. **RGB Variables Architecture** ✅ **[DEBT ELIMINATED]**
   - **Final Implementation**: Uses RGB variables as per TOKENS_CONVENTIONS.md specification
   - **Structure**: Each mode defines 2 RGB variables (--lufa-primary-rgb, --lufa-secondary-rgb)
   - **Alpha Tokens**: All 54 alpha tokens now use `rgba(var(--lufa-*-rgb), opacity)` pattern
   - **Maintainability**: Changing primary color now requires 3 edits (1 per mode) instead of 27
   - **Compliance**: 100% aligned with ETR-001 conventions and ETR-002 v1.1.0 templates
   - **Impact**: Sets correct pattern for all 9 remaining themes to follow
2. **Mode-Aware Colors**: Each mode (light/dark/high-contrast) uses different RGB values matching the theme's primary/secondary colors
3. **Shadow Colors**: Light mode uses brass/brown theme-specific shadow, dark/high-contrast use black with varying opacity
4. **Complete Token Set**: All 9 alpha levels × 2 colors + 6 shadow tokens per mode + 9 overlay variants = comprehensive coverage
5. **Template Dependency**: Uses ETR-002 Token Templates v1.1.0 (post-code-review with corrected shadow-xl values)

### Integration Points
- Tokens will be used in Docusaurus theme CSS refactoring (ETR-004)
- Must maintain existing visual appearance (no visual changes)
- Must build successfully and export to dist/

### Testing Strategy
- Build verification: `pnpm build` must succeed
- Visual verification: No changes to existing theme appearance
- Token verification: All tokens exported in dist/steampunk.css

---

## Dev Agent Record

### Implementation Plan

**Approach**: Added alpha, shadow, and overlay tokens to Steampunk theme for all 3 color modes following established conventions.

**Implementation Steps**:
1. Analyzed existing steampunk.css structure and color values
2. Extracted RGB values from primary (#B87333) and secondary (#2E8B57) colors for light mode
3. Added complete alpha token set (9 levels × 2 colors) for light mode
4. Added shadow tokens with brass/brown theme-specific color for light mode
5. Added overlay tokens (9 variants) for light mode
6. Repeated process for dark mode with adjusted RGB values and shadow colors
7. Repeated process for high-contrast mode with maximum visibility colors
8. Verified build succeeds with `pnpm build`
9. Confirmed file structure is clean and tokens are properly organized

**Technical Decisions**:
- **FINAL IMPLEMENTATION**: Uses RGB variables as per TOKENS_CONVENTIONS.md (technical debt eliminated in ETR-003-DEBT-FIX)
- RGB variables defined once per mode (--lufa-primary-rgb, --lufa-secondary-rgb)
- All 54 alpha tokens reference RGB variables via `rgba(var(--lufa-*-rgb), opacity)` pattern
- Dark mode primary uses #CD853F (rgb(205, 133, 63)) - brighter brass for visibility
- Dark mode secondary uses #3CB371 (rgb(60, 179, 113)) - bright patina
- High-contrast primary uses #FFB347 (rgb(255, 179, 71)) - maximum brightness brass
- High-contrast secondary uses #00FA9A (rgb(0, 250, 154)) - maximum brightness patina
- Shadow colors adjust per mode: brass/brown (light), black 0.5 (dark), black 0.8 (high-contrast)
- Backdrop overlays adjust per mode: 0.5 (light), 0.7 (dark), 0.9 (high-contrast)

### Debug Log

No issues encountered during implementation. Build completed successfully on first attempt.

### Completion Notes

✅ **Story ETR-003 Completed Successfully**

**What was implemented**:
- Added 6 RGB variables (2 per mode: --lufa-primary-rgb, --lufa-secondary-rgb)
- Added 54 alpha tokens (9 opacity levels × 2 colors × 3 modes) using var() references
- Added 18 shadow tokens (6 tokens per mode: 1 color + 5 sizes × 3 modes)
- Added 27 overlay tokens (9 variants × 3 modes)
- Total: 105 new design tokens (6 RGB variables + 99 color/shadow/overlay tokens)

**Validation Results**:
- ✅ Build succeeds without errors
- ✅ No CSS syntax errors
- ✅ Tokens exported correctly in dist/steampunk.css
- ✅ File grew from 148 lines to 288 lines (includes RGB variables)
- ✅ All 10 acceptance criteria fully satisfied
- ✅ Clean file structure with clear section comments

**Key Deliverables**:
- `packages/design-system/themes/src/steampunk.css` - Enhanced with 105 new tokens (6 RGB variables + 99 tokens)
- `packages/design-system/themes/dist/steampunk.css` - Build output verified

**Impact**:
- Validates token architecture for all themes (pilot success)
- Establishes reference implementation for stories ETR-006, ETR-008, etc.
- Unblocks ETR-004 (Steampunk Docusaurus refactoring)
- Demonstrates feasibility of token-based theming approach

**Ready for**: ETR-004 can now refactor Docusaurus CSS to use these tokens.

---

## File List

### Files Modified
- `packages/design-system/themes/src/steampunk.css` - Added 105 new design tokens (6 RGB variables + 54 alpha + 18 shadow + 27 overlay) for 3 color modes

### Files Updated (Workflow Automation)
- `_bmad-output/implementation-artifacts/stories/ETR-003-pilot-steampunk-add-base-tokens.md` - Story file self-reference
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint tracking updated

---

## Change Log

- 2026-02-10: Story created
- 2026-02-10: Story implementation completed
  - Added alpha tokens for light mode (18 tokens)
  - Added shadow tokens for light mode (6 tokens)
  - Added overlay tokens for light mode (9 tokens)
  - Added alpha tokens for dark mode (18 tokens)
  - Added shadow tokens for dark mode (6 tokens)
  - Added overlay tokens for dark mode (9 tokens)
  - Added alpha tokens for high-contrast mode (18 tokens)
  - Added shadow tokens for high-contrast mode (6 tokens)
  - Added overlay tokens for high-contrast mode (9 tokens)
  - Build verification passed
  - All 10 tasks completed and validated
  - All 10 acceptance criteria satisfied
  - Status changed to "review"
- 2026-02-10: Code review fixes applied (ETR-003-CR-001)
  - FIXED: Shadow-xl spec violation - corrected from "0 16px 32px" to "0 12px 24px" (TOKENS_CONVENTIONS.md compliance)
  - FIXED: Token count documentation - corrected from 96 to 99 tokens (54 alpha + 18 shadow + 27 overlay)
  - FIXED: File List updated to include workflow automation files (sprint-status.yaml, story file)
  - FIXED: Validation checklist marked complete
  - ENHANCED: Added RGB variables decision rationale to Key Design Decisions
  - ENHANCED: Added ETR-002 v1.1.0 template reference
  - CORRECTED: File line count verified as 276 lines (not 277)
  - Build re-verified successfully with corrected shadow-xl values
  - All 12 code review issues resolved (6 High, 4 Medium, 2 Low)
  - Status changed to "done"
- 2026-02-10: Technical debt eliminated (ETR-003-DEBT-FIX)
  - REFACTORED: Added 6 RGB variables (--lufa-primary-rgb, --lufa-secondary-rgb per mode)
  - REFACTORED: All 54 alpha tokens now use rgba(var(--lufa-*-rgb), opacity) pattern
  - ELIMINATED: Direct RGB hardcoding removed from all alpha token definitions
  - BENEFIT: Color changes now require 3 edits instead of 27 (90% reduction in maintenance burden)
  - COMPLIANCE: Now 100% aligned with TOKENS_CONVENTIONS.md (ETR-001) specification
  - File size increased from 276 to 288 lines (12 lines for RGB variable infrastructure)
  - Build verified successful, no visual changes
  - Architecture now matches ETR-002 v1.1.0 template recommendations
- 2026-02-10: Second code review documentation fixes (ETR-003-CR-002)
  - FIXED: Key Deliverables section updated from "96 tokens" to "105 tokens (6 RGB variables + 99 tokens)"
  - FIXED: Architecture Patterns section updated to reflect RGB variables pattern (not direct RGB values)
  - FIXED: Technical Decisions section updated to reflect final RGB variables implementation
  - FIXED: Implementation Example section updated to show RGB variables pattern with complete example
  - VERIFICATION: Build re-verified successful (all themes copied to dist/)
  - VERIFICATION: Implementation verified - all 54 alpha tokens use rgba(var(--lufa-*-rgb), opacity)
  - VERIFICATION: Shadow-xl verified - all 3 modes use correct spec "0 12px 24px"
  - All 4 documentation inconsistencies resolved
  - Story remains in "done" status - implementation was already correct, only docs needed alignment

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
**Last Updated**: 2026-02-10 (Second code review - documentation alignment completed)  
**Language**: English (technical), French (communication)
