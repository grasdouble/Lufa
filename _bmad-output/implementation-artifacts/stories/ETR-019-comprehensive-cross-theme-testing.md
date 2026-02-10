# Story ETR-019: Comprehensive Cross-Theme Testing

**Story ID**: ETR-019  
**Epic**: ETR-EPIC-005 - Landing Page & Final Polish  
**Priority**: P2 (Medium)  
**Story Points**: 8  
**Estimated Time**: 2 hours  
**Type**: Testing  
**Status**: Ready for Development  
**Dependencies**: ETR-018

---

## User Story

As a QA engineer, I need comprehensive testing across all themes so that I can certify the refactoring is complete and bug-free.

---

## Description

Perform exhaustive testing of all 10 themes across all 3 color modes, covering all pages and components.

This comprehensive testing phase ensures that the entire token refactoring project has been completed successfully with zero visual regressions. It covers 30 unique theme/mode combinations across multiple pages and components.

---

## Acceptance Criteria

- [ ] All 10 themes tested in light mode
- [ ] All 10 themes tested in dark mode
- [ ] All 10 themes tested in high-contrast mode
- [ ] Homepage tested for all theme/mode combinations
- [ ] Documentation pages tested for all combinations
- [ ] Landing page tested for all combinations
- [ ] All interactive elements tested (buttons, links, hovers)
- [ ] All Docusaurus components tested (navbar, sidebar, pagination, etc.)
- [ ] Code blocks tested in all themes
- [ ] Tables tested in all themes
- [ ] Screenshots captured for visual regression testing
- [ ] Performance benchmarks collected for all themes
- [ ] CSS file sizes measured and compared to baseline
- [ ] No visual regressions detected
- [ ] Test report document created

---

## Testing Matrix

**Total Combinations**: 30 (10 themes × 3 modes)

### Themes to Test
1. Steampunk
2. Ocean
3. Cyberpunk
4. Matrix
5. Volt
6. Forest
7. Coffee
8. Volcano
9. Nordic
10. Sunset

### Modes to Test
1. Light mode
2. Dark mode
3. High-contrast mode

### Pages to Test (per theme/mode)
1. Homepage
2. Documentation page (sample)
3. Landing page
4. Component showcase page (if available)

---

## Testing Procedure

### Phase 1: Pre-Testing Setup
1. [ ] Create testing branch or checkout main branch
2. [ ] Build all packages: `pnpm build`
3. [ ] Start dev server: `cd packages/design-system/docusaurus && pnpm dev`
4. [ ] Prepare screenshot directory structure
5. [ ] Set up performance benchmarking tools

### Phase 2: Baseline Screenshots (if not already captured)
1. [ ] Checkout commit before refactoring started
2. [ ] Build and start dev server
3. [ ] Capture baseline screenshots for all 30 combinations
4. [ ] Note baseline CSS file sizes
5. [ ] Note baseline performance metrics

### Phase 3: Post-Refactoring Testing
1. [ ] Checkout refactored branch
2. [ ] Build and start dev server
3. [ ] Test each theme/mode combination systematically

### Phase 4: Visual Regression Analysis
1. [ ] Compare new screenshots with baseline
2. [ ] Document any visual differences
3. [ ] Classify differences as:
   - ✅ No change (expected)
   - ⚠️ Intentional improvement
   - ❌ Unintended regression (must fix)

### Phase 5: Performance Analysis
1. [ ] Compare CSS file sizes before/after
2. [ ] Measure page load times
3. [ ] Check runtime performance
4. [ ] Document findings

---

## Detailed Testing Checklist

### Per Theme/Mode Combination (Repeat 30 times)

**Theme**: ___________  
**Mode**: ___________  
**Date**: ___________  
**Tester**: ___________

#### Visual Elements
- [ ] Navbar background and borders correct
- [ ] Navbar links and hover states work
- [ ] Sidebar background and styling correct
- [ ] Sidebar active/hover states work
- [ ] Main content area styling correct
- [ ] Footer styling correct
- [ ] All colors appear as expected

#### Interactive Elements
- [ ] Button hover states work
- [ ] Button active states work
- [ ] Link hover effects work
- [ ] Link visited states work
- [ ] Focus indicators visible and correct
- [ ] Dropdown menus styled correctly

#### Docusaurus Components
- [ ] Pagination component styled correctly
- [ ] Breadcrumbs styled correctly
- [ ] Admonitions (info, warning, danger) styled correctly
- [ ] Code blocks styled correctly
- [ ] Inline code styled correctly
- [ ] Tables styled correctly
- [ ] Tabs component styled correctly
- [ ] Search bar styled correctly

#### Special Effects (theme-specific)
- [ ] Ocean: Wave animations work
- [ ] Cyberpunk: Neon glows present
- [ ] Matrix: Terminal effects present
- [ ] Steampunk: Brass overlays correct
- [ ] Volt: High-vis elements correct
- [ ] [Other theme-specific effects as applicable]

#### Technical Checks
- [ ] No console errors
- [ ] No console warnings
- [ ] No missing CSS variables
- [ ] Page loads without flickering
- [ ] Smooth transitions between modes

#### Screenshots Captured
- [ ] Homepage full page
- [ ] Documentation page full page
- [ ] Landing page full page
- [ ] Navbar close-up
- [ ] Sidebar close-up
- [ ] Interactive elements close-up

---

## Performance Benchmarking

### CSS File Sizes

| Theme | Before (KB) | After (KB) | Difference | Notes |
|-------|-------------|------------|------------|-------|
| Steampunk | | | | |
| Ocean | | | | |
| Cyberpunk | | | | |
| Matrix | | | | |
| Volt | | | | |
| Forest | | | | |
| Coffee | | | | |
| Volcano | | | | |
| Nordic | | | | |
| Sunset | | | | |
| Landing | | | | |

### Page Load Times (ms)

| Theme | Mode | Before | After | Difference | Notes |
|-------|------|--------|-------|------------|-------|
| Steampunk | Light | | | | |
| Steampunk | Dark | | | | |
| Steampunk | HC | | | | |
| [etc...] | | | | | |

### Lighthouse Scores

| Theme | Mode | Performance | Accessibility | Best Practices | SEO | Notes |
|-------|------|-------------|---------------|----------------|-----|-------|
| Steampunk | Light | | | | | |
| [etc...] | | | | | | |

---

## Commands

```bash
# Build all packages
pnpm build

# Build themes
cd packages/design-system/themes && pnpm build

# Build Docusaurus
cd packages/design-system/docusaurus && pnpm build

# Start dev server
cd packages/design-system/docusaurus && pnpm dev

# Check for hardcoded colors (if validation script exists)
cd packages/design-system/docusaurus && pnpm validate:tokens

# Measure bundle sizes
cd packages/design-system/docusaurus && pnpm build && ls -lh dist/assets/*.css
```

---

## Deliverables

1. **Test Report Document** (`testing-report-ETR-019.md`)
   - Summary of all tests performed
   - Pass/fail status for each theme/mode
   - Visual regression findings
   - Performance impact analysis
   - Recommendations

2. **Screenshot Gallery** (`screenshots/`)
   - Organized by theme and mode
   - Before/after comparisons
   - Annotated screenshots for any issues

3. **Performance Metrics Spreadsheet** (`performance-metrics.xlsx`)
   - CSS file sizes
   - Page load times
   - Lighthouse scores
   - Comparison charts

4. **Bug Report** (if issues found) (`bugs-ETR-019.md`)
   - List of any visual regressions
   - Steps to reproduce
   - Priority/severity
   - Assigned to developer

---

## Success Criteria

- ✅ All 30 theme/mode combinations tested
- ✅ Zero unintended visual regressions
- ✅ Performance impact acceptable (CSS size increase < 10%)
- ✅ All interactive elements functional
- ✅ All special effects preserved
- ✅ Documentation complete
- ✅ Screenshots captured for comparison
- ✅ Sign-off from QA and product owner

---

## Notes

- This is the most time-intensive testing story
- Can be parallelized if multiple testers available
- Use browser DevTools for performance profiling
- Take frequent breaks to maintain attention to detail
- Document everything - even minor observations
- Estimated time: 2 hours (or more if issues found)

---

## Testing Tools

- Browser: Chrome/Firefox DevTools
- Screenshot: Built-in browser tools or Playwright
- Performance: Lighthouse, WebPageTest
- Comparison: Image diff tools (e.g., pixelmatch)

---

**Created**: 2026-02-10  
**Created By**: BMAD Workflow  
**Last Updated**: 2026-02-10
