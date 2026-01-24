/**
 * Live examples for Button component documentation
 * These components are imported and rendered in button.mdx
 */

import React from 'react';

import { Button } from '@grasdouble/lufa_design-system';

/**
 * Basic demo showing default Button usage
 */
export function LiveDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      <Button type="solid" variant="primary">
        Primary Button
      </Button>
      <Button type="outline" variant="secondary">
        Secondary Button
      </Button>
      <Button type="ghost" variant="neutral">
        Cancel
      </Button>
    </div>
  );
}
