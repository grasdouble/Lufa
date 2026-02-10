import React from 'react';
import ThemeSwitcher from '@site/src/components/ThemeSwitcher';
import NavbarContent from '@theme-original/Navbar/Content';

import styles from './styles.module.css';

export default function NavbarContentWrapper(props: React.ComponentProps<typeof NavbarContent>): React.JSX.Element {
  return (
    <>
      <NavbarContent {...props} />
      <div className={styles.themeSwitcherWrapper}>
        <ThemeSwitcher />
      </div>
    </>
  );
}
