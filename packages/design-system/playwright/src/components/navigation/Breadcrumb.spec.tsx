import React from 'react';
import { expect, test } from '@playwright/experimental-ct-react';

import type { BreadcrumbItem } from '@grasdouble/lufa_design-system';
import { Breadcrumb } from '@grasdouble/lufa_design-system';

import { FileIcon, FolderIcon, HomeIcon } from './Breadcrumb.fixtures';

const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Laptops' },
];

const itemsWithIcons: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Documents', href: '/documents', icon: <FolderIcon /> },
  { label: 'Report.pdf', icon: <FileIcon /> },
];

test.describe('Breadcrumb Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with items', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      await expect(component).toBeVisible();
      await expect(component.getByText('Home')).toBeVisible();
      await expect(component.getByText('Products')).toBeVisible();
      await expect(component.getByText('Laptops')).toBeVisible();
    });

    test('should render with navigation landmark', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      await expect(component).toBeVisible();
      await expect(component).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    test('should render with list structure', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const list = component.locator('ol');
      await expect(list).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} className="custom-breadcrumb" />);
      await expect(component).toHaveClass(/custom-breadcrumb/);
    });
  });

  test.describe('Size Variants', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    for (const size of sizes) {
      test(`should render ${size} size`, async ({ mount }) => {
        const component = await mount(<Breadcrumb items={basicItems} size={size} />);
        await expect(component).toBeVisible();
        await expect(component.getByText('Home')).toBeVisible();
      });
    }

    test('should apply small size class', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} size="small" />);
      await expect(component).toHaveClass(/sizeSmall/);
    });

    test('should apply medium size class by default', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      await expect(component).toHaveClass(/sizeMedium/);
    });

    test('should apply large size class', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} size="large" />);
      await expect(component).toHaveClass(/sizeLarge/);
    });
  });

  test.describe('Links and Current Item', () => {
    test('should render links for items with href', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const homeLink = component.getByRole('link', { name: 'Home' });
      const productsLink = component.getByRole('link', { name: 'Products' });

      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/');

      await expect(productsLink).toBeVisible();
      await expect(productsLink).toHaveAttribute('href', '/products');
    });

    test('should render last item as current page', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const currentItem = component.getByText('Laptops');
      await expect(currentItem).toHaveAttribute('aria-current', 'page');
    });

    test('should not render link for last item', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const laptopsLink = component.getByRole('link', { name: 'Laptops', exact: true });
      await expect(laptopsLink).not.toBeVisible();
    });

    test('should render all items as text when no href provided', async ({ mount }) => {
      const textOnlyItems: BreadcrumbItem[] = [{ label: 'Home' }, { label: 'Products' }, { label: 'Laptops' }];
      const component = await mount(<Breadcrumb items={textOnlyItems} />);
      const links = component.getByRole('link');
      await expect(links).toHaveCount(0);
    });
  });

  test.describe('Separator', () => {
    test('should render default separator', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const separators = component.locator('[class*="separator"]');
      // Should have 2 separators for 3 items
      await expect(separators).toHaveCount(2);
    });

    test('should render custom separator', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} separator=">" />);
      await expect(component.getByText('>', { exact: true }).first()).toBeVisible();
    });

    test('should render custom element as separator', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} separator={<span>→</span>} />);
      await expect(component.getByText('→').first()).toBeVisible();
    });

    test('should not render separator after last item', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const separators = component.locator('[class*="separator"]');
      // Should have exactly items.length - 1 separators
      await expect(separators).toHaveCount(basicItems.length - 1);
    });

    test('separators should have aria-hidden', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const separator = component.locator('[class*="separator"]').first();
      await expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test.describe('Icons', () => {
    test('should render items with icons', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={itemsWithIcons} />);
      await expect(component.getByText('🏠')).toBeVisible();
      await expect(component.getByText('📁')).toBeVisible();
      await expect(component.getByText('📄')).toBeVisible();
    });

    test('should render icon before label', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={itemsWithIcons} />);
      const homeLink = component.getByRole('link', { name: /Home/ });
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toContainText('🏠');
      await expect(homeLink).toContainText('Home');
    });

    test('should apply icon class', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={itemsWithIcons} />);
      const iconSpan = component.locator('[class*="icon"]').first();
      await expect(iconSpan).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have navigation landmark with label', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      await expect(component).toBeVisible();
      await expect(component).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    test('should use ordered list structure', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const list = component.locator('ol');
      await expect(list).toBeVisible();
    });

    test('should mark current page with aria-current', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const currentItem = component.locator('[aria-current="page"]');
      await expect(currentItem).toBeVisible();
      await expect(currentItem).toContainText('Laptops');
    });

    test('is accessible (ARIA snapshot)', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      await expect(component).toMatchAriaSnapshot(`
        - navigation "Breadcrumb":
          - list:
            - listitem:
              - link "Home"
            - listitem:
              - link "Products"
            - listitem
      `);
    });

    test('links are keyboard accessible', async ({ mount }) => {
      const component = await mount(<Breadcrumb items={basicItems} />);
      const homeLink = component.getByRole('link', { name: 'Home' });
      await homeLink.focus();
      await expect(homeLink).toBeFocused();
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle single item', async ({ mount }) => {
      const singleItem: BreadcrumbItem[] = [{ label: 'Home' }];
      const component = await mount(<Breadcrumb items={singleItem} />);
      await expect(component.getByText('Home')).toBeVisible();
      // No separators
      const separators = component.locator('[class*="separator"]');
      await expect(separators).toHaveCount(0);
    });

    test('should handle many items', async ({ mount }) => {
      const manyItems: BreadcrumbItem[] = [
        { label: 'Level 1', href: '/l1' },
        { label: 'Level 2', href: '/l2' },
        { label: 'Level 3', href: '/l3' },
        { label: 'Level 4', href: '/l4' },
        { label: 'Level 5' },
      ];
      const component = await mount(<Breadcrumb items={manyItems} />);
      await expect(component.getByText('Level 1')).toBeVisible();
      await expect(component.getByText('Level 5')).toBeVisible();
      // Should have 4 separators
      const separators = component.locator('[class*="separator"]');
      await expect(separators).toHaveCount(4);
    });

    test('should handle long labels', async ({ mount }) => {
      const longItems: BreadcrumbItem[] = [
        { label: 'This is a very long breadcrumb item label', href: '/' },
        { label: 'Another extremely long label that might wrap', href: '/page' },
        { label: 'Final item with a lengthy name' },
      ];
      const component = await mount(<Breadcrumb items={longItems} />);
      await expect(component.getByText('This is a very long breadcrumb item label')).toBeVisible();
      await expect(component.getByText('Final item with a lengthy name')).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options', async ({ mount }) => {
      const sizes = ['small', 'medium', 'large'] as const;
      const separators = [
        { label: 'Default (/)', value: '/' },
        { label: 'Arrow (>)', value: '>' },
        { label: 'Dash (-)', value: '-' },
        { label: 'Custom (→)', value: '→' },
      ];

      const sectionTitleStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: 20,
        margin: '32px 0 16px 0',
        color: '#333',
        borderBottom: '2px solid #333',
        paddingBottom: 8,
      };

      const labelStyle: React.CSSProperties = {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 8,
        color: '#555',
      };

      const containerStyle: React.CSSProperties = {
        padding: 16,
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 4,
        marginBottom: 16,
      };

      const component = await mount(
        <div style={{ padding: 24, background: '#f9f9f9' }}>
          {/* Size Variants */}
          <div style={sectionTitleStyle}>Breadcrumb - Size Variants</div>
          {sizes.map((size) => (
            <div key={size} style={containerStyle}>
              <div style={labelStyle}>Size: {size}</div>
              <Breadcrumb items={basicItems} size={size} />
            </div>
          ))}

          {/* With Icons */}
          <div style={sectionTitleStyle}>With Icons</div>
          {sizes.map((size) => (
            <div key={size} style={containerStyle}>
              <div style={labelStyle}>Size: {size} with icons</div>
              <Breadcrumb items={itemsWithIcons} size={size} />
            </div>
          ))}

          {/* Custom Separators */}
          <div style={sectionTitleStyle}>Custom Separators</div>
          {separators.map((sep) => (
            <div key={sep.label} style={containerStyle}>
              <div style={labelStyle}>{sep.label}</div>
              <Breadcrumb items={basicItems} separator={sep.value} />
            </div>
          ))}

          {/* Edge Cases */}
          <div style={sectionTitleStyle}>Edge Cases</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Single Item</div>
            <Breadcrumb items={[{ label: 'Home' }]} />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Many Items</div>
            <Breadcrumb
              items={[
                { label: 'Level 1', href: '/l1' },
                { label: 'Level 2', href: '/l2' },
                { label: 'Level 3', href: '/l3' },
                { label: 'Level 4', href: '/l4' },
                { label: 'Level 5', href: '/l5' },
                { label: 'Current Page' },
              ]}
            />
          </div>
          <div style={containerStyle}>
            <div style={labelStyle}>Long Labels</div>
            <Breadcrumb
              items={[
                { label: 'This is a very long breadcrumb item label', href: '/' },
                { label: 'Another extremely long label that might wrap to multiple lines', href: '/page' },
                { label: 'Final item with a lengthy descriptive name' },
              ]}
            />
          </div>

          {/* Combination: Large + Icons + Custom Separator */}
          <div style={sectionTitleStyle}>Combined Features</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Large size + Icons + Custom separator (→)</div>
            <Breadcrumb items={itemsWithIcons} size="large" separator="→" />
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('breadcrumb-all-variants-chromium-darwin.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });
});
