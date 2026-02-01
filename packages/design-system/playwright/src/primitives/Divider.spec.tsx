/**
 * Divider Component - Playwright Component Tests
 *
 * Tests cover:
 * - Basic rendering
 * - Orientation (horizontal, vertical)
 * - Emphasis levels (subtle, default, moderate, strong, bold)
 * - Spacing variants (compact, default, comfortable)
 * - Line styles (solid, dashed)
 * - Polymorphic rendering
 * - Accessibility (ARIA attributes)
 * - Visual regression
 */

import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

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

    test('renders with default emphasis', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveClass(/emphasis-default/);
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
  // EMPHASIS LEVELS
  // ==========================================

  test.describe('Emphasis Levels', () => {
    test('renders all emphasis levels', async ({ mount }) => {
      const component = await mount(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Divider emphasis="subtle" data-testid="subtle" />
          <Divider emphasis="default" data-testid="default" />
          <Divider emphasis="moderate" data-testid="moderate" />
          <Divider emphasis="strong" data-testid="strong" />
          <Divider emphasis="bold" data-testid="bold" />
        </div>
      );

      await expect(component.getByTestId('subtle')).toHaveClass(/emphasis-subtle/);
      await expect(component.getByTestId('default')).toHaveClass(/emphasis-default/);
      await expect(component.getByTestId('moderate')).toHaveClass(/emphasis-moderate/);
      await expect(component.getByTestId('strong')).toHaveClass(/emphasis-strong/);
      await expect(component.getByTestId('bold')).toHaveClass(/emphasis-bold/);
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
    test('should pass a11y checks', async ({ mount, page }) => {
      await mount(<Divider />);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

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
      const component = await mount(<Divider className="custom-divider" emphasis="strong" />);
      await expect(component).toHaveClass(/custom-divider/);
      await expect(component).toHaveClass(/divider/);
      await expect(component).toHaveClass(/emphasis-strong/);
    });
  });

  // ==========================================
  // COMBINATIONS
  // ==========================================

  test.describe('Prop Combinations', () => {
    test('horizontal + bold emphasis + comfortable spacing', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" emphasis="bold" spacing="comfortable" />);
      await expect(component).toHaveClass(/orientation-horizontal/);
      await expect(component).toHaveClass(/emphasis-bold/);
      await expect(component).toHaveClass(/spacing-comfortable/);
    });

    test('vertical + dashed + subtle emphasis', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" lineStyle="dashed" emphasis="subtle" />);
      await expect(component).toHaveClass(/orientation-vertical/);
      await expect(component).toHaveClass(/line-style-dashed/);
      await expect(component).toHaveClass(/emphasis-subtle/);
    });

    test('horizontal + dashed + compact spacing', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" lineStyle="dashed" spacing="compact" />);
      await expect(component).toHaveClass(/orientation-horizontal/);
      await expect(component).toHaveClass(/line-style-dashed/);
      await expect(component).toHaveClass(/spacing-compact/);
    });
  });

  // ==========================================
  // VISUAL REGRESSION
  // ==========================================

  test.describe('Visual Regression', () => {
    test('all emphasis levels visual snapshot', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h3>Horizontal Dividers - Emphasis Levels</h3>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Subtle (gray.300, 1px)</p>
            <Divider emphasis="subtle" />
            <p style={{ fontSize: '12px', color: '#666', margin: '16px 0 8px' }}>Default (gray.300, 1px)</p>
            <Divider emphasis="default" />
            <p style={{ fontSize: '12px', color: '#666', margin: '16px 0 8px' }}>Moderate (gray.300, 2px)</p>
            <Divider emphasis="moderate" />
            <p style={{ fontSize: '12px', color: '#666', margin: '16px 0 8px' }}>Strong (gray.400, 2px)</p>
            <Divider emphasis="strong" />
            <p style={{ fontSize: '12px', color: '#666', margin: '16px 0 8px' }}>Bold (gray.400, 4px)</p>
            <Divider emphasis="bold" />
          </div>
          <div style={{ display: 'flex', gap: '32px', height: '200px' }}>
            <div>
              <h3>Vertical Dividers</h3>
            </div>
            <Divider orientation="vertical" emphasis="subtle" />
            <div>Subtle</div>
            <Divider orientation="vertical" emphasis="default" />
            <div>Default</div>
            <Divider orientation="vertical" emphasis="moderate" />
            <div>Moderate</div>
            <Divider orientation="vertical" emphasis="strong" />
            <div>Strong</div>
            <Divider orientation="vertical" emphasis="bold" />
            <div>Bold</div>
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('divider-emphasis-levels.png');
    });

    test('line styles visual snapshot', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p>Solid - Strong Emphasis</p>
            <Divider lineStyle="solid" emphasis="strong" />
          </div>
          <div>
            <p>Dashed - Strong Emphasis</p>
            <Divider lineStyle="dashed" emphasis="strong" />
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('divider-line-styles.png');
    });

    test('spacing variants visual snapshot', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Compact Spacing (8px)</div>
          <Divider spacing="compact" emphasis="strong" />
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Content</div>

          <div style={{ backgroundColor: '#fff', padding: '8px', marginTop: '24px' }}>Default Spacing (16px)</div>
          <Divider spacing="default" emphasis="strong" />
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Content</div>

          <div style={{ backgroundColor: '#fff', padding: '8px', marginTop: '24px' }}>Comfortable Spacing (24px)</div>
          <Divider spacing="comfortable" emphasis="strong" />
          <div style={{ backgroundColor: '#fff', padding: '8px' }}>Content</div>
        </div>
      );
      await expect(component).toHaveScreenshot('divider-spacing.png');
    });
  });
});
