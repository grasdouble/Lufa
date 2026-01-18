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
        - status "Loading"
      `);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all sizes and modes', async ({ mount }) => {
      const sizes = ['small', 'medium', 'large'] as const;
      const modes = ['A', 'B'] as const;

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Spinner Component - All Variants
          </h1>

          {/* Sizes Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Spinner Sizes</h2>
            <div
              style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'center',
                padding: '24px',
                background: '#fafafa',
                borderRadius: '8px',
              }}
            >
              {sizes.map((size) => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <Spinner size={size} />
                  <span style={{ fontSize: '14px', color: '#666', textTransform: 'capitalize' }}>{size}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Modes Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Spinner Modes</h2>
            <div
              style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'center',
                padding: '24px',
                background: '#fafafa',
                borderRadius: '8px',
              }}
            >
              {modes.map((mode) => (
                <div key={mode} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <Spinner mode={mode} />
                  <span style={{ fontSize: '14px', color: '#666' }}>Mode {mode}</span>
                </div>
              ))}
            </div>
          </section>

          {/* All Combinations Section */}
          <section>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              All Size × Mode Combinations
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                padding: '24px',
                background: '#fafafa',
                borderRadius: '8px',
              }}
            >
              {sizes.flatMap((size) =>
                modes.map((mode) => (
                  <div
                    key={`${size}-${mode}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <Spinner size={size} mode={mode} />
                    <span style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>
                      {size} / {mode}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('spinner-all-variants.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all sizes and modes in dark mode', async ({ mount, page }) => {
      const sizes = ['small', 'medium', 'large'] as const;
      const modes = ['A', 'B'] as const;

      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const component = await mount(
        <div
          style={{
            padding: '32px',
            background: 'var(--lufa-token-color-background-primary)',
            width: '900px',
          }}
        >
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Spinner Component - All Variants (Dark Mode)
          </h1>

          {/* Sizes Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Spinner Sizes
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'center',
                padding: '24px',
                background: 'var(--lufa-token-color-background-primary)',
                borderRadius: '8px',
              }}
            >
              {sizes.map((size) => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <Spinner size={size} />
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--lufa-token-color-text-secondary)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {size}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Modes Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Spinner Modes
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'center',
                padding: '24px',
                background: 'var(--lufa-token-color-background-primary)',
                borderRadius: '8px',
              }}
            >
              {modes.map((mode) => (
                <div key={mode} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <Spinner mode={mode} />
                  <span style={{ fontSize: '14px', color: 'var(--lufa-token-color-text-secondary)' }}>Mode {mode}</span>
                </div>
              ))}
            </div>
          </section>

          {/* All Combinations Section */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              All Size × Mode Combinations
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                padding: '24px',
                background: 'var(--lufa-token-color-background-primary)',
                borderRadius: '8px',
              }}
            >
              {sizes.flatMap((size) =>
                modes.map((mode) => (
                  <div
                    key={`${size}-${mode}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: 'var(--lufa-token-color-background-primary)',
                      borderRadius: '6px',
                      border: '1px solid var(--lufa-token-color-text-secondary)',
                    }}
                  >
                    <Spinner size={size} mode={mode} />
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--lufa-token-color-text-secondary)',
                        textAlign: 'center',
                      }}
                    >
                      {size} / {mode}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('spinner-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
