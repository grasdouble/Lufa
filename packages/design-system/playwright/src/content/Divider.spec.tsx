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

import AxeBuilder from '@axe-core/playwright';
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
    test('should match snapshot for all variants', async ({ mount }) => {
      const emphasisLevels = ['subtle', 'default', 'moderate', 'strong', 'bold'] as const;
      const spacingValues = ['compact', 'default', 'comfortable'] as const;
      const lineStyles = ['solid', 'dashed'] as const;

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
            Divider Component - All Variants
          </h1>

          {/* Section 1: Horizontal Emphasis Levels */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Horizontal Dividers - Emphasis Levels
            </h2>
            {emphasisLevels.map((emphasis) => (
              <div key={emphasis} style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)', marginBottom: '8px' }}>
                  emphasis=&quot;{emphasis}&quot;
                </p>
                <Divider emphasis={emphasis} />
              </div>
            ))}
          </section>

          {/* Section 2: Vertical Dividers */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Vertical Dividers - Emphasis Levels
            </h2>
            <div style={{ display: 'flex', gap: '24px', height: '120px', alignItems: 'center' }}>
              {emphasisLevels.map((emphasis) => (
                <div key={emphasis} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Divider orientation="vertical" emphasis={emphasis} />
                  <div style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>{emphasis}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Line Styles */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Line Styles
            </h2>
            {lineStyles.map((lineStyle) => (
              <div key={lineStyle} style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)', marginBottom: '8px' }}>
                  lineStyle=&quot;{lineStyle}&quot;
                </p>
                <Divider lineStyle={lineStyle} emphasis="strong" />
              </div>
            ))}
          </section>

          {/* Section 4: Spacing Variants */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Spacing Variants
            </h2>
            {spacingValues.map((spacing) => (
              <div key={spacing} style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                    padding: '8px',
                    color: 'var(--lufa-semantic-ui-text-primary)',
                  }}
                >
                  spacing=&quot;{spacing}&quot; (above)
                </div>
                <Divider spacing={spacing} emphasis="strong" />
                <div
                  style={{
                    backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                    padding: '8px',
                    color: 'var(--lufa-semantic-ui-text-primary)',
                  }}
                >
                  spacing=&quot;{spacing}&quot; (below)
                </div>
              </div>
            ))}
          </section>
        </div>
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('divider-all-variants.png');
    });
  });
});
