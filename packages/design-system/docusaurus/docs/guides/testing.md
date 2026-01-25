---
sidebar_position: 3
---

# Testing Guide

Learn how to test components built with Lufa Design System, including accessibility testing, unit tests, and visual regression testing.

## Testing Philosophy

The Lufa Design System is tested using **Playwright Component Testing**, which provides:

- **Real browser rendering** for accurate component behavior
- **Built-in accessibility testing** with axe-core integration
- **Visual regression testing** with screenshot comparison
- **Multi-browser support** (Chromium, Firefox, WebKit, Mobile)

## Setting Up Testing

### Install Dependencies

```bash
# Install Playwright (if not already installed)
pnpm add -D @playwright/experimental-ct-react

# Install testing utilities
pnpm add -D @axe-core/playwright
```

### Configure Playwright

```typescript title="playwright-ct.config.ts"
import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './src/components',
  snapshotDir: './snapshots',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## Writing Component Tests

### Basic Component Test

```tsx title="src/components/Button.spec.tsx"
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from './Button';

test.describe('Button Component', () => {
  test('renders with correct text', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toContainText('Click me');
  });

  test('handles click events', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  test('applies variant classes correctly', async ({ mount }) => {
    const component = await mount(<Button variant="primary">Primary</Button>);
    await expect(component).toHaveClass(/btn-primary/);
  });
});
```

### Testing Accessibility

```tsx title="src/components/Button.a11y.spec.tsx"
import { expect, test } from '@playwright/experimental-ct-react';
import { checkA11y, injectAxe } from 'axe-playwright';

import { Button } from './Button';

test.describe('Button Accessibility', () => {
  test('is keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<Button>Press me</Button>);

    // Focus the button
    await component.focus();
    await expect(component).toBeFocused();

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await expect(component).toHaveAttribute('aria-pressed', 'true');
  });

  test('has proper ARIA attributes', async ({ mount }) => {
    const component = await mount(
      <Button aria-label="Delete item">
        <Icon name="trash" />
      </Button>
    );

    await expect(component).toHaveAttribute('role', 'button');
    await expect(component).toHaveAttribute('aria-label', 'Delete item');
  });

  test('passes axe accessibility audit', async ({ mount, page }) => {
    await mount(<Button>Accessible Button</Button>);
    await injectAxe(page);
    await checkA11y(page);
  });

  test('has sufficient color contrast', async ({ mount, page }) => {
    const component = await mount(<Button variant="primary">Button</Button>);

    // Check contrast ratio meets WCAG AA (4.5:1 for normal text)
    const contrast = await page.evaluate(
      (el) => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color,
          backgroundColor: styles.backgroundColor,
        };
      },
      await component.elementHandle()
    );

    // Use contrast checker library or manual calculation
    expect(contrast).toBeDefined();
  });
});
```

### Testing Component Variants

```tsx title="src/components/Badge.spec.tsx"
import { expect, test } from '@playwright/experimental-ct-react';

import { Badge } from './Badge';

test.describe('Badge Variants', () => {
  const variants = ['default', 'success', 'warning', 'error'] as const;

  for (const variant of variants) {
    test(`renders ${variant} variant correctly`, async ({ mount }) => {
      const component = await mount(<Badge variant={variant}>Status</Badge>);

      await expect(component).toHaveClass(new RegExp(`badge-${variant}`));
      await expect(component).toBeVisible();
    });
  }

  test('renders all sizes correctly', async ({ mount }) => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const component = await mount(<Badge size={size}>Badge</Badge>);
      await expect(component).toHaveClass(new RegExp(`badge-${size}`));
    }
  });
});
```

### Visual Regression Testing

```tsx title="src/components/Button.visual.spec.tsx"
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from './Button';

test.describe('Button Visual Regression', () => {
  test('matches snapshot in default state', async ({ mount }) => {
    const component = await mount(<Button>Default Button</Button>);
    await expect(component).toHaveScreenshot('button-default.png');
  });

  test('matches snapshot in hover state', async ({ mount }) => {
    const component = await mount(<Button>Hover Button</Button>);
    await component.hover();
    await expect(component).toHaveScreenshot('button-hover.png');
  });

  test('matches snapshot in focus state', async ({ mount }) => {
    const component = await mount(<Button>Focus Button</Button>);
    await component.focus();
    await expect(component).toHaveScreenshot('button-focus.png');
  });

  test('matches snapshot in disabled state', async ({ mount }) => {
    const component = await mount(<Button disabled>Disabled</Button>);
    await expect(component).toHaveScreenshot('button-disabled.png');
  });
});
```

## Running Tests

```bash
# Run all component tests
pnpm test-ct

# Run tests in UI mode (interactive debugging)
pnpm test-ct --ui

# Run specific test file
pnpm test-ct Button.spec.tsx

# Update snapshots after intentional design changes
pnpm test-ct --update-snapshots

# Run tests in specific browser
pnpm test-ct --project=chromium
```

## Testing Best Practices

### Do ✅

- **Test user-facing behavior**, not implementation details
- **Use accessible locators** (`getByRole`, `getByLabel`) over CSS selectors
- **Test keyboard navigation** for all interactive components
- **Include axe-core checks** for automated accessibility testing
- **Create visual regression snapshots** for all component states
- **Test dark mode** if your components support it
- **Mock external dependencies** (APIs, timers) for predictable tests

### Don't ❌

- **Don't test internal component state** directly
- **Don't rely on brittle CSS selectors** (prefer semantic queries)
- **Don't skip accessibility tests** (keyboard, ARIA, contrast)
- **Don't ignore snapshot differences** without review
- **Don't test third-party library internals**

## Accessibility Testing Checklist

When testing components with Lufa:

- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrows)
- [ ] Focus indicators are visible
- [ ] Screen reader announcements are correct
- [ ] ARIA attributes are properly set
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] Component is usable without mouse/trackpad
- [ ] Heading hierarchy is correct
- [ ] Forms have proper labels and validation
- [ ] Interactive elements have accessible names

## Common Testing Patterns

### Testing Forms

```tsx
test('form submission with validation', async ({ mount, page }) => {
  let submitted = false;

  const component = await mount(
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitted = true;
      }}
    >
      <Input label="Email" type="email" required />
      <Button type="submit">Submit</Button>
    </form>
  );

  const input = component.locator('input[type="email"]');
  const button = component.locator('button[type="submit"]');

  // Test empty submission (should fail validation)
  await button.click();
  expect(submitted).toBe(false);

  // Test valid submission
  await input.fill('test@example.com');
  await button.click();
  expect(submitted).toBe(true);
});
```

### Testing Dark Mode

```tsx
test('renders correctly in dark mode', async ({ mount, page }) => {
  // Set dark mode attribute
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  const component = await mount(<Button>Dark Mode Button</Button>);
  await expect(component).toHaveScreenshot('button-dark.png');
});
```

## Next Steps

- [Accessibility Guide](/docs/accessibility) - Learn about WCAG compliance
- [Component Overview](/docs/components/overview) - Browse testable components
- [Playwright Docs](https://playwright.dev/docs/test-components) - Official Playwright testing guide

:::tip Run Tests Locally
Always run the full test suite before committing changes:

```bash
pnpm all:test
```

:::
