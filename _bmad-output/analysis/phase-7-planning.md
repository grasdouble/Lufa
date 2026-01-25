# Phase 7: Tooling & Documentation - Planning Document

**Phase:** 7 (Tooling & Documentation)  
**Status:** 🎯 Ready to Begin  
**Prerequisites:** ✅ Phase 5A Complete (7/7 components delivered)  
**Estimated Duration:** 2-3 weeks  
**Start Date:** January 25, 2026  
**Category:** Tooling & Release

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Phase Objectives](#phase-objectives)
3. [Success Criteria](#success-criteria)
4. [Deliverables](#deliverables)
5. [Technical Specifications](#technical-specifications)
6. [Implementation Plan](#implementation-plan)
7. [Risk Assessment](#risk-assessment)
8. [Timeline & Milestones](#timeline--milestones)
9. [Dependencies & Prerequisites](#dependencies--prerequisites)
10. [Testing Strategy](#testing-strategy)
11. [Next Steps](#next-steps)

---

## Executive Summary

Phase 7 focuses on **production-readiness tooling** and **comprehensive documentation** to support external adoption of the Lufa Design System v2.0. With the token architecture (438 tokens) and component library (7 components, 554 tests) complete, this phase builds the infrastructure needed for:

- Theme customization and validation
- Token exploration and discovery
- Quality assurance automation
- Developer onboarding and guidance

**Key Deliverables:**

1. Theme Validation CLI (`npx lufa-validate-theme`)
2. Storybook TokensCatalog (interactive token explorer)
3. CI Validation enhancements (component metadata checks)
4. Enhanced Docusaurus documentation (auto-generated API reference)

**Success Criteria:** All tools functional, documentation comprehensive, CI passing, ready for external users.

---

## Phase Objectives

### Primary Objectives

1. **Enable Theme Customization**
   - Provide theme template CSS with sensible defaults
   - Create CLI validator for custom themes
   - Validate token completeness and accessibility

2. **Improve Token Discovery**
   - Build interactive token catalog in Storybook
   - Visual previews for all token types
   - Searchable, filterable, categorized interface

3. **Automate Quality Assurance**
   - Extend CI to validate component metadata
   - Block PRs on validation failures
   - Ensure no hardcoded values escape

4. **Comprehensive Documentation**
   - Auto-generate API reference from `tokens-docs.json`
   - Create practical guides (Getting Started, Theming, A11y)
   - Document contribution workflows

### Secondary Objectives

- Reduce onboarding time for external contributors
- Establish patterns for future tooling development
- Validate design system adoption readiness
- Prepare for v2.0 public release

---

## Success Criteria

### Must-Have (P0)

| Criterion                 | Target                         | Validation Method                             |
| ------------------------- | ------------------------------ | --------------------------------------------- |
| **Theme Validation CLI**  | Functional CLI tool            | `npx lufa-validate-theme` runs successfully   |
| **WCAG Validation**       | All color contrast checks pass | CLI validates WCAG AA (4.5:1 text, 3:1 UI)    |
| **TokensCatalog UI**      | Interactive Storybook page     | All 438 tokens displayed with previews        |
| **CI Validation**         | Component metadata checks      | GitHub Actions fail on missing descriptions   |
| **Auto-Generated Docs**   | API reference from JSON        | Docusaurus pages for all token categories     |
| **Getting Started Guide** | Practical setup tutorial       | Installation → first component in <10 minutes |

### Nice-to-Have (P1)

- Theme template variations (light/dark presets)
- Token usage analytics (which tokens are referenced where)
- Automated migration tool (v1 → v2 tokens)
- Performance benchmarks in documentation

### Out of Scope

- Visual theme builder UI (drag-and-drop customization)
- Real-time theme preview in Storybook
- Design Figma plugin integration
- npm package publishing (handled in Phase 8)

---

## Deliverables

### 1. Theme Validation CLI

**Package:** `@grasdouble/lufa_design-system-theme-validator`  
**Location:** `packages/design-system/tools/theme-validator/`

**Features:**

- Validate theme CSS completeness (all 440 CSS variables defined)
- Check WCAG AA contrast ratios (4.5:1 text, 3:1 UI components)
- Detect invalid token values (malformed colors, negative spacing)
- Generate validation report (JSON + human-readable)
- Exit codes for CI integration (0 = pass, 1 = fail)

**CLI Commands:**

```bash
# Validate theme file
npx lufa-validate-theme --theme custom-theme.css

# Generate template
npx lufa-validate-theme --generate-template > my-theme.css

# CI mode (strict, fail on warnings)
npx lufa-validate-theme --theme theme.css --strict

# Output report to file
npx lufa-validate-theme --theme theme.css --output report.json
```

**Files to Create:**

- `packages/design-system/tools/theme-validator/src/cli.ts`
- `packages/design-system/tools/theme-validator/src/validators/completeness.ts`
- `packages/design-system/tools/theme-validator/src/validators/wcag.ts`
- `packages/design-system/tools/theme-validator/src/templates/default-theme.css`
- `packages/design-system/tools/theme-validator/package.json`
- `packages/design-system/tools/theme-validator/README.md`

---

### 2. Storybook TokensCatalog

**Location:** `packages/design-system/storybook/src/stories/tokens/`

**Features:**

- Display all 438 tokens organized by category
- Visual previews:
  - **Colors:** Swatch with hex value, WCAG rating
  - **Spacing:** Scale ruler with pixel values
  - **Shadows:** Box with applied shadow
  - **Typography:** Text samples in each font/size/weight
  - **Radii:** Box corners with applied radius
  - **Timing:** Animation demonstrations
- Filter by:
  - Category (primitive, core, semantic, component)
  - Role (background, text, border, spacing, etc.)
  - Themable status (yes/no)
  - WCAG compliance level (AAA, AA, fail)
- Search by token name or CSS variable
- Copy token reference to clipboard (TypeScript or CSS format)
- Display token metadata (description, intent, a11y, relationships)

**UI Structure:**

```
┌─────────────────────────────────────────────────┐
│ TokensCatalog                                   │
│ ┌─────────────────────────────────────────────┐ │
│ │ Search: [color-background-primary       ] 🔍│ │
│ │ Filter: [Category ▼] [Role ▼] [Themable ▼] │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌───────────────────────────────────────────┐   │
│ │ 🎨 color-background-primary               │   │
│ │ ┌─────┐ #3B82F6                           │   │
│ │ │     │ CSS: --lufa-color-background-pri..│   │
│ │ └─────┘ TS: tokens.color.background.prim..│   │
│ │         WCAG: AA ✅  Themable: Yes        │   │
│ │         [Copy CSS] [Copy TS] [View Docs]  │   │
│ └───────────────────────────────────────────┘   │
│ (Repeated for all tokens...)                    │
└─────────────────────────────────────────────────┘
```

**Files to Create:**

- `packages/design-system/storybook/src/stories/tokens/TokensCatalog.tsx`
- `packages/design-system/storybook/src/stories/tokens/TokensCatalog.stories.tsx`
- `packages/design-system/storybook/src/stories/tokens/components/TokenCard.tsx`
- `packages/design-system/storybook/src/stories/tokens/components/ColorPreview.tsx`
- `packages/design-system/storybook/src/stories/tokens/components/SpacingPreview.tsx`
- `packages/design-system/storybook/src/stories/tokens/components/ShadowPreview.tsx`
- `packages/design-system/storybook/src/stories/tokens/components/TypographyPreview.tsx`
- `packages/design-system/storybook/src/stories/tokens/utils/loadTokens.ts`

---

### 3. CI Validation Enhancements

**Location:** `.github/workflows/validate-design-system.yml`

**Validation Checks:**

1. **Component Metadata Completeness**
   - All components have JSDoc descriptions
   - All props have type annotations and descriptions
   - displayName is set for all components

2. **Token Usage Compliance**
   - No hardcoded values in component files (16px, #FF0000)
   - All design values come from tokens
   - No direct imports from primitives package

3. **Accessibility Metadata**
   - ARIA attributes documented in props
   - Keyboard navigation patterns documented
   - Focus management patterns described

4. **Documentation Completeness**
   - Every component has Storybook story
   - Every component has Docusaurus page
   - Every component has Playwright tests

**GitHub Actions Workflow:**

```yaml
name: Validate Design System

on:
  pull_request:
    paths:
      - 'packages/design-system/**'
  push:
    branches: [main]

jobs:
  validate-components:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
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

**Scripts to Add (in `packages/design-system/main/package.json`):**

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

**Files to Create:**

- `.github/workflows/validate-design-system.yml`
- `packages/design-system/main/scripts/validate-component-metadata.js`
- `packages/design-system/main/scripts/validate-token-usage.js`
- `packages/design-system/main/scripts/validate-a11y-metadata.js`

---

### 4. Enhanced Docusaurus Documentation

**Location:** `packages/design-system/docusaurus/`

**New Pages:**

#### 4.1 Getting Started Guide

**Path:** `docs/getting-started.md`

**Content:**

1. Installation (npm/pnpm/yarn)
2. Import design tokens CSS
3. Use first component (Button example)
4. Configure TypeScript imports
5. Access Storybook for component explorer
6. Join community / report issues

**Goal:** External developer can render first component in <10 minutes.

---

#### 4.2 Theming Guide

**Path:** `docs/theming/overview.md`

**Content:**

1. Understanding the token architecture (4 levels)
2. Creating custom themes (override CSS variables)
3. Using theme validation CLI
4. WCAG accessibility requirements
5. Theme switching (light/dark modes)
6. Advanced: Conditional token values

**Sections:**

- `theming/overview.md`
- `theming/creating-themes.md`
- `theming/validation.md`
- `theming/accessibility.md`
- `theming/examples.md`

---

#### 4.3 Accessibility Guide

**Path:** `docs/accessibility/overview.md`

**Content:**

1. WCAG AA compliance overview
2. Color contrast requirements
3. Keyboard navigation patterns
4. Screen reader support
5. Focus management
6. ARIA best practices
7. Testing for accessibility

**Sections:**

- `accessibility/overview.md`
- `accessibility/color-contrast.md`
- `accessibility/keyboard-navigation.md`
- `accessibility/screen-readers.md`
- `accessibility/testing.md`

---

#### 4.4 Contributing Guide

**Path:** `docs/contributing/overview.md`

**Content:**

1. Development setup (repository clone, build)
2. Component development workflow
3. Token addition workflow
4. Testing requirements (Playwright CT)
5. Documentation requirements (Storybook + Docusaurus)
6. Pull request checklist
7. Code review process

**Sections:**

- `contributing/overview.md`
- `contributing/development-setup.md`
- `contributing/creating-components.md`
- `contributing/creating-tokens.md`
- `contributing/testing.md`
- `contributing/pull-requests.md`

---

#### 4.5 Auto-Generated API Reference

**Path:** `docs/api/tokens/`

**Source:** `packages/design-system/tokens/dist/tokens-docs.json`

**Generation Script:**

```typescript
// packages/design-system/docusaurus/scripts/generate-token-api.ts

import tokensDocsJson from '../../tokens/dist/tokens-docs.json';

// Generate Markdown files for each token category
// Format: MDX with React components for interactive previews

// Structure:
// docs/api/tokens/
//   ├── primitives/
//   │   ├── color.mdx
//   │   ├── spacing.mdx
//   │   ├── typography.mdx
//   │   └── ...
//   ├── core/
//   ├── semantic/
//   └── component/
```

**Example Generated Page:**

```mdx
---
title: Primitive Color Tokens
---

import { ColorTokenTable } from '@site/src/components/TokenTable';

# Primitive Color Tokens

Base color palette with 65 color tokens organized by hue.

<ColorTokenTable tokens={primitiveColorTokens} />

## Blue Scale

| Token      | Value     | Preview                         | Usage              |
| ---------- | --------- | ------------------------------- | ------------------ |
| `blue.50`  | `#EFF6FF` | <ColorSwatch color="#EFF6FF" /> | Lightest blue tint |
| `blue.100` | `#DBEAFE` | <ColorSwatch color="#DBEAFE" /> | Very light blue    |
| ...        | ...       | ...                             | ...                |
```

---

### Summary of Files to Create (Phase 7)

**Theme Validator (6 files):**

1. `packages/design-system/tools/theme-validator/src/cli.ts`
2. `packages/design-system/tools/theme-validator/src/validators/completeness.ts`
3. `packages/design-system/tools/theme-validator/src/validators/wcag.ts`
4. `packages/design-system/tools/theme-validator/src/templates/default-theme.css`
5. `packages/design-system/tools/theme-validator/package.json`
6. `packages/design-system/tools/theme-validator/README.md`

**TokensCatalog (9 files):**

1. `packages/design-system/storybook/src/stories/tokens/TokensCatalog.tsx`
2. `packages/design-system/storybook/src/stories/tokens/TokensCatalog.stories.tsx`
3. `packages/design-system/storybook/src/stories/tokens/components/TokenCard.tsx`
4. `packages/design-system/storybook/src/stories/tokens/components/ColorPreview.tsx`
5. `packages/design-system/storybook/src/stories/tokens/components/SpacingPreview.tsx`
6. `packages/design-system/storybook/src/stories/tokens/components/ShadowPreview.tsx`
7. `packages/design-system/storybook/src/stories/tokens/components/TypographyPreview.tsx`
8. `packages/design-system/storybook/src/stories/tokens/components/RadiusPreview.tsx`
9. `packages/design-system/storybook/src/stories/tokens/utils/loadTokens.ts`

**CI Validation (4 files):**

1. `.github/workflows/validate-design-system.yml`
2. `packages/design-system/main/scripts/validate-component-metadata.js`
3. `packages/design-system/main/scripts/validate-token-usage.js`
4. `packages/design-system/main/scripts/validate-a11y-metadata.js`

**Documentation (20+ files):**

1. `packages/design-system/docusaurus/docs/getting-started.md`
2. `packages/design-system/docusaurus/docs/theming/overview.md`
3. `packages/design-system/docusaurus/docs/theming/creating-themes.md`
4. `packages/design-system/docusaurus/docs/theming/validation.md`
5. `packages/design-system/docusaurus/docs/theming/accessibility.md`
6. `packages/design-system/docusaurus/docs/theming/examples.md`
7. `packages/design-system/docusaurus/docs/accessibility/overview.md`
8. `packages/design-system/docusaurus/docs/accessibility/color-contrast.md`
9. `packages/design-system/docusaurus/docs/accessibility/keyboard-navigation.md`
10. `packages/design-system/docusaurus/docs/accessibility/screen-readers.md`
11. `packages/design-system/docusaurus/docs/accessibility/testing.md`
12. `packages/design-system/docusaurus/docs/contributing/overview.md`
13. `packages/design-system/docusaurus/docs/contributing/development-setup.md`
14. `packages/design-system/docusaurus/docs/contributing/creating-components.md`
15. `packages/design-system/docusaurus/docs/contributing/creating-tokens.md`
16. `packages/design-system/docusaurus/docs/contributing/testing.md`
17. `packages/design-system/docusaurus/docs/contributing/pull-requests.md`
18. `packages/design-system/docusaurus/scripts/generate-token-api.ts`
19. `packages/design-system/docusaurus/src/components/TokenTable.tsx`
20. `packages/design-system/docusaurus/src/components/ColorSwatch.tsx`
21. Auto-generated: `docs/api/tokens/**/*.mdx` (multiple files)

**Total:** ~40+ files to create

---

## Technical Specifications

### Theme Validation CLI

**Technology Stack:**

- **Language:** TypeScript
- **CLI Framework:** [Commander.js](https://github.com/tj/commander.js)
- **CSS Parser:** [PostCSS](https://postcss.org/)
- **Color Contrast:** [polished](https://polished.js.org/) or custom WCAG formula
- **Output:** JSON + colored terminal output

**WCAG Contrast Requirements:**

- **Text (4.5:1):** Normal text on backgrounds
- **Large Text (3:1):** ≥18pt or ≥14pt bold
- **UI Components (3:1):** Borders, icons, focus indicators

**Validation Algorithm:**

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  tokensCovered: number;
  totalTokens: number;
}

interface ValidationError {
  type: 'missing-token' | 'invalid-value' | 'wcag-fail';
  tokenName: string;
  message: string;
  suggestion?: string;
}

// 1. Completeness Check
// - Parse theme CSS file
// - Extract all --lufa-* variables
// - Compare against 440 expected CSS variables
// - Report missing tokens

// 2. Value Validity Check
// - Validate color formats (hex, rgb, hsl)
// - Validate spacing values (px, rem, em)
// - Validate timing values (ms, s)
// - Report malformed values

// 3. WCAG Contrast Check
// - Extract color pairs (text on background, border on background)
// - Calculate contrast ratios
// - Check against WCAG AA thresholds
// - Report failing combinations
```

**Example CLI Output:**

```bash
$ npx lufa-validate-theme --theme custom-theme.css

🔍 Validating theme: custom-theme.css

✅ Completeness: 440/440 tokens defined (100%)
✅ Value Validity: All values valid
❌ WCAG Contrast: 3 violations found

Contrast Violations:
  1. --lufa-color-text-primary on --lufa-color-background-default
     Ratio: 3.2:1 (needs 4.5:1 for AA)
     Suggestion: Darken text color to #1A1A1A or lighter background

  2. --lufa-color-border-focus on --lufa-color-background-default
     Ratio: 2.8:1 (needs 3:1 for UI components)
     Suggestion: Increase border color contrast

  3. --lufa-color-text-secondary on --lufa-color-background-subtle
     Ratio: 4.1:1 (needs 4.5:1 for AA)
     Suggestion: Darken text or lighten background

❌ Validation failed with 3 errors

Exit code: 1
```

---

### Storybook TokensCatalog

**Technology Stack:**

- **Framework:** React 19
- **Data Source:** `packages/design-system/tokens/dist/tokens-docs.json`
- **Styling:** CSS Modules with design system tokens
- **Search:** Client-side filtering with debounce
- **Clipboard:** [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

**Data Loading:**

```typescript
// Load tokens-docs.json at build time
import tokensDocsJson from '@grasdouble/lufa_design-system-tokens/dist/tokens-docs.json';

interface TokenMetadata {
  name: string;
  path: string; // "color.background.primary"
  value: string; // "#3B82F6"
  cssVar: string; // "--lufa-color-background-primary"
  type: 'color' | 'spacing' | 'shadow' | 'typography' | 'radius' | 'timing';
  category: 'primitive' | 'core' | 'semantic' | 'component';
  role?: string; // "background", "text", "border"
  themable: boolean;
  description?: string;
  intent?: string;
  wcag?: {
    level: 'AAA' | 'AA' | 'fail';
    ratio?: number;
    against?: string; // Token it's contrasted against
  };
  references?: string[]; // Tokens that reference this one
  referencedBy?: string[]; // Tokens this references
}
```

**Component Structure:**

```
TokensCatalog (main container)
├── TokenFilters (search + dropdowns)
├── TokenGrid (layout)
│   └── TokenCard[] (individual token display)
│       ├── TokenPreview (color/spacing/shadow/typography/radius)
│       ├── TokenInfo (name, value, CSS var, TS path)
│       ├── TokenMetadata (description, intent, wcag, themable)
│       └── TokenActions (copy CSS, copy TS, view docs)
```

**Preview Components:**

1. **ColorPreview:**
   - 64×64px swatch
   - Hex value below
   - WCAG badge (AAA/AA/fail)
   - Border for light colors

2. **SpacingPreview:**
   - Horizontal bar scaled to pixel value
   - Ruler markings
   - Label with rem + px

3. **ShadowPreview:**
   - 100×100px box with shadow applied
   - Light background for visibility

4. **TypographyPreview:**
   - Text sample: "The quick brown fox jumps over the lazy dog"
   - Applied font family, size, weight, line height

5. **RadiusPreview:**
   - 80×80px box with border radius applied
   - Border for visibility

---

### CI Validation Scripts

**validate-component-metadata.js:**

```javascript
// Read all component files in src/components/
// Parse TypeScript AST (using typescript compiler API)
// Check:
// - Component has JSDoc comment
// - Props interface has JSDoc for each prop
// - displayName is set
// Exit 1 if any check fails

const results = {
  passed: [],
  failed: [],
};

// For each component:
// - Parse with TypeScript compiler
// - Check for JSDoc on component function
// - Check for JSDoc on props interface properties
// - Check for displayName assignment
// - Collect results

if (results.failed.length > 0) {
  console.error('❌ Component metadata validation failed');
  console.error(results.failed);
  process.exit(1);
}
```

**validate-token-usage.js:**

```javascript
// Read all component files
// Search for hardcoded values:
// - Color values: /#[0-9A-Fa-f]{3,8}/, /rgb\(/, /hsl\(/
// - Spacing: /\d+px(?!.*var\()/, /\d+rem(?!.*var\()/
// - Imports from primitives: /from ['"]@grasdouble\/lufa_design-system-primitives['"]/

const violations = [];

// For each component file:
// - Read content
// - Search for hardcoded patterns (regex)
// - Search for primitive imports
// - Collect violations with line numbers

if (violations.length > 0) {
  console.error('❌ Token usage validation failed');
  console.error('Found hardcoded values or primitive imports:');
  console.error(violations);
  process.exit(1);
}
```

**validate-a11y-metadata.js:**

```javascript
// Read all component Playwright tests
// Check for accessibility test blocks:
// - test.describe('Accessibility')
// - test('keyboard navigation')
// - test('focus management')
// - test('ARIA attributes')

const results = {
  passed: [],
  failed: [],
};

// For each component:
// - Find corresponding .spec.tsx file
// - Parse test structure
// - Check for accessibility test blocks
// - Collect results

if (results.failed.length > 0) {
  console.error('❌ Accessibility metadata validation failed');
  console.error('Missing accessibility tests:');
  console.error(results.failed);
  process.exit(1);
}
```

---

### Docusaurus Auto-Generated API

**Generation Script (TypeScript):**

```typescript
// packages/design-system/docusaurus/scripts/generate-token-api.ts

import fs from 'fs';
import path from 'path';

import tokensDocsJson from '../../tokens/dist/tokens-docs.json';

// Organize tokens by category and type
const tokensByCategory = {
  primitive: {},
  core: {},
  semantic: {},
  component: {},
};

// Group tokens
tokensDocsJson.forEach((token) => {
  const category = token.category;
  const type = token.type; // 'color', 'spacing', etc.

  if (!tokensByCategory[category][type]) {
    tokensByCategory[category][type] = [];
  }

  tokensByCategory[category][type].push(token);
});

// Generate MDX files for each category/type combination
Object.entries(tokensByCategory).forEach(([category, types]) => {
  Object.entries(types).forEach(([type, tokens]) => {
    const mdxContent = generateMDX(category, type, tokens);
    const outputPath = path.join(__dirname, '../docs/api/tokens', category, `${type}.mdx`);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, mdxContent);
  });
});

function generateMDX(category, type, tokens) {
  return `---
title: ${capitalize(category)} ${capitalize(type)} Tokens
---

import { TokenTable } from '@site/src/components/TokenTable';

# ${capitalize(category)} ${capitalize(type)} Tokens

${getDescription(category, type)}

<TokenTable tokens={${JSON.stringify(tokens)}} />

## Token Details

${tokens
  .map(
    (token) => `
### \`${token.path}\`

**CSS Variable:** \`${token.cssVar}\`  
**Value:** \`${token.value}\`  
**Themable:** ${token.themable ? 'Yes' : 'No'}

${token.description || ''}

${token.intent ? `**Intent:** ${token.intent}` : ''}

${token.wcag ? `**WCAG:** ${token.wcag.level} (${token.wcag.ratio}:1)` : ''}
`
  )
  .join('\n')}
`;
}
```

---

## Implementation Plan

### Week 1: Theme Validator + TokensCatalog Foundation

**Days 1-2: Theme Validation CLI**

- Set up package structure
- Implement CSS parser (PostCSS)
- Build completeness validator
- Build value validity validator

**Days 3-4: WCAG Contrast Validator**

- Implement contrast ratio calculation
- Define token pairs to check (text/background, border/background)
- Build WCAG validation logic
- Create CLI interface (Commander.js)

**Day 5: Theme Template + CLI Polish**

- Generate default theme template CSS
- Add colored terminal output
- Write CLI documentation
- Test CLI with various theme files

---

### Week 2: TokensCatalog UI + CI Validation

**Days 1-2: TokensCatalog Core**

- Load tokens-docs.json
- Build TokenCard component
- Build preview components (Color, Spacing, Shadow)
- Implement basic grid layout

**Days 3-4: TokensCatalog Features**

- Add search functionality
- Add filter dropdowns (category, role, themable)
- Add clipboard copy (CSS var, TS path)
- Build remaining preview components (Typography, Radius)

**Day 5: CI Validation Scripts**

- Write validate-component-metadata.js
- Write validate-token-usage.js
- Write validate-a11y-metadata.js
- Create GitHub Actions workflow

---

### Week 3: Documentation + Polish

**Days 1-2: Getting Started + Theming Guides**

- Write getting-started.md
- Write theming/overview.md
- Write theming/creating-themes.md
- Write theming/validation.md

**Days 3-4: Accessibility + Contributing Guides**

- Write accessibility/overview.md
- Write accessibility/color-contrast.md
- Write contributing/overview.md
- Write contributing/creating-components.md

**Day 5: Auto-Generated API + Final Testing**

- Write generate-token-api.ts script
- Build TokenTable React component
- Generate API reference pages
- End-to-end testing of all deliverables
- Update roadmap document

---

## Risk Assessment

### High-Risk Items

| Risk                            | Likelihood | Impact | Mitigation                                                        |
| ------------------------------- | ---------- | ------ | ----------------------------------------------------------------- |
| **WCAG validation complexity**  | Medium     | High   | Use established libraries (polished), test with known-good themes |
| **TokensCatalog performance**   | Low        | Medium | Virtualize token list if >500 tokens (currently 438)              |
| **CI script false positives**   | Medium     | High   | Extensive testing, allow bypass flag for edge cases               |
| **Auto-generation script bugs** | Medium     | Medium | Manual review of generated docs, version control                  |

### Medium-Risk Items

| Risk                              | Likelihood | Impact | Mitigation                                              |
| --------------------------------- | ---------- | ------ | ------------------------------------------------------- |
| **Theme template incompleteness** | Low        | Medium | Generate from actual tokens, validate with CLI          |
| **Documentation scope creep**     | Medium     | Low    | Stick to defined outline, defer advanced topics to v2.1 |
| **CLI UX issues**                 | Low        | Low    | User testing with sample themes, iterate on feedback    |

### Low-Risk Items

- TokensCatalog UI bugs (can be fixed post-launch)
- Documentation typos (easy to correct)
- Missing edge cases in validators (can add incrementally)

---

## Timeline & Milestones

### Milestones

| Milestone                        | Target Date  | Deliverables                                           |
| -------------------------------- | ------------ | ------------------------------------------------------ |
| **M1: Theme Validator Complete** | Feb 1, 2026  | CLI functional, WCAG validation working                |
| **M2: TokensCatalog Complete**   | Feb 8, 2026  | Storybook page with all features, 438 tokens displayed |
| **M3: CI Validation Complete**   | Feb 12, 2026 | GitHub Actions workflow passing, scripts validated     |
| **M4: Documentation Complete**   | Feb 15, 2026 | All guides written, API auto-generated, reviewed       |
| **M5: Phase 7 Complete**         | Feb 16, 2026 | All success criteria met, ready for Phase 8            |

### Critical Path

```
Week 1: Theme Validator (foundation for theming guide)
  ↓
Week 2: TokensCatalog (depends on tokens-docs.json, already complete)
  ↓
Week 2: CI Validation (independent, can run parallel)
  ↓
Week 3: Documentation (depends on all tooling complete)
  ↓
Phase 7 Complete
```

**Estimated Duration:** 2.5 weeks (17-18 days)  
**Buffer:** 0.5 weeks for unexpected issues  
**Total:** 3 weeks

---

## Dependencies & Prerequisites

### Prerequisites (✅ Complete)

- ✅ Phase 5A complete (7 components delivered)
- ✅ 438 tokens defined with metadata
- ✅ `tokens-docs.json` generated and validated
- ✅ 554 Playwright tests passing
- ✅ Storybook and Docusaurus infrastructure set up

### External Dependencies

| Dependency       | Purpose        | Version | Status       |
| ---------------- | -------------- | ------- | ------------ |
| **Commander.js** | CLI framework  | ^12.0.0 | ✅ Available |
| **PostCSS**      | CSS parsing    | ^8.4.0  | ✅ Available |
| **polished**     | Color contrast | ^4.3.0  | ✅ Available |
| **TypeScript**   | Type safety    | ^5.3.0  | ✅ Installed |
| **React**        | UI components  | ^19.0.0 | ✅ Installed |

### Internal Dependencies

- `tokens-docs.json` (already generated)
- Design system tokens package (already built)
- Component library (already built)
- Playwright test suite (already passing)

---

## Testing Strategy

### Theme Validator Testing

**Test Cases:**

1. Valid theme (all tokens, correct values, WCAG pass)
2. Incomplete theme (missing tokens)
3. Invalid values (malformed colors, negative spacing)
4. WCAG failures (low contrast)
5. Edge cases (empty file, non-CSS file)

**Test Method:** Jest unit tests + manual CLI testing

---

### TokensCatalog Testing

**Test Cases:**

1. All 438 tokens displayed correctly
2. Search filters tokens
3. Category/role/themable filters work
4. Clipboard copy works (CSS var, TS path)
5. Preview components render correctly
6. Responsive layout on mobile/tablet/desktop

**Test Method:** Playwright component tests + manual Storybook testing

---

### CI Validation Testing

**Test Cases:**

1. Valid components pass all checks
2. Missing JSDoc fails metadata check
3. Hardcoded values fail token usage check
4. Missing accessibility tests fail a11y check
5. GitHub Actions workflow triggers on PR

**Test Method:** Jest unit tests + CI workflow testing

---

### Documentation Testing

**Test Cases:**

1. All links work (no 404s)
2. Code examples are correct and run
3. Auto-generated API pages match tokens-docs.json
4. Getting Started guide completes in <10 minutes
5. Theming guide produces valid theme

**Test Method:** Manual review + link checker + follow tutorials

---

## Next Steps

### Immediate Actions (This Week)

1. **Review Phase 7 Plan**
   - Validate scope and timeline
   - Confirm deliverables meet project needs
   - Get approval to proceed

2. **Set Up Theme Validator Package**
   - Create package directory structure
   - Initialize package.json
   - Set up TypeScript configuration
   - Install dependencies (Commander, PostCSS, polished)

3. **Begin CLI Implementation**
   - Implement CSS parser
   - Build completeness validator
   - Write initial tests

### Week 1 Goals

- ✅ Theme validation CLI functional
- ✅ WCAG contrast validation working
- ✅ Default theme template generated
- ✅ CLI documentation written

### Phase 7 Success Indicators

- ✅ `npx lufa-validate-theme` runs successfully
- ✅ All 438 tokens visible in TokensCatalog
- ✅ CI validation scripts catch component metadata issues
- ✅ Getting Started guide completes in <10 minutes
- ✅ Auto-generated API reference matches tokens-docs.json
- ✅ All documentation links work
- ✅ Phase 7 marked complete in roadmap

---

## Appendix

### Related Documents

- [Phase 5A Completion Summary](_bmad-output/analysis/phase-5a-completion-summary.md)
- [Roadmap & Status](packages/design-system/docs/roadmap-and-status.md)
- [Development Policies](packages/design-system/docs/development-policies.md)
- [AGENTS.md](AGENTS.md)

### Reference Links

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Commander.js Documentation](https://github.com/tj/commander.js)
- [PostCSS Documentation](https://postcss.org/)
- [Docusaurus MDX Guide](https://docusaurus.io/docs/markdown-features)

### Questions for Review

1. **Scope:** Does the Phase 7 scope align with v2.0 release goals?
2. **Timeline:** Is 2-3 weeks realistic for all deliverables?
3. **Priorities:** Should any deliverable be moved to P1 (nice-to-have)?
4. **Resources:** Are there any missing dependencies or blockers?

---

**Document Status:** 🎯 Ready for Review  
**Next Action:** Approve plan and begin Week 1 implementation  
**Owner:** Design System Team  
**Last Updated:** January 25, 2026
