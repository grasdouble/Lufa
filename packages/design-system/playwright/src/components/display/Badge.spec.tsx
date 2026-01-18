import { expect, test } from '@playwright/experimental-ct-react';

import { Badge } from '@grasdouble/lufa_design-system';

test.describe('Badge Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with text content', async ({ mount }) => {
      const component = await mount(<Badge>Label</Badge>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Label');
    });

    test('should render with label prop (deprecated)', async ({ mount }) => {
      const component = await mount(<Badge label="Deprecated" />);
      await expect(component).toContainText('Deprecated');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Badge className="custom-badge">Test</Badge>);
      await expect(component).toHaveClass(/custom-badge/);
    });
  });

  test.describe('Size Variants', () => {
    test('should render small (sm) size', async ({ mount }) => {
      const component = await mount(<Badge size="sm">Small</Badge>);
      await expect(component).toHaveClass(/size-sm/);
    });
    test('should render medium (md) size by default', async ({ mount }) => {
      const component = await mount(<Badge>Medium</Badge>);
      await expect(component).toHaveClass(/size-md/);
    });
    test('should render large (lg) size', async ({ mount }) => {
      const component = await mount(<Badge size="lg">Large</Badge>);
      await expect(component).toHaveClass(/size-lg/);
    });
  });

  test.describe('Variant Prop', () => {
    const variants = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const;
    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(<Badge variant={variant}>{variant}</Badge>);
        await expect(component).toHaveClass(new RegExp(`variant-${variant}`));
      });
    }
  });

  test.describe('Dot and Rounded', () => {
    test('should render dot indicator', async ({ mount }) => {
      const component = await mount(<Badge dot>Dot</Badge>);
      // Find the dot by matching the class that ends with _dot_ (CSS modules)
      const dot = component.locator('[class*="_dot_"]');
      await expect(dot).toBeVisible();
    });

    test('should render rounded badge', async ({ mount }) => {
      const component = await mount(<Badge rounded>Rounded</Badge>);
      await expect(component).toHaveClass(/rounded/);
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible structure with text', async ({ mount }) => {
      const component = await mount(<Badge>Accessible</Badge>);
      await expect(component).toMatchAriaSnapshot(`
				- text: "Accessible"
			`);
    });
    test('should have accessible structure with dot', async ({ mount }) => {
      const component = await mount(<Badge dot>Dot</Badge>);
      await expect(component).toMatchAriaSnapshot(`
				- text: "Dot"
			`);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all size and variant combinations', async ({ mount }) => {
      const variants = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;
      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Badge Component - All Variants
          </h1>

          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Sizes</h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {sizes.map((size) => (
              <Badge key={size} size={size}>
                {size}
              </Badge>
            ))}
          </div>

          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555', marginTop: '32px' }}>
            Variants
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {variants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>

          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555', marginTop: '32px' }}>
            Dot & Rounded
          </h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Badge dot>Dot</Badge>
            <Badge rounded>Rounded</Badge>
            <Badge dot rounded>
              Dot+Rounded
            </Badge>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('badge-all-variants.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all size and variant combinations in dark mode', async ({ mount, page }) => {
      // Set dark mode before mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const variants = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;
      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '900px',
            backgroundColor: 'var(--lufa-token-color-background-primary)',
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
            Badge Component - All Variants (Dark Mode)
          </h1>

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
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {sizes.map((size) => (
              <Badge key={size} size={size}>
                {size}
              </Badge>
            ))}
          </div>

          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-secondary)',
              marginTop: '32px',
            }}
          >
            Variants
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {variants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>

          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-secondary)',
              marginTop: '32px',
            }}
          >
            Dot & Rounded
          </h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Badge dot>Dot</Badge>
            <Badge rounded>Rounded</Badge>
            <Badge dot rounded>
              Dot+Rounded
            </Badge>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('badge-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
