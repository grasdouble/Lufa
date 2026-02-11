# Pre-Review Validation Checklist

**Purpose:** This checklist must be completed before marking a theme refactoring story as "ready for review". It ensures quality standards are met and reduces errors caught during code review.

**When to Use:** Complete this checklist after implementing a story (ETR-00X) and before updating story status to "ready for review".

**Owner:** Story implementer (developer)

---

## 1. Code Quality Checks

Verify that all code follows token conventions and CSS best practices:

- [ ] CSS syntax is valid (tokens inside proper selectors)
- [ ] No hardcoded `rgba()` values (except in gradients using tokens)
- [ ] No hardcoded hex colors (except in gradients using tokens)
- [ ] All tokens follow naming conventions from ETR-001
- [ ] RGB variables defined before alpha tokens
- [ ] Glow tokens defined only if theme needs them (cyber/neon aesthetic)

**Common Violations:**

- ❌ `background: rgba(8, 145, 178, 0.05);` → ✅ `background: var(--lufa-alpha-primary-5);`
- ❌ `color: #0891b2;` → ✅ `color: var(--lufa-primary);`
- ❌ Adding glow tokens to Ocean theme → ✅ Glow tokens only for Cyberpunk/Matrix

---

## 2. Consistency Checks

Verify that token definitions match established patterns:

- [ ] Token definitions match ETR-002 template patterns
- [ ] Shadow-xl uses correct spec: `0 12px 24px` (not `0 16px 32px`)
- [ ] RGB naming follows pattern: `--lufa-{color}-rgb` (not `--lufa-rgb-{color}`)
- [ ] All opacity levels present: 3, 5, 8, 10, 15, 20, 30, 40, 50
- [ ] All shadow sizes present: xs, sm, md, lg, xl
- [ ] Overlay tokens include light and dark variants

**Reference Files:**

- Token template: `packages/design-system/themes/src/_token-template.css`
- Conventions: `packages/design-system/themes/TOKENS_CONVENTIONS.md`

**Common Mistakes:**

- ❌ `--lufa-rgb-primary: 8, 145, 178;` → ✅ `--lufa-primary-rgb: 8, 145, 178;`
- ❌ `--lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);` → ✅ `0 12px 24px`
- ❌ Missing opacity 8 level → ✅ Include all 9 levels

---

## 3. Build & Validation

Verify that builds pass and validation scripts report zero violations:

- [ ] Build test passes: `cd packages/design-system/themes && pnpm build`
- [ ] Linting passes: `pnpm lint`
- [ ] Validation script executed (if applicable): `pnpm validate:tokens`
- [ ] No console errors or warnings in browser DevTools

**Commands:**

```bash
# Build themes package
cd packages/design-system/themes
pnpm build

# Build Docusaurus package (if refactoring Docusaurus CSS)
cd packages/design-system/docusaurus
pnpm build

# Run validation script
pnpm validate:tokens

# Validation self-test (verifies script is working)
pnpm validate:tokens --test
```

**Expected Results:**

- ✅ Build completes with no errors
- ✅ Validation reports 0 violations
- ✅ Self-tests pass 13/13 checks

**If Validation Fails:**

1. Fix reported violations
2. Re-run validation
3. Repeat until zero violations
4. Document any justified exceptions in story Dev Notes

---

## 4. Documentation Completeness

Verify that story file is fully updated:

- [ ] Change Log updated with all changes
- [ ] File List includes all modified/created files
- [ ] Dev Notes section completed with technical decisions
- [ ] All task checkboxes marked complete
- [ ] All acceptance criteria checkboxes marked complete

**Story Sections to Complete:**

**Change Log:**

- List each file modified
- Describe what changed
- Note any technical decisions

**File List:**

- Include absolute paths
- Mark each file as modified/created/deleted
- Verify file paths are correct

**Dev Notes:**

- Document why certain approaches were chosen
- Note any challenges encountered
- Explain any deviations from template
- Document justified exceptions (if any)

**Tasks & Acceptance Criteria:**

- Mark all task checkboxes: `- [x]`
- Mark all AC checkboxes: `- [x]`
- Ensure nothing is left incomplete

---

## 5. Testing & Verification

Verify that visual testing has been performed in all color modes:

- [ ] Visual inspection in light mode (no regressions)
- [ ] Visual inspection in dark mode (no regressions)
- [ ] Visual inspection in high-contrast mode (no regressions)
- [ ] Interactive states tested (hover, active, focus)
- [ ] Components to Refactor checklist all marked complete

**How to Test:**

1. Start dev server: `pnpm dev`
2. Open browser to `http://localhost:3000`
3. Switch to your theme using theme selector
4. Test light mode:
   - Toggle theme to light mode
   - Scan pages for visual regressions
   - Hover over interactive elements
   - Check shadows, overlays, glows (if applicable)
5. Test dark mode:
   - Toggle theme to dark mode
   - Repeat visual inspection
6. Test high-contrast mode:
   - Toggle to high-contrast mode
   - Verify readability and contrast

**What to Look For:**

- ✅ Colors render correctly
- ✅ Shadows are visible but subtle
- ✅ Overlays provide proper contrast
- ✅ Glows enhance aesthetic (cyber/neon themes only)
- ✅ Text is readable in all modes
- ✅ No white flashes or jarring transitions

---

## 6. Story Readiness

Verify that story is ready for code review:

- [ ] Story status = "ready for review" (not "in-progress")
- [ ] All implementation tasks completed
- [ ] No TODO comments left in code
- [ ] No debugging code left (console.log, etc.)

**Final Checklist Before Marking Ready:**

1. **All sections above are 100% complete** ✅
2. **Story file is updated** ✅
3. **Code is clean** (no TODOs, no debug code) ✅
4. **Build passes** ✅
5. **Validation passes** (zero violations) ✅
6. **Visual testing complete** (all 3 modes) ✅

**Update Story Status:**

In the story file header, change:

```markdown
**Status:** in-progress
```

To:

```markdown
**Status:** ready for review
```

**Notify Reviewer:**

Ping code reviewer (use fresh context, different LLM session recommended) with:

- Story file path
- Summary of changes
- Any notable technical decisions

---

## Validation Script Integration

This checklist item (3.3) requires running the validation script:

```bash
cd packages/design-system/docusaurus
pnpm validate:tokens
```

Expected output:

```
✅ Token Validation Passed
Total Files: X
Violations Found: 0
```

**If violations are found:**

1. Review each violation carefully
2. Replace hardcoded values with tokens
3. Re-run validation
4. Repeat until clean

**Justified Exceptions:**

Some violations may be acceptable (e.g., complex gradients with multiple color stops). If you cannot use tokens:

1. Document in story Dev Notes
2. Explain why tokens cannot be used
3. Get reviewer approval
4. Note in this checklist: "Justified exceptions documented"

---

## Common Pitfalls (Epic 1 Learnings)

Based on Epic 1 retrospective findings, avoid these common mistakes:

### ❌ RGB Variable Naming

**Wrong:** `--lufa-rgb-primary: 8, 145, 178;`  
**Correct:** `--lufa-primary-rgb: 8, 145, 178;`

### ❌ Shadow-XL Specification

**Wrong:** `--lufa-shadow-xl: 0 16px 32px var(--lufa-shadow-color);`  
**Correct:** `--lufa-shadow-xl: 0 12px 24px var(--lufa-shadow-color);`

### ❌ Glow Tokens on Non-Cyber Themes

**Wrong:** Adding glow tokens to Ocean, Forest, Sunset themes  
**Correct:** Glow tokens ONLY for Cyberpunk, Matrix (cyber/neon aesthetic)

### ❌ Hardcoded Colors in Refactored Files

**Wrong:** `background: rgba(8, 145, 178, 0.05);` in `ocean-docusaurus.css`  
**Correct:** `background: var(--lufa-alpha-primary-5);`

### ❌ Incomplete Testing

**Wrong:** Only testing light mode  
**Correct:** Test all 3 modes (light, dark, high-contrast)

### ❌ Premature "Ready for Review"

**Wrong:** Marking ready before completing checklist  
**Correct:** Complete this checklist 100% before marking ready

---

## References

- **Token Conventions:** `packages/design-system/themes/TOKENS_CONVENTIONS.md`
- **Token Template:** `packages/design-system/themes/src/_token-template.css`
- **Implementation Guide:** `packages/design-system/themes/README.md` (section: Theme Refactoring Implementation Guide)
- **Validation Usage:** `packages/design-system/docusaurus/scripts/README.md`
- **Epic 1 Retrospective:** `_bmad-output/retrospectives/epic-1-retro-2026-02-11.md`

---

## Questions or Issues?

If you encounter issues while completing this checklist:

1. Review Epic 1 stories (ETR-003, ETR-004) for examples
2. Check token conventions document for clarification
3. Run validation script for immediate feedback
4. Consult implementation guide for step-by-step help

---

**✅ Checklist Complete → Mark Story "Ready for Review"**
