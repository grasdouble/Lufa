/**
 * Live examples for VisuallyHidden component documentation
 */

import React from 'react';

import { VisuallyHidden } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <button type="button">
      <span aria-hidden="true">🔍</span>
      <VisuallyHidden>Search</VisuallyHidden>
      <span>Search</span>
    </button>
  );
}

export function AsElementDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <span aria-hidden="true">🔔</span>
        <VisuallyHidden as="span">Notifications</VisuallyHidden>
        <span style={{ marginLeft: '8px' }}>As span</span>
      </div>
      <div>
        <span aria-hidden="true">📌</span>
        <VisuallyHidden as="div">Pinned</VisuallyHidden>
        <span style={{ marginLeft: '8px' }}>As div</span>
      </div>
    </div>
  );
}
