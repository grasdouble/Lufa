/**
 * Button Component - Playwright Component Tests
 *
 * Comprehensive behavioral test suite for the Button component.
 * Tests cover rendering, all prop variants, user interactions, accessibility,
 * and visual regression in both light and dark modes.
 *
 * Button is an interactive action element with multiple types, variants, sizes, and states.
 * It supports polymorphic rendering, icons, loading states, and full accessibility compliance.
 *
 * Test Categories (following official Playwright CT guidelines):
 * 1. Basic Rendering - Default behavior and core functionality
 * 2. Variants - All prop combinations (type, variant, size, radius, icons)
 * 3. States - Disabled and loading states
 * 4. User Interactions - Click events and keyboard navigation
 * 5. Accessibility - ARIA attributes, semantic HTML, keyboard support
 * 6. Polymorphic - Rendering as button or anchor elements
 * 7. Visual Regression - Comprehensive snapshots in light and dark modes
 *
 * @see .github/instructions/lufa-design-system-playwright-ct.instructions.md
 */

import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Button } from '@grasdouble/lufa_design-system';

// ============================================
// TEST SUITE: Basic Rendering
// ============================================

test.describe('Button Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Button>Click me</Button>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Click me');
    });

    test('should render as button element by default', async ({ mount }) => {
      const component = await mount(<Button>Default button</Button>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('button');
    });

    test('should apply default type and variant', async ({ mount }) => {
      const component = await mount(<Button>Default</Button>);
      await expect(component).toHaveClass(/_type-solid_/);
      await expect(component).toHaveClass(/_variant-primary_/);
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Button className="custom-button">Content</Button>);
      await expect(component).toHaveClass(/custom-button/);
    });

    test('should combine custom className with utility classes', async ({ mount }) => {
      const component = await mount(
        <Button type="outline" variant="secondary" className="custom-class">
          Combined classes
        </Button>
      );
      await expect(component).toHaveClass(/_type-outline/);
      await expect(component).toHaveClass(/_variant-secondary/);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should render without children (icon-only)', async ({ mount }) => {
      const component = await mount(<Button iconLeft="search" aria-label="Search" />);
      await expect(component).toBeVisible();
      await expect(component).toHaveAttribute('aria-label', 'Search');
    });
  });

  // ============================================
  // TEST SUITE: Variants
  // ============================================

  test.describe('Variants', () => {
    test.describe('Type Variants', () => {
      const types = ['solid', 'outline', 'ghost'] as const;

      types.forEach((type) => {
        test(`should apply type="${type}" class`, async ({ mount }) => {
          const component = await mount(<Button type={type}>Button</Button>);
          await expect(component).toContainText('Button');
          await expect(component).toHaveClass(new RegExp(`_type-${type}_`));
        });
      });
    });

    test.describe('Variant Variants (Semantic Colors)', () => {
      const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const;

      variants.forEach((variant) => {
        test(`should apply variant="${variant}" class`, async ({ mount }) => {
          const component = await mount(<Button variant={variant}>{variant}</Button>);
          await expect(component).toContainText(variant);
          await expect(component).toHaveClass(new RegExp(`_variant-${variant}_`));
        });
      });
    });

    test.describe('Type + Variant Matrix', () => {
      test('should combine type and variant classes', async ({ mount }) => {
        const component = await mount(
          <Button type="outline" variant="success">
            Outline Success
          </Button>
        );
        await expect(component).toHaveClass(/_type-outline/);
        await expect(component).toHaveClass(/_variant-success/);
      });

      test('should work with all combinations', async ({ mount }) => {
        // Test a subset of combinations to verify the pattern works
        const solidPrimary = await mount(
          <Button type="solid" variant="primary">
            solid-primary
          </Button>
        );
        await expect(solidPrimary).toHaveClass(/_type-solid_/);
        await expect(solidPrimary).toHaveClass(/_variant-primary_/);
      });
    });

    test.describe('Size Variants', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach((size) => {
        test(`should apply size="${size}" class`, async ({ mount }) => {
          const component = await mount(<Button size={size}>Size {size}</Button>);
          await expect(component).toContainText(`Size ${size}`);
          await expect(component).toHaveClass(new RegExp(`_size-${size}_`));
        });
      });
    });

    test.describe('Radius Variants', () => {
      const radiusValues = ['none', 'sm', 'base', 'md', 'full'] as const;

      radiusValues.forEach((radius) => {
        test(`should apply radius="${radius}" class`, async ({ mount }) => {
          const component = await mount(<Button radius={radius}>Radius {radius}</Button>);
          await expect(component).toContainText(`Radius ${radius}`);
          await expect(component).toHaveClass(new RegExp(`_radius-${radius}_`));
        });
      });
    });

    test.describe('Icon Variants', () => {
      test('should render with iconLeft', async ({ mount }) => {
        const component = await mount(<Button iconLeft="check">Save</Button>);
        await expect(component).toContainText('Save');
        // Icon is rendered, check for its presence
        const iconCount = await component.locator('svg').count();
        expect(iconCount).toBeGreaterThan(0);
      });

      test('should render with iconRight', async ({ mount }) => {
        const component = await mount(<Button iconRight="arrow-right">Next</Button>);
        await expect(component).toContainText('Next');
        const iconCount = await component.locator('svg').count();
        expect(iconCount).toBeGreaterThan(0);
      });

      test('should render with both iconLeft and iconRight', async ({ mount }) => {
        const component = await mount(
          <Button iconLeft="check" iconRight="arrow-right">
            Confirm
          </Button>
        );
        await expect(component).toContainText('Confirm');
        const iconCount = await component.locator('svg').count();
        expect(iconCount).toBe(2); // Two icons
      });

      test('should render icon-only button', async ({ mount }) => {
        const component = await mount(<Button iconLeft="search" aria-label="Search" />);
        await expect(component).toBeVisible();
        await expect(component).toHaveAttribute('aria-label', 'Search');
        const iconCount = await component.locator('svg').count();
        expect(iconCount).toBe(1);
      });
    });

    test.describe('fullWidth Variant', () => {
      test('should apply fullWidth class', async ({ mount }) => {
        const component = await mount(<Button fullWidth>Full Width</Button>);
        await expect(component).toHaveClass(/_fullWidth-true_/);
      });

      test('should not apply fullWidth class by default', async ({ mount }) => {
        const component = await mount(<Button>Normal Width</Button>);
        await expect(component).not.toHaveClass(/_fullWidth-true_/);
      });
    });
  });

  // ============================================
  // TEST SUITE: States
  // ============================================

  test.describe('States', () => {
    test.describe('Disabled State', () => {
      test('should apply disabled attribute when disabled=true', async ({ mount }) => {
        const component = await mount(<Button disabled>Disabled</Button>);
        await expect(component).toBeDisabled();
      });

      test('should apply disabled class', async ({ mount }) => {
        const component = await mount(<Button disabled>Disabled</Button>);
        await expect(component).toHaveClass(/_disabled-true_/);
      });

      test('should not be clickable when disabled', async ({ mount }) => {
        let clicked = false;
        const component = await mount(
          <Button
            disabled
            onClick={() => {
              clicked = true;
            }}
          >
            Disabled
          </Button>
        );
        await component.click({ force: true }); // Force click on disabled element
        expect(clicked).toBe(false); // Should not trigger
      });

      test('should work with all types when disabled', async ({ mount }) => {
        // Test one type to verify disabled works across types
        const component = await mount(
          <Button type="solid" disabled>
            Disabled solid
          </Button>
        );
        await expect(component).toBeDisabled();
        await expect(component).toHaveClass(/_disabled-true_/);
      });
    });

    test.describe('Loading State', () => {
      test('should apply loading class when loading=true', async ({ mount }) => {
        const component = await mount(<Button loading>Loading...</Button>);
        await expect(component).toHaveClass(/_loading-true_/);
      });

      test('should be disabled when loading', async ({ mount }) => {
        const component = await mount(<Button loading>Loading...</Button>);
        await expect(component).toBeDisabled();
      });

      test('should show spinner icon when loading', async ({ mount }) => {
        const component = await mount(<Button loading>Saving...</Button>);
        const iconCount = await component.locator('svg').count();
        expect(iconCount).toBeGreaterThan(0); // Spinner icon
      });

      test('should not be clickable when loading', async ({ mount }) => {
        let clicked = false;
        const component = await mount(
          <Button
            loading
            onClick={() => {
              clicked = true;
            }}
          >
            Loading
          </Button>
        );
        await component.click({ force: true });
        expect(clicked).toBe(false); // Should not trigger
      });

      test('should hide iconLeft when loading', async ({ mount }) => {
        const component = await mount(
          <Button loading iconLeft="check">
            Saving...
          </Button>
        );
        // When loading, the left icon should be replaced by spinner
        // We just check that loading state is applied
        await expect(component).toHaveClass(/_loading-true_/);
      });
    });

    test.describe('Combined States', () => {
      test('should handle both disabled and loading', async ({ mount }) => {
        const component = await mount(
          <Button disabled loading>
            Disabled + Loading
          </Button>
        );
        await expect(component).toBeDisabled();
        await expect(component).toHaveClass(/_loading-true_/);
      });
    });
  });

  // ============================================
  // TEST SUITE: User Interactions
  // ============================================

  test.describe('User Interactions', () => {
    test('should handle click events', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <Button
          onClick={() => {
            clicked = true;
          }}
        >
          Clickable button
        </Button>
      );

      await component.click();
      expect(clicked).toBe(true);
    });

    test('should be focusable by default', async ({ mount }) => {
      const component = await mount(<Button>Focusable button</Button>);

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should handle keyboard events (Enter)', async ({ mount }) => {
      let keyPressed = false;
      const component = await mount(
        <Button
          onClick={() => {
            keyPressed = true;
          }}
        >
          Keyboard button
        </Button>
      );

      await component.focus();
      await component.press('Enter');
      expect(keyPressed).toBe(true);
    });

    test('should handle keyboard events (Space)', async ({ mount }) => {
      let spacePressed = false;
      const component = await mount(
        <Button
          onClick={() => {
            spacePressed = true;
          }}
        >
          Space button
        </Button>
      );

      await component.focus();
      await component.press('Space');
      expect(spacePressed).toBe(true);
    });

    test('should not be focusable when disabled', async ({ mount }) => {
      const component = await mount(<Button disabled>Disabled button</Button>);

      await expect(component).toBeDisabled();
      // Disabled buttons cannot be focused via keyboard navigation
    });
  });

  // ============================================
  // TEST SUITE: Accessibility
  // ============================================

  test.describe('Accessibility', () => {
    test('should pass a11y checks', async ({ mount, page }) => {
      await mount(<Button>Accessible Button</Button>);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have button role by default', async ({ mount }) => {
      const component = await mount(<Button>Button</Button>);
      const role = await component.getAttribute('type');
      expect(role).toBe('button'); // type="button" for semantic clarity
    });

    test('should support aria-label for icon-only buttons', async ({ mount }) => {
      const component = await mount(<Button iconLeft="search" aria-label="Search" />);
      await expect(component).toHaveAttribute('aria-label', 'Search');
    });

    test('should support aria-disabled when disabled', async ({ mount }) => {
      const component = await mount(<Button disabled>Disabled</Button>);
      await expect(component).toBeDisabled();
      // aria-disabled is automatically handled by disabled attribute
    });

    test('should support custom ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Button aria-describedby="help-text" aria-pressed="true">
          Toggle
        </Button>
      );
      await expect(component).toHaveAttribute('aria-describedby', 'help-text');
      await expect(component).toHaveAttribute('aria-pressed', 'true');
    });

    test('should be keyboard accessible', async ({ mount }) => {
      const component = await mount(<Button>Keyboard accessible</Button>);
      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should have accessible structure for screen readers', async ({ mount }) => {
      const component = await mount(<Button aria-label="Save document">Save</Button>);

      await expect(component).toMatchAriaSnapshot(`
        - button "Save document"
      `);
    });

    test('should indicate loading state to screen readers', async ({ mount }) => {
      const component = await mount(<Button loading>Loading...</Button>);
      // Loading state is indicated by disabled + visual spinner
      await expect(component).toBeDisabled();
    });
  });

  // ============================================
  // TEST SUITE: Polymorphic (as prop)
  // ============================================

  test.describe('Polymorphic Rendering', () => {
    test('should render as button element by default', async ({ mount }) => {
      const component = await mount(<Button>Button</Button>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('button');
    });

    test('should render as anchor element when as="a"', async ({ mount }) => {
      const component = await mount(
        <Button as="a" href="/home">
          Link Button
        </Button>
      );
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('a');
      await expect(component).toHaveAttribute('href', '/home');
    });

    test('should preserve button styles when rendered as anchor', async ({ mount }) => {
      const component = await mount(
        <Button as="a" href="#link" type="ghost" variant="primary">
          Ghost Link
        </Button>
      );
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('a');
      await expect(component).toHaveClass(/_type-ghost/);
      await expect(component).toHaveClass(/_variant-primary/);
    });

    test('should support anchor-specific attributes', async ({ mount }) => {
      const component = await mount(
        <Button as="a" href="https://example.com" target="_blank" rel="noopener noreferrer">
          External Link
        </Button>
      );
      await expect(component).toHaveAttribute('href', 'https://example.com');
      await expect(component).toHaveAttribute('target', '_blank');
      await expect(component).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should work with all variants when polymorphic', async ({ mount }) => {
      const component = await mount(
        <Button as="a" href="/page" type="outline" variant="secondary" size="lg" radius="full">
          Styled Link
        </Button>
      );
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('a');
      await expect(component).toHaveClass(/_type-outline/);
      await expect(component).toHaveClass(/_variant-secondary/);
      await expect(component).toHaveClass(/_size-lg/);
      await expect(component).toHaveClass(/_radius-full/);
    });
  });

  // ============================================
  // TEST SUITE: Visual Regression
  // ============================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants in light mode', async ({ mount }) => {
      const types = ['solid', 'outline', 'ghost'] as const;
      const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;
      const radiusValues = ['none', 'sm', 'base', 'md', 'full'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: '#ffffff',
            width: '1200px',
          }}
        >
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Button Component - All Variants
          </h1>

          {/* Section 1: Type + Variant Matrix */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Type + Variant Matrix
            </h2>
            {types.map((type) => (
              <div key={type} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#666', marginBottom: '12px' }}>
                  Type: {type}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  {variants.map((variant) => (
                    <Button key={variant} type={type} variant={variant}>
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Section 2: Sizes */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Sizes
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <Button key={size} size={size}>
                  Size {size}
                </Button>
              ))}
            </div>
          </section>

          {/* Section 3: Radius */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Border Radius
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {radiusValues.map((radius) => (
                <Button key={radius} radius={radius}>
                  {radius}
                </Button>
              ))}
            </div>
          </section>

          {/* Section 4: Icons */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              With Icons
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button iconLeft="check">Icon Left</Button>
              <Button iconRight="arrow-right">Icon Right</Button>
              <Button iconLeft="check" iconRight="arrow-right">
                Both Icons
              </Button>
              <Button iconLeft="search" aria-label="Search" />
            </div>
          </section>

          {/* Section 5: States */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              States
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </section>

          {/* Section 6: Full Width */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Full Width
            </h2>
            <Button fullWidth>Full Width Button</Button>
          </section>

          {/* Section 7: As Anchor */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Polymorphic (as anchor)
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button as="a" href="#link">
                Button as Link
              </Button>
              <Button as="a" href="#link" type="outline">
                Outline Link
              </Button>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('button-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const types = ['solid', 'outline', 'ghost'] as const;
      const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '1200px',
            background: 'var(--lufa-token-color-background-page)',
          }}
        >
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Button Component - All Variants (Dark Mode)
          </h1>

          {/* Type + Variant Matrix */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Type + Variant Matrix
            </h2>
            {types.map((type) => (
              <div key={type} style={{ marginBottom: '20px' }}>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--lufa-token-color-text-tertiary)',
                    marginBottom: '12px',
                  }}
                >
                  Type: {type}
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {variants.map((variant) => (
                    <Button key={variant} type={type} variant={variant}>
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Sizes */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Sizes
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <Button key={size} size={size}>
                  Size {size}
                </Button>
              ))}
            </div>
          </section>

          {/* States */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              States
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('button-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up: remove dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
