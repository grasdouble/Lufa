import { expect, test } from '@playwright/experimental-ct-react';

import { Skeleton } from '@grasdouble/lufa_design-system';

test.describe('Skeleton Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render skeleton', async ({ mount }) => {
      // Skeleton needs dimensions to be visible
      const component = await mount(<Skeleton width={200} height={100} />);
      await expect(component).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Skeleton width={100} height={50} className="custom-skeleton" />);
      await expect(component).toHaveClass(/custom-skeleton/);
    });

    test('should apply custom style prop', async ({ mount }) => {
      const component = await mount(<Skeleton width={100} height={50} style={{ margin: '10px' }} />);
      await expect(component).toHaveCSS('margin', '10px');
    });
  });

  test.describe('Variants', () => {
    const variants = ['text', 'circular', 'rectangular'] as const;

    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        // Provide dimensions for visibility
        const component = await mount(<Skeleton variant={variant} width={100} height={100} />);
        await expect(component).toBeVisible();
        await expect(component).toHaveClass(new RegExp(`variant`, 'i'));
      });
    }

    test('should default to rectangular variant', async ({ mount }) => {
      const component = await mount(<Skeleton width={100} height={50} />);
      await expect(component).toHaveClass(/rectangular/i);
    });
  });

  test.describe('Animations', () => {
    test('should render with pulse animation by default', async ({ mount }) => {
      const component = await mount(<Skeleton />);
      await expect(component).toHaveClass(/pulse/i);
    });

    test('should render with pulse animation', async ({ mount }) => {
      const component = await mount(<Skeleton animation="pulse" />);
      await expect(component).toHaveClass(/pulse/i);
    });

    test('should render with wave animation', async ({ mount }) => {
      const component = await mount(<Skeleton animation="wave" />);
      await expect(component).toHaveClass(/wave/i);
    });

    test('should render without animation when animation is false', async ({ mount }) => {
      const component = await mount(<Skeleton animation={false} />);
      const classes = await component.getAttribute('class');
      expect(classes).not.toMatch(/pulse/i);
      expect(classes).not.toMatch(/wave/i);
    });
  });

  test.describe('Width and Height', () => {
    test('should apply width as number (pixels)', async ({ mount }) => {
      const component = await mount(<Skeleton width={200} />);
      await expect(component).toHaveCSS('width', '200px');
    });

    test('should apply width as string (percentage)', async ({ mount }) => {
      const component = await mount(<Skeleton width="100%" height={50} />);
      // Check inline style attribute instead of computed CSS
      const style = await component.getAttribute('style');
      expect(style).toContain('width: 100%');
    });

    test('should apply height as number (pixels)', async ({ mount }) => {
      const component = await mount(<Skeleton width={100} height={100} />);
      await expect(component).toHaveCSS('height', '100px');
    });

    test('should apply height as string (percentage)', async ({ mount }) => {
      const component = await mount(<Skeleton width={100} height="50%" />);
      // Check inline style attribute instead of computed CSS
      const style = await component.getAttribute('style');
      expect(style).toContain('height: 50%');
    });

    test('should apply both width and height', async ({ mount }) => {
      const component = await mount(<Skeleton width={300} height={150} />);
      await expect(component).toHaveCSS('width', '300px');
      await expect(component).toHaveCSS('height', '150px');
    });

    test('should apply custom width and height strings', async ({ mount }) => {
      const component = await mount(<Skeleton width="20rem" height="10vh" />);
      // Check inline style attribute for custom units
      const style = await component.getAttribute('style');
      expect(style).toContain('width: 20rem');
      expect(style).toContain('height: 10vh');
    });
  });

  test.describe('Accessibility', () => {
    test('should have aria-busy attribute when provided', async ({ mount }) => {
      const component = await mount(<Skeleton aria-busy="true" />);
      await expect(component).toHaveAttribute('aria-busy', 'true');
    });

    test('should have aria-label when provided', async ({ mount }) => {
      const component = await mount(<Skeleton aria-label="Loading content" />);
      await expect(component).toHaveAttribute('aria-label', 'Loading content');
    });

    test('should support custom ARIA attributes', async ({ mount }) => {
      const component = await mount(<Skeleton aria-busy="true" aria-label="Loading user profile" role="status" />);
      await expect(component).toHaveAttribute('aria-busy', 'true');
      await expect(component).toHaveAttribute('aria-label', 'Loading user profile');
      await expect(component).toHaveAttribute('role', 'status');
    });

    test('should have accessible structure with aria-label', async ({ mount }) => {
      const component = await mount(<Skeleton aria-label="Loading content" role="status" />);
      await expect(component).toMatchAriaSnapshot(`
        - status "Loading content"
      `);
    });
  });

  test.describe('Common Usage Patterns', () => {
    test('should render text skeleton (single line)', async ({ mount }) => {
      const component = await mount(<Skeleton variant="text" width="100%" />);
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/text/i);
    });

    test('should render multiple text skeletons (paragraph)', async ({ mount }) => {
      const component = await mount(
        <div style={{ width: '400px' }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="95%" />
          <Skeleton variant="text" width="85%" />
        </div>
      );
      const skeletons = component.locator('[class*="skeleton"]');
      await expect(skeletons).toHaveCount(3);
    });

    test('should render circular skeleton (avatar)', async ({ mount }) => {
      const component = await mount(<Skeleton variant="circular" width={40} height={40} />);
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/circular/i);
      await expect(component).toHaveCSS('width', '40px');
      await expect(component).toHaveCSS('height', '40px');
    });

    test('should render rectangular skeleton (card)', async ({ mount }) => {
      const component = await mount(<Skeleton variant="rectangular" width="100%" height={200} />);
      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/rectangular/i);
      await expect(component).toHaveCSS('height', '200px');
    });

    test('should render complex loading card structure', async ({ mount }) => {
      const component = await mount(
        <div style={{ width: '300px', padding: '16px' }}>
          {/* Avatar */}
          <Skeleton variant="circular" width={40} height={40} style={{ marginBottom: '12px' }} />
          {/* Title */}
          <Skeleton variant="text" width="80%" style={{ marginBottom: '8px' }} />
          {/* Description lines */}
          <Skeleton variant="text" width="100%" style={{ marginBottom: '4px' }} />
          <Skeleton variant="text" width="90%" style={{ marginBottom: '12px' }} />
          {/* Image/Card */}
          <Skeleton variant="rectangular" width="100%" height={150} />
        </div>
      );
      const skeletons = component.locator('[class*="skeleton"]');
      await expect(skeletons).toHaveCount(5);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants and animations', async ({ mount }) => {
      const variants = ['text', 'circular', 'rectangular'] as const;
      const animations = [
        { value: 'pulse' as const, label: 'Pulse' },
        { value: 'wave' as const, label: 'Wave' },
        { value: false as const, label: 'None' },
      ];

      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff' }}>
          {/* Header */}
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Skeleton Component - All Variants
          </h1>

          {/* Variants × Animations Grid */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Variant × Animation Combinations
            </h2>
            <table
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                border: '1px solid #e0e0e0',
                background: '#fafafa',
              }}
            >
              <thead>
                <tr style={{ background: '#f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Variant</th>
                  {animations.map((anim) => (
                    <th
                      key={String(anim.value)}
                      style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}
                    >
                      {anim.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => (
                  <tr key={variant} style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '16px', fontWeight: '500', textTransform: 'capitalize' }}>{variant}</td>
                    {animations.map((anim) => (
                      <td key={String(anim.value)} style={{ padding: '16px', textAlign: 'center' }}>
                        <Skeleton
                          variant={variant}
                          animation={anim.value}
                          width={variant === 'circular' ? 60 : 150}
                          height={variant === 'circular' ? 60 : variant === 'text' ? undefined : 60}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Different Sizes Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Width & Height Variations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Rectangular - Various sizes</p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                  <Skeleton variant="rectangular" width={100} height={100} />
                  <Skeleton variant="rectangular" width={150} height={80} />
                  <Skeleton variant="rectangular" width={200} height={120} />
                </div>
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Circular - Avatar sizes</p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="circular" width={48} height={48} />
                  <Skeleton variant="circular" width={64} height={64} />
                  <Skeleton variant="circular" width={80} height={80} />
                </div>
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Text - Percentage widths</p>
                <div style={{ width: '400px' }}>
                  <Skeleton variant="text" width="100%" style={{ marginBottom: '8px' }} />
                  <Skeleton variant="text" width="90%" style={{ marginBottom: '8px' }} />
                  <Skeleton variant="text" width="70%" style={{ marginBottom: '8px' }} />
                  <Skeleton variant="text" width="50%" />
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Examples Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              Real-World Loading Patterns
            </h2>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {/* User Card Loading */}
              <div
                style={{
                  width: '280px',
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#666' }}>User Card</p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <Skeleton variant="circular" width={48} height={48} style={{ marginRight: '12px' }} />
                  <div style={{ flex: 1 }}>
                    <Skeleton variant="text" width="80%" style={{ marginBottom: '6px' }} />
                    <Skeleton variant="text" width="60%" />
                  </div>
                </div>
                <Skeleton variant="rectangular" width="100%" height={140} style={{ marginBottom: '12px' }} />
                <Skeleton variant="text" width="100%" style={{ marginBottom: '4px' }} />
                <Skeleton variant="text" width="85%" />
              </div>

              {/* Article Loading */}
              <div
                style={{
                  width: '320px',
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  Article Preview
                </p>
                <Skeleton variant="rectangular" width="100%" height={180} style={{ marginBottom: '16px' }} />
                <Skeleton variant="text" width="90%" style={{ marginBottom: '8px' }} />
                <Skeleton variant="text" width="100%" style={{ marginBottom: '4px' }} />
                <Skeleton variant="text" width="100%" style={{ marginBottom: '4px' }} />
                <Skeleton variant="text" width="75%" style={{ marginBottom: '16px' }} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="circular" width={32} height={32} style={{ marginRight: '8px' }} />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>

              {/* List Items Loading */}
              <div
                style={{
                  width: '280px',
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#666' }}>List Items</p>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <Skeleton variant="circular" width={40} height={40} style={{ marginRight: '12px' }} />
                    <div style={{ flex: 1 }}>
                      <Skeleton variant="text" width="70%" style={{ marginBottom: '4px' }} />
                      <Skeleton variant="text" width="50%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* No Animation State */}
          <section>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>
              No Animation (Static State)
            </h2>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Text</p>
                <Skeleton variant="text" width={200} animation={false} />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Circular</p>
                <Skeleton variant="circular" width={60} height={60} animation={false} />
              </div>
              <div>
                <p style={{ marginBottom: '8px', fontSize: '12px', color: '#888' }}>Rectangular</p>
                <Skeleton variant="rectangular" width={180} height={100} animation={false} />
              </div>
            </div>
          </section>
        </div>
      );

      await expect(component).toHaveScreenshot('skeleton-all-variants.png');
    });
  });
});
