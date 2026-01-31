# AI Instructions: Testing (Playwright)

## Context

You are writing automated tests for the Lufa Design System components. We use Playwright for component testing, visual regression, and accessibility audits.

## File Structure

- **Location**: `packages/design-system/playwright/src/components/[ComponentName]/`
- **Naming**: `[ComponentName].spec.tsx`

## Rules for Testing

### 1. Test Coverage Requirements

Every component MUST have:

- **Mount Tests**: Verify the component renders without errors.
- **Interaction Tests**: Verify clicks, keyboard navigation, and state changes.
- **Visual Regression**: Snapshots for different variants and viewports.
- **Accessibility**: Automated AXE checks.

### 2. Implementation Standards

#### Basic Setup

```tsx
import { expect, test } from '@playwright/experimental-ct-react';

import { Component } from '@grasdouble/lufa_design-system';

test.describe('Component', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Component>Content</Component>);
    await expect(component).toBeVisible();
  });
});
```

#### Visual Regression

Use `toHaveScreenshot` for visual validation. Ensure you test strictly defined states.

```tsx
test('should match snapshot', async ({ mount }) => {
  const component = await mount(<Component variant="primary" />);
  await expect(component).toHaveScreenshot();
});
```

#### Accessibility (A11y)

Use the `axe-playwright` integration (or equivalent helper if configured) to verify WCAG compliance.

```tsx
test('should not have a11y violations', async ({ mount, makeAxeBuilder }) => {
  const component = await mount(<Component />);
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### 3. Locator Strategy

- **Prioritize Accessibility Roles**: `getByRole('button', { name: 'Save' })`
- **Avoid**: CSS selectors dependent on internal structure (e.g., `div > span:nth-child(2)`).

## 4. Code Patterns (Reference)

For standard test structures (Visual Regression, Axe A11y, Interaction), **READ AND COPY** patterns from:
`packages/design-system/_docs/ai-instructions/templates/test-patterns.md`

## Checklist for Validation

- [ ] Is the test file located in the `playwright/src` directory (NOT inside the component folder)?
- [ ] Are visual snapshots included for all major variants?
- [ ] Is an accessibility check included?
- [ ] Are interactions (click, focus) tested?
