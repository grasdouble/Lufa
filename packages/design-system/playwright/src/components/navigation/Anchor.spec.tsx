import React from 'react';
import { expect, test } from '@playwright/experimental-ct-react';

import { Anchor } from '@grasdouble/lufa_design-system';

import { ArrowIcon, HomeIcon, LinkIcon } from './Anchor.fixtures';

test.describe('Anchor Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with children', async ({ mount }) => {
      const component = await mount(<Anchor href="#section">Jump to section</Anchor>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Jump to section');
    });

    test('should render with href attribute', async ({ mount }) => {
      const component = await mount(<Anchor href="#top">Go to top</Anchor>);
      await expect(component).toHaveAttribute('href', '#top');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" className="custom-anchor">
          Custom
        </Anchor>
      );
      await expect(component).toHaveClass(/custom-anchor/);
    });
  });

  test.describe('Variant Prop', () => {
    const variants = ['default', 'underline', 'subtle'] as const;

    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(
          <Anchor href="#test" variant={variant}>
            {variant}
          </Anchor>
        );
        await expect(component).toBeVisible();
        await expect(component).toContainText(variant);
      });
    }

    test('should apply underline variant class', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" variant="underline">
          Underline
        </Anchor>
      );
      await expect(component).toHaveClass(/variantUnderline/);
    });

    test('should apply subtle variant class', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" variant="subtle">
          Subtle
        </Anchor>
      );
      await expect(component).toHaveClass(/variantSubtle/);
    });
  });

  test.describe('Color Prop', () => {
    const colors = ['primary', 'secondary', 'inherit'] as const;

    for (const color of colors) {
      test(`should render ${color} color`, async ({ mount }) => {
        const component = await mount(
          <Anchor href="#test" color={color}>
            {color}
          </Anchor>
        );
        await expect(component).toBeVisible();
        await expect(component).toContainText(color);
      });
    }

    test('should apply primary color class by default', async ({ mount }) => {
      const component = await mount(<Anchor href="#test">Primary</Anchor>);
      await expect(component).toHaveClass(/colorPrimary/);
    });

    test('should apply secondary color class', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" color="secondary">
          Secondary
        </Anchor>
      );
      await expect(component).toHaveClass(/colorSecondary/);
    });

    test('should apply inherit color class', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" color="inherit">
          Inherit
        </Anchor>
      );
      await expect(component).toHaveClass(/colorInherit/);
    });
  });

  test.describe('Icons', () => {
    test('should render with startIcon', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" startIcon={<HomeIcon />}>
          Home
        </Anchor>
      );
      await expect(component).toContainText('🏠');
      await expect(component).toContainText('Home');
    });

    test('should render with endIcon', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" endIcon={<ArrowIcon />}>
          Next
        </Anchor>
      );
      await expect(component).toContainText('→');
      await expect(component).toContainText('Next');
    });

    test('should render with both startIcon and endIcon', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
          Navigate
        </Anchor>
      );
      await expect(component).toContainText('🏠');
      await expect(component).toContainText('→');
      await expect(component).toContainText('Navigate');
    });

    test('should apply startIcon class', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" startIcon={<HomeIcon />}>
          Home
        </Anchor>
      );
      const iconSpan = component.locator('[class*="startIcon"]');
      await expect(iconSpan).toBeVisible();
    });

    test('should apply endIcon class', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" endIcon={<ArrowIcon />}>
          Next
        </Anchor>
      );
      const iconSpan = component.locator('[class*="endIcon"]');
      await expect(iconSpan).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible anchor structure', async ({ mount }) => {
      const component = await mount(<Anchor href="#test">Accessible Anchor</Anchor>);
      await expect(component).toMatchAriaSnapshot(`
				- link "Accessible Anchor"
			`);
    });

    test('should have proper role as link', async ({ mount }) => {
      const component = await mount(<Anchor href="#test">Anchor</Anchor>);
      await expect(component).toHaveRole('link');
    });

    test('should support aria-label', async ({ mount }) => {
      const component = await mount(
        <Anchor href="#test" aria-label="Jump to test section">
          Test
        </Anchor>
      );
      await expect(component).toHaveAttribute('aria-label', 'Jump to test section');
    });

    test('should be keyboard accessible', async ({ mount }) => {
      const component = await mount(<Anchor href="#test">Tab me</Anchor>);
      await component.focus();
      await expect(component).toBeFocused();
    });
  });

  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options in light mode', async ({ mount }) => {
      const variants = ['default', 'underline', 'subtle'] as const;
      const colors = ['primary', 'secondary', 'inherit'] as const;

      const cellStyle: React.CSSProperties = {
        padding: '12px',
        textAlign: 'center',
        background: '#fff',
        border: '1px solid #e0e0e0',
      };
      const headerStyle: React.CSSProperties = {
        fontWeight: 600,
        padding: '12px',
        background: '#f0f0f0',
        textAlign: 'center',
        border: '1px solid #e0e0e0',
      };
      const tableStyle: React.CSSProperties = {
        borderCollapse: 'collapse',
        width: '100%',
        background: '#fff',
        marginBottom: 32,
        border: '1px solid #e0e0e0',
      };
      const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: 20,
        margin: '32px 0 16px 0',
        color: '#333',
        borderBottom: '2px solid #333',
        paddingBottom: 8,
      };
      const colorTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: 16,
        margin: '24px 0 12px 0',
        color: '#555',
      };

      const component = await mount(
        <div style={{ padding: 24, background: '#f9f9f9' }}>
          {/* Variants × Colors Grid */}
          <div style={sectionTitleStyle}>Anchor - All Variants × Colors</div>
          {colors.map((color) => (
            <div key={color}>
              <div style={colorTitleStyle}>{color.charAt(0).toUpperCase() + color.slice(1)}</div>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={headerStyle}>Variant</th>
                    <th style={headerStyle}>Default</th>
                    <th style={headerStyle}>With Hover</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant}>
                      <td style={cellStyle}>{variant}</td>
                      <td style={cellStyle}>
                        <Anchor href="#test" variant={variant} color={color}>
                          {variant} anchor
                        </Anchor>
                      </td>
                      <td style={cellStyle}>
                        <Anchor href="#test" variant={variant} color={color} data-test-state="hover">
                          {variant} anchor
                        </Anchor>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Icons */}
          <div style={sectionTitleStyle}>With Icons</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Icon Position</th>
                <th style={headerStyle}>Default</th>
                <th style={headerStyle}>Underline</th>
                <th style={headerStyle}>Subtle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>Start Icon</td>
                <td style={cellStyle}>
                  <Anchor href="#section" startIcon={<HomeIcon />}>
                    Home
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="underline" startIcon={<HomeIcon />}>
                    Home
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="subtle" startIcon={<HomeIcon />}>
                    Home
                  </Anchor>
                </td>
              </tr>
              <tr>
                <td style={cellStyle}>End Icon</td>
                <td style={cellStyle}>
                  <Anchor href="#section" endIcon={<ArrowIcon />}>
                    Next
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="underline" endIcon={<ArrowIcon />}>
                    Next
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="subtle" endIcon={<ArrowIcon />}>
                    Next
                  </Anchor>
                </td>
              </tr>
              <tr>
                <td style={cellStyle}>Both Icons</td>
                <td style={cellStyle}>
                  <Anchor href="#section" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="underline" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="subtle" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Anchor>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Color Combinations with Icons */}
          <div style={sectionTitleStyle}>Colors with Icons</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <div key={color} style={{ padding: 12, background: '#fff', border: '1px solid #e0e0e0' }}>
                <div style={{ marginBottom: 8, fontSize: 12, color: '#666', fontWeight: 600 }}>{color}</div>
                <Anchor href="#section" color={color} startIcon={<LinkIcon />}>
                  Anchor
                </Anchor>
              </div>
            ))}
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('anchor-all-variants-light.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('visual regression: all variants and options in dark mode', async ({ mount, page }) => {
      // Set dark mode before mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const variants = ['default', 'underline', 'subtle'] as const;
      const colors = ['primary', 'secondary', 'inherit'] as const;

      const cellStyle: React.CSSProperties = {
        padding: '12px',
        textAlign: 'center',
        background: 'var(--lufa-token-color-background-primary)',
        border: '1px solid var(--lufa-token-color-text-secondary)',
      };
      const headerStyle: React.CSSProperties = {
        fontWeight: 600,
        padding: '12px',
        background: 'var(--lufa-token-color-background-primary)',
        textAlign: 'center',
        border: '1px solid var(--lufa-token-color-text-secondary)',
        color: 'var(--lufa-token-color-text-primary)',
      };
      const tableStyle: React.CSSProperties = {
        borderCollapse: 'collapse',
        width: '100%',
        background: 'var(--lufa-token-color-background-primary)',
        marginBottom: 32,
        border: '1px solid var(--lufa-token-color-text-secondary)',
      };
      const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: 20,
        margin: '32px 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
        borderBottom: '2px solid var(--lufa-token-color-text-primary)',
        paddingBottom: 8,
      };
      const colorTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: 16,
        margin: '24px 0 12px 0',
        color: 'var(--lufa-token-color-text-secondary)',
      };

      const component = await mount(
        <div style={{ padding: 24, background: 'var(--lufa-token-color-background-primary)' }}>
          {/* Variants × Colors Grid */}
          <div style={sectionTitleStyle}>Anchor - All Variants × Colors (Dark Mode)</div>
          {colors.map((color) => (
            <div key={color}>
              <div style={colorTitleStyle}>{color.charAt(0).toUpperCase() + color.slice(1)}</div>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={headerStyle}>Variant</th>
                    <th style={headerStyle}>Default</th>
                    <th style={headerStyle}>With Hover</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant}>
                      <td style={cellStyle}>
                        <span style={{ color: 'var(--lufa-token-color-text-primary)' }}>{variant}</span>
                      </td>
                      <td style={cellStyle}>
                        <Anchor href="#test" variant={variant} color={color}>
                          {variant} anchor
                        </Anchor>
                      </td>
                      <td style={cellStyle}>
                        <Anchor href="#test" variant={variant} color={color} data-test-state="hover">
                          {variant} anchor
                        </Anchor>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Icons */}
          <div style={sectionTitleStyle}>With Icons</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Icon Position</th>
                <th style={headerStyle}>Default</th>
                <th style={headerStyle}>Underline</th>
                <th style={headerStyle}>Subtle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>
                  <span style={{ color: 'var(--lufa-token-color-text-primary)' }}>Start Icon</span>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" startIcon={<HomeIcon />}>
                    Home
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="underline" startIcon={<HomeIcon />}>
                    Home
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="subtle" startIcon={<HomeIcon />}>
                    Home
                  </Anchor>
                </td>
              </tr>
              <tr>
                <td style={cellStyle}>
                  <span style={{ color: 'var(--lufa-token-color-text-primary)' }}>End Icon</span>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" endIcon={<ArrowIcon />}>
                    Next
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="underline" endIcon={<ArrowIcon />}>
                    Next
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="subtle" endIcon={<ArrowIcon />}>
                    Next
                  </Anchor>
                </td>
              </tr>
              <tr>
                <td style={cellStyle}>
                  <span style={{ color: 'var(--lufa-token-color-text-primary)' }}>Both Icons</span>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="underline" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Anchor>
                </td>
                <td style={cellStyle}>
                  <Anchor href="#section" variant="subtle" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Anchor>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Color Combinations with Icons */}
          <div style={sectionTitleStyle}>Colors with Icons</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  padding: 12,
                  background: 'var(--lufa-token-color-background-primary)',
                  border: '1px solid var(--lufa-token-color-text-secondary)',
                }}
              >
                <div
                  style={{
                    marginBottom: 8,
                    fontSize: 12,
                    color: 'var(--lufa-token-color-text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  {color}
                </div>
                <Anchor href="#section" color={color} startIcon={<LinkIcon />}>
                  Anchor
                </Anchor>
              </div>
            ))}
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('anchor-all-variants-dark.png', {
        fullPage: true,
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
