# Story ETR-010: Epic 2 - Visual Regression Testing

**Story ID**: ETR-010  
**Epic**: ETR-EPIC-002 - Priority Themes (P0-P1) Refactoring  
**Priority**: P1  
**Story Points**: 3  
**Estimated Time**: 45 minutes  
**Type**: Testing  
**Status**: Ready for Development  
**Dependencies**: ETR-007 (Ocean Theme - Refactor Docusaurus CSS), ETR-009 (Cyberpunk Theme - Refactor Docusaurus CSS)

---

## Epic Context

**Epic**: Priority Themes (P0-P1) Refactoring  
**Epic Goal**: Refactor the high-priority themes (Ocean, Cyberpunk) following the pattern established in Epic 1. These are the most complex and visible themes that require immediate attention.

This story provides the final validation for Epic 2 by performing comprehensive visual regression testing on both Ocean and Cyberpunk themes.

---

## User Story

As a QA engineer, I need comprehensive visual tests for P1 themes so that I can confirm zero visual regressions.

---

## Description

Perform thorough visual regression testing on Ocean and Cyberpunk themes across all color modes and components. This ensures that the token refactoring has not introduced any visual changes and that both themes maintain their distinctive aesthetics perfectly.

---

## Acceptance Criteria

- [ ] Ocean theme tested in light/dark/high-contrast
- [ ] Cyberpunk theme tested in light/dark/high-contrast
- [ ] All Docusaurus components tested (navbar, sidebar, content, footer)
- [ ] Interactive states tested (hover, active, focus)
- [ ] Code blocks verified
- [ ] Landing page adaptations verified
- [ ] Screenshots captured for comparison
- [ ] No visual differences found (or differences documented and approved)
- [ ] Performance impact measured (load time, CSS size)

---

## Testing Procedure

### Phase 1: Baseline Capture (Before Refactoring)

If not already done, checkout the branch before refactoring started:

```bash
# Checkout pre-refactoring state
git stash
git checkout <branch-before-epic-2>

# Start dev server
cd packages/design-system/docusaurus
pnpm dev
```

#### Ocean Theme Baseline Screenshots

1. **Homepage**
   - Light mode
   - Dark mode
   - High-contrast mode

2. **Documentation Page**
   - Light mode
   - Dark mode
   - High-contrast mode

3. **Landing Page**
   - Light mode
   - Dark mode
   - High-contrast mode

4. **Component States**
   - Navbar (default, hover)
   - Sidebar menu (default, hover, active)
   - Buttons (default, hover, active)
   - Links (default, hover)
   - Code blocks
   - Tables
   - Forms

#### Cyberpunk Theme Baseline Screenshots

Repeat the same screenshot capture for Cyberpunk theme.

### Phase 2: Post-Refactoring Capture

```bash
# Checkout refactored branch
git checkout <epic-2-refactoring-branch>

# Rebuild
cd packages/design-system/themes
pnpm build
cd ../docusaurus
pnpm build
pnpm dev
```

Capture the same screenshots for comparison.

### Phase 3: Comparison

Compare screenshots side-by-side:

1. Use image diff tools (e.g., ImageMagick, Pixelmatch)
2. Manual visual inspection
3. Document any differences found
4. Categorize differences:
   - **Acceptable**: Subpixel rendering differences, browser variations
   - **Unacceptable**: Color changes, layout shifts, missing effects

---

## Testing Matrix

### Ocean Theme (3 modes × multiple pages = 9+ test scenarios)

| Mode | Homepage | Docs Page | Landing | Components | Status |
|------|----------|-----------|---------|------------|--------|
| Light | ☐ | ☐ | ☐ | ☐ | Pending |
| Dark | ☐ | ☐ | ☐ | ☐ | Pending |
| High-Contrast | ☐ | ☐ | ☐ | ☐ | Pending |

### Cyberpunk Theme (3 modes × multiple pages = 9+ test scenarios)

| Mode | Homepage | Docs Page | Landing | Components | Status |
|------|----------|-----------|---------|------------|--------|
| Light | ☐ | ☐ | ☐ | ☐ | Pending |
| Dark | ☐ | ☐ | ☐ | ☐ | Pending |
| High-Contrast | ☐ | ☐ | ☐ | ☐ | Pending |

---

## Component Testing Checklist

### Ocean Theme Components

#### Navigation
- [ ] Navbar background (wave overlay)
- [ ] Navbar links (default, hover)
- [ ] Navbar logo
- [ ] Mobile menu toggle

#### Sidebar
- [ ] Menu list background
- [ ] Menu links (default, hover, active)
- [ ] Section headers
- [ ] Scrollbar styling

#### Content
- [ ] Main wrapper background
- [ ] Headings styling
- [ ] Paragraph text
- [ ] Links (default, hover)
- [ ] Blockquotes
- [ ] Code blocks (inline and block)
- [ ] Tables (borders, row hover)
- [ ] Images
- [ ] Lists

#### Interactive Elements
- [ ] Primary buttons (default, hover, active)
- [ ] Secondary buttons (default, hover, active)
- [ ] Pagination navigation
- [ ] Search box (default, focus)
- [ ] TOC active items

#### Special Effects
- [ ] Wave animation (if present)
- [ ] Shadows and depth
- [ ] Overlays
- [ ] Transitions

### Cyberpunk Theme Components

#### Navigation
- [ ] Navbar neon glow effects
- [ ] Navbar links (default, hover) - glow intensity
- [ ] Navbar title text glow
- [ ] Mobile menu toggle

#### Sidebar
- [ ] Menu background with neon accents
- [ ] Menu links (default, hover, active) - glow effects
- [ ] Border glows
- [ ] Scrollbar with glow

#### Content
- [ ] Main wrapper background
- [ ] Headings with text glow
- [ ] Links with hover glow
- [ ] Blockquotes with neon border
- [ ] Code blocks with border glow
- [ ] Tables with neon borders
- [ ] Images
- [ ] Lists

#### Interactive Elements
- [ ] Buttons with neon glow (default, hover, active)
- [ ] Pagination with glow effects
- [ ] Search box with focus glow
- [ ] TOC with active glow

#### Special Effects
- [ ] Neon text glows
- [ ] Neon border glows
- [ ] Layered glow effects
- [ ] Glow intensity on hover
- [ ] Animated glows (if present)

---

## Performance Testing

### CSS File Size Comparison

```bash
# Before refactoring
ls -lh packages/design-system/docusaurus/src/css/ocean-docusaurus.css
ls -lh packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css

# After refactoring
# (Re-check file sizes)
```

**Expected**: File size should be similar or slightly smaller due to token usage reducing duplication.

### Bundle Size Analysis

```bash
# Build production bundle
cd packages/design-system/docusaurus
pnpm build

# Check bundle sizes in build output
```

**Expected**: No significant increase in bundle size.

### Load Time Measurement

1. Open Chrome DevTools > Network tab
2. Clear cache
3. Load homepage with Ocean theme
4. Record load time and DOMContentLoaded time
5. Repeat with Cyberpunk theme
6. Compare before/after

**Expected**: No noticeable performance degradation (within 5% variance).

---

## Files to Test

### Ocean Theme
- `packages/design-system/themes/src/ocean.css` (base tokens)
- `packages/design-system/docusaurus/src/css/ocean-docusaurus.css` (Docusaurus theme)

### Cyberpunk Theme
- `packages/design-system/themes/src/cyberpunk.css` (base tokens)
- `packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css` (Docusaurus theme)

---

## Test Environment Setup

```bash
# Ensure clean build
cd packages/design-system/themes
rm -rf dist node_modules/.cache
pnpm build

cd ../docusaurus
rm -rf .docusaurus node_modules/.cache
pnpm build
pnpm dev
```

### Browser Setup
- Clear browser cache
- Use consistent viewport size (e.g., 1920×1080)
- Disable browser extensions that may affect rendering
- Test in multiple browsers (Chrome, Firefox, Safari)

---

## Deliverables

### 1. Test Report Document

Create: `_bmad-output/testing-artifacts/epic-2-visual-regression-report.md`

Include:
- Summary of tests performed
- Number of tests passed/failed
- Screenshots gallery (before/after)
- Any differences found and their categorization
- Performance metrics comparison
- Conclusion and sign-off

### 2. Screenshots Gallery

Organize in: `_bmad-output/testing-artifacts/screenshots/epic-2/`

Structure:
```
screenshots/epic-2/
├── ocean/
│   ├── before/
│   │   ├── light-homepage.png
│   │   ├── dark-homepage.png
│   │   └── ...
│   └── after/
│       ├── light-homepage.png
│       ├── dark-homepage.png
│       └── ...
└── cyberpunk/
    ├── before/
    │   ├── light-homepage.png
    │   ├── dark-homepage.png
    │   └── ...
    └── after/
        ├── light-homepage.png
        ├── dark-homepage.png
        └── ...
```

### 3. Performance Metrics Spreadsheet

Create: `_bmad-output/testing-artifacts/epic-2-performance-metrics.csv`

| Theme | Mode | Metric | Before | After | Delta | Status |
|-------|------|--------|--------|-------|-------|--------|
| Ocean | Light | CSS Size | XXkb | XXkb | ±X% | ✓ |
| Ocean | Light | Load Time | XXms | XXms | ±X% | ✓ |
| ... | ... | ... | ... | ... | ... | ... |

---

## Acceptance Criteria Validation

### Ocean Theme
- [ ] All 3 modes tested thoroughly
- [ ] Wave animation preserved (if applicable)
- [ ] Cyan/teal color scheme intact
- [ ] Soft shadows maintained
- [ ] No visual regressions detected

### Cyberpunk Theme
- [ ] All 3 modes tested thoroughly
- [ ] Neon glow effects preserved perfectly
- [ ] Fuchsia/cyan color scheme intact
- [ ] Text glows working
- [ ] Border glows working
- [ ] Multi-layered glows maintained
- [ ] No visual regressions detected

### Performance
- [ ] CSS file sizes acceptable
- [ ] Bundle size impact minimal
- [ ] Load times within acceptable range
- [ ] No console errors

---

## Related Stories

- **Prerequisite**: ETR-007 (Ocean Theme - Refactor Docusaurus CSS)
- **Prerequisite**: ETR-009 (Cyberpunk Theme - Refactor Docusaurus CSS)
- **Related**: ETR-004 (Pilot Steampunk Theme - Refactor Docusaurus CSS) - similar testing approach
- **Epic Completion**: This story validates Epic 2 completion

---

## Notes

- Testing should be thorough but not obsessive - subpixel differences are acceptable
- Focus on major visual elements and distinctive theme characteristics
- Ocean's wave effect and Cyberpunk's neon glows are the most critical elements to verify
- Document any differences found, even minor ones, for transparency
- If visual differences are found, determine if they're improvements or regressions

---

## Definition of Done

- [ ] All acceptance criteria checked
- [ ] Both themes tested in all 3 modes
- [ ] All components visually verified
- [ ] Screenshots captured and organized
- [ ] Test report document created
- [ ] Performance metrics collected
- [ ] No unacceptable visual regressions found
- [ ] Team reviewed and approved findings
- [ ] Epic 2 ready for sign-off
