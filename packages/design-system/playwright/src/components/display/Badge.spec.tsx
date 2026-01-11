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
        <div style={{ padding: '20px', width: 'fit-content' }}>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Sizes</h1>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {sizes.map((size) => (
              <Badge key={size} size={size}>
                {size}
              </Badge>
            ))}
          </div>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Variants</h1>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {variants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </div>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Dot & Rounded</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Badge dot>Dot</Badge>
            <Badge rounded>Rounded</Badge>
            <Badge dot rounded>
              Dot+Rounded
            </Badge>
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('badge-all-variants.png');
    });
  });
});
