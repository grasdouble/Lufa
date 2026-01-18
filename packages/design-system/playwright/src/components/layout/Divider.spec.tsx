import { expect, test } from '@playwright/experimental-ct-react';

import { Divider } from '@grasdouble/lufa_design-system';

test.describe('Divider Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toBeVisible();
      await expect(component).toHaveAttribute('role', 'separator');
      await expect(component).toHaveAttribute('aria-orientation', 'horizontal');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Divider className="custom-divider" />);
      await expect(component).toHaveClass(/custom-divider/);
    });
  });

  test.describe('Orientation', () => {
    test('should render horizontal orientation by default', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveAttribute('aria-orientation', 'horizontal');
      await expect(component).toHaveClass(/horizontal/);
    });

    test('should render horizontal orientation explicitly', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" />);
      await expect(component).toHaveAttribute('aria-orientation', 'horizontal');
      await expect(component).toHaveClass(/horizontal/);
    });

    test('should render vertical orientation', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" />);
      await expect(component).toHaveAttribute('aria-orientation', 'vertical');
      await expect(component).toHaveClass(/vertical/);
    });
  });

  test.describe('Variants', () => {
    test('should render solid variant by default', async ({ mount }) => {
      const component = await mount(<Divider />);
      const line = component.locator('[aria-hidden]').first();
      await expect(line).toHaveClass(/variantSolid/);
    });

    test('should render solid variant explicitly', async ({ mount }) => {
      const component = await mount(<Divider variant="solid" />);
      const line = component.locator('[aria-hidden]').first();
      await expect(line).toHaveClass(/variantSolid/);
    });

    test('should render dashed variant', async ({ mount }) => {
      const component = await mount(<Divider variant="dashed" />);
      const line = component.locator('[aria-hidden]').first();
      await expect(line).toHaveClass(/variantDashed/);
    });
  });

  test.describe('Spacing', () => {
    test('should apply none spacing', async ({ mount }) => {
      const component = await mount(<Divider spacing="none" />);
      await expect(component).toHaveClass(/spacingNone/);
    });

    test('should apply sm spacing', async ({ mount }) => {
      const component = await mount(<Divider spacing="sm" />);
      await expect(component).toHaveClass(/spacingSm/);
    });

    test('should apply md spacing by default', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveClass(/spacingMd/);
    });

    test('should apply md spacing explicitly', async ({ mount }) => {
      const component = await mount(<Divider spacing="md" />);
      await expect(component).toHaveClass(/spacingMd/);
    });

    test('should apply lg spacing', async ({ mount }) => {
      const component = await mount(<Divider spacing="lg" />);
      await expect(component).toHaveClass(/spacingLg/);
    });
  });

  test.describe('Label', () => {
    test('should render without label by default', async ({ mount }) => {
      const component = await mount(<Divider />);
      // Check that no label text exists
      const text = await component.textContent();
      expect(text?.trim()).toBe('');
    });

    test('should render with text label', async ({ mount }) => {
      const component = await mount(<Divider label="Section Break" />);
      await expect(component.getByText('Section Break')).toBeVisible();
    });

    test('should render with ReactNode label', async ({ mount }) => {
      const component = await mount(
        <Divider label={<span style={{ fontWeight: 'bold', color: 'blue' }}>Custom Label</span>} />
      );
      await expect(component.getByText('Custom Label')).toBeVisible();
    });

    test('should not render label for vertical orientation', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" label="Should not appear" />);
      // Vertical dividers don't render labels
      await expect(component.getByText('Should not appear')).not.toBeVisible();
    });
  });

  test.describe('Alignment (Horizontal with Label)', () => {
    test('should center align label by default', async ({ mount }) => {
      const component = await mount(<Divider label="Centered" />);
      await expect(component).toHaveClass(/alignCenter/);
    });

    test('should center align label explicitly', async ({ mount }) => {
      const component = await mount(<Divider label="Centered" align="center" />);
      await expect(component).toHaveClass(/alignCenter/);
    });

    test('should start align label', async ({ mount }) => {
      const component = await mount(<Divider label="Start" align="start" />);
      await expect(component).toHaveClass(/alignStart/);
    });

    test('should end align label', async ({ mount }) => {
      const component = await mount(<Divider label="End" align="end" />);
      await expect(component).toHaveClass(/alignEnd/);
    });

    test('should not apply alignment class for vertical orientation', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" align="start" />);
      await expect(component).not.toHaveClass(/alignStart/);
      await expect(component).not.toHaveClass(/alignCenter/);
      await expect(component).not.toHaveClass(/alignEnd/);
    });
  });

  test.describe('Custom Length', () => {
    test('should render with default width for horizontal', async ({ mount }) => {
      const component = await mount(<Divider />);
      const style = await component.getAttribute('style');
      expect(style).toBeNull();
    });

    test('should apply custom width (number) for horizontal', async ({ mount }) => {
      const component = await mount(<Divider length={200} />);
      const style = await component.getAttribute('style');
      expect(style).toContain('width: 200px');
    });

    test('should apply custom width (string with unit) for horizontal', async ({ mount }) => {
      const component = await mount(<Divider length="50%" />);
      const style = await component.getAttribute('style');
      expect(style).toContain('width: 50%');
    });

    test('should apply custom height (number) for vertical', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" length={100} />);
      const style = await component.getAttribute('style');
      expect(style).toContain('height: 100px');
    });

    test('should apply custom height (string with unit) for vertical', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" length="10rem" />);
      const style = await component.getAttribute('style');
      expect(style).toContain('height: 10rem');
    });
  });

  test.describe('Accessibility', () => {
    test('should have role="separator"', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toHaveAttribute('role', 'separator');
    });

    test('should have aria-orientation for horizontal', async ({ mount }) => {
      const component = await mount(<Divider orientation="horizontal" />);
      await expect(component).toHaveAttribute('aria-orientation', 'horizontal');
    });

    test('should have aria-orientation for vertical', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" />);
      await expect(component).toHaveAttribute('aria-orientation', 'vertical');
    });

    test('should have aria-hidden on line elements', async ({ mount }) => {
      const component = await mount(<Divider />);
      const lines = component.locator('[aria-hidden]');
      await expect(lines.first()).toHaveAttribute('aria-hidden');
    });

    test('should have accessible structure for horizontal divider', async ({ mount }) => {
      const component = await mount(<Divider />);
      await expect(component).toMatchAriaSnapshot(`
        - separator
      `);
    });

    test('should have accessible structure for horizontal divider with label', async ({ mount }) => {
      const component = await mount(<Divider label="Section" />);
      await expect(component).toMatchAriaSnapshot(`
        - separator:
          - text: Section
      `);
    });

    test('should have accessible structure for vertical divider', async ({ mount }) => {
      const component = await mount(<Divider orientation="vertical" />);
      await expect(component).toMatchAriaSnapshot(`
        - separator
      `);
    });
  });

  test.describe('Combined Props', () => {
    test('should handle all horizontal props together', async ({ mount }) => {
      const component = await mount(
        <Divider
          orientation="horizontal"
          variant="dashed"
          spacing="lg"
          align="start"
          label="Combined Props"
          length={300}
          className="custom-class"
        />
      );

      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/horizontal/);
      await expect(component).toHaveClass(/spacingLg/);
      await expect(component).toHaveClass(/alignStart/);
      await expect(component).toHaveClass(/custom-class/);
      await expect(component).toHaveAttribute('aria-orientation', 'horizontal');

      const line = component.locator('[aria-hidden]').first();
      await expect(line).toHaveClass(/variantDashed/);

      await expect(component.getByText('Combined Props')).toBeVisible();

      const style = await component.getAttribute('style');
      expect(style).toContain('width: 300px');
    });

    test('should handle all vertical props together', async ({ mount }) => {
      const component = await mount(
        <Divider orientation="vertical" variant="dashed" spacing="sm" length="200px" className="vertical-custom" />
      );

      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/vertical/);
      await expect(component).toHaveClass(/spacingSm/);
      await expect(component).toHaveClass(/vertical-custom/);
      await expect(component).toHaveAttribute('aria-orientation', 'vertical');

      const line = component.locator('[aria-hidden]').first();
      await expect(line).toHaveClass(/variantDashed/);

      const style = await component.getAttribute('style');
      expect(style).toContain('height: 200px');
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle empty string label', async ({ mount }) => {
      const component = await mount(<Divider label="" orientation="horizontal" />);
      // Empty string is falsy, so label element should not be rendered
      const label = component.locator('span[class*="label"]');
      await expect(label).not.toBeAttached();
    });

    test('should handle numeric label', async ({ mount }) => {
      const component = await mount(<Divider label={0} orientation="horizontal" />);
      // 0 is falsy, so label element should not be rendered
      const label = component.locator('span[class*="label"]');
      await expect(label).not.toBeAttached();
    });

    test('should handle label with special characters', async ({ mount }) => {
      const component = await mount(<Divider label="• | • • •" orientation="horizontal" />);
      const label = component.locator('span[class*="label"]');
      await expect(label).toContainText('• | • • •');
    });

    test('should handle zero length', async ({ mount }) => {
      const component = await mount(<Divider length={0} />);
      const style = await component.getAttribute('style');
      expect(style).toContain('width: 0px');
    });

    test("should handle negative length (edge case, not ideal but shouldn't break)", async ({ mount }) => {
      const component = await mount(<Divider length={-100} />);
      // Component should still render without crashing even with negative value
      await expect(component).toBeVisible();
      await expect(component).toHaveAttribute('role', 'separator');
      // The browser/React may sanitize or ignore negative width values, but component doesn't crash
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const sectionStyle = { marginBottom: '32px' };
      const titleStyle = { fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#333' };
      const containerStyle = { width: '600px' };
      const verticalContainerStyle = { display: 'flex', gap: '24px', alignItems: 'flex-start', height: '200px' };
      const verticalLabelStyle = { fontSize: '14px', color: '#666', marginTop: '8px' };

      const component = await mount(
        <div style={{ padding: '32px', background: '#f9f9f9', fontFamily: 'sans-serif' }}>
          {/* Horizontal Dividers - Variants */}
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Horizontal Variants</h2>
            <div style={containerStyle}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Solid (default)</p>
                <Divider variant="solid" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Dashed</p>
                <Divider variant="dashed" />
              </div>
            </div>
          </div>

          {/* Horizontal Dividers - With Labels and Alignments */}
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Horizontal with Labels</h2>
            <div style={containerStyle}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Center (default)</p>
                <Divider label="Center Label" align="center" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Start</p>
                <Divider label="Start Label" align="start" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>End</p>
                <Divider label="End Label" align="end" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Dashed with Label</p>
                <Divider label="Dashed Label" variant="dashed" />
              </div>
            </div>
          </div>

          {/* Spacing Options */}
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Spacing Options</h2>
            <div style={containerStyle}>
              <div style={{ border: '1px dashed #ddd', padding: '8px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>None</p>
                <Divider spacing="none" label="No Spacing" />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Content below</p>
              </div>
              <div style={{ border: '1px dashed #ddd', padding: '8px', marginTop: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Small</p>
                <Divider spacing="sm" label="Small Spacing" />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Content below</p>
              </div>
              <div style={{ border: '1px dashed #ddd', padding: '8px', marginTop: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Medium (default)</p>
                <Divider spacing="md" label="Medium Spacing" />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Content below</p>
              </div>
              <div style={{ border: '1px dashed #ddd', padding: '8px', marginTop: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Large</p>
                <Divider spacing="lg" label="Large Spacing" />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Content below</p>
              </div>
            </div>
          </div>

          {/* Custom Lengths */}
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Custom Lengths (Horizontal)</h2>
            <div style={containerStyle}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Full width (default)</p>
                <Divider label="100%" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>50% width</p>
                <Divider label="50%" length="50%" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>300px width</p>
                <Divider label="300px" length={300} />
              </div>
            </div>
          </div>

          {/* Vertical Dividers */}
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Vertical Dividers</h2>
            <div style={verticalContainerStyle}>
              <div style={{ textAlign: 'center' }}>
                <Divider orientation="vertical" variant="solid" />
                <p style={verticalLabelStyle}>Solid</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Divider orientation="vertical" variant="dashed" />
                <p style={verticalLabelStyle}>Dashed</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Divider orientation="vertical" spacing="none" />
                <p style={verticalLabelStyle}>No Spacing</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Divider orientation="vertical" spacing="sm" />
                <p style={verticalLabelStyle}>Small Spacing</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Divider orientation="vertical" spacing="lg" />
                <p style={verticalLabelStyle}>Large Spacing</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Divider orientation="vertical" length={150} />
                <p style={verticalLabelStyle}>150px Height</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Divider orientation="vertical" length="80%" />
                <p style={verticalLabelStyle}>80% Height</p>
              </div>
            </div>
          </div>

          {/* Complex Combinations */}
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Complex Combinations</h2>
            <div style={containerStyle}>
              <Divider
                variant="dashed"
                spacing="lg"
                align="start"
                label={<strong>Bold Label with Icon ★</strong>}
                length="80%"
              />
            </div>
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('divider-all-variants.png');
    });
  });
});
