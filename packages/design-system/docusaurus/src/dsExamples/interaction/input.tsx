/**
 * Live examples for Input component documentation
 */

import React from 'react';

import { Input, Label } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <div>
      <Label htmlFor="demo-username">Username</Label>
      <Input id="demo-username" placeholder="Enter username" />
    </div>
  );
}

export function DisabledDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <Label htmlFor="demo-disabled">Disabled</Label>
        <Input id="demo-disabled" disabled placeholder="Disabled input" />
      </div>
      <div>
        <Label htmlFor="demo-readonly">Read-only</Label>
        <Input id="demo-readonly" readOnly value="Read-only value" />
      </div>
    </div>
  );
}

export function FullWidthDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label htmlFor="demo-full">Full width</Label>
      <Input id="demo-full" fullWidth placeholder="Full width input" />
    </div>
  );
}

export function ErrorDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label htmlFor="demo-error">Email</Label>
      <Input id="demo-error" error placeholder="Enter email" />
    </div>
  );
}
