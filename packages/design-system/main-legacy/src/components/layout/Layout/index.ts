import { Layout as LayoutCore } from './Layout';
import { LayoutContent } from './LayoutContent';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSidebar } from './LayoutSidebar';

export const Layout = Object.assign(LayoutCore, {
  Header: LayoutHeader,
  Sidebar: LayoutSidebar,
  Content: LayoutContent,
  Footer: LayoutFooter,
});

export * from './Layout.constants';

export type { LayoutProps } from './Layout';
export type { LayoutHeaderProps } from './LayoutHeader';
export type { LayoutSidebarProps } from './LayoutSidebar';
export type { LayoutContentProps } from './LayoutContent';
export type { LayoutFooterProps } from './LayoutFooter';
