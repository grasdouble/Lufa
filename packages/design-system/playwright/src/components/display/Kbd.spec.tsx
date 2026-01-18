import { expect, test } from '@playwright/experimental-ct-react';

import { Kbd } from '@grasdouble/lufa_design-system';

test.describe('Kbd Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with keyboard key content', async ({ mount }) => {
      const component = await mount(<Kbd>Ctrl</Kbd>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Ctrl');
    });

    test('should render with single character', async ({ mount }) => {
      const component = await mount(<Kbd>K</Kbd>);
      await expect(component).toContainText('K');
    });

    test('should render with symbols', async ({ mount }) => {
      const component = await mount(<Kbd>⌘</Kbd>);
      await expect(component).toContainText('⌘');
    });

    test('should render semantic HTML kbd element', async ({ mount }) => {
      const component = await mount(<Kbd>Enter</Kbd>);
      await expect(component).toBeVisible();
      // Verify it's a kbd element
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('kbd');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Kbd className="custom-kbd">Esc</Kbd>);
      await expect(component).toHaveClass(/custom-kbd/);
    });
  });

  test.describe('Size Variants', () => {
    test('should render small size', async ({ mount }) => {
      const component = await mount(<Kbd size="small">Ctrl</Kbd>);
      await expect(component).toHaveClass(/sizeSmall/);
    });

    test('should render medium size by default', async ({ mount }) => {
      const component = await mount(<Kbd>Enter</Kbd>);
      await expect(component).toHaveClass(/sizeMedium/);
    });

    test('should render large size', async ({ mount }) => {
      const component = await mount(<Kbd size="large">Shift</Kbd>);
      await expect(component).toHaveClass(/sizeLarge/);
    });
  });

  test.describe('Visual Variants', () => {
    const variants = ['default', 'outlined', 'solid'] as const;

    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(<Kbd variant={variant}>K</Kbd>);
        const expectedClass = `variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
        await expect(component).toHaveClass(new RegExp(expectedClass));
      });
    }

    test('should render default variant by default', async ({ mount }) => {
      const component = await mount(<Kbd>Space</Kbd>);
      await expect(component).toHaveClass(/variantDefault/);
    });
  });

  test.describe('Common Keyboard Keys', () => {
    const commonKeys = [
      'Ctrl',
      'Alt',
      'Shift',
      'Cmd',
      '⌘',
      'Enter',
      'Esc',
      'Tab',
      'Delete',
      'Backspace',
      '↑',
      '↓',
      '←',
      '→',
    ];

    for (const key of commonKeys) {
      test(`should render ${key} key correctly`, async ({ mount }) => {
        const component = await mount(<Kbd>{key}</Kbd>);
        await expect(component).toBeVisible();
        await expect(component).toContainText(key);
      });
    }
  });

  test.describe('Keyboard Combinations', () => {
    test('should render multiple Kbd elements for combinations', async ({ mount }) => {
      const component = await mount(
        <div>
          <Kbd>Ctrl</Kbd>
          <span> + </span>
          <Kbd>C</Kbd>
        </div>
      );
      const kbdElements = component.locator('kbd');
      await expect(kbdElements).toHaveCount(2);
      await expect(kbdElements.first()).toContainText('Ctrl');
      await expect(kbdElements.last()).toContainText('C');
    });

    test('should render complex combinations', async ({ mount }) => {
      const component = await mount(
        <div>
          <Kbd>Cmd</Kbd>
          <span> + </span>
          <Kbd>Shift</Kbd>
          <span> + </span>
          <Kbd>P</Kbd>
        </div>
      );
      const kbdElements = component.locator('kbd');
      await expect(kbdElements).toHaveCount(3);
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible structure with single key', async ({ mount }) => {
      const component = await mount(<Kbd>Enter</Kbd>);
      await expect(component).toMatchAriaSnapshot(`
        - text: "Enter"
      `);
    });

    test('should have accessible structure with symbol', async ({ mount }) => {
      const component = await mount(<Kbd>⌘</Kbd>);
      await expect(component).toMatchAriaSnapshot(`
        - text: "⌘"
      `);
    });

    test('should have proper semantic HTML for screen readers', async ({ mount }) => {
      const component = await mount(<Kbd>Ctrl</Kbd>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('kbd');
    });

    test('should support aria attributes via props spread', async ({ mount }) => {
      const component = await mount(<Kbd aria-label="Control key">Ctrl</Kbd>);
      await expect(component).toHaveAttribute('aria-label', 'Control key');
    });
  });

  test.describe('Combined Props', () => {
    test('should handle all size and variant combinations', async ({ mount }) => {
      const sizes = ['small', 'medium', 'large'] as const;
      const variants = ['default', 'outlined', 'solid'] as const;

      for (const size of sizes) {
        for (const variant of variants) {
          const component = await mount(
            <Kbd size={size} variant={variant}>
              K
            </Kbd>
          );
          const sizeClass = `size${size.charAt(0).toUpperCase()}${size.slice(1)}`;
          const variantClass = `variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
          await expect(component).toHaveClass(new RegExp(sizeClass));
          await expect(component).toHaveClass(new RegExp(variantClass));
          await component.unmount();
        }
      }
    });

    test('should handle size, variant, and custom className together', async ({ mount }) => {
      const component = await mount(
        <Kbd size="large" variant="solid" className="custom-class">
          Enter
        </Kbd>
      );
      await expect(component).toHaveClass(/sizeLarge/);
      await expect(component).toHaveClass(/variantSolid/);
      await expect(component).toHaveClass(/custom-class/);
    });
  });

  test.describe('HTML Props Support', () => {
    test('should support standard HTML attributes', async ({ mount }) => {
      const component = await mount(
        <Kbd id="test-kbd" data-testid="kbd-element" title="Keyboard shortcut">
          K
        </Kbd>
      );
      await expect(component).toHaveAttribute('id', 'test-kbd');
      await expect(component).toHaveAttribute('data-testid', 'kbd-element');
      await expect(component).toHaveAttribute('title', 'Keyboard shortcut');
    });

    test('should support style prop', async ({ mount }) => {
      const component = await mount(<Kbd style={{ marginLeft: '8px' }}>Tab</Kbd>);
      await expect(component).toHaveAttribute('style', /margin-left/);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle empty string children', async ({ mount }) => {
      const component = await mount(<Kbd>{''}</Kbd>);
      await expect(component).toBeVisible();
    });

    test('should handle numeric children', async ({ mount }) => {
      const component = await mount(<Kbd>{1}</Kbd>);
      await expect(component).toContainText('1');
    });

    test('should handle long text content', async ({ mount }) => {
      const component = await mount(<Kbd>PageDown</Kbd>);
      await expect(component).toContainText('PageDown');
      await expect(component).toBeVisible();
    });

    test('should maintain text centering', async ({ mount }) => {
      const component = await mount(<Kbd>K</Kbd>);
      const textAlign = await component.evaluate((el) => window.getComputedStyle(el).textAlign);
      expect(textAlign).toBe('center');
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all size and variant combinations', async ({ mount }) => {
      const sizes = ['small', 'medium', 'large'] as const;
      const variants = ['default', 'outlined', 'solid'] as const;

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Kbd Component - All Variants
          </h1>

          {/* Size × Variant Grid */}
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
            Size × Variant Combinations
          </h2>
          <table
            style={{
              borderCollapse: 'separate',
              borderSpacing: '12px',
              marginBottom: '48px',
              background: '#fff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#666',
                    fontSize: '14px',
                  }}
                >
                  Size / Variant
                </th>
                {variants.map((variant) => (
                  <th
                    key={variant}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#666',
                      fontSize: '14px',
                    }}
                  >
                    {variant}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size}>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontWeight: '600',
                      color: '#666',
                      fontSize: '14px',
                      textAlign: 'left',
                    }}
                  >
                    {size}
                  </td>
                  {variants.map((variant) => (
                    <td key={variant} style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <Kbd size={size} variant={variant}>
                        K
                      </Kbd>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Common Keyboard Keys */}
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
            Common Keyboard Keys
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '48px',
              background: '#fff',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <Kbd>Ctrl</Kbd>
            <Kbd>Alt</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Cmd</Kbd>
            <Kbd>⌘</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>Delete</Kbd>
            <Kbd>Backspace</Kbd>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
          </div>

          {/* Key Combinations Examples */}
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
            Keyboard Shortcuts
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: '#fff',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Copy:</span>
              <Kbd>Ctrl</Kbd>
              <span style={{ color: '#999' }}>+</span>
              <Kbd>C</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Paste:</span>
              <Kbd>Cmd</Kbd>
              <span style={{ color: '#999' }}>+</span>
              <Kbd>V</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Undo:</span>
              <Kbd>Ctrl</Kbd>
              <span style={{ color: '#999' }}>+</span>
              <Kbd>Z</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Command:</span>
              <Kbd>Cmd</Kbd>
              <span style={{ color: '#999' }}>+</span>
              <Kbd>Shift</Kbd>
              <span style={{ color: '#999' }}>+</span>
              <Kbd>P</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Navigate:</span>
              <Kbd>Ctrl</Kbd>
              <span style={{ color: '#999' }}>+</span>
              <Kbd>←</Kbd>
              <span style={{ color: '#999' }}>/</span>
              <Kbd>→</Kbd>
            </div>
          </div>

          {/* Variant Comparison at Same Size */}
          <h2 style={{ marginTop: '48px', marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
            Variants Comparison (Large Size)
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              background: '#fff',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#999', fontWeight: '500' }}>Default</div>
              <Kbd size="large" variant="default">
                Enter
              </Kbd>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#999', fontWeight: '500' }}>Outlined</div>
              <Kbd size="large" variant="outlined">
                Enter
              </Kbd>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#999', fontWeight: '500' }}>Solid</div>
              <Kbd size="large" variant="solid">
                Enter
              </Kbd>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('kbd-all-variants.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all size and variant combinations in dark mode', async ({ mount, page }) => {
      // Set dark mode before mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const sizes = ['small', 'medium', 'large'] as const;
      const variants = ['default', 'outlined', 'solid'] as const;

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: 'var(--lufa-token-color-background-primary)',
            width: '900px',
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
            Kbd Component - All Variants (Dark Mode)
          </h1>

          {/* Size × Variant Grid */}
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Size × Variant Combinations
          </h2>
          <table
            style={{
              borderCollapse: 'separate',
              borderSpacing: '12px',
              marginBottom: '48px',
              background: 'var(--lufa-token-color-background-primary)',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: 'var(--lufa-token-color-text-secondary)',
                    fontSize: '14px',
                  }}
                >
                  Size / Variant
                </th>
                {variants.map((variant) => (
                  <th
                    key={variant}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-secondary)',
                      fontSize: '14px',
                    }}
                  >
                    {variant}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size}>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontWeight: '600',
                      color: 'var(--lufa-token-color-text-secondary)',
                      fontSize: '14px',
                      textAlign: 'left',
                    }}
                  >
                    {size}
                  </td>
                  {variants.map((variant) => (
                    <td key={variant} style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <Kbd size={size} variant={variant}>
                        K
                      </Kbd>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Common Keyboard Keys */}
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Common Keyboard Keys
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '48px',
              background: 'var(--lufa-token-color-background-primary)',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <Kbd>Ctrl</Kbd>
            <Kbd>Alt</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Cmd</Kbd>
            <Kbd>⌘</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>Delete</Kbd>
            <Kbd>Backspace</Kbd>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
          </div>

          {/* Key Combinations Examples */}
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Keyboard Shortcuts
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: 'var(--lufa-token-color-background-primary)',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  minWidth: '120px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontSize: '14px',
                }}
              >
                Copy:
              </span>
              <Kbd>Ctrl</Kbd>
              <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>+</span>
              <Kbd>C</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  minWidth: '120px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontSize: '14px',
                }}
              >
                Paste:
              </span>
              <Kbd>Cmd</Kbd>
              <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>+</span>
              <Kbd>V</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  minWidth: '120px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontSize: '14px',
                }}
              >
                Undo:
              </span>
              <Kbd>Ctrl</Kbd>
              <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>+</span>
              <Kbd>Z</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  minWidth: '120px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontSize: '14px',
                }}
              >
                Command:
              </span>
              <Kbd>Cmd</Kbd>
              <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>+</span>
              <Kbd>Shift</Kbd>
              <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>+</span>
              <Kbd>P</Kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  minWidth: '120px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontSize: '14px',
                }}
              >
                Navigate:
              </span>
              <Kbd>Ctrl</Kbd>
              <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>+</span>
              <Kbd>←</Kbd>
              <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>/</span>
              <Kbd>→</Kbd>
            </div>
          </div>

          {/* Variant Comparison at Same Size */}
          <h2
            style={{
              marginTop: '48px',
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Variants Comparison (Large Size)
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              background: 'var(--lufa-token-color-background-primary)',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  marginBottom: '8px',
                  fontSize: '12px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontWeight: '500',
                }}
              >
                Default
              </div>
              <Kbd size="large" variant="default">
                Enter
              </Kbd>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  marginBottom: '8px',
                  fontSize: '12px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontWeight: '500',
                }}
              >
                Outlined
              </div>
              <Kbd size="large" variant="outlined">
                Enter
              </Kbd>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  marginBottom: '8px',
                  fontSize: '12px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  fontWeight: '500',
                }}
              >
                Solid
              </div>
              <Kbd size="large" variant="solid">
                Enter
              </Kbd>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('kbd-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
