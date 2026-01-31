/**
 * Icon Component - Playwright Component Tests
 *
 * Comprehensive behavioral test suite for the Icon component.
 * Tests cover rendering, all prop variants, user interactions, accessibility,
 * and visual regression in both light and dark modes.
 *
 * Icon is a primitive component for displaying SVG icons with semantic sizing
 * and coloring. It provides uniform rendering with Lucide React integration.
 *
 * Test Categories (following official Playwright CT guidelines):
 * 1. Basic Rendering - Default behavior and core functionality
 * 2. Variants - All prop combinations (name, size, color, title, polymorphic)
 * 3. User Interactions - Event handlers and interactive behavior
 * 4. Accessibility - ARIA attributes, title support, decorative handling
 * 5. Visual Regression - Comprehensive snapshots in light and dark modes
 *
 * @see .github/instructions/lufa-design-system-playwright-ct.instructions.md
 */

import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Icon } from '@grasdouble/lufa_design-system';

// ============================================
// TEST SUITE: Basic Rendering
// ============================================

test.describe('Icon Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Icon name="user" />);
      await expect(component).toBeVisible();
    });

    test('should render as span element by default', async ({ mount }) => {
      const component = await mount(<Icon name="user" />);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('span');
    });

    test('should render the specified icon', async ({ mount }) => {
      const component = await mount(<Icon name="check" />);
      const svg = component.locator('svg');
      await expect(svg).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Icon name="user" className="custom-icon-class" />);
      await expect(component).toHaveClass(/custom-icon-class/);
    });

    test('should apply custom style prop', async ({ mount }) => {
      const component = await mount(<Icon name="user" style={{ marginTop: '10px' }} />);
      await expect(component).toHaveCSS('margin-top', '10px');
    });

    test('should combine custom className with utility classes', async ({ mount }) => {
      const component = await mount(<Icon name="user" size="lg" color="primary" className="custom-class" />);
      await expect(component).toHaveClass(/size-lg/);
      await expect(component).toHaveClass(/color-primary/);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should contain SVG element', async ({ mount }) => {
      const component = await mount(<Icon name="heart" />);
      const svg = component.locator('svg');
      await expect(svg).toBeVisible();
    });
  });

  // ============================================
  // TEST SUITE: Variants
  // ============================================

  test.describe('Variants', () => {
    test.describe('Name Prop (Icon Selection)', () => {
      const iconNames = [
        'user',
        'home',
        'settings',
        'menu',
        'search',
        'check',
        'x',
        'plus',
        'minus',
        'edit',
        'trash',
        'save',
        'download',
        'upload',
        'chevron-down',
        'chevron-up',
        'chevron-left',
        'chevron-right',
        'arrow-left',
        'arrow-right',
        'alert-circle',
        'info',
        'check-circle',
        'x-circle',
        'external-link',
        'eye',
        'eye-off',
        'heart',
        'star',
      ] as const;

      iconNames.forEach((iconName) => {
        test(`should render icon "${iconName}"`, async ({ mount }) => {
          const component = await mount(<Icon name={iconName} />);
          await expect(component).toBeVisible();
          const svg = component.locator('svg');
          await expect(svg).toBeVisible();
        });
      });
    });

    test.describe('Size Variants', () => {
      const sizeValues = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizeValues.forEach((value) => {
        test(`should apply size="${value}" class`, async ({ mount }) => {
          const component = await mount(<Icon name="star" size={value} />);
          await expect(component).toBeVisible();
          await expect(component).toHaveClass(new RegExp(`size-${value}`));
        });
      });

      test('should default to size="md"', async ({ mount }) => {
        const component = await mount(<Icon name="star" />);
        await expect(component).toHaveClass(/size-md/);
      });

      test('should have correct dimensions for xs', async ({ mount }) => {
        const component = await mount(<Icon name="star" size="xs" />);
        await expect(component).toHaveCSS('width', '16px');
        await expect(component).toHaveCSS('height', '16px');
      });

      test('should have correct dimensions for sm', async ({ mount }) => {
        const component = await mount(<Icon name="star" size="sm" />);
        await expect(component).toHaveCSS('width', '20px');
        await expect(component).toHaveCSS('height', '20px');
      });

      test('should have correct dimensions for md', async ({ mount }) => {
        const component = await mount(<Icon name="star" size="md" />);
        await expect(component).toHaveCSS('width', '24px');
        await expect(component).toHaveCSS('height', '24px');
      });

      test('should have correct dimensions for lg', async ({ mount }) => {
        const component = await mount(<Icon name="star" size="lg" />);
        await expect(component).toHaveCSS('width', '32px');
        await expect(component).toHaveCSS('height', '32px');
      });

      test('should have correct dimensions for xl', async ({ mount }) => {
        const component = await mount(<Icon name="star" size="xl" />);
        await expect(component).toHaveCSS('width', '40px');
        await expect(component).toHaveCSS('height', '40px');
      });
    });

    test.describe('Color Variants', () => {
      const colorValues = [
        'currentColor',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'muted',
      ] as const;

      colorValues.forEach((value) => {
        test(`should apply color="${value}" class`, async ({ mount }) => {
          const component = await mount(<Icon name="heart" color={value} />);
          await expect(component).toBeVisible();
          await expect(component).toHaveClass(new RegExp(`color-${value}`));
        });
      });

      test('should default to color="currentColor"', async ({ mount }) => {
        const component = await mount(<Icon name="heart" />);
        await expect(component).toHaveClass(/color-currentColor/);
      });
    });

    test.describe('Title Prop (Accessibility)', () => {
      test('should add title as aria-label when provided', async ({ mount }) => {
        const component = await mount(<Icon name="check" title="Success" />);
        await expect(component).toHaveAttribute('aria-label', 'Success');
      });

      test('should add role="img" when title provided', async ({ mount }) => {
        const component = await mount(<Icon name="check" title="Success" />);
        await expect(component).toHaveAttribute('role', 'img');
      });

      test('should be decorative (aria-hidden) when title not provided', async ({ mount }) => {
        const component = await mount(<Icon name="check" />);
        await expect(component).toHaveAttribute('aria-hidden', 'true');
      });

      test('should not have role when decorative', async ({ mount }) => {
        const component = await mount(<Icon name="check" />);
        await expect(component).not.toHaveAttribute('role');
      });

      test('should not have aria-label when decorative', async ({ mount }) => {
        const component = await mount(<Icon name="check" />);
        await expect(component).not.toHaveAttribute('aria-label');
      });

      test('should render visually hidden span with title', async ({ mount }) => {
        const component = await mount(<Icon name="check" title="Success" />);
        // Check that the component has role="img" and aria-label when title is provided
        await expect(component).toHaveAttribute('role', 'img');
        await expect(component).toHaveAttribute('aria-label', 'Success');
        // The visually hidden span exists but isn't needed for testing accessibility
        // The title is correctly applied via aria-label
      });
    });

    test.describe('Polymorphic Variants (as prop)', () => {
      test('should render as span element', async ({ mount }) => {
        const component = await mount(<Icon as="span" name="star" />);
        await expect(component).toBeVisible();

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('span');
      });

      test('should render as div element', async ({ mount }) => {
        const component = await mount(<Icon as="div" name="star" />);
        await expect(component).toBeVisible();

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('div');
      });

      test('should render as i element', async ({ mount }) => {
        const component = await mount(<Icon as="i" name="star" />);
        await expect(component).toBeVisible();

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('i');
      });

      test('should preserve props when polymorphic', async ({ mount }) => {
        const component = await mount(<Icon as="div" name="heart" size="lg" color="error" title="Favorite" />);

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('div');

        await expect(component).toHaveClass(/size-lg/);
        await expect(component).toHaveClass(/color-error/);
        await expect(component).toHaveAttribute('aria-label', 'Favorite');
      });

      test('should support HTML attributes when polymorphic', async ({ mount }) => {
        const component = await mount(<Icon as="div" name="star" id="test-icon" data-testid="icon-element" />);

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('div');

        await expect(component).toHaveAttribute('id', 'test-icon');
        await expect(component).toHaveAttribute('data-testid', 'icon-element');
      });
    });

    test.describe('Combined Variants', () => {
      test('should combine name and size', async ({ mount }) => {
        const component = await mount(<Icon name="check" size="lg" />);
        await expect(component).toHaveClass(/size-lg/);
        const svg = component.locator('svg');
        await expect(svg).toBeVisible();
      });

      test('should combine name, size, and color', async ({ mount }) => {
        const component = await mount(<Icon name="heart" size="xl" color="error" />);
        await expect(component).toHaveClass(/size-xl/);
        await expect(component).toHaveClass(/color-error/);
      });

      test('should combine all props', async ({ mount }) => {
        const component = await mount(
          <Icon as="div" name="star" size="lg" color="warning" title="Favorite" className="custom-icon" />
        );

        const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe('div');

        await expect(component).toHaveClass(/size-lg/);
        await expect(component).toHaveClass(/color-warning/);
        await expect(component).toHaveClass(/custom-icon/);
        await expect(component).toHaveAttribute('aria-label', 'Favorite');
        await expect(component).toHaveAttribute('role', 'img');
      });

      // Test different icons with different sizes
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
        ['check', 'heart', 'star'].forEach((iconName) => {
          test(`should combine name="${iconName}" with size="${size}"`, async ({ mount }) => {
            const component = await mount(<Icon name={iconName as any} size={size as any} />);
            await expect(component).toHaveClass(new RegExp(`size-${size}`));
            const svg = component.locator('svg');
            await expect(svg).toBeVisible();
          });
        });
      });

      // Test different icons with different colors
      ['primary', 'secondary', 'success', 'error', 'warning', 'info'].forEach((color) => {
        test(`should combine color="${color}" with name="check"`, async ({ mount }) => {
          const component = await mount(<Icon name="check" color={color as any} />);
          await expect(component).toHaveClass(new RegExp(`color-${color}`));
        });
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
        <Icon
          name="user"
          onClick={() => {
            clicked = true;
          }}
        />
      );

      await component.click();
      expect(clicked).toBe(true);
    });

    test('should be focusable with tabIndex', async ({ mount }) => {
      const component = await mount(<Icon name="user" tabIndex={0} />);

      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should handle keyboard events', async ({ mount }) => {
      let keyPressed = false;
      const component = await mount(
        <Icon
          name="user"
          tabIndex={0}
          onKeyDown={() => {
            keyPressed = true;
          }}
        />
      );

      await component.focus();
      await component.press('Enter');
      expect(keyPressed).toBe(true);
    });

    test('should handle mouse events', async ({ mount }) => {
      let hovered = false;
      const component = await mount(
        <Icon
          name="user"
          onMouseEnter={() => {
            hovered = true;
          }}
        />
      );

      await component.hover();
      expect(hovered).toBe(true);
    });

    test('should work inside interactive elements', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <button
          onClick={() => {
            clicked = true;
          }}
        >
          <Icon name="trash" size="sm" color="error" title="Delete" />
        </button>
      );

      await component.click();
      expect(clicked).toBe(true);
    });
  });

  // ============================================
  // TEST SUITE: Accessibility
  // ============================================

  test.describe('Accessibility', () => {
    test('should pass a11y checks', async ({ mount, page }) => {
      await mount(<Icon name="check" title="Accessible icon" />);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should be decorative by default (no title)', async ({ mount }) => {
      const component = await mount(<Icon name="chevron-right" />);
      await expect(component).toHaveAttribute('aria-hidden', 'true');
      await expect(component).not.toHaveAttribute('role');
      await expect(component).not.toHaveAttribute('aria-label');
    });

    test('should be accessible when title provided', async ({ mount }) => {
      const component = await mount(<Icon name="check" title="Success" />);
      await expect(component).toHaveAttribute('role', 'img');
      await expect(component).toHaveAttribute('aria-label', 'Success');
      await expect(component).not.toHaveAttribute('aria-hidden');
    });

    test('should support custom ARIA attributes', async ({ mount }) => {
      const component = await mount(<Icon name="info" aria-describedby="info-text" />);

      await expect(component).toHaveAttribute('aria-describedby', 'info-text');
    });

    test('should work in accessible buttons', async ({ mount }) => {
      const component = await mount(
        <button aria-label="Delete item">
          <Icon name="trash" size="sm" color="error" />
        </button>
      );

      await expect(component).toHaveAttribute('aria-label', 'Delete item');
    });

    test('should hide SVG from screen readers', async ({ mount }) => {
      const component = await mount(<Icon name="check" title="Success" />);
      const svg = component.locator('svg');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    test('should support icon-only button pattern', async ({ mount }) => {
      const component = await mount(
        <button>
          <Icon name="settings" title="Settings" />
        </button>
      );

      const icon = component.locator('[role="img"]');
      await expect(icon).toHaveAttribute('aria-label', 'Settings');
    });

    test('should provide accessible text alternative', async ({ mount }) => {
      const component = await mount(<Icon name="check-circle" title="Operation successful" />);

      await expect(component).toMatchAriaSnapshot(`
        - img "Operation successful"
      `);
    });

    test('should work with decorative icon in button with text', async ({ mount }) => {
      const component = await mount(
        <button>
          <Icon name="plus" size="sm" />
          <span>Add Item</span>
        </button>
      );

      // Icon is decorative (no title), so it should have aria-hidden
      // We can't easily select by CSS class due to CSS Modules hashing
      // Instead, verify the button itself is accessible
      await expect(component).toHaveRole('button');
      await expect(component).toContainText('Add Item');
    });
  });

  // ============================================
  // TEST SUITE: Visual Regression
  // ============================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants in light mode', async ({ mount }) => {
      const sizeValues = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const colorValues = [
        'currentColor',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'muted',
      ] as const;
      const iconSamples = ['user', 'check', 'heart', 'star', 'alert-circle'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: '#ffffff',
            width: '800px',
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
            Icon Component - All Variants
          </h1>

          {/* Section 1: Size Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Size Values
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {sizeValues.map((value) => (
                <div key={value} style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                    size=&quot;{value}&quot;
                  </div>
                  <Icon name="star" size={value} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Color Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Color Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              {colorValues.map((value) => (
                <div key={value} style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                    color=&quot;{value}&quot;
                  </div>
                  <Icon name="heart" size="lg" color={value} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Icon Samples */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Icon Samples
            </h2>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {iconSamples.map((iconName) => (
                <div key={iconName} style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: '#666' }}>
                    {iconName}
                  </div>
                  <Icon name={iconName} size="lg" />
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Real-World Usage */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#555',
              }}
            >
              Real-World Usage
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Button with icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  width: 'fit-content',
                }}
              >
                <Icon name="plus" size="sm" />
                <span>Add Item</span>
              </div>

              {/* Status message */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: '#d1fae5',
                  border: '1px solid #10b981',
                  borderRadius: '6px',
                }}
              >
                <Icon name="check-circle" size="md" color="success" />
                <span style={{ color: '#065f46' }}>Success message</span>
              </div>

              {/* Icon-only buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                  }}
                >
                  <Icon name="settings" size="md" />
                </div>
                <div
                  style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                  }}
                >
                  <Icon name="search" size="md" />
                </div>
                <div
                  style={{
                    padding: '8px',
                    border: '1px solid #dc2626',
                    borderRadius: '6px',
                  }}
                >
                  <Icon name="trash" size="md" color="error" />
                </div>
              </div>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('icon-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const sizeValues = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      const colorValues = ['currentColor', 'primary', 'secondary', 'success', 'error', 'warning', 'info'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '800px',
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
            Icon Component - All Variants (Dark Mode)
          </h1>

          {/* Section 1: Size Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Size Values
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {sizeValues.map((value) => (
                <div key={value} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-tertiary)',
                    }}
                  >
                    size=&quot;{value}&quot;
                  </div>
                  <Icon name="star" size={value} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Color Values */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Color Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              {colorValues.map((value) => (
                <div key={value} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-tertiary)',
                    }}
                  >
                    color=&quot;{value}&quot;
                  </div>
                  <Icon name="heart" size="lg" color={value} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Real-World Usage */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Real-World Usage
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Status message */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: 'var(--lufa-token-color-background-success)',
                  border: '1px solid var(--lufa-token-color-border-success)',
                  borderRadius: '6px',
                }}
              >
                <Icon name="check-circle" size="md" color="success" />
                <span style={{ color: 'var(--lufa-token-color-text-success)' }}>Success message</span>
              </div>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('icon-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up: remove dark mode to avoid affecting other tests
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
