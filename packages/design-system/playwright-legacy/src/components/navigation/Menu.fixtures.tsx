import React, { useState } from 'react';

import type { MenuItem, MenuProps } from '@grasdouble/lufa_design-system';
import { Menu } from '@grasdouble/lufa_design-system';

// Simple icon fixtures
export const HomeIcon = () => <span>🏠</span>;
export const UserIcon = () => <span>👤</span>;
export const SettingsIcon = () => <span>⚙️</span>;
export const FileIcon = () => <span>📄</span>;
export const FolderIcon = () => <span>📁</span>;

// Controlled menu with state
export const MenuWithState = (props: Partial<MenuProps>) => {
  const [selectedKey, setSelectedKey] = useState<string>('home');

  const items: MenuItem[] = [
    { key: 'home', label: 'Home', icon: <HomeIcon /> },
    { key: 'profile', label: 'Profile', icon: <UserIcon /> },
    { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <div>
      <div data-testid="selected-key">Selected: {selectedKey}</div>
      <Menu items={items} selectedKey={selectedKey} onSelect={setSelectedKey} {...props} />
    </div>
  );
};

// Menu with submenu
export const MenuWithSubmenu = () => {
  const [selectedKey, setSelectedKey] = useState<string>('');

  const items: MenuItem[] = [
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

  return (
    <div>
      <div data-testid="selected-key">Selected: {selectedKey}</div>
      <Menu items={items} selectedKey={selectedKey} onSelect={setSelectedKey} />
    </div>
  );
};
