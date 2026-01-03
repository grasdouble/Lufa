import { expect, test } from '@playwright/experimental-ct-react';

import { Alert } from '@grasdouble/lufa_design-system';

test.describe('Alert Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with children', async ({ mount }) => {
      const component = await mount(<Alert>Message</Alert>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Message');
    });

    test('should render with title', async ({ mount }) => {
      const component = await mount(<Alert title="Title">Message</Alert>);
      await expect(component).toContainText('Title');
      await expect(component).toContainText('Message');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Alert className="custom-alert">Message</Alert>);
      await expect(component).toHaveClass(/custom-alert/);
    });
  });

  test.describe('Variants', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;
    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(<Alert variant={variant}>Message</Alert>);
        await expect(component).toHaveClass(new RegExp(`variant`, 'i'));
      });
    }
  });

  test.describe('Closable', () => {
    test('should render close button and handle close', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Alert
          closable
          onClose={() => {
            closed = true;
          }}
        >
          Message
        </Alert>
      );
      const closeBtn = component.locator('button[aria-label="Close"]');
      await expect(closeBtn).toBeVisible();
      await closeBtn.click();
      expect(closed).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test('should have role alert', async ({ mount }) => {
      const component = await mount(<Alert>Message</Alert>);
      await expect(component).toHaveAttribute('role', 'alert');
    });
    test('should have accessible structure with title and message', async ({ mount }) => {
      const component = await mount(<Alert title="Title">Message</Alert>);
      await expect(component).toMatchAriaSnapshot(`
        - alert:
            - heading "Title" [level=4]
            - text: "Message"
      `);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const variants = ['info', 'success', 'warning', 'error'] as const;
      const component = await mount(
        <div style={{ padding: '20px', width: 'fit-content' }}>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Variants</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            {variants.map((variant) => (
              <Alert key={variant} variant={variant} title={variant}>
                Message
              </Alert>
            ))}
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('alert-all-variants.png');
    });
  });
});
