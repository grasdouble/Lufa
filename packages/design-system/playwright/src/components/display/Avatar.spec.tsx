import { expect, test } from '@playwright/experimental-ct-react';

import { Avatar } from '@grasdouble/lufa_design-system';

const imageSample =
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

test.describe('Avatar Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} />);
      await expect(component).toBeVisible();

      const img = component.locator('img');
      await expect(img).toBeVisible();
      await expect(img).toHaveAttribute('src', imageSample);
      await expect(img).toHaveAttribute('alt', 'Avatar');
    });

    test('should render with custom alt text', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} alt="User profile picture" />);

      const img = component.locator('img');
      await expect(img).toHaveAttribute('alt', 'User profile picture');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} className="custom-class" />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/custom-class/);
    });
  });

  test.describe('Size Variants', () => {
    test('should render extra small (xs) size', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} size="xs" />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/size-xs/);
    });

    test('should render small (sm) size', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} size="sm" />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/size-sm/);
    });

    test('should render medium (md) size by default', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/size-md/);
    });

    test('should render large (lg) size', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} size="lg" />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/size-lg/);
    });

    test('should render extra large (xl) size', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} size="xl" />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/size-xl/);
    });
  });

  test.describe('Shape Variants', () => {
    test('should render circle variant by default', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/variant-circle/);
    });

    test('should render square variant', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} variant="square" />);

      const img = component.locator('img');
      await expect(img).toHaveClass(/variant-square/);
    });

    test('should render count variant', async ({ mount }) => {
      const component = await mount(<Avatar variant="count" count={99} />);

      const countDiv = component.locator('div').filter({ hasText: '99' });
      await expect(countDiv).toBeVisible();
      await expect(countDiv).toHaveClass(/variant-count/);

      // Should not render image for count variant
      const img = component.locator('img');
      await expect(img).not.toBeVisible();
    });

    test('should render count variant with string count', async ({ mount }) => {
      const component = await mount(<Avatar variant="count" count="99+" />);

      const countDiv = component.locator('div').filter({ hasText: '99+' });
      await expect(countDiv).toBeVisible();
      await expect(countDiv).toHaveClass(/variant-count/);
    });
  });

  test.describe('Status Indicators', () => {
    test('should not render status indicator by default', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} />);

      const statusIndicator = component.locator('[aria-label*="Status"]');
      await expect(statusIndicator).not.toBeVisible();
    });

    test('should render online status', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="online" />);

      const statusIndicator = component.locator('[aria-label="Status: online"]');
      await expect(statusIndicator).toBeVisible();
      await expect(statusIndicator).toHaveClass(/status-online/);
    });

    test('should render offline status', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="offline" />);

      const statusIndicator = component.locator('[aria-label="Status: offline"]');
      await expect(statusIndicator).toBeVisible();
      await expect(statusIndicator).toHaveClass(/status-offline/);
    });

    test('should render away status', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="away" />);

      const statusIndicator = component.locator('[aria-label="Status: away"]');
      await expect(statusIndicator).toBeVisible();
      await expect(statusIndicator).toHaveClass(/status-away/);
    });

    test('should render busy status', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="busy" />);

      const statusIndicator = component.locator('[aria-label="Status: busy"]');
      await expect(statusIndicator).toBeVisible();
      await expect(statusIndicator).toHaveClass(/status-busy/);
    });

    test('should not render status for count variant', async ({ mount }) => {
      const component = await mount(<Avatar variant="count" count={99} status="online" />);

      const statusIndicator = component.locator('[aria-label*="Status"]');
      await expect(statusIndicator).not.toBeVisible();
    });
  });

  test.describe('Status Position', () => {
    test('should position status at bottom by default', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="online" />);

      const statusIndicator = component.locator('[aria-label="Status: online"]');
      await expect(statusIndicator).toHaveClass(/status-position-bottom/);
    });

    test('should position status at top', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="online" statusPosition="top" />);

      const statusIndicator = component.locator('[aria-label="Status: online"]');
      await expect(statusIndicator).toHaveClass(/status-position-top/);
    });

    test('should apply square status positioning for square variant', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} variant="square" status="online" statusPosition="top" />);

      const statusIndicator = component.locator('[aria-label="Status: online"]');
      await expect(statusIndicator).toHaveClass(/status-square/);
      await expect(statusIndicator).toHaveClass(/status-position-top/);
    });
  });

  test.describe('Status Size Coordination', () => {
    test('should apply correct status size for xs avatar', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} size="xs" status="online" />);

      const statusIndicator = component.locator('[aria-label="Status: online"]');
      await expect(statusIndicator).toHaveClass(/status-size-xs/);
    });

    test('should apply correct status size for xl avatar', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} size="xl" status="online" />);

      const statusIndicator = component.locator('[aria-label="Status: online"]');
      await expect(statusIndicator).toHaveClass(/status-size-xl/);
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible structure with image', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} alt="John Doe" />);

      await expect(component).toMatchAriaSnapshot(`
        - img "John Doe"
      `);
    });

    test('should have accessible structure with status', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} alt="John Doe" status="online" />);

      await expect(component).toMatchAriaSnapshot(`
        - img "John Doe"
        - status /Status.*online/
      `);
    });

    test('should have accessible structure for count variant', async ({ mount }) => {
      const component = await mount(<Avatar variant="count" count={99} />);

      await expect(component).toMatchAriaSnapshot(`
        - text: "99"
      `);
    });

    test('should provide proper ARIA label for status', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="busy" />);

      const statusIndicator = component.locator('[aria-label="Status: busy"]');
      await expect(statusIndicator).toBeVisible();
    });
  });

  test.describe('Combined Props', () => {
    test('should handle all props together', async ({ mount }) => {
      const component = await mount(
        <Avatar
          src={imageSample}
          alt="User profile"
          size="lg"
          variant="square"
          status="online"
          statusPosition="top"
          className="custom-avatar"
        />
      );

      const img = component.locator('img');
      await expect(img).toBeVisible();
      await expect(img).toHaveAttribute('alt', 'User profile');
      await expect(img).toHaveClass(/size-lg/);
      await expect(img).toHaveClass(/variant-square/);
      await expect(img).toHaveClass(/custom-avatar/);

      const statusIndicator = component.locator('[aria-label="Status: online"]');
      await expect(statusIndicator).toBeVisible();
      await expect(statusIndicator).toHaveClass(/status-position-top/);
      await expect(statusIndicator).toHaveClass(/status-square/);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle count variant without count prop', async ({ mount }) => {
      const component = await mount(<Avatar variant="count" />);

      const countDiv = component.locator('div').first();
      await expect(countDiv).toBeVisible();
    });

    test('should handle status="none" correctly', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} status="none" />);

      const statusIndicator = component.locator('[aria-label*="Status"]');
      await expect(statusIndicator).not.toBeVisible();
    });

    test('should handle empty string alt text', async ({ mount }) => {
      const component = await mount(<Avatar src={imageSample} alt="" />);

      const img = component.locator('img');
      await expect(img).toHaveAttribute('alt', '');
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '20px', width: 'fit-content' }}>
          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Sizes</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
            <Avatar src={imageSample} size="xs" />
            <Avatar src={imageSample} size="sm" />
            <Avatar src={imageSample} size="md" />
            <Avatar src={imageSample} size="lg" />
            <Avatar src={imageSample} size="xl" />
          </div>

          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Status</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
            <Avatar src={imageSample} status="online" />
            <Avatar src={imageSample} status="offline" />
            <Avatar src={imageSample} status="away" />
            <Avatar src={imageSample} status="busy" />
          </div>

          <h1 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Variants</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Avatar src={imageSample} variant="circle" />
            <Avatar src={imageSample} variant="square" />
            <Avatar variant="count" count={99} />
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('avatar-all-variants.png');
    });
  });
});
