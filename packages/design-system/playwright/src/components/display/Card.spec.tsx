import { expect, test } from '@playwright/experimental-ct-react';

import { Card } from '@grasdouble/lufa_design-system';

test.describe('Card Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with children', async ({ mount }) => {
      const component = await mount(<Card>Content</Card>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Content');
    });

    test('should render with title and subtitle', async ({ mount }) => {
      const component = await mount(
        <Card title="Title" subtitle="Subtitle">
          Body
        </Card>
      );
      await expect(component).toContainText('Title');
      await expect(component).toContainText('Subtitle');
      await expect(component).toContainText('Body');
    });

    test('should render with footer', async ({ mount }) => {
      const component = await mount(<Card footer={<span>Footer</span>}>Body</Card>);
      await expect(component).toContainText('Footer');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Card className="custom-card">Body</Card>);
      await expect(component).toHaveClass(/custom-card/);
    });
  });

  test.describe('Variants', () => {
    const variants = ['default', 'elevated', 'outlined', 'filled'] as const;
    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(<Card variant={variant}>Body</Card>);
        await expect(component).toHaveClass(new RegExp(`variant`, 'i'));
      });
    }
  });

  test.describe('Padding', () => {
    const paddings = ['none', 'small', 'medium', 'large'] as const;
    for (const padding of paddings) {
      test(`should render with ${padding} padding`, async ({ mount }) => {
        const component = await mount(<Card padding={padding}>Body</Card>);
        await expect(component).toHaveClass(new RegExp(`padding`, 'i'));
      });
    }
  });

  test.describe('Interactive', () => {
    test('should render hoverable card', async ({ mount }) => {
      const component = await mount(<Card hoverable>Body</Card>);
      await expect(component).toHaveClass(/hoverable/);
    });

    test('should render clickable card and handle click', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <Card
          onClick={() => {
            clicked = true;
          }}
        >
          Body
        </Card>
      );
      await component.click();
      expect(clicked).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible structure with header and content', async ({ mount }) => {
      const component = await mount(
        <Card title="Title" subtitle="Subtitle">
          Body
        </Card>
      );
      await expect(component).toMatchAriaSnapshot(`
        - heading "Title" [level=3]
        - paragraph: Subtitle
        - text: Body
      `);
    });
    test('should have accessible structure with content only', async ({ mount }) => {
      const component = await mount(<Card>Body</Card>);
      await expect(component).toMatchAriaSnapshot(`
        - text: Body
      `);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants and paddings', async ({ mount }) => {
      const variants = ['default', 'elevated', 'outlined', 'filled'] as const;
      const paddings = ['none', 'small', 'medium', 'large'] as const;
      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Card Component - All Variants
          </h1>

          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Variants</h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {variants.map((variant) => (
              <Card key={variant} variant={variant} title={variant}>
                Body
              </Card>
            ))}
          </div>

          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555', marginTop: '32px' }}>
            Paddings
          </h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            {paddings.map((padding) => (
              <Card key={padding} padding={padding} title={padding}>
                Body
              </Card>
            ))}
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('card-all-variants.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants and paddings in dark mode', async ({ mount, page }) => {
      // Set dark mode before mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const variants = ['default', 'elevated', 'outlined', 'filled'] as const;
      const paddings = ['none', 'small', 'medium', 'large'] as const;
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
            Card Component - All Variants (Dark Mode)
          </h1>

          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-secondary)',
            }}
          >
            Variants
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {variants.map((variant) => (
              <Card key={variant} variant={variant} title={variant}>
                Body
              </Card>
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
            Paddings
          </h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            {paddings.map((padding) => (
              <Card key={padding} padding={padding} title={padding}>
                Body
              </Card>
            ))}
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('card-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
