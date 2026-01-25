# Phase 7 Kickoff Checklist

**Phase:** 7 (Tooling & Documentation)  
**Status:** 🚀 Ready to Begin  
**Created:** January 25, 2026  
**Estimated Duration:** 2-3 weeks

---

## ✅ Prerequisites Verification

All prerequisites are met and verified:

- [x] Phase 5A complete (7/7 components delivered)
- [x] 438 tokens defined with complete metadata
- [x] `tokens-docs.json` generated and validated
- [x] 554 Playwright tests passing (100%)
- [x] Storybook infrastructure operational
- [x] Docusaurus infrastructure operational
- [x] Git working tree clean
- [x] Documentation committed and pushed
- [x] Roadmap updated with Phase 5A completion

**Status:** ✅ All prerequisites met - Ready to begin Week 1

---

## 📋 Week 1: Theme Validator + TokensCatalog Foundation

### Day 1-2: Theme Validation CLI Setup

#### Package Structure

- [ ] Create directory: `packages/design-system/tools/theme-validator/`
- [ ] Initialize `package.json` with proper metadata
- [ ] Set up TypeScript configuration (`tsconfig.json`)
- [ ] Create `src/` directory structure:
  ```
  src/
  ├── cli.ts              # Main CLI entry point
  ├── validators/
  │   ├── completeness.ts # Token completeness check
  │   ├── validity.ts     # Value validity check
  │   └── wcag.ts         # WCAG contrast check
  ├── parsers/
  │   └── cssParser.ts    # PostCSS wrapper
  ├── templates/
  │   └── default-theme.css # Default theme template
  └── utils/
      ├── contrast.ts     # Contrast ratio calculation
      └── reporter.ts     # Output formatting
  ```

#### Dependencies Installation

- [ ] Install production dependencies:
  ```bash
  cd packages/design-system/tools/theme-validator
  pnpm add commander postcss postcss-load-config polished chalk
  ```
- [ ] Install dev dependencies:
  ```bash
  pnpm add -D @types/node typescript vite vitest
  ```
- [ ] Add scripts to `package.json`:
  ```json
  {
    "scripts": {
      "build": "vite build",
      "dev": "vite build --watch",
      "test": "vitest",
      "cli": "node dist/cli.js"
    }
  }
  ```

#### Core Implementation - CSS Parser

- [ ] Create `src/parsers/cssParser.ts`
- [ ] Implement PostCSS wrapper to extract CSS variables
- [ ] Filter for `--lufa-*` variables
- [ ] Return structured data: `{ name, value }`
- [ ] Write unit tests for parser

#### Core Implementation - Completeness Validator

- [ ] Create `src/validators/completeness.ts`
- [ ] Load expected token list (440 CSS variables)
- [ ] Compare parsed theme against expected tokens
- [ ] Return missing tokens list
- [ ] Write unit tests for completeness

**End of Day 2 Goal:** CSS parser working, completeness validator functional

---

### Day 3-4: WCAG Contrast Validator

#### Contrast Calculation

- [ ] Create `src/utils/contrast.ts`
- [ ] Implement WCAG contrast ratio formula:
  ```typescript
  // Relative luminance calculation
  // Contrast ratio = (L1 + 0.05) / (L2 + 0.05)
  // where L1 is lighter, L2 is darker
  ```
- [ ] Use `polished` library for color parsing
- [ ] Write unit tests with known contrast pairs

#### Token Pair Definition

- [ ] Create `src/validators/wcag.ts`
- [ ] Define token pairs to check:
  ```typescript
  const colorPairs = [
    // Text on backgrounds
    { text: '--lufa-color-text-primary', bg: '--lufa-color-background-default', threshold: 4.5 },
    { text: '--lufa-color-text-secondary', bg: '--lufa-color-background-default', threshold: 4.5 },
    // UI components
    { component: '--lufa-color-border-focus', bg: '--lufa-color-background-default', threshold: 3.0 },
    // ... (add all critical pairs)
  ];
  ```
- [ ] Implement validation logic for each pair
- [ ] Return violations with ratios and suggestions

#### Value Validity Validator

- [ ] Create `src/validators/validity.ts`
- [ ] Validate color formats (hex, rgb, hsl)
- [ ] Validate spacing values (px, rem, em, positive)
- [ ] Validate timing values (ms, s, positive)
- [ ] Validate radius values (px, rem, em, %, positive)
- [ ] Return invalid tokens with error messages

**End of Day 4 Goal:** WCAG validator working, all 3 validators complete

---

### Day 5: CLI Interface + Theme Template

#### CLI Implementation

- [ ] Create `src/cli.ts` with Commander.js
- [ ] Define commands:
  ```bash
  lufa-validate-theme --theme <file>
  lufa-validate-theme --generate-template
  lufa-validate-theme --help
  ```
- [ ] Add options:
  ```bash
  --strict        # Treat warnings as errors
  --output <file> # JSON report output
  --quiet         # Suppress console output
  ```
- [ ] Implement command handlers
- [ ] Add colored terminal output (chalk)

#### Theme Template Generation

- [ ] Load all 440 CSS variables from tokens build
- [ ] Generate `src/templates/default-theme.css`:
  ```css
  :root {
    /* Primitive Tokens */
    --lufa-primitive-color-blue-50: #eff6ff;
    --lufa-primitive-color-blue-100: #dbeafe;
    /* ... */

    /* Core Tokens */
    --lufa-core-color-primary: var(--lufa-primitive-color-blue-600);
    /* ... */

    /* Semantic Tokens */
    --lufa-semantic-color-background-default: var(--lufa-core-color-neutral-lightest);
    /* ... */

    /* Component Tokens */
    --lufa-component-button-background-primary: var(--lufa-semantic-color-background-primary);
    /* ... */
  }
  ```
- [ ] Add comments explaining each section

#### Testing & Documentation

- [ ] Write comprehensive tests for CLI
- [ ] Create `README.md` with usage examples
- [ ] Test CLI with sample theme files:
  - Valid complete theme
  - Incomplete theme (missing tokens)
  - Invalid values theme
  - WCAG failing theme
- [ ] Update root `package.json` scripts:
  ```json
  {
    "scripts": {
      "ds:validate-theme": "pnpm --filter @grasdouble/lufa_design-system-theme-validator cli"
    }
  }
  ```

**End of Week 1 Goal:** ✅ Theme Validator CLI complete and tested

---

## 📋 Week 2: TokensCatalog UI + CI Validation

### Day 1-2: TokensCatalog Core Components

#### Setup

- [ ] Create directory: `packages/design-system/storybook/src/stories/tokens/`
- [ ] Create component structure:
  ```
  src/stories/tokens/
  ├── TokensCatalog.tsx           # Main container
  ├── TokensCatalog.stories.tsx   # Storybook integration
  ├── TokensCatalog.module.css    # Styles
  ├── components/
  │   ├── TokenCard.tsx           # Individual token display
  │   ├── TokenFilters.tsx        # Search + filter controls
  │   ├── TokenGrid.tsx           # Layout grid
  │   ├── TokenPreview.tsx        # Preview dispatcher
  │   ├── ColorPreview.tsx        # Color swatch
  │   ├── SpacingPreview.tsx      # Spacing ruler
  │   ├── ShadowPreview.tsx       # Shadow box
  │   ├── TypographyPreview.tsx   # Text sample
  │   └── RadiusPreview.tsx       # Rounded box
  └── utils/
      ├── loadTokens.ts           # Load tokens-docs.json
      ├── filterTokens.ts         # Filter logic
      └── copyToClipboard.ts      # Clipboard API
  ```

#### Data Loading

- [ ] Create `utils/loadTokens.ts`
- [ ] Import `tokens-docs.json`:

  ```typescript
  import tokensDocsJson from '@grasdouble/lufa_design-system-tokens/dist/tokens-docs.json';

  export interface TokenMetadata {
    name: string;
    path: string;
    value: string;
    cssVar: string;
    type: 'color' | 'spacing' | 'shadow' | 'typography' | 'radius' | 'timing';
    category: 'primitive' | 'core' | 'semantic' | 'component';
    role?: string;
    themable: boolean;
    description?: string;
    intent?: string;
    wcag?: { level: string; ratio?: number };
  }

  export const tokens: TokenMetadata[] = tokensDocsJson;
  ```

#### TokenCard Component

- [ ] Create `components/TokenCard.tsx`
- [ ] Display:
  - Token name (heading)
  - Visual preview (dispatch to specific preview component)
  - Token value (formatted)
  - CSS variable
  - TypeScript path
  - Metadata badges (category, themable, WCAG)
  - Description/intent (if available)
  - Copy buttons (CSS var, TS path)
- [ ] Style with CSS Modules using design system tokens

#### Preview Components (Basic)

- [ ] Create `components/ColorPreview.tsx`:
  - 64×64px swatch with border
  - Hex value label
  - WCAG badge (AAA/AA/fail)
- [ ] Create `components/SpacingPreview.tsx`:
  - Horizontal bar scaled to value
  - Pixel + rem labels
- [ ] Create `components/ShadowPreview.tsx`:
  - 100×100px box with shadow
  - Light background

**End of Day 2 Goal:** Basic TokensCatalog rendering all tokens

---

### Day 3-4: TokensCatalog Features

#### Search & Filters

- [ ] Create `components/TokenFilters.tsx`
- [ ] Implement search input:
  - Debounced text search (300ms)
  - Search in: name, cssVar, path, description
  - Highlight matched text
- [ ] Implement filter dropdowns:
  - Category filter (all, primitive, core, semantic, component)
  - Type filter (all, color, spacing, shadow, typography, radius, timing)
  - Role filter (all, background, text, border, spacing, etc.)
  - Themable filter (all, yes, no)
  - WCAG filter (all, AAA, AA, fail)
- [ ] Create `utils/filterTokens.ts` with filter logic

#### Remaining Preview Components

- [ ] Create `components/TypographyPreview.tsx`:
  - Text sample: "The quick brown fox jumps over the lazy dog"
  - Apply font family, size, weight, line height
  - Display computed values
- [ ] Create `components/RadiusPreview.tsx`:
  - 80×80px box with border radius
  - Border for visibility
  - Display pixel value

#### Clipboard Functionality

- [ ] Create `utils/copyToClipboard.ts`:
  ```typescript
  export async function copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  ```
- [ ] Add copy buttons to TokenCard:
  - "Copy CSS" → `var(--lufa-color-background-primary)`
  - "Copy TS" → `tokens.color.background.primary`
  - Show toast notification on success

#### Layout & Responsiveness

- [ ] Create `components/TokenGrid.tsx`:
  - CSS Grid layout
  - Responsive columns: 1 (mobile), 2 (tablet), 3 (desktop), 4 (wide)
  - Proper spacing using design system tokens
- [ ] Style filters with design system components (if available)
- [ ] Test on various screen sizes

**End of Day 4 Goal:** TokensCatalog fully functional with all features

---

### Day 5: CI Validation Scripts

#### validate-component-metadata.js

- [ ] Create `packages/design-system/main/scripts/validate-component-metadata.js`
- [ ] Use TypeScript compiler API to parse components
- [ ] Check for:
  - JSDoc comment on component function
  - JSDoc comments on all props interface properties
  - `displayName` assignment
- [ ] Generate report with pass/fail status
- [ ] Exit code 1 on failures

#### validate-token-usage.js

- [ ] Create `packages/design-system/main/scripts/validate-token-usage.js`
- [ ] Read all component files (`.tsx`, `.ts`, `.css`)
- [ ] Search for hardcoded values:
  - Color values: `/#[0-9A-Fa-f]{3,8}/`, `/rgb\(/`, `/hsl\(/`
  - Spacing: `/\d+px/`, `/\d+rem/` (outside `var()`)
  - Timing: `/\d+ms/`, `/\d+s/` (outside `var()`)
- [ ] Search for primitive imports:
  - `/from ['"]@grasdouble\/lufa_design-system-primitives['"]/`
- [ ] Generate report with violations (file, line number)
- [ ] Exit code 1 on violations

#### validate-a11y-metadata.js

- [ ] Create `packages/design-system/main/scripts/validate-a11y-metadata.js`
- [ ] For each component, find corresponding `.spec.tsx`
- [ ] Check for accessibility test blocks:
  - `test.describe('Accessibility')`
  - Tests for keyboard navigation
  - Tests for focus management
  - Tests for ARIA attributes
- [ ] Generate report with missing tests
- [ ] Exit code 1 on missing tests

#### GitHub Actions Workflow

- [ ] Create `.github/workflows/validate-design-system.yml`:

  ```yaml
  name: Validate Design System

  on:
    pull_request:
      paths:
        - 'packages/design-system/**'
    push:
      branches: [main]

  jobs:
    validate:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v2
          with:
            version: 10
        - uses: actions/setup-node@v4
          with:
            node-version: '24'
            cache: 'pnpm'
        - run: pnpm install --frozen-lockfile
        - run: pnpm ds:all:build
        - run: pnpm ds:validate:metadata
        - run: pnpm ds:validate:token-usage
        - run: pnpm ds:validate:a11y-metadata
  ```

- [ ] Add scripts to `packages/design-system/main/package.json`:
  ```json
  {
    "scripts": {
      "validate:metadata": "node scripts/validate-component-metadata.js",
      "validate:token-usage": "node scripts/validate-token-usage.js",
      "validate:a11y-metadata": "node scripts/validate-a11y-metadata.js",
      "validate:all": "npm run validate:metadata && npm run validate:token-usage && npm run validate:a11y-metadata"
    }
  }
  ```

#### Testing

- [ ] Test each validator with:
  - Valid components (should pass)
  - Missing JSDoc (should fail)
  - Hardcoded values (should fail)
  - Missing a11y tests (should fail)
- [ ] Verify GitHub Actions workflow triggers on PR

**End of Week 2 Goal:** ✅ TokensCatalog complete, CI validation active

---

## 📋 Week 3: Documentation + Polish

### Day 1-2: Getting Started + Theming Guides

#### Getting Started Guide

- [ ] Create `packages/design-system/docusaurus/docs/getting-started.md`
- [ ] Sections:
  1. **Installation**
     - npm/pnpm/yarn commands
     - Version requirements (Node 24+, React 19+)
  2. **Import Design Tokens CSS**
     - Show how to import CSS variables
     - Explain CSS cascade and custom properties
  3. **Use Your First Component**
     - Button example with props
     - Show TypeScript import
     - Explain variant system
  4. **Configure TypeScript**
     - TypeScript path aliases if needed
     - Type imports
  5. **Explore Components**
     - Link to Storybook
     - Link to API reference
  6. **Next Steps**
     - Theming guide
     - Accessibility guide
     - Contributing guide

#### Theming Guides

- [ ] Create `packages/design-system/docusaurus/docs/theming/overview.md`:
  - Explain 4-level token architecture
  - Show token reference diagram
  - Explain semantic naming
  - Introduce theme customization concept
- [ ] Create `packages/design-system/docusaurus/docs/theming/creating-themes.md`:
  - Generate theme template (`npx lufa-validate-theme --generate-template`)
  - Override CSS variables in `:root`
  - Example custom theme (dark mode)
  - Best practices for theming
- [ ] Create `packages/design-system/docusaurus/docs/theming/validation.md`:
  - Using theme validation CLI
  - Understanding validation reports
  - Fixing common issues (missing tokens, invalid values)
  - WCAG contrast validation
- [ ] Create `packages/design-system/docusaurus/docs/theming/accessibility.md`:
  - WCAG AA requirements (4.5:1 text, 3:1 UI)
  - Color contrast best practices
  - Testing tools (CLI, browser extensions)
  - Common pitfalls
- [ ] Create `packages/design-system/docusaurus/docs/theming/examples.md`:
  - Complete dark theme example
  - High-contrast theme example
  - Brand-customized theme example

**End of Day 2 Goal:** Getting Started + Theming documentation complete

---

### Day 3-4: Accessibility + Contributing Guides

#### Accessibility Guides

- [ ] Create `packages/design-system/docusaurus/docs/accessibility/overview.md`:
  - Design system accessibility commitment (WCAG AA)
  - Overview of a11y features (color contrast, keyboard, screen readers)
  - How to report accessibility issues
- [ ] Create `packages/design-system/docusaurus/docs/accessibility/color-contrast.md`:
  - WCAG contrast requirements detailed
  - How tokens ensure contrast
  - Using validation CLI for custom themes
  - Visual examples of passing/failing contrast
- [ ] Create `packages/design-system/docusaurus/docs/accessibility/keyboard-navigation.md`:
  - Component keyboard patterns
  - Focus management
  - Tab order
  - Escape key behaviors
- [ ] Create `packages/design-system/docusaurus/docs/accessibility/screen-readers.md`:
  - ARIA attributes used
  - Component announcements
  - Testing with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Create `packages/design-system/docusaurus/docs/accessibility/testing.md`:
  - Automated testing (Playwright CT)
  - Manual testing checklist
  - Browser extensions (axe DevTools, Lighthouse)
  - Screen reader testing

#### Contributing Guides

- [ ] Create `packages/design-system/docusaurus/docs/contributing/overview.md`:
  - How to contribute (code, docs, issues)
  - Code of conduct reference
  - Contribution workflow overview
- [ ] Create `packages/design-system/docusaurus/docs/contributing/development-setup.md`:
  - Repository clone
  - Prerequisites (Node 24, pnpm 10)
  - Install dependencies
  - Build commands
  - Run tests
  - Run Storybook
- [ ] Create `packages/design-system/docusaurus/docs/contributing/creating-components.md`:
  - Component development workflow
  - Using tokens (never primitives)
  - Component structure (props interface, JSDoc, displayName)
  - Styling with CSS Modules
  - Accessibility requirements
- [ ] Create `packages/design-system/docusaurus/docs/contributing/creating-tokens.md`:
  - Token structure (4 levels)
  - Adding primitive tokens
  - Adding semantic tokens
  - Metadata requirements (description, intent, a11y)
  - Running token build
- [ ] Create `packages/design-system/docusaurus/docs/contributing/testing.md`:
  - Playwright component testing
  - 5-part test structure (Rendering, Variants, Interactions, A11y, Visual)
  - Running tests (`pnpm ds:test`)
  - Updating snapshots
- [ ] Create `packages/design-system/docusaurus/docs/contributing/pull-requests.md`:
  - PR checklist (tests, docs, linting)
  - CI requirements (all checks must pass)
  - Review process
  - Merge criteria

**End of Day 4 Goal:** Accessibility + Contributing documentation complete

---

### Day 5: Auto-Generated API + Final Testing

#### Token Table Component

- [ ] Create `packages/design-system/docusaurus/src/components/TokenTable.tsx`:
  - React component that accepts token array
  - Renders table: Token Name | CSS Var | Value | Themable | WCAG | Description
  - Sortable columns
  - Filterable rows
  - Responsive layout
- [ ] Create `packages/design-system/docusaurus/src/components/ColorSwatch.tsx`:
  - Inline color preview swatch
  - Shows hex value
  - WCAG badge

#### API Generation Script

- [ ] Create `packages/design-system/docusaurus/scripts/generate-token-api.ts`
- [ ] Load `tokens-docs.json`
- [ ] Organize tokens by category and type:
  ```typescript
  {
    primitive: { color: [...], spacing: [...], ... },
    core: { color: [...], spacing: [...], ... },
    semantic: { color: [...], spacing: [...], ... },
    component: { button: [...], badge: [...], ... }
  }
  ```
- [ ] Generate MDX files:
  - `docs/api/tokens/primitives/color.mdx`
  - `docs/api/tokens/primitives/spacing.mdx`
  - `docs/api/tokens/core/color.mdx`
  - ... (one file per category+type combination)
- [ ] Each file includes:
  - Title and overview
  - TokenTable component with tokens
  - Detailed token descriptions
- [ ] Add script to `docusaurus/package.json`:
  ```json
  {
    "scripts": {
      "generate:api": "tsx scripts/generate-token-api.ts",
      "prebuild": "npm run generate:api"
    }
  }
  ```

#### Docusaurus Sidebar Configuration

- [ ] Update `packages/design-system/docusaurus/sidebars.js`:
  ```javascript
  module.exports = {
    docs: [
      'getting-started',
      {
        type: 'category',
        label: 'Theming',
        items: [
          'theming/overview',
          'theming/creating-themes',
          'theming/validation',
          'theming/accessibility',
          'theming/examples',
        ],
      },
      {
        type: 'category',
        label: 'Accessibility',
        items: [
          'accessibility/overview',
          'accessibility/color-contrast',
          'accessibility/keyboard-navigation',
          'accessibility/screen-readers',
          'accessibility/testing',
        ],
      },
      {
        type: 'category',
        label: 'Contributing',
        items: [
          'contributing/overview',
          'contributing/development-setup',
          'contributing/creating-components',
          'contributing/creating-tokens',
          'contributing/testing',
          'contributing/pull-requests',
        ],
      },
      {
        type: 'category',
        label: 'API Reference',
        items: [
          // Auto-generated from token categories
        ],
      },
    ],
  };
  ```

#### End-to-End Testing

- [ ] **Theme Validator:**
  - Run CLI with sample themes
  - Verify all validators work
  - Check output formatting
  - Test in CI environment
- [ ] **TokensCatalog:**
  - Open in Storybook
  - Verify all 438 tokens displayed
  - Test search functionality
  - Test all filters
  - Test clipboard copy
  - Check responsive layout
- [ ] **CI Validation:**
  - Trigger GitHub Actions workflow
  - Verify scripts run correctly
  - Test with intentional failures (missing JSDoc, hardcoded values)
  - Confirm PR blocks on failure
- [ ] **Documentation:**
  - Build Docusaurus (`pnpm ds:documentation:build`)
  - Verify all pages render
  - Test all links (no 404s)
  - Follow Getting Started guide step-by-step
  - Run auto-generated API script
  - Verify API reference pages match tokens

#### Final Updates

- [ ] Update `packages/design-system/docs/roadmap-and-status.md`:
  - Mark Phase 7 as COMPLETE
  - Update completion date
  - Update Phase 8 as NEXT
  - Add Phase 7 deliverables summary
- [ ] Create Phase 7 completion summary:
  - `_bmad-output/analysis/phase-7-completion-summary.md`
  - Similar structure to Phase 5A summary
  - Metrics, deliverables, lessons learned
- [ ] Commit all changes with comprehensive message
- [ ] Create git tag: `v2.0.0-phase7-complete`

**End of Week 3 Goal:** ✅ Phase 7 complete, all deliverables functional and documented

---

## 🎯 Phase 7 Success Criteria Checklist

### Must-Have (P0) ✅

- [ ] **Theme Validation CLI:** `npx lufa-validate-theme` runs successfully
- [ ] **WCAG Validation:** All color contrast checks pass (4.5:1 text, 3:1 UI)
- [ ] **TokensCatalog UI:** All 438 tokens displayed with interactive previews
- [ ] **CI Validation:** GitHub Actions workflow passes, blocks PRs on violations
- [ ] **Auto-Generated Docs:** API reference generated from `tokens-docs.json`
- [ ] **Getting Started Guide:** Complete installation → first component in <10 minutes
- [ ] **Theming Guide:** Custom theme creation with validation workflow
- [ ] **Accessibility Guide:** WCAG requirements and testing documented
- [ ] **Contributing Guide:** Complete development workflow documented

### Nice-to-Have (P1) ⏭️

- [ ] Theme template variations (light/dark presets)
- [ ] Token usage analytics (dependency graph)
- [ ] Automated migration tool (v1 → v2)
- [ ] Performance benchmarks in docs

### Quality Checks

- [ ] All new code has TypeScript types
- [ ] All scripts have error handling
- [ ] All commands have `--help` output
- [ ] All documentation has working examples
- [ ] All links in docs are valid (no 404s)
- [ ] All tests pass (if tests written for tooling)
- [ ] Linting passes (`pnpm all:lint`)
- [ ] Formatting passes (`pnpm all:prettier`)

---

## 📊 Progress Tracking

### Week 1 Progress

- [ ] Days 1-2 complete (Theme Validator setup + core)
- [ ] Days 3-4 complete (WCAG + validators)
- [ ] Day 5 complete (CLI + template)
- [ ] Week 1 milestone: **Theme Validator Complete**

### Week 2 Progress

- [ ] Days 1-2 complete (TokensCatalog core)
- [ ] Days 3-4 complete (TokensCatalog features)
- [ ] Day 5 complete (CI validation)
- [ ] Week 2 milestone: **TokensCatalog + CI Complete**

### Week 3 Progress

- [ ] Days 1-2 complete (Getting Started + Theming)
- [ ] Days 3-4 complete (Accessibility + Contributing)
- [ ] Day 5 complete (API generation + testing)
- [ ] Week 3 milestone: **Documentation Complete**

### Overall Phase 7

- [ ] All deliverables complete (4/4)
- [ ] All success criteria met (9/9)
- [ ] All quality checks pass
- [ ] Documentation updated
- [ ] Phase 7 marked complete
- [ ] **Ready for Phase 8**

---

## 🚀 Quick Start Commands

### Set Up Theme Validator

```bash
# Create package directory
mkdir -p packages/design-system/tools/theme-validator/src

# Initialize package
cd packages/design-system/tools/theme-validator
pnpm init

# Install dependencies
pnpm add commander postcss polished chalk
pnpm add -D @types/node typescript vite vitest
```

### Run TokensCatalog Development

```bash
# Start Storybook with TokensCatalog
pnpm ds:storybook:dev

# Navigate to: http://localhost:6006/?path=/story/tokens-tokenscatalog--default
```

### Test CI Validation

```bash
# Run all validation scripts
pnpm ds:validate:all

# Run individual validators
pnpm ds:validate:metadata
pnpm ds:validate:token-usage
pnpm ds:validate:a11y-metadata
```

### Build Documentation

```bash
# Generate API reference
cd packages/design-system/docusaurus
pnpm generate:api

# Build Docusaurus
pnpm build

# Preview locally
pnpm serve
```

---

## 📚 Reference Links

### Internal Documents

- [Phase 7 Planning Document](_bmad-output/analysis/phase-7-planning.md)
- [Phase 5A Completion Summary](_bmad-output/analysis/phase-5a-completion-summary.md)
- [Roadmap & Status](packages/design-system/docs/roadmap-and-status.md)
- [Development Policies](packages/design-system/docs/development-policies.md)

### External Resources

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Commander.js Documentation](https://github.com/tj/commander.js)
- [PostCSS API](https://postcss.org/api/)
- [Docusaurus MDX](https://docusaurus.io/docs/markdown-features)
- [Playwright Component Testing](https://playwright.dev/docs/test-components)

---

## 🆘 Troubleshooting

### Theme Validator Issues

- **PostCSS parse errors:** Ensure valid CSS syntax, check for unclosed braces
- **Contrast calculation errors:** Verify color format (hex/rgb/hsl), check polished compatibility
- **Missing tokens:** Regenerate default template from latest tokens build

### TokensCatalog Issues

- **Tokens not loading:** Verify `tokens-docs.json` path, check import resolution
- **Previews not rendering:** Check CSS Modules loading, verify token values
- **Filters not working:** Check state management, verify filter logic

### CI Validation Issues

- **False positives:** Refine regex patterns, add allowlist for edge cases
- **TypeScript parser errors:** Update TypeScript version, check tsconfig compatibility
- **GitHub Actions failures:** Check Node version (24), pnpm version (10), frozen lockfile

### Documentation Issues

- **API generation errors:** Verify tokens-docs.json structure, check script paths
- **Broken links:** Run link checker, verify relative paths
- **Build failures:** Check Docusaurus version, verify MDX syntax

---

**Document Status:** ✅ Ready to Use  
**Next Action:** Begin Week 1, Day 1 - Theme Validator Setup  
**Owner:** Design System Team  
**Created:** January 25, 2026
