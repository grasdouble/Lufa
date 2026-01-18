import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '@grasdouble/lufa_design-system';

test.describe('Button Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Button>Click me</Button>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Click me');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Button className="custom-class">Click me</Button>);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should apply custom style', async ({ mount }) => {
      const component = await mount(<Button style={{ margin: '10px' }}>Click me</Button>);
      await expect(component).toHaveCSS('margin', '10px');
    });
  });

  test.describe('Variants', () => {
    test.describe('Variant Types', () => {
      const variants = ['solid', 'outlined', 'text', 'ghost', 'link'] as const;

      for (const variant of variants) {
        test(`should render ${variant} variant`, async ({ mount }) => {
          const component = await mount(<Button variant={variant}>Button {variant}</Button>);
          await expect(component).toBeVisible();
          await expect(component).toContainText(`Button ${variant}`);
        });
      }

      test('should default to solid variant', async ({ mount }) => {
        const component = await mount(<Button>Default</Button>);
        await expect(component).toBeVisible();
      });
    });

    test.describe('Size Variants', () => {
      const sizes = ['small', 'medium', 'large'] as const;

      for (const size of sizes) {
        test(`should render ${size} size`, async ({ mount }) => {
          const component = await mount(<Button size={size}>Button {size}</Button>);
          await expect(component).toBeVisible();
          await expect(component).toContainText(`Button ${size}`);
        });
      }

      test('should default to medium size', async ({ mount }) => {
        const component = await mount(<Button>Default</Button>);
        await expect(component).toBeVisible();
      });
    });

    test.describe('Color Variants', () => {
      const colors = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;

      for (const color of colors) {
        test(`should render ${color} color`, async ({ mount }) => {
          const component = await mount(<Button color={color}>Button {color}</Button>);
          await expect(component).toBeVisible();
          await expect(component).toContainText(`Button ${color}`);
        });
      }
    });

    test.describe('Disabled State', () => {
      test('should render disabled button', async ({ mount }) => {
        const component = await mount(<Button disabled>Disabled</Button>);
        await expect(component).toBeVisible();
        await expect(component).toBeDisabled();
      });

      test('should not respond to clicks when disabled', async ({ mount }) => {
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
        await component.click({ force: true });
        expect(clicked).toBe(false);
      });
    });
  });

  test.describe('User Interactions', () => {
    test('should handle click events', async ({ mount }) => {
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

    test('should be keyboard accessible with Tab', async ({ mount }) => {
      const component = await mount(<Button>Tab me</Button>);
      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should activate with Enter key', async ({ mount }) => {
      let activated = false;
      const component = await mount(
        <Button
          onClick={() => {
            activated = true;
          }}
        >
          Press Enter
        </Button>
      );
      await component.focus();
      await component.press('Enter');
      expect(activated).toBe(true);
    });

    test('should activate with Space key', async ({ mount }) => {
      let activated = false;
      const component = await mount(
        <Button
          onClick={() => {
            activated = true;
          }}
        >
          Press Space
        </Button>
      );
      await component.focus();
      await component.press('Space');
      expect(activated).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes', async ({ mount }) => {
      const component = await mount(<Button>Accessible</Button>);
      await expect(component).toHaveAttribute('type', 'button');
    });

    test('should have accessible structure', async ({ mount }) => {
      const component = await mount(<Button>Accessible</Button>);
      await expect(component).toMatchAriaSnapshot(`
        - button "Accessible"
      `);
    });

    test('should support keyboard navigation', async ({ mount }) => {
      const component = await mount(<Button>Navigate me</Button>);
      const button = component.getByRole('button', { name: 'Navigate me' });
      await button.focus();
      await expect(button).toBeFocused();
    });

    test('should be disabled and not focusable when disabled', async ({ mount }) => {
      const component = await mount(<Button disabled>Disabled</Button>);
      await expect(component).toBeDisabled();
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const variants = ['solid', 'outlined', 'ghost', 'text', 'link'] as const;
      const colors = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;
      const sizes = ['small', 'medium', 'large'] as const;

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Button - All Variants
          </h1>

          {sizes.map((size) => (
            <section key={size} style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
                Size: {size.charAt(0).toUpperCase() + size.slice(1)}
              </h2>
              {colors.map((color) => (
                <div key={color} style={{ marginBottom: '24px' }}>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#666' }}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    {variants.map((variant) => {
                      const buttonStyle = variant === 'text' || variant === 'link' ? {} : { minWidth: 120 };
                      return (
                        <div key={variant} style={{ textAlign: 'center' }}>
                          <Button variant={variant} color={color} size={size} style={buttonStyle}>
                            {variant}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          ))}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Disabled States
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {variants.map((variant) => (
                <div key={variant} style={{ textAlign: 'center' }}>
                  <Button variant={variant} disabled>
                    {variant}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('button-all-variants-sizes-colors.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // CRITICAL: Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const variants = ['solid', 'outlined', 'ghost', 'text', 'link'] as const;
      const colors = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;
      const sizes = ['small', 'medium', 'large'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '900px',
            background: 'var(--lufa-token-color-background-primary)',
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
            Button - All Variants (Dark Mode)
          </h1>

          {sizes.map((size) => (
            <section key={size} style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  marginBottom: '16px',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                Size: {size.charAt(0).toUpperCase() + size.slice(1)}
              </h2>
              {colors.map((color) => (
                <div key={color} style={{ marginBottom: '24px' }}>
                  <h3
                    style={{
                      marginBottom: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-secondary)',
                    }}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    {variants.map((variant) => {
                      const buttonStyle = variant === 'text' || variant === 'link' ? {} : { minWidth: 120 };
                      return (
                        <div key={variant} style={{ textAlign: 'center' }}>
                          <Button variant={variant} color={color} size={size} style={buttonStyle}>
                            {variant}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          ))}

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Disabled States
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {variants.map((variant) => (
                <div key={variant} style={{ textAlign: 'center' }}>
                  <Button variant={variant} disabled>
                    {variant}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('button-all-variants-sizes-colors-dark.png', {
        animations: 'disabled',
      });

      // Clean up: remove dark mode to avoid affecting other tests
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
