import { expect, test } from '@playwright/experimental-ct-react';

import { Modal } from '@grasdouble/lufa_design-system';

import { ModalWithBackdropClickFixture, ModalWithCloseFixture } from './Modal.fixtures';

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
      // Modal div is a child of the backdrop
      const modal = component.locator('[class*="modal"][class*="custom-modal"]');
      await expect(modal).toBeVisible();
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
        // Modal is the child div with both modal and size classes
        const modal = component.locator('[class*="modal"][class*="size"]');
        await expect(modal).toHaveClass(new RegExp(`size.*${size}`, 'i'));
      });
    }

    test('should default to medium size', async ({ mount }) => {
      const component = await mount(
        <Modal open onClose={() => {}}>
          Default Size
        </Modal>
      );
      const modal = component.locator('[class*="modal"][class*="size"]');
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

    test('should call onClose when backdrop is clicked', async ({ mount, page }) => {
      const component = await mount(
        <ModalWithBackdropClickFixture open closeOnBackdropClick onClose={() => {}}>
          Content
        </ModalWithBackdropClickFixture>
      );

      // Wait for modal to be visible
      const modal = component.getByText('Content');
      await expect(modal).toBeVisible();

      // Get backdrop element and click it directly (not on the modal content)
      const backdrop = component.locator('[class*="backdrop"]').first();
      const backdropBox = await backdrop.boundingBox();

      if (backdropBox) {
        // Click in the top-left corner of the backdrop (outside modal content)
        await page.mouse.click(backdropBox.x + 10, backdropBox.y + 10);
      }

      // Check that onClose was called
      const clickCount = component.getByTestId('click-count');
      await expect(clickCount).toHaveText('1');
    });

    test('should not close when backdrop is clicked if closeOnBackdropClick is false', async ({ mount, page }) => {
      const component = await mount(
        <ModalWithBackdropClickFixture open closeOnBackdropClick={false} onClose={() => {}}>
          Content
        </ModalWithBackdropClickFixture>
      );

      // Wait for modal to be visible
      const modal = component.getByText('Content');
      await expect(modal).toBeVisible();

      // Click on backdrop
      const backdrop = component.locator('[class*="backdrop"]').first();
      const backdropBox = await backdrop.boundingBox();

      if (backdropBox) {
        await page.mouse.click(backdropBox.x + 10, backdropBox.y + 10);
      }

      // Check that onClose was NOT called
      const clickCount = component.getByTestId('click-count');
      await expect(clickCount).toHaveText('0');
    });

    test('should call onClose when Escape key is pressed', async ({ mount, page }) => {
      const component = await mount(
        <ModalWithCloseFixture open closeOnEscape onClose={() => {}}>
          Content
        </ModalWithCloseFixture>
      );

      await page.keyboard.press('Escape');
      const status = component.getByTestId('close-status');
      await expect(status).toHaveText('closed');
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
        - heading "Modal Title" [level=3]
        - button "Close":
          - img
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

      await expect(component).toMatchAriaSnapshot(`
        - heading "Confirmation" [level=3]
        - button "Close":
          - img
        - text: Are you sure?
        - button "Cancel"
        - button "Confirm"
      `);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount, page }) => {
      const sizes = ['small', 'medium', 'large'] as const;

      // Add custom styles to make modals stackable for visual testing
      await page.addStyleTag({
        content: `
          .modal-showcase-wrapper {
            position: relative !important;
            min-height: 400px;
            margin-bottom: 24px;
            background: transparent !important;
          }
          .modal-showcase-wrapper > div[class*="backdrop"] {
            position: relative !important;
            height: auto !important;
            min-height: 300px;
            background: rgba(0, 0, 0, 0.5) !important;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }
        `,
      });

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Modal Component - All Variants
          </h1>

          {/* Section 1: All Size Variants */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              All Size Variants
            </h2>
            {sizes.map((size) => (
              <div key={size} className="modal-showcase-wrapper">
                <Modal
                  open
                  size={size}
                  onClose={() => {}}
                  title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
                >
                  <p>This is a {size} modal demonstrating the size variant.</p>
                </Modal>
              </div>
            ))}
          </section>

          {/* Section 2: Modal without Title */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Without Title</h2>
            <div className="modal-showcase-wrapper">
              <Modal open onClose={() => {}}>
                <p>Modal content without a title. The close button is not shown when there is no title.</p>
              </Modal>
            </div>
          </section>

          {/* Section 3: Modal with Footer */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              With Footer Actions
            </h2>
            <div className="modal-showcase-wrapper">
              <Modal
                open
                title="Confirmation Required"
                footer={
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button>Cancel</button>
                    <button>Confirm</button>
                  </div>
                }
                onClose={() => {}}
              >
                <p>Are you sure you want to proceed with this action?</p>
              </Modal>
            </div>
          </section>

          {/* Section 4: Modal with Long Content */}
          <section>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Scrollable Long Content
            </h2>
            <div className="modal-showcase-wrapper">
              <Modal open title="Terms and Conditions" size="large" onClose={() => {}}>
                <p style={{ marginBottom: '12px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
              </Modal>
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('modal-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const sizes = ['small', 'medium', 'large'] as const;

      // Add custom styles to make modals stackable for visual testing
      await page.addStyleTag({
        content: `
          .modal-showcase-wrapper {
            position: relative !important;
            min-height: 400px;
            margin-bottom: 24px;
            background: transparent !important;
          }
          .modal-showcase-wrapper > div[class*="backdrop"] {
            position: relative !important;
            height: auto !important;
            min-height: 300px;
            background: rgba(0, 0, 0, 0.7) !important;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }
        `,
      });

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

          {/* Section 1: All Size Variants */}
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
            {sizes.map((size) => (
              <div key={size} className="modal-showcase-wrapper">
                <Modal
                  open
                  size={size}
                  onClose={() => {}}
                  title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
                >
                  <p>This is a {size} modal demonstrating the size variant.</p>
                </Modal>
              </div>
            ))}
          </section>

          {/* Section 2: Modal without Title */}
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
            <div className="modal-showcase-wrapper">
              <Modal open onClose={() => {}}>
                <p>Modal content without a title. The close button is not shown when there is no title.</p>
              </Modal>
            </div>
          </section>

          {/* Section 3: Modal with Footer */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              With Footer Actions
            </h2>
            <div className="modal-showcase-wrapper">
              <Modal
                open
                title="Confirmation Required"
                footer={
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button>Cancel</button>
                    <button>Confirm</button>
                  </div>
                }
                onClose={() => {}}
              >
                <p>Are you sure you want to proceed with this action?</p>
              </Modal>
            </div>
          </section>

          {/* Section 4: Modal with Long Content */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Scrollable Long Content
            </h2>
            <div className="modal-showcase-wrapper">
              <Modal open title="Terms and Conditions" size="large" onClose={() => {}}>
                <p style={{ marginBottom: '12px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
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
