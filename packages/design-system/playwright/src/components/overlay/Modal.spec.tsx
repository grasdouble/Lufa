import { expect, test } from '@playwright/experimental-ct-react';

import { Modal } from '@grasdouble/lufa_design-system';

test.describe('Modal Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render when open', async ({ mount }) => {
      const component = await mount(
        <Modal open onClose={() => {}}>
          Modal Content
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component).toContainText('Modal Content');
    });

    test('should not render when closed', async ({ mount }) => {
      const component = await mount(
        <Modal open={false} onClose={() => {}}>
          Modal Content
        </Modal>
      );
      await expect(component).not.toBeVisible();
    });

    test('should render with title', async ({ mount }) => {
      const component = await mount(
        <Modal open title="Modal Title" onClose={() => {}}>
          Modal Content
        </Modal>
      );
      await expect(component).toContainText('Modal Title');
      await expect(component).toContainText('Modal Content');
    });

    test('should render with footer', async ({ mount }) => {
      const component = await mount(
        <Modal open footer={<button>Action</button>} onClose={() => {}}>
          Modal Content
        </Modal>
      );
      await expect(component.getByRole('button', { name: 'Action' })).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(
        <Modal open className="custom-modal" onClose={() => {}}>
          Modal Content
        </Modal>
      );
      // Backdrop is the root element
      const modal = component.locator('[class*="modal"]').nth(1);
      await expect(modal).toHaveClass(/custom-modal/);
    });
  });

  test.describe('Size Variants', () => {
    const sizes = ['small', 'medium', 'large', 'fullscreen'] as const;

    for (const size of sizes) {
      test(`should render ${size} size`, async ({ mount }) => {
        const component = await mount(
          <Modal open size={size} onClose={() => {}}>
            {size} Modal
          </Modal>
        );
        await expect(component).toBeVisible();
        const modal = component.locator('[class*="modal"]').nth(1);
        await expect(modal).toHaveClass(new RegExp(`size.*${size}`, 'i'));
      });
    }

    test('should default to medium size', async ({ mount }) => {
      const component = await mount(
        <Modal open onClose={() => {}}>
          Default Size
        </Modal>
      );
      const modal = component.locator('[class*="modal"]').nth(1);
      await expect(modal).toHaveClass(/medium/i);
    });
  });

  test.describe('User Interactions', () => {
    test('should call onClose when close button is clicked', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open
          title="Modal"
          onClose={() => {
            closed = true;
          }}
        >
          Content
        </Modal>
      );

      const closeButton = component.getByRole('button', { name: 'Close' });
      await expect(closeButton).toBeVisible();
      await closeButton.click();
      expect(closed).toBe(true);
    });

    test('should call onClose when backdrop is clicked', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open
          closeOnBackdropClick
          onClose={() => {
            closed = true;
          }}
        >
          Content
        </Modal>
      );

      // Click the backdrop (first element with backdrop class)
      const backdrop = component.locator('[class*="backdrop"]');
      await backdrop.click({ position: { x: 0, y: 0 } });
      expect(closed).toBe(true);
    });

    test('should not close when backdrop is clicked if closeOnBackdropClick is false', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open
          closeOnBackdropClick={false}
          onClose={() => {
            closed = true;
          }}
        >
          Content
        </Modal>
      );

      const backdrop = component.locator('[class*="backdrop"]');
      await backdrop.click({ position: { x: 0, y: 0 } });
      expect(closed).toBe(false);
    });

    test('should call onClose when Escape key is pressed', async ({ mount, page }) => {
      let closed = false;
      await mount(
        <Modal
          open
          closeOnEscape
          onClose={() => {
            closed = true;
          }}
        >
          Content
        </Modal>
      );

      await page.keyboard.press('Escape');
      expect(closed).toBe(true);
    });

    test('should not close when Escape is pressed if closeOnEscape is false', async ({ mount, page }) => {
      let closed = false;
      await mount(
        <Modal
          open
          closeOnEscape={false}
          onClose={() => {
            closed = true;
          }}
        >
          Content
        </Modal>
      );

      await page.keyboard.press('Escape');
      expect(closed).toBe(false);
    });

    test('should not close when clicking inside modal content', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open
          closeOnBackdropClick
          onClose={() => {
            closed = true;
          }}
        >
          <div>Modal Content</div>
        </Modal>
      );

      const content = component.getByText('Modal Content');
      await content.click();
      expect(closed).toBe(false);
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible close button with aria-label', async ({ mount }) => {
      const component = await mount(
        <Modal open title="Modal" onClose={() => {}}>
          Content
        </Modal>
      );

      const closeButton = component.getByRole('button', { name: 'Close' });
      await expect(closeButton).toBeVisible();
      await expect(closeButton).toHaveAttribute('aria-label', 'Close');
    });

    test('should have accessible structure with title', async ({ mount }) => {
      const component = await mount(
        <Modal open title="Important Modal" onClose={() => {}}>
          This is the modal content.
        </Modal>
      );

      // Modal should have heading and proper structure
      const heading = component.getByRole('heading', { name: 'Important Modal' });
      await expect(heading).toBeVisible();
    });

    test('should be keyboard accessible - close button focusable', async ({ mount }) => {
      const component = await mount(
        <Modal open title="Modal" onClose={() => {}}>
          Content
        </Modal>
      );

      const closeButton = component.getByRole('button', { name: 'Close' });
      await closeButton.focus();
      await expect(closeButton).toBeFocused();
    });

    test('should match ARIA snapshot with title and close button', async ({ mount }) => {
      const component = await mount(
        <Modal open title="Modal Title" onClose={() => {}}>
          Modal content text
        </Modal>
      );

      await expect(component).toMatchAriaSnapshot(`
        - text: Modal content text
      `);
    });

    test('should match ARIA snapshot with footer', async ({ mount }) => {
      const component = await mount(
        <Modal
          open
          title="Confirmation"
          footer={
            <div>
              <button>Cancel</button>
              <button>Confirm</button>
            </div>
          }
          onClose={() => {}}
        >
          Are you sure?
        </Modal>
      );

      // Check that footer buttons are accessible
      await expect(component.getByRole('button', { name: 'Cancel' })).toBeVisible();
      await expect(component.getByRole('button', { name: 'Confirm' })).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const sizes = ['small', 'medium', 'large'] as const;

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Modal Component - All Variants
          </h1>

          {/* Basic Modal - All Sizes */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              All Size Variants
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {sizes.map((size) => (
                <div key={size} style={{ minHeight: '200px', position: 'relative' }}>
                  <Modal
                    open
                    size={size}
                    onClose={() => {}}
                    title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
                  >
                    <p>
                      This is a {size} modal demonstrating the size variant. Modal content can include text, forms, and
                      other interactive elements.
                    </p>
                  </Modal>
                </div>
              ))}
            </div>
          </section>

          {/* Modal without Title */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Without Title</h2>
            <div style={{ minHeight: '200px', position: 'relative' }}>
              <Modal open onClose={() => {}}>
                <p>Modal content without a title. The close button is not shown when there is no title.</p>
              </Modal>
            </div>
          </section>

          {/* Modal with Footer */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>With Footer</h2>
            <div style={{ minHeight: '250px', position: 'relative' }}>
              <Modal
                open
                title="Confirmation Required"
                footer={
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        background: '#007bff',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                }
                onClose={() => {}}
              >
                <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
              </Modal>
            </div>
          </section>

          {/* Modal with Long Content */}
          <section>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Long Content</h2>
            <div style={{ minHeight: '300px', position: 'relative' }}>
              <Modal open title="Terms and Conditions" size="large" onClose={() => {}}>
                <p style={{ marginBottom: '12px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </p>
              </Modal>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('modal-all-variants.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const sizes = ['small', 'medium', 'large'] as const;

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
            Modal Component - All Variants (Dark Mode)
          </h1>

          {/* Basic Modal - All Sizes */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              All Size Variants
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {sizes.map((size) => (
                <div key={size} style={{ minHeight: '200px', position: 'relative' }}>
                  <Modal
                    open
                    size={size}
                    onClose={() => {}}
                    title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
                  >
                    <p>
                      This is a {size} modal demonstrating the size variant. Modal content can include text, forms, and
                      other interactive elements.
                    </p>
                  </Modal>
                </div>
              ))}
            </div>
          </section>

          {/* Modal without Title */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Without Title
            </h2>
            <div style={{ minHeight: '200px', position: 'relative' }}>
              <Modal open onClose={() => {}}>
                <p>Modal content without a title. The close button is not shown when there is no title.</p>
              </Modal>
            </div>
          </section>

          {/* Modal with Footer */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              With Footer
            </h2>
            <div style={{ minHeight: '250px', position: 'relative' }}>
              <Modal
                open
                title="Confirmation Required"
                footer={
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        background: '#007bff',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                }
                onClose={() => {}}
              >
                <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
              </Modal>
            </div>
          </section>

          {/* Modal with Long Content */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Long Content
            </h2>
            <div style={{ minHeight: '300px', position: 'relative' }}>
              <Modal open title="Terms and Conditions" size="large" onClose={() => {}}>
                <p style={{ marginBottom: '12px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </p>
              </Modal>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('modal-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
