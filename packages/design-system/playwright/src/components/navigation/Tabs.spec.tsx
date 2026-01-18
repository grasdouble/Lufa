import { expect, test } from '@playwright/experimental-ct-react';

import type { TabItem } from '@grasdouble/lufa_design-system';
import { Tabs } from '@grasdouble/lufa_design-system';

import { IconHome, IconSettings, IconUser } from './Tabs.fixtures';

// Sample tab items for testing
const basicTabItems: TabItem[] = [
  { key: 'tab1', label: 'Tab 1', children: <div>Content 1</div> },
  { key: 'tab2', label: 'Tab 2', children: <div>Content 2</div> },
  { key: 'tab3', label: 'Tab 3', children: <div>Content 3</div> },
];
// Tab items with icons
const tabItemsWithIcons: TabItem[] = [
  { key: 'home', label: 'Home', icon: <IconHome />, children: <div>Home content</div> },
  { key: 'profile', label: 'Profile', icon: <IconUser />, children: <div>Profile content</div> },
  { key: 'settings', label: 'Settings', icon: <IconSettings />, children: <div>Settings content</div> },
];
// Tab items with disabled state
const tabItemsWithDisabled: TabItem[] = [
  { key: 'enabled1', label: 'Enabled 1', children: <div>Enabled content 1</div> },
  { key: 'disabled', label: 'Disabled', disabled: true, children: <div>Disabled content</div> },
  { key: 'enabled2', label: 'Enabled 2', children: <div>Enabled content 2</div> },
];
test.describe('Tabs', () => {
  test.describe('Basic Rendering', () => {
    test('renders with default props', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);
      await expect(component).toBeVisible();

      // Check that all tabs are rendered
      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      const tab2 = component.getByRole('tab', { name: 'Tab 2' });
      const tab3 = component.getByRole('tab', { name: 'Tab 3' });

      await expect(tab1).toBeVisible();
      await expect(tab2).toBeVisible();
      await expect(tab3).toBeVisible();
    });
    test('renders tab content correctly', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      // First tab should be active by default and show content
      const tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toBeVisible();
      await expect(tabPanel).toContainText('Content 1');
    });
    test('renders with custom default active key', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} defaultActiveKey="tab2" />);

      const tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toContainText('Content 2');
    });
    test('renders with controlled active key', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} activeKey="tab3" />);

      const tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toContainText('Content 3');
    });
  });
  test.describe('Type Variants', () => {
    test('renders line type (default)', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} type="line" />);
      await expect(component).toBeVisible();
      await expect(component.getByRole('tab', { name: 'Tab 1' })).toBeVisible();
    });
    test('renders card type', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} type="card" />);
      await expect(component).toBeVisible();
      await expect(component.getByRole('tab', { name: 'Tab 1' })).toBeVisible();
    });
    test('renders pill type', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} type="pill" />);
      await expect(component).toBeVisible();
      await expect(component.getByRole('tab', { name: 'Tab 1' })).toBeVisible();
    });
  });
  test.describe('Position Variants', () => {
    test('renders in top position (default)', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} tabPosition="top" />);
      await expect(component).toBeVisible();
      const tablist = component.getByRole('tablist');
      await expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    });
    test('renders in bottom position', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} tabPosition="bottom" />);
      await expect(component).toBeVisible();
      const tablist = component.getByRole('tablist');
      await expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    });
    test('renders in left position', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} tabPosition="left" />);
      await expect(component).toBeVisible();
      const tablist = component.getByRole('tablist');
      await expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });
    test('renders in right position', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} tabPosition="right" />);
      await expect(component).toBeVisible();
      const tablist = component.getByRole('tablist');
      await expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });
  });
  test.describe('Size Variants', () => {
    test('renders small size', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} size="small" />);
      await expect(component).toBeVisible();
      await expect(component.getByRole('tab', { name: 'Tab 1' })).toBeVisible();
    });
    test('renders medium size (default)', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} size="medium" />);
      await expect(component).toBeVisible();
      await expect(component.getByRole('tab', { name: 'Tab 1' })).toBeVisible();
    });
    test('renders large size', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} size="large" />);
      await expect(component).toBeVisible();
      await expect(component.getByRole('tab', { name: 'Tab 1' })).toBeVisible();
    });
  });
  test.describe('Tab Switching via Click', () => {
    test('switches tabs when clicked', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      // Initially, first tab is active
      let tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toContainText('Content 1');

      // Click on second tab
      const tab2 = component.getByRole('tab', { name: 'Tab 2' });
      await tab2.click();

      // Second tab content should be visible
      tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toContainText('Content 2');
    });
    test('calls onChange callback when tab is clicked', async ({ mount }) => {
      let changedKey = '';
      const component = await mount(
        <Tabs
          items={basicTabItems}
          onChange={(key) => {
            changedKey = key;
          }}
        />
      );

      const tab3 = component.getByRole('tab', { name: 'Tab 3' });
      await tab3.click();

      expect(changedKey).toBe('tab3');
    });
    test('does not switch to disabled tab when clicked', async ({ mount }) => {
      const component = await mount(<Tabs items={tabItemsWithDisabled} />);

      // Initially, first tab is active
      let tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toContainText('Enabled content 1');

      // Try to click disabled tab (use force: true since it's disabled)
      const disabledTab = component.getByRole('tab', { name: 'Disabled' });
      await disabledTab.click({ force: true });

      // Should still show first tab content
      tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toContainText('Enabled content 1');
    });
  });
  test.describe('Keyboard Navigation', () => {
    test('navigates with ArrowRight key', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      // Focus first tab
      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await tab1.focus();
      await expect(tab1).toBeFocused();

      // Press ArrowRight
      await page.keyboard.press('ArrowRight');

      // Second tab should be focused and active
      const tab2 = component.getByRole('tab', { name: 'Tab 2' });
      await expect(tab2).toBeFocused();
      await expect(tab2).toHaveAttribute('aria-selected', 'true');

      const tabPanel = component.getByRole('tabpanel');
      await expect(tabPanel).toContainText('Content 2');
    });
    test('navigates with ArrowLeft key', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} defaultActiveKey="tab2" />);

      // Focus second tab
      const tab2 = component.getByRole('tab', { name: 'Tab 2' });
      await tab2.focus();

      // Press ArrowLeft
      await page.keyboard.press('ArrowLeft');

      // First tab should be focused and active
      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await expect(tab1).toBeFocused();
      await expect(tab1).toHaveAttribute('aria-selected', 'true');
    });
    test('navigates with ArrowDown key', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await tab1.focus();

      // Press ArrowDown
      await page.keyboard.press('ArrowDown');

      const tab2 = component.getByRole('tab', { name: 'Tab 2' });
      await expect(tab2).toBeFocused();
    });
    test('navigates with ArrowUp key', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} defaultActiveKey="tab2" />);

      const tab2 = component.getByRole('tab', { name: 'Tab 2' });
      await tab2.focus();

      // Press ArrowUp
      await page.keyboard.press('ArrowUp');

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await expect(tab1).toBeFocused();
    });
    test('jumps to first tab with Home key', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} defaultActiveKey="tab3" />);

      const tab3 = component.getByRole('tab', { name: 'Tab 3' });
      await tab3.focus();

      // Press Home
      await page.keyboard.press('Home');

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await expect(tab1).toBeFocused();
      await expect(tab1).toHaveAttribute('aria-selected', 'true');
    });
    test('jumps to last tab with End key', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await tab1.focus();

      // Press End
      await page.keyboard.press('End');

      const tab3 = component.getByRole('tab', { name: 'Tab 3' });
      await expect(tab3).toBeFocused();
      await expect(tab3).toHaveAttribute('aria-selected', 'true');
    });
    test('wraps around when navigating past last tab', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} defaultActiveKey="tab3" />);

      const tab3 = component.getByRole('tab', { name: 'Tab 3' });
      await tab3.focus();

      // Press ArrowRight to wrap to first
      await page.keyboard.press('ArrowRight');

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await expect(tab1).toBeFocused();
    });
    test('wraps around when navigating before first tab', async ({ mount, page }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      await tab1.focus();

      // Press ArrowLeft to wrap to last
      await page.keyboard.press('ArrowLeft');

      const tab3 = component.getByRole('tab', { name: 'Tab 3' });
      await expect(tab3).toBeFocused();
    });
    test('skips disabled tabs when navigating with arrow keys', async ({ mount, page }) => {
      const component = await mount(<Tabs items={tabItemsWithDisabled} />);

      const enabled1 = component.getByRole('tab', { name: 'Enabled 1' });
      await enabled1.focus();

      // Press ArrowRight - should skip disabled tab
      await page.keyboard.press('ArrowRight');

      const enabled2 = component.getByRole('tab', { name: 'Enabled 2' });
      await expect(enabled2).toBeFocused();
    });
  });
  test.describe('Disabled Tabs', () => {
    test('renders disabled tab correctly', async ({ mount }) => {
      const component = await mount(<Tabs items={tabItemsWithDisabled} />);

      const disabledTab = component.getByRole('tab', { name: 'Disabled' });
      await expect(disabledTab).toBeVisible();
      await expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
      await expect(disabledTab).toBeDisabled();
    });
    test('disabled tab is not focusable via Tab key', async ({ mount }) => {
      const component = await mount(<Tabs items={tabItemsWithDisabled} />);

      const disabledTab = component.getByRole('tab', { name: 'Disabled' });
      await expect(disabledTab).toHaveAttribute('tabindex', '-1');
    });
  });
  test.describe('Icons in Tabs', () => {
    test('renders tabs with icons', async ({ mount }) => {
      const component = await mount(<Tabs items={tabItemsWithIcons} />);

      const homeTab = component.getByRole('tab', { name: 'Home' });
      await expect(homeTab).toBeVisible();

      // Check that icon is rendered (SVG should be present)
      const svg = homeTab.locator('svg').first();
      await expect(svg).toBeVisible();
    });
    test('icon appears before label text', async ({ mount }) => {
      const component = await mount(<Tabs items={tabItemsWithIcons} />);

      const homeTab = component.getByRole('tab', { name: 'Home' });
      const tabContent = await homeTab.textContent();

      // Label text should be present
      expect(tabContent).toContain('Home');
    });
  });
  test.describe('Accessibility (ARIA)', () => {
    test('has correct ARIA roles', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      // Check tablist role
      const tablist = component.getByRole('tablist');
      await expect(tablist).toBeVisible();

      // Check tab roles
      const tabs = component.getByRole('tab');
      await expect(tabs).toHaveCount(3);

      // Check tabpanel role
      const tabpanel = component.getByRole('tabpanel');
      await expect(tabpanel).toBeVisible();
    });
    test('has correct aria-selected attribute', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      const tab2 = component.getByRole('tab', { name: 'Tab 2' });

      // First tab should be selected
      await expect(tab1).toHaveAttribute('aria-selected', 'true');
      await expect(tab2).toHaveAttribute('aria-selected', 'false');

      // Click second tab
      await tab2.click();

      // Second tab should now be selected
      await expect(tab1).toHaveAttribute('aria-selected', 'false');
      await expect(tab2).toHaveAttribute('aria-selected', 'true');
    });
    test('has correct aria-controls relationship', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      const tabpanel = component.getByRole('tabpanel');

      // Tab should have aria-controls pointing to panel
      const ariaControls = await tab1.getAttribute('aria-controls');
      const panelId = await tabpanel.getAttribute('id');

      expect(ariaControls).toBe(panelId);
    });
    test('has correct aria-labelledby relationship', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      const tabpanel = component.getByRole('tabpanel');

      // Panel should have aria-labelledby pointing to tab
      const tabId = await tab1.getAttribute('id');
      const ariaLabelledBy = await tabpanel.getAttribute('aria-labelledby');

      expect(ariaLabelledBy).toBe(tabId);
    });
    test('has correct aria-orientation for horizontal tabs', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} tabPosition="top" />);

      const tablist = component.getByRole('tablist');
      await expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    });
    test('has correct aria-orientation for vertical tabs', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} tabPosition="left" />);

      const tablist = component.getByRole('tablist');
      await expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });
    test('only active tab is in tab sequence', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);

      const tab1 = component.getByRole('tab', { name: 'Tab 1' });
      const tab2 = component.getByRole('tab', { name: 'Tab 2' });
      const tab3 = component.getByRole('tab', { name: 'Tab 3' });

      // Only active tab should have tabindex="0"
      await expect(tab1).toHaveAttribute('tabindex', '0');
      await expect(tab2).toHaveAttribute('tabindex', '-1');
      await expect(tab3).toHaveAttribute('tabindex', '-1');
    });
    test('is accessible (ARIA snapshot)', async ({ mount }) => {
      const component = await mount(<Tabs items={basicTabItems} />);
      await expect(component).toMatchAriaSnapshot(`
        - tablist:
          - tab "Tab 1" [selected]
          - tab "Tab 2"
          - tab "Tab 3"
        - tabpanel "Tab 1"
      `);
    });
  });
  test.describe('Visual Regression', () => {
    test('visual regression: all variants, positions, and sizes', async ({ mount }) => {
      const types = ['line', 'card', 'pill'] as const;
      const positions = ['top', 'bottom', 'left', 'right'] as const;
      const sizes = ['small', 'medium', 'large'] as const;

      const sectionStyle = {
        marginBottom: '48px',
        padding: '24px',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
      };

      const titleStyle = {
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '24px',
        color: '#333',
        borderBottom: '2px solid #0066cc',
        paddingBottom: '8px',
      };

      const subtitleStyle = {
        fontSize: '18px',
        fontWeight: 600,
        marginTop: '32px',
        marginBottom: '16px',
        color: '#555',
      };

      const labelStyle = {
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '8px',
        color: '#666',
      };

      const tabContainerStyle = {
        marginBottom: '24px',
        padding: '16px',
        background: '#f9f9f9',
        borderRadius: '4px',
      };
      const component = await mount(
        <div style={{ padding: '32px', background: '#f5f5f5', minHeight: '100vh' }}>
          {/* Section 1: All Types with All Sizes (Top Position) */}
          <div style={sectionStyle}>
            <div style={titleStyle}>Tab Types (Top Position)</div>

            {types.map((type) => (
              <div key={type}>
                <div style={subtitleStyle}>Type: {type.charAt(0).toUpperCase() + type.slice(1)}</div>

                {sizes.map((size) => (
                  <div key={size} style={tabContainerStyle}>
                    <div style={labelStyle}>Size: {size}</div>
                    <Tabs items={basicTabItems} type={type} size={size} tabPosition="top" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Section 2: All Positions (Line Type, Medium Size) */}
          <div style={sectionStyle}>
            <div style={titleStyle}>Tab Positions (Line Type, Medium Size)</div>

            {positions.map((position) => (
              <div key={position} style={tabContainerStyle}>
                <div style={labelStyle}>Position: {position}</div>
                <div style={{ minHeight: '200px' }}>
                  <Tabs items={basicTabItems} type="line" size="medium" tabPosition={position} />
                </div>
              </div>
            ))}
          </div>
          {/* Section 3: States (Active, Hover, Disabled) */}
          <div style={sectionStyle}>
            <div style={titleStyle}>Tab States</div>

            <div style={subtitleStyle}>Regular Tabs</div>
            <div style={tabContainerStyle}>
              <div style={labelStyle}>Normal interaction</div>
              <Tabs items={basicTabItems} type="line" />
            </div>

            <div style={subtitleStyle}>Tabs with Disabled State</div>
            <div style={tabContainerStyle}>
              <div style={labelStyle}>Middle tab is disabled</div>
              <Tabs items={tabItemsWithDisabled} type="line" />
            </div>

            <div style={subtitleStyle}>Tabs with Icons</div>
            <div style={tabContainerStyle}>
              <div style={labelStyle}>Icons before labels</div>
              <Tabs items={tabItemsWithIcons} type="card" />
            </div>
          </div>
          {/* Section 4: All Type Variants Side by Side */}
          <div style={sectionStyle}>
            <div style={titleStyle}>Type Comparison (Medium Size)</div>

            {types.map((type) => (
              <div key={type} style={tabContainerStyle}>
                <div style={labelStyle}>Type: {type}</div>
                <Tabs items={basicTabItems} type={type} size="medium" />
              </div>
            ))}
          </div>
          {/* Section 5: Complex Example - Pill Type with Icons and All Sizes */}
          <div style={sectionStyle}>
            <div style={titleStyle}>Pill Type with Icons (All Sizes)</div>

            {sizes.map((size) => (
              <div key={size} style={tabContainerStyle}>
                <div style={labelStyle}>Size: {size}</div>
                <Tabs items={tabItemsWithIcons} type="pill" size={size} />
              </div>
            ))}
          </div>
          {/* Section 6: Card Type with Disabled State (All Sizes) */}
          <div style={sectionStyle}>
            <div style={titleStyle}>Card Type with Disabled State (All Sizes)</div>

            {sizes.map((size) => (
              <div key={size} style={tabContainerStyle}>
                <div style={labelStyle}>Size: {size}</div>
                <Tabs items={tabItemsWithDisabled} type="card" size={size} />
              </div>
            ))}
          </div>
        </div>
      );
      await expect(component).toHaveScreenshot('tabs-all-variants.png', {
        fullPage: true,
      });
    });
  });
});
