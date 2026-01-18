import { expect, test } from '@playwright/experimental-ct-react';

import { Avatar, AvatarGroup } from '@grasdouble/lufa_design-system';

const imageSample =
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

test.describe('AvatarGroup Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with multiple Avatars', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup>
          <Avatar src={imageSample} alt="A" />
          <Avatar src={imageSample} alt="B" />
          <Avatar src={imageSample} alt="C" />
        </AvatarGroup>
      );
      await expect(component).toBeVisible();
      await expect(component.locator('img')).toHaveCount(3);
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup className="custom-group">
          <Avatar src={imageSample} />
        </AvatarGroup>
      );
      await expect(component).toHaveClass(/custom-group/);
    });
  });

  test.describe('Max Avatars', () => {
    test('should limit visible avatars to max and show count', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup max={2}>
          <Avatar src={imageSample} alt="A" />
          <Avatar src={imageSample} alt="B" />
          <Avatar src={imageSample} alt="C" />
        </AvatarGroup>
      );
      // Only 2 avatars visible, plus count
      await expect(component.locator('img')).toHaveCount(2);
      await expect(component.locator('div').filter({ hasText: '+1' })).toBeVisible();
    });

    test('should not show count if avatars <= max', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup max={3}>
          <Avatar src={imageSample} alt="A" />
          <Avatar src={imageSample} alt="B" />
          <Avatar src={imageSample} alt="C" />
        </AvatarGroup>
      );
      await expect(component.locator('img')).toHaveCount(3);
      await expect(component.locator('div').filter({ hasText: '+' })).toHaveCount(0);
    });
  });

  test.describe('Size Prop', () => {
    test('should apply size to all avatars', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup size="lg">
          <Avatar src={imageSample} />
          <Avatar src={imageSample} />
        </AvatarGroup>
      );
      const imgs = component.locator('img');
      await expect(imgs.nth(0)).toHaveClass(/size-lg/);
      await expect(imgs.nth(1)).toHaveClass(/size-lg/);
    });

    test('should allow child Avatar to override size', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup size="sm">
          <Avatar src={imageSample} size="xl" />
          <Avatar src={imageSample} />
        </AvatarGroup>
      );
      const imgs = component.locator('img');
      await expect(imgs.nth(0)).toHaveClass(/size-xl/);
      await expect(imgs.nth(1)).toHaveClass(/size-sm/);
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible structure with avatars', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup>
          <Avatar src={imageSample} alt="A" />
          <Avatar src={imageSample} alt="B" />
        </AvatarGroup>
      );
      await expect(component).toMatchAriaSnapshot(`
				- img "A"
				- img "B"
			`);
    });

    test('should have accessible structure with count', async ({ mount }) => {
      const component = await mount(
        <AvatarGroup max={1}>
          <Avatar src={imageSample} alt="A" />
          <Avatar src={imageSample} alt="B" />
        </AvatarGroup>
      );
      await expect(component).toMatchAriaSnapshot(`
				- img "A"
				- text: "+1"
			`);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all group size and variant combinations', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '32px', background: '#ffffff', width: '900px' }}>
          <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            AvatarGroup - All Variants
          </h1>

          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Sizes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: 60, display: 'inline-block', color: '#666' }}>xs</span>
              <AvatarGroup size="xs">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: 60, display: 'inline-block', color: '#666' }}>sm</span>
              <AvatarGroup size="sm">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: 60, display: 'inline-block', color: '#666' }}>md</span>
              <AvatarGroup size="md">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: 60, display: 'inline-block', color: '#666' }}>lg</span>
              <AvatarGroup size="lg">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: 60, display: 'inline-block', color: '#666' }}>xl</span>
              <AvatarGroup size="xl">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
          </div>

          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#555' }}>Max + Count</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: 60, display: 'inline-block', color: '#666' }}>max=2</span>
              <AvatarGroup max={2} size="md">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: 60, display: 'inline-block', color: '#666' }}>max=3</span>
              <AvatarGroup max={3} size="md">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('avatar-group-all-variants.png', {
        animations: 'disabled',
      });
    });

    test('should match snapshot for all group size and variant combinations in dark mode', async ({ mount, page }) => {
      // Set dark mode on document root BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const component = await mount(
        <div
          style={{
            padding: '32px',
            width: '900px',
            background: 'var(--lufa-token-color-background-primary)',
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
            AvatarGroup - All Variants (Dark Mode)
          </h1>

          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-secondary)',
            }}
          >
            Sizes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  width: 60,
                  display: 'inline-block',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                xs
              </span>
              <AvatarGroup size="xs">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  width: 60,
                  display: 'inline-block',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                sm
              </span>
              <AvatarGroup size="sm">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  width: 60,
                  display: 'inline-block',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                md
              </span>
              <AvatarGroup size="md">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  width: 60,
                  display: 'inline-block',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                lg
              </span>
              <AvatarGroup size="lg">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  width: 60,
                  display: 'inline-block',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                xl
              </span>
              <AvatarGroup size="xl">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
          </div>

          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-token-color-text-secondary)',
            }}
          >
            Max + Count
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  width: 60,
                  display: 'inline-block',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                max=2
              </span>
              <AvatarGroup max={2} size="md">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  width: 60,
                  display: 'inline-block',
                  color: 'var(--lufa-token-color-text-secondary)',
                }}
              >
                max=3
              </span>
              <AvatarGroup max={3} size="md">
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
                <Avatar src={imageSample} />
              </AvatarGroup>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);
      await expect(component).toHaveScreenshot('avatar-group-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});
