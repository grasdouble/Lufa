import { expect, test } from '@playwright/experimental-ct-react';

import { Spinner } from '@grasdouble/lufa_design-system';

test.describe('Spinner Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render spinner', async ({ mount }) => {
      const component = await mount(<Spinner />);
      await expect(component).toBeVisible();
      await expect(component).toHaveAttribute('role', 'status');
      await expect(component).toHaveAttribute('aria-label', 'Loading');
    });
  });

  test.describe('Size', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    for (const size of sizes) {
      test(`should render ${size} size`, async ({ mount }) => {
        const component = await mount(<Spinner size={size} />);
        await expect(component).toHaveClass(new RegExp(`spinner-${size}`));
      });
    }
  });

  test.describe('Mode', () => {
    const modes = ['A', 'B'] as const;
    for (const mode of modes) {
      test(`should render mode ${mode}`, async ({ mount }) => {
        const component = await mount(<Spinner mode={mode} />);
        await expect(component).toBeVisible();
      });
    }
  });

  test.describe('Accessibility', () => {
    test('should have accessible structure', async ({ mount }) => {
      const component = await mount(<Spinner />);
      await expect(component).toMatchAriaSnapshot(`
        - status:
            - text: "Loading"
      `);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all sizes and modes', async ({ mount }) => {
      const sizes = ['small', 'medium', 'large'] as const;
      const modes = ['A', 'B'] as const;
      const component = await mount(
        <div style={{ padding: '20px', width: 'fit-content' }}>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Spinner Sizes</h1>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '32px' }}>
            {sizes.map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Spinner size={size} />
                <span style={{ marginTop: 8, fontSize: 14 }}>{size}</span>
              </div>
            ))}
          </div>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Spinner Modes</h1>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '32px' }}>
            {modes.map((mode) => (
              <div key={mode} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Spinner mode={mode} />
                <span style={{ marginTop: 8, fontSize: 14 }}>mode {mode}</span>
              </div>
            ))}
          </div>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>All Combinations</h1>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {sizes.flatMap((size) =>
              modes.map((mode) => (
                <div key={size + mode} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Spinner size={size} mode={mode} />
                  <span style={{ marginTop: 8, fontSize: 14 }}>
                    {size} / {mode}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('spinner-all-variants.png');
    });
  });
});
