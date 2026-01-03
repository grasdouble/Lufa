import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '@grasdouble/lufa_design-system';

test.describe('Button', () => {
  test('renders with children', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Click me');
  });

  test('renders all variants', async ({ mount }) => {
    const variants = ['solid', 'outlined', 'text', 'ghost', 'link'] as const;
    for (const variant of variants) {
      const component = await mount(<Button variant={variant}>Button {variant}</Button>);
      await expect(component).toBeVisible();
      await expect(component).toContainText(`Button ${variant}`);
      await component.unmount();
    }
  });

  test('renders all sizes', async ({ mount }) => {
    const sizes = ['small', 'medium', 'large'] as const;
    for (const size of sizes) {
      const component = await mount(<Button size={size}>Button {size}</Button>);
      await expect(component).toBeVisible();
      await expect(component).toContainText(`Button ${size}`);
      await component.unmount();
    }
  });

  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(<Button>Accessible</Button>);
    await expect(component).toMatchAriaSnapshot(`
			- button "Accessible"
		`);
  });

  test('calls onClick when clicked', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  test('is keyboard accessible', async ({ mount }) => {
    const component = await mount(<Button>Tab me</Button>);
    await component.focus();
    await expect(component).toBeFocused();
  });

  test('visual regression: all variants, sizes, and colors', async ({ mount }) => {
    const variants = ['solid', 'outlined', 'ghost', 'text', 'link'] as const;
    const colors = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;
    const cellStyle = { padding: 8, textAlign: 'center', background: '#fff' };
    const headerStyle = { fontWeight: 600, padding: 8, background: '#f0f0f0', textAlign: 'center' };
    const tableStyle = { borderCollapse: 'collapse', width: '100%', background: '#f5f5f5', marginBottom: 32 };
    const colorTitleStyle = { fontWeight: 700, fontSize: 18, margin: '24px 0 8px 0', color: '#333' };
    const component = await mount(
      <div style={{ padding: 24, background: '#f5f5f5' }}>
        {colors.map((color) => (
          <div key={color}>
            <div style={colorTitleStyle}>{color.charAt(0).toUpperCase() + color.slice(1)}</div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={headerStyle}>Variant</th>
                  <th style={headerStyle}>Default</th>
                  <th style={headerStyle}>Hover</th>
                  <th style={headerStyle}>Focus</th>
                  <th style={headerStyle}>Disabled</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => {
                  const buttonStyle = variant === 'text' || variant === 'link' ? {} : { minWidth: 120 };
                  return (
                    <tr key={variant}>
                      <td style={cellStyle}>{variant}</td>
                      <td style={cellStyle}>
                        <Button variant={variant} color={color} style={buttonStyle}>
                          Default
                        </Button>
                      </td>
                      <td style={cellStyle}>
                        <Button variant={variant} color={color} data-test-state="hover" style={buttonStyle}>
                          Hover
                        </Button>
                      </td>
                      <td style={cellStyle}>
                        <Button variant={variant} color={color} data-test-state="focus" style={buttonStyle}>
                          Focus
                        </Button>
                      </td>
                      <td style={cellStyle}>
                        <Button variant={variant} color={color} disabled style={buttonStyle}>
                          Disabled
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
    await expect(component).toHaveScreenshot('button-all-variants-sizes-colors.png');
  });
});
