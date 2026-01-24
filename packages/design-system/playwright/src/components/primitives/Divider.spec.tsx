/**
 * Divider Component - Playwright Component Tests
 *
 * Tests cover:
 * - Basic rendering
 * - Orientation (horizontal, vertical)
 * - Color variants (default, subtle, strong)
 * - Thickness levels (thin, medium, thick)
 * - Spacing variants (compact, default, comfortable)
 * - Line styles (solid, dashed)
 * - Polymorphic rendering
 * - Accessibility (ARIA attributes)
 * - Visual regression
 */

import { expect, test } from '@playwright/experimental-ct-react';

import { Divider } from '@grasdouble/lufa_design-system';

test.describe('Divider Component', () => {
  // ==========================================
  // BASIC RENDERING
  // ==========================================

  test.describe('Basic Rendering', () => {
    test('renders horizontal divider by default', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/divider/);
      await expect(component).toHaveClass(/orientation-horizontal/);
    });

    test('renders with default variant', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveClass(/variant-default/);
    });

    test('renders with thin thickness by default', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveClass(/thickness-thin/);
    });

    test('renders with default spacing', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveClass(/spacing-default/);
    });

    test('renders with solid line style by default', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveClass(/line-style-solid/);
    });
  });

  // ==========================================
  // ORIENTATION
  // ==========================================

  test.describe('Orientation', () => {
    test('renders all orientations', async ({ mount }) => {
      const component = await mount(
        <div style={{ display: 'flex', gap: '16px', height: '100px' }}>
          <Divider orientation="horizontal" data-testid="horizontal" />
          <Divider orientation="vertical" data-testid="vertical" />
        </div>
      );

      const horizontal = component.getByTestId('horizontal');
      const vertical = component.getByTestId('vertical');

      await expect(horizontal).toHaveClass(/orientation-horizontal/);
      await expect(vertical).toHaveClass(/orientation-vertical/);
    });

    test('horizontal divider has correct ARIA orientation', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" />);
      await expect(component).toHaveAttribute('aria-orientation', 'horizontal');
    });

    test('vertical divider has correct ARIA orientation', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" />);
      await expect(component).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  // ==========================================
  // COLOR VARIANTS
  // ==========================================

  test.describe('Color Variants', () => {
    test('renders all color variants', async ({ mount }) => {
      const component = await mount(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Divider variant="default" data-testid="default" />
          <Divider variant="subtle" data-testid="subtle" />
          <Divider variant="strong" data-testid="strong" />
        </div>
      );

      await expect(component.getByTestId('default')).toHaveClass(/variant-default/);
      await expect(component.getByTestId('subtle')).toHaveClass(/variant-subtle/);
      await expect(component.getByTestId('strong')).toHaveClass(/variant-strong/);
    });
  });

  // ==========================================
  // THICKNESS LEVELS
  // ==========================================

  test.describe('Thickness', () => {
    test('renders all thickness levels', async ({ mount }) => {
      const component = await mount(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Divider thickness="thin" data-testid="thin" />
          <Divider thickness="medium" data-testid="medium" />
          <Divider thickness="thick" data-testid="thick" />
        </div>
      );

      await expect(component.getByTestId('thin')).toHaveClass(/thickness-thin/);
      await expect(component.getByTestId('medium')).toHaveClass(/thickness-medium/);
      await expect(component.getByTestId('thick')).toHaveClass(/thickness-thick/);
    });
  });

  // ==========================================
  // SPACING VARIANTS
  // ==========================================

  test.describe('Spacing', () => {
    test('renders all spacing variants', async ({ mount }) => {
      const component = await mount(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Divider spacing="compact" data-testid="compact" />
          <Divider spacing="default" data-testid="default" />
          <Divider spacing="comfortable" data-testid="comfortable" />
        </div>
      );

      await expect(component.getByTestId('compact')).toHaveClass(/spacing-compact/);
      await expect(component.getByTestId('default')).toHaveClass(/spacing-default/);
      await expect(component.getByTestId('comfortable')).toHaveClass(/spacing-comfortable/);
    });
  });

  // ==========================================
  // LINE STYLES
  // ==========================================

  test.describe('Line Styles', () => {
    test('renders solid line style', async ({ mount }) => {
      const component = await mount(<Divider lineStyle="solid" />);
      await expect(component).toHaveClass(/line-style-solid/);
    });

    test('renders dashed line style', async ({ mount }) => {
      const component = await mount(<Divider lineStyle="dashed" />);
      await expect(component).toHaveClass(/line-style-dashed/);
    });
  });

  // ==========================================
  // POLYMORPHIC RENDERING
  // ==========================================

  test.describe('Polymorphic Rendering', () => {
    test('renders as hr by default for horizontal', async ({ mount, page }) => {
      await mount(<Divider orientation="horizontal" data-testid="divider" />);
      const element = page.getByTestId('divider');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('hr');
    });

    test('renders as div by default for vertical', async ({ mount, page }) => {
      await mount(<Divider orientation="vertical" data-testid="divider" />);
      const element = page.getByTestId('divider');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('renders as div when explicitly set', async ({ mount, page }) => {
      await mount(<Divider as="div" data-testid="divider" />);
      const element = page.getByTestId('divider');
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('div');
    });

    test('div divider has separator role', async ({ mount }) => {
      const component = await mount(<Divider as="div" />);
      await expect(component).toHaveAttribute('role', 'separator');
    });

    test('hr divider does not have redundant role', async ({ mount }) => {
      const component = await mount(<Divider as="hr" />);
      const role = await component.getAttribute('role');
      expect(role).toBeNull();
    });
  });

  // ==========================================
  // ACCESSIBILITY
  // ==========================================

  test.describe('Accessibility', () => {
    test('horizontal divider has correct aria-orientation', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" />);
      await expect(component).toHaveAttribute('aria-orientation', 'horizontal');
    });

    test('vertical divider has correct aria-orientation', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" />);
      await expect(component).toHaveAttribute('aria-orientation', 'vertical');
    });

    test('div element has separator role', async ({ mount }) => {
      const component = await mount(<Divider as="div" />);
      await expect(component).toHaveAttribute('role', 'separator');
    });

    test('supports custom aria attributes', async ({ mount }) => {
      const component = await mount(<Divider aria-label="Section separator" />);
      await expect(component).toHaveAttribute('aria-label', 'Section separator');
    });

    test('supports custom id attribute', async ({ mount }) => {
      const component = await mount(<Divider id="custom-divider" />);
      await expect(component).toHaveAttribute('id', 'custom-divider');
    });
  });

  // ==========================================
  // CUSTOM CLASS NAMES
  // ==========================================

  test.describe('Custom Classes', () => {
    test('accepts custom className', async ({ mount }) => {
      const component = await mount(<Divider className="custom-divider" />);
      await expect(component).toHaveClass(/custom-divider/);
    });

    test('merges custom className with component classes', async ({ mount }) => {
      const component = await mount(<Divider className="custom-divider" variant="strong" />);
      await expect(component).toHaveClass(/custom-divider/);
      await expect(component).toHaveClass(/divider/);
      await expect(component).toHaveClass(/variant-strong/);
    });
  });

  // ==========================================
  // COMBINATIONS
  // ==========================================

  test.describe('Prop Combinations', () => {
    test('horizontal + thick + strong', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" thickness="thick" variant="strong" />);
      await expect(component).toHaveClass(/orientation-horizontal/);
      await expect(component).toHaveClass(/thickness-thick/);
      await expect(component).toHaveClass(/variant-strong/);
    });

    test('vertical + dashed + subtle', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" lineStyle="dashed" variant="subtle" />);
      await expect(component).toHaveClass(/orientation-vertical/);
      await expect(component).toHaveClass(/line-style-dashed/);
      await expect(component).toHaveClass(/variant-subtle/);
    });

    test('horizontal + dashed + comfortable spacing', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" lineStyle="dashed" spacing="comfortable" />);
      await expect(component).toHaveClass(/orientation-horizontal/);
      await expect(component).toHaveClass(/line-style-dashed/);
      await expect(component).toHaveClass(/spacing-comfortable/);
    });
  });

  // ==========================================
  // VISUAL REGRESSION
  // ==========================================

  test.describe('Visual Regression', () => {
    test('all variants visual snapshot', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h3>Horizontal Dividers</h3>
            <Divider variant="subtle" />
            <p>Content</p>
            <Divider variant="default" />
            <p>Content</p>
            <Divider variant="strong" />
          </div>
          <div style={{ display: 'flex', gap: '32px', height: '200px' }}>
            <div>
              <h3>Vertical Dividers</h3>
            </div>
            <Divider orientation="vertical" variant="subtle" />
            <div>Content</div>
            <Divider orientation="vertical" variant="default" />
            <div>Content</div>
            <Divider orientation="vertical" variant="strong" />
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('divider-variants.png');
    });

    test('all thickness levels visual snapshot', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p>Thin (1px)</p>
            <Divider thickness="thin" variant="strong" />
          </div>
          <div>
            <p>Medium (2px)</p>
            <Divider thickness="medium" variant="strong" />
          </div>
          <div>
            <p>Thick (4px)</p>
            <Divider thickness="thick" variant="strong" />
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('divider-thickness.png');
    });

    test('line styles visual snapshot', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p>Solid</p>
            <Divider lineStyle="solid" variant="strong" thickness="medium" />
          </div>
          <div>
            <p>Dashed</p>
            <Divider lineStyle="dashed" variant="strong" thickness="medium" />
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('divider-line-styles.png');
    });

    test('spacing variants visual snapshot', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Compact Spacing</div>
          <Divider spacing="compact" variant="strong" />
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Content</div>

          <div style={{ backgroundColor: '#fff', padding: '8px', marginTop: '24px' }}>Default Spacing</div>
          <Divider spacing="default" variant="strong" />
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Content</div>

          <div style={{ backgroundColor: '#fff', padding: '8px', marginTop: '24px' }}>Comfortable Spacing</div>
          <Divider spacing="comfortable" variant="strong" />
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Content</div>
        </div>
      );
      await expect(component).toHaveScreenshot('divider-spacing.png');
    });
  });
});
