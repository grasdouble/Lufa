---
description: Comprehensive guide for AI agents on writing Playwright component tests for the Lufa Design System
applyTo:
  - '**/*.spec.tsx'
  - '**/playwright/**'
  - 'packages/design-system/playwright/**'
tags:
  - playwright
  - testing
  - component-testing
  - visual-regression
  - design-system
---

# Playwright Component Testing - AI Agent Guide

## Purpose

This document provides **comprehensive, systematic guidance** for AI agents writing and maintaining Playwright component tests in the Lufa Design System. It focuses on **component testing patterns**, **visual regression strategies**, and **snapshot stability**.

**Target Audience**: AI coding agents (GitHub Copilot, Claude Code, OpenAI Codex Extension)  
**Scope**: Component test structure, visual regression, fixture patterns, stability best practices  
**Out of Scope**: Playwright configuration, CI/CD setup, E2E testing

---

## Philosophy

### Component Tests Are Behavioral Contracts

Playwright component tests in this project serve to **verify component behavior in isolation**.

**What component tests ARE**:

- Behavioral contracts verifying user-facing functionality
- Visual regression guards ensuring design consistency
- Accessibility validation (ARIA, keyboard navigation, focus management)
- Interactive behavior tests (clicks, form inputs, state changes)

**What component tests ARE NOT**:

- Unit tests for internal functions (use Vitest for that)
- E2E tests for full workflows (use Playwright E2E for that)
- API documentation (that lives in Docusaurus)
- Performance benchmarks (use dedicated tools)

### Visual Regression as Design Guard

Visual regression tests **prevent unintended UI changes** from reaching production. They are critical for:

1. **Design consistency**: Catch color, spacing, typography changes
2. **Cross-browser stability**: Ensure components render identically
3. **Variant coverage**: Verify all size/color/state combinations
4. **Documentation**: Visual snapshots serve as living documentation

---

## Project Structure

### Test Organization

```
packages/design-system/playwright/
├── src/
│   ├── components/
│   │   ├── feedback/
│   │   │   ├── Alert.spec.tsx          # Component tests
│   │   │   ├── Skeleton.spec.tsx
│   │   │   └── Spinner.spec.tsx
│   │   ├── forms/
│   │   │   ├── Button.spec.tsx
│   │   │   └── Input.spec.tsx
│   │   ├── layout/
│   │   │   ├── Divider.spec.tsx
│   │   │   └── ...
│   │   └── navigation/
│   │       ├── Anchor.spec.tsx
│   │       ├── Link.fixtures.tsx       # Test fixtures
│   │       └── Link.spec.tsx
│   └── fixtures/                       # Shared fixtures (if needed)
├── __snapshots__/                      # Visual regression snapshots
│   └── src/components/feedback/Alert.spec.tsx-snapshots/
│       └── alert-all-variants-chromium-darwin.png
└── playwright-ct.config.ts             # Playwright CT config
```

### File Naming Conventions

- **Test files**: `ComponentName.spec.tsx`
- **Fixture files**: `ComponentName.fixtures.tsx` (when needed)
- **Snapshots**: Auto-generated in `__snapshots__/` directory

---

## Test Structure Template

### Basic Component Test Structure

Every component test file MUST follow this structure:

```typescript
import { expect, test } from '@playwright/experimental-ct-react';
import { ComponentName } from '@grasdouble/lufa_design-system';

test.describe('ComponentName Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<ComponentName>Content</ComponentName>);
      await expect(component).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<ComponentName className="custom-class">Content</ComponentName>);
      await expect(component).toHaveClass(/custom-class/);
    });
  });

  test.describe('Variants', () => {
    // Test all variants (size, color, type, etc.)
  });

  test.describe('User Interactions', () => {
    // Test clicks, focus, keyboard events
  });

  test.describe('Accessibility', () => {
    // Test ARIA, keyboard navigation, focus management
  });

  test.describe('Visual Regression', () => {
    // Comprehensive visual snapshot test
  });
});
```

---

## Required Test Categories

Every component MUST have tests in these categories (in priority order):

### 1. Basic Rendering (REQUIRED)

**Purpose**: Verify component renders without errors

**Must include**:

- Default props render test
- Custom className application
- Custom style prop application (if supported)
- Children rendering

**Example**:

```typescript
test.describe('Basic Rendering', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Click me');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(<Button className="custom">Click</Button>);
    await expect(component).toHaveClass(/custom/);
  });

  test('should apply custom style', async ({ mount }) => {
    const component = await mount(<Button style={{ margin: '10px' }}>Click</Button>);
    await expect(component).toHaveCSS('margin', '10px');
  });
});
```

### 2. Variants (REQUIRED)

**Purpose**: Test all component variants (size, color, type, state)

**Must include**:

- All size variants (if component has sizes)
- All color/variant types (primary, secondary, etc.)
- All state variants (disabled, loading, error, etc.)
- Default variant verification

**Pattern - Loop through variants**:

```typescript
test.describe('Size Variants', () => {
  const sizes = ['sm', 'md', 'lg'] as const;

  for (const size of sizes) {
    test(`should render ${size} size`, async ({ mount }) => {
      const component = await mount(<Button size={size}>Click</Button>);
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(new RegExp(`size-${size}`));
    });
  }

  test('should default to md size', async ({ mount }) => {
    const component = await mount(<Button>Click</Button>);
    await expect(component).toHaveClass(/size-md/);
  });
});
```

### 3. User Interactions (REQUIRED)

**Purpose**: Test interactive behavior

**Must include**:

- Click handlers
- Keyboard interactions (Enter, Space, Arrow keys)
- Focus management
- Form submission (for form components)
- State changes

**Example**:

```typescript
test.describe('User Interactions', () => {
  test('should handle click events', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button onClick={() => { clicked = true; }}>Click me</Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  test('should be keyboard accessible', async ({ mount }) => {
    const component = await mount(<Button>Press me</Button>);
    await component.focus();
    await expect(component).toBeFocused();
    await component.press('Enter');
    // Assert expected behavior
  });
});
```

### 4. Accessibility (REQUIRED)

**Purpose**: Ensure WCAG 2.1 AA compliance

**Must include**:

- ARIA attributes verification
- Semantic HTML structure
- Keyboard navigation
- Focus management
- Screen reader compatibility (via ARIA snapshots)

**Example**:

```typescript
test.describe('Accessibility', () => {
  test('should have proper ARIA attributes', async ({ mount }) => {
    const component = await mount(<Alert variant="error">Error message</Alert>);
    await expect(component).toHaveAttribute('role', 'alert');
  });

  test('should have accessible structure', async ({ mount }) => {
    const component = await mount(<Button>Accessible</Button>);
    await expect(component).toMatchAriaSnapshot(`
      - button "Accessible"
    `);
  });

  test('should support keyboard navigation', async ({ mount }) => {
    const component = await mount(<Input label="Name" />);
    const input = component.getByRole('textbox');
    await input.press('Tab');
    await expect(input).toBeFocused();
  });
});
```

### 5. Visual Regression (REQUIRED - BOTH Light AND Dark Mode)

**Purpose**: Comprehensive visual snapshots showing all variants in BOTH light and dark modes

**CRITICAL**: Every component MUST have visual regression tests for BOTH light mode AND dark mode. This ensures the design system works correctly across all theme configurations.

**Must include**:

- **Light mode test**: Test showing ALL variants with default (light) theme
- **Dark mode test**: Same variants tested with dark theme enabled on document root
- Fixed-width container (NEVER use `fit-content`)
- Disabled animations
- Proper wait for render stabilization
- Clear section headers

#### Light Mode Test (Default)

For light mode, no special setup is required - just mount the component:

```typescript
test.describe('Visual Regression', () => {
  test('should match snapshot for all variants', async ({ mount }) => {
    const variants = ['primary', 'secondary', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    const component = await mount(
      <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
        <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
          ComponentName - All Variants
        </h1>

        {/* Section 1: Variants */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
            All Variants
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {variants.map((variant) => (
              <ComponentName key={variant} variant={variant}>
                {variant}
              </ComponentName>
            ))}
          </div>
        </section>

        {/* Section 2: Sizes */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
            All Sizes
          </h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {sizes.map((size) => (
              <ComponentName key={size} size={size}>
                {size}
              </ComponentName>
            ))}
          </div>
        </section>

        {/* Section 3: States */}
        <section>
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
            Different States
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ComponentName>Default</ComponentName>
            <ComponentName disabled>Disabled</ComponentName>
            <ComponentName loading>Loading</ComponentName>
          </div>
        </section>
      </div>,
      { animations: 'disabled' }
    );

    // Wait for rendering to stabilize
    await component.page().waitForTimeout(100);

    await expect(component).toHaveScreenshot('component-name-all-variants.png', {
      animations: 'disabled',
    });
  });
});
```

#### Dark Mode Test (REQUIRED)

For dark mode, you MUST set `data-mode="dark"` on the document element using `page.evaluate()`. This is because the theme CSS uses `:root[data-mode='dark']` selectors which only match the `<html>` element.

**Why dark mode requires special handling**:

- The theme CSS defines dark mode variables with `:root[data-mode='dark']` selector
- `:root` refers to the `<html>` element, NOT any arbitrary div
- Setting `data-mode="dark"` on a wrapper div will NOT activate dark mode
- You must use `page.evaluate()` to set the attribute on `document.documentElement`

```typescript
test.describe('Visual Regression', () => {
  test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
    // CRITICAL: Set dark mode on document root BEFORE mounting
    await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

    const variants = ['primary', 'secondary', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    const component = await mount(
      <div style={{
        padding: '32px',
        width: '900px',
        // Use CSS tokens - they automatically use dark mode values
        background: 'var(--lufa-token-color-background-primary)',
      }}>
        <h1 style={{
          marginBottom: '24px',
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'var(--lufa-token-color-text-primary)',
        }}>
          ComponentName - All Variants (Dark Mode)
        </h1>

        {/* Same sections as light mode, but use token variables for colors */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            marginBottom: '16px',
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--lufa-token-color-text-secondary)',
          }}>
            All Variants
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {variants.map((variant) => (
              <ComponentName key={variant} variant={variant}>
                {variant}
              </ComponentName>
            ))}
          </div>
        </section>

        {/* ... more sections ... */}
      </div>,
      { animations: 'disabled' }
    );

    await component.page().waitForTimeout(100);

    await expect(component).toHaveScreenshot('component-name-all-variants-dark.png', {
      animations: 'disabled',
    });

    // Clean up: remove dark mode to avoid affecting other tests
    await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
  });
});
```

---

## Critical Rules and Patterns

### Rule 1: Component IS Element Pattern

When a component returns semantic HTML directly (e.g., `<section>`, `<button>`), the mounted component IS that element.

```typescript
// ❌ WRONG - Looking for nested section
const component = await mount(<Testimonial {...props} />);
const section = component.locator('section'); // Won't work!

// ✅ CORRECT - Component IS the section
const component = await mount(<Testimonial {...props} />);
const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
expect(tagName).toBe('section');
```

### Rule 2: One Mount Per Test

You CANNOT call `mount()` multiple times in a single test. Each mount replaces the previous component.

```typescript
// ❌ WRONG - Multiple mounts in one test
test('bad test', async ({ mount }) => {
  const component1 = await mount(<Button>First</Button>);
  const component2 = await mount(<Button>Second</Button>); // Won't work!
});

// ✅ CORRECT - Separate tests
test('test first button', async ({ mount }) => {
  const component = await mount(<Button>First</Button>);
});

test('test second button', async ({ mount }) => {
  const component = await mount(<Button>Second</Button>);
});
```

### Rule 3: Use Fixtures for Complex Scenarios

When you need inline event handlers, icons, or stateful wrappers, create a fixtures file.

**When to create fixtures**:

- Components with icon props (need inline icon elements)
- Components requiring event handlers that capture state
- Components needing stateful wrappers for testing
- Reusable test scenarios across multiple tests

**Fixture file pattern**:

```typescript
// ComponentName.fixtures.tsx
import { useState } from 'react';
import type { ComponentProps } from 'react';

// Icon fixtures
export const IconFixtures = {
  HomeIcon: () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M8 2l6 6v6H2V8l6-6z" />
    </svg>
  ),
  UserIcon: () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="6" r="3" />
      <path d="M2 14a6 6 0 0112 0" />
    </svg>
  ),
};

// Stateful wrapper fixture
export const StatefulComponentFixture = (props: ComponentProps<typeof ComponentName>) => {
  const [value, setValue] = useState('');
  return (
    <ComponentName
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
```

**Using fixtures in tests**:

```typescript
import { IconFixtures } from './ComponentName.fixtures';

test('should render with icon', async ({ mount }) => {
  const component = await mount(
    <ComponentName startIcon={<IconFixtures.HomeIcon />}>
      Text
    </ComponentName>
  );
  await expect(component).toBeVisible();
});
```

### Rule 4: CSS Module Class Matching

When testing CSS module classes, use `[class*="className"]` pattern or regex:

```typescript
// ✅ CORRECT - Regex pattern
await expect(component).toHaveClass(/variant-primary/);

// ✅ CORRECT - CSS attribute selector (when using locator)
const element = component.locator('[class*="variant-primary"]');
await expect(element).toBeVisible();

// ❌ WRONG - Exact class match (breaks with CSS modules)
await expect(component).toHaveClass('variant-primary');
```

### Rule 5: Role-Based Locators First

Always prioritize accessible, user-facing locators:

**Priority order**:

1. `getByRole()` - HIGHEST priority
2. `getByLabelText()` - For form inputs
3. `getByPlaceholderText()` - For inputs without labels
4. `getByText()` - For static text
5. `locator()` - ONLY as last resort

```typescript
// ✅ BEST - Role-based
const button = component.getByRole('button', { name: 'Submit' });

// ✅ GOOD - Label-based
const input = component.getByLabelText('Email');

// ⚠️ OK - Text-based
const text = component.getByText('Welcome');

// ❌ AVOID - Generic locator
const element = component.locator('.my-class');
```

---

## Visual Regression Best Practices

### Snapshot Stability - Critical Rules

**These rules are NON-NEGOTIABLE for stable snapshots:**

### ✅ DO:

1. **Use fixed widths**: `width: '900px'` (NEVER `'fit-content'` or `'100%'`)
2. **Disable animations**: Both in `mount()` options AND `toHaveScreenshot()` options
3. **Add stabilization wait**: `await component.page().waitForTimeout(100)`
4. **Use white backgrounds**: `background: '#ffffff'`
5. **Use grid layouts**: More predictable than flex for snapshots
6. **Add proper spacing**: Prevent elements from touching edges (`padding: '32px'`)
7. **Use consistent typography**: Fixed font sizes, weights, colors
8. **Organize in sections**: Use `<section>` with clear headers

### ❌ DON'T:

1. **Avoid `fit-content`**: Causes width variations between renders
2. **Don't use percentage widths**: Can vary based on container
3. **Don't skip the wait**: Even small timing differences cause diffs
4. **Don't use auto layouts**: Flex/grid with explicit sizes are more stable
5. **Don't forget animations**: Even subtle animations cause diffs
6. **Don't use transparent backgrounds**: Can show underlying color variations

### Stable Visual Regression Template

```typescript
test.describe('Visual Regression', () => {
  test('should match snapshot for all variants', async ({ mount }) => {
    const component = await mount(
      <div style={{
        padding: '32px',           // Fixed padding
        background: '#ffffff',     // White background
        width: '900px'             // Fixed width (NEVER fit-content)
      }}>
        <h1 style={{
          marginBottom: '24px',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          Component Name - All Variants
        </h1>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            marginBottom: '16px',
            fontSize: '20px',
            fontWeight: '600',
            color: '#555'
          }}>
            Section Title
          </h2>
          <div style={{
            display: 'grid',              // Grid is more stable than flex
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {/* Components here */}
          </div>
        </section>
      </div>,
      { animations: 'disabled' }    // Disable animations at mount
    );

    // Wait for rendering to stabilize (CRITICAL)
    await component.page().waitForTimeout(100);

    await expect(component).toHaveScreenshot('component-name-variants.png', {
      animations: 'disabled',         // Disable animations at snapshot
    });
  });
});
```

### Visual Regression Checklist

Before marking visual regression complete:

**Light Mode:**

- [ ] Fixed width container (not `fit-content`)
- [ ] White background (`#ffffff`)
- [ ] Animations disabled in mount options
- [ ] Animations disabled in screenshot options
- [ ] 100ms wait before screenshot
- [ ] All variants organized in sections
- [ ] Clear section headers with consistent typography
- [ ] Grid layout with explicit sizing
- [ ] Proper spacing and padding
- [ ] Tested 3+ times with no diffs

**Dark Mode:**

- [ ] `page` added to test parameters: `async ({ mount, page })`
- [ ] `data-mode="dark"` set on `document.documentElement` BEFORE mounting
- [ ] Token-based background: `var(--lufa-token-color-background-primary)`
- [ ] Token-based text colors: `var(--lufa-token-color-text-primary)`
- [ ] Cleanup: `removeAttribute('data-mode')` after screenshot
- [ ] Same variants as light mode test
- [ ] Tested 3+ times with no diffs

### Dark Mode Quick Reference

> **Full documentation**: See "Section 5: Visual Regression (REQUIRED - BOTH Light AND Dark Mode)" above for complete examples.

**Essential pattern**:

```typescript
test('dark mode snapshot', async ({ mount, page }) => {
  // 1. Set dark mode on document root BEFORE mounting
  await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

  // 2. Mount with token-based colors (NOT hardcoded)
  const component = await mount(
    <div style={{ background: 'var(--lufa-token-color-background-primary)' }}>
      <MyComponent />
    </div>
  );

  // 3. Take screenshot
  await expect(component).toHaveScreenshot('component-dark.png');

  // 4. Clean up
  await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
});
```

**Why this is required**:

- Theme CSS uses `:root[data-mode='dark']` selector
- `:root` = `<html>` element, NOT any div
- `data-mode` on a div does NOTHING

**❌ WRONG**: `<div data-mode="dark">` - will NOT activate dark mode
**✅ CORRECT**: `page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'))`

---

## Common Testing Patterns

### Pattern 1: Testing Form Components

```typescript
test.describe('Form Component Tests', () => {
  test('should accept user input', async ({ mount }) => {
    const component = await mount(<Input label="Email" />);
    const input = component.getByRole('textbox');
    await input.fill('test@example.com');
    await expect(input).toHaveValue('test@example.com');
  });

  test('should call onChange handler', async ({ mount }) => {
    let value = '';
    const component = await mount(
      <Input
        label="Email"
        onChange={(e) => { value = e.target.value; }}
      />
    );
    await component.getByRole('textbox').fill('test');
    expect(value).toBe('test');
  });

  test('should display validation error', async ({ mount }) => {
    const component = await mount(
      <Input label="Email" error="Invalid email" />
    );
    await expect(component.getByText('Invalid email')).toBeVisible();
  });
});
```

### Pattern 2: Testing Keyboard Navigation

```typescript
test.describe('Keyboard Navigation', () => {
  test('should navigate with arrow keys', async ({ mount }) => {
    const component = await mount(
      <Tabs items={[
        { key: '1', label: 'Tab 1', children: 'Content 1' },
        { key: '2', label: 'Tab 2', children: 'Content 2' },
        { key: '3', label: 'Tab 3', children: 'Content 3' },
      ]} />
    );

    const firstTab = component.getByRole('tab', { name: 'Tab 1' });
    await firstTab.focus();
    await expect(firstTab).toBeFocused();

    await firstTab.press('ArrowRight');
    const secondTab = component.getByRole('tab', { name: 'Tab 2' });
    await expect(secondTab).toBeFocused();
  });

  test('should activate with Enter key', async ({ mount }) => {
    let activated = false;
    const component = await mount(
      <MenuItem onClick={() => { activated = true; }}>
        Click me
      </MenuItem>
    );
    await component.focus();
    await component.press('Enter');
    expect(activated).toBe(true);
  });
});
```

### Pattern 3: Testing Disabled States

```typescript
test.describe('Disabled State', () => {
  test('should not respond to clicks when disabled', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button disabled onClick={() => { clicked = true; }}>
        Click me
      </Button>
    );

    // Use force: true to attempt click on disabled element
    await component.click({ force: true });
    expect(clicked).toBe(false);
  });

  test('should not be keyboard accessible when disabled', async ({ mount }) => {
    const component = await mount(<Button disabled>Click me</Button>);
    await expect(component).toHaveAttribute('disabled');
    // Disabled elements typically have tabindex="-1" or no tabindex
  });
});
```

### Pattern 4: Testing ARIA Snapshots

```typescript
test.describe('ARIA Structure', () => {
  test('should have accessible navigation structure', async ({ mount }) => {
    const component = await mount(
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Shoes' },
      ]} />
    );

    await expect(component).toMatchAriaSnapshot(`
      - navigation "Breadcrumb":
        - list:
          - listitem:
            - link "Home"
          - listitem:
            - link "Products"
          - listitem "Shoes"
    `);
  });
});
```

### Pattern 5: Testing Conditional Rendering

```typescript
test.describe('Conditional Rendering', () => {
  test('should render close button when closable', async ({ mount }) => {
    const component = await mount(
      <Alert closable onClose={() => {}}>Message</Alert>
    );
    const closeButton = component.getByRole('button', { name: /close/i });
    await expect(closeButton).toBeVisible();
  });

  test('should not render close button by default', async ({ mount }) => {
    const component = await mount(<Alert>Message</Alert>);
    const closeButton = component.getByRole('button', { name: /close/i });
    await expect(closeButton).not.toBeVisible();
  });
});
```

---

## Edge Cases and Special Scenarios

### Testing Components That Return Sections

Some components like `Testimonial` return a `<section>` directly:

```typescript
test('should use semantic HTML structure', async ({ mount }) => {
  const component = await mount(<Testimonial {...props} />);

  // Component IS the section element
  const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
  expect(tagName).toBe('section');

  // Find nested elements
  const figure = component.locator('figure');
  await expect(figure).toBeVisible();
});
```

### Testing Components with Dynamic Content

```typescript
test('should handle long content gracefully', async ({ mount }) => {
  const longText = 'Lorem ipsum dolor sit amet. '.repeat(20);
  const component = await mount(
    <Alert title="Long Message">{longText}</Alert>
  );
  await expect(component).toContainText('Lorem ipsum');
  // Verify no overflow issues
});
```

### Testing Components with Special Characters

```typescript
test('should handle special characters', async ({ mount }) => {
  const component = await mount(
    <Alert>We've saved $10,000 & improved by 50%!</Alert>
  );
  await expect(component).toContainText("We've saved $10,000 & improved by 50%!");
});
```

---

## Running Tests

### Command Reference

```bash
# Run all component tests (from root - recommended)
pnpm ds:test

# Run all component tests (all 5 browsers)
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct

# Run tests in specific browser only
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --project=chromium
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --project=firefox
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --project=webkit
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --project=mobile-chrome
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --project=mobile-safari

# Run specific test file
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct Alert.spec.tsx

# Run specific test by line number
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct Alert.spec.tsx:71

# Run in UI mode (interactive debugging - from root)
pnpm ds:test:ui

# Run in UI mode (from package)
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --ui

# Update snapshots (after visual changes - from root)
pnpm ds:test:update-snapshots

# Update snapshots (from package)
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --update-snapshots

# Update snapshots for specific browser only
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --update-snapshots --project=chromium

# Run in debug mode
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct --debug

# Run tests for specific category
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct src/components/feedback/
```

**Browser Configuration:**

The test suite is configured to run on 5 browsers:

- `chromium` - Desktop Chrome
- `firefox` - Desktop Firefox
- `webkit` - Desktop Safari
- `mobile-chrome` - Pixel 5 viewport
- `mobile-safari` - iPhone 13 viewport

For local development, you may want to run only Chromium tests for speed:

```bash
pnpm ds:test --project=chromium
```

CI runs only Chromium tests by default to optimize build time.

### Debugging Failed Tests

1. **Run in UI mode**: `pnpm test-ct --ui` to see visual diff
2. **Check snapshot**: Look at `__snapshots__/` directory
3. **Verify stability**: Run test 3 times to ensure no flakiness
4. **Check console**: Look for JavaScript errors in test output
5. **Inspect element**: Use `await component.screenshot()` for debugging

---

## Quality Checklist

Before considering a component test suite complete:

### Functional Tests

- [ ] All variants tested (size, color, type, state)
- [ ] User interactions tested (click, focus, input)
- [ ] Keyboard navigation verified
- [ ] Event handlers tested with mock functions
- [ ] Props validation tested
- [ ] Edge cases covered (empty strings, long text, special characters)

### Accessibility Tests

- [ ] ARIA attributes verified
- [ ] Semantic HTML structure tested
- [ ] Keyboard navigation works
- [ ] Focus management correct
- [ ] ARIA snapshot matches expected structure

### Visual Regression

- [ ] Single comprehensive test showing ALL variants
- [ ] Fixed width container (not `fit-content`)
- [ ] Animations disabled (mount + screenshot)
- [ ] 100ms stabilization wait
- [ ] Organized in clear sections
- [ ] Tested 3+ times with no diffs

### Code Quality

- [ ] Follows test structure template
- [ ] Uses accessible locators (getByRole preferred)
- [ ] Test descriptions clearly state intent
- [ ] Fixtures used for complex scenarios
- [ ] No multiple mounts in single test
- [ ] Proper error handling

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Using `fit-content` in Visual Tests

```typescript
// ❌ WRONG - Causes unstable snapshots
<div style={{ width: 'fit-content' }}>

// ✅ CORRECT - Use fixed width
<div style={{ width: '900px' }}>
```

### ❌ Mistake 2: Multiple Mounts in One Test

```typescript
// ❌ WRONG
test('bad test', async ({ mount }) => {
  const comp1 = await mount(<Button>First</Button>);
  const comp2 = await mount(<Button>Second</Button>);
});

// ✅ CORRECT - Split into separate tests
test('test first', async ({ mount }) => {
  const comp = await mount(<Button>First</Button>);
});
test('test second', async ({ mount }) => {
  const comp = await mount(<Button>Second</Button>);
});
```

### ❌ Mistake 3: Forgetting Animation Disable

```typescript
// ❌ WRONG - Animations cause diffs
const component = await mount(<Component />);
await expect(component).toHaveScreenshot('test.png');

// ✅ CORRECT - Disable animations
const component = await mount(<Component />, { animations: 'disabled' });
await component.page().waitForTimeout(100);
await expect(component).toHaveScreenshot('test.png', { animations: 'disabled' });
```

### ❌ Mistake 4: Looking for Nested Element That IS the Component

```typescript
// ❌ WRONG - Component IS the section
const component = await mount(<Testimonial />);
const section = component.locator('section'); // Won't find it!

// ✅ CORRECT - Component IS the section
const component = await mount(<Testimonial />);
const tagName = await component.evaluate(el => el.tagName.toLowerCase());
expect(tagName).toBe('section');
```

### ❌ Mistake 5: Not Using Role-Based Locators

```typescript
// ❌ WRONG - Fragile CSS selector
const button = component.locator('.btn-primary');

// ✅ CORRECT - Accessible role-based locator
const button = component.getByRole('button', { name: 'Submit' });
```

---

## Resources

### Internal Documentation

- [AGENTS.md](../../AGENTS.md) - Complete development guide
- [playwright-typescript.instructions.md](./playwright-typescript.instructions.md) - General Playwright guidelines
- [a11y.instructions.md](./a11y.instructions.md) - Accessibility testing guidelines
- [lufa-design-system.instructions.md](./lufa-design-system.instructions.md) - Design system architecture

### External Resources

- [Playwright Component Testing Docs](https://playwright.dev/docs/test-components)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## Summary - Key Takeaways

### Golden Rules

1. **One mount per test** - Never call mount() twice in a single test
2. **Fixed widths for snapshots** - Never use `fit-content` or percentages
3. **Disable animations twice** - In mount options AND screenshot options
4. **Component IS element** - When component returns semantic HTML directly
5. **Role-based locators** - Always prioritize `getByRole()` over generic locators
6. **Dark mode on root** - Set `data-mode="dark"` on `document.documentElement`, not on wrapper divs

### Test Structure Priority

1. Basic Rendering (required)
2. Variants (required)
3. User Interactions (required)
4. Accessibility (required)
5. Visual Regression (required)
6. Dark Mode Visual Regression (required for themed components)

### Snapshot Stability Essentials

- ✅ Fixed width container (`width: '900px'`)
- ✅ White background (`background: '#ffffff'`) or token-based for dark mode
- ✅ Animations disabled (mount + screenshot)
- ✅ 100ms stabilization wait
- ✅ Grid layouts for predictability
- ✅ Dark mode: use `page.evaluate()` to set `data-mode` on document element
- ❌ Never use `fit-content`
- ❌ Never skip the wait
- ❌ Never forget animation disable
- ❌ Never set `data-mode` on a wrapper div (use document element)

---

**This file is automatically applied by AI agents when working with Playwright component test files.**
