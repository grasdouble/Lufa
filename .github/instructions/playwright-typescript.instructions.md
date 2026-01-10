---
description: 'Playwright test generation instructions'
applyTo: '**'
---

## Test Writing Guidelines

### Code Quality Standards

- **Locators**: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.

### Test Structure

- **Imports**: Start with `import { test, expect } from '@playwright/test';`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.

### File Organization

- **Location**: Store all test files in the `tests/` directory.
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `search.spec.ts`).
- **Scope**: Aim for one test file per major application feature or page.

### Assertion Best Practices

- **UI Structure**: Use `toMatchAriaSnapshot` to verify the accessibility tree structure of a component. This provides a comprehensive and accessible snapshot.
- **Element Counts**: Use `toHaveCount` to assert the number of elements found by a locator.
- **Text Content**: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- **Navigation**: Use `toHaveURL` to verify the page URL after an action.

## Example Test Structure

```typescript
import { expect, test } from '@playwright/test';

test.describe('Movie Search Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  });

  test('Search for a movie by title', async ({ page }) => {
    await test.step('Activate and perform search', async () => {
      await page.getByRole('search').click();
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      await searchInput.fill('Garfield');
      await searchInput.press('Enter');
    });

    await test.step('Verify search results', async () => {
      // Verify the accessibility tree of the search results
      await expect(page.getByRole('main')).toMatchAriaSnapshot(`
        - main:
          - heading "Garfield" [level=1]
          - heading "search results" [level=2]
          - list "movies":
            - listitem "movie":
              - link "poster of The Garfield Movie The Garfield Movie rating":
                - /url: /playwright-movies-app/movie?id=tt5779228&page=1
                - img "poster of The Garfield Movie"
                - heading "The Garfield Movie" [level=2]
      `);
    });
  });
});
```

## Playwright Component Testing (Playwright CT)

This project uses `@playwright/experimental-ct-react` for component testing in the design system.

### Setup and Configuration

**Test Location**: Co-locate tests with components as `*.spec.tsx`
**Config File**: `packages/design-system/main/playwright-ct.config.ts`
**Command**: `pnpm --filter @grasdouble/lufa_design-system test-ct`

### Basic Component Test Structure

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test.describe('Button Component', () => {
  test('renders with correct text', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toContainText('Click me');
  });

  test('handles user interactions', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button onClick={() => { clicked = true; }}>Click</Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  test('applies variant classes correctly', async ({ mount }) => {
    const component = await mount(<Button variant="primary">Primary</Button>);
    await expect(component).toHaveClass(/btn-primary/);
  });

  test('supports keyboard navigation', async ({ mount }) => {
    const component = await mount(<Button>Press me</Button>);
    await component.focus();
    await expect(component).toBeFocused();
    await component.press('Enter');
  });
});
```

### Key Differences: Component Testing vs E2E Testing

| Aspect | E2E Testing | Component Testing |
|--------|-------------|-------------------|
| **Entry point** | `page.goto(url)` | `mount(<Component />)` |
| **Scope** | Full application flow | Single component in isolation |
| **Dependencies** | Real backend/APIs | Mocked via props |
| **Speed** | Slower (browser + server) | Faster (component only) |
| **Use case** | User workflows | Component behavior and variants |

### Component Testing Best Practices

1. **Test User-Facing Behavior**: Focus on what users see and interact with, not implementation
2. **Use Accessible Locators**: Prioritize `getByRole`, `getByLabel`, `getByText`
3. **Test All Variants**: Ensure each variant (size, color, state) renders correctly
4. **Test Interactions**: Click, focus, keyboard events, form submissions
5. **Mock External Dependencies**: Pass mock functions via props instead of real APIs
6. **Test Accessibility**: Keyboard navigation, ARIA attributes, focus management

### Testing Pattern for Design System Components

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { TextField } from './TextField';

test.describe('TextField Component', () => {
  test.describe('Rendering', () => {
    test('renders with label', async ({ mount }) => {
      const component = await mount(<TextField label="Email" />);
      await expect(component.getByText('Email')).toBeVisible();
    });

    test('renders with placeholder', async ({ mount }) => {
      const component = await mount(<TextField placeholder="Enter email" />);
      await expect(component.getByPlaceholder('Enter email')).toBeVisible();
    });
  });

  test.describe('User Interactions', () => {
    test('allows text input', async ({ mount }) => {
      const component = await mount(<TextField label="Name" />);
      const input = component.getByRole('textbox');
      await input.fill('John Doe');
      await expect(input).toHaveValue('John Doe');
    });

    test('calls onChange handler', async ({ mount }) => {
      let value = '';
      const component = await mount(
        <TextField onChange={(e) => { value = e.target.value; }} />
      );
      await component.getByRole('textbox').fill('test');
      expect(value).toBe('test');
    });
  });

  test.describe('Accessibility', () => {
    test('associates label with input', async ({ mount }) => {
      const component = await mount(<TextField label="Email" id="email" />);
      const input = component.getByLabelText('Email');
      await expect(input).toHaveAttribute('id', 'email');
    });

    test('supports keyboard navigation', async ({ mount }) => {
      const component = await mount(<TextField label="Name" />);
      await component.getByRole('textbox').press('Tab');
      // Verify focus moves correctly in your component
    });
  });

  test.describe('Error States', () => {
    test('displays error message', async ({ mount }) => {
      const component = await mount(
        <TextField label="Email" error="Invalid email" />
      );
      await expect(component.getByText('Invalid email')).toBeVisible();
    });
  });
});
```

### Running Component Tests

```bash
# Run all component tests
pnpm --filter @grasdouble/lufa_design-system test-ct

# Run in UI mode (interactive)
pnpm --filter @grasdouble/lufa_design-system test-ct --ui

# Run specific test file
pnpm --filter @grasdouble/lufa_design-system test-ct Button.spec

# Debug mode
pnpm --filter @grasdouble/lufa_design-system test-ct --debug
```

### Integration with Storybook

Component tests can leverage Storybook stories:

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { Primary, Secondary } from './Button.stories';

test('Primary story renders correctly', async ({ mount }) => {
  const component = await mount(<Primary {...Primary.args} />);
  await expect(component).toHaveClass(/btn-primary/);
});
```

### Component Test Checklist

Before marking component testing complete:

- [ ] All component variants tested (size, color, state)
- [ ] User interactions tested (click, focus, input)
- [ ] Accessibility features verified (keyboard, ARIA, labels)
- [ ] Error states and edge cases covered
- [ ] Props validation tested
- [ ] Component renders in isolation without errors
- [ ] Tests use accessible locators (getByRole preferred)
- [ ] Test descriptions clearly state intent

### Resources

- [Playwright Component Testing Docs](https://playwright.dev/docs/test-components)
- [Design System Testing Patterns](../../AGENTS.md#testing-instructions)
- [Accessibility Testing Guide](a11y.instructions.md)

---

## Test Execution Strategy

1. **Initial Run**: Execute tests with `npx playwright test --project=chromium`
2. **Debug Failures**: Analyze test failures and identify root causes
3. **Iterate**: Refine locators, assertions, or test logic as needed
4. **Validate**: Ensure tests pass consistently and cover the intended functionality
5. **Report**: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:

- [ ] All locators are accessible and specific and avoid strict mode violations
- [ ] Tests are grouped logically and follow a clear structure
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented

---

## Related Documentation

For comprehensive project documentation, see:

- **[AGENTS.md](../../AGENTS.md)** - Complete development guide
  - Project overview and architecture
  - Setup and development workflow
  - Code patterns and examples
  - Troubleshooting guides

- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/copilot-instructions.md](../copilot-instructions.md)** - GitHub Copilot instructions
- **[CONTRIBUTING.md](../../CONTRIBUTING.md)** - Contribution workflow

**This file is automatically applied by GitHub Copilot when working in matching file paths.**
