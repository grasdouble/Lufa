import React from 'react';
import clsx from 'clsx';

import { Stack } from '@grasdouble/lufa_design-system';

import styles from './App.module.css';
import { getImageUrl } from './getImageUrl';

function App() {
  return (
    <div className={clsx(styles['lufa-home'])} id="lufa-home">
      <Stack direction="vertical" gap="normal" align="center">
        <img src={getImageUrl('Lufa_Logo')} alt="Centered Logo" className={clsx(styles['centered-image'])} />
        <h1 className={clsx(styles['centered-message'])}>
          Lufa Workspace (WIP) <br /> by Sebastien LE MOUILLOUR
        </h1>
        <Stack direction="horizontal">
          <a
            href="https://lufa-design.sebastien-lemouillour.fr"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.link, styles.design)}
          >
            Lufa Design System (WIP)
          </a>
          <a
            href="https://lufa-storybook.sebastien-lemouillour.fr"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.link, styles.storybook)}
          >
            Lufa Storybook (WIP)
          </a>
          <a
            href="https://github.com/grasdouble/Lufa"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.link, styles.github)}
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/sebastienlemouillour/"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.link, styles.linkedin)}
          >
            LinkedIn
          </a>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
