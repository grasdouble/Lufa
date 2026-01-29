# Testing Strategy: Color Token Refinement

**Subject:** color-token-refinement  
**Version:** v0.8.0+  
**Last Updated:** 2026-01-26

---

## Overview

This document outlines the comprehensive testing strategy for the Lufa Design System color token refinement, including visual regression, accessibility, and automated testing approaches.

---

## Testing Pyramid

```
        /\
       /  \
      / E2E \ ←  5% (Critical user flows)
     /------\
    /  Integ \  ← 15% (Component integration)
   /----------\
  / Unit Tests \ ← 80% (Token validation, contrast checks)
 /--------------\
```

---

## 1. Visual Regression Testing

### Approach

**Tool:** Playwright + Storybook

**Strategy:** Capture screenshots of all components in all modes and compare pixel-by-pixel

### Setup

**Install Dependencies:**

```bash
pnpm add -D @playwright/test
pnpm add -D playwright-storybook
```

**Create Test File:**

`packages/design-system/playwright/tests/visual/tokens.visual.spec.ts`

```typescript
import { expect, test } from '@playwright/test';

test.describe('Visual Regression - Tokens', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  const modes = ['light', 'dark', 'high-contrast'];

  modes.forEach((mode) => {
    test(`Button variants in ${mode} mode`, async ({ page }) => {
      // Navigate to Button story
      await page.goto('http://localhost:6006/?path=/story/components-button--all-variants');

      // Set mode
      await page.evaluate((m) => {
        document.documentElement.setAttribute('data-mode', m);
      }, mode);

      // Wait for styles to apply
      await page.waitForTimeout(100);

      // Take screenshot
      await expect(page).toHaveScreenshot(`button-variants-${mode}.png`, {
        fullPage: true,
        threshold: 0.001, // 0.1% difference allowed
      });
    });
  });
});
```

### Test Matrix

**Components to Test:**

| Component | Variants | States | Modes | Total Screenshots |
| --------- | -------- | ------ | ----- | ----------------- |
| Button    | 7        | 4      | 3     | 84                |
| Input     | 5        | 4      | 3     | 60                |
| Card      | 3        | 2      | 3     | 18                |
| Modal     | 2        | 1      | 3     | 6                 |
| Alert     | 4        | 1      | 3     | 12                |
| **Total** | -        | -      | -     | **180**           |

**Variants:** Different visual styles (e.g., primary, secondary, success)  
**States:** Interactive states (default, hover, focus, disabled)  
**Modes:** Theme modes (light, dark, high-contrast)

### CI/CD Integration

**GitHub Actions Workflow:**

`.github/workflows/visual-regression.yml`

```yaml
name: Visual Regression Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Build Storybook
        run: pnpm --filter @grasdouble/lufa_design-system-storybook build

      - name: Run visual tests
        run: pnpm --filter @grasdouble/lufa_design-system-playwright test:visual

      - name: Upload diff screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: visual-diffs
          path: packages/design-system/playwright/test-results/
```

### Running Tests

```bash
# Run all visual tests
pnpm --filter @grasdouble/lufa_design-system-playwright test:visual

# Update baseline screenshots
pnpm --filter @grasdouble/lufa_design-system-playwright test:visual -- --update-snapshots

# Run in headed mode (see browser)
pnpm --filter @grasdouble/lufa_design-system-playwright test:visual -- --headed
```

### Threshold Configuration

```typescript
// playwright.config.ts
export default {
  expect: {
    toHaveScreenshot: {
      threshold: 0.001, // 0.1% pixel difference
      maxDiffPixels: 100, // Max 100 pixels different
      maxDiffPixelRatio: 0.001, // Max 0.1% of pixels
    },
  },
};
```

---

## 2. Accessibility Testing

### 2.1 Windows High Contrast Mode

**Approach:** Manual testing with Windows native HCM

#### Setup

1. **Enable Windows HCM:**
   - Press: `Win + Alt + PrtScn`
   - Or: Settings → Accessibility → High contrast → Choose theme

2. **Test Browsers:**
   - Chrome, Edge, Firefox

#### Test Checklist

**Components:**

- [ ] Button - All variants visible and readable
- [ ] Input - Border visible, text readable
- [ ] Card - Clear boundaries, readable content
- [ ] Modal - Backdrop visible, content clear
- [ ] Alert - Icons visible, text readable
- [ ] Navigation - Links distinguishable
- [ ] Form validation - Errors clearly visible

**UI Patterns:**

- [ ] Hover states - Distinguishable
- [ ] Focus states - Visible outline (2px minimum)
- [ ] Active states - Clear feedback
- [ ] Disabled states - Visually different but still readable
- [ ] Selected states - Clear indication

**Content:**

- [ ] All text readable (7:1 contrast)
- [ ] No color-only information
- [ ] Icons have text alternatives
- [ ] Links distinguishable from body text

#### Documentation Template

`docs/testing/hcm-test-report-YYYY-MM-DD.md`

```markdown
# Windows HCM Test Report

**Date:** YYYY-MM-DD  
**Tester:** [Name]  
**Environment:** Windows 11, Chrome 119

## Test Results

### Button Component

- ✅ Primary: Visible, readable, 21:1 contrast
- ✅ Secondary: Visible, readable, 21:1 contrast
- ⚠️ Warning: Text contrast 5:1 (AA, not AAA) - Acceptable for large text
- ✅ Focus state: 2px solid outline, clearly visible

### Input Component

- ✅ Border: Visible (1px solid black)
- ✅ Placeholder: Readable (contrast 7:1)
- ❌ Focus outline: Not visible with some HCM themes
  - **Fix:** Increase outline width to 2px

## Issues Found

1. Focus outlines need minimum 2px width
2. Warning button text needs adjustment for small text sizes

## Recommendations

- Increase all focus outline widths
- Add text labels for color-only indicators
```

### 2.2 macOS Increase Contrast

**Approach:** Manual testing with macOS accessibility setting

#### Setup

1. **Enable Increase Contrast:**
   - System Preferences → Accessibility → Display
   - Check "Increase contrast"

2. **Test Browsers:**
   - Safari, Chrome, Firefox

#### Test Checklist

Same as Windows HCM (above), but also test:

- [ ] Transparency effects reduced
- [ ] System UI elements have increased contrast
- [ ] Reduced motion respected (if enabled)

### 2.3 Screen Reader Testing

**Approach:** Manual testing with NVDA, JAWS, VoiceOver

#### Tools

- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)

#### Test Checklist

**Components:**

- [ ] Button - Role announced, label clear
- [ ] Input - Label associated, validation announced
- [ ] Modal - Focus trapped, close button accessible
- [ ] Alert - Role="alert", message announced
- [ ] Navigation - Landmarks clear, links described

**Interactions:**

- [ ] Keyboard navigation - Logical tab order
- [ ] Focus management - Clear focus indicator
- [ ] Dynamic content - Changes announced
- [ ] Form validation - Errors announced
- [ ] Loading states - Status announced

#### Documentation Template

`docs/testing/screen-reader-test-YYYY-MM-DD.md`

```markdown
# Screen Reader Test Report

**Date:** YYYY-MM-DD  
**Tester:** [Name]  
**Tool:** NVDA 2023.3, Chrome 119

## Component: Button

**Test Case:** Primary button activation

**Steps:**

1. Tab to button
2. Listen to announcement
3. Press Enter/Space
4. Verify action

**Expected:** "Primary Button, button, press Enter to activate"  
**Actual:** "Primary Button, button"  
**Status:** ✅ Pass

**Notes:** Clear, concise announcement

## Issues Found

- Modal close button not announced
- Form validation errors not associated with inputs

## Recommendations

- Add aria-label to close buttons
- Use aria-describedby for error messages
```

---

## 3. Automated Accessibility Testing

### 3.1 axe-core Integration

**Approach:** Automated WCAG validation with axe-core

#### Setup

**Install Dependencies:**

```bash
pnpm add -D @axe-core/playwright
```

**Create Test File:**

`packages/design-system/playwright/tests/a11y/tokens.a11y.spec.ts`

```typescript
import { checkA11y, injectAxe } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Accessibility - Color Tokens', () => {
  const modes = ['light', 'dark', 'high-contrast'];

  modes.forEach((mode) => {
    test(`WCAG AAA compliance in ${mode} mode`, async ({ page }) => {
      await page.goto('http://localhost:6006/?path=/story/tokens-colors');

      // Set mode
      await page.evaluate((m) => {
        document.documentElement.setAttribute('data-mode', m);
      }, mode);

      // Inject axe
      await injectAxe(page);

      // Run accessibility checks
      await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
        rules: {
          'color-contrast': { enabled: true }, // WCAG 2.1 contrast
          'color-contrast-enhanced': { enabled: true }, // WCAG AAA
          'link-in-text-block': { enabled: true },
        },
      });
    });
  });
});
```

#### Test Matrix

| Component  | WCAG Level | Rules                   | Expected        |
| ---------- | ---------- | ----------------------- | --------------- |
| All tokens | AAA        | color-contrast-enhanced | 7:1 ratio       |
| Buttons    | AAA        | color-contrast          | Pass            |
| Links      | AAA        | link-in-text-block      | Distinguishable |
| Forms      | AAA        | label, input-label      | Associated      |

#### CI/CD Integration

```yaml
# .github/workflows/a11y-tests.yml
name: Accessibility Tests
on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Run A11y tests
        run: pnpm --filter @grasdouble/lufa_design-system-playwright test:a11y

      - name: Upload A11y report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: a11y-report
          path: packages/design-system/playwright/a11y-report/
```

### 3.2 Pre-commit Hooks

**Setup Husky + lint-staged:**

`package.json` (root)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "packages/design-system/main/src/**/*.{ts,tsx}": [
      "eslint --fix",
      "pnpm --filter @grasdouble/lufa_design-system-playwright test:a11y:changed"
    ],
    "packages/design-system/tokens/src/**/*.json": ["pnpm --filter @grasdouble/lufa_design-system-tokens test:contrast"]
  }
}
```

**Create Contrast Check Script:**

`packages/design-system/tokens/scripts/check-contrast.js`

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Load compiled tokens
const tokens = require('../dist/tokens-values.json');

// Check contrast ratios
function checkContrast(tokens) {
  const errors = [];

  // Example: Check text on background combinations
  const textColor = tokens.semantic.ui['text-primary'].value;
  const bgColor = tokens.semantic.ui['background-page'].value;

  const ratio = calculateContrast(textColor, bgColor);

  if (ratio < 7.0) {
    errors.push(`Text contrast ${ratio.toFixed(2)}:1 (requires 7:1 for AAA)`);
  }

  return errors;
}

// Exit with error if checks fail
const errors = checkContrast(tokens);
if (errors.length > 0) {
  console.error('❌ Contrast check failed:');
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log('✅ All contrast checks passed');
```

---

## 4. Unit Testing

### 4.1 Token Validation

**Approach:** Automated tests for token structure and values

`packages/design-system/tokens/tests/tokens.test.ts`

```typescript
import { describe, expect, it } from 'vitest';

import tokens from '../dist/tokens-values.json';

describe('Token Structure', () => {
  it('should have all required HC primitives', () => {
    const hcColors = ['black', 'white', 'blue', 'red', 'green', 'yellow'];
    hcColors.forEach((color) => {
      expect(tokens.primitive.color.hc[color]).toBeDefined();
    });
  });

  it('should have alpha tokens at all levels', () => {
    const alphaLevels = [4, 8, 16, 38, 50, 60, 80, 90, 100];
    alphaLevels.forEach((level) => {
      expect(tokens.primitive.color.alpha.black[level]).toBeDefined();
      expect(tokens.primitive.color.alpha.white[level]).toBeDefined();
    });
  });
});

describe('Token Values', () => {
  it('should have pure HC colors', () => {
    expect(tokens.primitive.color.hc.black.value).toBe('#000000');
    expect(tokens.primitive.color.hc.white.value).toBe('#ffffff');
    expect(tokens.primitive.color.hc.blue.value).toBe('#0000ff');
  });

  it('should have correct alpha values', () => {
    expect(tokens.primitive.color.alpha.black[50].value).toBe('rgba(0, 0, 0, 0.5)');
    expect(tokens.primitive.color.alpha.white[38].value).toBe('rgba(255, 255, 255, 0.38)');
  });
});

describe('Mode-Specific Values', () => {
  it('should have HC mode overrides', () => {
    const overlayToken = tokens.semantic.ui['overlay-backdrop'];
    expect(overlayToken.modes['high-contrast']).toBeDefined();
    expect(overlayToken.modes['high-contrast']).toContain('0.9'); // 90% opacity
  });
});
```

### 4.2 Contrast Calculation

`packages/design-system/tokens/tests/contrast.test.ts`

```typescript
import { describe, expect, it } from 'vitest';

import { calculateContrast } from '../utils/contrast';

describe('Contrast Ratios', () => {
  it('should calculate 21:1 for black on white', () => {
    const ratio = calculateContrast('#000000', '#ffffff');
    expect(ratio).toBe(21);
  });

  it('should calculate 8.6:1 for pure blue on white', () => {
    const ratio = calculateContrast('#0000ff', '#ffffff');
    expect(ratio).toBeGreaterThan(8.5);
    expect(ratio).toBeLessThan(9.0);
  });

  it('should meet WCAG AAA for all HC tokens', () => {
    const hcTokens = [
      { fg: '#000000', bg: '#ffffff' }, // black on white
      { fg: '#0000ff', bg: '#ffffff' }, // blue on white
      { fg: '#ffff00', bg: '#000000' }, // yellow on black
    ];

    hcTokens.forEach(({ fg, bg }) => {
      const ratio = calculateContrast(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(7.0); // WCAG AAA
    });
  });
});
```

---

## 5. Performance Testing

### CSS File Size Monitoring

**Script:** `packages/design-system/tokens/scripts/check-css-size.js`

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const MAX_SIZE_KB = 70;
const WARNING_SIZE_KB = 65;
const cssPath = path.join(__dirname, '../dist/tokens.css');

// Get file size
const stats = fs.statSync(cssPath);
const sizeKB = stats.size / 1024;

console.log(`📊 CSS file size: ${sizeKB.toFixed(2)} KB`);

if (sizeKB > MAX_SIZE_KB) {
  console.error(`❌ CSS file size exceeds ${MAX_SIZE_KB} KB threshold!`);
  process.exit(1);
} else if (sizeKB > WARNING_SIZE_KB) {
  console.warn(`⚠️  CSS file size approaching ${MAX_SIZE_KB} KB limit`);
} else {
  console.log(`✅ CSS file size within limits`);
}
```

**Add to package.json:**

```json
{
  "scripts": {
    "build": "pnpm clean && style-dictionary build && pnpm check-size",
    "check-size": "node scripts/check-css-size.js"
  }
}
```

**CI/CD Integration:**

```yaml
# .github/workflows/size-check.yml
- name: Check CSS size
  run: |
    cd packages/design-system/tokens
    pnpm build # Automatically runs check-size
```

---

## 6. Test Coverage Goals

| Test Type             | Coverage Target       | Current  | Status         |
| --------------------- | --------------------- | -------- | -------------- |
| **Unit Tests**        | 100% token validation | 100%     | ✅             |
| **Visual Regression** | 80% components        | 0%       | ⏳ Planned     |
| **A11y Automated**    | 100% components       | 20%      | 🔄 In Progress |
| **A11y Manual**       | 100% critical paths   | 0%       | ⏳ Planned     |
| **Performance**       | CSS < 70 KB           | ✅ 61 KB | ✅             |

---

## 7. Testing Schedule

### Pre-Commit

- ✅ ESLint
- ✅ TypeScript type checking
- ⏳ A11y tests (changed files only)
- ⏳ Contrast validation

### Pre-Push

- ✅ Unit tests
- ⏳ Visual regression (changed components)

### Pull Request

- ✅ All unit tests
- ⏳ All visual regression tests
- ⏳ All automated A11y tests
- ⏳ CSS size check

### Pre-Release

- ⏳ Manual HCM testing
- ⏳ Manual screen reader testing
- ⏳ Cross-browser testing
- ⏳ Performance benchmarks

---

## Resources

- [Token Usage Guide](./token-usage-guide.md)
- [High-Contrast Guide](./high-contrast-guide.md)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Documentation](https://www.deque.com/axe/core-documentation/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-26  
**Maintained By:** Design System Team
