import React from 'react';
import { expect, test } from '@playwright/experimental-ct-react';

import type { MenuItem } from '@grasdouble/lufa_design-system';
import { Menu } from '@grasdouble/lufa_design-system';

import {
  FileIcon,
  FolderIcon,
  HomeIcon,
  MenuWithState,
  MenuWithSubmenu,
  SettingsIcon,
  UserIcon,
} from './Menu.fixtures';

const basicItems: MenuItem[] = [
  { key: 'home', label: 'Home' },
  { key: 'profile', label: 'Profile' },
  { key: 'settings', label: 'Settings' },
];

const itemsWithIcons: MenuItem[] = [
  { key: 'home', label: 'Home', icon: <HomeIcon /> },
  { key: 'profile', label: 'Profile', icon: <UserIcon /> },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const itemsWithDisabled: MenuItem[] = [
  { key: 'enabled1', label: 'Enabled 1' },
  { key: 'disabled', label: 'Disabled', disabled: true },
  { key: 'enabled2', label: 'Enabled 2' },
];

const itemsWithSubmenu: MenuItem[] = [
  {
    key: 'files',
    label: 'Files',
    icon: <FolderIcon />,
    children: [
      { key: 'new', label: 'New File', icon: <FileIcon /> },
      { key: 'open', label: 'Open File', icon: <FileIcon /> },
      { key: 'save', label: 'Save File', icon: <FileIcon /> },
    ],
  },
  { key: 'home', label: 'Home', icon: <HomeIcon /> },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const itemsWithLinks: MenuItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

test.describe('Menu Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with items', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      await expect(component).toBeVisible();
      await expect(component.getByText('Home')).toBeVisible();
      await expect(component.getByText('Profile')).toBeVisible();
      await expect(component.getByText('Settings')).toBeVisible();
    });

    test('should render within navigation element', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      await expect(component).toBeVisible();
    });

    test('should render with list structure', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      const list = component.locator('ul').first();
      await expect(list).toBeVisible();
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} className="custom-menu" />);
      await expect(component).toHaveClass(/custom-menu/);
    });
  });

  test.describe('Mode Variants', () => {
    const modes = ['vertical', 'horizontal', 'inline'] as const;

    for (const mode of modes) {
      test(`should render ${mode} mode`, async ({ mount }) => {
        const component = await mount(<Menu items={basicItems} mode={mode} />);
        await expect(component).toBeVisible();
        await expect(component.getByText('Home')).toBeVisible();
      });
    }

    test('should apply vertical mode class by default', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      await expect(component).toHaveClass(/modeVertical/);
    });

    test('should apply horizontal mode class', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} mode="horizontal" />);
      await expect(component).toHaveClass(/modeHorizontal/);
    });

    test('should apply inline mode class', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} mode="inline" />);
      await expect(component).toHaveClass(/modeInline/);
    });
  });

  test.describe('Theme Variants', () => {
    const themes = ['light', 'dark'] as const;

    for (const theme of themes) {
      test(`should render ${theme} theme`, async ({ mount }) => {
        const component = await mount(<Menu items={basicItems} theme={theme} />);
        await expect(component).toBeVisible();
        await expect(component.getByText('Home')).toBeVisible();
      });
    }

    test('should apply light theme class by default', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      await expect(component).toHaveClass(/themeLight/);
    });

    test('should apply dark theme class', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} theme="dark" />);
      await expect(component).toHaveClass(/themeDark/);
    });
  });

  test.describe('Selection', () => {
    test('should render selected item', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} selectedKey="profile" />);
      const profileItem = component.locator('[class*="selected"]');
      await expect(profileItem).toBeVisible();
      await expect(profileItem).toContainText('Profile');
    });

    test('should call onSelect when item is clicked', async ({ mount }) => {
      let selectedKey = '';
      const component = await mount(
        <Menu
          items={basicItems}
          onSelect={(key) => {
            selectedKey = key;
          }}
        />
      );

      await component.getByText('Settings').click();
      expect(selectedKey).toBe('settings');
    });

    test('should update selection with state management', async ({ mount }) => {
      const component = await mount(<MenuWithState />);

      // Initially home is selected
      await expect(component.getByTestId('selected-key')).toContainText('Selected: home');

      // Click profile
      await component.getByText('Profile').click();
      await expect(component.getByTestId('selected-key')).toContainText('Selected: profile');

      // Click settings
      await component.getByText('Settings').click();
      await expect(component.getByTestId('selected-key')).toContainText('Selected: settings');
    });
  });

  test.describe('Icons', () => {
    test('should render items with icons', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithIcons} />);
      await expect(component.getByText('🏠')).toBeVisible();
      await expect(component.getByText('👤')).toBeVisible();
      await expect(component.getByText('⚙️')).toBeVisible();
    });

    test('should render icon before label', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithIcons} />);
      const homeItem = component.getByText('Home').locator('..');
      await expect(homeItem).toContainText('🏠');
      await expect(homeItem).toContainText('Home');
    });

    test('should apply icon class', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithIcons} />);
      const iconSpan = component.locator('[class*="icon"]').first();
      await expect(iconSpan).toBeVisible();
    });
  });

  test.describe('Disabled Items', () => {
    test('should render disabled item', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithDisabled} />);
      const disabledItem = component.locator('[class*="disabled"]');
      await expect(disabledItem).toBeVisible();
      await expect(disabledItem).toContainText('Disabled');
    });

    test('should not call onSelect for disabled item', async ({ mount }) => {
      let selectedKey = '';
      const component = await mount(
        <Menu
          items={itemsWithDisabled}
          onSelect={(key) => {
            selectedKey = key;
          }}
        />
      );

      // Try clicking disabled item
      await component.getByText('Disabled').click({ force: true });
      expect(selectedKey).toBe('');
    });

    test('should not change selection when disabled item is clicked', async ({ mount }) => {
      const component = await mount(<MenuWithState items={itemsWithDisabled} />);

      // Initial state
      await expect(component.getByTestId('selected-key')).toContainText('Selected: home');

      // Try clicking disabled item
      await component.getByText('Disabled').click({ force: true });

      // Selection should not change
      await expect(component.getByTestId('selected-key')).toContainText('Selected: home');
    });
  });

  test.describe('Links', () => {
    test('should render items as links when href is provided', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithLinks} />);
      const homeLink = component.getByRole('link', { name: 'Home' });
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/');
    });

    test('should render all items with href as links', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithLinks} />);
      const aboutLink = component.getByRole('link', { name: 'About' });
      const contactLink = component.getByRole('link', { name: 'Contact' });

      await expect(aboutLink).toHaveAttribute('href', '/about');
      await expect(contactLink).toHaveAttribute('href', '/contact');
    });

    test('should call onClick for link items', async ({ mount }) => {
      let selectedKey = '';
      const component = await mount(
        <Menu
          items={itemsWithLinks}
          onSelect={(key) => {
            selectedKey = key;
          }}
        />
      );

      await component.getByRole('link', { name: 'About' }).click();
      expect(selectedKey).toBe('about');
    });
  });

  test.describe('Submenu', () => {
    test('should render items with submenu', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithSubmenu} />);
      await expect(component.getByText('Files')).toBeVisible();

      // Submenu should not be visible initially
      await expect(component.getByText('New File')).not.toBeVisible();
      await expect(component.getByText('Open File')).not.toBeVisible();
    });

    test('should show arrow indicator for items with submenu', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithSubmenu} />);
      const arrow = component.locator('[class*="arrow"]').first();
      await expect(arrow).toBeVisible();
    });

    test('should expand submenu when parent is clicked', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithSubmenu} />);

      // Click on Files
      await component.getByText('Files').click();

      // Submenu items should be visible
      await expect(component.getByText('New File')).toBeVisible();
      await expect(component.getByText('Open File')).toBeVisible();
      await expect(component.getByText('Save File')).toBeVisible();
    });

    test('should collapse submenu when parent is clicked again', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithSubmenu} />);

      // Expand
      await component.getByText('Files').click();
      await expect(component.getByText('New File')).toBeVisible();

      // Collapse
      await component.getByText('Files').click();
      await expect(component.getByText('New File')).not.toBeVisible();
    });

    test('should call onSelect for submenu item', async ({ mount }) => {
      const component = await mount(<MenuWithSubmenu />);

      // Expand submenu
      await component.getByText('Files').click();
      await expect(component.getByText('New File')).toBeVisible();

      // Click submenu item
      await component.getByText('New File').click();
      await expect(component.getByTestId('selected-key')).toContainText('Selected: new');
    });

    test('should rotate arrow when submenu is open', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithSubmenu} />);

      const filesItem = component.getByText('Files');
      await filesItem.click();

      // Arrow should have open class
      const arrow = component.locator('[class*="arrowOpen"]');
      await expect(arrow).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should be keyboard accessible', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      const homeItem = component.getByRole('button').filter({ hasText: 'Home' });

      await homeItem.focus();
      await expect(homeItem).toBeFocused();
    });

    test('should activate item with Enter key', async ({ mount, page }) => {
      let selectedKey = '';
      const component = await mount(
        <Menu
          items={basicItems}
          onSelect={(key) => {
            selectedKey = key;
          }}
        />
      );

      const profileItem = component.getByRole('button').filter({ hasText: 'Profile' });
      await profileItem.focus();
      await page.keyboard.press('Enter');

      expect(selectedKey).toBe('profile');
    });

    test('should activate item with Space key', async ({ mount, page }) => {
      let selectedKey = '';
      const component = await mount(
        <Menu
          items={basicItems}
          onSelect={(key) => {
            selectedKey = key;
          }}
        />
      );

      const settingsItem = component.getByRole('button').filter({ hasText: 'Settings' });
      await settingsItem.focus();
      await page.keyboard.press('Space');

      expect(selectedKey).toBe('settings');
    });

    test('should expand submenu with Enter key', async ({ mount, page }) => {
      const component = await mount(<Menu items={itemsWithSubmenu} />);

      const filesItem = component.getByRole('button').filter({ hasText: 'Files' });
      await filesItem.focus();
      await page.keyboard.press('Enter');

      // Submenu should be visible
      await expect(component.getByText('New File')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have navigation element', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      await expect(component).toBeVisible();
    });

    test('should have list structure', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      const list = component.locator('ul').first();
      await expect(list).toBeVisible();
    });

    test('should have proper role structure', async ({ mount }) => {
      const component = await mount(<Menu items={basicItems} />);
      const listItems = component.locator('li');
      await expect(listItems).toHaveCount(basicItems.length);
    });

    test('disabled items should have tabindex -1', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithDisabled} />);
      const disabledItem = component.getByRole('button').filter({ hasText: 'Disabled' });
      await expect(disabledItem).toHaveAttribute('tabindex', '-1');
    });

    test('enabled items should have tabindex 0', async ({ mount }) => {
      const component = await mount(<Menu items={itemsWithDisabled} />);
      const enabledItem = component.getByRole('button').filter({ hasText: 'Enabled 1' });
      await expect(enabledItem).toHaveAttribute('tabindex', '0');
    });
  });

  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options', async ({ mount }) => {
      const modes = ['vertical', 'horizontal', 'inline'] as const;
      const themes = ['light', 'dark'] as const;

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

      const darkContainerStyle: React.CSSProperties = {
        ...containerStyle,
        background: '#1a1a1a',
      };

      const component = await mount(
        <div style={{ padding: 24, background: '#f9f9f9' }}>
          {/* Modes with Light Theme */}
          <div style={sectionTitleStyle}>Menu - Mode Variants (Light Theme)</div>
          {modes.map((mode) => (
            <div key={mode} style={containerStyle}>
              <div style={labelStyle}>Mode: {mode}</div>
              <Menu items={itemsWithIcons} mode={mode} theme="light" />
            </div>
          ))}

          {/* Modes with Dark Theme */}
          <div style={sectionTitleStyle}>Mode Variants (Dark Theme)</div>
          {modes.map((mode) => (
            <div key={mode} style={darkContainerStyle}>
              <div style={{ ...labelStyle, color: '#ccc' }}>Mode: {mode}</div>
              <Menu items={itemsWithIcons} mode={mode} theme="dark" />
            </div>
          ))}

          {/* With Icons and Selection */}
          <div style={sectionTitleStyle}>With Icons and Selection</div>
          {themes.map((theme) => (
            <div key={theme} style={theme === 'dark' ? darkContainerStyle : containerStyle}>
              <div style={{ ...labelStyle, color: theme === 'dark' ? '#ccc' : '#555' }}>
                Theme: {theme} (Profile selected)
              </div>
              <Menu items={itemsWithIcons} selectedKey="profile" theme={theme} />
            </div>
          ))}

          {/* With Disabled Items */}
          <div style={sectionTitleStyle}>With Disabled Items</div>
          {themes.map((theme) => (
            <div key={theme} style={theme === 'dark' ? darkContainerStyle : containerStyle}>
              <div style={{ ...labelStyle, color: theme === 'dark' ? '#ccc' : '#555' }}>Theme: {theme}</div>
              <Menu items={itemsWithDisabled} theme={theme} />
            </div>
          ))}

          {/* With Submenu (Open State) */}
          <div style={sectionTitleStyle}>With Submenu (Expanded)</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Submenu expanded</div>
            <Menu items={itemsWithSubmenu} mode="vertical" />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Note: Click "Files" to see submenu expand/collapse
            </div>
          </div>

          {/* Horizontal with Submenu */}
          <div style={containerStyle}>
            <div style={labelStyle}>Horizontal mode with submenu</div>
            <Menu items={itemsWithSubmenu} mode="horizontal" />
          </div>

          {/* With Links */}
          <div style={sectionTitleStyle}>With Links (href)</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Items as links</div>
            <Menu items={itemsWithLinks} />
          </div>

          {/* All Combinations */}
          <div style={sectionTitleStyle}>Combination Examples</div>
          <div style={containerStyle}>
            <div style={labelStyle}>Horizontal + Icons + Selection + Light</div>
            <Menu items={itemsWithIcons} mode="horizontal" selectedKey="home" theme="light" />
          </div>
          <div style={darkContainerStyle}>
            <div style={{ ...labelStyle, color: '#ccc' }}>Inline + Icons + Selection + Dark</div>
            <Menu items={itemsWithIcons} mode="inline" selectedKey="settings" theme="dark" />
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('menu-all-variants-chromium-darwin.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });
});
