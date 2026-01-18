import { expect, test } from '@playwright/experimental-ct-react';

import { Input } from '@grasdouble/lufa_design-system';

test.describe('Input', () => {
  test('renders with placeholder', async ({ mount }) => {
    const component = await mount(<Input placeholder="Type here" />);
    await expect(component.getByPlaceholder('Type here')).toBeVisible();
  });

  test('renders with label', async ({ mount }) => {
    const component = await mount(
      <label htmlFor="input-id">
        <span>Label</span>
        <Input id="input-id" />
      </label>
    );
    await expect(component.getByLabel('Label')).toBeVisible();
  });

  test('accepts value and onChange', async ({ mount }) => {
    const component = await mount(<Input placeholder="Type here" />);
    const input = component.locator('input');
    await input.fill('Hello');
    await expect(input).toHaveValue('Hello');
  });

  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(<Input aria-label="Accessible input" />);
    await expect(component).toMatchAriaSnapshot(`
			- textbox "Accessible input"
		`);
  });

  test('is keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<Input aria-label="Tab input" />);
    await page.keyboard.press('Tab');
    await expect(component.getByRole('textbox')).toBeFocused();
  });

  test('visual regression: all variants, sizes, and states', async ({ mount }) => {
    const variants = ['outlined', 'filled'] as const;
    const sizes = ['small', 'medium', 'large'] as const;
    const cellStyle = { padding: 16, textAlign: 'left', verticalAlign: 'middle', minWidth: 250 };
    const headerStyle = { fontWeight: 600, padding: 12, background: '#f0f0f0', textAlign: 'left' };
    const tableStyle = { borderCollapse: 'collapse', width: '100%', background: '#f5f5f5', marginBottom: 32 };
    const sectionTitleStyle = { fontWeight: 700, fontSize: 22, margin: '32px 0 16px 0', color: '#111' };
    const variantTitleStyle = { fontWeight: 700, fontSize: 18, margin: '24px 0 8px 0', color: '#333' };

    const component = await mount(
      <div style={{ padding: 24, background: '#f5f5f5' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <div style={variantTitleStyle}>Variant: {variant.charAt(0).toUpperCase() + variant.slice(1)}</div>
            {sizes.map((size) => (
              <div key={size}>
                <div style={sectionTitleStyle}>Size: {size.charAt(0).toUpperCase() + size.slice(1)}</div>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={headerStyle}>State</th>
                      <th style={headerStyle}>Input</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={cellStyle}>Default</td>
                      <td style={cellStyle}>
                        <Input placeholder="Type here..." variant={variant} size={size} />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>With Value</td>
                      <td style={cellStyle}>
                        <Input placeholder="Type here..." variant={variant} size={size} defaultValue="Sample text" />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>With Label</td>
                      <td style={cellStyle}>
                        <Input label="Label" placeholder="Type here..." variant={variant} size={size} />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Required</td>
                      <td style={cellStyle}>
                        <Input
                          label="Required Field"
                          placeholder="Type here..."
                          variant={variant}
                          size={size}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>With Helper Text</td>
                      <td style={cellStyle}>
                        <Input
                          label="Helper Text"
                          placeholder="Type here..."
                          variant={variant}
                          size={size}
                          helperText="This is helper text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Error</td>
                      <td style={cellStyle}>
                        <Input
                          label="Error State"
                          placeholder="Type here..."
                          variant={variant}
                          size={size}
                          error="This field is required"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Disabled</td>
                      <td style={cellStyle}>
                        <Input placeholder="Disabled" variant={variant} size={size} disabled />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Disabled with Value</td>
                      <td style={cellStyle}>
                        <Input
                          placeholder="Disabled"
                          variant={variant}
                          size={size}
                          disabled
                          defaultValue="Disabled text"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Full Width</td>
                      <td style={cellStyle}>
                        <Input placeholder="Full width..." variant={variant} size={size} fullWidth />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    await expect(component).toHaveScreenshot('input-all-variants-sizes-states.png');
  });
});
