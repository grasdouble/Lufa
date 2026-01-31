# AI Code Patterns: Playwright Tests

## Usage

Copy these patterns exactly. Replace `[Component]` and values accordingly.

## PATTERN: BASIC_RENDER

Standard mount test using experimental-ct-react.

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { [Component] } from '@grasdouble/lufa_design-system';

test.describe('[Component]', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<[Component]>Content</[Component]>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText('Content');
  });
});
```

## PATTERN: VISUAL_REGRESSION

Snapshot testing for visual consistency.

```typescript
test.describe('[Component] Visuals', () => {
  test('should match snapshot - default', async ({ mount }) => {
    const component = await mount(<[Component] />);
    await expect(component).toHaveScreenshot();
  });

  test('should match snapshot - variants', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 20 }}>
        <[Component] variant="primary" />
        <div style={{ height: 10 }} />
        <[Component] variant="secondary" />
      </div>
    );
    await expect(component).toHaveScreenshot();
  });
});
```

## PATTERN: ACCESSIBILITY (AXE)

Automated a11y check using axe-core integration.

```typescript
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page, mount }) => {
  await mount(<[Component]>Accessible Content</[Component]>);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('[data-testid="root"]') // Adjust selector as needed
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## PATTERN: INTERACTION_STATE

Testing interactive states (hover, focus, disabled).

```typescript
test('should handle disabled state', async ({ mount }) => {
  const component = await mount(<[Component] disabled onClick={() => {}} />);

  await component.click({ force: true });
  // Assert click handler was NOT called (requires spy/mock if strictly needed,
  // or check visual state classes)
  await expect(component).toHaveAttribute('aria-disabled', 'true');
  await expect(component).toHaveCSS('cursor', 'not-allowed');
});
```
