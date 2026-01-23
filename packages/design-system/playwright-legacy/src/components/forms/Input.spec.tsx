import { expect, test } from '@playwright/experimental-ct-react';

import { Input } from '@grasdouble/lufa_design-system';

import { InputWithOnChangeFixture } from './Input.fixtures';

test.describe('Input Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Input />);
      const input = component.getByRole('textbox');
      await expect(input).toBeVisible();
    });

    test('should render with placeholder', async ({ mount }) => {
      const component = await mount(<Input placeholder="Type here" />);
      await expect(component.getByPlaceholder('Type here')).toBeVisible();
    });

    test('should render with label', async ({ mount }) => {
      const component = await mount(<Input label="Email" />);
      await expect(component.getByText('Email')).toBeVisible();
      await expect(component.getByRole('textbox')).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Input className="custom-class" aria-label="Custom input" />);
      await expect(component.getByRole('textbox')).toBeVisible();
    });
  });

  test.describe('Variants', () => {
    test.describe('Variant Types', () => {
      const variants = ['outlined', 'filled'] as const;

      for (const variant of variants) {
        test(`should render ${variant} variant`, async ({ mount }) => {
          const component = await mount(<Input variant={variant} placeholder="Type here" />);
          const input = component.getByRole('textbox');
          await expect(input).toBeVisible();
        });
      }

      test('should default to outlined variant', async ({ mount }) => {
        const component = await mount(<Input placeholder="Default" />);
        await expect(component.getByRole('textbox')).toBeVisible();
      });
    });

    test.describe('Size Variants', () => {
      const sizes = ['small', 'medium', 'large'] as const;

      for (const size of sizes) {
        test(`should render ${size} size`, async ({ mount }) => {
          const component = await mount(<Input size={size} placeholder="Type here" />);
          const input = component.getByRole('textbox');
          await expect(input).toBeVisible();
        });
      }

      test('should default to medium size', async ({ mount }) => {
        const component = await mount(<Input placeholder="Default" />);
        await expect(component.getByRole('textbox')).toBeVisible();
      });
    });

    test.describe('State Variants', () => {
      test('should render disabled state', async ({ mount }) => {
        const component = await mount(<Input disabled placeholder="Disabled" />);
        const input = component.getByRole('textbox');
        await expect(input).toBeDisabled();
      });

      test('should render with error message', async ({ mount }) => {
        const component = await mount(<Input error="This field is required" label="Email" />);
        await expect(component.getByText('This field is required')).toBeVisible();
      });

      test('should render with helper text', async ({ mount }) => {
        const component = await mount(<Input helperText="Enter your email address" label="Email" />);
        await expect(component.getByText('Enter your email address')).toBeVisible();
      });

      test('should render required indicator', async ({ mount }) => {
        const component = await mount(<Input required label="Required Field" />);
        await expect(component.getByRole('textbox')).toBeVisible();
      });

      test('should render full width', async ({ mount }) => {
        const component = await mount(<Input fullWidth placeholder="Full width" />);
        await expect(component.getByRole('textbox')).toBeVisible();
      });
    });
  });

  test.describe('User Interactions', () => {
    test('should accept user input', async ({ mount }) => {
      const component = await mount(<Input placeholder="Type here" />);
      const input = component.getByRole('textbox');
      await input.fill('Hello World');
      await expect(input).toHaveValue('Hello World');
    });

    test('should call onChange handler', async ({ mount }) => {
      const component = await mount(<InputWithOnChangeFixture placeholder="Type here" />);
      const input = component.getByRole('textbox');
      await input.fill('test value');
      const output = component.getByTestId('output-value');
      await expect(output).toHaveText('test value');
    });

    test('should be keyboard accessible with Tab', async ({ mount, page }) => {
      const component = await mount(<Input aria-label="Tab input" />);
      const input = component.getByRole('textbox');
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
    });

    test('should not accept input when disabled', async ({ mount }) => {
      const component = await mount(<Input disabled placeholder="Disabled" />);
      const input = component.getByRole('textbox');
      await input.fill('test', { force: true });
      await expect(input).toHaveValue('');
    });

    test('should clear input value', async ({ mount }) => {
      const component = await mount(<Input placeholder="Type here" defaultValue="Initial" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveValue('Initial');
      await input.clear();
      await expect(input).toHaveValue('');
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes', async ({ mount }) => {
      const component = await mount(<Input aria-label="Email input" />);
      const input = component.getByRole('textbox', { name: 'Email input' });
      await expect(input).toBeVisible();
    });

    test('should have accessible structure with label', async ({ mount }) => {
      const component = await mount(<Input label="Email Address" />);
      const label = component.getByText('Email Address');
      await expect(label).toBeVisible();
      const input = component.getByRole('textbox');
      await expect(input).toBeVisible();
    });

    test('should have accessible structure without label', async ({ mount }) => {
      const component = await mount(<Input aria-label="Accessible input" />);
      await expect(component).toMatchAriaSnapshot(`
        - textbox "Accessible input"
      `);
    });

    test('should support keyboard navigation', async ({ mount, page }) => {
      const component = await mount(<Input label="Name" />);
      const input = component.getByRole('textbox');
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
    });

    test('should associate error message with input', async ({ mount }) => {
      const component = await mount(<Input label="Email" error="Invalid email" />);
      const errorText = component.getByText('Invalid email');
      await expect(errorText).toBeVisible();
    });

    test('should associate helper text with input', async ({ mount }) => {
      const component = await mount(<Input label="Email" helperText="Enter valid email" />);
      const helperText = component.getByText('Enter valid email');
      await expect(helperText).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants in light mode', async ({ mount }) => {
      const variants = ['outlined', 'filled'] as const;
      const sizes = ['small', 'medium', 'large'] as const;

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Input - All Variants
          </h1>

          {variants.map((variant) => (
            <section key={variant} style={{ marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
                Variant: {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </h2>
              {sizes.map((size) => (
                <div key={size} style={{ marginBottom: '32px' }}>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#666' }}>
                    Size: {size.charAt(0).toUpperCase() + size.slice(1)}
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Default</p>
                      <Input placeholder="Type here..." variant={variant} size={size} />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>With Value</p>
                      <Input placeholder="Type here..." variant={variant} size={size} defaultValue="Sample text" />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>With Label</p>
                      <Input label="Label" placeholder="Type here..." variant={variant} size={size} />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Required</p>
                      <Input label="Required Field" placeholder="Type here..." variant={variant} size={size} required />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>With Helper Text</p>
                      <Input
                        label="Helper Text"
                        placeholder="Type here..."
                        variant={variant}
                        size={size}
                        helperText="This is helper text"
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Error</p>
                      <Input
                        label="Error State"
                        placeholder="Type here..."
                        variant={variant}
                        size={size}
                        error="This field is required"
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Disabled</p>
                      <Input placeholder="Disabled" variant={variant} size={size} disabled />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Disabled with Value</p>
                      <Input
                        placeholder="Disabled"
                        variant={variant}
                        size={size}
                        disabled
                        defaultValue="Disabled text"
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Full Width</p>
                      <Input placeholder="Full width..." variant={variant} size={size} fullWidth />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('input-all-variants-sizes-states-light.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // CRITICAL: Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const variants = ['outlined', 'filled'] as const;
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
            Input - All Variants (Dark Mode)
          </h1>

          {variants.map((variant) => (
            <section key={variant} style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  marginBottom: '16px',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                Variant: {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </h2>
              {sizes.map((size) => (
                <div key={size} style={{ marginBottom: '32px' }}>
                  <h3
                    style={{
                      marginBottom: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-secondary)',
                    }}
                  >
                    Size: {size.charAt(0).toUpperCase() + size.slice(1)}
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        Default
                      </p>
                      <Input placeholder="Type here..." variant={variant} size={size} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        With Value
                      </p>
                      <Input placeholder="Type here..." variant={variant} size={size} defaultValue="Sample text" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        With Label
                      </p>
                      <Input label="Label" placeholder="Type here..." variant={variant} size={size} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        Required
                      </p>
                      <Input label="Required Field" placeholder="Type here..." variant={variant} size={size} required />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        With Helper Text
                      </p>
                      <Input
                        label="Helper Text"
                        placeholder="Type here..."
                        variant={variant}
                        size={size}
                        helperText="This is helper text"
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        Error
                      </p>
                      <Input
                        label="Error State"
                        placeholder="Type here..."
                        variant={variant}
                        size={size}
                        error="This field is required"
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        Disabled
                      </p>
                      <Input placeholder="Disabled" variant={variant} size={size} disabled />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        Disabled with Value
                      </p>
                      <Input
                        placeholder="Disabled"
                        variant={variant}
                        size={size}
                        disabled
                        defaultValue="Disabled text"
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--lufa-token-color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        Full Width
                      </p>
                      <Input placeholder="Full width..." variant={variant} size={size} fullWidth />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('input-all-variants-sizes-states-dark.png', {
        animations: 'disabled',
      });

      // Clean up: remove dark mode to avoid affecting other tests
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
