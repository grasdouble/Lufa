/**
 * AspectRatio Component - Playwright Component Tests
 *
 * Tests cover:
 * - Basic rendering
 * - Common ratio values (16:9, 4:3, 1:1, 9:16)
 * - Custom ratio values
 * - Polymorphic rendering
 * - Content positioning
 * - Accessibility
 * - Visual regression
 */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { AspectRatio } from '@grasdouble/lufa_design-system';

test.describe('AspectRatio Component', () => {
  // ==========================================
  // BASIC RENDERING
  // ==========================================

  test.describe('Basic Rendering', () => {
    test('renders with default 16:9 ratio', async ({ mount }) => {
      const component = await mount(
        <AspectRatio>
          <div>Content</div>
        </AspectRatio>
      );
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/aspect-ratio/);
      await expect(component).toHaveClass(/ratio-16-9/);
    });

    test('renders with children', async ({ mount }) => {
      const component = await mount(
        <AspectRatio>
          <div data-testid="child">Test Content</div>
        </AspectRatio>
      );
      const child = component.getByTestId('child');
      await expect(child).toBeVisible();
      await expect(child).toHaveText('Test Content');
    });

    test('renders without children', async ({ mount }) => {
      const component = await mount(<AspectRatio />);
      await expect(component).toBeVisible();
    });
  });

  // ==========================================
  // RATIO VALUES
  // ==========================================

  test.describe('Common Ratio Values', () => {
    test('renders 16:9 ratio (widescreen)', async ({ mount }) => {
      const component = await mount(<AspectRatio ratio={16 / 9} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/ratio-16-9/);
    });

    test('renders 4:3 ratio (classic)', async ({ mount }) => {
      const component = await mount(<AspectRatio ratio={4 / 3} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/ratio-4-3/);
    });

    test('renders 1:1 ratio (square)', async ({ mount }) => {
      const component = await mount(<AspectRatio ratio={1} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/ratio-1-1/);
    });

    test('renders 9:16 ratio (portrait)', async ({ mount }) => {
      const component = await mount(<AspectRatio ratio={9 / 16} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/ratio-9-16/);
    });

    test('renders 3:2 ratio (photography)', async ({ mount }) => {
      const component = await mount(<AspectRatio ratio={3 / 2} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/ratio-3-2/);
    });

    test('renders 21:9 ratio (ultrawide)', async ({ mount }) => {
      const component = await mount(<AspectRatio ratio={21 / 9} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/ratio-21-9/);
    });

    test('renders 3:4 ratio (portrait photo)', async ({ mount }) => {
      const component = await mount(<AspectRatio ratio={3 / 4} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/ratio-3-4/);
    });
  });

  test.describe('Custom Ratio Values', () => {
    test('renders custom ratio with inline style', async ({ mount, page }) => {
      await mount(<AspectRatio ratio={2.5} data-testid="aspect-ratio" />);
      const element = page.getByTestId('aspect-ratio');

      // Custom ratios should have inline style with CSS variable
      const style = await element.getAttribute('style');
      expect(style).toContain('--aspect-ratio-padding');
    });

    test('custom ratio calculates correct padding', async ({ mount, page }) => {
      // For ratio 2.5 (5:2), padding should be (1/2.5) * 100 = 40%
      await mount(<AspectRatio ratio={2.5} data-testid="aspect-ratio" />);
      const element = page.getByTestId('aspect-ratio');

      const style = await element.getAttribute('style');
      expect(style).toContain('40%');
    });
  });

  // ==========================================
  // POLYMORPHIC RENDERING
  // ==========================================

  test.describe('Polymorphic Rendering', () => {
    test('renders as div by default', async ({ mount, page }) => {
      await mount(<AspectRatio data-testid="aspect-ratio" />);
      const element = page.getByTestId('aspect-ratio');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('renders as figure when specified', async ({ mount, page }) => {
      await mount(<AspectRatio as="figure" data-testid="aspect-ratio" />);
      const element = page.getByTestId('aspect-ratio');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('figure');
    });

    test('renders as section when specified', async ({ mount, page }) => {
      await mount(<AspectRatio as="section" data-testid="aspect-ratio" />);
      const element = page.getByTestId('aspect-ratio');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('section');
    });
  });

  // ==========================================
  // CONTENT POSITIONING
  // ==========================================

  test.describe('Content Positioning', () => {
    test('child content is absolutely positioned', async ({ mount, page }) => {
      const component = await mount(
        <AspectRatio data-testid="aspect-ratio">
          <div data-testid="content">Content</div>
        </AspectRatio>
      );

      // Check that the child is visible
      const child = component.getByTestId('content');
      await expect(child).toBeVisible();

      // The parent wrapper element should have position: relative
      const container = page.getByTestId('aspect-ratio');
      const containerPosition = await container.evaluate((el) => window.getComputedStyle(el).position);
      expect(containerPosition).toBe('relative');
    });

    test('child content fills container', async ({ mount, page }) => {
      const component = await mount(
        <AspectRatio data-testid="aspect-ratio">
          <div data-testid="content" style={{ width: '100%', height: '100%', background: 'red' }}>
            Content
          </div>
        </AspectRatio>
      );

      const child = component.getByTestId('content');
      await expect(child).toBeVisible();

      // Verify the content is displayed
      const container = page.getByTestId('aspect-ratio');
      const boundingBox = await container.boundingBox();
      expect(boundingBox).toBeTruthy();
      expect(boundingBox!.width).toBeGreaterThan(0);
      expect(boundingBox!.height).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // ACCESSIBILITY
  // ==========================================

  test.describe('Accessibility', () => {
    test('should pass a11y checks', async ({ mount, page }) => {
      await mount(
        <AspectRatio>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Test image" />
        </AspectRatio>
      );
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('supports custom aria attributes', async ({ mount }) => {
      const component = await mount(<AspectRatio aria-label="Media container" data-testid="aspect-ratio" />);
      await expect(component).toHaveAttribute('aria-label', 'Media container');
    });

    test('supports custom id attribute', async ({ mount }) => {
      const component = await mount(<AspectRatio id="custom-aspect-ratio" data-testid="aspect-ratio" />);
      await expect(component).toHaveAttribute('id', 'custom-aspect-ratio');
    });

    test('accepts ref prop', async ({ mount }) => {
      // Test that the component accepts a ref without errors
      const component = await mount(
        <AspectRatio ref={() => {}} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      );

      // If component renders successfully with ref, test passes
      await expect(component).toBeVisible();
    });
  });

  // ==========================================
  // CUSTOM CLASS NAMES
  // ==========================================

  test.describe('Custom Classes', () => {
    test('accepts custom className', async ({ mount }) => {
      const component = await mount(<AspectRatio className="custom-aspect" data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/custom-aspect/);
    });

    test('merges custom className with component classes', async ({ mount }) => {
      const component = await mount(<AspectRatio className="custom-aspect" ratio={4 / 3} data-testid="aspect-ratio" />);
      await expect(component).toHaveClass(/custom-aspect/);
      await expect(component).toHaveClass(/aspect-ratio/);
      await expect(component).toHaveClass(/ratio-4-3/);
    });
  });

  // ==========================================
  // PRACTICAL USE CASES
  // ==========================================

  test.describe('Practical Use Cases', () => {
    test('works with image content', async ({ mount }) => {
      const component = await mount(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Test" data-testid="image" />
        </AspectRatio>
      );

      const image = component.getByTestId('image');
      await expect(image).toBeVisible();
    });

    test('works with video iframe', async ({ mount }) => {
      const component = await mount(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <iframe
            data-testid="video"
            src="about:blank"
            title="Video"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </AspectRatio>
      );

      const video = component.getByTestId('video');
      await expect(video).toBeVisible();
    });

    test('works with custom content', async ({ mount }) => {
      const component = await mount(
        <AspectRatio ratio={1} data-testid="aspect-ratio">
          <div
            data-testid="custom-content"
            style={{
              width: '100%',
              height: '100%',
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>Custom Content</span>
          </div>
        </AspectRatio>
      );

      const customContent = component.getByTestId('custom-content');
      await expect(customContent).toBeVisible();
    });
  });

  // ==========================================
  // VISUAL REGRESSION
  // ==========================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all common ratios', async ({ mount }) => {
      const ratios = [
        { ratio: 16 / 9, label: '16:9 Widescreen' },
        { ratio: 4 / 3, label: '4:3 Classic' },
        { ratio: 3 / 2, label: '3:2 Photography' },
        { ratio: 1, label: '1:1 Square' },
        { ratio: 9 / 16, label: '9:16 Portrait' },
        { ratio: 21 / 9, label: '21:9 Ultrawide' },
        { ratio: 3 / 4, label: '3:4 Portrait Photo' },
      ];

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: 'var(--lufa-semantic-ui-background-page)',
            width: '900px',
          }}
        >
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            AspectRatio Component - All Ratios
          </h1>

          {ratios.map(({ ratio, label }) => (
            <div key={label} style={{ marginBottom: '32px' }}>
              <h2
                style={{
                  marginBottom: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--lufa-semantic-ui-text-secondary)',
                }}
              >
                {label} (ratio={ratio.toFixed(4)})
              </h2>
              <div style={{ maxWidth: ratio >= 1 ? '400px' : '200px' }}>
                <AspectRatio ratio={ratio}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                  >
                    {label}
                  </div>
                </AspectRatio>
              </div>
            </div>
          ))}
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('aspect-ratio-all-ratios.png');
    });
  });
});
