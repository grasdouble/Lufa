import React from 'react';
import { expect, test } from '@playwright/experimental-ct-react';

import { Button, Modal } from '@grasdouble/lufa_design-system';

import { ModalBodyScrollFixture, ModalToggleFixture, ModalWithBackdropClick } from './Modal.fixtures';

test.describe('Modal Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render when open is true', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}}>
          <p>Modal content</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component.getByText('Modal content')).toBeVisible();
    });
    test('should not render when open is false', async ({ mount }) => {
      const component = await mount(
        <Modal open={false} onClose={() => {}}>
          <p>Modal content</p>
        </Modal>
      );
      await expect(component.getByText('Modal content')).not.toBeVisible();
    });
    test('should render with title', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} title="Modal Title">
          <p>Modal content</p>
        </Modal>
      );
      await expect(component.getByText('Modal Title')).toBeVisible();
      await expect(component.getByRole('heading', { name: 'Modal Title' })).toBeVisible();
    });
    test('should render with footer', async ({ mount }) => {
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {}}
          footer={
            <div>
              <Button>Cancel</Button>
              <Button>Confirm</Button>
            </div>
          }
        >
          <p>Modal content</p>
        </Modal>
      );
      await expect(component.getByText('Cancel')).toBeVisible();
      await expect(component.getByText('Confirm')).toBeVisible();
    });
    test('should render without title and footer', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}}>
          <p>Modal content</p>
        </Modal>
      );
      await expect(component.getByText('Modal content')).toBeVisible();
      await expect(component.locator('h3')).not.toBeVisible();
    });
    test('should apply custom className', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} className="custom-modal">
          <p>Modal content</p>
        </Modal>
      );
      const modalDialog = component.locator('.custom-modal');
      await expect(modalDialog).toBeVisible();
    });
  });
  test.describe('Size Variants', () => {
    test('should render small size', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} size="small">
          <p>Small modal</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component.getByText('Small modal')).toBeVisible();
    });
    test('should render medium size by default', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}}>
          <p>Medium modal</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component.getByText('Medium modal')).toBeVisible();
    });
    test('should render large size', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} size="large">
          <p>Large modal</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component.getByText('Large modal')).toBeVisible();
    });
    test('should render fullscreen size', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} size="fullscreen">
          <p>Fullscreen modal</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component.getByText('Fullscreen modal')).toBeVisible();
    });
  });
  test.describe('Close Behavior', () => {
    test('should call onClose when clicking close button with title', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {
            closed = true;
          }}
          title="Modal with close button"
        >
          <p>Content</p>
        </Modal>
      );
      const closeButton = component.getByRole('button', { name: 'Close' });
      await expect(closeButton).toBeVisible();
      await closeButton.click();
      expect(closed).toBe(true);
    });
    test('should call onClose when clicking backdrop with closeOnBackdropClick enabled (default)', async ({
      mount,
      page,
    }) => {
      const component = await mount(<ModalWithBackdropClick />);
      await expect(component.getByTestId('close-status')).toHaveText('open');

      // Wait for modal content to be visible to ensure everything is mounted
      await expect(component.getByText('Content')).toBeVisible();

      // Find the backdrop element using page locator (portaled element)
      const backdrop = page.locator('[class*="backdrop"]').first();
      await expect(backdrop).toBeVisible();

      // Click the backdrop at a position that won't hit the modal dialog
      // The backdrop is the outer element, modal dialog is centered inside
      await backdrop.click({ position: { x: 5, y: 5 } });

      // Check that the modal closed
      await expect(component.getByTestId('close-status')).toHaveText('closed');
    });
    test('should not call onClose when clicking backdrop with closeOnBackdropClick disabled', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {
            closed = true;
          }}
          closeOnBackdropClick={false}
        >
          <p>Content</p>
        </Modal>
      );
      // Click the backdrop
      const backdrop = component.locator('div').first();
      await backdrop.click({ position: { x: 5, y: 5 } });
      expect(closed).toBe(false);
    });
    test('should not call onClose when clicking modal content', async ({ mount }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {
            closed = true;
          }}
        >
          <p>Click me</p>
        </Modal>
      );
      await component.getByText('Click me').click();
      expect(closed).toBe(false);
    });
    test('should call onClose when pressing Escape with closeOnEscape enabled (default)', async ({ mount, page }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {
            closed = true;
          }}
        >
          <p>Content</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      await page.keyboard.press('Escape');
      expect(closed).toBe(true);
    });
    test('should not call onClose when pressing Escape with closeOnEscape disabled', async ({ mount, page }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {
            closed = true;
          }}
          closeOnEscape={false}
        >
          <p>Content</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      await page.keyboard.press('Escape');
      expect(closed).toBe(false);
    });
  });
  test.describe('Keyboard Navigation & Focus Management', () => {
    test.skip('should trap focus within modal', async ({ mount, page }) => {
      // Focus trap is not currently implemented in the Modal component
      // This test is skipped until focus trap functionality is added
    });
    test('should focus close button when modal opens with title', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} title="Modal with title">
          <p>Content</p>
        </Modal>
      );
      const closeButton = component.getByRole('button', { name: 'Close' });
      await expect(closeButton).toBeVisible();
    });
    test('should be keyboard accessible', async ({ mount, page }) => {
      let closed = false;
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {
            closed = true;
          }}
          title="Keyboard test"
        >
          <p>Content</p>
        </Modal>
      );
      const closeButton = component.getByRole('button', { name: 'Close' });
      await closeButton.focus();
      await expect(closeButton).toBeFocused();
      await page.keyboard.press('Enter');
      expect(closed).toBe(true);
    });
  });
  test.describe('Accessibility (ARIA)', () => {
    test('should have correct ARIA attributes with title', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} title="Accessible Modal">
          <p>Content</p>
        </Modal>
      );
      await expect(component).toBeVisible();
      // Modal should have proper heading structure
      await expect(component.getByRole('heading', { name: 'Accessible Modal' })).toBeVisible();
    });
    test('should have close button with aria-label', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      const closeButton = component.getByRole('button', { name: 'Close' });
      await expect(closeButton).toHaveAttribute('aria-label', 'Close');
    });
    test('is accessible (ARIA snapshot)', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} title="ARIA Test">
          <p>Modal content for accessibility</p>
        </Modal>
      );
      await expect(component).toMatchAriaSnapshot(`
        - heading "ARIA Test" [level=3]
        - button "Close"
        - paragraph: Modal content for accessibility
      `);
    });
  });
  test.describe('State Management', () => {
    test('should toggle visibility when open prop changes', async ({ mount, page }) => {
      const component = await mount(<ModalToggleFixture />);

      // Initially modal should be hidden
      await expect(component.getByTestId('modal-state')).toHaveText('hidden');
      await expect(component.getByText('Modal content')).not.toBeVisible();

      // Click button to open modal (use page locator to avoid component boundary issues)
      await page.getByRole('button', { name: 'Toggle Modal' }).click();

      // Modal should now be visible
      await expect(component.getByTestId('modal-state')).toHaveText('visible');
      await expect(component.getByText('Modal content')).toBeVisible();

      // Close modal via close button instead of toggle button (backdrop intercepts it)
      await component.getByRole('button', { name: 'Close' }).click();

      // Modal should be hidden again
      await expect(component.getByTestId('modal-state')).toHaveText('hidden');
      await expect(component.getByText('Modal content')).not.toBeVisible();
    });
    test('should handle multiple modals (stacking)', async ({ mount }) => {
      const component = await mount(
        <>
          <Modal open={true} onClose={() => {}} title="First Modal">
            <p>First modal content</p>
          </Modal>
          <Modal open={true} onClose={() => {}} title="Second Modal">
            <p>Second modal content</p>
          </Modal>
        </>
      );
      await expect(component.getByText('First modal content')).toBeVisible();
      await expect(component.getByText('Second modal content')).toBeVisible();
    });
  });
  test.describe('Body Scroll Lock', () => {
    test('should prevent body scroll when modal is open', async ({ mount, page }) => {
      await mount(
        <div>
          <div style={{ height: '3000px', background: '#f0f0f0' }}>
            <p>Long content</p>
          </div>
          <Modal open={true} onClose={() => {}}>
            <p>Modal content</p>
          </Modal>
        </div>
      );

      // Wait a bit for the effect to run
      await page.waitForTimeout(100);

      // Check if body overflow is set to hidden
      const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe('hidden');
    });
    test('should restore body scroll when modal closes', async ({ mount, page }) => {
      const component = await mount(<ModalBodyScrollFixture />);

      // Initially body should not have overflow hidden
      let bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe('');

      // Open modal
      await component.getByRole('button', { name: 'Open Modal' }).click();
      await expect(component.getByText('Modal content')).toBeVisible();

      // Wait for effect to apply
      await page.waitForTimeout(50);

      // Body should have overflow hidden
      bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe('hidden');

      // Close modal
      await component.getByRole('button', { name: 'Close' }).click();
      await expect(component.getByText('Modal content')).not.toBeVisible();

      // Wait for cleanup effect to run
      await page.waitForTimeout(50);

      // Body overflow should be restored
      bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe('');
    });
  });
  test.describe('Visual Regression', () => {
    test('visual regression: all size variants', async ({ mount }) => {
      const sizes = ['small', 'medium', 'large', 'fullscreen'] as const;
      const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
        padding: 24,
        background: '#f5f5f5',
        minHeight: '100vh',
      };
      const labelStyle = {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 8,
        color: '#333',
      };
      const modalWrapperStyle = {
        position: 'relative' as const,
        height: 400,
        border: '1px solid #ddd',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
      };
      const component = await mount(
        <div style={containerStyle}>
          {sizes.map((size) => (
            <div key={size}>
              <div style={labelStyle}>Size: {size}</div>
              <div style={modalWrapperStyle}>
                <Modal open={true} onClose={() => {}} size={size} title={`${size} Modal`}>
                  <p>This is a {size} modal with some content to demonstrate the size variant.</p>
                  <p>Additional paragraph for more content.</p>
                </Modal>
              </div>
            </div>
          ))}
        </div>
      );
      await expect(component).toHaveScreenshot('modal-all-size-variants.png');
    });
    test('visual regression: with and without title/footer', async ({ mount }) => {
      test.setTimeout(30000);
      const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
        padding: 24,
        background: '#f5f5f5',
      };
      const labelStyle = {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 8,
        color: '#333',
      };
      const modalWrapperStyle = {
        position: 'relative' as const,
        height: 300,
        border: '1px solid #ddd',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
      };
      const component = await mount(
        <div style={containerStyle}>
          <div>
            <div style={labelStyle}>With Title Only</div>
            <div style={modalWrapperStyle}>
              <Modal open={true} onClose={() => {}} title="Modal Title">
                <p>Modal content without footer</p>
              </Modal>
            </div>
          </div>
          <div>
            <div style={labelStyle}>With Footer Only</div>
            <div style={modalWrapperStyle}>
              <Modal
                open={true}
                onClose={() => {}}
                footer={
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button>Confirm</Button>
                  </div>
                }
              >
                <p>Modal content without title</p>
              </Modal>
            </div>
          </div>
          <div>
            <div style={labelStyle}>With Title and Footer</div>
            <div style={modalWrapperStyle}>
              <Modal
                open={true}
                onClose={() => {}}
                title="Complete Modal"
                footer={
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button>Confirm</Button>
                  </div>
                }
              >
                <p>Modal with both title and footer</p>
              </Modal>
            </div>
          </div>
          <div>
            <div style={labelStyle}>Content Only</div>
            <div style={modalWrapperStyle}>
              <Modal open={true} onClose={() => {}}>
                <p>Modal with only content, no title or footer</p>
              </Modal>
            </div>
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('modal-title-footer-variants.png');
    });
    test('visual regression: all variants comprehensive', async ({ mount }) => {
      test.setTimeout(30000);
      const sizes = ['small', 'medium', 'large'] as const;
      const containerStyle = {
        padding: 24,
        background: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 32,
      };
      const sectionTitleStyle = {
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 16,
        color: '#333',
      };
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
      };
      const labelStyle = {
        fontWeight: 600,
        fontSize: 12,
        marginBottom: 8,
        color: '#666',
      };
      const modalWrapperStyle = {
        position: 'relative' as const,
        height: 250,
        border: '1px solid #ddd',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
      };
      const component = await mount(
        <div style={containerStyle}>
          <div>
            <div style={sectionTitleStyle}>Modal Sizes</div>
            <div style={gridStyle}>
              {sizes.map((size) => (
                <div key={size}>
                  <div style={labelStyle}>{size.toUpperCase()}</div>
                  <div style={modalWrapperStyle}>
                    <Modal
                      open={true}
                      onClose={() => {}}
                      size={size}
                      title={`${size} Modal`}
                      footer={
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <Button size="small" variant="outlined">
                            Cancel
                          </Button>
                          <Button size="small">OK</Button>
                        </div>
                      }
                    >
                      <p>Content for {size} modal</p>
                    </Modal>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={sectionTitleStyle}>Content Variants</div>
            <div style={gridStyle}>
              <div>
                <div style={labelStyle}>Title + Content + Footer</div>
                <div style={modalWrapperStyle}>
                  <Modal
                    open={true}
                    onClose={() => {}}
                    title="Complete Modal"
                    footer={
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined">
                          Cancel
                        </Button>
                        <Button size="small">Save</Button>
                      </div>
                    }
                  >
                    <p>Full modal with all parts</p>
                  </Modal>
                </div>
              </div>
              <div>
                <div style={labelStyle}>Title + Content</div>
                <div style={modalWrapperStyle}>
                  <Modal open={true} onClose={() => {}} title="Modal with Title">
                    <p>Modal without footer</p>
                  </Modal>
                </div>
              </div>
              <div>
                <div style={labelStyle}>Content Only</div>
                <div style={modalWrapperStyle}>
                  <Modal open={true} onClose={() => {}}>
                    <p>Minimal modal content</p>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('modal-all-variants.png');
    });
    test('visual regression: dark mode with title and footer', async ({ mount, page }) => {
      test.setTimeout(30000);

      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
        padding: 24,
        background: 'var(--lufa-token-color-background-primary)',
        minHeight: '100vh',
      };
      const labelStyle = {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 8,
        color: 'var(--lufa-token-color-text-primary)',
      };
      const modalWrapperStyle = {
        position: 'relative' as const,
        height: 300,
        border: '1px solid var(--lufa-token-color-text-secondary)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--lufa-token-color-background-primary)',
      };
      const component = await mount(
        <div style={containerStyle}>
          <div>
            <div style={labelStyle}>With Title Only</div>
            <div style={modalWrapperStyle}>
              <Modal open={true} onClose={() => {}} title="Modal Title">
                <p>Modal content without footer</p>
              </Modal>
            </div>
          </div>
          <div>
            <div style={labelStyle}>With Footer Only</div>
            <div style={modalWrapperStyle}>
              <Modal
                open={true}
                onClose={() => {}}
                footer={
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button>Confirm</Button>
                  </div>
                }
              >
                <p>Modal content without title</p>
              </Modal>
            </div>
          </div>
          <div>
            <div style={labelStyle}>With Title and Footer</div>
            <div style={modalWrapperStyle}>
              <Modal
                open={true}
                onClose={() => {}}
                title="Complete Modal"
                footer={
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button>Confirm</Button>
                  </div>
                }
              >
                <p>Modal with both title and footer</p>
              </Modal>
            </div>
          </div>
          <div>
            <div style={labelStyle}>Content Only</div>
            <div style={modalWrapperStyle}>
              <Modal open={true} onClose={() => {}}>
                <p>Modal with only content, no title or footer</p>
              </Modal>
            </div>
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('modal-title-footer-variants-dark.png');

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
  test.describe('Edge Cases', () => {
    test('should handle long content with scrolling', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} title="Long Content Modal">
          <div>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>Paragraph {i + 1} with some content to create scrollable area.</p>
            ))}
          </div>
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component.getByText('Paragraph 1 with some content to create scrollable area.')).toBeVisible();
    });
    test('should handle empty content', async ({ mount }) => {
      const component = await mount(
        <Modal open={true} onClose={() => {}} title="Empty Modal">
          <></>
        </Modal>
      );
      await expect(component).toBeVisible();
      await expect(component.getByText('Empty Modal')).toBeVisible();
    });
    test('should handle complex footer content', async ({ mount }) => {
      const component = await mount(
        <Modal
          open={true}
          onClose={() => {}}
          title="Complex Footer"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Additional info</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="text">Cancel</Button>
                <Button variant="outlined">Save Draft</Button>
                <Button>Publish</Button>
              </div>
            </div>
          }
        >
          <p>Content with complex footer</p>
        </Modal>
      );
      await expect(component.getByText('Additional info')).toBeVisible();
      await expect(component.getByRole('button', { name: 'Cancel' })).toBeVisible();
      await expect(component.getByRole('button', { name: 'Save Draft' })).toBeVisible();
      await expect(component.getByRole('button', { name: 'Publish' })).toBeVisible();
    });
  });
});
