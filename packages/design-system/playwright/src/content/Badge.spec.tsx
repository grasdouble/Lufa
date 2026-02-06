/**
 * Badge Component - Playwright Component Tests
 *
 * Comprehensive behavioral test suite for the Badge component.
 * Tests cover rendering, all prop variants, dot indicator, user interactions,
 * accessibility, polymorphic rendering, and visual regression.
 *
 * Badge is a compact indicator component for displaying status, labels, counts,
 * or notifications with semantic color variants and optional dot indicator.
 *
 * Test Categories (following official Playwright CT guidelines):
 * 1. Basic Rendering - Default behavior and core functionality
 * 2. Variants - All semantic color variants (default, success, error, warning, info)
 * 3. Sizes - All size variants (sm, md, lg)
 * 4. Dot Indicator - Badge with notification dot
 * 5. Accessibility - ARIA attributes, semantic HTML
 * 6. Polymorphic - Rendering as span, div, or label elements
 * 7. Visual Regression - Comprehensive snapshots in light and dark modes
 *
 * @see .github/instructions/lufa-design-system-playwright-ct.instructions.md
 */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Badge } from '@grasdouble/lufa_design-system';

// ============================================
// TEST SUITE: Basic Rendering
// ============================================

test.describe('Badge Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Badge>New</Badge>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('New');
    });

    test('should render as span element by default', async ({ mount }) => {
      const component = await mount(<Badge>Default badge</Badge>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('span');
    });

    test('should apply default variant', async ({ mount }) => {
      const component = await mount(<Badge>Default</Badge>);
      await expect(component).toHaveClass(/_variant-default/);
    });

    test('should apply default size (md)', async ({ mount }) => {
      const component = await mount(<Badge>Default size</Badge>);
      await expect(component).toHaveClass(/_size-md/);
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Badge className="custom-badge">Content</Badge>);
      await expect(component).toHaveClass(/custom-badge/);
    });

    test('should combine custom className with utility classes', async ({ mount }) => {
      const component = await mount(
        <Badge variant="success" size="lg" className="custom-class">
          Combined classes
        </Badge>
      );
      await expect(component).toHaveClass(/_variant-success/);
      await expect(component).toHaveClass(/_size-lg/);
      await expect(component).toHaveClass(/custom-class/);
    });

    test('should render numeric content', async ({ mount }) => {
      const component = await mount(<Badge>42</Badge>);
      await expect(component).toContainText('42');
    });

    test('should render with inline display', async ({ mount }) => {
      const component = await mount(<Badge>Inline</Badge>);
      const display = await component.evaluate((el) => window.getComputedStyle(el).display);
      expect(display).toBe('inline-flex');
    });
  });

  // ============================================
  // TEST SUITE: Variants
  // ============================================

  test.describe('Variants', () => {
    const variants = ['default', 'success', 'error', 'warning', 'info'] as const;

    variants.forEach((variant) => {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(<Badge variant={variant}>{variant}</Badge>);
        await expect(component).toHaveClass(new RegExp(`_variant-${variant}`));
      });
    });

    test('should apply correct background colors for variants', async ({ mount }) => {
      // Mount all variants at once to avoid React root conflicts
      const component = await mount(
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="default" data-testid="badge-default">
            default
          </Badge>
          <Badge variant="success" data-testid="badge-success">
            success
          </Badge>
          <Badge variant="error" data-testid="badge-error">
            error
          </Badge>
          <Badge variant="warning" data-testid="badge-warning">
            warning
          </Badge>
          <Badge variant="info" data-testid="badge-info">
            info
          </Badge>
        </div>
      );

      // Test each variant's background color
      const variants = ['default', 'success', 'error', 'warning', 'info'] as const;
      for (const variant of variants) {
        const badge = component.getByTestId(`badge-${variant}`);
        const bgColor = await badge.evaluate((el) => window.getComputedStyle(el).backgroundColor);
        expect(bgColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
        expect(bgColor).toBeTruthy();
      }
    });

    test('should apply correct text colors for variants', async ({ mount }) => {
      const component = await mount(<Badge variant="success">Success</Badge>);
      const color = await component.evaluate((el) => window.getComputedStyle(el).color);
      expect(color).toBeTruthy();
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  // ============================================
  // TEST SUITE: Sizes
  // ============================================

  test.describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      test(`should render ${size} size`, async ({ mount }) => {
        const component = await mount(<Badge size={size}>{size}</Badge>);
        await expect(component).toHaveClass(new RegExp(`_size-${size}`));
      });
    });

    test('should have different font sizes for each size', async ({ mount }) => {
      // Mount all sizes at once to avoid React root conflicts
      const component = await mount(
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge size="sm" data-testid="badge-sm">
            Small
          </Badge>
          <Badge size="md" data-testid="badge-md">
            Medium
          </Badge>
          <Badge size="lg" data-testid="badge-lg">
            Large
          </Badge>
        </div>
      );

      const smBadge = component.getByTestId('badge-sm');
      const mdBadge = component.getByTestId('badge-md');
      const lgBadge = component.getByTestId('badge-lg');

      const smFontSize = await smBadge.evaluate((el) => window.getComputedStyle(el).fontSize);
      const mdFontSize = await mdBadge.evaluate((el) => window.getComputedStyle(el).fontSize);
      const lgFontSize = await lgBadge.evaluate((el) => window.getComputedStyle(el).fontSize);

      // Parse pixel values
      const smSize = parseFloat(smFontSize);
      const mdSize = parseFloat(mdFontSize);
      const lgSize = parseFloat(lgFontSize);

      expect(smSize).toBeLessThan(mdSize);
      expect(mdSize).toBeLessThan(lgSize);
    });

    test('should have different padding for each size', async ({ mount }) => {
      // Mount all sizes at once to avoid React root conflicts
      const component = await mount(
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge size="sm" data-testid="badge-sm">
            S
          </Badge>
          <Badge size="md" data-testid="badge-md">
            M
          </Badge>
          <Badge size="lg" data-testid="badge-lg">
            L
          </Badge>
        </div>
      );

      const smBadge = component.getByTestId('badge-sm');
      const mdBadge = component.getByTestId('badge-md');
      const lgBadge = component.getByTestId('badge-lg');

      const smPadding = await smBadge.evaluate((el) => window.getComputedStyle(el).padding);
      const mdPadding = await mdBadge.evaluate((el) => window.getComputedStyle(el).padding);
      const lgPadding = await lgBadge.evaluate((el) => window.getComputedStyle(el).padding);

      // Paddings should be different
      expect(smPadding).not.toBe(mdPadding);
      expect(mdPadding).not.toBe(lgPadding);
    });
  });

  // ============================================
  // TEST SUITE: Dot Indicator
  // ============================================

  test.describe('Dot Indicator', () => {
    test('should not show dot by default', async ({ mount }) => {
      const component = await mount(<Badge>No dot</Badge>);
      const dot = component.locator('[class*="badge-dot"]');
      await expect(dot).toHaveCount(0);
    });

    test('should show dot when dot prop is true', async ({ mount }) => {
      const component = await mount(<Badge dot>With dot</Badge>);
      const dot = component.locator('[class*="badge-dot"]');
      await expect(dot).toHaveCount(1);
      await expect(dot).toBeVisible();
    });

    test('should hide dot from screen readers (aria-hidden)', async ({ mount }) => {
      const component = await mount(<Badge dot>Notification</Badge>);
      const dot = component.locator('[class*="badge-dot"]');
      await expect(dot).toHaveAttribute('aria-hidden', 'true');
    });

    test('should render dot with correct styling', async ({ mount }) => {
      const component = await mount(
        <Badge dot variant="error">
          3
        </Badge>
      );
      const dot = component.locator('[class*="badge-dot"]');

      const width = await dot.evaluate((el) => window.getComputedStyle(el).width);
      const height = await dot.evaluate((el) => window.getComputedStyle(el).height);
      const borderRadius = await dot.evaluate((el) => window.getComputedStyle(el).borderRadius);

      // Dot should be square
      expect(width).toBe(height);

      // Dot should be circular (50% border-radius)
      expect(borderRadius).toContain('50%');
    });

    test('should position dot before content', async ({ mount }) => {
      const component = await mount(<Badge dot>Content</Badge>);
      const children = await component.evaluate((el) => Array.from(el.children).length);
      expect(children).toBe(2); // dot + content wrapper

      const firstChild = await component.evaluate((el) => el.children[0].className);
      expect(firstChild).toContain('badge-dot');
    });

    test('should apply badge-with-dot class when dot is present', async ({ mount }) => {
      const component = await mount(<Badge dot>With dot</Badge>);
      await expect(component).toHaveClass(/_badge-with-dot/);
    });

    test('should work with all variants', async ({ mount }) => {
      // Mount all variants with dot at once to avoid React root conflicts
      const component = await mount(
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="default" dot data-testid="badge-default">
            default
          </Badge>
          <Badge variant="success" dot data-testid="badge-success">
            success
          </Badge>
          <Badge variant="error" dot data-testid="badge-error">
            error
          </Badge>
          <Badge variant="warning" dot data-testid="badge-warning">
            warning
          </Badge>
          <Badge variant="info" dot data-testid="badge-info">
            info
          </Badge>
        </div>
      );

      // Verify dot is visible for each variant
      const variants = ['default', 'success', 'error', 'warning', 'info'] as const;
      for (const variant of variants) {
        const badge = component.getByTestId(`badge-${variant}`);
        const dot = badge.locator('[class*="badge-dot"]');
        await expect(dot).toBeVisible();
      }
    });

    test('should work with all sizes', async ({ mount }) => {
      // Mount all sizes with dot at once to avoid React root conflicts
      const component = await mount(
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge size="sm" dot data-testid="badge-sm">
            sm
          </Badge>
          <Badge size="md" dot data-testid="badge-md">
            md
          </Badge>
          <Badge size="lg" dot data-testid="badge-lg">
            lg
          </Badge>
        </div>
      );

      // Verify dot is visible for each size
      const sizes = ['sm', 'md', 'lg'] as const;
      for (const size of sizes) {
        const badge = component.getByTestId(`badge-${size}`);
        const dot = badge.locator('[class*="badge-dot"]');
        await expect(dot).toBeVisible();
      }
    });
  });

  // ============================================
  // TEST SUITE: Accessibility
  // ============================================

  test.describe('Accessibility', () => {
    test('should pass a11y checks', async ({ mount, page }) => {
      await mount(<Badge>Accessible</Badge>);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should be visible to screen readers by default', async ({ mount }) => {
      const component = await mount(<Badge>Accessible</Badge>);
      await expect(component).not.toHaveAttribute('aria-hidden');
    });

    test('should support custom aria-label', async ({ mount }) => {
      const component = await mount(<Badge aria-label="3 new notifications">3</Badge>);
      await expect(component).toHaveAttribute('aria-label', '3 new notifications');
    });

    test('should support role attribute', async ({ mount }) => {
      const component = await mount(<Badge role="status">Online</Badge>);
      await expect(component).toHaveAttribute('role', 'status');
    });

    test('should have sufficient color contrast', async ({ mount }) => {
      // This test ensures CSS is applied correctly
      // Actual contrast testing is done via axe-core in Storybook
      const component = await mount(<Badge variant="success">Success</Badge>);

      const bgColor = await component.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      const textColor = await component.evaluate((el) => window.getComputedStyle(el).color);

      expect(bgColor).toBeTruthy();
      expect(textColor).toBeTruthy();
      expect(bgColor).not.toBe(textColor); // Background and text should differ
    });

    test('should render semantic HTML with label element', async ({ mount }) => {
      const component = await mount(<Badge as="label">Label badge</Badge>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('label');
    });

    test('should pass through HTML attributes', async ({ mount }) => {
      const component = await mount(
        <Badge id="status-badge" data-testid="badge-test" title="Status indicator">
          Status
        </Badge>
      );

      await expect(component).toHaveAttribute('id', 'status-badge');
      await expect(component).toHaveAttribute('data-testid', 'badge-test');
      await expect(component).toHaveAttribute('title', 'Status indicator');
    });
  });

  // ============================================
  // TEST SUITE: Polymorphic Rendering
  // ============================================

  test.describe('Polymorphic Rendering', () => {
    test('should render as span by default', async ({ mount }) => {
      const component = await mount(<Badge>Span badge</Badge>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('span');
    });

    test('should render as div when as="div"', async ({ mount }) => {
      const component = await mount(<Badge as="div">Div badge</Badge>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('should render as label when as="label"', async ({ mount }) => {
      const component = await mount(<Badge as="label">Label badge</Badge>);
      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('label');
    });

    test('should maintain styling when changing element type', async ({ mount }) => {
      // Mount both element types at once to avoid React root conflicts
      const component = await mount(
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="success" data-testid="span-badge">
            Span
          </Badge>
          <Badge as="div" variant="success" data-testid="div-badge">
            Div
          </Badge>
        </div>
      );

      const spanBadge = component.getByTestId('span-badge');
      const divBadge = component.getByTestId('div-badge');

      // Both should have the same variant class
      await expect(spanBadge).toHaveClass(/_variant-success/);
      await expect(divBadge).toHaveClass(/_variant-success/);
    });

    test('should support element-specific props (label)', async ({ mount }) => {
      const component = await mount(<Badge as="label">Label text</Badge>);

      const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('label');
    });
  });

  // ============================================
  // TEST SUITE: Visual Regression
  // ============================================

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const variants = ['default', 'success', 'error', 'warning', 'info'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;

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
            Badge Component - All Variants
          </h1>

          {/* Section 1: Variants */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Variants
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {variants.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
          </section>

          {/* Section 2: Sizes */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Sizes
            </h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <Badge key={size} size={size}>
                  {size}
                </Badge>
              ))}
            </div>
          </section>

          {/* Section 3: With Dot Indicator */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              With Dot Indicator
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {variants.map((variant) => (
                <Badge key={variant} dot variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
          </section>

          {/* Section 4: Numeric Badges */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Numeric Badges
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="error">1</Badge>
              <Badge variant="error">9</Badge>
              <Badge variant="error">99</Badge>
              <Badge variant="error">999</Badge>
            </div>
          </section>

          {/* Section 5: Size x Variant Combinations */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Size × Variant Combinations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sizes.map((size) => (
                <div key={size} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ width: '60px', fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>
                    {size}:
                  </div>
                  {variants.map((variant) => (
                    <Badge key={variant} variant={variant} size={size}>
                      {variant}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Real World Examples */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Real World Examples
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--lufa-semantic-ui-text-primary)' }}>Status:</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--lufa-semantic-ui-text-primary)' }}>Notifications</span>
                <Badge variant="error" dot>
                  3
                </Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--lufa-semantic-ui-text-primary)' }}>Version:</span>
                <Badge variant="info" size="sm">
                  Beta
                </Badge>
              </div>
            </div>
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('badge-all-variants.png');
    });
  });
});
