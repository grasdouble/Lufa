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
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Alert Component - All Variants
          </h1>

          {/* Basic Alerts - All Variants */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Basic Alerts (All Variants)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {variants.map((variant) => (
                <Alert
                  key={variant}
                  variant={variant}
                  title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert`}
                >
                  This is a {variant} message with some description text.
                </Alert>
              ))}
            </div>
          </section>

          {/* Alerts without Title */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Without Title</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {variants.map((variant) => (
                <Alert key={`no-title-${variant}`} variant={variant}>
                  This is a {variant} alert without a title. Just the message content.
                </Alert>
              ))}
            </div>
          </section>

          {/* Closable Alerts */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Closable Alerts
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {variants.map((variant) => (
                <Alert
                  key={`closable-${variant}`}
                  variant={variant}
                  title={`Closable ${variant.charAt(0).toUpperCase() + variant.slice(1)}`}
                  closable
                  onClose={() => {}}
                >
                  This alert can be dismissed by clicking the close button.
                </Alert>
              ))}
            </div>
          </section>

          {/* Alerts with Custom Icons */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              With Custom Icons
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {variants.map((variant) => (
                <Alert
                  key={`icon-${variant}`}
                  variant={variant}
                  title="Custom Icon Alert"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  }
                >
                  Alert with a custom notification bell icon.
                </Alert>
              ))}
            </div>
          </section>

          {/* Long Content Alerts */}
          <section>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Long Content</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              <Alert variant="info" title="Detailed Information" closable onClose={() => {}}>
                This is an alert with longer content to demonstrate how the component handles multiple lines of text. It
                includes important details that users need to read carefully. The content should wrap properly and
                maintain good readability even with extensive information provided in the alert message.
              </Alert>
              <Alert variant="warning" title="Important Warning">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Alert>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('alert-all-variants.png', {
        animations: 'disabled',
      });
    });
  });
});
