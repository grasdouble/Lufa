import React from 'react';
import { expect, test } from '@playwright/experimental-ct-react';

import { Link } from '@grasdouble/lufa_design-system';

import { ArrowIcon, HomeIcon, LinkWithClickHandler, LinkWithHoverHandler, LinkWithRef } from './Link.fixtures';

test.describe('Link Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with children', async ({ mount }) => {
      const component = await mount(<Link href="/test">Click me</Link>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Click me');
    });

    test('should render with href attribute', async ({ mount }) => {
      const component = await mount(<Link href="/about">About</Link>);
      await expect(component).toHaveAttribute('href', '/about');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" className="custom-link">
          Custom
        </Link>
      );
      await expect(component).toHaveClass(/custom-link/);
    });
  });

  test.describe('Variant Prop', () => {
    const variants = ['default', 'underline', 'button'] as const;

    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(
          <Link href="/test" variant={variant}>
            {variant}
          </Link>
        );
        await expect(component).toBeVisible();
        await expect(component).toContainText(variant);
      });
    }

    test('should apply underline variant class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" variant="underline">
          Underline
        </Link>
      );
      await expect(component).toHaveClass(/variantUnderline/);
    });

    test('should apply button variant class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" variant="button">
          Button
        </Link>
      );
      await expect(component).toHaveClass(/variantButton/);
    });
  });

  test.describe('Color Prop', () => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'inherit'] as const;

    for (const color of colors) {
      test(`should render ${color} color`, async ({ mount }) => {
        const component = await mount(
          <Link href="/test" color={color}>
            {color}
          </Link>
        );
        await expect(component).toBeVisible();
        await expect(component).toContainText(color);
      });
    }

    test('should apply primary color class by default', async ({ mount }) => {
      const component = await mount(<Link href="/test">Primary</Link>);
      await expect(component).toHaveClass(/colorPrimary/);
    });

    test('should apply secondary color class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" color="secondary">
          Secondary
        </Link>
      );
      await expect(component).toHaveClass(/colorSecondary/);
    });

    test('should apply success color class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" color="success">
          Success
        </Link>
      );
      await expect(component).toHaveClass(/colorSuccess/);
    });

    test('should apply warning color class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" color="warning">
          Warning
        </Link>
      );
      await expect(component).toHaveClass(/colorWarning/);
    });

    test('should apply danger color class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" color="danger">
          Danger
        </Link>
      );
      await expect(component).toHaveClass(/colorDanger/);
    });

    test('should apply inherit color class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" color="inherit">
          Inherit
        </Link>
      );
      await expect(component).toHaveClass(/colorInherit/);
    });
  });

  test.describe('Size Prop', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    for (const size of sizes) {
      test(`should render ${size} size`, async ({ mount }) => {
        const component = await mount(
          <Link href="/test" size={size}>
            {size}
          </Link>
        );
        await expect(component).toBeVisible();
        await expect(component).toContainText(size);
      });
    }

    test('should apply small size class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" size="small">
          Small
        </Link>
      );
      await expect(component).toHaveClass(/sizeSmall/);
    });

    test('should apply medium size class by default', async ({ mount }) => {
      const component = await mount(<Link href="/test">Medium</Link>);
      await expect(component).toHaveClass(/sizeMedium/);
    });

    test('should apply large size class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" size="large">
          Large
        </Link>
      );
      await expect(component).toHaveClass(/sizeLarge/);
    });
  });

  test.describe('Icons', () => {
    test('should render with startIcon', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" startIcon={<HomeIcon />}>
          Home
        </Link>
      );
      await expect(component).toContainText('🏠');
      await expect(component).toContainText('Home');
    });

    test('should render with endIcon', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" endIcon={<ArrowIcon />}>
          Next
        </Link>
      );
      await expect(component).toContainText('→');
      await expect(component).toContainText('Next');
    });

    test('should render with both startIcon and endIcon', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
          Navigate
        </Link>
      );
      await expect(component).toContainText('🏠');
      await expect(component).toContainText('→');
      await expect(component).toContainText('Navigate');
    });

    test('should apply startIcon class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" startIcon={<HomeIcon />}>
          Home
        </Link>
      );
      const iconSpan = component.locator('[class*="startIcon"]');
      await expect(iconSpan).toBeVisible();
    });

    test('should apply endIcon class', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" endIcon={<ArrowIcon />}>
          Next
        </Link>
      );
      const iconSpan = component.locator('[class*="endIcon"]');
      await expect(iconSpan).toBeVisible();
    });
  });

  test.describe('External Link Behavior', () => {
    test('should set target="_blank" for external links', async ({ mount }) => {
      const component = await mount(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      await expect(component).toHaveAttribute('target', '_blank');
    });

    test('should set rel="noopener noreferrer" for external links', async ({ mount }) => {
      const component = await mount(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      const rel = await component.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });

    test('should merge existing rel attribute with security attributes', async ({ mount }) => {
      const component = await mount(
        <Link href="https://example.com" external rel="custom">
          External
        </Link>
      );
      const rel = await component.getAttribute('rel');
      expect(rel).toContain('custom');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });

    test('should show external icon indicator', async ({ mount }) => {
      const component = await mount(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      await expect(component).toContainText('↗');
      const externalIcon = component.locator('[class*="externalIcon"]');
      await expect(externalIcon).toBeVisible();
    });

    test('should have aria-label for external icon', async ({ mount }) => {
      const component = await mount(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      const externalIcon = component.locator('[aria-label="(opens in new tab)"]');
      await expect(externalIcon).toBeVisible();
    });

    test('should not show external icon when endIcon is provided', async ({ mount }) => {
      const component = await mount(
        <Link href="https://example.com" external endIcon={<ArrowIcon />}>
          External
        </Link>
      );
      // Should have endIcon but not external icon
      await expect(component).toContainText('→');
      const externalIcon = component.locator('[class*="externalIcon"]');
      await expect(externalIcon).not.toBeVisible();
    });

    test('should not modify target for non-external links', async ({ mount }) => {
      const component = await mount(<Link href="/internal">Internal</Link>);
      await expect(component).not.toHaveAttribute('target', '_blank');
    });

    test('should respect custom target when not external', async ({ mount }) => {
      const component = await mount(
        <Link href="/page" target="_self">
          Self
        </Link>
      );
      await expect(component).toHaveAttribute('target', '_self');
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible anchor structure', async ({ mount }) => {
      const component = await mount(<Link href="/test">Accessible Link</Link>);
      await expect(component).toMatchAriaSnapshot(`
				- link "Accessible Link"
			`);
    });

    test('should have proper role as link', async ({ mount }) => {
      const component = await mount(<Link href="/test">Link</Link>);
      await expect(component).toHaveRole('link');
    });

    test('should support aria-label', async ({ mount }) => {
      const component = await mount(
        <Link href="/test" aria-label="Go to test page">
          Test
        </Link>
      );
      await expect(component).toHaveAttribute('aria-label', 'Go to test page');
    });

    test('should be keyboard accessible', async ({ mount }) => {
      const component = await mount(<Link href="/test">Tab me</Link>);
      await component.focus();
      await expect(component).toBeFocused();
    });

    test('should be accessible with external link', async ({ mount }) => {
      const component = await mount(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      await expect(component).toMatchAriaSnapshot(`
				- link "External (opens in new tab)":
				  - /url: https://example.com
			`);
    });
  });

  test.describe('Event Handlers', () => {
    test('should call onClick when clicked', async ({ mount }) => {
      const component = await mount(<LinkWithClickHandler />);
      await expect(component.getByTestId('status')).toHaveText('not-clicked');
      await component.getByRole('link', { name: 'Click' }).click();
      await expect(component.getByTestId('status')).toHaveText('clicked');
    });

    test('should support onMouseEnter', async ({ mount }) => {
      const component = await mount(<LinkWithHoverHandler />);
      await expect(component.getByTestId('hover-status')).toHaveText('not-hovered');
      await component.getByRole('link', { name: 'Hover' }).hover();
      await expect(component.getByTestId('hover-status')).toHaveText('hovered');
    });
  });

  test.describe('Forward Ref', () => {
    test('should forward ref to anchor element', async ({ mount }) => {
      const component = await mount(<LinkWithRef />);
      await component.getByTestId('check-ref').click();
      await expect(component.getByTestId('tag-name')).toHaveText('A');
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants, colors, and features', async ({ mount }) => {
      const variants = ['default', 'underline', 'button'] as const;
      const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'inherit'] as const;
      const sizes = ['small', 'medium', 'large'] as const;

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
        <div style={{ padding: 24, background: '#ffffff', width: '900px' }}>
          {/* Variants × Colors Grid */}
          <div style={sectionTitleStyle}>Variants × Colors</div>
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
                        <Link href="/test" variant={variant} color={color}>
                          {variant} link
                        </Link>
                      </td>
                      <td style={cellStyle}>
                        <Link href="/test" variant={variant} color={color} data-test-state="hover">
                          {variant} link
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Sizes */}
          <div style={sectionTitleStyle}>Sizes</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Size</th>
                <th style={headerStyle}>Default Variant</th>
                <th style={headerStyle}>Underline Variant</th>
                <th style={headerStyle}>Button Variant</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size}>
                  <td style={cellStyle}>{size}</td>
                  <td style={cellStyle}>
                    <Link href="/test" size={size}>
                      {size} link
                    </Link>
                  </td>
                  <td style={cellStyle}>
                    <Link href="/test" variant="underline" size={size}>
                      {size} link
                    </Link>
                  </td>
                  <td style={cellStyle}>
                    <Link href="/test" variant="button" size={size}>
                      {size} link
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Icons */}
          <div style={sectionTitleStyle}>With Icons</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Icon Position</th>
                <th style={headerStyle}>Default</th>
                <th style={headerStyle}>Underline</th>
                <th style={headerStyle}>Button</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>Start Icon</td>
                <td style={cellStyle}>
                  <Link href="/test" startIcon={<HomeIcon />}>
                    Home
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="underline" startIcon={<HomeIcon />}>
                    Home
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="button" startIcon={<HomeIcon />}>
                    Home
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={cellStyle}>End Icon</td>
                <td style={cellStyle}>
                  <Link href="/test" endIcon={<ArrowIcon />}>
                    Next
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="underline" endIcon={<ArrowIcon />}>
                    Next
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="button" endIcon={<ArrowIcon />}>
                    Next
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={cellStyle}>Both Icons</td>
                <td style={cellStyle}>
                  <Link href="/test" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="underline" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="button" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          {/* External Links */}
          <div style={sectionTitleStyle}>External Links</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Type</th>
                <th style={headerStyle}>Default</th>
                <th style={headerStyle}>Underline</th>
                <th style={headerStyle}>Button</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>External (auto icon)</td>
                <td style={cellStyle}>
                  <Link href="https://example.com" external>
                    External Link
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="underline" external>
                    External Link
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="button" external>
                    External Link
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={cellStyle}>External (custom icon)</td>
                <td style={cellStyle}>
                  <Link href="https://example.com" external endIcon={<ArrowIcon />}>
                    Custom Icon
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="underline" external endIcon={<ArrowIcon />}>
                    Custom Icon
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="button" external endIcon={<ArrowIcon />}>
                    Custom Icon
                  </Link>
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
                <Link href="/test" color={color} startIcon={<HomeIcon />}>
                  Link
                </Link>
              </div>
            ))}
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for stability
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('link-all-variants.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all variants, colors, and features in dark mode', async ({ mount, page }) => {
      // Set dark mode before mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const variants = ['default', 'underline', 'button'] as const;
      const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'inherit'] as const;
      const sizes = ['small', 'medium', 'large'] as const;

      const cellStyle: React.CSSProperties = {
        padding: '12px',
        textAlign: 'center',
        backgroundColor: 'var(--lufa-token-color-background-primary)',
        border: '1px solid #444',
      };
      const headerStyle: React.CSSProperties = {
        fontWeight: 600,
        padding: '12px',
        backgroundColor: 'var(--lufa-token-color-background-secondary)',
        color: 'var(--lufa-token-color-text-primary)',
        textAlign: 'center',
        border: '1px solid #444',
      };
      const tableStyle: React.CSSProperties = {
        borderCollapse: 'collapse',
        width: '100%',
        backgroundColor: 'var(--lufa-token-color-background-primary)',
        marginBottom: 32,
        border: '1px solid #444',
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
        <div style={{ padding: 24, backgroundColor: 'var(--lufa-token-color-background-primary)', width: '900px' }}>
          {/* Variants × Colors Grid */}
          <div style={sectionTitleStyle}>Variants × Colors</div>
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
                      <td style={{ ...cellStyle, color: 'var(--lufa-token-color-text-primary)' }}>{variant}</td>
                      <td style={cellStyle}>
                        <Link href="/test" variant={variant} color={color}>
                          {variant} link
                        </Link>
                      </td>
                      <td style={cellStyle}>
                        <Link href="/test" variant={variant} color={color} data-test-state="hover">
                          {variant} link
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Sizes */}
          <div style={sectionTitleStyle}>Sizes</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Size</th>
                <th style={headerStyle}>Default Variant</th>
                <th style={headerStyle}>Underline Variant</th>
                <th style={headerStyle}>Button Variant</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size}>
                  <td style={{ ...cellStyle, color: 'var(--lufa-token-color-text-primary)' }}>{size}</td>
                  <td style={cellStyle}>
                    <Link href="/test" size={size}>
                      {size} link
                    </Link>
                  </td>
                  <td style={cellStyle}>
                    <Link href="/test" variant="underline" size={size}>
                      {size} link
                    </Link>
                  </td>
                  <td style={cellStyle}>
                    <Link href="/test" variant="button" size={size}>
                      {size} link
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Icons */}
          <div style={sectionTitleStyle}>With Icons</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Icon Position</th>
                <th style={headerStyle}>Default</th>
                <th style={headerStyle}>Underline</th>
                <th style={headerStyle}>Button</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...cellStyle, color: 'var(--lufa-token-color-text-primary)' }}>Start Icon</td>
                <td style={cellStyle}>
                  <Link href="/test" startIcon={<HomeIcon />}>
                    Home
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="underline" startIcon={<HomeIcon />}>
                    Home
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="button" startIcon={<HomeIcon />}>
                    Home
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...cellStyle, color: 'var(--lufa-token-color-text-primary)' }}>End Icon</td>
                <td style={cellStyle}>
                  <Link href="/test" endIcon={<ArrowIcon />}>
                    Next
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="underline" endIcon={<ArrowIcon />}>
                    Next
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="button" endIcon={<ArrowIcon />}>
                    Next
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...cellStyle, color: 'var(--lufa-token-color-text-primary)' }}>Both Icons</td>
                <td style={cellStyle}>
                  <Link href="/test" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="underline" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="/test" variant="button" startIcon={<HomeIcon />} endIcon={<ArrowIcon />}>
                    Navigate
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          {/* External Links */}
          <div style={sectionTitleStyle}>External Links</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Type</th>
                <th style={headerStyle}>Default</th>
                <th style={headerStyle}>Underline</th>
                <th style={headerStyle}>Button</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...cellStyle, color: 'var(--lufa-token-color-text-primary)' }}>External (auto icon)</td>
                <td style={cellStyle}>
                  <Link href="https://example.com" external>
                    External Link
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="underline" external>
                    External Link
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="button" external>
                    External Link
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...cellStyle, color: 'var(--lufa-token-color-text-primary)' }}>External (custom icon)</td>
                <td style={cellStyle}>
                  <Link href="https://example.com" external endIcon={<ArrowIcon />}>
                    Custom Icon
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="underline" external endIcon={<ArrowIcon />}>
                    Custom Icon
                  </Link>
                </td>
                <td style={cellStyle}>
                  <Link href="https://example.com" variant="button" external endIcon={<ArrowIcon />}>
                    Custom Icon
                  </Link>
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
                  backgroundColor: 'var(--lufa-token-color-background-primary)',
                  border: '1px solid #444',
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
                <Link href="/test" color={color} startIcon={<HomeIcon />}>
                  Link
                </Link>
              </div>
            ))}
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for stability
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('link-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
