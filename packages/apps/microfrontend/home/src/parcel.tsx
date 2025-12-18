import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

export const bootstrap = () => {
  return Promise.resolve();
};

export const mount = () => {
  return new Promise((resolve, reject) => {
    const container = document.getElementById('lufa-container');
    if (container) {
      const root = createRoot(container);
      root.render(<App />);
      resolve(void 0);
    } else {
      reject(new Error('Container element not found'));
    }
  });
};

export const unmount = () => {
  return new Promise((resolve) => {
    const container = document.getElementById('lufa-container');
    if (container) {
      const root = createRoot(container);
      root.unmount();
    } else {
      console.error('Container element not found for unmounting');
    }
    resolve(void 0);
  });
};
